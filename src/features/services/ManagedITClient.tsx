"use client";

import {
  ClipboardList,
  Headphones,
  Server,
  Shield,
  Smartphone,
  TrendingUp,
  Wifi,
  Wrench,
  Zap,
} from "lucide-react";

import { CTASection } from "@/components/sections/CTASection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { PageHeader } from "@/components/sections/PageHeader";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { startingPrice } from "@/data/pricing";

import { routePaths } from "../../routes";

const CAPABILITIES = [
  {
    icon: Headphones,
    heading: "100% US-Based Helpdesk",
    text: "No offshore call centers. Talk to a US-based engineer who knows your business by name.",
  },
  {
    icon: Server,
    heading: "Hybrid and Cloud Infrastructure",
    text: "We secure on-prem servers or migrate you to the cloud (AWS or Azure) depending on your needs.",
  },
  {
    icon: Smartphone,
    heading: "Mobile Device Management (MDM)",
    text: "Secure company data on personal phones without spying on your employees.",
  },
  {
    icon: Shield,
    heading: "Endpoint Security and Monitoring",
    text: "Enterprise-grade endpoint protection, DNS filtering, and 24/7 monitoring included.",
  },
  {
    icon: Wifi,
    heading: "Remote and On-Site Support",
    text: "We fix issues remotely where we can. When an issue cannot be fixed remotely, we dispatch an engineer to any US zip code.",
  },
  {
    icon: Zap,
    heading: "Zero-Touch Onboarding",
    text: "We ship laptops pre-configured. New hires open the box and start working.",
  },
] as const;

const JOURNEY = [
  {
    icon: ClipboardList,
    heading: "1. Assessment and Roadmap",
    text: "We scan your network, identify gaps, and build a 12-month stabilization plan.",
  },
  {
    icon: Wrench,
    heading: "2. Stabilization Sprint",
    text: "We fix critical vulnerabilities, deploy security agents, and clean up messy cabling.",
  },
  {
    icon: TrendingUp,
    heading: "3. Management and Growth",
    text: "We monitor 24/7, handle all helpdesk tickets, and meet quarterly for strategy.",
  },
] as const;

const REACH = [
  "Remote first: we resolve tickets through our secure agents whenever we can, so a fix does not wait for a truck roll.",
  "Logistics handled: we ship pre-configured hardware directly to your employees' homes, anywhere in the US.",
  "On-site dispatch: for hardware failures, we send a technician to your site.",
] as const;

export function ManagedITClient() {
  return (
    <>
      <PageHeader
        align="center"
        scheme="dark"
        heading="Managed IT that Sleeps So You Don't Have To."
        description="Enterprise-grade infrastructure and US-based support, scaled for small business budgets. We are accepting new clients for Q1."
        ctas={[
          {
            label: "Get a Network Assessment",
            href: `${routePaths.talkToSales}?interest=Managed%20IT`,
          },
          { label: "View Pricing", href: routePaths.pricing },
        ]}
      />

      <SplitFeature
        scheme="cream"
        heading="Stop settling for break/fix support."
        body="Most managed service providers (MSPs) operate on a broken model: they profit when you have problems. They stick a band-aid on issues and bill you for the service call."
        points={[
          "Unpredictable hourly bills",
          "Slow response times",
          "Band-aid fixes that do not hold",
        ]}
      />

      <SplitFeature
        heading="Incentives aligned with your uptime."
        body="We operate on a subscription model. We only profit when your systems are running well, so we work to prevent issues before they happen."
      />

      <FeatureGrid
        scheme="cream"
        eyebrow="What is included"
        heading="Everything your team needs, managed in one place."
        items={CAPABILITIES}
        columns={3}
      />

      <SplitFeature
        heading="Nationwide reach, local feel."
        body="Our Tempe, AZ headquarters is just the hub. We use remote management tools to support clients in all 50 states, and we ship hardware wherever your people are."
        points={REACH}
      />

      <FeatureGrid
        scheme="dark"
        heading="Your journey to IT stability."
        items={JOURNEY}
        columns={3}
      />

      <CTASection
        scheme="cream"
        heading="Ready to upgrade your infrastructure?"
        text={`Business plans start at $${startingPrice("business")} a month. Get a roadmap before you commit. No credit card required, and no high-pressure sales.`}
        ctas={[{ label: "View Pricing", href: `${routePaths.pricing}?mode=business` }]}
      />
    </>
  );
}
