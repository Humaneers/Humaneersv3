/**
 * Datadog RUM (Real User Monitoring) SDK Integration
 *
 * This module provides a type-safe wrapper around the Datadog Browser RUM SDK
 * with enterprise-grade configuration, privacy controls, and error handling.
 *
 * @see https://docs.datadoghq.com/real_user_monitoring/browser/
 */

import { datadogRum } from "@datadog/browser-rum";

/**
 * Datadog RUM Configuration
 *
 * Environment variables are prefixed with NEXT_PUBLIC_ to be accessible in the browser.
 * All values are optional with sensible defaults for graceful degradation.
 */
interface DatadogConfig {
  applicationId: string;
  clientToken: string;
  site: string;
  service: string;
  env: string;
  version: string;
  sessionSampleRate: number;
  sessionReplaySampleRate: number;
  trackUserInteractions: boolean;
  trackResources: boolean;
  trackLongTasks: boolean;
  defaultPrivacyLevel: "allow" | "mask" | "mask-user-input";
}

/**
 * Load Datadog configuration from environment variables
 */
function getDatadogConfig(): DatadogConfig | null {
  const applicationId = process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID;
  const clientToken = process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN;

  // Datadog is optional - gracefully degrade if not configured
  if (!applicationId || !clientToken) {
    if (process.env.NODE_ENV === "development") {
      console.info(
        "[Datadog] RUM not configured. Set NEXT_PUBLIC_DATADOG_APPLICATION_ID and NEXT_PUBLIC_DATADOG_CLIENT_TOKEN to enable monitoring."
      );
    }
    return null;
  }

  return {
    applicationId,
    clientToken,
    site: process.env.NEXT_PUBLIC_DATADOG_SITE || "datadoghq.com",
    service: process.env.NEXT_PUBLIC_DATADOG_SERVICE || "humaneers-website",
    env: process.env.NEXT_PUBLIC_DATADOG_ENV || process.env.NODE_ENV || "development",
    version: process.env.NEXT_PUBLIC_DATADOG_VERSION || "0.2.0",
    sessionSampleRate: parseInt(process.env.NEXT_PUBLIC_DATADOG_SAMPLE_RATE || "100", 10),
    sessionReplaySampleRate: 0, // Disabled for privacy - no session replay
    trackUserInteractions: process.env.NEXT_PUBLIC_DATADOG_TRACK_SESSIONS === "true",
    trackResources: process.env.NEXT_PUBLIC_DATADOG_TRACK_RESOURCES === "true",
    trackLongTasks: process.env.NEXT_PUBLIC_DATADOG_TRACK_LONG_TASKS === "true",
    defaultPrivacyLevel: "mask-user-input", // Mask PII by default
  };
}

/**
 * Initialize Datadog RUM SDK
 *
 * This should be called once when the application starts, and only if the user
 * has consented to analytics tracking.
 *
 * @param userConsent - Whether the user has consented to tracking
 */
