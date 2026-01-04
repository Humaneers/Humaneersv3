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

export interface ApiResponse {
  success: boolean;
  error?: string;
  id?: string;
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
      formName: 'Contact Form',
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      pipelineStageName: 'New Inquiry',
      answers: [
        { fieldKey: 'category', question: 'Inquiry Category', answer: data.category },
        { fieldKey: 'message', question: 'Message', answer: data.message },
      ],
    }),
  });
  return handleResponse(response);
}

export async function submitSalesForm(data: SalesFormData): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE}/submit-form`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      formName: 'Sales Inquiry',
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      businessName: data.company,
      website: data.website,
      role: data.role,
      pipelineStageName: 'New Lead',
      answers: [
        { fieldKey: 'company_size', question: 'Company Size', answer: data.employees },
        { fieldKey: 'budget', question: 'Monthly Budget', answer: data.budget || 'Not specified' },
        { fieldKey: 'interests', question: 'Interests', answer: data.interests.join(', ') },
        { fieldKey: 'message', question: 'Additional Notes', answer: data.message || '' },
      ],
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
