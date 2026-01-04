import type { VercelRequest, VercelResponse } from '@vercel/node';

interface FormSubmission {
  formName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  businessName?: string;
  website?: string;
  role?: string;
  notes?: string;
  pipelineStageName?: string;
  answers?: Array<{
    fieldKey: string;
    question: string;
    answer: string;
  }>;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.MOXIE_API_KEY;
  const baseUrl = process.env.MOXIE_BASE_URL;

  if (!apiKey || !baseUrl) {
    console.error('Missing Moxie API configuration');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const body = req.body as FormSubmission;

    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email) {
      return res.status(400).json({ error: 'Missing required fields: firstName, lastName, email' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Build Moxie payload
    const moxiePayload: FormSubmission = {
      formName: body.formName || 'Website Inquiry',
      firstName: body.firstName.trim(),
      lastName: body.lastName.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim(),
      businessName: body.businessName?.trim(),
      website: body.website?.trim(),
      role: body.role?.trim(),
      notes: body.notes?.trim(),
      pipelineStageName: body.pipelineStageName,
      answers: body.answers,
    };

    // Submit to Moxie
    const moxieResponse = await fetch(`${baseUrl}/action/formSubmissions/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-API-KEY': apiKey,
      },
      body: JSON.stringify(moxiePayload),
    });

    if (!moxieResponse.ok) {
      const errorText = await moxieResponse.text();
      console.error('Moxie API error:', moxieResponse.status, errorText);
      return res.status(502).json({ error: 'Failed to submit to CRM' });
    }

    const result = await moxieResponse.json();
    return res.status(200).json({ success: true, id: result.id });
  } catch (error) {
    console.error('Form submission error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
