"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Shield, Lock, FileText, Activity, Building2, Gavel, CheckCircle2 } from "lucide-react";
import { routePaths } from "../../routes";

export function IndustriesClient() {
  const router = useRouter();

  const industries = [
    {
      icon: <Activity className="w-8 h-8 text-brand-copper" />,
      title: "Healthcare & Dental",
      subtitle: "HIPAA Compliance",
      desc: "Secure patient data (ePHI), manage EMR access, and pass HIPAA audits without stress.",
      features: ["BAA Agreements", "Encrypted Email", "Audit Logs"],
    },
    {
      icon: <Building2 className="w-8 h-8 text-brand-copper" />,
      title: "Financial Services",
      subtitle: "FINRA / SEC / GLBA",
      desc: "Protect client assets and meet strict SEC/FINRA cybersecurity enforcement guidelines.",
      features: ["Data Loss Prevention", "Archiving", "Access Controls"],
    },
    {
      icon: <Gavel className="w-8 h-8 text-brand-copper" />,
      title: "Legal Firms",
      subtitle: "Client Confidentiality",
      desc: "Protect privileged communications and manage case files securely from anywhere.",
      features: ["Matter-Centric Security", "Mobile Device Mgmt", "Ethical Walls"],
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-brand-oxford text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
            Compliance is Not
            <br />
            <span className="text-brand-copper">Optional.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto mb-10">
            For regulated industries, "good enough" IT gets you fined. We build infrastructure that
            survives audits and protects your license to operate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() =>
                router.push(`${routePaths.talkToSales}?interest=Regulated%20Industries`)
              }
              className="bg-brand-copper hover:bg-brand-copper-dark text-white text-lg px-8 py-6 h-auto rounded-full shadow-lg"
            >
              Schedule Compliance Review
            </Button>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-24 bg-brand-cream">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {industries.map((ind, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border-t-4 border-brand-copper"
              >
                <div className="mb-6 bg-brand-cream w-16 h-16 rounded-xl flex items-center justify-center">
                  {ind.icon}
                </div>
                <h3 className="text-2xl font-bold text-brand-oxford mb-1">{ind.title}</h3>
                <div className="text-brand-copper text-xs font-bold uppercase tracking-wider mb-4">
                  {ind.subtitle}
                </div>
                <p className="text-brand-slate mb-6 text-sm leading-relaxed">{ind.desc}</p>
                <ul className="space-y-2">
                  {ind.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-brand-copper" /> {feat}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Humaneers Difference */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-oxford mb-6">
                We Speak "Auditor"
              </h2>
              <p className="text-brand-slate text-lg mb-6 leading-relaxed">
                Most MSPs scramble when the auditor arrives. We welcome them. Our systems are built
                "audit-ready" from day one, with automated evidence collection and policy
                enforcement.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                  <FileText className="w-6 h-6 text-brand-copper shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-brand-oxford">Living Documentation</h4>
                    <p className="text-sm text-brand-slate">
                      Policies that update automatically as regulations change.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                  <Lock className="w-6 h-6 text-brand-copper shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-brand-oxford">Zero-Trust Architecture</h4>
                    <p className="text-sm text-brand-slate">
                      "Never trust, always verify" access controls for every user.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                  <Shield className="w-6 h-6 text-brand-copper shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-brand-oxford">Advanced DLP</h4>
                    <p className="text-sm text-brand-slate">
                      Data Loss Prevention stops sensitive files from leaving your network.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-brand-oxford text-white p-8 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-brand-copper rounded-full opacity-20 blur-2xl"></div>
                <h3 className="text-xl font-bold mb-4">Compliance Scorecard</h3>
                <div className="space-y-4">
                  {[
                    "HIPAA Security Rule",
                    "NIST CSF Alignment",
                    "SOC 2 Type II Controls",
                    "GDPR Readiness",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between border-b border-white/10 pb-2"
                    >
                      <span>{item}</span>
                      <span className="text-green-400 font-mono text-sm">100%</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-white/20 text-center">
                  <p className="text-sm text-gray-400 mb-4">Don't know your score?</p>
                  <Button
                    onClick={() => router.push(routePaths.contact)}
                    variant="outline"
                    className="text-brand-oxford border-white bg-white hover:bg-gray-100 w-full"
                  >
                    Get a Free Risk Assessment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
