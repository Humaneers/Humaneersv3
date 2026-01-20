"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import { EmailActionButton } from "../ui/email-action-button";
import { Suspense } from "react";

function TalkToSalesContent() {
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
                  <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
                  <span className="text-sm">SOC 2 Compliant Security</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
                  <span className="text-sm">100% US-Based Team</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
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

          {/* Action Area */}
          <Card className="md:col-span-3 shadow-xl border-t-4 border-brand-oxford">
            <CardHeader>
              <CardTitle className="text-2xl text-brand-oxford">
                Contact Our Team
              </CardTitle>
              <CardDescription>
                Ready to get started? Send us an email and we'll get back to you shortly.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-12 space-y-6 text-center">
              <div className="bg-brand-cream/50 p-6 rounded-full">
                <ArrowRight className="w-12 h-12 text-brand-copper" />
              </div>
              <div className="max-w-md">
                <p className="text-brand-slate mb-8">
                  Click below to open your email client and send a message directly to our sales team.
                  Please include a brief description of your needs.
                </p>
                <EmailActionButton
                  label="Email Sales Team"
                  email="hello@humaneers.dev"
                  subject="Sales Inquiry: New Client Request"
                  className="w-full sm:w-auto bg-brand-copper hover:bg-brand-copper-dark"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export function TalkToSalesClient() {
  return (
    <Suspense fallback={<div className="flex justify-center p-20"><Loader2 className="animate-spin text-brand-copper" /></div>}>
      <TalkToSalesContent />
    </Suspense>
  );
}
