# Experience design context

This note captures the current recruiter-facing experience-page patterns for future portfolio work. The Mai A page is a visual reference; its company details, images, technologies, architecture, and contribution claims belong only to that experience.

## Timeline entry

- Keep the timeline data-driven from the `experiences` collection and sort by its configured order.
- For records with `companyMedia`, present the logo beside the organization name and role, then show the short summary, company photo, technologies, location link, and detail link when available.
- Use a compact identity block and a 16:9 photo card with a short caption and source link. Entries without media should retain the simple text layout instead of receiving placeholder imagery.

## Experience detail hero

- Use a two-column desktop hero: role, organization, summary, period, and selected stack on the left; company imagery on the right. Stack the columns below the existing 800px breakpoint.
- Keep the team photo as the main image. Place the small framed logo in the photo caption row beside its caption and source link. Do not float the logo outside the image composition or cover people in the photo.
- Preserve meaningful alt text, image dimensions, local base-aware asset paths, and a source link for each external image.

## Contribution cards

- Group a small number of concrete contributions under a clear heading. Use a two-column grid on desktop and a single column on narrow screens (the current single-column breakpoint is 560px).
- Keep cards visually even, with a subtle border, rounded corners, and the shared surface/text tokens from `src/styles/global.css`.
- Give each contribution a short heading and one supporting sentence. Show a count such as “30 API” at the same ordinary heading size as neighboring contributions; avoid oversized number treatments that make one item look like a standalone KPI.
- Include only contributions supported for that experience. Do not reuse Mai A's API, utility, or optimization claims for another role.

## Detail content below the hero

- Use the prose column for organization context and the individual's role/contributions; keep company facts in a compact aside when useful.
- Group technologies into concise cards when multiple layers or client contexts need explanation. Add an architecture flow only when the experience has a suitable, supported architecture to describe; the current Mai A flow is not a template for other systems' facts.
- Reuse the existing color tokens (`--page`, `--surface`, `--text`, `--muted`, `--subtle`, `--line`, and `--accent`) instead of hardcoding theme colors.

## Data, evidence, and accessibility

- `companyMedia` is optional and is validated in `src/content.config.ts`; keep experience records, routes, technologies, and evidence relationships data-driven.
- Keep role and contribution attribution in the evidence record (`user-attested`, `source-backed`, or `mixed`). The public copy can use confident first-person language while retaining the provenance and any runtime/deployment limits in the appropriate metadata.
- Never transfer company names, logos, photos, dates, technology stacks, responsibilities, or outcomes from one experience to another without evidence for that record.
- Keep headings ordered, links descriptively named, images with useful alt text, and focus visible. Check direct navigation, refresh, dark/light themes, and responsive widths (including 360px, 390px, 768px, and desktop) for overflow and accessibility.
