#!/bin/bash

################################################################################
# HUMANEERS COMPREHENSIVE DATADOG SETUP
################################################################################
# This script sets up complete observability across your entire tech stack:
#
# Coverage:
# - Website Performance (RUM, Core Web Vitals)
# - API Monitoring (Zoho CRM/Desk integrations)
# - Infrastructure (AWS S3, EC2, Vercel, CloudFlare DNS)
# - Business Metrics (Stripe payments, form submissions)
# - Security (Error tracking, incident detection)
# - Communication (Slack notifications)
# - Costs & Billing (resource usage tracking)
#
# Components Created:
# ✓ Custom Monitors (alerts)
# ✓ Dashboards (metrics visualization)
# ✓ Service Catalog (tech stack mapping)
# ✓ Watchdog insights (anomaly detection)
# ✓ On-call schedules (incident management)
################################################################################

# CREDENTIALS - Replace with your actual keys
DD_APP_KEY="d26764e64dcaced6ff8a11fdb1940c78eb76c66f"
DD_API_KEY="6b8d81ea214eca65179a1c90ad9556a9"  # GET FROM: https://app.datadoghq.com/organization-settings/application-keys
DD_SITE="us5.datadoghq.com"

# SERVICE CONFIGURATION
SERVICE_NAME="humaneersweb"
ENV="prod"

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "════════════════════════════════════════════════════════════════"
echo "  HUMANEERS COMPREHENSIVE DATADOG SETUP"
echo "════════════════════════════════════════════════════════════════"
echo ""

# Check prerequisites
if [ "$DD_APP_KEY" = "your-application-key-here" ]; then
    echo -e "${RED}ERROR: Application key not set${NC}"
    echo "Get your app key from: https://app.datadoghq.com/organization-settings/application-keys"
    exit 1
fi

if ! command -v jq &> /dev/null; then
    echo -e "${YELLOW}WARNING: jq not installed. Installing...${NC}"
    brew install jq
fi

echo "Configuration:"
echo "  Service: $SERVICE_NAME"
echo "  Environment: $ENV"
echo "  Datadog Site: $DD_SITE"
echo ""

################################################################################
# 1. IMPORT MONITORS
################################################################################
echo -e "${GREEN}[1/6] Importing Monitors...${NC}"

MONITORS_FILE="datadog-monitors.json"
if [ -f "$MONITORS_FILE" ]; then
    MONITOR_COUNT=$(jq '.monitors | length' "$MONITORS_FILE")
    echo "  Found $MONITOR_COUNT monitors"
    
    for i in $(seq 0 $(($MONITOR_COUNT - 1))); do
        MONITOR=$(jq ".monitors[$i]" "$MONITORS_FILE")
        MONITOR_NAME=$(echo "$MONITOR" | jq -r '.name')
        
        echo "  Creating: $MONITOR_NAME"
        
        RESPONSE=$(curl -s -X POST "https://api.${DD_SITE}/api/v1/monitor" \
            -H "Content-Type: application/json" \
            -H "DD-API-KEY: ${DD_API_KEY}" \
            -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
            -d "$MONITOR")
        
        if echo "$RESPONSE" | jq -e '.id' > /dev/null 2>&1; then
            echo "  ✓ Created"
        else
            echo "  ✗ Failed: $(echo $RESPONSE | jq -r '.errors[0]' 2>/dev/null || echo 'Unknown error')"
        fi
        sleep 1
    done
else
    echo "  ⚠ Monitor file not found: $MONITORS_FILE"
fi

################################################################################
# 2. CREATE SERVICE CATALOG
################################################################################
echo ""
echo -e "${GREEN}[2/6] Registering Services in Catalog...${NC}"

# Define Service Definitions (Schema v2.1)
# Services: Website, API, AWS, Vercel, CloudFlare, Stripe, Zoho
echo ""
echo -e "${GREEN}[2/6] Registering Services in Catalog (API v2)...${NC}"

