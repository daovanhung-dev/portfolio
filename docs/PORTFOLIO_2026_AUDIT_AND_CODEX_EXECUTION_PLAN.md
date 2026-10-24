# PORTFOLIO 2026 — AUDIT & CODEX EXECUTION PLAN

**Chủ sở hữu:** Đào Văn Hùng  
**Ngày lập:** 24/10/2026 (Asia/Bangkok)  
**Portfolio:** https://github.com/daovanhung-dev/portfolio  
**Mục tiêu:** Portfolio công khai phản ánh chính xác, có bằng chứng, đầy đủ nhưng dễ đọc về kinh nghiệm Full-stack, Backend, Flutter, System Analysis, QA, AI Engineering, DevOps/Infrastructure, Networking, Security Lab, IoT và sản phẩm thực tế.

> **Phạm vi đã xác minh trong lần nghiên cứu này:** liệt kê 16 repo trên GitHub, đọc mã/data/README/validator/tests của portfolio, đọc README/manifest chính của nhiều repo, xem danh sách commit trên nhánh mặc định từ 24/08 đến 24/10/2026 (UTC; lần audit bằng Codex sẽ chuyển sang mốc giờ +07 chính xác) và so sánh thay đổi tập tin một số repo. **Chưa phải kiểm toán trọn mọi file và mọi commit trên mọi nhánh.** GitHub compare giới hạn danh sách ở 300 file trong các repo lớn; Codex thực thi plan phải hoàn tất kiểm toán không giới hạn bằng `git log --all` + diff theo package. Không được gọi số commit trên fork là số đóng góp do người dùng tự làm.

---

## 1. Executive decision & ground rules

1. **Giữ kiến trúc hiện tại**, Vite + vanilla TypeScript, typed data, CSS semantic, Vitest và GitHub Pages. Chỉ đổi framework khi có ADR chứng minh lợi ích vượt chi phí và regression. Đây là task **content-first, evidence-first**, không phải viết lại web chỉ để đổi stack.
2. Tách **bằng chứng** thành: `verified-source`, `verified-runtime`, `user-attested`, `documentation/design-only`, `learning/lab`, `unverified`. Tách **tình trạng** thành: `implemented`, `partial`, `placeholder`, `source-only`, `design`, `deployed-verified`, `archived`; trạng thái phải gắn **ngày chụp/commit**.
3. Repository là bằng chứng có source; README/commit message không tự chứng minh runtime, end-to-end deployment, số người dùng, độ chính xác, vận hành production, hay đóng góp vào upstream.
4. Bảo mật: không đưa thông tin khách hàng FPT, source/schema/endpoint nội bộ, thông tin học sinh/giáo viên/phụ huynh, dữ liệu y tế, private media hoặc secret/token/API key vào public web. Hạn chế công khai ngày sinh, địa chỉ, thu nhập, thông tin cá nhân gia đình. Website tình cảm chỉ trưng kỹ thuật khi không làm lộ ảnh/thông tin riêng tư.
5. Vai trò hiện tại: FPT **Full-stack Fresher từ 07/2026 đến nay**; giai đoạn Intern riêng **16/03/2026–07/2026**. NanoBio Full-stack/Technical Owner từ 10/05/2026; VNUA Flutter Team Lead từ 11/2025; VentureX gắn nhãn design; Hùng Cường vừa là vận hành domain thực vừa developer. Không tự xưng Senior, Architect theo cấp bậc hay Pentester chuyên nghiệp.
6. Mọi nhận định có `sourceRefs[]`, `verifiedAt`, `evidenceLevel` và `limitations`; nếu chứng cứ mâu thuẫn, đánh dấu `needs-review`, không tự lựa chọn bản có vẻ hay hơn.

## 2. Inventory 16 repository & hoạt động trong cửa sổ khảo sát

Thống kê sau là **số commit được truy vấn trên default branch qua API `commits?since=2026-08-24T00:00:00Z&until=2026-10-24T23:59:59Z` (UTC)**; không phản ánh tất cả branch và có thể chứa commit của cộng đồng/đồng đội. Tổng trong cửa sổ default-branch: **406** (gồm cả upstream trên repo fork). `0` là không tìm thấy commit trong cửa sổ trên nhánh mặc định, không có nghĩa không có kinh nghiệm ở repo đó.

| Repository | Commit | Dấu vết công nghệ / thay đổi cần nghiên cứu | Hướng portfolio |
|---|---:|---|---|
| `NanoBioAI` | 66 | Flutter; local GGUF/llamadart theo README hiện hành; SQLite/Supabase; mới thêm `backend/` FastAPI/PostgreSQL/SQLAlchemy/Alembic; `iot/`; meal catalog, notifications, phone auth, Android Play release | **P0 flagship:** app, local AI, backend, release; phân biệt runtime source và real deployment |
| `Study2Work` | 74 | 8 deployable mô tả trong README; Study FastAPI/Vue; Work Express/React/Flutter; AI FastAPI/Ollama; DB Admin Angular/FastAPI; contract/docs/error handling/JWT | **P0 flagship:** cập nhật package hiện hành, các blocker, không claim production |
| `HVC_EDU_NEW` | 86 | Vue 3/TS/Pinia; Supabase Edge Functions/RPC/migrations/test/CI; README hiện hành **loại khỏi active scope các flow ClassMonth/kế toán cũ** | **P0 flagship:** role, attendance, timesheet, học vụ; tách historical khỏi current |
| `HVC_EDU` | 23 | Angular/Supabase; teacher/class flow, month setup, idempotency, audit/role | **P1:** bản triển khai Angular với scope và thời điểm riêng |
| `edu_hvc` | 0 | FastAPI + PostgreSQL; dự án cũ, vẫn hữu ích cho backend/domain/transaction | **P1:** historical implementation, không gán tính năng Vue về bản này |
| `LabVnua` (`develop`) | 0 | Flutter, local cache, học vụ, realtime/AI (theo README/context); không có commit mới trong cửa sổ default branch | **P1:** leadership + kỹ thuật; xem tất cả branch, không suy luận inactive tuyệt đối |
| `hung-quynh-our-story` | 41 | Angular/TypeScript; Phaser/Three.js; Blender assets; interactive 3D house, Playwright, media pipeline | **P1:** case frontend/3D có kiểm soát riêng tư |
| `xiaozhi-esp32` | 83 | **Fork của `78/xiaozhi-esp32`**; ESP-IDF/C++, board OSTB XiaoZhi 3ST | **P1:** chỉ claim phần thay đổi riêng của Hùng sau diff với upstream; lab vs production |
| `nanobioai-privacy` | 2 | Privacy, data-safety, account deletion, health AI disclosure | **P1:** compliance/release artifacts, không giả nhận legal certification |
| `Nihongo-Learning-System` | 2 | Angular/Supabase/Gemini; 38 Stitch design screens, scaffold/docs | **P2:** design/prototype, không claim fully released |
| `Learn2Earn` | 0 | Node/Express/TypeScript/Prisma/MySQL, mobile/web | **P1:** historical backend experience |
| `My_Courses` | — | Git repository **trống**, API trả 409 | **Không làm project card** nếu không có code/evidence |
| `vogiaVocabulary` | 10 | Angular/Supabase, anonymous auth, import đa ngôn ngữ, dictionary integration, tests | **P1 mới:** app từ 09/2026, demo chỉ khi xác minh |
| `ai_local` | 2 | Flutter, local GGUF, tải model, streaming, local persistence; Android/iOS paths | **P1 mới:** mobile local AI, **không** claim <500ms nếu chưa benchmark |
| `QTM` | 11 | Web tĩnh đọc quiz Markdown, random, lưu tiến độ, export results | **P2 mới:** tool học tập, evidence giản dị, đúng chức năng |
| `portfolio` | 6 | Vite + TS; typed data; validation/test/Pages | **P0:** sửa chính portfolio và bổ sung content đã lệch |

