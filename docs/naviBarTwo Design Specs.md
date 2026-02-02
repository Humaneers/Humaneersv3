## naviBarTwo Implementation Plan
**Premium Floating Navigation System**
**Version:** 1.0.0
**Standards Compliance:** Fortune 100 Marketing & Technical Standards
**Brand Alignment:** Humaneers Design System

### Executive Summary

Implementation of `naviBarTwo`, a premium floating navigation bar system designed to Fortune 100 standards. The package will replace the existing navigation with a modern, accessible, performant component system featuring glassmorphism design, smooth animations, and enterprise-grade code quality.

---

### Architecture & Design Philosophy

#### Core Principles

1. **Component Isolation**: Each navigation element is a self-contained, testable component
2. **Composition over Inheritance**: Small, focused components composed into larger systems
3. **Data-Driven Configuration**: All navigation structure defined in typed data layer
4. **Progressive Enhancement**: Works without JavaScript, enhanced with it
5. **Mobile-First Responsive**: Built for mobile, enhanced for desktop
6. **Accessibility-First**: WCAG 2.1 AA compliance minimum, AAA target
7. **Performance-First**: < 50ms render time, minimal bundle size

#### Technical Stack

- **Framework**: React 18.3+ (Next.js 16.1+ App Router)
- **Language**: TypeScript 5.3+ (strict mode)
- **Styling**: Tailwind CSS 4.1+ (custom design tokens)
- **Animation**: Motion 11+ (Framer Motion successor)
- **Testing**: Vitest 4+ + Testing Library + Playwright (E2E)
- **Accessibility**: Radix UI primitives where applicable
- **Icons**: Lucide React 0.487+

---

### File Structure

```
src/
├── components/
│   └── naviBarTwo/
│       ├── index.ts                          # Public API barrel export
│       ├── NaviBarTwo.tsx                    # Main container component
│       ├── NaviBarTwo.test.tsx               # Integration tests
│       │
│       ├── core/
│       │   ├── FloatingContainer.tsx         # Floating glassmorphism wrapper
│       │   ├── FloatingContainer.test.tsx
│       │   ├── Logo.tsx                      # Branded logo component
│       │   ├── Logo.test.tsx
│       │   ├── NavSection.tsx                # Left/right section wrapper
│       │   ├── NavSection.test.tsx
│       │
│       ├── navigation/
│       │   ├── PrimaryNav.tsx                # Dropdown navigation (Solutions, Platform)
│       │   ├── PrimaryNav.test.tsx
│       │   ├── PrimaryNavItem.tsx            # Individual dropdown item
│       │   ├── PrimaryNavItem.test.tsx
│       │   ├── SecondaryNav.tsx              # Link navigation (Case Studies, About, Contact)
│       │   ├── SecondaryNav.test.tsx
│       │   ├── SecondaryNavItem.tsx          # Individual link with animated underline
│       │   ├── SecondaryNavItem.test.tsx
│       │
│       ├── cta/
│       │   ├── CTAGroup.tsx                  # CTA button container
│       │   ├── CTAGroup.test.tsx
│       │   ├── CTAButton.tsx                 # Reusable CTA button
│       │   └── CTAButton.test.tsx
│       │
│       ├── mobile/
│       │   ├── MobileMenu.tsx                # Mobile slide-down menu
│       │   ├── MobileMenu.test.tsx
│       │   ├── MobileMenuButton.tsx          # Hamburger button
│       │   ├── MobileMenuButton.test.tsx
│       │   ├── MobileMenuPanel.tsx           # Slide-down panel
│       │   ├── MobileMenuPanel.test.tsx
│       │
│       ├── animations/
│       │   ├── variants.ts                   # Motion variants library
│       │   ├── transitions.ts                # Transition configurations
│       │   └── useScrollEffect.ts            # Scroll-based animation hook
│       │
│       └── types/
│           ├── index.ts                      # Type definitions
│           └── navigation.types.ts           # Navigation data types
│
├── data/
│   └── naviBarTwo/
│       ├── navigation.ts                     # Navigation structure data
│       ├── navigation.test.ts
│       └── config.ts                         # Global configuration
│
├── styles/
│   └── naviBarTwo/
│       ├── tokens.css                        # CSS custom properties
│       └── animations.css                    # Keyframe animations
│
└── utils/
    └── naviBarTwo/
        ├── classNames.ts                     # Dynamic class utilities
        ├── classNames.test.ts
        ├── validators.ts                     # Data validation
        └── validators.test.ts
```

