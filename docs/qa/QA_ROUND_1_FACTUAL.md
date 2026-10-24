# QA round 1 — Factual and attribution review

**Date:** 2026-10-24 · **Reviewer:** implementation self-review · **Score:** 10/10 checks passed after fixes

This is a source-to-public-wording review, not independent employment verification. Owner-provided career facts remain marked user-attested; missing source artifacts remain `MISSING_SOURCE`.

| Check | Result | Evidence / fix |
|---|---|---|
| 16 repository records; 15 non-empty sources mapped | PASS | `01_REPOSITORY_INVENTORY.csv`; evidence data validator. |
| Empty `My_Courses` has no project card | PASS | Repository state and project mapping test. |
| Source refs pin SHA/path where available; all refs carry date and public-safe flag | PASS | Typed data validator and `src/data/evidence.ts`. |
| FPT Intern and Fresher periods match approved matrix | PASS | First review found the two roles collapsed into one range; wording now distinguishes 03/2026–07/2026 and 07/2026–present. |
| MAIATECH/Learn2Earn timeline is historical and dated | PASS | Added 09/2025–03/2026 and a separately labeled user-attested role ref. |
| Study2Work branch/stack/runtime wording is accurate | PASS | Uses latest relevant `hoang_xuan_long_dev` evidence; Express 4 and runtime gaps are stated. |
| HVC versions remain separate | PASS | FastAPI historical, narrower Angular, and newer Vue scopes are separate feature proofs. |
| NanoBio local/cloud/AI and FastAPI states are distinct | PASS | Mobile/local, Supabase-dependent features, and source-only FastAPI have separate records. |
| XiaoZhi fork attribution and device limitation remain explicit | PASS | Fork source reference and no build/flash/speaker verification note. |
| Our Story and unavailable profile sources are handled safely | PASS | No direct URL/media; PDF and chat history are `MISSING_SOURCE`. |

**Rerun:** `npm run validate` passed after the chronology and role-reference corrections. The complete run is recorded in `FINAL_VALIDATION.md`.
