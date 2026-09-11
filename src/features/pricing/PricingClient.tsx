"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

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

export function PricingClient() {
  const searchParams = useSearchParams();
  const [segment, setSegment] = useState(() =>
    segmentFromParam(searchParams.get("mode") ?? undefined)
  );

  function selectSegment(value: string) {
    const next = segmentFromParam(value);
    setSegment(next);
    setSessionContext({ segment: SESSION_SEGMENT[next] });
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
