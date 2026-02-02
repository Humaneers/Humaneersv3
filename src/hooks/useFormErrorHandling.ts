"use client";

import { useState, useCallback } from "react";
import { FormSubmissionQueue } from "@/lib/FormSubmissionQueue";

export type FormErrorType =
  | "network"
  | "validation"
  | "server"
  | "timeout"
  | "circuit_breaker"
  | null;

export interface FormErrorState {
  type: FormErrorType;
  message: string;
  retryable: boolean;
  submissionId?: string;
  fallbackSent?: boolean;
  showContactInfo?: boolean;
}

export interface FormErrorHandlingOptions {
  enableQueue?: boolean;
  enableEmailFallback?: boolean;
  maxRetries?: number;
  priority?: "high" | "medium" | "low";
}

export function useFormErrorHandling(options: FormErrorHandlingOptions = {}) {
  const {
    enableQueue = true,
    enableEmailFallback = true,
    maxRetries = 3,
    priority = "medium",
  } = options;

  const [errorState, setErrorState] = useState<FormErrorState>({
    type: null,
    message: "",
    retryable: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);

  const clearError = useCallback(() => {
    setErrorState({
      type: null,
      message: "",
      retryable: false,
    });
  }, []);

  const handleSubmissionError = useCallback((error: Error, context?: any) => {
    console.error("Form submission error:", error, context);

    let errorType: FormErrorType = "server";
    let message = "An unexpected error occurred. Please try again.";
    let retryable = true;
    let showContactInfo = false;

    // Categorize error types
    if (error.name === "NetworkError" || error.message.includes("fetch")) {
      errorType = "network";
      message =
        "Connection issue detected. Your form has been saved and will be submitted when connection is restored.";
      showContactInfo = true;
    } else if (error.name === "TimeoutError") {
      errorType = "timeout";
      message =
        "The request timed out. Your form has been saved and will be retried automatically.";
      showContactInfo = true;
    } else if (error.name === "CircuitBreakerError") {
      errorType = "circuit_breaker";
      message =
        "Our systems are temporarily unavailable. Your form has been saved and will be processed when service is restored.";
      showContactInfo = true;
      retryable = false;
    } else if (error.name === "ValidationError" || error.message.includes("validation")) {
      errorType = "validation";
      message = "Please check the highlighted fields and try again.";
      showContactInfo = false;
    } else if (error.name === "AuthError") {
      errorType = "server";
      message = "Authentication issue detected. We've been notified and your form has been saved.";
      showContactInfo = true;
      retryable = false;
    } else if (error.name === "RateLimitError") {
      errorType = "server";
      message = "Too many requests. Please wait a moment before trying again.";
      retryable = true;
    } else {
      // Generic server error
      message =
        "We're experiencing technical difficulties. Your message has been saved and our team has been notified.";
      showContactInfo = true;
    }

    setErrorState({
      type: errorType,
      message,
      retryable,
      showContactInfo,
    });
  }, []);

  const submitWithErrorHandling = useCallback(
    async (
      submitFunction: () => Promise<any>,
      formData: any,
      formType: "sales" | "support" | "newsletter"
    ) => {
      if (isSubmitting) return;

      setIsSubmitting(true);
      setSubmitCount((prev) => prev + 1);
      clearError();

      try {
        // Try direct submission first
        const result = await submitFunction();
        setIsSubmitting(false);
        return { success: true, result };
      } catch (error) {
        const err = error as Error;

        // Handle with queue if enabled
        if (enableQueue) {
          try {
            const queueInstance = FormSubmissionQueue.getInstance();
            const queueResult = await queueInstance.submitWithFallback(formData, formType, {
              priority,
              maxRetries,
              sendEmailFallback: enableEmailFallback,
            });

            setErrorState((prev) => ({
              ...prev,
              submissionId: queueResult.submissionId,
              fallbackSent: queueResult.fallbackSent,
            }));

            if (queueResult.queued) {
              handleSubmissionError(err);
            }

            setIsSubmitting(false);
            return {
              success: queueResult.success,
              queued: queueResult.queued,
              submissionId: queueResult.submissionId,
              fallbackSent: queueResult.fallbackSent,
            };
          } catch (queueError) {
            console.error("Queue submission also failed:", queueError);
            handleSubmissionError(err);
          }
        } else {
          handleSubmissionError(err);
        }

        setIsSubmitting(false);
        return { success: false, error: err };
      }
    },
    [
      isSubmitting,
      enableQueue,
      enableEmailFallback,
      maxRetries,
      priority,
      handleSubmissionError,
      clearError,
    ]
  );

  const getErrorMessage = useCallback(() => {
    if (!errorState.type) return "";

    let baseMessage = errorState.message;

    // Add contextual information
    if (errorState.fallbackSent) {
      baseMessage += " We've also sent your information via email as a backup.";
    }

    if (errorState.submissionId) {
      baseMessage += ` Reference ID: ${errorState.submissionId.slice(-8)}`;
    }

    return baseMessage;
  }, [errorState]);

  const getRetryMessage = useCallback(() => {
    if (!errorState.retryable) return "";

    if (submitCount === 1) {
      return "You can try submitting again, or contact us directly using the information below.";
    } else if (submitCount === 2) {
      return "If you continue to experience issues, please contact us directly.";
    } else {
      return "Please contact us directly using the information below.";
    }
  }, [errorState.retryable, submitCount]);

  const shouldShowRetryButton = useCallback(() => {
    return errorState.retryable && submitCount < 3;
  }, [errorState.retryable, submitCount]);

  const shouldShowContactInfo = useCallback(() => {
    return errorState.showContactInfo || submitCount >= 2;
  }, [errorState.showContactInfo, submitCount]);

  const getProgressiveErrorSeverity = useCallback((): "info" | "warning" | "error" => {
    if (submitCount === 1) return "info";
    if (submitCount === 2) return "warning";
    return "error";
  }, [submitCount]);

  return {
    errorState,
    isSubmitting,
    submitCount,
    clearError,
    handleSubmissionError,
    submitWithErrorHandling,
    getErrorMessage,
    getRetryMessage,
    shouldShowRetryButton,
    shouldShowContactInfo,
    getProgressiveErrorSeverity,
  };
}
