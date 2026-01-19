import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { EyeOff, AlertTriangle, Fingerprint, Search, Lock, History } from "lucide-react";
import { routePaths } from "../../routes";
import { Seo } from "../Seo";

export function CrisisManagement() {
    const navigate = useNavigate();

    return (
        <Seo
            title="Humaneers | Crisis Management & Reputation Defense"
            description="Professional digital scrubbing, SEO suppression, and rapid-response PR for individuals and brands under attack. Discreet and effective."
            canonicalPath="/crisis-management"
        >
            <div className="bg-white">
                {/* Hero */}
                <section className="bg-stone-900 text-white py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80')] opacity-20 bg-cover bg-center mix-blend-overlay"></div>
                    <div className="container mx-auto px-6 relative z-10 text-center">
                        <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
                            Control the Narrative.
                            <br />
                            <span className="text-red-500">Erase the Noise.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-stone-300 font-light leading-relaxed max-w-3xl mx-auto mb-10">
                            When the internet turns against you, we turn it off. Digital scrubbing, search suppression,
                            and counter-narrative strategy for high-profile individuals and brands.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                onClick={() =>
                                    navigate(routePaths.talkToSales, { state: { interest: "Crisis Management" } })
                                }
                                className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6 h-auto rounded-full shadow-lg border-2 border-red-500"
                            >
                                Confidential Consultation
                            </Button>
                        </div>
                        <p className="mt-6 text-xs text-center text-stone-500 uppercase tracking-widest">
                            Non-Disclosure Agreements Standard for All Inquiries
                        </p>
                    </div>
                </section>

                {/* Services */}
                <section className="py-24 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="grid md:grid-cols-2 gap-16">
                            <div>
                                <h2 className="text-3xl font-bold text-brand-oxford mb-6">"It Will Blow Over" is a Lie.</h2>
                                <p className="text-brand-slate text-lg mb-6">
                                    The internet doesn't forget unless you make it. Negative press, mugshots, and doxxing
                                    attacks stick to search results like glue, affecting investors, partners, and family members.
                                </p>
                                <p className="text-brand-slate text-lg">
                                    We don't rely on "requesting removal" nicely. We use technical SEO suppression,
                                    legal takedowns, and asset flooding to bury negatives so deep nobody finds them.
                                </p>
                            </div>
                            <div className="grid gap-6">
                                <div className="flex gap-4 p-4 border rounded-lg bg-stone-50">
                                    <Search className="w-8 h-8 text-stone-600 shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-stone-900">SEO Suppression</h4>
                                        <p className="text-sm text-stone-600">We flood Page 1 of Google with controlled, positive assets to push negative links to Page 3+.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-4 border rounded-lg bg-stone-50">
                                    <EyeOff className="w-8 h-8 text-stone-600 shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-stone-900">Digital Scrubbing</h4>
                                        <p className="text-sm text-stone-600">Removing home addresses, phone numbers, and family details from "people search" broker sites.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-4 border rounded-lg bg-stone-50">
                                    <Lock className="w-8 h-8 text-stone-600 shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-stone-900">Social Media Lockdown</h4>
                                        <p className="text-sm text-stone-600">Securing accounts during a viral event to prevent hacking and "comment swarming".</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Use Cases */}
                <section className="py-24 bg-stone-900 text-stone-200">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-bold text-white mb-12 text-center">Who We Protect</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-stone-800 p-8 rounded-xl border border-stone-700">
                                <AlertTriangle className="w-10 h-10 text-red-500 mb-6" />
                                <h3 className="text-xl font-bold text-white mb-2">Actionable Threats</h3>
                                <p className="text-stone-400">
                                    Executives facing blackmail, active doxxing events, or physical security threats originating online.
                                </p>
                            </div>
                            <div className="bg-stone-800 p-8 rounded-xl border border-stone-700">
                                <History className="w-10 h-10 text-red-500 mb-6" />
                                <h3 className="text-xl font-bold text-white mb-2">Legacy Issues</h3>
                                <p className="text-stone-400">
                                    Founders with old lawsuits, bankruptcy filings, or embarrassing college press that impacts current fundraising.
                                </p>
                            </div>
                            <div className="bg-stone-800 p-8 rounded-xl border border-stone-700">
                                <Fingerprint className="w-10 h-10 text-red-500 mb-6" />
                                <h3 className="text-xl font-bold text-white mb-2">Brand Attacks</h3>
                                <p className="text-stone-400">
                                    Companies facing coordinated "review bombing" or viral disinformation campaigns on social media.
                                </p>
                            </div>
                        </div>
                        <div className="mt-16 text-center">
                            <Button
                                onClick={() => navigate(routePaths.talkToSales, { state: { interest: "Crisis Management" } })}
                                className="bg-white text-stone-900 hover:bg-gray-200 text-lg px-10 py-4 h-auto rounded-full font-bold"
                            >
                                Get Help Now
                            </Button>
                            <p className="mt-4 text-stone-500">Response time typically under 1 hour for urgent requests.</p>
                        </div>
                    </div>
                </section>
            </div>
        </Seo>
    );
}
