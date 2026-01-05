import type { VercelRequest, VercelResponse } from '@vercel/node';

interface SupportTicket {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  priority: string;
  category: string;
  subject: string;
  description: string;
}

const PRIORITY_LABELS: Record<string, string> = {
  critical: 'P1 - Critical',
  high: 'P2 - High',
  medium: 'P3 - Medium',
  low: 'P4 - Low',
};

const CATEGORY_LABELS: Record<string, string> = {
  technical: 'Technical Issue',
  account: 'Account / Billing',
  security: 'Security Concern',
  feature: 'Feature Request',
  other: 'Other',
};

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
  const zohoDeskEmail = process.env.ZOHO_DESK_EMAIL;

  if (!resendApiKey || !zohoDeskEmail) {
    console.error('Missing RESEND_API_KEY or ZOHO_DESK_EMAIL');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const body = req.body as SupportTicket;

    if (!body.name || !body.email || !body.subject || !body.description || !body.priority || !body.category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const ticketId = `TKT-${Date.now().toString(36).toUpperCase()}`;
    const priorityLabel = PRIORITY_LABELS[body.priority] || body.priority;
    const categoryLabel = CATEGORY_LABELS[body.category] || body.category;

    // Build email content for Zoho Desk
    // Zoho Desk will create a ticket from this email
    const emailBody = `
Priority: ${priorityLabel}
Category: ${categoryLabel}
${body.phone ? `Phone: ${body.phone}` : ''}
${body.company ? `Company: ${body.company}` : ''}
Internal Ticket ID: ${ticketId}

---

${body.description}
`.trim();

    // Send to Zoho Desk via email - ticket created automatically
    // Using the submitter's email as the "from" address via reply_to
    // so Zoho Desk associates the ticket with the correct contact
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${body.name} <support@humaneers.dev>`,
        to: [zohoDeskEmail],
        reply_to: body.email,
        subject: `[${priorityLabel}] ${body.subject}`,
        text: emailBody,
        headers: {
          'X-Customer-Email': body.email,
          'X-Customer-Name': body.name,
        },
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error('Resend API error:', emailResponse.status, errorData);
      return res.status(502).json({ error: 'Failed to submit support ticket' });
    }

    return res.status(200).json({
      success: true,
      ticketId,
    });
  } catch (error) {
    console.error('Support ticket submission error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
