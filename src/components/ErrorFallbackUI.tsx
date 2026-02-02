"use client";

import { AlertTriangle, RefreshCw, Mail, Phone, Home, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface ErrorFallbackUIProps {
  error?: Error;
  errorId?: string;
  title?: string;
  description?: string;
  showContactInfo?: boolean;
  showRetry?: boolean;
  showNavigation?: boolean;
  onRetry?: () => void;
  className?: string;
}

export function ErrorFallbackUI({
  error,
  errorId,
  title = "Something went wrong",
  description = "We apologize for the inconvenience. Our team has been notified and is working to resolve this issue.",
  showContactInfo = true,
  showRetry = true,
  showNavigation = true,
  onRetry,
  className = "",
}: ErrorFallbackUIProps) {
  const router = useRouter();

  const handleReload = () => {
    window.location.reload();
  };

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      handleReload();
    }
  };

  const handleGoHome = () => {
    router.push("/");
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className={`bg-brand-cream flex items-center justify-center p-6 ${className}`}>
      <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>

        <h1 className="text-2xl font-bold text-brand-oxford mb-3">{title}</h1>

        <p className="text-brand-slate mb-6">{description}</p>

        {showRetry && (
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Button onClick={handleRetry} variant="outline" className="flex-1">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>

            <Button
              onClick={handleReload}
              className="flex-1 bg-brand-oxford hover:bg-brand-oxford-muted text-white"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Page
            </Button>
          </div>
        )}

        {showNavigation && (
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Button onClick={handleGoBack} variant="outline" className="flex-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>

            <Button onClick={handleGoHome} variant="outline" className="flex-1">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </div>
        )}

        {showContactInfo && (
          <div className="border-t pt-6">
            <p className="text-sm text-brand-slate mb-4">
              Need immediate assistance? Contact us directly:
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:support@humaneers.dev"
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-brand-oxford hover:text-brand-oxford-muted transition-colors"
              >
                <Mail className="w-4 h-4" />
                support@humaneers.dev
              </a>

              <a
                href="tel:+1-555-0123"
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-brand-oxford hover:text-brand-oxford-muted transition-colors"
              >
                <Phone className="w-4 h-4" />
                Emergency Support
              </a>
            </div>
          </div>
        )}

        {errorId && <p className="text-xs text-gray-500 mt-4">Error ID: {errorId}</p>}

        {process.env.NODE_ENV === "development" && error && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm font-medium text-red-600 mb-2">
              Development Error Details
            </summary>
            <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto max-h-40 text-red-600 whitespace-pre-wrap">
              {error.message}
              {error.stack && `\n\nStack trace:\n${error.stack}`}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
