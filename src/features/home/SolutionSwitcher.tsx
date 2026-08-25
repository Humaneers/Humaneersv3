"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, BarChart3, Users, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { routePaths } from "../../routes";
import { setSessionContext } from "@/lib/session";
import { cn } from "@/lib/utils";

const services = [
  {
    id: "managed-it",
    icon: Shield,
    title: "Managed IT",
    desc: "Cloud-native infrastructure that just works. No downtime, just uptime. We handle the tech so you can handle the business.",
    link: routePaths.managedIt,
    color: "brand-oxford",
    details: ["24/7 US-Based Support", "Network Security", "Cloud Migration"],
  },
  {
    id: "growth",
    icon: BarChart3,
    title: "Brand Growth",
    desc: "Making your products billboard-ready with enterprise-grade strategy. From SEO to full-scale marketing campaigns.",
    link: routePaths.growth,
    color: "brand-copper",
    details: ["SEO & Analytics", "Campaign Management", "Conversion Optimization"],
  },
  {
    id: "family",
    icon: Lock,
    title: "Family Protection",
    desc: "Closing the home-office security gap. Enterprise-grade cybersecurity for your personal life and loved ones.",
    link: routePaths.familyProtection,
    color: "brand-slate",
    details: ["Identity Theft Protection", "Home Network Audit", "Device Securitization"],
  },
  {
    id: "leadership",
    icon: Users,
    title: "Fractional Leadership",
    desc: "Your own CIO/CMO at an SMB price. Strategy without the salary cap. Executive guidance when you need it most.",
    link: routePaths.fractionalLeadership,
    color: "brand-oxford",
    details: ["Technology Strategy", "Marketing Direction", "Vendor Management"],
  },
];

export function SolutionSwitcher() {
  const [activeId, setActiveId] = useState(services[0].id);
  const router = useRouter();

  const activeService = services.find((s) => s.id === activeId) || services[0];
  const activeIndex = services.findIndex((s) => s.id === activeId);

  // Rotation angle for the wheel (90 degrees per service for 4 services)
  const rotationAngle = -(activeIndex * 90);

  // Unified transition for perfect synchronization
  const transition = { type: "spring", stiffness: 120, damping: 25 };

  return (
    <div className="w-full max-w-6xl mx-auto py-12">
      <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        {/* The Circular Wheel - Fixed and Responsive */}
        <div className="relative w-full max-w-[500px] aspect-square shrink-0">
          {/* Outer ring decoration */}
          <div className="absolute inset-0 rounded-full border-2 border-brand-copper/10 shadow-[inset_0_0_50px_rgba(184,115,51,0.05)]" />

          {/* Rotating service icons */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: rotationAngle }}
            transition={transition}
          >
            {services.map((service, index) => {
              const angle = index * 90; // 0°, 90°, 180°, 270°
              const isActive = activeId === service.id;

              // Calculate position on circle (radius = 40% of container)
              const radius = 40; // percentage
              const radians = (angle * Math.PI) / 180;
              const x = 50 + radius * Math.cos(radians); // center + offset
              const y = 50 + radius * Math.sin(radians);

              return (
                <div
                  key={service.id}
                  className="absolute"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <button
                    onClick={() => setActiveId(service.id)}
                    className={cn(
                      "group focus:outline-none focus:ring-2 focus:ring-brand-copper focus:ring-offset-2 rounded-full transition-all duration-300",
                      isActive
                        ? "scale-110"
                        : "scale-100 opacity-70 hover:opacity-100 hover:scale-105"
                    )}
                  >
                    {/* Icon circle that counter-rotates to stay upright */}
                    <motion.div
                      animate={{ rotate: -rotationAngle }}
                      transition={transition}
                      className={cn(
                        "w-20 h-20 md:w-28 md:h-28 rounded-full flex flex-col items-center justify-center border-4 transition-all duration-300 shadow-2xl bg-white relative overflow-visible",
                        isActive
                          ? "bg-brand-copper border-brand-copper text-white shadow-brand-copper/50"
                          : "border-brand-copper/30 text-brand-oxford group-hover:border-brand-copper/60 group-hover:shadow-brand-copper/20"
                      )}
                    >
                      <service.icon className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />

                      {/* Label - Positioned BELOW the circle with better readability */}
                      <motion.span
                        className={cn(
                          "absolute -bottom-7 md:-bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 text-[10px] md:text-xs font-bold uppercase tracking-wide text-center whitespace-nowrap transition-all duration-300 rounded-full",
                          isActive
                            ? "opacity-100 translate-y-0 bg-brand-copper-text text-white shadow-md"
                            : "opacity-0 translate-y-2 bg-white text-brand-oxford"
                        )}
                      >
                        {service.title}
                      </motion.span>
                    </motion.div>
                  </button>
                </div>
              );
            })}
          </motion.div>

          {/* Center core - static */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 rounded-full bg-white shadow-2xl flex items-center justify-center border-2 border-gray-100 z-10">
            <div className="text-center">
              <div className="text-brand-copper-text text-xs md:text-sm font-bold uppercase tracking-wider mb-2">
                Precision
              </div>
              <div className="w-8 md:w-10 h-px bg-brand-copper/30 mx-auto my-2" />
              <div className="text-brand-oxford text-xs md:text-sm font-bold uppercase tracking-wider mt-2">
                Soul
              </div>
            </div>

            {/* Subtle pulse animation */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-brand-copper/20"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.5, 0.2, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>

        {/* Content Area - Animated */}
        <div className="flex-1 min-h-[400px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-3xl md:text-5xl font-bold text-brand-oxford mb-6 leading-tight">
                  {activeService.title}
                </h3>
                <p className="text-xl text-brand-slate leading-relaxed max-w-xl">
                  {activeService.desc}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeService.details.map((detail) => (
                  <div key={detail} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-copper" />
                    <span className="text-brand-slate font-medium">{detail}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <Button
                  onClick={() => {
                    setSessionContext({ lastViewedService: activeService.title });
                    router.push(activeService.link);
                  }}
                  className="bg-brand-oxford hover:bg-brand-oxford-muted text-white px-10 py-7 text-lg h-auto rounded-full group"
                  withArrow
                >
                  Explore {activeService.title}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
