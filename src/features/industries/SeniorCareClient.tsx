"use client";

import { FileHeart, Heart, LayoutGrid, Phone, ShieldCheck, UserPlus } from "lucide-react";

import { CTASection } from "@/components/sections/CTASection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { PageHeader } from "@/components/sections/PageHeader";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { getTier } from "@/data/pricing";

import { routePaths } from "../../routes";

/** The number published on the site; dial format for the link, spoken format for the label. */
const PHONE_HREF = "tel:+19284401505";
const PHONE_LABEL = "Call (928) 440-1505";

const CARE = [
  {
    icon: LayoutGrid,
    heading: "Simplification First",
    text: 'We declutter iPads and computers. We remove confusing apps, enlarge fonts, and set up "One-Click" video calls to family.',
  },
  {
    icon: ShieldCheck,
    heading: "Fraud Air-Gap",
    text: 'We install aggressive ad-blocking and DNS filtering that stops "tech support scams" before they even load.',
  },
  {
    icon: Heart,
    heading: "On-Call Patience",
    text: "Your parents can call us. We never talk down to them. We listen, explain slowly, and fix the issue with kindness.",
  },
] as const;

const FAMILY = [
  {
    icon: UserPlus,
    heading: "Proxy Access",
    text: 'We give you (the adult child) "God Mode" access to oversee their device security status remotely.',
  },
  {
    icon: Phone,
    heading: 'The "Red Button"',
    text: "They can press one button to reach a US-based person. No navigating complex support numbers or automated menus.",
  },
  {
    icon: FileHeart,
    heading: "Digital Estate Planning",
    text: "We help organize passwords and accounts so that their digital legacy is secure and accessible to executors.",
  },
] as const;

export function SeniorCareClient() {
  const legacyCare = getTier("Legacy Care");

  return (
    <>
      <PageHeader
        align="center"
        scheme="dark"
        heading="Technology with Dignity."
        description="For seniors, technology is a lifeline to family, not just a tool. We protect them from scams, simplify their devices, and provide patient, respectful support."
        ctas={[
          { label: PHONE_LABEL, href: PHONE_HREF },
          {
            label: "View Pricing",
            href: `${routePaths.pricing}?mode=household&highlight=senior`,
          },
        ]}
      />

      <SplitFeature
        scheme="cream"
        heading={`The "Grandchild Gap"`}
        body="You want your parents to be connected, but you don't have the time to be their tech support. Meanwhile, fraud aimed at older people keeps growing: people over 60 reported more than $3.4 billion in losses in 2023, according to the FBI Internet Crime Complaint Center Elder Fraud Report, 2023."
      />

      <FeatureGrid heading="How we support them." items={CARE} columns={3} />

      <FeatureGrid
        scheme="cream"
        heading="Peace of mind for the whole family."
        items={FAMILY}
        columns={3}
      />

      <CTASection
        scheme="dark"
        heading="Talk to a person about your parents."
        text={`${legacyCare.name} is $${legacyCare.basePrice} a month. Call us and a US-based person will pick up, or send us the details and we will call you.`}
        ctas={[
          {
            label: "Talk to Sales",
            href: `${routePaths.talkToSales}?interest=Senior%20Care`,
          },
          { label: PHONE_LABEL, href: PHONE_HREF },
        ]}
      />
    </>
  );
}
