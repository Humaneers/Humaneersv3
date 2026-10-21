"use client";

import type { ReactNode } from "react";

import { setSessionContext } from "@/lib/session";

import { WAITLIST } from "./content";

/**
 * Notes where a waitlist click came from; ZohoTracking passes entrySource to
 * the SalesIQ visitor record. The section library's CTA row takes no click
 * handler, so this listens around the section instead.
 *
 * Moved here unchanged from HomeClient.tsx, which is now a server component:
 * a click handler needs a client file.
 */
export function EntrySource({ source, children }: { source: string; children: ReactNode }) {
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

/**
 * Notes which service a visitor opened, as lastViewedService, the way the
 * solution wheel's "Explore" link did. It listens around the arc and the
 * service cards and matches the clicked link by its route.
 */
export function ServiceCapture({
  services,
  children,
}: {
  services: readonly { label: string; href: string }[];
  children: ReactNode;
}) {
  return (
    <div
      onClickCapture={(event) => {
        const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
        const service = services.find(({ href }) => link?.getAttribute("href") === href);
        if (service) setSessionContext({ lastViewedService: service.label });
      }}
    >
      {children}
    </div>
  );
}
