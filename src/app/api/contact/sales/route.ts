import { type NextRequest, NextResponse } from "next/server";
import { createLead, SalesContactSchema } from "@/lib/zoho";
import { hashIp } from "@/lib/hash";
import { z } from "zod";

// --- Rate Limiting Strategy (In-Memory per Container) ---
// Note: In serverless, this applies per lambda instance. For strict global limiting, use Redis/KV.
const webRateLimit = new Map<string, { count: number; firstAttempt: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5;

// --- Helper: Get IP ---
function getIp(req: NextRequest) {
  return req.headers.get("x-forwarded-for") || "unknown-ip";
}

export async function POST(request: NextRequest) {
  const ip = getIp(request);
  const now = Date.now();

  // 1. Rate Limiting Check
  const record = webRateLimit.get(ip) || { count: 0, firstAttempt: now };
  if (now - record.firstAttempt > RATE_LIMIT_WINDOW) {
    // Reset window
    record.count = 1;
    record.firstAttempt = now;
  } else {
    record.count++;
  }
  webRateLimit.set(ip, record);

  if (record.count > MAX_REQUESTS) {
    // HIGH PRIORITY FIX: Hash IP before logging (GDPR/CCPA compliance)
    const hashedIp = await hashIp(ip);
    console.warn(`[Rate Limit Exceeded] IP Hash: ${hashedIp}`);
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();

    // 2. Validation & Sanitization
    const validData = SalesContactSchema.parse(body);

    // 3. Security (Honeypot) - CIO Requirement
    if (validData.honeypot) {
      console.warn(`[Bot Detected] Honeypot filled by IP: ${ip}`);
      // Return success to confuse bot, but do nothing
      return NextResponse.json({ success: true });
    }

    // 4. Execution
    await createLead(validData);

    return NextResponse.json({ success: true });
  } catch (error) {
    // 5. Resilience & Fallback Logging (CTO Requirement)
    if (error instanceof z.ZodError) {
      // HIGH PRIORITY FIX: Don't expose internal Zod error structure
      return NextResponse.json({ error: "Please check your form and try again." }, { status: 400 });
    }

    // Log full context for recovery (Datadog/Sentry would pick this up)
    const hashedIp = await hashIp(ip);
    console.error(`[CRITICAL] Sales Lead Submission Failed`, {
      ipHash: hashedIp,
      error: error instanceof Error ? error.message : error,
      payload: "check-request-body-logs-if-safe", // Avoid dumping PII in plain text if possible, or use a secure logger
    });

    return NextResponse.json(
      { error: "Our systems are busy. Please email hello@humaneers.dev directly." },
      { status: 500 }
    );
  }
}
