/**
 * Derives the lead source from context and referrer.
 */
export function deriveLeadSource(context?: string | null, referrer?: string | null): string {
  if (context?.includes("Newsletter")) return "Newsletter";
  if (referrer?.includes("google")) return "Organic Search";
  if (referrer?.includes("linkedin")) return "LinkedIn";
  if (referrer?.includes("twitter") || referrer?.includes("t.co")) return "X (Twitter)";
  return "Website Contact Form";
}
