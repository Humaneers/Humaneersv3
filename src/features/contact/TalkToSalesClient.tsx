"use client";

import { Phone } from "lucide-react";

import { FormSection } from "@/components/sections/FormSection";
import { PageHeader } from "@/components/sections/PageHeader";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { WaitlistForm } from "@/components/WaitlistForm";

export function TalkToSalesClient() {
  return (
    <>
      {/* The availability state belongs at the top of the funnel. The page
          this replaced let a visitor read all the way down and then refused
          them, after the header had promised to help. */}
      <PageHeader
        scheme="dark"
        align="center"
        heading="Let's Build Your Strategy"
        description="We are full at the moment, so new engagements are joining a waitlist rather than going straight into onboarding. Tell us what you need and a partner will come back to you when we can take it on properly."
      />

      {/* Capacity is a sales constraint. It is not a reason to leave someone
          mid-incident without a number to call, so the number sits beside the
          form and, on a phone, above it. */}
      <FormSection
        eyebrow="At capacity: joining the waitlist"
        heading="Join the waitlist"
        description="A partner reads every entry. No sequences, no drip, no junior associate. Something on fire right now? The waitlist is for planned work. If you have an active outage or breach, call instead of filling in a form."
        details={[{ icon: Phone, label: "Call (928) 440-1505", href: "tel:+19284401505" }]}
      >
        <WaitlistForm source="Waitlist - Talk to Sales" />
      </FormSection>

      <SplitFeature
        scheme="cream"
        heading="Why Humaneers?"
        body="We don't just fix computers. We align technology with your goals, at work or at home."
        points={["US-based team", "No long-term lock-in"]}
      />
    </>
  );
}
