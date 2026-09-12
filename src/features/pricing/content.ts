/**
 * The words on /pricing. Tier names, prices and SLA labels are read from
 * src/data/pricing.ts; this module holds only the copy around them.
 *
 * A plain module rather than part of PricingClient: page.tsx is a server
 * component and reads FAQS for the page's structured data, and a server
 * component cannot read data exported from a "use client" file.
 */
import type { CtaLink } from "@/components/sections/CtaLinks";
import type { CTASectionProps } from "@/components/sections/CTASection";
import type { FAQItem } from "@/components/sections/FAQSection";
import type { PageHeaderProps } from "@/components/sections/PageHeader";
import type { ComparisonCategory, ComparisonValue } from "@/components/sections/PricingComparison";
import type { PricingOfferProps } from "@/components/sections/PricingOffer";
import type { PricingPlan, PricingPlansTab } from "@/components/sections/PricingPlans";
import type { SplitFeatureProps } from "@/components/sections/SplitFeature";
import {
  PRICING_TIERS,
  SLA_LABEL,
  SLA_WINDOW,
  getTier,
  tierNamesWithSla,
  tiersForSegment,
  type PricingTier,
  type TierSegment,
} from "@/data/pricing";
import { routePaths } from "@/routes";

/** The segments pricing.ts defines, in its order. The first is the default. */
export const SEGMENTS: readonly TierSegment[] = Array.from(
  new Set(PRICING_TIERS.map((tier) => tier.segment))
);

export const DEFAULT_SEGMENT: TierSegment = SEGMENTS[0];

/** A ?mode= value as a segment. A missing or unknown value opens the default. */
export function segmentFromParam(value: string | string[] | undefined): TierSegment {
  return SEGMENTS.find((segment) => segment === value) ?? DEFAULT_SEGMENT;
}

const SEGMENT_LABEL: Record<TierSegment, string> = {
  business: "Business",
  household: "Personal",
  nonprofit: "Nonprofit",
  incubation: "Incubation",
};

/**
 * Every plan joins the waitlist while we are at capacity. The contact modal
 * these buttons used to open holds the same waitlist form as /talk-to-sales.
 */
const WAITLIST: CtaLink = { label: "Join the waitlist", href: routePaths.talkToSales };

export const HERO = {
  heading: "Infrastructure as Strategy.",
  description:
    'We don\'t just "fix computers." We architect sovereignty, resilience, and operational velocity for industry leaders and private families.',
  align: "center",
} satisfies PageHeaderProps;

export const PLANS_INTRO = {
  // Availability sits above the prices, as on /talk-to-sales: a visitor should
  // know the state before pricing a plan, not after choosing one.
  eyebrow: "At capacity: joining the waitlist",
  heading: "Plans and rates",
  description:
    "These are our real rates, published so you can plan against them. We are full at the moment, so choosing a plan joins the waitlist rather than starting onboarding.",
  tabsLabel: "Who the plans are for",
};

type TierCopy = Pick<PricingPlan, "description" | "features" | "links" | "recommended"> & {
  /**
   * The tier's own buying phrase. Not rendered: every plan joins the same
   * waitlist, so every button reads "Join the waitlist". Kept for the day
   * capacity reopens.
   */
  parkedCta: string;
};

