import { Activity, Building2, Gavel } from "lucide-react";

import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { PageHeader } from "@/components/sections/PageHeader";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { routePaths } from "../../routes";

const INDUSTRIES = [
  {
    icon: Activity,
    heading: "Healthcare and dental",
    text: "HIPAA work. We secure patient data, manage access to your records system and get you through an audit. Business associate agreements, encrypted email and audit logs are part of it.",
  },
  {
    icon: Building2,
    heading: "Financial services",
    text: "FINRA, SEC and GLBA work. We protect client assets and meet the cybersecurity guidelines your examiners apply. Data loss prevention, archiving and access controls are part of it.",
  },
  {
    icon: Gavel,
    heading: "Legal firms",
    text: "Client confidentiality work. We protect privileged communications and keep case files reachable from anywhere. Matter centric security, mobile device management and ethical walls are part of it.",
  },
] as const;

const AUDIT_READY = [
  "Living documentation: policies that update as the regulations change.",
  "Zero trust architecture: never trust, always verify, for every user.",
  "Data loss prevention: sensitive files are stopped before they leave your network.",
] as const;

const CONTROL_SETS = [
  "HIPAA Security Rule",
  "NIST CSF alignment",
  "SOC 2 Type II control mapping",
  "GDPR readiness",
] as const;

export function IndustriesClient() {
  return (
    <>
      <PageHeader
        align="center"
        scheme="dark"
        heading="Compliance is not optional."
        description="In a regulated industry, IT that is only good enough gets you fined. We build infrastructure that survives audits and protects your license to operate."
        ctas={[
          {
            label: "Schedule a compliance review",
            href: `${routePaths.talkToSales}?interest=Regulated%20Industries`,
          },
        ]}
      />

      <FeatureGrid heading="The industries we work in" items={INDUSTRIES} />

      <SplitFeature
        scheme="cream"
        heading="We speak auditor"
        body="When the auditor arrives, the evidence is already collected. We build systems that are audit ready from the first day, with evidence collection and policy enforcement running on their own."
        points={AUDIT_READY}
      />

      <SplitFeature
        scheme="dark"
        heading="What the risk assessment covers"
        body="Four control sets we read your environment against. The score is yours, not ours."
        points={CONTROL_SETS}
        ctas={[{ label: "Get a free risk assessment", href: routePaths.contact }]}
      />
    </>
  );
}
