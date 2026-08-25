#!/usr/bin/env node
/**
 * claims-guard — build-time check for unsupported public claims.
 *
 * Wired as `prebuild`, so `npm run build` fails — locally, in CI and on the
 * deploy box — before it can ship a claim the firm cannot evidence. It exists
 * because the SOC 2 self-certification was scrubbed by hand twice, on 30 Jul
 * and again on 24 Aug 2026, and both passes missed live surfaces.
 *
 * Escape hatches, both deliberate and both leaving a trail:
 *   - same line or the line above:  claims-guard-allow: <who verified it, when>
 *   - anywhere in the file:         claims-guard-allow-file: <rule-id> <why>
 * An allow without a reason is not an allow.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SCAN_DIRS = ["src"];
const EXTENSIONS = [".ts", ".tsx", ".js", ".jsx", ".mjs", ".md", ".mdx", ".json"];
const MARKUP_EXTENSIONS = [".tsx", ".jsx"];
const SKIP_DIRS = new Set(["node_modules", ".next", "dist", "build", "coverage"]);

/**
 * mode "line"      — one line at a time; the cheapest and most precise.
 * mode "proximity" — a whole-file window, for defects that span JSX elements,
 *                    which is how the Compliance Scorecard survived two scrubs.
 *                    Markup only: prose bullets legitimately put a percentage
 *                    near a framework name, JSX almost never does.
 */
export const RULES = [
  {
    id: "privacy-shield",
    mode: "line",
    test: /Privacy\s+Shield/i,
    message:
      "EU-US Privacy Shield was invalidated by Schrems II (CJEU, 16 July 2020). Cite Standard Contractual Clauses or a European Commission adequacy decision instead.",
  },
  {
    id: "fabricated-review-schema",
    mode: "line",
    test: /aggregateRating|ratingValue|reviewCount/,
    message:
      "Review structured data requires a real, collected review corpus. Search engines treat an invented rating as structured-data spam, and it discredits every other number on the page.",
  },
  {
    id: "self-certification",
    mode: "line",
    test: /\b(SOC\s?2|ISO\s?27001|PCI[-\s]?DSS|HITRUST|FedRAMP)\b[^\n]{0,60}\b(certified|certification|compliant|attested|attestation|accredited)\b/i,
    message:
      "Do not publish a compliance certification for Humaneers itself. SOC 2 Type II is a period-of-time attestation issued by a licensed CPA firm; if one exists, publish the firm, the scope and the period covered, not an adjective.",
  },
  {
    id: "compliance-score",
    mode: "proximity",
    test: /\b(SOC\s?2|HIPAA|NIST(\s+CSF)?|GDPR|ISO\s?27001|PCI[-\s]?DSS)\b[\s\S]{0,300}?\b\d{1,3}(\.\d+)?\s?%/i,
    message:
      "A compliance framework published next to a percentage reads as a score for Humaneers. None of these frameworks yields a percentage, and the figure has no subject, auditor, scope or date.",
  },
  {
    id: "compliance-score-reversed",
    mode: "proximity",
    test: /\b\d{1,3}(\.\d+)?\s?%[\s\S]{0,300}?\b(SOC\s?2|HIPAA|NIST(\s+CSF)?|GDPR|ISO\s?27001|PCI[-\s]?DSS)\b/i,
    message:
      "A percentage published next to a compliance framework reads as a score for Humaneers. None of these frameworks yields a percentage, and the figure has no subject, auditor, scope or date.",
  },
  {
    id: "attributed-quote",
    mode: "line",
    test: /<blockquote/i,
    message:
      "A quotation attributed to a named person must be a real person who is verifiable elsewhere on the site. The Sarah Chen and Human IP LP incidents were both this shape. Annotate with the person, the date the quote was given, and where it is corroborated.",
  },
];

const ALLOW_LINE = /claims-guard-allow:\s*\S/;
const allowFilePattern = (id) => new RegExp(`claims-guard-allow-file:\\s*${id}\\b\\s*\\S`);

const isMarkup = (path) => MARKUP_EXTENSIONS.some((e) => path.endsWith(e));
const lineOf = (text, index) => text.slice(0, index).split("\n").length;

/** Scan one file's contents. Returns findings; empty means clean. */
export function scanText(text, path = "input.tsx", rules = RULES) {
  const findings = [];
  const lines = text.split("\n");

  for (const rule of rules) {
    if (allowFilePattern(rule.id).test(text)) continue;
    if (rule.mode === "proximity" && !isMarkup(path)) continue;

    if (rule.mode === "line") {
      lines.forEach((line, i) => {
        if (!rule.test.test(line)) return;
        if (ALLOW_LINE.test(line)) return;
        if (i > 0 && ALLOW_LINE.test(lines[i - 1])) return;
        findings.push({ path, line: i + 1, rule, excerpt: line.trim().slice(0, 120) });
      });
    } else {
      const match = rule.test.exec(text);
      if (!match) continue;
      findings.push({
        path,
        line: lineOf(text, match.index),
        rule,
        excerpt: match[0].replace(/\s+/g, " ").trim().slice(0, 120),
      });
    }
  }

  return findings;
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (EXTENSIONS.some((e) => entry.endsWith(e))) out.push(full);
  }
  return out;
}

export function scanRepo(root = ROOT) {
  const findings = [];
  for (const dir of SCAN_DIRS) {
    for (const file of walk(join(root, dir))) {
      findings.push(...scanText(readFileSync(file, "utf8"), relative(root, file)));
    }
  }
  return findings;
}

function main() {
  const findings = scanRepo();

  if (findings.length === 0) {
    console.log("claims-guard: no unsupported claims found.");
    return 0;
  }

  console.error(`\nclaims-guard: ${findings.length} unsupported claim(s) would ship.\n`);
  const byRule = new Map();
  for (const f of findings) {
    if (!byRule.has(f.rule.id)) byRule.set(f.rule.id, []);
    byRule.get(f.rule.id).push(f);
  }
  for (const [id, group] of byRule) {
    console.error(`  [${id}] ${group[0].rule.message}`);
    for (const f of group) console.error(`      ${f.path}:${f.line}  ${f.excerpt}`);
    console.error("");
  }
  console.error(
    "Fix the claim, or annotate it with `claims-guard-allow: <who verified it, and when>`.\n"
  );
  return 1;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  process.exit(main());
}
