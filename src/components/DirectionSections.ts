import type { Profile } from '../data/types';
import { escapeHtml } from './utils';
import { technologyTags } from './TechnologyTag';

export function renderDirectionSections(profile: Profile): string {
  return `<section class="section shell" id="direction" aria-labelledby="direction-heading">
    <div class="dual-grid">
      <article class="card reveal">
        <p class="section-kicker">07 — AI ENGINEERING</p>
        <h2 id="direction-heading">AI là công cụ engineering, không phải nút “generate code”.</h2>
        <p>Tôi sử dụng ChatGPT, Codex, Claude và Stitch AI để tăng tốc nhưng vẫn giữ source-of-truth, test gates và review evidence.</p>
        <div class="mini-process">${profile.aiWorkflow.map((step, index) => `<span>${String(index + 1).padStart(2, '0')} · ${escapeHtml(step)}</span>`).join('')}</div>
      </article>
      <article class="card reveal delay-1" id="security">
        <p class="section-kicker">08 — SECURITY DIRECTION</p>
        <h2>Đang xây nền Cybersecurity / White-hat từ application development.</h2>
        <p>Nền hiện tại gồm các khái niệm Linux, networking, web/API, SQL, auth/RBAC/RLS và debugging. Offensive security là hướng đang tiếp tục xây evidence.</p>
        <div class="security-label">Current foundation</div>
        <div class="tag-row">${technologyTags(profile.securityFoundation)}</div>
        <div class="security-label roadmap-label">Direction</div>
        <div class="mini-process">${profile.securityDirection.map((step) => `<span>${escapeHtml(step)}</span>`).join('')}</div>
      </article>
    </div>
  </section>`;
}
