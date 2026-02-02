/**
 * Form Submission Queue System
 * Handles offline form submissions with automatic retry and persistence
 */

export interface QueuedSubmission {
  id: string;
  data: any;
  type: "sales" | "support" | "newsletter";
  timestamp: number;
  retryCount: number;
  maxRetries: number;
  nextRetryTime: number;
  lastError?: string;
  priority: "high" | "medium" | "low";
}

export interface SubmissionResult {
  success: boolean;
  queued: boolean;
  submissionId?: string;
  error?: string;
  fallbackSent?: boolean;
}

export class FormSubmissionQueue {
  private static instance: FormSubmissionQueue;
  private queue: QueuedSubmission[] = [];
  private isProcessing = false;
  private processingInterval: NodeJS.Timeout | null = null;
  private readonly STORAGE_KEY = "humaneers_form_queue";
  private readonly PROCESSING_INTERVAL = 30000; // 30 seconds
  private readonly MAX_QUEUE_SIZE = 100;

  private constructor() {
    this.loadQueue();
    this.startProcessing();

    // Listen for online/offline events
    if (typeof window !== "undefined") {
      window.addEventListener("online", this.handleOnline.bind(this));
      window.addEventListener("offline", this.handleOffline.bind(this));
    }
  }

  static getInstance(): FormSubmissionQueue {
    if (!FormSubmissionQueue.instance) {
      FormSubmissionQueue.instance = new FormSubmissionQueue();
    }
    return FormSubmissionQueue.instance;
  }

  /**
   * Submit form data with automatic fallback to queue if primary submission fails
   */
  async submitWithFallback(
    data: any,
    type: "sales" | "support" | "newsletter",
    options: {
      priority?: "high" | "medium" | "low";
      maxRetries?: number;
      sendEmailFallback?: boolean;
    } = {}
  ): Promise<SubmissionResult> {
    const { priority = "medium", maxRetries = 3, sendEmailFallback = true } = options;

    try {
      // Attempt primary submission
      const result = await this.submitToZoho(data, type);

      return {
        success: true,
        queued: false,
        submissionId: result.id || "success",
      };
    } catch (error) {
      console.warn(`Primary submission failed for ${type}:`, error);

      // Queue for retry
      const submissionId = this.queueSubmission(data, type, {
        priority,
        maxRetries,
      });

      // Attempt email fallback if enabled
      let fallbackSent = false;
      if (sendEmailFallback) {
        try {
          await this.sendEmailFallback(data, type);
          fallbackSent = true;
        } catch (fallbackError) {
          console.error("Email fallback also failed:", fallbackError);
        }
      }

      return {
        success: false,
        queued: true,
        submissionId,
        error: error instanceof Error ? error.message : "Unknown error",
        fallbackSent,
      };
    }
  }

  /**
   * Queue a submission for later retry
   */
  private queueSubmission(
    data: any,
    type: "sales" | "support" | "newsletter",
    options: {
      priority?: "high" | "medium" | "low";
      maxRetries?: number;
    } = {}
  ): string {
    const { priority = "medium", maxRetries = 3 } = options;

    // Check queue size limit
    if (this.queue.length >= this.MAX_QUEUE_SIZE) {
      // Remove oldest low priority items
      this.queue = this.queue
        .filter((item) => item.priority !== "low")
        .slice(0, this.MAX_QUEUE_SIZE - 1);
    }

    const submission: QueuedSubmission = {
      id: this.generateSubmissionId(),
      data,
      type,
      timestamp: Date.now(),
      retryCount: 0,
      maxRetries,
      nextRetryTime: Date.now() + this.calculateBackoffDelay(0),
      priority,
    };

    this.queue.push(submission);
    this.saveQueue();

    console.log(`Queued ${type} submission:`, submission.id);
    return submission.id;
  }

  /**
   * Process queued submissions
   */
  async processQueue(): Promise<void> {
    if (this.isProcessing || this.queue.length === 0) {
      return;
    }

    this.isProcessing = true;
    const now = Date.now();

    // Sort by priority and retry time
    const readySubmissions = this.queue
      .filter((submission) => submission.nextRetryTime <= now)
      .sort((a, b) => {
        // Priority order: high > medium > low
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
        if (priorityDiff !== 0) return priorityDiff;

        // Then by timestamp (older first)
        return a.timestamp - b.timestamp;
      });

    for (const submission of readySubmissions) {
      try {
        await this.retrySubmission(submission);
      } catch (error) {
        console.error(`Failed to retry submission ${submission.id}:`, error);
      }
    }

    this.isProcessing = false;
  }

  /**
   * Retry a specific submission
   */
  private async retrySubmission(submission: QueuedSubmission): Promise<void> {
    try {
      await this.submitToZoho(submission.data, submission.type);

      // Success - remove from queue
      this.removeFromQueue(submission.id);
      console.log(`Successfully retried submission ${submission.id}`);
    } catch (error) {
      submission.retryCount++;
      submission.lastError = error instanceof Error ? error.message : "Unknown error";

      if (submission.retryCount >= submission.maxRetries) {
        // Max retries reached - remove from queue
        this.removeFromQueue(submission.id);
        console.error(`Max retries reached for submission ${submission.id}, removing from queue`);

        // Send final email notification
        try {
          await this.sendEmailFallback(submission.data, submission.type, {
            isRetryFailure: true,
            retryCount: submission.retryCount,
          });
        } catch (emailError) {
          console.error("Final email fallback failed:", emailError);
        }
      } else {
        // Schedule next retry with exponential backoff
        submission.nextRetryTime = Date.now() + this.calculateBackoffDelay(submission.retryCount);
        this.saveQueue();
        console.log(
          `Retry ${submission.retryCount}/${submission.maxRetries} failed for ${submission.id}, next retry in ${this.calculateBackoffDelay(submission.retryCount)}ms`
        );
      }
    }
  }

