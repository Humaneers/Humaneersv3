"use client";

import { FileText, Shield, Users } from "lucide-react";

import { CTASection } from "@/components/sections/CTASection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { PageHeader } from "@/components/sections/PageHeader";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { getTier } from "@/data/pricing";

import { routePaths } from "../../routes";

const CAPABILITIES = [
  {
    icon: Shield,
    heading: "Donor Data Protection",
    text: "Secure your donor lists and financial data to meet compliance standards.",
  },
  {
    icon: FileText,
    heading: "Grant-Ready Policies",
    text: "We write the cybersecurity and data privacy sections for your grant applications (NIST and SOC 2 aligned).",
  },
  {
    icon: Users,
    heading: "Board Reporting",
    text: "Clear, plain-English reports on risk and budget for your quarterly board meetings.",
  },
] as const;

const MODEL = [
  "Flat retainer: one predictable monthly fee for the org.",
  "At-cost licensing: we pass through Microsoft and Google nonprofit grants directly to you, at zero margin.",
  "Volunteer accounts: heavily discounted secure access for temporary staff.",
] as const;

export function NonProfitsClient() {
  const nonprofitTier = getTier("Nonprofit Foundation");

  return (
    <>
      <PageHeader
        align="center"
        scheme="dark"
        heading="Focus on the Mission. We'll Handle the Machines."
        description="Grant applications ask for cybersecurity and data privacy policies. We write those sections and run the IT behind them, at rates built for 501(c)(3) organizations."
        ctas={[{ label: "View Nonprofit Plans", href: `${routePaths.pricing}?mode=nonprofit` }]}
      />

      <SplitFeature
        scheme="cream"
        heading="Stop overpaying for per-user licenses you don't use."
        body={`Most IT firms charge nonprofits the same per-seat rate as law firms. Volunteers and part-time staff should not cost what full-time staff cost. ${nonprofitTier.name} starts at $${nonprofitTier.basePrice} a month for the organization.`}
        points={MODEL}
      />

      <FeatureGrid
        eyebrow="Why it's different"
        heading="What you get with nonprofit IT."
        items={CAPABILITIES}
        columns={3}
      />

      <CTASection
        scheme="dark"
        heading="Ready to modernize your mission?"
        text="Tell us which grants you are applying for and we will tell you what the technology sections need."
        ctas={[
          {
            label: "Get Grant-Ready",
            href: `${routePaths.talkToSales}?interest=Nonprofit%20Grant%20Readiness`,
          },
        ]}
      />
    </>
  );
}
