import https from 'https';
import fs from 'fs';
import path from 'path';

// Load .env manually
try {
    const envPath = path.join(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        envContent.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                const key = match[1].trim();
                const value = match[2].trim().replace(/^["'](.*)["']$/, '$1');
                if (!process.env[key]) process.env[key] = value;
            }
        });
    }
} catch (e) { }

async function getAccessToken() {
    const clientId = process.env.ZOHO_CLIENT_ID;
    const clientSecret = process.env.ZOHO_CLIENT_SECRET;
    const refreshToken = process.env.ZOHO_REFRESH_TOKEN;
    const accountsDomain = process.env.ZOHO_ACCOUNTS_DOMAIN || "accounts.zoho.com";

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
        }, res => {
            let body = '';
            res.on('data', c => body += c);
            res.on('end', () => resolve(JSON.parse(body)));
        });
        req.on('error', reject);
        req.write(params.toString());
        req.end();
    });
}

async function callApi(url, token) {
    return new Promise((resolve, reject) => {
        const req = https.request(url, {
            method: 'GET',
            headers: { 'Authorization': `Zoho-oauthtoken ${token}` }
        }, res => {
            let body = '';
            res.on('data', c => body += c);
            res.on('end', () => resolve({ status: res.statusCode, body }));
        });
        req.on('error', reject);
        req.end();
    });
}

(async () => {
    console.log("🔍 Debugging Zoho Token Scopes...");
    try {
        const tokenData = await getAccessToken();
        if (tokenData.error) {
            console.error("❌ Failed to get token:", tokenData.error);
            return;
        }
        const token = tokenData.access_token;
        console.log("✅ Got Access Token");

        // Use the API domain from the token response, or fallback to env/default
        let apiDomain = tokenData.api_domain || process.env.ZOHO_API_DOMAIN || "https://www.zohoapis.com";
        // Remove protocol if present for the https.request usage later which expects hostname or full URL handling
        apiDomain = apiDomain.replace(/^https?:\/\//, '');

        console.log(`🌍 Using API Domain: ${apiDomain}`);

        // 1. Test CRM (Known Good)
        console.log("\n🧪 Testing CRM API (settings/modules)...");
        const crmRes = await callApi(`https://${apiDomain}/crm/v2/settings/modules`, token);
        console.log(`Status: ${crmRes.status}`);
        if (crmRes.status === 200) console.log("✅ CRM Access OK");
        else console.log("❌ CRM Access Failed");

        // 2. Test Bookings (fetchworkspaces)
        console.log("\n🧪 Testing Bookings API (fetchworkspaces)...");
        const bookRes = await callApi(`https://${apiDomain}/bookings/v1/json/fetchworkspaces`, token);
        console.log(`Status: ${bookRes.status}`);
        if (bookRes.body) console.log(`Body Snippet: ${bookRes.body.substring(0, 200)}`);

        if (bookRes.status === 200) {
            console.log("✅ Bookings Access OK (fetchworkspaces)");
            const data = JSON.parse(bookRes.body);
            console.log("Workspaces:", JSON.stringify(data, null, 2));
        } else {
            console.error("❌ Bookings (fetchworkspaces) Failed");
        }

        // 3. Test Bookings (bookings.zoho.com fallback)
        console.log("\n🧪 Testing Bookings API (bookings.zoho.com)...");
        const altRes = await callApi(`https://bookings.zoho.com/api/v1/json/fetchworkspaces`, token);
        console.log(`Status: ${altRes.status}`);
        if (altRes.body) console.log(`Body Snippet: ${altRes.body.substring(0, 200)}`);


        // 4. Test Bookings (getservices) - Alternative
        console.log("\n🧪 Testing Bookings API (getservices)...");
        // Sometimes we need value params, but let's try without and see if we get a better error than 500
        const servicesRes = await callApi(`https://${apiDomain}/bookings/v1/json/getservices`, token);
        console.log(`Status: ${servicesRes.status}`);
        if (servicesRes.body) console.log(`Body Snippet: ${servicesRes.body.substring(0, 200)}`);

    } catch (e) {
        console.error("Error:", e);
    }
})();
