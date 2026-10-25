// Relume layout242.
import type { CSSProperties } from "react";
import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

import type { CtaLink } from "./CtaLinks";
import { sectionBandClass, type SectionScheme } from "./scheme";

export type FeatureGridItem = {
  icon: LucideIcon;
  heading: string;
  text: string;
  link?: CtaLink;
};

export type FeatureGridProps = {
  eyebrow?: string;
  heading: string;
  items: readonly FeatureGridItem[];
  /** Columns from md up; one column below. Four drop to two between md and lg. */
  columns?: 2 | 3 | 4;
  scheme?: SectionScheme;
};

// Whole class names, so Tailwind's scanner sees each one.
const COLUMNS = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
} as const;

export function FeatureGrid({ eyebrow, heading, items, columns = 3, scheme }: FeatureGridProps) {
  return (
    <section className={sectionBandClass(scheme)}>
      <Reveal className="section-container">
        <div className="mb-12 max-w-3xl md:mb-18 lg:mb-20">
          {eyebrow && <p className="mb-3 font-semibold text-scheme-accent md:mb-4">{eyebrow}</p>}
          <h2 className="text-h3 font-bold">{heading}</h2>
        </div>
        <div className={cn("grid grid-cols-1 gap-6 md:gap-8", COLUMNS[columns])}>
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              // The card takes the scheme's foreground: cream on a white band,
              // white on cream, oxford-muted on oxford. A link sits on the
              // card's bottom edge. --card-index staggers the cards' entrance
              // (feature-card in globals.css).
              <div
                key={index}
                className="feature-card flex flex-col rounded-card bg-scheme-foreground p-6 md:p-8"
                style={{ "--card-index": index } as CSSProperties}
              >
                <Icon aria-hidden="true" className="mb-5 size-10 text-scheme-accent md:mb-6" />
                <h3 className="mb-3 text-h5 font-bold wrap-break-word md:mb-4">{item.heading}</h3>
                <p className={item.link ? "mb-5 md:mb-6" : undefined}>{item.text}</p>
                {item.link && (
                  <Link
                    href={item.link.href}
                    className="mt-auto inline-flex items-center gap-2 self-start font-semibold text-scheme-text underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-scheme-text"
                  >
                    {item.link.label}
                    <ChevronRight aria-hidden="true" className="size-4" />
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
