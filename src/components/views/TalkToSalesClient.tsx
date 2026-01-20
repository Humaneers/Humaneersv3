"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ShieldCheck, Loader2, Check, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

type FormStatus =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; message: string };

export function TalkToSalesClient() {
  const [status, setStatus] = useState<FormStatus>({ state: "idle" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Prevent duplicate submissions
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
      source: "Talk to Sales Page",
      path: window.location.pathname,
    };

    // Validate required fields
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

        console.error('[Sales Form Submission Error]', {
          status: res.status,
          error: errorData,
          timestamp: new Date().toISOString()
        });

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
      <div className="bg-brand-cream min-h-screen">
        <div className="bg-brand-oxford text-white py-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Let's Build Your Strategy</h1>
          </div>
        </div>

        <div className="container mx-auto px-6 py-12 -mt-10 max-w-2xl">
          <Card className="shadow-xl border-t-4 border-brand-copper">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center" role="status" aria-live="polite">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="w-8 h-8 text-green-600" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-brand-oxford mb-2">Message Received!</h3>
              <p className="text-brand-slate mb-6">
                Thanks for reaching out. We'll review your inquiry and get back to you within 1 business day.
              </p>
              <p className="text-sm text-brand-slate">
                If your request is urgent, please call us at{" "}
                <a href="tel:+19284401505" className="text-brand-copper hover:underline">
                  (928) 440-1505
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-cream min-h-screen">
      <div className="bg-brand-oxford text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Let's Build Your Strategy</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Tell us about your situation—whether you're protecting a growing business or your family
            at home. In a crisis? We love to help now and discuss the rest later.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 -mt-10">
        <div className="grid md:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Sidebar */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-brand-copper text-white p-6 rounded-lg shadow-lg">
              <h3 className="font-bold text-xl mb-2">Why Humaneers?</h3>
              <p className="text-white/90 mb-4">
                We don't just fix computers. We align technology with your goals—at work or at home.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-sm">SOC 2 Compliant Security</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-sm">100% US-Based Team</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-sm">No Long-Term Lock-in</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow text-brand-slate">
              <p className="italic font-medium">
                "They fixed our immediate crisis in hours, then built a roadmap that actually made
                sense. Finally, IT that feels like a partner, not a vendor."
              </p>
              <div className="mt-4 text-sm font-bold text-brand-oxford">
                — Managing Partner, Accounting Firm
              </div>
            </div>
          </div>

          {/* Sales Form */}
          <Card className="md:col-span-3 shadow-xl border-t-4 border-brand-oxford">
            <CardHeader>
              <CardTitle className="text-2xl text-brand-oxford">Start a Conversation</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you within 1 business day.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                      disabled={status.state === "submitting"}
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
                      disabled={status.state === "submitting"}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="sales-email" className="text-sm font-medium text-brand-oxford">
                    Work Email <span className="text-red-600" aria-label="required">*</span>
                  </label>
                  <Input
                    id="sales-email"
                    name="email"
                    type="email"
                    required
                    aria-required="true"
                    aria-invalid={status.state === "error"}
                    aria-describedby={status.state === "error" ? "sales-form-error" : undefined}
                    className="bg-gray-50"
                    disabled={status.state === "submitting"}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-brand-oxford">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="bg-gray-50"
                    disabled={status.state === "submitting"}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium text-brand-oxford">
                    Company
                  </label>
                  <Input
                    id="company"
                    name="company"
                    className="bg-gray-50"
                    disabled={status.state === "submitting"}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium text-brand-oxford">
                    How can we help? <span className="text-red-600" aria-label="required">*</span>
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    required
                    aria-required="true"
                    aria-invalid={status.state === "error"}
                    aria-describedby={status.state === "error" ? "sales-form-error" : undefined}
                    rows={4}
                    placeholder="Tell us about your project, goals, or current challenges..."
                    className="bg-gray-50"
                    disabled={status.state === "submitting"}
                  />
                </div>

                {/* Honeypot */}
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
                  className="w-full bg-brand-copper hover:bg-brand-copper-dark text-white h-12"
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
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
