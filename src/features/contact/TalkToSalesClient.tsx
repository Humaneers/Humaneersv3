"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Phone } from "lucide-react";
import { WaitlistForm } from "@/components/WaitlistForm";

export function TalkToSalesClient() {
  return (
    <div className="bg-brand-cream min-h-screen">
      <div className="bg-brand-oxford text-white py-16">
        <div className="container mx-auto px-6 text-center">
          {/* The availability state belongs at the top of the funnel. The page
              this replaced let a visitor read all the way down and then refused
              them, after the header had promised to help. */}
          <span className="inline-block mb-4 rounded-full border border-brand-copper/40 bg-brand-copper/15 px-4 py-1 text-xs font-bold uppercase tracking-wider text-brand-copper">
            At capacity: joining the waitlist
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Let's Build Your Strategy</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We are full at the moment, so new engagements are joining a waitlist rather than going
            straight into onboarding. Tell us what you need and a partner will come back to you when
            we can take it on properly.
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
                We don't just fix computers. We align technology with your goals, at work or at
                home.
              </p>
              <ul className="space-y-3">
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

            {/* Capacity is a sales constraint. It is not a reason to leave
                someone mid-incident without a number to call. */}
            <div className="bg-white p-6 rounded-lg shadow border-l-4 border-red-600">
              <h3 className="font-bold text-brand-oxford mb-1">Something on fire right now?</h3>
              <p className="text-sm text-brand-slate mb-3 leading-relaxed">
                The waitlist is for planned work. If you have an active outage or breach, call
                instead of filling in a form.
              </p>
              <a
                href="tel:+19284401505"
                className="inline-flex items-center gap-2 rounded-md bg-red-700 px-4 py-2 text-sm font-bold text-white hover:bg-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-900 focus-visible:ring-offset-2"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                (928) 440-1505
              </a>
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

          {/* Waitlist */}
          <Card className="md:col-span-3 shadow-xl border-t-4 border-brand-copper bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl text-brand-oxford">Join the waitlist</CardTitle>
              <p className="text-sm text-brand-slate pt-1">
                A partner reads every entry. No sequences, no drip, no junior associate.
              </p>
            </CardHeader>
            <CardContent className="py-6">
              <WaitlistForm source="Waitlist - Talk to Sales" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
