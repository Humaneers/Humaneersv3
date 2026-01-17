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
8. [Project Workflow](#project-workflow)

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
Enterprise Strategy. Small Business Soul.
We bring high-end IT and brand growth to businesses
across the United States.
```

### Button Copy Evolution

From plan.md, the brand moved away from "Talk to Sales" to:
- ✅ "Let's Get Started" (primary CTA)
- ✅ "Start a Conversation" (modal title)
- ✅ "Get Support" (support actions)

This reflects a more human, partnership-oriented approach.

---

## File References

Key files implementing these guidelines:

- **Design Tokens**: `src/styles/globals.css`
- **Layout & Navigation**: `src/components/Layout.tsx`
- **Global Styles**: `src/App.tsx`
- **Component Library**: `src/components/ui/*`
- **Button System**: `src/components/ui/button.tsx`
- **Brand Documentation**: `src/plan.md`

---

## Version

- **Last Updated**: January 2026
- **Design System**: Tailwind CSS v4.1.3
- **Component Library**: Radix UI + shadcn/ui
- **Animation**: Framer Motion
- **Color System**: CSS Custom Properties + OKLCH

---

## Project Workflow

- Review `TODO.md` at the start of work and keep updates aligned with current tasks.
- Note any completed items or new issues directly in `TODO.md`.

---

*This document serves as the single source of truth for all brand and design decisions across the Humaneers digital presence.*
