import { useState } from "react";
import {
  Scale,
  Shield,
  FileText,
  AlertTriangle,
  Lock,
  CheckCircle2,
  Send,
  HeartHandshake,
  Loader2,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { toast } from "sonner";
import { submitEthicsReport } from "../../lib/api";
import { Seo } from "../Seo";

export function Ethics() {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [reportType, setReportType] = useState("general");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitEthicsReport({
        isAnonymous,
        name: isAnonymous ? undefined : name,
        email: isAnonymous ? undefined : email,
        reportType,
        details,
      });
      setIsSuccess(true);
      toast.success("Report submitted successfully. Thank you for speaking up.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to submit report. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Seo
      title="Humaneers | Ethics Charter | Speak Up Policy"
      description="Our code of ethics and whistleblower policy. Submit anonymous reports and view our core principles. Integrity, transparency, and accountability."
      canonicalPath="/ethics"
    >
      <div className="bg-white min-h-screen">
        {/* Header */}
        <section className="bg-brand-oxford text-white py-20 relative overflow-hidden">
          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-brand-copper/20 text-brand-copper px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-brand-copper/30">
              <Scale size={16} /> Corporate Governance
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Ethics Charter</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
              Our commitment to integrity, transparency, and doing the right thing, even when no one
              is watching.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-12 gap-16">
            {/* Left Column: The Charter */}
            <div className="lg:col-span-7 space-y-16">
              <section>
                <h2 className="text-3xl font-bold text-brand-oxford mb-8 flex items-center gap-3">
                  <FileText className="text-brand-copper" /> Core Principles
                </h2>

                <div className="space-y-8">
                  <div className="bg-brand-cream p-8 rounded-xl border border-brand-copper/20">
                    <h3 className="text-xl font-bold text-brand-oxford mb-3">
                      1. Mission Statement
                    </h3>
                    <p className="text-brand-slate leading-relaxed">
                      We exist to bring enterprise-grade discipline and security to the small
                      businesses that power our community. We believe that robust technology
                      infrastructure is a right, not a luxury reserved for the Fortune 500.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="border-l-4 border-brand-copper pl-6 py-2">
                      <h4 className="font-bold text-brand-oxford mb-2 flex items-center gap-2">
                        <HeartHandshake className="w-4 h-4 text-brand-copper" /> Client-First
                      </h4>
                      <p className="text-sm text-brand-slate">
                        Our "No-BS" promise means we practice strict vendor neutrality. We recommend
                        what works for you, not what pays us the highest commission.
                      </p>
                    </div>
                    <div className="border-l-4 border-brand-copper pl-6 py-2">
                      <h4 className="font-bold text-brand-oxford mb-2 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-brand-copper" /> Anti-Corruption
                      </h4>
                      <p className="text-sm text-brand-slate">
                        Zero tolerance for kickbacks, bribery, or undisclosed referral fees. All
                        procurement decisions are documented and available for client review.
                      </p>
                    </div>
                    <div className="border-l-4 border-brand-copper pl-6 py-2">
                      <h4 className="font-bold text-brand-oxford mb-2 flex items-center gap-2">
                        <Lock className="w-4 h-4 text-brand-copper" /> Data Ethics
                      </h4>
                      <p className="text-sm text-brand-slate">
                        We are custodians, not owners, of your data. We never sell client
                        information. We adhere to SOC 2 Type II standards for all data handling.
                      </p>
                    </div>
                    <div className="border-l-4 border-brand-copper pl-6 py-2">
                      <h4 className="font-bold text-brand-oxford mb-2 flex items-center gap-2">
                        <Scale className="w-4 h-4 text-brand-copper" /> Accountability
                      </h4>
                      <p className="text-sm text-brand-slate">
                        If we break it, we fix it. If we recommend it and it fails, we own the
                        remediation. We stand behind our engineering.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-brand-oxford mb-6 flex items-center gap-3">
                  <AlertTriangle className="text-brand-copper" /> Whistleblowing Policy
                </h2>
                <div className="prose prose-gray max-w-none text-brand-slate">
                  <p>
                    Humaneers fosters a culture of "Speaking Up." We encourage employees,
                    contractors, suppliers, and clients to report any suspected wrongdoing without
                    fear of retaliation.
                  </p>
                  <h4 className="font-bold text-brand-oxford mt-4 mb-2">
                    Scope of Reportable Issues
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>Financial fraud or accounting irregularities</li>
                    <li>Bribery, corruption, or conflict of interest</li>
                    <li>Harassment, discrimination, or workplace safety violations</li>
                    <li>Security breaches or data privacy violations</li>
                    <li>Unethical business practices</li>
                  </ul>
                  <h4 className="font-bold text-brand-oxford mt-4 mb-2">
                    Non-Retaliation Guarantee
                  </h4>
                  <p>
                    We strictly prohibit retaliation against anyone who raises a concern in good
                    faith. Reports are handled with the utmost confidentiality by our independent
                    Compliance Officer.
                  </p>
                </div>
              </section>
            </div>

            {/* Right Column: Reporting Form */}
            <div className="lg:col-span-5">
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 sticky top-24 shadow-sm">
                {!isSuccess ? (
                  <div key="form">
                    <h3 className="text-2xl font-bold text-brand-oxford mb-2">Submit a Report</h3>
                    <p className="text-sm text-gray-500 mb-6">
                      Use this secure form to report ethical concerns. You may choose to remain
                      anonymous.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-2">
                          <Lock
                            size={16}
                            className={isAnonymous ? "text-brand-copper" : "text-gray-400"}
                          />
                          <Label htmlFor="anonymous-mode" className="cursor-pointer">
                            Submit Anonymously
                          </Label>
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
                            <Input
                              id="name"
                              placeholder="Your name"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="work@email.com"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
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
                          value={details}
                          onChange={(e) => setDetails(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <input type="checkbox" id="consent" className="mt-1" required />
                          <Label
                            htmlFor="consent"
                            className="text-xs text-gray-500 font-normal leading-tight"
                          >
                            I certify that the information provided is true to the best of my
                            knowledge. I understand that knowingly making a false report is a
                            violation of the Ethics Charter.
                          </Label>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-brand-copper hover:bg-brand-copper-dark text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <Loader2 size={16} className="animate-spin" /> Encrypting & Sending...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            Submit Secure Report <Send size={16} />
                          </span>
                        )}
                      </Button>

                      <p className="text-[10px] text-center text-gray-400">
                        This form is encrypted end-to-end. Reports are routed directly to the Chief
                        Compliance Officer.
                      </p>
                    </form>
                  </div>
                ) : (
                  <div key="success" className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-brand-oxford mb-4">Report Received</h3>
                    <p className="text-gray-600 mb-8">
                      Thank you for speaking up. Your report has been securely transmitted. A case
                      number has been generated for our internal records.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsSuccess(false);
                        setIsAnonymous(false);
                      }}
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
    </Seo>
  );
}
