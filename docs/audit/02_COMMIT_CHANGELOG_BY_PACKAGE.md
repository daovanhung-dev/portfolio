# Repository and commit audit

**Window:** 2026-08-24 00:00 through 2026-10-24 23:59 Asia/Ho_Chi_Minh (`2026-08-23T17:00:00Z` through `2026-10-24T16:59:59Z`). Snapshots record both author and committer timestamps. Counts are unique commit objects reachable from fetched refs; they are not personal contribution counts.

Each non-empty repository has a SHA-keyed commit list and path-change log, plus a branch/tag snapshot. “Path touches” count a path once per commit, while distinct paths are deduplicated. Current source evidence and limitations are in `03_SOURCE_STATUS_MATRIX.csv` and `04_SOURCE_EVIDENCE.md`.

## portfolio

- Default branch `main` at `a99fac9d6dd769e2a4b2b31f4eead9629f00faf0`; newest branch by commit timestamp `main` at `a99fac9d6dd769e2a4b2b31f4eead9629f00faf0`.
- Commit snapshot SHA `a99fac9d6dd769e2a4b2b31f4eead9629f00faf0`; window commit objects across fetched refs: **6**; path touches: **99** across **52** distinct paths.
- Remote branches: **2**; tags: **0**; audit mode: `full history`.
- SHA-keyed logs: [`git-logs/portfolio/`](git-logs/portfolio/).
- Most changed package/path groups:
  - `src/components` — 28 path touches
  - `src/data` — 17 path touches
  - `src/styles` — 13 path touches
  - `index.html` — 5 path touches
  - `tests/portfolio.test.ts` — 4 path touches
  - `docs/old` — 3 path touches
  - `scripts/validate-project-data.mjs` — 3 path touches
  - `src/main.ts` — 3 path touches

## NanoBioAI

- Default branch `main` at `f26e89c6e5f644c6bea1992b11debe06833aa2a0`; newest branch by commit timestamp `main` at `f26e89c6e5f644c6bea1992b11debe06833aa2a0`.
- Commit snapshot SHA `f26e89c6e5f644c6bea1992b11debe06833aa2a0`; window commit objects across fetched refs: **68**; path touches: **9708** across **8007** distinct paths.
- Remote branches: **3**; tags: **1**; audit mode: `shallow-since window`.
- SHA-keyed logs: [`git-logs/NanoBioAI/`](git-logs/NanoBioAI/).
- Most changed package/path groups:
  - `iot/xiaozhi-esp32` — 1774 path touches
  - `assets/nabi` — 1191 path touches
  - `assets/nabi_v2` — 1172 path touches
  - `lib/app_versions` — 993 path touches
  - `assets/images` — 490 path touches
  - `docs/DD` — 387 path touches
  - `docs/test` — 299 path touches
  - `.codex/design` — 295 path touches
- Full-history clone stalled; branch/tag refs and the requested date window were fetched. History before the window was not downloaded; selected source files were read by SHA/path.

## Study2Work

- Default branch `main` at `bb9e2be2e146285f004cdc00e8d632ca8ed1b4a3`; newest branch by commit timestamp `hoang_xuan_long_dev` at `b5c15bb34c8f650dd802f962e946858c1071f8f0`.
- Commit snapshot SHA `bb9e2be2e146285f004cdc00e8d632ca8ed1b4a3`; window commit objects across fetched refs: **128**; path touches: **7712** across **5132** distinct paths.
- Remote branches: **8**; tags: **0**; audit mode: `full history`.
- SHA-keyed logs: [`git-logs/Study2Work/`](git-logs/Study2Work/).
- Most changed package/path groups:
  - `docs/dd` — 2063 path touches
  - `docs/old` — 1727 path touches
  - `apps/study-server` — 1039 path touches
  - `apps/work-client` — 843 path touches
  - `apps/work-server` — 780 path touches
  - `.agents/skills` — 212 path touches
  - `.agents/server-study` — 146 path touches
  - `docs/data_demo` — 134 path touches
- The newest branch is `hoang_xuan_long_dev` (2026-10-20). Detailed Study2Work package evidence uses `b5c15bb34c8f650dd802f962e946858c1071f8f0`; the default `main` branch is dated 2026-09-27.

## HVC_EDU_NEW

- Default branch `main` at `c2b0f5f47466204b39f69eaa17616e14a1b5ebd3`; newest branch by commit timestamp `main` at `c2b0f5f47466204b39f69eaa17616e14a1b5ebd3`.
- Commit snapshot SHA `c2b0f5f47466204b39f69eaa17616e14a1b5ebd3`; window commit objects across fetched refs: **86**; path touches: **910** across **323** distinct paths.
- Remote branches: **1**; tags: **0**; audit mode: `full history`.
- SHA-keyed logs: [`git-logs/HVC_EDU_NEW/`](git-logs/HVC_EDU_NEW/).
- Most changed package/path groups:
  - `frontend/src` — 467 path touches
  - `supabase/functions` — 114 path touches
  - `docs/agent-context` — 81 path touches
  - `supabase/migrations` — 60 path touches
  - `supabase/tests` — 31 path touches
  - `docs/bug_deploy` — 22 path touches
  - `.github/workflows` — 15 path touches
  - `supabase/AGENTS.md` — 12 path touches

