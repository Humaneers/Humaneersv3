import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function ObjectionsSection() {
  const [activeObjection, setActiveObjection] = useState(0);

  const objections = [
    {
      id: "it",
      title: "“We already have IT.”",
      answer:
        "We slot in as strategy + escalation, or replace just the gaps. Most MSPs keep the lights on; we help you grow.",
    },
    {
      id: "small",
      title: "“We’re too small for this.”",
      answer:
        "No minimums. You get enterprise-grade support scaled to your team size. We believe small teams deserve safe infrastructure too.",
    },
    {
      id: "ready",
      title: "“We’re not ready.”",
      answer:
        "That’s what we’re here for. We love to help now and can discuss what's next after fixing what's wrong.",
    },
    {
      id: "pain",
      title: "“Switching sounds painful.”",
      answer:
        "We migrate in phases with no downtime and clear handoffs. We handle the awkward breakups with old vendors for you.",
    },
  ];

  return (
    <section className="py-24 bg-brand-cream">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-brand-oxford mb-4">
            Common Objections, Straight Answers
          </h2>
          <p className="text-brand-slate text-lg">
            We hear these a lot. Here’s how Humaneers makes it easy to say yes.
          </p>
        </div>
        <div className="max-w-5xl mx-auto">
          {/* Desktop/Tablet: Split View */}
          <div className="hidden md:grid md:grid-cols-12 gap-8 items-start">
            {/* Left Column: Objections List */}
            <div className="col-span-12 md:col-span-5 space-y-3">
              {objections.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActiveObjection(index)}
                  className={`w-full text-left px-6 py-5 rounded-xl transition-all duration-200 border relative overflow-hidden group ${
                    activeObjection === index
                      ? "bg-brand-oxford border-brand-oxford text-white shadow-lg scale-[1.02]"
                      : "bg-white border-brand-copper/20 text-brand-oxford hover:border-brand-copper hover:bg-brand-cream"
                  }`}
                >
                  <span className="relative z-10 font-bold text-lg">{item.title}</span>
                  {activeObjection === index && (
                    <motion.div
                      layoutId="active-objection-bg"
                      className="absolute inset-0 bg-brand-oxford z-0"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Right Column: The "Straight Answer" */}
            <div className="col-span-12 md:col-span-7 sticky top-24">
              <div className="bg-white rounded-2xl shadow-xl border border-brand-copper/10 p-8 relative overflow-hidden flex flex-col justify-center min-h-[300px]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-copper/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-oxford/5 rounded-full blur-3xl -ml-16 -mb-16"></div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeObjection}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-full bg-brand-copper/10 flex items-center justify-center shrink-0">
                        <Check className="w-6 h-6 text-brand-copper" />
                      </div>
                      <h3 className="text-sm font-bold tracking-wider text-brand-copper uppercase">
                        The Reality
                      </h3>
                    </div>
                    <p className="text-2xl md:text-3xl text-brand-oxford font-medium leading-relaxed">
                      {objections[activeObjection].answer}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Mobile: Stacked Layout */}
          <div className="md:hidden space-y-4">
            {objections.map((item, index) => (
              <div
                key={item.id}
                className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                  activeObjection === index
                    ? "bg-white border-brand-copper shadow-md"
                    : "bg-white border-brand-copper/20"
                }`}
              >
                <button
                  onClick={() => setActiveObjection(activeObjection === index ? -1 : index)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between"
                >
                  <span
                    className={`font-bold text-lg ${
                      activeObjection === index ? "text-brand-oxford" : "text-brand-slate"
                    }`}
                  >
                    {item.title}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                      activeObjection === index
                        ? "bg-brand-copper text-white rotate-180"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <ChevronDown size={16} />
                  </div>
                </button>
                <AnimatePresence>
                  {activeObjection === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-0 border-t border-gray-100 mt-2">
                        <div className="pt-4 flex items-start gap-3">
                          <Check className="w-5 h-5 text-brand-copper shrink-0 mt-1" />
                          <p className="text-brand-oxford text-lg">{item.answer}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
