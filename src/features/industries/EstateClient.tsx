import { Home, Server, Shield, Wifi } from "lucide-react";

import { CTASection } from "@/components/sections/CTASection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { PageHeader } from "@/components/sections/PageHeader";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { getTier, SLA_WINDOW } from "@/data/pricing";
import { routePaths } from "../../routes";

const ESTATE_TIER = getTier("Estate");

const ESTATE_MODEL = [
  "Vendor management: we talk to the AV and alarm companies for you.",
  "Enterprise Wi-Fi: heat mapped, redundant and monitored 24/7.",
  `Priority support: the Estate plan carries a response window of ${SLA_WINDOW[ESTATE_TIER.slaLevel]}.`,
] as const;

const MANAGED = [
  {
    icon: Wifi,
    heading: "Network management",
    text: "We manage Unifi, Ruckus and Cisco Meraki networks so coverage holds in every room, including the pool house.",
  },
  {
    icon: Shield,
    heading: "Privacy and anonymity",
    text: "We remove your personal information from data broker sites and secure your digital footprint.",
  },
  {
    icon: Home,
    heading: "ISP relations",
    text: "We negotiate with Cox, CenturyLink and Starlink on your behalf and monitor uptime.",
  },
  {
    icon: Server,
    heading: "Personal email",
    text: "Custom domain management for the whole family on Microsoft 365 or Google.",
  },
] as const;

export function EstateClient() {
  return (
    <>
      <PageHeader
        align="center"
        scheme="dark"
        heading="The smart home, managed."
        description="For homes that run like businesses. We provide enterprise grade Wi-Fi, vendor management and a 24/7 emergency line for the modern estate."
        ctas={[
          {
            label: "View concierge plans",
            href: `${routePaths.pricing}?mode=household&tier=estate`,
          },
        ]}
      />

      <SplitFeature
        scheme="cream"
        heading="Your home technology is too complex for a consumer help desk."
        body="You have Control4, Savant, multiple Wi-Fi access points and critical security cameras. When something breaks, the AV company blames the internet provider and the provider blames your router. We sit in the middle and own the problem."
        points={ESTATE_MODEL}
      />

      <FeatureGrid heading="What we manage" items={MANAGED} columns={2} />

      <CTASection
        scheme="dark"
        heading="Upgrade your home life."
        text="Stop being the IT department for your household. Let us handle it."
        ctas={[
          {
            label: "Get a private consultation",
            href: `${routePaths.talkToSales}?interest=Estate%20/%20Private%20Client%20Services`,
          },
        ]}
      />
    </>
  );
}
