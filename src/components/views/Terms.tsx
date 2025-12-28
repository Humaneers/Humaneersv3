import { useEffect } from "react";
import { View } from "../../App";

interface TermsProps {
  onViewChange: (view: View) => void;
}

export function Terms({ onViewChange }: TermsProps) {
  useEffect(() => {
    document.title = "Humaneers | Terms of Service";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white py-24 min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-bold text-[#1B263B] mb-8">Terms of Service</h1>
        <div className="prose prose-lg text-[#4E596F]">
          <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold text-[#1B263B] mt-8 mb-4">1. Agreement to Terms</h2>
          <p>By accessing our website, you agree to be bound by these Terms of Service and to comply with all applicable laws and regulations. If you do not agree with these terms, you are prohibited from using or accessing this site.</p>
          
          <h2 className="text-2xl font-bold text-[#1B263B] mt-8 mb-4">2. Use License</h2>
          <p>Permission is granted to temporarily download one copy of the materials (information or software) on Humaneers' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>modify or copy the materials;</li>
            <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
            <li>attempt to decompile or reverse engineer any software contained on Humaneers' website;</li>
            <li>remove any copyright or other proprietary notations from the materials; or</li>
            <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#1B263B] mt-8 mb-4">3. Disclaimer</h2>
          <p>The materials on Humaneers' website are provided on an 'as is' basis. Humaneers makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

          <h2 className="text-2xl font-bold text-[#1B263B] mt-8 mb-4">4. Limitations</h2>
          <p>In no event shall Humaneers or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Humaneers' website.</p>

          <h2 className="text-2xl font-bold text-[#1B263B] mt-8 mb-4">5. Governing Law</h2>
          <p>These terms and conditions are governed by and construed in accordance with the laws of Arizona and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
        </div>
      </div>
    </div>
  );
}
