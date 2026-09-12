// The link CTA row shared by PageHeader, SplitFeature and CTASection; not a Relume component.
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type CtaLink = {
  label: string;
  href: string;
};

/** One or two CTAs. The first renders as the filled button, the second as the outlined one. */
export type CtaLinkList = readonly [CtaLink] | readonly [CtaLink, CtaLink];

// Scheme tokens only, so the row follows the section's scheme (light, cream or oxford).
const FOCUS = "ring-offset-scheme-background focus-visible:ring-scheme-text";
const FILLED = "bg-scheme-accent text-scheme-btn-text hover:bg-scheme-accent/90";
const OUTLINED =
  "border-scheme-text bg-transparent text-scheme-text hover:bg-scheme-foreground hover:text-scheme-text";

export function CtaLinks({ ctas, className }: { ctas: CtaLinkList; className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-4", className)}>
      {ctas.map((cta, index) => (
        <Button
          key={index}
          asChild
          size="lg"
          variant={index === 0 ? "default" : "outline"}
          className={cn(FOCUS, index === 0 ? FILLED : OUTLINED)}
        >
          <Link href={cta.href}>{cta.label}</Link>
        </Button>
      ))}
    </div>
  );
}
