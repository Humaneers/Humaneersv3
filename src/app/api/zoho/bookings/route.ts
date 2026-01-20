import { NextRequest, NextResponse } from "next/server";
import { getZohoAccessToken } from "@/lib/zoho/client";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const action = searchParams.get("action");

        // Default to fetchworkspaces if no action
        const endpoint = action || "fetchworkspaces";

        const accessToken = await getZohoAccessToken();
        const apiDomain = process.env.ZOHO_API_DOMAIN || "www.zohoapis.com";

        // Map actions to Bookings API endpoints
        // Note: Zoho Bookings API structure usually follows /bookings/v1/json/<action>
        const url = `https://${apiDomain}/bookings/v1/json/${endpoint}?${searchParams.toString()}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Zoho-oauthtoken ${accessToken}`,
            },
        });

        if (!response.ok) {
            const text = await response.text();
            return NextResponse.json(
                { error: `Zoho API Error: ${response.status}`, details: text },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Zoho Bookings Proxy Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error", details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const action = searchParams.get("action");

        if (!action) {
            return NextResponse.json({ error: "Missing 'action' parameter" }, { status: 400 });
        }

        const body = await req.json();
        const accessToken = await getZohoAccessToken();
        const apiDomain = process.env.ZOHO_API_DOMAIN || "www.zohoapis.com";

        // Construct POST URL
        const url = `https://${apiDomain}/bookings/v1/json/${action}`;

        // Zoho Bookings often expects form-data or params, ensuring we pass what's needed.
        // For appointments, it's usually POST with body params. 
        // We will proxy the body as URLSearchParams if Zoho requires it, or JSON.
        // Documentation says POST /appointment usually takes form-data or params.
        // Let's try sending standard JSON if supported, or form encoded.
        // Standard Zoho Bookings usually accepts x-www-form-urlencoded.

        const params = new URLSearchParams();
        Object.keys(body).forEach(key => params.append(key, body[key]));

        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Zoho-oauthtoken ${accessToken}`,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: params
        });

        if (!response.ok) {
            const text = await response.text();
            return NextResponse.json(
                { error: `Zoho API Error: ${response.status}`, details: text },
                { status: response.status }
            );
        }

        const responseData = await response.json();
        return NextResponse.json(responseData);

    } catch (error) {
        console.error("Zoho Bookings POST Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error", details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
