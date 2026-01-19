import { lazy, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
// import { SpeedInsights } from "@vercel/speed-insights/react";
import { Layout } from "./components/Layout";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Seo } from "./components/Seo";
import { ScrollToTop } from "./components/ScrollToTop";
import { routePaths } from "./routes";
import { Home } from "./components/views/Home";
import { NotFound } from "./components/views/NotFound";
import { initSession, trackPageView } from "./lib/session";

const Pricing = lazy(() =>
  import("./components/views/Pricing").then((m) => ({ default: m.Pricing }))
);
// New Products
const SeniorCare = lazy(() =>
  import("./components/views/SeniorCare").then((m) => ({ default: m.SeniorCare }))
);
const CrisisManagement = lazy(() =>
  import("./components/views/CrisisManagement").then((m) => ({ default: m.CrisisManagement }))
);

const Growth = lazy(() => import("./components/views/Growth").then((m) => ({ default: m.Growth })));
const About = lazy(() => import("./components/views/About").then((m) => ({ default: m.About })));
const Terms = lazy(() => import("./components/views/Terms").then((m) => ({ default: m.Terms })));
const Privacy = lazy(() =>
  import("./components/views/Privacy").then((m) => ({ default: m.Privacy }))
);
const Contact = lazy(() =>
  import("./components/views/Contact").then((m) => ({ default: m.Contact }))
);
const NonProfits = lazy(() =>
  import("./components/views/NonProfits").then((m) => ({ default: m.NonProfits }))
);
const ManagedIT = lazy(() =>
  import("./components/views/ManagedIT").then((m) => ({ default: m.ManagedIT }))
);
const FamilyProtection = lazy(() =>
  import("./components/views/FamilyProtection").then((m) => ({ default: m.FamilyProtection }))
);
const FractionalLeadership = lazy(() =>
  import("./components/views/FractionalLeadership").then((m) => ({
    default: m.FractionalLeadership,
  }))
);
const Industries = lazy(() =>
  import("./components/views/Industries").then((m) => ({ default: m.Industries }))
);
const Services = lazy(() =>
  import("./components/views/Services").then((m) => ({ default: m.Services }))
);
const TalkToSales = lazy(() =>
  import("./components/views/TalkToSales").then((m) => ({ default: m.TalkToSales }))
);
const Personal = lazy(() =>
  import("./components/views/Personal").then((m) => ({ default: m.Personal }))
);
const Estate = lazy(() => import("./components/views/Estate").then((m) => ({ default: m.Estate })));
const ThankYou = lazy(() =>
  import("./components/views/ThankYou").then((m) => ({ default: m.ThankYou }))
);
const Colophon = lazy(() =>
  import("./components/views/Colophon").then((m) => ({ default: m.Colophon }))
);
const Ethics = lazy(() => import("./components/views/Ethics").then((m) => ({ default: m.Ethics })));
const Resources = lazy(() =>
  import("./components/views/Resources").then((m) => ({ default: m.Resources }))
);
const Support = lazy(() =>
  import("./components/views/Support").then((m) => ({ default: m.Support }))
);
const ClientCare = lazy(() =>
  import("./components/views/ClientCare").then((m) => ({ default: m.ClientCare }))
);
// Changelog hidden from public
// const Changelog = lazy(() =>
//   import("./components/views/Changelog").then((m) => ({ default: m.Changelog }))
// );
const Status = lazy(() => import("./components/views/Status").then((m) => ({ default: m.Status })));

