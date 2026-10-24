import { evidence } from './data/evidence';
import { capabilityMappings, portfolioCaseStudies, portfolioExperiences, portfolioLabs, portfolioProjects } from './data/portfolio-content';
import { repositories } from './data/repositories';
import type { EvidenceRef, FeatureState, PortfolioProject } from './data/types';

const esc = (value: string): string => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char] ?? char);
const stateText: Record<FeatureState, string> = {
  implemented: 'Có bằng chứng source',
  partial: 'Một phần đã thể hiện trong source',
  placeholder: 'Placeholder',
  'source-only': 'Source, chưa xác minh runtime',
  design: 'Thiết kế / scaffold',
  'deployed-verified': 'Runtime đã xác minh',
  historical: 'Lịch sử',
};
const evidenceText: Record<EvidenceRef['kind'], string> = {
  'verified-source': 'Source đã kiểm tra',
  'verified-runtime': 'Runtime đã kiểm tra',
  'user-attested': 'Tự khai báo',
  'design-doc': 'Tài liệu thiết kế',
  'learning-lab': 'Hướng học tập',
  unverified: 'Chưa xác minh',
};
const evidenceById = new Map(evidence.map((item) => [item.id, item]));
const repositoryById = new Map(repositories.map((item) => [item.id, item]));

function externalLink(url: string, label: string, className = 'text-link'): string {
  return `<a class="${className}" href="${esc(url)}" target="_blank" rel="noreferrer noopener">${esc(label)} <span aria-hidden="true">↗</span></a>`;
}

function evidenceBlock(refIds: string[]): string {
  const refs = refIds.map((id) => evidenceById.get(id)).filter((item): item is EvidenceRef => Boolean(item));
  if (!refs.length) return '<p class="muted">Chưa có evidence tham chiếu.</p>';
  return `<ul class="evidence-list">${refs.map((ref) => {
    const repository = ref.repoId ? repositoryById.get(ref.repoId) : undefined;
    const source = ref.url ? externalLink(ref.url, 'Mở source') : '';
    return `<li class="evidence-item"><div class="evidence-meta"><span class="evidence-kind">${esc(evidenceText[ref.kind])}</span><time datetime="${esc(ref.observedAt)}">Quan sát ${esc(ref.observedAt)}</time></div><strong>${esc(repository?.name ?? 'Kinh nghiệm / học tập')}${ref.path ? ` · ${esc(ref.path)}` : ''}</strong><p>${esc(ref.note)}</p>${source}</li>`;
  }).join('')}</ul>`;
}

function projectEvidence(project: PortfolioProject): string {
  return `<div class="proof-grid">${project.featureProofs.map((feature) => `<article class="proof-card"><div class="proof-heading"><strong>${esc(feature.label)}</strong><span class="state-badge" data-state="${esc(feature.state)}">${esc(stateText[feature.state])}</span></div>${feature.limitation ? `<p>${esc(feature.limitation)}</p>` : ''}<details><summary>Xem evidence</summary>${evidenceBlock(feature.evidenceRefIds)}</details></article>`).join('')}</div>`;
}

function projectCard(project: PortfolioProject, index: number): string {
  const repoLinks = project.repositoryIds.map((id) => repositoryById.get(id)).filter((repo) => Boolean(repo?.url));
  const tags = project.stack.slice(0, 5).map((tag) => `<span class="tag">${esc(tag)}</span>`).join('');
  return `<article class="work-card card" data-project-card data-name="${esc(`${project.name} ${project.category} ${project.stack.join(' ')}`.toLowerCase())}">
    <div class="card-topline"><span class="card-index">${String(index + 1).padStart(2, '0')}</span><span class="state-badge" data-state="${esc(project.status)}">${esc(stateText[project.status])}</span></div>
    <p class="project-sub">${esc(project.category)}${project.period ? ` · ${esc(project.period)}` : ''}</p><h2>${esc(project.name)}</h2><p class="work-summary">${esc(project.summary)}</p>
    <div class="tag-row" aria-label="Công nghệ">${tags}</div>
    <div class="card-actions"><a class="btn btn-primary btn-small" href="#/projects/${encodeURIComponent(project.slug)}">Xem bằng chứng <span aria-hidden="true">→</span></a>${repoLinks.length ? repoLinks.map((repo) => externalLink(repo!.url!, 'Source', 'btn btn-ghost btn-small')).join('') : '<span class="link-note">Không có liên kết source công khai</span>'}<button class="text-button" type="button" data-quickview="${esc(project.slug)}">Xem nhanh</button></div>
  </article>`;
}

