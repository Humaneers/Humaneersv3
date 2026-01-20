import https from 'https';
import fs from 'fs';
import path from 'path';

// 1. Manually load .env since we don't have dotenv
try {
    const envPath = path.join(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        envContent.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                const key = match[1].trim();
                const value = match[2].trim().replace(/^["'](.*)["']$/, '$1'); // Remove quotes
                if (!process.env[key]) {
                    process.env[key] = value;
                }
            }
        });
        console.log("✅ Loaded .env file");
    } else {
        console.warn("⚠️  No .env file found");
    }
} catch (e) {
    console.warn("⚠️  Failed to load .env:", e.message);
}

// 2. Auth Logic
async function getAccessToken() {
    const clientId = process.env.ZOHO_CLIENT_ID;
    const clientSecret = process.env.ZOHO_CLIENT_SECRET;
    const refreshToken = process.env.ZOHO_REFRESH_TOKEN;
    const accountsDomain = process.env.ZOHO_ACCOUNTS_DOMAIN || "accounts.zoho.com";

    if (!clientId || !clientSecret || !refreshToken) {
        throw new Error("Missing Zoho OAuth credentials in .env");
    }

    console.log("🔐 Refreshing Token...");
    const params = new URLSearchParams({
        grant_type: "refresh_token",
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
    });

    return new Promise((resolve, reject) => {
        const req = https.request(`https://${accountsDomain}/oauth/v2/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                if (res.statusCode !== 200) return reject(`Token refresh failed: ${body}`);
                try {
                    const data = JSON.parse(body);
                    if (data.error) reject(data.error);
                    else resolve(data.access_token);
                } catch (e) { reject(e); }
            });
        });
        req.on('error', reject);
        req.write(params.toString());
        req.end();
    });
}

// 3. Test Bookings API
async function testBookings() {
    try {
        const token = await getAccessToken();
        console.log("✅ Token Obtained. Testing Bookings API...");

        const apiDomain = process.env.ZOHO_API_DOMAIN || "www.zohoapis.com";
        console.log(`🌍 Using API Domain: ${apiDomain}`);

        // FETCH WORKSPACES
        const response = await new Promise((resolve, reject) => {
            const req = https.request(`https://${apiDomain}/bookings/v1/json/fetchworkspaces`, {
                method: 'GET',
                headers: {
                    'Authorization': `Zoho-oauthtoken ${token}`
                }
            }, (res) => {
                let body = '';
                res.on('data', chunk => body += chunk);
                res.on('end', () => resolve({ status: res.statusCode, body }));
            });
            req.on('error', reject);
            req.end();
        });

        console.log(`📡 Response Status: ${response.status}`);
        console.log(`📦 Response Body: ${response.body.substring(0, 500)}...`);

        try {
            const result = JSON.parse(response.body);

            if (result.response && result.response.returnvalue) {
                console.log("\n✅ SUCCESS: Connected to Zoho Bookings API!");
            } else if (result.response && result.response.status === 'failure') {
                console.error("\n❌ API Error:", result.response.message);
                if (result.response.message && result.response.message.toLowerCase().includes("scope")) {
                    console.error("👉 CAUSE: Missing Scopes. Please update Refresh Token with 'ZohoBookings.manage.all'.");
                    process.exit(1);
                }
            } else {
                console.error("\n❌ Unexpected Response:", result);
            }
        } catch (e) {
            console.error("\n❌ Failed to parse JSON body (likely HTML error from gateway):", e.message);
        }

    } catch (error) {
        console.error("\n❌ Script Error:", error);
        process.exit(1);
    }
}

testBookings();
