import { useState, useEffect } from "react";
import { Layout } from "./components/Layout";
import { Home } from "./components/views/Home";
import { Pricing } from "./components/views/Pricing";
import { Growth } from "./components/views/Growth";
import { About } from "./components/views/About";

import { Terms } from "./components/views/Terms";
import { Privacy } from "./components/views/Privacy";

import { Contact } from "./components/views/Contact";
import { NonProfits } from "./components/views/NonProfits";
import { ManagedIT } from "./components/views/ManagedIT";
import { FamilyProtection } from "./components/views/FamilyProtection";
import { FractionalLeadership } from "./components/views/FractionalLeadership";
import { Industries } from "./components/views/Industries";
import { Services } from "./components/views/Services";

export type View = "home" | "pricing" | "growth" | "about" | "terms" | "privacy" | "managed-it" | "family-protection" | "fractional-leadership" | "non-profits" | "contact" | "industries" | "services";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("home");

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const renderView = () => {
    switch (currentView) {
      case "home":
        return <Home onViewChange={setCurrentView} />;
      case "pricing":
        return <Pricing onViewChange={setCurrentView} />;
      case "growth":
        return <Growth onViewChange={setCurrentView} />;
      case "about":
        return <About onViewChange={setCurrentView} />;
      case "managed-it":
        return <ManagedIT onViewChange={setCurrentView} />;
      case "family-protection":
        return <FamilyProtection onViewChange={setCurrentView} />;
      case "fractional-leadership":
        return <FractionalLeadership onViewChange={setCurrentView} />;
      case "non-profits":
        return <NonProfits onViewChange={setCurrentView} />;
      case "industries":
        return <Industries onViewChange={setCurrentView} />;
      case "services":
        return <Services onViewChange={setCurrentView} />;
      case "contact":
        return <Contact onViewChange={setCurrentView} />;
      case "terms":
        return <Terms onViewChange={setCurrentView} />;
      case "privacy":
        return <Privacy onViewChange={setCurrentView} />;
      default:
        return <Home onViewChange={setCurrentView} />;
    }
  };

  return (
    <div className="font-sans antialiased text-[#4E596F] bg-[#F5F1E9] min-h-screen flex flex-col">
      <Layout currentView={currentView} onViewChange={setCurrentView}>
        {renderView()}
      </Layout>
    </div>
  );
}
