import { z } from "zod";
import { validateEnv } from "./env";

// --- Configuration & Constants ---

const ZOHO_ENDPOINTS = {
  authBaseUrl: "https://accounts.zoho.com",
  apiBaseUrl: "https://www.zohoapis.com/crm/v2",
  deskBaseUrl: "https://desk.zoho.com/api/v1",
};

// Credentials are read at call time, not module load, so a value set or
// rotated in the runtime environment is picked up without a rebuild.
function zohoCredentials() {
  return {
    clientId: process.env.ZOHO_CLIENT_ID,
    clientSecret: process.env.ZOHO_CLIENT_SECRET,
    refreshToken: process.env.ZOHO_REFRESH_TOKEN,
  };
}

/**
 * Retry budget for calls made on behalf of the contact routes.
 *
 * The whole Zoho phase (token refresh, request, retries, backoff) has to end
 * inside `budgetMs`, so the email fallback in `leadFallback.ts` still has time
 * to run before the function limit (`maxDuration` on the routes). Worst case
 * is budgetMs for Zoho plus the SMTP overall timeout, about 9.5 seconds.
 *
 * Exported so tests can shrink the delays. Nothing in production mutates it.
 */
export const ZOHO_RETRY_POLICY = {
  maxAttempts: 3,
  baseDelayMs: 250,
  attemptTimeoutMs: 3000,
  budgetMs: 5000,
  /** Do not start an attempt with less time than this left in the budget. */
  minAttemptMs: 500,
};

// --- Schemas (Contract-Driven Development) ---

export const SalesContactSchema = z.object({
  firstName: z.string().min(1, "First name is required").trim(),
  lastName: z.string().min(1, "Last name is required").trim(),
  email: z.string().email("Invalid email address").trim().toLowerCase(),
  company: z.string().optional().default("Household / Indep."), // Default for B2C
  phone: z.string().optional(),
  description: z.string().min(10, "Please provide a bit more detail (10+ chars)"),
  source: z.string().optional(),
  referrer: z.string().optional(),
  utm: z.record(z.string(), z.string()).optional(),
  honeypot: z.string().optional(), // Anti-spam
});

export const SupportTicketSchema = z.object({
  contactName: z.string().min(1, "Name is required").trim(),
  email: z.string().email("Invalid email address").trim().toLowerCase(),
  phone: z.string().optional(),
  subject: z.string().min(5, "Subject is required (5+ chars)"),
  description: z.string().min(20, "Please provide more details about the issue"),
  priority: z.enum(["High", "Medium", "Low"]).default("Medium"),
  context: z.enum(["existing_client", "new_client_critical"]).optional(),
  honeypot: z.string().optional(),
});

export const NewsletterSubscriberSchema = z.object({
  email: z.string().email("Invalid email address").trim().toLowerCase(),
  source: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, "Must consent"),
  honeypot: z.string().optional(),
});

export type SalesContact = z.infer<typeof SalesContactSchema>;
export type SupportTicket = z.infer<typeof SupportTicketSchema>;
export type NewsletterSubscriber = z.infer<typeof NewsletterSubscriberSchema>;

// --- Errors ---

/**
 * What kind of failure ended a Zoho call. This is what the `[LEAD_FALLBACK]`
 * log line reports as `errorClass`.
 */
export type ZohoErrorClass =
  | "config" // env var or credential missing; nothing was sent to Zoho
  | "auth" // token refresh refused, or the API kept rejecting the token
  | "network" // fetch threw: DNS, reset, TLS
  | "timeout" // our per-attempt timer aborted the request
  | "rate_limited" // HTTP 429
  | "server" // HTTP 5xx
  | "rejected" // any other 4xx: Zoho refused the payload
  | "logic" // 2xx whose body does not confirm the record was created
  | "unknown";

const TRANSIENT_CLASSES: ReadonlySet<ZohoErrorClass> = new Set([
  "network",
  "timeout",
  "rate_limited",
  "server",
]);

