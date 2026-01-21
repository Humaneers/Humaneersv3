# Datadog Alerts Quick Reference

## Critical Alerts Setup (Copy & Paste Ready)

### 1. High Error Rate Alert

**Monitor Type**: Log Monitor

**Query**:
```
source:browser service:humaneers-website status:error
```

**Thresholds**:
- Alert: `> 10` errors in 5 minutes
- Warning: `> 5` errors in 5 minutes

**Message**:
```
{{#is_alert}}
🚨 CRITICAL: High error rate detected on Humaneers website

Error count: {{value}} in the last 5 minutes

Dashboard: {{rum_link}}
Time: {{last_triggered_at}}

ACTION REQUIRED: Investigate immediately
{{/is_alert}}

{{#is_warning}}
⚠️ WARNING: Elevated error rate on Humaneers website

Error count: {{value}} in the last 5 minutes

Monitor the situation: {{rum_link}}
{{/is_warning}}
```

---

### 2. Site Down (No Traffic) Alert

**Monitor Type**: Metric Monitor

**Metric**: `rum.session.count`

**Query**:
```
sum(last_10m):sum:rum.session.count{service:humaneers-website,env:production} < 1
```

**Thresholds**:
- Alert: `< 1` session in 10 minutes

**Message**:
```
{{#is_alert}}
🚨 CRITICAL: No traffic detected on Humaneers website

This indicates the site may be down or RUM is broken.

IMMEDIATE ACTION:
1. Check https://humaneers.dev in browser
2. Check Vercel deployment status
3. Verify Datadog RUM configuration

Dashboard: {{rum_link}}
{{/is_alert}}
```

**Note**: Configure this alert to only trigger during business hours (9 AM - 6 PM) to avoid false alarms.

---

### 3. Zoho API Failures Alert

**Monitor Type**: Log Monitor

**Query**:
```
source:browser service:humaneers-website (@error.message:*zoho* OR @error.message:*lead* OR @action.name:*submit_fail*)
```

**Thresholds**:
- Alert: `> 5` failures in 10 minutes
- Warning: `> 2` failures in 10 minutes

**Message**:
```
{{#is_alert}}
🚨 CRITICAL: Zoho CRM integration is failing

Failed submissions: {{value}}

This is impacting lead capture and revenue.

ACTION REQUIRED:
1. Check Zoho API credentials in Vercel env vars
2. Verify /api/contact endpoint is responding
3. Check Zoho API rate limits

Dashboard: {{rum_link}}
{{/is_alert}}
```

---

### 4. Poor Core Web Vitals Alert

**Monitor Type**: RUM Monitor

**Metric**: `rum.view.largest_contentful_paint` (p75)

**Query**:
```
avg(last_15m):p75:rum.view.largest_contentful_paint{service:humaneers-website,env:production} > 2500
```

**Thresholds**:
- Alert: `> 4000` ms (p75)
- Warning: `> 2500` ms (p75)

**Message**:
```
{{#is_warning}}
⚠️ WARNING: Core Web Vitals degrading

LCP (p75): {{value}}ms
Target: < 2500ms

This impacts SEO rankings and user experience.

Check:
- Heavy JavaScript bundles
- Unoptimized images
- Slow API responses

Performance Dashboard: {{rum_link}}
{{/is_warning}}
```

---

### 5. Slow Page Load Times Alert

**Monitor Type**: RUM Monitor

**Metric**: `rum.view.loading_time` (p90)

**Query**:
```
avg(last_15m):p90:rum.view.loading_time{service:humaneers-website,env:production} > 3000
```

**Thresholds**:
- Alert: `> 5000` ms (p90)
- Warning: `> 3000` ms (p90)

**Message**:
```
{{#is_warning}}
⚠️ Page load times are degraded

P90 Load Time: {{value}}ms
Target: < 3000ms

Investigate:
- CDN performance
- Bundle sizes
- Third-party scripts (Zoho, ContentSquare)
- API response times

Performance Dashboard: {{rum_link}}
{{/is_warning}}
```

---

### 6. Form Submission Failures Alert

**Monitor Type**: RUM Monitor (Custom Action)

**Query**:
```
sum(last_30m):sum:rum.action.count{service:humaneers-website,@action.name:form_submit_fail} > 3
```

**Thresholds**:
- Alert: `> 10` failures in 30 minutes
- Warning: `> 3` failures in 30 minutes

**Message**:
```
{{#is_alert}}
🚨 Contact form submissions are failing

Failed submissions: {{value}} in last 30 minutes

REVENUE IMPACT - investigate immediately

Check:
1. Form validation logic
2. API endpoint health
3. Client-side JavaScript errors
4. Browser console for errors

Dashboard: {{rum_link}}
{{/is_alert}}
```

---

## Notification Setup

### Slack Integration
```
@slack-humaneers-alerts-critical
```

### Email
```
your-email@humaneers.dev
```

### PagerDuty (Optional)
```
@pagerduty-oncall
```

---

## Alert Naming Convention

Use this format for consistency:
```
[SEVERITY] Description - Service Name
```

Examples:
- `[CRITICAL] High Error Rate - Humaneers`
- `[WARNING] Poor Core Web Vitals - Humaneers`

---

## Testing Alerts

After creating alerts, test them:

1. **Error Rate**: Trigger test errors in browser console
2. **No Traffic**: Wait during off-hours (expected)
3. **Zoho Failures**: Temporarily break API credentials
4. **Performance**: Test on slow 3G connection
5. **Form Failures**: Submit form with invalid data

---

## Monitor Tags

Add these tags to all monitors for organization:

- `service:humaneers-website`
- `env:production`
- `team:engineering`
- `priority:high` (for critical alerts)
- `priority:medium` (for warnings)

---

## Alert Tuning Schedule

Review and adjust thresholds:
- **Weekly**: Check false positive rate
- **Monthly**: Adjust thresholds based on baseline metrics
- **Quarterly**: Review alert coverage and add new alerts

---

**Last Updated**: January 20, 2026
**Maintained By**: Humaneers Engineering Team
