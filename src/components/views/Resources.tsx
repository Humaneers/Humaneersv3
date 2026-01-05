import { useEffect, useState } from "react";
import { View } from "../../App";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Search, BookOpen, Shield, FileText, HelpCircle, ArrowRight, Tag, Server, Zap, Lock } from "lucide-react";
import { Badge } from "../ui/badge";

interface ResourcesProps {
  onViewChange: (view: View) => void;
}

type Audience = "All" | "Founder" | "IT Admin" | "Ops";

export function Resources({ onViewChange }: ResourcesProps) {
  const [activeTab, setActiveTab] = useState<Audience>("All");

  useEffect(() => {
    document.title = "Humaneers | Resources & Knowledge Base";
    window.scrollTo(0, 0);
  }, []);

  const resources = [
    {
      id: 1,
      title: "Incident Response Playbook",
      category: "Operational",
      type: "Guide",
      audience: "IT Admin",
      description: "Step-by-step protocols for when systems go down or a breach is detected.",
      icon: Server,
    },
    {
      id: 2,
      title: "Zero Trust Architecture Explained",
      category: "Security",
      type: "Explainer",
      audience: "IT Admin",
      description: "Why the old 'castle and moat' security model is dead, and what replaces it.",
      icon: Shield,
    },
    {
      id: 3,
      title: "The Solo Founder's Tech Stack",
      category: "Strategic",
      type: "Guide",
      audience: "Founder",
      description: "Essential tools for the company of one to operate like a company of ten.",
      icon: Zap,
    },
    {
      id: 4,
      title: "SOC 2 Compliance Checklist",
      category: "Strategic",
      type: "Checklist",
      audience: "Ops",
      description: "Preparing your operational processes for your first security audit.",
      icon: FileText,
    },
    {
      id: 5,
      title: "Phishing Resistance Training",
      category: "Security",
      type: "Training",
      audience: "All",
      description: "How to spot sophisticated email attacks that bypass spam filters.",
      icon: Lock,
    },
    {
      id: 6,
      title: "Hardware Lifecycle Policy Template",
      category: "Operational",
      type: "Template",
      audience: "Ops",
      description: "Copy-paste policy for managing device procurement and e-waste.",
      icon: FileText,
    },
  ];

  const glossaryTerms = [
    { term: "MFA (Multi-Factor Authentication)", def: "A security system that requires more than one method of authentication from independent categories of credentials to verify the user's identity." },
    { term: "Zero Trust", def: "A strategic initiative that helps prevent successful data breaches by eliminating the concept of trust from an organization's network architecture." },
    { term: "Endpoint", def: "Any remote computing device that communicates back and forth with a network to which it is connected (e.g., laptops, phones)." },
    { term: "SLA (Service Level Agreement)", def: "A commitment between a service provider and a client. Particular aspects of the service – quality, availability, responsibilities – are agreed between the service provider and the service user." },
  ];

  const filteredResources = activeTab === "All" 
    ? resources 
    : resources.filter(r => r.audience === activeTab || r.audience === "All");

  return (
    <div className="bg-[#F5F1E9] min-h-screen">
      {/* Hero */}
      <section className="bg-[#1B263B] text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#B87333]/10 skew-y-12 transform translate-x-20"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Knowledge Base & Resources</h1>
          <p className="text-xl max-w-2xl mx-auto text-gray-300 font-light mb-8">
            Detailed documentation, strategic guides, and security explainers to help you manage your digital infrastructure.
          </p>
          
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <Input 
              type="text" 
              placeholder="Search guides, terms, or error codes..." 
              className="pl-10 h-12 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:bg-white/20 transition-all rounded-lg"
            />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        
        {/* Audience Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div className="flex bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
            {(["All", "Founder", "IT Admin", "Ops"] as Audience[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  activeTab === tab 
                    ? "bg-[#1B263B] text-white shadow-sm" 
                    : "text-gray-500 hover:text-[#1B263B] hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="text-sm text-gray-500 italic">
            Showing resources for: <span className="font-semibold text-[#1B263B]">{activeTab}</span>
          </div>
        </div>

        {/* Main Resource Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {filteredResources.map((resource) => (
            <div key={resource.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-[#F5F1E9] rounded-lg flex items-center justify-center text-[#B87333]">
                  <resource.icon size={20} />
                </div>
                <Badge variant="outline" className="text-xs font-normal border-gray-200 text-gray-500">
                  {resource.category}
                </Badge>
              </div>
              
              <h3 className="text-lg font-bold text-[#1B263B] mb-2 group-hover:text-[#B87333] transition-colors">
                {resource.title}
              </h3>
              <p className="text-gray-500 text-sm mb-6 flex-grow">
                {resource.description}
              </p>
              
              <div className="pt-4 border-t border-gray-100 flex justify-between items-center mt-auto">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Tag size={12} />
                  <span>{resource.audience}</span>
                </div>
                <button className="text-[#B87333] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Operational Docs vs Strategic Content Split */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          
          {/* Operational Documentation */}
          <div className="bg-white p-8 rounded-xl border-l-4 border-[#1B263B] shadow-sm">
            <h2 className="text-2xl font-bold text-[#1B263B] mb-6 flex items-center gap-3">
              <Server className="text-[#1B263B]" /> Operational Documentation
            </h2>
            <p className="text-[#4E596F] mb-6">
              Technical manuals and live system status for active clients. These resources are maintained by our engineering team.
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="font-medium text-[#1B263B]">System Status</span>
                </div>
                <a href="https://status.humaneers.dev/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#B87333] hover:text-[#a0632a]">Check Status →</a>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <HelpCircle size={16} className="text-gray-400" />
                  <span className="font-medium text-[#1B263B]">Support Portal</span>
                </div>
                <a href="https://support.humaneers.dev/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#B87333] hover:text-[#a0632a]">Open Portal →</a>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <BookOpen size={16} className="text-gray-400" />
                  <span className="font-medium text-[#1B263B]">Client Onboarding Manual</span>
                </div>
                <Button variant="ghost" size="sm" className="text-[#B87333] hover:text-[#a0632a]">Download PDF</Button>
              </div>
            </div>
          </div>

          {/* Glossary */}
          <div className="bg-[#1B263B] p-8 rounded-xl text-white shadow-sm">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <BookOpen className="text-[#B87333]" /> IT Glossary
            </h2>
            <div className="space-y-6">
              {glossaryTerms.map((item, i) => (
                <div key={i} className="border-b border-gray-700 pb-4 last:border-0 last:pb-0">
                  <h4 className="font-bold text-[#B87333] mb-1">{item.term}</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{item.def}</p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-8 border-gray-600 text-gray-300 hover:text-white hover:bg-white/10">
              View Full Glossary
            </Button>
          </div>

        </div>

        {/* Security FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1B263B] mb-8 text-center">Incident Response FAQ</h2>
          <div className="space-y-4">
             <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h4 className="font-bold text-[#1B263B] mb-2">What qualifies as a P1 Critical Incident?</h4>
                <p className="text-[#4E596F] text-sm">
                   Any outage affecting &gt;50% of users, a confirmed data breach, or active ransomware attack. P1 incidents trigger our 15-minute SLA response protocol.
                </p>
             </div>
             <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h4 className="font-bold text-[#1B263B] mb-2">How do I report a security vulnerability?</h4>
                <p className="text-[#4E596F] text-sm">
                   We maintain a responsible disclosure program. Please email security@humaneers.co (PGP key available in Colophon) with details. We do not offer bounties but we publicly credit researchers.
                </p>
             </div>
             <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h4 className="font-bold text-[#1B263B] mb-2">What is your data retention policy on logs?</h4>
                <p className="text-[#4E596F] text-sm">
                   Security logs are retained for 365 days in cold storage (immutable). Operational logs are cycled every 30 days.
                </p>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
