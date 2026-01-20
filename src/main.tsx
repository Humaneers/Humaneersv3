import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Toaster } from "sonner";
import { datadogRum } from "@datadog/browser-rum";
import "./index.css";

// Defer Datadog RUM initialization to improve initial load performance
window.addEventListener("load", () => {
  datadogRum.init({
    applicationId: "e9039ed1-0281-473b-9e64-064ce583a8b4",
    clientToken: "pub3a1310d33550081918c4dba380397d6d",
    site: "us5.datadoghq.com",
    service: "humaneersweb",
    env: "prod",
    sessionSampleRate: 100,
    sessionReplaySampleRate: 100,
    trackBfcacheViews: true,
    defaultPrivacyLevel: "allow",
  });
});

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
    <Toaster position="top-right" richColors />
  </ErrorBoundary>
);
