import { ZOHO_CONFIG } from "./config";
import { makeResilientZohoRequest, handleResilientZohoResponse } from "./resilientClient";
import { SalesContact, NewsletterSubscriber } from "./types";

/**
 * Creates a Lead in Zoho CRM with circuit breaker protection.
 */
export async function createLead(data: SalesContact) {
  // Mapping Schema to Zoho CRM Fields
  const zohoRecord = {
    First_Name: data.firstName,
    Last_Name: data.lastName,
    Email: data.email,
    Company: data.company || "Household",
    Phone: data.phone,
    Description: `[Web Inquiry] ${data.description}\n\nContext: ${JSON.stringify(data.utm || {})}`,
    Lead_Source: data.source || "Web Site",
    // Custom Fields for Attribution
    Referrer: data.referrer,
    GCLID: data.utm?.gclid,
  };

  const response = await makeResilientZohoRequest(
    `${ZOHO_CONFIG.apiBaseUrl}/Leads`,
    {
      method: "POST",
      body: JSON.stringify({ data: [zohoRecord] }),
    },
    "crm"
  );

  return await handleResilientZohoResponse(response, "Create Lead");
}

/**
 * Creates a Marketing Contact (Lead) strictly for Newsletter with circuit breaker protection.
 */
export async function createMarketingContact(data: NewsletterSubscriber) {
  const zohoRecord = {
    Last_Name: "Subscriber", // Placeholder if name not collected
    Email: data.email,
    Lead_Source: "Newsletter",
    Description: `Newsletter subscription from ${data.source || "Website"}`,
    Company: "Newsletter Subscriber",
  };

  const response = await makeResilientZohoRequest(
    `${ZOHO_CONFIG.apiBaseUrl}/Leads`,
    {
      method: "POST",
      body: JSON.stringify({ data: [zohoRecord] }),
    },
    "crm"
  );

  return await handleResilientZohoResponse(response, "Newsletter Sub");
}
