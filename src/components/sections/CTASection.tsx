// Relume cta25.
import { cn } from "@/lib/utils";

import { CtaLinks, type CtaLinkList } from "./CtaLinks";

export type CTASectionProps = {
  heading: string;
  text: string;
  ctas: CtaLinkList;
  /** "dark" sets the section on oxford with cream text and copper-light accents. */
  scheme?: "light" | "dark";
};

export function CTASection({ heading, text, ctas, scheme = "light" }: CTASectionProps) {
  return (
    <section
      className={cn(
        "bg-scheme-background px-[5%] py-16 text-scheme-text md:py-24 lg:py-28",
        scheme === "dark" && "scheme-dark"
      )}
    >
      <div className="section-container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-5 text-h2 font-bold md:mb-6">{heading}</h2>
          <p className="text-medium">{text}</p>
          <CtaLinks ctas={ctas} className="mt-6 justify-center md:mt-8" />
        </div>
      </div>
    </section>
  );
}
