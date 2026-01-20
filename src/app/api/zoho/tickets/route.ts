import { NextRequest, NextResponse } from "next/server";
import { getZohoAccessToken } from "@/lib/zoho/client";

interface TicketData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  priority: string;
  category: string;
  subject: string;
  description: string;
  context?: string;
}

export async function POST(req: NextRequest) {
  try {
    const data: TicketData = await req.json();

    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const accessToken = await getZohoAccessToken();
    let apiDomain = process.env.ZOHO_API_DOMAIN || "desk.zoho.com";
    if (apiDomain.includes("accounts.zoho")) {
      apiDomain = "desk.zoho.com";
    }
    const orgId = process.env.ZOHO_DESK_ORG_ID;

    if (!orgId) {
      throw new Error("ZOHO_DESK_ORG_ID is not configured");
    }

    // Map priority to Zoho Desk format
    const priorityMap: Record<string, string> = {
      critical: "High",
      high: "High",
      medium: "Medium",
      low: "Low",
    };

    const departmentId = process.env.ZOHO_DESK_DEPARTMENT_ID;

    const ticketPayload = {
      subject: data.subject,
      description: data.context ? `${data.description}\n\n${data.context}` : data.description,
      priority: priorityMap[data.priority] || "Medium",
      classification: data.category,
      contact: {
        firstName: data.name.split(" ")[0],
        lastName: data.name.split(" ").slice(1).join(" ") || data.name,
        email: data.email,
        phone: data.phone || null,
      },
      cf: {
        cf_company: data.company || null,
      },
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
      console.error("Zoho Desk error:", result);
      return NextResponse.json(
        { error: result.message || "Failed to create ticket in Zoho Desk" },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      ticketNumber: result.ticketNumber,
      id: result.id,
    });
  } catch (error) {
    console.error("Ticket submission error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
