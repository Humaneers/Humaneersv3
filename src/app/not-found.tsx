"use client";

import Link from "next/link";
import { Button } from "../components/ui/button";
import { Home, Search, MessageSquare } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-20 bg-brand-cream">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-brand-oxford/5 text-brand-oxford">
          <Search size={40} strokeWidth={1.5} />
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-brand-oxford mb-6 tracking-tight">
          System 404: Route Not Found
        </h1>

        <p className="text-xl text-brand-slate mb-10 leading-relaxed font-light">
          The page you are looking for has been moved, archived, or never existed in our current
          infrastructure.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <Link href="/" className="w-full">
            <Button
              variant="outline"
              className="w-full py-6 text-lg border-brand-oxford/20 text-brand-oxford hover:bg-brand-oxford hover:text-white transition-all group"
            >
              <Home className="mr-2 h-5 w-5" /> Return Home
            </Button>
          </Link>
          <Link href="/contact" className="w-full">
            <Button
              className="w-full py-6 text-lg bg-brand-copper hover:bg-brand-copper/90 text-white shadow-lg transition-all"
              withArrow
            >
              <MessageSquare className="mr-2 h-5 w-5" /> Get Support
            </Button>
          </Link>
        </div>

        <div className="pt-8 border-t border-brand-oxford/10">
          <p className="text-sm text-brand-slate uppercase tracking-widest font-medium mb-4">
            Popular Destinations
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/managed-it"
              className="text-brand-oxford hover:text-brand-copper transition-colors font-medium"
            >
              Managed IT
            </Link>
            <Link
              href="/pricing"
              className="text-brand-oxford hover:text-brand-copper transition-colors font-medium"
            >
              Pricing
            </Link>
            <Link
              href="/security"
              className="text-brand-oxford hover:text-brand-copper transition-colors font-medium"
            >
              Security
            </Link>
            <Link
              href="/about"
              className="text-brand-oxford hover:text-brand-copper transition-colors font-medium"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
