# QA round 3 — Recruiter experience and production preview

**Date:** 2026-10-24 · **Reviewer:** implementation self-review · **Score:** 9/9 checks passed after fixes

| Check | Result | Evidence / fix |
|---|---|---|
| Recruiter home shows role, focus, selected work, career, contact | PASS | Final desktop/mobile screenshots. |
| Project/case/lab/process routes load directly and refresh | PASS | Playwright deep-link refresh on `/portfolio/#/projects/nanobio-fastapi-foundation`. |
| Route transition moves focus to page heading | PASS | Playwright keyboard test. |
| Skip link, dialog, Escape, and focus return work | PASS | Playwright keyboard/focus test. |
| Reduced-motion preference is respected | PASS | Playwright emulates `reduce`; computed root scroll behavior is `auto`. |
| 360/768/1024/1440 widths have no horizontal overflow | PASS | Playwright checks all six route types at each width. |
| Browser console and page errors | PASS | No errors across viewport route checks. |
| Private story route has no public source link | PASS | Playwright route check. |
| Local and live-baseline states are separated | PASS | Local production preview tested; old live baseline returned HTTP 200 and no console/page error. New branch remains not deployed. |

The initial Playwright run could not start because the machine lacked its Chromium binary. Chromium was installed, then the suite passed 7/7. The first “mobile” capture used Playwright's desktop default; the test was corrected to 360 CSS pixels and rerun. Final captures are `08-final-desktop.png`, `08-final-mobile.png`, and `08-live-baseline.png` under `docs/audit/screenshots/`.

**Live baseline observation:** on 2026-10-24 the existing public site returned HTTP 200; title “Đào Văn Hùng — Backend Python · Flutter · System Analysis”; first h1 “Mình đã làm gì và phát triển như thế nào?”; no browser console/page errors. This is not branch deployment evidence.
