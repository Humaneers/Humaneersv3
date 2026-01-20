import { getContextString } from "./session";

/**
 * Zoho API Client
 *
 * Handles form submissions to Zoho CRM and Zoho Desk via backend API routes.
 * Also provides OAuth token management utilities.
 */

/**
 * OAuth Token Management
 */

interface ZohoTokenResponse {
  access_token: string;
  expires_in: number;
  api_domain: string;
  token_type: string;
}

interface ZohoConfig {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  accountsUrl: string;
}

/**
 * Get Zoho configuration from environment variables
 */
function getZohoConfig(): ZohoConfig {
  const clientId = process.env.ZOHO_CLIENT_ID;
  const clientSecret = process.env.ZOHO_CLIENT_SECRET;
  const refreshToken = process.env.ZOHO_REFRESH_TOKEN;
  const accountsUrl = process.env.ZOHO_ACCOUNTS_URL || 'https://accounts.zoho.com';

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Missing required Zoho environment variables');
  }

  return { clientId, clientSecret, refreshToken, accountsUrl };
}

/**
 * Get a fresh access token using the refresh token
 * Access tokens expire after 1 hour
 */
export async function getZohoAccessToken(): Promise<string> {
  const config = getZohoConfig();

  const params = new URLSearchParams({
    refresh_token: config.refreshToken,
    client_id: config.clientId,
    client_secret: config.clientSecret,
    grant_type: 'refresh_token',
  });

  const response = await fetch(`${config.accountsUrl}/oauth/v2/token?${params.toString()}`, {
    method: 'POST',
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to get Zoho access token: ${error}`);
  }

  const data: ZohoTokenResponse = await response.json();
  return data.access_token;
}

/**
 * Make an authenticated request to Zoho CRM API
 */
export async function zohoApiRequest<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const accessToken = await getZohoAccessToken();
  const apiDomain = process.env.ZOHO_API_DOMAIN || 'https://www.zohoapis.com';

  const response = await fetch(`${apiDomain}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Zoho-oauthtoken ${accessToken}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Zoho API request failed: ${error}`);
  }

  return response.json();
}

/**
 * Make an authenticated request to Zoho Desk API
 */
export async function zohoDeskApiRequest<T = unknown>(
  endpoint: string,
  orgId: string,
  options: RequestInit = {}
): Promise<T> {
  const accessToken = await getZohoAccessToken();

  const response = await fetch(`https://desk.zoho.com/api/v1${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Zoho-oauthtoken ${accessToken}`,
      'orgId': orgId,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Zoho Desk API request failed: ${error}`);
  }

  return response.json();
}

/**
 * Make an authenticated request to Zoho Bookings API
 */
export async function zohoBookingsApiRequest<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const accessToken = await getZohoAccessToken();

  const response = await fetch(`https://bookings.zoho.com/api/v1${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Zoho-oauthtoken ${accessToken}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Zoho Bookings API request failed: ${error}`);
  }

  return response.json();
}

/**
 * Form Submission Types and Functions
 */

export interface SalesFormData {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  website?: string;
  role?: string;
  phone?: string;
  employees?: string;
  budget?: string;
  interests: string[];
  message?: string;
  source?: string;
}

export interface SupportFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  priority: string;
  category: string;
  subject: string;
  description: string;
  source?: string;
}

export interface NewsletterFormData {
  email: string;
  source?: string;
  context?: string;
}

export interface ApiResponse {
  success: boolean;
  error?: string;
  id?: string;
}

// ... existing code ...

/**
 * Submit newsletter subscription to Zoho CRM
 */
export async function submitNewsletter(data: NewsletterFormData): Promise<ApiResponse> {
  const context = getContextString();
  // Keep source short for Lead_Source picklist compatibility
  // Pass context separately for Description field

  const payload = {
    ...data,
    source: data.source || "Newsletter Signup",
    context: context,
  };

  const response = await fetch("/api/zoho/newsletter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const contentType = response.headers.get("content-type");

  if (contentType && contentType.indexOf("application/json") !== -1) {
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Failed to subscribe");
    }
    return result;
  } else {
    // If not JSON, read as text and error out
    const text = await response.text();
    // If we land here with a 200, it's weird, but handle it.
    // Usually this is a 500 HTML or text error.
    if (!response.ok) {
      throw new Error(`Server error (${response.status}): ${text.substring(0, 100)}`);
    }
    // Fallback success if text returned (unlikely for API)
    return { success: true };
  }
}

/**
 * Submit sales lead to Zoho CRM
 */
export async function submitSalesLead(data: SalesFormData): Promise<ApiResponse> {
  const context = getContextString();
  const payload = {
    ...data,
    context,
    source: data.source || "Website Contact Form",
  };

  const response = await fetch("/api/zoho/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const contentType = response.headers.get("content-type");

  if (contentType && contentType.indexOf("application/json") !== -1) {
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Failed to submit lead");
    }
    return result;
  } else {
    const text = await response.text();
    if (!response.ok) {
      throw new Error(`Server error (${response.status}): ${text.substring(0, 100)}`);
    }
    return { success: true };
  }
}

/**
 * Submit support ticket to Zoho Desk
 */
export async function submitSupportTicket(data: SupportFormData): Promise<ApiResponse> {
  const context = getContextString();
  const payload = {
    ...data,
    context,
    source: data.source || "Website Support Form",
  };

  const response = await fetch("/api/zoho/tickets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const contentType = response.headers.get("content-type");

  if (contentType && contentType.indexOf("application/json") !== -1) {
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Failed to submit ticket");
    }
    return result;
  } else {
    const text = await response.text();
    if (!response.ok) {
      throw new Error(`Server error (${response.status}): ${text.substring(0, 100)}`);
    }
    return { success: true };
  }
}

/**
 * Validate sales form data
 */
export function validateSalesForm(data: Partial<SalesFormData>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.firstName?.trim()) errors.push("First name is required");
  if (!data.lastName?.trim()) errors.push("Last name is required");
  if (!data.email?.trim()) errors.push("Email is required");
  // Company is conditional in UI, but if present in typical B2B flow it is checked.
  // We relax this here since 'family' segment might reuse this validator or UI handles it.
  // But strict B2B validation requires it. UI calls this.
  // Let's keep logic simple: if data object has the field, check it?
  // Or just rely on what's passed.
  // For now, we keep existing logic but allow empty company if it's explicitly handled in UI (which it is).
  // Actually, UI calls this... and UI checks segment != family before calling.
  // Ideally we inspect segment here, but we don't pass segment.
  // We'll leave as is, assuming UI manages the 'Company' field population (e.g. "Smith Household") before calling.
  // Looking at TalkToSales.tsx, it populates it. So this is fine.
  // Optional fields for certain segments (personal, nonprofit)
  // if (!data.company?.trim()) errors.push("Company name is required");
  // if (!data.role?.trim()) errors.push("Role is required");
  // if (!data.employees?.trim()) errors.push("Company size is required");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.email && !emailRegex.test(data.email)) {
    errors.push("Invalid email format");
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Validate support form data
 */
export function validateSupportForm(data: Partial<SupportFormData>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.name?.trim()) errors.push("Name is required");
  if (!data.email?.trim()) errors.push("Email is required");
  if (!data.priority?.trim()) errors.push("Priority is required");
  if (!data.category?.trim()) errors.push("Category is required");
  if (!data.subject?.trim()) errors.push("Subject is required");
  if (!data.description?.trim()) errors.push("Description is required");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.email && !emailRegex.test(data.email)) {
    errors.push("Invalid email format");
  }

  return { valid: errors.length === 0, errors };
}
