# Feature status per selected project

Feature status is independent of URL availability. The portfolio audit did not verify a live product end-to-end; no project is labeled deployed-verified.

| Project | Feature | State | Limitation |
|---|---|---|---|
| NanoBio mobile | Local data and on-device AI source | Partial | No device or performance verification in this portfolio audit. |
| NanoBio mobile | Optional Supabase/cloud flows | Partial | No remote migrations, policy or runtime check. |
| Study2Work | Study API route source | Partial | `develop` @ `376054183df9b611c65b14c4e650037b051fb49f` maps 66 design API IDs to source routes; route presence does not verify runtime. #99–103 have DD but no route in this snapshot. |
| Study2Work | TechLead role and personal contribution scope | User-attested | Owner-reported scope includes product concept, research, scenarios, architecture/diagrams, API DD, database design and coding APIs #1–8/#48–103; repository authorship is not individual proof. |
| Study2Work | Work API route source | Partial | 21 HTTP operations are present in Express 4/Prisma source; end-to-end and deployment behavior are unverified. |
| Study2Work | Study Web source | Partial | Vue 3 source is present in default `main` @ `bb9e2be2e146285f004cdc00e8d632ca8ed1b4a3`; the 83-surface design inventory is separately in reviewed `develop`. No UI runtime or production acceptance is claimed. |
| Study2Work | Study UI inventory and Work Mobile views | Design | 83 Study surfaces and 45 Work Mobile views are documented design scope, not delivered runtime screens. |
| Study2Work | Work Web application | Partial / source | React source is present in reviewed `develop`; route/page runtime and full client/server acceptance are unverified. |
| Study2Work | Work Mobile application | Partial / prototype | Flutter source exists in reviewed `develop`; direct Neon/Gemini boundaries are prototype scope and have no production verification. The 45 documented views are design artifacts. |
| Study2Work | AI-assisted CV/JD, learning support and workforce training | Design | Product vision; current AI API is a minimal Ollama chat path, not an evidenced matching or tutoring service. |
| Study2Work | Study–Work integration | Design | Target architecture only; evidence sharing is not wired across the two domains. |
| Study2Work | DB Admin | Source-only / local-only | Angular and FastAPI source are present in default `main` @ `bb9e2be2e146285f004cdc00e8d632ca8ed1b4a3`, absent from the reviewed `develop` `apps/` tree, and intended for local tooling; no hosted service is claimed. |
| HVC FastAPI | Historical implementation | Historical | Separate codebase and scope from later versions. |
| HVC Angular | Education operations | Partial | Scope is narrower than the Vue implementation. |
| HVC Vue | Newer education operations | Partial | Remote Supabase behavior and feature acceptance were not checked. |
| LabVnua | Academic app source | Partial | README reports basic automated coverage; runtime was not verified in this audit. |
| ai_local | Local inference and model management source | Partial | No device or performance measurement. |

The full historical repository inventory remains in docs/audit/. Projects omitted from the public showcase are not included in the current project collection.
