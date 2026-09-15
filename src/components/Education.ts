import type { Education } from '../data/types';
import { escapeHtml } from './utils';

export function renderEducation(education: Education): string {
  return `<section class="section shell" id="education" aria-labelledby="education-heading">
    <div class="education-card card reveal">
      <div><p class="section-kicker">09 — EDUCATION</p><h2 id="education-heading">${escapeHtml(education.institution)} — ${escapeHtml(education.field)}</h2><p>${escapeHtml(education.cohort)} · ${escapeHtml(education.graduation)}</p><p class="education-note">${escapeHtml(education.note)}</p></div>
      <div class="edu-stats">${education.stats.map((stat) => `<div><strong>${escapeHtml(stat.value)}</strong><span>${escapeHtml(stat.label)}</span></div>`).join('')}</div>
    </div>
  </section>`;
}
