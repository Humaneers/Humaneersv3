# webSpecs: Humaneers Design & Technical Standards

> **Status**: Living Document
> **Role**: Single Source of Truth for Design, Code, and Brand Voice.
> **Directives**: All AI agents must reference this document for every request.

---

## 1. Core Directives (AI & Human)

### 1.1 Human-First, AI-Second
- **Principle**: Technology amplifies human expertise; it does not replace it.
- **Implementation**:
  - **No Autonomous Decisions**: Humans make all strategic/critical choices.
  - **Disclosure**: Usage of AI tools is transparently disclosed (see Colophon).
  - **Quality over Speed**: AI is for refinement and error-checking, not mass production.
  - **Review**: All AI-generated code/content must be verified by a human.
  - **Documentation**: It is imperative to keep reference documents up to date with every change. No exceptions.

### 1.2 "Modern Craftsman" Philosophy
- **Aesthetic**: Precision tooling meets artisan workshop. Professional polish + approachable warmth.
- **Values**: Specificity, Transparency, Reliability, Stewardship.
- **Tone**: "Enterprise strategy for businesses and families. Built with precision, delivered with soul."
  - **Do**: "We fix critical vulnerabilities." (Active, specific)
  - **Don't**: "We optimize security protocols." (Corporate jargon)
  - **Do**: "Built with heart and grit in AZ." (Human touch, no emojis)
  - **Style Rule**: **No Hyphens or Dashes.** Use commas, periods, or other literary devices.
  - **Visuals**: No emojis in official documentation.

---

## 2. Visual Design System

### 2.1 Color Palette (OKLCH & Hex)
**Primary Brand Colors**
- **Oxford Blue** (`#1B263B`): Authority, Trust. Used for Headers, Footers, Hero Backgrounds.
- **Copper** (`#B87333`): Action, Warmth. **EXCLUSIVELY for Primary CTAs and key accents.**
  - *Hover*: Darker copper (`#a0632a`).
- **Cream** (`#F5F1E9`): Warmth, Comfort. Used for **Page Backgrounds** (never pure white).

**UI Colors**
- **Slate** (`#4E596F`): Body copy.
- **White** (`#FFFFFF`): Card backgrounds (on Cream), Text on Dark backgrounds.
- **Gray-50** to **Gray-200**: Subtle backgrounds, borders.

### 2.2 Typography
- **Font Stack**: System sans-serif (`ui-sans-serif`, `system-ui`, `sans-serif`) for performance and neutrality.
- **Hierarchy**:
  - **Hero**: `text-4xl` to `text-6xl`, Bold (`font-bold`).
  - **Section Headers**: `text-2xl` to `text-3xl`, Bold.
  - **Subheaders**: `text-xl`, Semibold (`font-semibold`).
  - **Body**: `text-base` (16px), Regular (`font-light` or `font-normal`).
  - **Labels/Buttons**: `text-sm`, Medium (`font-medium`).

### 2.3 Spacing & Layout
- **Base Unit**: 4px (`0.25rem`).
- **Section Padding**: `py-24` (Standard).
- **Container**: `container mx-auto px-6` (Standard).
- **Radius**: `rounded-2xl` (Standard for cards/heroes), `rounded-full` (Buttons), `rounded-lg` (Input fields).

### 2.4 Animation (Framer Motion)
- **Philosophy**: Purposeful, distinct, smooth. Guide attention, don't decorate.
- **Duration**: Fast (0.2s) for UI, Medium (0.5s) for entrances.
- **Patterns**:
  - *Drift Up*: `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}`.
  - *Hover Lift*: `hover:-translate-y-1`.
  - *Glow*: Box shadow increase on hover (`shadow-md` -> `shadow-lg`).

---

## 3. UI Component Patterns

### 3.1 Buttons
- **Primary CTA**: `bg-brand-copper text-white hover:bg-brand-copper-dark shadow-md`.
  - *Copy*: "Let's Get Started", "View Pricing", "Protect My Family".
  - *Avoid*: "Submit", "Click Here".
- **Secondary**: `variant="outline" border-brand-oxford text-brand-oxford`.
- **Destructive**: `bg-red-600 text-white`.
### 3.2 Cards
- **Usage**: Feature lists, Pricing tiers, Services.
- **Style**: `bg-white rounded-2xl shadow-xl p-8`.
- **Interaction**: `hover:-translate-y-1 transition-all duration-300`.

### 3.3 Forms (Zoho Integration)
- **Inputs**: `bg-gray-50 border-transparent focus:border-brand-oxford rounded-lg px-4 py-3`.
- **Labels**: `font-medium text-brand-oxford mb-2 block`.
- **Validation**: Real-time feedback, distinct error messages.

### 3.4 Icons (Lucide React)
- **Sizing**: `w-5 h-5` (inline), `w-12 h-12` (hero features).
- **Color**: Inherit from parent text color. **Review hover states** to ensure visibility.

---

## 4. Technical Architecture

### 4.1 Tech Stack
- **Framework**: React 18 + Vite.
- **Language**: TypeScript (Strict mode).
- **Styling**: Tailwind CSS v4.
- **Routing**: React Router DOM (v6).
  - *Context-Aware Routing*: Pass `mode` and `highlight` params (e.g., `?mode=household&highlight=senior`).
- **CRM**: Zoho CRM (via custom API integration).
- **Analytics**: Vercel Analytics, Zoho PageSense, Hotjar, Contentsquare.

