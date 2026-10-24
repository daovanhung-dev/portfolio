# Feature status per project

Feature status is independent of whether a URL responds. Runtime availability is recorded separately in each project record. The current audit did not check a live product feature end-to-end, so no project is labeled `deployed-verified`.

| Project | Feature | State | Limitation |
|---|---|---|---|
| NanoBio mobile | Local data and on-device AI source | Partial | No device or performance verification in this portfolio audit. |
| NanoBio mobile | Optional Supabase/cloud flows | Partial | No remote migrations/policy/runtime check. |
| NanoBio backend | FastAPI package source | Source-only | Server and migration not run. |
| Study2Work | Contracts/API modules | Implemented in source | No full stack or service integration run. |
| Study2Work | Cross-service runtime | Partial | Static audit found wiring gaps; no runtime acceptance. |
| HVC FastAPI | Historical implementation | Historical | Different codebase/scope from later versions. |
| HVC Angular | Education operations | Partial | Scope narrower than Vue implementation. |
| HVC Vue | Newer education operations | Partial | Remote Supabase and feature acceptance not checked. |
| LabVnua | Academic app source | Partial | README reports minimal automated coverage; suite not run here. |
| Our Story | Generic route/config structure | Source-only | Personal content/media/repository URL excluded. |
| XiaoZhi | Fork-specific source | Source-only | No firmware build, flash, or speaker acceptance. |
| Nihongo | Design/reference screens | Design | Not a released product. |
| Learn2Earn | Web and Flutter source snapshot | Historical | No changes in audit window; no current runtime. |
| Vogia | Vocabulary/practice source | Partial | Remote functions and accounts not verified. |
| ai_local | Local inference/model management source | Partial | No device/performance measurement. |
| QTM | Quiz/local-progress behavior in source | Implemented | No automated suite or runtime check found in source audit. |
