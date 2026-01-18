/**
 * LoadingSpinner Component
 *
 * A reusable loading spinner that displays a centered animated icon.
 * Uses the brand's copper color (#B87333) for consistency.
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
  /** Size of the spinner icon (default: 8 = 2rem/32px) */
  size?: number;
}

export function LoadingSpinner({ message, size = 8 }: LoadingSpinnerProps) {
  return (
    <div className="min-h-[200px] flex flex-col items-center justify-center">
      <Loader2 className={`h-${size} w-${size} animate-spin text-[#B87333]`} />
      {message && (
        <p className="mt-4 text-[#4E596F] text-sm">{message}</p>
      )}
    </div>
  );
}
