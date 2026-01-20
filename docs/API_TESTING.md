# API Testing Documentation
**Purpose:** Comprehensive guide for testing all Zoho API integrations  
**Last Updated:** 2026-01-19

---

## Overview

This document provides step-by-step instructions for testing all API endpoints to ensure proper functionality, data integrity, and error handling.

---

## Prerequisites

1. **Environment Setup:**
   ```bash
   # Ensure all Zoho credentials are configured in .env
   ZOHO_CLIENT_ID=<your_client_id>
   ZOHO_CLIENT_SECRET=<your_client_secret>
   ZOHO_REFRESH_TOKEN=<your_refresh_token>
   ZOHO_DESK_ORG_ID=<your_org_id>
   ZOHO_DESK_DEPARTMENT_ID=<your_department_id>
   ZOHO_API_DOMAIN=www.zohoapis.com
   ```

2. **Development Server:**
   ```bash
   npm run dev
   # Server runs on http://localhost:3000 (or 3001 if 3000 is occupied)
   ```

3. **Production Build (for final verification):**
   ```bash
   npm run build
   npm run start -- -p 3001
   ```

---

## Automated API Verification

### Quick Test (All Endpoints)

Run the automated verification script:

```bash
node scripts/verify-api.js
```

**Expected Output:**
```
🚀 Starting Functional API Verification...
[PASS] CRM: Lead Submission
  Path: /api/zoho/leads
  Status: 200 (Expected: 200)
  Response: {"success":true,"id":"..."}

[PASS] Desk: Ticket Creation
  Path: /api/zoho/tickets
  Status: 200 (Expected: 200)
  Response: {"success":true,"ticketNumber":"...","id":"..."}

[PASS] Newsletter: Subscribe
  Path: /api/zoho/newsletter
  Status: 200 (Expected: 200)
  Response: {"success":true,"id":"..."}

[PASS] Ethics: Report Submission
  Path: /api/submit-ethics
  Status: 200 (Expected: 200)
  Response: {"success":true,"ticketNumber":"...","id":"..."}

📊 Summary:
✅ CRM: Lead Submission: Status 200
✅ Desk: Ticket Creation: Status 200
✅ Newsletter: Subscribe: Status 200
✅ Ethics: Report Submission: Status 200
```

**Troubleshooting:**
- **422 Errors:** Check that `ZOHO_DESK_DEPARTMENT_ID` is set
- **401 Errors:** Refresh token may be expired
- **500 Errors:** Check server logs for detailed error messages

---

## Manual Testing Guide

### 1. CRM Lead Submission (`/api/zoho/leads`)

**Use Case:** "Talk to Sales" form submissions

**Test Payload:**
```json
{
  "firstName": "Test",
  "lastName": "User",
  "email": "test@example.com",
  "company": "Test Corp",
  "role": "CTO",
  "employees": "1-10",
  "message": "Test submission",
  "context": "Manual Test | Ref: Direct | Segment: business"
}
```

**cURL Command:**
```bash
curl -X POST http://localhost:3000/api/zoho/leads \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "company": "Test Corp",
    "role": "CTO",
    "employees": "1-10",
    "message": "Test submission",
    "context": "Manual Test"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "id": "7187277000000854006"
}
```

**Verification in Zoho CRM:**
1. Log into Zoho CRM
2. Navigate to Leads module
3. Search for "test@example.com"
4. Verify all fields are correctly populated
5. Check Lead Source is derived correctly

---

### 2. Newsletter Subscription (`/api/zoho/newsletter`)

**Use Case:** Newsletter signup forms

**Test Payload:**
```json
{
  "email": "newsletter-test@example.com",
  "source": "Manual Test",
  "context": "Landed: /pricing | Segment: business"
}
```

**cURL Command:**
```bash
curl -X POST http://localhost:3000/api/zoho/newsletter \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newsletter-test@example.com",
    "source": "Manual Test"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "id": "7187277000000853006"
}
```

**Duplicate Test:**
Submit the same email twice. Second submission should return:
```json
{
  "success": true,
  "message": "Already subscribed"
}
```

---

### 3. Support Ticket Creation (`/api/zoho/tickets`)

**Use Case:** Support form submissions

**Test Payload:**
```json
{
  "name": "Test User",
  "email": "support-test@example.com",
  "subject": "Test Support Ticket",
  "description": "This is a test ticket for API verification",
  "priority": "medium",
  "category": "Technical Support",
  "context": "Segment: business | Landed: /support"
}
```

