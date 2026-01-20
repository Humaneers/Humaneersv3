import { EmailActionButton } from "@/components/ui/email-action-button";
import { Metadata } from "next";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Book a Consultation | Humaneers",
  description: "Schedule a time to speak with our team about your bespoke web development needs.",
};

export default function BookingPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-4 bg-gray-50 dark:bg-black">
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          Schedule a Consultation
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
          Choose a time that works best for you. We'll discuss your vision and how our modern
          craftsmanship can bring it to life.
        </p>

        <div className="bg-white p-8 rounded-xl shadow-lg inline-block">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="bg-brand-cream/50 p-6 rounded-full">
              <ArrowRight className="w-12 h-12 text-brand-copper" />
            </div>
            <div className="max-w-md">
              <p className="text-brand-slate mb-8">
                Please send us an email to coordinate a time for your consultation.
              </p>
              <EmailActionButton
                label="Email to Book"
                email="hello@humaneers.dev"
                subject="Booking Request: Consultation"
                className="w-full sm:w-auto bg-brand-copper hover:bg-brand-copper-dark"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
