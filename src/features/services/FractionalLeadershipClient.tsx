import { Briefcase, FileText, GitMerge, Lock, PieChart, TrendingUp, Users } from "lucide-react";

import { CTASection } from "@/components/sections/CTASection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { PageHeader } from "@/components/sections/PageHeader";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { routePaths } from "../../routes";

const SALES_HREF = `${routePaths.talkToSales}?interest=Fractional%20Leadership`;

const ROLES = [
  {
    icon: GitMerge,
    heading: "Fractional CIO",
    text: "Chief information officer. Aligns the technology roadmap with the business plan, evaluates tool stacks, manages vendor budgets and plans for scale.",
  },
  {
    icon: TrendingUp,
    heading: "Fractional CMO",
    text: "Chief marketing officer. Builds the market position, the lead generation funnels and the brand voice, and manages agencies or junior staff.",
  },
  {
    icon: Lock,
    heading: "Fractional CISO",
    text: "Chief information security officer. Develops governance, risk and compliance strategy, runs the audits and plans disaster recovery.",
  },
] as const;

const DELIVERABLES = [
  {
    icon: PieChart,
    heading: "Three year roadmaps",
    text: "We build the plan that says what to buy, when to hire and how to grow.",
  },
  {
    icon: Users,
    heading: "Vendor management",
    text: "We sit on the phone with your software vendors and negotiate the rates.",
  },
  {
    icon: Briefcase,
    heading: "Hiring and team building",
    text: "We write the job descriptions, interview for technical roles and structure your departments.",
  },
  {
    icon: FileText,
    heading: "Board reporting",
    text: "We prepare the decks and present the metrics your investors and board members ask for.",
  },
] as const;

const ENGAGEMENT = [
  "Weekly executive meeting: one hour a week.",
  "Team management one to ones: two hours a week.",
  "Deep work and strategy: five hours a week.",
] as const;

export function FractionalLeadershipClient() {
  return (
    <>
      <PageHeader
        align="center"
        scheme="dark"
        heading="Executive strategy, fractional cost."
        description="We embed in your leadership team and take responsibility for the outcome rather than the hours."
        ctas={[{ label: "Match with a leader", href: SALES_HREF }]}
      />

      <FeatureGrid scheme="cream" heading="The roles we fill" items={ROLES} />

      <SplitFeature
        heading="We do not just advise. We execute."
        body="A consultant hands you a binder and leaves. A fractional leader owns the number and answers for the department's success or failure."
      />

      <FeatureGrid scheme="cream" heading="What you get" items={DELIVERABLES} columns={4} />

      <SplitFeature
        heading="What an engagement looks like"
        body="A weekly rhythm rather than a block of hours, at roughly eight hours a week."
        points={ENGAGEMENT}
      />

      <CTASection
        scheme="dark"
        heading="Leadership waiting for you."
        text="Start with a leader next week."
        ctas={[{ label: "Contact us", href: SALES_HREF }]}
      />
    </>
  );
}
