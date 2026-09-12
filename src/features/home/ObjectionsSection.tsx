import { FAQSection, type FAQItem } from "@/components/sections/FAQSection";

const OBJECTIONS: readonly FAQItem[] = [
  {
    question: "“We already have IT.”",
    answer:
      "We slot in as strategy + escalation, or replace just the gaps. Most MSPs keep the lights on; we help you grow.",
  },
  {
    question: "“We’re too small for this.”",
    answer:
      "No minimums. You get enterprise-grade support scaled to your team size. We believe small teams deserve safe infrastructure too.",
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

/** The objections a visitor raises, each with its straight answer, as FAQSection questions. */
export function ObjectionsSection() {
  return (
    <FAQSection heading="Common Objections, Straight Answers" items={OBJECTIONS} scheme="cream" />
  );
}
