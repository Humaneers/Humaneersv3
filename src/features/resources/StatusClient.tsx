"use client";

import Link from "next/link";

import { CTASection } from "@/components/sections/CTASection";
import { PageHeader } from "@/components/sections/PageHeader";
import { ProseSection } from "@/components/sections/ProseSection";
import { routePaths } from "../../routes";

/**
 * Interim status page. The version this replaced hardcoded uptime figures, an
 * "All Systems Operational" badge, a mock incident and a maintenance window,
 * none of it read from monitoring. Until real monitoring is wired to this
 * page, it says so and points at the ways to reach a person.
 *
 * Cut 6 moved the page onto the section library. The words are cut 0's and
 * are unchanged.
 */
export function StatusClient() {
  return (
    <>
      <PageHeader
        scheme="dark"
        align="center"
        heading="System Status"
        description="Live system monitoring is not published on this page yet."
      />

      <CTASection
        heading="Having a problem right now?"
        text="Call us, or open a request on the support page."
        ctas={[
          { label: "Call (928) 440-1505", href: "tel:+19284401505" },
          { label: "Go to Support", href: routePaths.support },
        ]}
      />

      <ProseSection scheme="cream" heading="Uptime commitment">
        <p>
          Our uptime commitment is set out in the{" "}
          <Link href={routePaths.terms}>Terms of Service, section 3.1, Uptime Guarantee</Link>.
        </p>
      </ProseSection>
    </>
  );
}
