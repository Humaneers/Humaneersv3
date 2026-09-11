import type { Metadata } from "next";
import { PricingClient } from "../../features/pricing/PricingClient";
import { FAQS, segmentFromParam } from "../../features/pricing/content";
import { StructuredData, schemas } from "../../components/StructuredData";
import { getTier, startingPrice } from "../../data/pricing";

// Both figures come from pricing.ts. The previous copy read "$90/user" and
// "$45/month", neither of which is a price the site publishes.
const BUSINESS_FROM = `$${startingPrice("business")}/month`;
const FAMILY_FROM = `$${getTier("Household").basePrice}/month`;

export const metadata: Metadata = {
  title: "Humaneers | Transparent Managed IT Pricing | No Hidden Fees",
  description:
    "Clear pricing for managed IT, family protection, and fractional leadership. No per-device fees for households, no markup on nonprofit licensing.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Transparent Pricing | Humaneers",
    description: `Enterprise-grade managed IT starting at ${BUSINESS_FROM}. Family protection from ${FAMILY_FROM}. No hidden fees, no per-device charges.`,
    url: "https://humaneers.dev/pricing",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Humaneers Pricing - Transparent IT Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Transparent Pricing | Humaneers",
    description: `Enterprise-grade managed IT starting at ${BUSINESS_FROM}. Family protection from ${FAMILY_FROM}.`,
    images: ["/og-image.jpg"],
  },
};

/**
 * Reads ?mode= on the server so the HTML already holds the requested segment's
 * plans and prices: crawlers, clients without JavaScript and anyone opening a
 * shared link get them in the first response. Reading searchParams makes this
 * route render per request instead of at build time.
 */
export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { mode } = await searchParams;

  return (
    <>
      <StructuredData
        data={[
          schemas.faqPage([...FAQS]),
          schemas.service(
            "IT Support Pricing",
            "Transparent pricing for managed IT, family protection, and fractional leadership."
          ),
          schemas.breadcrumb([
            { name: "Home", url: "https://humaneers.dev" },
            { name: "Pricing", url: "https://humaneers.dev/pricing" },
          ]),
        ]}
      />
      <PricingClient segment={segmentFromParam(mode)} />
    </>
  );
}