### 4.2 Code Standards
- **File Structure**: Feature-based organization in `src/components/views`.
- **Imports**: Specific imports preferred (`import { Button }` vs `import *`).
- **Types**: No `any`. Define interfaces for all props and data.
- **Error Boundaries**: Wrap critical page sections.
- **SEO**: Use `<Seo />` component on every page view.
- **Performance**: Lazy load heavy routes. Optimize images (WebP/SVG).

---

## 5. Content & Messaging Guidelines

### 5.1 Voice
- **Distinction**: Clearly distinguish between B2B (Business) and B2C (Family) contexts while maintaining a unified "Modern Craftsman" brand.
- **Business**: Confidence, Competence, Strategic Partnership.
- **Family**: Protection, Peace of Mind, Inclusion.
- **Nonprofit**: Mission-focus, Stewardship, Value.

### 5.2 Key Terminology
- **"Managed IT"** (NOT "Computer Repair").
- **"Brand Growth"** (NOT "SEO Services").
- **"Family Protection"** (NOT "Antivirus").
- **"Fractional Leadership"** (NOT "Consulting").
- **"Hourly Support"** (For ad-hoc engineering needs).

### 5.3 Copy Patterns
- **Price Transparency**: Always show unit pricing (e.g., "$90/user/mo").
- **Local Roots**: "Based in Tempe, AZ. Serving clients nationwide."
- **Inclusivity**: "For businesses and families."

---

## 6. Recent Project Context (Q1 2026)

### 6.1 Senior Care Launch
- **New Finding**: Senior Care helps adult children protect aging parents from fraud.
- **New Tier**: "Senior Care" ($75/household/mo).
- **Features**: Fraud Air-Gapping, "Red Button" support, Family Proxy.
- **Routing**:
  - `/senior-care` -> `/pricing?highlight=senior`.
  - **Support**: `/support` (Emergency contacts, FAQ, SLA)
  - **Client Care**: `/client-care` (Concierge info, Portal login simulation)
  - **Partners**: `/partners` (Vendor ecosystem)

### 6.2 Marketing Messaging Pillars (Q1 2026)
- **Family**: "Health Check" (NOT "Audit"). Focus on simplicity and "Grandparent Protection".
- **Nonprofit**: "Grant Readiness" (NOT just "IT Support"). Focus on compliance unlocking funding.
- **Business**: "Fractional Savings". Highlight the 10x ROI vs hiring full-time.

### 6.3 Client Care (Retention Asset)
- **Goal**: Showcase premium "Concierge" experience to build trust pre-sale and reassure post-sale.
- **Key Features**:
  - "Client Care Partner": Direct text/call access (no tickets).
  - "Client Portal": Simulated login button (Lightbox -> Access Denied).
  - Messaging: "White Glove", "No Waiting", "Personalized".

### 6.3 Ideal Customer Profiles (ICPs)
1. **The Sophisticated Family ("Chief Household Officer")**:
   - **Trigger**: Identity theft news or kids' internet safety.
   - **Desire**: "Set it and forget it" peace of mind.
   - **Blocker**: Complexity.
2. **The SMB Owner ("Growth Leader")**:
   - **Trigger**: Security scare or SOC 2 compliance.
   - **Desire**: Speed, ROI, and Trust.
   - **Blocker**: Trust ("Will they understand my business?").
3. **The Nonprofit Director ("Steward")**:
   - **Trigger**: Grant compliance or donor data fears.
   - **Desire**: Stewardship and Efficiency.
   - **Blocker**: Cost.

### 6.4 Family Inclusion
- **Shift**: Moved from business-only to "Business + Family" dual focus.
- **Updates**:
  - Homepage Hero: "Enterprise strategy for businesses and families..." implies scope.
  - Pricing: Split into "Business", "Personal", "Nonprofit" tabs.

### 6.3 Routing Logic
- **Consultative**: Calls to action -> `/talk-to-sales`.
- **Transactional**: "View Plans/Pricing" -> `/pricing` (with params).

---

## 7. QA & Verification Standards

### 7.1 Automated Testing
- **Directive**: All new utility functions, complex logic, and implementations MUST include unit tests (Vitest).
- **Pre-Commit**: Run `npm run check` (Typecheck + Lint) and `npm run test` before committing.
- **Mocking**: External APIs (e.g., Zoho, Analytics) MUST be mocked. Do not make real network requests in tests.

### 7.2 Code Coverage Expectations
- **Core Utilities**: 100% coverage required for `src/lib/utils.ts`, `src/lib/session.ts`.
- **Integrations**: Payload structure and session context inclusion must be verified for all forms.
- **UI Components**: Smoke tests for critical views (optional but recommended).

### 7.3 Production Verification
- **Directive**: Production builds must be verified locally before deployment.
- **Command**: `npm run build` && `npm run preview`.

### 7.4 Pre-Release Scrutiny (Deep Clean)
- **Placeholders**: Codebase must be scanned for `TODO`, `FIXME`, `XXX`, and `Lorem Ipsum` before release. Zero tolerance for placeholders in production.
- **Prohibited Terms**: Final grep check for "Computer Repair", "Antivirus", "Consulting", "SEO Services".
- **Metadata**: verify `package.json` "private" is true (unless publishing), and version is bumped.
- **Assets**: 
  - `robots.txt` must not block indexing (except for specific non-public routes).
  - `sitemap.xml` must be present and valid.
  - No `console.log` statements in production code.
