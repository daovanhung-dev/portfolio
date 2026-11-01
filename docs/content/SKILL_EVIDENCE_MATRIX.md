# Skill evidence matrix

| Skill area | Public evidence | State | Boundary |
|---|---|---|---|
| Python / FastAPI | NanoBio self-hosted AI/API source; Study2Work Study API modules | Source / partial | NanoBio backend deployment and full-stack runtime acceptance are unverified. |
| Flask / enterprise API | FPT work context | User-attested | No client source or confidential details. |
| Flutter / Dart | NanoBioAI, EduAI, ai_local source | Partial | NanoBio's public Android listing is verified; device, feature-runtime, and performance acceptance are not inferred from source. |
| PostgreSQL / Supabase | NanoBio self-hosted PostgreSQL source; HVC Supabase source/migrations | Partial | NanoBio server deployment and HVC remote migrations, RLS, or live authorization are unverified. |
| API contracts / system analysis | Study2Work docs and VentureX design scope | Source + user-attested design | Contract presence does not prove runtime wiring. |
| Frontend delivery | Portfolio, Vogia, QTM source; private story project is sanitized | Source | No user scale claim; private story has no public source or media link. |
| Local AI | ai_local on-device inference source | Partial | No latency, memory, thermal, or device compatibility claim; NanoBio AI requests use its backend API. |
| Security fundamentals | Application architecture and learning direction | Learning / source | No professional penetration test or certification claim. |
| Testing / CI | Source workflows and test files across repositories | Source | Portfolio tests are run in this repo; external repository suites were not run in this audit. |

Evidence kinds are defined in `src/data/types.ts`; evidence refs live in `src/data/evidence.ts`.
