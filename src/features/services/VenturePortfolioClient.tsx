"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { routePaths } from "../../routes";
import { useContactModal } from "@/components/providers/ContactModalProvider";
import {
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Globe,
  Lock,
  DollarSign,
  FileText,
  Rocket,
} from "lucide-react";

export function VenturePortfolioClient() {
  const router = useRouter();
  const { openModal } = useContactModal();

  // Calculator State
  const [domainCount, setDomainCount] = useState(10);

  // Savings Calculation
  // Annual Cost = (Domain Cost + $5 management fee) * 12
  // Value = Monitoring + Compliance + Parking Revenue - Fees
  const annualManagementFee = domainCount * 5 * 12;
  const estimatedParkingRevenue = domainCount * 2.5 * 12; // Conservative est

  return (
    <div className="bg-brand-cream min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-oxford text-white min-h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
            alt="Skyscraper abstract"
            fill
            className="object-cover opacity-10 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-oxford via-brand-oxford/90 to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-brand-copper/20 border border-brand-copper/30 text-brand-copper px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
              <Lightbulb size={16} /> Venture Studio Infrastructure
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Your Ideas Deserve a <span className="text-brand-copper">Safe Harbor.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light mb-8 leading-relaxed max-w-xl">
              From raw domain to operational entity. We provide the "holding company" infrastructure
              so you can focus on the next big thing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() =>
                  openModal(
                    "sales",
                    "I'm interested in the Venture Portfolio service for my domains.",
                    "Venture Portfolio Hero"
                  )
                }
                className="bg-brand-copper hover:bg-brand-copper-dark text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-brand-copper/30 transition-all font-bold"
                withArrow
              >
                Secure My Portfolio
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
                }
                className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full"
              >
                Explore Features
              </Button>
            </div>

            <div className="mt-12 flex items-center gap-8 text-sm text-gray-400 font-medium">
              <div className="flex items-center gap-2">
                <Lock size={16} className="text-brand-copper" /> Enterprise Registry Locks
              </div>
              <div className="flex items-center gap-2">
                <Globe size={16} className="text-brand-copper" /> Smart Parking
              </div>
            </div>
          </div>

          {/* Abstract Visual - The Asset Stack */}
          <div className="relative hidden lg:block h-[500px]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-copper/5 rounded-full blur-[100px]" />

            {/* Floating Cards */}
            <div className="absolute top-20 right-10 bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-2xl skew-y-3 animate-in hover:scale-105 transition-transform duration-500">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="font-mono text-xs text-brand-copper">PROJECT_ALPHA.COM</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">$0.00 Cost</div>
              <div className="text-xs text-gray-400">Ad Revenue Offset Active</div>
            </div>

            <div className="absolute bottom-32 left-0 bg-brand-oxford/80 backdrop-blur-md p-6 rounded-xl border border-brand-copper/30 shadow-2xl -skew-y-2 z-20">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle size={18} className="text-brand-copper" />
                <span className="font-bold text-white text-sm uppercase tracking-wide">
                  Compliance Watchtower
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-8 text-xs">
                  <span className="text-gray-300">BOI Report (FinCEN)</span>
                  <span className="text-green-400 font-mono">FILED</span>
                </div>
                <div className="flex items-center justify-between gap-8 text-xs">
                  <span className="text-gray-300">Statement of Info</span>
                  <span className="text-yellow-400 font-mono">DUE IN 15 DAYS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section id="features" className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-brand-oxford text-3xl md:text-5xl font-bold mb-6">
              Digital Asset Sovereignty
            </h2>
            <p className="text-xl text-brand-slate font-light">
              Stop treating your IP like a commodity. We provide institutional-grade custody for
              your digital assets.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-brand-copper/30 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-brand-oxford text-white rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Lock size={28} />
              </div>
              <h3 className="text-xl font-bold text-brand-oxford mb-3">Custodial Security</h3>
              <p className="text-brand-slate text-sm leading-relaxed">
                Enterprise registry locking, DNSSEC implementation, and IAM access controls prevent
                unauthorized transfers or DNS hijacking.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-brand-copper/30 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-brand-copper text-white rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <DollarSign size={28} />
              </div>
              <h3 className="text-xl font-bold text-brand-oxford mb-3">Smart Monetization</h3>
              <p className="text-brand-slate text-sm leading-relaxed">
                Don't let assets bleed cash. We implement tasteful, relevant parking pages that
                generate ad revenue to offset renewal costs.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-brand-copper/30 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-brand-slate text-white rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <FileText size={28} />
              </div>
              <h3 className="text-xl font-bold text-brand-oxford mb-3">Compliance Watchtower</h3>
              <p className="text-brand-slate text-sm leading-relaxed">
                We track Beneficial Ownership Information (BOI) filings and annual reports for every
                entity in your portfolio.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-brand-copper/30 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-blue-600 text-white rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Rocket size={28} />
              </div>
              <h3 className="text-xl font-bold text-brand-oxford mb-3">One-Click Genesis</h3>
              <p className="text-brand-slate text-sm leading-relaxed">
                Ready to launch? We instantly provision email (M365), banking relations, and cloud
                infrastructure for the new entity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Launch Calculator */}
      <section className="py-24 bg-brand-oxford relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-copper/5 -skew-x-12 transform origin-top-right" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-white">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">The Cost of Chaos</h2>
              <p className="text-xl text-gray-300 mb-8 font-light">
                Most serial entrepreneurs lose thousands annually in forgotten renewals, unfiled
                reports, and missed monetization opportunities.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-lg">
                  <CheckCircle2 className="text-brand-copper" />{" "}
                  <span>Centralized billing across 50+ domains</span>
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <CheckCircle2 className="text-brand-copper" />{" "}
                  <span>Brokerage negotiation included</span>
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <CheckCircle2 className="text-brand-copper" />{" "}
                  <span>No "GoDaddy" upsell spam</span>
                </li>
              </ul>
            </div>

            {/* Calculator UI */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-brand-oxford mb-6 border-b border-gray-100 pb-4">
                Portfolio ROI Calculator
              </h3>

              <div className="space-y-8 mb-8">
                <div>
                  <div className="flex justify-between mb-2">
                    <label htmlFor="portfolio-size" className="font-bold text-brand-slate text-sm">
                      Portfolio Size
                    </label>
                    <span className="font-bold text-brand-oxford">{domainCount} Domains</span>
                  </div>
                  <input
                    id="portfolio-size"
                    type="range"
                    min="5"
                    max="100"
                    value={domainCount}
                    onChange={(e) => setDomainCount(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-copper"
                  />
                </div>

                <div className="bg-brand-cream p-6 rounded-xl space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <span className="text-brand-slate text-sm">Managed Hosting Fee ($5/mo)</span>
                    <span className="font-mono font-bold text-brand-oxford">
                      ${annualManagementFee.toLocaleString()}/yr
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-green-600">
                    <span className="text-sm font-bold flex items-center gap-2">
                      {" "}
                      <Globe size={14} /> Est. Parking Revenue
                    </span>
                    <span className="font-mono font-bold">
                      -${estimatedParkingRevenue.toLocaleString()}/yr
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-brand-copper pt-2">
                    <span className="text-sm font-bold">NET ANNUAL COST</span>
                    <span className="font-mono font-bold text-xl">
                      ${(annualManagementFee - estimatedParkingRevenue).toLocaleString()}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-400 italic text-center">
                  *Revenue estimates vary based on domain keywords and traffic. High-value domains
                  may offset costs entirely.
                </p>
              </div>

              <Button
                onClick={() =>
                  openModal(
                    "sales",
                    `I have ${domainCount} domains and want to discuss portfolio management.`
                  )
                }
                className="w-full bg-brand-oxford hover:bg-brand-oxford-muted text-white py-6 text-lg font-bold"
              >
                Analyze My Portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-20 bg-brand-cream text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-brand-oxford mb-6">
            Ready to professionalize your portfolio?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={() => router.push(routePaths.pricing)}
              className="bg-brand-copper hover:bg-brand-copper-dark text-white px-8 py-6 rounded-full font-bold shadow-lg"
            >
              View Pricing
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push(routePaths.contact)}
              className="text-brand-oxford border-brand-oxford/20 hover:bg-white px-8 py-6 rounded-full"
            >
              Contact Strategy Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
