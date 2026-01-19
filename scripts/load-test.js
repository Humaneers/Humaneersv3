import autocannon from 'autocannon';

async function runLoadTest() {
    console.log('🚀 Starting load test...');

    const url = 'http://localhost:4173';

    const instance = autocannon({
        url,
        connections: 10, // moderate load
        pipelining: 1,
        duration: 10, // 10 seconds
        requests: [
            { method: 'GET', path: '/' },
            { method: 'GET', path: '/pricing' },
            { method: 'GET', path: '/support' },
        ]
    }, (err, result) => {
        if (err) {
            console.error('❌ Load test failed:', err);
            process.exit(1);
        }

        console.log('✅ Load test completed!');
        console.log(autocannon.printResult(result));

        // Basic assertion thresholds
        if (result.non2xx > 0) {
            console.error('❌ Load test failed: Non-2xx responses detected.');
            process.exit(1);
        }

        if (result.latency.p99 > 1000) { // 1s p99 latency threshold
            console.error(`❌ Load test failed: P99 latency too high (${result.latency.p99}ms > 1000ms)`);
            process.exit(1);
        }
    });

    autocannon.track(instance, { renderProgressBar: true });
}

runLoadTest();
