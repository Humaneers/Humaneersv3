import { DollarSign, FileText, Lock, Rocket } from "lucide-react";

import { CTASection } from "@/components/sections/CTASection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { PageHeader } from "@/components/sections/PageHeader";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { routePaths } from "../../routes";
import { PortfolioCalculator } from "./PortfolioCalculator";

const PILLARS = [
  {
    icon: Lock,
    heading: "Custodial security",
    text: "Registry locking, DNSSEC and access controls, so a domain cannot be transferred away or its DNS hijacked.",
  },
  {
    icon: DollarSign,
    heading: "Smart monetization",
    text: "Parking pages that suit the domain and earn ad revenue against its renewal cost.",
  },
  {
    icon: FileText,
    heading: "Compliance watchtower",
    text: "We track beneficial ownership information filings and annual reports for every entity you hold.",
  },
  {
    icon: Rocket,
    heading: "One click genesis",
    text: "When an idea is ready to launch, we provision email, banking relationships and cloud infrastructure for the new entity.",
  },
] as const;

const PORTFOLIO_POINTS = [
  "Centralized billing across the whole portfolio.",
  "Brokerage negotiation included.",
  "No upsell mail from the registrar.",
] as const;

export function VenturePortfolioClient() {
  return (
    <>
      <PageHeader
        scheme="dark"
        heading="Your ideas deserve a safe harbor."
        description="From a raw domain to an operating entity. We hold the infrastructure a holding company needs, so your attention goes to the next idea instead of the renewals."
        ctas={[
          {
            label: "Secure my portfolio",
            href: `${routePaths.talkToSales}?interest=Venture%20Portfolio`,
          },
        ]}
      />

      <FeatureGrid heading="Digital asset sovereignty" items={PILLARS} columns={4} />

      <SplitFeature
        scheme="dark"
        heading="The cost of chaos"
        body="Forgotten renewals, unfiled reports and domains earning nothing all cost money quietly. Putting them in one place is the point of this service."
        points={PORTFOLIO_POINTS}
      />

      <PortfolioCalculator />

      <CTASection
        scheme="dark"
        heading="Ready to professionalize your portfolio?"
        text="Tell us what you hold and we will tell you what it takes to run it."
        ctas={[
          { label: "View pricing", href: routePaths.pricing },
          { label: "Contact the strategy team", href: routePaths.contact },
        ]}
      />
    </>
  );
}
