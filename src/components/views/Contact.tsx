import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Mail, MapPin } from "lucide-react";
import { Label } from "../ui/label";
import { routePaths } from "../../routes";
import { Seo } from "../Seo";

export function Contact() {
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleCategoryChange = (value: string) => {
    setCategory(value);

    // Redirect to appropriate page based on category
    if (value === "sales") {
      navigate(routePaths.talkToSales);
    } else if (value === "support") {
      navigate(routePaths.support);
    }
  };

  return (
    <Seo
      title="Humaneers | Contact Us | Sales & Support"
      description="Get in touch with Humaneers. Sales inquiries, technical support, and general questions. We're here to help build something that lasts."
      canonicalPath="/contact"
    >
      <div className="bg-brand-cream min-h-screen">
        <section className="bg-brand-oxford text-white py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Let's Build Something
              <br />
              That Lasts.
            </h1>
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
                  <h2 className="text-2xl font-bold text-brand-oxford mb-6">Get in Touch</h2>
                  <p className="text-brand-slate mb-8">
                    Select your inquiry type below and we'll match you with the right team. You'll be
                    guided to a specialized form where we can understand your needs and schedule time
                    to talk.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-full shadow-sm text-brand-copper">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-oxford">Email</h3>
                      <p className="text-brand-slate">hello@humaneers.dev</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-full shadow-sm text-brand-copper">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-oxford">Headquarters</h3>
                      <p className="text-brand-slate">
                        Tempe, AZ
                        <br />
                        Serving Clients Nationwide
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-brand-copper mt-8">
                  <p className="text-brand-oxford font-medium italic">
                    The best time to plant a tree was 20 years ago. The second best time is now.
                  </p>
                </div>
              </div>

              {/* Contact Options */}
              <div className="lg:w-2/3">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <h3 className="text-2xl font-bold text-brand-oxford mb-6">How can we help?</h3>

                  <div className="space-y-4 mb-8">
                    <Label htmlFor="category">Select your inquiry type:</Label>
                    <Select onValueChange={handleCategoryChange} value={category}>
                      <SelectTrigger
                        id="category"
                        className="h-14 bg-gray-50 border-gray-200 text-lg"
                      >
                        <SelectValue placeholder="Choose an option..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sales">
                          <div className="py-2">
                            <div className="font-semibold">Sales & Strategy</div>
                            <div className="text-sm text-gray-500">
                              Schedule a consultation about our services
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="support">
                          <div className="py-2">
                            <div className="font-semibold">Technical Support</div>
                            <div className="text-sm text-gray-500">
                              For existing clients or new clients needing immediate help
                            </div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {!category && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
                      <p className="text-brand-oxford font-medium mb-2">Need to reach us directly?</p>
                      <p className="text-brand-slate text-sm mb-4">
                        For general inquiries, partnerships, press, or careers, please email us
                        directly at:
                      </p>
                      <a
                        href="mailto:hello@humaneers.dev"
                        className="inline-flex items-center gap-2 text-brand-copper font-semibold hover:underline"
                      >
                        <Mail className="w-4 h-4" />
                        hello@humaneers.dev
                      </a>
                    </div>
                  )}

                  {category && category !== "sales" && category !== "support" && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-4">
                      <p className="text-brand-oxford mb-2">
                        For this type of inquiry, please email us directly:
                      </p>
                      <a
                        href="mailto:hello@humaneers.dev"
                        className="inline-flex items-center gap-2 text-brand-copper font-semibold text-lg hover:underline"
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
    </Seo>
  );
}
