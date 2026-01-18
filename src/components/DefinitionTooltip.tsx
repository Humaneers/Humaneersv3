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
import { HelpCircle } from "lucide-react";

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
        <span className={`cursor-help border-b border-dotted border-[#B87333] hover:text-[#B87333] transition-colors inline-flex items-center gap-0.5 ${className}`}>
          {term}
        </span>
      </TooltipTrigger>
      <TooltipContent className="bg-[#1B263B] text-white border border-[#B87333] max-w-xs p-3">
        <p>{definition}</p>
      </TooltipContent>
    </Tooltip>
  );
}
