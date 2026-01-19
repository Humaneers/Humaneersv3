import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getZohoAccessToken } from "../_lib/zoho.js";
import { deriveLeadSource } from "./_lib/leadSource";

interface NewsletterData {
  email: string;
  source?: string;
  context?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data: NewsletterData = req.body;

    if (!data.email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const accessToken = await getZohoAccessToken();
    let apiDomain = process.env.ZOHO_API_DOMAIN || "www.zohoapis.com";
    // Fix common misconfiguration where users set API domain to accounts domain
    if (apiDomain.includes("accounts.zoho")) {
      console.warn("Fixing misconfigured ZOHO_API_DOMAIN (should not be accounts.*)");
      apiDomain = "www.zohoapis.com";
    }

    // Capture geographic data from headers
    const ipCountry = req.headers["x-vercel-ip-country"] as string | undefined;
    const ipCity = req.headers["x-vercel-ip-city"] as string | undefined;

    // Extract referrer from context if available
    const referrerMatch = data.context?.match(/Ref:\s*([^|]+)/);
    const referrer = referrerMatch ? referrerMatch[1].trim() : undefined;

    // Derive dynamic lead source for newsletters
    const leadSource =
      deriveLeadSource(data.context, referrer) || `Newsletter - ${data.source || "Website"}`;

    // Enhanced description with geographic and context data
    let description = "";
    if (ipCountry || ipCity) {
      const location = [ipCity, ipCountry].filter(Boolean).join(", ");
      description += `Location: ${location}\n\n`;
    }
    if (data.context) {
      description += data.context;
    }

    // Create a lead in Zoho CRM with newsletter source
    const leadPayload = {
      data: [
        {
          Email: data.email,
          Last_Name: data.email.split("@")[0], // Use email prefix as placeholder
          Company: "Newsletter Subscriber",
          Lead_Source: leadSource,
          Lead_Status: "Newsletter Subscriber",
          Description: description || undefined,
        },
      ],
      trigger: ["workflow"],
    };

    const response = await fetch(`https://${apiDomain}/crm/v2/Leads`, {
      method: "POST",
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leadPayload),
    });

    const text = await response.text();
    let result;
    try {
      result = JSON.parse(text);
    } catch (e) {
      console.error("Invalid JSON from Zoho CRM:", text);
      throw new Error(`Invalid JSON from Zoho CRM: ${text.substring(0, 100)}`);
    }

    if (!response.ok) {
      console.error("Zoho CRM newsletter error:", result);
      return res.status(response.status).json({
        error: result.message || "Failed to subscribe",
      });
    }

    if (result.data?.[0]?.code === "SUCCESS") {
      return res.status(200).json({
        success: true,
        id: result.data[0].details.id,
      });
    } else if (result.data?.[0]?.code === "DUPLICATE_DATA") {
      // Already subscribed is still a success
      return res.status(200).json({
        success: true,
        message: "Already subscribed",
      });
    } else {
      return res.status(400).json({
        error: result.data?.[0]?.message || "Failed to subscribe",
      });
    }
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}
