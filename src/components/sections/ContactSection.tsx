// Relume contact19.
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { sectionBandClass, type SectionScheme } from "./scheme";

/**
 * A phone number or an email address. These are channels, not routes, so they
 * render as a plain <a>: next/link would hand them straight to the browser.
 */
export type ContactHref = `tel:${string}` | `mailto:${string}`;

export type ContactItem = {
  icon: LucideIcon;
  heading: string;
  text?: string;
  link?: { label: string; href: ContactHref };
};

export type ContactSectionProps = {
  eyebrow?: string;
  heading: string;
  description?: string;
  items: readonly ContactItem[];
  /** Columns from md up; one column below. */
  columns?: 2 | 3;
  scheme?: SectionScheme;
};

// Whole class names, so Tailwind's scanner sees each one.
const COLUMNS = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
} as const;

/** An h2 over a grid of channels, each an h3 with optional text and an underlined link. */
export function ContactSection({
  eyebrow,
  heading,
  description,
  items,
  columns = 3,
  scheme,
}: ContactSectionProps) {
  return (
    <section className={sectionBandClass(scheme)}>
      <div className="section-container">
        <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
          {eyebrow && <p className="mb-3 font-semibold text-scheme-accent md:mb-4">{eyebrow}</p>}
          <h2 className={cn("text-h2 font-bold", description && "mb-5 md:mb-6")}>{heading}</h2>
          {description && <p className="text-medium">{description}</p>}
        </div>
        <div className={cn("grid grid-cols-1 gap-x-12 gap-y-12 md:gap-y-16", COLUMNS[columns])}>
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index}>
                <Icon aria-hidden="true" className="mb-5 size-12 text-scheme-accent lg:mb-6" />
                <h3 className="mb-3 text-h4 font-bold lg:mb-4">{item.heading}</h3>
                {item.text && <p className={cn(item.link && "mb-5 md:mb-6")}>{item.text}</p>}
                {item.link && (
                  <a
                    href={item.link.href}
                    className="font-semibold text-scheme-text underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-scheme-text"
                  >
                    {item.link.label}
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
