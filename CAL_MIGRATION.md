# Cal.com Migration Guide

This document explains the migration from Zoho-based form submissions to Cal.com headless routing.

## Overview

Previously, the Humaneers website used Zoho CRM and Zoho Desk for handling form submissions via email-based ingestion through Resend. This has been replaced with **Cal.com Headless Routing**, which provides a more integrated booking and scheduling experience.

## What Changed

### Removed ❌
- **Zoho Email Integration**: Forms no longer send data to Zoho via Resend email
- **API Endpoints Deleted**:
  - `/api/submit-form.ts` (Sales & Contact forms)
  - `/api/submit-support.ts` (Support tickets)
  - `/api/submit-ethics.ts` (Ethics reporting - still needs implementation if required)
- **Resend API Dependency**: No longer needed for form submissions
- **Environment Variables Removed**:
  - `RESEND_API_KEY`
  - `ZOHO_CRM_EMAIL`
  - `ZOHO_DESK_EMAIL`

### Added ✅
- **Cal.com Integration**: `src/lib/cal.ts` with headless routing utilities
- **Direct Redirect Flow**: Forms now redirect users to Cal.com for booking
- **Form Validation**: Client-side validation before redirect
- **New Environment Variables**:
  - `VITE_CAL_ORG_URL` - Your Cal.com organization URL
  - `VITE_CAL_SALES_FORM_ID` - Routing form ID for sales
  - `VITE_CAL_SUPPORT_FORM_ID` - Routing form ID for support

## Forms Migrated

### 1. Sales Forms
- **TalkToSalesModal** (`src/components/TalkToSalesModal.tsx`)
- **TalkToSales** Full Page (pending update - see below)

**Changes**:
- Added "Your Role" field (required for Cal.com routing)
- Button text changed from "Submit Request" to "Continue to Schedule Meeting"
- Form data redirects to Cal.com router with query parameters
- No more success message - users land directly on Cal.com

**Data Passed to Cal.com**:
- firstName, lastName, email (required)
- company, role, employees (required)
- website, phone, budget, interests, message (optional)

### 2. Support Form
- **Support** Page (`src/components/views/Support.tsx`)

**Changes**:
- Button text changed to "Continue to Schedule Support Call"
- Removed success confirmation state
- Form data redirects to Cal.com with support context
- Validation ensures all required fields before redirect

**Data Passed to Cal.com**:
- name, email, priority, category, subject, description (required)
- phone, company (optional)

## Setup Instructions

### Step 1: Create Cal.com Routing Forms

1. **Log into Cal.com** and navigate to your organization settings
2. **Create Sales Routing Form**:
   - Go to Routing Forms
   - Create new form called "Sales Inquiries"
   - Add fields matching the data structure (firstName, lastName, email, company, role, employees, etc.)
   - Configure routing logic (e.g., route by company size, interests, etc.)
   - Copy the Form ID from the URL
3. **Create Support Routing Form**:
   - Create another form called "Support Tickets"
   - Add fields for support data (name, email, priority, category, subject, description)
   - Configure routing by priority level (critical → immediate routing, etc.)
   - Copy the Form ID from the URL

### Step 2: Configure Environment Variables

Create a `.env` file based on `.env.example`:

```bash
# Your Cal.com organization URL
VITE_CAL_ORG_URL=https://cal.com/humaneers
# or if you have a custom domain:
# VITE_CAL_ORG_URL=https://humaneers.cal.com

# Form IDs from Cal.com
VITE_CAL_SALES_FORM_ID=abc123-def456-ghi789
VITE_CAL_SUPPORT_FORM_ID=xyz987-uvw654-rst321
```

### Step 3: Test the Integration

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Test Sales Form**:
   - Click "Let's Get Started" button
   - Fill out the sales modal form
   - Click "Continue to Schedule Meeting"
   - Verify redirect to Cal.com with pre-filled data

3. **Test Support Form**:
   - Navigate to `/support`
   - Fill out support ticket form
   - Click "Continue to Schedule Support Call"
   - Verify redirect to Cal.com with ticket details

### Step 4: Verify Cal.com Routing

1. Complete a test booking on Cal.com
2. Verify routing logic works correctly
3. Check that form data appears in Cal.com
4. Confirm calendar bookings are created

## Remaining Tasks

### 1. Update TalkToSales Full Page
The full-page sales form at `src/components/views/TalkToSales.tsx` still needs to be updated to use Cal.com routing. It should follow the same pattern as TalkToSalesModal.

### 2. Update Contact Form
The Contact form at `src/components/views/Contact.tsx` currently redirects sales inquiries to the TalkToSales page. Consider:
- Redirecting directly to Cal.com for sales category
- Keeping the form for other inquiry types (partnerships, press, careers)
- Or replacing entirely with Cal.com routing

### 3. Ethics Form (Optional)
If you want to keep the ethics reporting functionality:
- Keep the `/api/submit-ethics.ts` endpoint
- Or create a separate Cal.com form for confidential reports
- Currently ethics reporting is preserved in `src/lib/api.ts` but the endpoint is deleted

## Architecture

### Before (Zoho)
```
User fills form → Frontend → API endpoint → Resend Email → Zoho Parser → Zoho CRM/Desk
```

### After (Cal.com)
```
User fills form → Frontend validates → Redirect to Cal.com with query params → Cal.com routing → Calendar booking
```

## Benefits of Cal.com Migration

1. **Better UX**: Users schedule meetings immediately instead of waiting for callbacks
2. **Reduced Complexity**: No server-side API endpoints or email relays needed
3. **Calendar Integration**: Direct booking into team calendars
4. **Intelligent Routing**: Cal.com handles team availability and routing logic
5. **Cost Savings**: No Resend API costs, simpler infrastructure

## API Reference

### `redirectToSalesBooking(data: SalesFormData)`
Validates sales form data and redirects to Cal.com sales routing form.

### `redirectToSupportBooking(data: SupportFormData)`
Validates support form data and redirects to Cal.com support routing form.

### `validateSalesForm(data: Partial<SalesFormData>)`
Returns `{ valid: boolean, errors: string[] }`

### `validateSupportForm(data: Partial<SupportFormData>)`
Returns `{ valid: boolean, errors: string[] }`

### `getCalPreviewUrl(type: 'sales' | 'support', data)`
Returns Cal.com URL without redirecting (useful for debugging)

## Troubleshooting

### Forms not redirecting
- Check that environment variables are set correctly
- Verify `VITE_CAL_ORG_URL` includes `https://`
- Confirm form IDs match your Cal.com routing forms

### Data not appearing in Cal.com
- Ensure field names in your Cal.com form match the data being sent
- Check browser network tab for the redirect URL
- Verify query parameters are properly encoded

### Validation errors
- All required fields must be filled
- Email format must be valid
- Check browser console for specific validation messages

## Need Help?

- **Cal.com Documentation**: https://cal.com/help/routing/headless-routing
- **Cal.com Support**: Contact through your Cal.com account
- **Codebase Questions**: See `src/lib/cal.ts` for implementation details

---

**Migration Completed**: January 17, 2026
**Status**: Sales modal and Support forms migrated ✅ | TalkToSales full page and Contact form pending
