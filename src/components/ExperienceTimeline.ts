import type { Experience } from '../data/types';
import { evidenceBadge } from './EvidenceBadge';
import { escapeHtml } from './utils';
import { technologyTags } from './TechnologyTag';
import { sectionHeading } from './SectionHeading';

export function renderExperienceTimeline(experiences: Experience[]): string {
  return `<section class="section shell" id="experience" aria-labelledby="experience-heading">
    ${sectionHeading('02 — EXPERIENCE', 'Kinh nghiệm làm việc', 'Các mốc dưới đây ưu tiên thông tin có thể bảo vệ khi phỏng vấn.', 'experience')}
    <div class="timeline">
      ${experiences.map((experience, index) => `<article class="timeline-item reveal delay-${Math.min(index % 4, 3)}">
        <div class="timeline-meta"><span>${escapeHtml(experience.period)}</span><strong>${escapeHtml(experience.organization)}</strong></div>
        <div class="timeline-content card">
          <div class="role-head"><div><p class="role-type">${escapeHtml(experience.evidenceLevel)}</p><h3>${escapeHtml(experience.role)}</h3></div>${evidenceBadge(experience.evidenceLevel)}</div>
          <p class="experience-summary">${escapeHtml(experience.summary)}</p>
          <ul class="clean-list">${experience.highlights.map((highlight) => `<li>${escapeHtml(highlight)}</li>`).join('')}</ul>
          <div class="tag-row">${technologyTags(experience.stack)}</div>
        </div>
      </article>`).join('')}
    </div>
  </section>`;
}