interface ZohoErrorInfo {
  status?: number;
  zohoCode?: string;
  detail?: string;
  retryAfterMs?: number;
  /** The CRM/Desk API (not the token endpoint) answered 401. */
  tokenRejected?: boolean;
}

export class ZohoError extends Error {
  readonly errorClass: ZohoErrorClass;
  readonly status?: number;
  readonly zohoCode?: string;
  readonly detail?: string;
  readonly retryAfterMs?: number;
  readonly tokenRejected: boolean;
  /**
   * Retry-loop iterations before this error was final. Stays 0 when a
   * pre-check (e.g. missing department id) failed before any attempt.
   */
  attempts = 0;

  constructor(message: string, errorClass: ZohoErrorClass, info: ZohoErrorInfo = {}) {
    super(message);
    this.name = "ZohoError";
    this.errorClass = errorClass;
    this.status = info.status;
    this.zohoCode = info.zohoCode;
    this.detail = info.detail;
    this.retryAfterMs = info.retryAfterMs;
    this.tokenRejected = info.tokenRejected ?? false;
  }

  get transient(): boolean {
    return TRANSIENT_CLASSES.has(this.errorClass);
  }
}

// --- HTTP helpers ---

interface ZohoHttpResult {
  status: number;
  ok: boolean;
  headers: Headers;
  text: string;
}

/**
 * One fetch with a hard timeout that also covers reading the body, so a slow
 * body cannot hold the route past its budget. Throws a classified ZohoError
 * for network failures and timeouts; returns the response for any HTTP status.
 */
async function timedRequest(
  url: string,
  init: RequestInit,
  timeoutMs: number,
  label: string
): Promise<ZohoHttpResult> {
  const controller = new AbortController();
  const ms = Math.max(1, Math.floor(timeoutMs));
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    const response = await fetch(url, {
      ...init,
      cache: "no-store", // Never cache auth or CRM traffic
      signal: controller.signal,
    });
    const text = await response.text();
    return { status: response.status, ok: response.ok, headers: response.headers, text };
  } catch (error) {
    if (controller.signal.aborted) {
      throw new ZohoError(`${label} timed out after ${ms}ms`, "timeout");
    }
    const name = error instanceof Error ? error.name : "unknown";
    throw new ZohoError(`${label} network error (${name})`, "network");
  } finally {
    clearTimeout(timer);
  }
}

function parseJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : undefined;
}

/**
 * Error codes and field names from Zoho are useful in logs, but the response
 * body as a whole can echo submitted values. Keep only short identifier-like
 * tokens.
 */
function safeToken(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const cleaned = value.replace(/[^A-Za-z0-9_./-]/g, "").slice(0, 64);
  return cleaned || undefined;
}

function parseRetryAfterMs(headers: Headers): number | undefined {
  const raw = headers.get("retry-after");
  if (!raw) return undefined;
  const seconds = Number(raw);
  return Number.isFinite(seconds) && seconds >= 0 ? seconds * 1000 : undefined;
}

/** Builds a classified error from a non-2xx response of the CRM or Desk API. */
function apiHttpError(label: string, res: ZohoHttpResult): ZohoError {
  const body = asRecord(parseJson(res.text));
  const firstRecord = Array.isArray(body?.data) ? asRecord(body.data[0]) : undefined;
  const zohoCode = safeToken(body?.code ?? body?.errorCode ?? firstRecord?.code);

  // Desk lists offending fields in `errors[].fieldName`; CRM puts one in `details.api_name`.
  let detail: string | undefined;
  if (Array.isArray(body?.errors)) {
    detail = body.errors
      .map((e) => safeToken(asRecord(e)?.fieldName))
      .filter(Boolean)
      .join(",")
      .slice(0, 200);
  } else {
    detail = safeToken(asRecord(body?.details ?? firstRecord?.details)?.api_name);
  }

  const info: ZohoErrorInfo = { status: res.status, zohoCode, detail: detail || undefined };
  const message = `${label} failed: HTTP ${res.status}${zohoCode ? ` ${zohoCode}` : ""}`;

  if (res.status === 429) {
    return new ZohoError(message, "rate_limited", {
      ...info,
      retryAfterMs: parseRetryAfterMs(res.headers),
    });
  }
  if (res.status >= 500) return new ZohoError(message, "server", info);
  if (res.status === 401) return new ZohoError(message, "auth", { ...info, tokenRejected: true });
  if (res.status === 403) return new ZohoError(message, "auth", info);
  return new ZohoError(message, "rejected", info);
}

