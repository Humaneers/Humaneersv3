"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Users, Server, Clock, Calendar, Heart, Shield, Target, Award, Quote, CheckCircle2, ArrowRight } from "lucide-react";
import { routePaths } from "../../routes";
import { useContactModal } from "../providers/ContactModalProvider";

export function AboutClient() {
  const router = useRouter();

  const metrics = [
    { label: "Clients Supported", value: "140+", icon: Users },
    { label: "Devices Managed", value: "4,500+", icon: Server },
    { label: "Avg Response Time", value: "12m", icon: Clock },
    { label: "Years in Operation", value: "8", icon: Calendar },
  ];

  const leadership = [
    { title: "Chief Technologist", role: "Infrastructure and Security Architecture" },
    { title: "Head of Brand Strategy", role: "Market Positioning and Growth" },
    { title: "Senior Network Engineer", role: "Mesh Systems and Connectivity" },
    { title: "Compliance Officer", role: "SOC 2 and Regulatory Affairs" },
    { title: "Client Success Director", role: "Account Management and Quality Assurance" },
  ];

  const { openModal } = useContactModal();

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Header */}
      <section className="bg-brand-oxford text-white py-20 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-copper/5 -skew-x-12 transform translate-x-32"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
              Crafting Digital Resilience.
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mb-10">
              Enterprise strategy for businesses and families. Built with precision, delivered with soul.
            </p>
            <div className="flex flex-wrap gap-6 items-center text-sm font-medium text-brand-copper uppercase tracking-widest">
              <span className="flex items-center gap-2"><CheckCircle2 size={16} /> 8 Year Track Record</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={16} /> Stealth Heritage</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={16} /> Human Expert Led</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <div className="bg-white border-b border-gray-100 py-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-between items-center gap-8 opacity-60">
            <span className="text-brand-oxford font-bold text-lg">Global Enterprise Standards</span>
            <span className="text-brand-oxford font-bold text-lg">Family Office Security</span>
            <span className="text-brand-oxford font-bold text-lg">Nonprofit Stewardship</span>
            <span className="text-brand-oxford font-bold text-lg">Stealth to Service</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <Tabs defaultValue="story" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-white p-1 rounded-lg border border-gray-200 shadow-sm inline-flex overflow-x-auto max-w-full">
              <TabsTrigger
                value="story"
                className="px-6 py-3 text-sm md:text-base data-[state=active]:bg-brand-oxford data-[state=active]:text-white data-[state=active]:shadow-md rounded-md transition-all whitespace-nowrap"
              >
                Our Story
              </TabsTrigger>
              <TabsTrigger
                value="values"
                className="px-6 py-3 text-sm md:text-base data-[state=active]:bg-brand-oxford data-[state=active]:text-white data-[state=active]:shadow-md rounded-md transition-all whitespace-nowrap"
              >
                Our Values
              </TabsTrigger>
              <TabsTrigger
                value="customers"
                className="px-6 py-3 text-sm md:text-base data-[state=active]:bg-brand-oxford data-[state=active]:text-white data-[state=active]:shadow-md rounded-md transition-all whitespace-nowrap"
              >
                Our Customers
              </TabsTrigger>
              <TabsTrigger
                value="impact"
                className="px-6 py-3 text-sm md:text-base data-[state=active]:bg-brand-oxford data-[state=active]:text-white data-[state=active]:shadow-md rounded-md transition-all whitespace-nowrap"
              >
                Impact & Responsibility
              </TabsTrigger>
            </TabsList>
          </div>

          {/* OUR STORY */}
          <TabsContent
            value="story"
            className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-brand-oxford mb-6">
                  Stealth Heritage, Public Standard.
                </h2>
                <div className="prose text-brand-slate leading-relaxed space-y-6 text-lg">
                  <p>
                    Humaneers began in stealth mode, serving a select roster of clients by referral only. These individuals and organizations required enterprise grade solutions without the burden of enterprise bureaucracy. We built our reputation one bespoke engagement at a time, delivering the same caliber of strategy, security, and infrastructure typically reserved for global enterprise companies to businesses, families, and nonprofits who had been too often underserved.
                  </p>
                  <p>
                    Word travels fast when you solve problems that others cannot. Our clients, many of whom came to us after exhausting traditional options, began to ask a consistent question: Why aren't you available to everyone?
                  </p>
                  <p>
                    The answer, for many years, was capacity. We believed that maintaining boutique quality required staying small. But as our team matured and our internal processes crystallized, we realized we had built something scalable without ever sacrificing soul. Our clients encouraged our public transition, not because they wanted to share us, but because they believed others deserved access to what we had proven we could deliver.
                  </p>
                  <p className="text-brand-oxford font-bold">
                    So here we are. No longer invitation only, but still uncompromisingly focused on precision, transparency, and results.
                  </p>
                  <p>
                    We bring the same rigor, the same vendor neutrality, and the same refusal to cut corners that our earliest clients relied on. The only difference is that now, you do not need a referral to work with us. You just need a problem worth solving.
                  </p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-brand-oxford mb-6 border-b border-gray-100 pb-4">
                  Leadership & Structure
                </h3>
                <ul className="space-y-4">
                  {leadership.map((leader, i) => (
                    <li key={i} className="flex justify-between items-center group">
                      <span className="font-bold text-brand-oxford">{leader.title}</span>
                      <span className="text-sm text-brand-copper font-medium bg-brand-copper/10 px-3 py-1 rounded-full group-hover:bg-brand-copper group-hover:text-white transition-colors">
                        {leader.role}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>

          {/* OUR VALUES */}
          <TabsContent
            value="values"
            className="animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-10 rounded-2xl border-t-4 border-brand-copper shadow-xl hover:-translate-y-1 transition-all duration-300">
                <Target className="w-12 h-12 text-brand-copper mb-6" />
                <h3 className="text-2xl font-bold text-brand-oxford mb-4">Vendor Neutrality</h3>
                <p className="text-brand-slate leading-relaxed">
                  We sell solutions, not licenses. If open source software is better for your budget than a proprietary subscription, that is what we recommend. We have no preferred partners that pay us kickbacks.
                </p>
              </div>
              <div className="bg-white p-10 rounded-2xl border-t-4 border-brand-copper shadow-xl hover:-translate-y-1 transition-all duration-300">
                <Shield className="w-12 h-12 text-brand-copper mb-6" />
                <h3 className="text-2xl font-bold text-brand-oxford mb-4">Security as a Right</h3>
                <p className="text-brand-slate leading-relaxed">
                  Privacy and digital safety should not be luxury goods. We apply the same zero trust architecture to a solo founder's laptop as we do to a fifty person corporate network.
                </p>
              </div>
              <div className="bg-white p-10 rounded-2xl border-t-4 border-brand-copper shadow-xl hover:-translate-y-1 transition-all duration-300">
                <Heart className="w-12 h-12 text-brand-copper mb-6" />
                <h3 className="text-2xl font-bold text-brand-oxford mb-4">Radical Transparency</h3>
                <p className="text-brand-slate leading-relaxed">
                  You own your data. You own your code. You own your strategy. We document everything we do so you never feel tied to our services by obscurity.
                </p>
              </div>
            </div>
          </TabsContent>

          {/* OUR CUSTOMERS */}
          <TabsContent
            value="customers"
            className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {metrics.map((metric, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-lg shadow-sm text-center border border-gray-100"
                >
                  <div className="w-12 h-12 bg-brand-cream text-brand-copper rounded-full flex items-center justify-center mx-auto mb-4">
                    <metric.icon size={24} />
                  </div>
                  <div className="text-3xl font-bold text-brand-oxford mb-1">{metric.value}</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-brand-oxford mb-6">Who We Serve</h3>
                <ul className="space-y-4">
                  <li className="bg-white p-4 rounded-lg border border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                    <span className="font-medium text-brand-oxford">High-Growth Startups</span>
                    <span className="text-sm text-gray-500">Seed to Series B</span>
                  </li>
                  <li className="bg-white p-4 rounded-lg border border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                    <span className="font-medium text-brand-oxford">Family Offices & Estates</span>
                    <span className="text-sm text-gray-500">High Net Worth Individuals</span>
                  </li>
                  <li className="bg-white p-4 rounded-lg border border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                    <span className="font-medium text-brand-oxford">Families & Individuals</span>
                    <span className="text-sm text-gray-500">Home networks & digital safety</span>
                  </li>
                  <li className="bg-white p-4 rounded-lg border border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                    <span className="font-medium text-brand-oxford">Nonprofit Organizations</span>
                    <span className="text-sm text-gray-500">501(c)(3) Certified</span>
                  </li>
                  <li className="bg-white p-4 rounded-lg border border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                    <span className="font-medium text-brand-oxford">Regulated Industries</span>
                    <span className="text-sm text-gray-500">Healthcare, Finance, Legal</span>
                  </li>
                </ul>
              </div>
              <div className="bg-brand-oxford text-white p-8 rounded-xl flex flex-col justify-center text-center">
                <Award className="w-12 h-12 text-brand-copper mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-4">Quarterly Performance Report</h4>
                <p className="text-gray-300 mb-8">
                  We publish our uptime, response times, and customer satisfaction scores every
                  quarter. View our latest full report in the Colophon.
                </p>
                <Button
                  onClick={() => router.push(routePaths.colophon)}
                  className="bg-brand-copper hover:bg-brand-copper-dark text-white self-center"
                >
                  View Transparency Report
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* IMPACT & RESPONSIBILITY */}
          <TabsContent
            value="impact"
            className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-brand-oxford mb-6">
                  Our Impact Commitments
                </h2>
                <p className="text-brand-slate text-lg leading-relaxed mb-6">
                  We believe that small actions, consistently applied, compound into significant
                  change. We are not a "green" company by marketing definition, but we are an
                  operationally conscious one. We acknowledge our footprint and actively manage it.
                </p>
                <div className="bg-brand-copper/10 border-l-4 border-brand-copper p-4 rounded-r-md">
                  <p className="text-sm text-brand-oxford font-medium italic">
                    "State intent, not perfection."
                  </p>
                  <p className="text-sm text-brand-slate mt-1">
                    Our guiding principle for sustainability. We prioritize realistic, measurable
                    improvements over performative pledges.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                {/* Initiative 1 */}
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-brand-cream rounded-full flex items-center justify-center">
                    <Server className="text-brand-oxford" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-brand-oxford">
                    Hardware Lifecycle Management
                  </h3>
                  <p className="text-brand-slate text-sm leading-relaxed">
                    E-waste is the tech industry's silent crisis. We reject the industry standard of three year refresh cycles.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-brand-slate">
                    <li>
                      <strong>Repair First:</strong> We prioritize component repair over device
                      replacement.
                    </li>
                    <li>
                      <strong>Secondary Market:</strong> Retired functional equipment is wiped and
                      donated to nonprofits or resold.
                    </li>
                    <li>
                      <strong>Certified Recycling:</strong> End-of-life hardware is processed
                      exclusively by R2v3 certified recyclers.
                    </li>
                  </ul>
                </div>

                {/* Initiative 2 */}
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-brand-cream rounded-full flex items-center justify-center">
                    <Users className="text-brand-oxford" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-brand-oxford">Remote-First Operations</h3>
                  <p className="text-brand-slate text-sm leading-relaxed">
                    Our most effective sustainability metric is the commute that doesn't happen.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-brand-slate">
                    <li>
                      <strong>90% Remote Workforce:</strong> drastically reducing our Scope 3
                      emissions from employee commuting.
                    </li>
                    <li>
                      <strong>Minimal Real Estate:</strong> We maintain a small HQ footprint in
                      Tempe Arizona, reducing energy consumption for heating and cooling.
                    </li>
                    <li>
                      <strong>Digital Delivery:</strong> We prioritize remote support sessions over
                      truck rolls whenever physical intervention isn't strictly necessary.
                    </li>
                  </ul>
                </div>

                {/* Initiative 3 */}
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-brand-cream rounded-full flex items-center justify-center">
                    <Shield className="text-brand-oxford" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-brand-oxford">Ethical Supply Chain</h3>
                  <p className="text-brand-slate text-sm leading-relaxed">
                    We vote with our procurement dollars.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-brand-slate">
                    <li>
                      <strong>Vendor Screening:</strong> We evaluate partners on their labor
                      practices and environmental transparency, not just price.
                    </li>
                    <li>
                      <strong>Local Preference:</strong> We prioritize US based and local Arizona
                      vendors for operational supplies.
                    </li>
                    <li>
                      <strong>Open Source Support:</strong> We contribute financially to the open
                      source projects that power our infrastructure.
                    </li>
                  </ul>
                </div>

                {/* Annual Review */}
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-brand-cream rounded-full flex items-center justify-center">
                    <Calendar className="text-brand-oxford" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-brand-oxford">
                    Annual Accountability Review
                  </h3>
                  <p className="text-brand-slate text-sm leading-relaxed">
                    Transparency requires maintenance. We commit to an annual internal audit of
                    these initiatives.
                  </p>
                  <p className="text-brand-slate text-sm leading-relaxed">
                    Each Q4, we will update this section and our Colophon with our progress,
                    failures, and adjusted goals for the coming year. We believe that acknowledging
                    where we fall short is as important as celebrating where we succeed.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-20 p-12 bg-white rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden text-center group">
          <div className="absolute top-0 left-0 w-2 h-full bg-brand-copper group-hover:w-4 transition-all"></div>
          <Quote className="w-16 h-16 text-brand-copper/10 absolute top-8 right-8" />
          <h3 className="text-3xl font-bold text-brand-oxford mb-6 relative z-10"> Ready to Secure Your Growth?</h3>
          <p className="text-brand-slate text-lg mb-10 max-w-2xl mx-auto relative z-10">
            Whether you are protecting a fifty person team or your own family estate, we bring the same precision and soul to every engagement.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
            <Button
              onClick={() => openModal("sales", "I would like to discuss a strategy for my organization.", "About Page Strategy CTA")}
              className="bg-brand-copper hover:bg-brand-copper-dark text-white px-10 py-7 text-lg font-bold rounded-full group shadow-lg hover:shadow-brand-copper/20"
            >
              Book a Strategy Session <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => router.push(routePaths.pricing)}
              variant="outline"
              className="border-brand-oxford text-brand-oxford hover:bg-brand-oxford hover:text-white px-10 py-7 text-lg font-bold rounded-full"
            >
              View Transparent Pricing
            </Button>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100 flex justify-center gap-8">
            <button onClick={() => router.push(routePaths.ethics)} className="text-sm font-medium text-gray-400 hover:text-brand-oxford transition-colors">Ethics Charter</button>
            <button onClick={() => router.push(routePaths.colophon)} className="text-sm font-medium text-gray-400 hover:text-brand-oxford transition-colors">Operating Framework</button>
          </div>
        </div>
      </div>
    </div>
  );
}
