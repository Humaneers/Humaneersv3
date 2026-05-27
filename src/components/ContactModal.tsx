"use client";

import { useState } from "react";
import { useContactModal } from "./providers/ContactModalProvider";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Check, AlertCircle, Loader2 } from "lucide-react";

// --- Types ---
interface FormStatus {
  state: "idle" | "submitting" | "success" | "error";
  message?: string;
}

// --- Sales Form ---
function SalesForm() {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in duration-300">
      <div className="w-12 h-12 bg-brand-copper/10 rounded-full flex items-center justify-center mb-4">
        <AlertCircle className="w-6 h-6 text-brand-copper" aria-hidden="true" />
      </div>
      <h3 className="text-xl font-bold text-brand-oxford mb-3">Service Capacity Reached</h3>
      <p className="text-brand-slate text-sm max-w-sm mx-auto mb-6 leading-relaxed">
        We appreciate your interest in Humaneers. Due to high demand and our commitment to maintaining enterprise-grade standards for our active partners, we have reached our capacity for new clients at this time.
      </p>
      <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 max-w-sm mx-auto text-xs text-brand-slate">
        <strong>Existing Partners:</strong> If you are an active client needing assistance, please switch to the <strong>Support</strong> tab.
      </div>
      <p className="text-[11px] text-gray-400 mt-6">
        Please check back later or contact <a href="mailto:hello@humaneers.dev" className="text-brand-copper hover:underline font-semibold">hello@humaneers.dev</a> for inquiries.
      </p>
    </div>
  );
}

// --- Support Form ---
function SupportForm() {
  const { source } = useContactModal();
  const isRapidResponse = source?.includes("New Client") || source?.includes("Rapid Response");
  const [status, setStatus] = useState<FormStatus>({ state: "idle" });

  if (isRapidResponse) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in duration-300">
        <div className="w-12 h-12 bg-brand-copper/10 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="w-6 h-6 text-brand-copper" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold text-brand-oxford mb-3">Service Capacity Reached</h3>
        <p className="text-brand-slate text-sm max-w-sm mx-auto mb-6 leading-relaxed">
          We appreciate your interest. Due to high demand and our commitment to maintaining enterprise-grade standards for our existing partners, we have reached our capacity for new clients and new rapid response engagements at this time.
        </p>
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 max-w-sm mx-auto text-xs text-brand-slate">
          <strong>Existing Partners:</strong> Active clients requiring emergency dispatch should contact their dedicated command line directly.
        </div>
        <p className="text-[11px] text-gray-400 mt-6">
          Please check back later or contact <a href="mailto:hello@humaneers.dev" className="text-brand-copper hover:underline font-semibold">hello@humaneers.dev</a> for inquiries.
        </p>
      </div>
    );
  }

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
      phone: formData.get("phone")?.toString() || "",
      subject: formData.get("subject")?.toString() || "",
      description: formData.get("description")?.toString() || "",
      priority: isRapidResponse ? "High" : formData.get("priority")?.toString() || "Medium",
      context: isRapidResponse ? "new_client_critical" : "existing_client",
      honeypot: formData.get("website_url_hp")?.toString() || "",
    };

    // HIGH PRIORITY FIX: Validate required fields before API call
    if (
      !data.contactName ||
      !data.email ||
      !data.subject ||
      !data.description ||
      (isRapidResponse && !data.phone)
    ) {
      setStatus({
        state: "error",
        message: "Please fill in all required fields.",
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

        console.error("[Support Form Submission Error]", {
          status: res.status,
          error: errorData,
          timestamp: new Date().toISOString(),
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
      const message =
        error instanceof Error
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
          Your Name{" "}
          <span className="text-red-600" aria-label="required">
            *
          </span>
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
          Email Address{" "}
          <span className="text-red-600" aria-label="required">
            *
          </span>
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
        <label htmlFor="support-phone" className="text-sm font-medium text-brand-oxford">
          Phone Number{" "}
          {isRapidResponse && (
            <span className="text-red-600" aria-label="required">
              *
            </span>
          )}
        </label>
        <Input
          id="support-phone"
          type="tel"
          name="phone"
          required={isRapidResponse}
          aria-required={isRapidResponse}
          aria-invalid={status.state === "error"}
          className="bg-gray-50"
          placeholder={isRapidResponse ? "Required for dispatch" : "Optional"}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="priority" className="text-sm font-medium text-brand-oxford">
          Priority
        </label>
        {isRapidResponse ? (
          <div className="flex h-10 w-full items-center rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-900 font-bold">
            CRITICAL / HIGH - IMMEDIATE DEPLOYMENT
            <input type="hidden" name="priority" value="High" />
          </div>
        ) : (
          <select
            id="priority"
            name="priority"
            defaultValue="Medium"
            className="flex h-10 w-full rounded-md border border-input bg-gray-50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-oxford focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="Low">Low - General Question</option>
            <option value="Medium">Medium - Issue with Service</option>
            <option value="High">High - Critical / Outage</option>
          </select>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium text-brand-oxford">
          Subject{" "}
          <span className="text-red-600" aria-label="required">
            *
          </span>
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
          Description{" "}
          <span className="text-red-600" aria-label="required">
            *
          </span>
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
          placeholder={
            isRapidResponse
              ? "Describe the active threat or outage..."
              : "Please provide details..."
          }
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
            <span role="status" aria-live="polite">
              Submitting...
            </span>
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
        message: "Please provide your email and confirm consent.",
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

        console.error("[Newsletter Form Submission Error]", {
          status: res.status,
          error: errorData,
          timestamp: new Date().toISOString(),
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
      const message =
        error instanceof Error ? error.message : "Subscription failed. Please try again.";

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
          Email Address{" "}
          <span className="text-red-600" aria-label="required">
            *
          </span>
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
            <span role="status" aria-live="polite">
              Subscribing...
            </span>
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
  const { isOpen, activeTab, closeModal, openModal, source } = useContactModal();

  const isRapidResponse = source?.includes("New Client") || source?.includes("Rapid Response");

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
                  : isRapidResponse
                    ? "Critical Incident Response"
                    : "How can we help?"}
            </DialogTitle>
            <DialogDescription className="text-brand-cream/80">
              {activeTab === "sales"
                ? "Tell us about your needs. We'll outline a plan."
                : activeTab === "newsletter"
                  ? "Get the latest on IT security and strategy."
                  : isRapidResponse
                    ? "Immediate deployment for mission-critical issues."
                    : "Our support team is ready to assist you."}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 bg-white">
          <Tabs
            value={activeTab}
            onValueChange={(v) => openModal(v as "sales" | "support" | "newsletter")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="sales">Sales</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
              <TabsTrigger value="newsletter">News</TabsTrigger>
            </TabsList>

            <TabsContent
              value="sales"
              className="mt-0 outline-none focus-visible:ring-2 focus-visible:ring-brand-copper rounded-md"
            >
              <SalesForm />
            </TabsContent>

            <TabsContent
              value="support"
              className="mt-0 outline-none focus-visible:ring-2 focus-visible:ring-brand-copper rounded-md"
            >
              <SupportForm />
            </TabsContent>

            <TabsContent
              value="newsletter"
              className="mt-0 outline-none focus-visible:ring-2 focus-visible:ring-brand-copper rounded-md"
            >
              <NewsletterForm />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
