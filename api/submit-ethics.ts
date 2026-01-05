import type { VercelRequest, VercelResponse } from '@vercel/node';

interface EthicsReport {
  isAnonymous: boolean;
  name?: string;
  email?: string;
  reportType: string;
  details: string;
}

const reportTypeLabels: Record<string, string> = {
  general: 'General Ethics Concern',
  fraud: 'Fraud / Corruption',
  harassment: 'Harassment / Discrimination',
  security: 'Security / Data Breach',
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
  const zohoCrmEmail = process.env.ZOHO_CRM_EMAIL;

  if (!resendApiKey || !zohoCrmEmail) {
    console.error('Missing RESEND_API_KEY or ZOHO_CRM_EMAIL');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const body = req.body as EthicsReport;

    if (!body.details || !body.reportType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const reportTypeLabel = reportTypeLabels[body.reportType] || body.reportType;

    // Parse name for non-anonymous submissions
    let reporterName = 'Anonymous Reporter';
    let reporterEmail = 'ethics-anonymous@humaneers.dev';

    if (!body.isAnonymous && body.name) {
      reporterName = body.name.trim();
      reporterEmail = body.email || reporterEmail;
    }

    // Build email content for Zoho CRM
    const emailBody = `
Name: ${reporterName}
Email: ${reporterEmail}
Company: Ethics Report

Report Type: ${reportTypeLabel}
Anonymous: ${body.isAnonymous ? 'Yes' : 'No'}

Incident Details:
${body.details}
`.trim();

    // Send to Zoho CRM via email
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Ethics Hotline <ethics@humaneers.dev>',
        to: [zohoCrmEmail],
        reply_to: reporterEmail,
        subject: `[Ethics Report] ${reportTypeLabel}`,
        text: emailBody,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error('Resend API error:', emailResponse.status, errorData);
      return res.status(502).json({ error: 'Failed to submit report' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Ethics report submission error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
