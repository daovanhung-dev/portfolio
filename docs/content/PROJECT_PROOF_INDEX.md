# Project proof index

The public portfolio presents five selected projects. Repository snapshots and source-path details remain in docs/audit/01_REPOSITORY_INVENTORY.csv, docs/audit/03_SOURCE_STATUS_MATRIX.csv, src/data/repositories.json, and src/data/evidence.json. Audited repositories can remain in that inventory without a public project page.

| Selected project | Source repository mapping | State | Evidence refs |
|---|---|---|---|
| NanoBioAI local-first mobile | NanoBioAI | Partial; runtime and cloud behavior unverified | ev-nanobio-role, ev-nano-mobile, ev-nano-test-contract |
| Study2Work | `main` default @ `bb9e2be2e146285f004cdc00e8d632ca8ed1b4a3`; latest reviewed `develop` @ `376054183df9b611c65b14c4e650037b051fb49f` | Partial; no demo/production verified. Develop has Study API routes for 66 design IDs, Work API has 21 HTTP operations, and Work Web/Mobile plus AI source; #99–103 have DD but no Study route. Study Web and DB Admin source are evidenced on main, so the eight package architecture spans snapshots. DB Admin is local-only and absent from the reviewed develop `apps/` tree. | ev-study-role, ev-study-api-source, ev-study-contracts, ev-work-api-source, ev-work-web-source, ev-study-web-source, ev-study-screen-design, ev-work-mobile-source, ev-work-mobile-design, ev-ai-api-source, ev-db-admin-source |
| HVC implementation evolution | edu_hvc, HVC_EDU, HVC_EDU_NEW | Historical + partial by version | ev-hvc-role, ev-hvc-fastapi-source, ev-hvc-angular-source, ev-hvc-vue-source |
| LabVnua / EduAI | LabVnua/develop | Partial; runtime unverified | ev-labvnua-source, ev-vnua-role |
| ai_local | ai_local | Partial; device performance unverified | ev-ai-local-source |

No selected project is labeled deployed-verified. FPT debugging remains a user-attested, sanitized case study rather than a public code repository.
