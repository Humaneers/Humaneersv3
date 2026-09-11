"use client";

import Link from "next/link";

import { BookOpen, HelpCircle, Server } from "lucide-react";
import { SLA_WINDOW } from "@/data/pricing";

export function ResourcesClient() {
  const glossaryTerms = [
    {
      term: "MFA (Multi-Factor Authentication)",
      def: "A security system that requires more than one method of authentication from independent categories of credentials to verify the user's identity.",
    },
    {
      term: "Zero Trust",
      def: "A strategic initiative that helps prevent successful data breaches by eliminating the concept of trust from an organization's network architecture.",
    },
    {
      term: "Endpoint",
      def: "Any remote computing device that communicates back and forth with a network to which it is connected (e.g., laptops, phones).",
    },
    {
      term: "SLA (Service Level Agreement)",
      def: "A commitment between a service provider and a client. Particular aspects of the service – quality, availability, responsibilities – are agreed between the service provider and the service user.",
    },
  ];

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Hero */}
      <section className="bg-brand-oxford text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-copper/10 skew-y-12 transform translate-x-20"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Client Links, IT Glossary, and Incident FAQ
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-gray-300 font-light mb-8">
            Links for active clients, a short IT glossary, and answers to common incident response
            questions.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Client Links */}
          <div className="bg-white p-8 rounded-xl border-l-4 border-brand-oxford shadow-sm">
            <h2 className="text-2xl font-bold text-brand-oxford mb-6 flex items-center gap-3">
              <Server className="text-brand-oxford" /> Client Links
            </h2>
            <p className="text-brand-slate mb-6">
              System status and the support portal for active clients.
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <Server size={16} className="text-gray-400" />
                  <span className="font-medium text-brand-oxford">System Status</span>
                </div>
                <Link
                  href="/status"
                  className="text-sm font-medium text-brand-copper-text hover:text-brand-copper-text-dark"
                >
                  Check Status →
                </Link>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <HelpCircle size={16} className="text-gray-400" />
                  <span className="font-medium text-brand-oxford">Support Portal</span>
                </div>
                <a
                  href="https://support.humaneers.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-brand-copper-text hover:text-brand-copper-text-dark"
                >
                  Open Portal →
                </a>
              </div>
            </div>
          </div>

          {/* Glossary */}
          <div className="bg-brand-oxford p-8 rounded-xl text-white shadow-sm">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <BookOpen className="text-brand-copper" /> IT Glossary
            </h2>
            <div className="space-y-6">
              {glossaryTerms.map((item) => (
                <div
                  key={item.term}
                  className="border-b border-gray-700 pb-4 last:border-0 last:pb-0"
                >
                  <h3 className="font-bold text-brand-copper-light mb-1">{item.term}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{item.def}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-brand-oxford mb-8 text-center">
            Incident Response FAQ
          </h2>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-bold text-brand-oxford mb-2">
                What qualifies as a P1 Critical Incident?
              </h3>
              <p className="text-brand-slate text-sm">
                Any outage affecting &gt;50% of users, a confirmed data breach, or active ransomware
                attack. P1 incidents trigger our SLA response protocol, which targets a first
                response within {SLA_WINDOW.critical}.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-bold text-brand-oxford mb-2">
                How do I report a security vulnerability?
              </h3>
              <p className="text-brand-slate text-sm">
                We maintain a responsible disclosure program. Please email security@humaneers.co
                (PGP key available in Colophon) with details. We do not offer bounties but we
                publicly credit researchers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-bold text-brand-oxford mb-2">
                What is your data retention policy on logs?
              </h3>
              <p className="text-brand-slate text-sm">
                Security logs are retained for 365 days in cold storage (immutable). Operational
                logs are cycled every 30 days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
