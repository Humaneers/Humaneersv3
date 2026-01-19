import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Shield, BarChart3, Users, Lock, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { motion } from "motion/react";
import { routePaths } from "../../routes";
import { ObjectionsSection } from "./ObjectionsSection";
import { setSessionContext } from "../../lib/session";

import { Seo } from "../Seo";

export function Home() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      navigate(routePaths.talkToSales, { state: { email, source: "Homepage Hero" } });
    }
  };

  const servicePillars = [
    {
      icon: <Shield className="w-8 h-8 text-brand-copper" />,
      title: "Managed IT",
      desc: "Cloud-native infrastructure that just works. No downtime, just uptime.",
      link: routePaths.managedIt,
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-brand-copper" />,
      title: "Brand Growth",
      desc: "Making your products billboard-ready with enterprise-grade strategy.",
      link: routePaths.growth,
    },
    {
      icon: <Lock className="w-8 h-8 text-brand-copper" />,
      title: "Family Protection",
      desc: "Closing the home-office security gap to keep your family safe.",
      link: routePaths.familyProtection,
    },
    {
      icon: <Users className="w-8 h-8 text-brand-copper" />,
      title: "Fractional Leadership",
      desc: "Your own CIO/CMO at an SMB price. Strategy without the salary cap.",
      link: routePaths.fractionalLeadership,
    },
  ];

  return (
    <Seo
      title="Humaneers | Enterprise Strategy. Built with Precision."
      description="Enterprise-grade IT, security, and brand growth for small businesses and families. SOC 2 compliant, 100% US-based managed IT services, family protection, and fractional leadership."
    >
      <link
        rel="preload"
        as="image"
        href="https://images.unsplash.com/photo-1673563978245-b5d4adb056fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUZW1wZSUyMEFyaXpvbmElMjBzdW5yaXNlJTIwd2FybSUyMGxpZ2h0fGVufDF8fHx8MTc2NjQ0ODcyOXww&ixlib=rb-4.1.0&q=80&w=1080"
      />
      <div className="w-full">
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1673563978245-b5d4adb056fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUZW1wZSUyMEFyaXpvbmElMjBzdW5yaXNlJTIwd2FybSUyMGxpZ2h0fGVufDF8fHx8MTc2NjQ0ODcyOXww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Tempe Arizona Morning"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-brand-oxford/70 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-oxford via-transparent to-transparent opacity-90" />
          </div>

          <div className="container mx-auto px-6 relative z-10 pt-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <div className="mb-8">
                <p className="text-brand-copper font-bold tracking-widest uppercase text-sm md:text-base mb-4">
                  Enterprise Strategy for Businesses & Families
                </p>
                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
                  Built with precision. <br />
                  <span className="text-white/80">Delivered with soul.</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-light max-w-2xl">
                  IT, security, and brand growth for those who demand excellence.
                </p>
              </div>
              <div className="flex flex-col gap-4 max-w-lg">
                <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-grow">
                    <label htmlFor="hero-email" className="sr-only">
                      Work Email
                    </label>
                    <Input
                      id="hero-email"
                      type="email"
                      placeholder="Enter your email..."
                      className="bg-white text-gray-900 h-14 text-lg border-0 focus-visible:ring-2 focus-visible:ring-brand-copper"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <Button
                    type="submit"
                    onClick={() => setSessionContext({ entrySource: "Homepage Hero Input" })}
                    className="bg-brand-copper hover:bg-brand-copper-dark text-white text-lg px-8 h-14 rounded-md shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
                  >
                    Get Started
                  </Button>
                </form>
                <p className="text-sm text-gray-400">
                  Join 200+ businesses secured by Humaneers. No credit card required.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="bg-brand-copper text-white py-4 relative z-20 shadow-md">
          <div className="container mx-auto px-6 text-center font-medium text-lg tracking-wide">
            No user minimums. No offshore NOCs. 100% US-based engineering.
          </div>
        </div>

        <section className="py-24 bg-brand-cream relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-brand-copper to-transparent opacity-50" />

          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h3 className="text-brand-copper font-bold tracking-widest uppercase mb-3 text-sm">
                Our Expertise
              </h3>
              <h2 className="text-4xl font-bold text-brand-oxford">Everything You Need to Grow</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {servicePillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  onClick={() => {
                    setSessionContext({ lastViewedService: pillar.title });
                    navigate(pillar.link);
                  }}
                  className="bg-white p-8 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 border-b-4 border-transparent hover:border-brand-copper group cursor-pointer"
                >
                  <div className="mb-6 bg-brand-cream w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {pillar.icon}
                  </div>
                  <h3 className="text-xl font-bold text-brand-oxford mb-3">{pillar.title}</h3>
                  <p className="text-brand-slate leading-relaxed text-sm">{pillar.desc}</p>
                  <div className="mt-6 flex items-center text-brand-copper font-medium text-sm group-hover:gap-2 transition-all cursor-pointer">
                    Learn more <ArrowRight size={16} className="ml-1" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-brand-oxford mb-6">
                  Security & Trust You Can Rely On
                </h2>
                <p className="text-brand-slate mb-8 text-lg leading-relaxed">
                  We take security seriously. All of our services are SOC 2 compliant and we are
                  proud to be 100% US-based. Your data never leaves domestic soil without your
                  explicit permission.
                </p>
                <div className="flex gap-4">
                  <div className="bg-brand-cream px-4 py-2 rounded border border-gray-200 flex items-center gap-2 font-semibold text-brand-oxford">
                    <Shield size={18} className="text-brand-copper" /> SOC 2 Compliant
                  </div>
                  <div className="bg-brand-cream px-4 py-2 rounded border border-gray-200 flex items-center gap-2 font-semibold text-brand-oxford">
                    <MapPin size={18} className="text-brand-copper" /> 100% US-based
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 relative">
                <img
                  src="https://images.unsplash.com/photo-1643292710805-0c32e5ca2a2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtb2Rlcm4lMjBzbWFsbCUyMGJ1c2luZXNzJTIwb2ZmaWNlJTIwdGVhbSUyMHdhcm0lMjB0b25lc3xlbnwxfHx8fDE3NjY0NDg3Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Office Team"
                  className="rounded-lg shadow-2xl w-full aspect-[4/3] object-cover"
                />
                <div className="absolute -bottom-6 -left-6 bg-brand-copper p-6 rounded-lg text-white shadow-lg hidden md:block">
                  <p className="text-2xl font-bold">100+</p>
                  <p className="text-sm opacity-90">Families Protected Nationwide</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ObjectionsSection />

        <section className="py-24 bg-brand-oxford relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 C 20 0 50 0 100 100 Z" fill="var(--brand-copper)" />
            </svg>
          </div>
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to upgrade your business or protect your home?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Get the enterprise-grade support you deserve with the personal touch you need.
            </p>
            <Button
              onClick={() => {
                setSessionContext({ entrySource: "Homepage Bottom CTA" });
                navigate(routePaths.talkToSales, { state: { source: "Homepage Bottom CTA" } });
              }}
              className="bg-brand-copper hover:bg-brand-copper-dark text-white text-xl px-10 py-7 h-auto rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              Let's get to work
            </Button>
          </div>
        </section>
      </div>
    </Seo>
  );
}
