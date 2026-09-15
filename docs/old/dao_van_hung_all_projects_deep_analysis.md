# PROJECT PORTFOLIO — ĐÀO VĂN HÙNG

> **Bản phân tích chuyên sâu toàn bộ dự án**  
> **Cập nhật:** 15/09/2026  
> **GitHub chính:** https://github.com/daovanhung-dev  
> **Mục đích:** Canonical project context dùng cho Portfolio, CV, LinkedIn, Codex/GPT, phỏng vấn kỹ thuật và tổng hợp năng lực.

---

# 0. Phạm vi và nguyên tắc trích xuất

Tài liệu này được tổng hợp từ:

1. Source code và cấu trúc repository hiện tại trên GitHub.
2. README, tài liệu kiến trúc, Business Design, package manifest, migration, scripts và cấu hình CI/CD.
3. Dữ liệu project/experience được khai báo trong portfolio hiện tại.
4. Lịch sử công việc và project đã được ghi nhận trước đây.
5. Các dự án nội bộ/doanh nghiệp không có repository public.

## Thứ tự ưu tiên bằng chứng

Khi thông tin giữa các thời điểm mâu thuẫn, ưu tiên:

```text
Source code hiện tại
        ↓
Manifest / package / migration / executable config
        ↓
README / architecture docs hiện tại
        ↓
Portfolio typed data hiện tại
        ↓
Lịch sử trao đổi / snapshot cũ
```

Điều này đặc biệt quan trọng với các dự án đang thay đổi nhanh như:

- Study2Work
- NanoBio
- HVC EDU
- Nihongo Learning System

## Quy tắc về trạng thái

Tài liệu phân biệt rõ:

- **LIVE PRODUCT**: có URL triển khai được khai báo trong source/portfolio hiện tại.
- **ACTIVE DEVELOPMENT**: đang phát triển, không mặc định là production-ready.
- **IMPLEMENTED**: có implementation/runtime path trong source.
- **PARTIAL**: có implementation nhưng chưa đầy đủ hoặc phụ thuộc backend/runtime.
- **PLACEHOLDER**: UI/route hoặc ý tưởng đã tồn tại nhưng chưa có business implementation đầy đủ.
- **SOURCE-ONLY**: có schema/source nhưng chưa có runtime consumer xác minh.
- **DESIGN / DEVELOPMENT**: đã có Business Design/architecture/scaffold nhưng không claim hoàn thành sản phẩm.
- **PRIVATE / ENTERPRISE**: dự án nội bộ, không có repository hoặc demo public có thể xác minh.

---

# 1. Tổng quan toàn bộ project

| # | Dự án | Vai trò chính | Trạng thái | GitHub | Demo / Live |
|---|---|---|---|---|---|
| 1 | NanoBio / Nabi Ecosystem | Technical Owner / Full-stack Flutter Developer | Active + Live surfaces | https://github.com/daovanhung-dev/NanoBioAI | Admin: https://daovanhung-dev.github.io/NanoBioAI/ |
| 2 | NanoBio Trust Center | Product Delivery / Compliance | Live | https://github.com/daovanhung-dev/nanobioai-privacy | https://daovanhung-dev.github.io/nanobioai-privacy/ |
| 3 | Study2Work | System / Product Architecture + Full-stack | Active Development | https://github.com/daovanhung-dev/Study2Work | Chưa có demo public được xác minh |
| 4 | HVC EDU — Angular | Full-stack Developer | Live | https://github.com/daovanhung-dev/HVC_EDU | https://daovanhung-dev.github.io/HVC_EDU/ |
| 5 | HVC EDU — Vue/Supabase | Full-stack Developer | Live | https://github.com/daovanhung-dev/HVC_EDU_NEW | https://daovanhung-dev.github.io/HVC_EDU_NEW/ |
| 6 | Hùng Cường — FastAPI + Vue | Full-stack Developer / System Designer | Project implementation | https://github.com/daovanhung-dev/edu_hvc | Chưa có demo public được xác minh |
| 7 | LabVnua / EduAI | Flutter Team Lead / Full-stack Flutter Developer | Active Development | https://github.com/daovanhung-dev/LabVnua | Chưa có demo public được xác minh |
| 8 | Learn2Earn | Backend Developer / Part-time | Active/Project | https://github.com/daovanhung-dev/Learn2Earn | Chưa có demo public được xác minh |
| 9 | Nihongo Learning System | Product / System Designer | Design / Development | https://github.com/daovanhung-dev/Nihongo-Learning-System | Chưa gắn demo public được xác minh |
| 10 | Hung & Quynh — Our Story | Frontend Developer | Live | https://github.com/daovanhung-dev/hung-quynh-our-story | https://daovanhung-dev.github.io/hung-quynh-our-story/ |
| 11 | Engineering Portfolio | Designer / Developer | Live | https://github.com/daovanhung-dev/portfolio | https://daovanhung-dev.github.io/portfolio/ |
| 12 | VentureX / LinguaSphere | Tech Lead / System Analyst / API Designer | Architecture / Private | Không có repo public xác minh | Không có demo public xác minh |
| 13 | FPT Enterprise Project | Full-stack Intern → Fresher | Enterprise / Private | Repository nội bộ | Không public |
| 14 | SMA — SmartManagerAuto | Full-stack / System Design | Project | Chưa xác minh repo public | Chưa xác minh demo |
| 15 | My_Courses | Chưa đủ implementation | Empty repository | https://github.com/daovanhung-dev/My_Courses | Không có |

---

# 2. NanoBio / Nabi Ecosystem

## 2.1. Định danh

- **Tên:** NanoBioAI / NanoBio / Nabi
- **Domain:** HealthTech / Personal Health Assistant
- **Vai trò:** Technical Owner / Full-stack Flutter Developer
- **Repository:** https://github.com/daovanhung-dev/NanoBioAI
- **Admin Live:** https://daovanhung-dev.github.io/NanoBioAI/
- **Trust Center:** https://daovanhung-dev.github.io/nanobioai-privacy/
- **Privacy Policy:** https://daovanhung-dev.github.io/nanobioai-privacy/privacy-policy.html
- **Trạng thái:** Active Development; có các surface đã deploy public.
- **Mobile Store:** chưa đưa link Play Store vào tài liệu vì chưa có URL public được xác minh trong source đã đọc.

## 2.2. Bài toán sản phẩm

NanoBio là hệ sinh thái hỗ trợ chăm sóc sức khỏe cá nhân, với Nabi đóng vai trò trợ lý đồng hành.

Bài toán không chỉ là một ứng dụng hỏi đáp AI. Hệ thống phải phối hợp:

```text
Health profile
+ Local data
+ Cloud account
+ Meal planning
+ Exercise planning
+ Schedule
+ Tracking
+ Notifications
+ AI interaction
+ Membership / quota
+ Admin
+ Release / compliance
```

Một yêu cầu kiến trúc quan trọng là ứng dụng vẫn có thể cung cấp một phần trải nghiệm ở **guest/local mode** mà không phụ thuộc hoàn toàn vào cloud.

## 2.3. Luồng runtime chính

```text
lib/main.dart
    │
    ├─ Load optional runtime configuration
    │
    ├─ Init Supabase nếu có public URL/key hợp lệ
    │
    ├─ ProviderScope
    │
    └─ BioAIApp
          │
          ├─ User surface
          │    └─ Unified GoRouter cho V1 + V2 + V3
          │
          └─ Admin surface
               └─ chỉ mở khi backend xác nhận trusted Admin role

Sau bootstrap:
    ├─ Cloud sync nếu Supabase sẵn sàng
    ├─ Refresh meal catalog
    └─ Local notification startup
```

## 2.4. Kiến trúc

### Mobile

Cấu trúc source hiện tại:

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
```

Mô hình tổng thể:

```text
UI / Route
    ↓
Riverpod Provider / Feature State
    ↓
Repository / Service
    ↓
Local DAO / SQLite
    +
Supabase / RPC / PostgREST
    ↓
Edge Functions
    ↓
Gemini
```

### Local-first

SQLite không chỉ là cache đơn giản.

Các vấn đề phải xử lý:

- ownership của dữ liệu;
- mapping local ↔ cloud;
- record identity;
- sync;
- merge khi guest chuyển thành member;
- fallback;
- transaction;
- constraint;
- consistency verification.

### AI boundary

Production flow:

```text
Flutter
   ↓
