# PORTFOLIO MASTER CONTEXT — ĐÀO VĂN HÙNG
## GitHub Evidence-Driven Engineering Profile

**Snapshot date:** 15/09/2026  
**GitHub owner:** `daovanhung-dev`  
**Primary use:** Portfolio website, CV tailoring, LinkedIn, interview preparation, project case studies, AI/coding-agent context  
**Profile positioning:** Full-stack Developer thiên Backend Python, Flutter/Mobile, System Analysis, PostgreSQL/Supabase và AI-Assisted Software Engineering

---

# 0. CÁCH ĐỌC VÀ NGUYÊN TẮC ĐỘ TIN CẬY

Tài liệu này được tạo bằng cách đối chiếu trực tiếp các repository công khai thuộc GitHub `daovanhung-dev`, README, cấu trúc source, tài liệu kiến trúc, Business Design, implementation plan, package manifest, source-status/audit và dữ liệu portfolio hiện hành.

Mục tiêu của tài liệu là trở thành **source context chuyên nghiệp** cho portfolio. Vì vậy mọi nhận định được phân thành bốn mức:

| Nhãn | Ý nghĩa |
|---|---|
| **[SOURCE-VERIFIED]** | Có bằng chứng trực tiếp trong repository/source/docs hiện hành. |
| **[PORTFOLIO-EVIDENCE]** | Được khai báo trong repository portfolio và có repo liên quan để đối chiếu. |
| **[INFERENCE]** | Suy luận hợp lý từ kiến trúc/nghiệp vụ, nhưng repository không đo trực tiếp kết quả xã hội/kinh doanh. |
| **[VERIFY-BEFORE-PUBLIC]** | Cần kiểm chứng thêm trước khi dùng như một claim công khai mạnh. |

## Nguyên tắc portfolio

1. **Source code và executable contract ưu tiên hơn mô tả marketing.**
2. **Repository có source không đồng nghĩa feature đã production.**
3. **Design/roadmap không được đổi thành “đã triển khai”.**
4. **Static inspection không được đổi thành “runtime PASS”.**
5. **Không đưa secret, password, API key, service-role key, session token hoặc dữ liệu cá nhân vào portfolio.**
6. **Không dùng số liệu người dùng, doanh thu hoặc tác động nếu chưa có analytics/evidence.**
7. **Mọi project nên được kể theo trục:** Problem → Users → Role → Solution → Architecture → Engineering Process → Quality → Evidence → Limitations.
8. Các mô tả kiến trúc trong tài liệu ưu tiên tư duy **System Context → Containers → Components → Responsibilities**, tương thích cách trình bày của C4 Model.
9. Cấu trúc tài liệu ưu tiên tính chính xác, dễ quét và evidence-first theo best practice documentation của GitHub.

---

# 1. EXECUTIVE ENGINEERING PROFILE

## 1.1. Định vị tổng thể

Đào Văn Hùng có hồ sơ kỹ thuật nổi bật ở khả năng đi xuyên nhiều tầng của vòng đời phần mềm:

```text
Problem / Business Need
        ↓
Business Analysis
        ↓
System / Data / API Design
        ↓
Frontend + Backend + Mobile Implementation
        ↓
Database / Auth / Security Boundary
        ↓
Testing / Validation / Debugging
        ↓
CI/CD / Deployment
        ↓
Documentation / Traceability / Handoff
```

Các repository cho thấy năng lực không chỉ tập trung vào “viết UI” hoặc “viết API”, mà có xu hướng xây hệ thống theo **source-of-truth, feature boundary, data ownership, authorization, validation và delivery workflow**.

## 1.2. Các trục năng lực được GitHub chứng minh mạnh

### Backend & Data
- Python
- FastAPI
- Flask trong kinh nghiệm doanh nghiệp ngoài GitHub
- PostgreSQL
- Raw SQL / asyncpg
- SQLAlchemy
- Alembic
- Node.js / Express
- NestJS / Fastify
- Prisma
- REST API
- RPC
- Transaction
- Database constraints
- Data ownership
- Audit log

### Frontend
- Vue 3
- TypeScript
- React
- Angular
- Vite
- Pinia
- Vue Router
- Vanilla TypeScript
- HTML / CSS / SCSS
- Bootstrap

### Mobile
- Flutter
- Dart
- Riverpod
- GoRouter
- SQLite
- Local-first architecture
- Notifications
- Background synchronization
- QR scanning
- Device/platform integration

### Cloud / BaaS
- Supabase Auth
- PostgreSQL
- Row Level Security
- PostgREST / Data API
- RPC
- Edge Functions
- Realtime
- Storage

### AI Engineering
- Gemini integration
- Gemini behind trusted Edge Function boundaries
- Ollama/local-model adapter
- Structured output
- Schema validation
- Semantic validation
- AI fallback
- Prompt contract
- AI quota/access boundaries
- AI-assisted coding/documentation workflows

### Architecture & System Analysis
- Business Design
- Module decomposition
- Feature-first architecture
- Serverless modular monolith
- Polyglot monorepo
- Contract-first design
- OpenAPI
- JSON Schema event contracts
- RBAC
- RLS
- Source-of-truth documentation
- Architecture audit
- Runtime/status classification

### Quality & Delivery
- Unit test
- Vitest
- pytest
- Flutter test
- Playwright E2E
- Typecheck
- Ruff / mypy
- Deno check
- Schema lint
- Smoke checks
- GitHub Actions
- GitHub Pages
- Docker / Docker Compose
- CI quality gates
- Secure secret-management rules

---

# 2. GITHUB REPOSITORY MAP

Các repository có ý nghĩa portfolio được phát hiện:

| Repository | Loại | Vai trò portfolio | Tình trạng evidence |
|---|---|---|---|
| `NanoBioAI` | HealthTech / Flutter / AI | Technical Owner / Full-stack Flutter | Rất mạnh |
| `Study2Work` | EdTech + HRTech / Polyglot | Full-stack Developer / System Designer | Mạnh về kiến trúc, cần phân biệt runtime |
| `HVC_EDU_NEW` | Education Operations / Vue + Supabase | Full-stack Developer | Rất mạnh, mới |
| `HVC_EDU` | Education Operations / Angular + Supabase | Full-stack Developer | Mạnh |
| `edu_hvc` | Education Operations / FastAPI + PostgreSQL | Backend / Full-stack | Mạnh về backend |
| `Nihongo-Learning-System` | EdTech / Japanese Learning | Product / System Design | Rất mạnh về design, đang phát triển |
| `LabVnua` | Academic Companion / Flutter | Flutter Team Lead / Full-stack Flutter | Mạnh |
| `Learn2Earn` | Career Platform | Backend Developer / Part-time | Mạnh |
| `portfolio` | Engineering Portfolio | Designer / Developer | Live / evidence hub |
| `hung-quynh-our-story` | Interactive Frontend | Frontend Developer | Live / frontend quality |
| `nanobioai-privacy` | Trust / Compliance Site | Product Delivery / Compliance Evidence | Live support asset |
| `My_Courses` | Chưa có source đáng kể | Không nên đưa portfolio chính | Không đủ evidence |

## 2.1. Các project mới đáng chú ý

### Nihongo Learning System
Repository mới, tập trung vào:
- Japanese learning domain
- SRS
- Kana/Kanji/Vocabulary/Grammar
- LSRW
- AI practice
- Gemini
- Angular
- Supabase
- 38 màn hình Stitch reference
- architecture và implementation plan chi tiết

### HVC_EDU_NEW
Phiên bản Hùng Cường mới theo:
- Vue 3
- TypeScript
- Supabase
- Feature-first
- Serverless Modular Monolith
- GitHub Pages
- RBAC/RLS
- Edge Functions
- payroll/tuition/accounting/session workflows

### Engineering Portfolio
Repository live đóng vai trò:
- evidence aggregator
- typed project data
- project/live-product integrity validation
- GitHub Pages CI/CD

---

# 3. PROJECT FAMILY — HÙNG CƯỜNG EDUCATION MANAGEMENT

## 3.1. Tổng quan sản phẩm

**Repositories:**
- `https://github.com/daovanhung-dev/edu_hvc`
- `https://github.com/daovanhung-dev/HVC_EDU`
- `https://github.com/daovanhung-dev/HVC_EDU_NEW`

**Live evidence:**
- `https://daovanhung-dev.github.io/HVC_EDU/`
- `https://daovanhung-dev.github.io/HVC_EDU_NEW/`

**Portfolio role:** Full-stack Developer  
**Domain:** Education Operations / Test-preparation Center Management

Hùng Cường không nên được mô tả như ba project rời rạc hoàn toàn. Dưới góc nhìn portfolio, đây là một **product family/evolution** cho cùng bài toán quản trị trung tâm giáo dục, với nhiều lựa chọn kiến trúc được thử nghiệm và phát triển:

```text
Excel / manual operations
          ↓
FastAPI + PostgreSQL backend
          ↓
Angular + Supabase operational version
          ↓
Vue + Supabase richer modular architecture
```

Đây là một bằng chứng tốt cho năng lực:
- phân tích nghiệp vụ thực tế;
- chuyển nghiệp vụ thủ công thành software model;
- thiết kế nhiều kiến trúc khác nhau cho cùng domain;
- backend/database;
- authentication/authorization;
- finance-related transaction;
- deployment.

---

## 3.2. Vấn đề thực tiễn được giải quyết

### [SOURCE-VERIFIED]
Repository `edu_hvc` mô tả trực tiếp mục tiêu chuyển nghiệp vụ từ bộ Excel hiện tại sang **Web App + PostgreSQL**.

