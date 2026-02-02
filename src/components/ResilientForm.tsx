"use client";

import { ReactNode, useState } from "react";
import { FormErrorBoundary } from "./FormErrorBoundary";
import { FormErrorDisplay } from "./FormErrorDisplay";
import { FormSuccessDisplay } from "./FormSuccessDisplay";
import { useFormErrorHandling } from "@/hooks/useFormErrorHandling";

interface ResilientFormProps {
  children: ReactNode;
  onSubmit: (data: any) => Promise<any>;
  formData: any;
  formType: "sales" | "support" | "newsletter";
  className?: string;
  enableQueue?: boolean;
  enableEmailFallback?: boolean;
  priority?: "high" | "medium" | "low";
  successMessage?: string;
}

export function ResilientForm({
  children,
  onSubmit,
  formData,
  formType,
  className = "",
  enableQueue = true,
  enableEmailFallback = true,
  priority = "medium",
  successMessage,
}: ResilientFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [successData, setSuccessData] = useState<{
    queued?: boolean;
    submissionId?: string;
    fallbackSent?: boolean;
  }>({});

  const {
    errorState,
    isSubmitting,
    clearError,
    submitWithErrorHandling,
    getErrorMessage,
    getRetryMessage,
    shouldShowRetryButton,
    shouldShowContactInfo,
    getProgressiveErrorSeverity,
  } = useFormErrorHandling({
    enableQueue,
    enableEmailFallback,
    priority,
  });

  const handleSubmit = async () => {
    const result = await submitWithErrorHandling(() => onSubmit(formData), formData, formType);

    if (result && (result.success || result.queued)) {
      setIsSuccess(true);
      setSuccessData({
        queued: result.queued,
        submissionId: result.submissionId,
        fallbackSent: result.fallbackSent,
      });
    }
  };

  const handleRetry = () => {
    clearError();
    handleSubmit();
  };

  if (isSuccess) {
    return (
      <div className={className}>
        <FormSuccessDisplay
          type={formType}
          queued={successData.queued}
          submissionId={successData.submissionId}
          fallbackSent={successData.fallbackSent}
          customMessage={successMessage}
        />
      </div>
    );
  }

  return (
    <FormErrorBoundary
      fallbackTitle="Form Error"
      fallbackDescription="There was an issue with the form. Please try again or contact us directly."
    >
      <div className={className}>
        {/* Error Display */}
        {errorState.type && (
          <div className="mb-6">
            <FormErrorDisplay
              errorState={{
                ...errorState,
                message: getErrorMessage(),
              }}
              onRetry={handleRetry}
              showRetryButton={shouldShowRetryButton()}
              showContactInfo={shouldShowContactInfo()}
              retryMessage={getRetryMessage()}
              severity={getProgressiveErrorSeverity()}
            />
          </div>
        )}

        {/* Form Content */}
        <div className={isSubmitting ? "opacity-50 pointer-events-none" : ""}>
          {typeof children === "function"
            ? (children as any)({
                onSubmit: handleSubmit,
                isSubmitting,
                hasError: !!errorState.type,
              })
            : children}
        </div>
      </div>
    </FormErrorBoundary>
  );
}
