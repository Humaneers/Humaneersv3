"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Check, Loader2, AlertCircle } from "lucide-react";

/**
 * The waitlist.
 *
 * This replaces the "Service Capacity Reached" wall that used to render here.
 * The wall offered a newsletter and nothing else, so every conversion path on
 * the site ended by asking the visitor for nothing and giving them no way back.
 * A waitlist entry is a lead, so this posts to the existing /api/contact/sales
 * route: same rate limiting, same honeypot, same zod validation, same Zoho
 * mapping, same fallback when the CRM is down. Nothing new to configure.
 *
 * Entries are tagged `Waitlist` in `source`, which maps to Lead_Source in Zoho,
 * so they can be filtered from ordinary inbound without a custom field.
 *
 * Keep the copy honest. It promises a reply when capacity opens and does not
 * promise a date, because nobody has committed to one.
 */

interface FormStatus {
  state: "idle" | "submitting" | "success" | "error";
  message?: string;
}

export function WaitlistForm({
  source = "Waitlist",
  compact = false,
}: {
  source?: string;
  compact?: boolean;
}) {
  const [status, setStatus] = useState<FormStatus>({ state: "idle" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.state === "submitting") return;
    setStatus({ state: "submitting" });

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName")?.toString() || "",
      lastName: formData.get("lastName")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      company: formData.get("company")?.toString() || undefined,
      phone: formData.get("phone")?.toString() || "",
      description: formData.get("description")?.toString() || "",
      source,
      referrer: typeof document !== "undefined" ? document.referrer : undefined,
      honeypot: formData.get("website_url_hp")?.toString() || "",
    };

    if (!data.firstName || !data.lastName || !data.email || data.description.trim().length < 10) {
      setStatus({
        state: "error",
        message:
          "Please fill in your name, email, and a sentence or two about what you need. Ten characters minimum on the last one.",
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
        console.error("[Waitlist Submission Error]", {
          status: res.status,
          error: errorData,
          timestamp: new Date().toISOString(),
        });
        if (res.status === 400) {
          throw new Error(errorData.error || "Please check your form and try again.");
        } else if (res.status === 429) {
          throw new Error("Too many requests. Please wait a moment and try again.");
        } else {
          throw new Error("Could not add you to the list. Please email hello@humaneers.dev.");
        }
      }

      setStatus({ state: "success" });
    } catch (error) {
      setStatus({
        state: "error",
        message:
          error instanceof Error
            ? error.message
            : "Could not add you to the list. Please email hello@humaneers.dev.",
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
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <Check className="w-8 h-8 text-green-700" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold text-brand-oxford mb-3">You are on the list.</h3>
        <p className="text-brand-slate text-sm max-w-sm mx-auto leading-relaxed mb-4">
          A partner reads every entry. When we open capacity that fits what you described, you get
          an email from a person, with a name on it. We are not going to pretend to know the date.
        </p>
        <p className="text-sm text-brand-slate">
          Something urgent in the meantime?{" "}
          <a
            href="tel:+19284401505"
            className="text-brand-copper-text font-semibold hover:underline"
          >
            (928) 440-1505
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? "space-y-4" : "space-y-5"} noValidate>
      {status.state === "error" && (
        <div
          id="waitlist-form-error"
          role="alert"
          aria-live="assertive"
          className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-900"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{status.message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="waitlist-firstName" className="text-sm font-medium text-brand-oxford">
            First Name{" "}
            <span className="text-red-600" aria-label="required">
              *
            </span>
          </label>
          <Input
            id="waitlist-firstName"
            name="firstName"
            required
            aria-required="true"
            aria-invalid={status.state === "error"}
            aria-describedby={status.state === "error" ? "waitlist-form-error" : undefined}
            className="bg-gray-50"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="waitlist-lastName" className="text-sm font-medium text-brand-oxford">
            Last Name{" "}
            <span className="text-red-600" aria-label="required">
              *
            </span>
          </label>
          <Input
            id="waitlist-lastName"
            name="lastName"
            required
            aria-required="true"
            aria-invalid={status.state === "error"}
            aria-describedby={status.state === "error" ? "waitlist-form-error" : undefined}
            className="bg-gray-50"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="waitlist-email" className="text-sm font-medium text-brand-oxford">
          Email Address{" "}
          <span className="text-red-600" aria-label="required">
            *
          </span>
        </label>
        <Input
          id="waitlist-email"
          type="email"
          name="email"
          required
          aria-required="true"
          aria-invalid={status.state === "error"}
          aria-describedby={status.state === "error" ? "waitlist-form-error" : undefined}
          className="bg-gray-50"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="waitlist-company" className="text-sm font-medium text-brand-oxford">
            Company
          </label>
          <Input
            id="waitlist-company"
            name="company"
            className="bg-gray-50"
            placeholder="Leave blank if this is for your household"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="waitlist-phone" className="text-sm font-medium text-brand-oxford">
            Phone Number
          </label>
          <Input
            id="waitlist-phone"
            type="tel"
            name="phone"
            className="bg-gray-50"
            placeholder="Optional"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="waitlist-description" className="text-sm font-medium text-brand-oxford">
          What do you need help with?{" "}
          <span className="text-red-600" aria-label="required">
            *
          </span>
        </label>
        <textarea
          id="waitlist-description"
          name="description"
          required
          aria-required="true"
          aria-invalid={status.state === "error"}
          aria-describedby={status.state === "error" ? "waitlist-form-error" : undefined}
          rows={compact ? 3 : 4}
          className="flex w-full rounded-md border border-input bg-gray-50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-oxford focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="A sentence or two is plenty. What is breaking, what you are trying to build, or what you want off your plate."
        />
      </div>

      {/* Anti-spam. Hidden from people, attractive to bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="waitlist-website_url_hp">Do not fill this in</label>
        <input
          id="waitlist-website_url_hp"
          name="website_url_hp"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Button
        type="submit"
        disabled={status.state === "submitting"}
        className="w-full bg-brand-copper-text hover:bg-brand-copper-text-dark text-white font-bold uppercase tracking-wider text-xs py-3 h-auto cursor-pointer disabled:opacity-70"
      >
        {status.state === "submitting" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
            Adding you to the list
          </>
        ) : (
          "Join the waitlist"
        )}
      </Button>

      <p className="text-xs text-gray-500 text-center leading-relaxed">
        A partner reads every entry. We will not add you to a drip sequence, and we will not sell
        your details.
      </p>
    </form>
  );
}
