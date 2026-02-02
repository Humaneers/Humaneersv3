"use client";

import { AlertTriangle, RefreshCw, Mail, Phone, CheckCircle, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import { FormErrorState } from "@/hooks/useFormErrorHandling";

interface FormErrorDisplayProps {
  errorState: FormErrorState;
  onRetry?: () => void;
  showRetryButton?: boolean;
  showContactInfo?: boolean;
  retryMessage?: string;
  severity?: "info" | "warning" | "error";
  className?: string;
}

export function FormErrorDisplay({
  errorState,
  onRetry,
  showRetryButton = false,
  showContactInfo = false,
  retryMessage = "",
  severity = "error",
  className = "",
}: FormErrorDisplayProps) {
  if (!errorState.type) return null;

  const getAlertVariant = () => {
    switch (severity) {
      case "info":
        return "default";
      case "warning":
        return "default";
      case "error":
      default:
        return "destructive";
    }
  };

  const getIcon = () => {
    if (errorState.type === "network" || errorState.type === "timeout") {
      return <Clock className="h-4 w-4" />;
    }
    if (errorState.fallbackSent) {
      return <CheckCircle className="h-4 w-4" />;
    }
    return <AlertTriangle className="h-4 w-4" />;
  };

  const getIconColor = () => {
    if (errorState.fallbackSent) return "text-green-600";
    if (severity === "info") return "text-blue-600";
    if (severity === "warning") return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className={`space-y-4 ${className}`} role="alert" aria-live="polite">
      <Alert variant={getAlertVariant()}>
        <div className={getIconColor()}>{getIcon()}</div>
        <AlertDescription className="space-y-3">
          <p>{errorState.message}</p>

          {errorState.fallbackSent && (
            <p className="text-sm text-green-700 bg-green-50 p-2 rounded">
              ✓ Your information has been sent via email as a backup.
            </p>
          )}

          {retryMessage && <p className="text-sm text-gray-600">{retryMessage}</p>}

          {showRetryButton && onRetry && (
            <div className="flex gap-2 pt-2">
              <Button
                onClick={onRetry}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-3 w-3" />
                Try Again
              </Button>
            </div>
          )}

          {showContactInfo && (
            <div className="border-t pt-3 mt-3">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Need immediate assistance? Contact us directly:
              </p>

              <div className="flex flex-col sm:flex-row gap-2">
                <a
                  href="mailto:support@humaneers.dev"
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-blue-700 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                >
                  <Mail className="h-3 w-3" />
                  support@humaneers.dev
                </a>

                <a
                  href="tel:+1-555-0123"
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-blue-700 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                >
                  <Phone className="h-3 w-3" />
                  Emergency Support
                </a>
              </div>
            </div>
          )}

          {errorState.submissionId && (
            <p className="text-xs text-gray-500 pt-2 border-t">
              Reference ID: {errorState.submissionId.slice(-8)}
            </p>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
}
