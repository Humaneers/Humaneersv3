import { Fragment, type CSSProperties } from "react";

import { cn } from "@/lib/utils";

import { WordRevealFallback } from "./WordRevealFallback";

/**
 * A statement whose words resolve from blurred to sharp as it scrolls into
 * view. A server component: the split happens here, so no JS ships for it.
 *
 * Each word carries --p, its position through the statement from 0 to 1, and
 * the stylesheet staggers the reveal on it. Where the browser has view
 * timelines the motion is CSS only, behind @supports (animation-timeline:
 * view()) and prefers-reduced-motion. Elsewhere WordRevealFallback runs the
 * same reveal from an IntersectionObserver. With neither, or with reduced
 * motion, print or no JS, the words are plain, sharp, fully visible text.
 *
 * Screen readers get the sentence once, whole, from the visually hidden copy;
 * the word spans are aria-hidden, so no reader steps through it word by word.
 */
export function WordReveal({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  const last = Math.max(words.length - 1, 1);
  return (
    <WordRevealFallback className={cn("word-reveal", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <Fragment key={index}>
            {index > 0 && " "}
            <span
              className="word-reveal__word"
              style={{ "--p": (index / last).toFixed(3) } as CSSProperties}
            >
              {word}
            </span>
          </Fragment>
        ))}
      </span>
    </WordRevealFallback>
  );
}
