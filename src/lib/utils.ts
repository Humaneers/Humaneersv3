/**
 * Utility functions for the Humaneers application
 */

import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge with the Relume type ramp registered as font sizes. Out of
 * the box it reads text-h1 or text-medium as a text color, so a ramp class
 * and a color passed together had one of them silently dropped. The names
 * are the --text-* tokens in src/styles/globals.css.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: ["h1", "h2", "h3", "h4", "h5", "h6", "large", "medium", "regular", "small", "tiny"],
        },
      ],
    },
  },
});

/**
 * Combines multiple class names using clsx and merges Tailwind classes
 *
 * This utility function intelligently merges Tailwind CSS classes, preventing
 * conflicts and duplication. It uses clsx for conditional class handling and
 * tailwind-merge to resolve Tailwind-specific class conflicts.
 *
 * @param inputs - Variable number of class values (strings, objects, arrays)
 * @returns Merged class string with resolved Tailwind conflicts
 *
 * @example
 * cn('px-2 py-1', 'px-4') // Returns: 'py-1 px-4' (px-4 overrides px-2)
 * cn('text-red-500', condition && 'text-blue-500') // Conditional classes
 * cn({ 'bg-primary': isPrimary, 'bg-secondary': !isPrimary }) // Object syntax
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Creates a mailto link for reporting errors to support
 */
export function createErrorReportLink(error: unknown, context: string): string {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const timestamp = new Date().toISOString();
  // Safe user agent access
  const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "Server/Unknown";
  const location = typeof window !== "undefined" ? window.location.href : "Unknown";

  const subject = encodeURIComponent(`Issue Report: ${context}`);
  const body = encodeURIComponent(
    `I encountered an error while using the Humaneers website.\n\n` +
      `Context: ${context}\n` +
      `Error: ${errorMessage}\n` +
      `Time: ${timestamp}\n` +
      `Location: ${location}\n` +
      `User Agent: ${userAgent}\n\n` +
      `-- Please add any additional details below --\n`
  );

  return `mailto:support@humaneers.dev?subject=${subject}&body=${body}`;
}
