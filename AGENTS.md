# Repository context and working rules

## Purpose and audience

This repository contains Dao Van Hung's public engineering portfolio. It serves recruiters and engineering reviewers. Keep the homepage quick to scan and link to deeper, source-backed project, case-study, and lab pages.

## Architecture

- Astro 7 builds a static site from TypeScript layouts/components and MDX Content Collections validated with Zod.
- Projects, experiences, cases, labs, capabilities, profile, education, and contact are separate collections under `src/content/`; shared public-safe evidence and repository records live in `src/data/`.
- Vitest covers content and path rules; Playwright covers built-page rendering, direct links, refresh, interactions, accessibility, and responsive widths. GitHub Actions runs quality checks and deploys GitHub Pages only from `main`.
- The public deployment base is `/portfolio/`. Preserve it in Astro config, the `sitePath`/asset helpers, canonical and Open Graph metadata, sitemap, robots, and 404 handling.
- Keep route rendering focused and reuse evidence records instead of repeating proof text. Keep project and experience relationships data-driven.

## Source and evidence rules

- Public portfolio claims must map to a public-safe source reference or be labeled `user-attested`, `design-doc`, `learning-lab`, or `unverified` as appropriate.
- Distinguish source presence from tested runtime, live URL availability, feature completeness, and production operation. A reachable static site does not prove its backend or every feature is production-ready.
- Record the observed date and commit SHA for repository evidence. Keep current and historical implementations separate; do not transfer features between project versions.
- Classify each feature as implemented, partial, placeholder, source-only, design, deployed-verified, or historical. Do not claim a check passed if it did not run.
- Keep project and experience relationships data-driven. Validate unique IDs, references, routes, and display state rather than hardcoding content counts.

## Public safety

- Never add credentials, tokens, private evidence, FPT/client source or details, student/family records, private health data, or private media to this public repository.
- Public audit reports may contain sanitized descriptions and references to public repository paths/SHAs only. Do not copy raw files from audited repositories into this portfolio.
- Avoid personal financial details and unsupported claims about users, outcomes, performance, or production readiness. Mark missing source documents as `MISSING_SOURCE` and downgrade claims instead of filling gaps by inference.
- For the XiaoZhi fork, attribute only changes confirmed against upstream; upstream history is not personal contribution evidence.

## Quality commands

Use Node.js 22 or newer and npm:

```bash
npm ci
npm run lint
npm run typecheck
npm run check:astro
npm test
npm run validate:project-data
npm run validate:links
npm run build
npm run test:e2e
npm run validate
```

Run the checks relevant to each change, then the full set before delivery. External URL failures may be warnings when the link validator classifies them as network failures; malformed URLs and broken internal routes must fail validation.

## UI and accessibility

- Use semantic landmarks and headings, visible keyboard focus, accessible names, working keyboard navigation, and reduced-motion behavior.
- Test direct links and refresh on GitHub Pages. Check mobile and desktop layouts for overflow.
- Do not use unmeasured skill percentages or invented metrics. Project details must show role, status, evidence, and limitations where applicable.

## Git and delivery

- Preserve user changes and untracked task instructions. Stage only intended source, reports, and approved public-safe artifacts.
- Use a feature branch and PR for portfolio changes. Do not merge or deploy without explicit authorization. A local preview or existing live baseline does not prove a new branch SHA is deployed.