/** Keyed by the tier names in pricing.ts. content.test.ts fails if the two drift. */
export const TIER_COPY: Readonly<Record<string, TierCopy>> = {
  Core: {
    description: "Defense-grade security hygiene for lean teams.",
    features: [
      "Includes Two Free Users",
      "Unified Hybrid & Cloud Infrastructure",
      "Unlimited Premier Support",
      "Enterprise Endpoint Security",
      "Fleet Command (MDM)",
      "Microsoft 365 Management",
    ],
    links: [
      { label: "Managed IT Info", href: routePaths.managedIt },
      { label: "Family Protection", href: routePaths.familyProtection },
    ],
    parkedCta: "Secure My Team",
  },
  Growth: {
    description: "Operational velocity and scalability for expanding brands.",
    features: [
      "Includes Two Free Users",
      "Everything in Core",
      "Strategic Growth Roadmap",
      "Priority On-site Support",
      "Advanced Threat Protection",
      "Vendor Diplomacy",
    ],
    links: [{ label: "Americanization", href: routePaths.growth }],
    recommended: true,
    parkedCta: "Choose Growth",
  },
  Enterprise: {
    description: "Strategic leadership and sovereignty for market leaders.",
    features: [
      "Includes Two Free Users",
      "Everything in Growth",
      "Americanization Strategy",
      "Fractional CIO Access",
      "Dedicated Success Manager",
      "Annual Strategy Retreat",
    ],
    links: [{ label: "vCIO Leadership", href: routePaths.fractionalLeadership }],
    parkedCta: "Talk to Strategy",
  },
  Solo: {
    description: "Digital identity protection for high-profile individuals.",
    features: [
      "Includes One Free User",
      "Concierge Domain Management",
      "DNS Record Configuration",
      "Email (G-Suite/O365) Admin",
      "Premier Tech Support",
      "Basic Account Monitoring",
    ],
    links: [{ label: "Personal Details", href: routePaths.personal }],
    parkedCta: "Get Admin Help",
  },
  Household: {
    description: "Cyber-physical security for the modern connected family.",
    features: [
      "Includes Four Free Users",
      "Enterprise Endpoint Protection (Mac/PC)",
      "Home Network Management",
      "Fleet Command (MDM)",
      "Content Filtering & Parental Controls",
      "Identity Theft Monitoring",
      "Concierge Helpdesk Access",
    ],
    links: [{ label: "Protection Details", href: routePaths.familyProtection }],
    recommended: true,
    parkedCta: "Secure My Home",
  },
  "Legacy Care": {
    description: "Dignity, privacy, and fraud insulation for elders.",
    features: [
      "Home WiFi Management",
      "Enterprise Endpoint Protection",
      "Content Filtering & Parental Controls",
      "Fraud & Scam Air-Gapping",
      "Unlimited 'Red Button' Phone Support",
      "Family Proxy Access (God Mode)",
      "Digital Legacy Planning",
    ],
    links: [{ label: "Senior Care Details", href: routePaths.seniorCare }],
    parkedCta: "Protect My Parents",
  },
  Estate: {
    description: "Concierge technology management for multi-property estates.",
    features: [
      "Includes Two Free Users",
      "Everything in Household",
      "Custom Personal Email (@surname.com)",
      "Enterprise Wi-Fi Management",
      "ISP & Vendor Diplomacy",
      "Priority 24/7 Support",
    ],
    links: [{ label: "Estate Support", href: routePaths.estate }],
    parkedCta: "Get Concierge",
  },
  "Nonprofit Foundation": {
    description: "Flat-rate service fee plus at-cost licensing.",
    features: [
      "Includes Two Free Users",
      "Flat Organization Service Fee",
      "Per-User Licensing Cost Only",
      "Unlimited Remote Support",
      "Donor Data Protection",
      "Volunteer Management",
    ],
    links: [{ label: "Nonprofit Details", href: routePaths.nonProfits }],
    recommended: true,
    parkedCta: "Verify 501(c)(3) Status",
  },
  Incubator: {
    description: "Digital Asset Sovereignty for domains and IP.",
    features: [
      "Enterprise Registry Locks",
      "DNSSEC & SPF/DKIM Management",
      "Compliance Watchtower (BOI)",
      "Smart Monetization (Ad Parking)",
      "Brokerage Representation",
      "At-Cost Renewals",
    ],
    links: [{ label: "Venture Details", href: routePaths.venture }],
    recommended: true,
    parkedCta: "Secure Assets",
  },
  "Hold Co": {
    description: "Fractional Ops for multi-entity portfolios.",
    features: [
      "Consolidated Billing",
      "Inter-Company Transfers",
      "Unified IAM / SSO Strategy",
      "Dedicated Account Manager",
      "Quarterly Asset Review",
      "Rapid Entity Genesis",
    ],
    links: [{ label: "Fractional Leadership", href: routePaths.fractionalLeadership }],
    parkedCta: "Contact Strategy",
  },
};