---

### Component Specifications

#### 1. FloatingContainer

**Purpose**: Main wrapper providing glassmorphism effect and floating positioning

**Visual Requirements**:
- Fixed positioning: `fixed top-4 left-1/2 -translate-x-1/2 z-50`
- Width: `w-[96vw] max-w-[1400px]`
- Background: `bg-brand-oxford/90 backdrop-blur-xl`
- Border: `border border-white/8`
- Border radius: `rounded-[20px]`
- Glow effect: Bottom shadow with gradient `from-brand-blue/20 via-brand-purple/20 to-brand-blue/20 blur-2xl`

**Props**:
```typescript
interface FloatingContainerProps {
  children: React.ReactNode;
  className?: string;
  showGlow?: boolean; // Default: true
  isScrolled?: boolean; // Adjusts shadow intensity
}
```

**Accessibility**:
- `role="banner"` (landmark)
- `aria-label="Main navigation"`

**Animation**:
- Entrance: Slide down from -100% with fade-in over 400ms
- Scroll: Glow intensity increases when `isScrolled={true}`

---

#### 2. Logo

**Purpose**: Branded company identifier with icon and text

**Visual Requirements**:
- Icon container: `w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue via-brand-purple to-brand-pink`
- Icon glow: `shadow-[0_0_24px_rgba(59,130,246,0.5)]` on hover
- Icon: Lucide `Sparkles` at 20px, white color
- Text: "HUMANEERS" in white, semibold, tracking-tight
- Spacing: `gap-3` between icon and text

**Props**:
```typescript
interface LogoProps {
  href?: string; // Default: "/"
  showText?: boolean; // Default: true (hide on mobile < 640px)
  className?: string;
}
```

**Accessibility**:
- `aria-label="Humaneers home"`
- Icon is decorative: `aria-hidden="true"`
- Text is screen-reader visible

**Animation**:
- Icon rotates 5deg on hover over 200ms
- Glow pulses subtly on hover

---

#### 3. PrimaryNav & PrimaryNavItem

**Purpose**: Dropdown navigation for complex menu structures

**Visual Requirements (PrimaryNav)**:
- Container: `flex items-center gap-1`
- Hidden on mobile: `hidden md:flex`

**Visual Requirements (PrimaryNavItem)**:
```css
/* Default State */
text-sm text-slate-400 px-3 py-2 rounded-lg
transition-all duration-200

/* Hover State */
text-white bg-white/5

/* Chevron */
size-4 text-slate-400 transition-transform duration-200
/* Hover: translateY(2px) */
```

**Props**:
```typescript
interface PrimaryNavItemProps {
  label: string;
  items?: NavDropdownItem[];
  href?: string;
  isActive?: boolean;
  onClick?: () => void;
}

interface NavDropdownItem {
  title: string;
  description?: string;
  href: string;
  icon?: React.ComponentType;
}
```

**Accessibility**:
- Dropdown: `role="menu"`, `aria-expanded`, `aria-haspopup="true"`
- Items: `role="menuitem"`
- Keyboard: Arrow keys navigate, Enter selects, Escape closes

**Animation**:
- Dropdown fades in + slides down 8px over 200ms
- Chevron rotates 180deg when open

---

#### 4. SecondaryNav & SecondaryNavItem

**Purpose**: Simple link navigation with animated underlines

**Visual Requirements (SecondaryNavItem)**:
```css
/* Default State */
text-sm text-slate-400 px-3 py-2 rounded-lg relative
transition-colors duration-200

/* Hover State */
text-white

/* Animated Underline */
position: absolute;
bottom: 0;
left: 0;
height: 2px;
background: linear-gradient(to right, #3b82f6, #a855f7);
transform: scaleX(0);
transform-origin: left;
transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);

/* Hover: scaleX(1) */
```

**Props**:
```typescript
interface SecondaryNavItemProps {
  label: string;
  href: string;
  isActive?: boolean;
  external?: boolean;
  onClick?: () => void;
}
```

**Accessibility**:
- `aria-current="page"` when active
- External links: `rel="noopener noreferrer"`, `target="_blank"`

