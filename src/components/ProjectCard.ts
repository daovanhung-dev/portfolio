import type { Project } from '../data/types';
import { evidenceBadge, statusBadge } from './EvidenceBadge';
import { escapeHtml, externalAttrs } from './utils';
import { technologyTags } from './TechnologyTag';

function projectTags(project: Project): string {
  return Object.values(project.stack).flat().slice(0, 8).map((tag) => technologyTags([tag])).join('');
}

export function renderProjectCard(project: Project, index: number): string {
  const liveLink = project.liveUrl
    ? `<a class="card-link" href="${escapeHtml(project.liveUrl)}"${externalAttrs(project.liveUrl)}>Live Demo ↗</a>`
    : '';
  return `<article class="project-card${project.featured ? ' featured' : ''} reveal delay-${index % 3}">
    <div class="project-top"><span class="project-index">${String(index + 1).padStart(2, '0')}</span><div class="badge-group">${statusBadge(project.status)}${evidenceBadge(project.evidenceLevel)}</div></div>
    <h3>${escapeHtml(project.name)}</h3>
    <p class="project-sub">${escapeHtml(project.category)}</p>
    <p>${escapeHtml(project.summary)}</p>
    <div class="project-points">${projectTags(project)}</div>
    <div class="project-actions">
      <button class="text-button" type="button" data-project-id="${escapeHtml(project.id)}" aria-haspopup="dialog">View case details <span>↗</span></button>
      ${liveLink}
      ${project.repository ? `<a class="card-link" href="${escapeHtml(project.repository)}"${externalAttrs(project.repository)}>Repository ↗</a>` : ''}
    </div>
  </article>`;
}

export function renderProjects(projects: Project[]): string {
  return `<section class="section shell" id="projects" aria-labelledby="projects-heading">
    <div class="section-heading compact reveal">
      <div><p class="section-kicker">03 — PROJECTS</p><h2 id="projects-heading">Dự án kỹ thuật tiêu biểu</h2></div>
      <p>Chọn lọc theo giá trị chứng minh năng lực, không theo số lượng technology tags.</p>
    </div>
    <div class="projects-grid">${projects.map(renderProjectCard).join('')}</div>
  </section>`;
}

export function renderProjectDialog(): string {
  return `<div class="modal-shell" id="projectModal" aria-hidden="true">
    <div class="modal-backdrop" data-modal-close></div>
    <section class="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" tabindex="-1">
      <button class="modal-close" type="button" data-modal-close aria-label="Đóng chi tiết project">×</button>
      <div id="modal-content"></div>
    </section>
  </div>`;
}
