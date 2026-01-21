"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import { redirectToSalesBooking, validateSalesForm, type SalesFormData } from "../lib/cal";
import { toast } from "sonner";

interface TalkToSalesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: { email?: string; interest?: string };
}

export function TalkToSalesModal({ open, onOpenChange, initialData }: TalkToSalesModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<SalesFormData>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    website: "",
    role: "",
    employees: "",
    phone: "",
    budget: "",
    interests: [] as string[],
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form data when initialData changes
  useEffect(() => {
    if (open && initialData) {
      setFormData((prev) => ({
        ...prev,
        email: initialData.email || prev.email,
        interests: initialData.interest ? [initialData.interest] : prev.interests,
      }));
    }
  }, [open, initialData]);

  // Reset to step 1 when modal closes
  useEffect(() => {
    if (!open) {
      setStep(1);
    }
  }, [open]);

  const handleStep1Next = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate step 1 fields
    if (!formData.email || !formData.company) {
      toast.error("Please fill in all required fields");
      return;
    }

    setStep(2);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    const validation = validateSalesForm(formData);
    if (!validation.valid) {
      toast.error(validation.errors[0]);
      return;
    }

    setIsSubmitting(true);

    try {
      // Redirect to Cal.com booking with form data
      redirectToSalesBooking(formData);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to redirect to booking. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterestChange = (interest: string) => {
    setFormData((prev) => {
      const interests = prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests };
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] p-0 bg-white">
        <div className="flex flex-col h-full">
          <div className="px-6 py-6 border-b border-gray-100 bg-gray-50/50">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-brand-oxford">
                Start a Conversation
              </DialogTitle>
              <DialogDescription>
                {step === 1 ? "Let's start with the basics" : "Tell us about your needs"}
              </DialogDescription>
            </DialogHeader>

            {/* Progress Indicator */}
            <div className="flex gap-2 mt-4">
              <div
                className={`h-1 flex-1 rounded transition-colors ${step === 1 ? "bg-brand-copper" : "bg-gray-200"}`}
              />
              <div
                className={`h-1 flex-1 rounded transition-colors ${step === 2 ? "bg-brand-copper" : "bg-gray-200"}`}
              />
            </div>
          </div>

          <div className="p-6 overflow-y-auto">
            {step === 1 ? (
              /* STEP 1: Email + Company */
              <form onSubmit={handleStep1Next} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      First Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="Jane"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">
                      Last Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Work Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jane@company.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">
                    Company <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Acme Inc."
                    required
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-brand-copper hover:bg-brand-copper-dark text-white h-14 mt-6"
                >
                  Continue <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            ) : (
              /* STEP 2: Details + Interests */
              <form onSubmit={handleFinalSubmit} className="space-y-5">
                {initialData?.interest && formData.interests.includes(initialData.interest) && (
                  <div className="bg-brand-cream border-2 border-brand-copper rounded-lg p-4 mb-4">
                    <p className="text-sm text-brand-oxford">
                      <strong>You're interested in:</strong> {initialData.interest}
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="role">
                    Your Role <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="role"
                    name="role"
                    placeholder="e.g., CEO, CTO, Marketing Director"
                    required
                    value={formData.role}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-3 pt-2">
                  <Label>What are you interested in?</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "Managed IT",
                      "Brand & Growth",
                      "Cybersecurity",
                      "Compliance",
                      "Leadership",
                      "Cloud",
                      "Family IT",
                    ].map((item) => (
                      <div key={item} className="flex items-center space-x-2">
                        <Checkbox
                          id={`modal-interest-${item}`}
                          checked={formData.interests.includes(item)}
                          onCheckedChange={() => handleInterestChange(item)}
                        />
                        <label
                          htmlFor={`modal-interest-${item}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {item}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">How can we help? (Optional)</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your challenges or goals..."
                    className="min-h-[100px]"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-brand-copper hover:bg-brand-copper-dark text-white h-14"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Redirecting...
                      </>
                    ) : (
                      "Schedule Meeting"
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
