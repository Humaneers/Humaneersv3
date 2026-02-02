# Technology Stack

## Framework & Runtime
- **Next.js 15** with App Router and React 19
- **TypeScript** in strict mode (no `any` types allowed)
- **Node.js** v18+ required

## Styling & UI
- **Tailwind CSS v4** with custom brand color system
- **Radix UI** primitives with shadcn/ui patterns
- **Framer Motion** for purposeful animations
- **Lucide React** for consistent iconography

## Key Libraries
- **Zod** for schema validation and type inference
- **React Hook Form** for form handling
- **Class Variance Authority** for component variants
- **Tailwind Merge** + **clsx** for conditional styling

## Integrations
- **Zoho CRM/Desk** for lead management and support tickets
- **Datadog RUM** for monitoring and analytics
- **Vercel Analytics** and **Speed Insights**

## Development Tools
- **ESLint** with TypeScript, React, and accessibility rules
- **Prettier** for code formatting
- **Vitest** for unit testing

## Common Commands

### Development
```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run typecheck    # TypeScript validation
```

### Quality Assurance
```bash
npm run check        # Run all checks (typecheck + lint + format)
npm run lint         # ESLint validation
npm run lint:fix     # Auto-fix ESLint issues
npm run format       # Format code with Prettier
npm run format:check # Check formatting without changes
```

### Testing
```bash
npm run test         # Run tests in watch mode
npm run test:run     # Single test run
```

### Utilities
```bash
npm run release      # Create release with version bump
npm run issues       # GitHub issue management CLI
```

## Build Configuration
- **Output**: Static export optimized for Vercel
- **Image Optimization**: Sharp for WebP conversion
- **Bundle Analysis**: Built-in Next.js analyzer
- **Environment**: Supports development, preview, and production configs