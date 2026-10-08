#!/usr/bin/env tsx
/**
 * Script to fetch Zoho Desk Department IDs
 * 
 * This script retrieves all departments from your Zoho Desk organization
 * so you can identify the correct Department ID to use in your environment variables.
 * 
 * Usage:
 *   npx tsx scripts/get-zoho-desk-departments.ts
 */

import { config } from "dotenv";
import { resolve } from "path";

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), ".env.local") });

import { getZohoAccessToken } from "../src/lib/zoho";

async function getDeskDepartments() {
    try {
        console.log("🔍 Fetching Zoho Desk Departments...\n");

        // Get access token
        const accessToken = await getZohoAccessToken();
        console.log("✅ Access token obtained\n");

        // Get organization ID from environment
        const orgId = process.env.ZOHO_DESK_ORG_ID;

        if (!orgId) {
            throw new Error("❌ ZOHO_DESK_ORG_ID is not set in environment variables");
        }

        console.log(`📋 Organization ID: ${orgId}\n`);

        // Fetch departments from Zoho Desk API
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
        console.log("=".repeat(60));

        if (result.data && Array.isArray(result.data)) {
            result.data.forEach((dept: any) => {
                console.log(`\n🏢 Department: ${dept.name}`);
                console.log(`   ID: ${dept.id}`);
                console.log(`   Description: ${dept.description || "N/A"}`);
                console.log(`   Status: ${dept.isEnabled ? "Enabled" : "Disabled"}`);
                console.log("-".repeat(60));
            });

            console.log("\n\n💡 To use a department, add this to your .env.local file:");
            console.log("\nZOHO_DESK_DEPARTMENT_ID=<department_id>\n");

            if (result.data.length > 0) {
                console.log(`Example (using first department):`);
                console.log(`ZOHO_DESK_DEPARTMENT_ID=${result.data[0].id}\n`);
            }
        } else {
            console.log("⚠️  No departments found or unexpected response format");
            console.log("Response:", JSON.stringify(result, null, 2));
        }

    } catch (error) {
        console.error("\n❌ Error fetching departments:");
        console.error(error instanceof Error ? error.message : error);
        process.exit(1);
    }
}

// Run the script
getDeskDepartments();
