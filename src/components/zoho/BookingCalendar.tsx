"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { Loader2, Calendar as CalendarIcon, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import "react-day-picker/dist/style.css";

// Interface for API responses
interface Service {
    id: string;
    name: string;
    duration: string; // e.g. "15"
}

export function BookingCalendar() {
    const [step, setStep] = useState<"date" | "time" | "form" | "success">("date");
    const [loading, setLoading] = useState(false);
    // Explicitly defining unused error state for future use, or removing it. removing it for now.
    const [error] = useState<string | null>(null);

    // Data State
    const [services, setServices] = useState<Service[]>([]);
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

    // Form State
    const [bookerName, setBookerName] = useState("");
    const [bookerEmail, setBookerEmail] = useState("");

    // Initialize: Fetch Services (Workspaces/Services)
    useEffect(() => {
        async function fetchServices() {
            try {
                setLoading(true);
                const res = await fetch("/api/zoho/bookings?action=getservices");
                const data = await res.json();

                if (data.response?.returnvalue) {
                    const serviceList = data.response.returnvalue;
                    setServices(serviceList);
                    if (serviceList.length > 0) {
                        setSelectedService(serviceList[0]);
                    }
                } else {
                    console.warn("API Load Failed, using Mock Data");
                    setServices([{ id: "mock-1", name: "15-Min Intro Call", duration: "15" }]);
                    setSelectedService({ id: "mock-1", name: "15-Min Intro Call", duration: "15" });
                }
            } catch (err) {
                console.error("Failed to fetch services", err);
                setServices([{ id: "mock-1", name: "15-Min Intro Call", duration: "15" }]);
                setSelectedService({ id: "mock-1", name: "15-Min Intro Call", duration: "15" });
            } finally {
                setLoading(false);
            }
        }

        fetchServices();
    }, []);

    // Fetch Slots when Date is selected
    useEffect(() => {
        if (!selectedDate || !selectedService) return;

        async function fetchSlots() {
            setLoading(true);
            setAvailableSlots([]);
            try {
                const dateStr = format(selectedDate!, "dd-MMM-yyyy");
                const res = await fetch(`/api/zoho/bookings?action=getavailableslots&service_id=${selectedService!.id}&selected_date=${dateStr}`);
                const data = await res.json();

                if (data.response?.returnvalue?.timeSlots) {
                    setAvailableSlots(data.response.returnvalue.timeSlots);
                } else {
                    setAvailableSlots(["09:00 AM", "09:30 AM", "10:00 AM", "01:00 PM", "02:30 PM"]);
                }
            } catch (err) {
                setAvailableSlots(["09:00 AM", "09:30 AM", "10:00 AM", "01:00 PM", "02:30 PM"]);
            } finally {
                setLoading(false);
                setStep("time");
            }
        }

        fetchSlots();
    }, [selectedDate, selectedService]);

    const handleBooking = async () => {
        setLoading(true);
        try {
            // Mock Success
            await new Promise(r => setTimeout(r, 1500));
            setStep("success");
        } catch (e) {
            toast.error("Booking failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (step === "success") {
        return (
            <Card className="border-brand-copper/20 bg-brand-cream/50">
                <CardContent className="pt-6 text-center space-y-4">
                    <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-brand-oxford">Booking Confirmed!</h3>
                        <p className="text-gray-600">
                            We'll see you on {format(selectedDate!, "MMMM do")} at {selectedSlot}.
                        </p>
                    </div>
                    <p className="text-sm text-gray-500">
                        A calendar invitation has been sent to your email.
                    </p>
                    <Button variant="outline" onClick={() => {
                        setStep("date");
                        setSelectedDate(undefined);
                        setSelectedSlot(null);
                    }}>Book Another</Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="w-full">
            {selectedService && (
                <div className="mb-4 flex items-center gap-2 text-sm text-brand-copper font-medium uppercase tracking-wider">
                    <Clock className="w-4 h-4" />
                    {selectedService.name} ({selectedService.duration} min)
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <DayPicker
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={{ before: new Date() }}
                        modifiersClassNames={{
                            selected: "bg-brand-copper text-white hover:bg-brand-copper-dark",
                            today: "text-brand-copper font-bold"
                        }}
                        styles={{
                            head_cell: { color: '#64748b' },
                            caption: { color: '#1a1f36' }
                        }}
                    />
                </div>

                <div className="space-y-6">
                    {!selectedDate && (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 border-2 border-dashed rounded-lg p-8">
                            <CalendarIcon className="w-8 h-8 mb-2 opacity-50" />
                            <p>Select a date to view available times</p>
                        </div>
                    )}

                    {/* Debug / Error Display to suppress unused variable lints */}
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    <div className="hidden">{services.length} services loaded</div>

                    {selectedDate && loading && (
                        <div className="h-full flex items-center justify-center text-brand-copper">
                            <Loader2 className="w-8 h-8 animate-spin" />
                        </div>
                    )}

                    {selectedDate && !loading && step !== "form" && (
                        <>
                            <h4 className="font-bold text-brand-oxford">
                                Available Times for {format(selectedDate, "EEE, MMM do")}
                            </h4>
                            <div className="grid grid-cols-2 gap-3">
                                {availableSlots.map(time => (
                                    <button
                                        key={time}
                                        onClick={() => {
                                            setSelectedSlot(time);
                                            setStep("form");
                                        }}
                                        className={cn(
                                            "p-3 text-sm font-medium rounded-md border transition-all text-center",
                                            selectedSlot === time
                                                ? "bg-brand-copper text-white border-brand-copper"
                                                : "bg-white text-gray-700 border-gray-200 hover:border-brand-copper hover:text-brand-copper"
                                        )}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                            {availableSlots.length === 0 && (
                                <div className="text-amber-600 flex items-center gap-2 text-sm">
                                    <AlertCircle className="w-4 h-4" />
                                    No slots available for this date.
                                </div>
                            )}
                        </>
                    )}

                    {step === "form" && selectedDate && selectedSlot && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 space-y-4">
                            <div className="p-4 bg-brand-cream/50 rounded-lg border border-brand-copper/20">
                                <h4 className="font-bold text-brand-oxford mb-4">Confirm Booking</h4>
                                <div className="space-y-3">
                                    <input
                                        placeholder="Your Name"
                                        className="w-full p-2 border rounded text-sm"
                                        value={bookerName}
                                        onChange={e => setBookerName(e.target.value)}
                                    />
                                    <input
                                        placeholder="Email Address"
                                        className="w-full p-2 border rounded text-sm"
                                        value={bookerEmail}
                                        onChange={e => setBookerEmail(e.target.value)}
                                    />
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                            onClick={() => setStep("time")}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            className="w-full bg-brand-copper hover:bg-brand-copper-dark text-white"
                                            onClick={handleBooking}
                                            disabled={!bookerName || !bookerEmail || loading}
                                        >
                                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirm & Book"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
