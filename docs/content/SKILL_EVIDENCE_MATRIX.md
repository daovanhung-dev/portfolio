# Skill evidence matrix

| Skill area | Public evidence | State | Boundary |
|---|---|---|---|
| Python / FastAPI | NanoBio backend foundation; Study2Work Study API modules | Source / partial | No server deployment or full-stack runtime acceptance. |
| Flask / enterprise API | FPT work context | User-attested | No client source or confidential details. |
| Flutter / Dart | NanoBioAI, LabVnua, ai_local source | Partial | Device, release, and performance checks vary by project and are not inferred from source. |
| PostgreSQL / Supabase | HVC and NanoBio source/migrations | Partial | Remote migrations, RLS, or live authorization are not proven by repository SQL. |
| API contracts / system analysis | Study2Work docs and VentureX design scope | Source + user-attested design | Contract presence does not prove runtime wiring. |
| Frontend delivery | Portfolio, Vogia, QTM source; private story project is sanitized | Source | No user scale claim; private story has no public source or media link. |
| Local AI | NanoBio local flow and ai_local source | Partial | No latency, memory, thermal, or device compatibility claim. |
| Security fundamentals | Application architecture and learning direction | Learning / source | No professional penetration test or certification claim. |
| Testing / CI | Source workflows and test files across repositories | Source | Portfolio tests are run in this repo; external repository suites were not run in this audit. |

Evidence kinds are defined in `src/data/types.ts`; evidence refs live in `src/data/evidence.ts`.
