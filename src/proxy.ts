import { NextResponse, type NextRequest } from "next/server";

// This proxy only rate-limits the API (/api/*). Security response headers are set
// in next.config.mjs headers(), not here.
//
// The limiter is in memory and per instance: each running instance keeps its own
// map, and the map is lost when the instance stops. It is a basic guard only.
// Real rate limiting belongs in Vercel Firewall rules.
const rateLimitMap = new Map();

export function proxy(request: NextRequest) {
  // The matcher also matches "/api" itself; only "/api/..." paths are counted, as before.
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

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
