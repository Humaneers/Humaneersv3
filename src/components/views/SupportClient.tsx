"use client";

import { useState } from "react";
import { LifeBuoy, Phone, Clock, Shield, ChevronDown, MessageSquare } from "lucide-react";
import { Button } from "../ui/button";
import { useContactModal } from "../providers/ContactModalProvider";
import { trackInteraction } from "../../lib/session";

// Kept trackInteraction for FAQ if needed, though mostly used for form.
// Faq toggle uses it.

export function SupportClient() {
  const { openModal } = useContactModal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqItems = [
    {
      question: "Do I need to be an existing client to get help?",
      answer:
        "No! We welcome new clients who need immediate help. If you are in the middle of a security incident, we will help you now. We can establish a partnership once the fire is out.",
    },
    {
      question: "What's the fastest way to get help for a critical issue?",
      answer:
        "For P1 Critical issues (system down, data breach, active security incident), call our emergency hotline directly. For other issues, send us an email.",
    },
    {
      question: "What information should I include in my request?",
      answer:
        "Include: what happened, when it started, what you were trying to do, any error messages, and which systems are affected. The more detail you provide, the faster we can help.",
    },
    {
      question: "How do priority levels work?",
      answer:
        "P1 (Critical): System down, 15-min response. P2 (High): Major impact, 1-hr response. P3 (Medium): Minor issue with workaround, 4-hr response. P4 (Low): Questions/requests, 24-hr response.",
    },
    {
      question: "What are your support hours?",
      answer:
        "Our team monitors tickets during business hours (Mon-Fri, 8am-6pm MST). For P1 Critical issues, our emergency hotline provides 24/7 coverage.",
    },
  ];

  const toggleFaq = (index: number) => {
    // HIGH PRIORITY FIX: Validate array bounds
    if (index < 0 || index >= faqItems.length) {
      console.warn(`Invalid FAQ index: ${index}`);
      return;
    }

    if (openFaq !== index) {
      trackInteraction(`Expanded FAQ: ${faqItems[index].question}`);
    }
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-brand-cream min-h-screen">
      <section className="bg-brand-oxford text-white py-20 relative overflow-hidden">
        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-copper/20 rounded-full mb-6 backdrop-blur-sm border border-brand-copper/20">
            <LifeBuoy className="w-8 h-8 text-brand-copper" aria-hidden="true" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Support Center</h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
            Submit a support ticket and our engineering team will respond promptly. We support new
            clients in crisis. We'll stabilize your systems first and handle the paperwork later.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            {/* Primary Action Grid - Centered */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* Existing Clients */}
              <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg border border-gray-100 flex flex-col justify-between group hover:shadow-xl transition-shadow min-h-[400px]">
                <div>
                  <div className="bg-brand-oxford/10 p-5 rounded-full w-20 h-20 flex items-center justify-center mb-8 group-hover:bg-brand-oxford group-hover:text-white transition-colors text-brand-oxford">
                    <MessageSquare className="w-10 h-10" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-oxford mb-4">Client Support</h3>
                  <p className="text-brand-slate text-base mb-8 leading-relaxed">
                    For existing partners. Submit regular maintenance requests, user provisioning,
                    or general inquiries.
                  </p>
                </div>
                <Button
                  onClick={() => openModal("support", "", "Support - Client Support")}
                  className="w-full bg-brand-oxford hover:bg-brand-oxford/90 text-white py-6"
                  withArrow
                >
                  Submit Request
                </Button>
              </div>

              {/* Rapid Response */}
              <div className="bg-brand-oxford p-8 md:p-10 rounded-xl shadow-2xl border border-brand-copper/20 flex flex-col justify-between relative overflow-hidden group hover:border-brand-copper/40 transition-colors min-h-[400px]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-copper/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none transition-opacity opacity-50 group-hover:opacity-100"></div>
                <div className="relative z-10">
                  <div className="bg-brand-copper/20 p-5 rounded-full w-20 h-20 flex items-center justify-center mb-8 text-brand-copper backdrop-blur-sm">
                    <Shield className="w-10 h-10" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Rapid Response</h3>
                  <p className="text-gray-300 text-base mb-8 leading-relaxed opacity-90">
                    For new engagements. Immediate "Tactical Deployment" for active breaches,
                    outages, or mission-critical failures. We stabilize first, contract later.
                  </p>
                </div>
                <Button
                  onClick={() => openModal("support", "", "Support - Rapid Response")}
                  className="w-full bg-brand-copper hover:bg-brand-copper-dark text-white font-bold h-14 text-lg shadow-lg hover:shadow-brand-copper/20 relative z-10"
                  withArrow
                >
                  Deploy Team
                </Button>
              </div>
            </div>

            {/* Critical Infrastructure Strip */}
            <div className="bg-brand-oxford-deep border border-brand-copper/20 rounded-2xl p-8 mb-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-5 pointer-events-none"></div>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
                <div className="bg-brand-copper/10 p-4 rounded-xl border border-brand-copper/20">
                  <Phone className="w-8 h-8 text-brand-copper" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
                    Emergency Command Line
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                  </h3>
                  <p className="text-gray-400 text-sm max-w-md">
                    24/7 Direct access for P1 Critical issues (System Down, Active Breach). Bypasses
                    standard queues.
                  </p>
                </div>
              </div>

              <a
                href="tel:+19284401505"
                className="relative z-10 flex items-center gap-3 bg-brand-copper hover:bg-brand-copper-dark text-white font-bold py-4 px-8 rounded-lg transition-all shadow-lg hover:shadow-brand-copper/20 text-lg group w-full md:w-auto justify-center"
              >
                <Phone className="w-5 h-5" />
                <span>(928) 440-1505</span>
              </a>
            </div>

            {/* Service Standards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-3 text-red-600">
                  <Clock className="w-5 h-5" />
                  <span className="font-bold text-sm">Priority 1</span>
                </div>
                <div className="text-brand-oxford font-bold mb-1">Critical</div>
                <div className="text-xs text-brand-slate">15 Min Response</div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-3 text-orange-500">
                  <Clock className="w-5 h-5" />
                  <span className="font-bold text-sm">Priority 2</span>
                </div>
                <div className="text-brand-oxford font-bold mb-1">High</div>
                <div className="text-xs text-brand-slate">1 Hour Response</div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-3 text-yellow-500">
                  <Clock className="w-5 h-5" />
                  <span className="font-bold text-sm">Priority 3</span>
                </div>
                <div className="text-brand-oxford font-bold mb-1">Medium</div>
                <div className="text-xs text-brand-slate">4 Hour Response</div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-3 text-blue-500">
                  <Clock className="w-5 h-5" />
                  <span className="font-bold text-sm">Priority 4</span>
                </div>
                <div className="text-brand-oxford font-bold mb-1">Low</div>
                <div className="text-xs text-brand-slate">24 Hour Response</div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-brand-slate">
                Security concerns? Email{" "}
                <a
                  href="mailto:security@humaneers.dev"
                  className="text-brand-copper hover:text-brand-copper-dark font-medium underline decoration-brand-copper/30 underline-offset-4"
                >
                  security@humaneers.dev
                </a>{" "}
                directly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-brand-cream">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-brand-oxford mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-brand-cream rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaq === index}
                  aria-controls={`faq-panel-${index}`}
                  id={`faq-button-${index}`}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-brand-cream/80 transition-colors"
                >
                  <span className="font-semibold text-brand-oxford">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-brand-copper transition-transform ${openFaq === index ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                {openFaq === index && (
                  <div
                    id={`faq-panel-${index}`}
                    role="region"
                    aria-labelledby={`faq-button-${index}`}
                    className="px-6 pb-4"
                  >
                    <p className="text-brand-slate">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
