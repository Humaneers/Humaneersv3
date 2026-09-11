// Relume layout242.
import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";

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
      <div className="section-container">
        <div className="mb-12 max-w-3xl md:mb-18 lg:mb-20">
          {eyebrow && <p className="mb-3 font-semibold text-scheme-accent md:mb-4">{eyebrow}</p>}
          <h2 className="text-h3 font-bold">{heading}</h2>
        </div>
        <div
          className={cn(
            "grid grid-cols-1 items-start gap-y-12 md:gap-x-8 md:gap-y-16 lg:gap-x-12",
            COLUMNS[columns]
          )}
        >
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index}>
                <Icon aria-hidden="true" className="mb-5 size-12 text-scheme-accent md:mb-6" />
                <h3 className="mb-3 text-h5 font-bold md:mb-4">{item.heading}</h3>
                <p>{item.text}</p>
                {item.link && (
                  <Link
                    href={item.link.href}
                    className="mt-5 inline-flex items-center gap-2 font-semibold text-scheme-text underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-scheme-text md:mt-6"
                  >
                    {item.link.label}
                    <ChevronRight aria-hidden="true" className="size-4" />
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
