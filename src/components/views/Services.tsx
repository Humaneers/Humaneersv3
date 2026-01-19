import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Shield,
  BarChart3,
  Users,
  Server,
  ArrowRight,
  CheckCircle2,
  Layers,
  AlertTriangle,
  Heart,
  Building2,
} from "lucide-react";
import { DefinitionTooltip } from "../DefinitionTooltip";
import { routePaths } from "../../routes";

export function Services() {
  const navigate = useNavigate();

  const initialServices = [
    {
      id: "managed-it",
      title: "Managed IT",
      icon: <Server className="w-8 h-8 text-white" />,
      image:
        "https://images.unsplash.com/photo-1591238372358-dbbb7a59f22c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5hZ2VkJTIwaXQlMjBzZXJ2ZXIlMjByb29tJTIwZW5naW5lZXJ8ZW58MXx8fHwxNzY2OTUyMTUxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Enterprise infrastructure with a craftsman touch.",
      features: [
        "100% US-Based Helpdesk",
        "Hybrid & Cloud Infrastructure",
        "Proactive Security Monitoring",
      ],
      link: routePaths.managedIt,
      color: "bg-brand-oxford",
    },
    {
      id: "growth",
      title: "Brand Growth",
      icon: <BarChart3 className="w-8 h-8 text-white" />,
      image:
        "https://images.unsplash.com/photo-1758873272540-439a105db676?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGJyYW5kaW5nJTIwbWVldGluZyUyMG9mZmljZXxlbnwxfHx8fDE3NjY5NTIxNTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "US-ready brand and go-to-market strategy.",
      features: ["Brand Localization", "Visual Identity Refinement", "Go-To-Market Planning"],
      link: routePaths.growth,
      color: "bg-brand-copper",
    },
    {
      id: "family-protection",
      title: "Family Protection",
      icon: <Shield className="w-8 h-8 text-white" />,
      image:
        "https://images.unsplash.com/photo-1640622304233-7335e936f11b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjB1c2luZyUyMHRhYmxldCUyMGhvbWUlMjBzZWN1cmV8ZW58MXx8fHwxNzY2OTUyMTUxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Secure home-office tech for families and execs.",
      features: ["Home Network Segmentation", "Content Filtering", "Dark Web Monitoring"],
      link: routePaths.familyProtection,
      color: "bg-brand-slate",
    },
    {
      id: "fractional-leadership",
      title: "Fractional Leadership",
      icon: <Users className="w-8 h-8 text-white" />,
      image:
        "https://images.unsplash.com/photo-1764810815228-b7f9432eec5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleGVjdXRpdmUlMjBib2FyZHJvb20lMjBtZWV0aW5nfGVufDF8fHx8MTc2Njk1MjE1MXww&ixlib=rb-4.1.0&q=80&w=1080",
      description: <span>vCIO/vCMO strategy without the full-time cost.</span>,
      features: ["Quarterly Business Reviews", "Budgeting & Procurement", "Board Representation"],
      link: routePaths.fractionalLeadership,
      color: "bg-brand-oxford",
    },
  ];

  const additionalServices = [
    {
      id: "crisis-management",
      title: "Crisis Management",
      icon: <AlertTriangle className="w-8 h-8 text-white" />,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
      description: "Digital scrubbing and reputation defense.",
      features: ["SEO Suppression", "Digital Scrubbing", "Social Media Lockdown"],
      link: routePaths.crisisManagement,
      color: "bg-red-900",
    },
    {
      id: "senior-care",
      title: "Senior Care",
      icon: <Heart className="w-8 h-8 text-white" />,
      image:
        "https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&q=80",
      description: "Dignified tech support and fraud protection for seniors.",
      features: ["Fraud Air-Gapping", "Simplification", "Red Button Support"],
      link: routePaths.seniorCare,
      color: "bg-brand-copper",
    },
    {
      id: "nonprofit-it",
      title: "Nonprofit IT",
      icon: <Building2 className="w-8 h-8 text-white" />,
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80",
      description: "Mission-focused IT at nonprofit rates.",
      features: ["Grant-Ready Policies", "Donor Data Protection", "At-Cost Licensing"],
      link: routePaths.nonProfits,
      color: "bg-brand-oxford",
    },
  ];

  const services = [...initialServices, ...additionalServices];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-brand-oxford text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-brand-copper/20 rounded-full mb-6">
            <Layers className="w-6 h-6 text-brand-copper mr-2" />
            <span className="text-brand-copper font-bold uppercase tracking-widest text-sm">
              Full Spectrum Support
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Comprehensive Services
            <br />
            for Modern Growth.
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto mb-8">
            From the server room to the board room, we provide the technology and strategy you need
            to scale.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-brand-cream">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col group hover:shadow-xl transition-shadow"
              >
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 ${service.color} opacity-80 mix-blend-multiply`}
                  />
                  <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/50 to-transparent">
                    <div className="flex items-center gap-4">
                      <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                        {service.icon}
                      </div>
                      <h2 className="text-3xl font-bold text-white">{service.title}</h2>
                    </div>
                  </div>
                </div>

                <div className="p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <p className="text-brand-slate text-lg mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-3 text-brand-oxford font-medium"
                        >
                          <CheckCircle2 className="w-5 h-5 text-brand-copper shrink-0" /> {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    onClick={() => navigate(service.link)}
                    className="w-full bg-gray-100 text-brand-oxford hover:bg-gray-200 justify-between group-hover:bg-brand-copper group-hover:text-white transition-colors"
                  >
                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Humaneers Difference */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-brand-oxford mb-12">Why Clients Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="text-4xl font-bold text-brand-copper mb-4">100%</div>
              <h3 className="text-xl font-bold text-brand-oxford mb-2">US-Based</h3>
              <p className="text-brand-slate">
                No offshore call centers. Every engineer and strategist is local.
              </p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-brand-copper mb-4 flex items-center justify-center gap-2">
                <DefinitionTooltip
                  term="SOC 2"
                  definition="System and Organization Controls 2: An auditing procedure that ensures service providers securely manage your data to protect the interests of your organization and the privacy of its clients."
                />
              </div>
              <h3 className="text-xl font-bold text-brand-oxford mb-2">Compliant</h3>
              <p className="text-brand-slate">
                Enterprise-grade security controls applied to every client, big or small.
              </p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-brand-copper mb-4">No</div>
              <h3 className="text-xl font-bold text-brand-oxford mb-2">Vendor Lock-in</h3>
              <p className="text-brand-slate">
                We build on standard stacks (Microsoft, AWS) so you own your infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-oxford text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Not Sure Where to Start?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Our "Foundation" plan covers the essentials for most businesses. Let's chat about your
            needs.
          </p>
          <Button
            onClick={() =>
              navigate(routePaths.talkToSales, { state: { source: "Services Overview Page" } })
            }
            className="bg-brand-copper hover:bg-brand-copper-dark text-white text-xl px-10 py-6 h-auto rounded-full"
          >
            Talk to Sales
          </Button>
        </div>
      </section>
    </div>
  );
}
