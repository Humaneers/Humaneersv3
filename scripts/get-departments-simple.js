/**
 * Simple script to fetch Zoho Desk Department IDs
 * Run with: node scripts/get-departments-simple.js
 * 
 * Make sure to set these environment variables first:
 * - ZOHO_CLIENT_ID
 * - ZOHO_CLIENT_SECRET
 * - ZOHO_REFRESH_TOKEN
 * - ZOHO_DESK_ORG_ID
 */

async function getAccessToken() {
    const clientId = process.env.ZOHO_CLIENT_ID;
    const clientSecret = process.env.ZOHO_CLIENT_SECRET;
    const refreshToken = process.env.ZOHO_REFRESH_TOKEN;
    const accountsDomain = process.env.ZOHO_ACCOUNTS_DOMAIN || "accounts.zoho.com";

    if (!clientId || !clientSecret || !refreshToken) {
        throw new Error("Missing Zoho OAuth credentials. Please set ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, and ZOHO_REFRESH_TOKEN");
    }

    const params = new URLSearchParams({
        grant_type: "refresh_token",
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
    });

    const response = await fetch(`https://${accountsDomain}/oauth/v2/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to get access token: ${text}`);
    }

    const data = await response.json();
    return data.access_token;
}

async function getDepartments() {
    try {
        console.log("🔍 Fetching Zoho Desk Departments...\n");

        const orgId = process.env.ZOHO_DESK_ORG_ID;

        if (!orgId) {
            throw new Error("ZOHO_DESK_ORG_ID is not set. Please set this environment variable.");
        }

        console.log("🔐 Getting access token...");
        const accessToken = await getAccessToken();
        console.log("✅ Access token obtained\n");

        console.log(`📋 Organization ID: ${orgId}\n`);

        const response = await fetch("https://desk.zoho.com/api/v1/departments", {
            method: "GET",
            headers: {
                Authorization: `Zoho-oauthtoken ${accessToken}`,
                orgId: orgId,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Zoho Desk API error (${response.status}): ${errorText}`);
        }

        const result = await response.json();

        console.log("📊 Available Departments:\n");
        console.log("=".repeat(70));

        if (result.data && Array.isArray(result.data)) {
            if (result.data.length === 0) {
                console.log("\n⚠️  No departments found in your Zoho Desk organization.");
                console.log("You may need to create a department in Zoho Desk first.\n");
            } else {
                result.data.forEach((dept, index) => {
                    console.log(`\n${index + 1}. 🏢 ${dept.name}`);
                    console.log(`   Department ID: ${dept.id}`);
                    console.log(`   Description: ${dept.description || "N/A"}`);
                    console.log(`   Status: ${dept.isEnabled ? "✅ Enabled" : "❌ Disabled"}`);
                    if (dept.creatorId) {
                        console.log(`   Creator ID: ${dept.creatorId}`);
                    }
                    console.log("-".repeat(70));
                });

                console.log("\n\n💡 To use a department, add this to your .env.local file:");
                console.log("\nZOHO_DESK_DEPARTMENT_ID=<department_id>\n");

                console.log(`📝 Example (using "${result.data[0].name}"):`);
                console.log(`ZOHO_DESK_DEPARTMENT_ID=${result.data[0].id}\n`);
            }
        } else {
            console.log("⚠️  Unexpected response format");
            console.log("Response:", JSON.stringify(result, null, 2));
        }

    } catch (error) {
        console.error("\n❌ Error:");
        console.error(error.message);
        console.error("\n📖 For more help, see: docs/ZOHO_DESK_DEPARTMENT_ID.md\n");
        process.exit(1);
    }
}

getDepartments();
