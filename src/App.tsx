import { useState, useEffect } from "react";
import { Layout } from "./components/Layout";
import { Home } from "./components/views/Home";
import { Pricing } from "./components/views/Pricing";
import { Growth } from "./components/views/Growth";
import { About } from "./components/views/About";

export type View = "home" | "pricing" | "growth" | "about";

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
