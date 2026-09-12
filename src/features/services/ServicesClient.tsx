"use client";

import {
  AlertTriangle,
  BarChart3,
  Building2,
  Heart,
  Lock,
  MapPin,
  Server,
  Shield,
  Unlock,
  Users,
} from "lucide-react";

import { CTASection } from "@/components/sections/CTASection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { PageHeader } from "@/components/sections/PageHeader";
import { getTier } from "@/data/pricing";

import { routePaths } from "../../routes";

const LEARN_MORE = "Learn more";

const SERVICES = [
  {
    icon: Server,
    heading: "Managed IT",
    text: "Enterprise infrastructure with a craftsman touch. US-based helpdesk, hybrid and cloud infrastructure, and proactive security monitoring.",
    link: { label: LEARN_MORE, href: routePaths.managedIt },
  },
  {
    icon: BarChart3,
    heading: "Brand Growth",
    text: "US-ready brand and go-to-market strategy. Brand localization, visual identity refinement, and go-to-market planning.",
    link: { label: LEARN_MORE, href: routePaths.growth },
  },
  {
    icon: Shield,
    heading: "Family Protection",
    text: "Secure home-office tech for families and execs. Home network segmentation, content filtering, and dark web monitoring.",
    link: { label: LEARN_MORE, href: routePaths.familyProtection },
  },
  {
    icon: Users,
    heading: "Fractional Leadership",
    text: "vCIO and vCMO strategy without the full-time cost. Quarterly business reviews, budgeting and procurement, and board representation.",
    link: { label: LEARN_MORE, href: routePaths.fractionalLeadership },
  },
  {
    icon: AlertTriangle,
    heading: "Reputation Management",
    text: "Digital scrubbing and reputation defense. SEO suppression, digital scrubbing, and social media lockdown.",
    link: { label: LEARN_MORE, href: routePaths.crisisManagement },
  },
  {
    icon: Heart,
    heading: "Senior Care",
    text: "Dignified tech support and fraud protection for seniors. Fraud air-gapping, device simplification, and red button support.",
    link: { label: LEARN_MORE, href: routePaths.seniorCare },
  },
  {
    icon: Building2,
    heading: "Nonprofit IT",
    text: "Mission-focused IT at nonprofit rates. Grant-ready policies, donor data protection, and at-cost licensing.",
    link: { label: LEARN_MORE, href: routePaths.nonProfits },
  },
] as const;

const HOW_WE_WORK = [
  {
    icon: MapPin,
    heading: "US-Based",
    text: "No offshore call centers. Every engineer and strategist is local.",
  },
  {
    icon: Lock,
    heading: "Encrypted",
    text: "Enterprise-grade security controls applied to every client, big or small.",
  },
  {
    icon: Unlock,
    heading: "No Vendor Lock-in",
    text: "We build on standard stacks (Microsoft, AWS) so you own your infrastructure.",
  },
] as const;

export function ServicesClient() {
  const essentialsTier = getTier("Core");

  return (
    <>
      <PageHeader
        align="center"
        scheme="dark"
        heading="Comprehensive Services for Modern Growth."
        description="From the server room to the board room, we provide the technology and strategy you need to scale."
      />

      <FeatureGrid
        scheme="cream"
        eyebrow="Full spectrum support"
        heading="Every service we run, in one place."
        items={SERVICES}
        columns={3}
      />

      <FeatureGrid heading="How we work." items={HOW_WE_WORK} columns={3} />

      <CTASection
        scheme="dark"
        heading="Not sure where to start?"
        text={`Our "${essentialsTier.name}" plan covers the essentials for most businesses. Tell us what you need and we will point you at the right one.`}
        ctas={[
          {
            label: "Talk to Sales",
            href: `${routePaths.talkToSales}?source=Services%20Overview%20Page`,
          },
        ]}
      />
    </>
  );
}
