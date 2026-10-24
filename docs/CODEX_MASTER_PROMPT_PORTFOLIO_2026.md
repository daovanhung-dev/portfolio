ty

# MASTER PROMPT CHO CODEX — PORTFOLIO 2026

> Đặt file plan và file này trong root workspace portfolio rồi dán phần dưới vào Codex.

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
