import { CircuitBreakerManager } from "../CircuitBreaker";
import { ZOHO_CONFIG } from "./config";
import { validateEnv } from "../env";

// Validate environment variables on module load
try {
  validateEnv();
} catch (e) {
  console.warn("Env validation failed (ignore if build time):", e);
}

let cachedAccessToken: string | null = null;
let tokenExpiry: number = 0;

// Circuit breaker configurations for different Zoho services
const CIRCUIT_BREAKER_CONFIGS = {
  zoho_auth: {
    failureThreshold: 3,
    recoveryTimeout: 30000, // 30 seconds for auth
    monitoringWindow: 300000,
    expectedErrors: ["NetworkError", "TimeoutError"],
  },
  zoho_crm: {
    failureThreshold: 5,
    recoveryTimeout: 60000, // 1 minute for CRM
    monitoringWindow: 300000,
    expectedErrors: ["NetworkError", "TimeoutError"],
  },
  zoho_desk: {
    failureThreshold: 5,
    recoveryTimeout: 60000, // 1 minute for Desk
    monitoringWindow: 300000,
    expectedErrors: ["NetworkError", "TimeoutError"],
  },
};

// Get circuit breaker instances
const circuitBreakerManager = CircuitBreakerManager.getInstance();
const authCircuitBreaker = circuitBreakerManager.getCircuitBreaker(
  "zoho_auth",
  CIRCUIT_BREAKER_CONFIGS.zoho_auth
);
const crmCircuitBreaker = circuitBreakerManager.getCircuitBreaker(
  "zoho_crm",
  CIRCUIT_BREAKER_CONFIGS.zoho_crm
);
const deskCircuitBreaker = circuitBreakerManager.getCircuitBreaker(
  "zoho_desk",
  CIRCUIT_BREAKER_CONFIGS.zoho_desk
);

/**
 * Enhanced Zoho Access Token retrieval with circuit breaker protection
 */
export async function getResilientZohoAccessToken(): Promise<string> {
  const now = Date.now();

  // Use cached token if valid (with 30s buffer)
  if (cachedAccessToken && now < tokenExpiry - 30000) {
    return cachedAccessToken;
  }

  if (!ZOHO_CONFIG.clientId || !ZOHO_CONFIG.clientSecret || !ZOHO_CONFIG.refreshToken) {
    throw new Error("Missing Zoho API Credentials");
  }

  return await authCircuitBreaker.execute(async () => {
    const params = new URLSearchParams();
    params.append("refresh_token", ZOHO_CONFIG.refreshToken!);
    params.append("client_id", ZOHO_CONFIG.clientId!);
    params.append("client_secret", ZOHO_CONFIG.clientSecret!);
    params.append("grant_type", "refresh_token");

    // Add timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    try {
      const response = await fetch(`${ZOHO_CONFIG.authBaseUrl}/oauth/v2/token`, {
        method: "POST",
        body: params,
        cache: "no-store",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("[Zoho Auth Critical]", errorText);
        const error = new Error(`Zoho Auth Failed: ${response.status}`);
        error.name = response.status >= 500 ? "ServerError" : "ClientError";
        throw error;
      }

      const data = await response.json();

      if (data.error) {
        const error = new Error(`Zoho Auth Error: ${data.error}`);
        error.name = "AuthError";
        throw error;
      }

      cachedAccessToken = data.access_token;
      tokenExpiry = now + data.expires_in * 1000;

      return cachedAccessToken as string;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error && error.name === "AbortError") {
        const timeoutError = new Error("Zoho API request timed out after 10 seconds");
        timeoutError.name = "TimeoutError";
        throw timeoutError;
      }
      throw error;
    }
  });
}

/**
 * Enhanced Zoho API request with circuit breaker protection
 */
export async function makeResilientZohoRequest(
  endpoint: string,
  options: RequestInit,
  service: "crm" | "desk" = "crm"
): Promise<Response> {
  const circuitBreaker = service === "crm" ? crmCircuitBreaker : deskCircuitBreaker;
  const token = await getResilientZohoAccessToken();

  return await circuitBreaker.execute(async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout for API calls

    try {
      const response = await fetch(endpoint, {
        ...options,
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
          "Content-Type": "application/json",
          ...options.headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Handle different types of errors appropriately
      if (!response.ok) {
        const errorText = await response.text();
        const error = new Error(
          `Zoho ${service.toUpperCase()} API Failed (${response.status}): ${errorText}`
        );

        if (response.status >= 500) {
          error.name = "ServerError";
        } else if (response.status === 429) {
          error.name = "RateLimitError";
        } else if (response.status === 401 || response.status === 403) {
          error.name = "AuthError";
          // Clear cached token on auth errors
          cachedAccessToken = null;
          tokenExpiry = 0;
        } else {
          error.name = "ClientError";
        }

        throw error;
      }

      return response;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error && error.name === "AbortError") {
        const timeoutError = new Error(
          `Zoho ${service.toUpperCase()} API request timed out after 15 seconds`
        );
        timeoutError.name = "TimeoutError";
        throw timeoutError;
      }
      throw error;
    }
  });
}

/**
 * Handle Zoho API response with proper error handling
 */
export async function handleResilientZohoResponse(response: Response, context: string) {
  const json = await response.json();

  // Zoho-specific success check (returns 200/201 even on some logic errors)
  if (json.data && Array.isArray(json.data) && json.data[0]?.status === "error") {
    const error = new Error(`${context} Logic Error: ${json.data[0].message}`);
    error.name = "ZohoLogicError";
    throw error;
  }

  return json;
}

/**
 * Get circuit breaker statistics for monitoring
 */
export function getZohoCircuitBreakerStats() {
  return circuitBreakerManager.getAllStats();
}

/**
 * Reset all Zoho circuit breakers (for testing or manual intervention)
 */
export function resetZohoCircuitBreakers() {
  circuitBreakerManager.resetAll();
}
