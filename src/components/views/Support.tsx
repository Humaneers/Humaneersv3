import { useState, useEffect } from "react";
import { View } from "../../App";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { LifeBuoy, ArrowRight, Loader2, Clock, Shield, Headphones } from "lucide-react";
import { redirectToSupportBooking, validateSupportForm, type SupportFormData } from "../../lib/cal";
import { toast } from "sonner";

interface SupportProps {
  onViewChange: (view: View) => void;
}

export function Support({ onViewChange }: SupportProps) {
  const [formData, setFormData] = useState<SupportFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    priority: "",
    category: "",
    subject: "",
    description: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Humaneers | Support";
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    const validation = validateSupportForm(formData);
    if (!validation.valid) {
      toast.error(validation.errors[0]);
      return;
    }

    setIsSubmitting(true);

    try {
      // Redirect to Cal.com booking with support ticket data
      redirectToSupportBooking(formData);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to redirect to booking. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-[#F5F1E9] min-h-screen">
      <section className="bg-[#1B263B] text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#B87333]/20 rounded-full mb-6">
            <LifeBuoy className="w-8 h-8 text-[#B87333]" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Support Center</h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
            Submit a support ticket and our engineering team will respond promptly.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 max-w-6xl mx-auto">
            {/* Support Info Side */}
            <div className="lg:w-1/3 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-[#1B263B] mb-6">Need Help?</h2>
                <p className="text-[#4E596F] mb-8">
                  Fill out the form to submit a support ticket. Our team monitors tickets during business hours and will respond based on priority level.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-500">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-red-500" />
                    <h3 className="font-bold text-[#1B263B]">Critical (P1)</h3>
                  </div>
                  <p className="text-sm text-[#4E596F]">System down or data breach. Response within 15 minutes.</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-orange-500">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-orange-500" />
                    <h3 className="font-bold text-[#1B263B]">High (P2)</h3>
                  </div>
                  <p className="text-sm text-[#4E596F]">Major functionality impacted. Response within 1 hour.</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-500">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-yellow-500" />
                    <h3 className="font-bold text-[#1B263B]">Medium (P3)</h3>
                  </div>
                  <p className="text-sm text-[#4E596F]">Minor issue with workaround. Response within 4 hours.</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <h3 className="font-bold text-[#1B263B]">Low (P4)</h3>
                  </div>
                  <p className="text-sm text-[#4E596F]">General question or request. Response within 24 hours.</p>
                </div>
              </div>

              <div className="bg-[#1B263B] p-6 rounded-lg text-white">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-5 h-5 text-[#B87333]" />
                  <h3 className="font-bold">Security Issues?</h3>
                </div>
                <p className="text-sm text-gray-300 mb-4">
                  For security vulnerabilities, please email security@humaneers.co directly with details.
                </p>
                <div className="flex items-center gap-3">
                  <Headphones className="w-5 h-5 text-[#B87333]" />
                  <h3 className="font-bold">Existing Client?</h3>
                </div>
                <p className="text-sm text-gray-300 mt-2">
                  Retainer clients can also reach us directly via your dedicated support channel.
                </p>
              </div>
            </div>

            {/* Form Side */}
            <div className="lg:w-2/3">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Jane Doe"
                          required
                          className="h-12 bg-gray-50 border-gray-200"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="jane@company.com"
                          required
                          className="h-12 bg-gray-50 border-gray-200"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone (Optional)</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="(555) 123-4567"
                          className="h-12 bg-gray-50 border-gray-200"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company (Optional)</Label>
                        <Input
                          id="company"
                          name="company"
                          placeholder="Acme Inc."
                          className="h-12 bg-gray-50 border-gray-200"
                          value={formData.company}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="priority">Priority Level</Label>
                        <Select onValueChange={handleSelectChange("priority")} required>
                          <SelectTrigger className="h-12 bg-gray-50 border-gray-200">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="critical">Critical (P1) - System Down</SelectItem>
                            <SelectItem value="high">High (P2) - Major Impact</SelectItem>
                            <SelectItem value="medium">Medium (P3) - Minor Issue</SelectItem>
                            <SelectItem value="low">Low (P4) - General Question</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select onValueChange={handleSelectChange("category")} required>
                          <SelectTrigger className="h-12 bg-gray-50 border-gray-200">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technical">Technical Issue</SelectItem>
                            <SelectItem value="account">Account / Billing</SelectItem>
                            <SelectItem value="security">Security Concern</SelectItem>
                            <SelectItem value="feature">Feature Request</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="Brief description of the issue"
                        required
                        className="h-12 bg-gray-50 border-gray-200"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Please provide as much detail as possible: What happened? What were you trying to do? Any error messages?"
                        className="min-h-[150px] bg-gray-50 border-gray-200"
                        required
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </div>

                    <Button type="submit" className="w-full bg-[#1B263B] hover:bg-[#2c3b55] text-white text-lg py-6 h-auto" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>Redirecting to Booking... <Loader2 className="ml-2 w-5 h-5 animate-spin" /></>
                      ) : (
                        <>Continue to Schedule Support Call <ArrowRight className="ml-2 w-5 h-5" /></>
                      )}
                    </Button>
                  </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