  /**
   * Submit data to Zoho services
   */
  private async submitToZoho(data: any, type: "sales" | "support" | "newsletter"): Promise<any> {
    // Dynamic import to avoid circular dependencies
    const { createLead, createMarketingContact } = await import("./zoho/crm");
    const { createTicket } = await import("./zoho/desk");

    switch (type) {
      case "sales":
        return await createLead(data);
      case "support":
        return await createTicket(data);
      case "newsletter":
        return await createMarketingContact(data);
      default:
        throw new Error(`Unknown submission type: ${type}`);
    }
  }

  /**
   * Send email fallback notification
   */
  private async sendEmailFallback(
    data: any,
    type: "sales" | "support" | "newsletter",
    options: {
      isRetryFailure?: boolean;
      retryCount?: number;
    } = {}
  ): Promise<void> {
    try {
      const { EmailFallbackService } = await import("./EmailFallbackService");
      const emailService = EmailFallbackService.getInstance();

      const fallbackData = {
        formType: type,
        formData: data,
        errorContext: {
          isRetryFailure: options.isRetryFailure,
          retryCount: options.retryCount,
          submissionId: this.generateSubmissionId(),
        },
        timestamp: new Date().toISOString(),
        userAgent: typeof window !== "undefined" ? window.navigator.userAgent : undefined,
        referrer: typeof window !== "undefined" ? document.referrer : undefined,
      };

      const success = await emailService.sendFallbackNotification(fallbackData);

      if (success) {
        console.log(`Email fallback sent successfully for ${type} submission`);
      } else {
        console.error(`Email fallback failed for ${type} submission`);
      }
    } catch (error) {
      console.error("Failed to send email fallback:", error);
    }
  }

  /**
   * Calculate exponential backoff delay
   */
  private calculateBackoffDelay(retryCount: number): number {
    // Exponential backoff: 1s, 2s, 4s, 8s, 16s, max 60s
    const baseDelay = 1000;
    const maxDelay = 60000;
    const delay = Math.min(baseDelay * Math.pow(2, retryCount), maxDelay);

    // Add jitter to prevent thundering herd
    const jitter = Math.random() * 0.1 * delay;
    return delay + jitter;
  }

  /**
   * Generate unique submission ID
   */
  private generateSubmissionId(): string {
    return `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Remove submission from queue
   */
  private removeFromQueue(id: string): void {
    this.queue = this.queue.filter((submission) => submission.id !== id);
    this.saveQueue();
  }

  /**
   * Load queue from localStorage
   */
  private loadQueue(): void {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        this.queue = JSON.parse(stored);
        console.log(`Loaded ${this.queue.length} queued submissions from storage`);
      }
    } catch (error) {
      console.error("Failed to load queue from storage:", error);
      this.queue = [];
    }
  }

  /**
   * Save queue to localStorage
   */
  private saveQueue(): void {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.queue));
    } catch (error) {
      console.error("Failed to save queue to storage:", error);
    }
  }

  /**
   * Start background processing
   */
  private startProcessing(): void {
    if (this.processingInterval) return;

    this.processingInterval = setInterval(() => {
      this.processQueue().catch((error) => {
        console.error("Queue processing error:", error);
      });
    }, this.PROCESSING_INTERVAL);
  }

  /**
   * Handle online event
   */
  private handleOnline(): void {
    console.log("Connection restored, processing queued submissions");
    this.processQueue();
  }

  /**
   * Handle offline event
   */
  private handleOffline(): void {
    console.log("Connection lost, submissions will be queued");
  }

  /**
   * Get queue statistics
   */
  getQueueStats(): {
    total: number;
    byType: Record<string, number>;
    byPriority: Record<string, number>;
    oldestSubmission?: number;
    newestSubmission?: number;
  } {
    const stats = {
      total: this.queue.length,
      byType: {} as Record<string, number>,
      byPriority: {} as Record<string, number>,
      oldestSubmission: undefined as number | undefined,
      newestSubmission: undefined as number | undefined,
    };

    if (this.queue.length > 0) {
      stats.oldestSubmission = Math.min(...this.queue.map((s) => s.timestamp));
      stats.newestSubmission = Math.max(...this.queue.map((s) => s.timestamp));
    }

    for (const submission of this.queue) {
      stats.byType[submission.type] = (stats.byType[submission.type] || 0) + 1;
      stats.byPriority[submission.priority] = (stats.byPriority[submission.priority] || 0) + 1;
    }

    return stats;
  }

  /**
   * Clear all queued submissions (for testing/admin use)
   */
  clearQueue(): void {
    this.queue = [];
    this.saveQueue();
    console.log("Queue cleared");
  }
}
