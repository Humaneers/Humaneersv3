import { useEffect } from "react";
import { View } from "../../App";
import { CheckCircle2, ShieldCheck, Server, Globe, AlertCircle, Clock } from "lucide-react";

interface StatusProps {
  onViewChange: (view: View) => void;
}

export function Status({ onViewChange }: StatusProps) {
  useEffect(() => {
    document.title = "Humaneers | System Status";
    window.scrollTo(0, 0);
  }, []);

  const systems = [
    { name: "Global Mesh Network", status: "Operational", uptime: "99.99%", lastIncident: "45 days ago" },
    { name: "Secure Endpoint Monitoring", status: "Operational", uptime: "100%", lastIncident: "None" },
    { name: "Client Portal (HumaneOS)", status: "Operational", uptime: "99.95%", lastIncident: "12 days ago" },
    { name: "Email Security Gateway", status: "Operational", uptime: "99.99%", lastIncident: "None" },
    { name: "Backup & Disaster Recovery", status: "Operational", uptime: "100%", lastIncident: "None" },
  ];

  return (
    <div className="bg-[#F5F1E9] min-h-screen">
      {/* Header */}
      <section className="bg-[#1B263B] text-white py-16">
        <div className="container mx-auto px-6 text-center">
           <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-green-500/30">
            <CheckCircle2 size={16} /> All Systems Operational
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">System Status</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Real-time performance metrics and incident history for Humaneers infrastructure.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Main Status Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
             <div className="bg-green-50 p-6 border-b border-green-100 flex items-center justify-between">
                <div>
                   <h2 className="text-xl font-bold text-[#1B263B] flex items-center gap-2">
                      <Globe className="w-5 h-5 text-green-600" /> Platform Status
                   </h2>
                   <p className="text-sm text-gray-600 mt-1">Updated 2 minutes ago</p>
                </div>
                <div className="text-right hidden sm:block">
                   <div className="text-2xl font-bold text-green-600">100%</div>
                   <div className="text-xs text-gray-500 uppercase tracking-wide">Current Uptime</div>
                </div>
             </div>
             
             <div className="divide-y divide-gray-100">
                {systems.map((sys, i) => (
                   <div key={i} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-[#1B263B]">
                            <Server size={20} />
                         </div>
                         <div>
                            <h3 className="font-bold text-[#1B263B]">{sys.name}</h3>
                            <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                               <span className="flex items-center gap-1"><Clock size={12} /> Uptime: {sys.uptime}</span>
                            </div>
                         </div>
                      </div>
                      <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full self-start sm:self-center">
                         <CheckCircle2 size={14} className="text-green-600" />
                         <span className="text-xs font-medium text-green-700">{sys.status}</span>
                      </div>
                   </div>
                ))}
             </div>
          </div>

          {/* Past Incidents (Mock) */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
             <h3 className="text-xl font-bold text-[#1B263B] mb-6">Past Incidents (Last 30 Days)</h3>
             <div className="space-y-6">
                <div className="pl-4 border-l-2 border-green-500">
                   <div className="text-sm text-gray-500 mb-1">No incidents reported today.</div>
                </div>
                <div className="pl-4 border-l-2 border-yellow-400">
                   <h4 className="font-bold text-[#1B263B]">Minor Service Disruption - Client Portal</h4>
                   <div className="text-sm text-gray-500 mb-2">Dec 14, 2024 - Resolved</div>
                   <p className="text-sm text-[#4E596F]">
                      A scheduled database maintenance window caused slightly higher latency than expected for approximately 12 minutes. No data was lost.
                   </p>
                </div>
             </div>
          </div>

          {/* Maintenance Schedule */}
           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
             <h3 className="text-xl font-bold text-[#1B263B] mb-6 flex items-center gap-2">
                <Clock className="text-[#B87333]" /> Scheduled Maintenance
             </h3>
             <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div className="flex justify-between items-start mb-2">
                   <h4 className="font-bold text-[#1B263B]">Q1 Infrastructure Upgrade</h4>
                   <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-medium">Planned</span>
                </div>
                <p className="text-sm text-[#4E596F] mb-2">
                   We will be upgrading our core switch firmware. Brief intermittent connectivity may occur during the 2am - 4am EST window.
                </p>
                <div className="text-xs text-gray-500">Scheduled for: Jan 15, 2025</div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
