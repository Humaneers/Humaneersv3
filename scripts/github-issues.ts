import { env } from "process";

const GITHUB_API_URL = "https://api.github.com";
const REPO_OWNER = "Humaneers";
const REPO_NAME = "Humaneersv3";

const token = env.GITHUB_TOKEN;

if (!token) {
    console.error("❌ Error: GITHUB_TOKEN environment variable is not set.");
    console.error("Please set it: export GITHUB_TOKEN=your_token_here");
    process.exit(1);
}

const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "Humaneers-CLI",
};

async function listIssues() {
    try {
        const response = await fetch(
            `${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/issues?state=open`,
            { headers }
        );

        if (!response.ok) {
            throw new Error(`Failed to list issues: ${response.statusText}`);
        }

        const issues = (await response.json()) as any[];
        console.log(`\n📋 Open Issues for ${REPO_OWNER}/${REPO_NAME}:\n`);
        if (issues.length === 0) {
            console.log("No open issues found.");
            return;
        }

        issues.forEach((issue) => {
            console.log(`#${issue.number} ${issue.title} [${issue.user.login}]`);
            console.log(`  🔗 ${issue.html_url}`);
            if (issue.labels.length > 0) {
                console.log(`  🏷️  ${issue.labels.map((l: any) => l.name).join(", ")}`);
            }
            console.log("");
        });
    } catch (error) {
        console.error("❌ Error fetching issues:", error);
    }
}

async function createIssue(title: string, body: string, labels: string[] = []) {
    try {
        const response = await fetch(
            `${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/issues`,
            {
                method: "POST",
                headers,
                body: JSON.stringify({
                    title,
                    body,
                    labels,
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                `Failed to create issue: ${response.status} - ${JSON.stringify(errorData)}`
            );
        }

        const issue = (await response.json()) as any;
        console.log(`\n✅ Issue Created Successfully!`);
        console.log(`Title: ${issue.title}`);
        console.log(`URL: ${issue.html_url}`);
    } catch (error) {
        console.error("❌ Error creating issue:", error);
    }
}

async function main() {
    const args = process.argv.slice(2);
    const command = args[0];

    switch (command) {
        case "list":
            await listIssues();
            break;
        case "create":
            const title = args[1];
            const body = args[2] || "";
            // usage: create "Title" "Body" "label1,label2"
            const labels = args[3] ? args[3].split(",").map((l) => l.trim()) : [];

            if (!title) {
                console.error("❌ Usage: create <title> [body] [labels]");
                process.exit(1);
            }
            await createIssue(title, body, labels);
            break;
        default:
            console.log("Usage:");
            console.log("  npm run issues list");
            console.log('  npm run issues create "Title" "Description" "label1,label2"');
    }
}

main();