function caseCard(item: (typeof portfolioCaseStudies)[number], index: number): string {
  return `<article class="case-card card"><span class="card-index">CASE ${String(index + 1).padStart(2, '0')}</span><h2>${esc(item.title)}</h2><p>${esc(item.context)}</p><a class="text-link" href="#/case-studies/${encodeURIComponent(item.slug)}">Đọc case <span aria-hidden="true">→</span></a></article>`;
}

function layoutIntro(kicker: string, title: string, description: string, id = 'main-heading'): string {
  return `<header class="page-intro"><p class="section-kicker">${esc(kicker)}</p><h1 id="${esc(id)}" tabindex="-1">${esc(title)}</h1><p>${esc(description)}</p></header>`;
}

function homePage(): string {
  const featured = ['nanobio-mobile', 'study2work', 'hvc-evolution', 'ai-local'].map((id) => portfolioProjects.find((project) => project.id === id)).filter((item): item is PortfolioProject => Boolean(item));
  return `<div class="home-page shell">
    <section class="hero-panel" aria-labelledby="main-heading"><div class="hero-copy"><p class="section-kicker">FULL-STACK DEVELOPER · VIETNAM</p><h1 id="main-heading" tabindex="-1">Đào Văn Hùng</h1><p class="hero-lede">Tôi kết nối bài toán nghiệp vụ với API, dữ liệu, ứng dụng và kiểm chứng kỹ thuật.</p><p class="hero-detail">Tập trung vào Python/FastAPI, Flutter, PostgreSQL/Supabase và system analysis. Mỗi dự án được ghi rõ phần source, trạng thái runtime và giới hạn bằng chứng.</p><div class="hero-actions"><a class="btn btn-primary" href="#/projects">Xem dự án <span aria-hidden="true">→</span></a><a class="btn btn-ghost" href="#/case-studies">Đọc case kỹ thuật</a><a class="btn btn-ghost" href="mailto:daohungmt2005@gmail.com">Liên hệ</a></div></div><aside class="hero-aside" aria-label="Hướng kỹ thuật"><p class="aside-label">ENGINEERING FOCUS</p><ul><li>Backend API & data contracts</li><li>Flutter & local-first flows</li><li>Source audit, testing & delivery</li></ul><p class="availability-note">Tình trạng sản phẩm được ghi riêng với tình trạng URL.</p></aside></section>
    <section class="home-section" aria-labelledby="featured-heading"><div class="section-heading-row"><div><p class="section-kicker">SELECTED WORK</p><h2 id="featured-heading">Dự án tiêu biểu</h2></div><a class="text-link" href="#/projects">Tất cả dự án →</a></div><div class="work-grid">${featured.map((project, i) => projectCard(project, i)).join('')}</div></section>
    <section class="home-section" aria-labelledby="experience-heading"><div class="section-heading-row"><div><p class="section-kicker">EXPERIENCE</p><h2 id="experience-heading">Kinh nghiệm liên quan</h2></div></div><div class="experience-grid">${portfolioExperiences.map((item) => `<article class="experience-card"><p class="experience-period">${esc(item.period)}</p><h3>${esc(item.role)}</h3><p class="experience-org">${esc(item.organization)}</p><p>${esc(item.summary)}</p><span class="evidence-kind">${item.attribution === 'user-attested' ? 'Tự khai báo' : item.attribution === 'mixed' ? 'Source + tự khai báo' : 'Source đã kiểm tra'}</span></article>`).join('')}</div></section>
    <section class="home-section" aria-labelledby="capability-heading"><div class="section-heading-row"><div><p class="section-kicker">CAPABILITIES</p><h2 id="capability-heading">Cách tôi làm kỹ thuật</h2></div></div><div class="capability-grid">${capabilityMappings.map((item) => `<article class="capability-card"><span class="state-badge" data-state="${esc(item.state)}">${esc(stateText[item.state])}</span><h3>${esc(item.label)}</h3><p>${item.projectIds.map((id) => portfolioProjects.find((project) => project.id === id)?.name).filter((name): name is string => Boolean(name)).map(esc).join(' · ')}</p></article>`).join('')}</div></section>
    <section class="recruiter-note"><div><p class="section-kicker">HOW I WORK</p><h2>Yêu cầu → source → kiểm chứng → bàn giao</h2><p>AI có thể hỗ trợ phân tích và viết mã; tôi giữ rõ phạm vi, kiểm tra thay đổi và ghi nhận phần chưa xác minh.</p></div><a class="btn btn-primary" href="#/process">Quy trình làm việc →</a></section>
    <dialog class="quick-dialog" id="quickView" aria-labelledby="quickTitle"><button class="dialog-close" type="button" aria-label="Đóng xem nhanh">×</button><div id="quickContent"></div></dialog>
  </div>`;
}

