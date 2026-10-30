# Study2Work API coding handoff

Public-safe context for continuing Study Server API work. This file lives in the portfolio repository; it is a **manual handoff**, not part of the Study2Work `.agents` loader. When coding in Study2Work, load that repository's current instructions and source first. They take precedence over this snapshot.

## Verified snapshot and scope

- Repository: [daovanhung-dev/Study2Work](https://github.com/daovanhung-dev/Study2Work).
- Default `main`: `bb9e2be2e146285f004cdc00e8d632ca8ed1b4a3`.
- Reviewed `develop`: `376054183df9b611c65b14c4e650037b051fb49f` (2026-10-30 snapshot).
- In that `develop` snapshot, `apps/study-server/app/api/v1.py` declares 69 HTTP operations across 58 unique path templates, including `/hello` and `/test/db`. Annotated route operations map to 66 Study API design IDs; API #03 has two operations (login and refresh).
- Study IDs with route source: `#01–#09`, `#12–#14`, `#34`, and `#46–#98`. This is source evidence only, not live database, runtime, or deployment acceptance.
- APIs `#99–#103` have DD packages but no route source in the reviewed `develop` snapshot. User-reported coding contribution through #103 is a separate `user-attested` claim; do not use it as source evidence.
- Work API has 21 HTTP operations in Express 4/TypeScript/Prisma source. It is a separate domain and is not evidence that Study–Work integration is wired.
- The eight-package portfolio architecture is synthesized across the two reviewed branches, not one checkout snapshot: Study API, Work Web/API/Mobile, and AI source were reviewed on `develop`; Study Web and DB Admin source were reviewed on default `main`. DB Admin is local-only and is absent from the reviewed `develop` `apps/` tree. Re-check the active branch before using this map for implementation.
- No demo or production deployment has been verified. Current product-wide target concepts such as free learning, CV/JD matching, tutoring, workforce training, and Study–Work evidence exchange are not claims of current API behavior.

## Canonical context load order

Start from the current Study2Work checkout and follow its current router/registry:

1. [`AGENTS.md`](https://github.com/daovanhung-dev/Study2Work/blob/376054183df9b611c65b14c4e650037b051fb49f/AGENTS.md), [`.agents/AGENTS.md`](https://github.com/daovanhung-dev/Study2Work/blob/376054183df9b611c65b14c4e650037b051fb49f/.agents/AGENTS.md), and [`.agents/context-map.md`](https://github.com/daovanhung-dev/Study2Work/blob/376054183df9b611c65b14c4e650037b051fb49f/.agents/context-map.md).
2. Run the current worklog selector for the exact task type; read up to three relevant same-type worklogs and preserve the active checkout's dirty files.
3. Read [`.agents/server-study/AGENTS.md`](https://github.com/daovanhung-dev/Study2Work/blob/376054183df9b611c65b14c4e650037b051fb49f/.agents/server-study/AGENTS.md) and [`.agents/server-study/INDEX.md`](https://github.com/daovanhung-dev/Study2Work/blob/376054183df9b611c65b14c4e650037b051fb49f/.agents/server-study/INDEX.md), then load only the routed pages for API, database, security, tests, and workflow scope.
4. Read the exact API catalog/DD and its AC diagram, then inspect current router, module, import/caller chain, schema/migrations, and matching tests in the active checkout. Fresh source and tests outrank this handoff or an older DD statement.
5. Before finishing, follow the server-study workflow to run focused tests, required broader checks and context validation, then update the Study2Work worklog/context as required by its current instructions.

Useful canonical pages include [declared routes](https://github.com/daovanhung-dev/Study2Work/blob/376054183df9b611c65b14c4e650037b051fb49f/.agents/server-study/apis/declared-routes.md), [runtime](https://github.com/daovanhung-dev/Study2Work/blob/376054183df9b611c65b14c4e650037b051fb49f/.agents/server-study/core/runtime.md), [database/security](https://github.com/daovanhung-dev/Study2Work/blob/376054183df9b611c65b14c4e650037b051fb49f/.agents/server-study/core/database-security.md), [database context](https://github.com/daovanhung-dev/Study2Work/blob/376054183df9b611c65b14c4e650037b051fb49f/.agents/server-study/database.md), [tests](https://github.com/daovanhung-dev/Study2Work/blob/376054183df9b611c65b14c4e650037b051fb49f/.agents/server-study/tests.md), and [coding workflow](https://github.com/daovanhung-dev/Study2Work/blob/376054183df9b611c65b14c4e650037b051fb49f/.agents/server-study/workflows/README.md).

## Study Server implementation shape

- Composition: `apps/study-server/app/main.py` → `app/api/v1.py` → feature modules under `app/modules/{guest,student,mentor,admin}/api_XX_*`.
- `models.py` holds declarative request/response/data models; request normalization belongs in shared or API-specific validation; `query.py` contains SQL constants when needed; `view.py` coordinates auth, reads/writes, transactions, side effects, and response mapping.
- Reuse existing auth, response, trace, database, and error helpers. Follow current role guards and route conventions; do not copy auth or response plumbing into a feature module.
- Keep facts separate as `DIRECT`, `DERIVED`, or `SOURCE_REQUIRED`. Do not silently turn a DD proposal into an approved enum, table/column mapping, permission, transition, response field, job lifecycle, storage rule, or runtime claim.
- If an approved requirement cannot be mapped safely to current schema/provider behavior, record the open question and stop that dependent implementation rather than inventing behavior.

## DD entry points and unresolved decisions for #99–#103

- [#99 Admin discussion moderation DD](https://github.com/daovanhung-dev/Study2Work/tree/376054183df9b611c65b14c4e650037b051fb49f/apps/study-server/docs/dd/99_admin_discussions_moderate): contract describes `PATCH /api/v1/admin/discussions/{discussion_id}/moderate`; allowed action tokens, state transitions, authorization policy, and physical audit mapping still require source/contract review. Do not implement deletion through #99; #100 is separate.
- [#100 Admin discussion deletion DD](https://github.com/daovanhung-dev/Study2Work/tree/376054183df9b611c65b14c4e650037b051fb49f/apps/study-server/docs/dd/100_admin_discussions_delete): inspect its open questions and current discussion relations before choosing soft/hard deletion or dependency behavior.
- [#101 Admin report summary DD](https://github.com/daovanhung-dev/Study2Work/tree/376054183df9b611c65b14c4e650037b051fb49f/apps/study-server/docs/dd/101_admin_reports_summary) and [#102 Community impact DD](https://github.com/daovanhung-dev/Study2Work/tree/376054183df9b611c65b14c4e650037b051fb49f/apps/study-server/docs/dd/102_admin_reports_community_impact): validate metric definitions, filters, permissions, time ranges, and data ownership against approved contracts and live source schema; keep draft semantics marked `DERIVED` or `SOURCE_REQUIRED`.
- [#103 Community impact export DD](https://github.com/daovanhung-dev/Study2Work/tree/376054183df9b611c65b14c4e650037b051fb49f/apps/study-server/docs/dd/103_admin_reports_community_impact_export): preserve the documented response discrepancy (`Report` in the endpoint row versus `Operation` in async tracking text) until resolved. Polling API #18, operation identity/lifecycle/result, export storage, format/filter validation, retention and download authorization also need confirmation.

## Safe status language

Use “route/source exists” only for code present at the current checkout SHA; describe DD, diagrams, inventories and UI views as design artifacts. Keep tests-run status separate from test-file presence. A passing focused test does not prove a live database, external provider, deployment, or full product workflow. Never include secrets, private evidence, raw production records, or claims inferred solely from commit authorship.