## HVC_EDU

- Default branch `main` at `b5a8be30bbd270b26fa1a2d859c77fe7da111679`; newest branch by commit timestamp `main` at `b5a8be30bbd270b26fa1a2d859c77fe7da111679`.
- Commit snapshot SHA `b5a8be30bbd270b26fa1a2d859c77fe7da111679`; window commit objects across fetched refs: **23**; path touches: **485** across **219** distinct paths.
- Remote branches: **1**; tags: **0**; audit mode: `full history`.
- SHA-keyed logs: [`git-logs/HVC_EDU/`](git-logs/HVC_EDU/).
- Most changed package/path groups:
  - `src/app` — 251 path touches
  - `supabase/functions` — 100 path touches
  - `supabase/migrations` — 27 path touches
  - `.github/workflows` — 11 path touches
  - `docs/IMPLEMENTATION_NOTES.md` — 10 path touches
  - `docs/agent-context` — 10 path touches
  - `src/styles.css` — 9 path touches
  - `docs/BD_TRACEABILITY_MATRIX.md` — 8 path touches

## edu_hvc

- Default branch `main` at `07151a2f21cd17693f08029b3a2ff08197db6258`; newest branch by commit timestamp `main` at `07151a2f21cd17693f08029b3a2ff08197db6258`.
- Commit snapshot SHA `07151a2f21cd17693f08029b3a2ff08197db6258`; window commit objects across fetched refs: **0**; path touches: **0** across **0** distinct paths.
- Remote branches: **1**; tags: **0**; audit mode: `full history`.
- SHA-keyed logs: [`git-logs/edu_hvc/`](git-logs/edu_hvc/).
- Most changed package/path groups:
  - No changed paths in the audit window; pre-existing source is still inventoried.

## LabVnua

- Default branch `develop` at `72c1090e7a76e0a10e9feb3e429fb86ba4c0c67b`; newest branch by commit timestamp `develop` at `72c1090e7a76e0a10e9feb3e429fb86ba4c0c67b`.
- Commit snapshot SHA `72c1090e7a76e0a10e9feb3e429fb86ba4c0c67b`; window commit objects across fetched refs: **0**; path touches: **0** across **0** distinct paths.
- Remote branches: **8**; tags: **0**; audit mode: `full history`.
- SHA-keyed logs: [`git-logs/LabVnua/`](git-logs/LabVnua/).
- Most changed package/path groups:
  - No changed paths in the audit window; pre-existing source is still inventoried.

## Private personal story project

- Private repository references, commit metadata, path counts, and media details are omitted from this public changelog.
- Any portfolio description is limited to generic, owner-attested interactive-delivery context; no private source URL, live link, screenshot, or repository CTA is published.

## xiaozhi-esp32

- Default branch `main` at `9cd4401d30fe3b54f0e6b656de44199cb0595f3c`; newest branch by commit timestamp `main` at `9cd4401d30fe3b54f0e6b656de44199cb0595f3c`.
- Commit snapshot SHA `9cd4401d30fe3b54f0e6b656de44199cb0595f3c`; window commit objects across fetched refs: **196**; path touches: **817** across **420** distinct paths.
- Remote branches: **44**; tags: **76**; audit mode: `full history`.
- SHA-keyed logs: [`git-logs/xiaozhi-esp32/`](git-logs/xiaozhi-esp32/).
- Most changed package/path groups:
  - `main/boards` — 302 path touches
  - `main/assets` — 150 path touches
  - `main/display` — 58 path touches
  - `main/audio` — 47 path touches
  - `scripts/tests` — 29 path touches
  - `main/CMakeLists.txt` — 27 path touches
  - `main/Kconfig.projbuild` — 19 path touches
  - `docs/v1` — 18 path touches
- Fork history includes upstream code; totals above are not personal contribution counts. See `05_FORK_CONTRIBUTION_AUDIT.md`.

## nanobioai-privacy

- Default branch `main` at `f13c52f9e868e04716c42ef32912e340a41a267d`; newest branch by commit timestamp `main` at `f13c52f9e868e04716c42ef32912e340a41a267d`.
- Commit snapshot SHA `f13c52f9e868e04716c42ef32912e340a41a267d`; window commit objects across fetched refs: **2**; path touches: **11** across **11** distinct paths.
- Remote branches: **1**; tags: **0**; audit mode: `full history`.
- SHA-keyed logs: [`git-logs/nanobioai-privacy/`](git-logs/nanobioai-privacy/).
- Most changed package/path groups:
  - `.nojekyll` — 1 path touches
  - `account-deletion.html` — 1 path touches
  - `assets/css` — 1 path touches
  - `assets/js` — 1 path touches
  - `cookie-policy.html` — 1 path touches
  - `data-safety.html` — 1 path touches
  - `health-ai-disclaimer.html` — 1 path touches
  - `index.html` — 1 path touches

