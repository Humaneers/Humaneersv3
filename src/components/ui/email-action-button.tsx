"use client";

import { Mail } from "lucide-react";
import { Button } from "./button";
import { cn } from "../../lib/utils";

interface EmailActionButtonProps {
  label: string;
  email: string;
  subject?: string;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export function EmailActionButton({
  label,
  email,
  subject,
  className,
  variant = "default",
  size = "lg",
}: EmailActionButtonProps) {
  const mailtoLink = `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;

  return (
    <Button
      asChild
      variant={variant}
      size={size}
      className={cn("gap-2 text-lg h-auto py-4 px-8", className)}
    >
      <a href={mailtoLink}>
        <Mail className="w-5 h-5" />
        {label}
      </a>
    </Button>
  );
}
