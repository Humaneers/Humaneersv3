import type { VercelRequest, VercelResponse } from "@vercel/node";

import { getZohoAccessToken } from "../_lib/zoho.js";

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
      tokenPreview: token.substring(0, 10) + "...",
    });
  } catch (error) {
    console.error("Auth check failed:", error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Auth failed",
    });
  }
}
