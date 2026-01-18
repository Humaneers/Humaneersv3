/**
 * LoadingSpinner Component
 *
 * A reusable loading spinner that displays a centered animated icon.
 * Uses the brand's copper color for consistency.
 *
 * @example
 * <LoadingSpinner />
 *
 * @example
 * // With custom message
 * <LoadingSpinner message="Loading content..." />
 */

import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  /** Optional loading message to display below spinner */
  message?: string;
  /** Size variant of the spinner (sm, md, lg) */
  size?: "sm" | "md" | "lg";
}

export function LoadingSpinner({ message, size = "md" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div className="min-h-[200px] flex flex-col items-center justify-center">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-brand-copper`} />
      {message && <p className="mt-4 text-brand-slate text-sm">{message}</p>}
    </div>
  );
}
