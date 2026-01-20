"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Shield,
  Server,
  Wifi,
  Headphones,
  MapPin,
  Globe,
  Smartphone,
  Zap,
  Clock,
  LayoutGrid,
} from "lucide-react";
import { DefinitionTooltip } from "../DefinitionTooltip";
import { routePaths } from "../../routes";
import Image from "next/image";

export function ManagedITClient() {
  const router = useRouter();

  const features = [
    {
      icon: <Headphones className="w-6 h-6 text-brand-copper" />,
      title: "100% US-Based Helpdesk",
      desc: "No offshore call centers. Talk to a US-based engineer who knows your business by name.",
      moreInfo: "US-based engineering team.",
    },
    {
      icon: <Server className="w-6 h-6 text-brand-copper" />,
      title: "Hybrid & Cloud Infrastructure",
      desc: "We secure on-prem servers or migrate you to the cloud (AWS/Azure) depending on your needs.",
      moreInfo: "AWS/Azure certified architects.",
    },
    {
      icon: <Smartphone className="w-6 h-6 text-brand-copper" />,
      title: "Mobile Device Management (MDM)",
      desc: "Secure company data on personal phones without spying on your employees.",
      moreInfo: "Automated patch management.",
    },
    {
      icon: <Shield className="w-6 h-6 text-brand-copper" />,
      title: "SOC 2 Type II Security",
      desc: "Enterprise-grade endpoint protection, DNS filtering, and 24/7 SOC monitoring included.",
      moreInfo: "Behavioral AI analysis.",
    },
    {
      icon: <Wifi className="w-6 h-6 text-brand-copper" />,
      title: "Remote & On-Site Support",
      desc: "99% of issues fixed remotely. For the other 1%, we dispatch engineers to any US zip code.",
      moreInfo: "Next-business-day dispatch.",
    },
    {
      icon: <Zap className="w-6 h-6 text-brand-copper" />,
      title: "Zero-Touch Onboarding",
      desc: "We ship laptops pre-configured. New hires open the box and start working immediately.",
      moreInfo: "Okta/Azure AD integration.",
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Assessment & Roadmap",
      desc: "We scan your network, identify gaps, and build a 12-month stabilization plan.",
    },
    {
      number: "02",
      title: "Stabilization Sprint",
      desc: "We fix critical vulnerabilities, deploy security agents, and clean up messy cabling.",
    },
    {
      number: "03",
      title: "Management & Growth",
      desc: "We monitor 24/7, handle all helpdesk tickets, and meet quarterly for strategy.",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-brand-oxford text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1558494949-ef526b01201b?auto=format&fit=crop&q=80"
            alt="Infrastructure"
            fill
            className="object-cover opacity-10 mix-blend-overlay"
            priority
          />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-oxford-muted/50 border border-brand-copper/30 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-medium text-brand-cream tracking-wide">
              Accepting New Clients for Q1
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
            Managed IT that Sleeps
            <br />
            <span className="text-brand-copper">So You Don't Have To.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto mb-10">
            Enterprise-grade infrastructure, US-based support, and SOC 2 security—scaled for small
            business budgets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => router.push(`${routePaths.talkToSales}?interest=Managed%20IT`)}
              className="bg-brand-copper hover:bg-brand-copper-dark text-white text-lg px-8 py-6 h-auto rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              Get a Network Assessment
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push(routePaths.pricing)}
              className="border-white/30 text-white bg-transparent hover:bg-white/10 text-lg px-8 py-6 h-auto rounded-full backdrop-blur-sm"
            >
              View Pricing
            </Button>
          </div>
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-brand-copper" /> SOC 2 Compliant
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-brand-copper" /> 100% US-Based
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-brand-copper" /> 15-min Response
            </div>
          </div>
        </div>
      </section>

      {/* The Problem / Solution */}
      <section className="py-24 bg-brand-cream">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            <div className="md:w-1/2 md:sticky md:top-24">
              <h2 className="text-brand-copper font-bold tracking-widest uppercase mb-4 text-sm">
                The Problem
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-brand-oxford mb-6 leading-tight">
                Stop settling for "Break/Fix" support.
              </h3>
              <p className="text-brand-slate text-lg mb-6 leading-relaxed">
                Most{" "}
                <DefinitionTooltip
                  term="MSPs"
                  definition="Managed Service Providers: Third-party companies that remotely manage customer's IT infrastructure."
                />{" "}
                operate on a broken model: they profit when you have problems. They stick a band-aid
                on issues and bill you for the service call.
              </p>
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500 mb-8">
                <h4 className="font-bold text-red-700 mb-2">The Old Way (Break/Fix)</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="text-red-400">×</span> Unpredictable hourly bills
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-400">×</span> Slow response times
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-400">×</span> "Band-aid" solutions
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-brand-copper font-bold tracking-widest uppercase mb-4 text-sm">
                The Humaneers Way
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-brand-oxford mb-6 leading-tight">
                Incentives aligned with your uptime.
              </h3>
              <p className="text-brand-slate text-lg mb-8 leading-relaxed">
                We operate on a subscription model. We only profit when your systems are running
                perfectly, so we work overtime to prevent issues before they happen.
              </p>
              <div className="grid gap-6">
                {features.map((f, i) => (
                  <div
                    key={i}
                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-brand-copper/10 flex gap-4 group cursor-default"
                  >
                    <div className="shrink-0 mt-1">{f.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-brand-oxford text-lg mb-2">{f.title}</h4>
                      <p className="text-brand-slate text-sm leading-relaxed">{f.desc}</p>
                      <div className="mt-0 max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 group-hover:mt-2 transition-all duration-300 overflow-hidden">
                        <p className="text-sm text-brand-copper font-medium">{f.moreInfo}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* National Reach */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-oxford mb-6">
              Nationwide Reach, Local Feel
            </h2>
            <p className="text-brand-slate text-lg">
              Our Tempe, AZ headquarters is just the hub. We use advanced remote management tools to
              support clients in all 50 states.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-50 p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-brand-cream rounded-full flex items-center justify-center mx-auto mb-6 text-brand-copper">
                <Globe size={32} />
              </div>
              <h3 className="font-bold text-xl text-brand-oxford mb-3">Remote First</h3>
              <p className="text-brand-slate text-sm">
                99% of tickets are resolved remotely via our secure agents. No waiting for a truck
                roll.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-brand-cream rounded-full flex items-center justify-center mx-auto mb-6 text-brand-copper">
                <LayoutGrid size={32} />
              </div>
              <h3 className="font-bold text-xl text-brand-oxford mb-3">Logistics Handled</h3>
              <p className="text-brand-slate text-sm">
                We ship pre-configured hardware directly to your employees' homes, anywhere in the
                US.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-brand-cream rounded-full flex items-center justify-center mx-auto mb-6 text-brand-copper">
                <MapPin size={32} />
              </div>
              <h3 className="font-bold text-xl text-brand-oxford mb-3">On-Site Dispatch</h3>
              <p className="text-brand-slate text-sm">
                For hardware failures, we dispatch boots-on-the-ground technicians to any zip code
                within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-brand-oxford text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            Your Journey to IT Stability
          </h2>
          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-brand-copper to-transparent opacity-30"></div>

            {processSteps.map((step, i) => (
              <div key={i} className="relative z-10 text-center">
                <div className="w-24 h-24 bg-brand-oxford border-4 border-brand-copper rounded-full flex items-center justify-center mx-auto mb-8 text-3xl font-bold shadow-[0_0_20px_rgba(184,115,51,0.3)]">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-brand-cream relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-oxford mb-8">
            Ready to upgrade your infrastructure?
          </h2>
          <p className="text-xl text-brand-slate mb-10 max-w-2xl mx-auto">
            Plans start at just <span className="font-bold text-brand-copper">$90/user/mo</span>.
            Get a free roadmap before you commit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => router.push(`${routePaths.pricing}?mode=business`)}
              className="bg-brand-copper hover:bg-brand-copper-dark text-white text-lg px-8 py-6 h-auto rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              View Pricing
            </Button>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            No credit card required. No high-pressure sales.
          </p>
        </div>
      </section>
    </div>
  );
}