**Lưu ý số liệu:** Fork XiaoZhi mới được tạo 17/10/2026 nhưng 83 commit hiển thị theo lịch sử upstream, không phải 83 commit Hùng tự tạo. Cần `git merge-base`/`git log upstream/main..HEAD` và `git blame` trên board riêng trước khi nhận credit. Một số repo có `pushed_at` khác với ngày commit cuối, ví dụ Study2Work; cần kiểm tra nhánh/tag/force pushes.

## 3. Gap analysis thực tế của `portfolio` tại commit `a99fac9d6dd769e2a4b2b31f4eead9629f00faf0`

| ID | Ưu tiên | Có gì trong source portfolio | Lỗ hổng / nhiệm vụ sửa | Tiêu chí nghiệm thu |
|---|---|---|---|---|
| GAP-01 | P0 | `src/main.ts` mount Timeline, Projects, Contact; có file `CapabilityMatrix.ts`, `CaseStudies.ts`, `DirectionSections.ts`, `LiveProductCard.ts` | Các section quan trọng **không được render ở trang chính**; test còn kiểm tra `#capabilities/#cases/#live-products` là null | Có link điều hướng thật, section năng lực/case/live, E2E keyboard/mobile |
| GAP-02 | P0 | `src/data/capabilities.ts` | `evidenceExperienceIds` tham chiếu `learn2earn-part-time`, `vnua-lead` nhưng IDs trong timeline là `maiatech-learn2earn`, `vnua-innovation` | Zero dangling refs; validator nhận diện mọi mapping lỗi |
| GAP-03 | P0 | `src/data/projects.ts`: 10 projects; tests hardcode thứ tự và số lượng; `experience.ts`: 8 entries | Data model/test khóa cứng số project/timeline cũ, khó mở rộng 16 repo và specialized experience | Bỏ count hardcoding; schema/content manifest điều khiển; test invariant thay số cứng |
| GAP-04 | P0 | NanoBio: Edge Function → Gemini, Android build chung | README NanoBio hiện mô tả **local on-device AI bằng `llamadart`**, và `backend/` self-hosted FastAPI được thêm 22/10. Portfolio chưa phản ánh thay đổi | Tách current/historical AI, scope local inference và backend foundation; không claim production nếu chưa deploy verified |
| GAP-05 | P0 | Study2Work mô tả Work API NestJS/Fastify | README repo hiện ghi Work API **Express 4**, 8 deployable, Mobile dùng direct Neon/Gemini prototype, Study API chỉ có một số endpoints wired; root manifests có blocker | Cập nhật kiến trúc theo package/source; ghi direct credential risk và blocker, tránh claim all running |
| GAP-06 | P0 | HVC product ghi ClassMonth, payroll, accounting như scope rộng hiện tại | README HVC_EDU_NEW hiện hành nói quản lý lớp/học sinh/lịch/buổi/điểm danh; finance/ClassMonth cũ historical | Timeline tiến hóa 3 implementations với trạng thái per version; không trộn đặc tính lịch sử và hiện hành |
| GAP-07 | P0 | `case-studies.ts`: 7 cases ở dạng problem/flow/takeaway | Thiếu case chuyên sâu có architecture diagram, decisions/tradeoffs, test evidence, failure, outcome, timeline và limitations | 6–10 long-form case studies có commit/file references và “what I actually did” |
| GAP-08 | P1 | Không có project chuyên biệt `ai_local`, `vogiaVocabulary`, `QTM`, ESP32/XiaoZhi; thiếu NanoBio self-host backend | Mất bằng chứng mới về Flutter local LLM, Angular, ESP-IDF/C++, protocol/hardware, quiz/parser | Có nội dung cấp project hoặc lab phù hợp + evidence + link, không làm lộ riêng tư |
| GAP-09 | P1 | `securityFoundation`, `securityDirection` nằm trong profile | Networking, Ubuntu/Debian/SSH, routing/DHCP/NAT/CGNAT, TCP/IP/OSI, Cisco Packet Tracer, Nmap LAN, security lab, Linux tools thiếu **case training** | Labs riêng, tình trạng `learning/lab`, không tự gọi pentest thực tế/production |
| GAP-10 | P1 | `aiWorkflow` chỉ là mảng từ khóa | Thiếu workflow AI agent với source-of-truth → BD/DD → code → review → testing → fixbug → handoff, context engineering, review guardrails | Workflow diagram + 1–2 case có before/after và tests; không claim AI tự làm mà không review |
| GAP-11 | P1 | `education.ts` có GPA 2.72, 94 TC và IELTS `~4.5` | GPA đã khớp mốc 27/08; IELTS cần nhãn tự đánh giá/chứng chỉ xác thực; profile nên nêu ngày xác nhận và tránh giả định | Ghi “GPA 2.72/4, 94 TC — cập nhật 27/08/2026”; IELTS phân loại chứng chỉ vs self-report |
| GAP-12 | P1 | `experience.ts` có Intern & Fresher đúng chiều, 10/11 cho VNUA | FPT Fresher 07/2026–nay đúng, **không ghi kết thúc 10/2026**; VNUA 10/11 vs 12/11 cần đối chiếu; dự án private phải public-safe | Role/timing có nguồn, không đảo thời gian; các mốc uncertain có note rõ |
| GAP-13 | P1 | `LiveProduct` đều `status: LIVE` | LIVE URL không chứng minh workflow hoàn chỉnh/verified production; GitHub Pages static ≠ full backend production | `availability` riêng với `featureCompleteness`; link check/HTTP response và smoke test;
| GAP-14 | P1 | Source types và validator có nhãn trạng thái/level chưa đồng nhất | Heterogeneous status, không enforce `evidenceExperienceIds` cho capabilities, không track source snapshots, validation keyword-based | Typed domain schema, cross-ref validation, secrets/PII checks, content snapshots, generated nav |
| GAP-15 | P2 | Responsive theme/reveal hiện có | Cần đo thực tế keyboard/screen-reader, contrast, perf, SEO, social preview, canonical, structured data, downloadable CV | WCAG 2.2 AA mục tiêu; mobile/desktop Lighthouse và link audits có kết quả |

