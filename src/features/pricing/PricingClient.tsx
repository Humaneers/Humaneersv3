"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setSessionContext } from "@/lib/session";

import {
  Check,
  Shield,
  BarChart3,
  Users,
  Lock,
  Clock,
  Heart,
  Zap,
  ChevronDown,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { DefinitionTooltip } from "@/components/DefinitionTooltip";
import { routePaths } from "../../routes";
import { useContactModal } from "@/components/providers/ContactModalProvider";
import { PricingComparisonTable } from "./PricingComparisonTable";

export function PricingClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { openModal } = useContactModal();

  // Get mode from URL params, default to business
  const modeParam =
    (searchParams.get("mode") as "business" | "nonprofit" | "household" | "incubation") ||
    "business";
  const [pricingMode, setPricingMode] = useState<
    "business" | "nonprofit" | "household" | "incubation"
  >(modeParam);

  /* 
    Updated Pricing Model: Base Price (Infrastructure/Support) + Per User (Seats/Licenses)
  */

  const businessTiers = [
    {
      name: "Core",
      basePrice: 99,
      perUserPrice: 15,
      description: "Defense-grade security hygiene for lean teams.",
      features: [
        "Includes Two Free Users",
        "Unified Hybrid & Cloud Infrastructure",
        "Unlimited Premier Support",
        "Enterprise Endpoint Security",
        "Fleet Command (MDM)",
        "Microsoft 365 Management",
      ],
      cta: "Secure My Team",
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
      description: "Operational velocity and scalability for expanding brands.",
      features: [
        "Includes Two Free Users",
        "Everything in Core",
        "Strategic Growth Roadmap",
        "Priority On-site Support",
        "Advanced Threat Protection",
        "Vendor Diplomacy",
      ],
      cta: "Choose Growth",
      highlighted: true,
      links: [{ label: "Americanization", icon: <BarChart3 size={12} />, to: routePaths.growth }],
    },
    {
      name: "Enterprise",
      basePrice: 399,
      perUserPrice: 40,
      description: "Strategic leadership and sovereignty for market leaders.",
      features: [
        "Includes Two Free Users",
        "Everything in Growth",
        "Americanization Strategy",
        "Fractional CIO Access",
        "Dedicated Success Manager",
        "Annual Strategy Retreat",
      ],
      cta: "Talk to Strategy",
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
      name: "Solo",
      basePrice: 19,
      perUserPrice: 4,
      description: "Digital identity protection for high-profile individuals.",
      features: [
        "Includes One Free User",
        "Concierge Domain Management",
        "DNS Record Configuration",
        "Email (G-Suite/O365) Admin",
        "Premier Tech Support",
        "Basic Account Monitoring",
      ],
      cta: "Get Admin Help",
      highlighted: false,
      links: [{ label: "Personal Details", icon: <Users size={12} />, to: routePaths.personal }],
    },
    {
      name: "Household",
      basePrice: 49,
      perUserPrice: 9,
      description: "Cyber-physical security for the modern connected family.",
      features: [
        "Includes Four Free Users",
        "Enterprise Endpoint Protection (Mac/PC)",
        "Home Network Management",
        "Fleet Command (MDM)",
        "Content Filtering & Parental Controls",
        "Identity Theft Monitoring",
        "Concierge Helpdesk Access",
      ],
      cta: "Secure My Home",
      highlighted: true,
      links: [
        { label: "Protection Details", icon: <Lock size={12} />, to: routePaths.familyProtection },
      ],
    },
    {
      name: "Legacy Care",
      basePrice: 49,
      description: "Dignity, privacy, and fraud insulation for elders.",
      features: [
        "Home WiFi Management",
        "Enterprise Endpoint Protection",
        "Content Filtering & Parental Controls",
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
      name: "Estate",
      basePrice: 149,
      perUserPrice: 15,
      description: "Concierge technology management for multi-property estates.",
      features: [
        "Includes Two Free Users",
        "Everything in Household",
        "Custom Personal Email (@surname.com)",
        "Enterprise Wi-Fi Management",
        "ISP & Vendor Diplomacy",
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
      basePrice: 199,
      perUserPrice: "Cost",
      description: "Flat-rate service fee plus at-cost licensing.",
      features: [
        "Includes Two Free Users",
        "Flat Organization Service Fee",
        "Per-User Licensing Cost Only",
        "Unlimited Remote Support",
        "Donor Data Protection",
        "Volunteer Management",
      ],
      cta: "Verify 501(c)(3) Status",
      highlighted: true,
      links: [
        { label: "Nonprofit Details", icon: <Shield size={12} />, to: routePaths.nonProfits },
      ],
    },
  ];

  const incubationTiers = [
    {
      name: "Incubator",
      basePrice: 15,
      perUserPrice: "Pass-through",
      description: "Digital Asset Sovereignty for domains and IP.",
      features: [
        "Enterprise Registry Locks",
        "DNSSEC & SPF/DKIM Management",
        "Compliance Watchtower (BOI)",
        "Smart Monetization (Ad Parking)",
        "Brokerage Representation",
        "At-Cost Renewals",
      ],
      cta: "Secure Assets",
      highlighted: true,
      links: [{ label: "Venture Details", icon: <Shield size={12} />, to: routePaths.venture }],
    },
    {
      name: "Hold Co",
      basePrice: 499,
      perUserPrice: "Entity",
      description: "Fractional Ops for multi-entity portfolios.",
      features: [
        "Consolidated Billing",
        "Inter-Company Transfers",
        "Unified IAM / SSO Strategy",
        "Dedicated Account Manager",
        "Quarterly Asset Review",
        "Rapid Entity Genesis",
      ],
      cta: "Contact Strategy",
      highlighted: false,
      links: [
        {
          label: "Fractional Leadership",
          icon: <Users size={12} />,
          to: routePaths.fractionalLeadership,
        },
      ],
    },
  ];

  const currentTiers =
    pricingMode === "household"
      ? householdTiers
      : pricingMode === "nonprofit"
        ? nonprofitTiers
        : pricingMode === "incubation"
          ? incubationTiers
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
          {/* Availability belongs above the prices, not behind the button.
              Matches the notice on /talk-to-sales so the two pages tell one
              story: a visitor should know the state before they start pricing
              a plan, not after they have chosen one. */}
          <span className="inline-block mb-4 rounded-full border border-brand-copper/40 bg-brand-copper/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-brand-copper-text">
            At capacity: joining the waitlist
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-oxford mb-6 tracking-tight">
            Infrastructure as <span className="text-brand-copper">Strategy.</span>
          </h1>
          <p className="text-lg text-brand-slate mb-4 leading-relaxed">
            We don't just "fix computers." We architect sovereignty, resilience, and operational
            velocity for industry leaders and private families.
          </p>
          <p className="text-base text-brand-slate mb-6 leading-relaxed">
            These are our real rates, published so you can plan against them. We are full at the
            moment, so choosing a plan joins the waitlist rather than starting onboarding.
          </p>

          <div className="inline-flex bg-gray-100/50 p-1.5 rounded-xl shadow-inner border border-gray-200/50 mb-10 relative overflow-hidden w-full max-w-xl mx-auto">
            <div className="grid grid-cols-4 w-full gap-2 relative z-10">
              <button
                onClick={() => {
                  setPricingMode("business");
                  setSessionContext({ segment: "business" });
                }}
                className={`relative py-3 rounded-lg text-sm font-semibold transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-brand-oxford focus-visible:ring-offset-2 ${
                  pricingMode === "business"
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
                className={`relative py-3 rounded-lg text-sm font-semibold transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-brand-oxford focus-visible:ring-offset-2 ${
                  pricingMode === "household"
                    ? "text-white"
                    : "text-brand-slate hover:text-brand-copper-text"
                }`}
              >
                {pricingMode === "household" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-brand-copper-text rounded-lg shadow-md"
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
                className={`relative py-3 rounded-lg text-sm font-semibold transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-brand-oxford focus-visible:ring-offset-2 ${
                  pricingMode === "nonprofit"
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

              <button
                onClick={() => {
                  setPricingMode("incubation");
                  setSessionContext({ segment: "venture" });
                }}
                className={`relative py-3 rounded-lg text-sm font-semibold transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-brand-oxford focus-visible:ring-offset-2 ${
                  pricingMode === "incubation"
                    ? "text-white"
                    : "text-brand-slate hover:text-brand-copper-text"
                }`}
              >
                {pricingMode === "incubation" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-brand-copper-text rounded-lg shadow-md"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Incubation
                </span>
              </button>
            </div>

            {/* Mobile-friendly overflow hint if needed, or adjust grid cols */}
            {/* Note: The grid above is grid-cols-3, we need grid-cols-4 now or scrollable */}
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

        {pricingMode === "incubation" && (
          <div className="max-w-2xl mx-auto mb-12 bg-orange-50 border border-brand-copper/30 p-4 rounded-lg text-brand-copper-dark text-sm">
            <strong>Asset Holding Fees:</strong> We structure our fees to scale with your portfolio.
            Stop paying retail for domains you aren't using yet. Monetize your "parking" status to
            offset costs.
          </div>
        )}

        <div
          className={`grid gap-8 mx-auto mb-16 ${
            currentTiers.length === 1
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

              if (tierName === "Core" && pricingMode === "business") {
                message += "We need essential IT and security for our small team.";
              } else if (tierName === "Growth") {
                message += "We are ready to scale our brand and operations.";
              } else if (tierName === "Enterprise") {
                message += "We need full enterprise power and strategic leadership.";
              } else if (tierName === "Solo") {
                message += "I need help with domain and email management.";
              } else if (tierName === "Household") {
                message += "I want to secure my household and devices.";
              } else if (tierName === "Legacy") {
                message +=
                  "I am looking for dignified support and fraud protection for my family members.";
              } else if (tierName === "Estate") {
                message += "I need a digital concierge for my smart home.";
              } else if (tierName === "Nonprofit Foundation") {
                message +=
                  "We are a nonprofit looking for flat-rate service and donor data protection.";
              } else if (tierName === "Incubator") {
                message += "I have a portfolio of domains I need to secure and manage.";
              } else if (tierName === "Hold Co") {
                message +=
                  "I manage multiple operating entities and need centralized infrastructure.";
              }

              openModal("sales", message, source);
            };

            const buttonClasses = `w-full py-6 text-lg font-bold shadow-md transition-all rounded-xl ${
              tier.highlighted
                ? "bg-brand-copper-text hover:bg-brand-copper-text-dark text-white hover:shadow-xl hover:-translate-y-1"
                : "bg-white border-2 border-brand-oxford text-brand-oxford hover:bg-brand-oxford hover:text-white"
            }`;

            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl transition-all duration-300 flex flex-col h-full ${
                  tier.highlighted
                    ? "shadow-2xl ring-1 ring-brand-copper z-10"
                    : "shadow-lg hover:shadow-xl border border-gray-100"
                }`}
              >
                {/* "Most Popular" came off with the capacity wall. It is a
                    claim about client counts nobody publishes, on a page whose
                    every CTA now leads to a waitlist. The copper ring still
                    marks the tier we point most people at, which is a
                    recommendation rather than a statistic. */}
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-2xl font-bold text-brand-oxford mb-2">{tier.name}</h3>
                  <div className="mb-6 space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-brand-oxford">
                        ${tier.basePrice}
                      </span>
                      <span className="text-gray-500 text-sm font-medium">base / mo</span>
                    </div>
                    <div className="flex items-baseline gap-2 text-brand-copper-text">
                      {tier.perUserPrice !== undefined ? (
                        <>
                          <span className="text-xl font-bold">
                            +{" "}
                            {typeof tier.perUserPrice === "number"
                              ? `$${tier.perUserPrice}`
                              : tier.perUserPrice}
                          </span>
                          <span className="text-sm font-medium opacity-80">
                            {pricingMode === "incubation"
                              ? "/ asset costs"
                              : "/ additional user / mo"}
                          </span>
                          <span className="ml-1 relative -top-1">
                            <DefinitionTooltip
                              term="*"
                              definition="Base price covers infrastructure & support and includes your first 2 users. Per-user price applies for 3+ users."
                              className="text-xs text-brand-copper/60 no-underline border-none"
                            />
                          </span>
                        </>
                      ) : (
                        <span className="text-sm font-medium opacity-80 mt-1 text-brand-copper-text">
                          Two users included
                        </span>
                      )}
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
                  {/* One verb, because every tier now leads to the same place.
                      This used to render six different buying phrases across
                      one page ("Secure My Team", "Choose Growth", "Talk to
                      Strategy", "Get Concierge", and so on), all of which
                      opened a waitlist. The tier's own `cta` string is parked
                      in the data above rather than deleted, ready for the day
                      capacity reopens. Nothing is lost by not rendering it:
                      handleTierClick already sends a tier-specific message and
                      source to the CRM, so the intent still reaches Zoho. */}
                  <Button onClick={handleTierClick} className={buttonClasses} withArrow>
                    Join the waitlist
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 text-center text-xs text-brand-slate/60 text-balance max-w-2xl mx-auto mb-16">
          <p>
            <b>Transparent Structure. Predictable Growth. </b>Maintenance and support costs are
            fixed (base), while service delivery costs scale linearly (per-user). A "user" is a
            human with an email account; we never charge for service accounts, shared inboxes, or
            admin aliases.
          </p>

          <p>
            <br></br>
            Device allocations range from 5-12 managed devices per user depending on the tier.
            <br></br>All active support plans include unlimited IoT devices.
          </p>
        </div>
      </div>

      {/* Comparison Table */}
      <PricingComparisonTable mode={pricingMode} />

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

      {/* --- Digital Asset Sovereignty --- */}
      <div className="mt-12 max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-brand-slate to-brand-oxford rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-10"></div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-brand-cream/10 p-2 rounded-lg backdrop-blur-sm border border-white/10">
                    <Zap className="w-6 h-6 text-brand-cream" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Digital Asset Sovereignty</h3>
                </div>
                <p className="text-gray-300 max-w-xl">
                  Your digital portfolio is your modern reputation. We secure it—managing domains,
                  DNS, and email hosting so you're never held hostage by a provider.
                </p>
              </div>
              <div className="text-right shrink-0">
                <div className="text-4xl font-bold text-white mb-1">
                  $15<span className="text-lg font-normal text-gray-400">/mo</span>
                </div>
                <div className="text-sm text-brand-cream font-medium">
                  + pass-through domain fees
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8 border-t border-white/10 pt-8">
              <div>
                <h4 className="font-bold mb-2 text-brand-cream">At-Cost Renewals</h4>
                <p className="text-sm text-gray-400">
                  We pass through the direct cost of domain registration. No markup on the asset
                  itself.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2 text-brand-cream">DNS Management</h4>
                <p className="text-sm text-gray-400">
                  We configure SPF, DKIM, and DMARC records to ensure your emails actually land in
                  inbexes.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2 text-brand-cream">Portfolio Security</h4>
                <p className="text-sm text-gray-400">
                  Enterprise-grade locking and privacy protection to prevent unauthorized transfers.
                </p>
              </div>
            </div>

            <div className="flex justify-center md:justify-start">
              <Button
                onClick={() => {
                  setSessionContext({ entrySource: "Pricing Page - Digital Concierge" });
                  openModal(
                    "sales",
                    "I'm interested in the Digital Concierge service for domain and email management.",
                    "Pricing Page - Digital Concierge"
                  );
                }}
                className="bg-white text-brand-oxford hover:bg-gray-100 px-8 py-3 font-bold"
                withArrow
              >
                Manage My Portfolio
              </Button>
            </div>
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
                  Need support but not ready for a monthly subscription? Purchase a bucket of hours
                  that never expires. Perfect for one-off projects or seasonal help.
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
                <div className="text-sm text-brand-copper-light font-medium">
                  Sold in 10hr packs
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8 border-t border-gray-700 pt-8">
              <div>
                <h4 className="font-bold mb-2 text-brand-copper-light">Flexible Usage</h4>
                <p className="text-sm text-gray-400">
                  Use for IT support, strategy, or crisis response. Hours are deducted as we work.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2 text-brand-copper-light">Never Expires</h4>
                <p className="text-sm text-gray-400">
                  Your hours stay in your account forever. Use them next week or next year.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2 text-brand-copper-light">Priority Queue</h4>
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
                    "I'd like a 10-hour pack of support/strategy hours when capacity opens.",
                    "Pricing Page - Hourly Pack"
                  );
                }}
                className="bg-white text-brand-oxford hover:bg-gray-100 px-8 py-3 font-bold"
                withArrow
              >
                Join the waitlist
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-oxford mb-4">Executive Briefing</h2>
          <p className="text-brand-slate">Anticipating your questions before you ask them.</p>
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
                <div className="px-6 pb-6 text-brand-slate animate-in fade-in slide-in-from-top-2 duration-200 text-sm leading-relaxed">
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

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-3xl mx-auto border border-gray-100">
          <div className="p-10 md:p-12 text-left">
            <MessageSquare className="w-10 h-10 text-brand-copper/20 mb-6" />
            <p className="text-xl text-brand-oxford mb-8">
              We don't just manage servers; we protect the people running them. Enterprise
              engagements start with a conversation about how your organization actually works.
            </p>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-bold text-brand-oxford">Strategic Sales</p>
                <p className="text-sm text-gray-500">Humaneers, LLC</p>
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
  );
}
