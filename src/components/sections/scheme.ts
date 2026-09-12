// The background band every section renders; not a Relume component.
import { cn } from "@/lib/utils";

/**
 * light is white, cream is brand-cream, dark is oxford. The utilities re-point
 * the --color-scheme-* variables (src/styles/globals.css), so everything inside
 * a section that colors itself with scheme tokens follows.
 */
export type SectionScheme = "light" | "cream" | "dark";

// Whole class names, so Tailwind's scanner sees each one. Light needs none:
// the :root values are the light scheme.
const SCHEME_CLASS: Record<SectionScheme, string | undefined> = {
  light: undefined,
  cream: "scheme-cream",
  dark: "scheme-oxford",
};

/** Relume's section padding on the scheme's background and text colors. */
export function sectionBandClass(scheme: SectionScheme = "light") {
  return cn(
    "bg-scheme-background px-[5%] py-16 text-scheme-text md:py-24 lg:py-28",
    SCHEME_CLASS[scheme]
  );
}