function projectIndexPage(): string {
  return `<div class="shell page-shell">${layoutIntro('PROJECTS · SOURCE FIRST', 'Dự án', 'Mười lăm repository có source và một dự án nội bộ/riêng tư được kiểm kê. My_Courses trống nên không có project card. Trạng thái link được xác minh riêng; trang này không suy ra deployment từ source.')}
  <div class="filter-row"><label for="projectSearch">Tìm theo tên, domain hoặc stack</label><input id="projectSearch" type="search" autocomplete="off" placeholder="Ví dụ: Flutter, API, Supabase"><span id="projectCount" aria-live="polite">${portfolioProjects.length} mục</span></div>
  <div class="work-grid" id="projectGrid">${portfolioProjects.map(projectCard).join('')}</div><p class="empty-state" id="projectEmpty" hidden>Không tìm thấy dự án phù hợp.</p></div>`;
}

function projectDetailPage(project: PortfolioProject): string {
  const repos = project.repositoryIds.map((id) => repositoryById.get(id)).filter(Boolean);
  const relatedCases = portfolioCaseStudies.filter((item) => item.evidenceRefIds.some((id) => project.evidenceRefIds.includes(id)));
  return `<div class="shell page-shell detail-page">${layoutIntro('PROJECT DETAIL', project.name, project.summary)}
  <div class="detail-toolbar"><span class="state-badge" data-state="${esc(project.status)}">${esc(stateText[project.status])}</span><span class="state-badge state-neutral">URL: ${esc(project.liveAvailability === 'unknown' ? 'chưa kiểm tra' : project.liveAvailability === 'reachable' ? 'đã truy cập' : 'không truy cập được')}</span>${project.featureVerifiedAt ? `<span class="muted">Feature check: ${esc(project.featureVerifiedAt)}</span>` : '<span class="muted">Chưa có runtime verification date</span>'}</div>
  <div class="detail-columns"><section class="detail-main"><section class="content-panel"><h2>Phạm vi và vai trò</h2><p>${esc(project.category)}${project.period ? ` · ${esc(project.period)}` : ''}</p><p><strong>Vai trò:</strong> ${esc(project.role)}</p><p><strong>Repository:</strong> ${repos.map((repo) => repo?.url ? externalLink(repo.url, repo.name) : `<span class="muted">${esc(repo?.name ?? '')} · không public link</span>`).join(' · ')}</p><div class="tag-row">${project.stack.map((tag) => `<span class="tag">${esc(tag)}</span>`).join('')}</div></section>
  <section class="content-panel"><h2>Feature proofs</h2>${projectEvidence(project)}</section>
  ${relatedCases.length ? `<section class="content-panel"><h2>Case liên quan</h2><ul class="clean-list">${relatedCases.map((item) => `<li><a class="text-link" href="#/case-studies/${encodeURIComponent(item.slug)}">${esc(item.title)} →</a></li>`).join('')}</ul></section>` : ''}
  </section><aside class="detail-aside"><section class="content-panel"><h2>Giới hạn đã ghi nhận</h2><ul class="clean-list">${project.limitations.map((item) => `<li>${esc(item)}</li>`).join('')}</ul></section><section class="content-panel"><h2>Evidence nguồn</h2>${evidenceBlock(project.evidenceRefIds)}</section></aside></div><a class="back-link" href="#/projects">← Tất cả dự án</a></div>`;
}

function caseIndexPage(): string {
  return `<div class="shell page-shell">${layoutIntro('ENGINEERING CASES', 'Case kỹ thuật', 'Tám tình huống mô tả cách đọc source, phân biệt ranh giới và giới hạn kết luận theo evidence.')}
  <div class="case-grid">${portfolioCaseStudies.map(caseCard).join('')}</div></div>`;
}

