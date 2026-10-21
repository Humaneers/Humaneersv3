"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** The same query the stylesheet gates the motion on. Keep the two in step. */
const MOTION_OK = "(prefers-reduced-motion: no-preference)";

/**
 * A div whose content rises 24px and fades in once, the first time it
 * scrolls into view.
 *
 * Nothing is hidden by default. The server renders the content in place and
 * fully visible, and so does a visitor with no JS, no IntersectionObserver or
 * reduced motion. Only after hydration, and only for content that starts
 * below the fold, does the effect set data-reveal="armed"; the visitor cannot
 * see it at that point, so nothing blinks. The stylesheet applies the hidden
 * state under `screen and (prefers-reduced-motion: no-preference)` only, so
 * print and reduced motion always show everything.
 */
export function Reveal({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (typeof window.matchMedia !== "function" || !window.matchMedia(MOTION_OK).matches) return;
    // Already on screen: leave it where it is.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.dataset.reveal = "armed";
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        el.dataset.reveal = "in";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      delete el.dataset.reveal;
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
