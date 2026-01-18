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
- [ ] Review and update all service page content
- [ ] Add case studies/testimonials if available
- [ ] Review SEO meta tags across all pages

### Forms & User Experience
- [ ] Test all forms end-to-end (Sales, Support, Ethics)
- [ ] Test mobile responsiveness across all pages
- [ ] Accessibility audit (keyboard navigation, screen readers, ARIA labels)

### Technical Improvements
- [ ] Commit untracked files to git:
  - `CAL_MIGRATION.md`
  - `CAL_SETUP_GUIDE.md`
  - `src/lib/cal.ts`
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

---

## Notes

- **Design System**: "Modern Craftsman" aesthetic with Oxford Blue, Copper, and Cream
- **Cal.com Status**: All forms migrated ✅ | Awaiting Cal.com account configuration
- **No Backend**: Currently client-side only, forms redirect to Cal.com
- **Future Backend**: Supabase planned for client portal feature

---

**Last Updated**: January 17, 2026