function caseDetailPage(item: (typeof portfolioCaseStudies)[number]): string {
  return `<div class="shell page-shell detail-page">${layoutIntro('CASE STUDY', item.title, item.context)}
  <div class="detail-columns"><article class="content-panel"><h2>Quy trình xử lý</h2><ol class="approach-list">${item.approach.map((step) => `<li>${esc(step)}</li>`).join('')}</ol><h2>Kết quả được xác nhận</h2><p>${esc(item.result)}</p><h2>Trạng thái</h2><span class="state-badge" data-state="${esc(item.featureState)}">${esc(stateText[item.featureState])}</span><h2>Giới hạn</h2><ul class="clean-list">${item.limitations.map((limitation) => `<li>${esc(limitation)}</li>`).join('')}</ul></article><aside class="content-panel"><h2>Evidence</h2>${evidenceBlock(item.evidenceRefIds)}</aside></div><a class="back-link" href="#/case-studies">← Tất cả case</a></div>`;
}

function labsPage(): string {
  return `<div class="shell page-shell">${layoutIntro('LABS · LEARNING', 'Labs và hướng học', 'Phân biệt nội dung đang học, source study và lab đã chạy. Trang này không tự nhận chứng chỉ hoặc kinh nghiệm pentest.')}
  <div class="lab-grid">${portfolioLabs.map((lab) => `<article class="content-panel lab-card"><div class="card-topline"><span class="evidence-kind">${lab.state === 'learning' ? 'Đang học' : lab.state === 'source-only' ? 'Đọc source' : 'Dự kiến'}</span></div><h2>${esc(lab.title)}</h2><p>${esc(lab.description)}</p><div class="tag-row">${lab.topics.map((topic) => `<span class="tag">${esc(topic)}</span>`).join('')}</div><h3>Giới hạn</h3><ul class="clean-list">${lab.limitations.map((text) => `<li>${esc(text)}</li>`).join('')}</ul><details><summary>Evidence</summary>${evidenceBlock(lab.evidenceRefIds)}</details></article>`).join('')}</div></div>`;
}

function processPage(): string {
  const steps = [
    ['01', 'Nạp context', 'Đọc hướng dẫn dự án, status worktree, source of truth và phạm vi dữ liệu.'],
    ['02', 'Lập kế hoạch', 'Chia thay đổi thành checkpoint nhỏ, xác định acceptance và rủi ro trước khi sửa.'],
    ['03', 'Thực thi', 'Theo boundary của module; giữ diff reviewable và không chuyển dữ liệu riêng tư vào artifact public.'],
    ['04', 'Kiểm chứng', 'Chạy đúng quality gates cần thiết, phân biệt kiểm tra source, build, runtime và thiết bị thật.'],
    ['05', 'Review', 'Đọc lại diff, kiểm tra accessibility/security/privacy và hạ mức claim khi evidence chưa đủ.'],
    ['06', 'Bàn giao', 'Ghi commit, evidence, giới hạn, trạng thái deploy và bước còn lại rõ ràng.'],
  ];
  return `<div class="shell page-shell">${layoutIntro('ENGINEERING PROCESS', 'Quy trình AI-assisted engineering', 'Quy trình tự mô tả: dùng AI để tăng tốc phân tích/triển khai nhưng giữ evidence, kiểm tra và trách nhiệm ở người thực hiện.')}
  <ol class="process-list">${steps.map(([num, title, body]) => `<li class="process-step"><span>${num}</span><div><h2>${title}</h2><p>${body}</p></div></li>`).join('')}</ol>
  <section class="content-panel"><h2>Giới hạn của tuyên bố</h2><p>Đây là mô tả workflow tự khai báo, không phải metric độc lập về năng suất hoặc đánh giá của bên thứ ba.</p>${evidenceBlock(['ev-process-self-report'])}</section></div>`;
}

export interface RouteView { html: string; title: string; description: string; }

