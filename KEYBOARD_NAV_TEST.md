# Keyboard Navigation Testing Checklist

**Status:** RECOMMENDED FOR MANUAL TESTING  
**Date:** January 17, 2026

## Test Instructions
Use only keyboard (no mouse) to navigate through each section below. Mark items as you test.

## Navigation Header
- [ ] Tab to logo - Enter navigates to home
- [ ] Tab to Solutions dropdown - Enter/Space opens menu
- [ ] Arrow keys navigate dropdown items
- [ ] Enter selects dropdown item
- [ ] Escape closes dropdown
- [ ] Tab to Platform dropdown - Same behavior
- [ ] Tab to Resources dropdown - Same behavior  
- [ ] Tab to Company dropdown - Same behavior
- [ ] Tab to Support button - Enter navigates
- [ ] Tab to "Let's Get Started" CTA - Enter navigates
- [ ] Tab to mobile menu icon (on mobile) - Enter toggles menu

## Forms - Talk to Sales Modal
- [ ] Tab through all form fields in order
- [ ] Enter/Space on checkboxes toggles selection
- [ ] Enter on "Next" advances to step 2
- [ ] Shift+Tab navigates backwards
- [ ] Escape closes modal
- [ ] Focus returns to trigger element on close
- [ ] Error messages announced on validation failure

## Forms - Support Page
- [ ] Tab through: Name, Email, Phone, Company
- [ ] Tab to Priority dropdown - Arrow keys select
- [ ] Tab to Category dropdown - Arrow keys select
- [ ] Tab to Subject field
- [ ] Tab to Description textarea
- [ ] Enter on Submit button submits form
- [ ] Focus trapped in form until submission

## Contact Page
- [ ] Tab to Category dropdown
- [ ] Arrow keys select Sales/Support
- [ ] Enter navigates to selected page

## Footer
- [ ] Tab to all service links (Managed IT, Brand Growth, etc.)
- [ ] Tab to company links (About, Colophon, etc.)
- [ ] Tab to meta links (Privacy, Terms, etc.)
- [ ] Tab to email input
- [ ] Enter in email input submits newsletter
- [ ] Tab to Subscribe button

## Focus Indicators
- [ ] All interactive elements show visible focus ring
- [ ] Focus ring color is brand-copper (#B87333) or high contrast
- [ ] Focus ring is at least 2px wide
- [ ] Focus never "lost" or invisible

## Screen Reader Compatibility
- [ ] Test with VoiceOver (Mac) or NVDA (Windows)
- [ ] All form labels announced correctly
- [ ] Error messages announced in ARIA live regions
- [ ] Modal announcements on open/close
- [ ] Dropdown state changes announced

## Test Results
**Tester:**  
**Date:**  
**Browser:**  
**Issues Found:**

---

**Note:** This is a manual test checklist. Automated testing cannot fully verify keyboard navigation UX. A human tester should complete this before production launch.