**Chưa xác minh bằng runtime tại thời điểm viết:** build/test của tất cả 16 repo, live website hoạt động trên mọi tuyến, production Supabase, Android/iOS store release, người dùng pilot và các chỉ số latency. Codex phải chạy/sưu tầm evidence thực tế và gắn `UNVERIFIED` nếu chưa thể chạy.

## 4. Nội dung chuyên nghiệp cần phản ánh

**Positioning đề xuất:** “Full-stack Software Developer | Python Backend, Flutter & Systems Design” với phần bổ trợ “AI-integrated Software, DevOps/Infrastructure Labs & Security Foundations”. Định vị trình độ **Fresher/Junior có chiều sâu đa mảng**, không tự thổi thành Senior/Lead doanh nghiệp lớn. Kinh nghiệm Tech Lead dự án nhỏ phải có scope rõ.

### Career timeline (source người dùng + PDF 17/07/2026 + đối chiếu portfolio)

- **FPT Software**: Full-stack Developer Intern 16/03/2026–07/2026, **Full-stack Fresher 07/2026–hiện tại**. Enterprise software, Python/Flask, Vue, PostgreSQL, raw SQL, 6 REST APIs + 2 business screens (số liệu self-report), BD/DD/UTC/UTR/ITR, bug fixing, regression, GitLab/Docker. Không mô tả nghiệp vụ/dữ liệu khách hàng.
- **NamiAI/NanoBio**: từ 10/05/2026; app Flutter/SQLite local-first, Supabase Auth/data sync; local inference theo source hiện tại, AI historical Gemini theo source/commit; self-hosted FastAPI foundation tại `backend/` cần tách trạng thái; Android APK/AAB/Google Play closed testing: **bắt đầu quy trình phát hành từ 09/2026**, không claim app đã public approved; pilot ~100 **tự báo cáo, chưa có analytics**.
- **VNUA Innovation Center / LabVnua**: từ 11/2025 đến nay; nhóm Flutter khoảng 6 thành viên; feature/task/code review, học vụ, SQLite/offline, API/AI/realtime. Mốc ngày chính xác 10 hay 12/11 cần chứng cứ.
- **VentureX/VinUniversity — LinguaSphere**: Tech Lead/System Analyst/API Designer ở scope **thiết kế**: phân rã ~16 modules, RBAC/ownership, API DD, validation/error contracts/audit/tracing, không nhận production project.
- **MAIATECH/Learn2Earn**: 09/09/2025–05/03/2026 theo timeline repo portfolio; Node/Express/TS/Prisma/MySQL, auth/job flow; đối chiếu hồ sơ nhân sự nếu công khai chính xác ngày.
- **Hùng Cường**: từ 07/2026 đến nay; Founder/Operator/Developer, chuyển domain trung tâm giáo dục thành hệ thống. 3 implementation `edu_hvc`, `HVC_EDU`, `HVC_EDU_NEW`. Không đăng danh sách học sinh/số tiền/nhân sự.
- **Study2Work**: personal/team project, Backend/System Designer, nhiều deployable và contracts; state active-development có blocker.

### Technical domains (mỗi domain ít nhất 1 bằng chứng)

1. **BA / SA:** requirement → BD/DD/API DD, actors, use case, ERD, class/sequence, data dictionary, error catalog, ownership, traceability.
2. **Backend & API:** Python Flask/FastAPI, Node/Express; REST, auth/JWT/refresh, validation, error handling, SQL/Alembic/ORM, migration, PostgreSQL, transactions.
3. **Frontend:** Vue/Angular/React theo project; TypeScript, forms/state/router, static deploy, responsive/a11y/3D UI.
4. **Flutter / Mobile:** Riverpod, GoRouter, SQLite/offline, Supabase auth/deeplink/sync, notifications, Android build/release; local GGUF/inference thực hành.
5. **Testing/QA:** positive/negative/boundary, API test/UTC/UTR/ITR, repro–root cause–minimal fix–regression, Vitest/Playwright/pytest có reference.
6. **AI integration/agent:** Gemini historical, Ollama/Qwen, llama.cpp/GGUF/llamadart actual source where verified; structured output/retry/fallback; Codex/Claude/ChatGPT cho controlled coding, source-of-truth, test/review.
7. **DevOps/SRE foundation:** Docker/Compose, GitLab/GitHub Actions, GitHub Pages, Debian/Ubuntu server, CLI/systemd/SSH/DB/service logs/backup planning; tách *configured*, *tested in LAN*, *internet-facing verified*.
8. **Networking/security lab:** OSI/TCP-IP, packet flow, DHCP/router/default gateway, NAT/CGNAT, Packet Tracer/Nmap, Linux network, OWASP/WSTG study; **lab practice, not professional pentest**.
9. **IoT/Embedded:** ESP32-S3 OSTB/XiaoZhi 3ST, ESP-IDF, UART/flash/monitor/audio/display/protocol source; fork upstream ownership audit bắt buộc.
10. **Product & leadership:** Flutter 6-person coordination, technical ownership, requirement-to-release, center operations/domain discovery, communication.

