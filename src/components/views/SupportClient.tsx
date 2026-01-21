"use client";

import { useState } from "react";
import {
  LifeBuoy,
  Phone,
  MapPin,
  Clock,
  Shield,
  Headphones,
  ChevronDown,
  ArrowRight,
  MessageSquare,
} from "lucide-react";
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
      <section className="bg-brand-oxford text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-copper/20 rounded-full mb-6">
            <LifeBuoy className="w-8 h-8 text-brand-copper" aria-hidden="true" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Support Center</h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
            Submit a support ticket and our engineering team will respond promptly. We support new
            clients in crisis. We'll stabilize your systems first and handle the paperwork later.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 max-w-6xl mx-auto">
            {/* Support Info Side */}
            <div className="lg:w-1/3 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-brand-oxford mb-6">Need Help?</h2>
                <p className="text-brand-slate mb-8">
                  Email us to submit a support ticket. We welcome new clients who need immediate
                  help. Our team monitors tickets during business hours and will respond based on
                  priority level.
                </p>
              </div>

              <div className="bg-red-50 border-2 border-red-500 rounded-lg p-5 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-red-500 p-2 rounded-full">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-red-700 text-lg">Emergency Hotline</h3>
                </div>
                <p className="text-sm text-red-700 mb-3">
                  For critical P1 issues (system down, active breach, data loss) call us directly:
                </p>
                <a
                  href="tel:+19284401505"
                  className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-5 rounded-lg transition-colors text-lg"
                  aria-label="Call emergency hotline at (928) 440-1505"
                >
                  <Phone className="w-5 h-5" aria-hidden="true" />
                  (928) 440-1505
                </a>
                <p className="text-xs text-red-600 mt-2">Available 24/7 for critical emergencies</p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-brand-copper">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-brand-copper/10 p-2 rounded-full text-brand-copper">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-brand-oxford">Headquarters</h3>
                </div>
                <p className="text-sm text-brand-slate">
                  60 East Rio Salado Parkway, Suite 900
                  <br />
                  Tempe, AZ 85281
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-500">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-red-500" />
                    <h3 className="font-bold text-brand-oxford">Critical (P1)</h3>
                  </div>
                  <p className="text-sm text-brand-slate">
                    System down or data breach. Response within 15 minutes.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-orange-500">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-orange-500" />
                    <h3 className="font-bold text-brand-oxford">High (P2)</h3>
                  </div>
                  <p className="text-sm text-brand-slate">
                    Major functionality impacted. Response within 1 hour.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-500">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-yellow-500" />
                    <h3 className="font-bold text-brand-oxford">Medium (P3)</h3>
                  </div>
                  <p className="text-sm text-brand-slate">
                    Minor issue with workaround. Response within 4 hours.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <h3 className="font-bold text-brand-oxford">Low (P4)</h3>
                  </div>
                  <p className="text-sm text-brand-slate">
                    General question or request. Response within 24 hours.
                  </p>
                </div>
              </div>

              <div className="bg-brand-oxford p-6 rounded-lg text-white">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-5 h-5 text-brand-copper" />
                  <h3 className="font-bold">Security Issues?</h3>
                </div>
                <p className="text-sm text-gray-300 mb-4">
                  For security vulnerabilities, please email security@humaneers.dev directly with
                  details.
                </p>
                <div className="flex items-center gap-3">
                  <Headphones className="w-5 h-5 text-brand-copper" />
                  <h3 className="font-bold">New to Humaneers?</h3>
                </div>
                <p className="text-sm text-gray-300 mt-2">
                  Crisis response is in our DNA. We prioritize immediate remediation for active
                  threats, regardless of your contract status.
                </p>
              </div>
            </div>

            <div className="lg:w-2/3">
              <div className="bg-white p-8 rounded-xl shadow-lg text-center flex flex-col items-center justify-center min-h-[400px]">
                <div className="bg-brand-cream/50 p-6 rounded-full mb-6">
                  <ArrowRight className="w-12 h-12 text-brand-copper" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-brand-oxford mb-2">Open a Ticket</h3>
                <p className="text-gray-600 mb-8 max-w-md">
                  Click below to email our support team directly. Please include "Urgent" in the
                  subject line for critical issues.
                </p>
                <Button
                  onClick={() => openModal("support")}
                  className="w-full sm:w-auto bg-brand-copper hover:bg-brand-copper-dark h-auto py-4 px-8 text-lg gap-2"
                  withArrow
                >
                  <MessageSquare className="w-5 h-5" aria-hidden="true" />
                  Open Support Ticket
                </Button>
              </div>
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
