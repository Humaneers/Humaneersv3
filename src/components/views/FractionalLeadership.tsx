import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Compass, TrendingUp, Users, FileText, Check, ArrowRight } from "lucide-react";
import { routePaths } from "../../routes";

export function FractionalLeadership() {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-brand-oxford text-white py-20">
        <div className="container mx-auto px-6 text-center">
           <div className="inline-flex items-center justify-center p-3 bg-brand-copper/20 rounded-full mb-6">
              <Compass className="w-6 h-6 text-brand-copper mr-2" />
              <span className="text-brand-copper font-bold uppercase tracking-widest text-sm">Strategic Direction</span>
           </div>
           <h1 className="text-4xl md:text-6xl font-bold mb-6">Executive Strategy on a Retainer</h1>
           <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto mb-10">
              You don't need a full-time CIO to have a full-time strategy. Get the roadmap, budget, and leadership you need at a fraction of the cost.
           </p>
           <Button
             onClick={() => navigate(routePaths.talkToSales, { state: { interest: "Leadership" } })}
             className="bg-brand-copper hover:bg-brand-copper-dark text-white text-lg px-8 py-4 h-auto rounded-full"
           >
             Schedule a Discovery Call
           </Button>
        </div>
      </section>

      {/* The Pillars of vCIO */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
           <div className="grid md:grid-cols-2 gap-16 items-start">
              <div>
                 <h2 className="text-3xl font-bold text-brand-oxford mb-6">More Than Just "Tech Support"</h2>
                 <p className="text-brand-slate text-lg mb-8 leading-relaxed">
                    Small businesses often get stuck in a reactive cycle—fixing printers and patching servers. A Fractional CIO (vCIO) lifts your gaze to the horizon. We help you use technology as a competitive advantage, not just a utility.
                 </p>
                 <div className="bg-brand-cream p-6 rounded-lg border-l-4 border-brand-copper">
                    <p className="text-brand-oxford italic font-medium">
                       "Humaneers didn't just fix our wifi; they helped us select the ERP system that doubled our manufacturing throughput."
                    </p>
                    <p className="text-brand-copper text-sm mt-4 font-bold">— CEO, Arizona Manufacturing Firm</p>
                 </div>
              </div>
              <div className="space-y-8">
                 <div className="flex gap-4">
                    <div className="bg-brand-oxford p-3 rounded-lg h-fit">
                       <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                       <h3 className="text-xl font-bold text-brand-oxford mb-2">Quarterly Business Reviews (QBRs)</h3>
                       <p className="text-brand-slate text-sm">Quarterly reviews of stack, security, and budget.</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <div className="bg-brand-oxford p-3 rounded-lg h-fit">
                       <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                       <h3 className="text-xl font-bold text-brand-oxford mb-2">Budgeting & Procurement</h3>
                       <p className="text-brand-slate text-sm">Vendor negotiation and a 3-year IT roadmap.</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <div className="bg-brand-oxford p-3 rounded-lg h-fit">
                       <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                       <h3 className="text-xl font-bold text-brand-oxford mb-2">Board-Level Representation</h3>
                       <p className="text-brand-slate text-sm">Board-ready risk and strategy translation.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* National Service */}
      <section className="py-24 bg-brand-cream text-center">
         <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-brand-oxford mb-8">Virtual Leadership, Real Results</h2>
            <p className="text-brand-slate max-w-2xl mx-auto mb-12">
               Our vCIOs support clients from coast to coast using advanced collaboration tools. Whether you're in Seattle or Miami, you get a dedicated executive partner.
            </p>
            <div className="inline-flex flex-col sm:flex-row gap-4">
               <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm text-brand-oxford">
                  <Check className="text-brand-copper w-5 h-5" /> Strategic Roadmapping
               </div>
               <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm text-brand-oxford">
                  <Check className="text-brand-copper w-5 h-5" /> Vendor Management
               </div>
               <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm text-brand-oxford">
                  <Check className="text-brand-copper w-5 h-5" /> Compliance (SOC2/HIPAA)
               </div>
            </div>
         </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
         <div className="container mx-auto px-6 text-center">
            <Button
               onClick={() => navigate(routePaths.talkToSales, { state: { interest: "Leadership" } })}
               className="bg-brand-oxford hover:bg-brand-oxford-muted text-white text-xl px-10 py-6 h-auto rounded-md"
            >
               Meet Your New CIO <ArrowRight className="ml-2" />
            </Button>
         </div>
      </section>
    </div>
  );
}
