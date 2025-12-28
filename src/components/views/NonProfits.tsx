import { useEffect } from "react";
import { View } from "../../App";
import { Button } from "../ui/button";
import { Heart, Users, Shield, Gift, CheckCircle2 } from "lucide-react";

interface NonProfitsProps {
  onViewChange: (view: View) => void;
}

export function NonProfits({ onViewChange }: NonProfitsProps) {
  useEffect(() => {
    document.title = "Humaneers | Nonprofits | Technology for Good";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-[#1B263B] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-[#B87333]/20 rounded-full mb-6">
              <Heart className="w-6 h-6 text-[#B87333] mr-2" />
              <span className="text-[#B87333] font-bold uppercase tracking-widest text-sm">Technology for Good</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Mission First.<br/>Technology Second.</h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto mb-8">
            We help nonprofits stretch their dollars further with discounted rates, donor data protection, and volunteer management systems.
          </p>
          <Button 
            onClick={() => onViewChange("contact")}
            className="bg-[#B87333] hover:bg-[#a0632a] text-white text-lg px-8 py-4 h-auto rounded-full"
          >
            Get Nonprofit Pricing
          </Button>
        </div>
      </section>

      {/* The Challenge */}
      <section className="py-24 bg-[#F5F1E9]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
             <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-[#1B263B] mb-6">Protecting Donor Trust</h2>
                <p className="text-[#4E596F] text-lg mb-6 leading-relaxed">
                  Nonprofits are a top target for cyberattacks because they hold sensitive donor data but often lack the budget for enterprise security. A breach doesn't just cost money; it costs reputation.
                </p>
                <p className="text-[#4E596F] text-lg mb-6 leading-relaxed">
                  We believe that doing good shouldn't mean being vulnerable. That's why we extend our "Foundation" security stack to 501(c)(3) organizations at a significantly reduced rate.
                </p>
                <div className="flex flex-col gap-4 mt-8">
                   <div className="flex items-center gap-3 text-[#1B263B] font-semibold">
                      <Shield className="text-[#B87333] w-6 h-6" /> 
                      <span>HIPAA & GDPR Compliant Donor Management</span>
                   </div>
                   <div className="flex items-center gap-3 text-[#1B263B] font-semibold">
                      <Users className="text-[#B87333] w-6 h-6" /> 
                      <span>Secure Volunteer Onboarding Workflows</span>
                   </div>
                </div>
             </div>
             <div className="md:w-1/2">
                <div className="grid grid-cols-1 gap-6">
                  <div className="bg-white p-8 rounded-lg shadow-sm border-l-4 border-[#B87333]">
                     <h3 className="text-xl font-bold text-[#1B263B] mb-2">TechSoup Integration</h3>
                     <p className="text-[#4E596F]">We help you navigate TechSoup and Microsoft for Nonprofits to get thousands of dollars in free software licenses (Office 365, Azure, etc.).</p>
                  </div>
                  <div className="bg-white p-8 rounded-lg shadow-sm border-l-4 border-[#B87333]">
                     <h3 className="text-xl font-bold text-[#1B263B] mb-2">The "Mission" Discount</h3>
                     <p className="text-[#4E596F]">Verified 501(c)(3) organizations automatically qualify for 20% off all Humaneers managed services and hourly labor.</p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-white">
         <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-[#1B263B] mb-12">Tailored for Impact</h2>
            <div className="grid md:grid-cols-3 gap-8">
               {[
                  { title: "Grant Reporting Support", desc: "Data systems that make pulling impact reports for grants easy and accurate." },
                  { title: "Remote Board Meetings", desc: "Seamless hybrid meeting setups so your board can govern from anywhere." },
                  { title: "Volunteer BYOD Security", desc: "Let volunteers use their own phones without risking your organization's data." }
               ].map((item, i) => (
                  <div key={i} className="p-6 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                     <CheckCircle2 className="w-10 h-10 text-[#B87333] mx-auto mb-4" />
                     <h3 className="text-lg font-bold text-[#1B263B] mb-2">{item.title}</h3>
                     <p className="text-[#4E596F]">{item.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#1B263B] text-white">
         <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Focus on Your Mission. We'll Handle the Machines.</h2>
            <Button 
               onClick={() => onViewChange("contact")}
               className="bg-[#B87333] hover:bg-[#a0632a] text-white text-xl px-10 py-6 h-auto rounded-full mt-6"
            >
               Apply for Nonprofit Status
            </Button>
         </div>
      </section>
    </div>
  );
}
