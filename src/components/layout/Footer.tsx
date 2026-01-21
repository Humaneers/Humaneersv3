"use client";

import Link from "next/link";
import { Phone, MapPin, Mail } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useContactModal } from "../providers/ContactModalProvider";
// import { APP_VERSION } from "../../version"; // Temporarily disabled if not easily resolved
const APP_VERSION = "0.3.0";

import { footerSections, footerMetaLinks } from "../../data/navigation";

export function Footer() {
  const { openModal } = useContactModal();
  return (
    <footer className="bg-brand-oxford text-gray-400 py-20 border-t border-brand-copper/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="flex items-center mb-6">
              <Image
                src="/WordMarkV-2.svg"
                alt="Humaneers"
                width={200}
                height={44}
                className="h-8 w-auto"
              />
            </div>
            <p className="max-w-sm mb-8 text-base leading-relaxed text-gray-400 font-light">
              Enterprise strategy for businesses and families. <br />
              Built with precision, delivered with soul.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <span className="inline-flex items-center px-3 py-1.5 border border-white/10 rounded-lg text-[10px] font-bold text-brand-copper uppercase tracking-[0.2em] bg-white/5 backdrop-blur-sm">
                SOC 2 Type II
              </span>
              <span className="inline-flex items-center px-3 py-1.5 border border-white/10 rounded-lg text-[10px] font-bold text-brand-copper uppercase tracking-[0.2em] bg-white/5 backdrop-blur-sm">
                HIPAA Compliant
              </span>
            </div>

            <div className="inline-flex items-center gap-2 bg-brand-slate/40 px-4 py-2 rounded-full text-xs font-medium text-brand-copper border border-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-copper animate-pulse"></span>
              Tempe, AZ &middot; El Paso, TX &middot; Flint, MI
            </div>
          </div>

          {/* Navigation Columns */}
          {footerSections.map((section) => (
            <div key={section.title} className="lg:col-span-2">
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6 border-b border-white/5 pb-2">
                {section.title}
              </h4>
              <ul className="space-y-4 text-sm">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.to ?? "#"}
                      className="hover:text-brand-copper transition-all duration-300 flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-[1px] bg-brand-copper mr-0 group-hover:mr-2 transition-all"></span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Column */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6 border-b border-white/5 pb-2">
              The Human Brief
            </h4>
            <p className="text-sm mb-6 leading-relaxed">
              Strategic insights on security, brand, and digital resilience.
            </p>
            <Button
              onClick={() => openModal("newsletter")}
              className="w-full bg-brand-copper hover:bg-brand-copper-dark justify-center h-auto py-3.5 text-xs font-bold tracking-widest uppercase gap-2 transition-all hover:translate-y-[-2px] shadow-lg hover:shadow-brand-copper/20"
            >
              <Mail className="w-4 h-4" />
              Subscribe
            </Button>
          </div>
        </div>

        {/* Lower Footer */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:grid md:grid-cols-3 gap-12 items-center md:items-start opacity-80">
          {/* Contact Row */}
          <div className="flex flex-col gap-5 items-center md:items-start">
            <div className="flex items-center gap-4 group">
              <div className="bg-white/5 p-2.5 rounded-xl text-brand-copper group-hover:bg-brand-copper/10 transition-colors">
                <Phone size={18} />
              </div>
              <a href="tel:+19284401505" className="text-sm hover:text-white transition-colors">
                (928) 440-1505
              </a>
            </div>
            <div className="flex items-start gap-4 group">
              <div className="bg-white/5 p-2.5 rounded-xl text-brand-copper group-hover:bg-brand-copper/10 transition-colors flex-shrink-0">
                <MapPin size={18} />
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=60+East+Rio+Salado+Parkway+Suite+900+Tempe+AZ+85281"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm leading-relaxed hover:text-white transition-colors text-center md:text-left"
              >
                60 E Rio Salado Pkwy <br />
                Suite 900, Tempe, AZ 85281
              </a>
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center md:justify-start">
            {footerMetaLinks.map((item) => (
              <Link
                key={item.label}
                href={item.to || item.href || "#"}
                target={item.external ? "_blank" : undefined}
                className="text-xs font-medium hover:text-brand-copper transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Rights & Identity */}
          <div className="flex flex-col items-start md:items-end gap-4 w-full">
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500 italic">"Built by humans with ❤️ + ☕️"</span>
              <span className="w-[1px] h-4 bg-white/10 hidden sm:block"></span>
              <span className="text-[10px] text-gray-600 font-mono py-1 px-2 bg-white/5 rounded">
                v{APP_VERSION}
              </span>
            </div>
            <p className="text-[10px] text-gray-600 text-left md:text-right max-w-xs leading-relaxed">
              &copy; {new Date().getFullYear()} Humaneers LLC. <br />
              "Humaneers" is a trademark of Human IP LP and is used under license.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
