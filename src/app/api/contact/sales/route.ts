import { type NextRequest, NextResponse } from "next/server";
import { createLead, SalesContactSchema, type SalesContact } from "@/lib/zoho";
import { deliverWithFallback, salesFallbackMessage } from "@/lib/leadFallback";
import { hashIp } from "@/lib/hash";

// nodemailer needs the Node.js runtime. The Zoho retry budget (5s) plus the
// SMTP fallback timeout (4.5s) stays under this limit.
export const runtime = "nodejs";
export const maxDuration = 15;

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

  // 2. Validation & Sanitization. A body that does not parse or validate has
  // nothing to keep; don't expose the zod error structure.
  let validData: SalesContact;
  try {
    validData = SalesContactSchema.parse(await request.json());
  } catch {
    return NextResponse.json({ error: "Please check your form and try again." }, { status: 400 });
  }

  // 3. Security (Honeypot) - CIO Requirement
  if (validData.honeypot) {
    console.warn(`[Bot Detected] Honeypot filled. IP Hash: ${await hashIp(ip)}`);
    // Return success to confuse bot, but do nothing
    return NextResponse.json({ success: true });
  }

  // 4. Execution: Zoho CRM with retries, then the email fallback.
  const submissionId = crypto.randomUUID();
  const receivedAt = new Date().toISOString();
  const result = await deliverWithFallback({
    formType: "sales",
    submissionId,
    deliver: () => createLead(validData),
    message: () => salesFallbackMessage(validData, { submissionId, receivedAt }),
    ipHash: () => hashIp(ip),
  });

  if (result.accepted) {
    return NextResponse.json({ success: true });
  }

  // 5. Neither Zoho nor the email fallback took it. Tell the visitor so.
  return NextResponse.json(
    { error: "Our systems are busy. Please email hello@humaneers.dev directly." },
    { status: 500 }
  );
}
