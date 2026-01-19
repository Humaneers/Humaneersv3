
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

    // Debug logging to help identify missing env vars in Vercel logs
    if (!clientId) console.error("Missing ZOHO_CLIENT_ID");
    if (!clientSecret) console.error("Missing ZOHO_CLIENT_SECRET");
    if (!refreshToken) console.error("Missing ZOHO_REFRESH_TOKEN");

    if (!clientId || !clientSecret || !refreshToken) {
        throw new Error("Missing Zoho OAuth credentials - Check Vercel Environment Variables");
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
        throw new Error(`Failed to refresh Zoho access token: ${text}`);
    }

    const text = await response.text();
    let data: TokenResponse;
    try {
        data = JSON.parse(text);
    } catch (e) {
        console.error("Invalid JSON from Zoho OAuth:", text);
        throw new Error(`Invalid JSON from Zoho OAuth: ${text.substring(0, 100)}`);
    }

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
