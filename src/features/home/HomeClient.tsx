"use client";

import type { ReactNode } from "react";

import { CTASection } from "@/components/sections/CTASection";
import { PageHeader } from "@/components/sections/PageHeader";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { setSessionContext } from "@/lib/session";
import { routePaths } from "@/routes";

import { ObjectionsSection } from "./ObjectionsSection";
import { Solutions } from "./SolutionSwitcher";

/**
 * The page's one primary CTA. Every body CTA says this and goes here: the
 * waitlist form on /talk-to-sales. We are at capacity, and the page says so
 * beside the CTA, in the words ContactModal's sales tab and /talk-to-sales
 * use, rather than after the click.
 */
const WAITLIST = { label: "Join the waitlist", href: routePaths.talkToSales } as const;

/**
 * Notes where a waitlist click came from; ZohoTracking passes entrySource to
 * the SalesIQ visitor record. The section library's CTA row takes no click
 * handler, so this listens around the section instead.
 */
function EntrySource({ source, children }: { source: string; children: ReactNode }) {
  return (
    <div
      onClickCapture={(event) => {
        if (event.target instanceof Element && event.target.closest(`a[href="${WAITLIST.href}"]`)) {
          setSessionContext({ entrySource: source });
        }
      }}
    >
      {children}
    </div>
  );
}

export function HomeClient() {
  return (
    <>
      <EntrySource source="Homepage Hero CTA">
        <PageHeader
          heading="Built with precision. Delivered with soul."
          description="Enterprise strategy for businesses and families. IT, security, and brand growth for those who demand excellence. We are at capacity right now, so new engagements are joining a waitlist rather than going straight into onboarding."
          ctas={[WAITLIST]}
          scheme="dark"
        />
      </EntrySource>

      <Solutions />

      <SplitFeature
        heading="Security & Trust You Can Rely On"
        body="We take security seriously. Your data never leaves domestic soil without your explicit permission."
        points={["No user minimums", "No offshore NOCs", "100% US-based engineering"]}
      />

      <ObjectionsSection />

      <EntrySource source="Homepage Bottom CTA">
        <CTASection
          heading="Ready to upgrade your business or protect your home?"
          text="Get the enterprise-grade support you deserve with the personal touch you need. New engagements are joining a waitlist while we are at capacity."
          ctas={[WAITLIST]}
          scheme="dark"
        />
      </EntrySource>
    </>
  );
}
