# Astro redesign baseline

**Observed:** 2026-10-24 (Asia/Ho_Chi_Minh)  
**Branch:** `feat/case-astro-redesign`  
**Base commit:** `f2ca9f812381274a15ba59fcd36c0438533c3a88`  
**Production:** `https://daovanhung-dev.github.io/portfolio/` (unchanged during this phase)

## Starting state

- The selected base is the evidence-audit branch, which already contains the current source matrix, 14 public project records, 8 case studies, 4 lab records, and 7 experience records.
- The previous Vite application uses hash routes (`#/projects`, `#/case-studies`, `#/labs`, `#/process`) and Vite base `/portfolio/`.
- `docs/audit/` has the prior baseline, audit, QA, and screenshots. `docs/old/` contains historical source material and is not treated as current truth.
- The user-supplied plan files at `docs/CODEX_MASTER_PROMPT_PORTFOLIO_2026.md` and `docs/PORTFOLIO_2026_AUDIT_AND_CODEX_EXECUTION_PLAN.md` were untracked at start and remain untracked; they are not part of the redesign commits.

## Toolchain and original validation

The system shell did not expose Node or npm. Node.js `v22.23.4` was downloaded to `/tmp/dvh-node22` and verified against the official `SHASUMS256.txt`; it is isolated from the system installation.

On the unmodified portfolio source:

| Check | Result |
|---|---|
| `npm ci` | PASS; 173 packages audited, 0 vulnerabilities |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm test` | PASS; 10 tests |
| `npm run validate:project-data` | PASS; 16 repositories, 14 projects, 8 cases, 4 labs |
| `npm run validate:links` | PASS; 4 hash routes and 28 external URLs; LinkedIn fetch failure was a warning |
| `npm run build` | PASS; Vite 6.4.5 builds `/portfolio/` base |
| `npm run test:e2e` | PASS; 7 Playwright checks including 360/768/1024/1440 widths |
| `npm audit --audit-level=moderate` | PASS in the previous recorded validation; 0 vulnerabilities |

The prior captured desktop/mobile images are `docs/audit/screenshots/08-final-desktop.png` and `docs/audit/screenshots/08-final-mobile.png`. These are the selected branch's Vite baseline, not evidence that this branch is deployed. The production deployment remains on `main` until a reviewed merge.

## Recovery point

The redesign starts from the immutable Git commit above. Roll back the migration by reverting the redesign commits or closing the feature PR; do not rewrite history or change `main` directly.
