# Datadog RUM & Monitoring Setup Guide

## Overview
This guide covers setting up Datadog Real User Monitoring (RUM), Application Performance Monitoring (APM), and alerting for the Humaneers website.

## Prerequisites
- Datadog account (sign up at https://www.datadoghq.com)
- Datadog API key and Application ID
- Access to Vercel dashboard for environment variables

---

## 1. Initial Datadog Account Setup

### Step 1.1: Create a Datadog Account
1. Sign up at https://app.datadoghq.com/signup
2. Choose the appropriate region (US1, US3, US5, EU, etc.)
3. Complete organization setup

### Step 1.2: Create RUM Application
1. Navigate to **UX Monitoring > Real User Monitoring > Applications**
2. Click **New Application**
3. Configure:
   - **Application Name**: `Humaneers Website - Production`
   - **Application Type**: `Browser`
   - **Framework**: `React`
4. Save and note your **Application ID** and **Client Token**

### Step 1.3: Create Additional Applications (Recommended)
Create separate RUM applications for each environment:
- `Humaneers Website - Staging` (for Vercel preview deployments)
- `Humaneers Website - Development` (for local development)

This allows environment-specific monitoring and alerting.

---

## 2. Environment Variables Configuration

### Step 2.1: Add to `.env.local` (Development)
```bash
# Datadog RUM Configuration
NEXT_PUBLIC_DATADOG_APPLICATION_ID=your-application-id-here
NEXT_PUBLIC_DATADOG_CLIENT_TOKEN=your-client-token-here
NEXT_PUBLIC_DATADOG_SITE=datadoghq.com  # or datadoghq.eu, us3.datadoghq.com, etc.
NEXT_PUBLIC_DATADOG_SERVICE=humaneers-website
NEXT_PUBLIC_DATADOG_ENV=development
NEXT_PUBLIC_DATADOG_VERSION=0.2.0  # Match package.json version
NEXT_PUBLIC_DATADOG_SAMPLE_RATE=100  # 100% sampling for dev
NEXT_PUBLIC_DATADOG_TRACK_SESSIONS=true
NEXT_PUBLIC_DATADOG_TRACK_RESOURCES=true
NEXT_PUBLIC_DATADOG_TRACK_LONG_TASKS=true
```

### Step 2.2: Add to Vercel Environment Variables
1. Go to **Vercel Dashboard > Your Project > Settings > Environment Variables**
2. Add the following for **Production**:
   - `NEXT_PUBLIC_DATADOG_APPLICATION_ID` = (production app ID)
   - `NEXT_PUBLIC_DATADOG_CLIENT_TOKEN` = (production client token)
   - `NEXT_PUBLIC_DATADOG_SITE` = `datadoghq.com`
   - `NEXT_PUBLIC_DATADOG_SERVICE` = `humaneers-website`
   - `NEXT_PUBLIC_DATADOG_ENV` = `production`
   - `NEXT_PUBLIC_DATADOG_VERSION` = `0.2.0`
   - `NEXT_PUBLIC_DATADOG_SAMPLE_RATE` = `20` (20% sampling for cost control)
   - `NEXT_PUBLIC_DATADOG_TRACK_SESSIONS` = `true`
   - `NEXT_PUBLIC_DATADOG_TRACK_RESOURCES` = `true`
   - `NEXT_PUBLIC_DATADOG_TRACK_LONG_TASKS` = `true`

3. For **Preview** environments, use staging app credentials
4. For **Development**, use development app credentials

### Step 2.3: Update `.env.example`
Add these lines to your `.env.example` file for documentation.

---

## 3. Code Implementation Files

I've created the following implementation files for you:

1. **src/lib/datadog.ts** - Core Datadog RUM SDK initialization and utilities
2. **src/components/DatadogRUM.tsx** - React component for consent-aware initialization
3. Updated **src/components/Analytics.tsx** - Integration with existing analytics

The implementation includes:
- ✅ Consent-aware initialization (respects cookie consent)
- ✅ Environment-specific configuration
- ✅ Error tracking and reporting
- ✅ User session tracking
- ✅ Custom actions and timing metrics
- ✅ Resource and long task monitoring
- ✅ Integration with Zoho SalesIQ user context

---

## 4. Datadog Dashboard Configuration

### Step 4.1: Create Custom Dashboards

#### Performance Dashboard
1. Navigate to **Dashboards > New Dashboard**
2. Name: `Humaneers - Performance Metrics`
3. Add widgets:
   - **Page Load Time**: Timeseries of `@view.loading_time`
   - **Largest Contentful Paint (LCP)**: P75/P90/P95 of `@view.largest_contentful_paint`
   - **First Input Delay (FID)**: P75/P90/P95 of `@view.first_input_delay`
   - **Cumulative Layout Shift (CLS)**: P75/P90/P95 of `@view.cumulative_layout_shift`
   - **Error Rate**: Count of errors grouped by `@error.type`
   - **Active Users**: Real-time user count

#### Business Metrics Dashboard
1. Name: `Humaneers - Business KPIs`
2. Add widgets:
   - **Form Submissions**: Count of custom actions `form_submit`
   - **Modal Opens**: Count of custom actions `modal_open`
   - **CTA Clicks**: Count of custom actions `cta_click`
   - **Zoho Lead Success Rate**: Success/failure ratio from custom actions
   - **User Journey Funnel**: Homepage → Pricing → Contact Form

#### Error Tracking Dashboard
1. Name: `Humaneers - Error Monitoring`
2. Add widgets:
   - **Error Count**: Timeseries of all errors
   - **Top Errors**: Top list grouped by `@error.message`
   - **Errors by Page**: Top list grouped by `@view.url_path`
   - **JavaScript Errors**: Filter by `@error.source:source`
   - **API Errors**: Filter by `@error.source:network`

---

## 5. Alert Configuration

### Step 5.1: Critical Alerts (Immediate Response Required)

#### Alert 1: High Error Rate
- **Name**: `[CRITICAL] High Error Rate - Humaneers`
- **Type**: Log Monitor
- **Query**: `source:browser service:humaneers-website status:error`
- **Threshold**: Critical > 10 errors in 5 minutes, Warning > 5 errors in 5 minutes
- **Notification**: Email + Slack

#### Alert 2: Site Down (No Traffic)
- **Name**: `[CRITICAL] No Traffic Detected - Humaneers`
- **Type**: RUM Monitor
- **Query**: `service:humaneers-website env:production`
- **Metric**: `rum.session.count`
- **Threshold**: Critical < 1 session in 10 minutes (during business hours)
- **Notification**: Email (high priority) + SMS

#### Alert 3: API Failure (Zoho Integration)
- **Name**: `[CRITICAL] Zoho API Failures - Humaneers`
- **Type**: Log Monitor
- **Query**: `service:humaneers-website @error.message:*zoho* OR @error.message:*lead*`
- **Threshold**: Critical > 5 failures in 10 minutes, Warning > 2 failures in 10 minutes
- **Notification**: Email

### Step 5.2: Performance Alerts

#### Alert 4: Poor Core Web Vitals
- **Name**: `[WARNING] Poor Core Web Vitals - Humaneers`
- **Type**: RUM Monitor
- **Metric**: `rum.view.largest_contentful_paint (p75)`
- **Threshold**: Warning > 2500ms, Critical > 4000ms
- **Evaluation**: Over last 15 minutes
- **Notification**: Email

#### Alert 5: Slow Page Load Times
- **Name**: `[WARNING] Slow Page Load Times - Humaneers`
- **Type**: RUM Monitor
- **Metric**: `rum.view.loading_time (p90)`
- **Threshold**: Warning > 3000ms, Critical > 5000ms
- **Notification**: Email

### Step 5.3: Business Impact Alerts

#### Alert 6: Form Submission Failures
- **Name**: `[WARNING] Contact Form Failures - Humaneers`
- **Type**: RUM Monitor (Custom Action)
- **Query**: `service:humaneers-website @action.name:zoho_submit_fail`
- **Threshold**: Warning > 3 failures in 30 minutes, Critical > 10 failures in 30 minutes
- **Notification**: Email (high priority)

---

## 6. How to Create Alerts in Datadog

1. Navigate to **Monitors > New Monitor**
2. Choose monitor type:
   - **Metric Monitor** for performance metrics
   - **Log Monitor** for error tracking
   - **RUM Monitor** for user experience metrics
3. Define the query using the examples above
4. Set thresholds (Warning/Critical)
5. Configure notification channels:
   - Email
   - Slack (integrate via Datadog integrations)
   - PagerDuty (for critical alerts)
6. Add message template with actionable context
7. Save and enable monitor

---

## 7. Notification Channel Setup

### Email Notifications
Already configured with your Datadog account email.

### Slack Integration
1. Go to **Integrations > Slack**
2. Click **Add Slack Account**
3. Authorize Datadog app in your Slack workspace
4. Configure channel routing:
   - `#alerts-critical` → Critical alerts
   - `#alerts-performance` → Performance warnings
   - `#alerts-business` → Business metric alerts

### PagerDuty (Optional, for 24/7 monitoring)
1. Go to **Integrations > PagerDuty**
2. Connect your PagerDuty account
3. Route critical alerts (site down, high error rate) to on-call rotation

---

## 8. Testing Your Setup

### Step 8.1: Verify RUM is Working
1. Deploy your code with Datadog integration
2. Visit https://humaneers.dev
3. Navigate to **Datadog > RUM > Sessions**
4. You should see your session appear within 30 seconds

### Step 8.2: Test Error Tracking
Temporarily add this to a page component:
```typescript
throw new Error("Test Datadog Error Tracking");
```
Check that error appears in Datadog RUM Explorer.

### Step 8.3: Test Custom Actions
Trigger a form submission and verify:
- Custom action `form_submit` appears in RUM
- User context includes session ID

### Step 8.4: Test Alerts
Manually trigger alert conditions:
- For error rate alert: Cause multiple errors
- For no traffic alert: Wait during monitoring window
- Verify you receive notifications

---

## 9. Best Practices

### Sampling Strategy
- **Production**: 20-50% sampling to control costs while capturing representative data
- **Staging**: 100% sampling for thorough testing
- **Development**: 100% sampling

### Data Retention
- RUM sessions: 15 days (default)
- Logs: 15 days (adjust based on compliance needs)
- Metrics: 15 months

### Privacy Compliance
- PII masking is enabled by default in `datadog.ts`
- Email addresses, credit cards, and sensitive data are automatically redacted
- Session replay is disabled to protect user privacy

### Cost Management
- Monitor your Datadog usage at **Plan & Usage**
- Adjust sample rates if costs exceed budget
- Use indexed logs sparingly (focus on errors)
- Archive long-term logs to S3 if needed

---

## 10. Monitoring Checklist

After setup, ensure:
- [ ] RUM data flowing to Datadog dashboard
- [ ] All 6 recommended alerts configured and enabled
- [ ] Notification channels tested (email, Slack)
- [ ] Custom dashboards created for performance, business, and errors
- [ ] Team members have appropriate Datadog access
- [ ] Documentation shared with team
- [ ] Weekly review of dashboards scheduled
- [ ] Monthly review of alert thresholds and accuracy

---

## 11. Datadog Resources

- **RUM Documentation**: https://docs.datadoghq.com/real_user_monitoring/
- **Browser SDK**: https://docs.datadoghq.com/real_user_monitoring/browser/
- **Alert Guide**: https://docs.datadoghq.com/monitors/
- **Dashboard Guide**: https://docs.datadoghq.com/dashboards/

---

## Support

For questions or issues with this setup:
- **Datadog Support**: https://help.datadoghq.com/
- **Implementation Issues**: Review `src/lib/datadog.ts` and error logs
- **Alert Tuning**: Adjust thresholds based on observed baseline metrics

---

**Last Updated**: January 20, 2026
**Version**: 0.2.0
**Maintained By**: Humaneers Engineering Team
