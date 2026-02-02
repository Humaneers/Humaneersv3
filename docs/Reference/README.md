# Humaneers Website
> **Enterprise strategy for businesses and families. Built with precision, delivered with soul.**

The official website for Humaneers, built with modern web technologies to deliver a "Modern Craftsman" digital experience.

## AI Directives

**For all AI agents working on this codebase:**

1.  **Mandatory Interrogation.** Every request `MUST` refer to and interrogate this README first. Do not rely on training data or previous context alone.
2.  **Context Verification.** Do not assume you know the codebase. Always check the current state of files before proposing changes.
3.  **Executive Simulation.** When planning implementations, think ahead as a **CEO** (Business Value), **CIO** (Security/Data), **CTO** (Architecture/Stability), and **CMO** (Brand/Experience). Then do it again.
4.  **Role Assumption.** Act as a **Fortune 500 Senior Full Stack Developer**. Your output must be enterprise-grade, scalable, secure, and robust. Do not settle for "good enough".
5.  **Documentation First, Code Second.** Code is the final output of a thought process, not the starting point. Always create a written plan before writing a single line of code.
6.  **Comply with Design Standards.** This file is now the single source of truth for design, code standards, and brand voice.
7.  **Resolve Conflicts.** If you encounter conflicting instructions between files or user prompts, **FAIL SAFE** and ask the user for clarification. Do not guess.
8.  **Writing Style.**
    - **No Hyphens or Dashes.** Do not use dashes or hyphens in text or copy. Use commas, periods, or other literary devices to connect thoughts.
    - **Human Tone.** Write like a marketing professional, not a robot. Warm, specific, and professional.
    - **No Emojis.** Do not use emojis in official documentation or technical files. Use them sparingly in marketing copy only if explicitly requested.
9.  **Maintain Documentation.** It is imperative that this README is kept up to date with every change. This is not optional. If code changes, documentation must change immediately.

## Documentation Index

This repository maintains specialized documentation files for different aspects of the project:

### Quality & Standards
- **[API_TESTING.md](./docs/API_TESTING.md)** - API integration testing procedures and examples
- **[RELEASE_GATE_CHECKLIST.md](./docs/Infrastructure/RELEASE_GATE_CHECKLIST.md)** - Pre-release verification checklist

### Design & User Experience
- **[COLOR_CONTRAST_AUDIT.md](./docs/Audits/COLOR_CONTRAST_AUDIT.md)** - WCAG accessibility compliance audit
- **[COPY_AUDIT.md](./docs/Audits/COPY_AUDIT.md)** - Brand messaging and content standards verification
- **[KEYBOARD_NAV_TEST.md](./docs/Audits/KEYBOARD_NAV_TEST.md)** - Keyboard navigation accessibility testing
- **[SEO_RECOMMENDATIONS.md](./docs/Guidelines/SEO_RECOMMENDATIONS.md)** - Search engine optimization guidelines

### Infrastructure & Monitoring
- **[DATADOG_SETUP.md](./docs/Infrastructure/DATADOG_SETUP.md)** - Datadog RUM configuration and setup
- **[DATADOG_ALERTS_QUICKREF.md](./docs/Infrastructure/DATADOG_ALERTS_QUICKREF.md)** - Alert configuration reference
- **[DATADOG_MANUAL_IMPORT.md](./docs/Infrastructure/DATADOG_MANUAL_IMPORT.md)** - Manual import procedures

### Integration & Configuration
- **[ZOHO_DESK_DEPARTMENT_ID.md](./docs/ZOHO_DESK_DEPARTMENT_ID.md)** - Zoho Desk configuration details
- **[Component Library](./docs/Reference/Component%20Library.md)** - Auto-generated component documentation

