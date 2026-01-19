import type { VercelRequest, VercelResponse } from "@vercel/node";

interface TokenResponse {
    access_token: string;
    expires_in: number;
    error?: string;
}

// In-memory cache for access token (works per-instance, short-lived in serverless)
let cachedToken: { token: string; expiresAt: number } | null = null;

/**
 * Get a valid Zoho access token, refreshing if necessary.
 */
export async function getZohoAccessToken(): Promise<string> {
    // Check cache
    if (cachedToken && Date.now() < cachedToken.expiresAt) {
        return cachedToken.token;
    }

    const clientId = process.env.ZOHO_CLIENT_ID;
    const clientSecret = process.env.ZOHO_CLIENT_SECRET;
    const refreshToken = process.env.ZOHO_REFRESH_TOKEN;
    const accountsDomain = process.env.ZOHO_ACCOUNTS_DOMAIN || "accounts.zoho.com";

    if (!clientId || !clientSecret || !refreshToken) {
        throw new Error("Missing Zoho OAuth credentials");
    }

    const response = await fetch(`https://${accountsDomain}/oauth/v2/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            client_id: clientId,
            client_secret: clientSecret,
            refresh_token: refreshToken,
        }),
    });

    if (!response.ok) {
        const text = await response.text();
        console.error("Zoho token refresh failed:", text);
        throw new Error("Failed to refresh Zoho access token");
    }

    const data: TokenResponse = await response.json();

    if (data.error) {
        throw new Error(`Zoho OAuth error: ${data.error}`);
    }

    // Cache with 5 minute buffer before expiry
    cachedToken = {
        token: data.access_token,
        expiresAt: Date.now() + (data.expires_in - 300) * 1000,
    };

    return data.access_token;
}

// Optional: Expose as endpoint for testing (can be removed in production)
export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const token = await getZohoAccessToken();
        // Don't expose the full token, just confirm it works
        return res.status(200).json({
            success: true,
            tokenPreview: token.substring(0, 10) + "..."
        });
    } catch (error) {
        console.error("Auth check failed:", error);
        return res.status(500).json({
            error: error instanceof Error ? error.message : "Auth failed"
        });
    }
}
