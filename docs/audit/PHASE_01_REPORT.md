# Phase 01 — Repository/package audit

## Coverage

All 16 named repositories are represented in `01_REPOSITORY_INVENTORY.csv`. Fifteen have source history; `My_Courses` is an empty repository and has no project card. Branch and tag refs/counts, current/default SHA, newest branch, window commits and path changes were audited per repository. For the private personal story project, only aggregate coverage is retained; ref names, commit subjects and filenames are withheld.

The audit window is 2026-08-24 00:00 through 2026-10-24 23:59 +07, converted to `2026-08-23T17:00:00Z` through `2026-10-24T16:59:59Z`. Commit logs use `git log --all` over fetched refs and retain both author and committer timestamps. `02_COMMIT_CHANGELOG_BY_PACKAGE.md` reports path-touch counts and changed package groups; these are not individual contribution counts.

The full-history clone of NanoBioAI stalled while Git processed a large object pack. The audit switched that repository to a shallow fetch at the requested window, retaining every origin branch/tag ref and all commit objects in the requested date window. Its history before the window is a stated coverage gap; focused current files were read by SHA/path. All other non-empty repository histories were fetched to their available roots or have no history older than the requested window.

## Package inspection and source status

`03_SOURCE_STATUS_MATRIX.csv` contains 39 package/evidence rows with SHA, path, feature state, evidence level, test/runtime boundary, attribution uncertainty, risk and portfolio treatment. `04_SOURCE_EVIDENCE.md` summarizes current claims and package boundaries. Key corrections include Study2Work Work API = Express 4, HVC_EDU_NEW current scope excludes historical ClassMonth/finance flows, and the XiaoZhi fork's upstream history is not credited.

Source README/agent context, manifests, entrypoints, tests, workflows and relevant migrations/schema paths were inspected for the packages called out in the plan. Source tests are reported as files/configuration where present; this portfolio audit did not run the other repositories' package suites or deployments.

## Attribution and privacy

XiaoZhi source was compared to `78/xiaozhi-esp32`; three fork-specific commits in current main are described separately, with Git author metadata limitations. No personal media, FPT/client artifacts, student data, secrets or raw private source were copied into reports.

**Gate:** 16/16 repositories accounted; all origin branches/tags audited; requested window coverage recorded or empty-repository status; source/package matrix complete. Personal-source path metadata is sanitized. NanoBio pre-window history remains a documented limitation.
