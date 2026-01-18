import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Users, Server, Clock, Calendar, Heart, Shield, Target, Award } from "lucide-react";
import { routePaths } from "../../routes";

export function About() {
  const navigate = useNavigate();

  const metrics = [
    { label: "Clients Supported", value: "140+", icon: Users },
    { label: "Devices Managed", value: "4,500+", icon: Server },
    { label: "Avg Response Time", value: "12m", icon: Clock },
    { label: "Years in Operation", value: "8", icon: Calendar },
  ];

  const leadership = [
    { title: "Chief Technologist", role: "Infrastructure & Security Architecture" },
    { title: "Head of Brand Strategy", role: "Market Positioning & Growth" },
    { title: "Senior Network Engineer", role: "Mesh Systems & Connectivity" },
    { title: "Compliance Officer", role: "SOC 2 & Regulatory Affairs" },
    { title: "Client Success Director", role: "Account Management & QA" },
  ];

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Header */}
      <section className="bg-brand-oxford text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-copper/10 skew-x-12 transform translate-x-20"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl font-bold mb-6">About Humaneers</h1>
          <p className="text-xl max-w-2xl mx-auto text-gray-300 font-light leading-relaxed">
            We are the bridge between enterprise-grade technology and the businesses that power our
            local communities.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        <Tabs defaultValue="story" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-white p-1 rounded-lg border border-gray-200 shadow-sm inline-flex h-auto">
              <TabsTrigger
                value="story"
                className="px-6 py-3 text-sm md:text-base data-[state=active]:bg-brand-oxford data-[state=active]:text-white data-[state=active]:shadow-md rounded-md transition-all"
              >
                Our Story
              </TabsTrigger>
              <TabsTrigger
                value="values"
                className="px-6 py-3 text-sm md:text-base data-[state=active]:bg-brand-oxford data-[state=active]:text-white data-[state=active]:shadow-md rounded-md transition-all"
              >
                Our Values
              </TabsTrigger>
              <TabsTrigger
                value="customers"
                className="px-6 py-3 text-sm md:text-base data-[state=active]:bg-brand-oxford data-[state=active]:text-white data-[state=active]:shadow-md rounded-md transition-all"
              >
                Our Customers
              </TabsTrigger>
              <TabsTrigger
                value="impact"
                className="px-6 py-3 text-sm md:text-base data-[state=active]:bg-brand-oxford data-[state=active]:text-white data-[state=active]:shadow-md rounded-md transition-all"
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
                <h2 className="text-3xl font-bold text-brand-oxford mb-6">The Enterprise Gap</h2>
                <div className="prose text-brand-slate leading-relaxed space-y-4">
                  <p>
                    For decades, the most powerful technology, the tightest security, and the
                    smartest growth strategies were reserved for the Fortune 500. Small businesses,
                    solo entrepreneurs, and non-profits were left to fend for themselves with
                    off-the-shelf software and "geek squad" support.
                  </p>
                  <p>
                    We saw this gap widen every year. As cyber threats became more sophisticated and
                    digital markets more crowded, the "little guy" was being priced out of survival.
                  </p>
                  <p>
                    <strong>Humaneers was founded to close that gap.</strong> We stripped away the
                    overhead of big consulting firms but kept the methodology. We took the same
                    security protocols used by global banks and scaled them for family offices. We
                    took the brand strategies used by multinational CPG companies and applied them
                    to local startups.
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
              <div className="bg-white p-8 rounded-xl border-t-4 border-brand-copper shadow-sm hover:shadow-md transition-shadow">
                <Target className="w-10 h-10 text-brand-copper mb-4" />
                <h3 className="text-xl font-bold text-brand-oxford mb-3">Vendor Neutrality</h3>
                <p className="text-brand-slate">
                  We sell solutions, not licenses. If open-source software is better for your budget
                  than a proprietary subscription, that's what we recommend. We have no "preferred
                  partners" that pay us kickbacks.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl border-t-4 border-brand-copper shadow-sm hover:shadow-md transition-shadow">
                <Shield className="w-10 h-10 text-brand-copper mb-4" />
                <h3 className="text-xl font-bold text-brand-oxford mb-3">Security as a Right</h3>
                <p className="text-brand-slate">
                  Privacy and digital safety shouldn't be luxury goods. We apply the same zero-trust
                  architecture to a solo founder's laptop as we do to a 50-person corporate network.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl border-t-4 border-brand-copper shadow-sm hover:shadow-md transition-shadow">
                <Heart className="w-10 h-10 text-brand-copper mb-4" />
                <h3 className="text-xl font-bold text-brand-oxford mb-3">Radical Transparency</h3>
                <p className="text-brand-slate">
                  You own your data. You own your code. You own your strategy. We document
                  everything we do so you never feel "locked in" to our services by obscurity.
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
                  <li className="bg-white p-4 rounded-lg border border-gray-100 flex items-center justify-between">
                    <span className="font-medium text-brand-oxford">High-Growth Startups</span>
                    <span className="text-sm text-gray-500">Seed to Series B</span>
                  </li>
                  <li className="bg-white p-4 rounded-lg border border-gray-100 flex items-center justify-between">
                    <span className="font-medium text-brand-oxford">Family Offices & Estates</span>
                    <span className="text-sm text-gray-500">High Net Worth Individuals</span>
                  </li>
                  <li className="bg-white p-4 rounded-lg border border-gray-100 flex items-center justify-between">
                    <span className="font-medium text-brand-oxford">Non-Profit Organizations</span>
                    <span className="text-sm text-gray-500">501(c)(3) Certified</span>
                  </li>
                  <li className="bg-white p-4 rounded-lg border border-gray-100 flex items-center justify-between">
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
                  onClick={() => navigate(routePaths.colophon)}
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
                    E-waste is the tech industry's silent crisis. We reject the industry standard of
                    3-year refresh cycles.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-brand-slate">
                    <li>
                      <strong>Repair First:</strong> We prioritize component repair over device
                      replacement.
                    </li>
                    <li>
                      <strong>Secondary Market:</strong> Retired functional equipment is wiped and
                      donated to non-profits or resold.
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
                      Tempe, reducing energy consumption for heating and cooling.
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
                      <strong>Local Preference:</strong> We prioritize US-based and local Arizona
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

              <div className="mt-16 pt-10 border-t border-gray-200 text-center">
                <h4 className="text-brand-oxford font-bold mb-4">Related Resources</h4>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    onClick={() => navigate(routePaths.ethics)}
                    variant="outline"
                    className="border-brand-oxford text-brand-oxford hover:bg-brand-oxford hover:text-white"
                  >
                    View Ethics Charter
                  </Button>
                  <Button
                    onClick={() => navigate(routePaths.colophon)}
                    variant="outline"
                    className="border-brand-oxford text-brand-oxford hover:bg-brand-oxford hover:text-white"
                  >
                    View Operating Framework
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
