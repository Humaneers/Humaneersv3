import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  BarChart3,
  Target,
  Megaphone,
  PenTool,
  Search,
  LayoutTemplate,
  CheckCircle2,
  Rocket,
  ArrowRight,
  LineChart,
  Users,
} from "lucide-react";
import { routePaths } from "../../routes";
import { Seo } from "../Seo";

export function Growth() {
  const navigate = useNavigate();

  const services = [
    {
      icon: <Target className="w-8 h-8 text-brand-copper" />,
      title: "Strategic Positioning",
      desc: "We define who you are, who you serve, and why you matter. No fluff, just market fit.",
    },
    {
      icon: <PenTool className="w-8 h-8 text-brand-copper" />,
      title: "Visual Identity & Design",
      desc: "Enterprise-grade branding that makes you look 10x larger than you are.",
    },
    {
      icon: <Search className="w-8 h-8 text-brand-copper" />,
      title: "SEO & Content Strategy",
      desc: "Dominate search results with content that educates rather than just sells.",
    },
    {
      icon: <LayoutTemplate className="w-8 h-8 text-brand-copper" />,
      title: "Website Engineering",
      desc: "High-performance websites built on modern tech stacks (React/Next.js) for speed and conversion.",
    },
    {
      icon: <Megaphone className="w-8 h-8 text-brand-copper" />,
      title: "Go-to-Market Execution",
      desc: "Launch plans, automated email flows, and paid media management.",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-brand-copper" />,
      title: "Revenue Operations",
      desc: "Connecting your CRM, marketing tools, and sales data into a single source of truth.",
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Diagnosis",
      desc: "We audit your current brand, traffic, and conversion funnels to find the leaks.",
    },
    {
      number: "02",
      title: "Foundation",
      desc: "We fix the messaging and build the assets (website, decks, collateral) you need.",
    },
    {
      number: "03",
      title: "Acceleration",
      desc: "We turn on the traffic sources and optimize based on real revenue data.",
    },
  ];

  return (
    <Seo
      title="Humaneers | Brand Growth Strategy | Fractional CMO"
      description="Brand strategy and marketing leadership for fast-growing teams. Visual identity, SEO, web engineering, and go-to-market execution."
      canonicalPath="/growth"
    >
      <div className="bg-white">
        {/* Hero */}
        <section className="bg-brand-oxford text-white py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
          <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-brand-oxford-muted/50 border border-brand-copper/30 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-brand-copper animate-pulse"></span>
              <span className="text-sm font-medium text-brand-cream tracking-wide">
                Strategy & Execution
              </span>
            </div>
            <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
              Make Your Brand
              <br />
              <span className="text-brand-copper">Impossible to Ignore.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto mb-10">
              We bring enterprise-level marketing leadership to small businesses. No agencies. No
              junior account managers. Just senior strategy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate(routePaths.talkToSales, { state: { interest: "Growth" } })}
                className="bg-brand-copper hover:bg-brand-copper-dark text-white text-lg px-8 py-6 h-auto rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                Book a Strategy Call
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate(routePaths.pricing)}
                className="border-white/30 text-white bg-transparent hover:bg-white/10 text-lg px-8 py-6 h-auto rounded-full backdrop-blur-sm"
              >
                View Plans
              </Button>
            </div>
            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-400 font-medium">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-brand-copper" /> Fractional Leadership
              </div>
              <div className="flex items-center gap-2">
                <LineChart className="w-5 h-5 text-brand-copper" /> Data-Driven
              </div>
              <div className="flex items-center gap-2">
                <Rocket className="w-5 h-5 text-brand-copper" /> Full-Funnel
              </div>
            </div>
          </div>
        </section>

        {/* The Problem / Solution */}
        <section className="py-24 bg-brand-cream">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-20">
              <h2 className="text-brand-copper font-bold tracking-widest uppercase mb-4 text-sm">
                The Gap
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-brand-oxford mb-6">
                You're too big for DIY, but too small for a CMO.
              </h3>
              <p className="text-brand-slate text-lg leading-relaxed">
                Hiring a full-time Chief Marketing Officer costs $250k+. Hiring an agency gets you a
                junior team juggling 20 other clients. We provide a third option:
                <strong> Senior Fractional Leadership </strong> integrated directly into your org.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s, i) => (
                <div
                  key={i}
                  className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-brand-copper/10 group"
                >
                  <div className="mb-6 bg-brand-cream w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {s.icon}
                  </div>
                  <h3 className="text-xl font-bold text-brand-oxford mb-3">{s.title}</h3>
                  <p className="text-brand-slate leading-relaxed text-sm">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Americanization / Concept */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute right-0 top-1/4 w-1/2 h-full bg-gray-50 -skew-x-12 opacity-50 z-0 pointer-events-none" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="md:w-1/2">
                <div className="inline-block bg-brand-copper/10 text-brand-copper font-bold px-4 py-2 rounded-full text-sm mb-6">
                  Our Methodology
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-brand-oxford mb-6 leading-tight">
                  The "Americanization" of Enterprise Tech.
                </h2>
                <p className="text-brand-slate text-lg mb-6 leading-relaxed">
                  We borrow the playbook used by Silicon Valley giants—clean design, clear
                  messaging, and product-led growth—and apply it to service businesses.
                </p>
                <div className="space-y-4">
                  {[
                    "Stop talking about features; start selling outcomes.",
                    "Design that builds trust before you say a word.",
                    "Automations that nurture leads while you sleep.",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-brand-copper shrink-0 mt-0.5" />
                      <span className="text-brand-oxford font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80"
                    alt="Strategic Planning"
                    className="w-full h-auto"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-brand-oxford/90 backdrop-blur-sm p-6 text-white border-t border-brand-copper">
                    <div className="text-sm uppercase tracking-widest text-brand-copper font-bold mb-1">
                      Case Study
                    </div>
                    <div className="font-bold text-lg mb-2">Construction Firm Rebrand</div>
                    <div className="text-sm text-gray-300">
                      Increased lead velocity by 340% in 90 days.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-24 bg-brand-oxford text-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">How We Scale You</h2>
            <div className="grid md:grid-cols-3 gap-12 relative">
              <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-brand-copper to-transparent opacity-30"></div>

              {processSteps.map((step, i) => (
                <div key={i} className="relative z-10 text-center group">
                  <div className="w-24 h-24 bg-brand-oxford border-4 border-brand-copper rounded-full flex items-center justify-center mx-auto mb-8 text-3xl font-bold shadow-[0_0_20px_rgba(184,115,51,0.3)] group-hover:bg-brand-copper group-hover:text-white transition-colors duration-300">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed px-4">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-brand-cream relative">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-oxford mb-8">
              Stop guessing. Start growing.
            </h2>
            <p className="text-xl text-brand-slate mb-10">
              Ready to professionalize your brand? Let's audit your current setup and find the
              low-hanging fruit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate(routePaths.talkToSales, { state: { interest: "Growth" } })}
                className="bg-brand-copper hover:bg-brand-copper-dark text-white text-xl px-10 py-8 h-auto rounded-full shadow-xl hover:shadow-2xl transition-all"
              >
                Schedule Introduction
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Seo>
  );
}
