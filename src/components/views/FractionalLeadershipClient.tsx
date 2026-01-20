"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Users,
  PieChart,
  GitMerge,
  Lightbulb,
  Briefcase,
  FileText,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { routePaths } from "../../routes";

function LockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export function FractionalLeadershipClient() {
  const router = useRouter();

  const roles = [
    {
      title: "Fractional CIO",
      subtitle: "Chief Information Officer",
      desc: "Aligns your technology roadmap with business goals. Evaluates tool stacks, manages vendor budgets, and plans for scale.",
      icon: <GitMerge className="w-8 h-8 text-white" />,
    },
    {
      title: "Fractional CMO",
      subtitle: "Chief Marketing Officer",
      desc: "Architects your market position, lead generation funnels, and brand voice. Manages agencies or junior staff.",
      icon: <TrendingUp className="w-8 h-8 text-white" />,
    },
    {
      title: "Fractional CISO",
      subtitle: "Chief Info Security Officer",
      desc: "Develops governance, risk, and compliance (GRC) strategies. Handles audits (SOC 2, ISO) and disaster recovery.",
      icon: <LockIcon className="w-8 h-8 text-white" />,
    },
  ];

  const deliverables = [
    {
      icon: <PieChart className="w-6 h-6 text-brand-copper" />,
      title: "3-Year Strategic Roadmaps",
      desc: "We build the chart that tells you exactly what to buy, when to hire, and how to grow.",
    },
    {
      icon: <Users className="w-6 h-6 text-brand-copper" />,
      title: "Vendor Management",
      desc: "We sit on the phone with Salesforce/Microsoft so you don't have to. We negotiate better rates.",
    },
    {
      icon: <Briefcase className="w-6 h-6 text-brand-copper" />,
      title: "Hiring & Team Building",
      desc: "We write job descriptions, interview candidates for technical roles, and structure your departments.",
    },
    {
      icon: <FileText className="w-6 h-6 text-brand-copper" />,
      title: "Board Reporting",
      desc: "We prepare the decks and present the metrics that your investors and board members care about.",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-brand-oxford text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
            Executive Strategy.
            <br />
            <span className="text-brand-copper">Fractional Cost.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto mb-10">
            Get the playbook of a $300k/yr executive for a fraction of the price. We embed into your
            leadership team to drive outcomes, not just hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() =>
                router.push(`${routePaths.talkToSales}?interest=Fractional%20Leadership`)
              }
              className="bg-brand-copper hover:bg-brand-copper-dark text-white text-lg px-8 py-6 h-auto rounded-full shadow-lg"
            >
              Match with a Leader
            </Button>
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="py-24 bg-brand-cream relative md:-mt-20 z-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {roles.map((r, i) => (
              <div
                key={i}
                className="bg-brand-oxford text-white p-8 rounded-2xl shadow-xl border-t-4 border-brand-copper hover:translate-y-[-5px] transition-transform"
              >
                <div className="bg-brand-copper w-14 h-14 rounded-full flex items-center justify-center mb-6">
                  {r.icon}
                </div>
                <h3 className="text-2xl font-bold mb-1">{r.title}</h3>
                <div className="text-brand-copper text-sm font-bold uppercase tracking-widest mb-4">
                  {r.subtitle}
                </div>
                <p className="text-gray-300 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2">
              <h2 className="text-brand-copper font-bold tracking-widest uppercase mb-4 text-sm">
                What We Do
              </h2>
              <h3 className="text-3xl md:text-5xl font-bold text-brand-oxford mb-6 leading-tight">
                We don't just advise. We execute.
              </h3>
              <p className="text-brand-slate text-lg mb-8 leading-relaxed">
                Consultants give you a binder and leave. Fractional Leaders own the number. We take
                accountability for the department's success or failure.
              </p>
              <div className="grid gap-6">
                {deliverables.map((d, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="shrink-0 mt-1 bg-brand-cream p-2 rounded-lg">{d.icon}</div>
                    <div>
                      <h4 className="font-bold text-brand-oxford text-lg">{d.title}</h4>
                      <p className="text-brand-slate text-sm">{d.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-gray-100 rounded-3xl p-8 relative">
                <div className="absolute top-0 right-0 -mt-6 -mr-6 bg-brand-copper p-4 rounded-xl shadow-lg">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-brand-oxford text-xl mb-4">Sample Engagement</h4>
                <ul className="space-y-4">
                  <li className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                    <span className="font-medium text-brand-oxford">Weekly Exec Meeting</span>
                    <span className="text-sm text-gray-500">1 hr/wk</span>
                  </li>
                  <li className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                    <span className="font-medium text-brand-oxford">Team Management 1:1s</span>
                    <span className="text-sm text-gray-500">2 hrs/wk</span>
                  </li>
                  <li className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                    <span className="font-medium text-brand-oxford">Deep Work / Strategy</span>
                    <span className="text-sm text-gray-500">5 hrs/wk</span>
                  </li>
                  <li className="flex items-center justify-between p-4 bg-brand-oxford text-white rounded-xl shadow-sm">
                    <span className="font-bold">Total Investment</span>
                    <span className="text-sm">~8 hrs/wk</span>
                  </li>
                </ul>
                <div className="mt-8 text-center text-sm text-gray-500 italic">
                  *Typical engagement for a Series A startup
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-brand-cream text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-brand-oxford mb-6">
            Leadership waiting for you.
          </h2>
          <p className="text-xl text-brand-slate mb-10 max-w-2xl mx-auto">
            Skip the 6-month executive search. Start with a leader next week.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() =>
                router.push(`${routePaths.talkToSales}?interest=Fractional%20Leadership`)
              }
              className="bg-brand-copper hover:bg-brand-copper-dark text-white text-xl px-12 py-8 h-auto rounded-full shadow-lg"
            >
              Contact Us <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
