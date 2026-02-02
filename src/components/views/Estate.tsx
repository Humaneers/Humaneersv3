import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Shield, Home, Wifi, Server, CheckCircle2, ArrowRight, Key } from "lucide-react";
import { routePaths } from "../../routes";
import { Seo } from "../Seo";

export function Estate() {
  const navigate = useNavigate();

  return (
    <Seo
      title="Humaneers | Private Client & Estate IT | Digital Concierge"
      description="Enterprise-grade technology management for high net worth individuals and smart homes. Wi-Fi, AV, security, and vendor management."
      canonicalPath="/estate"
    >
      <div className="bg-white">
        {/* Hero */}
        <section className="bg-brand-oxford text-white py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558222218-b7b54eede3f3?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
          <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-brand-copper/20 border border-brand-copper/30 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm">
              <Key className="w-4 h-4 text-brand-copper" />
              <span className="text-sm font-medium text-amber-100 tracking-wide">
                Private Client Services
              </span>
            </div>
            <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
              The Smart Home.
              <br />
              <span className="text-brand-copper">Managed.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto mb-10">
              For homes that run like businesses. We provide enterprise-grade Wi-Fi, vendor
              management, and 24/7 support for the modern estate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate(`${routePaths.pricing}?mode=household&tier=estate`)}
                className="bg-brand-copper hover:bg-brand-copper-dark text-white text-lg px-8 py-6 h-auto rounded-full shadow-lg"
              >
                View Concierge Plans
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
                  The Problem
                </h2>
                <h3 className="text-3xl md:text-4xl font-bold text-brand-oxford mb-6 leading-tight">
                  Your home technology is too complex for "The Geek Squad."
                </h3>
                <p className="text-brand-slate text-lg mb-6 leading-relaxed">
                  You have Control4, Savant, multiple Wi-Fi access points, and critical security
                  cameras. When something breaks, the AV guy blames the ISP, and the ISP blames your
                  router. We sit in the middle and own the problem.
                </p>
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-brand-copper">
                  <h4 className="font-bold text-brand-oxford mb-2">The Estate Model</h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-copper shrink-0" />
                      <span>
                        <strong>Vendor Management:</strong> We talk to the AV/Alarm companies for
                        you.
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-copper shrink-0" />
                      <span>
                        <strong>Enterprise Wi-Fi:</strong> Heat-mapped, redundant, and monitored
                        24/7.
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-copper shrink-0" />
                      <span>
                        <strong>Priority Support:</strong> You jump to the front of the queue.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="md:w-1/2 grid gap-6">
                {[
                  {
                    icon: <Wifi className="w-6 h-6 text-brand-copper" />,
                    title: "Network Management",
                    desc: "We manage Unifi, Ruckus, and Cisco Meraki networks to ensure perfect coverage in every room (and the pool house).",
                  },
                  {
                    icon: <Shield className="w-6 h-6 text-brand-copper" />,
                    title: "Privacy & Anonymity",
                    desc: "We scrub your personal info from data broker sites and secure your digital footprint.",
                  },
                  {
                    icon: <Home className="w-6 h-6 text-brand-copper" />,
                    title: "ISP Relations",
                    desc: "We negotiate with Cox/CenturyLink/Starlink on your behalf and monitor uptime.",
                  },
                  {
                    icon: <Server className="w-6 h-6 text-brand-copper" />,
                    title: "Personal Email",
                    desc: "Custom domain (@surname.com) management for the whole family on Microsoft 365 or Google.",
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
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Upgrade your home life.</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Stop being the IT department for your household. Let us handle it.
            </p>
            <Button
              onClick={() =>
                navigate(routePaths.talkToSales, {
                  state: { interest: "Estate / Private Client Services" },
                })
              }
              className="bg-brand-copper hover:bg-brand-copper-dark text-white text-xl px-12 py-8 h-auto rounded-full shadow-lg"
            >
              Get a Private Consultation <ArrowRight className="ml-2" />
            </Button>
          </div>
        </section>
      </div>
    </Seo>
  );
}
