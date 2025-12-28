import { useEffect } from "react";
import { View } from "../../App";
import { ContactForm } from "../ContactForm";
import { Mail, MapPin, Phone } from "lucide-react";

interface ContactProps {
  onViewChange: (view: View) => void;
}

export function Contact({ onViewChange }: ContactProps) {
  useEffect(() => {
    document.title = "Humaneers | Contact Us";
    window.scrollTo(0, 0);
  }, []);

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
                  <ContactForm />
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
