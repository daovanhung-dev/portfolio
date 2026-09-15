# Đào Văn Hùng — Engineering Portfolio

Portfolio cá nhân theo hướng evidence-driven engineering: Full-stack Developer thiên Backend Python, Flutter, System Analysis, PostgreSQL/Supabase và AI-assisted Engineering.

## Kiến trúc

Ứng dụng dùng Vite + TypeScript vanilla, không có frontend framework runtime. Nội dung được quản lý trong các module typed dưới `src/data/`; các renderer dưới `src/components/` chỉ chịu trách nhiệm trình bày dữ liệu.

```text
src/
├── data/          # profile, experience, projects, capabilities, live products, cases
├── components/    # typed HTML renderers và accessible project modal
├── styles/        # tokens, global, components, responsive
└── main.ts        # mount, theme, navigation, modal và reveal behavior
```

## Chạy local

Yêu cầu Node.js 22+ và npm:

```bash
npm ci
npm run dev
```

Mở `http://localhost:5173/portfolio/`. Build production:

```bash
npm run build
npm run preview
```

## Data model và content integrity

Mỗi project dùng một contract thống nhất gồm status, evidence level, role, problem, solution, stack, repository/live URLs và case-study references. Capability items bắt buộc map về project hoặc experience evidence.

Portfolio phân biệt:

- enterprise experience;
- live product/deployment;
- active development;
- architecture/design scope;
- project experience;
- frontend proof;
- learning direction.

Source repository thắng portfolio wording. Source tồn tại không tự động có nghĩa feature đã production. Không đưa API key, service key, password, token hoặc `.env` thật vào source.

## Thêm project hoặc live product

1. Thêm data typed vào `src/data/projects.ts` hoặc `src/data/live-products.ts`.
2. Gắn evidence mapping trong `src/data/capabilities.ts` nếu project chứng minh capability mới.
3. Chỉ thêm `liveUrl` sau khi URL được xác minh.
4. Chạy toàn bộ validation trước khi push.

## Kiểm thử và validation

```bash
npm run typecheck
npm test
npm run validate:project-data
npm run validate:links
npm run build
```

`validate:links` làm fail internal anchors và URL malformed; lỗi mạng của external GitHub/GitHub Pages chỉ là warning. Tests kiểm tra data integrity, evidence mapping, render smoke test, modal và theme behavior.

## GitHub Pages

`.github/workflows/deploy-pages.yml` dùng Node 22, chạy toàn bộ quality gates, build artifact và deploy Pages. Pull request/branch chỉ chạy quality checks; deploy chỉ chạy sau khi thay đổi được merge vào `main`.

Canonical URL: `https://daovanhung-dev.github.io/portfolio/`
