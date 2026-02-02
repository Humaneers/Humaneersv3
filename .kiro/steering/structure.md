# Project Structure

## Root Directory Organization
```
├── src/                    # Main application source
├── docs/                   # Project documentation
├── scripts/                # Build and utility scripts
├── public/                 # Static assets
├── api/                    # Legacy API routes (being migrated)
└── _pgbackup/             # Pinegrow backup files
```

## Source Code Structure (`src/`)

### Core Application
```
src/
├── app/                    # Next.js App Router pages
│   ├── (routes)/          # Route groups for different pages
│   ├── api/               # API route handlers
│   ├── actions/           # Server actions
│   └── layout.tsx         # Root layout with providers
├── components/            # React components
├── lib/                   # Utility functions and configurations
├── styles/                # Global CSS and Tailwind config
└── middleware.ts          # Next.js middleware
```

### Component Architecture
```
src/components/
├── ui/                    # Reusable UI primitives (shadcn/ui)
├── views/                 # Page-specific components
├── layout/                # Header, Footer, Navigation
├── providers/             # React context providers
└── figma/                 # Design system components
```

### Feature Organization
```
src/features/              # Feature-based organization
├── home/                  # Homepage components
├── contact/               # Contact forms and modals
├── services/              # Service-specific pages
├── industries/            # Industry-specific content
├── pricing/               # Pricing components
├── legal/                 # Privacy, Terms, Ethics pages
├── resources/             # Documentation and resources
└── shared/                # Shared feature components
```

## Key Conventions

### File Naming
- **Components**: PascalCase (`ContactModal.tsx`)
- **Pages**: lowercase with hyphens (`talk-to-sales/page.tsx`)
- **Utilities**: camelCase (`utils.ts`, `zoho.ts`)
- **Types**: PascalCase interfaces, camelCase for type files

### Import Patterns
- Use absolute imports with `@/` alias for `src/`
- Prefer named imports over default imports
- Group imports: external libraries, internal modules, relative imports

### Component Structure
- Server components by default (Next.js App Router)
- Client components explicitly marked with `"use client"`
- Separate client/server versions when needed (`Component.tsx` + `ComponentClient.tsx`)

### API Routes
- Located in `src/app/api/`
- RESTful naming conventions
- Zod schema validation for all inputs
- Proper error handling and logging

## Documentation Structure
```
docs/
├── Reference/             # Technical documentation
├── Audits/               # Quality assurance checklists
├── guidelines/           # Brand and development guidelines
└── Infrastructure/       # Deployment and monitoring docs
```

## Configuration Files
- **TypeScript**: `tsconfig.json` with strict mode
- **ESLint**: `eslint.config.js` with accessibility rules
- **Tailwind**: Configured via `postcss.config.mjs`
- **Environment**: `.env.example` template, `.env.local` for development