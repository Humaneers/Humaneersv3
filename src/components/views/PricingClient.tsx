"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setSessionContext } from "../../lib/session";
import { Check, Shield, BarChart3, Users, Lock, Clock, Heart } from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { DefinitionTooltip } from "../DefinitionTooltip";
import { routePaths } from "../../routes";

export function PricingClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get mode from URL params, default to business
  const modeParam =
    (searchParams.get("mode") as "business" | "nonprofit" | "household") || "business";
  const [pricingMode, setPricingMode] = useState<"business" | "nonprofit" | "household">(modeParam);

  const businessTiers = [
    {
      name: "Foundation",
      price: 90,
      unit: "/user/mo",
      description: "Essential IT & Security for small teams.",
      features: [
        "Hybrid/Cloud Infrastructure",
        "Unlimited remote support",
        "Basic Security Suite (Endpoint Security)",
        "MDM (Mobile Device Management)",
        "Microsoft 365 Management",
      ],
      cta: "Get Started",
      highlighted: false,
      links: [
        { label: "Managed IT Info", icon: <Shield size={12} />, to: routePaths.managedIt },
        { label: "Family Protection", icon: <Lock size={12} />, to: routePaths.familyProtection },
      ],
    },
    {
      name: "Growth",
      price: 119,
      unit: "/user/mo",
      description: "For businesses ready to scale their brand and ops.",
      features: [
        "Everything in Foundation",
        "Quarterly Marketing Health Checks",
        "Priority On-site Support",
        "Advanced Threat Protection",
        "Vendor Management",
      ],
      cta: "Choose Growth",
      highlighted: true,
      links: [{ label: "Americanization", icon: <BarChart3 size={12} />, to: routePaths.growth }],
    },
    {
      name: "Scale",
      price: 149,
      unit: "/user/mo",
      description: "Full enterprise power with strategic leadership.",
      features: [
        "Everything in Growth",
        "Americanization Strategy",
        "Fractional CIO Access",
        "Dedicated Success Manager",
        "Annual Strategy Retreat",
      ],
      cta: "Go Enterprise",
      highlighted: false,
      links: [
        {
          label: "vCIO Leadership",
          icon: <Users size={12} />,
          to: routePaths.fractionalLeadership,
        },
      ],
    },
  ];

  const householdTiers = [
    {
      name: "Solo / Personal",
      price: 25,
      unit: "/user/mo",
      description: "DNS, domain & email management. Limited protection.",
      features: [
        "Domain Registrar Management",
        "DNS Record Configuration",
        "Email (G-Suite/O365) Admin",
        "Remote Tech Support",
        "No Active Security Software",
      ],
      cta: "Get Admin Help",
      highlighted: false,
      links: [{ label: "Personal Details", icon: <Users size={12} />, to: routePaths.personal }],
    },
    {
      name: "Personal Foundation",
      price: 80,
      unit: "/household/mo",
      description: "Essential protection for up to four humans and their devices.",
      features: [
        "Enterprise Endpoint Protection (Mac/PC)",
        "MDM (Mobile Device Management)",
        "Content Filtering & Parental Controls",
        "Identity Theft Monitoring",
        "Remote Helpdesk Support",
      ],
      cta: "Secure My Home",
      highlighted: true,
      links: [
        { label: "Protection Details", icon: <Lock size={12} />, to: routePaths.familyProtection },
      ],
    },
    {
      name: "Senior Care",
      price: 75,
      unit: "/household/mo",
      description: "Dignified, patient support with aggressive fraud protection.",
      features: [
        "Everything in Foundation",
        "Fraud & Scam Air-Gapping",
        "Unlimited 'Red Button' Phone Support",
        "Family Proxy Access (God Mode)",
        "Digital Legacy Planning",
      ],
      cta: "Protect My Parents",
      highlighted: false,
      links: [
        { label: "Senior Care Details", icon: <Heart size={12} />, to: routePaths.seniorCare },
      ],
    },
    {
      name: "Personal Estate",
      price: 195,
      unit: "/household/mo",
      description: "Full digital concierge for the modern smart home.",
      features: [
        "Everything in Foundation",
        "Custom Personal Email (@surname.com)",
        "Enterprise Wi-Fi Management",
        "ISP & Vendor Management",
        "Priority 24/7 Support",
      ],
      cta: "Get Concierge",
      highlighted: false,
      links: [{ label: "Estate Support", icon: <Shield size={12} />, to: routePaths.estate }],
    },
  ];

  const nonprofitTiers = [
    {
      name: "Nonprofit Foundation",
      price: 299,
      unit: "/org/mo + licenses",
      description: "Flat-rate service fee plus at-cost licensing.",
      features: [
        "Flat Organization Service Fee",
        "Per-User Licensing Cost Only",
        "Unlimited Remote Support",
        "Donor Data Protection",
        "Volunteer Management",
      ],
      cta: "Verify 501(c)(3)",
      highlighted: true,
      links: [
        { label: "Nonprofit Details", icon: <Shield size={12} />, to: routePaths.nonProfits },
      ],
    },
  ];

  const currentTiers =
    pricingMode === "household"
      ? householdTiers
      : pricingMode === "nonprofit"
        ? nonprofitTiers
        : businessTiers;

  return (
    <div className="bg-brand-cream min-h-screen py-12 md:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-oxford mb-6">
            Transparent Pricing. No Hidden Fees.
          </h1>
          <p className="text-lg text-brand-slate mb-10">
            Choose the plan that fits your stage of business or life.
          </p>

          <div className="inline-flex bg-gray-100/50 p-1.5 rounded-xl shadow-inner border border-gray-200/50 mb-10 relative overflow-hidden w-full max-w-xl mx-auto">
            <div className="grid grid-cols-3 w-full gap-2 relative z-10">
              <button
                onClick={() => {
                  setPricingMode("business");
                  setSessionContext({ segment: "business" });
                }}
                className={`relative py-3 rounded-lg text-sm font-semibold transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-brand-oxford focus-visible:ring-offset-2 ${pricingMode === "business"
                    ? "text-white"
                    : "text-brand-slate hover:text-brand-oxford"
                  }`}
              >
                {pricingMode === "business" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-brand-oxford rounded-lg shadow-md"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Business
                </span>
              </button>

              <button
                onClick={() => {
                  setPricingMode("household");
                  setSessionContext({ segment: "family" });
                }}
                className={`relative py-3 rounded-lg text-sm font-semibold transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-brand-oxford focus-visible:ring-offset-2 ${pricingMode === "household"
                    ? "text-white"
                    : "text-brand-slate hover:text-brand-copper"
                  }`}
              >
                {pricingMode === "household" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-brand-copper rounded-lg shadow-md"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Personal
                </span>
              </button>

              <button
                onClick={() => {
                  setPricingMode("nonprofit");
                  setSessionContext({ segment: "nonprofit" });
                }}
                className={`relative py-3 rounded-lg text-sm font-semibold transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-brand-oxford focus-visible:ring-offset-2 ${pricingMode === "nonprofit"
                    ? "text-white"
                    : "text-brand-slate hover:text-brand-oxford"
                  }`}
              >
                {pricingMode === "nonprofit" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-brand-oxford rounded-lg shadow-md"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Nonprofit
                </span>
              </button>
            </div>
          </div>
        </div>

        {pricingMode === "nonprofit" && (
          <div className="max-w-2xl mx-auto mb-12 bg-blue-50 border border-blue-200 p-4 rounded-lg text-blue-800 text-sm">
            <strong>How Nonprofit Pricing Works:</strong> Unlike our for-profit plans which bundle
            service and licensing into a per-user fee, we charge a flat monthly service retainer for
            the entire organization, plus the direct cost of user licenses (Microsoft 365, etc).
            This saves growing nonprofits thousands per year.
          </div>
        )}

        <div
          className={`grid gap-8 mx-auto ${currentTiers.length === 1
              ? "max-w-md grid-cols-1"
              : currentTiers.length === 2
                ? "max-w-4xl grid-cols-1 md:grid-cols-2"
                : currentTiers.length === 3
                  ? "max-w-6xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "max-w-7xl grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
            }`}
        >
          {currentTiers.map((tier, index) => {
            const handleTierClick = () => {
              let interest = "Managed IT Services";
              if (
                tier.name.includes("Personal") ||
                tier.name.includes("Family") ||
                tier.name.includes("Solo") ||
                tier.name.includes("Senior")
              ) {
                interest = "Personal/Family IT";
              } else if (tier.name === "Scale") {
                interest = "Fractional Leadership";
              }
              // use query param for interest in Next.js for better DX or context
              router.push(`${routePaths.talkToSales}?interest=${encodeURIComponent(interest)}`);
            };

            const buttonClasses = `w-full py-6 text-lg font-medium shadow-md transition-all ${tier.highlighted
                ? "bg-brand-copper hover:bg-brand-copper-dark text-white hover:shadow-lg"
                : "bg-brand-copper hover:bg-brand-copper-dark text-white"
              }`;

            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl transition-all duration-300 flex flex-col h-full ${tier.highlighted
                    ? "shadow-2xl ring-1 ring-brand-copper z-10"
                    : "shadow-lg hover:shadow-xl border border-gray-100"
                  }`}
              >
                {tier.highlighted && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-copper text-white px-4 py-1 rounded-full text-sm font-bold shadow-sm uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-2xl font-bold text-brand-oxford mb-2">{tier.name}</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold text-brand-oxford">${tier.price}</span>
                    <span className="text-gray-500 ml-2">{tier.unit}</span>
                    <span className="ml-1 relative -top-3">
                      <DefinitionTooltip
                        term="*"
                        definition="Subject to Terms of Service. Taxes may apply."
                        className="text-xs text-gray-400 no-underline border-none"
                      />
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-8 h-10">{tier.description}</p>

                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li
                        key={`${tier.name}-feature-${featureIndex}`}
                        className="flex items-start gap-3 text-sm text-brand-slate"
                      >
                        <Check className="w-5 h-5 text-brand-copper shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mb-6 flex flex-wrap gap-2 mt-auto">
                    {tier.links?.map((link) => (
                      <button
                        key={link.label}
                        onClick={() => router.push(link.to)}
                        className="text-xs flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded text-brand-oxford font-medium transition-colors"
                      >
                        {link.icon} {link.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-8 bg-gray-50 pt-0 mt-auto">
                  <Button onClick={handleTierClick} className={buttonClasses}>
                    {tier.cta}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-20 max-w-4xl mx-auto">
          <div className="bg-brand-oxford rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-copper opacity-10 rounded-full blur-3xl -mr-32 -mt-32"></div>

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-brand-copper p-2 rounded-lg">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">Retainer & Hourly Packs</h3>
                  </div>
                  <p className="text-gray-300 max-w-xl">
                    Need support but not ready for a monthly subscription? Purchase a bucket of
                    hours that never expires. Perfect for one-off projects or seasonal help.
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-4xl font-bold text-white mb-1">
                    $150<span className="text-lg font-normal text-gray-400">/hr</span>
                    <span className="ml-1 relative -top-3">
                      <DefinitionTooltip
                        term="*"
                        definition="Subject to Terms of Service. unused hours never expire."
                        className="text-xs text-gray-400 no-underline border-none"
                      />
                    </span>
                  </div>
                  <div className="text-sm text-brand-copper font-medium">Sold in 10hr packs</div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8 border-t border-gray-700 pt-8">
                <div>
                  <h4 className="font-bold mb-2 text-brand-copper">Flexible Usage</h4>
                  <p className="text-sm text-gray-400">
                    Use for IT support, strategy, or crisis response. Hours are deducted as we work.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-2 text-brand-copper">Never Expires</h4>
                  <p className="text-sm text-gray-400">
                    Your hours stay in your account forever. Use them next week or next year.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-2 text-brand-copper">Priority Queue</h4>
                  <p className="text-sm text-gray-400">
                    Retainer clients get priority scheduling over standard ad-hoc requests.
                  </p>
                </div>
              </div>

              <div className="flex justify-center md:justify-start">
                <Button
                  onClick={() => {
                    setSessionContext({ entrySource: "Pricing Page - Hourly Pack" });
                    router.push(`${routePaths.talkToSales}?interest=Hourly%20Support`);
                  }}
                  className="bg-white text-brand-oxford hover:bg-gray-100 px-8 py-3 font-bold"
                >
                  Purchase Hours
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-brand-oxford mb-6">
            Need a custom enterprise solution?
          </h3>
          <p className="text-brand-slate mb-8 max-w-2xl mx-auto">
            We work with larger organizations to build custom infrastructure and growth plans.
          </p>
          <Button
            variant="outline"
            onClick={() =>
              router.push(
                `${routePaths.talkToSales}?source=Pricing%20Page%20Enterprise%20CTA&interest=Enterprise%20Plan`
              )
            }
            className="border-brand-oxford text-brand-oxford hover:bg-brand-oxford hover:text-white px-8 py-3"
          >
            Contact Sales
          </Button>
        </div>
      </div>
    </div>
  );
}
