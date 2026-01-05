const API_BASE = '/api';

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  category: string;
  message: string;
}

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

export interface EthicsFormData {
  isAnonymous: boolean;
  name?: string;
  email?: string;
  reportType: string;
  details: string;
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
  ticketId?: string;
  zohoTicketNumber?: string;
}

async function handleResponse(response: Response): Promise<ApiResponse> {
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || 'Something went wrong. Please try again.');
  }
  return response.json();
}

export async function submitContactForm(data: ContactFormData): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE}/submit-form`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      formType: 'contact',
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      category: data.category,
      message: data.message,
    }),
  });
  return handleResponse(response);
}

export async function submitSalesForm(data: SalesFormData): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE}/submit-form`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      formType: 'sales',
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      company: data.company,
      website: data.website,
      role: data.role,
      employees: data.employees,
      budget: data.budget,
      interests: data.interests,
      message: data.message,
    }),
  });
  return handleResponse(response);
}

export async function submitEthicsReport(data: EthicsFormData): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE}/submit-ethics`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function submitSupportTicket(data: SupportFormData): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE}/submit-support`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}
