"use client";

import { useContactModal } from "@/components/providers/ContactModalProvider";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export function BookClient() {
  const { openModal } = useContactModal();

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 bg-brand-cream">
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-brand-oxford">
          Schedule a Consultation
        </h1>
        <p className="text-xl text-brand-slate max-w-2xl mx-auto mb-12 font-light leading-relaxed">
          Choose a time that works best for you. We'll discuss your vision and how our modern
          craftsmanship can bring it to life.
        </p>

        <div className="bg-white p-8 rounded-xl shadow-lg inline-block border border-gray-100 max-w-xl mx-auto">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="w-12 h-12 bg-brand-copper/10 rounded-full flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-brand-copper" aria-hidden="true" />
            </div>
            <div className="max-w-md text-center">
              <h3 className="text-xl font-bold text-brand-oxford mb-3">Service Capacity Reached</h3>
              <p className="text-brand-slate text-sm leading-relaxed mb-6">
                We appreciate your interest in Humaneers. Due to exceptionally high demand and our
                commitment to maintaining enterprise-grade standards for our active partners, we
                have reached our capacity for new client engagements at this time.
              </p>

              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-xs text-brand-slate mb-6 leading-relaxed">
                <strong>Existing Partners:</strong> Active clients needing emergency assistance or
                support, please proceed to your dedicated channel or the Support page.
              </div>

              <div className="w-full p-4 bg-brand-cream rounded-xl border border-brand-copper/20 text-center mb-6">
                <p className="text-xs text-brand-slate mb-3 font-medium">
                  While we cannot accept new clients at this time, we encourage you to subscribe to
                  our newsletter, <strong>The Human Brief</strong>, to receive strategic insights
                  and be notified as soon as we open capacity.
                </p>
                <Button
                  onClick={() => openModal("newsletter")}
                  size="sm"
                  className="w-full bg-brand-copper hover:bg-brand-copper-dark text-white font-bold uppercase tracking-wider text-[10px] py-2 h-auto"
                >
                  Subscribe to The Human Brief
                </Button>
              </div>

              <p className="text-[11px] text-gray-400">
                Please check back later or contact{" "}
                <a
                  href="mailto:hello@humaneers.dev"
                  className="text-brand-copper hover:underline font-semibold"
                >
                  hello@humaneers.dev
                </a>{" "}
                for general inquiries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
