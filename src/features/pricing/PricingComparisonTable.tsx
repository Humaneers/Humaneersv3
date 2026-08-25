"use client";

import React from "react";
import { Check, X, HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type PricingMode = "business" | "nonprofit" | "household" | "incubation";

interface PricingComparisonTableProps {
  mode: PricingMode;
}

interface FeatureRow {
  name: string;
  tooltip?: string;
  tiers: { [key: string]: boolean | string }; // boolean for check/x, string for specific text
}

interface ComparisonCategory {
  title: string;
  features: FeatureRow[];
}

export function PricingComparisonTable({ mode }: PricingComparisonTableProps) {
  if (mode === "nonprofit") {
    return (
      <div className="w-full max-w-4xl mx-auto mt-24 text-center">
        <h2 className="text-3xl font-bold text-brand-oxford mb-6">Simple, Flat-Rate Pricing</h2>
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <p className="text-lg text-brand-slate mb-4">
            We believe nonprofits deserve enterprise-grade security without the enterprise price
            tag.
          </p>
          <p className="text-brand-slate mb-8">
            Our <strong>Nonprofit Foundation</strong> plan includes all our core security features
            for a flat monthly organization fee, plus direct pass-through costs for user licenses.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-bold text-brand-oxford mb-2">What You Pay Us</h4>
              <p className="text-3xl font-bold text-brand-copper mb-1">
                $199<span className="text-sm text-gray-500 font-normal">/mo</span>
              </p>
              <p className="text-sm text-gray-500">
                Flat organization retainer for support, management, and strategic guidance.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-bold text-brand-oxford mb-2">User Licenses</h4>
              <p className="text-3xl font-bold text-brand-oxford mb-1">At Cost</p>
              <p className="text-sm text-gray-500">
                We pass through Microsoft 365 / Google Workspace nonprofit pricing directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const businessTiers = ["Core", "Growth", "Enterprise"];
  const householdTiers = ["Solo", "Household", "Legacy Care", "Estate"];
  const incubationTiers = ["Incubator", "Hold Co"];

  const businessCategories: ComparisonCategory[] = [
    {
      title: "Strategic Infrastructure",
      features: [
        {
          name: "Plan Users Included",
          tooltip: "Number of users included in the base price",
          tiers: { Core: "Two Users", Growth: "Two Users", Enterprise: "Two Users" },
        },
        {
          name: "Unlimited Remote Support",
          tooltip: "Helpdesk access for all covered users",
          tiers: { Core: true, Growth: true, Enterprise: true },
        },
        {
          name: "Microsoft 365 Management",
          tooltip: "Administration of users, licenses, and security policies",
          tiers: { Core: true, Growth: true, Enterprise: true },
        },
        {
          name: "Vendor Diplomacy",
          tooltip: "We handle ISP and software vendor support tickets",
          tiers: { Core: false, Growth: true, Enterprise: true },
        },
      ],
    },
    {
      title: "Security & Sovereignty",
      features: [
        {
          name: "Endpoint Security (EDR)",
          tooltip: "Next-gen antivirus and threat detection",
          tiers: { Core: true, Growth: true, Enterprise: true },
        },
        {
          name: "Fleet Command (MDM)",
          tooltip: "Remote wipe, encryption enforcement, and patch management",
          tiers: { Core: true, Growth: true, Enterprise: true },
        },
        {
          name: "Advanced Threat Protection",
          tooltip: "AI-driven behavioral analysis and hunt team",
          tiers: { Core: false, Growth: true, Enterprise: true },
        },
        {
          name: "Security Awareness Training",
          tooltip: "Phishing simulations and education for staff",
          tiers: { Core: "Optional", Growth: true, Enterprise: true },
        },
        {
          name: "SOC 2 / HIPAA Control Mapping",
          tooltip:
            "We map your configurations to the framework's controls. This is preparation work, not an audit, and it does not certify you or us.",
          tiers: { Core: false, Growth: "Assisted", Enterprise: true },
        },
      ],
    },
    {
      title: "Strategy & Growth",
      features: [
        {
          name: "Quarterly Health Checks",
          tooltip: "Review of technology performance and risks",
          tiers: { Core: false, Growth: true, Enterprise: true },
        },
        {
          name: "Americanization Strategy",
          tooltip: "Adapting foreign brands for the US market",
          tiers: { Core: false, Growth: true, Enterprise: true },
        },
        {
          name: "Fractional CIO Access",
          tooltip: "Strategic technology leadership and roadmapping",
          tiers: { Core: false, Growth: false, Enterprise: true },
        },
        {
          name: "Annual Strategy Retreat",
          tooltip: "In-depth planning session for long-term goals",
          tiers: { Core: false, Growth: false, Enterprise: true },
        },
        {
          name: "Dedicated Success Manager",
          tooltip: "A single point of contact for your account",
          tiers: { Core: false, Growth: false, Enterprise: true },
        },
      ],
    },
    {
      title: "Support SLAs",
      features: [
        {
          name: "Response Time",
          tiers: { Core: "Standard", Growth: "Priority", Enterprise: "Priority" },
        },
        {
          name: "On-site Support",
          tiers: { Core: "Billable", Growth: "Included", Enterprise: "Included" },
        },
      ],
    },
    {
      title: "Digital Asset Sovereignty",
      features: [
        {
          name: "Concierge Domain Management",
          tooltip:
            "Purchase, DNS configuration, and renewal management at cost + $15/mo service fee",
          tiers: { Core: true, Growth: true, Enterprise: true },
        },
        {
          name: "Web Hosting Management",
          tooltip: "Coordination with hosting providers and technical setup",
          tiers: { Core: "Available", Growth: true, Enterprise: true },
        },
        {
          name: "Email Hosting Admin",
          tooltip: "Setup and management of G-Suite / Microsoft 365 mailboxes",
          tiers: { Core: true, Growth: true, Enterprise: true },
        },
      ],
    },
  ];

  const householdCategories: ComparisonCategory[] = [
    {
      title: "Concierge & Lifestyle Services",
      features: [
        {
          name: "Humans (and their devices) Included",
          tooltip: "Number of family members and their personal devices covered",
          tiers: {
            Solo: "Two Humans",
            Household: "Four Humans",
            "Legacy Care": "Two Humans",
            Estate: "Four Humans",
          },
        },
        {
          name: "Priority 'Red Button' Support",
          tooltip: "Immediate access to support team when you need us",
          tiers: { Solo: false, Household: false, "Legacy Care": true, Estate: true },
        },
        {
          name: "Digital Legacy Care Planning",
          tooltip: "Organizing digital assets and accounts for next of kin",
          tiers: { Solo: false, Household: false, "Legacy Care": true, Estate: true },
        },
        {
          name: "Family Proxy (God Mode)",
          tooltip: "Authorized family member access to accounts in emergencies",
          tiers: { Solo: false, Household: true, "Legacy Care": true, Estate: true },
        },
        {
          name: "Home Network Management",
          tooltip: "Enterprise-grade Wi-Fi setup and ongoing optimization",
          tiers: { Solo: false, Household: true, "Legacy Care": true, Estate: true },
        },
        {
          name: "ISP & Vendor Diplomacy",
          tooltip: "We deal with the cable company, phone company, and tech vendors for you",
          tiers: { Solo: false, Household: false, "Legacy Care": true, Estate: true },
        },
      ],
    },
    {
      title: "Technical Support",
      features: [
        {
          name: "Remote Tech Support",
          tooltip: "Helpdesk for personal device and software issues",
          tiers: { Solo: true, Household: true, "Legacy Care": true, Estate: true },
        },
        {
          name: "Email Admin (G-Suite/Microsoft 365)",
          tooltip: "Setup and management of personal email domains",
          tiers: { Solo: true, Household: true, "Legacy Care": false, Estate: true },
        },
        {
          name: "Domain & Digital Asset Management",
          tooltip: "Secure registration, DNS, and renewal management for family domains",
          tiers: { Solo: true, Household: true, "Legacy Care": false, Estate: true },
        },
      ],
    },
    {
      title: "Physical & Digital Protection",
      features: [
        {
          name: "Enterprise Endpoint Security",
          tooltip: "Commercial-grade antivirus for personal devices",
          tiers: { Solo: false, Household: true, "Legacy Care": true, Estate: true },
        },
        {
          name: "Identity Theft Monitoring",
          tooltip: "Dark web scanning and alert system",
          tiers: { Solo: false, Household: true, "Legacy Care": true, Estate: true },
        },
        {
          name: "Content Filtering",
          tooltip: "Parental controls and granular device supervision",
          tiers: { Solo: false, Household: true, "Legacy Care": true, Estate: true },
        },
        {
          name: "Fraud/Scam Air-Gapping",
          tooltip: "Aggressive filtering of unknown callers and emails",
          tiers: { Solo: false, Household: false, "Legacy Care": true, Estate: true },
        },
      ],
    },
  ];

  const incubationCategories: ComparisonCategory[] = [
    {
      title: "Asset Sovereignty",
      features: [
        {
          name: "Domain Registry Locks",
          tooltip: "Prevents unauthorized domain transfers",
          tiers: { Incubator: true, "Hold Co": true },
        },
        {
          name: "Whois Privacy",
          tooltip: "Redacts personal contact information",
          tiers: { Incubator: true, "Hold Co": true },
        },
        {
          name: "DNS Management",
          tooltip: "Advanced DNS configuration for reliability",
          tiers: { Incubator: true, "Hold Co": true },
        },
        {
          name: "Ad Parking Monetization",
          tooltip: "Generate revenue from unused domains",
          tiers: { Incubator: true, "Hold Co": true },
        },
      ],
    },
    {
      title: "Corporate Structure",
      features: [
        {
          name: "Consolidated Billing",
          tooltip: "One invoice for all entities",
          tiers: { Incubator: false, "Hold Co": true },
        },
        {
          name: "Inter-Company Transfers",
          tooltip: "Seamless movement of assets between entities",
          tiers: { Incubator: "Billable", "Hold Co": true },
        },
        {
          name: "Quarterly Strategy Review",
          tooltip: "Strategic planning for portfolio growth",
          tiers: { Incubator: false, "Hold Co": true },
        },
      ],
    },
  ];

  const categories =
    mode === "household"
      ? householdCategories
      : mode === "incubation"
        ? incubationCategories
        : businessCategories; // Default to business

  const tiers =
    mode === "household" ? householdTiers : mode === "incubation" ? incubationTiers : businessTiers;

  return (
    <div className="w-full max-w-7xl mx-auto mt-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-brand-oxford mb-4">Compare Plans</h2>
        <p className="text-brand-slate">Detailed feature breakdown per tier.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr>
              <th className="p-4 bg-gray-50 border-b border-gray-200"></th>
              {tiers.map((tier) => (
                <th
                  key={tier}
                  className="p-4 bg-gray-50 border-b border-gray-200 text-lg font-bold text-brand-oxford text-center"
                >
                  {tier}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <React.Fragment key={category.title}>
                <tr key={category.title} className="bg-brand-cream/30">
                  <td
                    colSpan={tiers.length + 1}
                    className="p-4 font-bold text-brand-copper-text uppercase tracking-wider text-sm border-b border-gray-100"
                  >
                    {category.title}
                  </td>
                </tr>
                {category.features.map((feature, idx) => (
                  <tr key={feature.name} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                    <td className="p-4 border-b border-gray-100 font-medium text-brand-slate flex items-center gap-2">
                      {feature.name}
                      {feature.tooltip && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle size={14} className="text-gray-400 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">{feature.tooltip}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </td>
                    {tiers.map((tier) => {
                      const value = feature.tiers[tier];
                      return (
                        <td
                          key={`${feature.name}-${tier}`}
                          className="p-4 border-b border-gray-100 text-center"
                        >
                          {value === true ? (
                            <div className="flex justify-center">
                              <span className="bg-brand-copper/10 p-1 rounded-full">
                                <Check size={20} className="text-brand-copper" strokeWidth={3} />
                              </span>
                            </div>
                          ) : value === false ? (
                            <div className="flex justify-center">
                              <X size={20} className="text-gray-300" />
                            </div>
                          ) : (
                            <span className="text-sm font-semibold text-brand-oxford">{value}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
