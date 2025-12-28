import { useEffect } from "react";
import { View } from "../../App";
import { Button } from "../ui/button";
import { MapPin } from "lucide-react";

interface AboutProps {
  onViewChange: (view: View) => void;
}

export function About({ onViewChange }: AboutProps) {
  useEffect(() => {
    document.title = "Humaneers | About Us | Enterprise Strategy, Small Business Soul";
  }, []);

  return (
    <div className="bg-[#F5F1E9]">
      {/* Header */}
      <section className="bg-[#1B263B] text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#B87333]/10 skew-x-12 transform translate-x-20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-5xl font-bold mb-4">The Humaneers Story</h1>
          <div className="text-2xl text-[#B87333] mb-8 font-mono">
            <span className="font-bold text-white">Humaneers</span> = Human + Engineers
          </div>
          <p className="text-xl max-w-2xl text-gray-300 font-light">
            Bringing big-firm discipline to the businesses that build our community.
          </p>
        </div>
      </section>

      {/* Profiles */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Marcus */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-48 aspect-[3/4] shrink-0 rounded-lg overflow-hidden shadow-lg bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1738566061505-556830f8b8f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhc2lhbiUyMG1hbiUyMHBvcnRyYWl0JTIwY29ycG9yYXRlfGVufDF8fHx8MTc2Njk1MTQwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Marcus Chen"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#1B263B]">Marcus Chen</h3>
                <p className="text-[#B87333] font-medium mb-4">Co-Founder & Chief Technologist</p>
                <p className="text-[#4E596F] text-sm leading-relaxed mb-4">
                  Former Accenture Strategy Consultant. Marcus spent a decade designing infrastructure for Fortune 100 banks before realizing his true passion was helping local businesses scale. He brings enterprise-grade security rigor to every small business audit.
                </p>
                <p className="text-sm italic text-gray-500">
                  "I wanted to build something where I could see the faces of the people I was helping."
                </p>
              </div>
            </div>

            {/* Priya */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-48 aspect-[3/4] shrink-0 rounded-lg overflow-hidden shadow-lg bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1735845929510-48e0ecdb53d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBpbmRpYW4lMjB3b21hbiUyMHBvcnRyYWl0JTIwYnVzaW5lc3N8ZW58MXx8fHwxNzY2OTUxNDAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Priya Sharma"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#1B263B]">Priya Sharma</h3>
                <p className="text-[#B87333] font-medium mb-4">Co-Founder & Brand Strategy</p>
                <p className="text-[#4E596F] text-sm leading-relaxed mb-4">
                  Deloitte Digital Alum. Priya specializes in "Americanization"—taking products and brands and refining them for the US market. She has led product launches that have landed on the shelves of Target and Whole Foods.
                </p>
                <p className="text-sm italic text-gray-500">
                  "Great technology needs a great story. We provide both under one roof."
                </p>
              </div>
            </div>
          </div>

          {/* Additional Team Members (No Photos) */}
          <div className="mt-20 border-t border-gray-200 pt-16">
             <h3 className="text-2xl font-bold text-[#1B263B] mb-10 text-center">The Extended Team</h3>
             <div className="grid md:grid-cols-3 gap-10">
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#B87333]">
                   <h4 className="text-xl font-bold text-[#1B263B]">Sarah Jenkins</h4>
                   <p className="text-[#B87333] text-sm font-medium mb-3 uppercase tracking-wide">Senior Network Engineer</p>
                   <p className="text-[#4E596F] text-sm">
                      The architect behind our nationwide mesh networks. Sarah ensures your Wi-Fi passes through concrete walls like they aren't even there.
                   </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#B87333]">
                   <h4 className="text-xl font-bold text-[#1B263B]">David Okafor</h4>
                   <p className="text-[#B87333] text-sm font-medium mb-3 uppercase tracking-wide">Compliance Specialist</p>
                   <p className="text-[#4E596F] text-sm">
                      David eats SOC 2 audits for breakfast. He translates complex regulatory requirements into checklists your team can actually understand.
                   </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#B87333]">
                   <h4 className="text-xl font-bold text-[#1B263B]">Elena Rodriguez</h4>
                   <p className="text-[#B87333] text-sm font-medium mb-3 uppercase tracking-wide">Client Success Manager</p>
                   <p className="text-[#4E596F] text-sm">
                      Your dedicated advocate. Elena ensures that "human" remains the biggest part of Humaneers, managing onboarding and quarterly reviews.
                   </p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Local Map Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
           <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                  <h2 className="text-3xl font-bold text-[#1B263B] mb-6">We Travel Where You Are</h2>
                  <p className="text-[#4E596F] mb-6">
                      Based in the heart of Tempe, we serve clients across the entire United States. While we love our local face-to-face sessions in Arizona, our remote infrastructure allows us to support teams from New York to California.
                  </p>
                  <ul className="space-y-3 mb-8">
                      <li className="flex items-center gap-3 text-[#1B263B]">
                          <span className="w-2 h-2 bg-[#B87333] rounded-full"></span> On-site & Remote Integration
                      </li>
                      <li className="flex items-center gap-3 text-[#1B263B]">
                          <span className="w-2 h-2 bg-[#B87333] rounded-full"></span> Digital & In-person Workshops
                      </li>
                      <li className="flex items-center gap-3 text-[#1B263B]">
                          <span className="w-2 h-2 bg-[#B87333] rounded-full"></span> Nationwide Rapid Response
                      </li>
                  </ul>
                  <Button 
                    onClick={() => onViewChange("contact")}
                    className="bg-[#1B263B] text-white"
                  >
                      Check Our Availability
                  </Button>
              </div>
              <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-[#F5F1E9] bg-gray-100 aspect-square">
                 {/* Stylized Map Placeholder */}
                 <div className="absolute inset-0 bg-[#e5e5e5] opacity-50"></div>
                 {/* This would ideally be a custom SVG map or Google Maps integration */}
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full p-8">
                        {/* US Map representation */}
                        <svg viewBox="0 0 800 500" className="w-full h-full">
                            <path 
                              d="M750,150 L780,200 L760,250 L780,300 L750,400 L650,450 L550,420 L450,450 L350,420 L250,400 L150,350 L100,300 L50,200 L100,100 L200,50 L300,50 L400,80 L500,50 L600,80 L700,100 Z" 
                              fill="none" 
                              stroke="#B87333" 
                              strokeWidth="2"
                              className="opacity-20"
                            />
                            {/* Accurate-ish stylized US silhouette */}
                            <path 
                              d="M126.5,88.5 L252.5,59.5 L347.5,66.5 L428.5,88.5 L464.5,66.5 L559.5,88.5 L607.5,59.5 L669.5,43.5 L731.5,88.5 L713.5,142.5 L695.5,178.5 L743.5,238.5 L743.5,310.5 L707.5,340.5 L677.5,340.5 L629.5,382.5 L569.5,382.5 L539.5,430.5 L491.5,412.5 L449.5,430.5 L401.5,382.5 L365.5,400.5 L329.5,382.5 L293.5,382.5 L245.5,340.5 L185.5,340.5 L137.5,310.5 L89.5,256.5 L89.5,178.5 L65.5,130.5 L126.5,88.5 Z"
                              fill="#FFFFFF"
                              stroke="#B87333"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            
                            {/* Tempe HQ */}
                            <g transform="translate(180, 280)">
                               <circle r="8" fill="#B87333" className="animate-pulse" />
                               <circle r="4" fill="#1B263B" />
                               <text x="15" y="5" fill="#1B263B" fontWeight="bold" fontSize="20" fontFamily="sans-serif">Tempe HQ</text>
                            </g>

                            {/* Remote Clients / Nodes */}
                            <circle cx="650" cy="150" r="4" fill="#4E596F" opacity="0.6" />
                            <circle cx="680" cy="250" r="4" fill="#4E596F" opacity="0.6" />
                            <circle cx="450" cy="180" r="4" fill="#4E596F" opacity="0.6" />
                            <circle cx="350" cy="120" r="4" fill="#4E596F" opacity="0.6" />
                            <circle cx="100" cy="180" r="4" fill="#4E596F" opacity="0.6" />
                            <circle cx="120" cy="280" r="4" fill="#4E596F" opacity="0.6" />
                        </svg>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
