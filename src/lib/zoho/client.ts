import { ZOHO_CONFIG } from "./config";
import { validateEnv } from "../env";

// Validate environment variables on module load
// Note: This might need adjustment if run in edge runtime where env vars work differently
// But for now keeping original behavior.
try {
  validateEnv();
} catch (e) {
  console.warn("Env validation failed (ignore if build time):", e);
}

let cachedAccessToken: string | null = null;
let tokenExpiry: number = 0;

/**
 * Retrieves a valid Zoho Access Token, refreshing it if necessary.
 * Implements basic in-memory caching to reduce latency.
 */
export async function getZohoAccessToken(): Promise<string> {
  const now = Date.now();

  // Use cached token if valid (with 30s buffer)
  if (cachedAccessToken && now < tokenExpiry - 30000) {
    return cachedAccessToken;
  }

  if (!ZOHO_CONFIG.clientId || !ZOHO_CONFIG.clientSecret || !ZOHO_CONFIG.refreshToken) {
    throw new Error("Missing Zoho API Credentials");
  }

  try {
    const params = new URLSearchParams({
      refresh_token: ZOHO_CONFIG.refreshToken,
      client_id: ZOHO_CONFIG.clientId,
      client_secret: ZOHO_CONFIG.clientSecret,
      grant_type: "refresh_token",
    });

    // HIGH PRIORITY FIX: Add timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    try {
      const response = await fetch(`${ZOHO_CONFIG.authBaseUrl}/oauth/v2/token`, {
        method: "POST",
        body: params,
        cache: "no-store", // CIO Requirement: Never cache auth tokens on disk/CDN
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("[Zoho Auth Critical]", errorText);
        throw new Error(`Zoho Auth Failed: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(`Zoho Auth Error: ${data.error}`);
      }

      cachedAccessToken = data.access_token;
      // Set expiry based on response (usually 3600s)
      tokenExpiry = now + data.expires_in * 1000;

      return cachedAccessToken as string;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error && error.name === "AbortError") {
        throw new Error("Zoho API request timed out after 10 seconds");
      }
      throw error;
    }
  } catch (error) {
    // CIO Requirement: Log security failures
    console.error("Critical: Failed to refresh Zoho Token", error);
    throw error;
  }
}
