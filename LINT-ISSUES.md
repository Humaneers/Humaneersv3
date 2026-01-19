# Lint & Code Quality Issues

> **Generated**: January 2026
> **Updated**: January 2026 (issues fixed)
> **Purpose**: Pre-launch code quality audit for public scrutiny readiness

---

## Summary

All critical and high-priority issues have been fixed. The codebase now has:

- ESLint and Prettier configured with TypeScript/React plugins
- TypeScript strict mode enabled
- Proper React keys on all mapped elements
- Environment-guarded console statements
- npm scripts for linting and formatting

### Remaining Items (Low Priority)

1. **Potentially unused dependencies** - Consider running `npx depcheck`

---

## Fixed Issues

### 1. ~~Critical: Missing Linting Infrastructure~~ FIXED

**What was done:**

- Installed ESLint, Prettier, and related plugins
- Created `eslint.config.js` with TypeScript and React rules
- Created `.prettierrc` with formatting configuration
- Created `.prettierignore` for build artifacts

**Files created:**

- `eslint.config.js`
- `.prettierrc`
- `.prettierignore`

---

### 2. ~~High: TypeScript Configuration Too Lenient~~ FIXED

**What was done:**
Updated `tsconfig.json`:

| Setting              | Before  | After  |
| -------------------- | ------- | ------ |
| `strict`             | `false` | `true` |
| `noUnusedLocals`     | `false` | `true` |
| `noUnusedParameters` | `false` | `true` |
| `noImplicitAny`      | `false` | `true` |

---

### 3. ~~High: React Key Anti-Pattern (Index as Key)~~ FIXED

**What was done:**
Fixed all 12 instances of index-based React keys:

| File             | Fix Applied                                                |
| ---------------- | ---------------------------------------------------------- |
| `Pricing.tsx`    | Added `key` attributes with tier name prefix               |
| `ManagedIT.tsx`  | Used `f.desc` and structured items with IDs                |
| `Status.tsx`     | Used `sys.name` as key                                     |
| `Home.tsx`       | Already had proper keys (verified)                         |
| `Services.tsx`   | Used feature string as key                                 |
| `Industries.tsx` | Used `industry.id`-prefixed keys + added keys to JSX spans |
| `Growth.tsx`     | Used `step.title` and item strings as keys                 |
| `Resources.tsx`  | Used `item.term` as key                                    |

---

### 4. ~~Medium: Console Statements in Production Code~~ FIXED

**What was done:**
Added environment guards to both instances:

**`src/components/ErrorBoundary.tsx`:**

```tsx
if (import.meta.env.DEV) {
  console.error("Error caught by boundary:", error, errorInfo);
}
```

**`src/lib/cal.ts`:**

```tsx
if (import.meta.env.DEV) {
  console.error("Missing Cal.com configuration:", missing);
}
```

---

### 5. ~~Medium: Missing npm Scripts for Code Quality~~ FIXED

**What was done:**
Added scripts to `package.json`:

```json
{
  "scripts": {
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix",
    "format": "prettier --write src/",
    "format:check": "prettier --check src/",
    "check": "npm run typecheck && npm run lint && npm run format:check"
  }
}
```

---

### 6. BONUS: CSS Syntax Error Fixed

**What was done:**
Fixed invalid CSS in `index.html:54`:

- Before: `justify-center;` (invalid)
- After: `justify-content: center;` (valid)

This was causing build failures with Tailwind CSS v4.

---

## Low Priority: Remaining Warnings

### 7. ~~Unused Imports~~ FIXED

All unused imports have been removed from:

- `DefinitionTooltip.tsx` - Removed `HelpCircle`
- `Layout.tsx` - Removed `navigationMenuTriggerStyle`, fixed ref type
- `About.tsx` - Removed `TrendingUp`, `motion`
- `TalkToSalesModal.tsx` - Removed unused `handleInterestChange`
- `tooltip.tsx` - Fixed `TooltipArrow` className issue
- `Colophon.tsx` - Removed `Button`
- `FamilyProtection.tsx` - Removed `Lock`, `DefinitionTooltip`
- `Growth.tsx` - Removed `motion`
- `Industries.tsx` - Removed `Wifi`, `Tablet`
- `NonProfits.tsx` - Removed `Heart`, `HandHeart`, `ArrowRight`, `Lock`, `DefinitionTooltip`
- `Personal.tsx` - Removed `Globe`, `Mail`, `Server`, `ArrowRight`, `ShieldAlert`, `Wifi`, `Fingerprint`
- `Pricing.tsx` - Removed `X`, `HelpCircle`, `ArrowRight`, `Switch`
- `Resources.tsx` - Removed `Tabs`, `TabsContent`, `TabsList`, `TabsTrigger`
- `Status.tsx` - Removed `AlertCircle`
- `cal.ts` - Removed unused `encodeParam` function

### 8. Vite Type Definitions FIXED

Created `src/vite-env.d.ts` to properly type `import.meta.env` for TypeScript strict mode.

### Potentially Unused Dependencies

Run `npx depcheck` to identify:

- `@radix-ui/react-context-menu`
- `@radix-ui/react-hover-card`
- `@radix-ui/react-menubar`
- `@radix-ui/react-slider`
- `@radix-ui/react-toggle`
- `@radix-ui/react-toggle-group`
- `cmdk`
- `input-otp`
- `react-day-picker`
- `react-resizable-panels`
- `next-themes`

---

## Verification

### Build Status

```bash
npm run build  # ✓ Passes
npm run typecheck  # ✓ Passes
```

### New Commands Available

```bash
npm run lint         # Check for lint issues
npm run lint:fix     # Auto-fix lint issues
npm run format       # Format all files
npm run format:check # Check formatting
npm run check        # Run all quality checks
```

---

## Action Items Checklist

- [x] Install and configure ESLint with TypeScript/React plugins
- [x] Install and configure Prettier
- [x] Add `eslint.config.js` and `.prettierrc` configuration files
- [x] Enable TypeScript strict mode in `tsconfig.json`
- [x] Fix all 12 instances of index-based React keys
- [x] Add environment guards to console statements
- [x] Add lint/format scripts to `package.json`
- [x] Fix CSS syntax error in `index.html`
- [x] Remove all unused imports manually
- [x] Add Vite type definitions for `import.meta.env`
- [x] Fix all TypeScript strict mode errors
- [ ] Run `npx depcheck` and remove unused dependencies (optional)
- [ ] Set up pre-commit hooks with Husky (optional)
- [ ] Add lint step to CI/CD pipeline (optional)
