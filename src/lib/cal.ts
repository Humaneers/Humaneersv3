/**
 * Cal.com Headless Routing Integration
 *
 * This module provides utilities for integrating with Cal.com's headless routing system.
 * Forms collect data locally and redirect users to Cal.com routing endpoints with
 * pre-filled information.
 *
 * @see https://cal.com/help/routing/headless-routing
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
}

export interface NewsletterFormData {
  email: string;
  source?: string;
}

interface CalConfig {
  orgUrl?: string;
  salesFormId?: string;
  supportFormId?: string;
  newsletterFormId?: string;
}

/**
 * Get Cal.com configuration from environment variables
 */
function getCalConfig(): Partial<CalConfig> {
  const orgUrl = import.meta.env.VITE_CAL_ORG_URL?.trim();
  const salesFormId = import.meta.env.VITE_CAL_SALES_FORM_ID?.trim();
  const supportFormId = import.meta.env.VITE_CAL_SUPPORT_FORM_ID?.trim();
  const newsletterFormId = import.meta.env.VITE_CAL_NEWSLETTER_FORM_ID?.trim();

  return { orgUrl, salesFormId, supportFormId, newsletterFormId };
}

/**
 * Build Cal.com routing URL with form data as query parameters
 */
function buildCalUrl(formId: string, params: Record<string, string>): string {
  const { orgUrl } = getCalConfig();

  if (!orgUrl) {
    throw new Error("Cal.com organization URL is not configured");
  }

  const queryParams = new URLSearchParams();
  queryParams.set("form", formId);

  // Add all parameters to query string
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      queryParams.set(key, value);
    }
  });

  return `${orgUrl}/router?${queryParams.toString()}`;
}

/**
 * Redirect to Cal.com sales routing form
 *
 * @param data - Sales form data to pass to Cal.com
 */
export function redirectToSalesBooking(data: SalesFormData): void {
  const { salesFormId } = getCalConfig();

  if (!salesFormId) {
    throw new Error("Sales form ID is not configured");
  }

  const params: Record<string, string> = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    company: data.company,
    role: data.role,
    employees: data.employees,
  };

  // Add optional fields if they exist
  if (data.website) params.website = data.website;
  if (data.phone) params.phone = data.phone;
  if (data.budget) params.budget = data.budget;
  if (data.interests && Array.isArray(data.interests) && data.interests.length > 0) {
    params.interests = data.interests.join(", ");
  }
  if (data.message) params.message = data.message;

  const calUrl = buildCalUrl(salesFormId, params);

  // Redirect to Cal.com
  window.location.href = calUrl;
}

/**
 * Redirect to Cal.com support routing form
 *
 * @param data - Support form data to pass to Cal.com
 */
export function redirectToSupportBooking(data: SupportFormData): void {
  const { supportFormId } = getCalConfig();

  if (!supportFormId) {
    throw new Error("Support form ID is not configured");
  }

  const params: Record<string, string> = {
    name: data.name,
    email: data.email,
    priority: data.priority,
    category: data.category,
    subject: data.subject,
    description: data.description,
  };

  // Add optional fields if they exist
  if (data.phone) params.phone = data.phone;
  if (data.company) params.company = data.company;

  const calUrl = buildCalUrl(supportFormId, params);

  // Redirect to Cal.com
  window.location.href = calUrl;
}

/**
 * Validate sales form data before submission
 */
export function validateSalesForm(data: Partial<SalesFormData>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.firstName?.trim()) errors.push("First name is required");
  if (!data.lastName?.trim()) errors.push("Last name is required");
  if (!data.email?.trim()) errors.push("Email is required");
  if (!data.company?.trim()) errors.push("Company name is required");
  if (!data.role?.trim()) errors.push("Role is required");
  if (!data.employees?.trim()) errors.push("Company size is required");

  // Email validation - more robust pattern
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (data.email && !emailRegex.test(data.email)) {
    errors.push("Invalid email format");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate support form data before submission
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

  // Email validation - more robust pattern
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (data.email && !emailRegex.test(data.email)) {
    errors.push("Invalid email format");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Redirect to Cal.com newsletter routing form
 *
 * @param data - Newsletter form data to pass to Cal.com
 */
export function redirectToNewsletterBooking(data: NewsletterFormData): void {
  const { newsletterFormId } = getCalConfig();

  if (!newsletterFormId) {
    throw new Error("Newsletter form ID is not configured");
  }

  const params: Record<string, string> = {
    email: data.email,
  };

  // Add optional source tracking
  if (data.source) params.source = data.source;

  const calUrl = buildCalUrl(newsletterFormId, params);

  // Redirect to Cal.com
  window.location.href = calUrl;
}

/**
 * Validate newsletter form data before submission
 */
export function validateNewsletterForm(data: Partial<NewsletterFormData>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.email?.trim()) errors.push("Email is required");

  // Email validation - more robust pattern
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (data.email && !emailRegex.test(data.email)) {
    errors.push("Invalid email format");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Get a preview URL for testing (doesn't redirect, returns URL)
 * Useful for debugging and development
 */
export function getCalPreviewUrl(
  type: "sales" | "support",
  data: SalesFormData | SupportFormData
): string {
  const { salesFormId, supportFormId } = getCalConfig();

  if (type === "sales") {
    const salesData = data as SalesFormData;
    const params: Record<string, string> = {
      firstName: salesData.firstName,
      lastName: salesData.lastName,
      email: salesData.email,
      company: salesData.company,
      role: salesData.role,
      employees: salesData.employees,
    };

    if (salesData.website) params.website = salesData.website;
    if (salesData.phone) params.phone = salesData.phone;
    if (salesData.budget) params.budget = salesData.budget;
    if (
      salesData.interests &&
      Array.isArray(salesData.interests) &&
      salesData.interests.length > 0
    ) {
      params.interests = salesData.interests.join(", ");
    }
    if (salesData.message) params.message = salesData.message;

    if (!salesFormId) throw new Error("Sales form ID is not configured");
    return buildCalUrl(salesFormId, params);
  } else {
    const supportData = data as SupportFormData;
    const params: Record<string, string> = {
      name: supportData.name,
      email: supportData.email,
      priority: supportData.priority,
      category: supportData.category,
      subject: supportData.subject,
      description: supportData.description,
    };

    if (supportData.phone) params.phone = supportData.phone;
    if (supportData.company) params.company = supportData.company;

    if (!supportFormId) throw new Error("Support form ID is not configured");
    return buildCalUrl(supportFormId, params);
  }
}
