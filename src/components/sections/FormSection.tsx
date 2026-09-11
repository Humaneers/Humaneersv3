// Relume contact5, with the form passed in rather than built here.
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import type { ContactHref } from "./ContactSection";
import { sectionBandClass, type SectionScheme } from "./scheme";

/** One of contact5's icon rows. With an href the label is a phone or email link. */
export type FormSectionDetail = {
  icon: LucideIcon;
  label: string;
  href?: ContactHref;
};

export type FormSectionProps = {
  eyebrow?: string;
  heading: string;
  description: string;
  details?: readonly FormSectionDetail[];
  /**
   * The form. The section only places it: fields, validation and submission
   * stay with the form component. Existing forms color themselves for a light
   * background, so use the light or cream scheme.
   */
  children: ReactNode;
  scheme?: SectionScheme;
};

/** The h2, text and icon rows on one side, the form on the other. Stacks below md, text first. */
export function FormSection({
  eyebrow,
  heading,
  description,
  details,
  children,
  scheme,
}: FormSectionProps) {
  return (
    <section className={sectionBandClass(scheme)}>
      <div className="section-container grid grid-cols-1 items-start gap-y-12 md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
        <div>
          {eyebrow && <p className="mb-3 font-semibold text-scheme-accent md:mb-4">{eyebrow}</p>}
          <h2 className="mb-5 text-h2 font-bold md:mb-6">{heading}</h2>
          <p className="text-medium">{description}</p>
          {details && details.length > 0 && (
            <ul className="mt-6 grid grid-cols-1 gap-4 md:mt-8">
              {details.map((detail, index) => {
                const Icon = detail.icon;
                return (
                  <li key={index} className="flex items-center gap-4">
                    <Icon aria-hidden="true" className="size-6 flex-none text-scheme-accent" />
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="font-semibold text-scheme-text underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-scheme-text"
                      >
                        {detail.label}
                      </a>
                    ) : (
                      <span>{detail.label}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}
