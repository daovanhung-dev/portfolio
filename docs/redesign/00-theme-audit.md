# Case theme audit

**Observed:** 2026-10-24 (Asia/Ho_Chi_Minh)  
**Source:** `https://github.com/erlandv/case`  
**Pinned commit:** `c7072e44ce345f59e47b9fa5fc0f338bf783943d` (`v1.1.0`)

## Source structure and license

- Astro 5 static site with TypeScript, Astro Content Collections, MDX, Zod, the Astro sitemap integration, and Sharp.
- Main reusable source includes page layouts, content cards, navigation, theme toggle, SEO and structured-data components, table of contents, and project/decision detail routes.
- The source is MIT-licensed. Its copyright and permission notice must remain in the portfolio repository and provenance must identify the pinned source commit.
- The source contains demo author identity, projects, career entries, decisions, articles, talks, testimonials, and quantitative outcomes. These are illustrative sample content and must not appear in the public portfolio.

## Isolated build

The theme was cloned to `/tmp/portfolio-reference/case`, checked out at the pinned commit, and left detached from the portfolio repository. Resolved dependencies were Astro 5.16.7, MDX 4.3.13, sitemap 3.6.1, and Sharp 0.34.5.

`npm ci`: PASS (426 packages audited, 0 vulnerabilities).  
`npm run build`: PASS (`astro check` reported 0 errors, warnings, or hints; 34 sample static pages built).

## Adaptation decisions

- Reuse the theme's content-first layout, typography, component patterns, MDX flow, and dark/light interaction; replace all sample content and identity.
- Keep the portfolio's evidence taxonomy and explicit limitations; the theme's simpler completed/ongoing/archived status is not sufficient on its own.
- Set the GitHub Pages site/base explicitly and route all internal links and assets through the base-aware path helper.
- Avoid importing sample background images or fake project screenshots. Use real approved portfolio media only; otherwise use text and source-linked evidence.
