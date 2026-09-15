import type { Experience, Project } from '../data/types';
import { escapeHtml, externalAttrs } from './utils';
import { technologyTags } from './TechnologyTag';

function projectTags(project: Project): string {
  return Object.values(project.stack).flat().slice(0, 5).map((tag) => technologyTags([tag])).join('');
}

function projectAction(project: Project): string {
  const actions = `<button class="btn btn-small btn-primary" type="button" data-project-id="${escapeHtml(project.id)}" aria-haspopup="dialog">Xem chi tiết</button>`;
  const repository = project.repository
    ? `<a class="btn btn-small btn-ghost" href="${escapeHtml(project.repository)}"${externalAttrs(project.repository)}>GitHub ↗</a>`
    : '<span class="link-note">Repository nội bộ</span>';
  const demo = project.liveUrl
    ? `<a class="btn btn-small btn-ghost" href="${escapeHtml(project.liveUrl)}"${externalAttrs(project.liveUrl)}>Demo ↗</a>`
    : '';
  return `${actions}${repository}${demo}`;
}

export function renderProjectCard(project: Project, experience?: Experience): string {
  const timelineLabel = experience ? `${experience.organization} · ${experience.period}` : 'Dự án bổ sung';
  return `<article class="project-card${project.featured ? ' featured' : ''}">
    <div class="project-top"><span class="project-index">${String(project.order).padStart(2, '0')}</span><span class="status-label">${escapeHtml(project.status)}</span></div>
    <p class="project-timeline">${escapeHtml(timelineLabel)}</p>
    <h3>${escapeHtml(project.name)}</h3>
    <p class="project-sub">${escapeHtml(project.category)}</p>
    <p class="project-summary">${escapeHtml(project.summary)}</p>
    <p class="project-role"><strong>Vai trò:</strong> ${escapeHtml(project.role)}</p>
    <div class="project-points">${projectTags(project)}</div>
    <div class="project-actions">${projectAction(project)}</div>
  </article>`;
}

export function renderProjects(projects: Project[], experiences: Experience[]): string {
  const experienceById = new Map(experiences.map((experience) => [experience.id, experience]));
  const orderedProjects = projects.slice().sort((a, b) => a.order - b.order);
  const timelineProjects = orderedProjects.filter((project) => project.timelineExperienceId);
  const additionalProjects = orderedProjects.filter((project) => !project.timelineExperienceId);
  return `<section class="section shell" id="projects" aria-labelledby="projects-heading">
    <div class="section-intro">
      <p class="section-kicker">02 · PROJECTS</p>
      <h2 id="projects-heading">Các dự án mình đã làm</h2>
      <p>Chọn một dự án để xem công nghệ, kiến trúc, phần việc và link liên quan.</p>
    </div>
    <div class="projects-grid">${timelineProjects.map((project) => renderProjectCard(project, project.timelineExperienceId ? experienceById.get(project.timelineExperienceId) : undefined)).join('')}</div>
    ${additionalProjects.length ? `<div class="additional-projects"><h3>Dự án bổ sung</h3><div class="projects-grid">${additionalProjects.map((project) => renderProjectCard(project)).join('')}</div></div>` : ''}
  </section>`;
}

export function renderProjectDialog(): string {
  return `<div class="modal-shell" id="projectModal" aria-hidden="true">
    <div class="modal-backdrop" data-modal-close></div>
    <section class="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-summary" tabindex="-1">
      <button class="modal-close" type="button" aria-label="Đóng chi tiết dự án">×</button>
      <div id="modal-content"></div>
    </section>
  </div>`;
}
