import { ZOHO_CONFIG } from "./config";
import { makeResilientZohoRequest, handleResilientZohoResponse } from "./resilientClient";
import { SupportTicket } from "./types";

/**
 * Creates a Ticket in Zoho Desk with circuit breaker protection.
 */
export async function createTicket(data: SupportTicket) {
  if (!ZOHO_CONFIG.deskOrgId) {
    console.warn("Zoho Desk Org ID missing, skipping ticket creation");
    throw new Error("Configuration Error: Missing Desk Org ID");
  }

  // Append Context and Phone to description to ensure agents see it immediately
  const contextPrefix = data.context === "new_client_critical" ? "[NEW CLIENT CRITICAL] " : "";
  const phoneInfo = data.phone ? `\n\nContact Phone: ${data.phone}` : "";
  const fullDescription = `${contextPrefix}${data.description}${phoneInfo}`;

  const deskRecord = {
    subject: `${contextPrefix}${data.subject}`,
    description: fullDescription,
    email: data.email,
    phone: data.phone, // Top level just in case
    contact: {
      lastName: data.contactName,
      phone: data.phone,
      email: data.email,
    },
    priority: data.priority,
    channel: "Web",
    classification: "Request",
    customFields: {
      Source: "Web",
      Context: data.context || "General",
    },
  };

  const response = await makeResilientZohoRequest(
    `${ZOHO_CONFIG.deskBaseUrl}/tickets`,
    {
      method: "POST",
      headers: {
        orgId: ZOHO_CONFIG.deskOrgId,
      },
      body: JSON.stringify(deskRecord),
    },
    "desk"
  );

  return await handleResilientZohoResponse(response, "Create Ticket");
}
