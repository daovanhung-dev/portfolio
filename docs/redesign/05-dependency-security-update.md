# Dependency security update

**Observed:** 2026-10-24 · **Scope:** build and test dependencies for the static portfolio.

The redesign plan named Astro 5. The initial implementation used Astro 5.16.7, MDX 4.3.13, sitemap 3.6.1, Sharp 0.34.5, and Vitest 3.2.4. `npm audit` reported nine advisories, including critical and high severity findings in Astro/Sharp, Zod, and Vitest dependencies.

No patched Astro 5 release was available for the reported Astro advisories. Astro's current upgrade guide says earlier majors are unsupported and security maintenance is limited to one previous major. The Astro advisory for remote code execution through image optimization identifies releases before 7.2.8 as affected and requires Sharp 0.35.4 or newer for the fix. This portfolio does not process user uploads, but keeping a framework release with known critical advisories in the public repository would leave an avoidable build-chain risk.

For that documented security reason, the feature branch uses Astro 7.4.2, `@astrojs/mdx` 8.0.2, `@astrojs/sitemap` 3.7.4, Sharp 0.35.5, and Vitest 5.0.5. The static rendering architecture, content schema, routes, and deployment base remain the same. `npm audit --audit-level=high` reported zero vulnerabilities after the update.

References:

- [Astro upgrade guide](https://v5.docs.astro.build/en/upgrade-astro/) — earlier majors are unsupported; security maintenance covers one previous major.
- [Astro image optimization RCE advisory](https://github.com/advisories/GHSA-26w7-cxv4-gfx2) — affected and patched versions, and the Sharp requirement.
