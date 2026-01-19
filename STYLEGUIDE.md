# Humaneers Website Style Guide

> **Purpose**: Practical design and development standards for the Humaneers website. Use this alongside `Claude.md` for technical specs and `TODO.md` for task management.

---

## Quick Reference

### Brand Colors
- **Primary CTA Buttons**: `bg-brand-copper` (#B87333)
- **Hero Backgrounds**: `bg-brand-oxford` (#1B263B)
- **Page Backgrounds**: `bg-brand-cream` (#F5F1E9)
- **Text**: `text-brand-slate` (#4E596F)

### Typography Scale
- **Hero Headings**: `text-4xl md:text-7xl`
- **Page Titles**: `text-3xl md:text-5xl`
- **Section Headings**: `text-2xl md:text-3xl`
- **Body Text**: `text-base` (16px)

### Spacing
- **Section Padding**: `py-24`
- **Container**: `container mx-auto px-6`
- **Card Padding**: `p-8`

---

## 1. Brand Voice & Messaging

### Brand Essence
**"Modern Craftsman"** — Enterprise Strategy. Small Business Soul.

We deliver high-end IT and brand growth to businesses with the precision of a craftsman and the warmth of a trusted partner.

### Core Brand Values
- **Reliability**: Like a well-built tool, we inspire confidence
- **Transparency**: No hidden complexity, clear communication
- **Stewardship**: We care for clients' digital presence as our own
- **Partnership**: Professional but never corporate, accessible but never casual

### Design Principles
1. **Clarity over cleverness**: Information should be immediately accessible
2. **Warmth in professionalism**: Technical expertise delivered with humanity
3. **Crafted details**: Small touches that show care and attention
4. **Purposeful restraint**: Every element earns its place

---

## 2. Writing Style

### Voice Characteristics

#### Clear over Clever
✅ **Good**: "Enterprise Strategy. Small Business Soul."
❌ **Bad**: "Synergizing paradigms for SMB digital transformation"

✅ **Good**: "Cloud-native infrastructure that just works. No downtime, just uptime."
❌ **Bad**: "Leveraging next-gen cloud solutions for optimal operational efficiency"

#### Active and Direct
✅ **Good**: "Let's Get Started"
❌ **Bad**: "Initiate Engagement Process"

✅ **Good**: "We fix critical vulnerabilities and deploy security agents."
❌ **Bad**: "Critical vulnerabilities are addressed through our deployment protocols."

#### Warm Professionalism
✅ **Good**: "Making your products billboard-ready"
❌ **Bad**: "Optimizing brand visibility metrics"

✅ **Good**: "Managed IT that Sleeps So You Don't Have To"
❌ **Bad**: "24/7 Infrastructure Monitoring Services"

#### Specific and Concrete
✅ **Good**: "SOC 2 Type II Compliant"
❌ **Bad**: "Industry-leading security standards"

✅ **Good**: "Response within 15 minutes for critical issues"
❌ **Bad**: "Fast response times"

### Company Tagline
**Primary**: "Enterprise Strategy. Small Business Soul."

Use this tagline in:
- Footer copy
- Hero sections when appropriate
- Marketing materials
- Email signatures

### Service Terminology

Use these specific terms (not alternatives):
- **Managed IT** (not "IT Support" or "Tech Services")
- **Brand Growth** (not "Marketing Services" or "Digital Marketing")
- **Family Protection** (not "Home Security" or "Consumer IT")
- **Fractional Leadership** (not "Consulting" or "Advisory Services")
- **Strategic Planning** (not "Business Consulting")

---

## 3. Messaging Framework

### Target Audiences

#### Primary: Small Business Owners (10-100 employees)
**Pain Points**:
- Can't afford full-time executives (CIO/CMO)
- Outgrowing DIY solutions
- Need enterprise quality at small business prices

**Messaging Angle**: "You're too big for DIY, but too small for a full-time executive."

#### Secondary: High Net Worth Individuals
**Pain Points**:
- Home networks are attack vectors
- Consumer antivirus isn't enough
- Need enterprise protection at home

**Messaging Angle**: "Enterprise Security, Now for Your Living Room."

#### Tertiary: Nonprofits
**Pain Points**:
- Limited IT budgets
- Need to protect donor data
- Can't afford for-profit pricing

**Messaging Angle**: "Focus on the Mission. We'll Handle the Machines."

### Value Propositions

Use these proven value props:
- "Enterprise-grade at SMB prices"
- "Your own CIO/CMO without the salary cap"
- "100% US-Based (no offshore call centers)"
- "SOC 2 Type II Compliant"
- "Strategy without the salary cap"
- "We don't just advise. We execute."

### Tone Adjusters by Context

**Business Services Pages**: Technical expertise + professional confidence
- Example: "We operate on a subscription model. We only profit when your systems are running perfectly."

**Personal/Family Pages**: Protective + reassuring
- Example: "Hackers know your home Wi-Fi is the backdoor to your business and bank accounts. We close that door."

**Nonprofit Pages**: Mission-focused + value-conscious
- Example: "We charge a flat service retainer plus direct licensing costs. This saves growing nonprofits thousands per year."

---

## 4. Content Standards

### Headlines

#### Hero Headlines Pattern
```
[Benefit Statement]
[Highlighted Value Prop in Copper]
```

**Examples**:
- "Enterprise Strategy.\nSmall Business Soul."
- "Make Your Brand\nImpossible to Ignore."
- "Managed IT that Sleeps\nSo You Don't Have To."
- "Executive Strategy.\nFractional Cost."

#### Section Headlines
Use questions or bold statements:
- "Your antivirus isn't enough anymore."
- "Stop settling for 'Break/Fix' support."
- "Need a custom enterprise solution?"

### Body Copy Guidelines

**Paragraph Length**: 2-3 sentences max for web
- Break up long blocks of text
- Use bullet points for lists
- Add visual breaks with images/icons

**Sentence Structure**:
- Vary sentence length (mix short and medium)
- Start with benefits, not features
- Use active voice

**Examples**:
✅ **Good**: "We fix critical vulnerabilities, deploy security agents, and clean up messy cabling."
❌ **Bad**: "Our comprehensive security deployment methodology ensures optimal infrastructure hygiene through systematic remediation protocols."

### Call-to-Action Copy

**Primary CTAs** (use these exact phrases):
- "Let's Get Started"
- "Get Started"
- "Talk to Sales" (forms/contact)
- "Book a Strategy Call"
- "Schedule Introduction"

**Secondary CTAs**:
- "Learn More"
- "View Pricing"
- "View Plans"
- "See How It Works"

**Avoid**:
- "Submit" (use "Get Started" or "Start Conversation")
- "Click Here"
- "Download Now" (use "Get the Guide")

---

## 5. Service Descriptions

### Standard Service Intros

Use these patterns for service page heroes:

**Managed IT**:
"Enterprise-grade infrastructure, US-based support, and SOC 2 security—scaled for small business budgets."

**Brand Growth**:
"We bring enterprise-level marketing leadership to small businesses. No agencies. No junior account managers. Just senior strategy."

**Family Protection**:
"Enterprise cybersecurity for your family. Protect your home network, devices, and identity with SOC 2 compliant tools."

**Fractional Leadership**:
"Get the playbook of a $300k/yr executive for a fraction of the price. We embed into your leadership team to drive outcomes, not just hours."

### Feature List Format

When listing features, use this structure:
```
[Icon] [Bold Feature Name]
[Concrete description with specific details]
```

**Example**:
```tsx
<CheckCircle2 className="w-5 h-5 text-brand-copper" />
<div>
  <h4 className="font-bold">100% US-Based Helpdesk</h4>
  <p>No offshore call centers. Talk to a US-based engineer who knows your business by name.</p>
</div>
```

---

## 6. Legal & Footer Copy

### Copyright Notice
```
© [Year] Humaneers Limited Company.
"Humaneers" is a trademark of Human IP LP and is used under license.
```

### Brand Footer Tagline
```
Enter prise Strategy. Small Business Soul. 
We bring high-end IT and brand growth to businesses across the United States.
```

### Personal Touch
```
Built by humans with ❤️ + ☕️ in Arizona & Texas.
```

**Purpose**: Reinforces "Modern Craftsman" warmth while maintaining professionalism

### Trust Badges
Use these consistently:
- "SOC 2 Type II Compliant"
- "100% US-Based"
- "Supporting 501(c)(3) Organizations"
- "Based in Tempe, AZ | Serving Clients Nationwide"

---

## 7. Geographic Messaging

### Primary Market
- **Headquarters**: Tempe, Arizona
- **Secondary**: Texas (remote team members)
- **Service Area**: All 50 US states

### Local Anchoring
Always mention:
- "Based in Tempe, AZ"
- "Serving clients nationwide"
- "100% US-based team"

**Example**:
"Our Tempe, AZ headquarters is just the hub. We use advanced remote management tools to support clients in all 50 states."

---

## 8. Competitor Differentiation

### vs. Traditional MSPs
**Their Model**: Break/fix, reactive, profit from problems
**Our Model**: Subscription, proactive, profit from uptime

**Messaging**:
"Most MSPs operate on a broken model: they profit when you have problems. We operate on a subscription model. We only profit when your systems are running perfectly."

### vs. Marketing Agencies
**Their Model**: Junior teams juggling 20 clients, agency markup
**Our Model**: Senior fractional leaders embedded in your org

**Messaging**:
"Hiring a full-time CMO costs $250k+. Hiring an agency gets you a junior team juggling 20 other clients. We provide a third option: Senior Fractional Leadership."

### vs. Consumer-Grade Security
**Their Model**: Antivirus software, consumer products
**Our Model**: Enterprise tools (CrowdStrike, SentinelOne)

**Messaging**:
"We don't use 'consumer' products. We license enterprise-grade tools (CrowdStrike, SentinelOne, Cisco) and manage them for you."

---

## 9. Social Proof Patterns

### Stats Format
```tsx
<div className="text-4xl font-bold text-brand-copper mb-4">1 in 3</div>
<h3 className="text-xl font-bold text-brand-oxford mb-2">Identity Theft Victims</h3>
<p className="text-brand-slate">FBI Data, 2020-2024</p>
```

### Testimonial Format (if/when added)
```tsx
<div className="bg-white p-8 rounded-xl shadow-lg">
  <p className="text-brand-oxford text-lg mb-4">
    "[Specific outcome achieved with concrete numbers]"
  </p>
  <div className="flex items-center gap-4">
    <div>
      <div className="font-bold text-brand-oxford">[Name]</div>
      <div className="text-sm text-brand-slate">[Title] at [Company]</div>
    </div>
  </div>
</div>
```

---

## 10. Editorial Guidelines

### Numbers & Statistics
- Use numerals for all numbers ("3 reasons" not "three reasons")
- Include sources for statistics
- Round to meaningful precision ($250k not $250,000)
- Use "+" for growth ("340%+")

### Capitalization
- **Services**: Title Case ("Managed IT Services")
- **Job Titles**: Title Case ("Chief Information Officer")
- **Product Names**: As branded ("CrowdStrike", "Microsoft 365")
- **Acronyms**: All caps ("SOC 2", "CIO", "MDM")

### Acronyms & Technical Terms
Always define on first use with DefinitionTooltip:
```tsx
<DefinitionTooltip
  term="MDM"
  definition="Mobile Device Management: Software that allows IT to secure, monitor, and manage mobile devices."
/>
```

**Common Terms to Define**:
- MDM (Mobile Device Management)
- SOC 2 (System and Organization Controls 2)
- MSP (Managed Service Provider)
- CIO, CMO, CISO (C-suite titles)

### Pricing Display
- Always show per-unit pricing ("$90/user/mo")
- Include asterisk for terms: `*Subject to Terms of Service`
- Use DefinitionTooltip for pricing footnotes
- Round to whole dollars (no cents)

**Example**:
```tsx
$149<span className="text-lg">/household/mo</span>
<DefinitionTooltip 
  term="*" 
  definition="Subject to Terms of Service. Taxes may apply."
/>
```

---

## 11. Color Usage Rules

### Primary Actions (CTAs)
✅ **ALWAYS use Copper for primary CTAs**
```tsx
<Button className="bg-brand-copper hover:bg-brand-copper-dark text-white">
  Primary Action
</Button>
```

❌ **NEVER use Oxford Blue for primary actions**
```tsx
// Wrong - this is for secondary or non-CTA uses
<Button className="bg-brand-oxford">
```

### Secondary Actions
✅ **Use outline or ghost variants**
```tsx
<Button variant="outline" className="border-brand-oxford text-brand-oxford">
  Secondary Action
</Button>
```

### Background Colors
- **Page Background**: Always `bg-brand-cream` (never pure white `bg-white`)
- **Card/Content Backgrounds**: Use `bg-white` for contrast on cream pages
- **Hero Sections**: Always `bg-brand-oxford`
- **Alternate Sections**: Use `bg-brand-cream` or `bg-white` to create rhythm

### Text Colors
- **Headings**: `text-brand-oxford` (#1B263B)
- **Body Copy**: `text-brand-slate` (#4E596F)
- **Light Text**: `text-gray-500` or `text-gray-400`
- **On Dark Backgrounds**: `text-white` or `text-gray-300`

---

## 2. Component Patterns

### Buttons

#### Primary CTA
```tsx
<Button 
  onClick={handleClick}
  className="bg-brand-copper hover:bg-brand-copper-dark text-white text-lg px-8 py-6 h-auto rounded-full shadow-lg"
>
  Get Started
</Button>
```

#### Secondary CTA
```tsx
<Button 
  variant="outline"
  className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 h-auto rounded-full"
>
  Learn More
</Button>
```

#### Button Sizing
- **Default**: `px-4 py-2` (standard forms, inline actions)
- **Large**: `px-8 py-6` (hero CTAs, important actions)
- **Extra Large**: `px-12 py-8` (featured CTAs)

### Cards

#### Standard Feature Card
```tsx
<div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
  <div className="mb-6">
    {/* Icon or image */}
  </div>
  <h3 className="text-xl font-bold text-brand-oxford mb-3">Title</h3>
  <p className="text-brand-slate leading-relaxed">Description</p>
</div>
```

#### Interactive Card with Hover
```tsx
<div className="bg-gray-50 p-8 rounded-2xl hover:bg-white hover:shadow-xl transition-all group">
  {/* Content */}
</div>
```

---

## 3. Hover States

### ⚠️ Critical Rule: Avoid Color-on-Same-Color

**Problem Pattern** (DO NOT USE):
```tsx
// BAD - Icon will disappear on hover
<div className="group">
  <div className="group-hover:bg-brand-copper">
    <Icon className="text-brand-copper" /> {/* Copper on copper = invisible */}
  </div>
</div>
```

**Correct Pattern** (USE THIS):
```tsx
// GOOD - Icon changes to white on hover
<div className="group">
  <div className="text-brand-copper group-hover:bg-brand-copper group-hover:text-white transition-colors">
    <Icon className="w-8 h-8" /> {/* Inherits color from parent */}
  </div>
</div>
```

### Hover State Checklist
- [ ] Icon/text has initial color defined on **parent container**
- [ ] Icon/text **does NOT** have hardcoded color class
- [ ] Hover state changes **both** background AND text color
- [ ] Transition is smooth (`transition-colors` or `transition-all`)

### Common Hover Patterns

#### Icon Container Hover
```tsx
<div className="bg-white text-brand-copper group-hover:bg-brand-copper group-hover:text-white transition-colors">
  <Icon className="w-8 h-8" />
</div>
```

#### Card Hover with Border
```tsx
<div className="border border-transparent hover:border-brand-copper transition-all">
```

#### Button Text Hover
```tsx
<button className="text-brand-copper hover:text-brand-copper-dark transition-colors">
```

---

## 4. Typography

### Heading Hierarchy
```tsx
// H1 - Page Hero
<h1 className="text-4xl md:text-7xl font-bold text-brand-oxford mb-6 leading-tight">

// H2 - Major Section Title
<h2 className="text-3xl md:text-5xl font-bold text-brand-oxford mb-6">

// H3 - Subsection Title
<h3 className="text-2xl md:text-3xl font-bold text-brand-oxford mb-4">

// H4 - Card/Component Title
<h4 className="text-xl font-bold text-brand-oxford mb-3">
```

### Body Text
```tsx
// Large Body (Intro/Hero)
<p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">

// Standard Body
<p className="text-base text-brand-slate leading-relaxed">

// Small Text
<p className="text-sm text-gray-500">
```

### Font Weights
- **Light**: 300 (hero subtitles only)
- **Normal**: 400 (body text)
- **Medium**: 500 (labels, navigation)
- **Semibold**: 600 (subheadings)
- **Bold**: 700 (major headings)

---

## 5. Layout & Spacing

### Section Structure
```tsx
<section className="py-24 bg-brand-cream">
  <div className="container mx-auto px-6">
    <div className="max-w-4xl mx-auto text-center mb-16">
      {/* Section header */}
    </div>
    <div className="grid md:grid-cols-3 gap-8">
      {/* Content */}
    </div>
  </div>
</section>
```

### Spacing Scale
- **Tiny**: `gap-2` (4px)
- **Small**: `gap-4` (16px)
- **Medium**: `gap-6` (24px)
- **Large**: `gap-8` (32px)
- **Section**: `gap-16` (64px)

### Responsive Breakpoints
- **Mobile**: Default (< 640px)
- **Tablet**: `md:` (768px+)
- **Desktop**: `lg:` (1024px+)
- **Wide**: `xl:` (1280px+)

---

## 6. Forms

### Input Field
```tsx
<Input
  id="email"
  type="email"
  placeholder="you@example.com"
  className="h-12 bg-gray-50 border-gray-200"
  required
/>
```

### Label
```tsx
<Label htmlFor="email">Email Address</Label>
```

### Submit Button
```tsx
<Button
  type="submit"
  className="w-full bg-brand-copper hover:bg-brand-copper-dark text-white text-lg py-6 h-auto"
>
  Submit
</Button>
```

---

## 7. Icons

### Icon Sizing
- **Small**: `w-4 h-4` (navigation, inline)
- **Medium**: `w-6 h-6` (feature lists)
- **Large**: `w-8 h-8` (feature cards)
- **Hero**: `w-12 h-12` or larger

### Icon Colors
✅ **DO**: Let icons inherit color from parent
```tsx
<div className="text-brand-copper">
  <Icon className="w-6 h-6" />
</div>
```

❌ **DON'T**: Hardcode icon colors when using group-hover
```tsx
<div className="group-hover:text-white">
  <Icon className="w-6 h-6 text-brand-copper" /> {/* Will cause issues */}
</div>
```

---

## 8. Common Pitfalls

### ❌ Pitfall #1: Wrong Button Color
```tsx
// Wrong
<Button className="bg-brand-oxford">Primary Action</Button>

// Right
<Button className="bg-brand-copper">Primary Action</Button>
```

### ❌ Pitfall #2: Pure White Backgrounds
```tsx
// Wrong
<section className="bg-white py-24">

// Right
<section className="bg-brand-cream py-24">
```

### ❌ Pitfall #3: Hover State Color Clash
```tsx
// Wrong - icon disappears on hover
<div className="group">
  <div className="group-hover:bg-brand-copper">
    <Icon className="text-brand-copper" />
  </div>
</div>

// Right - icon visible on hover
<div className="group">
  <div className="text-brand-copper group-hover:bg-brand-copper group-hover:text-white">
    <Icon />
  </div>
</div>
```

### ❌ Pitfall #4: Inconsistent Spacing
```tsx
// Wrong - random spacing
<section className="py-16"> or <section className="py-32">

// Right - standard section spacing
<section className="py-24">
```

---

## 9. Animation Guidelines

### Transition Durations
- **Fast**: `duration-200` (buttons, small interactions)
- **Normal**: `duration-300` (default, most transitions)
- **Slow**: `duration-500` (large modals, page transitions)

### Transition Properties
```tsx
// Color changes only
transition-colors

// All properties
transition-all

// Specific properties
transition-transform
transition-opacity
```

### Hover Animations
```tsx
// Subtle lift
hover:-translate-y-1

// Scale up
hover:scale-110

// Shadow increase
hover:shadow-xl
```

---

## 10. Accessibility

### Required Practices
- ✅ All images have `alt` text
- ✅ Buttons have descriptive text (not just icons)
- ✅ Forms have `<label>` elements with `htmlFor`
- ✅ Color contrast ratio ≥ 4.5:1
- ✅ Focus states visible (`focus-visible:ring-2`)

### Key Patterns
```tsx
// Skip to content link
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to content
</a>

// Proper form labels
<Label htmlFor="email">Email Address</Label>
<Input id="email" />

// Icon-only buttons
<button aria-label="Close menu">
  <X className="w-6 h-6" />
</button>
```

---

## 11. SEO Best Practices

### Meta Tags (use Seo component)
```tsx
<Seo
  title="Page Title | Humaneers"
  description="150-160 character description with keywords"
  canonicalPath="/page-path"
>
```

### Heading Structure
- One `<h1>` per page
- Logical hierarchy (h1 → h2 → h3)
- Keywords in headings

### Internal Linking
```tsx
// Always use routePaths
import { routePaths } from '../../routes';

<Link to={routePaths.pricing}>View Pricing</Link>
```

---

## 12. Code Quality Standards

### TypeScript
- ❌ **NEVER** use `any` type
- ✅ Use proper interfaces and types
- ✅ Enable strict mode

### Imports
- Remove unused imports immediately
- Use specific imports (not `import *`)
- Group imports (React, external, internal)

### Console Statements
- ❌ No `console.log` in production
- ⚠️ Use conditional `console.error`:
```tsx
if (import.meta.env.DEV) {
  console.error("Error:", error);
}
```

---

## 13. File Organization

### Component Structure
```
src/
  components/
    views/           # Page components
    ui/              # Reusable UI components
    Layout.tsx       # Global layout
    Seo.tsx          # SEO wrapper
```

### Naming Conventions
- **Components**: PascalCase (`HomePage.tsx`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_URL`)

---

## Quick Checklist for New Pages

- [ ] Hero section uses `bg-brand-oxford`
- [ ] Page background is `bg-brand-cream`
- [ ] Primary CTA uses `bg-brand-copper`
- [ ] Section spacing is `py-24`
- [ ] Headings follow hierarchy
- [ ] All images have `alt` text
- [ ] SEO component included
- [ ] Proper `routePaths` for links
- [ ] No hardcoded colors on icons in hover states
- [ ] No unused imports
- [ ] No `console.log` statements

---

## Reference Files

- **Technical Specs**: `Claude.md`
- **Task Management**: `TODO.md`
- **This Guide**: `STYLEGUIDE.md`

---

*Last Updated: 2026-01-18*
