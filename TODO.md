# Humaneers Website TODO

Development tasks and outstanding items for the Humaneers website.

---

## High Priority

### Cal.com Account Setup (Action Required)
- [ ] Create Cal.com routing forms in your Cal.com account:
  - Sales Inquiries form (fields: firstName, lastName, email, company, role, employees, website, phone, budget, interests, message)
  - Support Tickets form (fields: name, email, phone, company, priority, category, subject, description)
- [ ] Configure `.env` with your Cal.com credentials:
  - `VITE_CAL_ORG_URL` - Your Cal.com organization URL
  - `VITE_CAL_SALES_FORM_ID` - Sales routing form ID
  - `VITE_CAL_SUPPORT_FORM_ID` - Support routing form ID
- [ ] Test end-to-end booking flow in production

---

## Medium Priority

### Content & Pages
- [x] Review and update all service page content ✅ (Jan 17, 2026)
  - Verified brand voice alignment across all pages
  - Confirmed proper use of DefinitionTooltip for technical terms
  - Content follows "clear over clever" guideline
- [ ] Add case studies/testimonials if available
- [x] Review SEO meta tags across all pages ✅ (Jan 17, 2026)
  - Added comprehensive meta tags to index.html
  - Added Open Graph and Twitter Card tags
  - Created SEO_RECOMMENDATIONS.md for future enhancements

### Forms & User Experience
- [ ] Test all forms end-to-end (Sales, Support, Ethics)
- [x] Test mobile responsiveness across all pages ✅ (Jan 17, 2026)
  - Code review verified responsive breakpoints
  - Touch targets meet 44px minimum
  - Created MOBILE_RESPONSIVENESS_CHECKLIST.md
- [ ] Accessibility audit (keyboard navigation, screen readers, ARIA labels)

### Technical Improvements
- [x] Commit untracked files to git ✅ (Jan 17, 2026)
  - All Cal.com files already tracked
  - Committed development improvements (commit e136f55)
- [x] Add error boundaries for better error handling ✅ (Jan 17, 2026)
  - ErrorBoundary component wraps entire app
  - Individual error boundary for route rendering
- [x] Review and optimize bundle size ✅ (Jan 17, 2026)
  - Implemented code splitting with React.lazy
  - Reduced main bundle from 656KB to 473KB (28% reduction)
  - Gzipped bundle now 149KB (down from 195KB)

---

## Low Priority / Future Enhancements

### Client Portal (Future)
- [ ] Implement Supabase authentication
- [ ] Build client dashboard
- [ ] Add user account management
- [ ] Create billing/invoice section

### Marketing & Analytics
- [ ] Add Google Analytics or privacy-friendly alternative
- [ ] Implement conversion tracking
- [ ] Add newsletter signup integration

### Design & Branding
- [ ] Dark mode support (next-themes already installed)
- [x] Add loading states/skeleton screens ✅ (Jan 17, 2026)
  - Added Suspense fallback with skeleton screens for lazy routes
  - Created LoadingSpinner component
  - TalkToSalesModal has loading states
- [x] Consider adding animations to service cards ✅ (Jan 17, 2026)
  - Service cards already have hover animations
  - Includes lift effect, border color change, icon scaling
- [x] Review brand consistency across all components ✅ (Jan 17, 2026)
  - 430 instances of brand color usage verified
  - Oxford Blue, Copper, and Cream used consistently
  - All buttons follow brand guidelines

### Documentation
- [x] Document component library usage ✅ (Jan 17, 2026)
  - Expanded CLAUDE.md with Development Workflow section
  - Added Technical Standards section
  - Created component documentation examples
- [x] Add JSDoc comments to utility functions ✅ (Jan 17, 2026)
  - Added JSDoc to utils.ts (cn function)
  - Added JSDoc to DefinitionTooltip component
  - Added JSDoc to Layout component
  - Added JSDoc to LoadingSpinner component
- [ ] Create developer onboarding guide

---

## Completed ✅

### Cal.com Integration (December 2025 - January 2026)
- [x] Create CLAUDE.md brand guidelines
- [x] Migrate TalkToSalesModal to Cal.com
- [x] Migrate TalkToSales full page to Cal.com
- [x] Migrate Support form to Cal.com
- [x] Replace Zoho/Resend integration with Cal.com
- [x] Create Cal.com migration documentation
- [x] Update `.env.example` with Cal.com environment variables
- [x] Context-aware CTAs on all service pages
  - ManagedIT → pre-selects "Managed IT" interest
  - Growth → pre-selects "Brand & Growth" interest
  - FamilyProtection → pre-selects "Family IT" interest
  - FractionalLeadership → pre-selects "Leadership" interest
  - NonProfits → pre-selects "Managed IT" + nonprofit source context
- [x] Contact page routes to Sales/Support forms (decision: keep as router)
- [x] Add "Brand & Growth" to sales modal interests

### Development Improvements (January 17, 2026)
- [x] Add error boundaries for production stability
- [x] Optimize bundle size (28% reduction via code splitting)
- [x] Implement loading states and skeleton screens
- [x] Verify service card animations
- [x] Review brand consistency (430 color instances verified)
- [x] Add JSDoc documentation to components and utilities
- [x] Code review for mobile responsiveness
- [x] Review service page content quality
- [x] Add comprehensive SEO meta tags
- [x] Commit development improvements to git
- [x] Update TODO.md with completed items
- [x] Create MOBILE_RESPONSIVENESS_CHECKLIST.md
- [x] Create SEO_RECOMMENDATIONS.md
- [x] Expand CLAUDE.md with development guidelines

---

## Notes

- **Design System**: "Modern Craftsman" aesthetic with Oxford Blue, Copper, and Cream
- **Cal.com Status**: All forms migrated ✅ | Awaiting Cal.com account configuration
- **No Backend**: Currently client-side only, forms redirect to Cal.com
- **Future Backend**: Supabase planned for client portal feature

---

## Recent Changes

### January 17, 2026 - Development Quality Sprint
Completed comprehensive development improvements:
- **Performance**: 28% bundle size reduction (656KB → 473KB)
- **Quality**: Error boundaries, loading states, code splitting
- **Documentation**: Expanded CLAUDE.md, added JSDoc comments
- **SEO**: Added meta tags, OG/Twitter cards, SEO recommendations
- **Mobile**: Verified responsive design, created QA checklist
- **Git**: Committed all improvements (e136f55)

---

**Last Updated**: January 17, 2026
