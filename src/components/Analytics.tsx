"use strict";
"use client";

import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

export function Analytics() {
  return (
    <>
      <VercelAnalytics />
      <SpeedInsights />

      {/* Zoho SalesIQ */}
      <Script
        id="zoho-salesiq-init"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.$zoho = window.$zoho || {};
            $zoho.salesiq = $zoho.salesiq || { ready: function () { } };
          `,
        }}
      />
      <Script
        id="zoho-salesiq-widget"
        src="https://salesiq.zohopublic.com/widget?wc=siq5af82cc1e8970552a081c3ee50f7191d30ebfca6797a53e74bd40b6d10c3dbee"
        strategy="lazyOnload"
      />

      {/* Zoho PageSense */}
      <Script
        id="zoho-pagesense"
        src="https://cdn.pagesense.io/js/911811328/0172b61c43a2473c98eef23da6d865af.js"
        strategy="lazyOnload"
      />

      {/* ContentSquare */}
      <Script
        id="contentsquare"
        src="https://t.contentsquare.net/uxa/741b931013a01.js"
        strategy="lazyOnload"
      />
    </>
  );
}
