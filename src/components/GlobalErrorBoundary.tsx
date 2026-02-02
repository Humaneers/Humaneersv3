"use client";

// Extend Window interface for Datadog RUM
declare global {
  interface Window {
    DD_RUM?: {
      addError: (error: Error, context?: any) => void;
      addAction: (name: string, context?: any) => void;
    };
  }
}

import { Component, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Mail, Phone } from "lucide-react";
import { Button } from "./ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorId?: string;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    return {
      hasError: true,
      error,
      errorId,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error with context
    this.logError(error, errorInfo);

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  private logError = (error: Error, errorInfo: React.ErrorInfo) => {
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      errorId: this.state.errorId,
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== "undefined" ? window.navigator.userAgent : "unknown",
      url: typeof window !== "undefined" ? window.location.href : "unknown",
    };

    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("GlobalErrorBoundary caught an error:", errorData);
    }

    // Send to monitoring service in production
    if (process.env.NODE_ENV === "production" && typeof window !== "undefined") {
      try {
        // Send to Datadog or other monitoring service
        if (window.DD_RUM) {
          window.DD_RUM.addError(error, {
            errorId: this.state.errorId,
            componentStack: errorInfo.componentStack,
          });
        }

        // Also log to console for server-side logging
        console.error("Production Error:", errorData);
      } catch (loggingError) {
        console.error("Failed to log error to monitoring service:", loggingError);
      }
    }
  };

  handleReload = () => {
    window.location.reload();
  };

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorId: undefined });
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-brand-cream flex items-center justify-center p-6">
          <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>

            <h1 className="text-2xl font-bold text-brand-oxford mb-3">Something went wrong</h1>

            <p className="text-brand-slate mb-6">
              We apologize for the inconvenience. Our team has been notified and is working to
              resolve this issue.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Button onClick={this.handleRetry} variant="outline" className="flex-1">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>

              <Button
                onClick={this.handleReload}
                className="flex-1 bg-brand-oxford hover:bg-brand-oxford-muted text-white"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Page
              </Button>
            </div>

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

            {this.state.errorId && (
              <p className="text-xs text-gray-500 mt-4">Error ID: {this.state.errorId}</p>
            )}

            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm font-medium text-red-600 mb-2">
                  Development Error Details
                </summary>
                <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto max-h-40 text-red-600 whitespace-pre-wrap">
                  {this.state.error.message}
                  {this.state.error.stack && `\n\nStack trace:\n${this.state.error.stack}`}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
