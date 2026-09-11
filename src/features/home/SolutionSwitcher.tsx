"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
  type Transition,
} from "motion/react";
import { ArrowRight, BarChart3, Lock, Shield, Users } from "lucide-react";

import { FeatureGrid, type FeatureGridItem } from "@/components/sections/FeatureGrid";
import { sectionBandClass } from "@/components/sections/scheme";
import { Button } from "@/components/ui/button";
import { setSessionContext } from "@/lib/session";
import { cn } from "@/lib/utils";
import { routePaths } from "@/routes";

const services = [
  {
    id: "managed-it",
    icon: Shield,
    title: "Managed IT",
    desc: "Cloud-native infrastructure that just works. No downtime, just uptime. We handle the tech so you can handle the business.",
    link: routePaths.managedIt,
    details: ["24/7 US-Based Support", "Network Security", "Cloud Migration"],
  },
  {
    id: "growth",
    icon: BarChart3,
    title: "Brand Growth",
    desc: "Making your products billboard-ready with enterprise-grade strategy. From SEO to full-scale marketing campaigns.",
    link: routePaths.growth,
    details: ["SEO & Analytics", "Campaign Management", "Conversion Optimization"],
  },
  {
    id: "family",
    icon: Lock,
    title: "Family Protection",
    desc: "Closing the home-office security gap. Enterprise-grade cybersecurity for your personal life and loved ones.",
    link: routePaths.familyProtection,
    details: ["Identity Theft Protection", "Home Network Audit", "Device Securitization"],
  },
  {
    id: "leadership",
    icon: Users,
    title: "Fractional Leadership",
    desc: "Your own CIO/CMO at an SMB price. Strategy without the salary cap. Executive guidance when you need it most.",
    link: routePaths.fractionalLeadership,
    details: ["Technology Strategy", "Marketing Direction", "Vendor Management"],
  },
];

const EYEBROW = "Our Expertise";
const HEADING = "Everything You Need to Grow";

/** The same four solutions, labels and links, for the grid that stands in for the wheel below md. */
const GRID_ITEMS: FeatureGridItem[] = services.map((service) => ({
  icon: service.icon,
  heading: service.title,
  text: service.desc,
  link: { label: `Explore ${service.title}`, href: service.link },
}));

/** Tailwind's md breakpoint, written the way its md: variant matches it. */
const MD_UP = "(min-width: 48rem)";

function subscribeToMdUp(onChange: () => void) {
  const query = window.matchMedia(MD_UP);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** true from md up and false below; undefined on the server and while hydrating. */
function useMdUp(): boolean | undefined {
  return useSyncExternalStore(
    subscribeToMdUp,
    () => window.matchMedia(MD_UP).matches,
    () => undefined
  );
}

/**
 * "Everything You Need to Grow". The wheel needs room, so it renders from md
 * up; below md the same four solutions render as a FeatureGrid, one h2 either
 * way. Once the page has hydrated only one of the two is in the DOM. The
 * server cannot know the width, so until then both render and CSS shows the
 * right one; display: none keeps the other out of the accessibility tree.
 */
export function Solutions() {
  const mdUp = useMdUp();
  const hydrated = mdUp !== undefined;

  return (
    <>
      {mdUp !== true && (
        <div className={hydrated ? undefined : "md:hidden"}>
          <FeatureGrid
            eyebrow={EYEBROW}
            heading={HEADING}
            items={GRID_ITEMS}
            columns={2}
            scheme="cream"
          />
        </div>
      )}
      {mdUp !== false && (
        <section className={cn(sectionBandClass("cream"), !hydrated && "hidden md:block")}>
          <div className="section-container">
            {/* FeatureGrid's heading block, so the h2 reads the same at every width. */}
            <div className="mb-12 max-w-3xl md:mb-18 lg:mb-20">
              <p className="mb-3 font-semibold text-scheme-accent md:mb-4">{EYEBROW}</p>
              <h2 className="text-h3 font-bold">{HEADING}</h2>
            </div>
            <SolutionSwitcher />
          </div>
        </section>
      )}
    </>
  );
}

/** The panel the wheel's buttons switch. */
const PANEL_ID = "solution-panel";

/** With reduced motion, every animation on the wheel takes no time. */
const STILL: Transition = { duration: 0 };

/** Each solution sits on a circle this far from the wheel's center, in % of the wheel. */
const RADIUS = 40;

/** A point on that circle, `turn` degrees on from the solution's resting angle. */
function onCircle(index: number, turn: number, axis: "x" | "y") {
  const radians = ((index * 90 + turn) * Math.PI) / 180;
  const offset = axis === "x" ? Math.cos(radians) : Math.sin(radians);
  return `${50 + RADIUS * offset}%`;
}

/**
 * One solution on the wheel. It travels the circle itself and stays upright.
 * The wheel used to rotate a square container and counter-rotate each icon; a
 * rotated box adds its whole rotated overflow rectangle (the square plus the
 * icons and labels hanging past it) to the page's scroll width, so mid-turn
 * the page grew up to 103px wider at 375 and 65px at 768.
 */
function WheelItem({
  service,
  index,
  turn,
  isActive,
  onSelect,
}: {
  service: (typeof services)[number];
  index: number;
  turn: MotionValue<number>;
  isActive: boolean;
  onSelect: () => void;
}) {
  const left = useTransform(turn, (t) => onCircle(index, t, "x"));
  const top = useTransform(turn, (t) => onCircle(index, t, "y"));

  return (
    <motion.div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left, top }}>
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={isActive}
        aria-controls={PANEL_ID}
        className={cn(
          "group focus:outline-none focus:ring-2 focus:ring-brand-copper focus:ring-offset-2 rounded-full transition-all duration-300",
          isActive ? "scale-110" : "scale-100 opacity-70 hover:opacity-100 hover:scale-105"
        )}
      >
        <div
          className={cn(
            "size-28 rounded-full flex flex-col items-center justify-center border-4 transition-colors duration-300 shadow-2xl bg-white relative overflow-visible",
            isActive
              ? "bg-brand-copper border-brand-copper text-white shadow-brand-copper/50"
              : "border-brand-copper/30 text-brand-oxford group-hover:border-brand-copper/60 group-hover:shadow-brand-copper/20"
          )}
        >
          <service.icon aria-hidden="true" className="size-10" strokeWidth={1.5} />

          {/* Label - Positioned BELOW the circle with better readability */}
          <span
            className={cn(
              "absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-bold uppercase tracking-wide text-center whitespace-nowrap transition-all duration-300 rounded-full",
              isActive
                ? "opacity-100 translate-y-0 bg-brand-copper-text text-white shadow-md"
                : "opacity-0 translate-y-2 bg-white text-brand-oxford"
            )}
          >
            {service.title}
          </span>
        </div>
      </button>
    </motion.div>
  );
}

