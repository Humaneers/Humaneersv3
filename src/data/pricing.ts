/**
 * Single source of truth for pricing tiers, plus the response-time and
 * families-protected figures quoted alongside them across the site.
 *
 * Why this exists: three separate factual contradictions shipped because the
 * same facts were retyped as literals in multiple files — a wrong Solo-tier
 * price, a nonexistent tier named in the pricing FAQ, and a business-plan
 * sentence that borrowed the nonprofit tier's name. Every page that quotes a
 * price, a tier name, a families-protected count, or a response-time promise
 * should import it from here instead of holding its own copy.
 *
 * scripts/claims-guard.mjs reads the `name: "..."` values out of this file as
 * text — it never executes TypeScript — to fail the build if customer-facing
 * prose names a tier that isn't defined here. Keep tier objects on the
 * `name: "...", segment: "...", ...` shape below so that reader keeps working.
 */

export type TierSegment = "business" | "household" | "nonprofit" | "incubation";

/**
 * How fast we promise to respond, per tier. "critical" and "priority" mirror
 * the P1/P2 numbers published on /support — the only place either number is
 * evidenced. "standard" carries no fixed number on purpose: nothing in the
 * data backs a specific promise for those tiers, so the copy stays
 * qualitative rather than precise-and-wrong. "capacity" is the honest hedge
 * used for ad-hoc, unscheduled crisis work.
 */
export type SlaLevel = "critical" | "priority" | "standard" | "capacity";

export interface PricingTier {
  name: string;
  segment: TierSegment;
  basePrice: number;
  /** Per-additional-user price. A string for cost-pass-through tiers. */
  perUserPrice?: number | string;
  slaLevel: SlaLevel;
}

export const PRICING_TIERS: readonly PricingTier[] = [
  // Business
  { name: "Core", segment: "business", basePrice: 99, perUserPrice: 15, slaLevel: "standard" },
  { name: "Growth", segment: "business", basePrice: 249, perUserPrice: 29, slaLevel: "priority" },
  {
    name: "Enterprise",
    segment: "business",
    basePrice: 399,
    perUserPrice: 40,
    slaLevel: "priority",
  },
  // Household
  { name: "Solo", segment: "household", basePrice: 19, perUserPrice: 4, slaLevel: "standard" },
  {
    name: "Household",
    segment: "household",
    basePrice: 49,
    perUserPrice: 9,
    slaLevel: "standard",
  },
  { name: "Legacy Care", segment: "household", basePrice: 49, slaLevel: "priority" },
  {
    name: "Estate",
    segment: "household",
    basePrice: 149,
    perUserPrice: 15,
    slaLevel: "priority",
  },
  // Nonprofit
  {
    name: "Nonprofit Foundation",
    segment: "nonprofit",
    basePrice: 199,
    perUserPrice: "Cost",
    slaLevel: "standard",
  },
  // Incubation
  {
    name: "Incubator",
    segment: "incubation",
    basePrice: 15,
    perUserPrice: "Pass-through",
    slaLevel: "standard",
  },
  {
    name: "Hold Co",
    segment: "incubation",
    basePrice: 499,
    perUserPrice: "Entity",
    slaLevel: "priority",
  },
];

export function tiersForSegment(segment: TierSegment): PricingTier[] {
  return PRICING_TIERS.filter((tier) => tier.segment === segment);
}

export function getTier(name: string): PricingTier {
  const tier = PRICING_TIERS.find((t) => t.name === name);
  if (!tier) throw new Error(`Unknown pricing tier: "${name}"`);
  return tier;
}

/** Lowest base price in a segment — the honest "plans start at" figure. */
export function startingPrice(segment: TierSegment): number {
  return Math.min(...tiersForSegment(segment).map((tier) => tier.basePrice));
}

/** Names of the tiers in a segment carrying a given SLA level, in tier order. */
export function tierNamesWithSla(segment: TierSegment, level: SlaLevel): string[] {
  return tiersForSegment(segment)
    .filter((tier) => tier.slaLevel === level)
    .map((tier) => tier.name);
}

/** Short label for a comparison-table cell. */
export const SLA_LABEL: Record<SlaLevel, string> = {
  critical: "Critical (15 min)",
  priority: "Priority",
  standard: "Standard",
  capacity: "Capacity-based",
};

/** Time-window fragment for composing response-time sentences in prose. */
export const SLA_WINDOW: Record<SlaLevel, string> = {
  critical: "15 minutes",
  priority: "under 1 hour",
  standard: "no fixed time",
  capacity: "if we have capacity",
};

/** Incident priorities, P1 (critical) to P4 (low), as the Terms define them. */
export type IncidentPriority = "P1" | "P2" | "P3" | "P4";

/**
 * Initial response window per incident priority. This mirrors section 3.2
 * (Support Response Times) of the Terms of Service in
 * src/features/legal/TermsClient.tsx, and the Terms govern: if the two ever
 * disagree, the Terms are right and this map is the one to fix. It is keyed
 * by incident, not by tier; SLA_WINDOW above is the per-tier promise.
 */
export const INCIDENT_RESPONSE_WINDOW: Record<IncidentPriority, string> = {
  P1: "15 minutes",
  P2: "1 hour",
  P3: "4 hours",
  P4: "24 hours",
};