### Case study bắt buộc (ưu tiên 6–10 trang riêng)

- FPT: cross-layer enterprise defect resolution (public-safe, process not customer data).
- NanoBio: SQLite–Supabase local/cloud consistency, auth/ownership/RPC; cập nhật AI migration từ remote → on-device **nếu commit/source xác minh rõ**.
- NanoBio: FastAPI self-hosted foundation: domain boundaries, PostgreSQL/Alembic, health endpoints, tests, deployment **planned vs executed**.
- Study2Work: polyglot boundaries, contract-first, JWT/refresh & error handling; nêu blocker và giải pháp cải thiện.
- HVC: domain evolution `edu_hvc` → Angular → Vue; data migration, RLS, Edge Function, attendance; tách features historical.
- AI Local: GGUF on-device download/checksum, streaming/persistence; benchmark `unverified` cho tới khi đo thiết bị.
- Our Story: interactive 3D + Blender + performance/Playwright, tuyệt đối không lộ ảnh/địa chỉ/lời riêng.
- IoT: board bring-up, serial `ttyACM0`, ESP-IDF flashed firmware vs repo fork content; không claim upstream work.
- Ubuntu Server: static LAN IP, SSH, PostgreSQL, service/systemd, WAN/NAT/CGNAT troubleshooting; nêu **thực hành** vs internet production.
- AI-assisted engineering: một thay đổi thực từ source-of-truth → plan → patch → test → review.

## 5. Information architecture đề xuất (hai tầng)

**Tầng tuyển dụng (60–90 giây):** Hero, định vị, 4–6 proof points, Career Timeline, 4–6 Featured Engineering Projects, Skills by Evidence, Contact/CV. Đừng dồn mọi repo vào trang chủ.

**Tầng chuyên sâu:** `/experience`, `/projects`, `/projects/:slug` hoặc đường dẫn static an toàn cho GitHub Pages, `/case-studies/:slug`, `/capabilities`, `/labs` (Network/Linux/Security/IoT), `/engineering-process`, `/about`, `/resume`, `/contact`. Có thể dùng hash route nếu giữ vanilla SPA; bảo đảm refresh/deep-link hoạt động.

**Project detail template:** Problem / Context → Role & Team → Scope & Dates → Requirements → Architecture Diagram → Stack linked to code → Features with implementation status → My Contributions → Decisions/Trade-offs → Testing/Evidence → Results (measured only) → Limitations → Repo/demo links (if allowed) → UpdatedAt snapshot.

**Capabilities:** gom theo Backend, Web, Flutter, Data, BA/SA, QA, AI, DevOps, Infra/Networking, AppSec/Lab, IoT, Leadership. Mỗi skill link về ít nhất một case/project/experience + mã nguồn hoặc tài liệu rõ.

**Recruiter usability:** tiếng Việt chuẩn, English tùy nội dung có biên tập riêng; PDF CV tải được (nếu CV đã được duyệt), in/print-friendly; search/filter theo domain, stack và status; không dùng progress bar % kỹ năng tự đặt; tránh card rỗng/placeholder.

## 6. Data contracts và source-of-truth

Tách ít nhất các entity có schema ở `src/data/` hoặc `content/`:

```ts
type EvidenceKind =
  | 'verified-source' | 'verified-runtime' | 'user-attested'
  | 'design-doc' | 'learning-lab' | 'unverified';
type FeatureState = 'implemented' | 'partial' | 'placeholder'
  | 'source-only' | 'design' | 'deployed-verified' | 'historical';
interface EvidenceRef {
  id: string;
  kind: EvidenceKind;
  repo?: string;
  path?: string;
  commitSha?: string;
  url?: string;
  observedAt: string; // yyyy-mm-dd
  note?: string;
  publicSafe: boolean;
}
interface FeatureProof {
  name: string;
  state: FeatureState;
  proofIds: string[];
  limitation?: string;
}
interface EngineeringProject {
  id: string;
  slug: string;
  name: string;
  role: string;
  status: string;
  category: string;
  summary: string;
  contributions: string[];
  features: FeatureProof[];
  skillIds: string[];
  evidenceIds: string[];
  repository?: string;
  liveUrl?: string;
  lastVerifiedAt: string;
  limitations: string[];
  displayTier: 'featured' | 'project' | 'lab' | 'archive';
}
```

- **Không đưa chứng cứ mật vào repo public dù đã gắn `publicSafe: false`.** File public chỉ lưu mô tả đã khử nhạy cảm và URL/commit có quyền công khai; log, hợp đồng, ảnh và tài liệu nội bộ được lưu ngoài Git công khai.
- Sử dụng `src/data/evidence.ts`, `projects.ts`/data modules, `experiences.ts`, `case-studies.ts`, `capabilities.ts`, `labs.ts` tùy kiến trúc thực tế. Không nhồi dữ liệu 16 repo vào `main.ts` hoặc JSX/HTML string component.
- Mọi `evidenceProjectIds`, `evidenceExperienceIds`, `skillIds`, `proofIds`, `relatedProjects` đều được validator xác nhận tồn tại.
- Không hardcode số lượng = 8 timeline và 10 projects trong test/validator. Test điều kiện *không trùng/không mồ côi/đúng thứ tự*.
- Source truth precedence: runtime code reachable + tests/build evidence > schema/config > docs hiện hành > commit message > lịch sử chat/PDF > suy luận. Nội dung dùng lời kể người dùng vẫn có thể đăng nhưng `user-attested` và không gắn thành fake code proof.
- Các số liệu “100 người dùng”, “6 API”, “6 thành viên” kèm `self-reported` hoặc `verified-evidence` đúng thực tế.

## 7. EXECUTION PHASES — Codex chạy tuần tự và lưu checkpoint

