# Current content inventory and migration decisions

**Observed:** 2026-10-24 · **Source branch:** `feat/case-astro-redesign` · **Source commit:** `f2ca9f812381274a15ba59fcd36c0438533c3a88`

## Baseline records and migrated collections

At baseline commit `f2ca9f812381274a15ba59fcd36c0438533c3a88`, the Vite source of truth was `src/data/portfolio-content.ts` plus `evidence.ts` and `repositories.ts`. This migration maps those records into Astro collections under `src/content/`, with shared evidence and repository inventories in `src/data/evidence.json` and `src/data/repositories.json`. Current counts are 16 repository records (one restricted, one empty), 14 public project records, 8 case studies, 7 experience records, 4 lab records, 5 evidence-linked capability groups, and 30 evidence references. The empty `My_Courses` repository remains inventory-only. The restricted personal project has no public URL, source path, branch, commit SHA, or media reference.

| Current project ID | Direct route slug | Migration action |
|---|---|---|
| `portfolio` | `portfolio-evidence` | migrate; mark branch implementation as not deployed |
| `nanobio-mobile` | `nanobio-local-cloud` | rewrite with separate local, cloud, and AI states |
| `nanobio-backend` | `nanobio-fastapi-foundation` | migrate as source-only foundation |
| `study2work` | `study2work-contracts` | rewrite with Express 4 and incomplete runtime boundary |
| `hvc-evolution` | `hvc-implementation-evolution` | rewrite with three separate repository/version scopes |
| `labvnua` | `labvnua-student-app` | migrate with role/team details labeled self-reported |
| `story-delivery` | `privacy-safe-story-delivery` | rewrite as sanitized owner-attested context; no private source link or media |
| `xiaozhi` | `xiaozhi-fork-attribution` | migrate fork-only attribution; source study, no device acceptance claim |
| `nano-privacy` | `nanobio-trust-center` | migrate as source-backed policy documentation, not legal/compliance verification |
| `nihongo` | `nihongo-design` | migrate as design/scaffold |
| `learn2earn` | `learn2earn-history` | archive as historical source |
| `vogia` | `vogia-vocabulary` | migrate as partial MVP |
| `ai-local` | `ai-local-inference` | migrate as partial source; no performance claims |
| `qtm` | `qtm-quiz` | migrate source-backed behavior; runtime and test suite remain unverified |

## Legacy files and records

| Source | Records / overlap | Decision |
|---|---|---|
| `profile.ts` | Profile, summary, principles, 4 metrics, workflow and security lists | Rewrite from approved profile; exclude unverified counts and broad skill claims |
| `experience.ts` | 8 timeline IDs | Rewrite to the 7 current records; combine FPT Intern/Fresher under separate dated phases |
| `projects.ts` | 10 older project IDs | Map each to the current project or experience below; remove stale technical and live claims after migration |
| `live-products.ts` | 6 records marked `LIVE` | Hold-unverified; do not publish availability or product claims from these flags alone |
| `capabilities.ts` | 9 legacy groups and older reference IDs | Rewrite from evidence-linked capability records; omit arbitrary levels and dangling references |
| `case-studies.ts` | 7 older narratives | Rewrite supported narratives into the current evidence-backed cases; hold Android release and admin security details until dedicated proof is confirmed |
| `education.ts` | Institution, program, expected year, GPA/credits and English self-assessment | Migrate school/program/expected year; optional dated GPA/credits stay explicitly self-reported; exclude IELTS self-assessment |
| `links.ts` | GitHub, email, LinkedIn and hash navigation | Migrate contact links; replace navigation with static Astro routes |
| `types.ts`, current components, tests, scripts and Vite config | Legacy component contracts and hash-route behavior | Rewrite for Astro collections, static routes, evidence validation and direct URL behavior; do not carry `innerHTML` route rendering |
| `docs/old/*.md` | September summaries and old timelines | Retain as historical references; current claims follow the October audit, and restricted personal links/details are redacted |

### Older project ID mapping

| Older project ID | Current destination | Decision |
|---|---|---|
| `learn2earn` | `learn2earn-history` | archive / historical |
| `labvnua` | `labvnua-student-app` | migrate |
| `fpt-enterprise` | FPT experience and `fpt-debugging` case | rewrite as user-attested generic scope; no client/source details |
| `nanobio` | `nanobio-local-cloud`, `nanobio-fastapi-foundation`, `nanobio-trust-center` | split by app, backend and policy evidence |
| `linguasphere` | VentureX experience | rewrite as design/system-analysis scope, not a shipped project |
| `hvc-management` | `hvc-implementation-evolution` | rewrite with version boundaries |
| `study2work` | `study2work-contracts` | rewrite with active-branch/package boundaries |
| `nihongo` | `nihongo-design` | migrate as design/scaffold |
| `restricted-project` | `privacy-safe-story-delivery` | exclude private links/media; sanitized owner-attested summary only |
| `portfolio` | `portfolio-evidence` | rewrite as this Astro migration completes |

### Experience and case mapping

- Legacy experience IDs map as: `maiatech-learn2earn` → `maiatech`; `vnua-innovation` → `vnua-study`; `fpt-intern` and `fpt-current` → dated phases in `fpt`; `nanobio-owner` → `nano-owner`; `venturex-design` → `venturex`; `hung-cuong` → `hvc-work`; `study2work` → `study-work`.
- Existing case narratives map to `fpt-debugging`, `nanobio-local-cloud-ai`, `hvc-implementation-evolution`, and `privacy-safe-story-delivery` where the claims remain supported. NanoBio Admin security claims and Android release acceptance remain `hold-unverified`; the CI/CD case is superseded by the portfolio's actual Astro build/deploy evidence. The other current cases cover the FastAPI foundation, Study2Work, `ai_local`, and XiaoZhi attribution.
- No independent writing articles or CV file are present. Writing and CV routes/downloads are omitted until approved source material exists. The Astro migration itself may have an ADR based on this user-selected architecture, without inventing alternatives.

## Display rules carried into Astro

Keep delivery status separate from evidence level and URL reachability. Do not turn repo presence or an HTTP response into a production claim. FPT and VentureX remain user-attested; private project details stay sanitized; security labs remain learning scope. Use only current public SHA/path references for public repositories. The master-profile PDF and original chat history remain `MISSING_SOURCE`.
