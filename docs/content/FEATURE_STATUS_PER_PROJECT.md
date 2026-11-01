# Feature status per selected project

Feature status is independent of URL availability. NanoBio's public Android listing is verified separately; no project is labeled deployed-verified end-to-end, and the listing does not establish backend or installed-app runtime acceptance.

| Project | Feature | State | Limitation |
|---|---|---|---|
| NanoBioAI / Nabi | Public Android listing on Google Play | Deployed-verified | Listing confirms the public release page and displayed developer; installed-app behavior and backend runtime were not verified. |
| NanoBioAI / Nabi | Local wellness data and schedules | Partial | SQLite datasource source exists; offline behavior and device acceptance were not verified in this portfolio audit. |
| NanoBioAI / Nabi | Authenticated AI text and plan generation | Partial | Flutter calls FastAPI/Ollama source; model configuration, backend runtime and deployment were not verified. |
| NanoBioAI / Nabi | Food-photo vision analysis | Partial | The route is gated by vision configuration and membership; runtime and service availability were not verified. |
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
| HVC_EDU_NEW | Classes, memberships, recurring schedules and sessions | Partial | Current Vue/Supabase source at `c2b0f5f47466204b39f69eaa17616e14a1b5ebd3`; remote runtime was not checked. |
| HVC_EDU_NEW | Attendance, continuous learning records, lesson video and selected-lesson AI | Partial | Source reviewed; AI service behavior and end-to-end acceptance were not verified. |
| HVC_EDU_NEW | Teacher timesheets by session | Partial | Submit, review and database finalization source exists; remote Supabase state was not verified. |
| EduAI | Student academic modules and service integrations | Partial | README identifies the app as an MVP, notes some menu entries remain placeholders and says automated test coverage is minimal; app and remote service runtime were not verified in this audit. |
| ai_local | Local inference and model management source | Partial | No device or performance measurement. |

The full historical repository inventory remains in docs/audit/. Projects omitted from the public showcase are not included in the current project collection.
