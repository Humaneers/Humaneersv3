/**
 * Utility functions for the Humaneers application
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
