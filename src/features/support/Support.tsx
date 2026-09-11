"use client";

import { Clock, Lock, MessageSquare, Phone, Shield } from "lucide-react";

import { useContactModal } from "@/components/providers/ContactModalProvider";
import { ActionCards } from "@/components/sections/ActionCards";
import { ContactSection } from "@/components/sections/ContactSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { PageHeader } from "@/components/sections/PageHeader";
import { SLA_WINDOW } from "@/data/pricing";

const EMERGENCY_LINE = { label: "(928) 440-1505", href: "tel:+19284401505" } as const;

// src/data/pricing.ts carries the P1 and P2 windows. P3 and P4 have no entry
// there yet; the figures below match section 3.2 of the Terms and are written
// once, here, for both the grid and the FAQ answer.
const PRIORITIES = [
  { level: 1, name: "Critical", scope: "System down", window: SLA_WINDOW.critical },
  { level: 2, name: "High", scope: "Major impact", window: SLA_WINDOW.priority },
  { level: 3, name: "Medium", scope: "Minor issue with a workaround", window: "4 hours" },
  { level: 4, name: "Low", scope: "Questions and requests", window: "24 hours" },
] as const;

const FAQ_ITEMS = [
  {
    question: "Do I need to be an existing client to get help?",
    answer:
      "No. We welcome new clients who need immediate help. If you are in the middle of a security incident, we will help you now. We can establish a partnership once the fire is out.",
  },
  {
    question: "What's the fastest way to get help for a critical issue?",
    answer:
      "For P1 Critical issues (system down, data breach, active security incident), call our emergency hotline directly. For other issues, send us an email.",
  },
  {
    question: "What information should I include in my request?",
    answer:
      "Include what happened, when it started, what you were trying to do, any error messages, and which systems are affected. The more detail you provide, the faster we can help.",
  },
  {
    question: "How do priority levels work?",
    answer: PRIORITIES.map(
      (p) => `P${p.level} (${p.name}): ${p.scope}, response in ${p.window}.`
    ).join(" "),
  },
  {
    question: "What are your support hours?",
    answer:
      "Our team monitors tickets during business hours (Monday to Friday, 8am to 6pm MST). For P1 Critical issues, our emergency hotline provides 24/7 coverage.",
  },
];

export function Support() {
  const { openModal } = useContactModal();

  return (
    <>
      {/* The emergency line is the header's CTA so a caller mid-incident
          reaches it in the first viewport on a phone. */}
      <PageHeader
        scheme="dark"
        heading="Support Center"
        description="Submit a support ticket and our engineering team will respond promptly. We support new clients in crisis. We'll stabilize your systems first and handle the paperwork later. For a P1 critical issue, such as a system down or an active breach, call the emergency line. It gives 24/7 direct access and bypasses standard queues."
        ctas={[{ label: `Call ${EMERGENCY_LINE.label}`, href: EMERGENCY_LINE.href }]}
      />

      <ActionCards
        heading="Open a ticket"
        cards={[
          {
            icon: MessageSquare,
            heading: "Client Support",
            text: "For existing partners. Submit regular maintenance requests, user provisioning, or general inquiries.",
            action: {
              label: "Submit Request",
              onClick: () => openModal("support", "", "Support - Client Support"),
            },
          },
          {
            icon: Shield,
            heading: "Rapid Response",
            text: 'For new engagements. Immediate "Tactical Deployment" for active breaches, outages, or mission-critical failures. We stabilize first, contract later.',
            action: {
              label: "Deploy Team",
              onClick: () => openModal("support", "", "Support - Rapid Response"),
            },
          },
        ]}
      />

      <ContactSection
        scheme="cream"
        heading="Reach us directly"
        columns={2}
        items={[
          {
            icon: Phone,
            heading: "Emergency Command Line",
            text: "24/7 direct access for P1 Critical issues (system down, active breach). Bypasses standard queues.",
            link: EMERGENCY_LINE,
          },
          {
            icon: Lock,
            heading: "Security concerns",
            text: "Email security concerns to us directly.",
            link: { label: "security@humaneers.dev", href: "mailto:security@humaneers.dev" },
          },
        ]}
      />

      <FeatureGrid
        eyebrow="Service standards"
        heading="Response times by priority"
        columns={4}
        items={PRIORITIES.map((p) => ({
          icon: Clock,
          heading: `Priority ${p.level}: ${p.name}`,
          text: `${p.scope}. Response in ${p.window}.`,
        }))}
      />

      <FAQSection scheme="cream" heading="Frequently Asked Questions" items={FAQ_ITEMS} />
    </>
  );
}