NabiAiBackendClient
   ↓
Supabase Edge Function
   ↓
nabi-ai-generate
   ↓
Gemini API
```

Gemini key được đặt ở trusted server boundary, không nhúng trực tiếp trong Flutter APK.

### Admin Web

Repo còn có `admin-web/`.

Stack đã xác minh:

- React 19
- React DOM 19
- React Router
- TypeScript
- Vite
- Supabase JS
- Lucide React
- Vitest
- jsdom

Pipeline:

```text
React Admin
    ↓
Supabase Auth / trusted session
    ↓
Permission boundary
    ↓
RPC / Storage / Database
```

## 2.5. Công nghệ

### Mobile

- Flutter
- Dart
- Riverpod
- GoRouter
- sqflite / SQLite
- Shared Preferences
- Flutter Local Notifications
- Deep Link
- Android/iOS tooling

### Backend / Cloud

- Supabase
- Supabase Auth
- PostgreSQL
- PostgREST
- RPC
- Edge Functions
- Storage
- Deno ecosystem ở serverless layer

### AI

- Gemini API
- Structured output
- Parsing
- Validation
- Fallback strategy

### Admin

- React
- TypeScript
- Vite
- Vitest
- Supabase JS

### Release

- Gradle
- Android Gradle Plugin
- Android SDK / NDK
- ADB
- APK
- AAB
- GitHub Actions
- GitHub Pages

## 2.6. Capability thực tế theo source

### Implemented

- Onboarding 9 bước.
- Profile/local health data.
- Dashboard.
- Schedule.
- Meal plan.
- Basic health tracking.
- Local notifications.
- AI plan generation qua Edge Function.
- Local meal catalog fallback.

### Implemented / Partial

- Authentication.
- Guest → Member merge.
- Cloud sync.
- Membership/entitlement.
- Quota.
- Health score.
- Payment request.
- Wellness Rewards.
- Advanced tracking.
- FamilyPlus.

### Partial

- AI chat.
- AI voice.
- Sale/referral.
- Admin surface.

### Placeholder / planned

- Sleep.
- Stress.
- Community.
- Một số personal goal flow.
- Một số premium/V3 modules.

Điểm quan trọng khi mô tả dự án trong CV/Portfolio: **không nên claim toàn bộ V2/V3 là production-complete**.

## 2.7. Các đầu việc Hùng đã làm

### Architecture

- Tổ chức Flutter app theo feature-oriented architecture.
- Thiết kế local-first flow.
- Xác định ownership giữa local và cloud.
- Tổ chức repository/service/DAO.
- Tách AI secret ra server-side Edge Function.
- Thiết kế boundary cho Guest, Member, Admin và Sale.

### Mobile development

- Onboarding.
- Health profile.
- Chọn bệnh.
- Chọn thuốc.
- Dashboard.
- Meal planning.
- Exercise planning.
- Schedule.
- Notifications.
- Health insight.
- Daily health monitoring.
- Guest/member flow.
- Deep link.
- Nabi assistant overlay.
- Animation/performance tuning.

### AI

- Tích hợp AI plan generation.
- Làm việc với Gemini.
- Xử lý AI response parsing.
- Validation.
- Fallback.
- Nghiên cứu voice conversation.
- Debug quota/backend/access gate cho AI.

### Data

- SQLite schema.
- Local persistence.
- Cloud sync.
- Mapping.
- Merge.
- Supabase RPC.
- Data ownership.
- Consistency investigation.

### Admin

- Admin authentication.
- Admin session.
- Permission handling.
- RPC integration.
- Storage integration.
- React admin surface.
- Testing/typecheck.

### Android release engineering

- Debug Gradle / AGP.
- Android SDK/NDK.
- ADB.
- Runtime logs.
- APK/AAB build.
- Versioning.
- Closed testing preparation.
- Google Play release workflow.

### Engineering quality

- Flutter analyze/test.
- Integration tests.
- Validation scripts.
- Documentation audits.
- Source-truth policy.
- GitHub Actions.
- GitHub Pages deployment cho admin.

## 2.8. Điểm kỹ thuật nổi bật

### Case: Local ↔ Cloud Consistency

```text
Source of truth
    ↓
User ownership
    ↓
Mapping
    ↓
RPC
    ↓
Transaction
    ↓
Sync
    ↓
Verification
```

### Case: Admin Security Boundary

```text
React
    ↓
Authentication
    ↓
Trusted admin session
    ↓
Permission
    ↓
RPC
    ↓
RLS / Storage
```

### Case: Android Release

```text
Flutter
    ↓
Gradle / AGP
    ↓
Android SDK/NDK
    ↓
ADB / runtime logs
    ↓
APK / AAB
    ↓
Policy / distribution
```

---

# 3. NanoBio Trust Center

## 3.1. Định danh

- **Repository:** https://github.com/daovanhung-dev/nanobioai-privacy
- **Live:** https://daovanhung-dev.github.io/nanobioai-privacy/
- **Privacy:** https://daovanhung-dev.github.io/nanobioai-privacy/privacy-policy.html

Đây là public compliance/trust surface của NanoBio.

## 3.2. Nội dung

Repo chứa các public pages:

- Privacy Policy.
- Data Safety.
- Account Deletion.
- Terms of Service.
- Cookie Policy.
- Health / AI Disclaimer.
- Trust Center landing page.

## 3.3. Công nghệ / kiến trúc

Đây là static website:

- HTML.
- CSS/assets.
- `.nojekyll`.
- GitHub Pages.

Không có lý do để dùng framework runtime nặng cho surface này.

## 3.4. Các đầu việc

- Chuẩn bị public privacy information.
- Tạo Data Safety page.
- Tạo luồng hướng dẫn account deletion.
- Health/AI disclaimer.
- Terms/Policy pages.
- Deploy GitHub Pages.
- Tách compliance surface khỏi mobile app.

---

# 4. Study2Work

## 4.1. Định danh

- **Repository:** https://github.com/daovanhung-dev/Study2Work
- **Vai trò:** System / Product Architecture + Full-stack Development
- **Trạng thái:** Active Development
- **Demo public:** chưa xác minh.

## 4.2. Product scope

Study2Work hiện được tổ chức thành hai subsystem độc lập.

### Study

Phạm vi:

- Learning.
- Courses.
- Lessons.
- Assessment.
- Progress.
- Evidence issuance.
- Technical skill learning.
- Project practice.
- Skill assessment.

### Work

Phạm vi:

- Career profile.
- CV.
- Portfolio.
- Jobs.
- Applications.
- Recruiter workflow.
- Recruitment matching.

Tư tưởng sản phẩm:

```text
Study
    ↓
Skills / Evidence
    ↓
Portfolio / Career profile
    ↓
Work opportunities
```

## 4.3. Kiến trúc hiện tại

Study2Work không còn là mô hình đơn giản “FastAPI + Vue”.

Current repo là **polyglot monorepo**.

```text
Study2Work/
├── apps/
│   ├── ai-server/
│   ├── study-client/
│   ├── study-server/
│   ├── work-client/
│   └── work-server/
├── contracts/
├── docs/
├── infra/
└── docker-compose.yml
```

### Study stack

```text
Vue 3 + TypeScript + Vite
          ↓
FastAPI / Python
          ↓
SQLAlchemy
          ↓
PostgreSQL
          ↓
Alembic migrations
```

### Work stack

```text
React + TypeScript + Vite
          ↓
NestJS
          ↓
Fastify
          ↓
PostgreSQL
          +
Redis
```

### Shared contract layer

- OpenAPI baseline.
- Event JSON Schema.
- Skill taxonomy.
- Shared business traceability.

### Local infrastructure

- PostgreSQL.
- Redis.
- MinIO.
- Mailhog.
- Docker Compose.

## 4.4. Kiến trúc deploy

Work API và Work Web được thiết kế là hai deployable độc lập:

```text
Browser
   ↓
Work React Web
   ↓
VITE_WORK_API_URL
   ↓
NestJS/Fastify API
   ↓
