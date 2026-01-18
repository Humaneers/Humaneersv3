import { useEffect } from "react";
import { View } from "../../App";
import { Button } from "../ui/button";
import { Compass, TrendingUp, Users, FileText, Check, ArrowRight } from "lucide-react";

interface FractionalLeadershipProps {
  onViewChange: (view: View, data?: any) => void;
}

export function FractionalLeadership({ onViewChange }: FractionalLeadershipProps) {
  useEffect(() => {
    document.title = "Humaneers | Fractional Leadership | vCIO Services";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-[#1B263B] text-white py-20">
        <div className="container mx-auto px-6 text-center">
           <div className="inline-flex items-center justify-center p-3 bg-[#B87333]/20 rounded-full mb-6">
              <Compass className="w-6 h-6 text-[#B87333] mr-2" />
              <span className="text-[#B87333] font-bold uppercase tracking-widest text-sm">Strategic Direction</span>
           </div>
           <h1 className="text-4xl md:text-6xl font-bold mb-6">Executive Strategy on a Retainer</h1>
           <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto mb-10">
              You don't need a full-time CIO to have a full-time strategy. Get the roadmap, budget, and leadership you need at a fraction of the cost.
           </p>
           <Button
             onClick={() => onViewChange("talk-to-sales", { interest: "Leadership" })}
             className="bg-[#B87333] hover:bg-[#a0632a] text-white text-lg px-8 py-4 h-auto rounded-full"
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
                 <h2 className="text-3xl font-bold text-[#1B263B] mb-6">More Than Just "Tech Support"</h2>
                 <p className="text-[#4E596F] text-lg mb-8 leading-relaxed">
                    Small businesses often get stuck in a reactive cycle—fixing printers and patching servers. A Fractional CIO (vCIO) lifts your gaze to the horizon. We help you use technology as a competitive advantage, not just a utility.
                 </p>
                 <div className="bg-[#F5F1E9] p-6 rounded-lg border-l-4 border-[#B87333]">
                    <p className="text-[#1B263B] italic font-medium">
                       "Humaneers didn't just fix our wifi; they helped us select the ERP system that doubled our manufacturing throughput."
                    </p>
                    <p className="text-[#B87333] text-sm mt-4 font-bold">— CEO, Arizona Manufacturing Firm</p>
                 </div>
              </div>
              <div className="space-y-8">
                 <div className="flex gap-4">
                    <div className="bg-[#1B263B] p-3 rounded-lg h-fit">
                       <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                       <h3 className="text-xl font-bold text-[#1B263B] mb-2">Quarterly Business Reviews (QBRs)</h3>
                       <p className="text-[#4E596F] text-sm">Quarterly reviews of stack, security, and budget.</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <div className="bg-[#1B263B] p-3 rounded-lg h-fit">
                       <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                       <h3 className="text-xl font-bold text-[#1B263B] mb-2">Budgeting & Procurement</h3>
                       <p className="text-[#4E596F] text-sm">Vendor negotiation and a 3-year IT roadmap.</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <div className="bg-[#1B263B] p-3 rounded-lg h-fit">
                       <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                       <h3 className="text-xl font-bold text-[#1B263B] mb-2">Board-Level Representation</h3>
                       <p className="text-[#4E596F] text-sm">Board-ready risk and strategy translation.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* National Service */}
      <section className="py-24 bg-[#F5F1E9] text-center">
         <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-[#1B263B] mb-8">Virtual Leadership, Real Results</h2>
            <p className="text-[#4E596F] max-w-2xl mx-auto mb-12">
               Our vCIOs support clients from coast to coast using advanced collaboration tools. Whether you're in Seattle or Miami, you get a dedicated executive partner.
            </p>
            <div className="inline-flex flex-col sm:flex-row gap-4">
               <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm text-[#1B263B]">
                  <Check className="text-[#B87333] w-5 h-5" /> Strategic Roadmapping
               </div>
               <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm text-[#1B263B]">
                  <Check className="text-[#B87333] w-5 h-5" /> Vendor Management
               </div>
               <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm text-[#1B263B]">
                  <Check className="text-[#B87333] w-5 h-5" /> Compliance (SOC2/HIPAA)
               </div>
            </div>
         </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
         <div className="container mx-auto px-6 text-center">
            <Button
               onClick={() => onViewChange("talk-to-sales", { interest: "Leadership" })}
               className="bg-[#1B263B] hover:bg-[#2c3b55] text-white text-xl px-10 py-6 h-auto rounded-md"
            >
               Meet Your New CIO <ArrowRight className="ml-2" />
            </Button>
         </div>
      </section>
    </div>
  );
}
