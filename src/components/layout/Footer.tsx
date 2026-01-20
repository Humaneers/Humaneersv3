"use client";

import Link from "next/link";
import { Loader2, Phone, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../ui/utils";
import { createErrorReportLink } from "../../lib/utils";
import { submitNewsletter } from "../../lib/zoho";
import { toast } from "sonner";
import { useState } from "react";
import Image from "next/image";
// import { APP_VERSION } from "../../version"; // Temporarily disabled if not easily resolved
const APP_VERSION = "0.2.0";

import { footerSections, footerMetaLinks } from "../../data/navigation";

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newsletterEmail.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsNewsletterSubmitting(true);

    try {
      await submitNewsletter({ email: newsletterEmail, source: "footer" });
      toast.success("Thanks for subscribing!");
      setNewsletterEmail("");
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Failed to subscribe.";
      const link = createErrorReportLink(error, "Newsletter Subscription (Footer)");
      toast.error(
        <div className="flex flex-col gap-2">
          <span>{errorMsg}</span>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline font-bold hover:text-gray-200"
          >
            Report to Support
          </a>
        </div>
      );
    } finally {
      setIsNewsletterSubmitting(false);
    }
  };

  return (
    <footer className="bg-brand-oxford text-gray-400 py-12 border-t border-brand-copper">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <div className="flex items-center mb-4">
              <Image
                src="/WordMarkV-2.svg"
                alt="Humaneers"
                width={200}
                height={44}
                className="h-6 sm:h-7 md:h-8 w-auto max-w-[160px] sm:max-w-[200px]"
              />
            </div>
            <p className="max-w-xs mb-6 text-sm">
              Enterprise strategy for businesses and families. Built with precision, delivered with
              soul.
            </p>
            <div className="inline-flex items-center gap-2 bg-brand-slate/30 px-3 py-1 rounded-full text-xs font-medium text-brand-copper">
              <span className="w-2 h-2 rounded-full bg-brand-copper"></span>
              Based in Tempe, AZ | Serving Clients Nationwide
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2 text-sm">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.to ?? "#"}
                      className={cn(
                        "hover:text-brand-copper transition-colors",
                        item.label === "View All Services" && "font-semibold text-brand-copper"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-white font-semibold mb-4">Newsletter</h4>
            <p className="text-sm mb-4">Get the latest on IT security and strategy.</p>
            <form className="flex flex-col gap-2" onSubmit={handleNewsletterSubmit}>
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="Email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                disabled={isNewsletterSubmitting}
                className="bg-brand-slate/20 text-white placeholder-gray-500 text-sm px-3 py-2 rounded border border-gray-700 focus:border-brand-copper outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <Button
                type="submit"
                disabled={isNewsletterSubmitting}
                className="bg-brand-copper hover:bg-brand-copper-dark text-white text-xs py-2 h-auto w-full"
              >
                {isNewsletterSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
          <p className="text-gray-400 font-medium">
            Built in Arizona & Texas by humans with ❤️ + ☕️.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1">
            <span>&copy; {new Date().getFullYear()} Humaneers Limited Company.</span>
            <span className="text-white/20">v{APP_VERSION}</span>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <div className="bg-gray-800 p-2 rounded-full text-brand-copper">
                  <Phone size={14} />
                </div>
                <a href="tel:+19284401505" className="hover:text-brand-copper transition-colors">
                  (928) 440-1505
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <div className="bg-gray-800 p-2 rounded-full text-brand-copper">
                  <MapPin size={14} />
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=60+East+Rio+Salado+Parkway+Suite+900+Tempe+AZ+85281"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-copper transition-colors text-left"
                >
                  60 East Rio Salado Parkway, Suite 900, Tempe, AZ 85281
                </a>
              </div>
            </div>
          </div>
          <p className="leading-tight opacity-60 max-w-lg">
            "Humaneers" is a trademark of Human IP LP and is used under license.
          </p>
        </div>

        <div className="flex flex-wrap justify-center md:justify-end items-center gap-x-6 gap-y-3">
          {footerMetaLinks.map((item) =>
            item.href ? (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="hover:text-brand-copper transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                href={item.to!}
                className="hover:text-brand-copper transition-colors"
              >
                {item.label}
              </Link>
            )
          )}
          <span className="text-brand-copper font-medium px-3 py-1 bg-brand-copper/10 rounded-full">
            Supporting 501(c)(3) Organizations
          </span>
        </div>
      </div>
    </footer>
  );
}