**Animation**:
- Underline scales from 0 to 1 over 300ms ease-out
- Text color transitions over 200ms

---

#### 5. CTAGroup & CTAButton

**Purpose**: Primary and secondary call-to-action buttons

**Visual Requirements (CTAButton - Login variant)**:
```css
border border-white/20 bg-transparent text-white
px-4 py-2 rounded-lg text-sm font-medium
transition-all duration-200

/* Hover */
border-white/40 bg-white/5
```

**Visual Requirements (CTAButton - Primary variant)**:
```css
bg-gradient-to-b from-white to-gray-100 text-black
px-5 py-2 rounded-lg text-sm font-semibold
shadow-[0_1px_3px_rgba(255,255,255,0.3)]
transition-all duration-200

/* Hover */
from-gray-50 to-gray-200 shadow-[0_2px_6px_rgba(255,255,255,0.4)]
scale-105
```

**Props**:
```typescript
interface CTAButtonProps {
  variant: 'outline' | 'primary';
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}
```

**Accessibility**:
- Focus visible: `focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2`
- Disabled state: `aria-disabled="true"`

**Animation**:
- Scale to 1.05 on hover over 200ms
- Shadow intensity increases on hover

---

#### 6. MobileMenu System

**Purpose**: Responsive mobile navigation

**Visual Requirements (MobileMenuButton)**:
```css
/* Button */
md:hidden p-2 rounded-lg text-white
hover:bg-white/10 transition-colors duration-200

/* Hamburger Icon */
Three horizontal lines (Menu icon from Lucide)
Animates to X when open
```

**Visual Requirements (MobileMenuPanel)**:
```css
/* Panel */
fixed top-20 left-4 right-4 z-40
bg-brand-oxford/95 backdrop-blur-xl
border border-white/8 rounded-2xl
shadow-2xl

/* Content */
p-6 flex flex-col gap-6

/* Menu Items */
Stacked vertically, full width
Text larger than desktop (text-base)
More padding (py-3)

/* CTAs */
Stacked at bottom with gap-3
Full width buttons
```

**Props**:
```typescript
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  primaryItems: PrimaryNavItemProps[];
  secondaryItems: SecondaryNavItemProps[];
  ctaItems: CTAButtonProps[];
}
```

**Accessibility**:
- Focus trap when open
- `aria-hidden` on background content when open
- Close on Escape key
- First item receives focus when opened

**Animation**:
- Panel slides down from top with fade-in over 300ms
- Background overlay fades in
- Items stagger animate (50ms delay each)

---

### Design System Integration

#### Brand Color Tokens

Update `tailwind.config.ts` with naviBarTwo tokens:

```typescript
colors: {
  brand: {
    oxford: '#0a1628',      // Main dark background
    blue: '#3b82f6',        // Primary gradient start
    purple: '#a855f7',      // Gradient middle
    pink: '#ec4899',        // Gradient end
    slate: {
      400: '#94a3b8',       // Default text
      300: '#cbd5e1',       // Hover text
    }
  }
}
```

#### Custom CSS Properties

**File**: `src/styles/naviBarTwo/tokens.css`

```css
:root {
  /* Glassmorphism */
  --navi-glass-bg: rgba(10, 22, 40, 0.9);
  --navi-glass-border: rgba(255, 255, 255, 0.08);
  --navi-glass-blur: 16px;

  /* Glow Effects */
  --navi-glow-blue: rgba(59, 130, 246, 0.2);
  --navi-glow-purple: rgba(168, 85, 247, 0.2);
  --navi-glow-blur: 48px;

  /* Transitions */
  --navi-transition-fast: 200ms cubic-bezier(0.4, 0, 0.2, 1);
  --navi-transition-normal: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --navi-transition-slow: 400ms cubic-bezier(0.4, 0, 0.2, 1);

  /* Z-Index Scale */
  --navi-z-fixed: 50;
  --navi-z-dropdown: 51;
  --navi-z-mobile: 52;
  --navi-z-overlay: 49;
}
```

#### Typography Scale

```typescript
fontSize: {
  'navi-logo': ['1.125rem', { lineHeight: '1.5', letterSpacing: '-0.02em' }],
  'navi-nav': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0' }],
  'navi-cta': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
}
```

---

### Implementation Phases

#### Phase 1: Foundation & Core Components (Day 1)

