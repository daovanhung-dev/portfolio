import type { Profile } from '../data/types';
import { escapeHtml, linkItem } from './utils';
import { technologyTags } from './TechnologyTag';

export function renderHero(profile: Profile): string {
  return `<section class="hero section shell" aria-labelledby="hero-heading">
    <div class="hero-copy reveal">
      <div class="eyebrow"><span class="live-dot"></span>${escapeHtml(profile.availability)}</div>
      <p class="hero-role">${escapeHtml(profile.role)} <span>· Backend Python · Flutter · System Analysis</span></p>
      <h1 id="hero-heading">${escapeHtml(profile.headline.split(' → ')[0])}<span class="gradient-text">${escapeHtml(profile.headline.slice(profile.headline.indexOf(' → ')))}</span></h1>
      <p class="hero-lead">${escapeHtml(profile.supportingStatement)}</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="#experience">Xem kinh nghiệm</a>
        <a class="btn btn-ghost" href="#projects">Xem dự án</a>
        ${linkItem('GitHub ↗', 'https://github.com/daovanhung-dev', 'btn btn-ghost')}
      </div>
      <div class="hero-metrics" role="list" aria-label="Điểm nổi bật">
        ${profile.metrics.map((metric) => `<div class="metric" role="listitem"><strong>${escapeHtml(metric.value)}</strong><span>${escapeHtml(metric.label)}</span></div>`).join('')}
      </div>
    </div>
    <aside class="hero-card reveal delay-1" aria-label="Tóm tắt năng lực">
      <div class="profile-orb"><span>${escapeHtml(profile.shortName)}</span></div>
      <div class="status-pill">Backend Python · Flutter · Product-aware</div>
      <h2>${escapeHtml(profile.name)}</h2>
      <p>Full-stack Developer · API/Data · Frontend/Mobile</p>
      <div class="stack-cloud">${technologyTags(['Python', 'FastAPI', 'Flask', 'Flutter', 'PostgreSQL', 'Supabase', 'Angular', 'Vue', 'React', 'Linux', 'Docker', 'AI'])}</div>
      <div class="terminal" aria-label="Tư duy kỹ thuật">
        <div><span class="prompt">$</span> engineering_profile --summary</div>
        <div class="terminal-output">Evidence-driven. End-to-end. Product-aware.</div>
      </div>
    </aside>
  </section>`;
}