/** The rotating wheel. It renders from md up only (see Solutions), so its sizes are md sizes. */
function SolutionSwitcher() {
  const [activeIndex, setActiveIndex] = useState(0);
  // With reduced motion every transition below takes no time: the wheel jumps
  // to its new position, the core ring holds still and the panel swaps without
  // a fade. Only transitions change, never the animated values, so the server
  // render (which cannot know the setting) matches the client's.
  const reduceMotion = useReducedMotion();

  const activeService = services[activeIndex];

  // The wheel turns 90 degrees per solution, so the active one comes to rest at the right.
  const turn = useMotionValue(0);
  useEffect(() => {
    const controls = animate(
      turn,
      -activeIndex * 90,
      reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 25 }
    );
    return () => controls.stop();
  }, [activeIndex, reduceMotion, turn]);

  return (
    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
      {/* The Circular Wheel - Fixed and Responsive */}
      <div className="relative w-full max-w-[500px] aspect-square shrink-0">
        {/* Outer ring decoration */}
        <div className="absolute inset-0 rounded-full border-2 border-brand-copper/10 shadow-[inset_0_0_50px_rgba(184,115,51,0.05)]" />

        {services.map((service, index) => (
          <WheelItem
            key={service.id}
            service={service}
            index={index}
            turn={turn}
            isActive={index === activeIndex}
            onSelect={() => setActiveIndex(index)}
          />
        ))}

        {/* Center core - static */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-40 rounded-full bg-white shadow-2xl flex items-center justify-center border-2 border-gray-100 z-10">
          <div className="text-center">
            <div className="text-brand-copper-text text-sm font-bold uppercase tracking-wider mb-2">
              Precision
            </div>
            <div className="w-10 h-px bg-brand-copper/30 mx-auto my-2" />
            <div className="text-brand-oxford text-sm font-bold uppercase tracking-wider mt-2">
              Soul
            </div>
          </div>

          {/* Subtle pulse animation; with reduced motion it settles on its last keyframe */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-brand-copper/20"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.5, 0.2, 0.5],
            }}
            transition={
              reduceMotion
                ? STILL
                : {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
          />
        </div>
      </div>

      {/* Content Area - Animated */}
      <div id={PANEL_ID} className="flex-1 min-h-[400px] flex flex-col justify-center">
        {/* Opacity only. The panel used to slide in from x: 50, which pushed it
              past the right edge of the viewport while it moved. initial={false}:
              the first panel is simply there at load, not faded in. */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={reduceMotion ? STILL : { duration: 0.3, ease: "easeOut" }}
            className="space-y-8"
          >
            <div>
              <h3 className="mb-6 text-h3 font-bold">{activeService.title}</h3>
              <p className="max-w-xl text-large text-brand-slate">{activeService.desc}</p>
            </div>

            <ul className="grid grid-cols-2 gap-4">
              {activeService.details.map((detail) => (
                <li key={detail} className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="size-1.5 shrink-0 rounded-full bg-brand-copper"
                  />
                  <span className="text-brand-slate font-medium">{detail}</span>
                </li>
              ))}
            </ul>

            <div className="pt-6">
              <Button
                asChild
                className="bg-brand-oxford hover:bg-brand-oxford-muted text-white px-10 py-7 text-lg h-auto rounded-full"
              >
                <Link
                  href={activeService.link}
                  onClick={() => setSessionContext({ lastViewedService: activeService.title })}
                >
                  Explore {activeService.title}
                  <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
