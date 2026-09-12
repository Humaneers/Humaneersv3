"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useContactModal } from "@/components/providers/ContactModalProvider";
import { sectionBandClass } from "@/components/sections/scheme";

/**
 * The portfolio ROI calculator. The arithmetic and the control are unchanged
 * from the pre-Relume page: a 5 to 100 domain range input at 10 by default, a
 * $5 per domain per month management fee, and a parking revenue estimate of
 * $2.50 per domain per month. Only the styling moved onto the scheme tokens.
 *
 * The $5 and $2.50 figures are the calculator's own; neither is a tier price
 * in src/data/pricing.ts.
 */
export function PortfolioCalculator() {
  const { openModal } = useContactModal();
  const [domainCount, setDomainCount] = useState(10);

  const annualManagementFee = domainCount * 5 * 12;
  const estimatedParkingRevenue = domainCount * 2.5 * 12;

  return (
    <section className={sectionBandClass("cream")}>
      <div className="section-container">
        <div className="mx-auto max-w-xl">
          <h2 className="mb-12 text-center text-h3 font-bold md:mb-18">Portfolio ROI calculator</h2>

          <div className="rounded-card bg-scheme-foreground p-6 md:p-8">
            <div className="mb-8">
              <div className="mb-2 flex justify-between gap-4">
                <label htmlFor="portfolio-size" className="font-bold">
                  Portfolio size
                </label>
                <span className="font-bold">{domainCount} domains</span>
              </div>
              <input
                id="portfolio-size"
                type="range"
                min="5"
                max="100"
                value={domainCount}
                onChange={(e) => setDomainCount(parseInt(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-form bg-scheme-border accent-scheme-accent"
              />
            </div>

            <dl className="rounded-card bg-scheme-background p-6">
              <div className="flex items-center justify-between gap-4 border-b border-scheme-border pb-4">
                <dt className="text-small">Managed hosting fee, $5 per domain per month</dt>
                <dd className="font-bold">${annualManagementFee.toLocaleString()}/yr</dd>
              </div>
              <div className="flex items-center justify-between gap-4 pt-4">
                <dt className="text-small">Estimated parking revenue</dt>
                <dd className="font-bold">-${estimatedParkingRevenue.toLocaleString()}/yr</dd>
              </div>
              <div className="mt-4 flex items-center justify-between gap-4 border-t border-scheme-border pt-4">
                <dt className="font-bold">Net annual cost</dt>
                <dd className="text-h6 font-bold text-scheme-accent">
                  ${(annualManagementFee - estimatedParkingRevenue).toLocaleString()}
                </dd>
              </div>
            </dl>

            <p className="mt-6 text-tiny">
              Revenue estimates vary with a domain&apos;s keywords and traffic. A domain that draws
              traffic may offset its costs entirely.
            </p>

            <Button
              size="lg"
              onClick={() =>
                openModal(
                  "sales",
                  `I have ${domainCount} domains and want to discuss portfolio management.`
                )
              }
              className="mt-6 w-full bg-scheme-accent text-scheme-btn-text ring-offset-scheme-background hover:bg-scheme-accent/90 focus-visible:ring-scheme-text md:mt-8"
            >
              Analyze my portfolio
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
