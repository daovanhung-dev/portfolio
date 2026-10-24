const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function sitePath(path: string): string {
  const clean = '/' + path.replace(/^\/+|\/+$/g, '');
  return clean === '/' ? base + '/' : base + clean + '/';
}

export function siteAsset(path: string): string {
  return base + '/' + path.replace(/^\/+/, '');
}
