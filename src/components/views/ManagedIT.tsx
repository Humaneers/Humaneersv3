import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Shield,
  Server,
  Wifi,
  Headphones,
  MapPin,
  Globe,
  CheckCircle2,
  Smartphone,
} from "lucide-react";
import { DefinitionTooltip } from "../DefinitionTooltip";
import { routePaths } from "../../routes";

export function ManagedIT() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Headphones className="w-6 h-6 text-brand-copper" />,
      title: "100% US-Based Helpdesk",
      desc: "Talk to a US-based engineer who knows your business.",
    },
    {
      icon: <Server className="w-6 h-6 text-brand-copper" />,
      title: "Hybrid & Cloud Infrastructure",
      desc: "Secure on-prem or cloud environments tuned to your workflow.",
    },
    {
      icon: <Smartphone className="w-6 h-6 text-brand-copper" />,
      title: (
        <span>
          Mobile Device Management (
          <DefinitionTooltip
            term="MDM"
            definition="Software that allows IT to secure, monitor, and manage mobile devices like smartphones and tablets."
          />
          )
        </span>
      ),
      desc: "Protect work data on personal devices without overreach.",
    },
    {
      icon: <Shield className="w-6 h-6 text-brand-copper" />,
      title: "Proactive Security Monitoring",
      desc: "24/7 monitoring to stop issues before they hit.",
    },
    {
      icon: <Wifi className="w-6 h-6 text-brand-copper" />,
      title: "Remote & On-Site Support",
      desc: "Remote-first support with nationwide on-site backup.",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-brand-oxford text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef526b01201b?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Managed IT that Sleeps
            <br />
            So You Don't Have To.
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto mb-8">
            Enterprise-grade infrastructure for teams that value craftsmanship over ticket numbers.
          </p>
          <Button
            onClick={() => navigate(routePaths.talkToSales, { state: { interest: "Managed IT" } })}
            className="bg-brand-copper hover:bg-brand-copper-dark text-white text-lg px-8 py-4 h-auto rounded-full"
          >
            Get a Network Assessment
          </Button>
        </div>
      </section>

      {/* The Difference */}
      <section className="py-24 bg-brand-cream">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-brand-oxford mb-6">
                Not Your Average Helpdesk
              </h2>
              <p className="text-brand-slate text-lg mb-6 leading-relaxed">
                Most{" "}
                <DefinitionTooltip
                  term="MSPs"
                  definition="Managed Service Providers: Third-party companies that remotely manage customer's IT infrastructure."
                />{" "}
                operate on a "break/fix" model—they profit when you have problems. We operate on a
                subscription model, which means{" "}
                <strong>we only profit when your systems are running perfectly.</strong>
              </p>
              <p className="text-brand-slate text-lg mb-6 leading-relaxed">
                We are "The Modern Craftsman" of IT. We don't just patch cables; we architect
                resilience.
              </p>
              <div className="flex items-center gap-4 text-brand-oxford font-semibold mt-8">
                <div className="flex items-center gap-2">
                  <MapPin className="text-brand-copper" /> Nationwide Coverage
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="text-brand-copper" /> Remote First
                </div>
              </div>
            </div>
            <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((f) => (
                <div
                  key={f.desc}
                  className="bg-white p-6 rounded-lg shadow-sm border-b-2 border-brand-copper"
                >
                  <div className="mb-4">{f.icon}</div>
                  <h3 className="text-lg font-bold text-brand-oxford mb-2">{f.title}</h3>
                  <p className="text-sm text-brand-slate">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* National Reach */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-brand-oxford mb-8">We Serve Clients Everywhere</h2>
          <p className="text-brand-slate max-w-2xl mx-auto mb-12">
            Our Tempe HQ is just the beginning. We use advanced remote management tools to support
            clients in all 50 states. We ship pre-configured hardware directly to your door,
            plug-and-play ready.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            {[
              { id: "remote-monitoring", content: "Remote Monitoring" },
              { id: "hardware-replacement", content: "Overnight Hardware Replacement" },
              {
                id: "vcio-meetings",
                content: (
                  <span>
                    Virtual{" "}
                    <DefinitionTooltip
                      term="CIO"
                      definition="Chief Information Officer: An executive responsible for the management, implementation, and usability of information and computer technologies."
                    />{" "}
                    Meetings
                  </span>
                ),
              },
              { id: "onsite-dispatch", content: "Nationwide On-site Dispatch" },
            ].map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 text-brand-oxford font-medium p-4 bg-gray-50 rounded"
              >
                <CheckCircle2 className="w-5 h-5 text-brand-copper shrink-0" /> {item.content}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
