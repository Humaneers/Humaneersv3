"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Heart, Shield, Users, CheckCircle2, ArrowRight, FileText } from "lucide-react";
import { routePaths } from "../../routes";

export function NonProfitsClient() {
  const router = useRouter();

  return (
    <div className="bg-brand-cream">
      {/* Hero */}
      <section className="bg-brand-oxford text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm">
            <Heart className="w-4 h-4 text-blue-300" />
            <span className="text-sm font-medium text-blue-100 tracking-wide">
              Exclusive Pricing for 501(c)(3) Orgs
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
            Focus on the Mission.
            <br />
            <span className="text-brand-copper">We'll Handle the Machines.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto mb-10">
            Most nonprofits lose federal grants because they lack cybersecurity policies. We provide
            the enterprise-grade compliance you need to unlock funding—at a fraction of the cost.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => router.push(`${routePaths.pricing}?mode=nonprofit`)}
              className="bg-brand-copper hover:bg-brand-copper-dark text-white text-lg px-8 py-6 h-auto rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              View Nonprofit Plans
            </Button>
          </div>
        </div>
      </section>

      {/* The Difference */}
      <section className="py-24 bg-brand-cream">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2">
              <h2 className="text-brand-copper font-bold tracking-widest uppercase mb-4 text-sm">
                Why It's Different
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-brand-oxford mb-6 leading-tight">
                Stop overpaying for per-user licenses you don't use.
              </h3>
              <p className="text-brand-slate text-lg mb-6 leading-relaxed">
                Most IT firms charge nonprofits the same "per-seat" rate as law firms. That's
                broken. Volunteers and part-time staff shouldn't cost you $150/mo.
              </p>
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-brand-copper">
                <h4 className="font-bold text-brand-oxford mb-2">Our Nonprofit Model</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-copper shrink-0" />
                    <span>
                      <strong>Flat Retainer:</strong> One predictable monthly fee for the org.
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-copper shrink-0" />
                    <span>
                      <strong>At-Cost Licensing:</strong> We pass through Microsoft/Google nonprofit
                      grants directly to you ($0 margin).
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-copper shrink-0" />
                    <span>
                      <strong>Volunteer Accounts:</strong> Heavily discounted secure access for
                      temporary staff.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:w-1/2 grid gap-6">
              {[
                {
                  icon: <Shield className="w-6 h-6 text-brand-copper" />,
                  title: "Donor Data Protection",
                  desc: "Secure your donor lists and financial data to meet compliance standards.",
                },
                {
                  icon: <FileText className="w-6 h-6 text-brand-copper" />,
                  title: "Grant-Ready Policies",
                  desc: "We write the cybersecurity & data privacy sections for your grant applications (NIST/SOC2 aligned).",
                },
                {
                  icon: <Users className="w-6 h-6 text-brand-copper" />,
                  title: "Board Reporting",
                  desc: "Clear, plain-English reports on risk and budget for your quarterly board meetings.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 bg-white p-6 rounded-xl shadow-sm">
                  <div className="shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-brand-oxford text-lg">{item.title}</h4>
                    <p className="text-brand-slate text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-brand-oxford text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to modernize your mission?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            We currently support organizations ranging from local shelters to national foundations.
          </p>
          <Button
            onClick={() =>
              router.push(`${routePaths.talkToSales}?interest=Nonprofit%20Grant%20Readiness`)
            }
            className="bg-brand-copper hover:bg-brand-copper-dark text-white text-xl px-12 py-8 h-auto rounded-full shadow-lg"
          >
            Get Grant-Ready <ArrowRight className="ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
