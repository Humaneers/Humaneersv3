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
 * @tailwindcss/typography. This project does not install it, so the children
 * are styled by `prose-body` in globals.css: a reading measure, the heading
 * rhythm, list spacing and the link style. Headings inside the children start
 * at h3, one level under this section's own h2.
 *
 * Links are underlined rather than colored alone: axe reports
 * `link-in-text-block` for a link that a body of text distinguishes by color
 * only, and /privacy and /terms carry inline links in running text.
 *
 * From lg a section with a heading sets it in a column beside the text. The
 * text never moves or fades in: legal copy reads the same with or without JS,
 * motion or print.
 */
export function ProseSection({ heading, eyebrow, children, scheme }: ProseSectionProps) {
  const head = Boolean(eyebrow || heading);

  return (
    <section className={sectionBandClass(scheme)}>
      <div
        className={cn(
          "section-container",
          head && "lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-x-12"
        )}
      >
        {head && (
          <div className="mb-8 max-w-3xl md:mb-10 lg:mb-0">
            {eyebrow && <p className="mb-3 font-semibold text-scheme-accent md:mb-4">{eyebrow}</p>}
            {heading && <h2 className="text-h3 font-bold wrap-break-word">{heading}</h2>}
          </div>
        )}
        <div className={"prose-body text-medium"}>{children}</div>
      </div>
    </section>
  );
}
