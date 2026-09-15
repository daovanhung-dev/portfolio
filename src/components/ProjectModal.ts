import type { Project } from '../data/types';
import { escapeHtml, externalAttrs } from './utils';
import { technologyTags } from './TechnologyTag';

function renderLinks(project: Project): string {
  const links = [];
  if (project.repository) {
    links.push(`<a class="btn btn-small btn-primary" href="${escapeHtml(project.repository)}"${externalAttrs(project.repository)}>GitHub ↗</a>`);
  } else {
    links.push('<span class="link-note">Repository nội bộ hoặc chưa có repo public</span>');
  }
  if (project.liveUrl) {
    links.push(`<a class="btn btn-small btn-ghost" href="${escapeHtml(project.liveUrl)}"${externalAttrs(project.liveUrl)}>Demo ↗</a>`);
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

  return `<div class="modal-header">
      <div><span class="status-label">${escapeHtml(project.status)}</span><p class="modal-category">${escapeHtml(project.category)}</p></div>
      <h2 id="modal-title">${escapeHtml(project.name)}</h2>
      <p class="modal-role">${escapeHtml(project.role)}</p>
    </div>
    <div class="modal-section modal-overview"><p class="modal-label">Tổng quan</p><p id="modal-summary">${escapeHtml(project.summary)}</p></div>
    <div class="modal-section"><p class="modal-label">Công nghệ</p><div class="modal-stack">${stack}</div></div>
    <div class="modal-section"><p class="modal-label">Kiến trúc</p><p>${escapeHtml(project.architecture)}</p></div>
    <div class="modal-section"><p class="modal-label">Công việc mình đã làm</p><ul class="clean-list">${project.workDone.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul></div>
    <div class="modal-actions">${renderLinks(project)}</div>`;
}
