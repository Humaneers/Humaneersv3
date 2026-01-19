import { getContextString } from "./session";

/**
 * Zoho API Client
 *
 * Handles form submissions to Zoho CRM and Zoho Desk via backend API routes.
 */

export interface SalesFormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  website?: string;
  role: string;
  phone?: string;
  employees: string;
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
    context: context
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
  if (!data.company?.trim()) errors.push("Company name is required");
  if (!data.role?.trim()) errors.push("Role is required");
  if (!data.employees?.trim()) errors.push("Company size is required");

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
