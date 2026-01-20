"use client";

import { useState } from "react";
import { useContactModal } from "./providers/ContactModalProvider";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Check, AlertCircle, Loader2, Lock } from "lucide-react";

// --- Types ---
interface FormStatus {
  state: "idle" | "submitting" | "success" | "error";
  message?: string;
}

// --- Sales Form ---
function SalesForm() {
  const [status, setStatus] = useState<FormStatus>({ state: "idle" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // CRITICAL FIX: Prevent duplicate submissions
    if (status.state === "submitting") {
      return;
    }
    setStatus({ state: "submitting" });

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName")?.toString() || "",
      lastName: formData.get("lastName")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      phone: formData.get("phone")?.toString() || "",
      company: formData.get("company")?.toString() || "",
      description: formData.get("description")?.toString() || "",
      honeypot: formData.get("website_url_hp")?.toString() || "",
      source: "ContactModal",
      path: window.location.pathname,
    };

    // HIGH PRIORITY FIX: Validate required fields before API call
    if (!data.firstName || !data.lastName || !data.email || !data.description) {
      setStatus({
        state: "error",
        message: "Please fill in all required fields."
      });
      return;
    }

    try {
      const res = await fetch("/api/contact/sales", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));

        // Log error for debugging (will be sent to error tracking in production)
        console.error('[Sales Form Submission Error]', {
          status: res.status,
          error: errorData,
          timestamp: new Date().toISOString()
        });

        // Show user-appropriate message based on status
        if (res.status === 400) {
          throw new Error(errorData.error || "Please check your form and try again.");
        } else if (res.status === 429) {
          throw new Error("Too many requests. Please wait a moment and try again.");
        } else {
          throw new Error("Our systems are temporarily unavailable. Please email hello@humaneers.dev.");
        }
      }

      setStatus({ state: "success" });
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : "We encountered an issue. Please try again or email us directly at hello@humaneers.dev.";

      setStatus({
        state: "error",
        message,
      });
    }
  }

  if (status.state === "success") {
    return (
      <div
        className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in duration-300"
        role="status"
        aria-live="polite"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <Check className="w-8 h-8 text-green-600" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold text-brand-oxford mb-2">Message Received</h3>
        <p className="text-gray-600 max-w-xs mx-auto">
          Thanks for reaching out. A human from our team will review your inquiry and get back to
          you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      {status.state === "error" && (
        <Alert variant="destructive" role="alert" id="sales-form-error">
          <AlertCircle className="h-4 w-4" aria-hidden="true" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{status.message}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="firstName" className="text-sm font-medium text-brand-oxford">
            First Name <span className="text-red-600" aria-label="required">*</span>
          </label>
          <Input
            id="firstName"
            name="firstName"
            required
            aria-required="true"
            aria-invalid={status.state === "error"}
            aria-describedby={status.state === "error" ? "sales-form-error" : undefined}
            className="bg-gray-50"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="lastName" className="text-sm font-medium text-brand-oxford">
            Last Name <span className="text-red-600" aria-label="required">*</span>
          </label>
          <Input
            id="lastName"
            name="lastName"
            required
            aria-required="true"
            aria-invalid={status.state === "error"}
            aria-describedby={status.state === "error" ? "sales-form-error" : undefined}
            className="bg-gray-50"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="sales-email" className="text-sm font-medium text-brand-oxford">
          Work Email <span className="text-red-600" aria-label="required">*</span>
        </label>
        <Input
          id="sales-email"
          type="email"
          name="email"
          required
          aria-required="true"
          aria-invalid={status.state === "error"}
          aria-describedby={status.state === "error" ? "sales-form-error" : undefined}
          className="bg-gray-50"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="company" className="text-sm font-medium text-brand-oxford">
          Company / Organization (Optional)
        </label>
        <Input
          id="company"
          name="company"
          className="bg-gray-50"
          placeholder="Household or Company Name"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium text-brand-oxford">
          How can we help? <span className="text-red-600" aria-label="required">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          required
          aria-required="true"
          aria-invalid={status.state === "error"}
          aria-describedby={status.state === "error" ? "sales-form-error" : undefined}
          rows={4}
          className="flex w-full rounded-md border border-input bg-gray-50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Tell us about your project or challenge..."
        />
      </div>

      {/* Honeypot - Hidden */}
      <input
        type="text"
        name="website_url_hp"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <Button
        type="submit"
        disabled={status.state === "submitting"}
        className="w-full bg-brand-copper hover:bg-brand-copper-dark text-white font-semibold transform hover:-translate-y-0.5 transition-all"
      >
        {status.state === "submitting" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
            <span role="status" aria-live="polite">Sending...</span>
          </>
        ) : (
          "Start Conversation"
        )}
      </Button>

      <p className="text-xs text-center text-gray-400 flex items-center justify-center gap-1">
        <Lock className="w-3 h-3" aria-hidden="true" /> Secure Submission. 100% Confidential.
      </p>
    </form>
  );
}

// --- Support Form ---
function SupportForm() {
  const [status, setStatus] = useState<FormStatus>({ state: "idle" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // CRITICAL FIX: Prevent duplicate submissions
    if (status.state === "submitting") {
      return;
    }
    setStatus({ state: "submitting" });

    const formData = new FormData(e.currentTarget);
    const data = {
      contactName: formData.get("contactName")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      subject: formData.get("subject")?.toString() || "",
      description: formData.get("description")?.toString() || "",
      priority: formData.get("priority")?.toString() || "Medium",
      honeypot: formData.get("website_url_hp")?.toString() || "",
    };

    // HIGH PRIORITY FIX: Validate required fields before API call
    if (!data.contactName || !data.email || !data.subject || !data.description) {
      setStatus({
        state: "error",
        message: "Please fill in all required fields."
      });
      return;
    }

    try {
      const res = await fetch("/api/contact/support", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));

        console.error('[Support Form Submission Error]', {
          status: res.status,
          error: errorData,
          timestamp: new Date().toISOString()
        });

        if (res.status === 400) {
          throw new Error(errorData.error || "Please check your form and try again.");
        } else if (res.status === 429) {
          throw new Error("Too many requests. Please wait a moment and try again.");
        } else {
          throw new Error("Failed to create ticket. Please email support@humaneers.dev.");
        }
      }

      setStatus({ state: "success" });
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : "Failed to create ticket. Please email support@humaneers.dev.";

      setStatus({
        state: "error",
        message,
      });
    }
  }

  if (status.state === "success") {
    return (
      <div
        className="flex flex-col items-center justify-center py-12 text-center animate-in zoom-in-95 duration-300"
        role="status"
        aria-live="polite"
      >
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <Check className="w-8 h-8 text-blue-600" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold text-brand-oxford mb-2">Ticket Created</h3>
        <p className="text-gray-600 max-w-xs mx-auto">
          Your support request has been logged. You will receive a confirmation email shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      {status.state === "error" && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{status.message}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <label htmlFor="contactName" className="text-sm font-medium text-brand-oxford">
          Your Name <span className="text-red-600" aria-label="required">*</span>
        </label>
        <Input
          id="contactName"
          name="contactName"
          required
          aria-required="true"
          aria-invalid={status.state === "error"}
          aria-describedby={status.state === "error" ? "support-form-error" : undefined}
          className="bg-gray-50"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="support-email" className="text-sm font-medium text-brand-oxford">
          Email Address <span className="text-red-600" aria-label="required">*</span>
        </label>
        <Input
          id="support-email"
          type="email"
          name="email"
          required
          aria-required="true"
          aria-invalid={status.state === "error"}
          aria-describedby={status.state === "error" ? "support-form-error" : undefined}
          className="bg-gray-50"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="priority" className="text-sm font-medium text-brand-oxford">
          Priority
        </label>
        <select
          id="priority"
          name="priority"
          defaultValue="Medium"
          className="flex h-10 w-full rounded-md border border-input bg-gray-50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-oxford focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="Low">Low - General Question</option>
          <option value="Medium">
            Medium - Issue with Service
          </option>
          <option value="High">High - Critical / Outage</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium text-brand-oxford">
          Subject <span className="text-red-600" aria-label="required">*</span>
        </label>
        <Input
          id="subject"
          name="subject"
          required
          aria-required="true"
          aria-invalid={status.state === "error"}
          aria-describedby={status.state === "error" ? "support-form-error" : undefined}
          className="bg-gray-50"
          placeholder="Brief summary of the issue"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="s-description" className="text-sm font-medium text-brand-oxford">
          Description <span className="text-red-600" aria-label="required">*</span>
        </label>
        <textarea
          id="s-description"
          name="description"
          required
          aria-required="true"
          aria-invalid={status.state === "error"}
          aria-describedby={status.state === "error" ? "support-form-error" : undefined}
          rows={4}
          className="flex w-full rounded-md border border-input bg-gray-50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-oxford focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Please provide details..."
        />
      </div>

      <input
        type="text"
        name="website_url_hp"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <Button
        type="submit"
        disabled={status.state === "submitting"}
        variant="outline"
        className="w-full border-brand-oxford text-brand-oxford hover:bg-brand-oxford hover:text-white transition-colors"
      >
        {status.state === "submitting" ? (
          <>
            <Loader2 className="animate-spin" aria-hidden="true" />
            <span role="status" aria-live="polite">Submitting...</span>
          </>
        ) : (
          "Submit Ticket"
        )}
      </Button>
    </form>
  );
}

// --- Newsletter Form ---
function NewsletterForm() {
  const [status, setStatus] = useState<FormStatus>({ state: "idle" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // CRITICAL FIX: Prevent duplicate submissions
    if (status.state === "submitting") {
      return;
    }
    setStatus({ state: "submitting" });

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email")?.toString() || "",
      source: "ContactModal",
      consent: formData.get("consent") === "on",
      honeypot: formData.get("website_url_hp")?.toString() || "",
    };

    // HIGH PRIORITY FIX: Validate required fields before API call
    if (!data.email || !data.consent) {
      setStatus({
        state: "error",
        message: "Please provide your email and confirm consent."
      });
      return;
    }

    try {
      const res = await fetch("/api/contact/newsletter", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));

        console.error('[Newsletter Form Submission Error]', {
          status: res.status,
          error: errorData,
          timestamp: new Date().toISOString()
        });

        if (res.status === 400) {
          throw new Error(errorData.error || "Please check your email and try again.");
        } else if (res.status === 429) {
          throw new Error("Too many requests. Please wait a moment and try again.");
        } else {
          throw new Error("Subscription failed. Please try again.");
        }
      }

      setStatus({ state: "success" });
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : "Subscription failed. Please try again.";

      setStatus({ state: "error", message });
    }
  }

  if (status.state === "success") {
    return (
      <div
        className="flex flex-col items-center justify-center py-12 text-center animate-in zoom-in-95 duration-300"
        role="status"
        aria-live="polite"
      >
        <div className="w-16 h-16 bg-brand-copper/20 rounded-full flex items-center justify-center mb-4">
          <Check className="w-8 h-8 text-brand-copper" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold text-brand-oxford mb-2">Subscribed!</h3>
        <p className="text-gray-600 max-w-xs mx-auto">
          You're on the list. Watch your inbox for updates.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      {status.state === "error" && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{status.message}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <label htmlFor="nl-email" className="text-sm font-medium text-brand-oxford">
          Email Address <span className="text-red-600" aria-label="required">*</span>
        </label>
        <Input
          id="nl-email"
          type="email"
          name="email"
          required
          aria-required="true"
          aria-invalid={status.state === "error"}
          aria-describedby={status.state === "error" ? "newsletter-form-error" : undefined}
          className="bg-gray-50"
          placeholder="you@company.com"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="consent"
          name="consent"
          required
          className="rounded border-gray-300 text-brand-copper focus:ring-brand-copper"
        />
        <label htmlFor="consent" className="text-xs text-gray-500">
          I agree to receive marketing communications from Humaneers.
        </label>
      </div>

      <input
        type="text"
        name="website_url_hp"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <Button
        type="submit"
        disabled={status.state === "submitting"}
        variant="default"
        className="w-full bg-brand-oxford hover:bg-brand-oxford/90 text-white"
      >
        {status.state === "submitting" ? (
          <>
            <Loader2 className="animate-spin" aria-hidden="true" />
            <span role="status" aria-live="polite">Subscribing...</span>
          </>
        ) : (
          "Subscribe"
        )}
      </Button>
    </form>
  );
}

// --- Main Modal ---
export function ContactModal() {
  const { isOpen, activeTab, closeModal, openModal } = useContactModal();

  // CIO Requirement: Security - Lock scrolling when open (Dialog handles this automatically)
  // CMO Requirement: Lazy load handled by Parent.

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden gap-0 border-none rounded-2xl">
        <div className="bg-brand-oxford p-6 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif">
              {activeTab === "sales"
                ? "Let's Build Your Strategy"
                : activeTab === "newsletter"
                  ? "Stay Informed"
                  : "How can we help?"}
            </DialogTitle>
            <DialogDescription className="text-brand-cream/80">
              {activeTab === "sales"
                ? "Tell us about your needs. We'll outline a plan."
                : activeTab === "newsletter"
                  ? "Get the latest on IT security and strategy."
                  : "Our support team is ready to assist you."}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 bg-white">
          <Tabs value={activeTab} onValueChange={(v) => openModal(v as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="sales">Sales</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
              <TabsTrigger value="newsletter">News</TabsTrigger>
            </TabsList>

            <TabsContent value="sales" className="mt-0 outline-none">
              <SalesForm />
            </TabsContent>

            <TabsContent value="support" className="mt-0 outline-none">
              <SupportForm />
            </TabsContent>

            <TabsContent value="newsletter" className="mt-0 outline-none">
              <NewsletterForm />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
