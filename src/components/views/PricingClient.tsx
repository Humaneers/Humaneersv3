"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setSessionContext } from "../../lib/session";
import { datadog } from "../../lib/datadog";
import {
  Check,
  Shield,
  BarChart3,
  Users,
  Lock,
  Clock,
  Heart,
  Award,
  Zap,
  ChevronDown,
  MessageSquare,
} from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { DefinitionTooltip } from "../DefinitionTooltip";
import { routePaths } from "../../routes";
import { useContactModal } from "../providers/ContactModalProvider";

export function PricingClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { openModal } = useContactModal();

  // Get mode from URL params, default to business
  const modeParam =
    (searchParams.get("mode") as "business" | "nonprofit" | "household") || "business";
  const [pricingMode, setPricingMode] = useState<"business" | "nonprofit" | "household">(modeParam);

  /* 
    Updated Pricing Model: Base Price (Infrastructure/Support) + Per User (Seats/Licenses)
  */

  const businessTiers = [
    {
      name: "Foundation",
      basePrice: 99,
      perUserPrice: 15,
      description: "Essential IT & Security for small teams.",
      features: [
        "Includes 2 Free Users",
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
      basePrice: 249,
      perUserPrice: 29,
      description: "For businesses ready to scale their brand and ops.",
      features: [
        "Includes 2 Free Users",
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
      basePrice: 499,
      perUserPrice: 49,
      description: "Full enterprise power with strategic leadership.",
      features: [
        "Includes 2 Free Users",
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
      basePrice: 19,
      perUserPrice: 4,
      description: "DNS, domain & email management. Limited protection.",
      features: [
        "Includes 2 Free Users",
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
      basePrice: 49,
      perUserPrice: 9,
      description: "Essential protection for up to four humans and their devices.",
      features: [
        "Includes 2 Free Users",
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
      basePrice: 49,
      perUserPrice: 9,
      description: "Dignified, patient support with aggressive fraud protection.",
      features: [
        "Includes 2 Free Users",
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
      basePrice: 149,
      perUserPrice: 15,
      description: "Full digital concierge for the modern smart home.",
      features: [
        "Includes 2 Free Users",
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
      basePrice: 299,
      perUserPrice: "Cost",
      description: "Flat-rate service fee plus at-cost licensing.",
      features: [
        "Includes 2 Free Users",
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

  const faqs = [
    {
      question: "Why is there a Base Price + Per User price?",
      answer:
        "The Base Price covers core infrastructure, monitoring systems, and includes your first 2 users. The Per User price applies only to the 3rd user onwards, covering specific licenses and support volume.",
    },
    {
      question: "What counts as a 'User'?",
      answer:
        "A user is a human being with a unique account. We don't charge for service accounts (like 'info@') or inactive shared mailboxes.",
    },
    {
      question: "Can I upgrade or downgrade my plan?",
      answer:
        "Yes, you can change your plan at the beginning of any billing cycle. There are no long-term lock-ins for our standard tiers.",
    },
    {
      question: "Do you offer emergency support?",
      answer:
        "Absolutely. Growth and Scale tiers include priority support, while our Hourly Packs can be used for urgent crisis response if we have capacity.",
    },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-brand-cream min-h-screen py-12 md:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-oxford mb-6">
            Transparent Pricing. No Hidden Fees.
          </h1>
          <p className="text-lg text-brand-slate mb-6">
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
              const tierName = tier.name;
              const source = `Pricing Page - ${tierName} Tier`;
              let message = `I am interested in the ${tierName} plan. `;

              if (tierName === "Foundation" && pricingMode === "business") {
                message += "We need essential IT and security for our small team.";
              } else if (tierName === "Growth") {
                message += "We are ready to scale our brand and operations.";
              } else if (tierName === "Scale") {
                message += "We need full enterprise power and strategic leadership.";
              } else if (tierName === "Solo / Personal") {
                message += "I need help with domain and email management.";
              } else if (tierName === "Personal Foundation") {
                message += "I want to secure my household and devices.";
              } else if (tierName === "Senior Care") {
                message +=
                  "I am looking for dignified support and fraud protection for my family members.";
              } else if (tierName === "Personal Estate") {
                message += "I need a digital concierge for my smart home.";
              } else if (tierName === "Nonprofit Foundation") {
                message +=
                  "We are a nonprofit looking for flat-rate service and donor data protection.";
              }

              datadog.trackAction("select_tier", {
                tier: tierName,
                mode: pricingMode,
                basePrice: tier.basePrice,
                source: "pricing_card_cta",
              });

              openModal("sales", message, source);
            };

            const buttonClasses = `w-full py-6 text-lg font-bold shadow-md transition-all rounded-xl ${tier.highlighted
              ? "bg-brand-copper hover:bg-brand-copper-dark text-white hover:shadow-xl hover:-translate-y-1"
              : "bg-white border-2 border-brand-oxford text-brand-oxford hover:bg-brand-oxford hover:text-white"
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
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-copper text-white px-6 py-1.5 rounded-full text-xs font-black shadow-lg uppercase tracking-widest flex items-center gap-2">
                    <Award size={14} /> Most Popular
                  </div>
                )}
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-2xl font-bold text-brand-oxford mb-2">{tier.name}</h3>
                  <div className="mb-6 space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-brand-oxford">${tier.basePrice}</span>
                      <span className="text-gray-500 text-sm font-medium">base / mo</span>
                    </div>
                    <div className="flex items-baseline gap-2 text-brand-copper">
                      <span className="text-xl font-bold">+ {typeof tier.perUserPrice === 'number' ? `$${tier.perUserPrice}` : tier.perUserPrice}</span>
                      <span className="text-sm font-medium opacity-80">/ additional user / mo</span>
                      <span className="ml-1 relative -top-1">
                        <DefinitionTooltip
                          term="*"
                          definition="Base price covers infrastructure & support and includes your first 2 users. Per-user price applies for 3+ users."
                          className="text-xs text-brand-copper/60 no-underline border-none"
                        />
                      </span>
                    </div>
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

                <div className="p-8 bg-gray-50/50 pt-0 mt-auto rounded-b-2xl">
                  <Button onClick={handleTierClick} className={buttonClasses} withArrow>
                    {tier.name === "Foundation" && pricingMode === "business"
                      ? "Secure My Team"
                      : tier.name === "Scale"
                        ? "Book Strategy Session"
                        : tier.name === "Senior Care"
                          ? "Protect My Parents"
                          : tier.name === "Personal Estate"
                            ? "Get Concierge"
                            : tier.cta}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 text-center text-xs text-brand-slate/60 text-balance max-w-2xl mx-auto">
          <strong>Fair Pricing Philosophy:</strong> We separate infrastructure costs (Base) from seat costs (Per User) so you don't overpay as you scale. "Users" are unique humans with active accounts; we don't charge for service accounts (e.g. info@, admin@).
        </div>

        {/* --- Trust Strip --- */}
        <div className="mt-24 border-y border-gray-200 py-12">
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale transition-all hover:grayscale-0">
            <div className="flex items-center gap-2 text-brand-oxford font-serif text-xl border-r pr-12 border-gray-200">
              <Shield className="text-brand-copper" /> Security First
            </div>
            <div className="flex items-center gap-2 text-brand-oxford font-serif text-xl border-r pr-12 border-gray-200">
              <Zap className="text-brand-copper" /> Rapid Response
            </div>
            <div className="flex items-center gap-2 text-brand-oxford font-serif text-xl">
              <Users className="text-brand-copper" /> Human Experts
            </div>
          </div>
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
                    openModal(
                      "sales",
                      "I'm interested in purchasing a 10-hour pack of support/strategy hours.",
                      "Pricing Page - Hourly Pack"
                    );
                  }}
                  className="bg-white text-brand-oxford hover:bg-gray-100 px-8 py-3 font-bold"
                  withArrow
                >
                  Purchase Hours
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* --- FAQ Section --- */}
        <div className="mt-24 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-oxford mb-4">Pricing FAQ</h2>
            <p className="text-brand-slate">Common questions about our plans and services.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-brand-oxford">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-brand-slate animate-in fade-in slide-in-from-top-2 duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 text-center">
          <h3 className="text-3xl font-bold text-brand-oxford mb-6">
            Need a custom enterprise solution?
          </h3>
          <p className="text-brand-slate mb-12 max-w-2xl mx-auto text-lg">
            We work with larger organizations to build custom infrastructure and growth plans.
          </p>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-4xl mx-auto flex flex-col md:flex-row items-center border border-gray-100">
            <div className="w-full md:w-1/3 relative h-64 md:h-auto self-stretch">
              <Image
                src="/team/lead_strategist.png"
                alt="Lead Strategist"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-10 md:p-12 text-left flex-grow">
              <MessageSquare className="w-10 h-10 text-brand-copper/20 mb-6" />
              <blockquote className="text-xl italic text-brand-oxford mb-8">
                "We don't just manage servers; we protect the people running them. Let's build a
                plan that fits your culture."
              </blockquote>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-brand-oxford">Sarah Chen</p>
                  <p className="text-sm text-gray-500">Lead Technology Strategist</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() =>
                    openModal(
                      "sales",
                      "I'm interested in a custom enterprise solution or a strategic partnership.",
                      "Pricing Page Enterprise CTA"
                    )
                  }
                  className="border-brand-oxford text-brand-oxford hover:bg-brand-oxford hover:text-white px-8 py-6 font-bold"
                  withArrow
                >
                  Contact Strategic Sales
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