### Implementation Plans
- **[COMPONENT_REFACTORING_PLAN.md](./docs/COMPONENT_REFACTORING_PLAN.md)** - Component architecture refactoring strategy
- **[IMPLEMENTATION_PLAN.md](./docs/IMPLEMENTATION_PLAN.md)** - General implementation roadmap
- **[NAVIBARTWO_IMPLEMENTATION_PLAN.md](./docs/NAVIBARTWO_IMPLEMENTATION_PLAN.md)** - Navigation redesign specifications

## 1. Core Philosophy & Engineering Directives

### 1.1 Zero Tolerance for Technical Debt
- **NO Shortcuts**: Rough drafts, "fix it later," or temporary hacks are strictly prohibited.
- **Enterprise Grade Always**: Every line of code must be production-ready, secure, and scalable from the first commit.
- **Precision**: If it's not perfect, it's not done.

### 1.2 "Modern Craftsman" Philosophy
- **Aesthetic**: Precision tooling meets artisan workshop. Professional polish + approachable warmth.
- **Heritage**: Founded in stealth mode serving referral-only clients. Proven track record delivering bespoke, enterprise-grade solutions.
- **Values**: Specificity, Transparency, Reliability, Stewardship.
- **Tone**: "Enterprise strategy for businesses and families. Built with precision, delivered with soul."

### 1.3 Human-First, AI-Second
- **Principle**: Technology amplifies human expertise; it does not replace it.
- **Implementation**:
  - **No Autonomous Decisions**: Humans make all strategic/critical choices.
  - **Disclosure**: Usage of AI tools is transparently disclosed (see Colophon).
  - **Review**: All AI-generated code/content must be verified by a human.

### 1.4 Contract-Driven Development
- **Shared Schemas**: Frontend and Backend MUST share `zod` schemas. Types are inferred from these schemas (`z.infer`).
- **Validation**: All inputs must be strictly validated. No `any`.

### 1.5 Resilience & Observability
- **Zero Data Loss**: Critical flows (like Lead Submission) MUST have fallback mechanisms.
- **Structured Logging**: All API actions must log success/failure states with context (excluding PII).
- **Chaos Tolerance**: The UI must handle network failures gracefully.

### 1.6 Security & Anti-Abuse
- **Rate Limiting**: Public write endpoints must have strict, IP-based rate limiting.
- **Honeypots**: All public forms must include invisible honeypot fields.
- **Fail Secure**: Defaults must be secure (deny all by default).

### 1.7 Privacy & Ethics
- **Explicit Consent**: Marketing enrollment requires an unchecked "opt-in" checkbox.
- **Data Minimization**: Only collect what is strictly necessary.

## 2. Visual Design System

### 2.1 Color Palette (OKLCH & Hex)
**Primary Brand Colors**
- **Oxford Blue** (`#1B263B`): Authority, Trust. Used for Headers, Footers, Hero Backgrounds.
- **Copper** (`#B87333`): Action, Warmth. **EXCLUSIVELY for Primary CTAs and key accents.**
  - _Hover_: Darker copper (`#a0632a`).
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
  - _Drift Up_: `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}`.
  - _Hover Lift_: `hover:-translate-y-1`.
  - _Glow_: Box shadow increase on hover (`shadow-md` -> `shadow-lg`).

## 3. UI Component Patterns

### 3.1 Buttons
- **Primary CTA**: `bg-brand-copper text-white hover:bg-brand-copper-dark shadow-md`.
  - _Copy_: "Let's Get Started", "View Pricing", "Protect My Family".
  - _Avoid_: "Submit", "Click Here".
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

## 🐛 Issue Tracking

We use the GitHub API to manage issues directly from the command line.

### Prerequisites
You must have a `GITHUB_TOKEN` environment variable set with `repo` scope.
```bash
export GITHUB_TOKEN=your_personal_access_token
```

### Usage
**List Open Issues:**
```bash
npm run issues list
```

**Create a New Issue:**
```bash
# Usage: npm run issues create "Title" "Body" "Label1,Label2"
npm run issues create "Fix Login Bug" "Login fails on Safari" "bug,high-priority"
```

**Close an Issue:**
```bash
npm run issues close 123
```

