import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getZohoAccessToken } from "../_lib/zoho.js";

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const data: LeadData = req.body;

        // Validate required fields
        if (!data.firstName || !data.lastName || !data.email || !data.company) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const accessToken = await getZohoAccessToken();
        let apiDomain = process.env.ZOHO_API_DOMAIN || "www.zohoapis.com";
        // Fix common misconfiguration where users set API domain to accounts domain
        if (apiDomain.includes("accounts.zoho")) {
            console.warn("Fixing misconfigured ZOHO_API_DOMAIN (should not be accounts.*)");
            apiDomain = "www.zohoapis.com";
        }

        // Map form data to Zoho CRM Lead fields
        const leadPayload = {
            data: [
                {
                    First_Name: data.firstName,
                    Last_Name: data.lastName,
                    Email: data.email,
                    Company: data.company,
                    Website: data.website || null,
                    Designation: data.role,
                    Phone: data.phone || null,
                    No_of_Employees: mapEmployeeRange(data.employees),
                    Lead_Source: "Website - Talk to Sales",
                    Description: formatDescription(data),
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
            return res.status(response.status).json({
                error: result.message || "Failed to create lead in Zoho CRM",
            });
        }

        // Check for Zoho-specific errors in the response
        if (result.data?.[0]?.code === "SUCCESS") {
            return res.status(200).json({
                success: true,
                id: result.data[0].details.id,
            });
        } else {
            return res.status(400).json({
                error: result.data?.[0]?.message || "Failed to create lead",
            });
        }
    } catch (error) {
        console.error("Lead submission error:", error);
        return res.status(500).json({
            error: error instanceof Error ? error.message : "Internal server error",
        });
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

function formatDescription(data: LeadData): string {
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
    if (data.context) {
        parts.push(data.context);
    }

    return parts.join("\n\n") || "No additional details provided.";
}
