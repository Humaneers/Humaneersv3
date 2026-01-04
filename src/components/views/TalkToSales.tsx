import { useState, useEffect } from "react";
import { View } from "../../App";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { CheckCircle2, ShieldCheck, ArrowRight, Globe, Loader2 } from "lucide-react";
import { submitSalesForm } from "../../lib/api";
import { toast } from "sonner@2.0.3";

interface TalkToSalesProps {
  onViewChange: (view: View, data?: any) => void;
  initialData?: { email?: string; interest?: string };
}

export function TalkToSales({ onViewChange, initialData }: TalkToSalesProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: initialData?.email || "",
    company: "",
    website: "",
    role: "",
    employees: "",
    phone: "",
    budget: "",
    interests: initialData?.interest ? [initialData.interest] : [] as string[],
    message: ""
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Humaneers | Start a Conversation";
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitSalesForm(formData);
      setSubmitted(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInterestChange = (interest: string) => {
    setFormData(prev => {
      const interests = prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests };
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F5F1E9] py-20 px-6 flex items-center justify-center">
         <Card className="max-w-xl w-full border-t-4 border-[#B87333] shadow-xl">
            <CardHeader className="text-center pb-2">
               <div className="mx-auto bg-green-100 p-3 rounded-full w-fit mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
               </div>
               <CardTitle className="text-3xl font-bold text-[#1B263B]">Message Received</CardTitle>
               <CardDescription className="text-lg text-[#4E596F] mt-2">
                  Thanks for reaching out! A member of our sales team will be in touch within 24 hours to discuss your strategy.
               </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 flex justify-center">
               <Button 
                  onClick={() => onViewChange("home")}
                  className="bg-[#1B263B] text-white hover:bg-[#2c3b55]"
               >
                  Return Home
               </Button>
            </CardContent>
         </Card>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F1E9] min-h-screen">
      <div className="bg-[#1B263B] text-white py-16">
        <div className="container mx-auto px-6 text-center">
           <h1 className="text-4xl md:text-5xl font-bold mb-4">Let's Build Your Strategy</h1>
           <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Tell us about your organization and we'll design a custom roadmap for your IT and security needs.
           </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 -mt-10">
        <div className="grid md:grid-cols-5 gap-8 max-w-6xl mx-auto">
           {/* Sidebar / Value Prop */}
           <div className="md:col-span-2 space-y-6">
              <div className="bg-[#B87333] text-white p-6 rounded-lg shadow-lg">
                 <h3 className="font-bold text-xl mb-2">Why Humaneers?</h3>
                 <p className="text-white/90 mb-4">We don't just fix computers. We align technology with your business goals.</p>
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
              
              <div className="bg-white p-6 rounded-lg shadow text-[#4E596F]">
                 <p className="italic font-medium">"Humaneers helped us scale from 15 to 50 employees without a single hiccup in our operations. They are true partners."</p>
                 <div className="mt-4 text-sm font-bold text-[#1B263B]">— CEO, Legal Firm</div>
              </div>
           </div>

           {/* Form */}
           <Card className="md:col-span-3 shadow-xl border-t-4 border-[#1B263B]">
              <CardHeader>
                 <CardTitle className="text-2xl text-[#1B263B]">Request a Consultation</CardTitle>
                 <CardDescription>Fill out the form below and we'll get back to you shortly.</CardDescription>
              </CardHeader>
              <CardContent>
                 <form onSubmit={handleSubmit} className="space-y-4">
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

                    <div className="grid grid-cols-2 gap-4">
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
                    </div>

                    <div className="grid grid-cols-2 gap-4">
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
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <Label htmlFor="employees">Company Size *</Label>
                          <Select onValueChange={(val) => handleSelectChange('employees', val)} required>
                             <SelectTrigger>
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
                       <div className="space-y-2">
                          <Label htmlFor="budget">Monthly IT Budget</Label>
                          <Select onValueChange={(val) => handleSelectChange('budget', val)}>
                             <SelectTrigger>
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
                    </div>

                    <div className="space-y-3 pt-2">
                       <Label>What are you looking for?</Label>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {["Managed IT Services", "Cybersecurity Audit", "Compliance (SOC2/HIPAA)", "Fractional Leadership", "Cloud Migration", "Personal/Family IT"].map((item) => (
                             <div key={item} className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => handleInterestChange(item)}>
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

                    <Button type="submit" className="w-full bg-[#B87333] hover:bg-[#a0632a] text-white text-lg py-6 h-auto" disabled={isSubmitting}>
                       {isSubmitting ? (
                          <>Submitting... <Loader2 className="ml-2 w-5 h-5 animate-spin" /></>
                       ) : (
                          <>Submit Request <ArrowRight className="ml-2 w-5 h-5" /></>
                       )}
                    </Button>
                    <p className="text-xs text-center text-gray-500 mt-4">
                       By submitting this form, you agree to our Privacy Policy. Your data is secure and will never be sold.
                    </p>
                 </form>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}