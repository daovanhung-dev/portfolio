import type { Experience } from '../data/types';
import { escapeHtml } from './utils';
import { technologyTags } from './TechnologyTag';

export function renderExperienceTimeline(experiences: Experience[]): string {
  return `<section class="section shell" id="experience" aria-labelledby="experience-heading">
    <div class="section-intro motion-reveal" data-motion-delay="0">
      <p class="section-kicker">01 · WORK TIMELINE</p>
      <h1 id="experience-heading">Mình đã làm gì và phát triển như thế nào?</h1>
      <p>Những mốc dưới đây được sắp theo hành trình làm việc. Bạn có thể xem dự án tương ứng ở phần tiếp theo.</p>
    </div>
    <div class="timeline" aria-label="Work timeline">
      ${experiences.slice().sort((a, b) => a.order - b.order).map((experience, index) => `<article class="timeline-item motion-reveal" data-motion-delay="${Math.min(index + 1, 7)}">
        <span class="timeline-node" aria-hidden="true"></span>
        <div class="timeline-meta"><span>${escapeHtml(experience.period)}</span><strong>${escapeHtml(experience.organization)}</strong></div>
        <div class="timeline-content card">
          <div class="role-head"><div><p class="timeline-number">${String(experience.order).padStart(2, '0')}</p><h2>${escapeHtml(experience.role)}</h2></div><span class="status-label">${escapeHtml(experience.status)}</span></div>
          <p class="experience-summary">${escapeHtml(experience.summary)}</p>
          <ul class="clean-list">${experience.highlights.slice(0, 3).map((highlight) => `<li>${escapeHtml(highlight)}</li>`).join('')}</ul>
          <div class="tag-row">${technologyTags(experience.stack)}</div>
        </div>
      </article>`).join('')}
    </div>
  </section>`;
}
