# Datadog Setup Guide

## Security Notice

**⚠️ ROTATE YOUR API KEY IMMEDIATELY**

You exposed your API key in chat. Go to [Datadog API Keys](https://app.datadoghq.com/organization-settings/api-keys) and:

1. Revoke key: `2b84d6c6-2e3e-4699-a587-f9b354caae3e`
2. Create a new API key
3. Create an Application key (if you don't have one)

---

## Prerequisites

1. **API Key** - From [API Keys Settings](https://app.datadoghq.com/organization-settings/api-keys)
2. **Application Key** - From [Application Keys Settings](https://app.datadoghq.com/organization-settings/application-keys)
3. **RUM Application** - Create at [RUM Applications](https://app.datadoghq.com/rum/list)

### Required Application Key Scopes

To run the import script successfully, your Application Key must have these scopes enabled:

- **Monitors**: `monitors_read`, `monitors_write`
- **Dashboards**: `dashboards_read`, `dashboards_write`
- **Service Definition**: `service_definition_read`, `service_definition_write`

---

## Option 1: Import Monitors via Script (Recommended)

```bash
# Navigate to project directory
cd /Users/arron/Library/Mobile\ Documents/com~apple~CloudDocs/Repositories/Humaneersv3

# Make script executable
chmod +x scripts/import-datadog-monitors.sh

# Edit script and add your credentials
nano scripts/import-datadog-monitors.sh
# Replace: DD_API_KEY and DD_APP_KEY

# Run import
./scripts/import-datadog-monitors.sh
```

---

## Option 2: Import via Datadog UI

1. Go to [Monitors → New Monitor](https://app.datadoghq.com/monitors/create)
2. Click "Import Monitor JSON"
3. Copy each monitor from `datadog-monitors.json`
4. Paste and create

---

## Option 3: Use Datadog API Directly

```bash
# Set your credentials
export DD_API_KEY="your-api-key"
export DD_APP_KEY="your-app-key"

# Import a single monitor
curl -X POST "https://api.datadoghq.com/api/v1/monitor" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
  -d @- << 'EOF'
{
  "name": "Humaneers - High Error Rate",
  "type": "metric alert",
  "query": "sum(last_5m):sum:rum.error.count{service:humaneersweb,env:prod}.as_count() > 10",
  "message": "High error rate detected. @slack-alerts",
  "tags": ["service:humaneersweb", "env:prod"],
  "options": {
    "thresholds": {"critical": 10, "warning": 5}
  }
}
EOF
```

---

## RUM Setup

Your RUM is already configured in `src/main.tsx`:

```typescript
import { datadogRum } from "@datadog/browser-rum";

datadogRum.init({
  applicationId: "YOUR_APP_ID", // Get from Datadog RUM
  clientToken: "YOUR_CLIENT_TOKEN",
  site: "datadoghq.com",
  service: "humaneersweb",
  env: "prod",
  // ... existing config
});
```

**Update these values:**

1. Create RUM application: https://app.datadoghq.com/rum/list
2. Copy Application ID and Client Token
3. Update `src/main.tsx` with your values
4. Deploy to Vercel

---

## Verify Setup

1. **Check RUM**: https://app.datadoghq.com/rum/explorer
2. **Check Monitors**: https://app.datadoghq.com/monitors/manage
3. **Check Logs**: https://app.datadoghq.com/logs

---

## Monitoring Specifications & Requirements

### 1. Full Stack Inventory & Observability

All components must be registered in the Service Catalog with `env:prod` tag:

- **Frontend**: React/Vite RUM (`humaneersweb`)
- **API**: Vercel Serverless Functions (`humaneersweb-api`)
- **Infrastructure**: AWS EC2 & S3 (`aws-infrastructure`)
- **Network**: CloudFlare DNS & Security (`cloudflare-dns`)
- **Payments**: Stripe Payment Processing (`stripe-payments`)
- **Integrations**: Zoho CRM & Zoho Desk

### 2. Alerting & Incident Management

- **Monitors**: Critical alerts for Errors, Latency, and Traffic drops.
- **On-Call**: Schedule configured in Datadog with escalation policies.
- **Incident Reporting**: Sev-1/Sev-2 incidents trigger PagerDuty/Slack.
- **Notification Channels**:
  - `@slack-pagerduty` (Slack) for critical outages

### 3. Security & Governance

- **Security Contacts**: `security@humaneers.dev` attached to all services.
- **Team Ownership**: All services owned by Engineering/DevOps/Finance.
- **Tiers**: Critical/High tiers assigned for prioritization.

### 4. Software Delivery (CI/CD)

- **Pipeline Monitoring**: Vercel & GitHub Actions deployments tracked.
- **Versioning**: RUM releases tagged with version numbers.
- **DORA Metrics**: Deployment frequency and change failure rate tracking.

### 5. Cost & Billing

- **Cloud Costs**: AWS Cost Explorer & Vercel usage integrated.
- **Budget Alerts**: Notifications when resource usage exceeds thresholds.
- **Resource Optimization**: Idle EC2/RDS detection.

---

1. ✅ Rotate exposed API key
2. ✅ Get Application key from Datadog
3. ✅ Import monitors using script or UI
4. ✅ Update RUM config in main.tsx
5. ✅ Configure notification channels (@slack-alerts)
6. ✅ Deploy and verify data is flowing