### Phase 00 — Baseline/backup (P0)

**Task:** clone/checkout portfolio, `git status`, branch `feat/portfolio-evidence-audit-2026-10`, ghi head SHA, dependencies, config và deploy path; kiểm tra `npm ci`, `npm run validate`; không sửa master/main và không ghi đè thay đổi chưa commit.  
**Artifacts:** `docs/audit/00_BASELINE.md`, `docs/audit/BASELINE_TESTS.md`; baseline screenshots desktop/mobile; `git status` sạch hoặc snapshot giải thích.  
**Gate:** mọi lỗi baseline ghi rõ, không nhận là lỗi do thay đổi mới.

### Phase 01 — Inventory mọi repo, mọi nhánh, mọi package (P0)

**Task:** qua GitHub API + `git clone`/`git fetch --all --prune --tags` cho toàn bộ 16 repo có quyền đọc, từ 24/08/2026 00:00 +07 đến 24/10/2026 23:59 +07 (ghi UTC conversion để so date nhất quán); lấy default branch và non-default, merge/PR/tag; `git log --all --since ... --until ... --date=iso-strict --name-status`, `git diff` theo commit/path; đọc README, AGENTS.md gần nhất, kiến trúc, manifests, migrations, tests, source entrypoints, CI; dùng source clone chứ không giới hạn GitHub compare 300 paths. 

**Với từng package**, làm manifest các trường `repo`, `branch/ref`, `filePath`, `current SHA`, `commit SHA/time/author`, `change kind`, `source reachable?`, `runtime verified?`, `tests`, `feature`, `my contribution uncertain?`, `risk`, `portfolio claim update`.

**Focus:** NanoBio `lib/`, `backend/`, `admin-web/`, `supabase/`, `iot/`, `android/`; Study2Work `apps/study-server`, `study-client`, `work-server`, `work-client/web`, `work-client/mobile`, `ai-server`, `db-admin-web`, `db-admin-server`, `contracts`, `infra`; HVC_NEW `frontend`, `supabase/{functions,migrations,tests}`, workflow; OurStory `src`, `assets/our-home`, `e2e`; xiaozhi `main/boards`, `main/protocols`, board config and commits vs upstream.

**Artifacts:** `docs/audit/01_REPOSITORY_INVENTORY.csv`, `02_COMMIT_CHANGELOG_BY_PACKAGE.md`, `03_SOURCE_STATUS_MATRIX.csv`, `04_SOURCE_EVIDENCE.md`, `05_FORK_CONTRIBUTION_AUDIT.md`, `06_UNRESOLVED_CLAIMS.md` + SHA-based snapshots.  
**Gate:** mọi repo accounted, commit range và file counts audited, mọi repo lớn không bị API truncate, mọi fork phân biệt upstream/user, không copy source private vào public portfolio.

### Phase 02 — Timeline cá nhân & claim reconciliation (P0)

**Task:** so sánh `docs/old/*` trong portfolio với master profile PDF 17/07/2026 (nếu được cung cấp trong workspace), conversation facts đã đưa vào plan và source repo/current dates; nếu không truy cập được PDF hoặc lịch sử chat nguyên gốc, ghi `MISSING_SOURCE` thay vì giả định đã đọc; xác minh FPT intern vs Fresher, VNUA start date, MaiATech dates, NanoBio release stage, GPA date, role VentureX, actual deployment/labs; lập bảng **FACT / EVIDENCE / CONFLICT / DECISION / WORDING / PUBLIC SAFE**. Không mặc định người dùng đã production release khi mới closed testing; không dùng thông tin nhạy cảm.

**Artifacts:** `docs/audit/07_CAREER_FACT_MATRIX.md`, `08_PUBLIC_CLAIMS_APPROVAL.md`, `09_PRIVATE_CONTENT_BLACKLIST.md`; unique stable IDs.  
**Gate:** không còn conflict âm thầm; các conflict chưa giải quyết phải hạ claim hoặc gắn caveat.

### Phase 03 — Refactor content/domain schemas (P0)

**Task:** thiết kế `EvidenceRef`/feature state/experience/project/skills/case/labs mapping; migrate `src/data/*.ts` mà giữ backward compatibility hoặc migrate atomic; replace status in text bằng enums và public display labels; tách fact khỏi rendered presentation; validator chống dangling refs, duplicate slug, invalid status, overclaim, malformed URL, private fields. Fix `learn2earn-part-time` → `maiatech-learn2earn`, `vnua-lead` → `vnua-innovation` theo entity hiện có; kiểm tra toàn bộ references trước khi đổi.

**Artifacts:** schema, migrations, `scripts/validate-claims.mjs`, `scripts/validate-evidence.mjs`, tests (positive/negative).  
**Gate:** 0 orphan skills/evidence/case/experience; 0 undefined slug; current tests pass hoặc được cập nhật vì có chủ đích.

### Phase 04 — Rewrite career, technologies & case content (P0)

**Task:** cập nhật `profile.ts`, `experience.ts`, `projects.ts`, `education.ts`, `capabilities.ts`, `case-studies.ts`, `live-products.ts` theo từng wave: (A) FPT/VNUA/MAIATECH/VentureX; (B) NanoBio self-host/backend/local AI/Play closed-testing; (C) Study2Work 8 deployable; (D) HVC 3 implementation; (E) ai_local/vogiaVocabulary/QTM/ESP32; (F) Linux/Networking/Security labs/AI agent. Mỗi wave có markdown nguồn và review riêng.

**Artifacts:** `docs/content/CAREER_PROFILE.md`, `SKILL_EVIDENCE_MATRIX.md`, `PROJECT_PROOF_INDEX.md`, `FEATURE_STATUS_PER_PROJECT.md`.  
**Gate:** tất cả skill ghi trên website có ít nhất một mapped evidence; nội dung không lẫn scope/historical state.

### Phase 05 — Information Architecture & component integration (P0)

**Task:** giữ hero + timeline + featured projects + contact thật dễ đọc. Thêm sections `capabilities`, `case-studies`, `live-products`, `labs`, `engineering-process`, `education/about` bằng cách wire components hiện hữu trước khi tạo mới. Cập nhật `src/main.ts`, header/nav/anchors/ARIA/mobiles; full project details trang hoặc modal có deeplink (SPA fallback GitHub Pages), table of contents, filter search/type/status; giữ reduced motion.

