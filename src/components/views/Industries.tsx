import { useEffect } from "react";
import { View } from "../../App";
import { Button } from "../ui/button";
import { Store, Palmtree, Stethoscope, Truck, Building2, ArrowRight, Wifi, ShieldCheck, Tablet, Sprout, Anchor } from "lucide-react";
import { DefinitionTooltip } from "../DefinitionTooltip";

interface IndustriesProps {
  onViewChange: (view: View) => void;
}

export function Industries({ onViewChange }: IndustriesProps) {
  useEffect(() => {
    document.title = "Humaneers | Industries We Serve";
    window.scrollTo(0, 0);
  }, []);

  const industries = [
    {
      id: "retail",
      icon: <Store className="w-12 h-12 text-[#B87333]" />,
      title: "Main Street & Retail",
      subtitle: "Dry Cleaners, Cafes, Boutiques",
      description: <span>When your <DefinitionTooltip term="POS" definition="Point of Sale: The system where a customer makes a payment for goods or services." /> goes down, you lose money instantly. We ensure your checkout systems, guest Wi-Fi, and inventory software stay online so you can keep serving customers.</span>,
      features: [<span><DefinitionTooltip term="PCI" definition="Payment Card Industry Data Security Standard: A set of security standards designed to ensure that all companies that accept, process, store or transmit credit card information maintain a secure environment." /> Compliance (Credit Card Security)</span>, "Guest Wi-Fi Segmentation", "iPad/POS Management"]
    },
    {
      id: "healthcare",
      icon: <Stethoscope className="w-12 h-12 text-[#B87333]" />,
      title: "Clinics & Healthcare",
      subtitle: "Dental, Medical, Therapy",
      description: <span>Patient trust is everything. We provide rigorous <DefinitionTooltip term="HIPAA" definition="Health Insurance Portability and Accountability Act: A federal law that required the creation of national standards to protect sensitive patient health information." />-compliant security configurations that protect sensitive medical records without slowing down your practitioners.</span>,
      features: ["HIPAA Security Risk Assessments", <span><DefinitionTooltip term="EMR/EHR" definition="Electronic Medical/Health Records: Digital versions of paper charts in clinician offices, clinics, and hospitals." /> Optimization</span>, "Secure Messaging Setup"]
    },
    {
      id: "hospitality",
      icon: <Palmtree className="w-12 h-12 text-[#B87333]" />,
      title: "Hospitality & Short-Term Rentals",
      subtitle: "AirBnBs, Boutique Hotels",
      description: "Bad Wi-Fi leads to bad reviews. We design robust mesh networks that cover every corner of your property and secure smart locks/thermostats against hacking.",
      features: ["Remote Smart Home Management", "High-Density Wi-Fi", "Guest Network Portals"]
    },
    {
      id: "field",
      icon: <Truck className="w-12 h-12 text-[#B87333]" />,
      title: "Field Services",
      subtitle: "Landscapers, HVAC, Contractors",
      description: "Your office is a truck. We secure the mobile devices your crew uses in the field and ensure job data syncs back to HQ instantly.",
      features: [<span><DefinitionTooltip term="MDM" definition="Mobile Device Management: Software that allows IT to secure, monitor, and manage mobile devices." /> (Mobile Device Management)</span>, "Rugged Device Procurement", "GPS & Fleet Data Security"]
    },
    {
      id: "enterprise",
      icon: <Building2 className="w-12 h-12 text-[#B87333]" />,
      title: "Small Enterprise",
      subtitle: "Legal, Financial, Consulting",
      description: "For firms with 20-100 employees, we act as your full-service IT department. From SOC2 compliance to automated onboarding for new hires.",
      features: [<span><DefinitionTooltip term="SOC 2" definition="System and Organization Controls 2: An auditing procedure ensuring service providers manage your data securely." /> & <DefinitionTooltip term="FINRA" definition="Financial Industry Regulatory Authority: A government-authorized not-for-profit organization that oversees U.S. broker-dealers." /> Compliance</span>, "Automated Employee Onboarding", "Vendor Risk Management"]
    },
    {
      id: "agriculture",
      icon: <Sprout className="w-12 h-12 text-[#B87333]" />,
      title: "Family Farms & Ag",
      subtitle: "Growers, Distributors, Co-ops",
      description: "Modern farming runs on data, not just diesel. We help multigenerational farms secure their IoT sensors, automate supply chain tracking, and ensure that connectivity reaches the furthest acre of the property.",
      features: ["IoT & Sensor Security", "Long-Range Wi-Fi / LoRaWAN", "Legacy System Integration"]
    },
    {
      id: "legacy",
      icon: <Anchor className="w-12 h-12 text-[#B87333]" />,
      title: "Legacy Business",
      subtitle: "Manufacturers, Logistics, Trades",
      description: "For the business owner who never wanted a website but knows they need one now. We digitize your operations without losing the soul of what made you successful for the last 30 years.",
      features: ["Digitization Strategy", "Simple, Rugged Tooling", "Staff Training & Buy-in"]
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-[#1B263B] text-white py-20 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Built for the Backbone<br/>of the Economy.</h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto mb-8">
            Whether you run a single dry cleaner or a multi-location clinic, we bring enterprise-grade reliability to your specific context.
          </p>
          <Button 
            onClick={() => onViewChange("contact")}
            className="bg-[#B87333] hover:bg-[#a0632a] text-white text-lg px-8 py-4 h-auto rounded-full"
          >
            Find Your Solution
          </Button>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-24 bg-[#F5F1E9]">
        <div className="container mx-auto px-6">
          <div className="space-y-24">
            {industries.map((industry, index) => (
              <div key={industry.id} className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className="md:w-1/2">
                  <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-[#B87333]">
                    <div className="mb-6">{industry.icon}</div>
                    <h2 className="text-3xl font-bold text-[#1B263B] mb-2">{industry.title}</h2>
                    <p className="text-[#B87333] font-medium mb-6 uppercase tracking-wider text-sm">{industry.subtitle}</p>
                    <p className="text-[#4E596F] text-lg mb-8 leading-relaxed">
                      {industry.description}
                    </p>
                    <ul className="space-y-3">
                      {industry.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-[#1B263B] font-medium">
                          <ShieldCheck className="w-5 h-5 text-[#B87333]" /> {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-center">
                   {/* Industry-specific imagery */}
                   <div className="relative w-full aspect-square md:aspect-video bg-gray-200 rounded-xl overflow-hidden shadow-xl">
                      <img 
                         src={
                            industry.id === 'retail' ? "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80" :
                            industry.id === 'healthcare' ? "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80" :
                            industry.id === 'hospitality' ? "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80" :
                            industry.id === 'field' ? "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80" :
                            industry.id === 'enterprise' ? "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" :
                            industry.id === 'agriculture' ? "https://images.unsplash.com/photo-1744230673231-865d54a0aba4?auto=format&fit=crop&q=80" :
                            "https://images.unsplash.com/photo-1589113367450-9a7b2a2177bc?auto=format&fit=crop&q=80"
                         }
                         alt={industry.title}
                         className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-[#1B263B] opacity-20 mix-blend-multiply"></div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white text-center">
         <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-[#1B263B] mb-6">Don't See Your Industry?</h2>
            <p className="text-[#4E596F] max-w-2xl mx-auto mb-10">
               We've worked with everyone from architects to zoos. Technology is universal, even if your business is unique.
            </p>
            <Button 
               onClick={() => onViewChange("contact")}
               className="bg-[#1B263B] hover:bg-[#2c3b55] text-white text-xl px-10 py-6 h-auto rounded-full"
            >
               Talk to an Engineer <ArrowRight className="ml-2" />
            </Button>
         </div>
      </section>
    </div>
  );
}
