// Relume faq1.
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { sectionBandClass, type SectionScheme } from "./scheme";

export type FAQItem = {
  question: string;
  answer: string;
};

export type FAQSectionProps = {
  heading: string;
  items: readonly FAQItem[];
  scheme?: SectionScheme;
};

/**
 * The section heading is the h2. The accordion renders each question as a
 * button inside an h3, so questions sit one level below it. Radix supplies the
 * keyboard handling: Tab reaches each question, Enter or Space toggles it.
 * transition-none on the trigger and its chevron: the section has no motion,
 * so there is nothing for reduced motion to switch off.
 *
 * The chevron's box is one line tall and unshifted, so the 16px glyph centers
 * on the question's first line at both text-medium sizes. The primitive's
 * 2px nudge suits its own 14px text only.
 */
export function FAQSection({ heading, items, scheme }: FAQSectionProps) {
  return (
    <section className={sectionBandClass(scheme)}>
      <div className="section-container">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-12 text-center text-h2 font-bold md:mb-18 lg:mb-20">{heading}</h2>
          <Accordion type="multiple">
            {items.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-scheme-border">
                <AccordionTrigger className="text-medium font-bold transition-none focus-visible:ring-scheme-text/50 md:py-5 [&>svg]:h-[1lh] [&>svg]:translate-y-0 [&>svg]:text-scheme-text [&>svg]:transition-none">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-regular md:pb-6">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
