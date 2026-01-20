import { type NextRequest, NextResponse } from "next/server";
import { createTicket, SupportTicketSchema } from "@/lib/zoho";
import { hashIp } from "@/lib/hash";
import { z } from "zod";

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

  try {
    const body = await request.json();
    const validData = SupportTicketSchema.parse(body);

    if (validData.honeypot) {
      return NextResponse.json({ success: true });
    }

    await createTicket(validData);

    return NextResponse.json({ success: true, message: "Ticket created successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // HIGH PRIORITY FIX: Don't expose internal Zod error structure
      return NextResponse.json({ error: "Please check your form and try again." }, { status: 400 });
    }

    const hashedIp = await hashIp(ip);
    console.error(`[CRITICAL] Support Ticket Failed`, {
      ipHash: hashedIp,
      error: error instanceof Error ? error.message : error,
    });

    return NextResponse.json(
      { error: "Unable to create ticket automatically. Please email support@humaneers.dev." },
      { status: 500 }
    );
  }
}
