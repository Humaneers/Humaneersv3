import type { VercelRequest, VercelResponse } from '@vercel/node';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  category?: string;
  message?: string;
}

interface SalesFormData {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  website?: string;
  role?: string;
  phone?: string;
  employees?: string;
  budget?: string;
  interests?: string[];
  message?: string;
}

type FormData = (ContactFormData | SalesFormData) & { formType?: 'contact' | 'sales' };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const zohoCrmEmail = process.env.ZOHO_CRM_EMAIL;

  if (!resendApiKey || !zohoCrmEmail) {
    console.error('Missing RESEND_API_KEY or ZOHO_CRM_EMAIL');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const body = req.body as FormData;

    if (!body.firstName || !body.lastName || !body.email) {
      return res.status(400).json({ error: 'Missing required fields: firstName, lastName, email' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const isSalesForm = body.formType === 'sales' || 'company' in body || 'interests' in body;
    const formType = isSalesForm ? 'Sales Inquiry' : 'Contact Form';

    // Build email content for Zoho CRM email parser
    // Format fields clearly so Zoho can parse them
    let emailBody = `
Name: ${body.firstName} ${body.lastName}
Email: ${body.email}
Phone: ${body.phone || 'Not provided'}
`;

    if (isSalesForm) {
      const salesData = body as SalesFormData;
      emailBody += `
Company: ${salesData.company || 'Not provided'}
Website: ${salesData.website || 'Not provided'}
Role: ${salesData.role || 'Not provided'}
Company Size: ${salesData.employees || 'Not provided'}
Budget: ${salesData.budget || 'Not provided'}
Interests: ${salesData.interests?.join(', ') || 'Not specified'}

Message:
${salesData.message || 'No message provided'}
`;
    } else {
      const contactData = body as ContactFormData;
      emailBody += `
Category: ${contactData.category || 'General'}

Message:
${contactData.message || 'No message provided'}
`;
    }

    // Send to Zoho CRM via email
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${body.firstName} ${body.lastName} <noreply@humaneers.dev>`,
        to: [zohoCrmEmail],
        reply_to: body.email,
        subject: `[${formType}] ${body.firstName} ${body.lastName}`,
        text: emailBody.trim(),
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error('Resend API error:', emailResponse.status, errorData);
      return res.status(502).json({ error: 'Failed to submit form' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Form submission error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
