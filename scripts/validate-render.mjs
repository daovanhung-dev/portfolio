import { access, readFile, readdir } from 'node:fs/promises';
import { constants } from 'node:fs';
import { extname, join, relative, resolve, sep } from 'node:path';
import { readPortfolioData } from './content-data.mjs';

const root = resolve(new URL('..', import.meta.url).pathname);
const dist = join(root, 'dist');
const base = '/portfolio/';
const origin = 'https://daovanhung-dev.github.io';
const errors = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  }));
  return nested.flat();
}

async function exists(path) {
  try {
    await access(path, constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

async function resolveInternal(pathname) {
  if (!pathname.startsWith(base)) {
    errors.push('Internal URL is outside the configured base: ' + pathname);
    return;
  }
  const relativePath = pathname.slice(base.length);
  let artifactPath;
  if (!relativePath) artifactPath = join(dist, 'index.html');
  else if (relativePath.endsWith('/')) artifactPath = join(dist, relativePath, 'index.html');
  else if (extname(relativePath)) artifactPath = join(dist, relativePath);
  else artifactPath = join(dist, relativePath, 'index.html');
  if (!await exists(artifactPath)) errors.push('Internal URL has no build artifact: ' + pathname);
}

const portfolio = await readPortfolioData();
const expectedRoutes = [
  'index.html',
  'projects/index.html',
  'experience/index.html',
  'skills/index.html',
  'labs/index.html',
  'about/index.html',
  'contact/index.html',
  'case-studies/index.html',
  '404.html',
  ...portfolio.collections.projects.map((entry) => 'projects/' + entry.slug + '/index.html'),
  ...portfolio.collections.cases.map((entry) => 'case-studies/' + entry.slug + '/index.html'),
];
for (const path of expectedRoutes) {
  if (!await exists(join(dist, path))) errors.push('Expected route was not built: ' + path);
}

const htmlFiles = (await walk(dist)).filter((path) => path.endsWith('.html'));
if (htmlFiles.length !== expectedRoutes.length) {
  errors.push('Expected ' + expectedRoutes.length + ' HTML routes, found ' + htmlFiles.length);
}

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const relativePage = relative(dist, file).split(sep).join('/');
  const is404 = relativePage === '404.html';
  if (is404) {
    if (!/name="robots" content="noindex, nofollow"/.test(html)) errors.push('404 must be noindex');
    if (/rel="canonical"/.test(html)) errors.push('404 must not advertise itself as a canonical page');
  } else {
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    const expectedSuffix = relativePage === 'index.html'
      ? ''
      : relativePage.replace(/\/index\.html$/, '').replace(/\.html$/, '');
    const expected = origin + base + expectedSuffix + (expectedSuffix ? '/' : '');
    if (canonical !== expected) errors.push(relativePage + ' canonical mismatch: ' + (canonical ?? 'missing'));
    if (canonical?.includes('/portfolio/portfolio/')) errors.push(relativePage + ' canonical repeats the Pages base');
  }

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const value = match[1];
    if (value.startsWith('#') || value.startsWith('mailto:') || value.startsWith('https://') || value.startsWith('http://')) continue;
    if (!value.startsWith('/')) {
      errors.push(relativePage + ' has a non-root internal URL: ' + value);
      continue;
    }
    await resolveInternal(new URL(value, origin).pathname);
  }

  if (!html.includes('property="og:image" content="' + origin + base + 'og-portfolio.png"')) {
    errors.push(relativePage + ' is missing the base-aware Open Graph image');
  }
  if (/hung-quynh|our-story-private|github\.com\/[^" ]*(story|birthday)/i.test(html)) {
    errors.push(relativePage + ' contains restricted source details');
  }
  if (/tự xác nhận|tự thuật|MISSING_SOURCE|unverified|chưa được cung cấp|mức attribution/i.test(html)) {
    errors.push(relativePage + ' contains internal attribution or missing-source language');
  }
}

const [indexHtml, childSitemap, robots, ogImage] = await Promise.all([
  readFile(join(dist, 'sitemap-index.xml'), 'utf8').catch(() => ''),
  readFile(join(dist, 'sitemap-0.xml'), 'utf8').catch(() => ''),
  readFile(join(dist, 'robots.txt'), 'utf8').catch(() => ''),
  readFile(join(dist, 'og-portfolio.png')).catch(() => new Uint8Array(0)),
]);
if (!indexHtml.includes(origin + base + 'sitemap-0.xml')) errors.push('Sitemap index is missing the project base');
if (!childSitemap || !childSitemap.includes(origin + base)) errors.push('Sitemap URLs are missing the project base');
if (!robots.includes('Sitemap: ' + origin + base + 'sitemap-index.xml')) errors.push('robots.txt sitemap URL is incorrect');
if (ogImage.length < 24 || String.fromCharCode(...ogImage.subarray(1, 4)) !== 'PNG') {
  errors.push('Open Graph PNG is missing or invalid');
} else {
  const width = (ogImage[16] << 24) | (ogImage[17] << 16) | (ogImage[18] << 8) | ogImage[19];
  const height = (ogImage[20] << 24) | (ogImage[21] << 16) | (ogImage[22] << 8) | ogImage[23];
  if (width !== 1200 || height !== 630) errors.push('Open Graph PNG must be 1200×630');
}

if (errors.length) {
  console.error('Rendered artifact validation failed:');
  for (const error of [...new Set(errors)]) console.error('- ' + error);
  process.exitCode = 1;
} else {
  console.log('Rendered artifact valid: ' + htmlFiles.length + ' static routes, base-aware canonical/assets/sitemap/404, and 1200×630 OG image.');
}
