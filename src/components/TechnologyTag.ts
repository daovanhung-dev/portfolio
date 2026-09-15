import { escapeHtml } from './utils';

export function technologyTag(label: string): string {
  return `<span class="technology-tag">${escapeHtml(label)}</span>`;
}

export function technologyTags(labels: string[]): string {
  return labels.map(technologyTag).join('');
}
