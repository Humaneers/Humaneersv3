"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, BarChart3, Users, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { routePaths } from "../../routes";
import { setSessionContext } from "../../lib/session";
import { cn } from "../../lib/utils";

const services = [
    {
        id: "managed-it",
        icon: Shield,
        title: "Managed IT",
        desc: "Cloud-native infrastructure that just works. No downtime, just uptime. We handle the tech so you can handle the business.",
        link: routePaths.managedIt,
        details: [
            "24/7 US-Based Support",
            "Network Security",
            "Cloud Migration",
        ],
    },
    {
        id: "growth",
        icon: BarChart3,
        title: "Brand Growth",
        desc: "Making your products billboard-ready with enterprise-grade strategy. From SEO to full-scale marketing campaigns.",
        link: routePaths.growth,
        details: [
            "SEO & Analytics",
            "Campaign Management",
            "Conversion Optimization",
        ],
    },
    {
        id: "family",
        icon: Lock,
        title: "Family Protection",
        desc: "Closing the home-office security gap. Enterprise-grade cybersecurity for your personal life and loved ones.",
        link: routePaths.familyProtection,
        details: [
            "Identity Theft Protection",
            "Home Network Audit",
            "Device Securitization",
        ],
    },
    {
        id: "leadership",
        icon: Users,
        title: "Fractional Leadership",
        desc: "Your own CIO/CMO at an SMB price. Strategy without the salary cap. Executive guidance when you need it most.",
        link: routePaths.fractionalLeadership,
        details: [
            "Technology Strategy",
            "Marketing Direction",
            "Vendor Management",
        ],
    },
];

export function SolutionSwitcher() {
    const [activeId, setActiveId] = useState(services[0].id);
    const router = useRouter();

    const activeService = services.find((s) => s.id === activeId);

    return (
        <div className="w-full max-w-5xl mx-auto">
            {/* Navigation Icons */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12">
                {services.map((service) => {
                    const isActive = activeId === service.id;
                    return (
                        <button
                            key={service.id}
                            onClick={() => setActiveId(service.id)}
                            className="group flex flex-col items-center gap-3 focus:outline-none"
                        >
                            <div
                                className={cn(
                                    "w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg border-2",
                                    isActive
                                        ? "bg-brand-copper border-brand-copper text-white scale-110 shadow-xl"
                                        : "bg-white border-gray-100 text-gray-400 hover:border-brand-copper/50 hover:text-brand-copper hover:scale-105"
                                )}
                            >
                                <service.icon className={cn("w-8 h-8 md:w-10 md:h-10", isActive ? "text-white" : "")} />
                            </div>
                            <span
                                className={cn(
                                    "text-sm font-medium transition-colors duration-300",
                                    isActive ? "text-brand-copper" : "text-gray-400 group-hover:text-brand-oxford"
                                )}
                            >
                                {service.title}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Content Display */}
            <AnimatePresence mode="wait">
                {activeService && (
                    <motion.div
                        key={activeService.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col md:flex-row"
                    >
                        <div className="p-8 md:p-12 flex-1 flex flex-col justify-center">
                            <h3 className="text-2xl md:text-3xl font-bold text-brand-oxford mb-4">
                                {activeService.title}
                            </h3>
                            <p className="text-lg text-brand-slate mb-8 leading-relaxed">
                                {activeService.desc}
                            </p>

                            <ul className="mb-8 space-y-3">
                                {activeService.details.map((detail) => (
                                    <li key={detail} className="flex items-center text-brand-slate/80">
                                        <div className="w-2 h-2 rounded-full bg-brand-copper mr-3" />
                                        {detail}
                                    </li>
                                ))}
                            </ul>

                            <Button
                                onClick={() => {
                                    setSessionContext({ lastViewedService: activeService.title });
                                    router.push(activeService.link);
                                }}
                                className="w-fit bg-brand-copper hover:bg-brand-copper-dark text-white shadow-md self-start"
                                withArrow
                            >
                                Explore {activeService.title}
                            </Button>
                        </div>
                        <div className="md:w-1/3 bg-brand-oxford/5 p-8 flex items-center justify-center border-l border-gray-100">
                            {/* Decorative icon or abstract graphic */}
                            <div className="relative w-40 h-40 opacity-10">
                                <activeService.icon className="w-full h-full text-brand-oxford" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
