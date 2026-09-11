"use client";

import { AlertTriangle, EyeOff, Fingerprint, History, Lock, Search } from "lucide-react";

import { CTASection } from "@/components/sections/CTASection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { PageHeader } from "@/components/sections/PageHeader";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { SLA_WINDOW } from "@/data/pricing";

import { routePaths } from "../../routes";

const CONSULTATION = {
  label: "Confidential Consultation",
  href: `${routePaths.talkToSales}?interest=Reputation%20Management`,
};

// The emergency line sits in the header's CTAs so it is in the first viewport on a phone.
const CALL = { label: "Call (928) 440-1505", href: "tel:+19284401505" };

export function CrisisManagementClient() {
  return (
    <>
      <PageHeader
        scheme="dark"
        heading="Reputation Assurance. Control the Narrative."
        description="When the internet turns against you, we turn it off. Digital scrubbing, search suppression, and strategic communications. Historically, these capabilities were reserved for Fortune 500s. We bring them to you. Non-disclosure agreements are standard for all inquiries."
        ctas={[CONSULTATION, CALL]}
      />

      <SplitFeature
        heading="Your Reputation is an Asset."
        body={`The internet doesn't forget unless you make it. Negative press, mugshots, and doxxing attacks stick to search results like glue. Most small operators don't have access to these tools. Now they do. We don't rely on "requesting removal" nicely. We use technical SEO suppression, legal takedowns, and asset flooding.`}
      />

      <FeatureGrid
        scheme="cream"
        heading="What we do"
        items={[
          {
            icon: Search,
            heading: "SEO Suppression",
            text: "We flood Page 1 of Google with controlled, positive assets to push negative links down the results.",
          },
          {
            icon: EyeOff,
            heading: "Digital Scrubbing",
            text: 'Removing home addresses, phone numbers, and family details from "people search" broker sites.',
          },
          {
            icon: Lock,
            heading: "Social Media Lockdown",
            text: 'Securing accounts during a viral event to prevent hacking and "comment swarming".',
          },
        ]}
      />

      <FeatureGrid
        scheme="dark"
        heading="Who We Protect"
        items={[
          {
            icon: AlertTriangle,
            heading: "Active Threats",
            text: "Executives facing blackmail, active doxxing events, or physical security threats originating online.",
          },
          {
            icon: History,
            heading: "Legacy Issues",
            text: "Founders with old lawsuits, bankruptcy filings, or embarrassing college press that impacts current fundraising.",
          },
          {
            icon: Fingerprint,
            heading: "Brand Attacks",
            text: 'Companies facing coordinated "review bombing" or viral disinformation campaigns on social media.',
          },
        ]}
      />

      <CTASection
        heading="Get Help Now"
        text={`Response time typically ${SLA_WINDOW.priority} for urgent requests.`}
        ctas={[CONSULTATION, CALL]}
      />
    </>
  );
}
