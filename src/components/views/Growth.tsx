import { useEffect } from "react";
import { View } from "../../App";
import { Button } from "../ui/button";
import { ArrowRight, Search, PenTool, Package, Rocket, CheckCircle2, AlertTriangle, Globe2 } from "lucide-react";
import { motion } from "motion/react";

interface GrowthProps {
  onViewChange: (view: View, data?: any) => void;
}

export function Growth({ onViewChange }: GrowthProps) {
  useEffect(() => {
    document.title = "Humaneers | Americanization | Enterprise Strategy, Small Business Soul";
  }, []);

  const roadmapSteps = [
    {
      icon: <Search className="w-6 h-6 text-white" />,
      title: "The 'Secret Shopper' Audit",
      desc: "We buy your product anonymously to experience the customer journey exactly as a US buyer would. We flag every friction point from checkout flow to unboxing."
    },
    {
      icon: <PenTool className="w-6 h-6 text-white" />,
      title: "Cultural Realignment",
      desc: "We scrub 'translated' text. We replace generic manuals with brand-voice guides. We ensure specific idioms and humor land correctly with an American audience."
    },
    {
      icon: <Package className="w-6 h-6 text-white" />,
      title: "Visual & Physical Overhaul",
      desc: "Americans buy with their eyes. We coordinate professional product photography and redesign packaging to meet premium retail standards."
    },
    {
      icon: <Rocket className="w-6 h-6 text-white" />,
      title: "Launch & Channel Strategy",
      desc: "Once the product is ready, we open doors. From Amazon Prime optimization to introductions with boutique retail buyers in the Southwest."
    }
  ];

  const checklistItems = [
    "Date Formats (MM/DD/YYYY)",
    "Imperial Unit Conversions",
    "Paper Sizing (Letter vs A4)",
    "Support Timezone Coverage",
    "Payment Gateway Trust Signals",
    "Shipping Expectation Management",
    "Return Policy Compliance",
    "Privacy Law Adherence (CCPA)"
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-[#1B263B] text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Americanization & Growth</h1>
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
               <div className="inline-flex items-center gap-2 bg-[#F5F1E9] px-4 py-2 rounded-full text-[#B87333] font-bold text-sm mb-6 uppercase tracking-wider">
                  <AlertTriangle size={16} /> The Trust Gap
               </div>
               <h2 className="text-3xl font-bold text-[#1B263B] mb-6">Avoid the "Uncanny Valley" of Business</h2>
               <p className="text-[#4E596F] text-lg mb-6 leading-relaxed">
                 You know the feeling: a website that looks <em>almost</em> right, but something is off. The phrasing is slightly unnatural. The phone number format is weird. The checkout feels insecure.
               </p>
               <p className="text-[#4E596F] text-lg mb-8 leading-relaxed">
                 <strong>80% of US consumers</strong> will abandon a cart if the brand doesn't feel "domestic" or culturally native. We bridge that gap, turning skepticism into trust.
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
      <section className="py-24 bg-[#F5F1E9] relative">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-[#B87333] to-transparent opacity-50" />
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-[#1B263B] mb-4">The "Billboard-Ready" Difference</h2>
            <p className="text-[#4E596F]">
              Entering the US market requires more than just translation. It requires cultural alignment,
              visual polish, and a deep understanding of the American consumer psyche.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Before */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 relative opacity-80 hover:opacity-100 transition-opacity">
              <div className="absolute top-4 left-4 bg-gray-200 text-gray-600 px-3 py-1 text-xs font-bold uppercase rounded">Before</div>
              <div className="aspect-video bg-gray-100 mb-6 flex items-center justify-center overflow-hidden rounded">
                 <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwcGhvdG9ncmFwaHklMjBwbGFpbnxlbnwxfHx8fDE3NjY0NDg3Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="Generic Product" className="w-full h-full object-cover grayscale" />
              </div>
              <h3 className="text-xl font-semibold text-gray-500 mb-2">Standard Import</h3>
              <p className="text-sm text-gray-400">
                Generic packaging, translated manual with errors, standard stock photography, lack of brand story.
              </p>
            </div>

            {/* After */}
            <div className="bg-white p-8 rounded-lg shadow-xl border-2 border-[#B87333] relative transform md:scale-105 z-10">
              <div className="absolute top-4 left-4 bg-[#B87333] text-white px-3 py-1 text-xs font-bold uppercase rounded shadow-sm">After Humaneers</div>
              <div className="aspect-video bg-gray-100 mb-6 flex items-center justify-center overflow-hidden rounded">
                <img src="https://images.unsplash.com/photo-1582642780691-edbb1f20870b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwcGhvdG9ncmFwaHklMjBtaW5pbWFsJTIwaGlnaCUyMGVuZHxlbnwxfHx8fDE3NjY0NDg3Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="Premium Product" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-bold text-[#1B263B] mb-2">American Market Ready</h3>
              <p className="text-sm text-[#4E596F]">
                Premium positioning, culturally resonant messaging, "unboxing experience" design, and billboard-ready visuals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Roadmap */}
      <section className="py-24 bg-[#1B263B] text-white">
        <div className="container mx-auto px-6">
           <div className="mb-16">
             <h3 className="text-[#B87333] font-bold tracking-widest uppercase mb-3 text-sm">Our Process</h3>
             <h2 className="text-4xl font-bold text-white">The Americanization Roadmap</h2>
           </div>

           <div className="grid md:grid-cols-4 gap-8">
             {roadmapSteps.map((step, i) => (
               <div key={i} className="relative">
                 {/* Connecting Line (Desktop) */}
                 {i !== roadmapSteps.length - 1 && (
                   <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-700 -z-0"></div>
                 )}
                 
                 <div className="relative z-10 bg-[#B87333] w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-lg mx-auto md:mx-0">
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
                    <h2 className="text-3xl font-bold text-[#1B263B] mb-8">Strategic Pillars</h2>
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-bold text-[#1B263B] mb-2 flex items-center gap-2">
                                <Globe2 className="text-[#B87333] w-5 h-5"/> Visual Identity
                            </h3>
                            <p className="text-[#4E596F]">
                                We refine your visual language to match the expectations of high-end US consumers. Colors, typography, and imagery that speak trust and quality.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-[#1B263B] mb-2 flex items-center gap-2">
                                <Globe2 className="text-[#B87333] w-5 h-5"/> Cultural Translation
                            </h3>
                            <p className="text-[#4E596F]">
                                It's not just language; it's context. We ensure your brand voice resonates with local values, humor, and communication styles.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-[#1B263B] mb-2 flex items-center gap-2">
                                <Globe2 className="text-[#B87333] w-5 h-5"/> Go-To-Market Strategy
                            </h3>
                            <p className="text-[#4E596F]">
                                From digital channels to retail partnerships, we build the roadmap for your product's journey into American homes and businesses.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Checklist Box */}
                <div className="bg-[#F5F1E9] p-8 rounded-xl border border-[#B87333]/20">
                    <h3 className="text-2xl font-bold text-[#1B263B] mb-6">The "Details" Checklist</h3>
                    <p className="text-sm text-[#4E596F] mb-8">
                        We obsess over the things that signal "foreign" to a US buyer. We fix the disconnects before launch.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {checklistItems.map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-[#B87333] shrink-0" />
                                <span className="text-[#1B263B] font-medium text-sm">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="mt-20 text-center">
                <Button
                    onClick={() => onViewChange("talk-to-sales", { interest: "Brand & Growth" })}
                    className="bg-[#1B263B] hover:bg-[#2c3b55] text-white px-8 py-4 text-lg h-auto rounded-full"
                >
                    Start Your American Journey <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
            </div>
        </div>
      </section>
    </div>
  );
}