const SEGMENT_NOTE: Partial<Record<TierSegment, PricingPlansTab["note"]>> = {
  nonprofit: {
    title: "How Nonprofit Pricing Works:",
    text: "Unlike our for-profit plans, which bundle service and licensing into a per-user fee, we charge a flat monthly service retainer for the entire organization, plus the direct cost of user licenses (Microsoft 365, etc.).",
  },
  incubation: {
    title: "Asset Holding Fees:",
    text: 'We structure our fees to scale with your portfolio. Stop paying retail for domains you aren\'t using yet. Monetize your "parking" status to offset costs.',
  },
};

// Was a hover-only tooltip on the asterisk. It said "your first 2 users" on
// every card, including Solo (one included user) and Household (four); this
// wording holds for every card that carries the asterisk.
const PER_USER_FOOTNOTE =
  "* The base price covers infrastructure and support and includes the users listed on each plan. The per-user price applies to each user beyond those.";

function formatPrice(value: number | string) {
  return typeof value === "number" ? `$${value}` : value;
}

function planFor(tier: PricingTier): PricingPlan {
  const copy = TIER_COPY[tier.name];
  if (!copy) throw new Error(`No /pricing copy for tier "${tier.name}"`);
  // Incubation's second figure is what the assets cost, not a seat price.
  const assetCosts = tier.segment === "incubation";
  return {
    name: tier.name,
    price: formatPrice(tier.basePrice),
    priceUnit: "base / mo",
    priceDetail:
      tier.perUserPrice === undefined
        ? "Two users included"
        : `+ ${formatPrice(tier.perUserPrice)} ${assetCosts ? "/ asset costs" : "/ additional user / mo"}`,
    footnoteMark: tier.perUserPrice !== undefined && !assetCosts,
    description: copy.description,
    features: copy.features,
    links: copy.links,
    recommended: copy.recommended,
    cta: WAITLIST,
  };
}

export const PLAN_TABS: readonly PricingPlansTab[] = SEGMENTS.map((segment) => {
  const plans = tiersForSegment(segment).map(planFor);
  return {
    value: segment,
    label: SEGMENT_LABEL[segment],
    note: SEGMENT_NOTE[segment],
    plans,
    footnote: plans.some((plan) => plan.footnoteMark) ? PER_USER_FOOTNOTE : undefined,
  };
});

export const PLAN_NOTES = [
  'Maintenance and support costs are fixed (base), while service delivery costs scale linearly (per user). A "user" is a human with an email account; we never charge for service accounts, shared inboxes, or admin aliases.',
  "Device allocations range from 5 to 12 managed devices per user depending on the tier. All active support plans include unlimited IoT devices.",
];

export const COMPARISON_INTRO = {
  heading: "Compare Plans",
  description: "Detailed feature breakdown per tier.",
};

/** One value per tier in the segment, from pricing.ts, so a tier's SLA is never retyped. */
function slaRow(segment: TierSegment): Record<string, ComparisonValue> {
  return Object.fromEntries(
    tiersForSegment(segment).map((tier) => [tier.name, SLA_LABEL[tier.slaLevel]])
  );
}

/**
 * The matrix under the cards, per segment. Nonprofit has one plan and no
 * matrix; NONPROFIT_FLAT_RATE takes its place. Each description was a
 * hover-only tooltip behind an unlabeled icon button.
 */
