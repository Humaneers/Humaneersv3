import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import {
  LifeBuoy,
  ArrowRight,
  Loader2,
  Clock,
  Shield,
  Headphones,
  CheckCircle2,
  Phone,
  ChevronDown,
} from "lucide-react";
import { submitSupportTicket, validateSupportForm, type SupportFormData } from "../../lib/zoho";
import { toast } from "sonner";
import { Seo } from "../Seo";

export function Support() {
  const location = useLocation();
  const initialSource = (location.state as { source?: string })?.source;

  const [formData, setFormData] = useState<SupportFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    priority: "",
    category: "",
    subject: "",
    description: "",
    source: initialSource || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqItems = [
    {
      question: "Do I need to be an existing client to get help?",
      answer: "No! We welcome new clients who need immediate help. We'll fix what's broken first and discuss ongoing partnership afterward. Crisis clients are always welcome."
    },
    {
      question: "What's the fastest way to get help for a critical issue?",
      answer: "For P1 Critical issues (system down, data breach, active security incident), call our emergency hotline directly. For other issues, submit a ticket and select the appropriate priority level."
    },
    {
      question: "What information should I include in my ticket?",
      answer: "Include: what happened, when it started, what you were trying to do, any error messages, and which systems are affected. The more detail you provide, the faster we can help."
    },
    {
      question: "How do priority levels work?",
      answer: "P1 (Critical): System down, 15-min response. P2 (High): Major impact, 1-hr response. P3 (Medium): Minor issue with workaround, 4-hr response. P4 (Low): Questions/requests, 24-hr response."
    },
    {
      question: "What are your support hours?",
      answer: "Our team monitors tickets during business hours (Mon-Fri, 8am-6pm MST). For P1 Critical issues, our emergency hotline provides 24/7 coverage."
    }
  ];

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
      await submitSupportTicket(formData);
      setIsSuccess(true);
      toast.success("Your support ticket has been submitted!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to submit ticket. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Seo
      title="Humaneers | Support Center | Submit a Ticket"
      description="Submit a support ticket to our US-based engineering team. Priority support for critical issues, system outages, and security concerns."
      canonicalPath="/support"
    >
      <div className="bg-brand-cream min-h-screen">
        <section className="bg-brand-oxford text-white py-20">
          <div className="container mx-auto px-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-copper/20 rounded-full mb-6">
              <LifeBuoy className="w-8 h-8 text-brand-copper" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Support Center</h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
              Submit a support ticket and our engineering team will respond promptly. We welcome new
              clients in crisis — we'll fix what's wrong now and discuss the rest later.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16 max-w-6xl mx-auto">
              {/* Support Info Side */}
              <div className="lg:w-1/3 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-brand-oxford mb-6">Need Help?</h2>
                  <p className="text-brand-slate mb-8">
                    Fill out the form to submit a support ticket. We welcome new clients who need
                    immediate help. Our team monitors tickets during business hours and will respond
                    based on priority level.
                  </p>
                </div>

                {/* Emergency Hotline */}
                <div className="bg-red-50 border-2 border-red-500 rounded-lg p-5 mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-red-500 p-2 rounded-full">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-red-700 text-lg">Emergency Hotline</h3>
                  </div>
                  <p className="text-sm text-red-700 mb-3">
                    For critical P1 issues (system down, active breach, data loss) call us directly:
                  </p>
                  <a
                    href="tel:+19284401505"
                    className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-5 rounded-lg transition-colors text-lg"
                  >
                    <Phone className="w-5 h-5" />
                    (928) 440-1505
                  </a>
                  <p className="text-xs text-red-600 mt-2">Available 24/7 for critical emergencies</p>
                </div>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-500">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="w-5 h-5 text-red-500" />
                      <h3 className="font-bold text-brand-oxford">Critical (P1)</h3>
                    </div>
                    <p className="text-sm text-brand-slate">
                      System down or data breach. Response within 15 minutes.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-orange-500">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="w-5 h-5 text-orange-500" />
                      <h3 className="font-bold text-brand-oxford">High (P2)</h3>
                    </div>
                    <p className="text-sm text-brand-slate">
                      Major functionality impacted. Response within 1 hour.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-500">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="w-5 h-5 text-yellow-500" />
                      <h3 className="font-bold text-brand-oxford">Medium (P3)</h3>
                    </div>
                    <p className="text-sm text-brand-slate">
                      Minor issue with workaround. Response within 4 hours.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="w-5 h-5 text-blue-500" />
                      <h3 className="font-bold text-brand-oxford">Low (P4)</h3>
                    </div>
                    <p className="text-sm text-brand-slate">
                      General question or request. Response within 24 hours.
                    </p>
                  </div>
                </div>

                <div className="bg-brand-oxford p-6 rounded-lg text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="w-5 h-5 text-brand-copper" />
                    <h3 className="font-bold">Security Issues?</h3>
                  </div>
                  <p className="text-sm text-gray-300 mb-4">
                    For security vulnerabilities, please email security@humaneers.dev directly with
                    details.
                  </p>
                  <div className="flex items-center gap-3">
                    <Headphones className="w-5 h-5 text-brand-copper" />
                    <h3 className="font-bold">New to Humaneers?</h3>
                  </div>
                  <p className="text-sm text-gray-300 mt-2">
                    We love to help now and can discuss what's next after fixing what's wrong. New
                    crisis clients are always welcome.
                  </p>
                </div>
              </div>

              {/* Form Side */}
              <div className="lg:w-2/3">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                  {isSuccess ? (
                    <div className="py-10 text-center space-y-4">
                      <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Ticket Submitted!</h3>
                      <p className="text-gray-600 max-w-sm mx-auto">
                        We've received your support request and will respond based on the priority
                        level.
                      </p>
                    </div>
                  ) : (
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
                            <SelectTrigger
                              id="priority"
                              className="h-12 bg-gray-50 border-gray-200"
                            >
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="critical">Critical (P1) | System Down</SelectItem>
                              <SelectItem value="high">High (P2) | Major Impact</SelectItem>
                              <SelectItem value="medium">Medium (P3) | Minor Issue</SelectItem>
                              <SelectItem value="low">Low (P4) | General Question</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select onValueChange={handleSelectChange("category")} required>
                            <SelectTrigger
                              id="category"
                              className="h-12 bg-gray-50 border-gray-200"
                            >
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

                      <Button
                        type="submit"
                        className="w-full bg-brand-copper hover:bg-brand-copper-dark text-white text-lg py-6 h-auto"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            Submitting... <Loader2 className="ml-2 w-5 h-5 animate-spin" />
                          </>
                        ) : (
                          <>
                            Send Support Ticket <ArrowRight className="ml-2 w-5 h-5" />
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-brand-oxford mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-brand-cream rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-brand-cream/80 transition-colors"
                  >
                    <span className="font-semibold text-brand-oxford">{item.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-brand-copper transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-brand-slate">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Seo>
  );
}
