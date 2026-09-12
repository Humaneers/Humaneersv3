// Relume pricing5: one priced offer, its points beside a price card.
import { CtaLinks, type CtaLink } from "./CtaLinks";
import { sectionBandClass, type SectionScheme } from "./scheme";

export type PricingOfferPoint = {
  heading: string;
  text: string;
};

export type PricingOfferProps = {
  eyebrow?: string;
  heading: string;
  description: string;
  points: readonly PricingOfferPoint[];
  /** The headline figure, formatted: "$150". */
  price: string;
  /** What the figure buys: "/hr". */
  priceUnit: string;
  /** The line under the price: "Sold in 10hr packs". */
  priceDetail?: string;
  /** Conditions, as visible text in the card. */
  fineprint?: string;
  cta: CtaLink;
  scheme?: SectionScheme;
};

/**
 * The heading is the h2 and each point an h3. The price is text, not a heading:
 * it is the largest thing in the card, but it does not start a section.
 */
export function PricingOffer({
  eyebrow,
  heading,
  description,
  points,
  price,
  priceUnit,
  priceDetail,
  fineprint,
  cta,
  scheme,
}: PricingOfferProps) {
  return (
    <section className={sectionBandClass(scheme)}>
      <div className="section-container">
        <div className="mb-12 max-w-3xl md:mb-16">
          {eyebrow && <p className="mb-3 font-semibold text-scheme-accent md:mb-4">{eyebrow}</p>}
          <h2 className="mb-5 text-h2 font-bold md:mb-6">{heading}</h2>
          <p className="text-medium">{description}</p>
        </div>
        <div className="grid grid-cols-1 items-start gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:gap-x-20">
          <div className="grid grid-cols-1 gap-y-8">
            {points.map((point, index) => (
              <div key={index}>
                <h3 className="mb-3 text-h6 font-bold md:mb-4">{point.heading}</h3>
                <p>{point.text}</p>
              </div>
            ))}
          </div>
          <div className="rounded-card border border-scheme-border bg-scheme-foreground px-6 py-8 md:p-8">
            <p className="flex flex-wrap items-baseline gap-x-1">
              <span className="text-h1 font-bold">{price}</span>
              <span className="text-h5 font-bold">{priceUnit}</span>
            </p>
            {priceDetail && <p className="mt-2 font-semibold text-scheme-accent">{priceDetail}</p>}
            {fineprint && <p className="mt-4 text-small">{fineprint}</p>}
            <div className="my-6 h-px w-full bg-scheme-border md:my-8" />
            <CtaLinks ctas={[cta]} />
          </div>
        </div>
      </div>
    </section>
  );
}
