import { NextRequest, NextResponse } from "next/server";
import { getZohoAccessToken } from "@/lib/zoho/client";

export async function GET(_req: NextRequest) {
  const checks = {
    ZOHO_CLIENT_ID: process.env.ZOHO_CLIENT_ID ? "Set" : "MISSING",
    ZOHO_CLIENT_SECRET: process.env.ZOHO_CLIENT_SECRET ? "Set" : "MISSING",
    ZOHO_REFRESH_TOKEN: process.env.ZOHO_REFRESH_TOKEN ? "Set" : "MISSING",
    ZOHO_ACCOUNTS_DOMAIN: process.env.ZOHO_ACCOUNTS_DOMAIN || "accounts.zoho.com (default)",
    ZOHO_API_DOMAIN: process.env.ZOHO_API_DOMAIN || "www.zohoapis.com (default)",
    NODE_ENV: process.env.NODE_ENV,
  };

  let tokenStatus = "Not attempted";
  let tokenError = null;

  try {
    await getZohoAccessToken();
    tokenStatus = "Success - Connection Established";
  } catch (e) {
    console.error("Diagnostics: Token fetch failed", e);
    tokenStatus = "Failed";
    tokenError = e instanceof Error ? e.message : String(e);
  }

  return NextResponse.json({
    config: checks,
    connectivity: {
      status: tokenStatus,
      error: tokenError,
    },
    timestamp: new Date().toISOString(),
  });
}
