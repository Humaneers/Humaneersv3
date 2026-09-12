"use client";

import { motion, useReducedMotion, type Transition } from "motion/react";
import { cn } from "../../lib/utils";

interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const AuroraBackground = ({ className, children, ...props }: AuroraBackgroundProps) => {
  // With reduced motion nothing loops: the blobs settle on their last keyframe
  // at once, and the aurora layer's animation sits behind motion-safe. Only the
  // transitions change, so the server render still matches the client's.
  const reduceMotion = useReducedMotion();
  const drift = (duration: number): Transition =>
    reduceMotion ? { duration: 0 } : { duration, repeat: Infinity, repeatType: "reverse" };

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center min-h-[90vh] bg-brand-oxford text-white overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            // Base gradients
            `
            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
            [--aurora:repeating-linear-gradient(100deg,#3B82F6_10%,#CE7E57_15%,#0F2132_20%,#E6DCC9_25%,#3B82F6_30%)]
            [background-image:var(--white-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px] invert dark:invert-0
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)]
            after:[background-size:200%,_100%]
            motion-safe:after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] opacity-20
            will-change-transform`,
            // Custom Brand Colors override
            // Oxford: #0F2132, Copper: #CE7E57, Cream: #E6DCC9
            `[--aurora:repeating-linear-gradient(100deg,#0F2132_10%,#CE7E57_15%,#0F2132_20%,#E6DCC9_25%,#0F2132_30%)]`
          )}
        ></div>
        {/* Animated Blobs for "Living" feel */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={drift(10)}
          className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-brand-copper/20 rounded-full blur-3xl mix-blend-screen"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={drift(15)}
          className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-brand-cream/10 rounded-full blur-3xl mix-blend-overlay"
        />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};
