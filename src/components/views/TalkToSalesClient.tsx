"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ShieldCheck, ArrowRight, Globe, Loader2, Building2, Home, Heart, Calendar as CalendarIcon } from "lucide-react";
import { submitSalesLead, validateSalesForm, type SalesFormData } from "../../lib/zoho";
import { toast } from "sonner";
import { createErrorReportLink } from "../../lib/utils";
import BookingsWidget from "../bookings/BookingsWidget";
import { BookingCalendar } from "../zoho/BookingCalendar";

type CustomerSegment = "business" | "personal" | "nonprofit" | null;

function TalkToSalesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [segment, setSegment] = useState<CustomerSegment>(null);

  // Disabled state: always "request"
  const [mode] = useState<"request" | "book">("request");

  // Disabled booking selection: always false
  const [wantToBook] = useState(false);

  const [formData, setFormData] = useState<SalesFormData>({
    firstName: "",
    lastName: "",
    email: searchParams.get("email") || "",
    company: "",
    website: "",
    role: "",
    employees: "",
    phone: "",
    budget: "",
    interests: searchParams.get("interest") ? [searchParams.get("interest")!] : ([] as string[]),
    message: "",
    source: searchParams.get("source") || "",
  });

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Detect crisis context
  const isCrisis =
    formData.interests.some(i => /crisis|emergency|reputation/i.test(i)) ||
    /crisis|emergency|reputation/i.test(formData.source || "");


  // Update wantToBook if crisis situation changes - DISABLED
  useEffect(() => {
    // Logic disabled to prevent booking access
  }, [isCrisis]);

  useEffect(() => {
    const interest = searchParams.get("interest");
    const segmentParam = searchParams.get("segment") as CustomerSegment;

    // Use explicit segment if provided, otherwise auto-detect
    if (segmentParam) {
      setSegment(segmentParam);
    } else if (
      interest?.toLowerCase().includes("family") ||
      interest?.toLowerCase().includes("home")
    ) {
      setSegment("personal");
    } else if (interest?.toLowerCase().includes("nonprofit")) {
      setSegment("nonprofit");
    } else if (interest) {
      setSegment("business");
    }
  }, [searchParams]);

  // Focus Management
  const firstNameRef = useRef<HTMLInputElement>(null);
  const stepTwoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (segment && step === 1) {
      setTimeout(() => {
        firstNameRef.current?.focus();
      }, 50);
    }
  }, [segment, step]);

  useEffect(() => {
    if (step === 2) {
      setTimeout(() => {
        stepTwoRef.current?.focus();
      }, 50);
    }
  }, [step]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      handleNext();
      return;
    }

    const validation = validateSalesForm(formData);
    if (!validation.valid) {
      toast.error(validation.errors[0]);
      return;
    }

    setIsSubmitting(true);

    try {
      const isHourlyPack = formData.interests.includes("Hourly Support");
      const messagePrefix = isHourlyPack
        ? `[HOURLY PACK REQUEST] [Segment: ${segment?.toUpperCase()}]`
        : `[Segment: ${segment?.toUpperCase()}]`;

      await submitSalesLead({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        company: segment === "personal" ? `${formData.lastName} Household` : formData.company,
        website: formData.website,
        role: segment === "personal" ? "Head of Household" : formData.role,
        employees: segment === "personal" ? "1-10" : formData.employees,
        phone: formData.phone,
        budget: formData.budget,
        interests: formData.interests,
        message: `${messagePrefix} ${formData.message}`,
        source: formData.source,
      } as SalesFormData);

      // If user wants to book (disabled, so always false)
      if (wantToBook) {
        setStep(3);
        toast.success("Request sent! Please select a time for your call.");
      } else {
        router.push("/thank-you");
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Failed to submit request.";
      const link = createErrorReportLink(error, `Sales Form (Full Page) - Segment: ${segment}`);
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
      setIsSubmitting(false);
    }
  };

  const handleBookingCompletion = async (_bookingData: unknown) => {
    // Booking is done, redirect to thank you
    router.push("/thank-you");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleInterestChange = (interest: string) => {
    setFormData((prev) => {
      const interests = prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests };
    });
  };

  const validateStepOne = () => {
    const errors: string[] = [];
    if (!formData.firstName.trim()) errors.push("First name is required");
    if (!formData.lastName.trim()) errors.push("Last name is required");
    if (!formData.email.trim()) errors.push("Email is required");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.push("Invalid email format");
    }

    return errors;
  };

  const handleNext = () => {
    const errors = validateStepOne();
    if (errors.length > 0) {
      toast.error(errors[0]);
      return;
    }
    setStep(2);
  };

  const sanitizeId = (text: string) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  };

  return (
    <div className="bg-brand-cream min-h-screen">
      <div className="bg-brand-oxford text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Let's Build Your Strategy</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Tell us about your situation—whether you're protecting a growing business or your family
            at home. In a crisis? We love to help now and discuss the rest later.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 -mt-10">
        <div className="grid md:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Sidebar */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-brand-copper text-white p-6 rounded-lg shadow-lg">
              <h3 className="font-bold text-xl mb-2">Why Humaneers?</h3>
              <p className="text-white/90 mb-4">
                We don't just fix computers. We align technology with your goals—at work or at home.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
                  <span className="text-sm">SOC 2 Compliant Security</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
                  <span className="text-sm">100% US-Based Team</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
                  <span className="text-sm">No Long-Term Lock-in</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow text-brand-slate">
              <p className="italic font-medium">
                "They fixed our immediate crisis in hours, then built a roadmap that actually made
                sense. Finally, IT that feels like a partner, not a vendor."
              </p>
              <div className="mt-4 text-sm font-bold text-brand-oxford">
                — Managing Partner, Accounting Firm
              </div>
            </div>
          </div>

          {/* Form */}
          <Card className="md:col-span-3 shadow-xl border-t-4 border-brand-oxford">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <CardTitle className="text-2xl text-brand-oxford">
                  {mode === 'request' ? "Request a Consultation" : "Book a Live Call"}
                </CardTitle>

                {/* Mode Toggle - Hidden but structure preserved */}
                <div className="hidden flex items-center p-1 bg-gray-100 rounded-lg self-start md:self-auto">
                  <button
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${mode === 'request'
                      ? "bg-white text-brand-oxford shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    Request Info
                  </button>
                  <button
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${mode === 'book'
                      ? "bg-white text-brand-copper shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    <CalendarIcon className="w-3.5 h-3.5" />
                    Book Now
                  </button>
                </div>
              </div>
              <CardDescription>
                {mode === 'request'
                  ? "Tell us who you are so we can route your request to the right team."
                  : "Skip the back-and-forth. Choose a time that works for you."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {mode === 'book' ? (
                <BookingCalendar />
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {!segment && (
                    <div className="grid grid-cols-1 gap-4 mb-6">
                      <button
                        type="button"
                        onClick={() => setSegment("business")}
                        className="flex items-center gap-4 p-4 border-2 border-gray-100 rounded-xl hover:border-brand-copper hover:bg-brand-cream/50 focus-visible:ring-2 focus-visible:ring-brand-copper focus:outline-none transition-all text-left group"
                      >
                        <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-brand-copper group-hover:text-white transition-colors text-blue-600">
                          <Building2 className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-bold text-brand-oxford">For My Business</div>
                          <div className="text-sm text-gray-500">
                            I need IT/Security for my company.
                          </div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSegment("personal")}
                        className="flex items-center gap-4 p-4 border-2 border-gray-100 rounded-xl hover:border-brand-copper hover:bg-brand-cream/50 focus-visible:ring-2 focus-visible:ring-brand-copper focus:outline-none transition-all text-left group"
                      >
                        <div className="bg-green-100 p-3 rounded-lg group-hover:bg-brand-copper group-hover:text-white transition-colors text-green-600">
                          <Home className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-bold text-brand-oxford">For Myself / Family</div>
                          <div className="text-sm text-gray-500">
                            I need protection for my home or myself.
                          </div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSegment("nonprofit")}
                        className="flex items-center gap-4 p-4 border-2 border-gray-100 rounded-xl hover:border-brand-copper hover:bg-brand-cream/50 focus-visible:ring-2 focus-visible:ring-brand-copper focus:outline-none transition-all text-left group"
                      >
                        <div className="bg-purple-100 p-3 rounded-lg group-hover:bg-brand-copper group-hover:text-white transition-colors text-purple-600">
                          <Heart className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-bold text-brand-oxford">For a Nonprofit</div>
                          <div className="text-sm text-gray-500">
                            I need to maximize impact & funding.
                          </div>
                        </div>
                      </button>
                    </div>
                  )}

                  {segment && (
                    <>
                      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-gray-400 border-b pb-4 mb-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 rounded-full text-[10px] ${segment === "business"
                              ? "bg-blue-100 text-blue-800"
                              : segment === "personal"
                                ? "bg-green-100 text-green-800"
                                : "bg-purple-100 text-purple-800"
                              }`}
                          >
                            {segment.toUpperCase()}
                          </span>
                          <button
                            type="button"
                            onClick={() => setSegment(null)}
                            className="underline hover:text-brand-copper lowercase"
                          >
                            change
                          </button>
                        </div>
                        <span>Step {step} of 2</span>
                      </div>

                      {step === 1 ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="firstName">First Name *</Label>
                              <Input
                                id="firstName"
                                name="firstName"
                                placeholder="Jane"
                                autoComplete="given-name"
                                required
                                ref={firstNameRef}
                                value={formData.firstName}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="lastName">Last Name *</Label>
                              <Input
                                id="lastName"
                                name="lastName"
                                placeholder="Doe"
                                autoComplete="family-name"
                                required
                                value={formData.lastName}
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="jane@example.com"
                              autoComplete="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                            />
                          </div>

                          {segment !== "personal" && (
                            <div className="space-y-2">
                              <Label htmlFor="company">Organization Name</Label>
                              <Input
                                id="company"
                                name="company"
                                placeholder="Acme Inc."
                                autoComplete="organization"
                                value={formData.company || ""}
                                onChange={handleChange}
                              />
                            </div>
                          )}

                          <Button
                            type="button"
                            onClick={handleNext}
                            className="w-full bg-brand-copper hover:bg-brand-copper-dark text-white text-lg py-6 h-auto"
                          >
                            Continue
                          </Button>
                        </div>
                      ) : step === 2 ? (
                        <div className="space-y-4">
                          {segment !== "personal" && (
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="website">Website URL</Label>
                                <div className="relative">
                                  <Globe className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                  <Input
                                    id="website"
                                    name="website"
                                    type="url"
                                    placeholder="https://acme.com"
                                    autoComplete="url"
                                    className="pl-9"
                                    value={formData.website}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="role">Your Role</Label>
                                <Input
                                  id="role"
                                  name="role"
                                  placeholder="Executive Director, Owner, etc."
                                  autoComplete="organization-title"
                                  value={formData.role}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          )}

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone Number</Label>
                              <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="(555) 123-4567"
                                autoComplete="tel"
                                ref={segment === "personal" ? stepTwoRef : undefined}
                                value={formData.phone}
                                onChange={handleChange}
                              />
                            </div>

                            {segment !== "personal" && (
                              <div className="space-y-2">
                                <Label htmlFor="employees">Team Size</Label>
                                <Select
                                  value={formData.employees}
                                  onValueChange={(val) => handleSelectChange("employees", val)}
                                >
                                  <SelectTrigger id="employees">
                                    <SelectValue placeholder="Select size" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="solo">Solo / Freelancer</SelectItem>
                                    <SelectItem value="1-10">1-10 People</SelectItem>
                                    <SelectItem value="11-50">11-50 People</SelectItem>
                                    <SelectItem value="51-200">51-200 People</SelectItem>
                                    <SelectItem value="201+">201+ People</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            )}
                          </div>

                          {/* Interests */}
                          <div className="space-y-3 pt-2">
                            <Label>What do you need help with?</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {(segment === "personal"
                                ? [
                                  "Emergency / Crisis",
                                  "Home Network Security",
                                  "Grandparent Protection",
                                  "Parental Controls",
                                  "General Tech Support",
                                ]
                                : segment === "nonprofit"
                                  ? [
                                    "Grant Readiness / Compliance",
                                    "Donor Data Protection",
                                    "Managed IT Services",
                                    "Volunteer Access Management",
                                    "Board Reporting",
                                  ]
                                  : [
                                    "Managed IT Services",
                                    "Fractional CIO/CMO",
                                    "Compliance (SOC2/HIPAA)",
                                    "Growth Strategy",
                                    "Emergency Support",
                                  ]
                              ).map((item) => {
                                const itemId = `interest-${sanitizeId(item)}`;
                                return (
                                  <div
                                    key={item}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => handleInterestChange(item)}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        handleInterestChange(item);
                                      }
                                    }}
                                    className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50 transition-colors cursor-pointer"
                                  >
                                    <Checkbox
                                      id={itemId}
                                      checked={formData.interests.includes(item)}
                                      onCheckedChange={() => handleInterestChange(item)}
                                      className="pointer-events-none" // Let parent div handle interactions to avoid double-toggles
                                    />
                                    <Label
                                      htmlFor={itemId}
                                      className="text-sm font-medium leading-none cursor-pointer w-full pointer-events-none"
                                    >
                                      {item}
                                    </Label>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="message">Anything specific you'd like to discuss?</Label>
                            <Textarea
                              id="message"
                              name="message"
                              placeholder={
                                segment === "personal"
                                  ? "e.g., I think I've been hacked..."
                                  : "Tell us about your current infrastructure or goals..."
                              }
                              className="min-h-[100px]"
                              value={formData.message}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
                            {isCrisis && (
                              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-2 rounded-r">
                                <div className="flex">
                                  <div className="flex-shrink-0">
                                    <ShieldCheck className="h-5 w-5 text-red-500" aria-hidden="true" />
                                  </div>
                                  <div className="ml-3">
                                    <p className="text-sm text-red-700 font-bold">
                                      For crisis or reputation emergencies, we prioritize speed. Please submit this form and we will contact you immediately.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Booking Checkbox - Hidden */}
                            <div className="hidden flex items-center gap-2 mb-2">
                              <Checkbox
                                id="wantToBook"
                                checked={wantToBook}
                                // onCheckedChange={(c) => setWantToBook(!!c)}
                                className={isCrisis ? "data-[state=checked]:bg-red-600 border-red-200" : ""}
                              />
                              <Label htmlFor="wantToBook" className={`font-semibold cursor-pointer ${isCrisis ? "text-red-700 font-bold" : "text-brand-oxford"}`}>
                                {isCrisis
                                  ? "Yes, schedule a priority consultation immediately."
                                  : "I want to schedule a consultation call immediately."
                                }
                              </Label>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setStep(1)}
                                className="w-full"
                              >
                                Back
                              </Button>
                              <Button
                                type="submit"
                                className="w-full bg-brand-copper hover:bg-brand-copper-dark text-white text-lg py-6 h-auto"
                              >
                                {isSubmitting ? (
                                  <><Loader2 className="mr-2 w-5 h-5 animate-spin" /> Processing...</>
                                ) : wantToBook ? (
                                  <>Continue to Booking <ArrowRight className="ml-2 w-5 h-5" /></>
                                ) : (
                                  <>Send Request <ArrowRight className="ml-2 w-5 h-5" /></>
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Step 3: Booking Widget Wrapper */
                        <div className="min-h-[400px]">
                          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
                            <strong>Success!</strong> Your initial request has been received. Now, let's lock in a time.
                          </div>
                          <BookingsWidget
                            context={{
                              source: formData.source,
                              email: formData.email, // Pass known fields to pre-fill if supported later
                              name: `${formData.firstName} ${formData.lastName}`,
                              phone: formData.phone
                            }}
                            onSubmit={handleBookingCompletion}
                          />
                        </div>
                      )}
                    </>
                  )}
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export function TalkToSalesClient() {
  return (
    <Suspense fallback={<Loader2 className="w-10 h-10 animate-spin mx-auto mt-20" />}>
      <TalkToSalesContent />
    </Suspense>
  );
}
