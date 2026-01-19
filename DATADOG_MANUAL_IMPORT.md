# Manual Datadog Monitor Import Guide

## Issue: API Permission Denied

The API key lacks `monitors_write` permission. Here's how to set everything up manually.

---

## Quick Fix: Update API Key Permissions

1. Go to: https://app.datadoghq.com/organization-settings/application-keys
2. Find: `ServiceAdditionKey`
3. Edit and enable these scopes:
   - ✅ `monitors_write`
   - ✅ `monitors_read`
   - ✅ `dashboards_write`
   - ✅ `dashboards_read`
4. Save and re-run script

---

## Alternative: Manual Import (No Permission Changes Needed)

### Import Monitors via UI

For each monitor in `datadog-monitors.json`:

1. Go to: https://app.datadoghq.com/monitors/create
2. Select **"Metric Monitor"** or **"Query Alert"**
3. Click **"Import from JSON"** (top right)
4. Copy monitor definition from `datadog-monitors.json`
5. Paste and click **"Create"**

### All 8 Monitors to Create:

#### 1. High Error Rate

```json
{
  "name": "Humaneers - High Error Rate",
  "type": "metric alert",
  "query": "sum(last_5m):sum:rum.error.count{service:humaneersweb,env:prod}.as_count() > 10",
  "message": "High error rate detected. {{value}} errors in last 5 minutes. @slack-alerts",
  "tags": ["service:humaneersweb", "env:prod"],
  "options": {
    "thresholds": { "critical": 10, "warning": 5 },
    "notify_no_data": true,
    "no_data_timeframe": 10
  }
}
```

#### 2. Slow LCP

```json
{
  "name": "Humaneers - Slow LCP",
  "type": "metric alert",
  "query": "avg(last_15m):avg:rum.largest_contentful_paint{service:humaneersweb,env:prod} > 2500",
  "message": "LCP is {{value}}ms (threshold: 2500ms). Page loads are slow. @slack-alerts",
  "tags": ["service:humaneersweb", "env:prod", "web-vitals"],
  "options": {
    "thresholds": { "critical": 2500, "warning": 2000 }
  }
}
```

#### 3. High CLS

```json
{
  "name": "Humaneers - High CLS",
  "type": "metric alert",
  "query": "avg(last_15m):avg:rum.cumulative_layout_shift{service:humaneersweb,env:prod} > 0.1",
  "message": "CLS is {{value}} (threshold: 0.1). Layout shifts detected. @slack-alerts",
  "tags": ["service:humaneersweb", "env:prod", "web-vitals"],
  "options": {
    "thresholds": { "critical": 0.1, "warning": 0.05 }
  }
}
```

#### 4. High FID

```json
{
  "name": "Humaneers - High FID",
  "type": "metric alert",
  "query": "avg(last_15m):avg:rum.first_input_delay{service:humaneersweb,env:prod} > 100",
  "message": "FID is {{value}}ms (threshold: 100ms). Slow interactivity. @slack-alerts",
  "tags": ["service:humaneersweb", "env:prod", "web-vitals"],
  "options": {
    "thresholds": { "critical": 100, "warning": 75 }
  }
}
```

#### 5. API Slow Response

```json
{
  "name": "Humaneers - API Slow Response",
  "type": "metric alert",
  "query": "avg(last_10m):avg:trace.vercel.handler{service:humaneersweb,env:prod,resource_name:/api/zoho/*} > 5000",
  "message": "API response time is {{value}}ms (threshold: 5000ms). @slack-alerts",
  "tags": ["service:humaneersweb", "env:prod", "api"],
  "options": {
    "thresholds": { "critical": 5000, "warning": 3000 }
  }
}
```

#### 6. Low Session Count

```json
{
  "name": "Humaneers - Low Session Count",
  "type": "metric alert",
  "query": "sum(last_1h):sum:rum.session.count{service:humaneersweb,env:prod} < 5",
  "message": "Only {{value}} sessions in last hour. Website may be down. @slack-pagerduty",
  "tags": ["service:humaneersweb", "env:prod"],
  "options": {
    "thresholds": { "critical": 5, "warning": 10 },
    "notify_no_data": true,
    "no_data_timeframe": 60
  }
}
```

#### 7. High 5xx Errors

```json
{
  "name": "Humaneers - High 5xx Errors",
  "type": "query alert",
  "query": "sum(last_10m):sum:trace.vercel.request{service:humaneersweb,env:prod,http.status_code:5*}.as_count() > 5",
  "message": "{{value}} server errors (5xx) detected. Check API logs. @slack-pagerduty",
  "tags": ["service:humaneersweb", "env:prod", "http-5xx"],
  "options": {
    "thresholds": { "critical": 5, "warning": 2 },
    "notify_no_data": true
  }
}
```

#### 8. Mobile Performance

```json
{
  "name": "Humaneers - Mobile Performance",
  "type": "metric alert",
  "query": "avg(last_30m):avg:rum.largest_contentful_paint{service:humaneersweb,env:prod,device.type:mobile} > 3500",
  "message": "Mobile LCP is {{value}}ms (threshold: 3500ms). @slack-alerts",
  "tags": ["service:humaneersweb", "env:prod", "mobile"],
  "options": {
    "thresholds": { "critical": 3500, "warning": 3000 }
  }
}
```

---

## After Creating Monitors

### Configure Notification Channels

1. **Slack Integration**:
   - https://app.datadoghq.com/integrations/slack
   - Add workspace and create `@slack-alerts` handle

2. **PagerDuty Channel**:
   - Create specific Slack channel: `#pagerduty`
   - Create Datadog handle: `@slack-pagerduty`
   - Use this for critical outages instead of the PagerDuty integration

---

## Setup Integrations

### AWS (EC2, S3)

https://app.datadoghq.com/integrations/amazon-web-services

### CloudFlare DNS

https://app.datadoghq.com/integrations/cloudflare

### Stripe

https://app.datadoghq.com/integrations/stripe

### Slack

https://app.datadoghq.com/integrations/slack

---

## Verify Setup

1. **Monitors**: https://app.datadoghq.com/monitors/manage
2. **RUM Data**: https://app.datadoghq.com/rum/explorer
3. **Logs**: https://app.datadoghq.com/logs
4. **Infrastructure**: https://app.datadoghq.com/infrastructure

---

**Tip**: Once you've updated the Application Key permissions with `monitors_write`, you can run the script again for automatic import.
