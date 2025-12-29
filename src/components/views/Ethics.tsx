import { useEffect, useState } from "react";
import { View } from "../../App";
import { Scale, Shield, FileText, AlertTriangle, Lock, CheckCircle2, Send, HeartHandshake } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { toast } from "sonner@2.0.3";

interface EthicsProps {
  onViewChange: (view: View) => void;
}

export function Ethics({ onViewChange }: EthicsProps) {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [reportType, setReportType] = useState("general");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    document.title = "Humaneers | Ethics Charter & Reporting";
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success("Report submitted successfully. Thank you for speaking up.");
    }, 1500);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-[#1B263B] text-white py-20 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#B87333]/20 text-[#B87333] px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-[#B87333]/30">
            <Scale size={16} /> Corporate Governance
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Ethics Charter</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            Our commitment to integrity, transparency, and doing the right thing—even when no one is watching.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* Left Column: The Charter */}
          <div className="lg:col-span-7 space-y-16">
            
            <section>
              <h2 className="text-3xl font-bold text-[#1B263B] mb-8 flex items-center gap-3">
                <FileText className="text-[#B87333]" /> Core Principles
              </h2>
              
              <div className="space-y-8">
                <div className="bg-[#F5F1E9] p-8 rounded-xl border border-[#B87333]/20">
                  <h3 className="text-xl font-bold text-[#1B263B] mb-3">1. Mission Statement</h3>
                  <p className="text-[#4E596F] leading-relaxed">
                    We exist to bring enterprise-grade discipline and security to the small businesses that power our community. We believe that robust technology infrastructure is a right, not a luxury reserved for the Fortune 500.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                   <div className="border-l-4 border-[#B87333] pl-6 py-2">
                      <h4 className="font-bold text-[#1B263B] mb-2 flex items-center gap-2">
                         <HeartHandshake className="w-4 h-4 text-[#B87333]" /> Client-First
                      </h4>
                      <p className="text-sm text-[#4E596F]">
                         Our "No-BS" promise means we practice strict vendor neutrality. We recommend what works for you, not what pays us the highest commission.
                      </p>
                   </div>
                   <div className="border-l-4 border-[#B87333] pl-6 py-2">
                      <h4 className="font-bold text-[#1B263B] mb-2 flex items-center gap-2">
                         <Shield className="w-4 h-4 text-[#B87333]" /> Anti-Corruption
                      </h4>
                      <p className="text-sm text-[#4E596F]">
                         Zero tolerance for kickbacks, bribery, or undisclosed referral fees. All procurement decisions are documented and available for client review.
                      </p>
                   </div>
                   <div className="border-l-4 border-[#B87333] pl-6 py-2">
                      <h4 className="font-bold text-[#1B263B] mb-2 flex items-center gap-2">
                         <Lock className="w-4 h-4 text-[#B87333]" /> Data Ethics
                      </h4>
                      <p className="text-sm text-[#4E596F]">
                         We are custodians, not owners, of your data. We never sell client information. We adhere to SOC 2 Type II standards for all data handling.
                      </p>
                   </div>
                   <div className="border-l-4 border-[#B87333] pl-6 py-2">
                      <h4 className="font-bold text-[#1B263B] mb-2 flex items-center gap-2">
                         <Scale className="w-4 h-4 text-[#B87333]" /> Accountability
                      </h4>
                      <p className="text-sm text-[#4E596F]">
                         If we break it, we fix it. If we recommend it and it fails, we own the remediation. We stand behind our engineering.
                      </p>
                   </div>
                </div>
              </div>
            </section>

            <section>
               <h2 className="text-2xl font-bold text-[#1B263B] mb-6 flex items-center gap-3">
                <AlertTriangle className="text-[#B87333]" /> Whistleblowing Policy
              </h2>
              <div className="prose prose-gray max-w-none text-[#4E596F]">
                 <p>
                    Humaneers fosters a culture of "Speaking Up." We encourage employees, contractors, suppliers, and clients to report any suspected wrongdoing without fear of retaliation.
                 </p>
                 <h4 className="font-bold text-[#1B263B] mt-4 mb-2">Scope of Reportable Issues</h4>
                 <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>Financial fraud or accounting irregularities</li>
                    <li>Bribery, corruption, or conflict of interest</li>
                    <li>Harassment, discrimination, or workplace safety violations</li>
                    <li>Security breaches or data privacy violations</li>
                    <li>Unethical business practices</li>
                 </ul>
                 <h4 className="font-bold text-[#1B263B] mt-4 mb-2">Non-Retaliation Guarantee</h4>
                 <p>
                    We strictly prohibit retaliation against anyone who raises a concern in good faith. Reports are handled with the utmost confidentiality by our independent Compliance Officer.
                 </p>
              </div>
            </section>

          </div>

          {/* Right Column: Reporting Form */}
          <div className="lg:col-span-5">
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 sticky top-24 shadow-sm">
               
               {!isSuccess ? (
                  <div key="form">
                     <h3 className="text-2xl font-bold text-[#1B263B] mb-2">Submit a Report</h3>
                     <p className="text-sm text-gray-500 mb-6">
                        Use this secure form to report ethical concerns. You may choose to remain anonymous.
                     </p>

                     <form onSubmit={handleSubmit} className="space-y-6">
                        
                        <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
                           <div className="flex items-center gap-2">
                              <Lock size={16} className={isAnonymous ? "text-[#B87333]" : "text-gray-400"} />
                              <Label htmlFor="anonymous-mode" className="cursor-pointer">Submit Anonymously</Label>
                           </div>
                           <Switch 
                              id="anonymous-mode" 
                              checked={isAnonymous}
                              onCheckedChange={setIsAnonymous}
                           />
                        </div>

                        {!isAnonymous && (
                           <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                 <Label htmlFor="name">Name</Label>
                                 <Input id="name" placeholder="Your name" required />
                              </div>
                              <div className="space-y-2">
                                 <Label htmlFor="email">Email</Label>
                                 <Input id="email" type="email" placeholder="work@email.com" required />
                              </div>
                           </div>
                        )}

                        <div className="space-y-2">
                           <Label htmlFor="type">Concern Type</Label>
                           <select 
                              id="type" 
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              value={reportType}
                              onChange={(e) => setReportType(e.target.value)}
                           >
                              <option value="general">General Ethics Concern</option>
                              <option value="fraud">Fraud / Corruption</option>
                              <option value="harassment">Harassment / Discrimination</option>
                              <option value="security">Security / Data Breach</option>
                              <option value="other">Other</option>
                           </select>
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="details">Incident Details</Label>
                           <Textarea 
                              id="details" 
                              placeholder="Please provide as much detail as possible (dates, people involved, description of events)..." 
                              className="min-h-[150px]"
                              required
                           />
                        </div>

                        <div className="space-y-2">
                           <div className="flex items-start gap-2">
                              <input type="checkbox" id="consent" className="mt-1" required />
                              <Label htmlFor="consent" className="text-xs text-gray-500 font-normal leading-tight">
                                 I certify that the information provided is true to the best of my knowledge. I understand that knowingly making a false report is a violation of the Ethics Charter.
                              </Label>
                           </div>
                        </div>

                        <Button 
                           type="submit" 
                           className="w-full bg-[#B87333] hover:bg-[#a0632a] text-white"
                           disabled={isSubmitting}
                        >
                           {isSubmitting ? "Encrypting & Sending..." : (
                              <span className="flex items-center gap-2">
                                 Submit Secure Report <Send size={16} />
                              </span>
                           )}
                        </Button>
                        
                        <p className="text-[10px] text-center text-gray-400">
                           This form is encrypted end-to-end. Reports are routed directly to the Chief Compliance Officer.
                        </p>
                     </form>
                  </div>
               ) : (
                  <div key="success" className="text-center py-12">
                     <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={32} />
                     </div>
                     <h3 className="text-2xl font-bold text-[#1B263B] mb-4">Report Received</h3>
                     <p className="text-gray-600 mb-8">
                        Thank you for speaking up. Your report has been securely transmitted. A case number has been generated for our internal records.
                     </p>
                     <Button 
                        variant="outline" 
                        onClick={() => { setIsSuccess(false); setIsAnonymous(false); }}
                     >
                        Submit Another Report
                     </Button>
                  </div>
               )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
