import { useState, useEffect } from "react";
import { ArrowRight, Shield, BarChart3, Users, Lock, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { View } from "../../App";
import { motion } from "motion/react";

interface HomeProps {
  onViewChange: (view: View) => void;
}

export function Home({ onViewChange }: HomeProps) {
  useEffect(() => {
    document.title = "Humaneers | Home | Enterprise Strategy, Small Business Soul";
  }, []);

  const servicePillars = [
    {
      icon: <Shield className="w-8 h-8 text-[#B87333]" />,
      title: "Managed IT",
      desc: "Cloud-native infrastructure that just works. No downtime, just uptime.",
      link: "managed-it" as const,
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-[#B87333]" />,
      title: "Brand & Marketing",
      desc: "Making your products billboard-ready with enterprise-grade strategy.",
      link: "growth" as const,
    },
    {
      icon: <Lock className="w-8 h-8 text-[#B87333]" />,
      title: "Family Protection",
      desc: "Closing the home-office security gap to keep your family safe.",
      link: "family-protection" as const,
    },
    {
      icon: <Users className="w-8 h-8 text-[#B87333]" />,
      title: "Fractional Leadership",
      desc: "Your own CIO/CMO at an SMB price. Strategy without the salary cap.",
      link: "fractional-leadership" as const,
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1673563978245-b5d4adb056fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUZW1wZSUyMEFyaXpvbmElMjBzdW5yaXNlJTIwd2FybSUyMGxpZ2h0fGVufDF8fHx8MTc2NjQ0ODcyOXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Tempe Arizona Morning"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1B263B]/70 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B263B] via-transparent to-transparent opacity-90" />
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Enterprise Strategy. <br />
              <span className="text-[#B87333]">Small Business Soul.</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed font-light">
              IT, Security, and Brand Growth for teams that think big—even if
              they’re super-small.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => onViewChange("pricing")}
                className="bg-[#B87333] hover:bg-[#a0632a] text-white text-lg px-8 py-6 h-auto rounded-md shadow-lg hover:shadow-xl transition-all"
              >
                View Our $90/User Foundation Plan
              </Button>
              <Button
                variant="outline"
                onClick={() => onViewChange("about")}
                className="bg-transparent border-white text-white hover:bg-white/10 hover:text-white text-lg px-8 py-6 h-auto rounded-md transition-all"
              >
                Meet The Team
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* No Minimums Banner */}
      <div className="bg-[#B87333] text-white py-4 relative z-20 shadow-md">
        <div className="container mx-auto px-6 text-center font-medium text-lg tracking-wide">
          No user minimums. No offshore NOCs. 100% US-Based Engineering.
        </div>
      </div>

      {/* Service Pillars */}
      <section className="py-24 bg-[#F5F1E9] relative">
        {/* Copper Thread */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-[#B87333] to-transparent opacity-50" />
        
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-[#B87333] font-bold tracking-widest uppercase mb-3 text-sm">Our Expertise</h3>
            <h2 className="text-4xl font-bold text-[#1B263B]">Everything You Need to Grow</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicePillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => onViewChange(pillar.link)}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 border-b-4 border-transparent hover:border-[#B87333] group cursor-pointer"
              >
                <div className="mb-6 bg-[#F5F1E9] w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold text-[#1B263B] mb-3">
                  {pillar.title}
                </h3>
                <p className="text-[#4E596F] leading-relaxed text-sm">
                  {pillar.desc}
                </p>
                <div className="mt-6 flex items-center text-[#B87333] font-medium text-sm group-hover:gap-2 transition-all cursor-pointer">
                  Learn more <ArrowRight size={16} className="ml-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-[#1B263B] mb-6">
                Security & Trust You Can Rely On
              </h2>
              <p className="text-[#4E596F] mb-8 text-lg leading-relaxed">
                We take security seriously. All our services are SOC 2 compliant
                and we are proud to be 100% US-Based. Your data never leaves
                domestic soil without your explicit permission.
              </p>
              <div className="flex gap-4">
                <div className="bg-[#F5F1E9] px-4 py-2 rounded border border-gray-200 flex items-center gap-2 font-semibold text-[#1B263B]">
                  <Shield size={18} className="text-[#B87333]" /> SOC 2 Compliant
                </div>
                <div className="bg-[#F5F1E9] px-4 py-2 rounded border border-gray-200 flex items-center gap-2 font-semibold text-[#1B263B]">
                  <MapPin size={18} className="text-[#B87333]" /> 100% US-Based
                </div>
              </div>
            </div>
            <div className="md:w-1/2 relative">
               <img
                src="https://images.unsplash.com/photo-1643292710805-0c32e5ca2a2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzbWFsbCUyMGJ1c2luZXNzJTIwb2ZmaWNlJTIwdGVhbSUyMHdhcm0lMjB0b25lc3xlbnwxfHx8fDE3NjY0NDg3Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Office Team"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#B87333] p-6 rounded-lg text-white shadow-lg hidden md:block">
                <p className="text-2xl font-bold">500+</p>
                <p className="text-sm opacity-90">Families Protected Nationwide</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-24 bg-[#1B263B] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
           <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0 100 C 20 0 50 0 100 100 Z" fill="#B87333" />
           </svg>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to upgrade your business?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Get the enterprise-grade support you deserve with the personal touch you need.
          </p>
          <Button
            onClick={() => onViewChange("contact")}
            className="bg-[#B87333] hover:bg-[#a0632a] text-white text-xl px-10 py-7 h-auto rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            Let's get to work
          </Button>
        </div>
      </section>
    </div>
  );
}