export function resolveRoute(hash: string): RouteView {
  const path = hash.replace(/^#/, '').replace(/^\/+/, '');
  if (!path) return { html: homePage(), title: 'Đào Văn Hùng — Full-stack Developer', description: 'Portfolio kỹ thuật với dự án, source evidence và giới hạn verification rõ ràng.' };
  const parts = path.split('/').filter(Boolean).map((part) => decodeURIComponent(part));
  if (parts[0] === 'projects' && parts.length === 1) return { html: projectIndexPage(), title: 'Dự án — Đào Văn Hùng', description: 'Danh mục dự án có trạng thái source, runtime và giới hạn evidence.' };
  if (parts[0] === 'projects' && parts[1]) {
    const project = portfolioProjects.find((item) => item.slug === parts[1]);
    if (project) return { html: projectDetailPage(project), title: `${project.name} — Đào Văn Hùng`, description: project.summary };
  }
  if (parts[0] === 'case-studies' && parts.length === 1) return { html: caseIndexPage(), title: 'Case kỹ thuật — Đào Văn Hùng', description: 'Tám case kỹ thuật mô tả cách xử lý và evidence đi kèm.' };
  if (parts[0] === 'case-studies' && parts[1]) {
    const item = portfolioCaseStudies.find((entry) => entry.slug === parts[1]);
    if (item) return { html: caseDetailPage(item), title: `${item.title} — Case kỹ thuật`, description: item.context };
  }
  if (parts[0] === 'labs' && parts.length === 1) return { html: labsPage(), title: 'Labs và hướng học — Đào Văn Hùng', description: 'Learning labs được phân biệt với kinh nghiệm sản phẩm và kiểm thử chuyên nghiệp.' };
  if (parts[0] === 'process' && parts.length === 1) return { html: processPage(), title: 'Quy trình kỹ thuật — Đào Văn Hùng', description: 'Quy trình AI-assisted engineering tự khai báo và giới hạn của tuyên bố.' };
  return { html: `<div class="shell page-shell not-found">${layoutIntro('404', 'Không tìm thấy trang', 'Đường dẫn này chưa có trong portfolio.') }<a class="btn btn-primary" href="#/">Về trang chính</a></div>`, title: 'Không tìm thấy trang — Đào Văn Hùng', description: 'Không tìm thấy trang portfolio.' };
}

export function renderSiteHeader(): string {
  const links = [['Dự án', '#/projects'], ['Case', '#/case-studies'], ['Labs', '#/labs'], ['Quy trình', '#/process']];
  const nav = links.map(([label, href]) => `<a class="nav-link" href="${href}">${label}</a>`).join('');
  return `<header class="site-header" id="top"><a class="brand" href="#/" aria-label="Đào Văn Hùng, trang chính"><span class="brand-mark">H</span><span class="brand-text">Đào Văn Hùng</span></a><nav class="desktop-nav" aria-label="Điều hướng chính">${nav}</nav><div class="header-actions"><button class="icon-btn mobile-menu-toggle" id="mobileMenuToggle" type="button" aria-expanded="false" aria-controls="mobileNav" aria-label="Mở menu">☰</button><button class="icon-btn" id="themeToggle" type="button" aria-label="Chuyển giao diện">☼</button></div><nav class="mobile-nav" id="mobileNav" aria-label="Điều hướng di động" aria-hidden="true" data-open="false" hidden>${nav}</nav></header>`;
}

export function renderSiteFooter(): string {
  return `<footer class="site-footer shell"><div><strong>Đào Văn Hùng</strong><span>Portfolio kỹ thuật · snapshot nội dung 24/10/2026</span></div><div class="footer-links"><a href="https://github.com/daovanhung-dev" target="_blank" rel="noreferrer noopener">GitHub ↗</a><a href="mailto:daohungmt2005@gmail.com">Email</a><a href="https://www.linkedin.com/in/daovanhung-dev" target="_blank" rel="noreferrer noopener">LinkedIn ↗</a></div></footer>`;
}

export function renderQuickView(slug: string): string {
  const project = portfolioProjects.find((item) => item.slug === slug);
  if (!project) return '<p>Không tìm thấy dự án.</p>';
  return `<p class="section-kicker">PROJECT QUICK VIEW</p><h2 id="quickTitle">${esc(project.name)}</h2><p>${esc(project.summary)}</p><p><strong>Trạng thái:</strong> ${esc(stateText[project.status])}</p><p><strong>Evidence:</strong> ${project.evidenceRefIds.map((id) => evidenceById.get(id)?.kind).filter(Boolean).join(', ')}</p><a class="btn btn-primary" href="#/projects/${encodeURIComponent(project.slug)}">Mở trang chi tiết →</a>`;
}