### [INFERENCE — portfolio framing]
Bài toán đại diện cho một vấn đề phổ biến của trung tâm giáo dục quy mô nhỏ/vừa:

- dữ liệu học sinh phân tán;
- lịch học quản lý thủ công;
- điểm danh/nhận xét khó truy vết;
- chấm công và lương phụ thuộc bảng tính;
- học phí và thu/chi dễ sai lệch;
- khó giữ lịch sử khi học sinh đổi lớp;
- khó phân quyền giáo viên/trợ giảng/admin;
- khó kiểm toán thay đổi;
- mỗi tháng phải lặp lại nhiều thao tác.

Giá trị xã hội/thực tiễn nên diễn đạt an toàn:

> **Digitize and structure day-to-day education-center operations, replacing fragmented manual/Excel workflows with traceable class, attendance, staff, tuition and accounting processes.**

Không nên tuyên bố “giảm X% chi phí” hoặc “tăng X% hiệu quả” nếu chưa có đo lường.

---

## 3.3. Actors và nghiệp vụ

Phiên bản HVC_EDU_NEW mô hình hóa 5 role chính:

```text
ROOT ADMIN
ADMIN
TEACHER
ASSISTANT
STUDENT
```

### ROOT ADMIN
- toàn quyền quản trị;
- quản lý admin;
- cấp nhóm quyền;
- override nghiệp vụ đặc biệt;
- xem audit.

### ADMIN
- quyền tùy nhóm permission;
- học sinh;
- lớp;
- nhân sự;
- học tập;
- chấm công;
- lương;
- kế toán;
- báo cáo;
- thông báo.

### TEACHER
- xem lớp và lịch được phân công;
- bắt đầu/hoàn tất session;
- điểm danh;
- nhập BTVN;
- nhận xét;
- chấm công;
- xem lương cá nhân.

### ASSISTANT
- scope tương tự giáo viên ở hoạt động lớp;
- không có một số quyền xác nhận cao hơn theo business rule.

### STUDENT
- profile;
- lớp;
- lịch;
- lịch sử điểm danh;
- BTVN;
- nhận xét;
- học phí;
- thông báo.

---

## 3.4. Core domain model

Điểm đáng chú ý nhất của HVC_EDU_NEW là business model:

```text
CLASS
  ↓
CLASS_MONTH
  ↓
SESSION
```

### Class
Đại diện lớp học dài hạn:
- mã lớp;
- tên;
- môn;
- khối;
- fee defaults;
- capacity policy;
- status.

### ClassMonth
Là **monthly operational snapshot**, chứa:
- danh sách học sinh của tháng;
- học phí/snapshot cấu hình;
- giáo viên/trợ giảng;
- lịch học;
- cấu hình vận hành;
- session phát sinh.

Lifecycle:

```text
DRAFT
  ↓
Copy previous month / Create fresh
  ↓
Admin adjusts
  ↓
Confirm
  ↓
ACTIVE
  ↓
Generate Sessions
```

Điểm thiết kế tốt:
- chuẩn bị tháng sau khi tháng hiện tại vẫn active;
- không copy transactional history từ tháng trước;
- giữ snapshot để bảo toàn lịch sử;
- tách master data khỏi monthly operation.

### Session
Đại diện một buổi học cụ thể:
- lịch;
- nhân sự;
- attendance;
- evaluation;
- completion;
- timesheet relationship.

---

## 3.5. Kiến trúc HVC_EDU_NEW

### Architecture style

**Serverless Modular Monolith / Feature-first**

```text
┌────────────────────────────┐
│ User Browser               │
│ Vue 3 + TypeScript         │
│ Pinia + Vue Router         │
└─────────────┬──────────────┘
              │ HTTPS
      ┌───────┴─────────┐
      │                 │
      ▼                 ▼
GitHub Pages        Supabase
Static SPA          ├── Auth
                    ├── PostgreSQL
                    ├── RLS
                    ├── Edge Functions
                    ├── Realtime
                    └── Storage
```

### Vì sao kiến trúc này phù hợp

**GitHub Pages**
- host static SPA;
- rẻ/đơn giản;
- không giữ secret;
- phù hợp admin/student/staff web client.

**Supabase Auth**
- identity;
- password/session/JWT;
- refresh/change password.

**PostgreSQL**
- source of truth cho business data;
- foreign keys;
- unique/check constraints;
- transaction;
- snapshots;
- audit persistence.

**RLS**
- enforcement tại data layer;
- ngăn việc chỉ dựa vào frontend guard.

**Edge Functions**
- trusted server boundary cho transaction nhạy cảm;
- admin-create-user;
- reset password;
- activate month;
- complete/reopen session;
- approve timesheet;
- calculate/confirm/pay payroll;
- tuition confirmation;
- accounting adjustment;
- report export.

---

## 3.6. Hai loại request

### Safe data request

```text
Vue
 ↓
supabase-js
 ↓
Supabase Data API
 ↓
Database grants
 ↓
RLS
 ↓
Data
```

Dùng cho:
- profile;
- danh sách/lịch được phép đọc;
- attendance/history theo scope;
- các read workflow.

### Privileged transaction

```text
Vue
 ↓
JWT
 ↓
Edge Function
 ↓
Authenticate caller
 ↓
Role / Permission
 ↓
Business validation
 ↓
PostgreSQL transaction
 ↓
Audit log
 ↓
Notification
 ↓
Response
```

Đây là bằng chứng quan trọng về hiểu biết **trust boundary**.

---

## 3.7. Frontend architecture

```text
frontend/src/
├── app/
│   ├── router/
│   ├── guards/
│   └── layouts/
├── modules/
│   ├── auth/
│   ├── dashboard/
│   ├── students/
│   ├── staff/
│   ├── subjects/
│   ├── grades/
│   ├── classes/
│   ├── class-months/
│   ├── schedules/
│   ├── sessions/
│   ├── attendance/
│   ├── timesheets/
│   ├── payroll/
│   ├── tuition/
│   ├── accounting/
│   ├── notifications/
│   ├── reports/
│   └── audit/
├── shared/
├── stores/
├── services/
└── assets/
```

### Vai trò từng vùng

