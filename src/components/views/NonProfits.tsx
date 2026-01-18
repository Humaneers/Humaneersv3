import { useEffect } from "react";
import { View } from "../../App";
import { Button } from "../ui/button";
import { Heart, Shield, Users, Check, HandHeart, GraduationCap, ArrowRight, FileText, Lock } from "lucide-react";
import { DefinitionTooltip } from "../DefinitionTooltip";

interface NonProfitsProps {
  onViewChange: (view: View, data?: any) => void;
}

export function NonProfits({ onViewChange }: NonProfitsProps) {
  useEffect(() => {
    document.title = "Humaneers | Nonprofits | Empowering Good";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#F5F1E9] min-h-screen font-sans text-[#1B263B]">
      {/* Hero Section - Split Layout */}
      <section className="relative bg-[#1B263B] text-white overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[90vh]">
          {/* Content Side */}
          <div className="flex flex-col justify-center px-8 md:px-16 py-20 relative z-10 order-2 lg:order-1">
            <div className="mb-6 inline-flex items-center gap-2 text-[#B87333] font-bold tracking-widest uppercase text-xs">
              <span className="w-8 h-[1px] bg-[#B87333]"></span>
              Nonprofit Program
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8 font-serif">
              You Serve the World. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] to-[#e5a060]">
                We Serve You.
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed max-w-xl mb-10 font-light">
              Every dollar lost to inefficiency is a dollar taken from your mission. We provide enterprise-grade security and IT infrastructure at a price that respects your stewardship.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => onViewChange("talk-to-sales", { interest: "Managed IT", source: "Nonprofit Program" })}
                className="bg-[#B87333] hover:bg-[#a0632a] text-white text-lg px-8 py-7 h-auto rounded-none border border-[#B87333] hover:border-[#a0632a] transition-all"
              >
                Apply for Program
              </Button>
              <Button 
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                variant="outline"
                className="bg-transparent border-gray-600 text-gray-300 hover:text-white hover:border-white hover:bg-white/5 text-lg px-8 py-7 h-auto rounded-none"
              >
                View Pricing Ledger
              </Button>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative h-[50vh] lg:h-auto order-1 lg:order-2">
            <div className="absolute inset-0 bg-[#1B263B]/20 z-10 mix-blend-multiply"></div>
            <img 
              src="https://images.unsplash.com/photo-1560220604-1985ebfe28b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub25wcm9maXQlMjBjb21tdW5pdHklMjB0ZWFtd29yayUyMHZvbHVudGVlcmluZyUyMHdhcm18ZW58MXx8fHwxNzY2OTg2NDE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
              alt="Volunteers working together" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out"
            />
          </div>
        </div>
      </section>

      {/* The Manifesto / Problem Statement */}
      <section className="py-24 px-6 md:px-12 bg-[#F5F1E9]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-[#1B263B]">The Stewardship Gap</h2>
          
          <div className="grid md:grid-cols-2 gap-12 text-lg leading-relaxed text-[#4E596F]">
            <div>
              <p className="mb-6 drop-cap first-letter:float-left first-letter:text-5xl first-letter:pr-3 first-letter:font-bold first-letter:text-[#B87333]">
                Nonprofits face a unique paradox: they handle sensitive data (donor lists, beneficiary records) comparable to financial institutions, yet they are expected to operate on a shoestring budget.
              </p>
              <p>
                This "Stewardship Gap" makes charities a prime target for cybercriminals. A breach doesn't just cost money—it erodes the hard-earned trust of your donors and community.
              </p>
            </div>
            <div>
              <p className="mb-6">
                We believe that <strong className="text-[#1B263B]">security is a human right</strong>, not a luxury product. That is why we built the Humaneers Nonprofit Program.
              </p>
              <p>
                We don't offer a "lite" version of our services. We offer our full, enterprise-grade stack—subsidized by our corporate profits—to ensure you can focus on saving the world, while we keep it safe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features "Blueprint" Style */}
      <section className="py-24 bg-white border-y border-[#1B263B]/10">
        <div className="container mx-auto px-6">
          <div className="mb-16 md:flex justify-between items-end border-b border-[#1B263B]/10 pb-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-[#1B263B] mb-2">Operational Architecture</h2>
              <p className="text-[#4E596F]">Systems designed for the unique constraints of the 501(c)(3) sector.</p>
            </div>
            <div className="hidden md:block text-[#B87333] font-mono text-sm">
              REF: NPO-2025-A
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group border border-gray-200 p-8 hover:border-[#B87333] transition-colors bg-[#F9FAFB] hover:bg-white">
              <div className="w-12 h-12 bg-[#1B263B] text-white flex items-center justify-center mb-6 rounded-none group-hover:bg-[#B87333] transition-colors">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#1B263B] mb-3">Donor Trust Vault</h3>
              <p className="text-[#4E596F] text-sm leading-relaxed mb-4">
                Bank-level encryption for donor databases. We ensure you meet GDPR, CCPA, and internal governance standards without needing a dedicated CISO.
              </p>
              <ul className="text-xs text-gray-500 space-y-1 font-mono">
                <li className="flex items-center gap-2"><Check size={10} /> SOC 2 Compliant</li>
                <li className="flex items-center gap-2"><Check size={10} /> Encrypted Backups</li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="group border border-gray-200 p-8 hover:border-[#B87333] transition-colors bg-[#F9FAFB] hover:bg-white">
              <div className="w-12 h-12 bg-[#1B263B] text-white flex items-center justify-center mb-6 rounded-none group-hover:bg-[#B87333] transition-colors">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#1B263B] mb-3">Volunteer Access</h3>
              <p className="text-[#4E596F] text-sm leading-relaxed mb-4">
                Securely onboard temporary volunteers in minutes. Give them access only to what they need, and revoke it instantly when they leave.
              </p>
              <ul className="text-xs text-gray-500 space-y-1 font-mono">
                <li className="flex items-center gap-2"><Check size={10} /> Zero-Trust Identity</li>
                <li className="flex items-center gap-2"><Check size={10} /> BYOD Safe</li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="group border border-gray-200 p-8 hover:border-[#B87333] transition-colors bg-[#F9FAFB] hover:bg-white">
              <div className="w-12 h-12 bg-[#1B263B] text-white flex items-center justify-center mb-6 rounded-none group-hover:bg-[#B87333] transition-colors">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#1B263B] mb-3">Grant Intelligence</h3>
              <p className="text-[#4E596F] text-sm leading-relaxed mb-4">
                We configure your systems to generate the data you need for grant reporting. Plus, we manage your TechSoup & Microsoft credits for you.
              </p>
              <ul className="text-xs text-gray-500 space-y-1 font-mono">
                <li className="flex items-center gap-2"><Check size={10} /> Microsoft 365 NPO</li>
                <li className="flex items-center gap-2"><Check size={10} /> Data Export</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The Pricing Ledger */}
      <section id="pricing" className="py-24 bg-[#1B263B] text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">The Open Ledger</h2>
              <p className="text-gray-400">Transparent pricing for 501(c)(3) organizations.</p>
            </div>

            <div className="bg-white text-[#1B263B] rounded-sm overflow-hidden shadow-2xl">
              {/* Ledger Header */}
              <div className="bg-[#e5e7eb] px-8 py-4 border-b border-gray-300 flex justify-between items-center font-mono text-xs uppercase tracking-wider text-gray-500">
                <span>Item Description</span>
                <span>Monthly Cost</span>
              </div>

              {/* Ledger Body */}
              <div className="p-8 space-y-6">
                <div className="flex justify-between items-start border-b border-gray-100 pb-4">
                  <div>
                    <h3 className="font-bold text-lg">Managed IT & Security Suite</h3>
                    <p className="text-sm text-gray-500 mt-1">Full "Growth" plan features (Unlimited support, SOC 2 Security, vCIO)</p>
                  </div>
                  <div className="text-right font-mono text-lg">
                    $375.00
                  </div>
                </div>

                <div className="flex justify-between items-start border-b border-gray-100 pb-4">
                  <div>
                    <h3 className="font-bold text-lg">Compliance Audit</h3>
                    <p className="text-sm text-gray-500 mt-1">Annual security review and donor data check</p>
                  </div>
                  <div className="text-right font-mono text-lg">
                    Included
                  </div>
                </div>

                <div className="flex justify-between items-start text-[#B87333]">
                  <div>
                    <h3 className="font-bold text-lg">Humaneers Mission Grant</h3>
                    <p className="text-sm text-[#B87333]/80 mt-1">Automatic subsidy for verified 501(c)(3)s</p>
                  </div>
                  <div className="text-right font-mono text-lg">
                    - $76.00
                  </div>
                </div>
              </div>

              {/* Ledger Total */}
              <div className="bg-[#1B263B] text-white px-8 py-6 flex justify-between items-center">
                <div>
                  <div className="text-xs uppercase tracking-widest text-gray-400 mb-1">Total Monthly Investment</div>
                  <div className="text-sm text-gray-400 flex items-center gap-1">
                     <FileText size={12} /> No term contracts. Cancel anytime.
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold font-serif">$299.00</div>
                  <div className="text-xs text-gray-400">+ applicable software licenses</div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
               <p className="text-gray-300 mb-6">Ready to secure your mission?</p>
               <Button
                onClick={() => onViewChange("talk-to-sales", { interest: "Managed IT", source: "Nonprofit Program" })}
                className="bg-[#B87333] hover:bg-[#a0632a] text-white text-xl px-12 py-6 h-auto rounded-none shadow-lg hover:shadow-[#B87333]/20 transition-all"
              >
                Start Verification
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Footer */}
      <section className="py-16 bg-[#F5F1E9] text-center border-t border-gray-200">
        <div className="container mx-auto px-6">
          <p className="text-[#1B263B] font-bold mb-8 uppercase tracking-widest text-sm">Proud to support</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale">
             {/* Placeholders for logos - simplified for this view */}
             <div className="text-xl font-serif font-bold">Local Food Banks</div>
             <div className="text-xl font-serif font-bold">Animal Shelters</div>
             <div className="text-xl font-serif font-bold">Arts Foundations</div>
             <div className="text-xl font-serif font-bold">Youth Programs</div>
          </div>
        </div>
      </section>
    </div>
  );
}
