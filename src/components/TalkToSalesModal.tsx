import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { CheckCircle2, ArrowRight, ShieldCheck, Globe } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

interface TalkToSalesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: { email?: string; interest?: string };
}

export function TalkToSalesModal({ open, onOpenChange, initialData }: TalkToSalesModalProps) {
  const [formData, setFormData] = useState({
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
    message: ""
  });
  
  const [submitted, setSubmitted] = useState(false);

  // Update form data when initialData changes
  useEffect(() => {
    if (open && initialData) {
      setFormData(prev => ({
        ...prev,
        email: initialData.email || prev.email,
        interests: initialData.interest ? [initialData.interest] : prev.interests
      }));
    }
  }, [open, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send data to the CRM
    console.log("Sales Lead Submitted:", formData);
    setSubmitted(true);
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

  const resetForm = () => {
    setSubmitted(false);
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
        message: ""
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden flex flex-col md:flex-row bg-[#F5F1E9]">
        {submitted ? (
          <div className="flex flex-col items-center justify-center w-full py-20 px-6 text-center bg-white">
             <div className="bg-green-100 p-4 rounded-full mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
             </div>
             <h2 className="text-3xl font-bold text-[#1B263B] mb-2">Message Received</h2>
             <p className="text-lg text-[#4E596F] max-w-md mb-8">
                Thanks for reaching out! A member of our sales team will be in touch within 24 hours to discuss your strategy.
             </p>
             <Button 
                onClick={resetForm}
                className="bg-[#1B263B] text-white hover:bg-[#2c3b55] px-8 py-3 h-auto"
             >
                Close
             </Button>
          </div>
        ) : (
          <>
            {/* Sidebar (Desktop) */}
            <div className="hidden md:block w-1/3 bg-[#1B263B] text-white p-8 overflow-y-auto">
               <h2 className="text-2xl font-bold mb-6">Let's Build Your Strategy</h2>
               <p className="text-gray-300 mb-8">
                  Tell us about your organization and we'll design a custom roadmap for your IT and security needs.
               </p>
               
               <div className="space-y-6">
                  <div className="bg-[#B87333] text-white p-4 rounded-lg shadow-lg">
                     <h3 className="font-bold mb-2">Why Humaneers?</h3>
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
                  
                  <div className="bg-white/10 p-4 rounded-lg text-gray-300 text-sm italic">
                     "Humaneers helped us scale from 15 to 50 employees without a single hiccup in our operations."
                  </div>
               </div>
            </div>

            {/* Form Area */}
            <div className="flex-1 bg-white overflow-y-auto max-h-[90vh]">
               <div className="p-6 md:p-8">
                 <DialogHeader className="mb-6 md:hidden">
                    <DialogTitle className="text-2xl font-bold text-[#1B263B]">Request Consultation</DialogTitle>
                    <DialogDescription>Tell us about your needs.</DialogDescription>
                 </DialogHeader>

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
                       <div className="grid grid-cols-1 gap-2">
                          {["Managed IT Services", "Cybersecurity Audit", "Compliance (SOC2/HIPAA)", "Fractional Leadership", "Cloud Migration", "Personal/Family IT"].map((item) => (
                             <div key={item} className="flex items-center space-x-2 border rounded-md p-2 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => handleInterestChange(item)}>
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
                          className="min-h-[80px]"
                          value={formData.message}
                          onChange={handleChange}
                       />
                    </div>

                    <Button type="submit" className="w-full bg-[#B87333] hover:bg-[#a0632a] text-white text-lg py-4 h-auto mt-4">
                       Submit Request <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    <p className="text-xs text-center text-gray-500 mt-2 pb-4">
                       By submitting this form, you agree to our Privacy Policy.
                    </p>
                 </form>
               </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
