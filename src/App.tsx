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
import { TalkToSales } from "./components/views/TalkToSales";
import { Personal } from "./components/views/Personal";
import { Colophon } from "./components/views/Colophon";
import { TalkToSalesModal } from "./components/TalkToSalesModal";

export type View = "home" | "pricing" | "growth" | "about" | "terms" | "privacy" | "managed-it" | "family-protection" | "fractional-leadership" | "non-profits" | "contact" | "industries" | "services" | "talk-to-sales" | "personal" | "colophon";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("home");
  const [viewData, setViewData] = useState<any>(null);
  
  const [isSalesModalOpen, setIsSalesModalOpen] = useState(false);
  const [salesModalData, setSalesModalData] = useState<any>(null);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const handleViewChange = (view: View, data?: any) => {
    if (view === "talk-to-sales") {
      setSalesModalData(data);
      setIsSalesModalOpen(true);
      return;
    }
    
    setCurrentView(view);
    if (data) {
      setViewData(data);
    } else {
      // Clear data if none provided, unless we want persistence? 
      // Better to clear to avoid stale data
      setViewData(null);
    }
  };

  const renderView = () => {
    switch (currentView) {
      case "home":
        return <Home onViewChange={handleViewChange} />;
      case "pricing":
        return <Pricing onViewChange={handleViewChange} />;
      case "growth":
        return <Growth onViewChange={handleViewChange} />;
      case "about":
        return <About onViewChange={handleViewChange} />;
      case "managed-it":
        return <ManagedIT onViewChange={handleViewChange} />;
      case "family-protection":
        return <FamilyProtection onViewChange={handleViewChange} />;
      case "fractional-leadership":
        return <FractionalLeadership onViewChange={handleViewChange} />;
      case "non-profits":
        return <NonProfits onViewChange={handleViewChange} />;
      case "industries":
        return <Industries onViewChange={handleViewChange} />;
      case "services":
        return <Services onViewChange={handleViewChange} />;
      case "contact":
        return <Contact onViewChange={handleViewChange} />;
      case "talk-to-sales":
        // Fallback in case we reach here somehow, though handleViewChange should prevent it
        return <TalkToSales onViewChange={handleViewChange} initialData={viewData} />;
      case "personal":
        return <Personal onViewChange={handleViewChange} />;
      case "colophon":
        return <Colophon onViewChange={handleViewChange} />;
      case "terms":
        return <Terms onViewChange={handleViewChange} />;
      case "privacy":
        return <Privacy onViewChange={handleViewChange} />;
      default:
        return <Home onViewChange={handleViewChange} />;
    }
  };

  return (
    <div className="font-sans antialiased text-[#4E596F] bg-[#F5F1E9] min-h-screen flex flex-col">
      <Layout currentView={currentView} onViewChange={handleViewChange}>
        {renderView()}
      </Layout>
      <TalkToSalesModal 
        open={isSalesModalOpen} 
        onOpenChange={setIsSalesModalOpen} 
        initialData={salesModalData} 
      />
    </div>
  );
}
