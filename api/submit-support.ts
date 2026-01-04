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

  if (!resendApiKey) {
    console.error('Missing RESEND_API_KEY');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const body = req.body as SupportTicket;

    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.description || !body.priority || !body.category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const ticketId = `TKT-${Date.now().toString(36).toUpperCase()}`;
    const priorityLabel = PRIORITY_LABELS[body.priority] || body.priority;
    const categoryLabel = CATEGORY_LABELS[body.category] || body.category;

    // Build email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1B263B; padding: 20px; text-align: center;">
          <h1 style="color: #B87333; margin: 0;">New Support Ticket</h1>
          <p style="color: #fff; margin: 10px 0 0 0;">Ticket ID: ${ticketId}</p>
        </div>

        <div style="padding: 20px; background: #f5f5f5;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; width: 30%;">Priority</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; color: ${body.priority === 'critical' ? '#dc2626' : body.priority === 'high' ? '#ea580c' : '#1B263B'}; font-weight: bold;">${priorityLabel}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Category</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${categoryLabel}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Name</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${body.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Email</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><a href="mailto:${body.email}">${body.email}</a></td>
            </tr>
            ${body.phone ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Phone</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${body.phone}</td>
            </tr>
            ` : ''}
            ${body.company ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Company</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${body.company}</td>
            </tr>
            ` : ''}
          </table>

          <div style="margin-top: 20px; background: #fff; padding: 15px; border-radius: 4px;">
            <h3 style="margin: 0 0 10px 0; color: #1B263B;">Subject</h3>
            <p style="margin: 0; color: #333;">${body.subject}</p>
          </div>

          <div style="margin-top: 15px; background: #fff; padding: 15px; border-radius: 4px;">
            <h3 style="margin: 0 0 10px 0; color: #1B263B;">Description</h3>
            <p style="margin: 0; color: #333; white-space: pre-wrap;">${body.description}</p>
          </div>
        </div>

        <div style="background: #1B263B; padding: 15px; text-align: center;">
          <p style="color: #888; margin: 0; font-size: 12px;">
            This ticket was submitted via humaneers.dev/support
          </p>
        </div>
      </div>
    `;

    const emailText = `
New Support Ticket - ${ticketId}

Priority: ${priorityLabel}
Category: ${categoryLabel}

Contact Information:
- Name: ${body.name}
- Email: ${body.email}
${body.phone ? `- Phone: ${body.phone}` : ''}
${body.company ? `- Company: ${body.company}` : ''}

Subject: ${body.subject}

Description:
${body.description}

---
Submitted via humaneers.dev/support
    `.trim();

    // Send email via Resend
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Humaneers Support <support@humaneers.dev>',
        to: ['ccs-autosupport@humaneers.dev'],
        reply_to: body.email,
        subject: `[${priorityLabel}] ${body.subject} - ${ticketId}`,
        html: emailHtml,
        text: emailText,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error('Resend API error:', emailResponse.status, errorData);
      return res.status(502).json({ error: 'Failed to send support ticket' });
    }

    return res.status(200).json({ success: true, ticketId });
  } catch (error) {
    console.error('Support ticket submission error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