import { TooltipProvider } from "./components/ui/tooltip";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    initSession();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return (
    <ErrorBoundary>
      <TooltipProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path={routePaths.home}
              element={
                <Seo
                  title="Humaneers | Enterprise Strategy. Built with Precision."
                  canonicalPath={routePaths.home}
                >
                  <Home />
                </Seo>
              }
            />
            {/* ... other routes ... */}
            <Route
              path={routePaths.pricing}
              element={
                <Seo
                  title="Humaneers | Pricing"
                  description="Transparent pricing for businesses and families. Managed IT from $90/user, Family Protection from $25/mo. SOC 2 Type II compliant."
                  canonicalPath={routePaths.pricing}
                >
                  <Pricing />
                </Seo>
              }
            />
            <Route
              path={routePaths.growth}
              element={
                <Seo
                  title="Humaneers | Brand Growth"
                  description="Brand strategy and marketing leadership for fast-growing teams."
                  canonicalPath={routePaths.growth}
                >
                  <Growth />
                </Seo>
              }
            />
            <Route
              path={routePaths.about}
              element={
                <Seo
                  title="Humaneers | About"
                  description="Built by engineers for businesses and families. SOC 2 certified. Tempe-based, serving clients nationwide."
                  canonicalPath={routePaths.about}
                >
                  <About />
                </Seo>
              }
            />
            <Route
              path={routePaths.managedIt}
              element={
                <Seo
                  title="Humaneers | Managed IT"
                  description="99.9% uptime SLA. Cloud-native infrastructure, 24/7 monitoring, 15-minute P1 response. No downtime, just uptime."
                  canonicalPath={routePaths.managedIt}
                >
                  <ManagedIT />
                </Seo>
              }
            />
            <Route
              path={routePaths.familyProtection}
              element={
                <Seo
                  title="Humaneers | Family Protection"
                  description="Close the home-office security gap. Enterprise cybersecurity for your family, your home network, and your peace of mind."
                  canonicalPath={routePaths.familyProtection}
                >
                  <FamilyProtection />
                </Seo>
              }
            />
            <Route
              path={routePaths.fractionalLeadership}
              element={
                <Seo
                  title="Humaneers | Fractional Leadership"
                  description="Your own CIO/CMO without the salary cap. Strategic planning, vendor management, and executive guidance."
                  canonicalPath={routePaths.fractionalLeadership}
                >
                  <FractionalLeadership />
                </Seo>
              }
            />
            <Route
              path={routePaths.nonProfits}
              element={
                <Seo
                  title="Humaneers | Nonprofits"
                  description="Mission-focused IT for 501(c)(3) organizations. Special pricing, grant-ready documentation, volunteer-friendly systems."
                  canonicalPath={routePaths.nonProfits}
                >
                  <NonProfits />
                </Seo>
              }
            />
            <Route
              path={routePaths.industries}
              element={
                <Seo
                  title="Humaneers | Regulated Industries"
                  description="HIPAA, PCI DSS, and SOX compliance built-in. BAAs available. Purpose-built for healthcare and finance."
                  canonicalPath={routePaths.industries}
                >
                  <Industries />
                </Seo>
              }
            />
            <Route
              path={routePaths.services}
              element={
                <Seo
                  title="Humaneers | Services"
                  description="Managed IT, brand growth, family protection, and fractional leadership. Enterprise strategy, small business soul."
                  canonicalPath={routePaths.services}
                >
                  <Services />
                </Seo>
              }
            />
            <Route
              path={routePaths.contact}
              element={
                <Seo
                  title="Humaneers | Contact"
                  description="Contact Humaneers for sales, support, or partnership inquiries."
                  canonicalPath={routePaths.contact}
                >
                  <Contact />
                </Seo>
              }
            />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route
              path={routePaths.talkToSales}
              element={
                <Seo
                  title="Humaneers | Start a Conversation"
                  description="Tell us about your goals and we'll design a custom roadmap. For businesses, families, and individuals."
                  canonicalPath={routePaths.talkToSales}
                >
                  <TalkToSales />
                </Seo>
              }
            />
            <Route
              path={routePaths.personal}
              element={
                <Seo
                  title="Humaneers | Personal Plans"
                  description="Home network security, device management, and family tech support. Protect what matters most."
                  canonicalPath={routePaths.personal}
                >
                  <Personal />
                </Seo>
              }
            />
            <Route
              path={routePaths.estate}
              element={
                <Seo
                  title="Humaneers | Private Client & Estate IT"
                  description="Digital concierge service for high net worth individuals and smart homes. Enterprise network management and white-glove support."
                  canonicalPath={routePaths.estate}
                >
                  <Estate />
                </Seo>
              }
            />
            <Route
              path={routePaths.seniorCare}
              element={
                <Seo
                  title="Humaneers | Senior Care"
                  description="Respectful, secure technology support for seniors. Fraud protection and simplified setup."
                  canonicalPath={routePaths.seniorCare}
                >
                  <SeniorCare />
                </Seo>
              }
            />
            <Route
              path={routePaths.crisisManagement}
              element={
                <Seo
                  title="Humaneers | Crisis Management"
                  description="Digital scrubbing and reputation defense for individuals and brands."
                  canonicalPath={routePaths.crisisManagement}
                >
                  <CrisisManagement />
                </Seo>
              }
            />
            <Route
              path={routePaths.colophon}
              element={
                <Seo
                  title="Humaneers | Colophon"
                  description="Transparency, ethics, and the tools that power Humaneers."
                  canonicalPath={routePaths.colophon}
                >
                  <Colophon />
                </Seo>
              }
            />
            <Route
              path={routePaths.ethics}
              element={
                <Seo
                  title="Humaneers | Ethics Charter"
                  description="Our code of conduct, anti-corruption policy, and reporting."
                  canonicalPath={routePaths.ethics}
                >
                  <Ethics />
                </Seo>
              }
            />
            <Route
              path={routePaths.resources}
              element={
                <Seo
                  title="Humaneers | Resources"
                  description="Guides, security explainers, and operational documentation."
                  canonicalPath={routePaths.resources}
                >
                  <Resources />
                </Seo>
              }
            />
            <Route
              path={routePaths.status}
              element={
                <Seo
                  title="Humaneers | Status"
                  description="Service status and operational updates."
                  canonicalPath={routePaths.status}
                >
                  <Status />
                </Seo>
              }
            />
            <Route
              path={routePaths.clientCare}
              element={
                <Seo
                  title="Humaneers | Client Care"
                  description="Concierge support and client portal access."
                  canonicalPath={routePaths.clientCare}
                >
                  <ClientCare />
                </Seo>
              }
            />
            {/* Changelog hidden from public */}
            {/* <Route
              path={routePaths.changelog}
              element={
                <Seo
                  title="Humaneers | Changelog"
                  description="Platform updates and version history."
                  canonicalPath={routePaths.changelog}
                >
                  <Changelog />
                </Seo>
              }
            /> */}
            <Route
              path={routePaths.support}
              element={
                <Seo
                  title="Humaneers | Support"
                  description="Get help with Humaneers services and support requests."
                  canonicalPath={routePaths.support}
                >
                  <Support />
                </Seo>
              }
            />
            <Route
              path={routePaths.terms}
              element={
                <Seo
                  title="Humaneers | Terms of Service"
                  description="Terms of service for Humaneers."
                  canonicalPath={routePaths.terms}
                >
                  <Terms />
                </Seo>
              }
            />
            <Route
              path={routePaths.privacy}
              element={
                <Seo
                  title="Humaneers | Privacy Policy"
                  description="Privacy policy for Humaneers."
                  canonicalPath={routePaths.privacy}
                >
                  <Privacy />
                </Seo>
              }
            />
            <Route
              path="*"
              element={
                <Seo title="Humaneers | Page Not Found" noIndex>
                  <NotFound />
                </Seo>
              }
            />
          </Route>
        </Routes>
        <ScrollToTop />
        <Analytics />
        {/* <SpeedInsights /> */}
      </TooltipProvider>
    </ErrorBoundary>
  );
}
