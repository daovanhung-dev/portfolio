import { escapeHtml } from './utils';

export function sectionHeading(number: string, title: string, description: string, id?: string): string {
  return `<div class="section-heading compact reveal">
    <div><p class="section-kicker">${escapeHtml(number)}</p><h2${id ? ` id="${escapeHtml(id)}-heading"` : ''}>${escapeHtml(title)}</h2></div>
    <p>${escapeHtml(description)}</p>
  </div>`;
}