// --- Auth Handling ---

let cachedAccessToken: string | null = null;
let tokenExpiry: number = 0;

/**
 * Retrieves a valid Zoho Access Token, refreshing it if necessary.
 * Implements basic in-memory caching to reduce latency.
 *
 * `forceRefresh` skips the cache; the retry loop uses it once after the API
 * answers 401. Failures throw a classified ZohoError.
 */
export async function getZohoAccessToken(
  options: { forceRefresh?: boolean; timeoutMs?: number } = {}
): Promise<string> {
  // Validate env vars at runtime (not build time) to avoid build failures
  try {
    validateEnv();
  } catch (error) {
    throw new ZohoError(error instanceof Error ? error.message : "Invalid environment", "config");
  }

  const now = Date.now();

  // Use cached token if valid (with 30s buffer)
  if (!options.forceRefresh && cachedAccessToken && now < tokenExpiry - 30000) {
    return cachedAccessToken;
  }
  cachedAccessToken = null;

  const { clientId, clientSecret, refreshToken } = zohoCredentials();
  if (!clientId || !clientSecret || !refreshToken) {
    throw new ZohoError("Missing Zoho API Credentials", "config");
  }

  const params = new URLSearchParams({
    refresh_token: refreshToken,
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "refresh_token",
  });

  try {
    const res = await timedRequest(
      `${ZOHO_ENDPOINTS.authBaseUrl}/oauth/v2/token`,
      { method: "POST", body: params },
      options.timeoutMs ?? 10000,
      "Zoho token refresh"
    );

    const data = asRecord(parseJson(res.text));

    if (!res.ok) {
      // CIO Requirement: Log security failures. The token endpoint's error body
      // carries an error code, not credentials.
      console.error("[Zoho Auth Critical]", res.status, safeToken(data?.error) ?? "");
      if (res.status === 429) {
        throw new ZohoError(`Zoho Auth Failed: ${res.status}`, "rate_limited", {
          status: res.status,
          retryAfterMs: parseRetryAfterMs(res.headers),
        });
      }
      throw new ZohoError(
        `Zoho Auth Failed: ${res.status}`,
        res.status >= 500 ? "server" : "auth",
        { status: res.status, zohoCode: safeToken(data?.error) }
      );
    }

    // Zoho answers 200 with { error } for a bad or revoked refresh token.
    if (!data || data.error || typeof data.access_token !== "string") {
      const code = safeToken(data?.error) ?? "no_access_token";
      console.error("[Zoho Auth Critical]", code);
      throw new ZohoError(`Zoho Auth Error: ${code}`, "auth", {
        status: res.status,
        zohoCode: code,
      });
    }

    const expiresInSeconds = typeof data.expires_in === "number" ? data.expires_in : 3600;
    cachedAccessToken = data.access_token;
    tokenExpiry = now + expiresInSeconds * 1000;
    return data.access_token;
  } catch (error) {
    console.error(
      "Critical: Failed to refresh Zoho Token",
      error instanceof ZohoError ? `${error.errorClass}: ${error.message}` : error
    );
    throw error;
  }
}

// --- Retry loop ---

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function backoffMs(attempt: number): number {
  const { baseDelayMs } = ZOHO_RETRY_POLICY;
  const jitter = Math.floor(Math.random() * (baseDelayMs / 2 + 1));
  return baseDelayMs * 3 ** (attempt - 1) + jitter;
}