PostgreSQL / Redis
```

API không serve static frontend.

## 4.5. API conventions

Một response envelope chuẩn:

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

Điều này cho thấy dự án đang tiến tới contract consistency và observability-friendly API.

## 4.6. Documentation / design

Dự án có lịch sử tài liệu rất lớn:

- Business Design.
- Use Case.
- Acceptance Criteria.
- Class Diagram.
- Sequence Diagram.
- API specification.
- Database design.
- Business code.
- Detail Design.
- Developer docs.
- Diagrams.
- Contract files.

### Lưu ý về docs hiện tại

README hiện mô tả một nhóm canonical BD files, trong khi physical tree hiện tại của `docs/` đã được tổ chức thành:

```text
docs/
├── business_code/
├── dd/
├── devs/
├── diagrams/
└── lists/
```

Điều này cho thấy repo đang có quá trình refactor/chuẩn hóa documentation. Khi dùng làm portfolio, nên mô tả **architecture và executable contract hiện tại**, tránh trích nguyên một đường dẫn docs cũ nếu file đã được di chuyển.

## 4.7. Công nghệ

### Backend

- Python.
- FastAPI.
- SQLAlchemy.
- Alembic.
- NestJS.
- Fastify.
- TypeScript.

### Frontend

- Vue 3.
- React.
- TypeScript.
- Vite.

### Data / infrastructure

- PostgreSQL.
- Redis.
- MinIO.
- Mailhog.
- Docker Compose.

### Contract / architecture

- OpenAPI.
- JSON Schema.
- Event contracts.
- Business codes.
- Trace ID.

## 4.8. Các đầu việc Hùng đã làm

### Product/System design

- Phân tách Study và Work.
- Xác định actor.
- Xác định permission.
- Thiết kế business rules.
- Thiết kế interaction giữa learning và career.
- Thiết kế ownership giữa subsystem.

### Documentation

- Business Design.
- Use Case.
- Acceptance Criteria.
- Class Diagram.
- Sequence Diagram.
- API contract.
- Database design.
- Screen specification.
- Business code.
- Detail Design.

### Backend

- FastAPI foundation cho Study.
- Database/migration.
- REST API.
- Validation.
- Authentication/authorization design.
- Work API foundation.
- Redis integration architecture.

### Frontend

- Study frontend architecture.
- Work frontend architecture.
- API integration.
- Role-based UI flows.

### Infrastructure

- Docker Compose.
- PostgreSQL local services.
- Redis.
- MinIO.
- Mailhog.
- Multi-developer environment planning.

### Current operational work

- Chuẩn hóa database để nhiều developer cùng truy cập.
- Hoàn thiện thêm APIs.
- Chuẩn hóa collaborative development environment.
- Chuẩn bị hướng self-hosting/deployment.

## 4.9. Snapshot tiến độ lịch sử

Ở một snapshot khoảng 20/07/2026:

- Study Documentation: ~100%.
- Study Code: ~20%.
- Work Documentation: ~100%.
- Work Code: ~90%.

Đây chỉ là **snapshot lịch sử**, không đại diện trực tiếp cho state của monorepo hiện tại.

## 4.10. Giá trị kỹ thuật

Study2Work thể hiện rõ năng lực:

- Product decomposition.
- Polyglot architecture.
- Contract-first thinking.
- Backend architecture.
- Multi-app monorepo.
- Distributed ownership.
- Data contract.
- Documentation engineering.
- Infrastructure planning.

---

# 5. Hùng Cường Education Management — Tổng thể

Hệ thống Hùng Cường đã trải qua nhiều implementation khác nhau.

Không nên mô tả tất cả như một codebase.

Có ít nhất ba architecture public:

```text
1. edu_hvc
   FastAPI + PostgreSQL + Vue

2. HVC_EDU
   Angular + Supabase

3. HVC_EDU_NEW
   Vue + Supabase
```

Đây là bằng chứng về khả năng thử nghiệm và tái kiến trúc sản phẩm theo các hướng triển khai khác nhau.

---

# 6. HVC_EDU — Angular + Supabase

## 6.1. Định danh

- **Repository:** https://github.com/daovanhung-dev/HVC_EDU
- **Live:** https://daovanhung-dev.github.io/HVC_EDU/
- **Vai trò:** Full-stack Developer
- **Domain:** Education Operations

## 6.2. Phạm vi nghiệp vụ hiện tại

Bản Angular tập trung tối giản vào:

1. Lớp và học sinh.
2. Lịch / buổi học.
3. Điểm danh / nhận xét.
4. Nhân sự / chấm công.
5. Sổ thu chi.

### Admin

- Dashboard.
- CRUD lớp.
- CRUD học sinh.
- CRUD nhân sự.
- Phân công.
- Generate class sessions.
- Attendance.
- Evaluation.
- Staff attendance.
- Finance ledger.

### Staff

- Dashboard theo scope.
- Lớp được phân công.
- Roster.
- Schedule.
- Session.
- Attendance.
- Evaluation.
- Tự chấm công.

## 6.3. Scope không nên claim trong bản Angular hiện tại

Source hiện tại nói rõ bản Angular **không có**:

- monthly period;
- tuition engine;
- payment/debt;
- payroll;
- carry-over;
- fund/profit;
- import UI;
- notification;
- audit screen.

Điều này khác với bản `edu_hvc` FastAPI/Vue trước đó.

## 6.4. Kiến trúc

```text
Angular SPA
    ↓
Supabase Edge Functions
    ↓
RPC
    ↓
PostgreSQL Transaction
    ↓
audit_logs
```

RLS là enforcement layer quan trọng.

```text
User JWT
   ↓
RLS
   ├─ Staff: chỉ assignment scope
   ├─ Finance: restricted
   └─ Master data management: restricted
```

## 6.5. Root Control Plane

Root không sử dụng flow browser Supabase Auth thông thường.

```text
Root username
    ↓
root-auth Edge Function
    ↓
PBKDF2 secret verification
    ↓
Short-lived opaque session
    ↓
sessionStorage
    ↓
Root admin-account management
```

Root chỉ quản lý tài khoản Admin; không bypass tenant isolation.

Đây là điểm architecture/security đáng đưa vào portfolio.

## 6.6. Edge Functions

Repo hiện có các function:

- health.
- dashboard-summary.
- admin-master-data.
- generate-class-sessions.
- attendance-bulk-upsert.
- evaluation-bulk-upsert.
- staff-attendance.
- invite-staff-account.
- record-financial-transaction.
- root-auth.
- root-admin-accounts.

## 6.7. Database

Có migrations xử lý:

- minimal operational schema;
- remove legacy objects;
- tenant guards;
- staff dashboard scope;
- root control plane;
- RLS;
- RPC.

## 6.8. Data operations

Có scripts hỗ trợ:

- reset master data;
- seed;
- sync dữ liệu từ nguồn;
- advisory lock;
- transaction;
- rollback khi conflict.

## 6.9. Công nghệ

- Angular.
- TypeScript.
- Supabase.
- PostgreSQL.
- Supabase Auth.
- Edge Functions.
- RPC.
- RLS.
- Deno.
- GitHub Actions.
- GitHub Pages.

## 6.10. Các đầu việc Hùng đã làm

- Phân tích nghiệp vụ thực tế của trung tâm.
- Chuyển nghiệp vụ thành domain model.
- Thiết kế role/scope.
- Thiết kế Angular frontend.
- Thiết kế Supabase schema.
- Viết migrations.
- Viết RPC.
- Viết Edge Functions.
- Thiết kế RLS.
- Xây attendance/evaluation flows.
- Xây staff timekeeping.
- Xây finance ledger.
- Thiết kế Root control plane.
- Tách root secret khỏi browser.
- Viết data reset/seed/sync scripts.
- Triển khai GitHub Pages.
- Thiết lập build/test validation.

---

# 7. HVC_EDU_NEW — Vue + Supabase

## 7.1. Định danh

- **Repository:** https://github.com/daovanhung-dev/HVC_EDU_NEW
- **Live:** https://daovanhung-dev.github.io/HVC_EDU_NEW/
- **Vai trò:** Full-stack Developer

## 7.2. Mục tiêu

Đây là implementation Vue cho cùng domain quản lý trung tâm, triển khai theo mô hình:

```text
Vue SPA
    ↓