export const COMPARISON: Partial<Record<TierSegment, readonly ComparisonCategory[]>> = {
  business: [
    {
      title: "Strategic Infrastructure",
      features: [
        {
          name: "Plan Users Included",
          description: "Number of users included in the base price",
          values: { Core: "Two Users", Growth: "Two Users", Enterprise: "Two Users" },
        },
        {
          name: "Unlimited Remote Support",
          description: "Helpdesk access for all covered users",
          values: { Core: true, Growth: true, Enterprise: true },
        },
        {
          name: "Microsoft 365 Management",
          description: "Administration of users, licenses, and security policies",
          values: { Core: true, Growth: true, Enterprise: true },
        },
        {
          name: "Vendor Diplomacy",
          description: "We handle ISP and software vendor support tickets",
          values: { Core: false, Growth: true, Enterprise: true },
        },
      ],
    },
    {
      title: "Security & Sovereignty",
      features: [
        {
          name: "Endpoint Security (EDR)",
          description: "Next-gen antivirus and threat detection",
          values: { Core: true, Growth: true, Enterprise: true },
        },
        {
          name: "Fleet Command (MDM)",
          description: "Remote wipe, encryption enforcement, and patch management",
          values: { Core: true, Growth: true, Enterprise: true },
        },
        {
          name: "Advanced Threat Protection",
          description: "AI-driven behavioral analysis and hunt team",
          values: { Core: false, Growth: true, Enterprise: true },
        },
        {
          name: "Security Awareness Training",
          description: "Phishing simulations and education for staff",
          values: { Core: "Optional", Growth: true, Enterprise: true },
        },
        {
          name: "SOC 2 / HIPAA Control Mapping",
          description:
            "We map your configurations to the framework's controls. This is preparation work, not an audit, and it does not certify you or us.",
          values: { Core: false, Growth: "Assisted", Enterprise: true },
        },
      ],
    },
    {
      title: "Strategy & Growth",
      features: [
        {
          name: "Quarterly Health Checks",
          description: "Review of technology performance and risks",
          values: { Core: false, Growth: true, Enterprise: true },
        },
        {
          name: "Americanization Strategy",
          description: "Adapting foreign brands for the US market",
          values: { Core: false, Growth: true, Enterprise: true },
        },
        {
          name: "Fractional CIO Access",
          description: "Strategic technology leadership and roadmapping",
          values: { Core: false, Growth: false, Enterprise: true },
        },
        {
          name: "Annual Strategy Retreat",
          description: "In-depth planning session for long-term goals",
          values: { Core: false, Growth: false, Enterprise: true },
        },
        {
          name: "Dedicated Success Manager",
          description: "A single point of contact for your account",
          values: { Core: false, Growth: false, Enterprise: true },
        },
      ],
    },
    {
      title: "Support SLAs",
      features: [
        { name: "Response Time", values: slaRow("business") },
        {
          name: "On-site Support",
          values: { Core: "Billable", Growth: "Included", Enterprise: "Included" },
        },
      ],
    },
    {
      title: "Digital Asset Sovereignty",
      features: [
        {
          name: "Concierge Domain Management",
          description: `Purchase, DNS configuration, and renewal management at cost + $${getTier("Incubator").basePrice}/mo service fee`,
          values: { Core: true, Growth: true, Enterprise: true },
        },
        {
          name: "Web Hosting Management",
          description: "Coordination with hosting providers and technical setup",
          values: { Core: "Available", Growth: true, Enterprise: true },
        },
        {
          name: "Email Hosting Admin",
          description: "Setup and management of G-Suite / Microsoft 365 mailboxes",
          values: { Core: true, Growth: true, Enterprise: true },
        },
      ],
    },
  ],
  household: [
    {
      title: "Concierge & Lifestyle Services",
      features: [
        {
          name: "Humans (and their devices) Included",
          description: "Number of family members and their personal devices covered",
          values: {
            Solo: "Two Humans",
            Household: "Four Humans",
            "Legacy Care": "Two Humans",
            Estate: "Four Humans",
          },
        },
        {
          name: "Priority 'Red Button' Support",
          description: "Immediate access to support team when you need us",
          values: { Solo: false, Household: false, "Legacy Care": true, Estate: true },
        },
        {
          name: "Digital Legacy Care Planning",
          description: "Organizing digital assets and accounts for next of kin",
          values: { Solo: false, Household: false, "Legacy Care": true, Estate: true },
        },
        {
          name: "Family Proxy (God Mode)",
          description: "Authorized family member access to accounts in emergencies",
          values: { Solo: false, Household: true, "Legacy Care": true, Estate: true },
        },
        {
          name: "Home Network Management",
          description: "Enterprise-grade Wi-Fi setup and ongoing optimization",
          values: { Solo: false, Household: true, "Legacy Care": true, Estate: true },
        },
        {
          name: "ISP & Vendor Diplomacy",
          description: "We deal with the cable company, phone company, and tech vendors for you",
          values: { Solo: false, Household: false, "Legacy Care": true, Estate: true },
        },
      ],
    },
    {
      title: "Technical Support",
      features: [
        {
          name: "Remote Tech Support",
          description: "Helpdesk for personal device and software issues",
          values: { Solo: true, Household: true, "Legacy Care": true, Estate: true },
        },
        {
          name: "Email Admin (G-Suite/Microsoft 365)",
          description: "Setup and management of personal email domains",
          values: { Solo: true, Household: true, "Legacy Care": false, Estate: true },
        },
        {
          name: "Domain & Digital Asset Management",
          description: "Secure registration, DNS, and renewal management for family domains",
          values: { Solo: true, Household: true, "Legacy Care": false, Estate: true },
        },
      ],
    },
    {
      title: "Physical & Digital Protection",
      features: [
        {
          name: "Enterprise Endpoint Security",
          description: "Commercial-grade antivirus for personal devices",
          values: { Solo: false, Household: true, "Legacy Care": true, Estate: true },
        },
        {
          name: "Identity Theft Monitoring",
          description: "Dark web scanning and alert system",
          values: { Solo: false, Household: true, "Legacy Care": true, Estate: true },
        },
        {
          name: "Content Filtering",
          description: "Parental controls and granular device supervision",
          values: { Solo: false, Household: true, "Legacy Care": true, Estate: true },
        },
        {
          name: "Fraud/Scam Air-Gapping",
          description: "Aggressive filtering of unknown callers and emails",
          values: { Solo: false, Household: false, "Legacy Care": true, Estate: true },
        },
      ],
    },
  ],
  incubation: [
    {
      title: "Asset Sovereignty",
      features: [
        {
          name: "Domain Registry Locks",
          description: "Prevents unauthorized domain transfers",
          values: { Incubator: true, "Hold Co": true },
        },
        {
          name: "Whois Privacy",
          description: "Redacts personal contact information",
          values: { Incubator: true, "Hold Co": true },
        },
        {
          name: "DNS Management",
          description: "Advanced DNS configuration for reliability",
          values: { Incubator: true, "Hold Co": true },
        },
        {
          name: "Ad Parking Monetization",
          description: "Generate revenue from unused domains",
          values: { Incubator: true, "Hold Co": true },
        },
      ],
    },
    {
      title: "Corporate Structure",
      features: [
        {
          name: "Consolidated Billing",
          description: "One invoice for all entities",
          values: { Incubator: false, "Hold Co": true },
        },
        {
          name: "Inter-Company Transfers",
          description: "Seamless movement of assets between entities",
          values: { Incubator: "Billable", "Hold Co": true },
        },
        {
          name: "Quarterly Strategy Review",
          description: "Strategic planning for portfolio growth",
          values: { Incubator: false, "Hold Co": true },
        },
      ],
    },
  ],
};

