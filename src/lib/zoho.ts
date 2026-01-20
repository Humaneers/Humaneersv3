import { z } from "zod";
import { validateEnv } from "./env";

// Validate environment variables on module load
validateEnv();

// --- Configuration & Constants ---

const ZOHO_CONFIG = {
  authBaseUrl: "https://accounts.zoho.com",
  apiBaseUrl: "https://www.zohoapis.com/crm/v2",
  deskBaseUrl: "https://desk.zoho.com/api/v1",
  clientId: process.env.ZOHO_CLIENT_ID,
  clientSecret: process.env.ZOHO_CLIENT_SECRET,
  refreshToken: process.env.ZOHO_REFRESH_TOKEN,
  // Hardcoded for now, but should ideally be env var if multi-tenant
  deskOrgId: process.env.ZOHO_DESK_ORG_ID,
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
  subject: z.string().min(5, "Subject is required (5+ chars)"),
  description: z.string().min(20, "Please provide more details about the issue"),
  priority: z.enum(["High", "Medium", "Low"]).default("Medium"),
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

// --- Auth Handling ---

let cachedAccessToken: string | null = null;
let tokenExpiry: number = 0;

/**
 * Retrieves a valid Zoho Access Token, refreshing it if necessary.
 * Implements basic in-memory caching to reduce latency.
 */
async function getZohoAccessToken(): Promise<string> {
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

// --- API Functions ---

/**
 * Creates a Lead in Zoho CRM.
 * CTO Requirement: Includes retry logic implicitly via upstream error handling or could be added here.
 * Currently fails fast to trigger email backup.
 */
export async function createLead(data: SalesContact) {
  const token = await getZohoAccessToken();

  // Mapping Schema to Zoho CRM Fields
  const zohoRecord = {
    First_Name: data.firstName,
    Last_Name: data.lastName,
    Email: data.email,
    Company: data.company || "Household",
    Phone: data.phone,
    Description: `[Web Inquiry] ${data.description}\n\nContext: ${JSON.stringify(data.utm || {})}`,
    Lead_Source: "Web Site",
    // Custom Fields for Attribution
    Referrer: data.referrer,
    GCLID: data.utm?.gclid,
  };

  const response = await fetch(`${ZOHO_CONFIG.apiBaseUrl}/Leads`, {
    method: "POST",
    headers: {
      Authorization: `Zoho-oauthtoken ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: [zohoRecord] }),
  });

  const valid = await handleZohoResponse(response, "Create Lead");
  return valid; // Returns success ID or throws
}

/**
 * Creates a Ticket in Zoho Desk.
 */
export async function createTicket(data: SupportTicket) {
  const token = await getZohoAccessToken(); // Note: Desk often uses different scopes/tokens; assuming same OAuth app covers both for now.
  // If Desk requires a different token/scope, we might need a separate auth flow.
  // For simplicity MVP, we'll try the same token (common in "self-client" apps) or assume the refresh token covers both scopes.

  if (!ZOHO_CONFIG.deskOrgId) {
    console.warn("Zoho Desk Org ID missing, skipping ticket creation");
    throw new Error("Configuration Error: Missing Desk Org ID");
  }

  const deskRecord = {
    subject: data.subject,
    description: data.description,
    email: data.email,
    contact: {
      lastName: data.contactName,
    },
    priority: data.priority,
    channel: "Web",
    classification: "Request",
  };

  const response = await fetch(`${ZOHO_CONFIG.deskBaseUrl}/tickets`, {
    method: "POST",
    headers: {
      Authorization: `Zoho-oauthtoken ${token}`,
      orgId: ZOHO_CONFIG.deskOrgId,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(deskRecord),
  });

  // Desk API response structure differs slightly from CRM
  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Zoho Desk API Error: ${err}`);
  }
  return await response.json();
}

/**
 * Creates a Marketing Contact (Lead) strictly for Newsletter.
 * CIO Requirement: Sets "Opt_Out" to safe default if not explicitly opted in (handled by caller, here we assume it's just a sub).
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

  const response = await fetch(`${ZOHO_CONFIG.apiBaseUrl}/Leads`, {
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
