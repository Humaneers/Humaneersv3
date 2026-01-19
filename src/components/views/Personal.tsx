import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { User, Mail, Shield, Smartphone, ArrowRight, Laptop, Fingerprint } from "lucide-react";
import { routePaths } from "../../routes";
import { Seo } from "../Seo";

export function Personal() {
  const navigate = useNavigate();

  return (
    <Seo
      title="Humaneers | IT for Solo Entrepreneurs | The Company of One"
      description="Professional IT services for consultants, freelancers, and solo founders. Secure email, custom domains, and helpdesk support for the company of one."
      canonicalPath="/personal-it"
    >
      <div className="bg-white">
        {/* Hero */}
        <section className="bg-brand-oxford text-white py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
              Powerful Tools for the
              <br />
              <span className="text-brand-copper">Company of One.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto mb-10">
              Just because you're solo doesn't mean you should look small. Get the enterprise email,
              security, and support you need to win big clients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate(`${routePaths.pricing}?mode=household`)}
                className="bg-brand-copper hover:bg-brand-copper-dark text-white text-lg px-8 py-6 h-auto rounded-full shadow-lg"
              >
                View Pricing
              </Button>
            </div>
          </div>
        </section>

        {/* The "Pro" Stack */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-brand-oxford mb-6">The "Pro" Stack</h2>
              <p className="text-brand-slate text-lg">
                Stop using @gmail.com and hoping your hard drive doesn't crash. We set you up with
                the same tools Fortune 500 CEOs use, scaled down to a single user price.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="p-6 bg-brand-cream rounded-xl hover:-translate-y-1 transition-transform group cursor-default">
                <Mail className="w-10 h-10 text-brand-copper mb-4" />
                <h3 className="font-bold text-brand-oxford text-lg mb-2">Custom Email</h3>
                <p className="text-sm text-brand-slate">
                  We migrate you to Microsoft 365 or Google Workspace with a custom domain
                  (@yourname.com).
                </p>
                <div className="mt-0 max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 group-hover:mt-2 transition-all duration-300 overflow-hidden">
                  <p className="text-sm text-brand-copper font-medium">
                    Professional identity aligned.
                  </p>
                </div>
              </div>
              <div className="p-6 bg-brand-cream rounded-xl hover:-translate-y-1 transition-transform group cursor-default">
                <Laptop className="w-10 h-10 text-brand-copper mb-4" />
                <h3 className="font-bold text-brand-oxford text-lg mb-2">Device Setup</h3>
                <p className="text-sm text-brand-slate">
                  We configure your Mac or PC remotely with encryption, backups, and essential
                  software.
                </p>
                <div className="mt-0 max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 group-hover:mt-2 transition-all duration-300 overflow-hidden">
                  <p className="text-sm text-brand-copper font-medium">Zero-touch configuration.</p>
                </div>
              </div>
              <div className="p-6 bg-brand-cream rounded-xl hover:-translate-y-1 transition-transform group cursor-default">
                <Shield className="w-10 h-10 text-brand-copper mb-4" />
                <h3 className="font-bold text-brand-oxford text-lg mb-2">Endpoint Security</h3>
                <p className="text-sm text-brand-slate">
                  Enterprise-grade antivirus + 24/7 monitoring. No annoying pop-ups, just silent
                  protection.
                </p>
                <div className="mt-0 max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 group-hover:mt-2 transition-all duration-300 overflow-hidden">
                  <p className="text-sm text-brand-copper font-medium">
                    CrowdStrike/SentinelOne agents.
                  </p>
                </div>
              </div>
              <div className="p-6 bg-brand-cream rounded-xl hover:-translate-y-1 transition-transform group cursor-default">
                <User className="w-10 h-10 text-brand-copper mb-4" />
                <h3 className="font-bold text-brand-oxford text-lg mb-2">Tech Support</h3>
                <p className="text-sm text-brand-slate">
                  Text or email us when things break. We fix printer issues, wifi glitches, and
                  weird errors.
                </p>
                <div className="mt-0 max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 group-hover:mt-2 transition-all duration-300 overflow-hidden">
                  <p className="text-sm text-brand-copper font-medium">15-minute response SLA.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-24 bg-brand-oxford text-white border-t border-brand-oxford/10">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Who is this for?</h2>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <div className="bg-brand-copper/10 p-2 rounded-lg h-fit">
                      <Fingerprint className="w-6 h-6 text-brand-copper" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Consultants & Agencies</h4>
                      <p className="text-sm text-gray-300">
                        You handle sensitive client data and need to prove you are secure (SOC 2
                        ready).
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="bg-brand-copper/10 p-2 rounded-lg h-fit">
                      <ArrowRight className="w-6 h-6 text-brand-copper" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Angel Investors</h4>
                      <p className="text-sm text-gray-300">
                        You need a secure, separate environment for deal flow and board
                        communications.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="bg-brand-copper/10 p-2 rounded-lg h-fit">
                      <Smartphone className="w-6 h-6 text-brand-copper" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Digital Nomads</h4>
                      <p className="text-sm text-gray-300">
                        You work from coffee shops and Airbnbs and need a bulletproof VPN and device
                        tracking.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-xl transform rotate-2">
                <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="font-bold text-brand-oxford">Support Ticket #2941</div>
                    <div className="text-xs text-green-600 font-bold uppercase">
                      Resolved in 12 mins
                    </div>
                  </div>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none self-start max-w-[80%]">
                    Help! My laptop was stolen at the airport. It has all my client contracts on it.
                  </div>
                  <div className="bg-brand-copper text-white p-3 rounded-lg rounded-tr-none self-end max-w-[80%] ml-auto">
                    Don't panic. We just initiated a remote wipe command. Your data is gone from
                    that machine. We are shipping you a configured replacement to your hotel now.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-brand-cream text-center">
          <h2 className="text-3xl font-bold text-brand-oxford mb-8">Plans start at $25/month.</h2>
          <Button
            onClick={() => navigate(`${routePaths.pricing}?mode=household`)}
            className="bg-brand-copper hover:bg-brand-copper-dark text-white text-xl px-12 py-6 h-auto rounded-full shadow-lg"
          >
            View Pricing
          </Button>
        </section>
      </div>
    </Seo>
  );
}
