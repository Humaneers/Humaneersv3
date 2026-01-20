/**
 * Environment Variable Validation
 * 
 * Validates that all required server-side environment variables are present.
 * This prevents runtime errors and ensures secure configuration.
 */

const REQUIRED_SERVER_VARS = [
    'ZOHO_CLIENT_ID',
    'ZOHO_CLIENT_SECRET',
    'ZOHO_REFRESH_TOKEN',
    'ZOHO_DESK_ORG_ID',
];

export function validateEnv() {
    if (typeof window !== 'undefined') {
        // Client-side, skip validation
        return;
    }

    const missing = REQUIRED_SERVER_VARS.filter((varName) => !process.env[varName]);

    if (missing.length > 0) {
        throw new Error(
            `[Security] Missing required environment variables: ${missing.join(', ')}. ` +
            'Please check your .env.local file.'
        );
    }

    // Verify that secrets are NOT exposed to client
    const exposed = REQUIRED_SERVER_VARS.filter((varName) =>
        varName.startsWith('NEXT_PUBLIC_')
    );

    if (exposed.length > 0) {
        throw new Error(
            `[Security] Secret environment variables MUST NOT start with NEXT_PUBLIC_: ${exposed.join(', ')}`
        );
    }
}