**Artifacts:** design routes, sitemap/semantic HTML, screen matrix.  
**Gate:** keyboard navigation, modal focus trap/restoration, ESC, deep link refresh, 360/768/1024/1440 widths không overflow.

### Phase 06 — Case study & proof visuals (P1)

**Task:** mỗi case study được viết theo Problem → Constraints → Alternatives → Decision → Architecture/Data Flow → Implementation → Tests/Debug → Result → Limitations; Mermaid/SVG architectural diagrams có alt; screenshots được tự chụp từ repo/demo và có provenance, không fake metrics. Group các project theo Featured / Other Engineering / Learning Labs / Archived. Một website nhấn kỹ thuật hơn trang nhật ký cá nhân.

**Artifacts:** tối thiểu 6 detailed cases, mỗi case 3–7 evidence references; screenshot metadata/sanitization report.  
**Gate:** recruiter review 60–90 giây nắm phạm vi, engineer review có thể trace về SHA/file.

### Phase 07 — Design system, accessibility, performance, SEO (P1)

**Task:** nâng polish UI chứ không chạy theo animation nặng; typography, hierarchy, spacing, contrast, tabs/cards, status labels, light/dark, mobile nav; lazy image; responsive screenshots; CV link nếu asset nguồn hợp lệ; bilingual optional với bộ content được review. Đặt JSON-LD `Person`/profile phù hợp, `title`, `description`, canonical, OG, sitemap/robots nhất quán URL Pages.

**Chuẩn tham khảo:** W3C WCAG 2.2 AA https://www.w3.org/TR/wcag/ ; Google Core Web Vitals https://web.dev/articles/defining-core-web-vitals-thresholds/ (LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 tại p75); GitHub Pages workflows https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages ; structured data https://developers.google.com/search/docs/appearance/structured-data/profile-page .

**Gate:** không quá 2 fonts/animations nặng; axe manual/automated audit pass các issue nghiêm trọng, số đo Lighthouse/Playwright log, không claim full WCAG compliance chỉ vì tool không báo lỗi.

### Phase 08 — Quality & security validation (P0)

**Commands:** `npm ci`, `npm run typecheck`, `npm test`, `npm run validate:project-data`, `npm run validate:links`, `npm run build`, `npm run validate`; nếu thêm Playwright: run chromium mobile+desktop snapshot; optional Lighthouse CI.  
**Extra:** scripts kiểm tra JSON typed data, all links reachable separately (network outages = warning, invalid URL = fail), no tokens, PII, FPT private details, broken images, console errors, 404/deeplink, reduced-motion, keyboard focus, out-of-date meta; runtime `LIVE` verified with real HTTP response.  
**Gate:** 100% automated gates ở môi trường phù hợp, không biến skipped/unavailable thành pass.

### Phase 09 — 3 vòng audit + sửa lỗi (P0, bắt buộc)

**Vòng 1 — Factual / Evidence audit:** chấm theo rubric 100: factual correctness (35), source/traceability (25), stage labeling (15), privacy/IP (15), completeness (10). Review từ người làm tuyển dụng + kỹ sư bảo mật; ghi từng lỗi `[severity, file, claim, evidence, fix, retest]`. **Ngưỡng ≥95, 0 critical**.

**Vòng 2 — Engineering audit:** rubric 100: build/test (30), cross-ref/schema (25), a11y/UX (20), security/privacy (15), maintainability (10). Chạy local and CI, fix tất cả regressions, actual screenshots/diffs. **Ngưỡng ≥95, 0 critical/high**.

**Vòng 3 — Recruiter/Production acceptance:** rubric 100: 60–90s scan (25), case depth (25), mobile/SEO/perf (20), link accuracy (15), release verification (15). Verify GitHub Pages publication and routes; record before/after & each QA iteration. **Ngưỡng ≥95; chưa đạt thì không merge**.

**Mỗi vòng phải có** `docs/qa/QA_ROUND_N.md` với điểm từng nhóm, lỗi chính xác, bản vá, test rerun, điểm sau sửa, người/agent thực hiện, `COMMIT_SHA`. Không chấm điểm giả khi chưa chạy.

### Phase 10 — Delivery & handoff (P0)

**Task:** create PR từ nhánh riêng, changelog before/after, breakdown từng file, link evidence, screenshots, constraints/remaining unknowns; giữ existing GitHub Pages workflow, deployment base path `/portfolio/`; verify Actions deployed commit SHA và live manual smoke test; báo rõ PR chưa merge / đã merge / deploy verified. 

**Artifacts:** `docs/DELIVERY_REPORT_2026-10.md`, `docs/qa/QA_ROUND_1.md`...`3.md`, `docs/CONTENT_MAINTENANCE_GUIDE.md`, PR.  
**Gate:** không merge/deploy bằng quyền tự động trừ khi chủ repo chấp thuận; code clean, safety claim gates and 3 QA rounds green.

## 8. Lệnh nghiên cứu git bắt buộc cho Codex

