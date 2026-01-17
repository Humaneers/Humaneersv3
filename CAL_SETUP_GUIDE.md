# Cal.com Setup Guide

This guide will walk you through setting up Cal.com routing forms for the Humaneers website.

## Prerequisites

- A Cal.com account (sign up at https://cal.com)
- Admin access to your Cal.com organization
- Access to the Humaneers codebase

## Step 1: Set Up Your Cal.com Organization

1. **Log into Cal.com** at https://cal.com
2. **Create or select your organization**:
   - Go to Settings → Organizations
   - Create a new organization (e.g., "Humaneers") or use an existing one
   - Note your organization URL (e.g., `https://cal.com/humaneers` or `https://humaneers.cal.com`)

## Step 2: Create Sales Routing Form

1. **Navigate to Routing Forms**:
   - In your Cal.com dashboard, go to **Apps → Routing Forms**
   - Click "Create New Routing Form"

2. **Configure Sales Form**:
   - **Name**: "Sales Inquiries" or "Sales & Strategy"
   - **Description**: "Schedule a consultation about our services"

3. **Add Form Fields** (in this exact order for best results):

   | Field Name | Type | Required | Notes |
   |------------|------|----------|-------|
   | `firstName` | Short Text | Yes | First name |
   | `lastName` | Short Text | Yes | Last name |
   | `email` | Email | Yes | Email address |
   | `company` | Short Text | Yes | Company name |
   | `website` | URL | No | Company website |
   | `role` | Short Text | Yes | Job title/role |
   | `employees` | Single Select | Yes | Options: "1-10", "11-50", "51-200", "201+" |
   | `phone` | Phone | No | Phone number |
   | `budget` | Single Select | No | Options: "<2k", "2k-5k", "5k-10k", "10k+", "unsure" |
   | `interests` | Long Text | No | Comma-separated interests |
   | `message` | Long Text | No | Additional message |

4. **Set Up Routing Logic**:

   Example routing rules:
   - **If `employees` = "201+"** → Route to Senior Sales Rep
   - **If `budget` = "10k+"** → Route to Enterprise Sales Team
   - **If `interests` contains "Compliance"** → Route to Compliance Specialist
   - **Default** → Route to General Sales Team

5. **Configure Booking Settings**:
   - Set meeting duration (e.g., 30 minutes for discovery call)
   - Add buffer time if needed
   - Set up confirmation emails

6. **Save and Get Form ID**:
   - Click "Save"
   - Copy the Form ID from the URL (e.g., if URL is `https://cal.com/forms/abc123-def456`, the ID is `abc123-def456`)
   - Save this ID - you'll need it for the environment variables

## Step 3: Create Support Routing Form

1. **Create New Routing Form**:
   - Name: "Support Tickets" or "Technical Support"
   - Description: "Get help with existing services"

2. **Add Form Fields**:

   | Field Name | Type | Required | Notes |
   |------------|------|----------|-------|
   | `name` | Short Text | Yes | Full name |
   | `email` | Email | Yes | Email address |
   | `phone` | Phone | No | Phone number |
   | `company` | Short Text | No | Company name |
   | `priority` | Single Select | Yes | Options: "critical", "high", "medium", "low" |
   | `category` | Single Select | Yes | Options: "technical", "account", "security", "feature", "other" |
   | `subject` | Short Text | Yes | Issue subject |
   | `description` | Long Text | Yes | Detailed description |

3. **Set Up Routing Logic**:

   Priority-based routing:
   - **If `priority` = "critical"** → Route to On-Call Engineer (immediate availability)
   - **If `priority` = "high"** → Route to Senior Support (< 1 hour availability)
   - **If `priority` = "medium"** → Route to Support Team (< 4 hours)
   - **If `priority` = "low"** → Route to Support Queue (< 24 hours)

   Category-based routing:
   - **If `category` = "security"** → Route to Security Team
   - **If `category` = "account"** → Route to Account Management
   - **Default** → Route to Technical Support

4. **Save and Get Form ID**:
   - Save the form
   - Copy the Form ID from the URL
   - Save this ID for environment variables

## Step 4: Configure Environment Variables

1. **Create `.env` file** in your project root:
   ```bash
   cp .env.example .env
   ```

2. **Add your Cal.com configuration**:
   ```bash
   # Your Cal.com organization URL
   VITE_CAL_ORG_URL=https://cal.com/humaneers
   # Or if you have a custom domain:
   # VITE_CAL_ORG_URL=https://humaneers.cal.com

   # Form IDs from Cal.com
   VITE_CAL_SALES_FORM_ID=your-sales-form-id-here
   VITE_CAL_SUPPORT_FORM_ID=your-support-form-id-here
   ```

3. **Replace the placeholder values**:
   - Replace `https://cal.com/humaneers` with your actual Cal.com URL
   - Replace `your-sales-form-id-here` with the Sales Form ID you copied
   - Replace `your-support-form-id-here` with the Support Form ID you copied

## Step 5: Test the Integration

1. **Start your development server**:
   ```bash
   npm run dev
   ```

2. **Test Sales Form**:
   - Navigate to the homepage
   - Click "Let's Get Started" button
   - Fill out the sales modal form
   - Click "Continue to Schedule Meeting"
   - ✅ You should be redirected to Cal.com with pre-filled data
   - ✅ Verify all form fields appear in Cal.com
   - ✅ Complete a test booking

3. **Test Support Form**:
   - Navigate to `/support` or click "Get Support"
   - Fill out the support ticket form
   - Click "Continue to Schedule Support Call"
   - ✅ You should be redirected to Cal.com
   - ✅ Verify all ticket details are pre-filled
   - ✅ Complete a test booking

4. **Test Full-Page Sales Form**:
   - Navigate to `/talk-to-sales`
   - Fill out the detailed consultation form
   - Click "Continue to Schedule Meeting"
   - ✅ Verify redirect and data transfer

5. **Test Contact Page**:
   - Navigate to `/contact`
   - Select "Sales & Strategy" from dropdown
   - ✅ Should redirect to sales form
   - Select "Technical Support"
   - ✅ Should redirect to support form

## Step 6: Configure Cal.com Notifications

1. **Set up email notifications**:
   - Go to Cal.com Settings → Notifications
   - Configure confirmation emails for bookers
   - Set up notifications for your team when bookings are made

2. **Configure calendar integration**:
   - Connect Google Calendar, Outlook, or other calendar
   - Ensure bookings appear on your team's calendars

3. **Set up reminders**:
   - Configure automatic reminders for attendees
   - Set up pre-meeting notifications

## Troubleshooting

### Forms not redirecting
**Problem**: Clicking submit doesn't redirect to Cal.com

**Solutions**:
- Check browser console for errors
- Verify `.env` file exists and is in project root
- Confirm environment variables are loaded (check with `console.log(import.meta.env.VITE_CAL_ORG_URL)`)
- Restart dev server after changing `.env`

### Data not appearing in Cal.com
**Problem**: Form redirects but data isn't pre-filled

**Solutions**:
- Check that Cal.com form field names match exactly
- Verify URL in browser address bar contains query parameters
- Check for special characters that need encoding
- Ensure field types match (text, select, etc.)

### Form ID not working
**Problem**: "Form not found" error from Cal.com

**Solutions**:
- Double-check the Form ID from Cal.com URL
- Ensure no extra spaces in `.env` file
- Verify the form is published and active in Cal.com
- Check organization URL is correct

### Missing required fields error
**Problem**: Validation error before redirect

**Solutions**:
- Ensure all required fields in the form are filled
- Check email format is valid
- Verify company name and role are provided
- Check browser console for specific validation errors

## Advanced Configuration

### Custom Routing Logic

You can create more sophisticated routing in Cal.com:

1. **Round-robin distribution**: Distribute leads evenly across team members
2. **Load balancing**: Route to team members with availability
3. **Skill-based routing**: Match prospects to specialists based on interests/needs
4. **Geographic routing**: Route based on company location or timezone

### Integration with CRM

Cal.com can integrate with:
- **HubSpot**: Automatic contact creation
- **Salesforce**: Lead capture and tracking
- **Pipedrive**: Deal creation from bookings
- **Zapier**: Connect to 1000+ apps

### Analytics & Reporting

Monitor your booking performance:
- Track conversion rates from form to booking
- Monitor response times by priority level
- Analyze which team members close the most deals
- Review booking completion rates

## Next Steps

1. ✅ **Production Deployment**:
   - Add environment variables to your hosting platform (Vercel, Netlify, etc.)
   - Deploy the updated code
   - Test in production environment

2. ✅ **Team Training**:
   - Train sales team on Cal.com interface
   - Set up calendar availability for all team members
   - Configure notification preferences

3. ✅ **Monitor & Optimize**:
   - Track booking conversion rates
   - Adjust routing logic based on performance
   - Optimize form fields based on user feedback

## Support

- **Cal.com Documentation**: https://cal.com/docs
- **Routing Forms Guide**: https://cal.com/help/routing/headless-routing
- **Cal.com Support**: Contact through your Cal.com account
- **Codebase Questions**: See `/CAL_MIGRATION.md` and `/src/lib/cal.ts`

---

**Last Updated**: January 17, 2026
