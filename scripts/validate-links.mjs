import { readFile } from 'node:fs/promises';
import { readPortfolioData } from './content-data.mjs';

const portfolio = await readPortfolioData();
const errors = [];
const warnings = [];
const routePaths = [
  '/', '/projects/', '/experience/', '/skills/', '/labs/', '/about/', '/contact/', '/case-studies/',
];
for (const item of portfolio.collections.experiences.filter((entry) => entry.data.detailPage)) {
  routePaths.push('/experience/' + item.slug + '/');
}
for (const project of portfolio.collections.projects) routePaths.push('/projects/' + project.slug + '/');
for (const item of portfolio.collections.cases) routePaths.push('/case-studies/' + item.slug + '/');
const ubuntuServer = JSON.parse(await readFile(new URL('../src/data/ubuntuServerGuides.json', import.meta.url), 'utf8'));
const ubuntuAliases = JSON.parse(await readFile(new URL('../src/data/ubuntuServerAliases.json', import.meta.url), 'utf8'));
const ubuntuRunbookSource = await readFile(new URL('../docs/source/ubuntu-server-from-zero-to-production-v3.md', import.meta.url), 'utf8');
routePaths.push('/ubuntu-server/');
routePaths.push('/ubuntu-server/runbook/');
const ubuntuGuideSlugs = new Set(ubuntuServer.guides.map((guide) => guide.slug));
const ubuntuAliasSlugs = new Set(ubuntuAliases.map((alias) => alias.slug));
if (ubuntuAliases.length !== ubuntuGuideSlugs.size || ubuntuAliasSlugs.size !== ubuntuAliases.length) {
  errors.push('Ubuntu Server legacy aliases must uniquely cover every previous guide route');
}
for (const slug of ubuntuGuideSlugs) {
  if (!ubuntuAliasSlugs.has(slug)) errors.push('Ubuntu Server guide has no legacy route: ' + slug);
}
for (const alias of ubuntuAliases) {
  if (!ubuntuGuideSlugs.has(alias.slug)) errors.push('Ubuntu Server alias has no previous guide: ' + alias.slug);
  const headingExists = ubuntuRunbookSource.split(/\r?\n/).some((line) => line.replace(/^#{1,6}\s+/, '').trim() === alias.targetHeading);
  if (!headingExists) errors.push('Ubuntu Server alias target heading is missing: ' + alias.slug + ' → ' + alias.targetHeading);
  routePaths.push('/ubuntu-server/' + alias.slug + '/');
}

for (const entry of portfolio.collections.projects) {
  for (const slug of entry.data.caseSlugs ?? []) {
    if (!portfolio.collections.cases.some((item) => item.slug === slug)) errors.push('Project case link has no route: ' + slug);
  }
}
for (const item of portfolio.collections.cases) {
  for (const slug of item.data.projectSlugs ?? []) {
    if (!portfolio.collections.projects.some((project) => project.slug === slug)) errors.push('Case project link has no route: ' + slug);
  }
}

const urls = new Set([
  ...portfolio.collections.contact.flatMap((entry) => [
    'mailto:' + entry.data.email,
    ...(entry.data.links ?? []).map((link) => link.url),
  ]),
  ...portfolio.collections.projects.flatMap((entry) => entry.data.storeUrl ? [entry.data.storeUrl] : []),
  ...portfolio.evidence.flatMap((item) => item.url ? [item.url] : []),
  ...portfolio.repositories.flatMap((item) => item.url ? [item.url] : []),
  ...portfolio.collections.experiences.flatMap((item) => item.data.mapUrl ? [item.data.mapUrl] : []),
]);

for (const value of urls) {
  try {
    const parsed = new URL(value);
    if (!['https:', 'mailto:'].includes(parsed.protocol)) errors.push('Unsupported URL protocol: ' + parsed.protocol);
  } catch {
    errors.push('Malformed URL: ' + value);
  }
}

if (process.env.CHECK_EXTERNAL_LINKS === '1') {
  async function probe(url) {
    if (!url.startsWith('https://')) return;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    try {
      let response = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: controller.signal });
      if (response.status === 405) response = await fetch(url, { method: 'GET', redirect: 'follow', signal: controller.signal });
      if (!response.ok) warnings.push(url + ' returned HTTP ' + response.status);
    } catch (error) {
      warnings.push(url + ' could not be checked (' + (error instanceof Error ? error.message : 'network error') + ')');
    } finally {
      clearTimeout(timer);
    }
  }
  await Promise.all([...urls].map(probe));
}

if (errors.length) {
  console.error('Link validation failed:');
  for (const error of errors) console.error('- ' + error);
  process.exitCode = 1;
} else {
  console.log('Links valid: ' + routePaths.length + ' public routes and ' + urls.size + ' public URLs checked.');
  for (const warning of warnings) console.warn('External link warning: ' + warning);
}
