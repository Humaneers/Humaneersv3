import { NextRequest, NextResponse } from "next/server";
import { getZohoAccessToken } from "@/lib/zoho/client";
import { deriveLeadSource } from "@/lib/zoho/leadSource";

interface NewsletterData {
  email: string;
  source?: string;
  context?: string;
}

export async function POST(req: NextRequest) {
  try {
    const data: NewsletterData = await req.json();

    if (!data.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const accessToken = await getZohoAccessToken();
    let apiDomain = process.env.ZOHO_API_DOMAIN || "www.zohoapis.com";
    if (apiDomain.includes("accounts.zoho")) {
      apiDomain = "www.zohoapis.com";
    }

    const ipCountry = req.headers.get("x-vercel-ip-country") || undefined;
    const ipCity = req.headers.get("x-vercel-ip-city") || undefined;

    const referrerMatch = data.context?.match(/Ref:\s*([^|]+)/);
    const referrer = referrerMatch ? referrerMatch[1].trim() : undefined;

    const leadSource =
      deriveLeadSource(data.context, referrer) || `Newsletter - ${data.source || "Website"}`;

    let description = "";
    if (ipCountry || ipCity) {
      const location = [ipCity, ipCountry].filter(Boolean).join(", ");
      description += `Location: ${location}\n\n`;
    }
    if (data.context) {
      description += data.context;
    }

    const leadPayload = {
      data: [
        {
          Email: data.email,
          Last_Name: data.email.split("@")[0],
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

    const result = await response.json();

    if (!response.ok) {
      console.error("Zoho CRM newsletter error:", result);
      return NextResponse.json(
        { error: result.message || "Failed to subscribe" },
        { status: response.status }
      );
    }

    if (result.data?.[0]?.code === "SUCCESS") {
      return NextResponse.json({
        success: true,
        id: result.data[0].details.id,
      });
    } else if (result.data?.[0]?.code === "DUPLICATE_DATA") {
      return NextResponse.json({
        success: true,
        message: "Already subscribed",
      });
    } else {
      return NextResponse.json(
        { error: result.data?.[0]?.message || "Failed to subscribe" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