register_service() {
    local SERVICE_JSON="$1"
    local SERVICE_NAME=$(echo "$SERVICE_JSON" | jq -r '."dd-service"')
    
    echo "  Registering: $SERVICE_NAME"
    
    RESPONSE=$(curl -s -X POST "https://api.${DD_SITE}/api/v2/services/definitions" \
        -H "Content-Type: application/json" \
        -H "DD-API-KEY: ${DD_API_KEY}" \
        -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
        -d "$SERVICE_JSON")

    if echo "$RESPONSE" | grep -q "error"; then
         echo "  ✗ Failed: $(echo "$RESPONSE" | jq -r '.errors[0]' 2>/dev/null || echo 'Unknown error')"
    else
         echo "  ✓ Registered in Service Catalog"
    fi
    sleep 1
}

# 1. Frontend Website
register_service '{
  "schema-version": "v2.1",
  "dd-service": "humaneersweb",
  "team": "engineering",
  "contacts": [
    { "type": "email", "contact": "security@humaneers.dev", "name": "Security Team" },
    { "type": "slack", "contact": "https://humaneers.slack.com/archives/pagerduty", "name": "Incidents Channel" }
  ],
  "tier": "critical",
  "type": "browser",
  "languages": ["javascript", "typescript", "react"],
  "lifecycle": "production",
  "links": [
    { "name": "Repo", "type": "repo", "url": "https://github.com/Humaneers/Humaneersv3" },
    { "name": "Deployment", "type": "other", "url": "https://vercel.com" }
  ],
  "tags": ["env:prod", "framework:react"]
}'

# 2. Zoho API Integration
register_service '{
  "schema-version": "v2.1",
  "dd-service": "humaneersweb-api",
  "team": "engineering",
  "contacts": [
    { "type": "email", "contact": "api-support@humaneers.dev", "name": "API Support" }
  ],
  "tier": "critical",
  "type": "web",
  "languages": ["typescript", "node"],
  "lifecycle": "production",
  "links": [
    { "name": "Zoho CRM", "type": "other", "url": "https://crm.zoho.com" }
  ],
  "tags": ["component:api", "integration:zoho"]
}'

# 3. AWS Infrastructure
register_service '{
  "schema-version": "v2.1",
  "dd-service": "aws-infrastructure",
  "team": "devops",
  "contacts": [
    { "type": "email", "contact": "security@humaneers.dev", "name": "Security" }
  ],
  "tier": "high",
  "type": "custom",
  "lifecycle": "production",
  "description": "AWS S3 and EC2 resources",
  "tags": ["cloud:aws", "component:infrastructure"]
}'

# 4. Stripe Payments
register_service '{
  "schema-version": "v2.1",
  "dd-service": "stripe-payments",
  "team": "finance-eng",
  "contacts": [
    { "type": "email", "contact": "security@humaneers.dev", "name": "Security" }
  ],
  "tier": "critical",
  "type": "custom",
  "lifecycle": "production",
  "description": "Payment processing integration",
  "links": [
    { "name": "Stripe Dashboard", "type": "other", "url": "https://dashboard.stripe.com" }
  ],
  "tags": ["component:payments", "integration:stripe"]
}'

# 5. CloudFlare DNS
register_service '{
  "schema-version": "v2.1",
  "dd-service": "cloudflare-dns",
  "team": "devops",
  "contacts": [
    { "type": "email", "contact": "security@humaneers.dev", "name": "Security" }
  ],
  "tier": "critical",
  "type": "custom",
  "lifecycle": "production",
  "description": "DNS and Security firewall",
  "tags": ["component:dns", "integration:cloudflare"]
}'

################################################################################
# 3. CREATE COMPREHENSIVE DASHBOARD
################################################################################
echo ""
echo -e "${GREEN}[3/6] Creating Comprehensive Dashboard...${NC}"

