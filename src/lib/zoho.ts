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

export interface ApiResponse {
  success: boolean;
  error?: string;
  id?: string;
}

/**
 * Submit sales lead to Zoho CRM
 */
export async function submitSalesLead(data: SalesFormData): Promise<ApiResponse> {
  const payload = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    company: data.company,
    website: data.website,
    role: data.role,
    phone: data.phone,
    employees: data.employees,
    budget: data.budget,
    interests: data.interests.join(", "),
    message: data.message,
  };

  const response = await fetch("/api/zoho/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Failed to submit lead");
  }

  return result;
}

/**
 * Submit support ticket to Zoho Desk
 */
export async function submitSupportTicket(data: SupportFormData): Promise<ApiResponse> {
  const response = await fetch("/api/zoho/tickets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Failed to submit ticket");
  }

  return result;
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
