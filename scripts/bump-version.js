
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJsonPath = path.resolve(__dirname, '../package.json');
const versionFilePath = path.resolve(__dirname, '../src/version.ts');

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
const currentVersion = packageJson.version;

// Increment patch version
const parts = currentVersion.split('.').map(Number);
parts[2] += 1;
const newVersion = parts.join('.');

// Update package.json
packageJson.version = newVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

// Update src/version.ts
const versionFileContent = `export const APP_VERSION = "${newVersion}";\n`;
fs.writeFileSync(versionFilePath, versionFileContent);

console.log(`Version bumped from ${currentVersion} to ${newVersion}`);
