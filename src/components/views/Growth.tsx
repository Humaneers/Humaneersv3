import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  ArrowRight,
  Search,
  PenTool,
  Package,
  Rocket,
  CheckCircle2,
  AlertTriangle,
  Globe2,
} from "lucide-react";
import { routePaths } from "../../routes";

export function Growth() {
  const navigate = useNavigate();

  const roadmapSteps = [
    {
      icon: <Search className="w-6 h-6 text-white" />,
      title: "The 'Secret Shopper' Audit",
      desc: "We buy like a US customer and flag every friction point.",
    },
    {
      icon: <PenTool className="w-6 h-6 text-white" />,
      title: "Cultural Realignment",
      desc: "We rewrite copy so it sounds native and on-brand.",
    },
    {
      icon: <Package className="w-6 h-6 text-white" />,
      title: "Visual & Physical Overhaul",
      desc: "Premium visuals, packaging, and photography that sell.",
    },
    {
      icon: <Rocket className="w-6 h-6 text-white" />,
      title: "Launch & Channel Strategy",
      desc: "Channel strategy from Amazon to boutique retail.",
    },
  ];

  const checklistItems = [
    "Date Formats (MM/DD/YYYY)",
    "Imperial Unit Conversions",
    "Paper Sizing (Letter vs A4)",
    "Support Timezone Coverage",
    "Payment Gateway Trust Signals",
    "Shipping Expectation Management",
    "Return Policy Compliance",
    "Privacy Law Adherence (CCPA)",
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-brand-oxford text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Brand Growth</h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
              We don't just secure your network; we help you win the shelf.
            </p>
          </div>
        </div>
      </section>

      {/* The Problem: Uncanny Valley */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 bg-brand-cream px-4 py-2 rounded-full text-brand-copper font-bold text-sm mb-6 uppercase tracking-wider">
                <AlertTriangle size={16} /> The Trust Gap
              </div>
              <h2 className="text-3xl font-bold text-brand-oxford mb-6">
                Avoid the "Uncanny Valley" of Business
              </h2>
              <p className="text-brand-slate text-lg mb-6 leading-relaxed">
                You know the feeling: a website that looks <em>almost</em> right, but something is
                off. The phrasing is slightly unnatural. The phone number format is weird. The
                checkout feels insecure.
              </p>
              <p className="text-brand-slate text-lg mb-8 leading-relaxed">
                <strong>80% of US consumers</strong> will abandon a cart if the brand doesn't feel
                "domestic" or culturally native. We bridge that gap, turning skepticism into trust.
              </p>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1542744094-24638eff58bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHN0cmF0ZWd5JTIwd29ya3Nob3AlMjB3aGl0ZWJvYXJkJTIwbm90ZXN8ZW58MXx8fHwxNzY2NDUwNzAzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Strategy Workshop"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="py-24 bg-brand-cream relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-brand-copper to-transparent opacity-50" />
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-brand-oxford mb-4">
              The "Billboard-Ready" Difference
            </h2>
            <p className="text-brand-slate">
              Entering the US market requires more than just translation. It requires cultural
              alignment, visual polish, and a deep understanding of the American consumer psyche.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Before */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 relative opacity-80 hover:opacity-100 transition-opacity">
              <div className="absolute top-4 left-4 bg-gray-200 text-gray-600 px-3 py-1 text-xs font-bold uppercase rounded">
                Before
              </div>
              <div className="aspect-video bg-gray-100 mb-6 flex items-center justify-center overflow-hidden rounded">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwcGhvdG9ncmFwaHklMjBwbGFpbnxlbnwxfHx8fDE3NjY0NDg3Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Generic Product"
                  className="w-full h-full object-cover grayscale"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-500 mb-2">Standard Import</h3>
              <p className="text-sm text-gray-400">
                Generic packaging, translated manual with errors, standard stock photography, lack
                of brand story.
              </p>
            </div>

            {/* After */}
            <div className="bg-white p-8 rounded-lg shadow-xl border-2 border-brand-copper relative transform md:scale-105 z-10">
              <div className="absolute top-4 left-4 bg-brand-copper text-white px-3 py-1 text-xs font-bold uppercase rounded shadow-sm">
                After Humaneers
              </div>
              <div className="aspect-video bg-gray-100 mb-6 flex items-center justify-center overflow-hidden rounded">
                <img
                  src="https://images.unsplash.com/photo-1582642780691-edbb1f20870b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwcGhvdG9ncmFwaHklMjBtaW5pbWFsJTIwaGlnaCUyMGVuZHxlbnwxfHx8fDE3NjY0NDg3Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Premium Product"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-brand-oxford mb-2">American Market Ready</h3>
              <p className="text-sm text-brand-slate">
                Premium positioning, culturally resonant messaging, "unboxing experience" design,
                and billboard-ready visuals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Roadmap */}
      <section className="py-24 bg-brand-oxford text-white">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <h3 className="text-brand-copper font-bold tracking-widest uppercase mb-3 text-sm">
              Our Process
            </h3>
            <h2 className="text-4xl font-bold text-white">The Americanization Roadmap</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {roadmapSteps.map((step, stepIndex) => (
              <div key={step.title} className="relative">
                {/* Connecting Line (Desktop) */}
                {stepIndex !== roadmapSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-700 -z-0"></div>
                )}

                <div className="relative z-10 bg-brand-copper w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-lg mx-auto md:mx-0">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Checklist & Pillars */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Feature List */}
            <div>
              <h2 className="text-3xl font-bold text-brand-oxford mb-8">Strategic Pillars</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-brand-oxford mb-2 flex items-center gap-2">
                    <Globe2 className="text-brand-copper w-5 h-5" /> Visual Identity
                  </h3>
                  <p className="text-brand-slate">Colors, type, and imagery tuned for US trust.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-oxford mb-2 flex items-center gap-2">
                    <Globe2 className="text-brand-copper w-5 h-5" /> Cultural Translation
                  </h3>
                  <p className="text-brand-slate">Voice and context that land with US audiences.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-oxford mb-2 flex items-center gap-2">
                    <Globe2 className="text-brand-copper w-5 h-5" /> Go-To-Market Strategy
                  </h3>
                  <p className="text-brand-slate">
                    Channel roadmap across digital, retail, and partners.
                  </p>
                </div>
              </div>
            </div>

            {/* Checklist Box */}
            <div className="bg-brand-cream p-8 rounded-xl border border-brand-copper/20">
              <h3 className="text-2xl font-bold text-brand-oxford mb-6">The "Details" Checklist</h3>
              <p className="text-sm text-brand-slate mb-8">
                We obsess over the things that signal "foreign" to a US buyer. We fix the
                disconnects before launch.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {checklistItems.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-copper shrink-0" />
                    <span className="text-brand-oxford font-medium text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-20 text-center">
            <Button
              onClick={() =>
                navigate(routePaths.talkToSales, { state: { interest: "Brand & Growth" } })
              }
              className="bg-brand-oxford hover:bg-brand-oxford-muted text-white px-8 py-4 text-lg h-auto rounded-full"
            >
              Start Your American Journey <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