**Comment on an Issue:**
```bash
npm run issues comment 123 "Fixed in commit abc1234"
```

## 4. Tech Stack & Code Standards

### 4.1 Tech Stack
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, PPR) + [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing**: Next.js 15 App Router with server and client components
  - _Context-Aware Routing_: Pass `mode` and `highlight` params via URL search params
  - _Navigation_: Programmatic navigation using Next.js `useRouter` hook
- **UI Architecture**: [Radix UI](https://www.radix-ui.com/) + Shadcn/UI patterns
- **CRM**: [Zoho CRM](https://www.zoho.com/crm/) + Zoho Forms (Custom API Integration)
- **Analytics**: Zoho PageSense + SalesIQ, Contentsquare, Datadog RUM
- **Infrastructure**: AWS (S3, EC2), CloudFlare DNS, Plesk, Vercel
- **Payments**: [Stripe](https://stripe.com/)
- **Communication**: Slack

### 4.2 Code Standards
- **File Structure**: Feature-based organization in `src/components/views`.
- **Imports**: Specific imports preferred (`import { Button }` vs `import *`).
- **Types**: No `any`. Define interfaces for all props and data.
- **Error Boundaries**: Wrap critical page sections.
- **SEO**:
  - Export `metadata` object on every page using Next.js Metadata API
  - Include `title`, `description`, `canonical`, `openGraph`, and `twitter` properties
  - Use `<StructuredData />` component for JSON-LD schemas (Organization, Service, FAQPage, etc.)
  - Ensure all images have descriptive alt text
- **Performance**: Lazy load heavy routes. Optimize images (WebP/SVG).

### 4.3 Zoho Ecosystem Integration

This project integrates multiple Zoho products to create a unified customer relationship and analytics platform.

#### Active Integrations

**Zoho CRM**
- **Purpose**: Lead management and sales pipeline tracking
- **Integration Type**: Server-side API via OAuth 2.0
- **Key Features**:
  - Automated lead creation from contact forms
  - Custom field mapping for service-specific inquiries
  - Duplicate detection and merging
- **API Rate Limits**:
  - Standard: 5,000 API calls/day per org
  - Rate limit handling: Exponential backoff with retry logic
- **Fallback Mechanism**: Local lead data stored in Datadog logs if API unavailable

**Zoho Forms**
- **Purpose**: Structured data collection with spam prevention
- **Integration Type**: Embedded forms with webhook callbacks
- **Key Features**:
  - Honeypot fields for bot detection
  - Real-time validation
  - CAPTCHA integration (configurable)
- **Fallback Mechanism**: Direct submission to Zoho CRM API if form embed fails

**Zoho Desk**
- **Purpose**: Customer support ticketing system
- **Integration Type**: Server-side API via OAuth 2.0
- **Key Features**:
  - Automated ticket creation from support forms
  - Department routing via `ZOHO_DESK_DEPARTMENT_ID`
  - SLA tracking and escalation
- **API Rate Limits**: 2,000 API calls/hour per org
- **Fallback Mechanism**: Email notification to support team if API unavailable

**Zoho PageSense**
- **Purpose**: Behavioral analytics and conversion tracking
- **Integration Type**: Client-side JavaScript snippet
- **Key Features**:
  - Heatmaps and session recordings
  - Funnel analysis
  - A/B testing capability
- **Privacy Compliance**: Cookie consent required via CookieConsentBanner component

**Zoho SalesIQ**
- **Purpose**: Live chat and visitor intelligence
- **Integration Type**: Client-side widget
- **Key Features**:
  - Real-time visitor tracking
  - Proactive chat triggers
  - Lead scoring integration with Zoho CRM
- **Configuration**: Automatic visitor identification for returning clients

#### Planned Integrations

**Zoho Bookings** (Version 0.3.1)
- **Purpose**: Appointment scheduling and calendar management
- **Planned Features**:
  - Real-time availability display
  - Multi-service booking (Sales, Technical, Family Protection)
  - Automated email confirmations and reminders
  - Calendar sync (Google, Outlook, iCal)
- **Technical Approach**: Server-side API with webhook notifications
- **See**: Version 0.3.1 roadmap (Section 12)

#### Integration Architecture

**Authentication Flow:**
```
1. Server stores ZOHO_REFRESH_TOKEN (long-lived)
2. Token refresh endpoint generates short-lived access tokens
3. API calls use fresh access tokens (1-hour expiry)
4. Automatic refresh on 401 Unauthorized responses
```

**Error Handling Strategy:**
- **Network Failures**: 3 retry attempts with exponential backoff (1s, 2s, 4s)
- **Rate Limiting**: Queue requests and throttle to stay under limits
- **API Downtime**: Fallback to email notifications + Datadog error logging
- **Data Loss Prevention**: Critical submissions logged to Datadog before Zoho submission

**Security Considerations:**
- All Zoho API credentials stored in environment variables (never client-side)
- OAuth tokens rotated every 90 days
- API requests validated with Zod schemas
- Rate limiting on public endpoints to prevent abuse
- Honeypot fields on all forms

**Monitoring & Observability:**
- Zoho API response times tracked in Datadog
- Failed submissions trigger Datadog alerts
- Daily sync verification between Zoho CRM and local analytics
- See [DATADOG_ALERTS_QUICKREF.md](./DATADOG_ALERTS_QUICKREF.md) for alert configuration

**Cost Management:**
- Zoho CRM: Professional Plan ($20/user/month)
- Zoho Desk: Standard Plan ($14/agent/month)
- Zoho PageSense: Premium Plan ($25/month, 100K page views)
- API call monitoring to avoid overage charges

## 5. Content & Messaging Guidelines

### 5.1 Brand Heritage & Positioning
- **Stealth Origins**: Humaneers began as an invitation-only service. This heritage reinforces credibility.
- **Proven Track Record**: Delivering bespoke, enterprise-grade solutions to businesses and families.
- **Client-Driven Public Launch**: "You do not need a referral to work with us. You just need a problem worth solving."
- **Exceptional USP**: Enterprise methodology without enterprise overhead.
- **Messaging Pillars**:
  - **Exclusivity Heritage**: Reference past selectivity.
  - **Proven Results**: Emphasize track record.
  - **Maintained Standards**: Uncompromising focus on precision.

### 5.2 Voice
- **Business**: Confidence, Competence, Strategic Partnership.
- **Family**: Protection, Peace of Mind, Inclusion.
- **Nonprofit**: Mission-focus, Stewardship, Value.

### 5.3 Key Terminology
- **"Managed IT"** (NOT "Computer Repair").
- **"Brand Growth"** (NOT "SEO Services").
- **"Family Protection"** (NOT "Antivirus").
- **"Fractional Leadership"** (NOT "Consulting").
- **"Hourly Support"** (For ad-hoc engineering needs).

### 5.4 Copy Patterns
- **Price Transparency**: Always show unit pricing (e.g., "$90/user/mo").
- **Local Roots**: "Offices in Tempe AZ, El Paso TX, and Flint MI. Serving clients nationwide."
- **Inclusivity**: "For businesses and families."

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

### 6.2 Marketing Messaging Pillars
- **Family**: "Health Check" (Grandparent Protection).
- **Nonprofit**: "Grant Readiness".
- **Business**: "Fractional Savings" (10x ROI).

### 6.3 Client Care (Retention Asset)
- **Goal**: Showcase premium "Concierge" experience.
- **Key Features**: "Client Care Partner", "Client Portal" (Simulation).

### 6.4 Ideal Customer Profiles (ICPs)
1. **The Sophisticated Family ("Chief Household Officer")**: Desire "Set it and forget it" peace of mind.
2. **The SMB Owner ("Growth Leader")**: Desire Speed, ROI, and Trust.
3. **The Nonprofit Director ("Steward")**: Desire Stewardship and Efficiency.

## 7. Getting Started

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

## 8. Testing & Quality Assurance

### 8.1 Automated Quality Check
Run linting, formatting, and typechecking:
```bash
npm run check
```
**Directive**: Pre-Commit mandatory.

### 8.2 Unit Tests (Vitest)
```bash
npm run test      # Watch mode
npm run test:run  # Single run
```
**Directive**: All new utility functions and complex logic MUST include unit tests. Mock external APIs.

### 8.3 Production Verification
```bash
npm run build && npm run preview
```
**Directive**: Production builds must be verified locally before deployment.

### 8.4 Pre-Release Scrutiny (Deep Clean)
Before any public release, perform the following manual checks:
- Scan for `TODO`, `FIXME`, or placeholder text.
- Verify `package.json` metadata (version, private status).
- Verify absence of prohibited terms (e.g., "Computer Repair").
- Verify SEO assets (`sitemap.xml`, `robots.txt`).
- No `console.log` statements in production code.

## 9. Configuration

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### 9.1 Environment Variables Reference

**Complete list of required and optional environment variables. See [`.env.example`](./.env.example) for detailed descriptions and default values.**

#### Zoho API Configuration (Required)
| Variable | Description | Example |
|----------|-------------|---------|
| `ZOHO_CLIENT_ID` | OAuth Client ID from Zoho API Console | `1000.ABC123XYZ` |
| `ZOHO_CLIENT_SECRET` | OAuth Client Secret (keep secure!) | `abc123def456...` |
| `ZOHO_REFRESH_TOKEN` | OAuth Refresh Token (scopes: ZohoCRM.modules.leads.CREATE, Desk.tickets.CREATE) | `1000.xyz789...` |
| `ZOHO_API_DOMAIN` | Zoho API domain (varies by data center) | `www.zohoapis.com` (US) |
| `ZOHO_ACCOUNTS_DOMAIN` | Zoho Accounts domain for OAuth token refresh | `accounts.zoho.com` (US) |
| `ZOHO_DESK_ORG_ID` | Zoho Desk Organization ID (from Desk > Settings > Developer Space > API) | `12345678` |

#### Zoho Optional Configuration
| Variable | Description | Default |
|----------|-------------|---------|
| `ZOHO_DESK_DEPARTMENT_ID` | Department ID for ticket routing | None (uses default) |

#### Datadog RUM Configuration (Required for Production)
| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_DATADOG_APPLICATION_ID` | Datadog Application ID | `abc123-def4-56gh-78ij-90klmn123456` |
| `NEXT_PUBLIC_DATADOG_CLIENT_TOKEN` | Datadog Client Token | `pub123abc456def...` |
| `NEXT_PUBLIC_DATADOG_SITE` | Datadog site (varies by region) | `datadoghq.com` (US1) |
| `NEXT_PUBLIC_DATADOG_SERVICE` | Service name for RUM | `humaneers-website` |
| `NEXT_PUBLIC_DATADOG_ENV` | Environment identifier | `production` / `development` |
| `NEXT_PUBLIC_DATADOG_VERSION` | Application version (match `package.json`) | `0.2.0` |

#### Datadog Optional Configuration
| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_DATADOG_SAMPLE_RATE` | Percentage of sessions to track (0-100) | `100` (dev), `20-50` (prod) |
| `NEXT_PUBLIC_DATADOG_TRACK_SESSIONS` | Enable session tracking | `true` |
| `NEXT_PUBLIC_DATADOG_TRACK_RESOURCES` | Enable resource loading tracking | `true` |
| `NEXT_PUBLIC_DATADOG_TRACK_LONG_TASKS` | Enable long task tracking | `true` |

### 9.2 Regional Configuration

**Zoho Data Centers:**
- **US**: `www.zohoapis.com` / `accounts.zoho.com`
- **EU**: `www.zohoapis.eu` / `accounts.zoho.eu`
- **IN**: `www.zohoapis.in` / `accounts.zoho.in`
- **AU**: `www.zohoapis.com.au` / `accounts.zoho.com.au`

**Datadog Regions:**
- **US1**: `datadoghq.com`
- **US3**: `us3.datadoghq.com`
- **US5**: `us5.datadoghq.com`
- **EU**: `datadoghq.eu`

### 9.3 Security Notes
- **Never commit** `.env.local` or `.env.production` to version control
- Store production secrets in Vercel Environment Variables (encrypted at rest)
- Rotate `ZOHO_REFRESH_TOKEN` every 90 days (Zoho best practice)
- Use separate Zoho tokens for development, preview, and production environments
- `NEXT_PUBLIC_*` variables are **exposed to the browser** (only use for non-sensitive config)

## 10. Project Structure

```
src/
├── components/
│   ├── ui/          # Reusable UI components
│   ├── views/       # Page components
│   └── Layout.tsx   # Main application shell
├── lib/
│   ├── zoho.ts      # Zoho CRM integration
│   └── utils.ts     # Helper functions
├── guidelines/      # Project documentation (Deprecated: See README)
└── styles/
    └── globals.css  # Global styles and Tailwind directives
```

## 11. Deployment

This project is optimized for deployment on **Vercel** with CloudFlare DNS management.

### 11.1 Initial Deployment Setup

**Prerequisites:**
- Vercel account connected to your GitHub repository
- CloudFlare account for DNS management
- All required environment variables (see Section 9)

**Deployment Steps:**
1. **Connect Repository to Vercel**
   - Log in to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your GitHub repository
   - Select the repository: `Humaneersv3`

2. **Configure Build Settings**
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next` (automatically detected)
   - **Install Command**: `npm install`
   - **Root Directory**: `./` (project root)

3. **Configure Environment Variables**
   - Navigate to Project Settings > Environment Variables
   - Add all variables from `.env.example` (see Section 9 for complete list)
   - Set appropriate values for Production, Preview, and Development environments
   - **Critical**: Ensure Zoho and Datadog tokens are set for Production

4. **Deploy**
   - Click "Deploy"
   - Monitor build logs for errors
   - Verify deployment at the generated `.vercel.app` URL

### 11.2 Custom Domain Configuration

**CloudFlare DNS Setup:**
1. Add your custom domain in Vercel Project Settings > Domains
2. Configure CloudFlare DNS records:
   - **Type**: CNAME
   - **Name**: `@` (or subdomain)
   - **Target**: `cname.vercel-dns.com`
   - **Proxy Status**: Proxied (orange cloud)
3. Enable CloudFlare SSL/TLS (Full or Full Strict)
4. Configure CloudFlare Page Rules for caching (optional)

### 11.3 Production Environment Validation

**Pre-Launch Checklist:**
- [ ] All environment variables set and verified
- [ ] SSL certificate active and valid
- [ ] Datadog RUM reporting data
- [ ] Zoho CRM integration functional (test lead submission)
- [ ] SEO meta tags rendering correctly (`view-source` check)
- [ ] `robots.txt` and `sitemap.xml` accessible
- [ ] Performance: Lighthouse score > 90 (Performance, Accessibility, Best Practices, SEO)
- [ ] Core Web Vitals passing (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- [ ] No console errors in browser DevTools

**Testing Procedure:**
```bash
# Test production build locally before deployment
npm run build && npm run start
```

### 11.4 Branch Preview Deployments

**Automatic Previews:**
- Vercel automatically creates preview deployments for all Git branches
- Preview URLs: `https://<branch-name>-humaneersv3.vercel.app`
- **Use Case**: Review changes before merging to `main`

**Environment Variables for Previews:**
- Preview deployments use **Preview** environment variables
- Configure separate Zoho/Datadog tokens for non-production testing
- **Security**: Never use production API keys in preview environments

### 11.5 Rollback Procedures

**Instant Rollback (Vercel Dashboard):**
1. Navigate to Project > Deployments
2. Find the last known stable deployment
3. Click "..." menu > "Promote to Production"
4. Confirm rollback

**Git-Based Rollback:**
```bash
# Identify the last stable commit
git log --oneline

# Revert to stable commit
git revert <commit-hash>

# Push to trigger new deployment
git push origin main
```

### 11.6 Post-Deployment Monitoring

**Immediate Checks (first 24 hours):**
- Monitor Datadog RUM for error spikes
- Check Vercel Analytics for traffic anomalies
- Verify Zoho CRM lead submissions are processing
- Review server logs for 500 errors

**Ongoing Monitoring:**
- Weekly Lighthouse audits
- Monthly dependency updates (`npm outdated`)
- Quarterly security audits

## 12. Version History & Roadmap

### Version 0.2.0 (Current)
**Status**: Stable  
**Date**: January 2026  
**Focus**: Core website foundation with ContactModal system, Pricing page, and client care features

---

### Version 0.3.0 (Planned) - Design System Enhancement Plan
**Target Date**: Q1 2026  
**Focus**: Strategic design enhancements based on competitive analysis

Following a comprehensive analysis of industry-leading enterprise SaaS design patterns (specifically Omnissa.com), the following strategic enhancements have been identified for integration into the Humaneers brand experience:

#### High-Priority Enhancements (P0)

**1. Interactive Solution Switcher**
- **Current State**: Static card grid for "Our Expertise" section
- **Enhancement**: Implement circular icon-based navigation system for toggling between services (Managed IT, Brand Growth, Family Protection, Fractional Leadership)
- **Rationale**: Reduces scrolling fatigue, increases engagement, better showcases multi-service offering
- **Technical Approach**: React component with state management, Framer Motion transitions
- **Business Impact**: Higher engagement rates, improved user comprehension of service breadth

**2. Elevated Social Proof & Authority Badges**
- **Current State**: SOC 2 and US-based badges displayed as standard elements
- **Enhancement**: Create glassmorphic featured trust card in hero section
- **Content Focus**:
  - "Trusted by 200+ businesses" with specific ROI statistics
  - "Invitation-only for 8 years. Now open to all" heritage messaging
  - Client logos or industry certifications (if available)
- **Rationale**: Omnissa-style authority positioning builds immediate enterprise credibility
- **Business Impact**: Faster trust-building, improved conversion rates

**3. Directional Arrow CTAs**
- **Current State**: Text-only CTA buttons
- **Enhancement**: Add directional arrows (→) to all primary CTAs
- **Technical Implementation**: Update Button component with conditional `<ArrowRight />` from Lucide React
- **Rationale**: Psychological nudge toward action, signals "next step" in user journey
- **Business Impact**: Projected 5-15% increase in click-through rates

#### Medium-Priority Enhancements (P1)

**4. Glassmorphism & Depth Layering**
- **Current State**: Flat white cards (`bg-white rounded-2xl shadow-xl`)
- **Enhancement**: Semi-transparent, blurred card backgrounds with depth layering
- **CSS Pattern**:
  ```css
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  ```
- **Design Philosophy Alignment**: Enhances "Modern Craftsman" aesthetic (precision + artisan warmth)
- **Technical Considerations**: Accessibility (contrast ratios), performance (GPU usage for backdrop-filter)

**5. Dual-Layer Navigation Architecture**
- **Current State**: Single-layer navigation combining all links
- **Enhancement**: Split navigation into two layers:
  - **Top Utility Bar**: "Get Support" | "Client Portal" | "Partners" (secondary actions)
  - **Primary Navbar**: "Who We Help" | "Services" | "Pricing" | "Resources" (primary journey)
- **Rationale**: Reduces cognitive load, aligns with enterprise UX patterns
- **Business Impact**: Improved navigation efficiency, reduced bounce rates

**6. Rich Gradient Backgrounds**
- **Current State**: Solid Oxford Blue and Copper colors
- **Enhancement**: Implement gradient overlays:
  - Hero: `linear-gradient(135deg, #1B263B 0%, #2D3E5F 100%)`
  - Copper CTAs: `linear-gradient(135deg, #B87333 0%, #a0632a 100%)`
- **Rationale**: Adds visual depth while maintaining brand guidelines
- **Design Constraint**: Must not compromise accessibility or brand recognition

#### Strategic Enhancements (P2)

**7. Trust Center Page**
- **Purpose**: Dedicated transparency hub for enterprise buyers
- **Content**:
  - SOC 2 compliance details and certificate
  - Security whitepapers and architecture diagrams
  - Privacy policy and data handling procedures
  - Incident response and business continuity plans
- **Rationale**: Table stakes for enterprise sales, differentiates from consumer-grade competitors
- **Target Audience**: CIOs, CTOs, Compliance Officers

**8. Card-Based Blog/Resource Grid**
- **Enhancement**: Implement clean grid layout with category labels, headlines, and "Read More" arrows
- **Rationale**: Improves content scannability, drives thought leadership traffic, supports SEO

#### Design Principles to Reject

The following Omnissa were evaluated and **deliberately excluded** from the roadmap:

1. **Mega Product Menus**: Humaneers service offering is intentionally focused; complex navigation hierarchies would create unnecessary friction
2. **Enterprise-Only Messaging**: Maintaining inclusive "businesses and families" positioning is a core differentiator
3. **Excessive White Space**: Multiple conversion paths and urgency require tighter information density

#### Implementation Priority Matrix

| Element | CTO Effort | CMO Impact | Priority | Est. Timeline |
|---------|-----------|------------|----------|---------------|
| Interactive Solution Switcher | Medium | High | **P0** | Sprint 1 |
| Elevated Social Proof | Low | High | **P0** | Sprint 1 |
| Directional Arrow CTAs | Low | Medium | **P1** | Sprint 1 |
| Glassmorphism | Medium | Medium | **P1** | Sprint 2 |
| Dual-Layer Navigation | Low | Medium | **P1** | Sprint 2 |
| Gradient Backgrounds | Low | Low | **P2** | Sprint 3 |
| Trust Center Page | High | High | **P2** | Sprint 3 |

---

### Version 0.3.1 (Planned) - Zoho Bookings Integration
**Target Date**: Q1 2026  
**Focus**: Streamlined booking and scheduling workflow

**Primary Feature**: Booking Calendar Component
- **Integration**: Zoho Bookings API
- **Functionality**:
  - Real-time availability display
  - Multi-service booking support (Sales Consultations, Technical Assessments, Family Protection Reviews)
  - Calendar sync (Google, Outlook, iCal)
  - Automated confirmation and reminder emails
  - Timezone intelligence for nationwide client base
- **User Experience**:
  - Branded calendar UI matching "Modern Craftsman" aesthetic
  - Mobile-responsive booking flow
  - Pre-populated contact information for authenticated users
  - Service-specific intake forms
- **Technical Architecture**:
  - Server-side API integration with Zoho Bookings
  - Rate limiting and abuse protection
  - Fallback to direct contact form if booking system unavailable
  - Structured logging for booking analytics
- **Business Impact**:
  - Reduced scheduling friction (eliminate email back-and-forth)
  - Improved lead qualification (service-specific booking types)
  - Enhanced premium positioning (automated concierge experience)

**Secondary Features**:
- Client Portal authentication flow
- Booking confirmation page with pre-meeting preparation checklist
- Calendar integration with existing ContactModal system

---

### Version 0.3.3 (Planned) - Client Portal
**Target Date**: TBD
**Focus**: Client Care Portal utilizing the UserContext system

**Features**:
- **Simulated Authentication**: Logic to handle user sessions without a backend database (using `UserContext`).
- **Client Dashboard**: Protected view for authenticated users on `/client-care` displaying system status key metrics.
- **Login Flow**: Frontend-only login form to restrict access to the dashboard.

---

## License
Copyright © 2026 Humaneers. All rights reserved.
