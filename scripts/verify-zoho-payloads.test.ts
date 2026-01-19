import { describe, it, expect, vi, beforeEach } from 'vitest';
import { submitSalesLead, submitSupportTicket, type SalesFormData, type SupportFormData } from '../src/lib/zoho';
import { setSessionContext } from '../src/lib/session';

// Mock fetch
const globalFetch = vi.fn();
global.fetch = globalFetch;

// Server-side Logic Simulation (imported from api/zoho/leads.ts logic)
const mapEmployeeRange = (employees: string): number | null => {
    const ranges: Record<string, number> = {
        "1-10": 5, "11-50": 30, "51-200": 100, "201+": 350,
        "201-500": 350, "501-1000": 750, "1001-5000": 3000, "5000+": 10000,
    };
    return ranges[employees] || null;
};

const formatLeadDescription = (data: any): string => {
    const parts: string[] = [];
    if (data.budget) parts.push(`Budget: ${data.budget}`);
    if (data.interests) parts.push(`Interests: ${data.interests}`);
    if (data.message) parts.push(`Message: ${data.message}`);
    if (data.context) parts.push(data.context); // Patched logic
    return parts.join("\n\n") || "No additional details provided.";
};

describe('Zoho Integration Payloads', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        sessionStorage.clear();

        // Default Mock Response
        globalFetch.mockResolvedValue({
            ok: true,
            headers: { get: () => 'application/json' },
            json: () => Promise.resolve({ success: true, id: 'mock-id' }),
        });
    });

    it('Sales Lead Flow (Business)', async () => {
        // 1. Setup Session Context
        setSessionContext({
            segment: 'business',
            landingPage: '/pricing',
            referrer: 'google.com',
            pageHistory: ['/', '/pricing', '/talk-to-sales']
        });

        // 2. Client Submission
        const formData: SalesFormData = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            company: 'Acme Corp',
            role: 'CEO',
            employees: '11-50',
            interests: ['Managed IT', 'Compliance'],
            message: 'Need SOC2 help',
            source: 'Web Form'
        };

        await submitSalesLead(formData);

        // 3. Verify Client Payload
        expect(globalFetch).toHaveBeenCalledTimes(1);
        const [url, options] = globalFetch.mock.calls[0];
        expect(url).toBe('/api/zoho/leads');

        const clientPayload = JSON.parse(options.body as string);
        console.log('\n--- SALES LEAD PAYLOAD (CLIENT) ---');
        console.log(JSON.stringify(clientPayload, null, 2));

        expect(clientPayload.firstName).toBe('John');
        expect(clientPayload.employees).toBe('11-50');
        expect(clientPayload.context).toContain('Segment: business');
        expect(clientPayload.context).toContain('Journey: / → /pricing → /talk-to-sales');

        // 4. Verify Server Transformation (Simulated)
        // Simulate what api/zoho/leads.ts does
        const serverPayload = {
            data: [{
                First_Name: clientPayload.firstName,
                Last_Name: clientPayload.lastName,
                Email: clientPayload.email,
                Company: clientPayload.company,
                Designation: clientPayload.role,
                No_of_Employees: mapEmployeeRange(clientPayload.employees),
                Lead_Source: "Website - Talk to Sales",
                Description: formatLeadDescription(clientPayload)
            }],
            trigger: ["workflow"]
        };

        console.log('\n--- ZOHO CRM PAYLOAD (SERVER SIMULATION) ---');
        console.log(JSON.stringify(serverPayload, null, 2));

        expect(serverPayload.data[0].No_of_Employees).toBe(30);
        // Verify Description contains context now
        expect(serverPayload.data[0].Description).toContain('Context: Segment: business');
    });

    it('Support Ticket Flow', async () => {
        setSessionContext({
            segment: 'family',
            landingPage: '/support',
            interactions: ['clicked_emergency_button']
        });

        const ticketData: SupportFormData = {
            name: 'Jane Doe',
            email: 'jane@family.com',
            priority: 'critical',
            category: 'Hardware',
            subject: 'Laptop broken',
            description: 'Screen cracked',
            source: 'Support Page'
        };

        await submitSupportTicket(ticketData);

        const [url, options] = globalFetch.mock.calls[0];
        expect(url).toBe('/api/zoho/tickets');

        const clientPayload = JSON.parse(options.body as string);
        console.log('\n--- SUPPORT TICKET PAYLOAD (CLIENT) ---');
        console.log(JSON.stringify(clientPayload, null, 2));

        expect(clientPayload.priority).toBe('critical');
        expect(clientPayload.context).toContain('Actions: clicked_emergency_button');

        // Server Simulation
        const serverPayload = {
            subject: clientPayload.subject,
            // Patched logic: append context
            description: clientPayload.context ? `${clientPayload.description}\n\n${clientPayload.context}` : clientPayload.description,
            priority: "High", // critical -> High
            classification: clientPayload.category,
            contact: {
                firstName: clientPayload.name.split(" ")[0],
                lastName: clientPayload.name.split(" ").slice(1).join(" "),
                email: clientPayload.email,
            },
            cf: {
                cf_company: clientPayload.company || null,
            },
            channel: "Website"
        };

        console.log('\n--- ZOHO DESK PAYLOAD (SERVER SIMULATION) ---');
        console.log(JSON.stringify(serverPayload, null, 2));

        // Verify Description contains context now
        expect(serverPayload.description).toContain('Context: Segment: family');
        expect(serverPayload.description).toContain('Actions: clicked_emergency_button');
    });
});
