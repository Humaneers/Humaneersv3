// Relume pricing56's comparison matrix, under a compact sticky row of plan names.
import { useId } from "react";
import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";

import { sectionBandClass, type SectionScheme } from "./scheme";

/** true is included, false is not, a string is shown as written ("Billable"). */
export type ComparisonValue = boolean | string;

export type ComparisonFeature = {
  name: string;
  /** Shown under the name as visible text, never as a hover-only tooltip. */
  description?: string;
  /** One value per plan, keyed by the plan's name as it appears in `plans`. */
  values: Readonly<Record<string, ComparisonValue>>;
};

export type ComparisonCategory = {
  title: string;
  features: readonly ComparisonFeature[];
};

export type PricingComparisonProps = {
  heading: string;
  description?: string;
  /** Column headings, in column order. Two to four plans. */
  plans: readonly string[];
  categories: readonly ComparisonCategory[];
  scheme?: SectionScheme;
};

// Whole class names, so Tailwind's scanner sees each one. Below md the feature
// name takes a row of its own and the plan values share the row under it; from
// md the feature name is the first column. minmax(0, ...) keeps a long word from
// widening a column past the viewport.
const GRID: Record<number, string> = {
  2: "grid-cols-2 md:grid-cols-[minmax(0,1.5fr)_repeat(2,minmax(0,1fr))]",
  3: "grid-cols-3 md:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))]",
  4: "grid-cols-4 md:grid-cols-[minmax(0,1.5fr)_repeat(4,minmax(0,1fr))]",
};

/**
 * A grid carrying ARIA table roles, so a screen reader announces each value
 * with its plan and its feature, as it would in a table. A native table cannot
 * put the feature name on its own row below md without dropping those
 * semantics in some browsers.
 *
 * The plan-name row sticks under the site header (64px once the page scrolls,
 * hence top-16) while the matrix is in view. The section heading is the h2 and
 * each category title an h3. No motion, so nothing for reduced motion to stop.
 */
export function PricingComparison({
  heading,
  description,
  plans,
  categories,
  scheme,
}: PricingComparisonProps) {
  const headingId = useId();
  const grid = GRID[Math.min(Math.max(plans.length, 2), 4)];

  return (
    <section className={sectionBandClass(scheme)}>
      <div className="section-container">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-18 lg:mb-20">
          <h2 id={headingId} className="mb-5 text-h2 font-bold md:mb-6">
            {heading}
          </h2>
          {description && <p className="text-medium">{description}</p>}
        </div>
        <div role="table" aria-labelledby={headingId}>
          <div
            role="row"
            className={cn(
              "sticky top-16 z-10 grid border-b border-scheme-border bg-scheme-background",
              grid
            )}
          >
            {/* Out of the grid below md, where the feature name has a row of its own. */}
            <span role="columnheader" className="sr-only md:not-sr-only md:py-4 md:text-small">
              Feature
            </span>
            {plans.map((plan) => (
              <span
                key={plan}
                role="columnheader"
                className="px-1 py-4 text-center text-small font-bold wrap-break-word hyphens-auto md:px-4 md:text-regular"
              >
                {plan}
              </span>
            ))}
          </div>
          {categories.map((category) => (
            <div key={category.title} role="rowgroup">
              <div role="row" className="border-b border-scheme-border">
                <div role="cell" aria-colspan={plans.length + 1} className="pt-8 pb-4">
                  <h3 className="text-h6 font-bold">{category.title}</h3>
                </div>
              </div>
              {category.features.map((feature) => (
                <div
                  key={feature.name}
                  role="row"
                  className={cn("grid border-b border-scheme-border", grid)}
                >
                  <div
                    role="rowheader"
                    className="col-span-full border-b border-scheme-border py-4 pr-4 md:col-span-1 md:border-0 md:pr-6"
                  >
                    {/* The space keeps name and description apart in the row header's
                        accessible name wherever block display is not honored. */}
                    <span className="font-semibold">{feature.name}</span>
                    {feature.description && (
                      <>
                        {" "}
                        <span className="mt-1 block text-small">{feature.description}</span>
                      </>
                    )}
                  </div>
                  {plans.map((plan, index) => (
                    <div
                      key={plan}
                      role="cell"
                      className={cn(
                        "flex items-center justify-center border-scheme-border px-1 py-4 text-center text-small font-semibold wrap-break-word md:px-4 md:text-regular",
                        index === 0 ? "md:border-l" : "border-l"
                      )}
                    >
                      <ValueMark value={feature.values[plan]} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ValueMark({ value }: { value: ComparisonValue | undefined }) {
  if (typeof value === "string") return <span>{value}</span>;
  if (value === true) {
    return (
      <>
        <Check aria-hidden="true" className="size-6 text-scheme-accent" />
        <span className="sr-only">Included</span>
      </>
    );
  }
  return (
    <>
      <X aria-hidden="true" className="size-5 text-scheme-text/60" />
      <span className="sr-only">Not included</span>
    </>
  );
}
