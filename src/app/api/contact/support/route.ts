import { type NextRequest, NextResponse } from "next/server";
import { createTicket, SupportTicketSchema, type SupportTicket } from "@/lib/zoho";
import { deliverWithFallback, supportFallbackMessage } from "@/lib/leadFallback";
import { hashIp } from "@/lib/hash";

// nodemailer needs the Node.js runtime. The Zoho retry budget (5s) plus the
// SMTP fallback timeout (4.5s) stays under this limit.
export const runtime = "nodejs";
export const maxDuration = 15;

const supportRateLimit = new Map<string, { count: number; firstAttempt: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;
const MAX_REQUESTS = 10; // Slightly higher for support

function getIp(req: NextRequest) {
  return req.headers.get("x-forwarded-for") || "unknown-ip";
}

export async function POST(request: NextRequest) {
  const ip = getIp(request);
  const now = Date.now();

  const record = supportRateLimit.get(ip) || { count: 0, firstAttempt: now };
  if (now - record.firstAttempt > RATE_LIMIT_WINDOW) {
    record.count = 1;
    record.firstAttempt = now;
  } else {
    record.count++;
  }
  supportRateLimit.set(ip, record);

  if (record.count > MAX_REQUESTS) {
    return NextResponse.json(
      { error: "Too many requests. Please email support@humaneers.dev directly." },
      { status: 429 }
    );
  }

  // A body that does not parse or validate has nothing to keep; don't expose
  // the zod error structure.
  let validData: SupportTicket;
  try {
    validData = SupportTicketSchema.parse(await request.json());
  } catch {
    return NextResponse.json({ error: "Please check your form and try again." }, { status: 400 });
  }

  if (validData.honeypot) {
    return NextResponse.json({ success: true });
  }

  // Zoho Desk with retries, then the email fallback. A missing
  // ZOHO_DESK_DEPARTMENT_ID skips Desk and goes straight to email.
  const submissionId = crypto.randomUUID();
  const receivedAt = new Date().toISOString();
  const result = await deliverWithFallback({
    formType: "support",
    submissionId,
    deliver: () => createTicket(validData),
    message: () => supportFallbackMessage(validData, { submissionId, receivedAt }),
    ipHash: () => hashIp(ip),
  });

  if (result.via === "zoho") {
    return NextResponse.json({ success: true, message: "Ticket created successfully" });
  }
  if (result.accepted) {
    return NextResponse.json({ success: true });
  }

  // Neither Desk nor the email fallback took it. Tell the visitor so.
  return NextResponse.json(
    { error: "Unable to create ticket automatically. Please email support@humaneers.dev." },
    { status: 500 }
  );
}
