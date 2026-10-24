import type { CapabilityMapping, PortfolioCaseStudy, PortfolioExperience, PortfolioLab, PortfolioProject } from './types';

const proof = (id: string, label: string, state: PortfolioProject['status'], evidenceRefIds: string[], limitation?: string) => ({ id, label, state, evidenceRefIds, ...(limitation ? { limitation } : {}) });

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'portfolio', slug: 'portfolio-evidence', name: 'Engineering Portfolio', category: 'Frontend · Evidence system', role: 'Designer / Developer', period: '2026',
    summary: 'Portfolio hai tầng: trang giới thiệu ngắn cho recruiter và các trang chi tiết truy nguyên được về source, trạng thái và giới hạn.', status: 'partial', repositoryIds: ['portfolio'], evidenceRefIds: ['ev-portfolio-source'],
    featureProofs: [proof('typed-evidence', 'Typed evidence and source audit', 'implemented', ['ev-portfolio-source']), proof('recruiter-routes', 'Recruiter and detail routes', 'partial', ['ev-portfolio-source'], 'Implementation is being completed on this branch; it is not deployed.')],
    stack: ['Vite', 'TypeScript', 'Vanilla CSS', 'Vitest', 'Playwright'], liveAvailability: 'unknown', limitations: ['Branch build is local evidence only; no deployment claim.'],
  },
  {
    id: 'nanobio-mobile', slug: 'nanobio-local-cloud', name: 'NanoBioAI · local-first mobile', category: 'HealthTech · Flutter', role: 'Technical Owner · role self-reported', period: '2026',
    summary: 'Flutter app có local-first flows và on-device AI source; Supabase/cloud là phần riêng cần cấu hình và xác minh theo môi trường.', status: 'partial', repositoryIds: ['nanobio'], evidenceRefIds: ['ev-nano-mobile', 'ev-nano-test-contract', 'ev-nanobio-role'],
    featureProofs: [proof('nano-local', 'Local data and local inference source', 'partial', ['ev-nano-mobile', 'ev-nano-test-contract'], 'Device behavior and performance were not measured in this audit.'), proof('nano-cloud', 'Optional Supabase features', 'partial', ['ev-nano-mobile'], 'Remote migrations, policies, and deployed service state were not checked.')],
    stack: ['Flutter', 'Dart', 'Riverpod', 'SQLite', 'Supabase', 'llamadart'], liveAvailability: 'unknown', limitations: ['Not a diagnostic or treatment product. No clinical or user-scale outcomes are claimed.'],
  },
  {
    id: 'nanobio-backend', slug: 'nanobio-fastapi-foundation', name: 'NanoBioAI · FastAPI foundation', category: 'Backend · Python', role: 'Source contributor · individual line attribution not audited', period: '2026',
    summary: 'Modular FastAPI package with SQLAlchemy and PostgreSQL/Alembic setup paths, represented as a source foundation.', status: 'source-only', repositoryIds: ['nanobio'], evidenceRefIds: ['ev-nano-backend'],
    featureProofs: [proof('fastapi-package', 'FastAPI package structure', 'source-only', ['ev-nano-backend']), proof('fastapi-runtime', 'Server runtime and migration', 'partial', ['ev-nano-backend'], 'No server deployment, database migration, or live API was verified.')],
    stack: ['Python', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'Alembic'], liveAvailability: 'unknown', limitations: ['Do not describe this foundation as a deployed or production backend.'],
  },
  {
    id: 'study2work', slug: 'study2work-contracts', name: 'Study2Work', category: 'EdTech + HRTech · Monorepo', role: 'Full-stack Developer / System Designer · role self-reported', period: '2026',
    summary: 'Multi-app foundation where contracts, source modules, and runnable integration state must be assessed separately.', status: 'partial', repositoryIds: ['study2work'], evidenceRefIds: ['ev-study-contracts'],
    featureProofs: [proof('s2w-contracts', 'API and event contract modules', 'implemented', ['ev-study-contracts']), proof('s2w-runtime', 'Cross-service runtime integration', 'partial', ['ev-study-contracts'], 'Static source review found subsystem and wiring gaps; no full stack was started in this audit.')],
    stack: ['FastAPI', 'Python', 'Vue', 'React', 'Express', 'PostgreSQL', 'Redis', 'OpenAPI'], liveAvailability: 'unknown', limitations: ['The inspected Work API uses Express 4. Do not claim the full architecture is deployed or production-ready.'],
  },
  {
    id: 'hvc-evolution', slug: 'hvc-implementation-evolution', name: 'HVC Education · implementation evolution', category: 'Education Operations · multiple versions', role: 'Full-stack Developer · role self-reported', period: '2025–2026',
    summary: 'Three distinct codebases address related education operations: historical FastAPI/PostgreSQL, narrower Angular/Supabase, and newer Vue/Supabase.', status: 'partial', repositoryIds: ['edu-hvc', 'hvc-angular', 'hvc-new'], evidenceRefIds: ['ev-hvc-fastapi-source', 'ev-hvc-angular-source', 'ev-hvc-vue-source'],
    featureProofs: [proof('hvc-fastapi', 'FastAPI/PostgreSQL source', 'historical', ['ev-hvc-fastapi-source']), proof('hvc-angular', 'Angular/Supabase source', 'partial', ['ev-hvc-angular-source'], 'Current source scope is narrower than the Vue implementation.'), proof('hvc-vue', 'Vue/Supabase source', 'partial', ['ev-hvc-vue-source'], 'Remote database policies and deployed state were not checked.')],
    stack: ['FastAPI', 'PostgreSQL', 'Angular', 'Vue', 'TypeScript', 'Supabase', 'Edge Functions'], liveAvailability: 'unknown', limitations: ['Version scopes must not be combined into one shipped feature list. Finance and payroll refer only to the newer version source.'],
  },
  {
    id: 'labvnua', slug: 'labvnua-student-app', name: 'LabVnua / EduAI', category: 'Student companion · Flutter', role: 'Flutter team lead · self-reported', period: '2025–2026',
    summary: 'Student app source organizes academic flows, local cache, notifications, and service integrations; the README describes MVP scope.', status: 'partial', repositoryIds: ['labvnua'], evidenceRefIds: ['ev-labvnua-source', 'ev-vnua-role'],
    featureProofs: [proof('vnua-source', 'Academic flow source', 'partial', ['ev-labvnua-source']), proof('vnua-tests', 'Automated test coverage', 'partial', ['ev-labvnua-source'], 'The README describes minimal automated coverage; the suite was not run here.')],
    stack: ['Flutter', 'Dart', 'SQLite', 'Supabase Realtime'], liveAvailability: 'unknown', limitations: ['Exact role dates and team size are self-reported; no impact metric or release is claimed.'],
  },
  {
    id: 'story-delivery', slug: 'privacy-safe-story-delivery', name: 'Privacy-safe interactive delivery', category: 'Frontend · Private personal project', role: 'Frontend Developer · role self-reported', period: '2026',
    summary: 'A private interactive experience is represented only through generic routing and delivery engineering; personal story and media are intentionally omitted.', status: 'partial', repositoryIds: ['our-story-private'], evidenceRefIds: ['ev-story-delivery'],
    featureProofs: [proof('story-routing', 'Route and application structure', 'source-only', ['ev-story-delivery']), proof('story-personal-content', 'Personal media and story content', 'partial', ['ev-story-delivery'], 'No content, media, screenshot, public URL, or repository link is included.')],
    stack: ['Angular', 'TypeScript', 'Responsive UI', 'Reduced motion'], liveAvailability: 'unknown', limitations: ['The source is private and contains personal material; this portfolio exposes no direct source or experience link.'],
  },
  {
    id: 'xiaozhi', slug: 'xiaozhi-fork-attribution', name: 'XiaoZhi ESP32 · fork contribution', category: 'Embedded · Source study', role: 'Fork contributor · Git attribution reviewed', period: '2026',
    summary: 'Fork work is described with upstream attribution kept explicit; the portfolio records source contribution rather than device acceptance.', status: 'source-only', repositoryIds: ['xiaozhi-fork'], evidenceRefIds: ['ev-xiaozhi-fork'],
    featureProofs: [proof('xiaozhi-fork-diff', 'Fork-specific board and documentation changes', 'source-only', ['ev-xiaozhi-fork']), proof('xiaozhi-device', 'Firmware build and device voice flow', 'partial', ['ev-xiaozhi-fork'], 'No build, flash, or speaker round-trip was performed for this audit.')],
    stack: ['ESP-IDF', 'C++', 'ESP32', 'WebSocket'], liveAvailability: 'unknown', limitations: ['This repository is an upstream fork. Upstream code and third-party commits are not credited as original work.'],
  },
  {
    id: 'nano-privacy', slug: 'nanobio-trust-center', name: 'NanoBio Trust Center', category: 'Policy documentation · Static web', role: 'Product documentation · role self-reported', period: '2026',
    summary: 'Static privacy, data-safety, terms, account-deletion, and health/AI disclaimer pages.', status: 'source-only', repositoryIds: ['nano-privacy'], evidenceRefIds: ['ev-privacy-source'],
    featureProofs: [proof('trust-pages', 'Policy page source', 'source-only', ['ev-privacy-source'])],
    stack: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'], liveAvailability: 'unknown', limitations: ['Source text is not legal review, certification, or proof that deployed app behavior matches the pages.'],
  },
  {
    id: 'nihongo', slug: 'nihongo-design', name: 'Nihongo Learning System', category: 'EdTech · Design / scaffold', role: 'Product / System Design · self-reported', period: '2026',
    summary: 'Japanese-learning domain and SRS reference design with an Angular/Supabase scaffold.', status: 'design', repositoryIds: ['nihongo'], evidenceRefIds: ['ev-nihongo-design'],
    featureProofs: [proof('nihongo-reference', 'Design/reference screens', 'design', ['ev-nihongo-design']), proof('nihongo-production', 'Production learning flows', 'partial', ['ev-nihongo-design'], 'Design references do not prove implemented or released product behavior.')],
    stack: ['Angular', 'Supabase', 'SRS', 'Learning events'], liveAvailability: 'unknown', limitations: ['Show as design work, not a released product.'],
  },
  {
    id: 'learn2earn', slug: 'learn2earn-history', name: 'Learn2Earn', category: 'Career platform · Historical', role: 'Backend Developer · self-reported', period: '09/2025–03/2026',
    summary: 'Historical web backend and two Flutter client source trees for student and business flows.', status: 'historical', repositoryIds: ['learn2earn'], evidenceRefIds: ['ev-learn2earn-source'],
    featureProofs: [proof('learn2earn-source', 'Web and client source snapshot', 'historical', ['ev-learn2earn-source'])],
    stack: ['Node.js', 'TypeScript', 'Express', 'Prisma', 'MySQL', 'Flutter'], liveAvailability: 'unknown', limitations: ['No commits in the audit window; no current demo or runtime acceptance was verified.'],
  },
  {
    id: 'vogia', slug: 'vogia-vocabulary', name: 'vogiaVocabulary', category: 'Language learning · Angular MVP', role: 'Developer · role self-reported', period: '2026',
    summary: 'Vocabulary MVP source with hash routes, practice flows, and optional backend functions.', status: 'partial', repositoryIds: ['vogia'], evidenceRefIds: ['ev-vogia-source'],
    featureProofs: [proof('vogia-ui', 'Vocabulary and practice source', 'partial', ['ev-vogia-source']), proof('vogia-cloud', 'Remote functions and cloud availability', 'partial', ['ev-vogia-source'], 'Remote function deployment and account persistence were not verified.')],
    stack: ['Angular', 'TypeScript', 'Supabase'], liveAvailability: 'unknown', limitations: ['MVP/source evidence only; do not imply user scale or remote service availability.'],
  },
  {
    id: 'ai-local', slug: 'ai-local-inference', name: 'ai_local', category: 'On-device AI · Flutter', role: 'Developer · repository attribution', period: '2026',
    summary: 'Flutter source for local GGUF inference, streamed output, model download/resume/hash checks, and Drift persistence.', status: 'partial', repositoryIds: ['ai-local'], evidenceRefIds: ['ev-ai-local-source'],
    featureProofs: [proof('ai-local-source', 'Inference and model management source', 'partial', ['ev-ai-local-source']), proof('ai-local-performance', 'Latency, memory, thermal, and device compatibility', 'partial', ['ev-ai-local-source'], 'No device or performance measurements were collected in this audit.')],
    stack: ['Flutter', 'Dart', 'GGUF', 'Drift', 'SQLite'], liveAvailability: 'unknown', limitations: ['No latency, memory, thermal, airplane-mode, or iOS build claim.'],
  },
  {
    id: 'qtm', slug: 'qtm-quiz', name: 'QTM', category: 'Learning tool · Static web', role: 'Developer · repository attribution', period: '2026',
    summary: 'Static quiz source parses Markdown, shuffles questions, stores progress locally, imports files, and exports results.', status: 'implemented', repositoryIds: ['qtm'], evidenceRefIds: ['ev-qtm-source'],
    featureProofs: [proof('qtm-flows', 'Quiz and local progress source', 'implemented', ['ev-qtm-source'])],
    stack: ['JavaScript', 'HTML', 'CSS', 'Markdown'], liveAvailability: 'unknown', limitations: ['No automated test suite or runtime check was found in this source audit.'],
  },
];

