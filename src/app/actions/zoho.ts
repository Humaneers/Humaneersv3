"use server";

import { getZohoAccessToken } from "@/lib/zoho/client";
import { deriveLeadSource } from "@/lib/zoho/leadSource";
import { headers } from "next/headers";

/**
 * Server Action to submit a lead to Zoho CRM
 */
export async function submitLeadAction(formData: FormData) {
  try {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const company = formData.get("company") as string;
    const website = formData.get("website") as string;
    const role = formData.get("role") as string;
    const phone = formData.get("phone") as string;
    const employees = formData.get("employees") as string;
    const budget = formData.get("budget") as string;
    const interests = formData.getAll("interests") as string[];
    const message = formData.get("message") as string;
    const source = formData.get("source") as string;
    const context = formData.get("context") as string;

    if (!firstName || !lastName || !email) {
      return { success: false, error: "Missing required fields" };
    }

    const accessToken = await getZohoAccessToken();
    const h = await headers();
    const ipCountry = h.get("x-vercel-ip-country") || undefined;
    const ipCity = h.get("x-vercel-ip-city") || undefined;

    const leadSource = deriveLeadSource(context, undefined); // Referrer hard to get in Server Action without extra work

    const apiDomain = process.env.ZOHO_API_DOMAIN || "www.zohoapis.com";

    const leadPayload = {
      data: [
        {
          First_Name: firstName,
          Last_Name: lastName,
          Email: email,
          Company: company || `${lastName} Household`,
          Website: website || null,
          Designation: role,
          Phone: phone || null,
          No_of_Employees: mapEmployeeRange(employees),
          Lead_Source: leadSource || source || "Website Contact Form",
          Description: formatDescription(
            { budget, interests: interests.join(", "), message, context },
            ipCountry,
            ipCity
          ),
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
      return { success: false, error: result.message || "Zoho CRM error" };
    }

    if (result.data?.[0]?.code === "SUCCESS") {
      return { success: true, id: result.data[0].details.id };
    } else {
      return { success: false, error: result.data?.[0]?.message || "Submission failed" };
    }
  } catch (err) {
    console.error("Action error:", err);
    return { success: false, error: err instanceof Error ? err.message : "Internal error" };
  }
}

/**
 * Server Action for Newsletter subscription
 */
export async function submitNewsletterAction(
  email: string,
  source: string = "Website",
  context?: string
) {
  try {
    if (!email) return { success: false, error: "Email required" };

    const accessToken = await getZohoAccessToken();
    const h = await headers();
    const ipCountry = h.get("x-vercel-ip-country") || undefined;
    const ipCity = h.get("x-vercel-ip-city") || undefined;

    const apiDomain = process.env.ZOHO_API_DOMAIN || "www.zohoapis.com";

    const leadPayload = {
      data: [
        {
          Email: email,
          Last_Name: email.split("@")[0],
          Company: "Newsletter Subscriber",
          Lead_Source: `Newsletter - ${source}`,
          Lead_Status: "Newsletter Subscriber",
          Description: context || `Location: ${ipCity}, ${ipCountry}`,
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

    if (result.data?.[0]?.code === "SUCCESS" || result.data?.[0]?.code === "DUPLICATE_DATA") {
      return { success: true };
    }

    return { success: false, error: result.data?.[0]?.message || "Failed to subscribe" };
  } catch {
    return { success: false, error: "Internal error" };
  }
}

function mapEmployeeRange(employees: string): number | null {
  const ranges: Record<string, number> = {
    "1-10": 5,
    "11-50": 30,
    "51-200": 100,
    "201+": 350,
  };
  return ranges[employees] || null;
}

interface DescriptionData {
  budget?: string;
  interests?: string;
  message?: string;
  context?: string;
}

function formatDescription(data: DescriptionData, ipCountry?: string, ipCity?: string): string {
  const parts = [];
  if (data.budget) parts.push(`Budget: ${data.budget}`);
  if (data.interests) parts.push(`Interests: ${data.interests}`);
  if (data.message) parts.push(`Message: ${data.message}`);
  if (ipCountry || ipCity) parts.push(`Location: ${ipCity}, ${ipCountry}`);
  if (data.context) parts.push(data.context);
  return parts.join("\n\n");
}