**1.1 Setup Package Structure**
- [ ] Create `naviBarTwo` directory structure
- [ ] Add TypeScript types and interfaces
- [ ] Configure barrel exports (`index.ts`)
- [ ] Add CSS custom properties

**1.2 Implement FloatingContainer**
- [ ] Build component with glassmorphism styling
- [ ] Add glow effect layer
- [ ] Implement scroll detection hook
- [ ] Add entrance animation
- [ ] Write unit tests (90%+ coverage)

**1.3 Implement Logo**
- [ ] Build gradient icon container
- [ ] Add Sparkles icon with glow
- [ ] Add company text with responsive behavior
- [ ] Implement hover animations
- [ ] Write unit tests

**1.4 Create Animation System**
- [ ] Define Motion variants library
- [ ] Create transition configurations
- [ ] Build `useScrollEffect` hook
- [ ] Document animation patterns

**Success Criteria**:
- ✅ All core components render correctly
- ✅ Glassmorphism effect displays properly
- ✅ Animations are smooth (60fps)
- ✅ Tests pass with 90%+ coverage
- ✅ TypeScript strict mode passes

---

#### Phase 2: Navigation Components (Day 2)

**2.1 Implement PrimaryNav**
- [ ] Build dropdown container
- [ ] Create PrimaryNavItem component
- [ ] Add chevron animation
- [ ] Implement keyboard navigation
- [ ] Add ARIA attributes
- [ ] Write unit and integration tests

**2.2 Implement SecondaryNav**
- [ ] Build link container
- [ ] Create SecondaryNavItem component
- [ ] Add animated gradient underline
- [ ] Handle active state highlighting
- [ ] Write unit tests

**2.3 Create Navigation Data Layer**
- [ ] Define navigation structure in `data/naviBarTwo/navigation.ts`
- [ ] Add TypeScript validation
- [ ] Create configuration schema
- [ ] Write data validation tests

**Success Criteria**:
- ✅ Both nav types render correctly
- ✅ Keyboard navigation works (Tab, Arrow, Enter, Escape)
- ✅ Animations are performant
- ✅ Active states highlight properly
- ✅ Tests pass with 90%+ coverage

---

#### Phase 3: CTA & Mobile Components (Day 3)

**3.1 Implement CTAGroup & CTAButton**
- [ ] Build button variants (outline, primary)
- [ ] Add hover scale effects
- [ ] Implement focus states
- [ ] Add disabled state
- [ ] Write unit tests

**3.2 Implement Mobile Menu System**
- [ ] Build MobileMenuButton with hamburger icon
- [ ] Create MobileMenuPanel component
- [ ] Implement slide-down animation
- [ ] Add focus trap
- [ ] Create stagger animation for items
- [ ] Handle overlay and body scroll lock
- [ ] Write unit and integration tests

**3.3 Responsive Behavior**
- [ ] Test all breakpoints (mobile, tablet, desktop)
- [ ] Verify menu toggle works correctly
- [ ] Ensure desktop items hide on mobile
- [ ] Test mobile menu animations

**Success Criteria**:
- ✅ CTAs render with correct styling
- ✅ Mobile menu opens/closes smoothly
- ✅ Focus trap works correctly
- ✅ Responsive behavior is flawless
- ✅ Tests pass with 90%+ coverage

---

#### Phase 4: Integration & Testing (Day 4)

**4.1 Main NaviBarTwo Component**
- [ ] Compose all sub-components
- [ ] Add scroll detection logic
- [ ] Implement responsive visibility
- [ ] Add global keyboard shortcuts (if applicable)
- [ ] Write integration tests

**4.2 Site Integration**
- [ ] Replace `HeaderRoot` in `layout.tsx` with `NaviBarTwo`
- [ ] Update data source to new format
- [ ] Verify all routes work
- [ ] Test on all pages

**4.3 Comprehensive Testing**
- [ ] Run full unit test suite
- [ ] Run integration tests
- [ ] Perform visual regression tests
- [ ] Test accessibility with screen reader
- [ ] Test keyboard navigation flows
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on multiple devices (mobile, tablet, desktop)

**Success Criteria**:
- ✅ All navigation works across site
- ✅ No visual regressions
- ✅ All tests pass (95%+ coverage)
- ✅ Accessibility audit passes WCAG 2.1 AA
- ✅ Cross-browser compatibility verified

---

