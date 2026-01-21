"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Lock,
  Wifi,
  Eye,
  Smartphone,
  Home,
  AlertTriangle,
  Fingerprint,
  CheckCircle2,
} from "lucide-react";
import { routePaths } from "../../routes";
import Image from "next/image";

export function FamilyProtectionClient() {
  const router = useRouter();

  const features = [
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Enterprise Endpoint Protection",
      desc: "The same CrowdStrike/SentinelOne agents used by global enterprise teams, deployed on your family Macs and PCs.",
      moreInfo: "Zero-day threat prevention.",
    },
    {
      icon: <Wifi className="w-8 h-8" />,
      title: "Secure Home Network",
      desc: "We configure your Wi-Fi with VLANs to separate work devices from smart fridges and gaming consoles.",
      moreInfo: "IoT isolation included.",
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Dark Web Monitoring",
      desc: "We scan the dark web for your family's passwords and social security numbers 24/7.",
      moreInfo: "Real-time breach alerts.",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Parental Controls",
      desc: "Content filtering that actually works. Block adult content, gambling, and manage screen time.",
      moreInfo: "Granular app management.",
    },
    {
      icon: <Fingerprint className="w-8 h-8" />,
      title: "Identity Theft Restoration",
      desc: "$1M in insurance and a dedicated case manager to restore your identity if it's stolen.",
      moreInfo: "White-glove recovery service.",
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "Smart Home Security",
      desc: "IoT hardening for cameras, locks, and microphones to prevent digital eavesdropping.",
      moreInfo: "Firmware hardening.",
    },
  ];

  const stats = [
    { label: "Identity Theft Victims", value: "1 in 3" },
    { label: "Home Network Attacks", value: "+400%" },
    { label: "Families Protected", value: "200+" },
  ];

  return (
    <div className="bg-brand-cream">
      {/* Hero */}
      <section className="bg-brand-oxford text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1587573089734-09cb69c0f2b4?auto=format&fit=crop&q=80"
            alt="Security"
            fill
            className="object-cover opacity-10 mix-blend-overlay"
            priority
          />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium text-red-100 tracking-wide">
              Home networks are the new attack vector.
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Enterprise Security,
            <br />
            <span className="text-brand-copper">Now for Your Living Room.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto mb-10">
            Hackers know your home Wi-Fi is the backdoor to your business and bank accounts. We
            close that door.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => router.push(`${routePaths.pricing}?mode=household`)}
              className="bg-brand-copper hover:bg-brand-copper-dark text-white text-lg px-8 py-6 h-auto rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              Secure My Family
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push(routePaths.pricing)}
              className="border-white/30 text-white bg-transparent hover:bg-white/10 text-lg px-8 py-6 h-auto rounded-full backdrop-blur-sm"
            >
              View Packages
            </Button>
          </div>
        </div>
      </section>

      {/* Stats / Reality Check */}
      <section className="py-20 bg-brand-oxford-deep border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            {stats.map((s, i) => (
              <div key={i} className="p-6">
                <div className="text-4xl md:text-5xl font-bold text-brand-copper mb-2">
                  {s.value}
                </div>
                <div className="text-gray-400 font-medium">{s.label}</div>
                {i === 1 && <div className="text-xs text-gray-600 mt-2">Since 2020 (FBI Data)</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-24 bg-brand-cream">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2">
              <Image
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80"
                alt="Family using devices"
                width={600}
                height={400}
                className="rounded-2xl shadow-xl rotate-1 hover:rotate-0 transition-transform duration-500 w-full aspect-video object-cover"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-brand-copper font-bold tracking-widest uppercase mb-4 text-sm">
                The Risk
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-brand-oxford mb-6 leading-tight">
                Your antivirus isn't enough anymore.
              </h3>
              <p className="text-brand-slate text-lg mb-6 leading-relaxed">
                High-net-worth individuals and business owners are targeted specifically. Hackers
                jump from your kid's iPad to your home Wi-Fi, then to your laptop, and finally into
                your corporate bank account.
              </p>
              <div className="space-y-4">
                {[
                  "ISP routers usually have default passwords.",
                  "Smart cameras often send data to untrusted servers.",
                  "Personal emails lack 2FA enforcement.",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                    <span className="text-brand-oxford font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features / Solution */}
      <section className="py-24 bg-brand-cream">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-oxford mb-6">
              Institutional Security for the Home
            </h2>
            <p className="text-brand-slate text-lg">
              We don't use "consumer" products. We license enterprise-grade tools (CrowdStrike,
              SentinelOne, Cisco) and manage them for you.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-gray-50 p-8 rounded-2xl hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-copper group cursor-default"
              >
                <div className="mb-6 bg-white w-14 h-14 rounded-xl shadow-sm flex items-center justify-center group-hover:bg-brand-copper transition-colors text-brand-copper group-hover:text-white">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-brand-oxford mb-3">{f.title}</h3>
                <p className="text-brand-slate text-sm leading-relaxed">{f.desc}</p>
                <div className="mt-0 max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 group-hover:mt-4 transition-all duration-300 overflow-hidden">
                  <p className="text-sm text-brand-copper font-medium">{f.moreInfo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grandparent Guarantee */}
      <section className="py-24 bg-brand-cream border-t border-brand-copper/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-brand-oxford mb-6">
                The "Grandparent Guarantee"
              </h2>
              <p className="text-brand-slate text-lg mb-6 leading-relaxed">
                The #1 target for wire fraud isn't you—it's your parents. We offer a specific
                protection tier for seniors that locks down their finances and devices without
                making them hard to use.
              </p>
              <ul className="space-y-3">
                {[
                  "Bank-grade anti-phishing filters",
                  "Remote support for 'how do I print this?' calls",
                  "Scam call blocking on mobile devices",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-copper" />
                    <span className="text-brand-slate">{item}</span>
                  </div>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-brand-copper">
                <div className="text-lg font-bold text-brand-oxford mb-2">Peace of Mind Add-On</div>
                <div className="text-4xl font-bold text-brand-copper mb-4">
                  $75<span className="text-lg text-gray-400 font-normal">/mo</span>
                </div>
                <p className="text-gray-500 text-sm mb-6">
                  Add any senior household to your plan. We handle the setup, support, and
                  protection. You get the peace of mind.
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push(routePaths.pricing)}
                >
                  View Senior Plans
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-brand-oxford text-white relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1605218427368-2dd5995544dc?auto=format&fit=crop&q=80"
            alt="Security"
            fill
            className="object-cover opacity-5"
          />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Protect What Matters Most</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Packages range from simple device protection ($50/mo) to full digital concierge
            services.
          </p>
          <Button
            onClick={() => router.push(`${routePaths.talkToSales}?interest=Family%20Protection`)}
            className="bg-brand-copper hover:bg-brand-copper-dark text-white text-xl px-12 py-8 h-auto rounded-full shadow-lg"
          >
            Get a Home Network Health Check
          </Button>
          <p className="mt-6 text-sm text-gray-500">
            Includes privacy review, password strengthening, and grandparent fraud protection check.
          </p>
        </div>
      </section>
    </div>
  );
}
