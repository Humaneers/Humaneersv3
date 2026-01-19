import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Shield, Smartphone, Clock, Lock, AlertCircle, Loader2 } from "lucide-react";
import { Seo } from "../Seo";

export function ClientCare() {
    const [isPortalOpen, setIsPortalOpen] = useState(false);
    const [password, setPassword] = useState("");
    const [loginState, setLoginState] = useState<"idle" | "loading" | "denied">("idle");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (!password) return;

        setLoginState("loading");

        // Simulate API delay
        setTimeout(() => {
            setLoginState("denied");
            setPassword("");
        }, 1500);
    };

    const handleClose = () => {
        setIsPortalOpen(false);
        setLoginState("idle");
        setPassword("");
    };

    return (
        <Seo
            title="Humaneers | Client Care Services"
            description="Concierge-level support for Humaneers clients. Access your portal or contact your dedicated partner."
            canonicalPath="/client-care"
        >
            <div className="bg-brand-cream min-h-screen">
                {/* Hero */}
                <div className="bg-brand-oxford text-white py-20">
                    <div className="container mx-auto px-6 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Client Care Services</h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            We believe support should be personal, not a ticket reference number.
                            Experience the concierge difference.
                        </p>
                    </div>
                </div>

                {/* Concierge Details */}
                <div className="container mx-auto px-6 py-16">
                    <div className="grid md:grid-cols-3 gap-8 mb-20">
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-brand-copper/10">
                            <Smartphone className="w-10 h-10 text-brand-copper mb-4" />
                            <h3 className="text-xl font-bold text-brand-oxford mb-2">Direct Access</h3>
                            <p className="text-brand-slate">
                                No call centers. You have the direct mobile number of your dedicated Client Care Partner. Text or call anytime.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-brand-copper/10">
                            <Clock className="w-10 h-10 text-brand-copper mb-4" />
                            <h3 className="text-xl font-bold text-brand-oxford mb-2">Zero Wait Time</h3>
                            <p className="text-brand-slate">
                                Your time is valuable. We minimize triage and get straight to solving the problem with an engineer who knows your system.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-brand-copper/10">
                            <Shield className="w-10 h-10 text-brand-copper mb-4" />
                            <h3 className="text-xl font-bold text-brand-oxford mb-2">Proactive Protection</h3>
                            <p className="text-brand-slate">
                                We don't just fix breaks. We monitor your health 24/7 and patch vulnerabilities before they become issues.
                            </p>
                        </div>
                    </div>

                    {/* Portal Section */}
                    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
                        <div className="md:w-1/2 p-10 flex flex-col justify-center bg-gradient-to-br from-brand-oxford to-brand-oxford-deep text-white">
                            <Lock className="w-12 h-12 text-brand-copper mb-6" />
                            <h2 className="text-3xl font-bold mb-4">Client Portal</h2>
                            <p className="text-gray-300 mb-8">
                                Manage your billing, view compliance reports, and audit your security score in one secure dashboard.
                            </p>
                            <div className="text-sm text-gray-400">
                                <p className="mb-2"><strong>Tip:</strong> Enable 2FA for account access.</p>
                            </div>
                        </div>
                        <div className="md:w-1/2 p-10 flex flex-col justify-center items-center bg-gray-50/50">
                            <div className="w-full max-w-xs text-center">
                                <p className="text-brand-oxford font-semibold mb-6">Existing Client?</p>
                                <Button
                                    onClick={() => setIsPortalOpen(true)}
                                    className="w-full bg-brand-copper hover:bg-brand-copper-dark text-white text-lg py-6 shadow-lg"
                                >
                                    Access Portal
                                </Button>
                                <p className="text-xs text-gray-500 mt-4">
                                    Protected by Bank-Level Encryption
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Portal Login Dialog */}
                <Dialog open={isPortalOpen} onOpenChange={handleClose}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Secure Client Portal</DialogTitle>
                            <DialogDescription>
                                Please enter your master password to access your dashboard.
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleLogin} className="space-y-4 py-4">
                            {loginState === "denied" && (
                                <div className="bg-red-50 text-red-700 p-3 rounded-md flex items-start gap-2 text-sm">
                                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                                    <div>
                                        <span className="font-bold">Access Denied:</span> Authorization failed. Please contact your Client Care Partner directly to verify your identity.
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Input
                                    type="password"
                                    placeholder="Master Password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (loginState === "denied") setLoginState("idle");
                                    }}
                                    className="text-lg"
                                    autoFocus
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <Button type="button" variant="ghost" onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={!password || loginState === "loading"}
                                    className="bg-brand-copper hover:bg-brand-copper-dark min-w-[100px]"
                                >
                                    {loginState === "loading" ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : "Secure Login"}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </Seo>
    );
}
