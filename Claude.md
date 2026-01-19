# Humaneers Brand Guidelines

> **Design Aesthetic**: Modern Craftsman
> **Brand Essence**: Enterprise Strategy. Small Business Soul.

This document defines the visual identity, design system, and brand voice for the Humaneers digital presence.

---

## Table of Contents
1. [Brand Identity](#brand-identity)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Component Patterns](#component-patterns)
6. [Interactions & Motion](#interactions--motion)
7. [Brand Voice & Tone](#brand-voice--tone)
8. [Development Workflow](#development-workflow)
9. [Technical Standards](#technical-standards)
10. [Project Workflow](#project-workflow)

---

## Brand Identity

### Aesthetic Philosophy
**Modern Craftsman** — A design approach that balances professional polish with approachable warmth. Think precision tooling meets artisan workshop. Every element should feel both technically competent and human-centered.

### Core Brand Values
- **Reliability**: Like a well-built tool, our design should inspire confidence
- **Transparency**: No hidden complexity, clear communication
- **Stewardship**: We care for our clients' digital presence as our own
- **Partnership**: Professional but never corporate, accessible but never casual

### Design Principles
1. **Clarity over cleverness**: Information should be immediately accessible
2. **Warmth in professionalism**: Technical expertise delivered with humanity
3. **Crafted details**: Small touches that show care and attention
4. **Purposeful restraint**: Every element earns its place

---

## Color System

### Primary Brand Colors

#### Oxford Blue
- **Hex**: `#1B263B`
- **Usage**: Headers, footers, navigation backgrounds, major sections, dark hero overlays
- **Psychology**: Authority, trust, professionalism, depth
- **When to use**:
  - Fixed header background (`Layout.tsx:40`)
  - Footer background (`Layout.tsx:341`)
  - Dark overlays on hero images
  - Navigation dropdown gradients
  - Mobile menu backgrounds

#### Copper
- **Hex**: `#B87333`
- **Hover**: `#a0632a` (darker shade for interaction)
- **Usage**: CTAs, accents, highlights, hover states, section dividers, status badges
- **Psychology**: Warmth, craftsmanship, energy, action
- **When to use**:
  - Primary action buttons ("Let's Get Started", "Subscribe")
  - Link hover states
  - Icon accents in feature lists
  - Section heading highlights
  - Border accents (footer top border)
  - Active/selected states in navigation

#### Cream/Beige
- **Hex**: `#F5F1E9` (main app background)
- **Alt**: `#efefef` (lighter variant)
- **Usage**: Page backgrounds, content areas requiring warmth
- **Psychology**: Approachability, comfort, paper/document feel
- **When to use**:
  - Main application background (`App.tsx:140`)
  - Alternative to pure white for reduced eye strain
  - Backgrounds requiring warmth over sterility

### UI Design System Colors

These colors power the component library and design tokens:

#### Primary (Dark Navy)
- **Hex**: `#030213`
- **Usage**: Default button backgrounds, primary UI elements, headings
- **Foreground**: `oklch(1 0 0)` (pure white)

#### Secondary (Light Purple)
- **OKLCH**: `oklch(0.95 0.0058 264.53)`
- **Usage**: Secondary button backgrounds, subtle highlights
- **Foreground**: `#030213`

#### Muted (Grays)
- **Background**: `#ececf0` (light gray)
- **Foreground**: `#717182` (medium gray)
- **Usage**: Disabled states, subtle backgrounds, secondary text
- **Examples**: Input backgrounds, muted cards, helper text

#### Accent (Light Gray)
- **Hex**: `#e9ebef`
- **Usage**: Hover states, card backgrounds, separators
- **Foreground**: `#030213`

#### Text Default
- **Hex**: `#4E596F` (muted slate blue)
- **Usage**: Body copy, paragraph text across the site
- **Applied globally**: `App.tsx:140` sets this as base text color

#### Destructive (Error Red)
- **Hex**: `#d4183d`
- **Usage**: Error states, destructive actions, critical alerts
- **Foreground**: `#ffffff`

#### Input & Form Colors
- **Input Background**: `#f3f3f5` (light gray, slightly warm)
- **Switch Background**: `#cbced4` (medium gray)
- **Border**: `rgba(0, 0, 0, 0.1)` (subtle 10% black)

### Dark Mode Colors

When `.dark` class is applied:
- **Background**: `oklch(0.145 0 0)` (very dark gray)
- **Foreground**: `oklch(0.985 0 0)` (near white)
- **Primary**: `oklch(0.985 0 0)` (inverted for dark mode)
- **Destructive**: `oklch(0.396 0.141 25.723)` (adjusted red)

### Chart & Data Visualization Colors
- **Chart 1**: `oklch(0.646 0.222 41.116)` (orange)
- **Chart 2**: `oklch(0.6 0.118 184.704)` (cyan)
- **Chart 3**: `oklch(0.398 0.07 227.392)` (blue)
- **Chart 4**: `oklch(0.828 0.189 84.429)` (yellow)
- **Chart 5**: `oklch(0.769 0.188 70.08)` (lime)

### Sidebar/Navigation Colors
- **Sidebar Background**: `oklch(0.985 0 0)` (near white)
- **Sidebar Foreground**: `oklch(0.145 0 0)` (dark)
- **Sidebar Primary**: `#030213`
- **Sidebar Accent**: `oklch(0.97 0 0)`
- **Sidebar Border**: `oklch(0.922 0 0)`

---

## Typography

### Font Families

#### Sans Serif (Primary)
```css
--font-sans: ui-sans-serif, system-ui, sans-serif,
  "Apple Color Emoji", "Segoe UI Emoji",
  "Segoe UI Symbol", "Noto Color Emoji"
```
**Usage**: All UI, headings, body copy, navigation

#### Serif
```css
--font-serif: ui-serif, Georgia, Cambria,
  "Times New Roman", Times, serif
```
**Usage**: Reserved for special editorial content (currently unused)

#### Monospace
```css
--font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco,
  Consolas, "Liberation Mono", "Courier New", monospace
```
**Usage**: Code snippets, technical specifications, reference numbers

### Type Scale

| Size | rem | px | Usage |
|------|-----|----|----|
| `text-xs` | 0.75rem | 12px | Tiny labels, badges, metadata |
| `text-sm` | 0.875rem | 14px | Small text, captions, helper text |
| `text-base` | 1rem | 16px | Body copy, standard text |
| `text-lg` | 1.125rem | 18px | Emphasized body, subheadings |
| `text-xl` | 1.25rem | 20px | Large body, small headings |
| `text-2xl` | 1.5rem | 24px | H3, section headings |
| `text-3xl` | 1.875rem | 30px | H2, page subheadings |
| `text-4xl` | 2.25rem | 36px | H1, page titles |
| `text-5xl` | 3rem | 48px | Hero headings |
| `text-6xl` | 3.75rem | 60px | Large hero text |
| `text-7xl` | 4.5rem | 72px | Extra large display |

### Font Weights

- **Light**: 300 (rarely used, special emphasis)
- **Normal**: 400 (body text, inputs)
- **Medium**: 500 (headings, labels, buttons, slight emphasis)
- **Semibold**: 600 (stronger headings, important labels)
- **Bold**: 700 (major headings, strong emphasis)

### Base Typography Rules

From `globals.css:139-174`:
```css
h1 { font-size: var(--text-2xl); font-weight: 500; line-height: 1.5; }
h2 { font-size: var(--text-xl); font-weight: 500; line-height: 1.5; }
h3 { font-size: var(--text-lg); font-weight: 500; line-height: 1.5; }
h4 { font-size: var(--text-base); font-weight: 500; line-height: 1.5; }
label { font-size: var(--text-base); font-weight: 500; line-height: 1.5; }
button { font-size: var(--text-base); font-weight: 500; line-height: 1.5; }
input { font-size: var(--text-base); font-weight: 400; line-height: 1.5; }
```

### Line Heights
- **Tight**: 1.25 (compact headings)
- **Snug**: 1.375 (tight paragraphs)
- **Normal**: 1.5 (default, comfortable reading)
- **Relaxed**: 1.625 (generous spacing)

### Letter Spacing
- **Tight**: -0.025em (large headings)
- **Normal**: 0 (default)
- **Wide**: 0.025em (subheadings)
- **Wider**: 0.05em (labels)
- **Widest**: 0.1em (uppercase labels, badges)

---

## Spacing & Layout

### Base Spacing Unit
- **Unit**: `--spacing: 0.25rem` (4px)
- All spacing should be multiples of this base unit for consistency

### Border Radius System

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-xs` | 0.125rem (2px) | Tiny elements, badges |
| `--radius-sm` | 0.375rem (6px) | Small buttons, inputs |
| `--radius-md` | 0.5rem (8px) | Medium components |
| `--radius-lg` | 0.625rem (10px) | **Default radius**, cards, modals |
| `--radius-xl` | 0.75rem (12px) | Large cards |
| `--radius-2xl` | 1rem (16px) | Hero sections, major containers |

**Note**: Default `--radius` is `0.625rem` (10px)

### Container Sizes

For `@container` queries:
- xs: 20rem (320px)
- sm: 24rem (384px)
- md: 28rem (448px)
- lg: 32rem (512px)
- xl: 36rem (576px)
- 2xl: 42rem (672px)
- 3xl: 48rem (768px)
- 4xl: 56rem (896px)
- 6xl: 72rem (1152px)

### Responsive Breakpoints

Tailwind defaults (implicit in the design):
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

---

## Component Patterns

### Buttons

**File**: `src/components/ui/button.tsx`

#### Variants

1. **Default**
   - Background: `bg-primary` (#030213)
   - Text: `text-primary-foreground` (white)
   - Hover: `hover:bg-primary/90`
   - Usage: Primary actions

2. **Destructive**
   - Background: `bg-destructive` (#d4183d)
   - Text: `text-destructive-foreground` (white)
   - Hover: `hover:bg-destructive/90`
   - Usage: Delete, cancel, destructive actions

3. **Outline**
   - Border: `border-input`
   - Background: `bg-background`
   - Hover: `hover:bg-accent`
   - Usage: Secondary actions

4. **Secondary**
   - Background: `bg-secondary`
   - Text: `text-secondary-foreground`
   - Hover: `hover:bg-secondary/80`
   - Usage: Alternative actions

5. **Ghost**
   - Background: transparent
   - Hover: `hover:bg-accent`
   - Usage: Subtle actions, navigation

6. **Link**
   - Text: `text-primary`
   - Underline: `underline-offset-4 hover:underline`
   - Usage: Inline links, text-style actions

#### Sizes

- **Default**: `h-10 px-4 py-2` — Standard buttons
- **sm**: `h-9 px-3` — Compact UI, tight spaces
- **lg**: `h-11 px-8` — Prominent CTAs, hero sections
- **icon**: `h-10 w-10` — Icon-only buttons

#### Base Styles
All buttons share:
- `rounded-md`
- `text-sm`
- `font-medium`
- `ring-offset-background`
- Focus ring on focus-visible

### Cards

**File**: `src/components/ui/card.tsx`

- **Card Container**: `gap-6 rounded-xl border`
- **Card Header**: `gap-1.5 px-6 pt-6`
- **Card Content**: `px-6 py-0`
- **Card Footer**: `flex px-6 pb-6`

### Badges

**File**: `src/components/ui/badge.tsx`

- **Base**: `rounded-md border px-2 py-0.5 text-xs font-medium`
- **Icon sizing**: `[&>svg]:size-3` (responsive icon sizing)

### Inputs

**File**: `src/components/ui/input.tsx`

- **Height**: `h-9`
- **Padding**: `px-3 py-1`
- **Border radius**: `rounded-md`
- **Background**: `bg-input-background` (#f3f3f5)
- **Focus**: Ring styling with offset

---

## Interactions & Motion

### Animation Library
The site uses **Framer Motion** (`motion/react`) for animations.

### Transition Principles

1. **Duration**: Keep transitions quick (0.3s or less) for UI interactions
2. **Easing**: Use natural easing curves (ease-in-out for most transitions)
3. **Purpose**: Animate to guide attention, not for decoration

### Common Patterns

#### Hover States
- **Color transitions**: 0.2-0.3s ease
- **Opacity**: Use 90% opacity for hover (`hover:bg-primary/90`)
- **Shadow**: Subtle elevation changes (shadow-md → shadow-lg)

**Example from Layout.tsx**:
```tsx
className="bg-[#B87333] hover:bg-[#a0632a]
  text-white transition-all shadow-md hover:shadow-lg"
```

#### Focus States
- **Ring**: `focus-visible:ring-2 focus-visible:ring-ring`
- **Ring offset**: `focus-visible:ring-offset-2`
- **Outline**: `focus-visible:outline-none` (use ring instead)

#### Page Transitions
From `Home.tsx:71-74`:
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
```

**Pattern**: Fade in + subtle upward movement on page load

#### Mobile Menu Animation
From `Layout.tsx:270-276`:
```tsx
<motion.div
  initial={{ opacity: 0, height: 0 }}
  animate={{ opacity: 1, height: "auto" }}
  exit={{ opacity: 0, height: 0 }}
>
```

**Pattern**: Height + opacity for drawer/accordion animations

### Scroll Behavior
- Header changes on scroll (shadow appears, padding reduces)
- Smooth scroll to top on view changes (`App.tsx:70-72`)

---

## Brand Voice & Tone

### Brand Personality

**Modern Craftsman** translates to:
- **Professional but approachable**: We know our craft, but we explain it clearly
- **Technical but human**: Expertise delivered with warmth
- **Confident but humble**: We're good at what we do, but service-focused
- **Transparent but polished**: Honest communication with refined presentation

### Voice Characteristics

1. **Clear over clever**
   - ✅ "Enterprise Strategy. Small Business Soul."
   - ❌ "Synergizing paradigms for SMB digital transformation"

2. **Active and direct**
   - ✅ "Let's Get Started"
   - ❌ "Initiate Engagement Process"

3. **Warm professionalism**
   - ✅ "Making your products billboard-ready"
   - ❌ "Optimizing brand visibility metrics"

4. **Specific and concrete**
   - ✅ "SOC 2 Type II Compliant"
   - ❌ "Industry-leading security standards"

### Thematic Keywords

Use these themes and keywords to maintain brand consistency:

**Core Themes**:
- Modern Craftsman
- Enterprise Strategy, Small Business Soul
- Reliability & Trust
- Transparency & Stewardship
- Partnership not vendor relationship

**Service Language**:
- Managed IT (not "IT Support")
- Brand Growth (not "Marketing Services")
- Family Protection (not "Home Security")
- Fractional Leadership (not "Consulting")
- Strategic Planning (not "Advisory")

**Value Props**:
- "Cloud-native infrastructure that just works"
- "No downtime, just uptime"
- "Enterprise-grade at SMB prices"
- "Your own CIO/CMO without the salary cap"
- "Closing the home-office security gap"

**Tone Adjusters**:
- Technical expertise + human touch
- Professional polish + approachable warmth
- Confident competence + humble service
- Clear communication + crafted details

### Messaging Examples

**Hero Copy** (Home.tsx):
```
Enterprise Strategy.
Small Business Soul.

IT, security, and brand growth for teams that
think big — even if they're super-small.
```

**Service Descriptions**:
- "Cloud-native infrastructure that just works. No downtime, just uptime."
- "Making your products billboard-ready with enterprise-grade strategy."
- "Closing the home-office security gap to keep your family safe."

**Footer Tag** (Layout.tsx):
```
Enterprise strategy for businesses and families.
Built with precision, delivered with soul.
```

### Button Copy Strategy

**Routing Logic**:
- When mentioning **pricing/plans**: Link to `/pricing` page → "View Pricing"
- For **consultation/custom solutions**: Link to `/talk-to-sales` → "Let's Get Started"
- Support-related: → "Get Support"

**Rationale**: Users expecting to see plans should see pricing first, not a sales form. Sales form is for custom/consultation requests.

### Footer Messaging

**Copyright Banner** (Layout.tsx:465-490):
- Primary line: "Built by humans with ❤️+☕️ in Arizona & Texas."
- Legal text: Standard copyright and trademark attribution
- SOC 2 compliance badge: "SOC 2 Type II Compliant"
- Supporting nonprofits badge: "Supporting 501(c)(3) Organizations"

**Purpose**: Reinforces "Modern Craftsman" brand personality with warm, human touch while maintaining professional legal compliance.

**Tone**: Approachable yet professional, specific geographic anchoring (Arizona & Texas reinforces local presence mentioned elsewhere in footer).

**Design Pattern**:
- `text-gray-400` for "Built by humans" text (lighter, friendlier)
- `text-gray-500` for legal copyright (slightly darker, more formal)
- Responsive layout: stacks vertically on mobile, horizontal on desktop
- Emojis (❤️☕️) add warmth without compromising professionalism

---

## File References

Key files implementing these guidelines:

- **Design Tokens**: `src/styles/globals.css`
- **Layout & Navigation**: `src/components/Layout.tsx`
- **Global Styles**: `src/App.tsx`
- **Component Library**: `src/components/ui/*`
- **Button System**: `src/components/ui/button.tsx`
- **Brand Documentation**: `src/plan.md`

### Footer Implementation
- **Copyright Banner**: `src/components/Layout.tsx:465-490`
- **Meta Links**: `src/data/navigation.tsx:198-209`
- **System Status**: Moved from header utility links to footer meta links (Jan 2026)

---

## Versioning
- **Current Version**: 0.1.0
- **System**: SemVer-like patch increment on every release
- **Command**: `npm run release`
- **Output**: Updates `package.json` and `src/version.ts`
- **Automation**: The `release` script automates:
  1. Incrementing the patch version
  2. Committing changes
  3. Pushing to remote

**How to Release**:
Instead of `git push` for deployment, run:
```bash
npm run release
```
This ensures the version number is bumped and captured in the deployment.

---

## Design System Summary
- **Design System**: Tailwind CSS v4.1.3
- **Component Library**: Radix UI + shadcn/ui
- **Animation**: Framer Motion
- **Color System**: CSS Custom Properties + OKLCH

---

## AI Usage Policy

### Human-First, AI-Second Approach

Humaneers follows a strict principle: **Technology should amplify human expertise, not replace it.**

#### Core Principles

1. **Human Decision-Making**
   - All strategic decisions, client communications, and critical recommendations are made by experienced professionals
   - AI never makes decisions autonomously
   - Final review and accountability always rest with humans

2. **AI as Quality Enhancement**
   - We use machine learning tools to:
     - Catch errors and improve code quality
     - Optimize configurations and performance
     - Accelerate research and documentation
     - Generate design variations for review
   - These tools help us deliver higher quality work faster

3. **Transparency**
   - If AI-assisted tools are used on your project, we disclose it
   - Clients always know how their work is being produced
   - We maintain clear records of tool usage

4. **Accountability**
   - We review, validate, and take full responsibility for all deliverables
   - Quality over speed: AI helps produce better work, not just faster work
   - Human judgment validates every output

#### Implementation in Practice

**Code Development**:
- AI-assisted code completion and suggestions (GitHub Copilot, Cursor)
- Human review and testing of all code before deployment
- Architecture decisions made by senior developers

**Client Communication**:
- No AI-generated emails or responses to clients
- All proposals and strategic recommendations written by humans
- Documentation may use AI for grammar/clarity, with human editing

**Design Work**:
- AI may generate design variations or suggestions
- Final design decisions made by human designers
- Client presentations always human-crafted

See our public [Colophon](https://humaneers.dev/colophon) for the full AI usage policy.

---

## Development Workflow

### Overview
This workflow ensures code quality, brand consistency, and proper task management throughout the development lifecycle.

### Before Starting Work

1. **Review Current Priorities**
   - Check `TODO.md` for High/Medium/Low priority items
   - Identify which task aligns with current sprint or business needs
   - Verify dependencies between tasks

2. **Understand Brand Requirements**
   - Review relevant sections of CLAUDE.md (Color System, Typography, Component Patterns)
   - Ensure familiarity with "Modern Craftsman" aesthetic principles
   - Check Brand Voice & Tone for any copy changes

3. **Technical Preparation**
   - Verify development environment is up to date
   - Review [Technical Standards](#technical-standards) for applicable patterns
   - Check existing component library before building new components

### During Development

1. **Brand Consistency**
   - Use established color tokens (Oxford Blue `#1B263B`, Copper `#B87333`, Cream `#F5F1E9`)
   - Follow typography scale and font weights (see [Typography](#typography))
   - Apply correct spacing using 4px base unit
   - Use standard border radius (`--radius-lg`: 10px default)

2. **Component Patterns**
   - Reuse existing UI components from `src/components/ui/`
   - Follow button variants and sizing (see [Component Patterns](#component-patterns))
   - Maintain consistent card, badge, and input styling
   - Reference `Layout.tsx`, `Home.tsx` for established patterns

3. **Error Handling**
   - Implement error boundaries around major feature sections
   - Provide user-friendly error messages aligned with brand voice
   - Include fallback UI that maintains visual consistency

4. **Loading States**
   - Add skeleton screens for async content
   - Use loading indicators for button actions
   - Maintain layout stability during loading (prevent layout shift)

5. **Responsive Design**
   - Test on mobile (sm: 640px), tablet (md: 768px), desktop (lg: 1024px+)
   - Ensure touch targets are minimum 44x44px
   - Verify navigation works on all screen sizes

### Before Committing

**Quality Checklist:**
- [ ] **Brand Consistency**: Colors, typography, spacing match guidelines
- [ ] **Component Patterns**: Using established UI components correctly
- [ ] **Error Boundaries**: Critical sections have error handling
- [ ] **Loading States**: Async operations show appropriate feedback
- [ ] **Mobile Responsive**: Tested across breakpoints
- [ ] **Accessibility**: Keyboard navigation, ARIA labels, color contrast
- [ ] **Documentation**: JSDoc comments on new functions/components
- [ ] **Bundle Impact**: No unnecessary dependencies added
- [ ] **SEO**: Meta tags, semantic HTML, heading hierarchy
- [ ] **TODO.md**: Updated with completed items or new issues

**Testing Requirements:**
- Manual testing on Chrome, Safari, Firefox
- Mobile device testing (iOS Safari, Android Chrome)
- Keyboard-only navigation test
- Screen reader compatibility check (VoiceOver/NVDA)

### Code Review Checklist

When reviewing PRs or your own code:

1. **Visual Consistency**
   - Matches Figma/design specifications
   - Follows "Modern Craftsman" aesthetic
   - Proper use of brand colors and typography

2. **Technical Quality**
   - No console errors or warnings
   - Proper TypeScript types (no `any` unless justified)
   - Error boundaries present
   - Loading states implemented

3. **Performance**
   - No unnecessary re-renders
   - Images optimized and lazy-loaded
   - Code-splitting where appropriate
   - Bundle size impact assessed

4. **User Experience**
   - Intuitive interactions
   - Clear feedback on user actions
   - Graceful error handling
   - Smooth animations (0.3s or less)

5. **Accessibility**
   - WCAG 2.1 AA compliance
   - Keyboard navigation works
   - Screen reader friendly
   - Sufficient color contrast (4.5:1 for text)

---

## Technical Standards

### Performance Best Practices

#### Bundle Optimization
- **Code Splitting**: Use dynamic imports for routes and heavy components
- **Tree Shaking**: Import only what you need (e.g., `import { Button } from './button'` not `import * as UI from './ui'`)
- **Lazy Loading**: Use `React.lazy()` for non-critical components
- **Asset Optimization**: Compress images, use WebP format, implement lazy loading

**Example**:
```tsx
// Good: Code splitting for routes
const ManagedIT = lazy(() => import('./pages/ManagedIT'))

// Good: Specific imports
import { Button } from '@/components/ui/button'

// Bad: Importing everything
import * as Icons from 'lucide-react'
```

#### Performance Targets
- **First Contentful Paint**: < 1.8s
- **Time to Interactive**: < 3.8s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

#### Monitoring
- Use Lighthouse for performance audits
- Check bundle size with `npm run build`
- Monitor Core Web Vitals in production

### Error Handling

#### Error Boundary Pattern

**File Structure**:
```
src/components/ErrorBoundary.tsx  # Reusable error boundary component
```

**Implementation**:
```tsx
import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F1E9]">
          <div className="text-center">
            <h2 className="text-2xl font-medium text-[#1B263B] mb-4">
              Something went wrong
            </h2>
            <p className="text-[#4E596F] mb-6">
              We're working on fixing this. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#B87333] hover:bg-[#a0632a] text-white px-6 py-3 rounded-md"
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
```

**Usage**:
```tsx
// Wrap major sections or routes
<ErrorBoundary>
  <ManagedITPage />
</ErrorBoundary>
```

#### User-Friendly Error Messages

Follow brand voice for error states:
- ✅ "We couldn't load that page. Let's try again."
- ❌ "Error 404: Resource not found"

- ✅ "Something went wrong on our end. We're on it."
- ❌ "Unhandled exception in component tree"

### Component Development

#### When to Use Animations

Follow these principles from [Interactions & Motion](#interactions--motion):

**Do Animate**:
- Page transitions (fade in + subtle upward movement)
- Hover states (color, shadow, transform)
- Modal/drawer open/close
- Loading state changes
- Success/error feedback

**Don't Animate**:
- Initial page load (except hero section)
- Every small UI change
- Decorative purposes only
- Distracting movements

**Service Card Animations** (Future Enhancement):
```tsx
// Hover effect example for service cards
<motion.div
  whileHover={{ y: -4, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
  transition={{ duration: 0.2 }}
  className="service-card"
>
  {/* Card content */}
</motion.div>
```

#### Loading State Patterns

**Button Loading**:
```tsx
<Button disabled={isLoading}>
  {isLoading ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Submitting...
    </>
  ) : (
    'Submit'
  )}
</Button>
```

**Skeleton Screens**:
```tsx
// For content areas
{isLoading ? (
  <div className="space-y-4">
    <Skeleton className="h-12 w-full" />
    <Skeleton className="h-32 w-full" />
    <Skeleton className="h-8 w-2/3" />
  </div>
) : (
  <ContentComponent data={data} />
)}
```

**Full Page Loading**:
```tsx
if (isLoading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-[#B87333]" />
    </div>
  )
}
```

### Documentation Standards

#### Component Documentation

Every component should have:

1. **File Header Comment**:
```tsx
/**
 * ServiceCard Component
 *
 * Displays a service offering with icon, title, description, and CTA.
 * Used on the homepage and service pages.
 *
 * @example
 * <ServiceCard
 *   icon={<Server />}
 *   title="Managed IT"
 *   description="Cloud-native infrastructure that just works"
 *   href="/managed-it"
 * />
 */
```

2. **Prop Type Documentation**:
```tsx
interface ServiceCardProps {
  /** Icon component to display (from lucide-react) */
  icon: ReactNode
  /** Service title (2-4 words, title case) */
  title: string
  /** Short description (under 100 characters) */
  description: string
  /** Link destination */
  href: string
  /** Optional CSS classes to apply */
  className?: string
}
```

#### JSDoc Comments

Add JSDoc to utility functions:

```tsx
/**
 * Formats a phone number to (XXX) XXX-XXXX format
 * @param phone - Raw phone number string (digits only)
 * @returns Formatted phone number or original if invalid
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length !== 10) return phone
  return `(${cleaned.slice(0,3)}) ${cleaned.slice(3,6)}-${cleaned.slice(6)}`
}
```

### Accessibility Standards

#### Required Practices

1. **Semantic HTML**: Use proper heading hierarchy (h1 → h2 → h3)
2. **ARIA Labels**: Add `aria-label` to icon-only buttons
3. **Keyboard Navigation**: All interactive elements reachable via Tab
4. **Focus Indicators**: Visible focus rings (never remove outlines without replacement)
5. **Color Contrast**: Minimum 4.5:1 for text, 3:1 for UI components

#### Testing Checklist

- [ ] Tab through entire page (logical order)
- [ ] Shift+Tab works in reverse
- [ ] Enter/Space activates buttons and links
- [ ] Escape closes modals/dropdowns
- [ ] Focus visible on all interactive elements
- [ ] Screen reader announces all content correctly
- [ ] Images have alt text
- [ ] Form inputs have labels

### Content & SEO Standards

#### Service Page Content

Each service page should include:

1. **Hero Section**: Clear value proposition (1-2 sentences)
2. **Features List**: 3-6 key features with icons
3. **Benefits**: How it helps the customer (not just what it is)
4. **Social Proof**: Case studies, testimonials, or trust indicators
5. **CTA**: Context-aware call to action (pre-fills interest)

**Content Review Checklist**:
- [ ] Follows brand voice (clear over clever, warm professionalism)
- [ ] No jargon without explanation
- [ ] Active voice, direct statements
- [ ] Specific and concrete (not vague promises)
- [ ] Includes relevant keywords naturally
- [ ] Scannable (headings, bullets, short paragraphs)

#### SEO Meta Tags

Every page needs:

```tsx
<Helmet>
  <title>Service Name | Humaneers</title>
  <meta name="description" content="150-160 character description with primary keyword" />
  <meta property="og:title" content="Service Name | Humaneers" />
  <meta property="og:description" content="Same as meta description" />
  <meta property="og:image" content="/og-image.jpg" />
  <meta name="twitter:card" content="summary_large_image" />
</Helmet>
```

**SEO Checklist**:
- [ ] Title tag: 50-60 characters, includes brand
- [ ] Meta description: 150-160 characters, compelling
- [ ] H1 tag: One per page, matches title intent
- [ ] Internal links: Link to related services
- [ ] Image alt text: Descriptive, includes context
- [ ] URL structure: Clean, readable, keyword-rich

---

## Project Workflow

### Task Management

1. **Review TODO.md** at the start of work
   - Check High/Medium/Low priority sections
   - Identify blockers or dependencies
   - Choose task aligned with current sprint

2. **During Work**
   - Follow [Development Workflow](#development-workflow) practices
   - Keep updates aligned with current tasks
   - Reference [Technical Standards](#technical-standards) as needed

3. **Completion**
   - Update `TODO.md` with completed items
   - Move item from current section to "Completed ✅"
   - Note any new issues discovered during work
   - Add date stamp to major completions

### Priority System

From `TODO.md`:

- **High Priority**: Blockers, critical features, deployment dependencies
- **Medium Priority**: Important but not blocking, quality improvements
- **Low Priority**: Future enhancements, nice-to-haves, long-term improvements

### Documentation Updates

- Keep CLAUDE.md updated when design patterns change
- Update TODO.md immediately when completing tasks
- Add inline code comments for complex logic
- Update component documentation when props change

---

*This document serves as the single source of truth for all brand, design, and development decisions across the Humaneers digital presence.*
