import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import {
    ArrowRight,
    Shield,
    Clock,
    Lock,
    AlertTriangle,
    Loader2,
    Globe,
    Smartphone
} from "lucide-react";
import { Seo } from "../Seo";

export function ClientCare() {
    const [isPortalOpen, setIsPortalOpen] = useState(false);
    const [domain, setDomain] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Simulate network check delay
        setTimeout(() => {
            setIsLoading(false);
            const errors = [
                "Please login from within your network or approved device.",
                "Access unavailable."
            ];
            setError(errors[Math.floor(Math.random() * errors.length)]);
        }, 1500);
    };

    const handleClose = () => {
        setIsPortalOpen(false);
        setDomain("");
        setError("");
    };

    return (
        <Seo
            title="Humaneers | Client Care"
            description="Concierge support for our private clients. Direct access, zero wait times, and dedicated engineering resources."
            canonicalPath="/client-care"
        >
            <div className="bg-brand-cream min-h-screen">
                {/* Hero section */}
                <section className="bg-brand-oxford text-white py-20">
                    <div className="container mx-auto px-6 text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">Client Care</h1>
                        <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
                            Concierge support for our private clients.
                        </p>
                    </div>
                </section>

                <section className="py-20">
                    <div className="container mx-auto px-6">
                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
                            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                                <Clock className="w-10 h-10 text-brand-copper mb-4" />
                                <h3 className="text-xl font-bold text-brand-oxford mb-2">Zero Wait Time</h3>
                                <p className="text-brand-slate">
                                    Direct access to senior engineers. No ticketing queues or tier-1 support scripts.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                                <Smartphone className="w-10 h-10 text-brand-copper mb-4" />
                                <h3 className="text-xl font-bold text-brand-oxford mb-2">Direct Access</h3>
                                <p className="text-brand-slate">
                                    Text, call, or email your dedicated partner directly. 24/7 emergency availability.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                                <Shield className="w-10 h-10 text-brand-copper mb-4" />
                                <h3 className="text-xl font-bold text-brand-oxford mb-2">Proactive Security</h3>
                                <p className="text-brand-slate">
                                    Continuous monitoring and threat hunting on your behalf, before issues arise.
                                </p>
                            </div>
                        </div>

                        <div className="max-w-md mx-auto text-center">
                            <Dialog open={isPortalOpen} onOpenChange={setIsPortalOpen}>
                                <DialogTrigger asChild>
                                    <Button className="bg-brand-oxford text-white hover:bg-brand-oxford/90 px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
                                        <Lock className="w-5 h-5 mr-2" /> Login to Portal
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle className="text-2xl font-bold text-center text-brand-oxford">
                                            Client Portal Access
                                        </DialogTitle>
                                        <DialogDescription className="text-center text-brand-slate">
                                            Enter your authorized account domain to access your organization's dashboard.
                                        </DialogDescription>
                                    </DialogHeader>

                                    <form onSubmit={handleLogin} className="space-y-4 py-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="domain">Account Domain</Label>
                                            <div className="relative">
                                                <Input
                                                    id="domain"
                                                    type="text"
                                                    placeholder="company.com"
                                                    value={domain}
                                                    onChange={(e) => setDomain(e.target.value)}
                                                    className={`pl-10 ${error ? "border-red-500 bg-red-50 focus-visible:ring-red-500" : ""}`}
                                                    autoFocus
                                                />
                                                <Globe className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                            </div>
                                        </div>

                                        <div className="bg-blue-50 p-3 rounded text-xs text-blue-800 flex gap-2">
                                            <Shield className="w-4 h-4 shrink-0" />
                                            <span>
                                                This connection is end-to-end encrypted. Access is restricted to authorized IP ranges.
                                            </span>
                                        </div>

                                        {error && (
                                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm flex items-start gap-2 animate-shake">
                                                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                                                <span className="font-semibold">{error}</span>
                                            </div>
                                        )}

                                        <div className="flex justify-end gap-3 pt-2">
                                            <Button type="button" variant="ghost" onClick={handleClose}>
                                                Cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                className="bg-brand-oxford hover:bg-brand-oxford/90 text-white min-w-[140px]"
                                                disabled={isLoading || !domain}
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...
                                                    </>
                                                ) : (
                                                    <>
                                                        Connect <ArrowRight className="ml-2 w-4 h-4" />
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </form>
                                </DialogContent>
                            </Dialog>
                            <p className="mt-4 text-sm text-brand-slate">
                                Existing clients only. Please use your provided credentials.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </Seo>
    );
}
