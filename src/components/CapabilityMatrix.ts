import type { CapabilityGroup, CapabilityItem, Experience, Project } from '../data/types';
import { evidenceBadge } from './EvidenceBadge';
import { escapeHtml } from './utils';
import { sectionHeading } from './SectionHeading';

function evidenceNames(item: CapabilityItem, projects: Project[], experiences: Experience[]): string {
  const projectNames = (item.evidenceProjectIds ?? []).map((id) => projects.find((project) => project.id === id)?.name).filter(Boolean) as string[];
  const experienceNames = (item.evidenceExperienceIds ?? []).map((id) => experiences.find((experience) => experience.id === id)?.organization).filter(Boolean) as string[];
  return [...projectNames, ...experienceNames].join(' · ');
}

function renderCapabilityItem(item: CapabilityItem, projects: Project[], experiences: Experience[]): string {
  return `<li class="capability-item"><div><strong>${escapeHtml(item.name)}</strong>${evidenceBadge(item.level)}</div><span>Evidence: ${escapeHtml(evidenceNames(item, projects, experiences))}</span></li>`;
}

export function renderCapabilityMatrix(groups: CapabilityGroup[], projects: Project[], experiences: Experience[]): string {
  return `<section class="section shell" id="capabilities" aria-labelledby="capabilities-heading">
    ${sectionHeading('05 — CAPABILITY MAP', 'Năng lực kỹ thuật có evidence', 'Mỗi nhóm cho biết technology đã được dùng ở đâu và ở mức độ nào.', 'capabilities')}
    <div class="capability-grid">
      ${groups.map((group, index) => `<details class="capability-panel card reveal delay-${index % 3}" open>
        <summary><span class="capability-label">${escapeHtml(group.label)}</span><span><strong>${escapeHtml(group.title)}</strong><small>${escapeHtml(group.description)}</small></span><span class="summary-icon">+</span></summary>
        <ul class="capability-list">${group.items.map((item) => renderCapabilityItem(item, projects, experiences)).join('')}</ul>
      </details>`).join('')}
    </div>
  </section>`;
}
