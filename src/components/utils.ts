export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function externalAttrs(url: string): string {
  if (url.startsWith('mailto:') || url.startsWith('#')) return '';
  return ' target="_blank" rel="noreferrer"';
}

export function linkItem(label: string, url: string, className = ''): string {
  return `<a class="${className}" href="${escapeHtml(url)}"${externalAttrs(url)}>${escapeHtml(label)}</a>`;
}

export function slug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
