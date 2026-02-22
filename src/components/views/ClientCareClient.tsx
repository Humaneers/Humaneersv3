"use client";

import { EmailActionButton } from "../ui/email-action-button";
import { Shield, Clock, Smartphone } from "lucide-react";

export function ClientCareClient() {
  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Hero section */}
      <section className="bg-brand-oxford text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Client Care</h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
            Concierge support for our private clients.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <Clock className="w-10 h-10 text-brand-copper mb-4" />
              <h3 className="text-xl font-bold text-brand-oxford mb-2">Zero Wait Time</h3>
              <p className="text-brand-slate">
                Direct access to senior engineers. No ticketing queues or tier-1 support scripts.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <Smartphone className="w-10 h-10 text-brand-copper mb-4" />
              <h3 className="text-xl font-bold text-brand-oxford mb-2">Direct Access</h3>
              <p className="text-brand-slate">
                Text, call, or email your dedicated partner directly. 24/7 emergency availability.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <Shield className="w-10 h-10 text-brand-copper mb-4" />
              <h3 className="text-xl font-bold text-brand-oxford mb-2">Proactive Security</h3>
              <p className="text-brand-slate">
                Continuous monitoring and threat hunting on your behalf, before issues arise.
              </p>
            </div>
          </div>

          <div className="max-w-md mx-auto text-center">
            <div className="bg-white p-8 rounded-xl shadow-lg inline-block border border-gray-100">
              <h3 className="text-xl font-bold text-brand-oxford mb-2">Client Portal Access</h3>
              <p className="text-brand-slate mb-6">
                Our portal is currently invite-only. Please contact your account manager for access.
              </p>
              <EmailActionButton
                label="Request Portal Access"
                email="support@humaneers.dev"
                subject="Portal Access Request"
                className="w-full bg-brand-oxford hover:bg-brand-oxford/90 text-white"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