export const portfolioExperiences: PortfolioExperience[] = [
  { id: 'fpt', organization: 'FPT Software', role: 'Full-stack Developer', period: 'Intern 03/2026–07/2026 · Fresher 07/2026–hiện tại', summary: 'Enterprise workflow với Vue, Flask, PostgreSQL, SQL và kiểm thử/regression. Mô tả ở mức tổng quát để giữ phạm vi client confidential.', evidenceRefIds: ['ev-fpt-role'], projectIds: [], attribution: 'user-attested' },
  { id: 'maiatech', organization: 'MAIATECH · Learn2Earn', role: 'Backend Developer', period: '09/2025–03/2026', summary: 'Tham gia team project có Express/EJS backend và hai Flutter client; giữ dự án ở trạng thái historical.', evidenceRefIds: ['ev-learn2earn-role', 'ev-learn2earn-source'], projectIds: ['learn2earn'], attribution: 'mixed' },
  { id: 'vnua-study', organization: 'VNUA · LabVnua', role: 'Flutter Team Lead', period: '11/2025–2026', summary: 'Phát triển ứng dụng học vụ và hỗ trợ điều phối nhóm; ngày cụ thể và quy mô nhóm được giữ ở mức ước lượng.', evidenceRefIds: ['ev-vnua-role', 'ev-labvnua-source'], projectIds: ['labvnua'], attribution: 'mixed' },
  { id: 'hvc-work', organization: 'Hùng Cường Education', role: 'Full-stack Developer', period: '2025–2026', summary: 'Tham gia các implementation riêng biệt cho domain vận hành trung tâm giáo dục; không gộp module giữa các phiên bản.', evidenceRefIds: ['ev-hvc-role', 'ev-hvc-fastapi-source', 'ev-hvc-angular-source', 'ev-hvc-vue-source'], projectIds: ['hvc-evolution'], attribution: 'mixed' },
  { id: 'study-work', organization: 'Study2Work', role: 'Contributor / System Design', period: '2026', summary: 'Đóng góp trong monorepo team; contract/source evidence được tách khỏi trạng thái runtime.', evidenceRefIds: ['ev-study-role', 'ev-study-contracts'], projectIds: ['study2work'], attribution: 'mixed' },
  { id: 'venturex', organization: 'VentureX · LinguaSphere', role: 'System Analyst / API Designer', period: '2026', summary: 'Business/system analysis và API detail design; không mô tả như phần mềm đã triển khai.', evidenceRefIds: ['ev-venturex-design'], projectIds: [], attribution: 'user-attested' },
  { id: 'nano-owner', organization: 'NanoBioAI', role: 'Full-stack Developer / Technical Owner', period: '10/05/2026–hiện tại', summary: 'Điều phối kỹ thuật và xây các phần source trong một sản phẩm wellness local-first.', evidenceRefIds: ['ev-nanobio-role', 'ev-nano-mobile'], projectIds: ['nanobio-mobile', 'nanobio-backend'], attribution: 'mixed' },
];

