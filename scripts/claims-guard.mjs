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
 * phantom-tier support — catches a tier or plan name in customer-facing
 * prose that isn't one of the tiers defined in src/data/pricing.ts. This is
 * the rule that would have caught "Growth and Scale tiers" (Scale was never
 * a real tier) and 'Our "Foundation" plan' (Foundation is the nonprofit
 * tier's name, not a business plan) before either shipped.
 *
 * It reads tier names out of the tier module as text — the same way the
 * rest of this file treats source as text rather than as a program — so it
 * never has to execute TypeScript.
 */
const TIER_MODULE_PATH = join(ROOT, "src/data/pricing.ts");

function loadKnownTierNames() {
  let text;
  try {
    text = readFileSync(TIER_MODULE_PATH, "utf8");
  } catch {
    return new Set();
  }
  const names = new Set();
  const nameRe = /name:\s*"([^"]+)"/g;
  let match;
  while ((match = nameRe.exec(text))) names.add(match[1]);
  return names;
}

const KNOWN_TIER_NAMES = loadKnownTierNames();

// One or two capitalized words - "Core", "Nonprofit Foundation", "Hold Co".
const TIER_NAME_SHAPE = "[A-Z][A-Za-z']*(?:\\s[A-Z][A-Za-z']*)?";
// Either a quoted name directly in front of "plan"/"plans" (the 'Our
// "Foundation" plan' shape), or an "X and Y" / "X & Y" list directly in
// front of the plural "tiers"/"plans" (the "Growth and Scale tiers" shape).
// Requiring the list form for the unquoted case - never a single bare name -
// is what keeps this from tripping on ordinary sentence-initial capitals
// like "Keep tier objects..." or "The tier's own...".
const TIER_REFERENCE = new RegExp(
  `(?:"(${TIER_NAME_SHAPE})"\\s+plans?\\b)` +
    `|(\\b${TIER_NAME_SHAPE}(?:\\s(?:and|&)\\s${TIER_NAME_SHAPE})+)\\s+(?:tiers|plans)\\b`,
  "g"
);

const tierReferenceTest = {
  test(line) {
    TIER_REFERENCE.lastIndex = 0;
    let match;
    while ((match = TIER_REFERENCE.exec(line))) {
      const candidates = match[1] ? [match[1]] : match[2].split(/\s(?:and|&)\s/);
      for (const raw of candidates) {
        const name = raw.trim();
        if (name && !KNOWN_TIER_NAMES.has(name)) return true;
      }
    }
    return false;
  },
};

const placeholderContactTest = {
  test(line) {
    // The NANP block reserved for fiction, written out in prose.
    if (/\b555[-. ]01\d{2}\b/.test(line)) return true;
    // Any tel: link whose national number uses 555 as its area code or its
    // exchange. Normalising to digits first is what makes this survive the
    // formatting - tel:+1-555-0123 and tel:(555) 123-4567 are the same defect
    // written two ways, and a literal regex catches one and misses the other.
    for (const match of line.matchAll(/tel:([+\d\-.()\s]{7,})/gi)) {
      let digits = match[1].replace(/\D/g, "");
      if (digits.length === 11 || digits.length === 8) digits = digits.replace(/^1/, "");
      if (digits.length === 10 && (digits.slice(0, 3) === "555" || digits.slice(3, 6) === "555"))
        return true;
      if (digits.length === 7 && digits.startsWith("555")) return true;
    }
    return false;
  },
};

/**
 * bare-client-count — a headcount of clients, businesses, customers,
 * companies or devices with no record behind it. "Trusted by 200+ businesses"
 * on the home hero and the About page's "140+ Clients Supported" and "4,500+
 * Devices Managed" tiles both shipped this way.
 *
 * Two shapes. Inline prose: a number with a "+" floor in front of the noun
 * ("200+ businesses", "4,500+ managed devices"), or "trusted by" followed by a
 * number. And the stat tile, where the number and the noun sit in separate
 * fields of one object literal and only meet at render time:
 * { label: "Clients Supported", value: "140+" }. The tile is checked across the
 * whole literal, so Prettier breaking it over several lines does not hide it.
 *
 * Families are out of scope here: "families" is not one of the counted nouns.
 * The FAMILIES_PROTECTED "100+" stat had no record behind it either, and was
 * removed from the site by hand on 11 Sep 2026.
 */