**cURL Command:**
```bash
curl -X POST http://localhost:3000/api/zoho/tickets \
  -H "Content-Type": application/json" \
  -d '{
    "name": "Test User",
    "email": "support-test@example.com",
    "subject": "Test Support Ticket",
    "description": "This is a test ticket",
    "priority": "medium",
    "category": "Technical Support"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "ticketNumber": "101",
  "id": "1222873000000471077"
}
```

**Verification in Zoho Desk:**
1. Log into Zoho Desk
2. Navigate to Tickets
3. Find ticket by number or email
4. Verify priority, category, and description

---

### 4. Ethics Report Submission (`/api/submit-ethics`)

**Use Case:** Confidential whistleblower reports

**Test Payload (Anonymous):**
```json
{
  "isAnonymous": true,
  "reportType": "general",
  "details": "This is a test ethics report submitted anonymously"
}
```

**Test Payload (Named):**
```json
{
  "isAnonymous": false,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "reportType": "fraud",
  "details": "This is a test ethics report with contact information"
}
```

**cURL Command (Anonymous):**
```bash
curl -X POST http://localhost:3000/api/submit-ethics \
  -H "Content-Type: application/json" \
  -d '{
    "isAnonymous": true,
    "reportType": "general",
    "details": "Test anonymous ethics report"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "ticketNumber": "102",
  "id": "1222873000000476077"
}
```

**Verification:**
1. Check Zoho Desk for high-priority ticket
2. Verify subject includes "Ethics Report"
3. Verify anonymous submissions use placeholder contact
4. Verify classification is set to "Ethics"

---

## Frontend Form Testing

### Talk to Sales Form
1. Navigate to `/talk-to-sales`
2. Fill out all required fields
3. Submit form
4. Verify success toast notification
5. Verify redirect to `/thank-you`
6. Check Zoho CRM for lead creation

### Newsletter Form
1. Find newsletter signup (footer or homepage)
2. Enter email address
3. Submit
4. Verify success toast
5. Try submitting same email again
6. Verify "Already subscribed" message

### Support Form
1. Navigate to `/support`
2. Fill out support ticket form
3. Test different priority levels
4. Submit
5. Verify success toast
6. Check Zoho Desk for ticket

### Ethics Form
1. Navigate to `/ethics`
2. Toggle "Submit Anonymously"
3. Fill out report details
4. Submit both anonymous and named reports
5. Verify success confirmation
6. Check Zoho Desk for high-priority tickets

---

## Error Handling Tests

### Missing Required Fields
```bash
curl -X POST http://localhost:3000/api/zoho/leads \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

**Expected:** `400 Bad Request` with error message

### Invalid Email Format
```bash
curl -X POST http://localhost:3000/api/zoho/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email": "not-an-email"}'
```

**Expected:** Validation error from frontend (backend accepts any string)

### Network Timeout Simulation
Temporarily disable internet connection and submit a form.

**Expected:** Toast error notification with user-friendly message

---

## Regression Testing Schedule

### Daily (Development)
- Run `node scripts/verify-api.js` before committing changes

### Weekly (Staging)
- Full manual form testing on staging environment
- Verify all Zoho integrations

### Pre-Release (Production)
- Complete automated test suite
- Manual verification of all forms
- Check Zoho CRM/Desk for data integrity

---

## Monitoring & Alerts

### Production Monitoring
- **Datadog RUM:** Track API response times
- **Zoho Desk:** Monitor ticket creation rates
- **Error Logs:** Review server logs for 500 errors

### Key Metrics
- API success rate (target: >99%)
- Average response time (target: <500ms)
- Form abandonment rate

---

## Troubleshooting Common Issues

### "Missing required fields" (400)
- Check payload structure matches interface
- Verify all required fields are present

### "Configuration error" (500)
- Check `.env` file for missing variables
- Verify `ZOHO_DESK_DEPARTMENT_ID` is set

### "Failed to refresh Zoho access token" (500)
- Refresh token may be expired
- Regenerate OAuth credentials in Zoho

### "The data is invalid due to validation restrictions" (422)
- Department ID is missing or invalid
- Run `node scripts/get-departments-simple.js` to fetch valid ID

---

## Appendix: Script Reference

### `scripts/verify-api.js`
Automated testing script for all API endpoints.

**Usage:**
```bash
node scripts/verify-api.js
```

### `scripts/get-departments-simple.js`
Fetches available Zoho Desk departments.

**Usage:**
```bash
# Set environment variables first
export ZOHO_CLIENT_ID=...
export ZOHO_CLIENT_SECRET=...
export ZOHO_REFRESH_TOKEN=...
export ZOHO_DESK_ORG_ID=...

node scripts/get-departments-simple.js
```

---

**Maintained by:** Engineering Team  
**Last Verified:** 2026-01-19  
**Next Review:** Weekly
