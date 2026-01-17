import { useState, useEffect } from "react";
import { View } from "../../App";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Mail, MapPin, ArrowRight } from "lucide-react";
import { Label } from "../ui/label";

interface ContactProps {
  onViewChange: (view: View) => void;
}

export function Contact({ onViewChange }: ContactProps) {
  const [category, setCategory] = useState("");

  useEffect(() => {
    document.title = "Humaneers | Contact Us";
    window.scrollTo(0, 0);
  }, []);

  const handleCategoryChange = (value: string) => {
    setCategory(value);

    // Redirect to appropriate page based on category
    if (value === "sales") {
      onViewChange("talk-to-sales");
    } else if (value === "support") {
      onViewChange("support");
    }
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

            {/* Contact Options */}
            <div className="lg:w-2/3">
               <div className="bg-white p-8 rounded-xl shadow-lg">
                  <h3 className="text-2xl font-bold text-[#1B263B] mb-6">How can we help?</h3>

                  <div className="space-y-4 mb-8">
                     <Label htmlFor="category">Select your inquiry type:</Label>
                     <Select onValueChange={handleCategoryChange} value={category}>
                        <SelectTrigger className="h-14 bg-gray-50 border-gray-200 text-lg">
                           <SelectValue placeholder="Choose an option..." />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="sales">
                              <div className="py-2">
                                 <div className="font-semibold">Sales & Strategy</div>
                                 <div className="text-sm text-gray-500">Schedule a consultation about our services</div>
                              </div>
                           </SelectItem>
                           <SelectItem value="support">
                              <div className="py-2">
                                 <div className="font-semibold">Technical Support</div>
                                 <div className="text-sm text-gray-500">Get help with existing services</div>
                              </div>
                           </SelectItem>
                        </SelectContent>
                     </Select>
                  </div>

                  {!category && (
                     <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
                        <p className="text-[#1B263B] font-medium mb-2">Need to reach us directly?</p>
                        <p className="text-[#4E596F] text-sm mb-4">
                           For general inquiries, partnerships, press, or careers, please email us directly at:
                        </p>
                        <a
                           href="mailto:hello@humaneers.dev"
                           className="inline-flex items-center gap-2 text-[#B87333] font-semibold hover:underline"
                        >
                           <Mail className="w-4 h-4" />
                           hello@humaneers.dev
                        </a>
                      </div>
                  )}

                  {category && category !== "sales" && category !== "support" && (
                     <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-4">
                        <p className="text-[#1B263B] mb-2">
                           For this type of inquiry, please email us directly:
                        </p>
                        <a
                           href="mailto:hello@humaneers.dev"
                           className="inline-flex items-center gap-2 text-[#B87333] font-semibold text-lg hover:underline"
                        >
                           <Mail className="w-5 h-5" />
                           hello@humaneers.dev
                        </a>
                      </div>
                  )}
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
