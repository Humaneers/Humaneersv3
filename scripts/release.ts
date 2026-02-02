
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, "..");
const PACKAGE_JSON_PATH = path.join(ROOT_DIR, "package.json");
const VERSION_TS_PATH = path.join(ROOT_DIR, "src/version.ts");
const REPO_DOCS_CHANGELOG_PATH = path.join(ROOT_DIR, "docs/CHANGELOG.md");
const OBSIDIAN_CHANGELOG_PATH = "/Users/arron/Library/Mobile Documents/iCloud~md~obsidian/Documents/Local/Humaneers/Website Dev/CHANGELOG.md";

// Helpers
const run = (command: string) => {
    console.log(`> ${command}`);
    execSync(command, { stdio: "inherit", cwd: ROOT_DIR });
};

async function main() {
    const args = process.argv.slice(2);
    const isDryRun = args.includes("--dry-run");
    const noPush = args.includes("--no-push");

    console.log(`🚀 Starting release process... ${isDryRun ? "(DRY RUN)" : ""}`);

    // 1. Sync Documentation
    console.log("\n📦 Syncing documentation...");
    run("npx tsx scripts/sync-docs.ts");

    // 2. Read current version
    const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, "utf-8"));
    const currentVersion = packageJson.version;

    // Increment patch version
    const parts = currentVersion.split(".").map(Number);
    parts[2] += 1;
    const newVersion = parts.join(".");
    console.log(`\n📈 Bumping version: ${currentVersion} -> ${newVersion}`);

    // 3. Update Changelog
    const date = new Date().toISOString().split("T")[0];
    const changelogEntry = `\n## [${newVersion}] - ${date}\n- Automated release update.\n`;

    // Update Repo Changelog (it was just synced, so we append to it)
    // Ensure it exists first
    if (!fs.existsSync(REPO_DOCS_CHANGELOG_PATH)) {
        console.log("Creating new CHANGELOG.md in docs/");
        fs.writeFileSync(REPO_DOCS_CHANGELOG_PATH, "# Changelog\n\n");
    }

    const currentChangelog = fs.readFileSync(REPO_DOCS_CHANGELOG_PATH, "utf-8");
    // Insert after title or at top
    const newChangelogContent = currentChangelog.replace(/(# Changelog\s*\n)/, `$1${changelogEntry}\n`);

    // Also update Obsidian Source Changelog if it exists so they stay in sync for next time
    if (fs.existsSync(OBSIDIAN_CHANGELOG_PATH)) {
        console.log("📝 Updating Obsidian source CHANGELOG.md...");
        if (!isDryRun) {
            const obsContent = fs.readFileSync(OBSIDIAN_CHANGELOG_PATH, 'utf-8');
            // specific logic: if it has "# Changelog", insert after. otherwise prepend.
            let newObsContent;
            if (obsContent.includes("# Changelog")) {
                newObsContent = obsContent.replace(/(# Changelog\s*\n)/, `$1${changelogEntry}\n`);
            } else {
                newObsContent = `# Changelog\n${changelogEntry}\n${obsContent}`;
            }
            fs.writeFileSync(OBSIDIAN_CHANGELOG_PATH, newObsContent);
        }
    } else {
        console.log("⚠️ Obsidian CHANGELOG.md not found. Creating it...");
        if (!isDryRun) {
            fs.writeFileSync(OBSIDIAN_CHANGELOG_PATH, `# Changelog\n${changelogEntry}\n`);
        }
    }

    if (isDryRun) {
        console.log("Dry run: Skipping file writes and git operations.");
        return;
    }

    // Write changes to repo files
    fs.writeFileSync(REPO_DOCS_CHANGELOG_PATH, newChangelogContent);

    packageJson.version = newVersion;
    fs.writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(packageJson, null, 2) + "\n");

    // NEW: Parse Changelog to JSON for frontend
    const changelogLines = newChangelogContent.split("\n");
    const changelogJson: { version: string; date: string; changes: string[] }[] = [];
    let currentEntry: { version: string; date: string; changes: string[] } | null = null;

    const versionRegex = /^## \[(.+)\] - (.+)$/;
    const changeRegex = /^- (.+)$/;

    for (const line of changelogLines) {
        const vMatch = line.match(versionRegex);
        if (vMatch) {
            if (currentEntry) {
                changelogJson.push(currentEntry);
            }
            currentEntry = {
                version: vMatch[1],
                date: vMatch[2],
                changes: [],
            };
            continue;
        }

        const cMatch = line.match(changeRegex);
        if (cMatch && currentEntry) {
            currentEntry.changes.push(cMatch[1]);
        }
    }
    if (currentEntry) {
        changelogJson.push(currentEntry);
    }

    const versionFileContent = `export const APP_VERSION = "${newVersion}";\n\nexport const CHANGELOG = ${JSON.stringify(changelogJson, null, 2)};\n`;
    fs.writeFileSync(VERSION_TS_PATH, versionFileContent);

    // 4. Git Commit & Push
    console.log("\n💾 Committing changes...");
    try {
        run(`git add package.json src/version.ts docs/`);
        run(`git commit -m "chore: release v${newVersion}"`);

        if (noPush) {
            console.log(`\n✋ Skipping push (--no-push). Changes are committed locally.`);
        } else {
            run(`git push`);
            console.log(`\n✅ Release v${newVersion} completed successfully!`);
        }
    } catch (err) {
        console.error("\n❌ Error during git operations. Manual intervention may be required.");
        process.exit(1);
    }
}

main().catch(console.error);
