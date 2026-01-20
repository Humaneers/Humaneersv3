"use client";

import { Scale, Shield, FileText, AlertTriangle, Lock, HeartHandshake } from "lucide-react";
import { EmailActionButton } from "../ui/email-action-button";

export function EthicsClient() {
  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Header */}
      <section className="bg-brand-oxford text-white py-20 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-brand-copper/20 text-brand-copper px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-brand-copper/30">
            <Scale size={16} /> Corporate Governance
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Ethics Charter</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            Our commitment to integrity, transparency, and doing the right thing, even when no one
            is watching.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Left Column: The Charter */}
          <div className="lg:col-span-7 space-y-16">
            <section>
              <h2 className="text-3xl font-bold text-brand-oxford mb-8 flex items-center gap-3">
                <FileText className="text-brand-copper" /> Core Principles
              </h2>

              <div className="space-y-8">
                <div className="bg-brand-cream p-8 rounded-xl border border-brand-copper/20">
                  <h3 className="text-xl font-bold text-brand-oxford mb-3">1. Mission Statement</h3>
                  <p className="text-brand-slate leading-relaxed">
                    We exist to bring enterprise-grade discipline and security to the small
                    businesses that power our community. We believe that robust technology
                    infrastructure is a right, not a luxury reserved for the Fortune 500.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border-l-4 border-brand-copper pl-6 py-2">
                    <h4 className="font-bold text-brand-oxford mb-2 flex items-center gap-2">
                      <HeartHandshake className="w-4 h-4 text-brand-copper" /> Client-First
                    </h4>
                    <p className="text-sm text-brand-slate">
                      Our "No-BS" promise means we practice strict vendor neutrality. We recommend
                      what works for you, not what pays us the highest commission.
                    </p>
                  </div>
                  <div className="border-l-4 border-brand-copper pl-6 py-2">
                    <h4 className="font-bold text-brand-oxford mb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-brand-copper" /> Anti-Corruption
                    </h4>
                    <p className="text-sm text-brand-slate">
                      Zero tolerance for kickbacks, bribery, or undisclosed referral fees. All
                      procurement decisions are documented and available for client review.
                    </p>
                  </div>
                  <div className="border-l-4 border-brand-copper pl-6 py-2">
                    <h4 className="font-bold text-brand-oxford mb-2 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-brand-copper" /> Data Ethics
                    </h4>
                    <p className="text-sm text-brand-slate">
                      We are custodians, not owners, of your data. We never sell client information.
                      We adhere to SOC 2 Type II standards for all data handling.
                    </p>
                  </div>
                  <div className="border-l-4 border-brand-copper pl-6 py-2">
                    <h4 className="font-bold text-brand-oxford mb-2 flex items-center gap-2">
                      <Scale className="w-4 h-4 text-brand-copper" /> Accountability
                    </h4>
                    <p className="text-sm text-brand-slate">
                      If we break it, we fix it. If we recommend it and it fails, we own the
                      remediation. We stand behind our engineering.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-oxford mb-6 flex items-center gap-3">
                <AlertTriangle className="text-brand-copper" /> Whistleblowing Policy
              </h2>
              <div className="prose prose-gray max-w-none text-brand-slate">
                <p>
                  Humaneers fosters a culture of "Speaking Up." We encourage employees, contractors,
                  suppliers, and clients to report any suspected wrongdoing without fear of
                  retaliation.
                </p>
                <h4 className="font-bold text-brand-oxford mt-4 mb-2">
                  Scope of Reportable Issues
                </h4>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>Financial fraud or accounting irregularities</li>
                  <li>Bribery, corruption, or conflict of interest</li>
                  <li>Harassment, discrimination, or workplace safety violations</li>
                  <li>Security breaches or data privacy violations</li>
                  <li>Unethical business practices</li>
                </ul>
                <h4 className="font-bold text-brand-oxford mt-4 mb-2">Non-Retaliation Guarantee</h4>
                <p>
                  We strictly prohibit retaliation against anyone who raises a concern in good
                  faith. Reports are handled with the utmost confidentiality by our independent
                  Compliance Officer.
                </p>
              </div>
            </section>
          </div>

          {/* Right Column: Reporting Form */}
          <div className="lg:col-span-5">
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 sticky top-24 shadow-sm text-center flex flex-col items-center">
              <h3 className="text-2xl font-bold text-brand-oxford mb-2">Submit a Report</h3>
              <p className="text-sm text-gray-500 mb-8">
                Use the secure link below to email our Compliance Officer directly. You may choose
                to use an anonymous email address if you prefer.
              </p>

              <EmailActionButton
                label="Submit Ethics Report"
                email="compliance@humaneers.dev"
                subject="CONFIDENTIAL: Ethics Report"
                className="w-full bg-brand-copper hover:bg-brand-copper-dark"
              />

              <p className="text-[10px] text-center text-gray-400 mt-6">
                Reports are routed directly to the Chief Compliance Officer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
