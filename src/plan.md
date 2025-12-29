# Project Plan: Humaneers Web Application

## Current State
The application is a React Single Page Application (SPA) styled with Tailwind CSS. It serves as the digital presence for "Humaneers," an IT and brand consultancy. The design follows a "Modern Craftsman" aesthetic (Oxford Blue, Copper, Cream).

### Key Features Implemented:
- **Routing**: Custom view-based routing in `App.tsx`.
- **Layout**: Sticky header, responsive navigation with mega-menus, comprehensive footer.
- **Pages**:
  - Home, Pricing, About, Contact
  - Solutions: Managed IT, Brand Growth, Family Protection, Fractional Leadership
  - Industries: Retail, Healthcare, Hospitality, etc.
  - Resources: Knowledge Base, Status, Colophon, Ethics
  - Legal: Terms, Privacy
- **Interactive Elements**:
  - `TalkToSalesModal` for capturing leads.
  - Interactive "Definition Tooltips" for technical terms.
  - Service Status dashboard (static mock).

## Change Log

### Session: Trust & Reliability Overhaul (Current)
*Focus: Redesigning key pages for "Modern Craftsman" aesthetic, ensuring reliability, and fixing layout bugs.*

- **`/components/TalkToSalesModal.tsx`**
  - **Refactor**: Switched to a cleaner, native-style single-column layout.
  - **Optimization**: Removed sidebar to prevent content squishing. Reduced max-width to `sm:max-w-[600px]` for a focused experience.
- **`/components/views/Pricing.tsx`**
  - **Bug Fix**: Fixed the "Nonprofit Tab" layout issue where a single card would stretch uncomfortably wide. Implemented adaptive grid sizing (max-w-md for single items).
- **`/components/views/NonProfits.tsx`**
  - **Reinvented Design (v2)**: Completely overhauled the page structure to align with "Modern Craftsman" aesthetic.
  - **New Hero**: Split-screen layout with emotive imagery and strong typography.
  - **"Open Ledger" Pricing**: Implemented a unique pricing display that mimics an accounting ledger to transparently show the 501(c)(3) discount as a "Mission Grant".
  - **Editorial Content**: Added "The Stewardship Gap" manifesto section.
  - **Blueprint Features**: Styled feature cards with technical/architectural details (e.g., "REF: NPO-2025-A").
- **Brand Humanization (Replaced "Talk to Sales")**:
  - Updated CTA buttons in Header and Mobile Menu to "Let's Get Started".
  - Updated browser title in `TalkToSales.tsx` to "Start a Conversation".
  - Updated Contact form dropdown option to "Sales & Strategy (Start a Conversation)".
- **Investigated "Moxie" Iframe Error**:
  - User reported `[iFrameSizer] ... IFrame(moxie-web-devs-website-form) not found`.
  - Confirmed this is caused by a local browser extension (Moxie) injecting code.
  - **Fix Implemented**: Added a console suppression script in `App.tsx` to filter out these specific extension-generated error messages so they no longer clutter the development console.
- **`/components/views/Status.tsx`**
  - Created new static "System Status" view.
  - Added route to `App.tsx`.
- **`/components/views/Ethics.tsx`**
  - Removed motion animations to improve page stability and seriousness.
  - Refined reporting form layout.
- **`/components/layout/Layout.tsx`**
  - Resolved `ReferenceError` (missing icon import).
- **`/components/layout/Footer.tsx`**
  - Fixed HTML nesting issues (removed buttons inside buttons).

## Remaining Tasks / Missing Features

### Content & Pages
- [ ] **Blog**: Currently missing. Needs a `Blog` view in `App.tsx` and a listing/post component.
- [ ] **Careers**: Currently missing. Needs a `Careers` view in `App.tsx` and a job listing component.
- [ ] **Service Detail Pages**: While high-level pages exist, deeper "sub-service" pages could be beneficial if content allows.

### Functionality
- [ ] **Backend Integration for Forms**:
  - `Contact.tsx`: Currently logs to console. Needs API endpoint.
  - `TalkToSales.tsx` & `TalkToSalesModal.tsx`: Currently logs to console. Needs API endpoint.
  - `Ethics.tsx`: Reporting form logs to console. Needs secure submission endpoint.
- [ ] **Real-time Status**: `Status.tsx` uses hardcoded mock data. Needs to fetch real data from an incident management system.
- [ ] **Resources & Knowledge Base**:
  - **Search**: The search bar in `Resources.tsx` is cosmetic. Needs implementation of search logic across the site content.
  - **Download Buttons**: The "Download PDF" buttons in `Resources.tsx` are non-functional placeholders.
  - **Article Links**: The "Read" buttons in the resource grid do not navigate to actual content.
- [ ] **Client Portal**:
  - "Open Portal" buttons currently redirect to the Contact page.
  - Needs actual authentication (Supabase Auth) and a protected dashboard view.

### Design & Polish
- [ ] **Accessibility Audit**: Ensure all colors meet WCAG contrast ratios (mostly done, but needs verification on lighter text).
- [ ] **Mobile Optimization**: Double-check complex tables or grids on small screens.
