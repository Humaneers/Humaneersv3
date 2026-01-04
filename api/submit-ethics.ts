import type { VercelRequest, VercelResponse } from '@vercel/node';

interface EthicsReport {
  isAnonymous: boolean;
  name?: string;
  email?: string;
  reportType: string;
  details: string;
}

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

  const apiKey = process.env.MOXIE_API_KEY;
  const baseUrl = process.env.MOXIE_BASE_URL;

  if (!apiKey || !baseUrl) {
    console.error('Missing Moxie API configuration');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const body = req.body as EthicsReport;

    if (!body.details || !body.reportType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Build Moxie payload for ethics report
    const moxiePayload = {
      formName: 'Ethics Report',
      firstName: body.isAnonymous ? 'Anonymous' : (body.name?.split(' ')[0] || 'Anonymous'),
      lastName: body.isAnonymous ? 'Reporter' : (body.name?.split(' ').slice(1).join(' ') || 'Reporter'),
      email: body.isAnonymous ? 'ethics-anonymous@humaneers.dev' : body.email,
      notes: `[${body.reportType.toUpperCase()}] ${body.details}`,
      answers: [
        {
          fieldKey: 'report_type',
          question: 'Report Type',
          answer: body.reportType,
        },
        {
          fieldKey: 'is_anonymous',
          question: 'Anonymous Submission',
          answer: body.isAnonymous ? 'Yes' : 'No',
        },
        {
          fieldKey: 'incident_details',
          question: 'Incident Details',
          answer: body.details,
        },
      ],
    };

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
      return res.status(502).json({ error: 'Failed to submit report' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Ethics report submission error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
