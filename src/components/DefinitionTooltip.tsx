/**
 * DefinitionTooltip Component
 *
 * Displays technical terms with dotted underlines that reveal definitions on hover.
 * Used throughout service pages to explain acronyms and jargon without cluttering copy.
 *
 * @example
 * <DefinitionTooltip
 *   term="MSP"
 *   definition="Managed Service Provider: Third-party companies that remotely manage customer's IT infrastructure."
 * />
 *
 * @example
 * // Inline within text
 * We work with <DefinitionTooltip term="MDM" definition="Mobile Device Management software" /> solutions.
 */

import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface DefinitionTooltipProps {
  /** The term or acronym to display with underline */
  term: string;
  /** The full definition shown in tooltip on hover */
  definition: string;
  /** Optional additional CSS classes */
  className?: string;
}

export function DefinitionTooltip({ term, definition, className = "" }: DefinitionTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          className={`cursor-help border-b border-dotted border-brand-copper hover:text-brand-copper transition-colors inline-flex items-center gap-0.5 ${className}`}
        >
          {term}
        </span>
      </TooltipTrigger>
      <TooltipContent className="bg-brand-oxford text-white border border-brand-copper max-w-xs p-3">
        <p>{definition}</p>
      </TooltipContent>
    </Tooltip>
  );
}
