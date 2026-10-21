import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ArcCarousel } from "@/components/motion/ArcCarousel";
import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { CTASection } from "@/components/sections/CTASection";
import { CtaLinks } from "@/components/sections/CtaLinks";
import { sectionBandClass } from "@/components/sections/scheme";
import { cn } from "@/lib/utils";

import { SERVICE_LINES, WAITLIST } from "./content";
import { ObjectionsSection } from "./ObjectionsSection";
import { EntrySource, ServiceCapture } from "./SessionCapture";

/** The three Security & Trust points, text unchanged from the section they came from. */
const TRUST_POINTS = ["No user minimums", "No offshore NOCs", "100% US-based engineering"] as const;

/**
 * Service card tints, by position. Below md the cards stack and alternate
 * cream and white; from md the 2 by 2 grid reads as a checkerboard. A white
 * card on the white band carries a border so its edge still shows.
 */
const CARD_TINTS = [
  "bg-brand-cream border-transparent",
  "bg-white border-scheme-border",
  "bg-brand-cream border-transparent md:bg-white md:border-scheme-border",
  "bg-white border-scheme-border md:bg-brand-cream md:border-transparent",
] as const;

/**
 * The homepage. A server component: the hero, manifesto and cards render as
 * HTML, and only the waitlist click capture, the arc and the section reveals
 * hydrate.
 */
export function HomeClient() {
  return (
    <>
      <EntrySource source="Homepage Hero CTA">
        {/* Pulled up under the fixed header (main's pt-20), so the header
            starts over the oxford ground rather than over the body's cream. */}
        <section
          className={cn(
            sectionBandClass("dark"),
            "-mt-20 flex min-h-svh items-center pt-36 pb-24 md:pt-40 md:pb-32 lg:pt-40 lg:pb-32"
          )}
        >
          <div className="section-container text-center">
            <h1 className="type-display mx-auto max-w-5xl font-normal text-balance">
              Built with <span className="text-brand-copper-light italic">precision</span>.
              Delivered with <span className="text-brand-copper-light italic">soul</span>.
            </h1>
            <p className="mx-auto mt-8 max-w-xl text-large text-scheme-text/80 md:mt-10">
              IT, security, and brand growth for those who demand excellence.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 md:mt-12 md:flex-row md:gap-6">
              <CtaLinks ctas={[WAITLIST]} />
              <p className="max-w-xs text-small text-scheme-text/80 md:text-left">
                We are at capacity right now, so new engagements are joining a waitlist.
              </p>
            </div>
          </div>
        </section>
      </EntrySource>

      {/* Reserved slot: a full-width band can go here, directly under the
          hero. Left empty on purpose. */}

      <ServiceCapture services={SERVICE_LINES}>
        <section className={cn(sectionBandClass("dark"), "overflow-x-clip pt-0 md:pt-0 lg:pt-0")}>
          <Reveal className="section-container">
            <ArcCarousel items={SERVICE_LINES} label="Services" initial={1} />
          </Reveal>
        </section>

        <section className={cn(sectionBandClass("cream"), "md:py-32 lg:py-40")}>
          <div className="section-container">
            <WordReveal
              text="Enterprise strategy for businesses and families."
              className="type-manifesto mx-auto max-w-[20ch] text-center font-heading"
            />
          </div>
        </section>

        <section className={sectionBandClass("light")}>
          <Reveal className="section-container">
            <div className="mb-12 max-w-3xl md:mb-18 lg:mb-20">
              <p className="mb-3 font-semibold text-scheme-accent md:mb-4">Our Expertise</p>
              <h2 className="text-h2 font-bold wrap-break-word">Everything You Need to Grow</h2>
            </div>
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              {SERVICE_LINES.map((service, index) => (
                <li
                  key={service.href}
                  className={cn(
                    "service-card relative flex min-h-72 flex-col rounded-card border p-8 md:min-h-80 md:p-10 lg:p-12",
                    CARD_TINTS[index]
                  )}
                >
                  {/* wrap-break-word here and on the h2 above: at 200 percent
                      text size "Leadership" is wider than a phone's card and
                      pushed the page sideways. It breaks only a word that
                      cannot fit a line, so the default text size is unchanged. */}
                  <h3 className="text-h3 font-bold wrap-break-word">{service.label}</h3>
                  <p className="mt-4 max-w-md text-medium text-brand-slate">{service.text}</p>
                  {/* The link's ::after covers the card, so the whole card is the
                      target. Inline, so a long label wraps with its arrow. */}
                  <p className="mt-auto pt-8">
                    <Link
                      href={service.href}
                      className="font-semibold text-scheme-text underline-offset-4 after:absolute after:inset-0 after:rounded-card hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-scheme-text"
                    >
                      Explore {service.label}
                      <ArrowRight
                        aria-hidden="true"
                        className="ml-2 inline size-4 align-[-0.125em]"
                      />
                    </Link>
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      </ServiceCapture>

      <section className={sectionBandClass("dark")}>
        <Reveal className="section-container">
          <h2 className="mb-12 max-w-3xl text-h2 font-bold md:mb-18 lg:mb-20">
            Security & Trust You Can Rely On
          </h2>
          {/* trust-grid (globals.css): two across from md, three across once the tiles are wide enough. */}
          <ul className="trust-grid grid grid-cols-1 gap-6 md:gap-8">
            {TRUST_POINTS.map((point) => (
              <li
                key={point}
                className="trust-tile flex min-h-40 flex-col justify-between gap-10 rounded-card bg-scheme-foreground p-[min(2rem,10vw)] md:min-h-56 md:p-6 lg:p-10"
              >
                {/* copper-light, not copper: copper on oxford-muted is 3.0:1, copper-light 5.1:1. */}
                <span aria-hidden="true" className="block h-0.5 w-10 bg-brand-copper-light" />
                <p className="font-heading text-h4 font-bold">{point}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <ObjectionsSection />

      <EntrySource source="Homepage Bottom CTA">
        <CTASection
          heading="Ready to upgrade your business or protect your home?"
          text="New engagements are joining a waitlist while we are at capacity."
          ctas={[WAITLIST]}
          scheme="dark"
        />
      </EntrySource>
    </>
  );
}