```bash
# Clone danh sách repo vào workspace riêng; không copy secrets từ project nào.
mkdir -p ../portfolio-source-audit
REPOS=(portfolio NanoBioAI Study2Work HVC_EDU_NEW HVC_EDU edu_hvc LabVnua hung-quynh-our-story xiaozhi-esp32 nanobioai-privacy Nihongo-Learning-System Learn2Earn My_Courses vogiaVocabulary ai_local QTM)
for repo in "${REPOS[@]}"; do
  if [ -d "../portfolio-source-audit/$repo/.git" ]; then
    git -C "../portfolio-source-audit/$repo" fetch --all --tags --prune
  else
    git clone "https://github.com/daovanhung-dev/$repo.git" "../portfolio-source-audit/$repo" || echo "FETCH_FAIL:$repo"
  fi
done

# Cửa sổ theo ngày giờ Việt Nam: 24/08 00:00 → hết 24/10 2026 +07.
SINCE='2026-08-23T17:00:00Z'
UNTIL='2026-10-24T16:59:59Z'
for repo in "${REPOS[@]}"; do
  dir="../portfolio-source-audit/$repo"
  [ -d "$dir/.git" ] || continue
  mkdir -p "docs/audit/git-logs/$repo"
  if ! git -C "$dir" rev-parse --verify HEAD >/dev/null 2>&1; then
    printf "EMPTY_REPOSITORY\n" > "docs/audit/git-logs/$repo/status.txt"
    continue
  fi
  git -C "$dir" log --all --since="$SINCE" --until="$UNTIL" \
    --date=iso-strict --format='%H%x09%aI%x09%an%x09%s' \
    > "docs/audit/git-logs/$repo/commits.tsv"
  git -C "$dir" log --all --since="$SINCE" --until="$UNTIL" \
    --date=iso-strict --format='COMMIT %H %aI %an %s' --name-status \
    > "docs/audit/git-logs/$repo/files-changed.log"
  git -C "$dir" branch -a -vv > "docs/audit/git-logs/$repo/branches.txt"
done

# Xem tiến hóa một package/path, không đếm commit thay cho source inspection:
git -C ../portfolio-source-audit/NanoBioAI log --all --since="$SINCE" --until="$UNTIL" --stat -- backend/
git -C ../portfolio-source-audit/Study2Work log --all --since="$SINCE" --until="$UNTIL" --stat -- apps/study-server/
git -C ../portfolio-source-audit/HVC_EDU_NEW log --all --since="$SINCE" --until="$UNTIL" --stat -- frontend/ supabase/

# Fork ownership audit:
git -C ../portfolio-source-audit/xiaozhi-esp32 remote -v
# Khi đã thêm upstream chính xác và fetch: git merge-base upstream/main HEAD;
# chỉ khảo sát commit/file delta riêng so với upstream, không credit lịch sử upstream.
```

**Cảnh báo:** `git log --all` có thể lặp commit khi nhiều branch trỏ cùng SHA (Git tự deduplicate trên traversal, vẫn verify); GitHub author email/name không xác định chắc ai viết code. Với mono-repo có rename, thêm `git log --follow -- <file>` trên critical files và Git diff mỗi commit quan trọng. Source giant/binary artifacts trong NanoBio/OurStory không đưa nguyên bản vào report hoặc portfolio.

## 9. Master prompt — dán vào Codex tại root `portfolio`

```text
Bạn là Staff-level Software Engineer kiêm Technical Writer, Portfolio UX Engineer và Evidence Auditor. Nhiệm vụ: cập nhật daovanhung-dev/portfolio thành Engineering Portfolio công khai chính xác và toàn diện tại thời điểm 24/10/2026.

BẮT BUỘC đọc nguyên file PORTFOLIO_2026_AUDIT_AND_CODEX_EXECUTION_PLAN.md (bản trong repo hoặc bản tôi cấp). Thực thi toàn bộ Phase 00→10, tuần tự theo quality gates; ghi progress vào docs/audit/PROGRESS.md và tạo report cho mỗi phase. Không bắt đầu sửa data hoặc UI trước khi đã inventory + làm source evidence matrix. Tuyệt đối không commit private raw evidence vào GitHub public; chỉ trích dẫn mô tả đã khử nhạy cảm.

Lưu ý Codex không mặc nhiên đọc được ChatGPT chat history hoặc PDF đính kèm cuộc trò chuyện này. Nếu các nguồn không được mount/cung cấp, chỉ dùng hồ sơ nền trong file plan và các nguồn có thể truy cập; ghi coverage gap, không tự nhận đã đọc toàn bộ lịch sử.

Source repo: tất cả 16 repository của daovanhung-dev, kể cả dự án cũ, mới, fork, rỗng. Fetch ALL branches/tags, liệt kê và phân tích commit từ 24/08 đến 24/10/2026 tại múi giờ +07, read code/README/AGENTS/tests/schema/CI/source entrypoint theo package; KHÔNG tự nhận đã đọc 100% nếu chưa hoàn thành. Ghi SHA, path, changed files, feature status, attribution, risk cho mỗi package. Nếu repo inaccessible/hard to clone, fallback GitHub API từng path nhưng đánh dấu coverage gap. Fork xiaozhi-esp32: upstream code không phải user contribution.

Hồ sơ nền (cần đối chiếu chứng cứ theo từng trường trước khi công khai): Đào Văn Hùng, FPT Intern 16/03–07/2026 + FPT Full-stack Fresher 07/2026–nay; NanoBio từ 10/05/2026, VNUA Flutter Team Lead ~6 người từ 11/2025, VentureX LinguaSphere architecture/design, MAIATECH Learn2Earn, Hùng Cường operations + software, Study2Work; GPA 2.72/4 trên 94 tín chỉ tại 27/08/2026. Năng lực BA, System Analysis, API DD, Python/Flask/FastAPI, Vue/Angular, Flutter, data/Supabase/PostgreSQL, QA/debugging, CI/CD, Ubuntu/Debian/SSH, networking CCNA-style labs, AppSec/security labs, AI-assisted engineering/LLMs, ESP32-S3. Nội dung tự báo cáo phải phân biệt với bằng chứng trực tiếp.

Các lỗi P0 đã phát hiện: components capabilities/cases/live-products đã có nhưng chưa render trên main; capability refs `learn2earn-part-time`/`vnua-lead` dangling; tests/validator hardcode 8 timeline và 10 projects; portfolio NanoBio chưa phản ánh local GGUF/llamadart và new backend/ FastAPI; Study2Work Work API trong README hiện là Express, không phải mặc định NestJS/Fastify runtime; HVC_EDU_NEW latest README loại finance/ClassMonth khỏi active scope; thiếu ai_local, vogiaVocabulary, QTM, IoT/infra/net lab; LIVE không bằng chứng full production. Giữ/kiểm chứng các claim đã đúng, đừng rewrite vô cớ.

Cấm overclaim, giả dữ liệu/benchmark, giả live URL, công khai mã/data FPT, học sinh/phụ huynh, ảnh kỷ niệm riêng hoặc secrets. Source reachable != production. Play closed testing != public store listing. Số liệu pilot, latency, số lượng người dùng phải được xác minh. Không lẫn trạng thái source-only/planned/partial/current/historical.

Giữ Vite+TypeScript nếu không có lý do kỹ thuật xác thực để đổi. Triển khai portfolio 2 tầng: recruiter-friendly home và detailed evidence/case/lab pages; responsive, keyboard accessible, reduced motion, typed contract, screenshot metadata, route/deeplink, SEO, GitHub Pages `/portfolio/`. Vận hành/thiết kế/bảo mật công khai chính xác là tiêu chí cao nhất.

Sau từng phase chạy lint/typecheck/test/validators/build có liên quan. BẮT BUỘC làm 3 vòng review độc lập: factual-evidence; engineering-security; recruiter-UX-production. Mỗi vòng: danh sách issue theo severity, điểm từng rubric /100, patch fixes, rerun checks, điểm sau sửa. Không chấm PASS khi tool không chạy hoặc chưa test runtime. Final báo chính xác trạng thái code/PR/deploy, tất cả artifact, SHA và blocker còn lại. Chỉ tạo branch và PR, không tự merge main/deploy bất chấp workflow hiện có.
```