## Nihongo-Learning-System

- Default branch `main` at `8e310798a366713cc089dec7879ef7ed897d2ec9`; newest branch by commit timestamp `main` at `8e310798a366713cc089dec7879ef7ed897d2ec9`.
- Commit snapshot SHA `8e310798a366713cc089dec7879ef7ed897d2ec9`; window commit objects across fetched refs: **2**; path touches: **298** across **298** distinct paths.
- Remote branches: **1**; tags: **0**; audit mode: `full history`.
- SHA-keyed logs: [`git-logs/Nihongo-Learning-System/`](git-logs/Nihongo-Learning-System/).
- Most changed package/path groups:
  - `frontend/src` — 127 path touches
  - `design/stitch` — 124 path touches
  - `supabase/functions` — 18 path touches
  - `.github/workflows` — 2 path touches
  - `supabase/migrations` — 2 path touches
  - `.editorconfig` — 1 path touches
  - `.env.example` — 1 path touches
  - `.gitignore` — 1 path touches

## Learn2Earn

- Default branch `main` at `ca1daa48cc862b1e94ebadf1365143c589ae33dc`; newest branch by commit timestamp `main` at `ca1daa48cc862b1e94ebadf1365143c589ae33dc`.
- Commit snapshot SHA `ca1daa48cc862b1e94ebadf1365143c589ae33dc`; window commit objects across fetched refs: **0**; path touches: **0** across **0** distinct paths.
- Remote branches: **2**; tags: **0**; audit mode: `full history`.
- SHA-keyed logs: [`git-logs/Learn2Earn/`](git-logs/Learn2Earn/).
- Most changed package/path groups:
  - No changed paths in the audit window; pre-existing source is still inventoried.

## My_Courses

The remote repository is empty: no source HEAD, branches, tags, or commits. It is inventoried but excluded from project cards.

## vogiaVocabulary

- Default branch `main` at `21ab19b42d340ba8b191d5f77f87101d573be823`; newest branch by commit timestamp `main` at `21ab19b42d340ba8b191d5f77f87101d573be823`.
- Commit snapshot SHA `21ab19b42d340ba8b191d5f77f87101d573be823`; window commit objects across fetched refs: **10**; path touches: **150** across **91** distinct paths.
- Remote branches: **1**; tags: **0**; audit mode: `full history`.
- SHA-keyed logs: [`git-logs/vogiaVocabulary/`](git-logs/vogiaVocabulary/).
- Most changed package/path groups:
  - `src/app` — 61 path touches
  - `supabase/functions` — 26 path touches
  - `design/stitch-export` — 8 path touches
  - `docs/agent-context` — 5 path touches
  - `docs/bugs` — 4 path touches
  - `README.md` — 3 path touches
  - `src/index.html` — 2 path touches
  - `src/styles.css` — 2 path touches

## ai_local

- Default branch `main` at `92b1927777eb15ac609b37073203b72ad6b816f0`; newest branch by commit timestamp `main` at `92b1927777eb15ac609b37073203b72ad6b816f0`.
- Commit snapshot SHA `92b1927777eb15ac609b37073203b72ad6b816f0`; window commit objects across fetched refs: **2**; path touches: **94** across **94** distinct paths.
- Remote branches: **1**; tags: **0**; audit mode: `full history`.
- SHA-keyed logs: [`git-logs/ai_local/`](git-logs/ai_local/).
- Most changed package/path groups:
  - `ios/Runner` — 27 path touches
  - `android/app` — 14 path touches
  - `lib/core` — 11 path touches
  - `lib/features` — 7 path touches
  - `ios/Runner.xcodeproj` — 5 path touches
  - `ios/Flutter` — 3 path touches
  - `ios/Runner.xcworkspace` — 3 path touches
  - `test/core` — 3 path touches

## QTM

- Default branch `main` at `3235755997ccd3ac69dd81eb8a6d4bca50c7cd8b`; newest branch by commit timestamp `main` at `3235755997ccd3ac69dd81eb8a6d4bca50c7cd8b`.
- Commit snapshot SHA `3235755997ccd3ac69dd81eb8a6d4bca50c7cd8b`; window commit objects across fetched refs: **11**; path touches: **40** across **19** distinct paths.
- Remote branches: **1**; tags: **0**; audit mode: `full history`.
- SHA-keyed logs: [`git-logs/QTM/`](git-logs/QTM/).
- Most changed package/path groups:
  - `app.js` — 9 path touches
  - `README.md` — 8 path touches
  - `styles.css` — 7 path touches
  - `docs/mau-de-trac-nghiem.md` — 1 path touches
  - `docs/chapters.json` — 1 path touches
  - `docs/chuong_08_trac_nghiem_on_tap.md` — 1 path touches
  - `docs/chuong_09_trac_nghiem_on_tap.md` — 1 path touches
  - `docs/Trac_nghiem_Chuong_05_Managing_Software_Packages.md` — 1 path touches
