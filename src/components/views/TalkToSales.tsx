import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ShieldCheck, ArrowRight, Globe, Loader2 } from "lucide-react";
import { submitSalesLead, validateSalesForm, type SalesFormData } from "../../lib/zoho";
import { toast } from "sonner";
import { Seo } from "../Seo";

type TalkToSalesState = { email?: string; interest?: string; source?: string } | null;

export function TalkToSales() {
  const location = useLocation();
  const initialData = (location.state as TalkToSalesState) ?? {};
  const [formData, setFormData] = useState<SalesFormData>({
    firstName: "",
    lastName: "",
    email: initialData?.email || "",
    company: "",
    website: "",
    role: "",
    employees: "",
    phone: "",
    budget: "",
    interests: initialData?.interest ? [initialData.interest] : ([] as string[]),
    message: "",
  });

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!initialData?.email && !initialData?.interest) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      email: initialData?.email || prev.email,
      interests: initialData?.interest ? [initialData.interest] : prev.interests,
    }));
  }, [initialData?.email, initialData?.interest]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      handleNext();
      return;
    }

    // Validate form data
    const validation = validateSalesForm(formData);
    if (!validation.valid) {
      toast.error(validation.errors[0]);
      return;
    }

    setIsSubmitting(true);

    try {
      await submitSalesLead({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        company: formData.company,
        website: formData.website,
        role: formData.role,
        employees: formData.employees,
        phone: formData.phone,
        budget: formData.budget,
        interests: formData.interests,
        message: formData.message
      } as SalesFormData);

      toast.success("Thanks! We've received your request and will be in touch shortly.");

      // Reset form or redirect to a thank you page if desired
      setStep(1);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        website: "",
        role: "",
        employees: "",
        phone: "",
        budget: "",
        interests: [],
        message: "",
      });

    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to submit request. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
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
    if (!formData.company.trim()) errors.push("Company name is required");

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

  return (
    <Seo
      title="Contact Sales | Humaneers | Schedule a Consultation"
      description="Ready to secure your business or home? Schedule a consultation with our US-based team to discuss your IT and security needs."
      canonicalPath="/talk-to-sales"
    >
      <div className="bg-brand-cream min-h-screen">
        <div className="bg-brand-oxford text-white py-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Let's Build Your Strategy</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Tell us about your organization and we'll design a custom roadmap for your IT and
              security needs. In a crisis? We love to help now and discuss the rest later.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-6 py-12 -mt-10">
          <div className="grid md:grid-cols-5 gap-8 max-w-6xl mx-auto">
            {/* Sidebar / Value Prop */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-brand-copper text-white p-6 rounded-lg shadow-lg">
                <h3 className="font-bold text-xl mb-2">Why Humaneers?</h3>
                <p className="text-white/90 mb-4">
                  We don't just fix computers. We align technology with your business goals.
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
                  "Humaneers helped us scale from 15 to 50 employees without a single hiccup in our
                  operations. They are true partners."
                </p>
                <div className="mt-4 text-sm font-bold text-brand-oxford">— CEO, Legal Firm</div>
              </div>
            </div>

            {/* Form */}
            <Card className="md:col-span-3 shadow-xl border-t-4 border-brand-oxford">
              <CardHeader>
                <CardTitle className="text-2xl text-brand-oxford">Request a Consultation</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you shortly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-gray-400">
                    <span>Step {step} of 2</span>
                    <span>{step === 1 ? "Contact details" : "Project details"}</span>
                  </div>

                  {step === 1 ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
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
                          <Label htmlFor="lastName">Last Name *</Label>
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
                        <Label htmlFor="email">Work Email *</Label>
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
                        <Label htmlFor="company">Company Name *</Label>
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
                        type="button"
                        onClick={handleNext}
                        className="w-full bg-brand-copper hover:bg-brand-copper-dark text-white text-lg py-6 h-auto"
                      >
                        Continue
                      </Button>
                    </>
                  ) : (
                    <>
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
                              className="pl-9"
                              value={formData.website}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role">Job Title *</Label>
                          <Input
                            id="role"
                            name="role"
                            placeholder="CEO, CTO, etc."
                            required
                            value={formData.role}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="(555) 123-4567"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="employees">Company Size *</Label>
                          <Select
                            value={formData.employees}
                            onValueChange={(val) => handleSelectChange("employees", val)}
                            required
                          >
                            <SelectTrigger id="employees">
                              <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-10">1-10 Employees</SelectItem>
                              <SelectItem value="11-50">11-50 Employees</SelectItem>
                              <SelectItem value="51-200">51-200 Employees</SelectItem>
                              <SelectItem value="201+">201+ Employees</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="budget">Monthly IT Budget</Label>
                        <Select
                          value={formData.budget}
                          onValueChange={(val) => handleSelectChange("budget", val)}
                        >
                          <SelectTrigger id="budget">
                            <SelectValue placeholder="Select range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="<2k">Less than $2,000</SelectItem>
                            <SelectItem value="2k-5k">$2,000 - $5,000</SelectItem>
                            <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                            <SelectItem value="10k+">$10,000+</SelectItem>
                            <SelectItem value="unsure">Unsure / Not set</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3 pt-2">
                        <Label>What are you looking for?</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {[
                            "Managed IT Services",
                            "Cybersecurity Audit",
                            "Compliance (SOC2/HIPAA)",
                            "Fractional Leadership",
                            "Cloud Migration",
                            "Personal/Family IT",
                          ].map((item) => (
                            <div
                              key={item}
                              className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                              <Checkbox
                                id={`interest-${item}`}
                                checked={formData.interests.includes(item)}
                                onCheckedChange={() => handleInterestChange(item)}
                              />
                              <label
                                htmlFor={`interest-${item}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer w-full"
                              >
                                {item}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Anything specific you'd like to discuss?</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell us about your current infrastructure or goals..."
                          className="min-h-[100px]"
                          value={formData.message}
                          onChange={handleChange}
                        />
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
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              Submitting Request...{" "}
                              <Loader2 className="ml-2 w-5 h-5 animate-spin" />
                            </>
                          ) : (
                            <>
                              Submit Request <ArrowRight className="ml-2 w-5 h-5" />
                            </>
                          )}
                        </Button>
                      </div>
                      <p className="text-xs text-center text-gray-500 mt-4">
                        By submitting this form, you agree to our Privacy Policy. Your data is secure
                        and will never be sold.
                      </p>
                    </>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Seo>
  );
}