const NONPROFIT_TIER = getTier("Nonprofit Foundation");

export const NONPROFIT_FLAT_RATE = {
  heading: "Simple, Flat-Rate Pricing",
  body: `We believe nonprofits deserve enterprise-grade security without the enterprise price tag. Our ${NONPROFIT_TIER.name} plan includes all our core security features for a flat monthly organization fee, plus direct pass-through costs for user licenses.`,
  points: [
    `What you pay us: $${NONPROFIT_TIER.basePrice}/mo, a flat organization retainer for support, management, and strategic guidance.`,
    "User licenses: at cost. We pass through Microsoft 365 and Google Workspace nonprofit pricing directly.",
  ],
} satisfies SplitFeatureProps;

export const DIGITAL_ASSETS = {
  heading: "Digital Asset Sovereignty",
  description:
    "Your digital portfolio is your modern reputation. We secure it by managing domains, DNS, and email hosting so you're never held hostage by a provider.",
  points: [
    {
      heading: "At-Cost Renewals",
      text: "We pass through the direct cost of domain registration. No markup on the asset itself.",
    },
    {
      heading: "DNS Management",
      text: "We configure SPF, DKIM, and DMARC records to ensure your emails actually land in inboxes.",
    },
    {
      heading: "Portfolio Security",
      text: "Enterprise-grade locking and privacy protection to prevent unauthorized transfers.",
    },
  ],
  price: `$${getTier("Incubator").basePrice}`,
  priceUnit: "/mo",
  priceDetail: "+ pass-through domain fees",
  cta: { label: "Manage My Portfolio", href: routePaths.talkToSales },
} satisfies PricingOfferProps;

