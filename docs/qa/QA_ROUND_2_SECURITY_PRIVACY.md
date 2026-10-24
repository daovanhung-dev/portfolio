# QA round 2 — Security, privacy, and source boundaries

**Date:** 2026-10-24 · **Reviewer:** implementation self-review · **Score:** 10/10 checks passed after fixes

| Check | Result | Evidence / fix |
|---|---|---|
| No credential-like strings in typed public content | PASS | `npm run validate:project-data` secret-pattern scan. |
| Evidence explicitly public safe | PASS | Runtime validator rejects any record without `publicSafe: true`. |
| Private story repository has no public URL or CTA | PASS | Unit test and Playwright case route check; static source note is generic. |
| No private media or story text in public pages | PASS | Case/project copy uses only generic routing and delivery wording. |
| Audit attachments do not expose private media filenames | PASS | Review found individual `--name-only` paths in a generated log; removed granular refs/subjects/filenames and retained an aggregate coverage note. |
| FPT/client and student/health data are absent from portfolio content | PASS | Source-review boundary and sanitized claim matrix; no private source copied. |
| Compensation detail removed from current tracked timeline | PASS | `PHASE_02_REPORT.md`; Git history was not rewritten and the audit report has no amounts. |
| Dependency audit | PASS | `npm audit --audit-level=moderate`: 0 vulnerabilities after lockfile updates. |
| GitHub Pages permissions are scoped | PASS | First review found Pages/id-token permissions at workflow scope; they now exist only on the main-branch deploy job. Quality job is read-only. |
| Feature branch and PR cannot deploy | PASS | Deployment/upload job condition is push to `main`; PR and feature branch run quality only. |

**Rerun:** `npm run validate:project-data`, `npm audit`, and the full local validation sequence passed after the workflow permission change. The Our Story audit attachment was re-scanned after sanitization. Third-party repository suites and live backend/device checks remain outside this QA scope.
