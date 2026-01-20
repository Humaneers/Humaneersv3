import http from 'http';

async function testEndpoint(name, path, method, payload, expectedStatus = 200, isFailureExpected = false) {
    return new Promise((resolve) => {
        const data = JSON.stringify(payload);
        const options = {
            hostname: 'localhost',
            port: 3001, // Running on production port
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length,
            },
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => (body += chunk));
            res.on('end', () => {
                const success = res.statusCode === expectedStatus;
                console.log(`[${success ? 'PASS' : isFailureExpected ? 'FAIL (EXPECTED)' : 'FAIL'}] ${name}`);
                console.log(`  Path: ${path}`);
                console.log(`  Status: ${res.statusCode} (Expected: ${expectedStatus})`);
                console.log(`  Response: ${body}`); // Verbose
                resolve({ name, success, status: res.statusCode, body });
            });
        });

        req.on('error', (error) => {
            console.error(`[ERROR] ${name}: ${error.message}`);
            resolve({ name, success: false, error });
        });

        req.write(data);
        req.end();
    });
}

async function runTests() {
    console.log("🚀 Starting Functional API Verification...");

    const results = [];

    // 1. CRM Lead (Talk to Sales)
    results.push(await testEndpoint("CRM: Lead Submission", "/api/zoho/leads", "POST", {
        firstName: "Test",
        lastName: "User",
        email: "test@example.com",
        company: "Test Corp",
        role: "CTO",
        employees: "1-10",
        message: "Test submission",
        context: "Unit Test"
    }, 200)); // Should ideally be 200, but might be 400/500 if env vars are missing/mocked, checking for valid handling.

    // 2. Desk Ticket (Support)
    results.push(await testEndpoint("Desk: Ticket Creation", "/api/zoho/tickets", "POST", {
        name: "Test User",
        email: "test@example.com",
        subject: "Test Ticket",
        description: "Test Description",
        priority: "low",
        category: "Support"
    }, 200));

    // 3. Newsletter
    results.push(await testEndpoint("Newsletter: Subscribe", "/api/zoho/newsletter", "POST", {
        email: "newsletter-test@example.com",
        source: "Verification Script"
    }, 200));

    // 4. Ethics (Known Missing)
    results.push(await testEndpoint("Ethics: Report Submission", "/api/submit-ethics", "POST", {
        reportType: "general",
        details: "Test ethics report",
        isAnonymous: true
    }, 200, false)); // Expect success now

    console.log("\n📊 Summary:");
    results.forEach(r => {
        const icon = r.success ? '✅' : (r.name.includes("Ethics") ? '⚠️' : '❌');
        console.log(`${icon} ${r.name}: Status ${r.status}`);
    });
}

runTests();
