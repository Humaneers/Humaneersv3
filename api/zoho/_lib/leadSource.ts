/**
 * Derive lead source from context data
 */
export function deriveLeadSource(context?: string, referrer?: string): string {
  // Priority 1: Check for UTM source in context
  if (context?.includes("utm_source=")) {
    const match = context.match(/utm_source=([^,\s]+)/);
    if (match) {
      const utmSource = match[1];
      // Map common UTM sources to friendly names
      if (utmSource === "google") return "Google Ads";
      if (utmSource === "facebook") return "Facebook";
      if (utmSource === "linkedin") return "LinkedIn";
      if (utmSource === "twitter") return "Twitter";
      return `Campaign - ${utmSource}`;
    }
  }

  // Priority 2: Check for custom source in context
  if (context?.includes("Source:")) {
    const match = context.match(/Source:\s*([^|]+)/);
    if (match) {
      return `Website - ${match[1].trim()}`;
    }
  }

  // Priority 3: Check referrer domain
  if (referrer && referrer !== "direct") {
    try {
      const url = new URL(referrer);
      const domain = url.hostname.replace("www.", "");

      if (domain.includes("google")) return "Google Search";
      if (domain.includes("bing")) return "Bing Search";
      if (domain.includes("linkedin")) return "LinkedIn";
      if (domain.includes("facebook")) return "Facebook";
      if (domain.includes("twitter") || domain.includes("t.co")) return "Twitter";

      return `Referral - ${domain}`;
    } catch (e) {
      // Invalid URL, ignore
    }
  }

  // Priority 4: Check if direct traffic
  if (context?.includes("Ref: direct")) return "Direct Traffic";

  // Default fallback
  return "Website - Talk to Sales";
}