export function initDatadog(userConsent: boolean): void {
  const config = getDatadogConfig();

  // Skip initialization if not configured or user has not consented
  if (!config) {
    return;
  }

  if (!userConsent) {
    if (process.env.NODE_ENV === "development") {
      console.info("[Datadog] User has not consented to tracking. RUM disabled.");
    }
    return;
  }

  try {
    datadogRum.init({
      applicationId: config.applicationId,
      clientToken: config.clientToken,
      site: config.site,
      service: config.service,
      env: config.env,
      version: config.version,

      // Sampling configuration
      sessionSampleRate: config.sessionSampleRate,
      sessionReplaySampleRate: config.sessionReplaySampleRate,

      // Feature flags
      trackUserInteractions: config.trackUserInteractions,
      trackResources: config.trackResources,
      trackLongTasks: config.trackLongTasks,

      // Privacy: Mask user input by default to prevent PII leakage
      defaultPrivacyLevel: config.defaultPrivacyLevel,

      // Enhanced error tracking

      // Allow tracing across domains (for Zoho integrations)
      allowedTracingUrls: [
        { match: "https://humaneers.dev", propagatorTypes: ["datadog"] },
        { match: /https:\/\/.*\.zoho\.com/, propagatorTypes: ["datadog"] },
      ],

      // Before send hook to filter sensitive data
      beforeSend: (event) => {
        // Redact any remaining PII patterns (emails, phone numbers, SSNs)
        if (event.type === "error" || event.type === "resource") {
          const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
          const phoneRegex = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g;
          const ssnRegex = /\b\d{3}-\d{2}-\d{4}\b/g;

          if ((event.error as any)?.message) {
            (event.error as any).message = (event.error as any).message
              .replace(emailRegex, "[EMAIL_REDACTED]")
              .replace(phoneRegex, "[PHONE_REDACTED]")
              .replace(ssnRegex, "[SSN_REDACTED]");
          }
        }

        return true; // Allow event to be sent
      },
    });

    // Start session recording
    datadogRum.startSessionReplayRecording();

    if (process.env.NODE_ENV === "development") {
      console.info("[Datadog] RUM initialized successfully", {
        service: config.service,
        env: config.env,
        version: config.version,
      });
    }
  } catch (error) {
    console.error("[Datadog] Failed to initialize RUM:", error);
  }
}

/**
 * Set user context for RUM sessions
 *
 * This allows correlating RUM data with specific users (without PII).
 * Use hashed IDs or session tokens, never raw email addresses.
 *
 * @param userId - Anonymous user identifier (e.g., session hash)
 * @param attributes - Additional non-PII user attributes
 */
export function setDatadogUser(
  userId: string,
  attributes?: Record<string, string | number | boolean>
): void {
  try {
    datadogRum.setUser({
      id: userId,
      ...attributes,
    });
  } catch (error) {
    console.error("[Datadog] Failed to set user context:", error);
  }
}

/**
 * Clear user context (on logout)
 */
export function clearDatadogUser(): void {
  try {
    datadogRum.clearUser();
  } catch (error) {
    console.error("[Datadog] Failed to clear user context:", error);
  }
}

/**
 * Track custom action (e.g., button clicks, form submissions)
 *
 * @param name - Action name (e.g., "form_submit", "cta_click")
 * @param context - Additional context data
 */
export function trackDatadogAction(name: string, context?: Record<string, unknown>): void {
  try {
    datadogRum.addAction(name, context);
  } catch (error) {
    console.error("[Datadog] Failed to track action:", error);
  }
}

/**
 * Track custom error
 *
 * @param error - Error object or message
 * @param context - Additional context data
 */
export function trackDatadogError(error: Error | string, context?: Record<string, unknown>): void {
  try {
    datadogRum.addError(error, context);
  } catch (error) {
    console.error("[Datadog] Failed to track error:", error);
  }
}

/**
 * Add custom timing metric
 *
 * @param name - Metric name (e.g., "zoho_api_response_time")
 * @param value - Time in milliseconds
 */
export function trackDatadogTiming(name: string, value: number): void {
  try {
    datadogRum.addTiming(name, value);
  } catch (error) {
    console.error("[Datadog] Failed to track timing:", error);
  }
}

/**
 * Add feature flag context
 *
 * @param flags - Feature flags (e.g., { new_pricing_page: true })
 */
export function setDatadogFeatureFlags(flags: Record<string, boolean>): void {
  try {
    datadogRum.addFeatureFlagEvaluation("feature_flags", flags);
  } catch (error) {
    console.error("[Datadog] Failed to set feature flags:", error);
  }
}

/**
 * Type-safe exports for use in components
 */
export const datadog = {
  init: initDatadog,
  setUser: setDatadogUser,
  clearUser: clearDatadogUser,
  trackAction: trackDatadogAction,
  trackError: trackDatadogError,
  trackTiming: trackDatadogTiming,
  setFeatureFlags: setDatadogFeatureFlags,
};
