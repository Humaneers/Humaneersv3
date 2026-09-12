"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
import { PageHeader } from "@/components/sections/PageHeader";
import { PricingComparison } from "@/components/sections/PricingComparison";
import { PricingOffer } from "@/components/sections/PricingOffer";
import { PricingPlans } from "@/components/sections/PricingPlans";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { tiersForSegment, type TierSegment } from "@/data/pricing";
import { setSessionContext, type SessionContext } from "@/lib/session";

import {
  COMPARISON,
  COMPARISON_INTRO,
  DIGITAL_ASSETS,
  ENTERPRISE_CTA,
  FAQS,
  FAQ_HEADING,
  HERO,
  HOURLY_PACKS,
  NONPROFIT_FLAT_RATE,
  PLANS_INTRO,
  PLAN_NOTES,
  PLAN_TABS,
  segmentFromParam,
} from "./content";

/** The segment names the session context uses for the CRM. */
const SESSION_SEGMENT: Record<TierSegment, NonNullable<SessionContext["segment"]>> = {
  business: "business",
  household: "family",
  nonprofit: "nonprofit",
  incubation: "venture",
};

/**
 * `segment` is the ?mode= the server rendered, so the first HTML already holds
 * that segment's plans and prices. A tab change updates the page at once and
 * writes ?mode= back to the URL, so a copied link opens on the same segment.
 */
export function PricingClient({ segment: requested }: { segment: TierSegment }) {
  const router = useRouter();
  const pathname = usePathname();
  const [segment, setSegment] = useState(requested);

  // A link elsewhere can land on this page with another ?mode= while it is
  // mounted (the header's Pricing link, say). Follow the server's value then.
  const [lastRequested, setLastRequested] = useState(requested);
  if (requested !== lastRequested) {
    setLastRequested(requested);
    setSegment(requested);
  }

  function selectSegment(value: string) {
    const next = segmentFromParam(value);
    setSegment(next);
    setSessionContext({ segment: SESSION_SEGMENT[next] });
    // replace, not push: a tab is not a page, so Back leaves the page instead of
    // stepping through tabs. Other query parameters are kept.
    const params = new URLSearchParams(window.location.search);
    params.set("mode", next);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const comparison = COMPARISON[segment];

  return (
    <>
      <PageHeader {...HERO} scheme="cream" />
      <PricingPlans
        {...PLANS_INTRO}
        tabs={PLAN_TABS}
        value={segment}
        onValueChange={selectSegment}
        notes={PLAN_NOTES}
      />
      {segment === "nonprofit" ? (
        <SplitFeature {...NONPROFIT_FLAT_RATE} scheme="cream" />
      ) : (
        comparison && (
          <PricingComparison
            {...COMPARISON_INTRO}
            plans={tiersForSegment(segment).map((tier) => tier.name)}
            categories={comparison}
            scheme="cream"
          />
        )
      )}
      <PricingOffer {...DIGITAL_ASSETS} scheme="dark" />
      <PricingOffer {...HOURLY_PACKS} />
      <FAQSection heading={FAQ_HEADING} items={FAQS} scheme="cream" />
      <CTASection {...ENTERPRISE_CTA} />
    </>
  );
}
