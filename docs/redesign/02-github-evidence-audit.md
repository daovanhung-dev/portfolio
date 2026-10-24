# GitHub evidence audit for the Astro migration

**Observed:** 2026-10-24 (Asia/Ho_Chi_Minh)
**Window:** 2026-08-24 00:00 through 2026-10-24 23:59 +07
**Coverage source:** existing `docs/audit/01_REPOSITORY_INVENTORY.csv`, `03_SOURCE_STATUS_MATRIX.csv`, and SHA-keyed logs. Public branch refs were refreshed with `git ls-remote` on 2026-10-24; no public ref moved since the recorded snapshot.

## Repository and branch coverage

| Repository | Default branch / SHA | Latest relevant branch / SHA | Branches | Window commits | Evidence treatment |
|---|---|---|---:|---:|---|
| `portfolio` | `main` / `a99fac9d6dd769e2a4b2b31f4eead9629f00faf0` | Remote `main`; local redesign base `f2ca9f812381274a15ba59fcd36c0438533c3a88` | 2 | 6 | Existing Vite baseline and current local redesign are separate; feature branch is not deployed |
| `NanoBioAI` | `main` / `f26e89c6e5f644c6bea1992b11debe06833aa2a0` | `main` / same | 3 | 68 | Window history fetched shallow after full clone stalled; pre-window history remains a gap |
| `Study2Work` | `main` / `bb9e2be2e146285f004cdc00e8d632ca8ed1b4a3` | `hoang_xuan_long_dev` / `b5c15bb34c8f650dd802f962e946858c1071f8f0` | 8 | 128 | Use latest relevant branch; Work API is Express 4; no end-to-end runtime claim |
| `HVC_EDU_NEW` | `main` / `c2b0f5f47466204b39f69eaa17616e14a1b5ebd3` | `main` / same | 1 | 86 | Current Vue/Supabase scope; remote state unverified |
| `HVC_EDU` | `main` / `b5a8be30bbd270b26fa1a2d859c77fe7da111679` | `main` / same | 1 | 23 | Distinct Angular implementation |
| `edu_hvc` | `main` / `07151a2f21cd17693f08029b3a2ff08197db6258` | `main` / same | 1 | 0 | Historical FastAPI/PostgreSQL implementation |
| `LabVnua` | `develop` / `72c1090e7a76e0a10e9feb3e429fb86ba4c0c67b` | `develop` / same | 8 | 0 | Source available; role and team scope remain user-attested |
| Restricted personal project | Withheld | Withheld | Withheld | Withheld | No public repository URL, refs, paths, commit IDs, media, or deployment links retained |
| `xiaozhi-esp32` | `main` / `9cd4401d30fe3b54f0e6b656de44199cb0595f3c` | `main` / same | 44 | 196 | Only fork-specific commits are credited; no firmware/device acceptance claim |
| `nanobioai-privacy` | `main` / `f13c52f9e868e04716c42ef32912e340a41a267d` | `main` / same | 1 | 2 | Static policy source; not legal review or compliance certification |
| `Nihongo-Learning-System` | `main` / `8e310798a366713cc089dec7879ef7ed897d2ec9` | `main` / same | 1 | 2 | Design/scaffold; not released product evidence |
| `Learn2Earn` | `main` / `ca1daa48cc862b1e94ebadf1365143c589ae33dc` | `main` / same | 2 | 0 | Historical source; no current runtime verified |
| `My_Courses` | Empty | Empty | 0 | 0 | No HEAD, branches, tags, or project card |
| `vogiaVocabulary` | `main` / `21ab19b42d340ba8b191d5f77f87101d573be823` | `main` / same | 1 | 10 | Partial Angular/Supabase MVP; remote functions unverified |
| `ai_local` | `main` / `92b1927777eb15ac609b37073203b72ad6b816f0` | `main` / same | 1 | 2 | Local inference/model management source; device performance unverified |
| `QTM` | `main` / `3235755997ccd3ac69dd81eb8a6d4bca50c7cd8b` | `main` / same | 1 | 11 | Static quiz source; no test/runtime execution in source audit |

All 14 accessible non-empty public repositories retained the same branch refs during refresh. The private project was not contacted; its public record is intentionally restricted. `My_Courses` remains empty. Detailed package paths, source classifications, and limitations remain in the existing source matrix for public repositories.

## Package-level evidence status

- NanoBio mobile/local AI, Supabase-dependent features, admin surface, and FastAPI foundation are separate claims. Source is not proof of remote migration, device acceptance, public store listing, or server deployment.
- Study2Work package evidence uses `hoang_xuan_long_dev`; source contracts, routers, tests, and runtime are separate. The portfolio audit did not run those packages.
- HVC implementations stay split across historical FastAPI, narrower Angular, and current Vue scopes. Remote Supabase policies and deployment were not checked.
- Learning labs (Linux/networking/security) are learning direction only. XiaoZhi is source study/fork attribution only, with no physical speaker/firmware acceptance.
- FPT, VentureX, leadership scope, and some dates remain `user-attested`; no confidential client source was copied.

## Limits

- NanoBio full history before the audit window was not fetched; all origin refs and the requested window were captured, and selected current source was read at the pinned SHA.
- The original profile PDF and original ChatGPT history remain `MISSING_SOURCE`.
- The private source was not re-read or re-fetched. Its private details and metadata are intentionally absent from this public report.
- Tests in other repositories and their runtime deployments were not run as part of the portfolio audit.
