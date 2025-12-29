import { useState, useEffect } from "react";
import { View } from "../../App";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Mail, MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import { Card, CardContent } from "../ui/card";

interface ContactProps {
  onViewChange: (view: View) => void;
}

export function Contact({ onViewChange }: ContactProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    category: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Humaneers | Contact Us";
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.category === "sales") {
       onViewChange("talk-to-sales");
       return;
    }
    console.log("Contact Form Submitted:", formData);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  return (
    <div className="bg-[#F5F1E9] min-h-screen">
      <section className="bg-[#1B263B] text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Let's Build Something<br/>That Lasts.</h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
            Whether you need a full IT overhaul or a fractional leader, we're ready to listen.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 max-w-6xl mx-auto">
            {/* Contact Info Side */}
            <div className="lg:w-1/3 space-y-10">
               <div>
                  <h2 className="text-2xl font-bold text-[#1B263B] mb-6">Get in Touch</h2>
                  <p className="text-[#4E596F] mb-8">
                     Fill out the form to route your inquiry directly to the right engineer or strategist. We typically respond within 2 hours during business hours.
                  </p>
               </div>
               
               <div className="space-y-6">
                  <div className="flex items-start gap-4">
                     <div className="bg-white p-3 rounded-full shadow-sm text-[#B87333]">
                        <Mail className="w-6 h-6" />
                     </div>
                     <div>
                        <h3 className="font-bold text-[#1B263B]">Email</h3>
                        <p className="text-[#4E596F]">hello@humaneers.dev</p>
                     </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                     <div className="bg-white p-3 rounded-full shadow-sm text-[#B87333]">
                        <MapPin className="w-6 h-6" />
                     </div>
                     <div>
                        <h3 className="font-bold text-[#1B263B]">Headquarters</h3>
                        <p className="text-[#4E596F]">
                           Tempe, AZ<br/>
                           Serving Clients Nationwide
                        </p>
                     </div>
                  </div>
               </div>

               <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#B87333] mt-8">
                  <p className="text-[#1B263B] font-medium italic">
                     The best time to plant a tree was 20 years ago. The second best time is now.
                  </p>
               </div>
            </div>

            {/* Form Side */}
            <div className="lg:w-2/3">
               <div className="bg-white p-8 rounded-xl shadow-lg">
                  {submitted ? (
                     <div className="text-center py-12">
                        <div className="mx-auto bg-green-100 p-4 rounded-full w-fit mb-6">
                           <CheckCircle2 className="w-12 h-12 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#1B263B] mb-2">Message Sent</h3>
                        <p className="text-[#4E596F] mb-8">
                           Thanks for contacting us. We've received your message and will get back to you shortly.
                        </p>
                        <Button onClick={() => setSubmitted(false)} variant="outline">Send Another Message</Button>
                     </div>
                  ) : (
                     <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                           <Label htmlFor="category">I'm interested in...</Label>
                           <Select onValueChange={handleSelectChange} required>
                              <SelectTrigger className="h-12 bg-gray-50 border-gray-200">
                                 <SelectValue placeholder="Select a topic" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="sales">Sales & Strategy (Start a Conversation)</SelectItem>
                                 <SelectItem value="support">Technical Support</SelectItem>
                                 <SelectItem value="partnerships">Partnerships</SelectItem>
                                 <SelectItem value="press">Press & Media</SelectItem>
                                 <SelectItem value="careers">Careers</SelectItem>
                              </SelectContent>
                           </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                           <div className="space-y-2">
                              <Label htmlFor="firstName">First Name</Label>
                              <Input 
                                 id="firstName" 
                                 name="firstName" 
                                 placeholder="Jane" 
                                 required 
                                 className="h-12 bg-gray-50 border-gray-200"
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
                                 className="h-12 bg-gray-50 border-gray-200"
                                 value={formData.lastName}
                                 onChange={handleChange}
                              />
                           </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
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
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="message">How can we help?</Label>
                           <Textarea 
                              id="message" 
                              name="message" 
                              placeholder="Tell us a bit more about what you need..." 
                              className="min-h-[150px] bg-gray-50 border-gray-200"
                              required
                              value={formData.message}
                              onChange={handleChange}
                           />
                        </div>

                        <Button type="submit" className="w-full bg-[#1B263B] hover:bg-[#2c3b55] text-white text-lg py-6 h-auto">
                           Send Message <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                     </form>
                  )}
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
