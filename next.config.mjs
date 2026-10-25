// Security response headers for every route. This is the only place they are
// set: vercel.json sets none, and src/proxy.ts only rate-limits /api/*.
//
// Content-Security-Policy: allowing 'unsafe-inline' and 'unsafe-eval' for now to
// prevent breakage with third-party scripts (Zoho, Google, local dev).
// In a strict environment, these should be removed and replaced with nonces/hashes.
const contentSecurityPolicy = `
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
    .replace(/\s{2,}/g, ' ')
    .trim();

const securityHeaders = [
    // HSTS: force HTTPS
    { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
    // Prevent clickjacking
    { key: 'X-Frame-Options', value: 'DENY' },
    // Prevent MIME sniffing
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    // Control referrer information
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    // Deprecated header. Kept for parity with the value production served from vercel.json.
    { key: 'X-XSS-Protection', value: '1; mode=block' },
    { key: 'Content-Security-Policy', value: contentSecurityPolicy },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
    cacheComponents: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: '**.vercel-storage.com',
            },
        ],
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: securityHeaders,
            },
        ];
    },
};

export default nextConfig;
