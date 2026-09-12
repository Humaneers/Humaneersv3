"use client";

import { Eye, Fingerprint, Home, Lock, Smartphone, Wifi } from "lucide-react";

import { CTASection } from "@/components/sections/CTASection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { PageHeader } from "@/components/sections/PageHeader";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { getTier, startingPrice } from "@/data/pricing";

import { routePaths } from "../../routes";

const PROTECTIONS = [
  {
    icon: Lock,
    heading: "Enterprise Endpoint Protection",
    text: "The same CrowdStrike and SentinelOne agents used by enterprise teams, deployed on your family Macs and PCs.",
  },
  {
    icon: Wifi,
    heading: "Secure Home Network",
    text: "We configure your Wi-Fi with VLANs to separate work devices from smart fridges and gaming consoles.",
  },
  {
    icon: Eye,
    heading: "Dark Web Monitoring",
    text: "We scan the dark web for your family's passwords and social security numbers, and alert you when one turns up.",
  },
  {
    icon: Smartphone,
    heading: "Parental Controls",
    text: "Content filtering that works. Block adult content and gambling, and manage screen time.",
  },
  {
    icon: Fingerprint,
    heading: "Identity Theft Restoration",
    text: "A dedicated case manager works your case with you until your identity is restored.",
  },
  {
    icon: Home,
    heading: "Smart Home Security",
    text: "IoT hardening for cameras, locks, and microphones to prevent digital eavesdropping.",
  },
] as const;

const RISKS = [
  "ISP routers usually have default passwords.",
  "Smart cameras often send data to untrusted servers.",
  "Personal emails lack 2FA enforcement.",
] as const;

const GRANDPARENT_POINTS = [
  "Bank-grade anti-phishing filters",
  "Remote support for 'how do I print this?' calls",
  "Scam call blocking on mobile devices",
] as const;

export function FamilyProtectionClient() {
  const legacyCare = getTier("Legacy Care");

  return (
    <>
      <PageHeader
        align="center"
        scheme="dark"
        heading="Enterprise Security, Now for Your Living Room."
        description="Hackers know your home Wi-Fi is the backdoor to your business and bank accounts. We close that door."
        ctas={[
          { label: "Secure My Family", href: `${routePaths.pricing}?mode=household` },
          {
            label: "Talk to Sales",
            href: `${routePaths.talkToSales}?interest=Family%20Protection`,
          },
        ]}
      />

      <SplitFeature
        scheme="cream"
        heading="Your antivirus isn't enough anymore."
        body="High-net-worth individuals and business owners are targeted specifically. An attacker can jump from your kid's iPad to your home Wi-Fi, then to your laptop, and finally into your corporate bank account."
        points={RISKS}
      />

      <FeatureGrid
        eyebrow="Institutional security for the home"
        heading="We license enterprise tools and manage them for you."
        items={PROTECTIONS}
        columns={3}
      />

      <SplitFeature
        scheme="cream"
        heading={`The "Grandparent Guarantee"`}
        body={`Wire fraud often targets your parents rather than you. ${legacyCare.name} is a protection tier for seniors that locks down their finances and devices without making them hard to use, at $${legacyCare.basePrice} a month.`}
        points={GRANDPARENT_POINTS}
        ctas={[
          {
            label: "View Senior Plans",
            href: `${routePaths.pricing}?mode=household&highlight=senior`,
          },
        ]}
      />

      <CTASection
        scheme="dark"
        heading="Protect What Matters Most"
        text={`Household plans start at $${startingPrice("household")} a month. A home network health check includes a privacy review, password strengthening, and a fraud protection check for grandparents.`}
        ctas={[
          {
            label: "Get a Home Network Health Check",
            href: `${routePaths.talkToSales}?interest=Family%20Protection`,
          },
        ]}
      />
    </>
  );
}