export const portfolioCaseStudies: PortfolioCaseStudy[] = [
  { id: 'fpt-debugging', slug: 'fpt-debugging', title: 'Điều tra lỗi xuyên tầng trong quy trình enterprise', context: 'Một sai khác giữa yêu cầu, phản hồi API và kết quả UI cần được tái hiện và khoanh vùng. Mô tả tổng quát, không tiết lộ hệ thống hay dữ liệu khách hàng.', approach: ['Đối chiếu requirement, detail design và test case', 'Tái hiện với input và dữ liệu kiểm soát', 'Lần theo UI → API → service → SQL', 'Sửa nguyên nhân trong phạm vi được giao rồi chạy regression'], result: 'Cách tiếp cận và quy trình kiểm thử là self-reported; không công bố defect cụ thể hoặc outcome của khách hàng.', evidenceRefIds: ['ev-fpt-role'], featureState: 'partial', limitations: ['Kinh nghiệm và quy trình do người dùng tự xác nhận; không có client source công khai.'] },
  { id: 'nano-local-cloud', slug: 'nanobio-local-cloud-ai', title: 'Tách local-first, cloud và các đường đi AI', context: 'Ứng dụng wellness cần giữ luồng local riêng với tính năng phụ thuộc Supabase; AI trên thiết bị cũng cần phân biệt với AI cloud.', approach: ['Đọc các flow local và test contract trong source', 'Tách quyền sở hữu dữ liệu local khỏi tính năng sync/cloud', 'Đặt trạng thái AI theo từng đường đi và yêu cầu cấu hình', 'Giữ hiệu năng, đồng bộ và trạng thái production ở mức chưa xác minh'], result: 'Source cho thấy local-first và on-device AI cùng tồn tại với các tính năng cloud tùy cấu hình; audit không chạy app hay backend.', evidenceRefIds: ['ev-nano-mobile', 'ev-nano-test-contract'], featureState: 'partial', limitations: ['Không có kết quả benchmark, device acceptance, remote migration, hay clinical outcome.'] },
  { id: 'nano-fastapi', slug: 'nanobio-fastapi-foundation', title: 'Đưa FastAPI vào phạm vi foundation có thể kiểm tra', context: 'Repository có backend Python mới bên cạnh app Flutter và các phần Supabase đã có từ trước.', approach: ['Xác định package root và phụ thuộc từ README/pyproject', 'Ghi nhận SQLAlchemy, PostgreSQL và Alembic setup source', 'Tách source foundation khỏi backend đang chạy', 'Để migration/server verification ở trạng thái chưa thực hiện'], result: 'FastAPI backend được trình bày như nền tảng source; không được gộp với Supabase runtime của app.', evidenceRefIds: ['ev-nano-backend'], featureState: 'source-only', limitations: ['Chưa chạy server, migrations, hay kết nối môi trường deployed trong portfolio audit.'] },
  { id: 'study-contracts', slug: 'study2work-contracts-runtime', title: 'Đọc hợp đồng và trạng thái wiring trong Study2Work', context: 'Monorepo có nhiều ứng dụng và tài liệu contract; branch chứa mã mới nhất liên quan khác với default main.', approach: ['Chọn branch hoang_xuan_long_dev và SHA đã audit', 'Đối chiếu docs contracts với module hiện có', 'Tách contract/source presence khỏi service composition', 'Ghi nhận Express 4 cho Work API và những phần chưa được chạy end-to-end'], result: 'Có evidence source cho contracts và các module; audit không xác nhận full-stack runtime hoặc production readiness.', evidenceRefIds: ['ev-study-contracts'], featureState: 'partial', limitations: ['Không chạy package tests hoặc stack integration trong audit này.'] },
  { id: 'hvc-evolution', slug: 'hvc-implementation-evolution', title: 'Theo dõi tiến hóa triển khai HVC mà không gộp phiên bản', context: 'Ba repository liên quan một domain nhưng có phạm vi và thời điểm triển khai khác nhau.', approach: ['Đọc riêng README và đường dẫn source của từng repository', 'Đặt FastAPI/PostgreSQL là implementation lịch sử', 'Giữ Angular/Supabase ở scope hẹp hơn', 'Gắn các flow finance/payroll vào source Vue mới hơn'], result: 'Portfolio phân biệt ba implementation và tránh khẳng định mọi module tồn tại trong cùng một bản đang chạy.', evidenceRefIds: ['ev-hvc-fastapi-source', 'ev-hvc-angular-source', 'ev-hvc-vue-source'], featureState: 'partial', limitations: ['Chưa kiểm tra remote Supabase, live app, hoặc quyền truy cập dữ liệu.'] },
  { id: 'ai-local', slug: 'ai-local-inference', title: 'Theo dấu vòng đời model local trong ai_local', context: 'Một ứng dụng local inference phải quản lý model files, luồng sinh token và lưu lịch sử trong app.', approach: ['Đọc service inference và quản lý tải model', 'Đối chiếu luồng resume/hash validation với cấu trúc source', 'Tách persistence local khỏi suy luận', 'Để latency, memory và hành vi phần cứng ở trạng thái unknown'], result: 'Repository source mô tả local GGUF, streaming, model management và Drift persistence; không có phép đo thiết bị trong audit.', evidenceRefIds: ['ev-ai-local-source'], featureState: 'partial', limitations: ['Không khẳng định tốc độ, thermal safety, OOM behavior, hay tương thích iOS.'] },
  { id: 'xiaozhi-fork', slug: 'xiaozhi-fork-attribution', title: 'Giữ attribution rõ ràng khi làm trên XiaoZhi fork', context: 'Repository fork trộn lịch sử upstream và thay đổi từ nhiều tác giả.', approach: ['So sánh fork với upstream/main và xác định merge base', 'Tách commit riêng của fork khỏi commit upstream/third-party', 'Giới hạn mô tả ở board support và tài liệu có attribution', 'Không suy ra firmware hoặc voice acceptance từ source'], result: 'Contribution được mô tả ở cấp fork/source; không nhận toàn bộ repository là tác phẩm gốc.', evidenceRefIds: ['ev-xiaozhi-fork'], featureState: 'source-only', limitations: ['Không build, flash, hoặc xác nhận giao tiếp loa trong lần audit portfolio này.'] },
  { id: 'story-privacy', slug: 'privacy-safe-story-delivery', title: 'Chứng minh frontend delivery mà không đưa nội dung riêng tư ra portfolio', context: 'Một trải nghiệm cá nhân chứa media và tin nhắn riêng tư nên portfolio chỉ cần bằng chứng kỹ thuật tổng quát.', approach: ['Chỉ xem cấu trúc route/config và delivery source', 'Không đưa text, ảnh, video, screenshot hay URL vào trang', 'Không cung cấp repository CTA', 'Gắn giới hạn riêng tư ngay trong nội dung case'], result: 'Chỉ mô tả cách tổ chức ứng dụng ở mức khái quát; không tiết lộ nội dung cá nhân.', evidenceRefIds: ['ev-story-delivery'], featureState: 'partial', limitations: ['Không có ảnh hay link để click thử; source chứa dữ liệu riêng tư.'] },
];

