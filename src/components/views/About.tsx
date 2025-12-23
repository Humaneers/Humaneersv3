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
          <h1 className="text-5xl font-bold mb-6">The Humaneers Story</h1>
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
                  src="https://images.unsplash.com/photo-1660074127797-1c429fbb8cd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdCUyMHdhcm0lMjBsaWdodGluZ3xlbnwxfHx8fDE3NjY0NDg3Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080"
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
                  src="https://images.unsplash.com/photo-1600361789998-a31af83ce19b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0JTIwd2FybSUyMGxpZ2h0aW5nfGVufDF8fHx8MTc2NjQ0ODcyOXww&ixlib=rb-4.1.0&q=80&w=1080"
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
        </div>
      </section>

      {/* Local Map Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
           <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                  <h2 className="text-3xl font-bold text-[#1B263B] mb-6">We Travel Where You Are</h2>
                  <p className="text-[#4E596F] mb-6">
                      Based in the heart of Tempe, we serve the entire Phoenix metropolitan corridor. From Scottsdale to Chandler, we believe in face-to-face support.
                  </p>
                  <ul className="space-y-3 mb-8">
                      <li className="flex items-center gap-3 text-[#1B263B]">
                          <span className="w-2 h-2 bg-[#B87333] rounded-full"></span> On-site Integration
                      </li>
                      <li className="flex items-center gap-3 text-[#1B263B]">
                          <span className="w-2 h-2 bg-[#B87333] rounded-full"></span> In-person Education Workshops
                      </li>
                      <li className="flex items-center gap-3 text-[#1B263B]">
                          <span className="w-2 h-2 bg-[#B87333] rounded-full"></span> Rapid Response Support
                      </li>
                  </ul>
                  <Button className="bg-[#1B263B] text-white">
                      Check Our Availability
                  </Button>
              </div>
              <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-[#F5F1E9] bg-gray-100 aspect-square">
                 {/* Stylized Map Placeholder */}
                 <div className="absolute inset-0 bg-[#e5e5e5] opacity-50"></div>
                 {/* This would ideally be a custom SVG map or Google Maps integration */}
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full p-8">
                        {/* Abstract map representation */}
                        <svg viewBox="0 0 400 400" className="w-full h-full">
                            <path d="M50 200 Q 150 50 350 150 T 350 300" stroke="#B87333" strokeWidth="4" fill="none" strokeDasharray="10 5" />
                            <circle cx="200" cy="200" r="10" fill="#1B263B" />
                            <text x="220" y="205" fill="#1B263B" fontWeight="bold" fontSize="16">Tempe HQ</text>
                            
                            <circle cx="150" cy="150" r="6" fill="#4E596F" opacity="0.6" />
                            <text x="100" y="150" fill="#4E596F" fontSize="12">Phoenix</text>
                            
                            <circle cx="280" cy="250" r="6" fill="#4E596F" opacity="0.6" />
                            <text x="290" y="250" fill="#4E596F" fontSize="12">Chandler</text>
                            
                            <circle cx="250" cy="120" r="6" fill="#4E596F" opacity="0.6" />
                            <text x="260" y="120" fill="#4E596F" fontSize="12">Scottsdale</text>
                        </svg>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="w-32 h-32 bg-[#B87333]/20 rounded-full animate-ping"></div>
                        </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
