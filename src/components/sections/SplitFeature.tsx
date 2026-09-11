// Relume layout71.
import { CtaLinks, type CtaLinkList } from "./CtaLinks";
import { sectionBandClass, type SectionScheme } from "./scheme";

export type SplitFeatureProps = {
  heading: string;
  body: string;
  points?: readonly string[];
  ctas?: CtaLinkList;
  scheme?: SectionScheme;
};

/** An h2 on one side; body text, then points and/or CTAs on the other. Stacks below md. */
export function SplitFeature({ heading, body, points, ctas, scheme }: SplitFeatureProps) {
  return (
    <section className={sectionBandClass(scheme)}>
      <div className="section-container grid grid-cols-1 items-start gap-5 md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
        <h2 className="text-h2 font-bold">{heading}</h2>
        <div>
          <p className="text-medium">{body}</p>
          {points && points.length > 0 && (
            <ul className="mt-5 list-disc space-y-2 pl-5 md:mt-6">
              {points.map((point, index) => (
                <li key={index} className="pl-2">
                  {point}
                </li>
              ))}
            </ul>
          )}
          {ctas && <CtaLinks ctas={ctas} className="mt-6 md:mt-8" />}
        </div>
      </div>
    </section>
  );
}
