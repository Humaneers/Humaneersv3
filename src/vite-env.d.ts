/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CAL_ORG_URL: string;
  readonly VITE_CAL_SALES_FORM_ID: string;
  readonly VITE_CAL_SUPPORT_FORM_ID: string;
  readonly VITE_CAL_NEWSLETTER_FORM_ID: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