Supabase
    ├─ Auth
    ├─ PostgreSQL
    ├─ RLS
    └─ Edge Functions
```

## 7.3. Công nghệ

- Vue.
- TypeScript.
- Pinia.
- Vite.
- Supabase.
- Deno scripts.
- Python data script cho một số import/generate jobs.
- GitHub Actions.
- GitHub Pages.

## 7.4. Tooling được thể hiện trong package manifest

Repo có scripts cho:

- dev.
- build.
- typecheck.
- unit test.
- student roster import.
- student password rotation.
- class schedule import.
- staff schedule import.
- September attendance generation.
- tests cho các data scripts.

Điều này cho thấy dự án không chỉ có CRUD UI mà còn có **data-operation tooling**.

## 7.5. Security / deployment

- Public Supabase URL + publishable key ở frontend.
- Private backend/service secrets không đưa vào source.
- Root bootstrap qua interactive script.
- Supabase CLI.
- GitHub Actions secrets/variables.
- GitHub Pages base path.
- Auth redirect URL configuration.

## 7.6. Các đầu việc Hùng đã làm

- Vue SPA implementation.
- State management.
- Auth integration.
- Supabase connection.
- Role-based workflows.
- Data import scripts.
- Account/password operational tooling.
- Schedule import.
- Attendance data generation.
- Typecheck/testing.
- GitHub Pages deployment.
- Secret separation.

---

# 8. edu_hvc — FastAPI + Vue full-stack implementation

## 8.1. Định danh

- **Repository:** https://github.com/daovanhung-dev/edu_hvc
- **Demo public:** chưa xác minh.
- **Architecture:** traditional API backend + SPA frontend.

Repo gồm:

```text
edu_hvc/
├── docs/
├── hungcuong-backend/
└── hungcuong-frontend/
```

---

## 8.2. Backend

### Stack

- Python 3.11+.
- FastAPI.
- PostgreSQL 16.
- asyncpg.
- Raw SQL.
- Alembic.
- JWT access/refresh.
- RBAC.
- Docker Compose.
- pytest.

### Business workflow

```text
Period
   ↓
Class + Schedule Rules
   ↓
Enrollment
   ↓
Generate Sessions
   ↓
Attendance
   ↓
Tuition Calculation
   ↓
Payment / Adjustment
   ↓
Teacher Assignment
   ↓
Payroll
   ↓
Rewards / Income / Expense
   ↓
Closing Validation
   ↓
Atomic Month Closing
```

### Month closing

Close month là transaction atomic.

Khi thành công có thể tạo:

- closing snapshot;
- reserve ledger;
- profit distributions;
- next period;
- carry-over debt;
- carry-over credit;
- reserve.

### RBAC roles được seed

- OWNER_ADMIN.
- ACCOUNTANT.
- TEACHER.
- ASSISTANT.
- OPERATOR.
- VIEWER.

---

## 8.3. Frontend

### Stack

- Vue 3.
- TypeScript.
- Vite.
- Vue Router.
- Pinia.
- Axios.
- JWT access/refresh interceptor.
- TanStack Vue Query.
- Lucide.
- Responsive custom CSS.

### Flows đã triển khai

- Login / refresh / logout / me.
- RBAC navigation.
- Route guard.
- Period OPEN/CLOSED switcher.
- Dashboard.
- Students.
- Teachers.
- Subjects.
- Classes.
- Enrollment.
- Schedule.
- Session generation.
- Session status.
- Monthly comments.
- Attendance.
- Tuition.
- Payment.
- Adjustment.
- Due override.
- Teacher assignment.
- Payroll.
- Bonus / penalty.
- Income / expense.
- Student reward.
- Reserve.
- Profit distribution.
- Closing workflow.
- Reports.
- Users / roles.
- Center settings.
- Audit logs.

## 8.4. Architecture principle

Frontend không tự quyết định authoritative financial rules.

```text
Vue UI
   ↓
FastAPI
   ↓
Business Rule
   ↓
PostgreSQL Transaction
```

Khi period `CLOSED`:

- UI disable mutation để UX rõ;
- backend vẫn là enforcement layer cuối.

API errors giữ `trace_id` để debug.

## 8.5. Các đầu việc Hùng đã làm

- Chuyển Excel/process thủ công sang web domain.
- Thiết kế database.
- Thiết kế role/RBAC.
- Tạo Alembic migration.
- FastAPI initialization.
- REST API architecture.
- Raw SQL.
- JWT access/refresh.
- Business flows cho tuition/payroll/closing.
- Atomic transaction logic.
- Vue architecture.
- Pinia.
- Axios interceptor.
- RBAC route guard.
- Finance UI.
- Reporting.
- Audit.
- Docker.

---

# 9. LabVnua / EduAI

## 9.1. Định danh

- **Repository:** https://github.com/daovanhung-dev/LabVnua
- **Branch chính hiện tại:** `develop`
- **Vai trò:** Flutter Team Lead / Full-stack Flutter Developer
- **Demo public:** chưa xác minh.

## 9.2. Mục tiêu

Ứng dụng mobile companion cho sinh viên Học viện Nông nghiệp Việt Nam.

Mục tiêu:

```text
Một ứng dụng
   ↓
Lịch học
Điểm
GPA
Học phí
Đăng ký môn
Chương trình đào tạo
Môn tiên quyết
Thông báo
Chat
QR
AI Assistant
```

## 9.3. Core features

- Student authentication qua VNUA training portal API.
- Local session persistence.
- Student dashboard.
- Schedule.
- Score lookup.
- Score analysis.
- Tuition.
- Course registration.
- Training program.
- Prerequisite subjects.
- Notifications.
- Student profile.
- Realtime chat.
- AI assistant.
- QR scanner.
- Connectivity-aware startup.

## 9.4. Kiến trúc

Feature-first Flutter:

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

State hiện chủ yếu dùng:

- StatefulWidget / StatelessWidget.
- Controllers.
- Services.
- Local DB/API layers.

Không nên claim Riverpod/BLoC cho repo này nếu source hiện tại không dùng.

## 9.5. Data flow

```text
VNUA Portal API
      ↓
HTTP services
      ↓
Controllers
      ↓
Flutter Screens
      ↕
SQLite cache
```

Realtime chat:

```text
Flutter
   ↓
Supabase
   ↓
users / conversations / messages
   ↓
Realtime subscriptions
```

Background data:

```text
Workmanager
   ↓
Fetch/update
   ↓
SQLite
   ↓
Detect changes
   ↓
Local notification
```

## 9.6. Công nghệ

- Flutter.
- Dart.
- HTTP.
- sqflite.
- Supabase Flutter.
- Supabase Realtime.
- Google Generative AI SDK.
- flutter_local_notifications.
- workmanager.
- mobile_scanner.
- connectivity_plus.
- flutter_dotenv.

## 9.7. Các đầu việc Hùng đã làm

### Leadership

- Lead khoảng 6 thành viên.
- Phân rã feature.
- Giao task.
- Theo dõi blocker.
- Hỗ trợ kỹ thuật.
- Review implementation.
- Điều phối tích hợp.

### Development

- Authentication/session.
- Dashboard.
- Schedule.
- Grade/GPA.
- Tuition.
- Course registration.
- Training program.
- Prerequisite.
- QR scanner.
- Notification.
- Student profile.

### Integration

- VNUA API.
- SQLite.
- Supabase Realtime.
- Chat.
- Gemini/AI assistant.
- Background synchronization.

### Architecture

- Feature-first folder structure.
- Core/shared service layer.
- Controller/service organization.
- Local cache.
- Network-aware startup.

---

# 10. Learn2Earn

## 10.1. Định danh

- **Repository:** https://github.com/daovanhung-dev/Learn2Earn
- **Vai trò:** Backend Developer / Part-time
- **Demo public:** chưa xác minh.

## 10.2. Mục tiêu

Career platform hợp nhất workflow cho:

- Student.
- Business.
- Administrator.

Các bài toán:

- Job discovery.
- Career profile.
- CV.
- Application.
- Candidate management.
- Interview.
- Chat.
- Notification.
- Reports.

## 10.3. Kiến trúc repo

```text
Learn2Earn/
└── apps/
    ├── web/
    ├── flutter_student/
    └── flutter_business/
