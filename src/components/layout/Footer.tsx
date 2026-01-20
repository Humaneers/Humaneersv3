"use client";

import Link from "next/link";
import { Phone, MapPin } from "lucide-react";
import { cn } from "../ui/utils";
import Image from "next/image";
import { EmailActionButton } from "../ui/email-action-button";
// import { APP_VERSION } from "../../version"; // Temporarily disabled if not easily resolved
const APP_VERSION = "0.2.0";

import { footerSections, footerMetaLinks } from "../../data/navigation";

export function Footer() {
  return (
    <footer className="bg-brand-oxford text-gray-400 py-12 border-t border-brand-copper">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12 text-center md:text-left">
          <div className="col-span-1 md:col-span-3 lg:col-span-2 flex flex-col items-center md:items-start">
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
            <div className="flex gap-2 mb-6">
              <span className="inline-flex items-center px-2 py-1 border border-brand-copper/30 rounded text-[10px] font-bold text-brand-copper uppercase tracking-wider bg-brand-copper/5">
                SOC 2 Type II
              </span>
              <span className="inline-flex items-center px-2 py-1 border border-brand-copper/30 rounded text-[10px] font-bold text-brand-copper uppercase tracking-wider bg-brand-copper/5">
                HIPAA Compliant
              </span>
            </div>
            <div className="inline-flex items-center gap-2 bg-brand-slate/30 px-3 py-1 rounded-full text-xs font-medium text-brand-copper">
              <span className="w-2 h-2 rounded-full bg-brand-copper"></span>
              Based in Tempe, AZ | Serving Clients Nationwide
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title} className="flex flex-col items-center md:items-start">
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

          <div className="flex flex-col items-center md:items-start w-full mt-8 md:mt-0">
            <h4 className="text-white font-semibold mb-4">Newsletter</h4>
            <p className="text-sm mb-4">Get the latest on IT security and strategy.</p>
            <div className="w-full max-w-sm md:max-w-none">
              <EmailActionButton
                label="Subscribe via Email"
                email="hello@humaneers.dev"
                subject="Newsletter Subscription Request"
                className="w-full bg-brand-copper hover:bg-brand-copper-dark justify-center h-auto py-3 text-sm"
                size="default"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 items-center md:items-start text-center md:text-left pt-8 border-t border-brand-copper/30">
          <p className="text-gray-400 font-medium text-base">
            Built in Arizona & Texas by humans with ❤️ + ☕️.
          </p>
          <div className="flex flex-col md:flex-row flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-500 items-center">
            <span>&copy; {new Date().getFullYear()} Humaneers Limited Company.</span>
            <span className="text-white/20 hidden md:inline">•</span>
            <span className="text-white/20">v{APP_VERSION}</span>
          </div>

          <div className="flex flex-col gap-4 w-full md:w-auto items-center md:items-start">
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <div className="bg-gray-800 p-2 rounded-full text-brand-copper">
                <Phone size={16} />
              </div>
              <a href="tel:+19284401505" className="hover:text-brand-copper transition-colors">
                (928) 440-1505
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-400 max-w-xs md:max-w-none">
              <div className="bg-gray-800 p-2 rounded-full text-brand-copper flex-shrink-0">
                <MapPin size={16} />
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

          <p className="leading-tight opacity-60 max-w-lg text-xs mt-4">
            "Humaneers" is a trademark of Human IP LP and is used under license.
          </p>
        </div>

        <div className="flex flex-col md:flex-row flex-wrap justify-center md:justify-end items-center gap-6 mt-8 pt-6 border-t border-brand-copper/30 md:border-t-0 md:pt-0">
          <div className="flex flex-wrap justify-center gap-6">
            {footerMetaLinks.map((item) =>
              item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="text-sm text-gray-500 hover:text-brand-copper transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.to!}
                  className="text-sm text-gray-500 hover:text-brand-copper transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
          <span className="text-brand-copper font-medium px-4 py-2 bg-brand-copper/10 rounded-full text-xs">
            Supporting 501(c)(3) Organizations
          </span>
        </div>
      </div>
    </footer>
  );
}
