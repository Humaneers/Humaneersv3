# Humaneers Website TODO

Development tasks and outstanding items for the Humaneers website.

---

## High Priority

### Cal.com Integration (In Progress)
- [ ] Finish Cal.com integration for Contact form
  - Currently Contact form acts as a router to Sales/Support pages
  - Decision needed: Keep as router OR create unified Cal.com contact form
  - See `CAL_MIGRATION.md` for details

---

## Medium Priority

### Content & Pages
- [ ] Review and update all service page content
- [ ] Add case studies/testimonials if available
- [ ] Review SEO meta tags across all pages

### Forms & User Experience
- [ ] Test all forms end-to-end (Sales, Support, Ethics)
- [ ] Verify Cal.com routing works correctly for Sales and Support
- [ ] Test mobile responsiveness across all pages
- [ ] Accessibility audit (keyboard navigation, screen readers, ARIA labels)

### Technical Improvements
- [ ] Commit untracked files to git:
  - `CAL_MIGRATION.md`
  - `CAL_SETUP_GUIDE.md`
  - `src/lib/cal.ts`
- [ ] Update `.env.example` with all current environment variables
- [ ] Add error boundaries for better error handling
- [ ] Review and optimize bundle size

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
- [ ] Add loading states/skeleton screens
- [ ] Consider adding animations to service cards
- [ ] Review brand consistency across all components

### Documentation
- [ ] Document component library usage
- [ ] Add JSDoc comments to utility functions
- [ ] Create developer onboarding guide

---

## Completed ✅

- [x] Create CLAUDE.md brand guidelines
- [x] Migrate TalkToSalesModal to Cal.com
- [x] Migrate Support form to Cal.com
- [x] Replace Zoho/Resend integration with Cal.com
- [x] Create Cal.com migration documentation
- [x] Update environment variables for Cal.com

---

## Notes

- **Design System**: "Modern Craftsman" aesthetic with Oxford Blue, Copper, and Cream
- **Cal.com Status**: Sales modal and Support forms migrated ✅ | Contact form pending decision
- **No Backend**: Currently client-side only, forms redirect to Cal.com
- **Future Backend**: Supabase planned for client portal feature

---

**Last Updated**: January 17, 2026
