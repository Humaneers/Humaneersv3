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
import { ErrorFallbackUI } from "./ErrorFallbackUI";

interface Props {
  children: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  fallbackTitle?: string;
  fallbackDescription?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorId?: string;
}

export class FormErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    const errorId = `form_error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    return {
      hasError: true,
      error,
      errorId,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log form-specific error
    const errorData = {
      type: "form_error",
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      errorId: this.state.errorId,
      timestamp: new Date().toISOString(),
      url: typeof window !== "undefined" ? window.location.href : "unknown",
    };

    if (process.env.NODE_ENV === "development") {
      console.error("FormErrorBoundary caught an error:", errorData);
    }

    // Send to monitoring service
    if (process.env.NODE_ENV === "production" && typeof window !== "undefined") {
      try {
        if (window.DD_RUM) {
          window.DD_RUM.addError(error, {
            errorId: this.state.errorId,
            errorType: "form_error",
            componentStack: errorInfo.componentStack,
          });
        }
        console.error("Form Error:", errorData);
      } catch (loggingError) {
        console.error("Failed to log form error:", loggingError);
      }
    }

    // Call custom error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorId: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallbackUI
          error={this.state.error}
          errorId={this.state.errorId}
          title={this.props.fallbackTitle || "Form Error"}
          description={
            this.props.fallbackDescription ||
            "There was an issue with the form. Please try again or contact us directly."
          }
          showContactInfo={true}
          showRetry={true}
          showNavigation={false}
          onRetry={this.handleRetry}
          className="min-h-[400px]"
        />
      );
    }

    return this.props.children;
  }
}
