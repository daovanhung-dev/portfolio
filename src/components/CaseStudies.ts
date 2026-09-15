import type { CaseStudy } from '../data/types';
import { escapeHtml } from './utils';
import { sectionHeading } from './SectionHeading';

export function renderCaseStudies(cases: CaseStudy[]): string {
  return `<section class="section shell" id="cases" aria-labelledby="cases-heading">
    ${sectionHeading('06 — ENGINEERING CASES', 'Case kỹ thuật nổi bật', 'Những tình huống thể hiện cách tôi suy nghĩ khi hệ thống không chạy đúng.', 'cases')}
    <div class="case-grid">
      ${cases.map((caseStudy, index) => `<article class="case-card card reveal delay-${index % 3}">
        <div class="case-num">${escapeHtml(caseStudy.number)}</div>
        <h3>${escapeHtml(caseStudy.title)}</h3>
        <p class="case-problem">${escapeHtml(caseStudy.problem)}</p>
        <div class="flow-line">${caseStudy.flow.map((step, stepIndex) => `${stepIndex ? '<b>→</b>' : ''}<span>${escapeHtml(step)}</span>`).join('')}</div>
        <p class="case-takeaway">${escapeHtml(caseStudy.takeaway)}</p>
      </article>`).join('')}
    </div>
  </section>`;
}
