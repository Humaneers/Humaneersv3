import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Lock,
  Wifi,
  Eye,
  Smartphone,
  Home,
  AlertTriangle,
  Fingerprint,
} from "lucide-react";
import { routePaths } from "../../routes";
import { Seo } from "../Seo";

export function FamilyProtection() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Enterprise Endpoint Protection",
      desc: "The same CrowdStrike/SentinelOne agents used by Fortune 500s, deployed on your family Macs and PCs.",
    },
    {
      icon: <Wifi className="w-8 h-8" />,
      title: "Secure Home Network",
      desc: "We configure your Wi-Fi with VLANs to separate work devices from smart fridges and gaming consoles.",
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Dark Web Monitoring",
      desc: "We scan the dark web for your family's passwords and social security numbers 24/7.",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Parental Controls",
      desc: "Content filtering that actually works. Block adult content, gambling, and manage screen time.",
    },
    {
      icon: <Fingerprint className="w-8 h-8" />,
      title: "Identity Theft Restoration",
      desc: "$1M in insurance and a dedicated case manager to restore your identity if it's stolen.",
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "Smart Home Security",
      desc: "IoT hardening for cameras, locks, and microphones to prevent digital eavesdropping.",
    },
  ];

  const stats = [
    { label: "Identity Theft Victims", value: "1 in 3" },
    { label: "Home Network Attacks", value: "+400%" },
    { label: "Families Protected", value: "200+" },
  ];

  return (
    <Seo
      title="Humaneers | Family Office Cyber Security | High Net Worth Protection"
      description="Enterprise cybersecurity for your family. Protect your home network, devices, and identity with SOC 2 compliant tools."
      canonicalPath="/family-protection"
    >
      <div className="bg-white">
        {/* Hero */}
        <section className="bg-brand-oxford text-white py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1587573089734-09cb69c0f2b4?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
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
              Hackers know your home Wi-Fi is the backdoor to your business and bank accounts. We close that door.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() =>
                  navigate(routePaths.talkToSales, { state: { interest: "Family Protection" } })
                }
                className="bg-brand-copper hover:bg-brand-copper-dark text-white text-lg px-8 py-6 h-auto rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                Secure My Family
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate(routePaths.pricing)}
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
                  {i === 1 && (
                    <div className="text-xs text-gray-600 mt-2">Since 2020 (FBI Data)</div>
                  )}
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
                <img
                  src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80"
                  alt="Family using devices"
                  className="rounded-2xl shadow-xl rotate-1 hover:rotate-0 transition-transform duration-500"
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
                  jump from your kid's iPad to your home Wi-Fi, then to your laptop, and finally
                  into your corporate bank account.
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
        <section className="py-24 bg-white">
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
                  className="bg-gray-50 p-8 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-brand-copper group"
                >
                  <div className="mb-6 bg-white w-14 h-14 rounded-xl shadow-sm flex items-center justify-center group-hover:bg-brand-copper transition-colors text-brand-copper group-hover:text-white">
                    {f.icon}
                  </div>
                  <h3 className="text-xl font-bold text-brand-oxford mb-3">{f.title}</h3>
                  <p className="text-brand-slate text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-brand-oxford text-white relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605218427368-2dd5995544dc?auto=format&fit=crop&q=80')] opacity-5 bg-cover bg-center"></div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Protect What Matters Most</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Packages range from simple device protection ($50/mo) to full digital concierge services.
            </p>
            <Button
              onClick={() =>
                navigate(routePaths.talkToSales, { state: { interest: "Family Protection" } })
              }
              className="bg-brand-copper hover:bg-brand-copper-dark text-white text-xl px-12 py-8 h-auto rounded-full shadow-lg"
            >
              Get a Security Audit
            </Button>
            <p className="mt-6 text-sm text-gray-500">
              Includes improved privacy settings, password audit, and network scan.
            </p>
          </div>
        </section>
      </div>
    </Seo>
  );
}
