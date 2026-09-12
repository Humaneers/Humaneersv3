import {
  BarChart3,
  Hammer,
  LayoutTemplate,
  Megaphone,
  PenTool,
  Rocket,
  Search,
  Target,
} from "lucide-react";

import { CTASection } from "@/components/sections/CTASection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { PageHeader } from "@/components/sections/PageHeader";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { routePaths } from "../../routes";

const SALES_HREF = `${routePaths.talkToSales}?interest=Fractional%20Growth`;

const SERVICES = [
  {
    icon: Target,
    heading: "Strategic positioning",
    text: "We define who you are, who you serve and why you matter.",
  },
  {
    icon: PenTool,
    heading: "Visual identity and design",
    text: "Branding that holds its own next to companies much larger than yours.",
  },
  {
    icon: Search,
    heading: "SEO and content strategy",
    text: "Content that answers the questions your buyers are already searching for.",
  },
  {
    icon: LayoutTemplate,
    heading: "Website engineering",
    text: "Fast websites built on modern stacks, React and Next.js among them.",
  },
  {
    icon: Megaphone,
    heading: "Go to market execution",
    text: "Launch plans, automated email flows and paid media management.",
  },
  {
    icon: BarChart3,
    heading: "Revenue operations",
    text: "Your CRM, marketing tools and sales data connected into one source of truth.",
  },
] as const;

const METHOD = [
  "Stop talking about features and start selling outcomes.",
  "Design that builds trust before you say a word.",
  "Automations that follow up on leads while you sleep.",
] as const;

const PROCESS = [
  {
    icon: Search,
    heading: "Step one: diagnosis",
    text: "We audit your brand, your traffic and your conversion funnels to find where they leak.",
  },
  {
    icon: Hammer,
    heading: "Step two: foundation",
    text: "We fix the messaging and build the assets you need, the website, the decks and the collateral.",
  },
  {
    icon: Rocket,
    heading: "Step three: acceleration",
    text: "We turn on the traffic sources and tune them against real revenue data.",
  },
] as const;

export function GrowthClient() {
  return (
    <>
      <PageHeader
        align="center"
        scheme="dark"
        heading="Make your brand impossible to ignore."
        description="We bring senior marketing leadership to small businesses. No agencies and no junior account managers."
        ctas={[
          { label: "See business plans", href: `${routePaths.pricing}?mode=business` },
          { label: "Book a strategy call", href: SALES_HREF },
        ]}
      />

      <FeatureGrid scheme="cream" heading="What we do" items={SERVICES} />

      <SplitFeature
        heading="Too big to do it yourself, too small for a full time CMO."
        body="A full time marketing executive is a salaried hire with a search to run first. An agency gives you a junior team working across a roster of other clients. We are the third option: senior fractional leadership, bought as a service."
      />

      <SplitFeature
        scheme="cream"
        heading={'The "Americanization" of enterprise tech.'}
        body="We borrow the playbook the large technology companies use, which is clean design, clear messaging and product led growth, and we apply it to service businesses."
        points={METHOD}
      />

      <FeatureGrid scheme="dark" heading="How we scale you" items={PROCESS} />

      <CTASection
        scheme="cream"
        heading="Stop guessing. Start growing."
        text="Let us audit your current setup and find what is worth fixing first."
        ctas={[{ label: "Book a strategy call", href: SALES_HREF }]}
      />
    </>
  );
}