export const portfolioLabs: PortfolioLab[] = [
  { id: 'linux', slug: 'linux-ssh', title: 'Linux và SSH fundamentals', description: 'Learning track về filesystem, process, permissions, shell và SSH.', topics: ['users and permissions', 'processes and services', 'SSH keys', 'logs and safe operations'], evidenceRefIds: ['ev-learning-linux'], state: 'learning', limitations: ['Không claim chứng chỉ, vận hành production, hoặc bài lab đã hoàn thành.'] },
  { id: 'networking', slug: 'networking-fundamentals', title: 'Networking fundamentals', description: 'Ôn nền tảng TCP/IP, OSI, routing và dịch địa chỉ trước khi triển khai lab thực hành.', topics: ['TCP/IP and OSI', 'DNS and DHCP', 'routing', 'NAT and ports'], evidenceRefIds: ['ev-learning-network'], state: 'learning', limitations: ['Đây là hướng học; không khẳng định kinh nghiệm quản trị mạng chuyên nghiệp.'] },
  { id: 'web-security', slug: 'web-security-fundamentals', title: 'Web security fundamentals', description: 'Hướng học an toàn ứng dụng web/API trên môi trường lab được phép.', topics: ['authentication and sessions', 'authorization boundaries', 'input validation', 'logging and threat modeling'], evidenceRefIds: ['ev-learning-websec'], state: 'learning', limitations: ['Không công bố kết quả pentest, certification, hay hoạt động trên hệ thống bên thứ ba.'] },
  { id: 'embedded', slug: 'xiaozhi-esp32-source-study', title: 'XiaoZhi / ESP32 source study', description: 'Đọc fork, board support, giao thức và ranh giới attribution cho embedded voice projects.', topics: ['ESP-IDF source', 'fork attribution', 'board support', 'device verification gaps'], evidenceRefIds: ['ev-xiaozhi-fork'], state: 'source-only', limitations: ['Không có firmware build hoặc speaker acceptance trong audit hiện tại.'] },
];

