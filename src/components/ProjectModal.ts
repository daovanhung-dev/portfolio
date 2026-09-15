import type { Project } from '../data/types';
import { escapeHtml, externalAttrs } from './utils';
import { technologyTags } from './TechnologyTag';

function renderTextSection(label: string, value: string | undefined, className = ''): string {
  if (!value) return '';
  return `<div class="modal-section modal-motion-section ${className}"><p class="modal-label">${escapeHtml(label)}</p><p>${escapeHtml(value)}</p></div>`;
}

function renderLinks(project: Project): string {
  const links = [];
  if (project.repository) {
    links.push(`<a class="btn btn-small btn-primary" href="${escapeHtml(project.repository)}"${externalAttrs(project.repository)}>GitHub ↗</a>`);
  } else {
    const note = project.id === 'fpt-enterprise' || project.id === 'linguasphere'
      ? 'Repository nội bộ'
      : 'Chưa có repository public';
    links.push(`<span class="link-note">${note}</span>`);
  }
  if (project.liveUrl) {
    links.push(`<a class="btn btn-small btn-ghost" href="${escapeHtml(project.liveUrl)}"${externalAttrs(project.liveUrl)}>Demo ↗</a>`);
  } else {
    links.push('<span class="link-note">Chưa có demo public</span>');
  }
  for (const link of project.relatedUrls ?? []) {
    links.push(`<a class="btn btn-small btn-ghost" href="${escapeHtml(link.url)}"${externalAttrs(link.url)}>${escapeHtml(link.label)} ↗</a>`);
  }
  return links.join('');
}

export function renderProjectModalContent(project: Project): string {
  const stack = Object.entries(project.stack)
    .map(([label, technologies]) => `<div class="modal-stack-group"><strong>${escapeHtml(label)}</strong><div>${technologyTags(technologies)}</div></div>`)
    .join('');
  const users = project.users?.length ? `<div class="modal-detail"><strong>Người dùng</strong><div class="tag-row">${technologyTags(project.users)}</div></div>` : '';
  const evidence = project.evidence?.length ? `<div class="modal-detail"><strong>Bằng chứng</strong><ul class="clean-list">${project.evidence.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul></div>` : '';
  const limitations = project.limitations?.length ? `<div class="modal-detail"><strong>Phạm vi hiện tại</strong><ul class="clean-list">${project.limitations.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul></div>` : '';

  return `<div class="modal-header modal-motion-section">
      <div><span class="status-label">${escapeHtml(project.status)}</span><p class="modal-category">${escapeHtml(project.category)}</p></div>
      <h2 id="modal-title">${escapeHtml(project.name)}</h2>
      <p class="modal-role">${escapeHtml(project.role)}</p>
    </div>
    <div class="modal-section modal-motion-section modal-overview"><p class="modal-label">Tổng quan</p><p id="modal-summary">${escapeHtml(project.summary)}</p>${project.problem ? `<p class="modal-detail-text"><strong>Bài toán:</strong> ${escapeHtml(project.problem)}</p>` : ''}${project.solution ? `<p class="modal-detail-text"><strong>Giải pháp:</strong> ${escapeHtml(project.solution)}</p>` : ''}${users}</div>
    <div class="modal-section modal-motion-section"><p class="modal-label">Công nghệ</p><div class="modal-stack">${stack}</div></div>
    ${renderTextSection('Kiến trúc', project.architecture)}
    ${renderTextSection('Business flow', project.businessFlow)}
    <div class="modal-section modal-motion-section"><p class="modal-label">Công việc mình đã làm</p><ul class="clean-list">${project.workDone.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul></div>
    ${(evidence || limitations || project.quality?.length) ? `<div class="modal-section modal-motion-section modal-evidence"><p class="modal-label">Phạm vi & bằng chứng</p>${project.quality?.length ? `<div class="modal-detail"><strong>Quality</strong><ul class="clean-list">${project.quality.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul></div>` : ''}${evidence}${limitations}</div>` : ''}
    <div class="modal-actions modal-motion-section">${renderLinks(project)}</div>`;
}
