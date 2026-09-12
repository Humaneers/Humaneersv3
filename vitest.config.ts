import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    // Mirrors the "@/*" path in tsconfig.json, which Next resolves on its own
    // but vitest does not read.
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    // The repo had no vitest config at all, so vitest fell back to the "node"
    // environment and every test touching sessionStorage — the whole of
    // session.test.ts, zoho.test.ts and verify-zoho-payloads.test.ts — died in
    // beforeEach with "sessionStorage is not defined". jsdom is already a
    // devDependency; nothing was selecting it.
    environment: "jsdom",
  },
});
