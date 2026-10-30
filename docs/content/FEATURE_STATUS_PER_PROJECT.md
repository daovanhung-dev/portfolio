# Feature status per selected project

Feature status is independent of URL availability. The portfolio audit did not verify a live product end-to-end; no project is labeled deployed-verified.

| Project | Feature | State | Limitation |
|---|---|---|---|
| NanoBio mobile | Local data and on-device AI source | Partial | No device or performance verification in this portfolio audit. |
| NanoBio mobile | Optional Supabase/cloud flows | Partial | No remote migrations, policy or runtime check. |
| Study2Work | API/event contracts and modules | Implemented in source | No full service integration run. |
| Study2Work | Cross-service runtime | Partial | Runtime acceptance was not established by the source audit. |
| HVC FastAPI | Historical implementation | Historical | Separate codebase and scope from later versions. |
| HVC Angular | Education operations | Partial | Scope is narrower than the Vue implementation. |
| HVC Vue | Newer education operations | Partial | Remote Supabase behavior and feature acceptance were not checked. |
| LabVnua | Academic app source | Partial | README reports basic automated coverage; runtime was not verified in this audit. |
| ai_local | Local inference and model management source | Partial | No device or performance measurement. |

The full historical repository inventory remains in docs/audit/. Projects omitted from the public showcase are not included in the current project collection.
