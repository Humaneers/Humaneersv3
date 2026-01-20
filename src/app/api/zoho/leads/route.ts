import { NextRequest, NextResponse } from "next/server";
import { getZohoAccessToken } from "@/lib/zoho/client";
import { deriveLeadSource } from "@/lib/zoho/leadSource";

interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  website?: string;
  role: string;
  phone?: string;
  employees: string;
  budget?: string;
  interests?: string;
  message?: string;
  context?: string;
}

export async function POST(req: NextRequest) {
  try {
    const data: LeadData = await req.json();

    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const accessToken = await getZohoAccessToken();
    let apiDomain = process.env.ZOHO_API_DOMAIN || "www.zohoapis.com";
    // Fix common misconfiguration where users set API domain to accounts domain
    if (apiDomain.includes("accounts.zoho")) {
      apiDomain = "www.zohoapis.com";
    }

    // Capture geographic data from headers (Vercel specific)
    const ipCountry = req.headers.get("x-vercel-ip-country") || undefined;
    const ipCity = req.headers.get("x-vercel-ip-city") || undefined;

    // Extract referrer from context if available
    const referrerMatch = data.context?.match(/Ref:\s*([^|]+)/);
    const referrer = referrerMatch ? referrerMatch[1].trim() : undefined;

    // Derive dynamic lead source
    const leadSource = deriveLeadSource(data.context, referrer);

    // Map form data to Zoho CRM Lead fields
    const leadPayload = {
      data: [
        {
          First_Name: data.firstName,
          Last_Name: data.lastName,
          Email: data.email,
          Company: data.company || `${data.lastName} Household`,
          Website: data.website || null,
          Designation: data.role,
          Phone: data.phone || null,
          No_of_Employees: mapEmployeeRange(data.employees),
          Lead_Source: leadSource,
          Description: formatDescription(data, ipCountry, ipCity),
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
      console.error("Zoho CRM error:", result);
      return NextResponse.json(
        { error: result.message || "Failed to create lead in Zoho CRM" },
        { status: response.status }
      );
    }

    // Check for Zoho-specific errors in the response
    if (result.data?.[0]?.code === "SUCCESS") {
      return NextResponse.json({
        success: true,
        id: result.data[0].details.id,
      });
    } else {
      return NextResponse.json(
        { error: result.data?.[0]?.message || "Failed to create lead" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}

function mapEmployeeRange(employees: string): number | null {
  const ranges: Record<string, number> = {
    "1-10": 5,
    "11-50": 30,
    "51-200": 100,
    "201+": 350,
    "201-500": 350,
    "501-1000": 750,
    "1001-5000": 3000,
    "5000+": 10000,
  };
  return ranges[employees] || null;
}

function formatDescription(data: LeadData, ipCountry?: string, ipCity?: string): string {
  const parts: string[] = [];

  if (data.budget) {
    parts.push(`Budget: ${data.budget}`);
  }
  if (data.interests) {
    parts.push(`Interests: ${data.interests}`);
  }
  if (data.message) {
    parts.push(`Message: ${data.message}`);
  }
  if (ipCountry || ipCity) {
    const location = [ipCity, ipCountry].filter(Boolean).join(", ");
    parts.push(`Location: ${location}`);
  }
  if (data.context) {
    parts.push(data.context);
  }

  return parts.join("\n\n") || "No additional details provided.";
}