```

### Web

```text
Node.js
  ↓
TypeScript
  ↓
Express
  ↓
EJS
  ↓
Prisma
  ↓
MySQL
```

### Student App

- Flutter.
- Supabase.
- SQLite.

Flows:

- login;
- job discovery;
- CV;
- application;
- chat;
- settings.

### Business App

- Flutter.
- Supabase.
- SQLite.
- charts.

Flows:

- business login;
- job management;
- candidate search;
- reports;
- chat;
- settings.

## 10.4. Công nghệ

- Node.js.
- TypeScript.
- Express.
- EJS.
- Prisma.
- MySQL.
- JWT.
- Passport.
- Password hashing.
- Flutter.
- Supabase.
- SQLite.

## 10.5. Các đầu việc Hùng đã làm

Trọng tâm lịch sử là backend:

- REST API.
- MVC.
- Route.
- Controller.
- Middleware.
- Service logic.
- Data model.
- Authentication.
- Authorization.
- JWT.
- Passport.
- Password hashing.
- Role-based access.
- CV/profile upload.
- Job CRUD.
- Search.
- Bookmark.
- Application.
- Candidate status.
- Interview flow.
- Chat-related backend.
- Notification-related backend.
- Database integration.
- Debugging.
- API testing.

## 10.6. Năng lực thể hiện

- Backend foundations.
- Server-rendered application.
- MVC.
- Authentication.
- Authorization.
- ORM.
- Relational database.
- Multi-client product design.

---

# 11. Nihongo Learning System

## 11.1. Định danh

- **Repository:** https://github.com/daovanhung-dev/Nihongo-Learning-System
- **Vai trò:** Product / System Designer
- **Trạng thái:** Design / Development
- **Demo:** chưa gắn live URL được xác minh.

## 11.2. Product vision

Personal Japanese Learning System theo hướng Quizlet-style nhưng được thiết kế lại cho domain tiếng Nhật.

Không đơn giản là:

```text
Word ↔ Translation
```

Mà model:

```text
Written Form
+ Reading
+ Meaning
+ Pronunciation
+ Usage
+ Grammar
+ Context
+ Script Knowledge
```

## 11.3. Learning domains

- Hiragana.
- Katakana.
- Kanji.
- Vocabulary.
- Grammar.
- Conjugation.
- Listening.
- Speaking.
- Reading.
- Writing.
- JLPT.
- SRS.
- AI Practice.
- AI Tutor.
- Personal Analytics.

## 11.4. Japanese-specific domain model

Hệ thống tính đến:

- Kana reading.
- Romaji.
- Furigana.
- On'yomi.
- Kun'yomi.
- Okurigana.
- Radical.
- Stroke count.
- Stroke order.
- Particles.
- Verb/adjective conjugation.
- Counters.
- Politeness level.
- JLPT N5 → N1.
- Japanese IME.
- Long vowels.
- Small っ.
- Small ゃゅょ.
- Dakuten.
- Handakuten.

## 11.5. Learning loop

```text
Import / Create Knowledge
        ↓
Learn
        ↓
Recognize
        ↓
Recall
        ↓
Use in Context
        ↓
Test
        ↓
Analyze Mistakes
        ↓
Schedule Review
        ↓
Retest
        ↓
Mastery
```

## 11.6. Study modes

- Flashcards.
- Learn.
- Write / Recall.
- Japanese Dictation.
- Smart grading.
- Test.
- Match.
- Progress.
- Star.
- Combined sets.
- AI practice.
- AI tutor.
- Daily study path.

## 11.7. Kiến trúc runtime

```text
Browser / GitHub Pages
          │
          │ publishable key + user JWT
          ↓
Supabase
├── Auth
├── PostgreSQL + RLS
├── Storage
└── Edge Functions
          │
          │ backend secret
          ↓
Gemini API
```

## 11.8. Trust boundaries

### Browser

- Presentation.
- User interaction.
- Không chứa Gemini secret.
- Không chứa service-role secret.

### PostgreSQL

Canonical source of truth cho:

- learning content;
- attempts;
- mastery;
- mistakes;
- review schedules.

### Edge Functions

Trusted server boundary cho:

- Gemini.
- Private file evaluation.
- Semantic grading.
- Structured AI validation.

## 11.9. Frontend architecture

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

Presentational child component không gọi Supabase trực tiếp.

## 11.10. Learning event architecture

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

Đây là một điểm thiết kế rất tốt: hệ thống lưu **learning evidence/event trail**, không chỉ lưu final score.

## 11.11. AI architecture

```text
Angular Request
      ↓
Edge Function Auth
      ↓
Load Canonical Source
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

Nếu AI output xung đột với canonical DB record, database thắng.

## 11.12. Công nghệ

- Angular.
- TypeScript.
- SCSS.
- Supabase PostgreSQL.
- Supabase Auth.
- Storage.
- Edge Functions.
- RLS.
- Gemini API.
- GitHub Pages.
- Stitch AI.

## 11.13. Design assets

Repo có:

- Business Design.
- Project structure.
- Implementation plan.
- Screen map.
- Architecture.
- Setup guide.
- **38 Stitch AI screens** dưới `design/stitch/`.

## 11.14. Các đầu việc Hùng đã làm

- Product research.
- Quizlet-inspired learning behavior analysis.
- Japanese-domain redesign.
- Business Design.
- Domain modeling.
- SRS design.
- Learning event model.
- Mastery/mistake design.
- Smart grading design.
- AI practice design.
- AI tutor architecture.
- Supabase database architecture.
- RLS/security design.
- Edge Function boundary.
- Angular architecture.
- UI design system.
- 38-screen Stitch specification.
- Implementation roadmap.
- GitHub Pages architecture.
- Quality gates.

## 11.15. Không nên claim

Hiện nên mô tả:

> **Designed and under development**

Không nên mô tả:

> “Production Japanese learning platform with full AI/SRS users”

vì public source hiện là design/development scaffold, chưa có live demo được xác minh.

---

# 12. Hung & Quynh — Our Story

## 12.1. Định danh

- **Repository:** https://github.com/daovanhung-dev/hung-quynh-our-story
- **Live:** https://daovanhung-dev.github.io/hung-quynh-our-story/
- **Vai trò:** Frontend Developer
- **Mục tiêu portfolio:** Frontend craftsmanship proof.

## 12.2. Nội dung

Interactive static memory/story experience.

Các view/flow đã được ghi nhận:

- Home.
- Birthday.
- Gift Reveal.
- Envelope.
- Love Letter.
- Timeline.
- Memory Detail.
- Photo Viewer.

## 12.3. Bài toán kỹ thuật

Một project media-heavy phải giữ được đồng thời:

- storytelling;
- animation;
- responsive layout;
- image/media performance;
- accessibility;
- static deployment;
- E2E reliability.

## 12.4. Công nghệ đã xác minh

- Angular 22.
- TypeScript.
- SCSS/CSS.
- Angular Router.
- RxJS.
- Phaser.
- Three.js.
- Playwright.
- Sharp.
- exifr.
- HEIC conversion.
- Node.js scripts.
- GitHub Pages.

## 12.5. Media pipeline

Package scripts thể hiện pipeline:

```text
Input media
   ↓
Migration / scan
   ↓
Generate optimized variants
   ↓
Validate memories
   ↓
Generate memory index
   ↓
Angular build
   ↓
Prepare static host
   ↓
Verify artifact
   ↓
GitHub Pages
```

## 12.6. Quality

- Unit/script tests.
- Playwright E2E.
- Static artifact verification.
- Responsive handling.
- Reduced-motion support.
- Accessibility.
- Optimized media assets.

## 12.7. Các đầu việc Hùng đã làm

- Angular frontend.
- Multi-view routing.
- Storytelling UI.
- Animation.
- Responsive design.
- Photo viewer.
- Timeline.
- Media optimization.
- Image conversion pipeline.
- Memory index generation.
- Accessibility.
- Reduced motion.
- E2E testing.
- Static artifact verification.
- GitHub Pages deployment.

---

# 13. Engineering Portfolio

## 13.1. Định danh

