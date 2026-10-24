# Phases 05–07 — Routes, cases, accessibility, and SEO

**Status:** Complete · **Observed:** 2026-10-24

- Replaced the timeline-first page with a short recruiter home and detail routes for projects, case studies, labs, and AI-assisted engineering process.
- Routes are hash-based so refresh/deep links keep working at GitHub Pages base `/portfolio/`.
- Project index supports search; detail pages show role, repository scope, feature state, evidence notes, observed date, link availability, and limitations.
- The eight audited technical cases render individually. Private personal project content has no public repository or live link.
- Built responsive cards and semantic page sections using existing Vite/vanilla TypeScript and CSS tokens. No UI framework was added.
- Added skip-link focus, heading focus after route changes, mobile menu inert/expanded state, native dialog keyboard behavior, reduced-motion support, dynamic route titles/descriptions, canonical metadata, sitemap link, and favicon.
- Playwright production-preview checks passed at 360, 768, 1024, and 1440 CSS pixels, with no horizontal overflow or browser console errors.
- Local screenshots: `docs/audit/screenshots/08-final-desktop.png` and `08-final-mobile.png`. Existing live baseline screenshot: `08-live-baseline.png`.

The existing live baseline returned HTTP 200; the page title was “Đào Văn Hùng — Backend Python · Flutter · System Analysis,” its first heading was “Mình đã làm gì và phát triển như thế nào?”, and the browser recorded no console/page errors. This confirms only the current baseline response. It does not prove this branch is deployed.
