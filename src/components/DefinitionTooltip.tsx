import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { HelpCircle } from "lucide-react";

interface DefinitionTooltipProps {
  term: string;
  definition: string;
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
