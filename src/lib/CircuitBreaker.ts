/**
 * Circuit Breaker Pattern Implementation
 * Prevents cascading failures by monitoring external service calls
 */

// Extend Window interface for Datadog RUM
declare global {
  interface Window {
    DD_RUM?: {
      addError: (error: Error, context?: any) => void;
      addAction: (name: string, context?: any) => void;
    };
  }
}

export type CircuitBreakerState = "CLOSED" | "OPEN" | "HALF_OPEN";

export interface CircuitBreakerConfig {
  failureThreshold: number;
  recoveryTimeout: number;
  monitoringWindow: number;
  expectedErrors?: string[];
}

export interface CircuitBreakerStats {
  state: CircuitBreakerState;
  failures: number;
  successes: number;
  lastFailureTime: number;
  lastSuccessTime: number;
  totalRequests: number;
  failureRate: number;
}

export class CircuitBreaker {
  private state: CircuitBreakerState = "CLOSED";
  private failures = 0;
  private successes = 0;
  private lastFailureTime = 0;
  private lastSuccessTime = 0;
  private totalRequests = 0;
  private requestHistory: Array<{ timestamp: number; success: boolean }> = [];

  constructor(
    private name: string,
    private config: CircuitBreakerConfig = {
      failureThreshold: 5,
      recoveryTimeout: 60000, // 1 minute
      monitoringWindow: 300000, // 5 minutes
      expectedErrors: ["NetworkError", "TimeoutError"],
    }
  ) {}

  /**
   * Execute an operation with circuit breaker protection
   */
  async execute<T>(operation: () => Promise<T>): Promise<T> {
    this.totalRequests++;

    // Check if circuit should be opened
    if (this.state === "OPEN") {
      if (this.shouldAttemptReset()) {
        this.state = "HALF_OPEN";
        console.log(`[CircuitBreaker:${this.name}] Attempting reset - state: HALF_OPEN`);
      } else {
        const error = new Error(
          `Circuit breaker is OPEN for ${this.name}. Service temporarily unavailable.`
        );
        error.name = "CircuitBreakerError";
        this.logStateChange("OPEN", "Request rejected - circuit open");
        throw error;
      }
    }

    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure(error as Error);
      throw error;
    }
  }

  /**
   * Handle successful operation
   */
  private onSuccess(): void {
    this.successes++;
    this.lastSuccessTime = Date.now();
    this.addToHistory(true);

    if (this.state === "HALF_OPEN") {
      this.state = "CLOSED";
      this.failures = 0;
      this.logStateChange("CLOSED", "Reset successful");
    }
  }

  /**
   * Handle failed operation
   */
  private onFailure(error: Error): void {
    this.failures++;
    this.lastFailureTime = Date.now();
    this.addToHistory(false);

    // Don't count expected errors towards circuit breaking
    if (this.config.expectedErrors?.includes(error.name)) {
      return;
    }

    if (this.state === "HALF_OPEN") {
      this.state = "OPEN";
      this.logStateChange("OPEN", `Reset failed: ${error.message}`);
    } else if (this.failures >= this.config.failureThreshold) {
      this.state = "OPEN";
      this.logStateChange("OPEN", `Threshold exceeded: ${this.failures} failures`);
    }

    // Send monitoring alert
    this.sendMonitoringAlert(error);
  }

  /**
   * Check if circuit breaker should attempt reset
   */
  private shouldAttemptReset(): boolean {
    return Date.now() - this.lastFailureTime > this.config.recoveryTimeout;
  }

  /**
   * Add request to history for monitoring
   */
  private addToHistory(success: boolean): void {
    const now = Date.now();
    this.requestHistory.push({ timestamp: now, success });

    // Clean old entries outside monitoring window
    this.requestHistory = this.requestHistory.filter(
      (entry) => now - entry.timestamp < this.config.monitoringWindow
    );
  }

  /**
   * Get current circuit breaker statistics
   */
  getStats(): CircuitBreakerStats {
    const recentRequests = this.requestHistory.length;
    const recentFailures = this.requestHistory.filter((r) => !r.success).length;
    const failureRate = recentRequests > 0 ? (recentFailures / recentRequests) * 100 : 0;

    return {
      state: this.state,
      failures: this.failures,
      successes: this.successes,
      lastFailureTime: this.lastFailureTime,
      lastSuccessTime: this.lastSuccessTime,
      totalRequests: this.totalRequests,
      failureRate: Math.round(failureRate * 100) / 100,
    };
  }

  /**
   * Force circuit breaker to specific state (for testing/manual intervention)
   */
  forceState(state: CircuitBreakerState): void {
    const oldState = this.state;
    this.state = state;
    this.logStateChange(state, `Manually forced from ${oldState}`);
  }

  /**
   * Reset circuit breaker to initial state
   */
  reset(): void {
    this.state = "CLOSED";
    this.failures = 0;
    this.successes = 0;
    this.lastFailureTime = 0;
    this.lastSuccessTime = 0;
    this.requestHistory = [];
    this.logStateChange("CLOSED", "Manual reset");
  }

  /**
   * Log state changes for monitoring
   */
  private logStateChange(newState: CircuitBreakerState, reason: string): void {
    const logData = {
      circuitBreaker: this.name,
      state: newState,
      reason,
      stats: this.getStats(),
      timestamp: new Date().toISOString(),
    };

    console.log(`[CircuitBreaker:${this.name}] State changed to ${newState}: ${reason}`, logData);

    // Send to monitoring service in production
    if (process.env.NODE_ENV === "production" && typeof window !== "undefined") {
      try {
        if (window.DD_RUM) {
          window.DD_RUM.addAction("circuit_breaker_state_change", logData);
        }
      } catch (error) {
        console.error("Failed to log circuit breaker state change:", error);
      }
    }
  }

  /**
   * Send monitoring alert for failures
   */
  private sendMonitoringAlert(error: Error): void {
    if (process.env.NODE_ENV === "production" && typeof window !== "undefined") {
      try {
        if (window.DD_RUM) {
          window.DD_RUM.addError(error, {
            circuitBreaker: this.name,
            state: this.state,
            failures: this.failures,
            threshold: this.config.failureThreshold,
          });
        }
      } catch (monitoringError) {
        console.error("Failed to send circuit breaker monitoring alert:", monitoringError);
      }
    }
  }
}

/**
 * Circuit Breaker Manager for handling multiple circuit breakers
 */
export class CircuitBreakerManager {
  private static instance: CircuitBreakerManager;
  private circuitBreakers = new Map<string, CircuitBreaker>();

  static getInstance(): CircuitBreakerManager {
    if (!CircuitBreakerManager.instance) {
      CircuitBreakerManager.instance = new CircuitBreakerManager();
    }
    return CircuitBreakerManager.instance;
  }

  /**
   * Get or create a circuit breaker for a service
   */
  getCircuitBreaker(name: string, config?: CircuitBreakerConfig): CircuitBreaker {
    if (!this.circuitBreakers.has(name)) {
      this.circuitBreakers.set(name, new CircuitBreaker(name, config));
    }
    return this.circuitBreakers.get(name)!;
  }

  /**
   * Get all circuit breaker statistics
   */
  getAllStats(): Record<string, CircuitBreakerStats> {
    const stats: Record<string, CircuitBreakerStats> = {};
    for (const [name, breaker] of this.circuitBreakers) {
      stats[name] = breaker.getStats();
    }
    return stats;
  }

  /**
   * Reset all circuit breakers
   */
  resetAll(): void {
    for (const breaker of this.circuitBreakers.values()) {
      breaker.reset();
    }
  }
}
