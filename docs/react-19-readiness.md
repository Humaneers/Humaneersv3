# React 19 readiness

Assessed 2026-10-21 on branch `chore/tooling-refresh`: main 87e13c1 plus the tooling refresh (Next 16.4.2, Tailwind 4.3.3, proxy rename, dead-code and unused-package removal). The measurements below were taken on a throwaway copy outside the repository. This file changes no code.

## Recommendation

Upgrade to React 19 as its own small PR, after this branch and the redesign branch have merged and before Next 17. Risk is low. A trial install passed typecheck, lint, 206 tests and the production build with zero source changes. No installed package has a peer range that excludes React 19.

Two reasons to do it:

1. Next 16.4.2 prints `React 18 support is deprecated in Next.js 16 and will be removed in Next.js 17` on every build. The sources read for this note give no date for Next 17.
2. The site already runs React 19 in production. Only the toolchain still runs React 18 (see below). Moving the pin removes that gap.

## What runs today

`package.json` pins `react` and `react-dom` at 18.3.1. The App Router does not use that copy. Next 16 renders the App Router with its own vendored React canary. Evidence:

- The client bundle in `.next/static` contains the string `19.3.0-canary-278794d7-20261002` seven times and no React 18 version string.
- The Next 16 upgrade guide in `node_modules/next/dist/docs` states that the App Router uses the latest React canary.

The installed React 18.3.1 is used by:

- `@types/react` and `@types/react-dom` (18.3.29 and 18.3.7), so TypeScript checks against React 18 types.
- Vitest with jsdom and Testing Library, so the 206 tests run against React 18 while production runs React 19.
- Anything that imports `react` outside the App Router (there is no `pages/` directory).

## Pins and conflicts

Of 44 direct dependencies, 13 declare a `react` peer range. 12 of the 13 admit React 19.3.0. The one that does not is `react-dom@18.3.1`, which moves with `react`. A scan of all 49 lockfile packages that declare a `react` peer found no other failing range.

| Package | Installed | Peer range for `react` | Admits 19 | Imported by live code |
|---|---|---|---|---|
| `@types/react` | 18.3.29 | n/a (pinned `^18.3.0` in devDependencies) | must move to `^19` | n/a |
| `@types/react-dom` | 18.3.7 | peers `@types/react ^18` | must move to `^19` | n/a |
| `react-dom` | 18.3.1 | `^18.3.1` | must move with `react` | yes |
| `next` | 16.4.2 | `^18.2.0 \|\| ^19.0.0` | yes | yes |
| Radix (6 packages) | various | `^16.8 \|\| ... \|\| ^19.0` | yes | all 6: accordion, dialog, navigation-menu, slot, tabs, tooltip |
| `lucide-react` | 0.487.0 | `^16.5.1 \|\| ... \|\| ^19.0.0` | yes | yes (36 files) |
| `motion` | 11.18.2 | `^18.0.0 \|\| ^19.0.0` | yes | yes (`SolutionSwitcher.tsx` on main) |
| `@vercel/analytics`, `@vercel/speed-insights` | 1.6.1, 1.3.1 | `^18 \|\| ^19` | yes | yes |
| `@testing-library/react` | 16.3.2 | `^18.0.0 \|\| ^19.0.0` | yes | tests only |

"Live" means reachable from `src/app/**` or `src/proxy.ts` in an import graph over the 124 code files (`.ts`, `.tsx`, `.js`, `.mjs`) in `src/`. Every non-test file is reachable. Only 17 packages are imported by live code: the six Radix packages above, `@vercel/analytics`, `@vercel/speed-insights`, `class-variance-authority`, `clsx`, `lucide-react`, `motion`, `next`, `nodemailer`, `react`, `tailwind-merge` and `zod`.

Removed from `package.json`: `react-day-picker`, `recharts`, `next-themes`, `embla-carousel-react`, `cmdk`, `input-otp`, `react-hook-form`, `react-resizable-panels` and `vaul`, along with 20 other Radix packages, `sonner`, `@datadog/browser-rum` and `date-fns`. No live code imported any of them. Before removal every one of them had a peer range that admitted React 19. Two notes for anyone who re-adds one:

- **`react-day-picker` 8** peers `date-fns` (`^2.28.0 || ^3.0.0`). v9 and later are a different API.
- **`recharts` 2** carries its own dependency on `react-is ^18.3.1`. Recharts 3.10.1 lists `react-is` as a peer dependency with a range that includes `^19.0.0`. Under React 19, use recharts 3 or add an `overrides` entry for `react-is`.

The only hard pin left is `@types/react` 18. It has to move together with `@types/react-dom`.

## Code scan

Searched all of `src/` for patterns React 19 removes or changes:

- Zero uses of `defaultProps`, `propTypes`, `ReactDOM.render`, `hydrate`, `findDOMNode`, string refs, legacy context, `react-dom/test-utils`, `createFactory`, `React.ElementRef`, the global `JSX` namespace, or `useRef()` with no argument.
- Three files use `forwardRef`: `ui/button.tsx`, `ui/input.tsx` and `layout/Header.tsx`, all live. `forwardRef` still works in React 19. Passing `ref` as a plain prop is the replacement and is optional.
- Class error boundaries were deleted with the unreachable files. No class components remain.

## Trial result

On a copy of the final tree placed outside the repository, with `react` and `react-dom` at 19.3.1 and `@types/react` and `@types/react-dom` at 19.3.0, and no source edits:

| Check | Result |
|---|---|
| `npm run typecheck` | 0 errors |
| `npm run lint` | 0 errors, 8 warnings (same 8 as on React 18) |
| `npm run format:check` | pass |
| `npm run test:run` | 10 files, 206 tests, all pass |
| `npm run build` | pass, 35 pages, no React version warning |
| `npm ls` | no invalid or unmet peers |
| JS and CSS bytes under `.next/static` | 1,185,210 and 86,982, identical to a React 18 build of the same copy in the same directory |

Byte sums depend slightly on the directory the build runs in. The same source built in the repository directory gives 1,185,313 JS and 86,982 CSS. Compare byte sums only within one directory.

The trial did not include a browser pass. The interactive components that matter (accordion, dialog, tabs, navigation menu, tooltip) already run on React 19 in production through Next's vendored copy.

## Upgrade path

1. In `package.json`: `react` and `react-dom` to `^19.3.1`; `@types/react` and `@types/react-dom` to `^19.3.0`.
2. `npm install`, then run the five checks and a clean build. Expect no source changes.
3. Optional, separate commit: replace `forwardRef` in the three files with a `ref` prop. Not required.
4. Conflict risk: the lockfile. Any other branch that touches `package-lock.json` will need a rebase and a fresh `npm install`.

## Out of scope here

TypeScript 7, ESLint 10 and Vitest 5 were not evaluated and are not touched.
