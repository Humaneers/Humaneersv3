import BookingsWidget from "@/components/bookings/BookingsWidget";
import { Metadata } from "next";

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
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Choose a time that works best for you. We'll discuss your vision and how our modern craftsmanship can bring it to life.
                </p>
            </div>

            <BookingsWidget />
        </main>
    );
}
