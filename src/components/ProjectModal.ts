import type { Project } from '../data/types';
import { evidenceBadge, statusBadge } from './EvidenceBadge';
import { escapeHtml, externalAttrs } from './utils';
import { technologyTags } from './TechnologyTag';

export function renderProjectModalContent(project: Project): string {
  const stack = Object.entries(project.stack).map(([label, technologies]) => `<div class="modal-stack-group"><strong>${escapeHtml(label)}</strong><div>${technologyTags(technologies)}</div></div>`).join('');
  const links = [
    project.liveUrl ? `<a class="btn btn-small btn-primary" href="${escapeHtml(project.liveUrl)}"${externalAttrs(project.liveUrl)}>Live Demo ↗</a>` : '',
    project.repository ? `<a class="btn btn-small btn-ghost" href="${escapeHtml(project.repository)}"${externalAttrs(project.repository)}>Repository ↗</a>` : '',
    ...(project.relatedUrls ?? []).map((link) => `<a class="btn btn-small btn-ghost" href="${escapeHtml(link.url)}"${externalAttrs(link.url)}>${escapeHtml(link.label)} ↗</a>`),
  ].join('');

  return `<div class="modal-eyebrow">${statusBadge(project.status)}${evidenceBadge(project.evidenceLevel)}</div>
    <h2 id="modal-title">${escapeHtml(project.name)}</h2>
    <p class="modal-category">${escapeHtml(project.category)}</p>
    <div class="modal-grid">
      <div><p class="modal-label">Overview</p><p>${escapeHtml(project.summary)}</p></div>
      <div><p class="modal-label">Role</p><p>${escapeHtml(project.role)}</p></div>
      <div><p class="modal-label">Problem</p><p>${escapeHtml(project.problem)}</p></div>
      <div><p class="modal-label">Architecture / solution</p><p>${escapeHtml(project.solution)}</p></div>
    </div>
    <div class="modal-section"><p class="modal-label">What I built / evidence</p><ul class="clean-list">${project.highlights.map((highlight) => `<li>${escapeHtml(highlight)}</li>`).join('')}</ul></div>
    <div class="modal-section"><p class="modal-label">Tech stack</p><div class="modal-stack">${stack}</div></div>
    <div class="modal-actions">${links}</div>`;
}
