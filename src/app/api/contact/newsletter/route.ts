import { type NextRequest, NextResponse } from "next/server";
import { createMarketingContact, NewsletterSubscriberSchema } from "@/lib/zoho";
import { hashIp } from "@/lib/hash";
import { z } from "zod";

const subRateLimit = new Map<string, { count: number; firstAttempt: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;
const MAX_REQUESTS = 5;

function getIp(req: NextRequest) {
  return req.headers.get("x-forwarded-for") || "unknown-ip";
}

export async function POST(request: NextRequest) {
  const ip = getIp(request);
  const now = Date.now();

  const record = subRateLimit.get(ip) || { count: 0, firstAttempt: now };
  if (now - record.firstAttempt > RATE_LIMIT_WINDOW) {
    record.count = 1;
    record.firstAttempt = now;
  } else {
    record.count++;
  }
  subRateLimit.set(ip, record);

  if (record.count > MAX_REQUESTS) {
    return NextResponse.json({ error: "Too many attempts." }, { status: 429 });
  }

  try {
    const body = await request.json();
    const validData = NewsletterSubscriberSchema.parse(body);

    if (validData.honeypot) {
      return NextResponse.json({ success: true });
    }

    await createMarketingContact(validData);

    return NextResponse.json({ success: true });
  } catch (error) {
    // Silent fail for newsletter is often preferred to avoid friction,
    // but we'll return 500 so the UI can decide (e.g. show toast).
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const hashedIp = await hashIp(ip);

    console.error(`[Warning] Newsletter Sub Failed`, {
      ipHash: hashedIp,
      error: error instanceof Error ? error.message : error,
    });

    return NextResponse.json({ error: "Could not subscribe at this time." }, { status: 500 });
  }
}
