import { NextResponse, type NextRequest } from "next/server";

// Simple in-memory rate limiting map (for demonstration - use Redis/KV in prod for scale)
const rateLimitMap = new Map();

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // 1. Security Headers (CTO Requirement)
  // HSTS: Force HTTPS
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  // X-Frame-Options: Prevent clickjacking
  response.headers.set("X-Frame-Options", "DENY");
  // X-Content-Type-Options: Prevent MIME sniffing
  response.headers.set("X-Content-Type-Options", "nosniff");
  // Referrer-Policy: Control referrer information
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  // Content-Security-Policy: Prevent XSS
  // Allowing 'unsafe-inline' and 'unsafe-eval' for now to prevent breakage with
  // third-party scripts (Zoho, Google, local dev).
  // In a strict environment, these should be removed and replaced with nonces/hashes.
  const csp = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:
      *.zoho.com *.zoho.eu *.zohopublic.com *.zohopublic.eu *.zohocdn.com
      *.pagesense.io *.contentsquare.net 
      *.googletagmanager.com *.vercel-scripts.com 
      vercel.live;
    style-src 'self' 'unsafe-inline' 
      fonts.googleapis.com 
      *.zoho.com *.zohopublic.com *.zohocdn.com;
    img-src 'self' data: https: *.zohocdn.com;
    font-src 'self' data: 
      fonts.gstatic.com *.zohocdn.com;
    connect-src 'self' wss: blob:
      *.zoho.com *.zoho.eu *.zohopublic.com *.zohopublic.eu *.zohocdn.com
      *.pagesense.io *.contentsquare.net 
      *.google-analytics.com
      vercel.live;
    frame-src 'self' 
      *.zoho.com *.zoho.eu *.zohopublic.com *.zohopublic.eu;
    object-src 'none';
    base-uri 'self';
  `
    .replace(/\s{2,}/g, " ")
    .trim();

  response.headers.set("Content-Security-Policy", csp);

  // 2. API Rate Limiting (Basic Protection)
  if (request.nextUrl.pathname.startsWith("/api/")) {
    // 'ip' is sometimes available but not in all Next.js type defs. Fallback to headers.
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const limit = 50; // Requests per minute
    const windowMs = 60 * 1000;

    const now = Date.now();
    const windowStart = now - windowMs;

    const requestLog = rateLimitMap.get(ip) || [];
    const requestsInWindow = requestLog.filter((timestamp: number) => timestamp > windowStart);

    if (requestsInWindow.length >= limit) {
      return new NextResponse(
        JSON.stringify({ error: "Too many requests", message: "Rate limit exceeded" }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }

    requestsInWindow.push(now);
    rateLimitMap.set(ip, requestsInWindow);
    // Prune old entries occasionally to prevent memory leak (simplified)
    if (rateLimitMap.size > 10000) rateLimitMap.clear();
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