- **Repository:** https://github.com/daovanhung-dev/portfolio
- **Live:** https://daovanhung-dev.github.io/portfolio/
- **Vai trò:** Designer / Developer

## 13.2. Mục tiêu

Portfolio không chỉ là landing page.

Nó được xây theo tư tưởng:

> **Evidence-driven engineering portfolio**

Mỗi capability phải có project/experience evidence đi kèm.

## 13.3. Kiến trúc

Không dùng React/Vue/Angular runtime.

```text
Vite
  +
Vanilla TypeScript
```

Structure:

```text
src/
├── data/
│   ├── profile
│   ├── experience
│   ├── projects
│   ├── capabilities
│   ├── live-products
│   └── case-studies
├── components/
├── styles/
└── main.ts
```

## 13.4. Data architecture

Project có typed contract cho:

- status;
- evidence level;
- role;
- problem;
- solution;
- stack;
- repository;
- live URL;
- case study relationship.

Capability phải map về project/experience evidence.

## 13.5. Content integrity

Portfolio phân biệt:

- enterprise experience;
- live product;
- active development;
- architecture/design scope;
- project experience;
- frontend proof;
- learning direction.

Điểm mạnh của cách làm này là tránh “skill dumping” không có bằng chứng.

## 13.6. Quality gates

Pipeline:

```text
Typecheck
    ↓
Tests
    ↓
Project data validation
    ↓
Link validation
    ↓
Build
    ↓
GitHub Pages artifact
```

Deploy chỉ chạy sau khi merge/push phù hợp vào main.

## 13.7. Công nghệ

- Vite.
- TypeScript.
- HTML.
- CSS.
- GitHub Actions.
- GitHub Pages.
- Automated validation/tests.

## 13.8. Các đầu việc Hùng đã làm

- Thiết kế information architecture.
- Tạo typed data model.
- Chuẩn hóa project evidence.
- Xây project modal.
- Accessibility.
- Theme.
- Navigation.
- Reveal behavior.
- Link validation.
- Project data validation.
- Build workflow.
- GitHub Pages CI/CD.
- Mapping capabilities → evidence.

---

# 14. VentureX / VinUniversity — LinguaSphere

## 14.1. Định danh

- **Tổ chức:** VentureX / VinUniversity.
- **Dự án:** LinguaSphere.
- **Vai trò:** Tech Lead / System Analyst / API Designer.
- **Repository public:** không có repository public được xác minh.
- **Demo public:** không có.
- **Evidence level:** Architecture/System Design.

## 14.2. Product direction

LinguaSphere được thiết kế như một LMS/learning platform tích hợp AI.

Phạm vi lịch sử đã ghi nhận:

- learner onboarding;
- placement/assessment;
- learning plan;
- curriculum;
- progress;
- testing;
- teacher/organization flows;
- AI support.

Một số vấn đề sản phẩm được nghiên cứu:

- Khoảng cách giữa chứng chỉ và khả năng sử dụng thực tế.
- Lộ trình học quá cứng nhắc.
- Khó kiểm soát cheating trong online assessment.
- Nhu cầu adaptive learning.
- Nhu cầu recruitment/enterprise assessment.

## 14.3. Quy mô thiết kế

Khoảng **16 module** được phân rã trong giai đoạn system analysis.

## 14.4. Kiến trúc / design responsibilities

### Actor and ownership

- Actor.
- Permission.
- Ownership.
- Preconditions.
- Business rules.

### API Detail Design

- Endpoint.
- Request.
- Response.
- Processing flow.
- Validation.
- Error specification.
- Business code.

### Cross-cutting concerns

- traceId.
- correlation ID.
- audit.
- timeout.
- retry.
- data model.
- traceability.

## 14.5. Các đầu việc Hùng đã làm

- System decomposition.
- Module decomposition.
- Actor design.
- Permission design.
- Business rule analysis.
- Data flow.
- Data model.
- API contract.
- Detail Design.
- Validation specification.
- Error contract.
- Audit requirement.
- Trace/correlation design.
- Technical coordination ở vai trò Tech Lead.

## 14.6. Cách nên trình bày

Nên ghi:

> “Tech Lead / System Analyst for an AI-enabled LMS architecture and API design.”

Không nên claim:

- production users;
- production deployment;
- public live system;

nếu không có evidence public.

---

# 15. FPT Enterprise Project

## 15.1. Định danh

- **Đơn vị:** FPT Software / FPT Corporation.
- **Vai trò:** Full-stack Intern → Full-stack Fresher.
- **Repository:** internal/private.
- **Demo:** internal/private.

## 15.2. Stack đã sử dụng

- Python.
- Flask.
- Vue.js.
- Bootstrap.
- PostgreSQL.
- Raw SQL.
- Docker.
- GitLab.

## 15.3. Quy trình enterprise

```text
Requirement
    ↓
Business Design
    ↓
Detail Design
    ↓
Implementation
    ↓
Unit Test
    ↓
Integration Test
    ↓
Regression
```

Tài liệu từng làm việc:

- BD.
- DD.
- UTC.
- UTR.
- ITR.

## 15.4. Output được ghi nhận

- 06 REST APIs.
- 02 business screens.
- Nghiệm thu ở mốc được ghi nhận.

## 15.5. Các đầu việc Hùng đã làm

### Backend

- Flask REST API.
- Validation.
- Business logic.
- Response handling.
- Error handling.

### Frontend

- Vue.js screens.
- API integration.
- Form/business UI.

### Database

- Raw SQL.
- CRUD.
- JOIN.
- Filter.
- Test data.
- Data investigation.

### Debugging

Một flow đặc trưng:

```text
Requirement / DD / UTC
        ↓
Reproduce defect
        ↓
Inspect UI payload
        ↓
Inspect API
        ↓
Inspect service/business logic
        ↓
Inspect SQL / database
        ↓
Find root cause
        ↓
Fix
        ↓
Regression
```

## 15.6. Giá trị kỹ thuật

Dự án này là bằng chứng cho:

- enterprise workflow;
- specification-driven coding;
- cross-layer debugging;
- SQL;
- API;
- full-stack integration;
- testing discipline.

## 15.7. Confidentiality

Không đưa vào portfolio public:

- customer names nếu bị hạn chế;
- private endpoints;
- internal schema;
- credentials;
- proprietary business rules.

---

# 16. SMA — SmartManagerAuto

## 16.1. Định danh

- **Tên:** SmartManagerAuto.
- **Mục tiêu:** quản trị trung tâm luyện thi.
- **Mốc ghi nhận:** 08/2026.
- **Repository public:** chưa xác minh.
- **Demo:** chưa xác minh.

## 16.2. Công nghệ

- FastAPI.
- Vue.js.
- Relational backend architecture.

## 16.3. Chức năng từng được xác định

- Admin.
- CRUD trung tâm.
- Subscription/package.
- Notification.
- Account management.
- Revenue.
- Permission.

## 16.4. Các đầu việc Hùng đã làm

Theo context project:

- Thiết kế chức năng.
- Thiết kế backend FastAPI.
- Thiết kế Vue frontend.
- Phân quyền.
- Account management.
- Revenue management.
- CRUD architecture.

## 16.5. Evidence caveat

Do chưa tìm được repository public tương ứng trong account hiện tại, tài liệu không tự suy ra:

- database implementation cụ thể;
- CI/CD;
- deployment;
- production status.

---

# 17. My_Courses

## 17.1. Định danh

- **Repository:** https://github.com/daovanhung-dev/My_Courses

## 17.2. Trạng thái

Repository hiện **empty** theo GitHub repository content API.

Do đó chưa có bằng chứng để trích xuất:

- product scope;
- technology;
- architecture;
- feature;
- implementation.

Không nên đưa repo này thành một project hoàn chỉnh trong CV ở trạng thái hiện tại.

---

# 18. Repository Inventory

Tại thời điểm rà soát, tài khoản GitHub `daovanhung-dev` có 12 public repositories được tìm thấy:

