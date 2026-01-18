import { useState, useEffect, lazy, Suspense } from "react";
import { Layout } from "./components/Layout";
import { Home } from "./components/views/Home";
import { TalkToSalesModal } from "./components/TalkToSalesModal";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Skeleton } from "./components/ui/skeleton";

// Lazy load all non-critical views to improve bundle size
const Pricing = lazy(() => import("./components/views/Pricing").then(m => ({ default: m.Pricing })));
const Growth = lazy(() => import("./components/views/Growth").then(m => ({ default: m.Growth })));
const About = lazy(() => import("./components/views/About").then(m => ({ default: m.About })));
const Terms = lazy(() => import("./components/views/Terms").then(m => ({ default: m.Terms })));
const Privacy = lazy(() => import("./components/views/Privacy").then(m => ({ default: m.Privacy })));
const Contact = lazy(() => import("./components/views/Contact").then(m => ({ default: m.Contact })));
const NonProfits = lazy(() => import("./components/views/NonProfits").then(m => ({ default: m.NonProfits })));
const ManagedIT = lazy(() => import("./components/views/ManagedIT").then(m => ({ default: m.ManagedIT })));
const FamilyProtection = lazy(() => import("./components/views/FamilyProtection").then(m => ({ default: m.FamilyProtection })));
const FractionalLeadership = lazy(() => import("./components/views/FractionalLeadership").then(m => ({ default: m.FractionalLeadership })));
const Industries = lazy(() => import("./components/views/Industries").then(m => ({ default: m.Industries })));
const Services = lazy(() => import("./components/views/Services").then(m => ({ default: m.Services })));
const TalkToSales = lazy(() => import("./components/views/TalkToSales").then(m => ({ default: m.TalkToSales })));
const Personal = lazy(() => import("./components/views/Personal").then(m => ({ default: m.Personal })));
const Colophon = lazy(() => import("./components/views/Colophon").then(m => ({ default: m.Colophon })));
const Ethics = lazy(() => import("./components/views/Ethics").then(m => ({ default: m.Ethics })));
const Resources = lazy(() => import("./components/views/Resources").then(m => ({ default: m.Resources })));
const Support = lazy(() => import("./components/views/Support").then(m => ({ default: m.Support })));
const Status = lazy(() => import("./components/views/Status").then(m => ({ default: m.Status })));

export type View = "home" | "pricing" | "growth" | "about" | "terms" | "privacy" | "managed-it" | "family-protection" | "fractional-leadership" | "non-profits" | "contact" | "industries" | "services" | "talk-to-sales" | "personal" | "colophon" | "ethics" | "resources" | "status" | "support";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("home");
  const [viewData, setViewData] = useState<any>(null);
  
  const [isSalesModalOpen, setIsSalesModalOpen] = useState(false);
  const [salesModalData, setSalesModalData] = useState<any>(null);

  // Suppress external extension errors (Moxie, iFrameSizer)
  useEffect(() => {
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;

    const filterMsg = (args: any[]) => {
      return args.some(arg => 
        typeof arg === 'string' && (
          arg.includes("[iFrameSizer]") || 
          arg.includes("moxie-web-devs-website-form")
        )
      );
    };

    console.log = (...args) => {
      if (!filterMsg(args)) originalLog(...args);
    };
    console.warn = (...args) => {
      if (!filterMsg(args)) originalWarn(...args);
    };
    console.error = (...args) => {
      if (!filterMsg(args)) originalError(...args);
    };

    return () => {
      console.log = originalLog;
      console.warn = originalWarn;
      console.error = originalError;
    };
  }, []);

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
      case "ethics":
        return <Ethics onViewChange={handleViewChange} />;
      case "resources":
        return <Resources onViewChange={handleViewChange} />;
      case "status":
        return <Status onViewChange={handleViewChange} />;
      case "support":
        return <Support onViewChange={handleViewChange} />;
      case "terms":
        return <Terms onViewChange={handleViewChange} />;
      case "privacy":
        return <Privacy onViewChange={handleViewChange} />;
      default:
        return <Home onViewChange={handleViewChange} />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="font-sans antialiased text-[#4E596F] bg-[#F5F1E9] min-h-screen flex flex-col">
        <Layout currentView={currentView} onViewChange={handleViewChange}>
          <ErrorBoundary>
            <Suspense
              fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="max-w-4xl w-full space-y-4 px-6">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-32 w-full" />
                  </div>
                </div>
              }
            >
              {renderView()}
            </Suspense>
          </ErrorBoundary>
        </Layout>
        <TalkToSalesModal
          open={isSalesModalOpen}
          onOpenChange={setIsSalesModalOpen}
          initialData={salesModalData}
        />
      </div>
    </ErrorBoundary>
  );
}
