"use client";

import { Briefcase, Fingerprint, Laptop, Mail, Shield, Smartphone, User } from "lucide-react";

import { CTASection } from "@/components/sections/CTASection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { PageHeader } from "@/components/sections/PageHeader";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { getTier, SLA_LABEL, startingPrice } from "@/data/pricing";

import { routePaths } from "../../routes";

const AUDIENCES = [
  {
    icon: Fingerprint,
    heading: "Consultants and Agencies",
    text: "You handle sensitive client data and need to prove you are secure (SOC 2 ready).",
  },
  {
    icon: Briefcase,
    heading: "Angel Investors",
    text: "You need a secure, separate environment for deal flow and board communications.",
  },
  {
    icon: Smartphone,
    heading: "Digital Nomads",
    text: "You work from coffee shops and Airbnbs and need a reliable VPN and device tracking.",
  },
] as const;

export function PersonalClient() {
  const soloTier = getTier("Solo");

  const proStack = [
    {
      icon: Mail,
      heading: "Custom Email",
      text: "We migrate you to Microsoft 365 or Google Workspace with a custom domain (@yourname.com).",
    },
    {
      icon: Laptop,
      heading: "Device Setup",
      text: "We configure your Mac or PC remotely with encryption, backups, and essential software.",
    },
    {
      icon: Shield,
      heading: "Endpoint Security",
      text: "Enterprise-grade antivirus and 24/7 monitoring. No pop-ups, just protection running in the background.",
    },
    {
      icon: User,
      heading: "Tech Support",
      text: `Text or email us when things break. We fix printer issues, wifi glitches, and weird errors. ${soloTier.name} carries a ${SLA_LABEL[soloTier.slaLevel].toLowerCase()} response, with no fixed SLA.`,
    },
  ];

  return (
    <>
      <PageHeader
        align="center"
        scheme="dark"
        heading="Powerful Tools for the Company of One."
        description="Just because you're solo doesn't mean you should look small. Get the enterprise email, security, and support you need to win big clients."
        ctas={[
          { label: "View Pricing", href: `${routePaths.pricing}?mode=household` },
          { label: "Talk to Sales", href: `${routePaths.talkToSales}?interest=Personal%20IT` },
        ]}
      />

      <SplitFeature
        scheme="cream"
        heading={`The "Pro" Stack`}
        body="Stop using @gmail.com and hoping your hard drive doesn't crash. We set you up with the same tools global enterprise executives use, scaled down to a single user price."
      />

      <FeatureGrid heading="What we set up for you." items={proStack} columns={4} />

      <FeatureGrid scheme="dark" heading="Who is this for?" items={AUDIENCES} columns={3} />

      <CTASection
        scheme="cream"
        heading="Set up the company of one."
        text={`Household plans start at $${startingPrice("household")} a month.`}
        ctas={[{ label: "View Pricing", href: `${routePaths.pricing}?mode=household` }]}
      />
    </>
  );
}
