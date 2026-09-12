"use client";

import Link from "next/link";

import { FAQSection } from "@/components/sections/FAQSection";
import { PageHeader } from "@/components/sections/PageHeader";
import { ProseSection } from "@/components/sections/ProseSection";
import { SLA_WINDOW } from "@/data/pricing";
import { routePaths } from "../../routes";

/**
 * The SLA definition used en dashes around its parenthetical. The house rule
 * allows neither dash in visible copy, so it reads with parentheses now; the
 * wording is otherwise unchanged.
 */
const GLOSSARY = [
  {
    term: "MFA (Multi-Factor Authentication)",
    def: "A security system that requires more than one method of authentication from independent categories of credentials to verify the user's identity.",
  },
  {
    term: "Zero Trust",
    def: "A strategic initiative that helps prevent successful data breaches by eliminating the concept of trust from an organization's network architecture.",
  },
  {
    term: "Endpoint",
    def: "Any remote computing device that communicates back and forth with a network to which it is connected (e.g., laptops, phones).",
  },
  {
    term: "SLA (Service Level Agreement)",
    def: "A commitment between a service provider and a client. Particular aspects of the service (quality, availability, responsibilities) are agreed between the service provider and the service user.",
  },
] as const;

// The response window comes from src/data/pricing.ts, never retyped here.
const FAQS = [
  {
    question: "What qualifies as a P1 Critical Incident?",
    answer: `Any outage affecting more than 50% of users, a confirmed data breach, or active ransomware attack. P1 incidents trigger our SLA response protocol, which targets a first response within ${SLA_WINDOW.critical}.`,
  },
  {
    question: "How do I report a security vulnerability?",
    answer:
      "We maintain a responsible disclosure program. Please email security@humaneers.co (PGP key available in Colophon) with details. We do not offer bounties but we publicly credit researchers.",
  },
  {
    question: "What is your data retention policy on logs?",
    answer:
      "Security logs are retained for 365 days in cold storage (immutable). Operational logs are cycled every 30 days.",
  },
] as const;

export function ResourcesClient() {
  return (
    <>
      <PageHeader
        scheme="dark"
        align="center"
        heading="Client Links, IT Glossary, and Incident FAQ"
        description="Links for active clients, a short IT glossary, and answers to common incident response questions."
      />

      <ProseSection heading="Client Links">
        <p>System status and the support portal for active clients.</p>
        <dl>
          <div>
            <dt>System Status</dt>
            <dd>
              <Link href={routePaths.status}>Check status</Link>
            </dd>
          </div>
          <div>
            <dt>Support Portal</dt>
            <dd>
              <a href="https://support.humaneers.dev/" target="_blank" rel="noopener noreferrer">
                Open the portal
              </a>
            </dd>
          </div>
        </dl>
      </ProseSection>

      <ProseSection scheme="dark" heading="IT Glossary">
        <dl>
          {GLOSSARY.map((item) => (
            <div key={item.term}>
              <dt>{item.term}</dt>
              <dd>{item.def}</dd>
            </div>
          ))}
        </dl>
      </ProseSection>

      <FAQSection scheme="cream" heading="Incident Response FAQ" items={FAQS} />
    </>
  );
}
