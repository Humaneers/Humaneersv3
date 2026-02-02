
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const OBSIDIAN_DOCS_PATH = "/Users/arron/Library/Mobile Documents/iCloud~md~obsidian/Documents/Local/Humaneers/Website Dev";
const REPO_DOCS_PATH = path.resolve(__dirname, "../docs");

// Files/Directories to ignore
const IGNORE_LIST = [".DS_Store", ".git", ".obsidian", ".trash"];

function ensureDirectoryExists(dirPath: string) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

function clearDirectory(dirPath: string) {
    if (fs.existsSync(dirPath)) {
        fs.rmSync(dirPath, { recursive: true, force: true });
    }
    ensureDirectoryExists(dirPath);
}

function copyRecursive(src: string, dest: string) {
    const stats = fs.statSync(src);
    if (stats.isDirectory()) {
        ensureDirectoryExists(dest);
        const items = fs.readdirSync(src);
        for (const item of items) {
            if (IGNORE_LIST.includes(item)) continue;
            copyRecursive(path.join(src, item), path.join(dest, item));
        }
    } else {
        fs.copyFileSync(src, dest);
    }
}

async function syncDocs() {
    console.log("🔄 Starting documentation sync...");
    console.log(`SOURCE: ${OBSIDIAN_DOCS_PATH}`);
    console.log(`DEST:   ${REPO_DOCS_PATH}`);

    if (!fs.existsSync(OBSIDIAN_DOCS_PATH)) {
        console.error(`❌ Source directory not found: ${OBSIDIAN_DOCS_PATH}`);
        process.exit(1);
    }

    try {
        console.log("🧹 Clearing existing docs directory...");
        clearDirectory(REPO_DOCS_PATH);

        console.log("📂 Copying files...");
        copyRecursive(OBSIDIAN_DOCS_PATH, REPO_DOCS_PATH);

        console.log("✅ Documentation sync complete!");
    } catch (error) {
        console.error("❌ Error during sync:", error);
        process.exit(1);
    }
}

syncDocs();