#### Phase 5: Quality Assurance & Documentation (Day 5)

**5.1 Performance Optimization**
- [ ] Analyze bundle size
- [ ] Optimize animation performance
- [ ] Lazy load mobile menu
- [ ] Minimize re-renders
- [ ] Run Lighthouse audit (target: 95+ on all metrics)

**5.2 Code Quality**
- [ ] Run TypeScript compiler (`npm run typecheck`)
- [ ] Run ESLint (`npm run lint`)
- [ ] Run Prettier (`npm run format:check`)
- [ ] Review code for patterns and consistency
- [ ] Add JSDoc comments to all public APIs

**5.3 Documentation**
- [ ] Write component API documentation
- [ ] Create usage examples
- [ ] Document data structure format
- [ ] Add migration guide from old navigation
- [ ] Create troubleshooting guide

**5.4 Deployment Preparation**
- [ ] Create production build
- [ ] Test production build locally
- [ ] Verify environment variables
- [ ] Update CHANGELOG.md
- [ ] Prepare release notes

**Success Criteria**:
- ✅ Lighthouse score: 95+ across all metrics
- ✅ Bundle size increase: < 15KB gzipped
- ✅ All quality checks pass
- ✅ Documentation is comprehensive
- ✅ Production build succeeds

---

### Testing Strategy

#### Unit Tests (Vitest + Testing Library)

**Coverage Target**: 95%+

**Test Files**:
- `*.test.tsx` for all components
- `*.test.ts` for all utilities and hooks

**Test Categories**:
1. **Rendering**: Component renders without errors
2. **Props**: Props are applied correctly
3. **Interaction**: Click, hover, keyboard events work
4. **Accessibility**: ARIA attributes present and correct
5. **Animation**: Animations trigger on state changes
6. **Responsive**: Component adapts to screen size

**Example Test Structure**:
```typescript
describe('PrimaryNavItem', () => {
  describe('Rendering', () => {
    it('renders label correctly')
    it('renders chevron icon')
    it('applies custom className')
  })

  describe('Interaction', () => {
    it('opens dropdown on click')
    it('closes dropdown on Escape')
    it('navigates items with Arrow keys')
  })

  describe('Accessibility', () => {
    it('has correct ARIA attributes')
    it('is keyboard navigable')
    it('announces state changes')
  })
})
```

---

#### Integration Tests (Testing Library)

**Coverage Target**: Key user flows

**Test Scenarios**:
1. **Desktop Navigation Flow**
   - User hovers over "Solutions"
   - Dropdown appears
   - User clicks item
   - Page navigates

2. **Mobile Navigation Flow**
   - User clicks hamburger menu
   - Menu slides down
   - User clicks nav item
   - Menu closes, page navigates

3. **CTA Flow**
   - User clicks "Start Free Trial"
   - Correct action triggered
   - Analytics event fires

4. **Keyboard Navigation Flow**
   - User tabs through navigation
   - Focus indicators visible
   - Enter/Space triggers actions
   - Escape closes menus

---

#### E2E Tests (Playwright - Optional but Recommended)

**Test Scenarios**:
1. Navigation across all pages
2. Mobile menu interactions
3. Form submissions from CTAs
4. Cross-browser compatibility

---

#### Visual Regression Tests (Manual Checklist)

**Checklist**:
- [ ] Glassmorphism effect displays correctly
- [ ] Glow effects are subtle and performant
- [ ] Animations are smooth (no jank)
- [ ] Hover states work on all interactive elements
- [ ] Active states highlight correctly
- [ ] Mobile menu animations are fluid
- [ ] Typography is crisp and readable
- [ ] Colors match brand standards
- [ ] Spacing is consistent
- [ ] Border radius values are correct

---

### Quality Assurance

#### Code Quality Standards

**TypeScript**:
- Strict mode enabled
- No `any` types (use `unknown` and type guards)
- All functions have return type annotations
- Props interfaces exported for reusability

**React Best Practices**:
- Functional components with hooks
- Proper dependency arrays in `useEffect`/`useCallback`
- Memoization where appropriate (`React.memo`, `useMemo`)
- No prop drilling (use composition or context)

