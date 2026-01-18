import { useEffect } from "react";
import { View } from "../../App";
import { Button } from "../ui/button";
import { Lock, Home, ShieldCheck, Smartphone, Eye, Wifi } from "lucide-react";
import { DefinitionTooltip } from "../DefinitionTooltip";

interface FamilyProtectionProps {
  onViewChange: (view: View, data?: any) => void;
}

export function FamilyProtection({ onViewChange }: FamilyProtectionProps) {
  useEffect(() => {
    document.title = "Humaneers | Family Protection | Secure Home Office";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-[#1B263B] text-white py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="inline-block bg-[#B87333] text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                For Executives & Families
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Enterprise Security for <br/>the Living Room.
              </h1>
              <p className="text-xl text-gray-300 font-light leading-relaxed mb-8">
                Your home network is the new corporate perimeter. We secure your personal devices with the same rigor we use for Fortune 500 banks.
              </p>
              <Button
                onClick={() => onViewChange("talk-to-sales", { interest: "Family IT" })}
                className="bg-[#B87333] hover:bg-[#a0632a] text-white text-lg px-8 py-4 h-auto rounded-full"
              >
                Secure My Home
              </Button>
            </div>
            <div className="md:w-1/2 relative">
               <div className="bg-[#F5F1E9] p-2 rounded-2xl rotate-3 transform shadow-2xl">
                 <img 
                   src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80" 
                   alt="Modern Home Office" 
                   className="rounded-xl w-full h-auto"
                 />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
           <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold text-[#1B263B] mb-6">The "Work-from-Home" Vulnerability</h2>
              <p className="text-[#4E596F] text-lg">
                 Hackers know that corporate firewalls are tough, so they target the CEO's home iPad instead. Once they're on your home Wi-Fi, they can jump to your work laptop. We close that gap.
              </p>
           </div>

           <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#F5F1E9] p-8 rounded-xl border-t-4 border-[#B87333]">
                 <Wifi className="w-10 h-10 text-[#1B263B] mb-4" />
                 <h3 className="text-xl font-bold text-[#1B263B] mb-3">Network Segmentation</h3>
                 <p className="text-[#4E596F]">
                    Separate work, family, and IoT so breaches don’t spread.
                 </p>
              </div>
              <div className="bg-[#F5F1E9] p-8 rounded-xl border-t-4 border-[#B87333]">
                 <Eye className="w-10 h-10 text-[#1B263B] mb-4" />
                 <h3 className="text-xl font-bold text-[#1B263B] mb-3">Content Filtering</h3>
                 <p className="text-[#4E596F]">
                    DNS-level filtering across every device, managed for you.
                 </p>
              </div>
              <div className="bg-[#F5F1E9] p-8 rounded-xl border-t-4 border-[#B87333]">
                 <Smartphone className="w-10 h-10 text-[#1B263B] mb-4" />
                 <h3 className="text-xl font-bold text-[#1B263B] mb-3">Managed Family Devices</h3>
                 <p className="text-[#4E596F]">
                    Enterprise MDM with household control and strict privacy.
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* Delivery */}
      <section className="py-24 bg-[#1B263B] text-white">
         <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
               <h2 className="text-3xl font-bold mb-6">We Ship Security Anywhere</h2>
               <p className="text-gray-300 text-lg mb-6">
                  You don't need a technician in your living room to get secure. We configure a "Humaneers Secure Gateway" in our Tempe lab and ship it to your home anywhere in the US.
               </p>
               <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                     <ShieldCheck className="text-[#B87333]" /> Plug-and-Play Setup
                  </li>
                  <li className="flex items-center gap-3">
                     <ShieldCheck className="text-[#B87333]" /> Remote Management by our Team
                  </li>
                  <li className="flex items-center gap-3">
                     <ShieldCheck className="text-[#B87333]" /> Automatic Security Updates
                  </li>
               </ul>
            </div>
            <div className="md:w-1/2 flex justify-center">
               <div className="bg-white/10 p-8 rounded-full border-2 border-[#B87333] backdrop-blur-sm">
                  <Home className="w-32 h-32 text-white" />
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
