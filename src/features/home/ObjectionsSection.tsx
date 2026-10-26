import { FAQSection, type FAQItem } from "@/components/sections/FAQSection";

const OBJECTIONS: readonly FAQItem[] = [
  {
    question: "“We already have IT.”",
    answer: "We slot in as strategy and escalation, or replace just the gaps.",
  },
  {
    question: "“We’re too small for this.”",
    answer: "No minimums. Support scales to your team size.",
  },
  {
    question: "“We’re not ready.”",
    answer:
      "That’s what we’re here for. We love to help now and can discuss what's next after fixing what's wrong.",
  },
  {
    question: "“Switching sounds painful.”",
    answer:
      "We migrate in phases with clear handoffs. We handle the awkward breakups with old vendors for you.",
  },
];

/**
 * The objections a visitor raises, each with its straight answer, as
 * FAQSection questions. The answers were tightened on 20 Oct 2026: shorter,
 * no new claim. Dropped: "Most MSPs keep the lights on; we help you grow."
 * and "We believe small teams deserve safe infrastructure too." The last two
 * answers keep main's wording, as a rewrite of them shifted the meaning.
 */
export function ObjectionsSection() {
  return (
    <FAQSection heading="Common Objections, Straight Answers" items={OBJECTIONS} scheme="cream" />
  );
}
