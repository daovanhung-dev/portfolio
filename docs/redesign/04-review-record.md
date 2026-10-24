# Redesign review record

**Status:** Complete for the feature-branch implementation · **Reviewed:** 2026-10-24 (Asia/Ho_Chi_Minh)

## Evidence accuracy

- [x] Project, experience, case, lab and capability references resolve to collection records; IDs, slugs, evidence references and route records are checked by the data validator.
- [x] Public claims use repository evidence or explicit owner-attested, design, learning, unverified or `MISSING_SOURCE` states.
- [x] Six legacy `LIVE` flags are held as `hold-unverified`; no flag is presented as deployment proof.
- [x] HVC versions, NanoBio app/backend/policy, Study2Work branches, and historical Learn2Earn remain separate.
- [x] Audit refs were refreshed on 2026-10-24. All 14 accessible public repository refs matched the recorded snapshot; the restricted source was not contacted. NanoBio history before the audit window remains missing.
- [x] Missing profile PDF and original chat history are recorded as `MISSING_SOURCE`; no CV, writing, testimonial or decisions page was invented.

## Privacy, security and technical review

- [x] Public source and rendered output were checked for restricted-project URLs and identifiers, credential patterns, client source/details, student/family records, health data and private media. Restricted private evidence has no public path, branch, SHA, URL or media link.
- [x] The data validator rejects stale live flags and private evidence carrying source metadata; the rendered-artifact validator rejects restricted URLs/identifiers.
- [x] Internal routes, local assets, canonical URLs, Open Graph metadata, robots, sitemap and 404 paths use the `/portfolio/` base.
- [x] Case provenance is pinned to `erlandv/case` commit `c7072e44ce345f59e47b9fa5fc0f338bf783943d`; MIT notice and attribution are retained. Demo identity and content are excluded.
- [x] A dependency audit prompted a documented upgrade from the planned Astro 5 to Astro 7.4.2; the current lockfile audit reports zero vulnerabilities. Rationale and advisory links are in `05-dependency-security-update.md`.

## Recruiter experience and production readiness

- [x] The homepage presents profile, focus, selected work, cases and contact links in a short scan.
- [x] Project filtering progressively enhances a list that remains readable without JavaScript. Case pages provide a table of contents, evidence, limitations and related work.
- [x] Direct routes and refresh work under `/portfolio/`; navigation, theme persistence, keyboard focus, reduced motion, filters and 404 recovery were checked.
- [x] Playwright found no horizontal overflow at 360, 390, 768, 1024, 1280 or 1440 px. Automated axe checks passed for representative routes in dark and light themes.
- [x] Desktop and mobile screenshots are saved in `screenshots/`. Lighthouse was measured against the local built preview, not a deployment.
- [x] GitHub Actions checks feature branches and deploys Pages only on pushes to `main`; this branch is not described as deployed.

## Three review passes

1. **Evidence and claim accuracy:** checked collection records against the audit inventories and source refs; retained historical boundaries and missing-source labels.
2. **Privacy, security and technical behavior:** checked restricted-data boundaries, Astro base paths, static output, dependency audit, schemas, links and build artifact.
3. **Recruiter usability:** inspected desktop/mobile screenshots and checked navigation, page recovery, theme, filter, keyboard, reduced-motion, viewport overflow and automated accessibility.

## Run results

Executed with Node.js 22.23.4 and npm from a clean install on 2026-10-24:

| Check | Result |
|---|---|
| `npm ci --no-audit --no-fund` | PASS |
| `npm audit --audit-level=high` | PASS — 0 vulnerabilities |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm run check:astro` | PASS — 34 files, 0 errors, 0 warnings, 0 hints |
| `npm test` | PASS — 3 tests |
| `npm run validate:project-data` | PASS — 14 projects, 7 experiences, 8 cases, 4 labs, 5 capability groups |
| `npm run validate:links` | PASS — 30 static routes and 29 public URLs |
| `npm run build` | PASS — 31 static pages |
| `npm run validate:render` | PASS — base-aware metadata/assets/sitemap/404 and 1200×630 OG image |
| `npm run test:e2e` | PASS — 8 Playwright tests |
| `npm run validate` | PASS — all local gates above in sequence |
| `CHECK_EXTERNAL_LINKS=1 npm run validate:links` | PASS with one network warning: LinkedIn fetch failed |
| `git diff --check` | PASS |

## Lighthouse preview measurements

One local preview run per form factor using Lighthouse 13.5.0:

| Form factor | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Desktop | 96 | 100 | 100 | 100 | 1.6 s | 1.6 s | 120 ms | 0 |
| Mobile | 98 | 100 | 100 | 100 | 1.2 s | 1.2 s | 80 ms | 0 |

These are single-run local preview measurements and can vary by machine/network. They do not establish production availability or deployment performance.

## Migration coverage and limits

- Migrated/reworked all 14 public project records, 7 experience records, 8 cases, 4 labs, 5 capability groups, and the profile, education and contact records. The inventory covers all legacy data groups, components, routes, tests, scripts and Vite config.
- The Astro application source is pinned as `ev-astro-source` to `309ca6ec0d2e5f2151b927ccd5b637b8a74a42c7` on `feat/case-astro-redesign`; the content explicitly says that this branch is not deployed.
- One empty repository remains inventory-only. Six old live-product flags remain `hold-unverified`. Sensitive private project material is excluded from current routes and sanitized historical copies.
- Missing source remains for pre-window NanoBio history, the master-profile PDF and original chat history. Portfolio and other project backend/runtime/deployment behavior was not independently tested by this migration.
- Run locally with `npm ci`, `npm run dev`, and open `http://localhost:4321/portfolio/`. Preview a production build with `npm run build` then `npm run preview`.
- Roll back by reverting the redesign commits or closing the PR. The PR is review-only until approved; no merge or manual deployment was performed.
