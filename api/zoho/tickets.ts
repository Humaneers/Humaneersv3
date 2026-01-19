import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getZohoAccessToken } from "../_lib/zoho.js";

interface TicketData {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    priority: string;
    category: string;
    subject: string;
    description: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const data: TicketData = req.body;

        // Validate required fields
        if (!data.name || !data.email || !data.subject || !data.description) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const accessToken = await getZohoAccessToken();
        let apiDomain = process.env.ZOHO_API_DOMAIN || "desk.zoho.com";
        // Fix common misconfiguration
        if (apiDomain.includes("accounts.zoho")) {
            console.warn("Fixing misconfigured ZOHO_API_DOMAIN for Desk");
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

        // Map category to department (you may need to adjust departmentId)
        const departmentId = process.env.ZOHO_DESK_DEPARTMENT_ID;

        const ticketPayload = {
            subject: data.subject,
            description: data.description,
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
            return res.status(response.status).json({
                error: result.message || "Failed to create ticket in Zoho Desk",
            });
        }

        return res.status(200).json({
            success: true,
            ticketNumber: result.ticketNumber,
            id: result.id,
        });
    } catch (error) {
        console.error("Ticket submission error:", error);
        return res.status(500).json({
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
