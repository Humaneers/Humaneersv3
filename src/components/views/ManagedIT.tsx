import { useEffect } from "react";
import { View } from "../../App";
import { Button } from "../ui/button";
import { Shield, Server, Wifi, Headphones, MapPin, Globe, CheckCircle2, Smartphone } from "lucide-react";
import { DefinitionTooltip } from "../DefinitionTooltip";

interface ManagedITProps {
  onViewChange: (view: View) => void;
}

export function ManagedIT({ onViewChange }: ManagedITProps) {
  useEffect(() => {
    document.title = "Humaneers | Managed IT | Nationwide Support";
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: <Headphones className="w-6 h-6 text-[#B87333]" />,
      title: "100% US-Based Helpdesk",
      desc: "No offshore call centers. Speak directly to an engineer in the US who understands your context and your urgency."
    },
    {
      icon: <Server className="w-6 h-6 text-[#B87333]" />,
      title: "Hybrid & Cloud Infrastructure",
      desc: "Whether you need to stay on-premise or move to the cloud (Azure/AWS), we build secure, flexible environments that fit your workflow."
    },
    {
      icon: <Smartphone className="w-6 h-6 text-[#B87333]" />,
      title: <span>Mobile Device Management (<DefinitionTooltip term="MDM" definition="Software that allows IT to secure, monitor, and manage mobile devices like smartphones and tablets." />)</span>,
      desc: "Secure company data on employee phones without spying. We containerize work apps so business data stays safe, even on personal devices."
    },
    {
      icon: <Shield className="w-6 h-6 text-[#B87333]" />,
      title: "Proactive Security Monitoring",
      desc: "We don't just fix things when they break. We monitor your network 24/7/365 to prevent downtime before it happens."
    },
    {
      icon: <Wifi className="w-6 h-6 text-[#B87333]" />,
      title: "Remote & On-Site Support",
      desc: "While we solve 98% of issues remotely, we have a nationwide network of field engineers for hands-on emergencies."
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-[#1B263B] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef526b01201b?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Managed IT that Sleeps<br/>So You Don't Have To.</h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto mb-8">
            Enterprise-grade infrastructure for teams that value craftsmanship over ticket numbers.
          </p>
          <Button 
            onClick={() => onViewChange("contact")}
            className="bg-[#B87333] hover:bg-[#a0632a] text-white text-lg px-8 py-4 h-auto rounded-full"
          >
            Get a Network Assessment
          </Button>
        </div>
      </section>

      {/* The Difference */}
      <section className="py-24 bg-[#F5F1E9]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
             <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-[#1B263B] mb-6">Not Your Average Helpdesk</h2>
                <p className="text-[#4E596F] text-lg mb-6 leading-relaxed">
                  Most <DefinitionTooltip term="MSPs" definition="Managed Service Providers: Third-party companies that remotely manage customer's IT infrastructure." /> operate on a "break/fix" model—they profit when you have problems. We operate on a subscription model, which means <strong>we only profit when your systems are running perfectly.</strong>
                </p>
                <p className="text-[#4E596F] text-lg mb-6 leading-relaxed">
                  We are "The Modern Craftsman" of IT. We don't just patch cables; we architect resilience.
                </p>
                <div className="flex items-center gap-4 text-[#1B263B] font-semibold mt-8">
                   <div className="flex items-center gap-2">
                      <MapPin className="text-[#B87333]" /> Nationwide Coverage
                   </div>
                   <div className="flex items-center gap-2">
                      <Globe className="text-[#B87333]" /> Remote First
                   </div>
                </div>
             </div>
             <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((f, i) => (
                  <div key={i} className="bg-white p-6 rounded-lg shadow-sm border-b-2 border-[#B87333]">
                     <div className="mb-4">{f.icon}</div>
                     <h3 className="text-lg font-bold text-[#1B263B] mb-2">{f.title}</h3>
                     <p className="text-sm text-[#4E596F]">{f.desc}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* National Reach */}
      <section className="py-24 bg-white">
         <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-[#1B263B] mb-8">We Serve Clients Everywhere</h2>
            <p className="text-[#4E596F] max-w-2xl mx-auto mb-12">
               Our Tempe HQ is just the beginning. We use advanced remote management tools to support clients in all 50 states. We ship pre-configured hardware directly to your door, plug-and-play ready.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
               {[
                  "Remote Monitoring", 
                  "Overnight Hardware Replacement", 
                  <span key="vcio">Virtual <DefinitionTooltip term="CIO" definition="Chief Information Officer: An executive responsible for the management, implementation, and usability of information and computer technologies." /> Meetings</span>, 
                  "Nationwide On-site Dispatch"
               ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-[#1B263B] font-medium p-4 bg-gray-50 rounded">
                     <CheckCircle2 className="w-5 h-5 text-[#B87333] shrink-0" /> {item}
                  </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
}
