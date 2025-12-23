import { useState, useEffect } from "react";
import { Check, X, HelpCircle, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { View } from "../../App";
import { motion } from "motion/react";

interface PricingProps {
  onViewChange: (view: View) => void;
}

export function Pricing({ onViewChange }: PricingProps) {
  useEffect(() => {
    document.title = "Humaneers | Pricing | Enterprise Strategy, Small Business Soul";
  }, []);

  const [isNonprofit, setIsNonprofit] = useState(false);

  const tiers = [
    {
      name: "Foundation",
      price: 90,
      description: "Essential IT & Security for small teams.",
      features: [
        "Cloud-native infrastructure",
        "Unlimited remote support",
        "Basic Security Suite (Antivirus/Malware)",
        "Includes Personal Device Protection",
        "Microsoft 365 Management",
      ],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Growth",
      price: 119,
      description: "For businesses ready to scale their brand and ops.",
      features: [
        "Everything in Foundation",
        "Quarterly Marketing Health Checks",
        "Priority On-site Support",
        "Advanced Threat Protection",
        "Vendor Management",
      ],
      cta: "Choose Growth",
      highlighted: true,
    },
    {
      name: "Scale",
      price: 149,
      description: "Full enterprise power with strategic leadership.",
      features: [
        "Everything in Growth",
        "Americanization Consulting",
        "Fractional CIO Access",
        "Dedicated Success Manager",
        "Annual Strategy Retreat",
      ],
      cta: "Go Enterprise",
      highlighted: false,
    },
  ];

  return (
    <div className="bg-[#F5F1E9] min-h-screen py-24">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1B263B] mb-6">
            Transparent Pricing. No Hidden Fees.
          </h1>
          <p className="text-lg text-[#4E596F] mb-10">
            Choose the plan that fits your stage of business. Change anytime as you grow.
          </p>

          <div className="flex items-center justify-center gap-4 bg-white/50 backdrop-blur-sm p-4 rounded-full inline-flex mx-auto mb-8 shadow-sm">
            <span
              className={`text-sm font-semibold transition-colors ${
                !isNonprofit ? "text-[#1B263B]" : "text-gray-400"
              }`}
            >
              Standard Business
            </span>
            <Switch
              checked={isNonprofit}
              onCheckedChange={setIsNonprofit}
              className="data-[state=checked]:bg-[#B87333]"
            />
            <span
              className={`text-sm font-semibold transition-colors flex items-center gap-2 ${
                isNonprofit ? "text-[#B87333]" : "text-gray-400"
              }`}
            >
              Nonprofit Pricing
              {isNonprofit && (
                <span className="flex h-2 w-2 rounded-full bg-[#B87333] animate-pulse shadow-[0_0_8px_rgba(184,115,51,0.8)]"></span>
              )}
            </span>
          </div>
          
          {isNonprofit && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-[#1B263B] text-white p-6 rounded-lg shadow-lg mb-10 max-w-2xl mx-auto border border-[#B87333]"
            >
              <h3 className="text-xl font-bold mb-2 flex items-center justify-center gap-2">
                <span className="text-[#B87333]">♥</span> Mission-Aligned Rates
              </h3>
              <p className="mb-4 text-gray-300">
                We offer special discounted pricing for 501(c)(3) organizations making an impact in our community.
              </p>
              <Button className="bg-[#B87333] hover:bg-[#a0632a] text-white w-full sm:w-auto">
                Contact for Nonprofit Rates
              </Button>
            </motion.div>
          )}
        </div>

        {!isNonprofit && (
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col ${
                  tier.highlighted ? "border-2 border-[#B87333] transform md:-translate-y-4" : "border border-gray-100"
                }`}
              >
                {tier.highlighted && (
                  <div className="bg-[#B87333] text-white text-center text-sm font-bold py-2 uppercase tracking-wide">
                    Most Popular
                  </div>
                )}
                <div className="p-8 flex-grow">
                  <h3 className="text-2xl font-bold text-[#1B263B] mb-2">{tier.name}</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold text-[#1B263B]">${tier.price}</span>
                    <span className="text-gray-500 ml-2">/user/mo</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-8 h-10">{tier.description}</p>
                  
                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-[#4E596F]">
                        <Check className="w-5 h-5 text-[#B87333] shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="p-8 bg-gray-50 pt-0 mt-auto">
                  <Button 
                    className={`w-full py-6 text-lg font-medium shadow-md transition-all ${
                      tier.highlighted 
                        ? "bg-[#B87333] hover:bg-[#a0632a] text-white hover:shadow-lg" 
                        : "bg-[#1B263B] hover:bg-[#2c3b55] text-white"
                    }`}
                  >
                    {tier.cta}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        <div className="mt-20 text-center">
            <h3 className="text-2xl font-bold text-[#1B263B] mb-6">Need a custom enterprise solution?</h3>
            <p className="text-[#4E596F] mb-8 max-w-2xl mx-auto">
                We work with larger organizations to build custom infrastructure and growth plans.
            </p>
            <Button variant="outline" onClick={() => window.open("https://calendly.com", "_blank")} className="border-[#1B263B] text-[#1B263B] hover:bg-[#1B263B] hover:text-white px-8 py-3">
                Contact Sales
            </Button>
        </div>
      </div>
    </div>
  );
}
