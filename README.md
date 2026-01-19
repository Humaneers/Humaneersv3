# Humaneers Website

> **Enterprise Strategy. Small Business Soul.**

The official website for Humaneers, built with modern web technologies to deliver a "Modern Craftsman" digital experience.

## 🛠 Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Architecture**: [Radix UI](https://www.radix-ui.com/) + Shadcn/UI patterns
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Forms/CRM**: [Zoho CRM](https://www.zoho.com/crm/) + Zoho Forms
- **Analytics**: Zoho PageSense + SalesIQ
- **Deployment**: [Vercel](https://vercel.com/)

## 🚀 Getting Started

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

## ⚙️ Configuration

Copy `.env.example` to `.env.local` and configure your environment variables:

```bash
cp .env.example .env.local
```

### Required Variables

| Variable | Description |
|----------|-------------|
| `VITE_ZOHO_FORMS_BASE_URL` | Zoho Forms API endpoint |
| `VITE_ZOHO_CRM_ACCESS_TOKEN` | Zoho CRM API access token |

## 🎨 Design System

This project follows the **Modern Craftsman** design aesthetic:
- **Colors**: Oxford Blue (`#1B263B`), Copper (`#B87333`), Cream (`#F5F1E9`)
- **Typography**: System sans-serif stack for clarity and performance
- **Principles**: Clarity over cleverness, warmth in professionalism

See `webSpecs.md` for all design guidelines, technical patterns, and the single source of truth for AI agents.

**AI Usage Policy**: Humaneers follows a "Human-first, AI-second" approach. Details in our [Colophon](https://humaneers.dev/colophon).

## 📦 Project Structure

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

## 🚢 Deployment

This project is optimized for deployment on **Vercel**.

1. Connect your repository to Vercel
2. Configure the Environment Variables in the project settings
3. Deploy

## 📄 License

Copyright © 2026 Humaneers. All rights reserved.