## 10. Definition of Done (không được rút gọn)

- [ ] 16/16 repo accounted; repo rỗng và fork được đánh dấu; all-branch historical audit đủ trong cửa sổ; mỗi package có report và SHA.
- [ ] Source truth/claim matrix đầy đủ; một claim có chủ + timestamp + evidence/status, các claim chưa xác minh hạ level.
- [ ] Portfolio không còn stale NanoBio AI/Backend, Study2Work stack, HVC version-state.
- [ ] FPT Fresher 07/2026–nay giữ chính xác; không làm lộ confidential project.
- [ ] Có trải nghiệm tuyển dụng 60–90s và trang sâu giải thích toàn bộ mảng; không xếp hết vào 1 homepage siêu dài.
- [ ] ít nhất 6 case study với architecture, decisions, tests, outcome và limitations.
- [ ] `ai_local`, `vogiaVocabulary`, `QTM`, IoT/xiaozhi fork attribution, Ubuntu/Networking/Security Labs có nội dung đúng cấp evidence.
- [ ] Không dangling ID, không hardcoded counts, zero secret/PII leak, 0 broken internal link, 0 console critical error.
- [ ] Typecheck, tests, validators, build, smoke/keyboard/mobile, Pages deployment evidence pass tại môi trường phù hợp.
- [ ] Có `QA_ROUND_1.md`, `QA_ROUND_2.md`, `QA_ROUND_3.md` có lỗi, fix, điểm trước/sau và SHA.
- [ ] Có PR và handoff, content maintenance guide và danh sách claims cần xác minh tiếp; không báo “đã deploy” khi mới push.

---

## 11. Những gì đã kiểm chứng vs cần Codex kiểm chứng

**Có bằng chứng trong lần nghiên cứu:** GitHub 16 repo với default branch; 406 default-branch-window commits cộng gộp không quy attribution; portfolio latest SHA `a99fac9...` 15/09; `src/main.ts`, `src/data/*`, validator và tests; NanoBio current README/back-end README; Study2Work current README; HVC_EDU_NEW current README; ai_local/QTM/vogiaVocabulary/OurStory/ESP docs. Các nguồn nền cá nhân: master profile PDF 17/07/2026 + lịch sử hội thoại.

**Chưa thể tuyên bố hoàn thành:** all-branch/full diff mỗi commit của 16 repo; 100% packages compile/test/runtime; Google Play accepted public; user analytics; WAN deployment thành công; HVC latest migration production; ISO/WCAG compliance đầy đủ; contributor ownership sau fork; benchmark AI <500ms. Đây là phần Codex bắt buộc hoàn thành hoặc gắn UNVERIFIED.

## 12. Quy trình cập nhật về sau

Một thay đổi kỹ thuật chỉ được thêm vào portfolio sau khi: `feature shipped/source changed` → record evidence path/SHA → update status & limitations → update project/case/capability mappings → run validation → QA screenshot → review PR → deploy/verify. Dùng monthly audit hoặc audit sau release quan trọng, không lấy “số repo” làm metric kỹ năng.

---

## 13. Rà soát 3 vòng **bản kế hoạch này** (không phải QA sản phẩm sau khi Codex code)

**Chấm điểm nội bộ mang tính biên tập, không phải điểm đạt chuẩn production.** Điểm dành cho chất lượng và tính thực thi của tài liệu; QA sản phẩm bắt buộc chạy lại theo Phase 09.

| Vòng | Điểm bản thảo → sau sửa (/100) | Nhận xét, lỗi tìm được, cách sửa |
|---|---:|---|
| **1. Độ đúng, nguồn và mốc thời gian** | **91 → 96** | Phát hiện tổng 406 commit được truy vấn theo cửa sổ **UTC**, trong khi plan dùng mốc +07 cho audit đầy đủ; đã ghi chính xác ranh giới API và lệnh chuyển đổi giờ. Phát hiện repo `My_Courses` trống sẽ làm lệnh log lỗi; đã thêm guard `rev-parse --verify HEAD`. Nội dung giữ nhãn `unverified` cho runtime/store/user analytics. |
| **2. Nội dung, cấu trúc và privacy** | **94 → 98** | Kiểm tra tự động 16/16 hàng repository, 15 GAP, 11 phase và code fences cân bằng. Phát hiện rủi ro `publicSafe:false` vẫn có thể để lộ dữ liệu nếu raw evidence được commit lên repo public; đã bổ sung quy tắc **không commit raw private evidence** và chỉ trích nguồn đã khử nhạy cảm. |
| **3. Khả năng Codex tự thực thi** | **95 → 98** | Phát hiện Codex được giao đọc PDF và toàn bộ lịch sử chat nhưng không đảm bảo tự truy cập được nguồn ngoài workspace; đã thêm quy tắc `MISSING_SOURCE` và chuyển các facts quan trọng vào plan/prompt. Kiểm tra lại folder, lệnh, tiêu chí nghiệm thu và phân định source vs runtime. Điểm chưa tối đa do chưa chạy dự án và chưa đọc diff mọi nhánh: chính là công việc của Phase 01–10. |

**Kết luận QA tài liệu:** sẵn sàng đưa cho Codex **làm kế hoạch triển khai**, không có nghĩa website đã nâng cấp hay các kiểm chứng runtime đã hoàn thành.