/**
 * Calls a Zoho API with bounded retries.
 *
 * - Network error, timeout, 5xx, 429: retry with backoff (Retry-After honoured
 *   when it fits the budget).
 * - 401 from the API: drop the cached token, force one refresh, retry once.
 * - Anything else: fail at once.
 *
 * Every attempt and every wait must fit inside ZOHO_RETRY_POLICY.budgetMs.
 * The final error carries `attempts`.
 */
async function callZohoWithRetry<T>(
  label: string,
  buildRequest: (token: string) => { url: string; init: RequestInit },
  interpret: (res: ZohoHttpResult) => T
): Promise<T> {
  const policy = ZOHO_RETRY_POLICY;
  const deadline = Date.now() + policy.budgetMs;
  let attempts = 0;
  let forceRefresh = false;
  let refreshedAfter401 = false;

  for (;;) {
    attempts++;
    try {
      const token = await getZohoAccessToken({
        forceRefresh,
        timeoutMs: Math.min(policy.attemptTimeoutMs, deadline - Date.now()),
      });
      forceRefresh = false;

      const { url, init } = buildRequest(token);
      const res = await timedRequest(
        url,
        init,
        Math.min(policy.attemptTimeoutMs, deadline - Date.now()),
        label
      );
      if (!res.ok) throw apiHttpError(label, res);
      return interpret(res);
    } catch (caught) {
      const error =
        caught instanceof ZohoError
          ? caught
          : new ZohoError(`${label} failed unexpectedly`, "unknown");
      error.attempts = attempts;

      const fits = (delayMs: number) =>
        attempts < policy.maxAttempts && Date.now() + delayMs + policy.minAttemptMs <= deadline;

      if (error.tokenRejected && !refreshedAfter401) {
        refreshedAfter401 = true;
        forceRefresh = true;
        cachedAccessToken = null;
        if (fits(0)) continue;
      } else if (error.transient) {
        const delayMs = error.retryAfterMs ?? backoffMs(attempts);
        if (fits(delayMs)) {
          await sleep(delayMs);
          continue;
        }
      }
      throw error;
    }
  }
}

// --- API Functions ---

/**
 * Creates a Lead in Zoho CRM, with bounded retries (see callZohoWithRetry).
 * Throws a ZohoError when the lead was not confirmed; the route then runs the
 * email fallback.
 */
export async function createLead(data: SalesContact) {
  // Mapping Schema to Zoho CRM Fields
  const zohoRecord = {
    First_Name: data.firstName,
    Last_Name: data.lastName,
    Email: data.email,
    Company: data.company || "Household",
    Phone: data.phone,
    Description: `[Web Inquiry] ${data.description}\n\nContext: ${JSON.stringify(data.utm || {})}`,
    Lead_Source: data.source || "Web Site",
    // Custom Fields for Attribution
    Referrer: data.referrer,
    GCLID: data.utm?.gclid,
  };

  return callZohoWithRetry(
    "Create Lead",
    (token) => ({
      url: `${ZOHO_ENDPOINTS.apiBaseUrl}/Leads`,
      init: {
        method: "POST",
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: [zohoRecord] }),
      },
    }),
    (res) => {
      // CRM answers 2xx even when the record was refused; only a per-record
      // "success" status counts.
      const json = asRecord(parseJson(res.text));
      const first = Array.isArray(json?.data) ? asRecord(json.data[0]) : undefined;
      if (first?.status !== "success") {
        const zohoCode = safeToken(first?.code);
        throw new ZohoError(
          `Create Lead not confirmed${zohoCode ? `: ${zohoCode}` : ""}`,
          "logic",
          { status: res.status, zohoCode, detail: safeToken(asRecord(first?.details)?.api_name) }
        );
      }
      return json;
    }
  );
}

