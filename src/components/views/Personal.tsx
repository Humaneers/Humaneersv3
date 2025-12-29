import { useEffect } from "react";
import { View } from "../../App";
import { Button } from "../ui/button";
import { Globe, Mail, Server, ArrowRight, ShieldAlert, Wifi, User, AlertCircle, Fingerprint, Smartphone, XCircle, Briefcase, HelpCircle } from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import { DefinitionTooltip } from "../DefinitionTooltip";

interface PersonalProps {
  onViewChange: (view: View, data?: any) => void;
}

export function Personal({ onViewChange }: PersonalProps) {
  useEffect(() => {
    document.title = "Humaneers | Personal & Solo Entrepreneur IT";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-[#1B263B] text-white py-20 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-[#B87333]/20 rounded-full mb-6">
              <User className="w-6 h-6 text-[#B87333] mr-2" />
              <span className="text-[#B87333] font-bold uppercase tracking-widest text-sm">For Solo Entrepreneurs</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Own Your Name.<br/>Secure Your Brand.</h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto mb-8">
            Stop using @gmail.com for your business. We secure your perfect domain, set up professional email, and handle all the tech so you look like a pro from day one.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Button 
               onClick={() => onViewChange("talk-to-sales", { interest: "Personal Plans" })}
               className="bg-[#B87333] hover:bg-[#a0632a] text-white text-lg px-8 py-4 h-auto rounded-full"
             >
               View Plans
             </Button>
          </div>
        </div>
      </section>

      {/* Main Offering */}
      <section className="py-24 bg-[#F5F1E9]">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
             
             {/* The Problem */}
             <div className="mb-20 grid md:grid-cols-2 gap-12 items-center">
                <div>
                   <h2 className="text-3xl font-bold text-[#1B263B] mb-4">Don't Let Squatters Take Your Name</h2>
                   <p className="text-[#4E596F] text-lg mb-6 leading-relaxed">
                      "Domain Camping" is when someone buys your personal name or business idea before you do, just to sell it back to you for thousands. 
                      <DefinitionTooltip term="Domain Camping" definition="The practice of registering a domain name with the intent of reselling it at a premium price." className="ml-1" />
                   </p>
                   <p className="text-[#4E596F] text-lg mb-6 leading-relaxed">
                      We act fast to find and secure the best available domains for your brand. We manage the renewals so you never accidentally lose it.
                   </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                   <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-4">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                         <AlertCircle size={20} />
                      </div>
                      <div>
                         <div className="text-sm font-bold text-gray-500">The "Free" Email Trap</div>
                         <div className="text-lg font-mono text-gray-800 line-through">john.doe.business@gmail.com</div>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                         <CheckCircle2 size={20} />
                      </div>
                      <div>
                         <div className="text-sm font-bold text-[#B87333]">The Professional Standard</div>
                         <div className="text-lg font-mono text-[#1B263B] font-bold">john@johndoe.com</div>
                      </div>
                   </div>
                </div>
             </div>

            {/* Pricing / Plans */}
            <div className="mb-20">
               <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1B263B] mb-4">Personal & Household Plans</h2>
               <p className="text-center text-[#4E596F] max-w-2xl mx-auto mb-12">
                  Comprehensive management for your digital life. Covers up to 6 family members.
               </p>

               <div className="grid md:grid-cols-2 gap-8 items-stretch">
                  {/* Personal Foundation */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex flex-col">
                     <div className="p-8 border-b border-gray-100">
                        <h3 className="text-2xl font-bold text-[#1B263B] mb-2">Personal Foundation</h3>
                        <p className="text-[#4E596F] text-sm mb-6">Essential management and support for your household.</p>
                        <div className="flex items-baseline mb-2">
                           <span className="text-4xl font-bold text-[#1B263B]">$100</span>
                           <span className="text-gray-500 ml-2">/month</span>
                        </div>
                        <p className="text-xs text-gray-400 mb-6">Covers up to 6 humans. Additional users billed at market rates.</p>
                        <Button 
                           onClick={() => onViewChange("talk-to-sales", { interest: "Personal Foundation" })}
                           className="w-full bg-white border-2 border-[#1B263B] text-[#1B263B] hover:bg-gray-50"
                        >
                           Get Started
                        </Button>
                     </div>
                     <div className="p-8 flex-grow bg-gray-50/50">
                        <ul className="space-y-4">
                           <li className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                              <span className="text-sm text-[#4E596F]"><strong>Domain & DNS Management</strong><br/><span className="text-xs text-gray-500">We handle the technical records.</span></span>
                           </li>
                           <li className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                              <span className="text-sm text-[#4E596F]"><strong>Professional Email Admin</strong><br/><span className="text-xs text-gray-500">Google/Microsoft setup & aliases.</span></span>
                           </li>
                           <li className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                              <span className="text-sm text-[#4E596F]"><strong>Tech Support</strong><br/><span className="text-xs text-gray-500">For most consumer devices.</span></span>
                           </li>
                           <li className="flex items-start gap-3 text-gray-400">
                              <XCircle className="w-5 h-5 text-gray-300 shrink-0 mt-0.5" />
                              <span className="text-sm">Active Antivirus & Malware</span>
                           </li>
                           <li className="flex items-start gap-3 text-gray-400">
                              <XCircle className="w-5 h-5 text-gray-300 shrink-0 mt-0.5" />
                              <span className="text-sm">Content Filtering</span>
                           </li>
                           <li className="flex items-start gap-3 text-gray-400">
                              <XCircle className="w-5 h-5 text-gray-300 shrink-0 mt-0.5" />
                              <span className="text-sm">Identity Monitoring</span>
                           </li>
                        </ul>
                     </div>
                  </div>

                  {/* Personal Estate */}
                  <div className="bg-white rounded-2xl shadow-xl border-t-4 border-[#B87333] overflow-hidden flex flex-col relative">
                     <div className="absolute top-0 right-0 bg-[#B87333] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">BEST VALUE</div>
                     <div className="p-8 border-b border-gray-100">
                        <h3 className="text-2xl font-bold text-[#1B263B] mb-2">Personal Estate</h3>
                        <p className="text-[#4E596F] text-sm mb-6">Complete protection and management for peace of mind.</p>
                        <div className="flex items-baseline mb-2">
                           <span className="text-4xl font-bold text-[#1B263B]">$200</span>
                           <span className="text-gray-500 ml-2">/month</span>
                        </div>
                        <p className="text-xs text-gray-400 mb-6">Covers up to 6 humans. Additional users billed at market rates.</p>
                        <Button 
                           onClick={() => onViewChange("talk-to-sales", { interest: "Personal Estate" })}
                           className="w-full bg-[#1B263B] text-white hover:bg-[#2c3b55]"
                        >
                           Get Started
                        </Button>
                     </div>
                     <div className="p-8 flex-grow bg-white">
                        <ul className="space-y-4">
                           <li className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-[#B87333] shrink-0 mt-0.5" />
                              <span className="text-sm text-[#4E596F]"><strong>Everything in Foundation</strong></span>
                           </li>
                           <li className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-[#B87333] shrink-0 mt-0.5" />
                              <span className="text-sm text-[#4E596F]"><strong>Active Antivirus & Malware</strong><br/><span className="text-xs text-gray-500">Enterprise-grade endpoint protection.</span></span>
                           </li>
                           <li className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-[#B87333] shrink-0 mt-0.5" />
                              <span className="text-sm text-[#4E596F]"><strong>Content Filtering</strong><br/><span className="text-xs text-gray-500">Safe browsing for the whole family.</span></span>
                           </li>
                           <li className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-[#B87333] shrink-0 mt-0.5" />
                              <span className="text-sm text-[#4E596F]"><strong>Identity Monitoring</strong><br/><span className="text-xs text-gray-500">Dark web scanning and alerts.</span></span>
                           </li>
                           <li className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-[#B87333] shrink-0 mt-0.5" />
                              <span className="text-sm text-[#4E596F]"><strong>Priority Support</strong><br/><span className="text-xs text-gray-500">Skip the line access to engineers.</span></span>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>

            {/* Ad-hoc / Retainer Info */}
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-200">
               <div className="flex flex-col md:flex-row gap-12">
                  <div className="flex-1">
                     <div className="flex items-center gap-3 mb-6">
                        <div className="bg-[#1B263B] p-2 rounded text-white">
                           <Briefcase size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-[#1B263B]">Ad-hoc & Retainers</h3>
                     </div>
                     <p className="text-[#4E596F] mb-6">
                        Need help with a specific project or just want support without the monthly plan? We offer flexible options.
                     </p>
                     
                     <div className="space-y-6">
                        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                           <div className="flex justify-between items-center mb-2">
                              <h4 className="font-bold text-[#1B263B]">Support Retainers</h4>
                              <span className="text-sm font-semibold bg-green-100 text-green-800 px-2 py-1 rounded">5-Hour Packs</span>
                           </div>
                           <p className="text-sm text-gray-600 mb-3">Pre-purchase hours for on-demand help.</p>
                           <div className="flex items-start gap-2 text-xs text-amber-600 bg-amber-50 p-2 rounded">
                              <AlertCircle size={14} className="shrink-0 mt-0.5" />
                              <span><strong>Note:</strong> Security and management isn't available; only technology support.</span>
                           </div>
                        </div>

                        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                           <div className="flex justify-between items-center mb-2">
                              <h4 className="font-bold text-[#1B263B]">Project / Hourly</h4>
                              <span className="font-bold text-[#1B263B]">$150<span className="text-sm font-normal text-gray-500">/hr</span></span>
                           </div>
                           <p className="text-sm text-gray-600">
                              For consulting outside of an agreement. Plus expenses. Terms apply.
                           </p>
                        </div>
                     </div>
                  </div>

                  <div className="flex-1 border-l border-gray-200 pl-0 md:pl-12 pt-8 md:pt-0">
                     <h4 className="font-bold text-[#1B263B] mb-4 flex items-center gap-2">
                        <Smartphone size={20} /> Device Support
                     </h4>
                     <p className="text-sm text-[#4E596F] mb-6">
                        Technology support includes most consumer devices. Enterprise device support is only available to business clients. We'll be transparent and helpful if you're unsure.
                     </p>

                     <h4 className="font-bold text-[#1B263B] mb-4 flex items-center gap-2">
                        <HelpCircle size={20} /> Our Promise
                     </h4>
                     <p className="text-sm text-[#4E596F] mb-6">
                        If we don't know something, we'll find a partner who does at our expense and with your coordination.
                     </p>
                     
                     <Button 
                        variant="outline"
                        onClick={() => onViewChange("talk-to-sales", { interest: "Ad-hoc Support" })}
                        className="w-full"
                     >
                        Inquire About Support
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
