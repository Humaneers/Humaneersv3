
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getZohoAccessToken } from "./_lib/zoho.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const checks = {
        ZOHO_CLIENT_ID: !!process.env.ZOHO_CLIENT_ID ? "Set" : "MISSING",
        ZOHO_CLIENT_SECRET: !!process.env.ZOHO_CLIENT_SECRET ? "Set" : "MISSING",
        ZOHO_REFRESH_TOKEN: !!process.env.ZOHO_REFRESH_TOKEN ? "Set" : "MISSING",
        ZOHO_ACCOUNTS_DOMAIN: process.env.ZOHO_ACCOUNTS_DOMAIN || "accounts.zoho.com (default)",
        ZOHO_API_DOMAIN: process.env.ZOHO_API_DOMAIN || "www.zohoapis.com (default)",
        NODE_ENV: process.env.NODE_ENV
    };

    let tokenStatus = "Not attempted";
    let tokenError = null;

    try {
        console.log("Diagnostics: Attempting to fetch Zoho token...");
        await getZohoAccessToken();
        tokenStatus = "Success - Connection Established";
    } catch (e) {
        console.error("Diagnostics: Token fetch failed", e);
        tokenStatus = "Failed";
        tokenError = e instanceof Error ? e.message : String(e);
    }

    res.status(200).json({
        config: checks,
        connectivity: {
            status: tokenStatus,
            error: tokenError
        },
        timestamp: new Date().toISOString()
    });
}