const COUNTED_NOUN = "(?:clients|businesses|customers|companies|devices)";
const INLINE_CLIENT_COUNT = new RegExp(
  `\\b\\d[\\d,]*(?:\\.\\d+)?k?\\+\\s*(?:[a-z-]+\\s+)?${COUNTED_NOUN}\\b`,
  "i"
);
const TRUSTED_BY_COUNT = /\btrusted\s+by\s+(?:over\s+|more\s+than\s+|nearly\s+)?\d/i;
const COUNT_LABEL = new RegExp(`\\blabel\\s*:\\s*["'\`][^"'\`\\n]*\\b${COUNTED_NOUN}\\b`, "i");
// "140+", '4,500+', "10k+" or a numeric literal. Not "1 in 3", "+400%", "12m"
// or an identifier such as FAMILIES_PROTECTED.
const BARE_NUMBER_VALUE =
  /\bvalue\s*:\s*(?:["'`]\s*\d[\d,.]*k?\+?\s*["'`]|\d[\d_.]*\s*(?:[,}]|$))/i;

// The object literal around line i: from the nearest line at or above it that
// opens a brace to the nearest line at or below it that closes one. Bounded,
// because a stat tile is a handful of lines.
function enclosingObject(lines, i, reach = 8) {
  let start = i;
  while (start > 0 && i - start < reach && !lines[start].includes("{")) start--;
  let end = i;
  while (end < lines.length - 1 && end - i < reach && !lines[end].includes("}")) end++;
  return lines.slice(start, end + 1).join("\n");
}

const bareClientCountTest = {
  test(line, lines = [line], i = 0) {
    if (INLINE_CLIENT_COUNT.test(line) || TRUSTED_BY_COUNT.test(line)) return true;
    // Stat tile: report the value line only, so one tile is one finding.
    if (!BARE_NUMBER_VALUE.test(line)) return false;
    return COUNT_LABEL.test(enclosingObject(lines, i));
  },
};

/**
 * mode "line"      — one line at a time; the cheapest and most precise.
 *                    A custom test also receives the file's lines and the
 *                    line's index, for a claim split across one literal.
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
  {
    id: "phantom-tier",
    mode: "line",
    test: tierReferenceTest,
    message:
      "This names a tier or plan that isn't defined in src/data/pricing.ts. Either it's a typo for a real tier name (the 'Scale' and 'Foundation' incidents were both this shape), or the tier module is missing the new tier and needs it added first.",
  },

  {
    id: "placeholder-contact",
    mode: "line",
    // 555-01xx is the NANP block reserved for fiction, so it is never a real
    // number; any 555 exchange inside a tel: link is the same mistake. Caught
    // after tel:+1-555-0123 shipped in five places - all of them error and
    // fallback paths, which is why no page render ever exposed it and a
    // manual scrub of the normal pages could not have found it.
    test: placeholderContactTest,
    message:
      "This is a placeholder contact detail, not a real one. The site publishes 24/7 emergency response, and these strings live in the paths that render when something is already broken - the worst possible place for a number that does not connect. Use the canonical (928) 440-1505 / tel:+19284401505. Scoped to phone numbers on purpose: example.com is the RFC 2606 reserved domain and is correct in test fixtures and form placeholders.",
  },
  {
    id: "bare-client-count",
    mode: "line",
    test: bareClientCountTest,
    message:
      "A count of clients, businesses, customers, companies or devices with no record behind it. 'Trusted by 200+ businesses' and the About page's '140+ Clients Supported' and '4,500+ Devices Managed' tiles shipped this way and were removed on 11 Sep 2026. Publish a count only when a client list or asset register produces it, and annotate the line with who checked the number and when.",
  },
  {
    id: "unmeasured-performance-percent",
    mode: "line",
    // A share of issues, tickets, requests or incidents is a rate that only a
    // ticketing system can produce. Uptime targets, market statistics and
    // prices are other shapes and pass.
    test: /\b\d+(?:\.\d+)?\s?%\s+of\s+(?:our\s+)?(?:issues|tickets|requests|incidents)\b/i,
    message:
      "A percentage of issues, tickets, requests or incidents is a measured performance rate. The Managed IT page's '99% of issues fixed remotely' and '99% of tickets are resolved remotely' shipped with no ticket data behind them and were removed on 11 Sep 2026. Publish a rate only when the ticketing system produces it, and annotate the line with the source, the period it covers, and who checked it.",
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
        if (!rule.test.test(line, lines, i)) return;
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