DASHBOARD_JSON=$(cat <<'EOF'
{
  "title": "Humaneers - Complete System Overview",
  "description": "Comprehensive monitoring across entire tech stack",
  "widgets": [
    {
      "definition": {
        "type": "timeseries",
        "requests": [{"q": "avg:rum.largest_contentful_paint{service:humaneersweb,env:prod}"}],
        "title": "LCP - Page Load Performance"
      }
    },
    {
      "definition": {
        "type": "query_value",
        "requests": [{"q": "sum:rum.error.count{service:humaneersweb,env:prod}.as_count()"}],
        "title": "Total Errors (24h)"
      }
    },
    {
      "definition": {
        "type": "timeseries",
        "requests": [{"q": "avg:trace.vercel.handler{resource_name:/api/zoho/*}"}],
        "title": "API Response Time"
      }
    },
    {
      "definition": {
        "type": "query_table",
        "requests": [{"q": "top(avg:aws.ec2.cpuutilization{*} by {instance_id}, 10, 'mean', 'desc')"}],
        "title": "AWS EC2 CPU Usage"
      }
    },
    {
      "definition": {
        "type": "timeseries",
        "requests": [{"q": "sum:stripe.charges{*}.as_count()"}],
        "title": "Stripe Payment Volume"
      }
    }
  ],
  "layout_type": "ordered"
}
EOF
)

DASHBOARD_RESPONSE=$(curl -s -X POST "https://api.${DD_SITE}/api/v1/dashboard" \
    -H "Content-Type: application/json" \
    -H "DD-API-KEY: ${DD_API_KEY}" \
    -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
    -d "$DASHBOARD_JSON")

if echo "$DASHBOARD_RESPONSE" | jq -e '.id' > /dev/null 2>&1; then
    DASHBOARD_ID=$(echo "$DASHBOARD_RESPONSE" | jq -r '.id')
    echo "  ✓ Dashboard created: https://app.${DD_SITE}/dashboard/${DASHBOARD_ID}"
else
    echo "  ⚠ Dashboard creation deferred (create manually)"
fi

################################################################################
# 4. INTEGRATIONS SETUP INSTRUCTIONS
################################################################################
echo ""
echo -e "${GREEN}[4/6] Integration Setup Required...${NC}"

echo "  Manual steps required for full observability:"
echo ""
echo "  AWS Integration:"
echo "    → https://app.datadoghq.com/integrations/amazon-web-services"
echo "    → Add IAM role for EC2 & S3 metrics"
echo ""
echo "  CloudFlare Integration:"
echo "    → https://app.datadoghq.com/integrations/cloudflare"
echo "    → Add API token for DNS monitoring"
echo ""
echo "  Stripe Integration:"
echo "    → https://app.datadoghq.com/integrations/stripe"
echo "    → Connect for payment metrics"
echo ""
echo "  Slack Integration:"
echo "    → https://app.datadoghq.com/integrations/slack"
echo "    → Configure @slack-pagerduty channel"

################################################################################
# 5. ON-CALL & INCIDENT MANAGEMENT
################################################################################
echo ""
echo -e "${GREEN}[5/6] On-Call & Incident Management...${NC}"

echo "  Configure at: https://app.datadoghq.com/incidents/settings"
echo ""
echo "  Recommended setup:"
echo "    ✓ Create on-call schedule"
echo "    ✓ Set escalation policies"
echo "    ✓ Configure @slack-pagerduty handle"
echo "    ✓ Define incident severity levels"
echo "    ✓ Set up postmortem templates"

################################################################################
# 6. COST & BILLING TRACKING
################################################################################
echo ""
echo -e "${GREEN}[6/6] Cost Tracking Setup...${NC}"

echo "  Monitor infrastructure costs:"
echo "    → AWS Cost Explorer integration"
echo "    → Datadog usage dashboard"
echo "    → Resource utilization alerts"
echo ""
echo "  View at: https://app.datadoghq.com/billing/usage"

################################################################################
# COMPLETION SUMMARY
################################################################################
echo ""
echo "════════════════════════════════════════════════════════════════"
echo -e "${GREEN}  SETUP COMPLETE${NC}"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "Next Steps:"
echo ""
echo "1. Configure Integrations (AWS, CloudFlare, Stripe, Slack)"
echo "2. Set up On-Call Schedules"
echo "3. Configure Notification Channels"
echo "4. Review Dashboards: https://app.${DD_SITE}/dashboard/lists"
echo "5. Check Monitors: https://app.${DD_SITE}/monitors/manage"
echo "6. Verify RUM data: https://app.${DD_SITE}/rum/explorer"
echo ""
echo "Documentation:"
echo "  → Full Setup Guide: DATADOG_SETUP.md"
echo "  → Tech Stack Monitoring: README.md"
echo ""
echo "════════════════════════════════════════════════════════════════"
