import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-oxford": "#1B263B",
        "brand-oxford-muted": "#2C3B55",
        "brand-oxford-deep": "#0F1521",
        "brand-copper": "#B87333",
        "brand-copper-dark": "#A0632A",
        "brand-copper-light": "#E5A060",
        "brand-slate": "#4E596F",
        "brand-cream": "#F5F1E9",
        "brand-surface": "#F9FAFB",
        "brand-neutral-200": "#E5E7EB",
      },
    },
  },
  plugins: [],
} satisfies Config;
