// Relume layout364.
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { sectionBandClass, type SectionScheme } from "./scheme";

/**
 * A card's one action. `href` is a route and renders as next/link inside the
 * button styling; `onClick` is an in-page action, such as opening a form, and
 * renders as a real button.
 */
export type CardAction = { label: string; href: string } | { label: string; onClick: () => void };

export type ActionCard = {
  icon: LucideIcon;
  heading: string;
  text: string;
  action: CardAction;
};

export type ActionCardsProps = {
  eyebrow?: string;
  heading: string;
  description?: string;
  cards: readonly ActionCard[];
  scheme?: SectionScheme;
};

// CtaLinks' filled button, in scheme tokens, with the ring offset on the card's color.
const BUTTON =
  "bg-scheme-accent text-scheme-btn-text hover:bg-scheme-accent/90 ring-offset-scheme-foreground focus-visible:ring-scheme-text";

/**
 * A centered h2, then two cards side by side from md up. Each card is an h3,
 * a sentence and one action, with the actions aligned along the bottom edge.
 */
export function ActionCards({ eyebrow, heading, description, cards, scheme }: ActionCardsProps) {
  return (
    <section className={sectionBandClass(scheme)}>
      <div className="section-container">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          {eyebrow && <p className="mb-3 font-semibold text-scheme-accent md:mb-4">{eyebrow}</p>}
          <h2 className={cn("text-h2 font-bold", description && "mb-5 md:mb-6")}>{heading}</h2>
          {description && <p className="text-medium">{description}</p>}
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon;
            const { action } = card;
            return (
              <div
                key={index}
                className="flex flex-col rounded-card border border-scheme-border bg-scheme-foreground p-6 md:p-8 lg:p-12"
              >
                <Icon aria-hidden="true" className="mb-5 size-12 text-scheme-accent md:mb-6" />
                <h3 className="mb-5 text-h3 font-bold md:mb-6">{card.heading}</h3>
                <p>{card.text}</p>
                <div className="mt-auto pt-6 md:pt-8">
                  {"href" in action ? (
                    <Button asChild size="lg" className={BUTTON}>
                      <Link href={action.href}>{action.label}</Link>
                    </Button>
                  ) : (
                    <Button type="button" size="lg" className={BUTTON} onClick={action.onClick}>
                      {action.label}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