export const HOURLY_PACKS = {
  heading: "Retainer & Hourly Packs",
  description:
    "Need support but not ready for a monthly subscription? Purchase a bucket of hours that never expires. Perfect for one-off projects or seasonal help.",
  points: [
    {
      heading: "Flexible Usage",
      text: "Use for IT support, strategy, or crisis response. Hours are deducted as we work.",
    },
    {
      heading: "Never Expires",
      text: "Your hours stay in your account forever. Use them next week or next year.",
    },
    {
      heading: "Priority Queue",
      text: "Retainer clients get priority scheduling over standard ad-hoc requests.",
    },
  ],
  // pricing.ts has no hourly rate yet, so this figure stays as the page
  // published it. It belongs in pricing.ts with the tier prices.
  price: "$150",
  priceUnit: "/hr",
  priceDetail: "Sold in 10hr packs",
  fineprint: "Subject to Terms of Service. Unused hours never expire.",
  cta: WAITLIST,
} satisfies PricingOfferProps;

/** The questions on the page and in its FAQPage structured data. */
export const FAQS: readonly FAQItem[] = [
  {
    question: "Why is there a Base Price + Per User price?",
    answer:
      "The Base Price covers core infrastructure, monitoring systems, and includes your first 2 users. The Per User price applies only to the 3rd user onwards, covering specific licenses and support volume.",
  },
  {
    question: "What counts as a 'User'?",
    answer:
      "A user is a human being with a unique account. We don't charge for service accounts (like 'info@') or inactive shared mailboxes.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer:
      "Yes, you can change your plan at the beginning of any billing cycle. There are no long-term lock-ins for our standard tiers.",
  },
  {
    question: "Do you offer emergency support?",
    answer:
      `Absolutely. ${tierNamesWithSla("business", "priority").join(" and ")} tiers include ` +
      `priority support (${SLA_WINDOW.priority} response), while our Hourly Packs can be used ` +
      `for urgent crisis response ${SLA_WINDOW.capacity}.`,
  },
];

export const FAQ_HEADING = "Executive Briefing";

export const ENTERPRISE_CTA = {
  heading: "Need a custom enterprise solution?",
  text: "We work with larger organizations to build custom infrastructure and growth plans. We don't just manage servers; we protect the people running them. Enterprise engagements start with a conversation about how your organization actually works.",
  ctas: [{ label: "Contact Strategic Sales", href: routePaths.talkToSales }],
} satisfies CTASectionProps;