| Repository | Nội dung |
|---|---|
| `NanoBioAI` | HealthTech mobile + admin + backend/data/AI |
| `nanobioai-privacy` | Trust/compliance static site |
| `Study2Work` | Polyglot Study + Work platform |
| `HVC_EDU` | Angular + Supabase education operations |
| `HVC_EDU_NEW` | Vue + Supabase implementation |
| `edu_hvc` | FastAPI + Vue full-stack center management |
| `LabVnua` | Flutter academic companion |
| `Learn2Earn` | Career platform monorepo |
| `Nihongo-Learning-System` | Japanese learning system design/development |
| `hung-quynh-our-story` | Interactive Angular static experience |
| `portfolio` | Engineering portfolio |
| `My_Courses` | Empty repository |

---

# 19. Demo / Live URL Inventory

## Portfolio

- https://daovanhung-dev.github.io/portfolio/

## NanoBio

- Admin: https://daovanhung-dev.github.io/NanoBioAI/
- Trust Center: https://daovanhung-dev.github.io/nanobioai-privacy/
- Privacy Policy: https://daovanhung-dev.github.io/nanobioai-privacy/privacy-policy.html

## Hùng Cường

- Angular: https://daovanhung-dev.github.io/HVC_EDU/
- Vue: https://daovanhung-dev.github.io/HVC_EDU_NEW/

## Hung & Quynh

- https://daovanhung-dev.github.io/hung-quynh-our-story/

## Chưa có demo public được xác minh

- Study2Work.
- LabVnua.
- Learn2Earn.
- Nihongo Learning System.
- edu_hvc.
- VentureX / LinguaSphere.
- FPT.
- SMA.
- My_Courses.

> Các URL live phía trên được lấy từ cấu hình/dữ liệu portfolio hiện tại. Availability thực tế có thể thay đổi theo GitHub Pages/deployment state.

---

# 20. Technology Matrix

| Dự án | Frontend | Backend | Database | AI | Infra / Delivery |
|---|---|---|---|---|---|
| NanoBio | Flutter, React Admin | Supabase Edge Functions | SQLite, PostgreSQL | Gemini | GitHub Actions, Pages, Android |
| Study2Work | Vue 3, React | FastAPI, NestJS/Fastify | PostgreSQL, Redis | ai-server module | Docker Compose, MinIO, Mailhog |
| HVC Angular | Angular | Supabase Edge Functions/RPC | PostgreSQL | — | GitHub Pages |
| HVC Vue/Supabase | Vue, Pinia | Supabase | PostgreSQL | — | Deno scripts, Pages |
| edu_hvc | Vue, Pinia | FastAPI | PostgreSQL | — | Docker Compose |
| LabVnua | Flutter | VNUA API + Supabase | SQLite + Supabase | Gemini | Mobile build |
| Learn2Earn | EJS + Flutter | Express | MySQL + SQLite/Supabase clients | — | Monorepo |
| Nihongo | Angular | Supabase Edge Functions | PostgreSQL | Gemini | GitHub Pages |
| Hung & Quynh | Angular | Static | Static generated data | — | Playwright, Sharp, Pages |
| Portfolio | Vanilla TypeScript | Static | Typed source data | — | GitHub Actions, Pages |
| VentureX | Design scope | API design | Data modeling | AI LMS concept | Architecture |
| FPT | Vue | Flask | PostgreSQL | — | Docker, GitLab |
| SMA | Vue | FastAPI | relational | — | chưa xác minh |

---

# 21. Architecture Patterns Hùng đã thực tế sử dụng

## 21.1. Feature-first Mobile Architecture

Dự án:

- NanoBio.
- LabVnua.

Pattern:

```text
Feature
├── Screen
├── State / Controller
├── Service / Repository
├── Model
└── Data source
```

---

## 21.2. Local-first Architecture

Dự án:

- NanoBio.
- LabVnua ở mức cache/offline support.

Pattern:

```text
UI
 ↕
Local State
 ↕
SQLite
 ↕
Sync Boundary
 ↕
Cloud
```

Các vấn đề đã xử lý:

- ownership;
- identity;
- merge;
- sync;
- fallback;
- offline behavior.

---

## 21.3. Contract-first / Documentation-driven Architecture

Dự án:

- Study2Work.
- VentureX.
- FPT ở mức enterprise spec-driven.

Artifacts:

- BD.
- DD.
- OpenAPI.
- business code.
- request/response contract.
- event schema.
- validation.
- error contract.
- diagrams.

---

## 21.4. BaaS / Serverless Architecture

Dự án:

- HVC_EDU.
- HVC_EDU_NEW.
- Nihongo.
- NanoBio một phần.

Pattern:

```text
SPA/Mobile
   ↓
Supabase Auth
   ↓
Edge Function / RPC
   ↓
PostgreSQL + RLS
```

---

## 21.5. Traditional REST Full-stack

Dự án:

- edu_hvc.
- Learn2Earn.
- FPT.
- Study2Work Study API.

Pattern:

```text
Frontend
   ↓
REST API
   ↓
Service / Business Logic
   ↓
Database
```

---

## 21.6. Transaction Boundary

Nổi bật ở Hùng Cường.

```text
Frontend
   ↓
Server-side mutation
   ↓
Transaction
   ↓
PostgreSQL
```

Không để frontend tự tính authoritative business finance.

---

## 21.7. Security Boundary Thinking

Các ví dụ:

### NanoBio

- AI key ở Edge Function.
- Admin trusted role.
- RPC/RLS/Storage permission.

### HVC

- RLS.
- Edge Function mutation.
- Tenant guards.
- Root control-plane.
- Short-lived opaque session.
- PBKDF2 secret storage.

### Nihongo

- Browser only gets public Supabase values.
- Gemini secret server-side.
- Canonical database wins over AI output.

---

## 21.8. CI/CD and Quality Gates

Dự án thể hiện rõ:

- Portfolio.
- HVC.
- NanoBio admin.
- Hung & Quynh.

Typical pipeline:

```text
Install
  ↓
Typecheck
  ↓
Unit Test
  ↓
Domain Validation
  ↓
Build
  ↓
Artifact Verification
  ↓
Deploy
```

---

# 22. Các đầu việc kỹ thuật xuyên suốt toàn bộ dự án

## Product / Business Analysis

- Requirement analysis.
- Business Design.
- Workflow mapping.
- Role/actor design.
- Permission.
- Acceptance Criteria.
- Domain modeling.

## System Design

- Architecture.
- Module decomposition.
- Service boundaries.
- Data flow.
- API contracts.
- Event contracts.
- Error contract.
- Traceability.

## Backend

- FastAPI.
- Flask.
- NestJS/Fastify.
- Express.
- REST API.
- Authentication.
- Authorization.
- JWT.
- RPC.
- Edge Functions.

## Frontend

- Vue.
- React.
- Angular.
- Vanilla TypeScript.
- Responsive UI.
- State management.
- Routing.
- API integration.

## Mobile

- Flutter.
- Dart.
- Routing.
- Local DB.
- Background tasks.
- Notifications.
- Deep Link.
- QR.
- Android builds.

## Database

- PostgreSQL.
- MySQL.
- SQLite.
- Raw SQL.
- ORM.
- Migrations.
- Transactions.
- RLS.
- Index/constraint-oriented design.
- Sync.

## AI

- Gemini.
- AI assistant.
- Structured output.
- Prompt contracts.
- Validation.
- Edge Function proxy.
- AI fallback.
- AI learning/health flows.

## DevOps / Delivery

- Docker.
- Docker Compose.
- GitHub Actions.
- GitLab.
- GitHub Pages.
- Supabase CLI.
- Android APK/AAB.
- Build/runtime debugging.

## Testing / Quality

- pytest.
- Flutter test.
- Vitest.
- Playwright.
- Typecheck.
- Integration tests.
- Artifact verification.
- Regression testing.
- Source/docs validation.

## Leadership

- Task breakdown.
- Team coordination.
- Code/implementation review.
- Blocker resolution.
- Architecture decision.
- Technical ownership.

---

# 23. Năng lực được chứng minh bằng từng project

