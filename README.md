# Đào Văn Hùng — Engineering Portfolio

Portfolio kỹ thuật tĩnh dành cho recruiter và engineering reviewers. Trang chủ dẫn tới dự án, case study, kinh nghiệm, năng lực và evidence; mỗi nội dung phân biệt source, trạng thái triển khai, attribution và giới hạn.

## Architecture

- Astro 7 builds static pages from TypeScript layouts, components and MDX Content Collections.
- Zod schemas in src/content.config.ts validate project, case, experience, lab, capability, profile, education and contact records.
- Shared evidence and repository inventories live in src/data/evidence.json and src/data/repositories.json.
- Client JavaScript is limited to theme preference and progressive project filtering. Without JavaScript, every project remains readable.
- Astro generates sitemap.xml. Local URLs use the configured /portfolio base.

Directory map:

- src/content/ — MDX records split by collection
- src/components/ — layouts, navigation, cards, evidence and status
- src/data/ — shared public-safe evidence and repository JSON
- src/pages/ — static routes, dynamic project/case pages, 404
- src/styles/ — global tokens and responsive styles
- src/utils/ — base-aware paths and evidence display rules
- scripts/ — content integrity and public URL validators
- tests/ — Vitest data and path checks
- e2e/ — Playwright direct-route, accessibility and responsive checks
- docs/audit/ — source audit baseline and reports
- docs/redesign/ — migration map, provenance and review evidence

## Local development

Requires Node.js 22 or newer and npm:

    npm ci
    npm run dev

Open http://localhost:4321/portfolio/. Build and preview:

    npm run build
    npm run preview

## Content and evidence

- Each public claim uses an evidence record or is labeled as owner-attested, design, learning, unverified, or MISSING_SOURCE.
- Source presence, runtime verification, URL availability, feature completeness, and deployment remain separate states.
- Repository evidence pins the observed branch, commit SHA, source path where safe, and observation date.
- The empty My_Courses repository remains inventory-only. Restricted private-project source has no public URL, path, branch, SHA, or media link.
- Historical implementations remain separate. The NanoBio pre-window history gap, missing master-profile PDF and unavailable original chat history are documented.
- Undated GPA/credits and self-assessed IELTS are omitted. No made-up performance, user, outcome, testimonial, or skill percentage appears.

## Quality gates

    npm run lint
    npm run typecheck
    npm run check:astro
    npm test
    npm run validate:project-data
    npm run validate:links
    npm run build
    npm run test:e2e
    npm run validate

The full validation runs lint, TypeScript, Astro/Zod checks, unit tests, relationship and URL validation, build, and Playwright against the built preview. Set CHECK_EXTERNAL_LINKS=1 to probe public external URLs; network failures are warnings, while malformed URLs and broken internal references fail.

## GitHub Pages and rollback

Production origin is https://daovanhung-dev.github.io with Astro base /portfolio/ and trailing slashes. Canonical/Open Graph URLs, assets, navigation, sitemap and 404 recovery paths include the base. Pull requests and feature-branch pushes run quality checks; only a push to main can upload and deploy the Pages artifact.

The feature branch is review evidence, not a deployment. Roll back by reverting the redesign commits or closing the PR; do not rewrite history or modify main directly. Do not merge or manually deploy without explicit authorization.

## Design provenance

The visual system adapts the content hierarchy and selected layout patterns from erlandv/case at pinned commit c7072e44ce345f59e47b9fa5fc0f338bf783943d. Its MIT notice is retained in LICENSE.CASE; details are in THIRD_PARTY_NOTICES.md and docs/redesign/00-theme-audit.md. Demo content and identity were excluded.
