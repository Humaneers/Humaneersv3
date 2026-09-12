// Relume content7 (1 column, rich text, text only).
import { cn } from "@/lib/utils";

import { sectionBandClass, type SectionScheme } from "./scheme";

export type ProseSectionProps = {
  /**
   * The section's h2. Omit it on a block that continues the section above it,
   * so a long document does not gain a heading it never had.
   */
  heading?: string;
  /** Sits above the heading, in the scheme's accent color. */
  eyebrow?: string;
  children: React.ReactNode;
  scheme?: SectionScheme;
};

/**
 * Long-form body copy: the legal pages, the ethics charter, the colophon and
 * the narrative blocks on /about.
 *
 * Relume's content7 styles its children with `prose-*`, which needs
 * @tailwindcss/typography. This project does not install it, so the element
 * styles below are written as descendant variants instead. Headings inside the
 * children start at h3, one level under this section's own h2.
 *
 * Links are underlined rather than colored alone: axe reports
 * `link-in-text-block` for a link that a body of text distinguishes by color
 * only, and /privacy and /terms carry inline links in running text.
 */
const PROSE = [
  "max-w-3xl text-medium",
  "[&_p]:mb-4 [&_p:last-child]:mb-0",
  "[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-h4 [&_h3]:font-bold [&_h3:first-child]:mt-0",
  "[&_h4]:mt-6 [&_h4]:mb-2 [&_h4]:text-h5 [&_h4]:font-bold",
  "[&_ul]:mb-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6",
  "[&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6",
  "[&_li]:pl-1",
  "[&_dl]:mb-4 [&_dl]:space-y-4",
  "[&_dt]:font-bold",
  "[&_strong]:font-bold",
  "[&_a]:underline [&_a]:underline-offset-4",
  "[&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-2 [&_a:focus-visible]:outline-scheme-text",
].join(" ");

export function ProseSection({ heading, eyebrow, children, scheme }: ProseSectionProps) {
  return (
    <section className={sectionBandClass(scheme)}>
      <div className="section-container">
        {(eyebrow || heading) && (
          <div className="mb-5 max-w-3xl md:mb-6">
            {eyebrow && (
              <p className="mb-3 font-semibold text-scheme-accent md:mb-4">{eyebrow}</p>
            )}
            {heading && <h2 className="text-h2 font-bold">{heading}</h2>}
          </div>
        )}
        <div className={cn(PROSE)}>{children}</div>
      </div>
    </section>
  );
}
