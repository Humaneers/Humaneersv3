"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, AlertCircle } from "lucide-react";
import { useContactModal } from "@/components/providers/ContactModalProvider";
import { Button } from "@/components/ui/button";

export function TalkToSalesClient() {
  const { openModal } = useContactModal();
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

          {/* Service Capacity Notice */}
          <Card className="md:col-span-3 shadow-xl border-t-4 border-brand-copper bg-white">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-12 h-12 bg-brand-copper/10 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-6 h-6 text-brand-copper" aria-hidden="true" />
              </div>
              <CardTitle className="text-2xl text-brand-oxford">Service Capacity Reached</CardTitle>
            </CardHeader>
            <CardContent className="text-center py-6">
              <p className="text-brand-slate text-base leading-relaxed mb-6 max-w-md mx-auto">
                We appreciate your interest in Humaneers. Due to exceptionally high demand and our
                commitment to maintaining enterprise-grade standards for our existing partners, we
                have reached our capacity for new clients at this time.
              </p>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 max-w-md mx-auto text-sm text-brand-slate mb-6">
                <strong>Existing Clients & Support:</strong> If you are an active partner or need
                technical support under an active service agreement, please proceed to the support
                section.
              </div>

              <div className="w-full max-w-md mx-auto p-5 bg-brand-cream rounded-xl border border-brand-copper/20 text-center mb-6 animate-in fade-in duration-300">
                <p className="text-sm text-brand-slate mb-4 font-medium leading-relaxed">
                  While we cannot accept new clients at this time, we encourage you to subscribe to
                  our newsletter, <strong>The Human Brief</strong>, to receive strategic insights
                  and be notified as soon as we open capacity.
                </p>
                <Button
                  onClick={() => openModal("newsletter")}
                  className="w-full bg-brand-copper hover:bg-brand-copper-dark text-white font-bold uppercase tracking-wider text-xs py-3 h-auto cursor-pointer"
                >
                  Subscribe to The Human Brief
                </Button>
              </div>

              <p className="text-xs text-gray-500">
                Please check back later or contact{" "}
                <a
                  href="mailto:hello@humaneers.dev"
                  className="text-brand-copper hover:underline font-semibold"
                >
                  hello@humaneers.dev
                </a>{" "}
                for general inquiries.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