/**
 * Creates a Ticket in Zoho Desk, with bounded retries.
 *
 * Desk rejects a ticket without `departmentId` (thread hum-36), so a missing
 * ZOHO_DESK_DEPARTMENT_ID fails here, before any call to Zoho, and the route
 * goes straight to the email fallback.
 */
export async function createTicket(data: SupportTicket) {
  const departmentId = process.env.ZOHO_DESK_DEPARTMENT_ID?.trim();
  if (!departmentId) {
    console.error("[CRITICAL] ZOHO_DESK_DEPARTMENT_ID missing");
    throw new ZohoError("ZOHO_DESK_DEPARTMENT_ID missing", "config", {
      detail: "ZOHO_DESK_DEPARTMENT_ID",
    });
  }

  const orgId = process.env.ZOHO_DESK_ORG_ID?.trim();
  if (!orgId) {
    console.warn("Zoho Desk Org ID missing, skipping ticket creation");
    throw new ZohoError("Configuration Error: Missing Desk Org ID", "config", {
      detail: "ZOHO_DESK_ORG_ID",
    });
  }

  // Append Context and Phone to description to ensure agents see it immediately
  const contextPrefix = data.context === "new_client_critical" ? "[NEW CLIENT CRITICAL] " : "";
  const phoneInfo = data.phone ? `\n\nContact Phone: ${data.phone}` : "";
  const fullDescription = `${contextPrefix}${data.description}${phoneInfo}`;

  const deskRecord = {
    departmentId,
    subject: `${contextPrefix}${data.subject}`,
    description: fullDescription,
    email: data.email,
    phone: data.phone, // Top level just in case
    contact: {
      lastName: data.contactName,
      phone: data.phone, // Inside contact to auto-create logic
      email: data.email,
    },
    priority: data.priority,
    channel: "Web",
    classification: "Request",
    customFields: {
      Source: "Web",
      Context: data.context || "General",
    },
  };

  return callZohoWithRetry(
    "Create Ticket",
    (token) => ({
      url: `${ZOHO_ENDPOINTS.deskBaseUrl}/tickets`,
      init: {
        method: "POST",
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
          orgId,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deskRecord),
      },
    }),
    (res) => {
      // A created ticket always comes back with its id.
      const json = asRecord(parseJson(res.text));
      if (!json?.id) {
        throw new ZohoError("Create Ticket not confirmed: no ticket id", "logic", {
          status: res.status,
        });
      }
      return json;
    }
  );
}

/**
 * Creates a Marketing Contact (Lead) strictly for Newsletter.
 * CIO Requirement: Sets "Opt_Out" to safe default if not explicitly opted in (handled by caller, here we assume it's just a sub).
 *
 * Single attempt, no fallback: out of scope for the lead-reliability work.
 */
export async function createMarketingContact(data: NewsletterSubscriber) {
  const token = await getZohoAccessToken();

  const zohoRecord = {
    Last_Name: "Subscriber", // Placeholder if name not collected
    Email: data.email,
    Lead_Source: "Newsletter",
    Description: `Newsletter subscription from ${data.source || "Website"}`,
    Company: "Newsletter Subscriber",
  };

  const response = await fetch(`${ZOHO_ENDPOINTS.apiBaseUrl}/Leads`, {
    method: "POST",
    headers: {
      Authorization: `Zoho-oauthtoken ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: [zohoRecord] }),
  });

  return await handleZohoResponse(response, "Newsletter Sub");
}

// --- Helpers ---

async function handleZohoResponse(response: Response, contexts: string) {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${contexts} Failed (${response.status}): ${text}`);
  }

  const json = await response.json();

  // Zoho CRM Specific Success Check (returns 200/201 even on some logic errors)
  if (json.data && Array.isArray(json.data) && json.data[0].status === "error") {
    throw new Error(`${contexts} Logic Error: ${json.data[0].message}`);
  }

  return json;
}