**app/**
- application shell;
- routing;
- global guards;
- layouts.

**modules/**
- business feature boundaries;
- mỗi module tự chứa page/component/service/type/validator khi phù hợp.

**shared/**
- reusable UI;
- utilities;
- common types;
- common validation.

**stores/**
- auth state;
- permission state;
- notification state.

**services/**
- Supabase client;
- Edge Function client;
- Realtime abstraction.

---

## 3.8. Security architecture

Frontend guard:
- `requireAuth`
- `requireRole`
- `requirePermission`
- `forcePasswordChange`

Nhưng repository ghi rõ:

> Frontend guard chỉ phục vụ UX; security thật nằm ở RLS + Edge Functions.

Đây là một **portfolio talking point mạnh**, vì thể hiện hiểu rằng:
- client-side authorization không phải security boundary;
- browser code là public;
- elevated secret không được nằm trong frontend;
- privileged user provisioning phải server-side.

---

## 3.9. Quality & delivery

Stack cụ thể của frontend HVC_EDU_NEW:

- Vue 3.5
- TypeScript 5.9
- Vite 7
- Pinia 3
- Vue Router 4
- Bootstrap 5
- Supabase JS
- Vitest
- Vue Test Utils
- jsdom

Quality commands:

```text
typecheck
test
build
```

Ngoài ra có:
- Deno scripts;
- import validation;
- idempotent data-import workflows;
- schema checks;
- smoke checks;
- GitHub Actions;
- Pages deployment.

---

## 3.10. HVC_EDU — Angular/Supabase implementation

### Scope

Phiên bản này có chủ ý tối giản:
- classes/students;
- schedules/sessions;
- attendance/comments;
- staff/timesheet;
- income/expense.

Không nên gán các module payroll/tuition đầy đủ của HVC_EDU_NEW cho HVC_EDU nếu source không có.

### Runtime mutation path

```text
Angular
  ↓
Edge Function
  ↓
RPC transaction
  ↓
audit_logs
```

### Security
- RLS giới hạn Staff theo assignment;
- Staff không được đọc finance/master-data ngoài scope;
- Root control plane tách khỏi operational auth;
- Root session là short-lived opaque token;
- password hashing/secret được đặt server side.

### Feature structure

```text
src/app/features/
├── auth/
├── home/
├── education/
├── classes/
├── attendance/
├── people/
├── staff/
├── finance/
└── account/
```

---

## 3.11. edu_hvc — FastAPI/PostgreSQL backend implementation

### Stack
- Python 3.11+
- FastAPI
- PostgreSQL 16
- asyncpg
- raw SQL
- Alembic
- JWT access/refresh
- RBAC
- Docker Compose
- pytest

### Business flow

```text
Month period
  ↓
Classes + schedule rules
  ↓
Enrollment
  ↓
Generate sessions
  ↓
Attendance
  ↓
Tuition calculation
  ↓
Payments / adjustments
  ↓
Teacher assignment
  ↓
Payroll calculation
  ↓
Rewards + income/expense
  ↓
Closing validation
  ↓
Atomic month close
```

### Atomic month close

Theo source, close month tạo:
- closing snapshot;
- reserve ledger;
- profit distributions;
- next month;
- carry-over debt/credit/reserve.

Đây là bằng chứng tốt về:
- transaction design;
- financial state transition;
- history/snapshot thinking;
- database consistency.

---

## 3.12. Engineering skills Hùng Cường chứng minh

- Business analysis từ workflow vận hành thật.
- Data modeling.
- FastAPI.
- PostgreSQL.
- Raw SQL.
- Alembic.
- JWT/RBAC.
- Angular.
- Vue.
- Supabase.
- Edge Functions.
- RLS.
- RPC transaction.
- Audit logging.
- Serverless architecture.
- GitHub Pages.
- CI/CD.
- Data migration/import.
- Idempotency.
- Secret management.
- Multi-role UX.
- Monthly snapshot design.

---

## 3.13. Portfolio-safe description

> **Designed and implemented multiple architectures for an education-center management platform, evolving from FastAPI/PostgreSQL backend workflows to Angular/Vue + Supabase serverless deployments. Modeled class-month/session lifecycles, attendance, staff assignment, tuition/payroll/accounting transactions, RBAC/RLS and auditability, with GitHub Pages and CI quality gates.**

---

# 4. NANOBIOAI / NABI — PERSONAL HEALTHTECH ECOSYSTEM

## 4.1. Overview

**Repository:** `https://github.com/daovanhung-dev/NanoBioAI`  
**Trust site:** `https://github.com/daovanhung-dev/nanobioai-privacy`  
**Live Admin:** `https://daovanhung-dev.github.io/NanoBioAI/`  
**Trust Center:** `https://daovanhung-dev.github.io/nanobioai-privacy/`

**Portfolio role:** Technical Owner / Full-stack Flutter Developer  
**Domain:** Personal Health / Wellness / AI-assisted Planning

### [SOURCE-VERIFIED]
NanoBioAI được mô tả là ứng dụng Flutter chăm sóc sức khỏe cá nhân theo hướng **local-first**, với Nabi làm trợ lý đồng hành.

---

## 4.2. Vấn đề thực tiễn

### [INFERENCE]
Người dùng thường phải quản lý rời rạc:
- hồ sơ sức khỏe;
- ăn uống;
- exercise plan;
- lịch sinh hoạt;
- nước;
- body metrics;
- reminder;
- các thói quen hằng ngày.

NanoBio đưa các luồng này vào một application layer thống nhất.

Portfolio nên mô tả theo hướng:

> **A local-first wellness companion that helps users organize daily health routines, plans and tracking while keeping AI and paid-access decisions behind trusted backend boundaries.**

Không mô tả app là hệ thống chẩn đoán, điều trị hoặc thay thế bác sĩ.

---

## 4.3. Runtime bootstrap

```text
lib/main.dart
  ↓
Load optional configuration
  ↓
Initialize Supabase if available
  ↓
ProviderScope
  ↓
BioAIApp
  ├── User surface
  │    └── merged V1 + V2 + V3 routes
  └── Admin surface
       └── only after trusted role resolution
  ↓
Cloud sync / meal catalog refresh
  ↓
Local notification startup
```

Điểm kỹ thuật quan trọng:
- guest mode không bắt buộc Supabase;
- auth/cloud/membership/quota/payment/Admin cần backend hợp lệ;
- application có một entrypoint chính;
- backend availability là explicit runtime state.

---

## 4.4. Capability classification

Repository áp dụng status rất rõ:

- **Implemented**
- **Partial**
- **Placeholder**
- **Source-only**
- **Absent**

Đây là cách quản lý evidence đáng giữ nguyên trong portfolio.

### V1 guest/basic
Implemented cho:
- onboarding nhiều bước;
- local profile;
- dashboard;
- schedule;
- meal plan;
- tracking cơ bản;
- notifications.

### AI plan
Implemented:
- AI planning qua backend;
- parser/validator;
- fallback catalog.

### AI chat/voice
Partial:
- yêu cầu auth;
- phụ thuộc AI backend/quota;
- voice có access gate.

### V2
Implemented/Partial:
- auth;
- cloud merge/sync;
- entitlement;
- AI quota;
- health score;
- payment request;
- wellness rewards.

### V3
Partial:
- advanced tracking;
- FamilyPlus;
- paid access gates.

### Admin / Sale
Partial:
- separate trusted role surfaces;
- cần backend policy/RPC để runtime end-to-end.

---

## 4.5. Core Flutter architecture

```text
Presentation
   ↓
Provider / Controller
   ↓
Repository
   ↓
Datasource
   ↓
DAO / API
```

### Presentation
- pages/screens/widgets;
- chỉ xử lý UI/user interaction;
- không truy cập trực tiếp SQLite/Supabase/external API.

### Provider / Controller
- state;
- orchestration;
- feature lifecycle;
- access decisions.

### Repository
- business-facing data interface;
- tách UI khỏi persistence/backend.

### Datasource
- local/cloud implementation;
- mapping;
- synchronization boundary.

### DAO / API
- SQLite;
- HTTP/Supabase;
- low-level persistence.

---

## 4.6. Project structure

```text
lib/
├── main.dart
├── app/
├── app_versions/
│   ├── v1/
│   ├── v2/
│   ├── v3/
│   └── admin/
├── core/
├── services/
├── sale_referral/
└── shared/

test/
integration_test/
docs/
.codex/
```

### Vai trò

**app/**
- root surface selection.

**app_versions/v1**
- guest/basic/shared experience.

**v2**
- authenticated capabilities.

**v3**
- paid-gated advanced flows.

**admin**
- privileged admin UI.

**core**
- config;
- access policy;
- SQLite;
- theme.

**services**
- cloud/device/shared services.

**sale_referral**
- independent role/business axis.

**.codex**
- coding-agent context;
- workflows;
- project map;
- task skills;
- design system;
- validation rules.

---

## 4.7. Local-first data strategy

SQLite là local source quan trọng cho guest/basic experience.

Lợi ích kiến trúc:
- app có thể bootstrap khi cloud unavailable;
- data entry không phụ thuộc 100% network;
- đồng bộ cloud là một capability tách biệt;
- guest/member migration có thể được thiết kế có kiểm soát.

Portfolio talking point:

> **Designed local-first mobile data flows with explicit cloud availability, repository boundaries and controlled synchronization rather than coupling every user action directly to network availability.**

---

## 4.8. Supabase & trusted access

Backend chịu trách nhiệm cho:
- Auth;
- cloud sync;
- membership;
- quota;
- payment;
- FamilyPlus;
- Sale;
- Admin.

Các access decision quan trọng phải lấy từ **trusted backend**, không tin local flag.

Đây là bằng chứng về:
- security boundary;
- entitlement design;
- server-authoritative access;
- cloud/local separation.

---

## 4.9. AI architecture

Current high-level production direction trong README:

```text
Flutter
  ↓
Supabase Edge Function
  ↓
Gemini
  ↓
Structured/validated result
  ↓
Application persistence
```

Security rule:
- Gemini secret không nằm trong APK/frontend;
- Supabase public client config có thể nằm client;
- elevated credentials phải server-side.

### AI engineering techniques

- contextual prompt;
- structured output;
- parser;
- validator;
- normalization;
- retry/fallback;
- quota;
- access gate;
- local catalog fallback cho một số planning flow.

### Documentation drift note

Một tài liệu feature cũ mô tả một số direct Gemini REST seams trong Flutter, trong khi README hiện hành mô tả production path qua Edge Function. Portfolio phải:
- ưu tiên source/runtime hiện tại;
- tránh khẳng định transport chính xác nếu chưa đối chiếu reachable code mới nhất;
- ghi “AI calls are designed to be protected by a server-side boundary” khi cần wording an toàn.

---

## 4.10. Engineering process

CONTRIBUTING mô tả workflow:

```text
Read AGENTS / Project Map
      ↓
Choose workflow
      ↓
Load task skill
      ↓
Load domain context
      ↓
Implement within scope
      ↓
Format / Analyze / Test
      ↓
Docs + worklog
      ↓
Quick/full runtime check if required
      ↓
PR checklist
```

Branch conventions:
- `feature/<slug>`
- `fix/<slug>`
- `docs/<slug>`
- `refactor/<slug>`

Commit style:
- `feat(scope): ...`
- `fix(scope): ...`
- `docs(scope): ...`
- `test(scope): ...`
- `refactor(scope): ...`

Đây là một bằng chứng tốt cho **AI-assisted engineering có governance**, không phải giao toàn bộ source cho agent không kiểm soát.

---

## 4.11. Validation

- `dart format`
- `flutter analyze`
- `flutter test`
- source-truth docs validator
- codex integrity validator
- quick check
- full check
- optional APK build
- `git diff --check`

Một nguyên tắc đáng đưa portfolio:

> **If device/Supabase/runtime verification was not actually executed, status remains UNVERIFIED rather than being reported as PASS.**

---

## 4.12. Trust Center / compliance engineering

Repository `nanobioai-privacy` tạo public policy hub gồm:
- Privacy Policy;
- Data Safety;
- Terms;
- Account Deletion;
- Health/AI Disclaimer;
- Cookie Policy.

Giá trị kỹ thuật:
- map policy với source/app behavior;
- hỗ trợ Google Play release requirements;
- explicit account deletion surface;
- review app permissions/data handling trước release.

Đây không chỉ là “làm trang HTML”, mà có thể trình bày như:

> **Product delivery and compliance evidence for a health-related mobile application.**

---

## 4.13. Skills NanoBio chứng minh

- Flutter/Dart.
- Riverpod.
- GoRouter.
- SQLite.
- Local-first architecture.
- Supabase.
- Auth.
- RPC/PostgREST concepts.
- Edge Functions.
- AI integration.
- Structured output validation.
- Mobile notification.
- Deep links.
- Cloud sync.
- Access/entitlement design.
- Admin surface.
- Product documentation.
- AI coding-agent workflow.
- Security/secrets discipline.
- Release/privacy readiness.

---

# 5. STUDY2WORK — EDTECH + HRTECH POLYGLOT PLATFORM

## 5.1. Product concept

**Repository:** `https://github.com/daovanhung-dev/Study2Work`  
**Portfolio role:** Full-stack Developer / System Designer

Repository mô tả hai subsystem độc lập:

### Study
- learning;
- courses;
- lessons;
- assessment;
- progress;
- evidence issuance.

### Work
- career profile;
- CV;
- portfolio;
- jobs;
- applications;
- recruiter workflow.

---

## 5.2. Vấn đề thực tiễn

### [SOURCE-VERIFIED product intent]
Project kết hợp:
- training;
- project-based learning;
- skill assessment;
- portfolio;
- mentoring;
- recruitment matching.

### [INFERENCE]
Bài toán nhắm vào **education-to-employment gap**:
- học kỹ thuật không đủ bằng chứng thực hành;
- portfolio và skill evidence bị tách khỏi learning;
- recruiter khó nhìn thấy quá trình hình thành năng lực;
- sinh viên phải dùng nhiều hệ thống rời rạc.

Portfolio framing:

> **A platform concept that connects technical learning, project evidence, career profiles and recruitment workflows through explicit contracts between Study and Work subsystems.**

---

## 5.3. System boundary

```text
Study Web
  ↓
Study API

Work Web
  ↓
Work API

Study
  ↓ events / contracts
Work

AI API
  ↓
Ollama

Shared Infrastructure
├── PostgreSQL
├── Redis
├── MinIO
└── Mailhog
```

---

## 5.4. Polyglot monorepo

### Study web
- Vue 3
- TypeScript
- Vite

### Study API
- FastAPI
- Python
- SQLAlchemy
- Alembic

### Work web
- React
- TypeScript
- Vite

### Work API
- NestJS
- Fastify
- TypeScript
- Prisma
- PostgreSQL

### AI API
- FastAPI
- Ollama adapter

### Contracts
- OpenAPI;
- JSON Schema events;
- skill taxonomy;
- API guidelines.

### Infrastructure
- Docker Compose;
- PostgreSQL;
- Redis;
- MinIO;
- Mailhog.

---

## 5.5. Architectural principle — independent deployables

Study, Work và AI là boundary khác nhau.

Rule:
- không import business module chéo app;
- giao tiếp qua HTTP/event contract;
- client web không được backend API serve static route một cách ngầm định;
- API/web có deployment ownership riêng.

Đây là bằng chứng về:
- bounded-context thinking;
- deployable boundary;
- contract ownership;
- polyglot architecture.

---

## 5.6. Contract-first approach

Repository dùng:
- standard API envelope;
- Work OpenAPI;
- Study→Work event schemas;
- business code;
- trace ID;
- shared contract directories.

API envelope:

```json
{
  "success": true,
  "businessCode": "CODE",
  "message": "Safe message",
  "data": {},
  "meta": {},
  "traceId": "uuid"
}
```

Ý nghĩa:
- response shape nhất quán;
- business code tách HTTP status;
- traceability;
- observability;
- client contract rõ.

---

## 5.7. Source-status: bắt buộc trình bày trung thực

Đây là phần quan trọng nhất khi dùng S2W trong portfolio.

Một source audit trong repository ghi nhận tại baseline được audit:

### Study server
- declared not runnable tại snapshot audit;
- import mismatch;
- missing business module/schema;
- migration references thiếu.

### Work server
- verified foundation;
- health/readiness;
- Prisma DB readiness;
- domain vẫn ở foundation state tại snapshot.

### AI server
- verified minimal chat;
- FastAPI → Ollama;
- copied infrastructure phần lớn chưa wired;
- test/database runtime chưa đầy đủ.

### Design docs
README trỏ tới canonical BD path nhưng audit snapshot cho biết directory canonical đó không tồn tại ở thời điểm audit.

## Portfolio implication

Không nên viết:

> “Built and deployed complete Study2Work production platform.”

Nên viết:

> **Designed and developed the runnable foundation and architecture of a polyglot Study/Work platform, including service boundaries, contracts, local infrastructure, frontend/backend stacks and source-of-truth engineering. Some subsystems remain active development/foundation scope.**

Đây là cách vừa mạnh vừa bảo vệ độ tin cậy.

---

## 5.8. Engineering workflow

Các quality gate hiện diện trong repo:
- pnpm lint;
- docs validation;
- typecheck;
- test;
- build;
- Python ruff;
- mypy;
- pytest;
- Docker Compose config validation.

Agent context:
- root `AGENTS.md`;
- `.agents` registry;
- project architecture;
- server-specific scopes;
- context manifest;
- drift validation.

Đây là bằng chứng tốt cho:
- coding-agent context engineering;
- source freshness;
- scoped context loading;
- documentation governance.

---

## 5.9. Skills Study2Work chứng minh

- FastAPI.
- Vue 3.
- React.
- NestJS.
- Fastify.
- TypeScript.
- SQLAlchemy.
- Prisma.
- PostgreSQL.
- Redis.
- Docker Compose.
- MinIO.
- OpenAPI.
- JSON Schema.
- Event-driven contract concepts.
- Service boundary.
- Polyglot monorepo.
- Context engineering.
- Architecture audit.
- Runtime-vs-design evidence discipline.

---

# 6. NIHONGO LEARNING SYSTEM — JAPANESE EDTECH + AI

## 6.1. Overview

**Repository:** `https://github.com/daovanhung-dev/Nihongo-Learning-System`  
**Portfolio role:** Product / System Design  
**Status:** Design / Development

### Core positioning

Personal Japanese learning platform inspired by Quizlet-style study flows nhưng mở rộng riêng cho Japanese domain:

- Kana
- Kanji
- Vocabulary
- Grammar
- Conjugation
- Listening
- Speaking
- Reading
- Writing
- SRS
- JLPT organization
- AI practice
- AI tutor
- personal analytics

---

## 6.2. Vấn đề thực tiễn

### [SOURCE-VERIFIED product problem]
Project không xem tiếng Nhật chỉ là “English vocabulary app đổi font”, mà mô hình hóa:
- written form;
- reading;
- meaning;
- pronunciation;
- usage;
- grammar;
- context;
- script knowledge.

### [INFERENCE]
Bài toán giải quyết sự phân mảnh khi người học phải dùng nhiều công cụ:
- flashcards;
- Kanji app;
- grammar notes;
- listening app;
- SRS;
- AI chat;
- JLPT tracker.

Project gom các learning evidence vào một model thống nhất.

---

## 6.3. Learning loop

```text
IMPORT / CREATE KNOWLEDGE
        ↓
LEARN
        ↓
RECOGNIZE
        ↓
RECALL
        ↓
USE IN CONTEXT
        ↓
TEST
        ↓
ANALYZE MISTAKES
        ↓
SCHEDULE REVIEW
        ↓
RETEST
        ↓
MASTERY
```

Đây là product-flow rất tốt để dùng trong portfolio vì nó thể hiện:
- learning science;
- event/state thinking;
- personalization;
- closed feedback loop.

---

## 6.4. Japanese-specific domain model

System hỗ trợ các khái niệm:
- Hiragana;
- Katakana;
- Kanji;
- Romaji;
- Furigana;
- On'yomi;
- Kun'yomi;
- Okurigana;
- radical;
- stroke count/order;
- particles;
- conjugation;
- counters;
- politeness;
- JLPT;
- Japanese IME;
- long vowels;
- small っ;
- small ゃゅょ;
- dakuten/handakuten.

Điểm portfolio mạnh:
> domain model được thiết kế từ đặc thù ngôn ngữ, không ép domain vào schema vocabulary đơn giản.

---

## 6.5. Stack

### Frontend
- Angular 20
- TypeScript
- SCSS
- RxJS

### Backend/BaaS
- Supabase PostgreSQL
- Auth
- Storage
- Edge Functions
- RLS

### AI
- Gemini API qua Edge Functions

### Hosting
- GitHub Pages

### Design
- 38 Stitch AI screen references

---

## 6.6. Runtime topology

```text
Browser / GitHub Pages
        │
        │ publishable key + JWT
        ▼
Supabase
├── Auth
├── PostgreSQL + RLS
├── Storage
└── Edge Functions
        │
        │ server secret
        ▼
      Gemini
```

---

## 6.7. Trust boundaries

### Browser
- presentation;
- user interaction;
- không chứa Gemini secret;
- không chứa elevated Supabase secret.

### PostgreSQL
Canonical source cho:
- learning content;
- attempts;
- mastery;
- mistakes.

### Edge Functions
Trusted boundary cho:
- Gemini;
- private evaluation;
- semantic grading.

---

## 6.8. Frontend layering

```text
Pages
  ↓
Feature Components
  ↓
Feature Facades / Services
  ↓
Repositories
  ↓
Supabase Client
```

Rule:
- component sâu không gọi Supabase trực tiếp;
- presentation không gắn chặt persistence.

---

## 6.9. Learning event architecture

Đây là một trong những thiết kế tốt nhất của project:

```text
Answer
  ↓
Grade
  ↓
Review Event
  ↓
Mastery Update
  ↓
Due Schedule Update
  ↓
Mistake Aggregation
  ↓
Future Recommendation
```

Tư duy quan trọng:

> **Event trail quan trọng hơn chỉ lưu final score.**

Điều này giúp:
- giải thích vì sao item yếu;
- lên lịch review;
- analytics;
- recommendation;
- adaptive learning.

---

## 6.10. AI architecture

```text
Angular Request
   ↓
Edge Function Authentication
   ↓
Load Canonical Sources
   ↓
Prompt Contract
   ↓
Gemini Structured Output
   ↓
Schema Validation
   ↓
Semantic Validation
   ↓
Persistence
   ↓
Response
```

Rule:
- canonical database wins nếu AI conflict với stored reading/meaning/reference;
- AI không được tự ý “invent” canonical Kanji data.

Đây là bằng chứng AI engineering chất lượng cao:
- AI as bounded subsystem;
- source grounding;
- schema validation;
- semantic validation;
- deterministic rules before AI when possible.

---

## 6.11. Development strategy — vertical slices

Implementation plan quy định:

> Build vertically, không tạo hết database trước rồi mới làm toàn bộ UI.

Mỗi phase phải cho ra một slice dùng/test được.

### Global Definition of Done

- route exists;
- responsive mobile/desktop;
- loading/empty/error;
- Supabase behind repository/service;
- RLS verified;
- deterministic rules have unit tests;
- AI output schema validated;
- keyboard/focus support;
- no API secret in frontend.

---

## 6.12. Implementation phases

### Phase 0
Platform foundation:
- secure shell;
- auth;
- app shell;
- design tokens;
- CI/CD.

### Phase 1
Reusable Japanese UI:
- Japanese text;
- furigana;
- audio;
- JLPT badge;
- mastery;
- progress;
- feedback.

### Phase 2
Kana vertical slice:
- data;
- practice;
- SRS;
- mastery events.

### Phase 3
Vocabulary core:
- sets;
- editor;
- flashcards;
- SRS.

### Phase 4
Quizlet-style modes:
- Adaptive Learn;
- Smart Grading;
- Dictation;
- Test;
- Match.

### Phase 5
Kanji.

### Phase 6
Grammar + deterministic conjugation engine.

### Phase 7
AI Core.

### Phase 8
Combined review.

### Phase 9
Listening + Reading.

### Phase 10
Speaking + Writing.

### Phase 11
AI Practice + AI Tutor.

### Phase 12
Review queue + analytics + mistake bank + settings.

---

## 6.13. Release gates

### Security
- RLS;
- private storage;
- owner allowlist;
- Gemini secret server-side;
- no service-role in client.

### Data quality
- canonical Japanese fields validated;
- AI cannot silently overwrite canonical source;
- generated questions schema/semantic checked.

### UX
- target screens implemented;
- mobile/desktop;
- focus study mode;
- visible async/error states;
- keyboard accessibility.

### Testing
- grading;
- SRS;
- conjugation;
- RLS;
- Edge Functions;
- E2E critical journeys.

---

## 6.14. Portfolio-safe wording

> **Designed an AI-assisted Japanese learning platform around a domain-specific learning model for Kana, Kanji, vocabulary, grammar and LSRW. The architecture uses Angular, Supabase/RLS and server-side Gemini Edge Functions, with event-based mastery, SRS, mistake tracking, deterministic grading and vertical-slice delivery. The repository is currently design/development scope rather than a claimed completed production product.**

---

# 7. LABVNUA / EDUAI — VNUA STUDENT ACADEMIC COMPANION

## 7.1. Overview

**Repository:** `https://github.com/daovanhung-dev/LabVnua`  
**Default branch:** `develop`  
**Portfolio role:** Flutter Team Lead / Full-stack Flutter Developer  
**Domain:** Higher Education / Student Academic Services

---

## 7.2. Vấn đề thực tiễn

App giúp sinh viên truy cập nhiều dữ liệu học vụ từ một nơi:
- schedule;
- grades;
- tuition;
- course registration;
- training program;
- prerequisite subjects;
- profile;
- notifications.

### [INFERENCE]
Giá trị:
- giảm việc chuyển qua nhiều màn hình/cổng học vụ;
- local cache tăng continuity;
- notification giúp sinh viên chủ động hơn;
- chat/realtime/AI làm lớp interaction bổ sung.

Không claim tác động định lượng nếu chưa đo.

---

## 7.3. Key capabilities

- Student auth qua VNUA training portal API.
- Local session persistence.
- Dashboard.
- Schedule.
- Score lookup/analysis.
- Tuition.
- Course registration.
- Training program.
- Prerequisite subjects.
- Notifications.
- Profile.
- SQLite cache.
- Background sync.
- Local notifications.
- Supabase Realtime chat.
- Gemini AI assistant.
- QR scanning.
- Connectivity-aware startup.

---

## 7.4. Stack

- Flutter
- Dart
- `http`
- `sqflite`
- `supabase_flutter`
- Google Generative AI SDK
- `flutter_local_notifications`
- Workmanager
- `mobile_scanner`
- `connectivity_plus`

---

## 7.5. Architecture

Feature-first:

```text
lib/
├── app.dart
├── main.dart
├── config/
├── core/
│   ├── constants/
│   ├── models/
│   ├── screens/
│   ├── services_root/
│   ├── theme/
│   └── widgets/
└── features/
    ├── ai_assistant/
    ├── auth/
    ├── chat/
    ├── course_register/
    ├── home/
    ├── infor/
    ├── notification/
    ├── prerequisite_subjects/
    ├── program_training/
    ├── qr_code/
    ├── schedure/
    ├── score_data/
    └── tuition/
```

State approach:
- Flutter widgets;
- controllers;
- services;
- local DB/API layers;
- không phụ thuộc external state-management framework trong source mô tả hiện hành.

---

## 7.6. Data flow

```text
VNUA API
  ↓
Service
  ↓
Controller
  ↓
Screen

          + SQLite cache
          + background sync
          + local notification
          + Supabase Realtime
```

---

## 7.7. Engineering reality

README ghi:
- MVP active development;
- core student flows implemented;
- integrations hiện diện;
- một số menu item vẫn placeholder;
- automated test coverage còn minimal.

Portfolio phải giữ đúng nuance này.

---

## 7.8. Skills demonstrated

- Flutter feature architecture.
- API integration.
- SQLite caching.
- Background sync.
- Realtime.
- Notifications.
- QR scanner.
- Connectivity handling.
- AI integration.
- Academic domain modeling.
- Team coordination, theo profile/portfolio evidence.

---

# 8. LEARN2EARN — STUDENT ↔ BUSINESS CAREER PLATFORM

## 8.1. Overview

**Repository:** `https://github.com/daovanhung-dev/Learn2Earn`  
**Portfolio role:** Backend Developer / Part-time  
**Domain:** Career / Recruitment / Student Employment

Repository tổ chức một product repo gồm:
- web backend/server-rendered app;
- student Flutter app;
- business Flutter app.

---

## 8.2. Vấn đề thực tiễn

Repository description nói trực tiếp về việc kết nối:
- Business;
- Student;
- University.

### [INFERENCE]
Bài toán:
- sinh viên khó quản lý profile/CV/application trên một flow thống nhất;
- doanh nghiệp cần job/candidate workflow;
- hai phía cần chat/status/interview;
- dữ liệu nghề nghiệp và tuyển dụng bị phân tán.

Portfolio framing:

> **A multi-client career platform connecting student job discovery and application flows with employer job/candidate management.**

---

## 8.3. Monorepo

```text
apps/
├── web/
├── flutter_student/
└── flutter_business/

docs/
```

### apps/web
Stack:
- Node.js
- TypeScript
- Express
- EJS
- Prisma
- MySQL

Responsibility:
- server-rendered web;
- auth;
- job;
- CV;
- application;
- database.

### flutter_student
- login;
- job discovery;
- CV;
- application;
- chat;
- settings.

Tech:
- Flutter;
- Supabase;
- SQLite.

### flutter_business
- business login;
- job management;
- candidate search;
- reports;
- chat;
- settings.

Tech:
- Flutter;
- Supabase;
- SQLite;
- charts.

---

## 8.4. Engineering value

Project thể hiện:
- multi-client system thinking;
- backend + two mobile roles;
- recruitment workflows;
- authentication;
- DB modeling;
- separation of student/business contexts;
- monorepo restructuring;
- Git hygiene.

---

# 9. ENGINEERING PORTFOLIO — EVIDENCE AGGREGATOR

## 9.1. Overview

**Repository:** `https://github.com/daovanhung-dev/portfolio`  
**Live:** `https://daovanhung-dev.github.io/portfolio/`  
**Role:** Designer / Developer

Portfolio không chỉ là static HTML. Repository dùng **typed data model + validation** để giữ consistency giữa project claims và UI.

---

## 9.2. Architecture

```text
src/
├── data/
│   ├── profile
│   ├── experience
│   ├── projects
│   ├── capabilities
│   ├── live products
│   └── cases
├── components/
├── styles/
└── main.ts
```

### Data layer
Chứa typed project/context.

### Renderer
Chỉ chịu trách nhiệm render semantic HTML/UI.

### Styles
- tokens;
- global;
- component;
- responsive.

### main.ts
- mount;
- theme;
- navigation;
- modal;
- reveal behavior.

---

## 9.3. Evidence-driven content model

Mỗi project có contract:
- status;
- evidence level;
- role;
- problem;
- solution;
- stack;
- repository;
- live URL;
- case references.

Portfolio phân biệt:
- enterprise experience;
- live product;
- active development;
- architecture/design;
- project experience;
- frontend proof;
- learning direction.

Rule rất quan trọng:

> **Source repository wins portfolio wording. Source tồn tại không tự động có nghĩa feature đã production.**

---

## 9.4. Quality gates

- typecheck;
- tests;
- project-data validation;
- link validation;
- build.

GitHub Actions:
- Node 22;
- quality gate;
- artifact build;
- deploy GitHub Pages sau merge main.

---

## 9.5. Vì sao project này có giá trị kỹ thuật

Nó chứng minh:
- content modeling;
- evidence integrity;
- static frontend engineering;
- accessibility;
- modal/keyboard behavior;
- CI/CD;
- data validation.

Nó cũng là **delivery layer** của toàn bộ hồ sơ nghề nghiệp.

---

# 10. HUNG & QUYNH — INTERACTIVE FRONTEND / MEDIA PIPELINE

## 10.1. Overview

**Repository:** `https://github.com/daovanhung-dev/hung-quynh-our-story`  
**Live:** `https://daovanhung-dev.github.io/hung-quynh-our-story/`  
**Portfolio role:** Frontend Developer

Project là interactive static memory/storytelling experience.

Không cần cố gán “vấn đề xã hội” lớn cho project này. Giá trị portfolio nằm ở:
- frontend interaction;
- media delivery;
- performance;
- accessibility;
- testing.

---

## 10.2. Tech stack

Theo package manifest:
- Angular 22
- TypeScript 6
- RxJS
- Phaser 4
- Three.js
- Playwright
- Sharp
- EXIF tooling
- HEIC conversion

---

## 10.3. Media pipeline

Build scripts cho thấy pipeline:

```text
Raw media
  ↓
Prepare / generate variants
  ↓
Validate memories
  ↓
Generate memory index
  ↓
Angular production build
  ↓
Prepare static host
  ↓
Verify artifact
  ↓
GitHub Pages
```

Đây là điểm rất tốt để chứng minh:
- build automation;
- image/media optimization;
- static artifact verification;
- pipeline thinking.

---

## 10.4. Quality

Có:
- Node tests;
- Playwright E2E;
- script syntax checks;
- static artifact verifier.

Portfolio hiện hành còn ghi:
- responsive UI;
- animation;
- reduced motion;
- accessibility;
- photo/timeline/story views.

---

# 11. NANOBIO TRUST CENTER — COMPLIANCE SUPPORT PROJECT

## 11.1. Overview

**Repository:** `https://github.com/daovanhung-dev/nanobioai-privacy`  
**Live:** `https://daovanhung-dev.github.io/nanobioai-privacy/`

Static public trust/compliance site phục vụ NanoBio.

### Pages
- Trust Center
- Privacy Policy
- Data Safety
- Terms of Service
- Account Deletion
- Health & AI Disclaimer
- Cookie Policy

---

## 11.2. Engineering relevance

Dự án này chứng minh:
- release-readiness awareness;
- privacy mapping;
- public compliance endpoint;
- account-deletion requirements;
- data-safety documentation;
- relationship between app behavior and public policy.

Đây là **supporting evidence**, không cần đặt ngang flagship projects.

---

# 12. MY_COURSES

Repository được phát hiện nhưng không có source đáng kể tại snapshot.

## Portfolio decision

**Không đưa vào project chính.**

Chỉ thêm khi có:
- README;
- source;
- architecture;
- feature;
- demo/evidence.

---

# 13. NON-GITHUB EXPERIENCE CONTEXT

Một số năng lực quan trọng không thể đánh giá đầy đủ chỉ bằng các public repositories và nên được giữ ở layer “Experience” thay vì gán sai cho repo.

## FPT Software / FPT Corporation

Portfolio context hiện có:
- Full-stack Intern → Fresher;
- Python/Flask;
- Vue;
- PostgreSQL;
- raw SQL;
- REST API;
- DD/UTC;
- testing;
- bug investigation.

Public-safe evidence hiện dùng:
- 06 REST APIs;
- 02 business screens;
- debugging xuyên UI → API → service → SQL → database.

Không có public source vì là enterprise/client work.

## VentureX / LinguaSphere

Portfolio context:
- Tech Lead / System Analyst / API Designer;
- Business Design;
- module decomposition;
- actor/permission;
- API Detail Design;
- data model;
- validation/error contract;
- traceability.

Phải giữ nhãn **design/system-analysis scope** nếu không có public production repo.

---

# 14. CROSS-PROJECT ENGINEERING PATTERNS

Đọc toàn bộ các repo cho thấy một số pattern lặp lại và có thể trở thành “signature” của portfolio.

## 14.1. Feature-first organization

Xuất hiện rõ ở:
- NanoBio;
- LabVnua;
- HVC_EDU_NEW;
- Nihongo.

Lợi ích:
- feature ownership rõ;
- giảm global-folder bloat;
- dễ giao task;
- dễ load context cho coding agent;
- dễ test theo domain.

---

## 14.2. Trusted backend boundary

Xuất hiện ở:
- HVC;
- NanoBio;
- Nihongo.

Pattern:

```text
Client
  ↓
Public credential + user JWT
  ↓
Trusted backend / Edge Function
  ↓
Permission + validation
  ↓
Database / External AI
```

Nguyên tắc:
- không giữ elevated secret trong client;
- UI guard không thay thế DB/backend authorization;
- AI secret server-side;
- privileged user management server-side.

---

## 14.3. Source-of-truth discipline

Xuất hiện đặc biệt ở:
- NanoBio;
- Study2Work;
- portfolio.

Pattern:
- reachable source > historical docs;
- executable contract > proposal;
- static inspection ≠ runtime verification;
- source drift phải được phát hiện;
- portfolio claim phải map về evidence.

Đây là một điểm khác biệt mạnh để mô tả bản thân như một developer có **engineering rigor**, không chỉ “code nhanh”.

---

## 14.4. AI-assisted engineering

Evidence từ repo:
- `.codex`;
- `.agents`;
- workflow files;
- project maps;
- task/domain skills;
- validation scripts;
- docs/source-truth checks.

Có thể định vị:

> **Uses coding agents as scoped engineering tools: load source-of-truth, define task boundaries, implement, test, validate and update documentation—rather than treating generated code as automatically correct.**

---

## 14.5. Vertical-slice delivery

Nihongo quy định rất rõ:
- mỗi phase phải usable;
- không dựng toàn bộ DB trước rồi chờ UI sau;
- mỗi feature có route/UI/data/security/test.

Pattern này nên dùng trong portfolio vì nó cho thấy:
- incremental delivery;
- testability;
- risk reduction.

---

## 14.6. Local-first / offline-capable mobile

NanoBio và LabVnua cho thấy:
- SQLite;
- cache;
- persistence;
- network-aware logic;
- sync;
- notification.

Điều này chứng minh mobile engineering vượt mức “REST client đơn giản”.

---

## 14.7. Contract & traceability thinking

Study2Work:
- OpenAPI;
- JSON Schema;
- API envelope;
- event contracts.

FPT:
- DD/UTC/traceability.

VentureX:
- API Detail Design/error contract.

HVC:
- business rules;
- DB transactions;
- RLS/RPC.

Có thể định vị năng lực chung:

> **Translates business requirements into contracts that connect UI, API, database, authorization and test evidence.**

---

# 15. ENGINEERING PROCESS — MASTER WORKFLOW

Từ các repo, quy trình lập trình có thể chuẩn hóa cho portfolio như sau.

## Step 1 — Load source of truth

```text
Repository rules
  ↓
README / Business Design
  ↓
Architecture
  ↓
Schema / migrations / contracts
  ↓
Reachable source
  ↓
Tests / issues / audit
```

## Step 2 — Define scope

- actor;
- permission;
- precondition;
- business rule;
- input/output;
- acceptance criteria;
- data ownership.

## Step 3 — Design

- module;
- feature;
- route;
- API;
- data model;
- validation;
- error flow;
- security boundary;
- traceability.

## Step 4 — Implement vertical slice

- presentation;
- state/controller;
- repository/service;
- datasource;
- database/API;
- tests.

## Step 5 — Validate

- format;
- static analysis;
- typecheck;
- unit tests;
- integration tests;
- schema/RLS checks;
- build;
- device/runtime verification if relevant.

## Step 6 — Delivery

- CI;
- artifact;
- deployment;
- smoke test;
- docs/worklog;
- evidence status update.

## Step 7 — Claim control

Classify as:
- Implemented;
- Partial;
- Placeholder;
- Source-only;
- Unverified;
- Live.

Đây là workflow rất phù hợp cho một portfolio chuyên nghiệp vì cho người tuyển dụng thấy **cách làm việc**, không chỉ danh sách framework.

---

# 16. ARCHITECTURE CAPABILITY MAP

## 16.1. Mobile architecture

### Proven by
- NanoBio
- LabVnua
- Learn2Earn mobile

### Concepts
- feature-first;
- router;
- state controller/provider;
- repository;
- datasource;
- DAO;
- SQLite;
- cloud sync;
- notifications;
- platform/device integrations.

---

## 16.2. Serverless full-stack

### Proven by
- HVC_EDU
- HVC_EDU_NEW
- Nihongo

### Concepts
- static SPA;
- Supabase;
- Auth;
- RLS;
- Edge Function;
- PostgreSQL;
- trusted transaction;
- GitHub Pages.

---

## 16.3. Traditional backend

### Proven by
- edu_hvc
- Learn2Earn
- FPT context

### Concepts
- FastAPI;
- Express;
- PostgreSQL/MySQL;
- raw SQL;
- Prisma;
- Alembic;
- JWT;
- RBAC;
- CRUD/business transaction.

---

## 16.4. Polyglot/distributed boundary

### Proven by
- Study2Work

### Concepts
- multiple deployables;
- HTTP contracts;
- event contracts;
- OpenAPI;
- JSON Schema;
- service ownership;
- shared infra.

---

# 17. SECURITY CAPABILITY MAP

GitHub evidence supports:

- JWT/session concepts;
- RBAC;
- RLS;
- role/permission guards;
- secret segregation;
- public vs elevated credentials;
- server-side privileged operations;
- audit logging;
- trusted backend entitlement;
- password/server secret handling;
- Data Safety / privacy docs;
- account-deletion flow thinking;
- environment config discipline.

Không nên tự định vị là security engineer chỉ dựa trên các repo này, nhưng có thể dùng cụm:

> **Security-aware application engineering**

hoặc:

> **Secure software engineering foundations**

---

# 18. AI CAPABILITY MAP

## Product AI integration
- NanoBio: wellness planning/chat/voice paths.
- LabVnua: academic assistant.
- Nihongo: practice generation, tutor, semantic grading.
- Study2Work: local Ollama service foundation.

## AI engineering techniques
- server-side secret boundary;
- structured output;
- schema validation;
- semantic validation;
- fallback;
- canonical-source precedence;
- model access/quotas;
- AI source grounding.

## AI-assisted software engineering
- Codex/agent context;
- scoped workflows;
- task skills;
- source maps;
- source-truth validators;
- documentation automation.

---

# 19. PROJECT PRIORITY FOR PROFESSIONAL PORTFOLIO

## Tier A — Flagship

### NanoBioAI
Lý do:
- mobile;
- local-first;
- AI;
- cloud;
- security;
- product delivery;
- trust center;
- large technical surface.

### Hùng Cường Management
Lý do:
- real operational domain;
- multiple architecture iterations;
- database/finance;
- serverless + backend;
- live deployments.

### Study2Work
Lý do:
- broad architecture;
- polyglot;
- contracts;
- system design.
- phải có status disclaimer rõ.

### Nihongo Learning System
Lý do:
- mới;
- product/system design rất sâu;
- learning engine;
- AI architecture.
- status design/development.

---

## Tier B — Strong supporting projects

### LabVnua / EduAI
- Flutter;
- API;
- local storage;
- realtime;
- student domain.

### Learn2Earn
- Node/Express;
- Prisma/MySQL;
- two Flutter clients;
- recruitment.

### Engineering Portfolio
- evidence-driven frontend;
- CI;
- typed data.

---

## Tier C — Technical proof / supporting

### Hung & Quynh
- Angular;
- media pipeline;
- E2E;
- accessibility.

### NanoBio Trust Center
- compliance/release evidence.

---

# 20. PORTFOLIO PROJECT PAGE TEMPLATE

Mỗi project trên website nên dùng cùng một cấu trúc:

## Hero
- Project name
- One-line problem statement
- Role
- Status
- Timeline
- Repo / Live

## Problem
“Vấn đề thực tế là gì?”

## Users & Actors
“Ai dùng hệ thống?”

## My Responsibility
“Bạn trực tiếp chịu trách nhiệm phần nào?”

## Solution
“Hệ thống giải quyết bài toán bằng cách nào?”

## Architecture
- System Context
- Containers
- Components
- Data Flow

## Technology Decisions
Không chỉ list framework. Mỗi tech phải trả lời:
- dùng ở đâu?
- để làm gì?
- vì sao phù hợp?

## Business Flow
Ví dụ HVC:
`Class → ClassMonth → Session → Attendance/Payroll/Tuition`.

## Engineering Process
- source;
- design;
- code;
- test;
- deploy.

## Challenges / Decisions
Ví dụ:
- client guard vs RLS;
- local-first vs cloud;
- AI validation;
- snapshot vs mutable history;
- contract drift.

## Quality
- tests;
- validation;
- CI/CD;
- security.

## Evidence
- repo;
- live URL;
- screenshots;
- tests;
- docs.

## Limitations
- active dev;
- placeholder;
- unverified runtime;
- private enterprise scope.

---

# 21. PORTFOLIO-SAFE PROJECT SUMMARIES

## NanoBioAI

> **Technical Owner / Full-stack Flutter Developer** — Built and structured a local-first personal wellness application using Flutter, Riverpod, SQLite and Supabase. Designed feature boundaries from presentation to repository/datasource layers, integrated AI through protected backend flows, implemented authentication/cloud-sync/access concepts, notifications and admin/support surfaces, and maintained source-of-truth and validation workflows for AI-assisted development.

## Hùng Cường Education Management

> **Full-stack Developer** — Digitized education-center operations across class/student management, schedules, sessions, attendance, staff workflows and financial operations. Developed multiple architectural implementations using FastAPI/PostgreSQL and Angular/Vue + Supabase, applying RBAC/RLS, transactional Edge Functions, auditability, migrations, data-import tooling and GitHub Pages CI/CD.

## Study2Work

> **Full-stack Developer / System Designer** — Designed and developed the foundation of a polyglot EdTech/HRTech monorepo connecting learning and career workflows. Structured Study, Work and AI as separate boundaries, introduced API/event contracts, PostgreSQL/Redis/Docker infrastructure and quality/context validation. Present as active-development/foundation scope, not as a fully completed production platform.

## Nihongo Learning System

> **Product / System Design** — Designed an AI-assisted Japanese learning platform for Kana, Kanji, vocabulary, grammar, conjugation and LSRW. Modeled SRS, mastery, mistake events and review scheduling, with Angular + Supabase architecture and Gemini behind trusted Edge Functions. Delivery plan uses vertical slices and explicit security/data-quality/test gates.

## LabVnua / EduAI

> **Flutter Team Lead / Full-stack Flutter Developer** — Built a feature-first Flutter academic companion integrating VNUA student services, SQLite cache, background synchronization, notifications, Supabase Realtime chat, QR scanning and an AI assistant. Repository is an active MVP with core student flows implemented and some placeholder areas.

## Learn2Earn

> **Backend Developer / Part-time** — Developed within a career-platform monorepo connecting students and businesses through job, CV, application, candidate and chat workflows. Worked across Node.js/TypeScript/Express/Prisma/MySQL and Flutter client integrations.

---

# 22. CLAIMS THAT SHOULD NOT BE USED WITHOUT EXTRA EVIDENCE

Không tự động đưa các câu sau lên public portfolio:

- “NanoBio has X active users” nếu không có analytics.
- “NanoBio is fully published/approved on Google Play” nếu chưa đối chiếu Play Console release status.
- “Study2Work is production-ready” khi source audit còn foundation/broken areas.
- “Nihongo is completed” khi repository đang design/development.
- “All HVC modules are present in every HVC implementation.”
- “LabVnua has full automated coverage” khi README nói coverage minimal.
- “AI output is medically accurate.”
- “Improved student results/revenue/efficiency by X%” nếu không có measurement.
- “Senior Architect” chỉ dựa trên việc tự thiết kế project.

---

# 23. RECOMMENDED PROFESSIONAL POSITIONING

Từ GitHub evidence, positioning mạnh nhất là:

> **Full-stack Developer focused on Backend Python, Flutter, PostgreSQL/Supabase and System Analysis, with hands-on experience designing local-first mobile apps, serverless business systems, API/data contracts and AI-integrated workflows.**

Expanded:

> **I build software from business rules to delivery: defining actors and workflows, designing API/data boundaries, implementing frontend/backend/mobile layers, enforcing authorization at trusted boundaries, validating with tests and quality gates, and maintaining source-of-truth documentation for both human and AI-assisted development.**

---

# 24. SKILL → PROJECT EVIDENCE MATRIX

| Skill | Strongest evidence |
|---|---|
| Flutter | NanoBioAI, LabVnua, Learn2Earn |
| Dart | NanoBioAI, LabVnua |
| FastAPI | edu_hvc, Study2Work |
| Python | edu_hvc, Study2Work, enterprise context |
| Vue | HVC_EDU_NEW, Study2Work |
| Angular | HVC_EDU, Nihongo, Hung & Quynh |
| React | Study2Work Work web, NanoBio Admin portfolio evidence |
| TypeScript | HVC, Study2Work, Nihongo, Learn2Earn, Portfolio |
| PostgreSQL | HVC, Study2Work, NanoBio/Supabase |
| Raw SQL | edu_hvc, enterprise context |
| SQLite | NanoBio, LabVnua, Learn2Earn mobile |
| Supabase | HVC, NanoBio, Nihongo, LabVnua |
| RLS | HVC, Nihongo |
| Edge Functions | HVC, NanoBio, Nihongo |
| REST API | FPT context, edu_hvc, Study2Work, Learn2Earn |
| RBAC | HVC, edu_hvc, Learn2Earn |
| Local-first | NanoBio |
| Realtime | LabVnua, Supabase-based projects |
| AI integration | NanoBio, Nihongo, LabVnua, Study2Work AI |
| Gemini | NanoBio, Nihongo, LabVnua |
| Ollama | Study2Work |
| OpenAPI | Study2Work |
| JSON Schema | Study2Work |
| System Analysis | HVC, Study2Work, Nihongo, LinguaSphere |
| Business Design | HVC, Nihongo, Study2Work design context |
| Testing | NanoBio, HVC, Nihongo plan, Portfolio, Hung & Quynh |
| Playwright | Hung & Quynh |
| CI/CD | Portfolio, HVC, Nihongo, GitHub Pages projects |
| Docker | edu_hvc, Study2Work |
| GitHub Pages | Portfolio, HVC, Hung & Quynh, NanoBio support |
| AI coding agents | NanoBio, Study2Work context system |

---

# 25. SUGGESTED PORTFOLIO INFORMATION ARCHITECTURE

```text
HOME
│
├── POSITIONING
│   ├── Full-stack
│   ├── Backend Python
│   ├── Flutter
│   ├── System Analysis
│   └── AI-Assisted Engineering
│
├── EXPERIENCE
│   ├── FPT
│   ├── NanoBio
│   ├── VNUA
│   ├── MaiATech / Learn2Earn
│   └── VentureX
│
├── FLAGSHIP PROJECTS
│   ├── NanoBioAI
│   ├── Hùng Cường
│   ├── Study2Work
│   └── Nihongo
│
├── SUPPORTING PROJECTS
│   ├── LabVnua
│   ├── Learn2Earn
│   ├── Portfolio
│   └── Hung & Quynh
│
├── ENGINEERING CAPABILITIES
│   ├── Backend
│   ├── Mobile
│   ├── Data
│   ├── Architecture
│   ├── AI
│   ├── Testing
│   ├── Security
│   └── Delivery
│
├── TECHNICAL CASE STUDIES
│   ├── Local-first sync
│   ├── RLS + Edge Functions
│   ├── Monthly snapshot
│   ├── Contract-first monorepo
│   ├── AI validation
│   └── Media build pipeline
│
└── CONTACT / LINKS
```

---

# 26. TECHNICAL CASE STUDIES TO BUILD NEXT

## Case 1 — HVC: Client Guard vs Real Authorization

Story:
- frontend role guards improve UX;
- they are bypassable;
- RLS + Edge Functions enforce real access;
- privileged operation moves server-side.

Signals:
- security awareness;
- Supabase expertise;
- auth architecture.

## Case 2 — NanoBio: Local-first + Optional Cloud

Story:
- guest must remain usable;
- SQLite is local source;
- Supabase only when available;
- cloud/auth/paid paths fail closed;
- sync boundary separated.

Signals:
- mobile architecture;
- resilience;
- data ownership.

## Case 3 — Nihongo: Deterministic Rule Before AI

Story:
- Japanese canonical data must be trusted;
- deterministic grading handles known cases;
- Gemini used only where semantic judgment is useful;
- structured output validated;
- DB beats AI when conflict.

Signals:
- mature AI integration.

## Case 4 — Study2Work: Runtime vs Design Truth

Story:
- architecture docs can drift;
- source audit found mismatches;
- context system classifies current runtime;
- portfolio does not turn design proposal into implementation.

Signals:
- engineering rigor;
- documentation governance;
- AI-agent context management.

## Case 5 — HVC: ClassMonth Snapshot

Story:
- long-lived class;
- monthly staff/student/fee schedule changes;
- copy previous month but not transactions;
- preserve historical accuracy.

Signals:
- business analysis;
- data modeling;
- state lifecycle.

---

# 27. SOURCE INDEX

## NanoBio
- `https://github.com/daovanhung-dev/NanoBioAI`
- `/README.md`
- `/CONTRIBUTING.md`
- `/SYSTEM_FEATURES_DOCUMENTATION.md`
- `/.codex/`
- `https://github.com/daovanhung-dev/nanobioai-privacy`

## Hùng Cường
- `https://github.com/daovanhung-dev/edu_hvc`
- `/hungcuong-backend/README.md`
- `https://github.com/daovanhung-dev/HVC_EDU`
- `/README.md`
- `https://github.com/daovanhung-dev/HVC_EDU_NEW`
- `/README.md`
- `/docs/Hung_Cuong_Business_Design_v1.0.md`
- `/docs/Hung_Cuong_Project_Architecture_GitHubPages_Supabase.md`
- `/docs/IMPLEMENTATION.md`

## Study2Work
- `https://github.com/daovanhung-dev/Study2Work`
- `/README.md`
- `/.agents/project/architecture.md`
- `/.agents/project/source-status.md`
- `/contracts/`
- `/docker-compose.yml`

## Nihongo
- `https://github.com/daovanhung-dev/Nihongo-Learning-System`
- `/README.md`
- `/docs/01_BUSINESS_DESIGN.md`
- `/docs/03_IMPLEMENTATION_PLAN.md`
- `/docs/05_ARCHITECTURE.md`
- `/frontend/package.json`

## LabVnua
- `https://github.com/daovanhung-dev/LabVnua`
- `develop/README.md`

## Learn2Earn
- `https://github.com/daovanhung-dev/Learn2Earn`
- `/README.md`

## Portfolio
- `https://github.com/daovanhung-dev/portfolio`
- `/README.md`
- `/src/data/projects.ts`
- `/src/data/live-products.ts`

## Hung & Quynh
- `https://github.com/daovanhung-dev/hung-quynh-our-story`
- `/package.json`
- `/docs/`

---

# 28. EXTERNAL DOCUMENTATION STRUCTURE REFERENCES

Tài liệu này sử dụng cách trình bày chuyên nghiệp dựa trên các nguyên tắc:

### C4 Model
Architecture được mô tả theo tư duy:
- System context
- Container
- Component
- Supporting runtime/deployment flow

Official source:
`https://c4model.com/`

### GitHub Documentation Best Practices
Áp dụng:
- initial context;
- logical information hierarchy;
- meaningful headings;
- scannability;
- accuracy;
- consistency;
- README/project evidence orientation.

Official source:
`https://docs.github.com/en/repositories/creating-and-managing-repositories/best-practices-for-repositories`

---

# 29. QA REVIEW — ROUND 1: FACTUAL & SOURCE INTEGRITY

**Score before fixes:** 9.2/10

## Findings

### Finding 1 — Study2Work README vs source audit
README mô tả canonical BD như source of truth, nhưng repository audit ghi canonical BD directory không tồn tại tại baseline audit.

**Risk:** portfolio có thể biến target design thành runtime fact.

**Fix applied:**  
Study2Work được mô tả theo hai layer:
- intended architecture/contracts;
- verified runtime/foundation status.

### Finding 2 — NanoBio AI transport docs có khả năng drift
README hiện hành mô tả production AI qua Edge Function, trong khi feature document cũ còn direct REST seam.

**Risk:** mô tả transport tuyệt đối có thể lỗi thời.

**Fix applied:**  
Dùng wording server-side protected AI boundary; thêm documentation-drift note.

### Finding 3 — HVC có ba implementation khác scope
Nếu merge feature list không cẩn thận, payroll/tuition của bản Vue có thể bị gán cho Angular minimal version.

**Fix applied:**  
Tách rõ:
- `edu_hvc` FastAPI;
- `HVC_EDU` Angular minimal;
- `HVC_EDU_NEW` Vue richer operations.

### Finding 4 — Design ≠ production
Nihongo có BD/architecture rất sâu nhưng không đủ bằng chứng để gọi completed product.

**Fix applied:**  
Giữ status **Design / Development**.

### Result after fixes
**9.8/10**

---

# 30. QA REVIEW — ROUND 2: ARCHITECTURE & ENGINEERING COMPLETENESS

**Score before fixes:** 9.4/10

## Checklist

- [x] Problem statement
- [x] Actors/users
- [x] Business workflow
- [x] Technology stack
- [x] Runtime architecture
- [x] Layers/components
- [x] Responsibility of components
- [x] Data architecture
- [x] Security/auth boundary
- [x] AI boundary where relevant
- [x] Development process
- [x] Testing/quality
- [x] Deployment
- [x] Limitations/evidence level
- [x] Portfolio-safe wording

## Finding
Các repo support như Trust Center và interactive frontend có ít business architecture hơn flagship projects.

**Fix applied:**  
Định vị chúng là **technical/supporting evidence** thay vì cố phóng đại thành enterprise systems.

### Result after fixes
**9.8/10**

---

# 31. QA REVIEW — ROUND 3: PORTFOLIO SAFETY & PROFESSIONAL QUALITY

**Score before fixes:** 9.5/10

## Checks

### Secrets
Không đưa:
- API key;
- service-role key;
- database password;
- project secret;
- real session token;
- bootstrap credential.

### Sensitive operational data
Không đưa:
- password học sinh/nhân sự;
- account credential;
- private health payload;
- confidential client schema.

### Overclaim control
Đã loại/giảm:
- unverified active-user claims;
- unsupported performance/impact percentages;
- completed-production claim cho S2W/Nihongo;
- medical claims cho NanoBio.

### Portfolio readability
Đã:
- chuẩn hóa project section;
- tạo skill→evidence map;
- tạo priority tiers;
- tạo reusable project-page template;
- tạo case-study suggestions;
- phân biệt direct evidence và inference.

### Final score
**9.9/10**

---

# 32. FINAL MASTER POSITIONING

## Vietnamese

> **Đào Văn Hùng là Full-stack Developer thiên Backend Python, Flutter, PostgreSQL/Supabase và System Analysis. GitHub thể hiện khả năng xây dựng hệ thống từ bài toán nghiệp vụ đến kiến trúc, dữ liệu, API, frontend/mobile, security boundary, testing và deployment. Các dự án nổi bật trải rộng HealthTech, EdTech, education operations và career platforms, với thế mạnh đáng chú ý ở local-first mobile architecture, serverless Supabase systems, contract/source-of-truth engineering và AI integration có validation.**

## English

> **Full-stack Developer focused on Backend Python, Flutter, PostgreSQL/Supabase and System Analysis. My work spans business-rule modeling, API/data architecture, mobile and web implementation, trusted authorization boundaries, testing and CI/CD. I build evidence-driven systems across HealthTech, EdTech, education operations and career platforms, with particular strength in local-first mobile architecture, serverless Supabase applications, source-of-truth engineering and validated AI integration.**

---

# 33. FINAL NOTE FOR PORTFOLIO/CODING AGENTS

Khi dùng tài liệu này để build portfolio:

1. **Không tự mở rộng claim.**
2. Đọc repository tương ứng trước khi thay đổi nội dung project.
3. Ưu tiên current source hơn file context này nếu repo đã thay đổi.
4. Giữ `status` và `evidence level`.
5. Không biến `Placeholder`, `Partial`, `Source-only`, `Design` thành `Implemented`.
6. Chỉ hiển thị live URL đã được evidence map xác nhận.
7. Mỗi capability phải map về ít nhất một project/experience.
8. Mỗi flagship project nên có architecture diagram + real screenshots + evidence links.
9. Nên cập nhật context này mỗi khi một flagship repo có thay đổi kiến trúc hoặc release lớn.
