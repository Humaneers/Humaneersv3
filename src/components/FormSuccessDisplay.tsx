"use client";

import { CheckCircle, Clock, Mail } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

interface FormSuccessDisplayProps {
  type: "sales" | "support" | "newsletter";
  queued?: boolean;
  submissionId?: string;
  fallbackSent?: boolean;
  customMessage?: string;
  className?: string;
}

export function FormSuccessDisplay({
  type,
  queued = false,
  submissionId,
  fallbackSent = false,
  customMessage,
  className = "",
}: FormSuccessDisplayProps) {
  const getSuccessMessage = () => {
    if (customMessage) return customMessage;

    const baseMessages = {
      sales:
        "Thank you for your interest! We'll be in touch within 24 hours to discuss how we can help.",
      support:
        "Your support request has been received. Our team will respond within 4 hours during business hours.",
      newsletter: "Welcome! You've been successfully subscribed to our newsletter.",
    };

    let message = baseMessages[type];

    if (queued) {
      message += " Your submission is being processed and you'll receive confirmation shortly.";
    }

    if (fallbackSent) {
      message += " We've also sent you a confirmation email.";
    }

    return message;
  };

  const getIcon = () => {
    if (queued) {
      return <Clock className="h-4 w-4 text-blue-600" />;
    }
    return <CheckCircle className="h-4 w-4 text-green-600" />;
  };

  const getNextSteps = () => {
    switch (type) {
      case "sales":
        return [
          "We'll review your requirements and prepare a customized proposal",
          "A member of our team will reach out to schedule a consultation",
          "In the meantime, feel free to explore our case studies and resources",
        ];
      case "support":
        return [
          "Your ticket has been assigned to our support team",
          "You'll receive updates via email as we work on your request",
          "For urgent issues, please call our emergency support line",
        ];
      case "newsletter":
        return [
          "You'll receive our monthly insights on enterprise strategy",
          "Be the first to know about new services and case studies",
          "You can update your preferences or unsubscribe at any time",
        ];
      default:
        return [];
    }
  };

  return (
    <div className={`space-y-4 ${className}`} role="alert" aria-live="polite">
      <Alert variant="default" className="border-green-200 bg-green-50">
        {getIcon()}
        <AlertDescription className="space-y-3">
          <p className="font-medium text-green-800">{getSuccessMessage()}</p>

          {fallbackSent && (
            <div className="flex items-center gap-2 text-sm text-blue-700 bg-blue-50 p-2 rounded">
              <Mail className="h-3 w-3" />
              Confirmation email sent to your inbox
            </div>
          )}

          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">What happens next:</p>
            <ul className="text-sm text-gray-600 space-y-1">
              {getNextSteps().map((step, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  {step}
                </li>
              ))}
            </ul>
          </div>

          {submissionId && (
            <p className="text-xs text-gray-500 pt-2 border-t">
              Reference ID: {submissionId.slice(-8)}
            </p>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
}