| Năng lực | Project evidence mạnh |
|---|---|
| Flutter | NanoBio, LabVnua |
| Local-first | NanoBio |
| Mobile architecture | NanoBio, LabVnua |
| FastAPI | Study2Work, edu_hvc, SMA |
| Flask | FPT |
| Node/Express | Learn2Earn |
| NestJS/Fastify | Study2Work |
| Vue | Study2Work, edu_hvc, HVC_EDU_NEW, FPT |
| React | Study2Work Work, NanoBio Admin |
| Angular | HVC_EDU, Nihongo, Hung & Quynh |
| PostgreSQL | Study2Work, HVC, FPT, NanoBio/Supabase |
| SQLite | NanoBio, LabVnua, Learn2Earn mobile |
| Supabase | NanoBio, HVC, Nihongo, LabVnua chat |
| RLS | HVC, Nihongo, NanoBio |
| Edge Functions | NanoBio, HVC, Nihongo |
| AI integration | NanoBio, LabVnua, Nihongo |
| Architecture | Study2Work, NanoBio, VentureX |
| API design | Study2Work, VentureX, FPT |
| Security boundary | HVC, NanoBio, Nihongo |
| CI/CD | Portfolio, HVC, NanoBio Admin, Hung & Quynh |
| Android release | NanoBio |
| Team Lead | LabVnua |
| Tech Lead/System Analysis | VentureX |
| Business operations software | Hùng Cường |
| Frontend craftsmanship | Hung & Quynh |
| Enterprise engineering | FPT |

---

# 24. Top project nên ưu tiên trên Portfolio

## Tier A — Core Engineering Evidence

### 1. NanoBio

Vì chứng minh đồng thời:

- mobile;
- local-first;
- cloud;
- AI;
- security boundary;
- admin;
- Android release.

### 2. Study2Work

Vì chứng minh:

- system architecture;
- polyglot monorepo;
- contracts;
- backend;
- frontend;
- infrastructure.

### 3. Hùng Cường Management

Vì chứng minh:

- real business domain;
- multiple architectures;
- transaction;
- RLS;
- server-side authorization;
- operations automation.

### 4. LabVnua

Vì chứng minh:

- Flutter team leadership;
- academic API integration;
- local data;
- realtime;
- AI.

## Tier B — Specialized Evidence

### Nihongo

- Product/System Design.
- Learning engine.
- AI architecture.
- SRS/domain complexity.

### Learn2Earn

- Backend foundation.
- Node/Express/Prisma/MySQL.
- Career workflows.

### Hung & Quynh

- UI/frontend craftsmanship.
- Media pipeline.
- E2E.
- Accessibility.

## Tier C — Supporting

### Portfolio

- Engineering presentation / quality pipeline.

### Trust Center

- Product delivery / compliance awareness.

### SMA

- Additional FastAPI/Vue project.

---

# 25. Portfolio-ready one-line descriptions

## NanoBio

> Local-first AI health companion built with Flutter, SQLite and Supabase, combining personalized health planning, cloud sync, Gemini-backed AI, admin tooling and Android release engineering.

## Study2Work

> Contract-first polyglot EdTech/HRTech monorepo combining FastAPI/Vue for learning workflows and NestJS/Fastify/React for career and recruitment workflows.

## Hùng Cường

> Education operations platform implemented across FastAPI/Vue and Supabase-based Angular/Vue architectures, covering classes, attendance, staff, finance, RBAC and transactional business workflows.

## LabVnua / EduAI

> Flutter academic companion for VNUA students with academic APIs, SQLite caching, background sync, realtime chat, QR, notifications and AI assistant integration.

## Learn2Earn

> Career platform for students and businesses with Node.js/Express/Prisma backend and Flutter clients covering jobs, CVs, applications, candidates, chat and notifications.

## Nihongo Learning System

> Japanese learning system designed around SRS, learning-event evidence, JLPT-oriented content and Gemini-backed AI practice using Angular and Supabase.

## Hung & Quynh

> Interactive Angular storytelling experience with responsive animation, optimized media pipeline, accessibility, Playwright E2E and GitHub Pages delivery.

---

# 26. Những claim cần giữ chính xác khi dùng CV/Portfolio

## NanoBio

Nên nói:

- Local-first.
- AI via Edge Functions.
- Admin surface.
- Android release.
- Một số V2/V3 features partial/planned.

Không nên nói toàn bộ feature đã production-ready.

## Study2Work

Nên nói:

- Active development.
- Architecture/contract-heavy.
- Study + Work independent deployables.

Không nên nói production platform nếu chưa có deployment evidence.

## HVC

Nên tách implementation:

- Angular/Supabase minimal operational scope.
- Vue/Supabase implementation.
- FastAPI/Vue richer finance/month-closing architecture.

Không gộp tất cả feature vào bản Angular.

## Nihongo

Nên nói:

- Product/System Design.
- Architecture.
- Development scaffold.
- 38 Stitch screens.

Không nói full production app.

## FPT

Nên giữ confidential.

## VentureX

Nên mô tả architecture/system analysis, không claim public production.

---

# 27. Kết luận về profile dự án

Các project hiện tại cho thấy Hùng không còn chỉ nằm ở profile:

```text
"Full-stack CRUD Developer"
```

Mà evidence đang trải rộng qua:

```text
Product Analysis
     ↓
Business Design
     ↓
System Architecture
     ↓
Database Design
     ↓
Backend
     ↓
Frontend / Mobile
     ↓
AI Integration
     ↓
Security Boundary
     ↓
Testing
     ↓
CI/CD
     ↓
Release
     ↓
Operations
     ↓
Technical Leadership
```

Ba trục năng lực mạnh nhất từ project evidence hiện tại:

## A. Full-stack / Architecture

- Study2Work.
- Hùng Cường.
- Learn2Earn.
- FPT.

## B. Mobile / AI / Product Engineering

- NanoBio.
- LabVnua.

## C. System Analysis / Leadership

- VentureX.
- Study2Work.
- VNUA.
- Hùng Cường.

Đây là nền tảng phù hợp để tiếp tục chuyển dịch sang:

```text
Full-stack Engineering
        +
System Architecture
        +
Linux / Infrastructure
        +
Security Engineering
        ↓
Cybersecurity Professional
```

---

# 28. Canonical Links

## GitHub profile

https://github.com/daovanhung-dev

## Portfolio

- Repo: https://github.com/daovanhung-dev/portfolio
- Live: https://daovanhung-dev.github.io/portfolio/

## NanoBio

- Repo: https://github.com/daovanhung-dev/NanoBioAI
- Admin Live: https://daovanhung-dev.github.io/NanoBioAI/
- Trust Repo: https://github.com/daovanhung-dev/nanobioai-privacy
- Trust Center: https://daovanhung-dev.github.io/nanobioai-privacy/
- Privacy: https://daovanhung-dev.github.io/nanobioai-privacy/privacy-policy.html

## Study2Work

- Repo: https://github.com/daovanhung-dev/Study2Work

## Hùng Cường

- Angular Repo: https://github.com/daovanhung-dev/HVC_EDU
- Angular Live: https://daovanhung-dev.github.io/HVC_EDU/
- Vue/Supabase Repo: https://github.com/daovanhung-dev/HVC_EDU_NEW
- Vue/Supabase Live: https://daovanhung-dev.github.io/HVC_EDU_NEW/
- FastAPI/Vue Repo: https://github.com/daovanhung-dev/edu_hvc

## LabVnua

- Repo: https://github.com/daovanhung-dev/LabVnua

## Learn2Earn

- Repo: https://github.com/daovanhung-dev/Learn2Earn

## Nihongo

- Repo: https://github.com/daovanhung-dev/Nihongo-Learning-System

## Hung & Quynh

- Repo: https://github.com/daovanhung-dev/hung-quynh-our-story
- Live: https://daovanhung-dev.github.io/hung-quynh-our-story/

## My_Courses

- Repo: https://github.com/daovanhung-dev/My_Courses

---

# 29. Ghi chú cuối

Tài liệu này được viết theo nguyên tắc **evidence-first**:

- Không invent demo.
- Không invent production users.
- Không claim feature chưa implemented.
- Không đưa credential/API key/password/token vào tài liệu.
- Không coi một README cũ là chính xác hơn source tree hiện tại.
- Không trộn các thế hệ architecture của Hùng Cường thành một implementation duy nhất.
- Không biến project private thành project public.
- Không biến architecture/design work thành “production deployment” nếu chưa có bằng chứng.

Khi dùng file này để build Portfolio/CV, mỗi claim kỹ thuật nên map về ít nhất một project cụ thể ở trên.
