import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const COMPONENTS_DIR = path.join(SRC_DIR, 'components');
// Target Obsidian Directory
const OBSIDIAN_DOCS_DIR = "/Users/arron/Library/Mobile Documents/iCloud~md~obsidian/Documents/Local/Humaneers/Website Dev/Reference";
const OUTPUT_FILE = path.join(OBSIDIAN_DOCS_DIR, "Component Library.md");

interface ComponentInfo {
    name: string;
    relativePath: string;
    size: number;
    description: string;
    dependencies: string[];
    usages: string[];
    whyUsed: string;
}

const IGNORE_FILES = ['.DS_Store', 'index.ts', 'layout.tsx', 'page.tsx', 'styles.module.css'];

// Helper to find usages using grep (faster than AST for this purpose)
function findUsages(componentName: string, rootDir: string): string[] {
    try {
        // Grep for "import ... { ComponentName }" or "import ComponentName from" or "<ComponentName"
        // Excluding the component definition file itself would be ideal, but exact path matching is hard in grep
        const command = `grep -r -l --include="*.tsx" --include="*.ts" "${componentName}" "${rootDir}"`;
        const output = execSync(command, { encoding: 'utf-8' }).trim();
        if (!output) return [];

        return output.split('\n')
            .map(p => path.relative(rootDir, p))
            .filter(p => !p.includes(componentName)); // Simple filter to exclude self
    } catch (e) {
        return [];
    }
}

function analyzeFile(filePath: string, rootDir: string): ComponentInfo {
    const content = fs.readFileSync(filePath, 'utf-8');
    const stats = fs.statSync(filePath);
    const relativePath = path.relative(rootDir, filePath);
    const name = path.basename(filePath, path.extname(filePath));

    // 1. Dependencies (Imports)
    const dependencies: string[] = [];
    const importRegex = /import\s+.*?\s+from\s+['"](.*?)['"];?/g;
    let match;
    while ((match = importRegex.exec(content)) !== null) {
        const importPath = match[1];
        if (!importPath.startsWith('.')) {
            dependencies.push(importPath);
        }
    }

    // 2. Usages
    const usages = findUsages(name, SRC_DIR);

    // 3. Description & "Why Used" (Heuristics)
    let description = '';
    let whyUsed = '';

    const commentMatch = content.match(/\/\*\*([\s\S]*?)\*\//);
    if (commentMatch) {
        description = commentMatch[1].replace(/\*/g, '').trim().split('\n')[0];
    }

    if (relativePath.includes('ui/')) {
        whyUsed = 'Reusable UI primitive for consistent design system implementation.';
        if (dependencies.some(d => d.includes('@radix-ui'))) {
            whyUsed += ' Wraps Radix UI primitives for accessibility.';
        }
    } else if (relativePath.includes('views/')) {
        whyUsed = `Main page content for the ${name.replace('Client', '')} route. Separated for client-side logic boundaries.`;
    } else if (relativePath.includes('layout/')) {
        whyUsed = 'Global layout component shared across multiple pages.';
    } else {
        whyUsed = 'Functional component used to encapsulate specific UI logic.';
    }

    return {
        name,
        relativePath,
        size: stats.size,
        description: description || 'No description available.',
        dependencies: [...new Set(dependencies)], // Unique
        usages: usages.slice(0, 5), // Limit to 5 for brevity
        whyUsed
    };
}

function scanDirectory(dir: string, rootDir: string): Record<string, ComponentInfo[]> {
    let results: Record<string, ComponentInfo[]> = {};

    const items = fs.readdirSync(dir);

    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
            const subResults = scanDirectory(fullPath, rootDir);
            results = { ...results, ...subResults };
        } else {
            if (IGNORE_FILES.includes(item) || !/\.(tsx|jsx)$/.test(item)) continue;

            const parentDir = path.relative(rootDir, dir);
            const category = parentDir || 'Root';

            if (!results[category]) {
                results[category] = [];
            }

            results[category].push(analyzeFile(fullPath, rootDir));
        }
    }

    return results;
}

function generateMarkdown(groupedComponents: Record<string, ComponentInfo[]>): string {
    let md = `# Component Library Documentation\n\n`;
    md += `**Generated on:** ${new Date().toLocaleString()}\n`;
    md += `**Total Components:** ${Object.values(groupedComponents).reduce((acc, comps) => acc + comps.length, 0)}\n\n`;

    const sortedCategories = Object.keys(groupedComponents).sort();

    for (const category of sortedCategories) {
        md += `## 📂 ${category}\n\n`;
        md += `| Component | Description & Usage | Dependencies | Usages |\n`;
        md += `|-----------|---------------------|--------------|--------|\n`;

        const components = groupedComponents[category].sort((a, b) => a.name.localeCompare(b.name));

        for (const comp of components) {
            const deps = comp.dependencies.length > 0 ? comp.dependencies.map(d => `\`${d}\``).join('<br>') : '-';
            const usages = comp.usages.length > 0 ? comp.usages.map(u => `\`${u}\``).join('<br>') : '*None*';

            md += `| **${comp.name}**<br><br>\`${comp.relativePath}\` | **Why**: ${comp.whyUsed}<br><br>**Desc**: ${comp.description} | ${deps} | ${usages} |\n`;
        }
        md += `\n`;
    }

    return md;
}

function main() {
    console.log(`🔍 Scanning components in: ${COMPONENTS_DIR}`);
    const groupedComponents = scanDirectory(COMPONENTS_DIR, COMPONENTS_DIR);
    const markdown = generateMarkdown(groupedComponents);

    if (!fs.existsSync(OBSIDIAN_DOCS_DIR)) {
        fs.mkdirSync(OBSIDIAN_DOCS_DIR, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, markdown);
    console.log(`✅ Enrichment complete! Wrote to: ${OUTPUT_FILE}`);
}

main();
