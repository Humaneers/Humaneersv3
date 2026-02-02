export const ZOHO_CONFIG = {
  authBaseUrl: "https://accounts.zoho.com",
  apiBaseUrl: "https://www.zohoapis.com/crm/v2",
  deskBaseUrl: "https://desk.zoho.com/api/v1",
  clientId: process.env.ZOHO_CLIENT_ID,
  clientSecret: process.env.ZOHO_CLIENT_SECRET,
  refreshToken: process.env.ZOHO_REFRESH_TOKEN,
  // Hardcoded for now, but should ideally be env var if multi-tenant
  deskOrgId: process.env.ZOHO_DESK_ORG_ID,
};