export const capabilityMappings: CapabilityMapping[] = [
  { id: 'backend-contracts', label: 'Backend API và contracts', projectIds: ['nanobio-backend', 'study2work', 'hvc-evolution'], evidenceRefIds: ['ev-nano-backend', 'ev-study-contracts', 'ev-hvc-vue-source'], state: 'partial' },
  { id: 'flutter-local', label: 'Flutter và local data', projectIds: ['nanobio-mobile', 'labvnua', 'ai-local'], evidenceRefIds: ['ev-nano-mobile', 'ev-labvnua-source', 'ev-ai-local-source'], state: 'partial' },
  { id: 'frontend-delivery', label: 'Frontend và delivery', projectIds: ['portfolio', 'story-delivery', 'vogia', 'qtm'], evidenceRefIds: ['ev-portfolio-source', 'ev-story-delivery', 'ev-vogia-source', 'ev-qtm-source'], state: 'partial' },
  { id: 'source-audit', label: 'Source audit và attribution', projectIds: ['study2work', 'xiaozhi'], evidenceRefIds: ['ev-study-contracts', 'ev-xiaozhi-fork'], state: 'source-only' },
  { id: 'privacy-boundaries', label: 'Privacy-aware delivery', projectIds: ['story-delivery', 'nano-privacy'], evidenceRefIds: ['ev-story-delivery', 'ev-privacy-source'], state: 'source-only' },
];
