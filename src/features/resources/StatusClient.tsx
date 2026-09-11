"use client";

import Link from "next/link";
import { LifeBuoy, Phone } from "lucide-react";
import { routePaths } from "../../routes";

/**
 * Interim status page. The version this replaced hardcoded uptime figures, an
 * "All Systems Operational" badge, a mock incident and a maintenance window,
 * none of it read from monitoring. Until real monitoring is wired to this
 * page, it says so and points at the ways to reach a person.
 */
export function StatusClient() {
  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Header */}
      <section className="bg-brand-oxford text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">System Status</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Live system monitoring is not published on this page yet.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-xl font-bold text-brand-oxford mb-4">
              Having a problem right now?
            </h2>
            <p className="text-brand-slate mb-6">Call us, or open a request on the support page.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+19284401505"
                className="inline-flex items-center justify-center gap-2 bg-brand-copper-text hover:bg-brand-copper-text-dark text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
              >
                <Phone size={20} aria-hidden="true" />
                Call (928) 440-1505
              </a>
              <Link
                href={routePaths.support}
                className="inline-flex items-center justify-center gap-2 border border-brand-oxford text-brand-oxford hover:bg-brand-oxford hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
              >
                <LifeBuoy size={20} aria-hidden="true" />
                Go to Support
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-xl font-bold text-brand-oxford mb-4">Uptime commitment</h2>
            <p className="text-brand-slate">
              Our uptime commitment is set out in the{" "}
              <Link
                href={routePaths.terms}
                className="font-semibold text-brand-copper-text underline hover:text-brand-copper-text-dark"
              >
                Terms of Service, section 3.1, Uptime Guarantee
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
