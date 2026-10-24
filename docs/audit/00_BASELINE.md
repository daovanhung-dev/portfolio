# Baseline — Portfolio 2026 audit

**Captured:** 2026-10-24 (Asia/Ho_Chi_Minh)
**Base commit:** `a99fac9d6dd769e2a4b2b31f4eead9629f00faf0`
**Working branch:** `feat/portfolio-evidence-audit-2026-10`

## Repository state

- The working branch was created from `main` at the base commit above.
- Before this audit, the only untracked files were the two user-supplied portfolio instructions in `docs/`. They are preserved and excluded from delivery staging.
- No root `AGENTS.md` existed at baseline.
- Existing stack: Vite + vanilla TypeScript, Vitest/jsdom, semantic CSS, and GitHub Pages at `/portfolio/`.
- Dependencies were installed with Node `v24.21.0` and `npm ci`.

## Initial product shape

`src/main.ts` mounts the experience timeline, projects, contact section, and project dialog. Capability, case-study, direction, education, and live-product renderers exist in `src/components/` but are not mounted. Existing hash anchors cover the three mounted sections only.

## Baseline artifacts

- Desktop screenshot: `docs/audit/screenshots/00-baseline-desktop.png`
- Mobile screenshot: `docs/audit/screenshots/00-baseline-mobile.png`
- Commands and results: `docs/audit/BASELINE_TESTS.md`

Screenshots use Chrome headless with a five-second virtual-time budget so the initial reveal animation settles before capture.
