import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { CheckCircle2, Loader2 } from "lucide-react";
import { submitSalesForm } from "../lib/api";
import { toast } from "sonner";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-0 bg-white">
        {submitted ? (
          <div className="flex flex-col items-center justify-center w-full py-16 px-8 text-center">
             <div className="bg-green-100 p-4 rounded-full mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
             </div>
             <h2 className="text-2xl font-bold text-[#1B263B] mb-2">Message Received</h2>
             <p className="text-[#4E596F] max-w-sm mb-8">
                Thanks for reaching out! A member of our sales team will be in touch within 24 hours.
             </p>
             <Button 
                onClick={resetForm}
                className="bg-[#1B263B] text-white hover:bg-[#2c3b55] px-8"
             >
                Close
             </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="px-6 py-6 border-b border-gray-100 bg-gray-50/50">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-[#1B263B]">Start a Conversation</DialogTitle>
                    <DialogDescription>
                        Tell us about your organization and we'll design a custom roadmap.
                    </DialogDescription>
                </DialogHeader>
            </div>

            <div className="p-6">
                 <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
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
                          <Label htmlFor="lastName">Last Name</Label>
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
                       <Label htmlFor="email">Work Email</Label>
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
                          <Label htmlFor="company">Company</Label>
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
                          <Label htmlFor="website">Website</Label>
                          <Input 
                             id="website" 
                             name="website" 
                             type="url"
                             placeholder="acme.com" 
                             value={formData.website}
                             onChange={handleChange}
                          />
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="employees">Size</Label>
                            <Select onValueChange={(val) => handleSelectChange('employees', val)} required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1-10">1-10</SelectItem>
                                    <SelectItem value="11-50">11-50</SelectItem>
                                    <SelectItem value="51-200">51-200</SelectItem>
                                    <SelectItem value="201+">201+</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="budget">Budget (Monthly)</Label>
                            <Select onValueChange={(val) => handleSelectChange('budget', val)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="<2k">&lt; $2k</SelectItem>
                                    <SelectItem value="2k-5k">$2k - $5k</SelectItem>
                                    <SelectItem value="5k-10k">$5k - $10k</SelectItem>
                                    <SelectItem value="10k+">$10k+</SelectItem>
                                    <SelectItem value="unsure">Unsure</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-3 pt-2">
                       <Label>Interests</Label>
                       <div className="grid grid-cols-2 gap-3">
                          {["Managed IT", "Cybersecurity", "Compliance", "Leadership", "Cloud", "Family IT"].map((item) => (
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
                       <Label htmlFor="message">Message (Optional)</Label>
                       <Textarea 
                          id="message" 
                          name="message" 
                          placeholder="How can we help?" 
                          className="min-h-[80px]"
                          value={formData.message}
                          onChange={handleChange}
                       />
                    </div>

                    <Button type="submit" className="w-full bg-[#B87333] hover:bg-[#a0632a] text-white py-5 mt-2" disabled={isSubmitting}>
                       {isSubmitting ? (
                          <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
                       ) : (
                          "Submit Request"
                       )}
                    </Button>
                 </form>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}