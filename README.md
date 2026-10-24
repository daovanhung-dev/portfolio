# Đào Văn Hùng — Engineering Portfolio

Portfolio hai tầng cho recruiter và engineering reviewers. Trang chính tóm tắt năng lực/kết quả; hash routes dẫn tới source, feature state, evidence date và giới hạn của từng project/case/lab.

## Architecture

Vite builds static HTML/CSS and vanilla TypeScript. No frontend framework is required at runtime.

```text
src/
├── data/          # typed evidence, repository inventory, projects, career, cases and labs
├── routes.ts      # hash route rendering and page metadata
├── main.ts        # bootstrap, theme, mobile menu, modal and route focus
└── styles/        # tokens, global, components, responsive and portfolio rules
scripts/           # typed content and route/link validators
tests/             # Vitest/jsdom data and interaction checks
e2e/               # Playwright checks against the built preview
docs/audit/        # sanitized audit reports, QA evidence and screenshots
```

Hash routes work under the GitHub Pages base `/portfolio/`:

- `#/projects` and `#/projects/:slug`
- `#/case-studies` and `#/case-studies/:slug`
- `#/labs`
- `#/process`

## Local development

Requires Node.js 22+ and npm:

```bash
npm ci
npm run dev
```

Open `http://localhost:5173/portfolio/`. Production preview:

```bash
npm run build
npm run preview
```

## Evidence and privacy

Content contracts live in `src/data/types.ts`; evidence, repositories, and portfolio records live in `src/data/evidence.ts`, `src/data/repositories.ts`, and `src/data/portfolio-content.ts`.

- Source presence, runtime verification, URL availability, feature completeness, and deployment are separate states.
- Evidence records pin a repository/path/SHA where public and safe, and include an observation date and limitation.
- Empty `My_Courses` is recorded in the audit and omitted from project cards.
- Personal compensation was removed from the current historical document without rewriting Git history. Private client and personal media are excluded from public detail pages.
- Missing PDFs/chat sources, device checks, remote database state, and unrun external tests remain explicit gaps.

## Quality gates

```bash
npm run lint
npm run typecheck
npm test
npm run validate:project-data
npm run validate:links
npm run build
npm run test:e2e
npm run validate
```

`npm run validate` runs the complete local gate sequence, including Playwright against the built preview. External URL network failures are reported as warnings by the link validator; malformed URLs, invalid evidence references, and unknown route targets fail.

## GitHub Pages

The Vite base remains `/portfolio/`. Pull requests and feature-branch pushes run quality checks; only a push to `main` uploads/deploys a Pages artifact. This branch is not deployed. The existing baseline URL can respond successfully without proving that any feature branch is live.

Canonical URL: <https://daovanhung-dev.github.io/portfolio/>
