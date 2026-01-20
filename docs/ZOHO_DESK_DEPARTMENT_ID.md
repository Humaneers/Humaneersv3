# How to Get Your Zoho Desk Department ID

There are three ways to retrieve your Zoho Desk Department ID:

## Method 1: Using the Zoho Desk Web Interface (Easiest)

1. **Log in to Zoho Desk**: Go to [desk.zoho.com](https://desk.zoho.com) and sign in
2. **Navigate to Setup**: Click the gear icon (⚙️) in the top right corner
3. **Go to Departments**: 
   - Click on **Channels & Departments** in the left sidebar
   - Select **Departments**
4. **View Department Details**:
   - Click on the department you want to use
   - The Department ID will be visible in the URL bar
   - URL format: `https://desk.zoho.com/support/[org-name]/ShowHomePage.do#Setup/Channels/Departments/[DEPARTMENT_ID]`
   - The number at the end is your Department ID

## Method 2: Using the Zoho Desk API (Programmatic)

You can use the API to fetch all departments. Here's a simple curl command:

```bash
# First, you need your access token and org ID from your environment variables
# Replace these placeholders with your actual values:

curl -X GET "https://desk.zoho.com/api/v1/departments" \
  -H "Authorization: Zoho-oauthtoken YOUR_ACCESS_TOKEN" \
  -H "orgId: YOUR_ORG_ID"
```

### Getting Your Access Token for Testing

You can temporarily get an access token from the Zoho API Console:
1. Go to [https://api-console.zoho.com/](https://api-console.zoho.com/)
2. Select **Zoho Desk** from the dropdown
3. Choose your data center (US, EU, etc.)
4. Click **Generate Token**
5. Use this token in the curl command above (valid for 1 hour)

## Method 3: Using Browser DevTools (Quick Check)

1. Log in to Zoho Desk
2. Open your browser's Developer Tools (F12 or Cmd+Option+I on Mac)
3. Go to the **Network** tab
4. Navigate to any department in Zoho Desk
5. Look for API calls to `/api/v1/departments`
6. Click on the request and view the response
7. You'll see a JSON response with all departments and their IDs

## Example Response Format

When you fetch departments via the API, you'll get a response like this:

```json
{
  "data": [
    {
      "id": "123456789000000001",
      "name": "Support",
      "description": "Customer Support Department",
      "isEnabled": true,
      "creatorId": "123456789000000123",
      "modifiedTime": "2024-01-15T10:30:00.000Z"
    },
    {
      "id": "123456789000000002",
      "name": "Sales",
      "description": "Sales Department",
      "isEnabled": true,
      "creatorId": "123456789000000123",
      "modifiedTime": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

## Adding to Your Environment Variables

Once you have your Department ID, add it to your `.env.local` file:

```bash
ZOHO_DESK_DEPARTMENT_ID=123456789000000001
```

## Current Usage in Your Codebase

The Department ID is currently used in:
- `src/app/api/zoho/tickets/route.ts` - Support ticket creation
- `src/app/api/submit-ethics/route.ts` - Ethics form submissions

Both routes will automatically include the department ID when creating tickets if the environment variable is set.

## Troubleshooting

**Q: I don't see a Department ID in the URL**
- Make sure you're clicking on a specific department, not just viewing the list
- Try Method 2 or 3 instead

**Q: The API returns an error**
- Verify your `ZOHO_DESK_ORG_ID` is correct
- Ensure your access token has Desk permissions
- Check that you're using the correct data center domain

**Q: Do I need a Department ID?**
- No, it's optional. If not provided, tickets will be created without a specific department assignment
- However, using a Department ID helps with ticket routing and organization

## Next Steps

After obtaining your Department ID:
1. Add it to `.env.local`
2. Restart your development server (`npm run dev`)
3. Test ticket creation to verify it's working
