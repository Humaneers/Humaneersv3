// Relume cta25.
import { CtaLinks, type CtaLinkList } from "./CtaLinks";
import { sectionBandClass, type SectionScheme } from "./scheme";

export type CTASectionProps = {
  heading: string;
  text: string;
  ctas: CtaLinkList;
  scheme?: SectionScheme;
};

export function CTASection({ heading, text, ctas, scheme }: CTASectionProps) {
  return (
    <section className={sectionBandClass(scheme)}>
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
