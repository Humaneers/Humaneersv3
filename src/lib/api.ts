/**
 * API Client (Legacy)
 *
 * This file previously contained Zoho API integration functions.
 * Forms now use Cal.com headless routing instead.
 *
 * @see src/lib/cal.ts for the new Cal.com integration
 */

// Ethics form still uses a separate submission system (if needed)
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
    throw new Error(data.error || "Something went wrong. Please try again.");
  }
  return response.json();
}

// Ethics reporting endpoint (if you still need this functionality)
export async function submitEthicsReport(data: EthicsFormData): Promise<ApiResponse> {
  const response = await fetch(`/api/submit-ethics`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}
