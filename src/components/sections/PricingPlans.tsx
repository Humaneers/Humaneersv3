// Relume pricing48: tabs over a grid of plan cards.
import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

import type { CtaLink } from "./CtaLinks";
import { sectionBandClass, type SectionScheme } from "./scheme";

export type PricingPlan = {
  name: string;
  /** The headline figure, formatted: "$99". */
  price: string;
  /** What the headline figure buys: "base / mo". */
  priceUnit: string;
  /** The line under the price: the per-user rate, or what the base covers. */
  priceDetail?: string;
  /** Adds an asterisk to priceDetail that points at the tab's footnote. */
  footnoteMark?: boolean;
  description: string;
  features: readonly string[];
  /** Pages that describe the plan's service in full. */
  links?: readonly CtaLink[];
  cta: CtaLink;
  /** The plan most visitors are pointed at. A border, not a badge: it makes no claim about uptake. */
  recommended?: boolean;
};

export type PricingPlansTab = {
  value: string;
  label: string;
  /** Shown above the cards, for a tab whose pricing works differently. */
  note?: { title: string; text: string };
  plans: readonly PricingPlan[];
  /** Visible text under the cards. The asterisk on a price detail points here. */
  footnote?: string;
};

export type PricingPlansProps = {
  eyebrow?: string;
  heading: string;
  description?: string;
  /** Names the tab list for assistive technology. */
  tabsLabel: string;
  tabs: readonly PricingPlansTab[];
  /** The selected tab. The section is controlled so its owner can keep the choice in the URL. */
  value: string;
  onValueChange: (value: string) => void;
  /** Visible text under every tab's cards. */
  notes?: readonly string[];
  scheme?: SectionScheme;
};

// Whole class names, so Tailwind's scanner sees each one. One column below md.
const GRID: Record<number, string> = {
  1: "mx-auto max-w-md",
  2: "mx-auto max-w-4xl md:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
  4: "md:grid-cols-2 xl:grid-cols-4",
};

// Scheme tokens only, matching CtaLinks, so the buttons follow the section's scheme.
const FOCUS = "ring-offset-scheme-background focus-visible:ring-scheme-text";
const FILLED = "bg-scheme-accent text-scheme-btn-text hover:bg-scheme-accent/90";
const OUTLINED =
  "border-scheme-text bg-transparent text-scheme-text hover:bg-scheme-foreground hover:text-scheme-text";

/**
 * The section heading is the h2 and each plan name an h3. Radix supplies the
 * tab semantics and keyboard handling: Tab reaches the selected tab, the arrow
 * keys move between tabs and select them. Only the selected tab's cards are
 * rendered, so the server HTML carries the plans for the value it was given.
 */
export function PricingPlans({
  eyebrow,
  heading,
  description,
  tabsLabel,
  tabs,
  value,
  onValueChange,
  notes,
  scheme,
}: PricingPlansProps) {
  return (
    <section className={sectionBandClass(scheme)}>
      <div className="section-container">
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
          {eyebrow && <p className="mb-3 font-semibold text-scheme-accent md:mb-4">{eyebrow}</p>}
          <h2 className="mb-5 text-h2 font-bold md:mb-6">{heading}</h2>
          {description && <p className="text-medium">{description}</p>}
        </div>
        <Tabs value={value} onValueChange={onValueChange} className="gap-0">
          <TabsList
            aria-label={tabsLabel}
            className="mx-auto mb-10 h-auto w-full max-w-xl gap-1 border border-scheme-border bg-scheme-foreground p-1 md:mb-12"
          >
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="h-auto min-h-11 px-1 py-2 text-small font-semibold whitespace-normal text-scheme-text transition-none focus-visible:ring-scheme-text/50 focus-visible:outline-scheme-text data-[state=active]:bg-scheme-text data-[state=active]:text-scheme-background"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent
              key={tab.value}
              value={tab.value}
              className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-scheme-text"
            >
              {tab.note && (
                <p className="mx-auto mb-10 max-w-3xl rounded-card border border-scheme-border bg-scheme-foreground p-4 text-small md:mb-12">
                  <strong>{tab.note.title}</strong> {tab.note.text}
                </p>
              )}
              <div
                className={cn(
                  "grid grid-cols-1 gap-6 lg:gap-8",
                  GRID[Math.min(tab.plans.length, 4)]
                )}
              >
                {tab.plans.map((plan) => (
                  <PlanCard key={plan.name} plan={plan} />
                ))}
              </div>
              {tab.footnote && (
                <p className="mx-auto mt-8 max-w-3xl text-center text-small">{tab.footnote}</p>
              )}
            </TabsContent>
          ))}
        </Tabs>
        {notes && notes.length > 0 && (
          <div className="mx-auto mt-6 max-w-3xl space-y-2 text-center text-small">
            {notes.map((note, index) => (
              <p key={index}>{note}</p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function PlanCard({ plan }: { plan: PricingPlan }) {
  return (
    <div
      className={cn(
        "flex h-full flex-col justify-between rounded-card bg-scheme-background p-6 md:p-8",
        plan.recommended ? "border-2 border-scheme-accent" : "border border-scheme-border"
      )}
    >
      <div>
        <h3 className="mb-2 text-h5 font-bold">{plan.name}</h3>
        <p className="flex flex-wrap items-baseline gap-x-2">
          <span className="text-h2 font-bold">{plan.price}</span>
          <span className="text-small font-semibold">{plan.priceUnit}</span>
        </p>
        {plan.priceDetail && (
          <p className="mt-1 font-semibold text-scheme-accent">
            {plan.priceDetail}
            {plan.footnoteMark && <span aria-hidden="true">*</span>}
          </p>
        )}
        <p className="mt-4">{plan.description}</p>
        <div className="my-6 h-px w-full bg-scheme-border md:my-8" />
        <ul className="grid grid-cols-1 gap-y-4">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check aria-hidden="true" className="size-6 shrink-0 text-scheme-accent" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        {plan.links && plan.links.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
            {plan.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex items-center gap-1 text-small font-semibold text-scheme-text underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-scheme-text"
                >
                  {link.label}
                  <ChevronRight aria-hidden="true" className="size-4" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Button
        asChild
        size="lg"
        variant={plan.recommended ? "default" : "outline"}
        className={cn(FOCUS, "mt-6 w-full md:mt-8", plan.recommended ? FILLED : OUTLINED)}
      >
        <Link href={plan.cta.href}>
          {/* Every card's button reads the same, so the plan name completes its
              accessible name. The space is its own text node, outside the
              hidden span, so no engine trims it: "Join the waitlist for Core". */}
          <span>
            {plan.cta.label} <span className="sr-only">for {plan.name}</span>
          </span>
        </Link>
      </Button>
    </div>
  );
}
