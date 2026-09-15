import type { Profile } from '../data/types';
import { escapeHtml } from './utils';
import { sectionHeading } from './SectionHeading';

export function renderProfileSummary(profile: Profile): string {
  return `<section class="section shell" id="about" aria-labelledby="about-heading">
    ${sectionHeading('01 — PROFILE', 'Không chỉ viết code. Tôi quan tâm hệ thống chạy đúng từ đầu đến cuối.', profile.summary, 'about')}
    <div class="principles-grid">
      ${profile.principles.map((principle, index) => `<article class="principle card reveal delay-${Math.min(index, 3)}">
        <span>${escapeHtml(principle.number)}</span>
        <h3>${escapeHtml(principle.title)}</h3>
        <p>${escapeHtml(principle.description)}</p>
      </article>`).join('')}
    </div>
  </section>`;
}
