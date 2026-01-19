# Humaneers Website

> **Enterprise strategy for businesses and families. Built with precision, delivered with soul.**

The official website for Humaneers, built with modern web technologies to deliver a "Modern Craftsman" digital experience.

## AI Directives

**For all AI agents working on this codebase:**

1.  **Reference this README first.** This file is the mandatory entry point for every session.
2.  **Comply with `webSpecs.md`.** It is the single source of truth for design, code standards, and brand voice.
3.  **Resolve Conflicts.** If you encounter conflicting instructions between files or user prompts, **FAIL SAFE** and ask the user for clarification. Do not guess.
4.  **Writing Style.**
    -   **No Hyphens or Dashes.** Do not use dashes or hyphens in text or copy. Use commas, periods, or other literary devices to connect thoughts.
    -   **Human Tone.** Write like a marketing professional, not a robot. Warm, specific, and professional.
    -   **No Emojis.** Do not use emojis in official documentation or technical files. Use them sparingly in marketing copy only if explicitly requested.
5.  **Maintain Documentation.** It is imperative that reference documents (`webSpecs.md`, `README.md`, etc) are kept up to date with every change. This is not optional. If code changes, documentation must change immediately.

## Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Architecture**: [Radix UI](https://www.radix-ui.com/) + Shadcn/UI patterns
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Forms/CRM**: [Zoho CRM](https://www.zoho.com/crm/) + Zoho Forms
- **Analytics**: Zoho PageSense + SalesIQ, Contentsquare, Datadog RUM
- **Deployment**: [Vercel](https://vercel.com/)
- **Infrastructure**: AWS (S3, EC2), CloudFlare DNS, Plesk
- **Payments**: [Stripe](https://stripe.com/)
- **Communication**: [Slack](https://slack.com/)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

### Build

Build for production:
```bash
npm run build
```

The output will be in the `dist` directory.

### Testing & Quality Checks

**1. Automated Quality Check** (Linting, Formatting, Typecheck):
```bash
npm run check
```

**2. Unit Tests** (Vitest):
```bash
# Run in watch mode
npm run test

# Run once (CI/Pre-commit)
npm run test:run
```

**3. Production Build Verification**:
```bash
npm run build
```

**4. Pre-Release Scrutiny (Deep Clean)**:
Before any public release, perform the following manual checks:
- Scan for `TODO`, `FIXME`, or placeholder text.
- Verify `package.json` metadata (version, private status).
- Verify absence of prohibited terms (e.g., "Computer Repair").
- Verify SEO assets (`sitemap.xml`, `robots.txt`).


## Configuration

Copy `.env.example` to `.env.local` and configure your environment variables:

```bash
cp .env.example .env.local
```

### Required Variables

| Variable | Description |
|----------|-------------|
| `VITE_ZOHO_FORMS_BASE_URL` | Zoho Forms API endpoint |
| `VITE_ZOHO_CRM_ACCESS_TOKEN` | Zoho CRM API access token |

## Design System

This project follows the **Modern Craftsman** design aesthetic:
- **Colors**: Oxford Blue (`#1B263B`), Copper (`#B87333`), Cream (`#F5F1E9`)
- **Typography**: System sans-serif stack for clarity and performance
- **Principles**: Clarity over cleverness, warmth in professionalism

See `webSpecs.md` for all design guidelines, technical patterns, and the single source of truth for AI agents.

**AI Usage Policy**: Humaneers follows a "Human-first, AI-second" approach. Details in our [Colophon](https://humaneers.dev/colophon).

## Project Structure

```
src/
├── components/
│   ├── ui/          # Reusable UI components (buttons, inputs, etc.)
│   ├── views/       # Page components (Home, Services, etc.)
│   └── Layout.tsx   # Main application shell
├── lib/
│   ├── zoho.ts      # Zoho CRM/Forms integration
│   └── utils.ts     # Helper functions
├── guidelines/      # Project documentation
└── styles/
    └── globals.css  # Global styles and Tailwind directives
```

## Deployment

This project is optimized for deployment on **Vercel**.

1. Connect your repository to Vercel
2. Configure the Environment Variables in the project settings
3. Deploy

## License

Copyright © 2026 Humaneers. All rights reserved.