**CSS/Styling**:
- Tailwind utility classes preferred
- Custom CSS only for complex animations
- No inline styles (except dynamic values)
- Consistent spacing scale (Tailwind's)

**Performance**:
- Components render in < 16ms (60fps)
- No layout thrashing
- Debounced scroll events
- Lazy load non-critical assets

---

#### Accessibility Checklist

**WCAG 2.1 AA Requirements**:
- [ ] Color contrast ratio ≥ 4.5:1 for normal text
- [ ] Color contrast ratio ≥ 3:1 for large text
- [ ] All interactive elements keyboard accessible
- [ ] Focus indicators visible and clear
- [ ] ARIA landmarks used correctly
- [ ] ARIA labels descriptive and accurate
- [ ] Screen reader announces all state changes
- [ ] No keyboard traps
- [ ] Skip links available
- [ ] Semantic HTML used throughout

**Testing Tools**:
- axe DevTools (automated accessibility testing)
- NVDA/JAWS (screen reader testing)
- Keyboard-only navigation testing
- Color contrast analyzer

---

### Performance Requirements

#### Bundle Size

**Targets**:
- Initial JS bundle: < 50KB gzipped
- CSS bundle: < 10KB gzipped
- Total impact: < 60KB gzipped

**Optimization Strategies**:
- Tree-shaking enabled
- Code splitting for mobile menu
- Dynamic imports where applicable
- Icon imports optimized (only used icons)

---

#### Runtime Performance

**Targets**:
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.5s
- Cumulative Layout Shift (CLS): < 0.1
- First Input Delay (FID): < 100ms

**Measurement Tools**:
- Lighthouse
- Chrome DevTools Performance tab
- Web Vitals library
- Real User Monitoring (RUM)

---

#### Animation Performance

**Targets**:
- All animations run at 60fps
- No dropped frames during interactions
- GPU acceleration for transforms
- Minimal JavaScript in animation loop

**Best Practices**:
- Use `transform` and `opacity` for animations
- Avoid animating `width`, `height`, `top`, `left`
- Use `will-change` sparingly
- Debounce scroll events
- Use Motion's animation system (optimized)

---

### Accessibility Standards

#### Semantic HTML

```html
<nav role="banner" aria-label="Main navigation">
  <div role="navigation" aria-label="Primary navigation">
    <!-- Primary nav items -->
  </div>
  <div role="navigation" aria-label="Secondary navigation">
    <!-- Secondary nav items -->
  </div>
</nav>
```

#### Keyboard Shortcuts

**Desktop Navigation**:
- `Tab`: Move to next focusable element
- `Shift+Tab`: Move to previous focusable element
- `Enter`/`Space`: Activate button/link
- `Escape`: Close dropdown/menu
- `Arrow Down`: Navigate dropdown items (when open)
- `Arrow Up`: Navigate dropdown items (when open)
- `Home`: First item in dropdown (when open)
- `End`: Last item in dropdown (when open)

**Mobile Menu**:
- `Tab`: Navigate through items
- `Escape`: Close menu
- `Enter`/`Space`: Activate link/button

#### Focus Management

**Requirements**:
- Visible focus indicators on all interactive elements
- Focus outline: `ring-2 ring-white ring-offset-2 ring-offset-brand-oxford`
- Focus trapped within open menus/dropdowns
- Focus returns to trigger element when menu closes
- Focus moves to first menu item when menu opens

#### Screen Reader Support

**Announcements**:
- Navigation landmark: "Main navigation"
- Menu state: "Expanded" / "Collapsed"
- Current page: "Current page: About"
- Dropdown items: "Menu item, Solutions, 1 of 2"

**Live Regions**:
- Use `aria-live="polite"` for status messages
- Avoid `aria-live="assertive"` unless critical

---

### Documentation Requirements

#### Component API Documentation

**Format**: JSDoc comments + TypeScript types

**Example**:
```typescript
/**
 * PrimaryNavItem - Dropdown navigation item component
 *
 * @component
 * @example
 * ```tsx
 * <PrimaryNavItem
 *   label="Solutions"
 *   items={solutionsDropdown}
 *   isActive={pathname.startsWith('/solutions')}
 * />
 * ```
 *
 * @param {string} label - Display text for nav item
 * @param {NavDropdownItem[]} items - Dropdown menu items
 * @param {string} [href] - Optional link if no dropdown
 * @param {boolean} [isActive] - Whether this nav item is active
 * @param {Function} [onClick] - Optional click handler
 *
 * @accessibility
 * - Keyboard navigable with Arrow keys
 * - ARIA expanded state announced
 * - Focus trapped when dropdown open
 *
 * @performance
 * - Renders in < 10ms
 * - Dropdown lazy loaded
 */
```

---

#### Usage Examples

**File**: `docs/naviBarTwo/usage.md`

Include examples for:
1. Basic setup
2. Custom navigation structure
3. Adding new nav items
4. Customizing styles
5. Handling navigation events
6. Mobile customization

---

#### Migration Guide

**File**: `docs/naviBarTwo/migration.md`

Document:
1. Changes from old navigation
2. Data structure differences
3. Component API changes
4. Styling updates
5. Breaking changes
6. Step-by-step migration process

---

### Implementation Checklist

#### Pre-Implementation
- [ ] Review and approve this plan
- [ ] Set up feature branch: `feat/naviBarTwo`
- [ ] Create tracking issue in GitHub
- [ ] Allocate 5-day sprint

#### Phase 1: Foundation (Day 1)
- [ ] Create directory structure
- [ ] Add TypeScript types
- [ ] Implement FloatingContainer
- [ ] Implement Logo
- [ ] Create animation system
- [ ] Write tests (90%+ coverage)
- [ ] Code review

#### Phase 2: Navigation (Day 2)
- [ ] Implement PrimaryNav
- [ ] Implement SecondaryNav
- [ ] Create data layer
- [ ] Write tests (90%+ coverage)
- [ ] Code review

#### Phase 3: CTA & Mobile (Day 3)
- [ ] Implement CTAButton
- [ ] Implement MobileMenu
- [ ] Test responsive behavior
- [ ] Write tests (90%+ coverage)
- [ ] Code review

#### Phase 4: Integration (Day 4)
- [ ] Compose main component
- [ ] Integrate with site
- [ ] Run full test suite
- [ ] Accessibility audit
- [ ] Cross-browser testing
- [ ] Code review

#### Phase 5: Polish & Deploy (Day 5)
- [ ] Performance optimization
- [ ] Lighthouse audit (95+)
- [ ] Code quality checks
- [ ] Documentation
- [ ] Production build
- [ ] Deploy to staging
- [ ] Final QA
- [ ] Deploy to production

---

### Success Metrics

**Technical Metrics**:
- ✅ Test coverage: 95%+
- ✅ TypeScript strict mode: 100% compliance
- ✅ Bundle size: < 60KB gzipped
- ✅ Lighthouse Performance: 95+
- ✅ Lighthouse Accessibility: 100
- ✅ Zero console errors/warnings
- ✅ Zero runtime errors in production

**User Experience Metrics**:
- ✅ Navigation engagement: Track clicks on nav items
- ✅ Mobile menu usage: Track open/close events
- ✅ CTA conversion: Track button clicks
- ✅ Time to navigate: < 500ms to reach target page
- ✅ User satisfaction: Maintain or improve current metrics

**Code Quality Metrics**:
- ✅ No code smells (SonarQube/ESLint)
- ✅ Cyclomatic complexity: < 10 per function
- ✅ Maintainability index: > 70
- ✅ Technical debt: None introduced

---

### Rollback Plan

If critical issues arise:

1. **Immediate Rollback**:
   - Revert `layout.tsx` to use `HeaderRoot`
   - Hide naviBarTwo with feature flag
   - Deploy hotfix within 1 hour

2. **Gradual Rollback**:
   - Enable old navigation for specific routes
   - A/B test between old and new
   - Fix issues incrementally

3. **Data Preservation**:
   - Old navigation data remains intact
   - Can toggle between systems
   - No data migration required

---

### Timeline

**Total Duration**: 5 business days

- **Day 1**: Foundation & Core Components
- **Day 2**: Navigation Components
- **Day 3**: CTA & Mobile Components
- **Day 4**: Integration & Testing
- **Day 5**: Quality Assurance & Deployment

**Daily Schedule**:
- Morning: Implementation (4 hours)
- Afternoon: Testing & Code Review (3 hours)
- End of Day: Status Update & Planning

---

### Approvals

**Technical Review**: _________________________
**Design Review**: _________________________
**Accessibility Review**: _________________________
**Product Owner Approval**: _________________________

---

**Document Version**: 1.0.0
**Last Updated**: 2026-01-21
**Next Review**: Upon completion of Phase 1
