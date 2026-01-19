/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ZOHO_ORG_ID: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
