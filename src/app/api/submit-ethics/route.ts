import { NextRequest, NextResponse } from "next/server";
import { getZohoAccessToken } from "@/lib/zoho/client";

interface EthicsData {
  isAnonymous: boolean;
  name?: string;
  email?: string;
  reportType: string;
  details: string;
}

export async function POST(req: NextRequest) {
  try {
    const data: EthicsData = await req.json();

    // Validate required fields
    if (!data.details || !data.reportType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const accessToken = await getZohoAccessToken();
    let apiDomain = process.env.ZOHO_API_DOMAIN || "desk.zoho.com";
    if (apiDomain.includes("accounts.zoho")) {
      apiDomain = "desk.zoho.com";
    }
    const orgId = process.env.ZOHO_DESK_ORG_ID;

    if (!orgId) {
      console.warn("ZOHO_DESK_ORG_ID not set. Ethics report cannot be filed to Desk.");
      return NextResponse.json({ error: "Configuration error" }, { status: 500 });
    }

    const departmentId = process.env.ZOHO_DESK_DEPARTMENT_ID;

    // Handle Anonymity
    const contact = data.isAnonymous
      ? {
          firstName: "Anonymous",
          lastName: "Reporter",
          email: "ethics@humaneers.dev", // Internal placeholder
          phone: null,
        }
      : {
          firstName: data.name?.split(" ")[0] || "Unknown",
          lastName: data.name?.split(" ").slice(1).join(" ") || "Reporter",
          email: data.email || "ethics@humaneers.dev",
          phone: null,
        };

    const ticketPayload = {
      subject: `Ethics Report: ${data.reportType.toUpperCase()}`,
      description: `CONFIDENTIAL ETHICS REPORT\n\nType: ${data.reportType}\nAnonymous: ${data.isAnonymous}\n\nDetails:\n${data.details}`,
      priority: "High",
      classification: "Ethics",
      contact: contact,
      channel: "Website",
      ...(departmentId && { departmentId }),
    };

    const response = await fetch("https://desk.zoho.com/api/v1/tickets", {
      method: "POST",
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        orgId: orgId,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticketPayload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Zoho Desk Ethics error:", result);
      return NextResponse.json(
        { error: result.message || "Failed to submit ethics report" },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      ticketNumber: result.ticketNumber,
      id: result.id,
    });
  } catch (error) {
    console.error("Ethics submission error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
