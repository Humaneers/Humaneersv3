import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Heart, ShieldCheck, Phone, LayoutGrid, Eye, UserPlus, FileHeart } from "lucide-react";
import { routePaths } from "../../routes";
import { Seo } from "../Seo";

export function SeniorCare() {
  const navigate = useNavigate();

  return (
    <Seo
      title="Humaneers | Senior Citizen Care Plans | Dignified Tech Support"
      description="Respectful, patient technology support for seniors. Fraud protection, simplified iPad/computer setup, and 24/7 help for your loved ones."
      canonicalPath="/senior-care"
    >
      <div className="bg-white">
        {/* Hero */}
        <section className="bg-brand-oxford text-white py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
              Technology with
              <br />
              <span className="text-brand-copper">Dignity.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto mb-10">
              For seniors, technology is a lifeline to family—not just a tool. We protect them from
              scams, simplify their devices, and provide patient, respectful support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate(`${routePaths.pricing}?mode=household&highlight=senior`)}
                className="bg-brand-copper hover:bg-brand-copper-dark text-white text-lg px-8 py-6 h-auto rounded-full shadow-lg"
              >
                View Pricing
              </Button>
            </div>
          </div>
        </section>

        {/* The Problem/Solution */}
        <section className="py-24 bg-brand-cream">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-oxford mb-6">
                  The "Grandchild Gap"
                </h2>
                <p className="text-brand-slate text-lg mb-6 leading-relaxed">
                  You want your parents to be connected, but you don't have time to be tech support.
                  Worse, the digital world is full of predators targeting seniors.
                </p>
                <div className="bg-red-50 p-6 rounded-xl border border-red-100 mb-6">
                  <h3 className="text-red-800 font-bold mb-2 flex items-center gap-2">
                    <Eye className="w-5 h-5" /> The Threat is Real
                  </h3>
                  <p className="text-red-700 text-sm">
                    Seniors lose over $3 billion annually to elder financial fraud. 90% of these
                    scams start online or over the phone.
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-md flex items-start gap-4">
                  <div className="bg-brand-oxford p-3 rounded-full text-white shrink-0">
                    <LayoutGrid />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-oxford text-lg">Simplification First</h3>
                    <p className="text-brand-slate text-sm">
                      We declutter iPads and computers. We remove confusing apps, enlarge fonts, and
                      set up "One-Click" video calls to family.
                    </p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md flex items-start gap-4">
                  <div className="bg-brand-oxford p-3 rounded-full text-white shrink-0">
                    <ShieldCheck />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-oxford text-lg">Fraud Air-Gap</h3>
                    <p className="text-brand-slate text-sm">
                      We install aggressive ad-blocking and DNS filtering that stops "tech support
                      scams" before they even load.
                    </p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md flex items-start gap-4">
                  <div className="bg-brand-oxford p-3 rounded-full text-white shrink-0">
                    <Heart />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-oxford text-lg">On-Call Patience</h3>
                    <p className="text-brand-slate text-sm">
                      Your parents can call us. We never talk down to them. We listen, explain
                      slowly, and fix the issue with kindness.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features / Pricing Hook */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-brand-oxford mb-12">
              Peace of Mind for the Whole Family
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="p-8 border rounded-2xl hover:shadow-xl transition-all hover:-translate-y-1 group bg-white cursor-default">
                <UserPlus className="w-10 h-10 text-brand-copper mb-4" />
                <h3 className="font-bold text-xl mb-2">Proxy Access</h3>
                <p className="text-gray-600">
                  We give you (the adult child) "God Mode" access to oversee their device security
                  status remotely.
                </p>
                <div className="mt-0 max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 group-hover:mt-4 transition-all duration-300 overflow-hidden">
                  <p className="text-sm text-brand-copper font-medium">
                    Includes real-time dashboard.
                  </p>
                </div>
              </div>
              <div className="p-8 border rounded-2xl hover:shadow-xl transition-all hover:-translate-y-1 group bg-white cursor-default">
                <Phone className="w-10 h-10 text-brand-copper mb-4" />
                <h3 className="font-bold text-xl mb-2">The "Red Button"</h3>
                <p className="text-gray-600">
                  They can press one button to get help. No navigating complex support numbers or
                  automated menus.
                </p>
                <div className="mt-0 max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 group-hover:mt-4 transition-all duration-300 overflow-hidden">
                  <p className="text-sm text-brand-copper font-medium">
                    Direct line to US-based humans.
                  </p>
                </div>
              </div>
              <div className="p-8 border rounded-2xl hover:shadow-xl transition-all hover:-translate-y-1 group bg-white cursor-default">
                <FileHeart className="w-10 h-10 text-brand-copper mb-4" />
                <h3 className="font-bold text-xl mb-2">Digital Estate Planning</h3>
                <p className="text-gray-600">
                  We help organize passwords and accounts so that their digital legacy is secure and
                  accessible to executors.
                </p>
                <div className="mt-0 max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 group-hover:mt-4 transition-all duration-300 overflow-hidden">
                  <p className="text-sm text-brand-copper font-medium">
                    Bank-grade security vault.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-16">
              <Button
                onClick={() => navigate(`${routePaths.pricing}?mode=household&highlight=senior`)}
                className="bg-brand-oxford hover:bg-brand-oxford-muted text-white text-xl px-12 py-6 h-auto rounded-full"
              >
                View Plans
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Seo>
  );
}
