"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** The same query the stylesheet gates the motion on. Keep the two in step. */
const MOTION_OK = "(prefers-reduced-motion: no-preference)";

/**
 * The paragraph WordReveal renders, plus the reveal for browsers without view
 * timelines. Where `animation-timeline: view()` is supported the stylesheet
 * does the work and this does nothing.
 *
 * Elsewhere, and only for a statement that starts below the fold, it sets
 * data-word-reveal="armed" (words at 25 percent and an 8px blur, applied by
 * the stylesheet under screen and no-preference only) and then "in" the first
 * time the statement is well into view, which transitions each word to sharp.
 * A statement already on screen is left sharp.
 */
export function WordRevealFallback({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (typeof CSS !== "undefined" && CSS.supports?.("animation-timeline: view()")) return;
    if (typeof window.matchMedia !== "function" || !window.matchMedia(MOTION_OK).matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.dataset.wordReveal = "armed";
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        el.dataset.wordReveal = "in";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -25% 0px" }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      delete el.dataset.wordReveal;
    };
  }, []);

  return (
    <p ref={ref} className={className}>
      {children}
    </p>
  );
}
