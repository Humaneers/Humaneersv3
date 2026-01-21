"use client";

import { lazy, Suspense } from "react";

import { Shield, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "motion/react";
import { setSessionContext } from "../../lib/session";
import { datadog } from "../../lib/datadog";
import Image from "next/image";
import { useContactModal } from "../providers/ContactModalProvider";

import { SolutionSwitcher } from "./SolutionSwitcher";

// Porting ObjectionsSection later or keeping as lazy for now
const ObjectionsSection = lazy(() =>
  import("../../components/views/ObjectionsSection").then((m) => ({ default: m.ObjectionsSection }))
);

export function HomeClient() {
  const { openModal } = useContactModal();



  return (
    <div className="w-full">
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1673563978245-b5d4adb056fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUZW1wZSUyMEFyaXpvbmElMjBzdW5yaXNlJTIwd2FybSUyMGxpZ2h0fGVufDF8fHx8MTc2NjQ0ODcyOXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Tempe Arizona Morning"
            fill
            className="object-cover"
            priority
            sizes="100vw"
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
              <h1 className="text-4xl md:text-7xl font-bold text-white leading-tight mb-6">
                Built with precision. <br />
                <span className="text-white/80">Delivered with soul.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-light max-w-2xl">
                IT, security, and brand growth for those who demand excellence.
              </p>
            </div>
            <div className="flex flex-col gap-4 max-w-lg">
              <Button
                onClick={() => {
                  setSessionContext({ entrySource: "Homepage Hero CTA" });
                  datadog.trackAction("cta_click", {
                    location: "home_hero",
                    label: "Get Started",
                  });
                  openModal("sales");
                }}
                className="bg-brand-copper hover:bg-brand-copper-dark text-white text-lg px-8 h-14 rounded-md shadow-lg hover:shadow-xl transition-all w-fit"
                withArrow
              >
                Get Started
              </Button>

              <div className="mt-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 flex items-center gap-4 max-w-md shadow-2xl">
                <div className="bg-brand-copper/20 p-2 rounded-full border border-brand-copper/30">
                  <Shield className="text-brand-copper w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-white font-bold text-base leading-tight shadow-black drop-shadow-sm">
                    Trusted by 200+ businesses
                  </p>
                  <p className="text-white/70 text-xs font-medium">
                    Invitation-only heritage. Now open to all.
                  </p>
                </div>
              </div>
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


          <SolutionSwitcher />

        </div>
      </section>

      <section className="py-20 bg-brand-cream">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-brand-oxford mb-6">
                Security & Trust You Can Rely On
              </h2>
              <p className="text-brand-slate mb-8 text-lg leading-relaxed">
                We take security seriously. All of our services are SOC 2 compliant and we are proud
                to be 100% US-based. Your data never leaves domestic soil without your explicit
                permission.
              </p>
              <div className="flex gap-4">
                <div className="bg-brand-cream px-4 py-2 rounded border border-gray-200 flex items-center gap-2 font-semibold text-brand-oxford">
                  <Shield size={18} className="text-brand-copper" aria-hidden="true" /> SOC 2
                  Compliant
                </div>
                <div className="bg-brand-cream px-4 py-2 rounded border border-gray-200 flex items-center gap-2 font-semibold text-brand-oxford">
                  <MapPin size={18} className="text-brand-copper" aria-hidden="true" /> 100%
                  US-based
                </div>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1643292710805-0c32e5ca2a2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtb2Rlcm4lMjBzbWFsbCUyMGJ1c2luZXNzJTIwb2ZmaWNlJTIwdGVhbSUyMHdhcm0lMjB0b25lc3xlbnwxfHx8fDE3NjY0NDg3Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Office Team"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-brand-copper p-6 rounded-lg text-white shadow-lg hidden md:block">
                <p className="text-2xl font-bold">100+</p>
                <p className="text-sm opacity-90">Families Protected Nationwide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="h-96 bg-brand-cream" />}>
        <ObjectionsSection />
      </Suspense>

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
              datadog.trackAction("cta_click", {
                location: "home_bottom",
                label: "Lets get to work",
              });
              openModal("sales");
            }}
            className="bg-brand-copper hover:bg-brand-copper-dark text-white text-xl px-10 py-7 h-auto rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            Let's get to work
          </Button>
        </div>
      </section>
    </div>
  );
}
