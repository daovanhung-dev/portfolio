import { contactLinks, navigationLinks, sectionIds } from '../src/data/links.ts';
import { projects } from '../src/data/projects.ts';

const errors = [];
const warnings = [];
const sectionSet = new Set(sectionIds);

function checkUrl(url, label) {
  try {
    const parsed = new URL(url);
    if (!['https:', 'mailto:'].includes(parsed.protocol)) errors.push(`${label}: unsupported protocol in ${url}`);
    return parsed;
  } catch {
    errors.push(`${label}: malformed URL ${url}`);
    return null;
  }
}

for (const link of navigationLinks) {
  if (!link.url.startsWith('#')) errors.push(`Navigation link ${link.label} must be an internal anchor`);
  else if (!sectionSet.has(link.url.slice(1))) errors.push(`Navigation link ${link.label} points to missing section ${link.url}`);
}

for (const link of contactLinks) checkUrl(link.url, `Contact link ${link.label}`);
for (const project of projects) {
  if (project.repository) checkUrl(project.repository, `${project.name} repository`);
  if (project.liveUrl) checkUrl(project.liveUrl, `${project.name} live URL`);
  for (const link of project.relatedUrls ?? []) checkUrl(link.url, `${project.name} ${link.label}`);
}
const externalUrls = [...new Set([
  ...contactLinks.map((link) => link.url),
  ...projects.flatMap((project) => [project.repository, project.liveUrl, ...(project.relatedUrls ?? []).map((link) => link.url)]),
].filter((url) => url?.startsWith('https://')))]
  .map((url) => ({ url, parsed: checkUrl(url, 'External URL') }))
  .filter(({ parsed }) => parsed);

async function probe({ url }) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    let response = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: controller.signal });
    if (response.status === 405) response = await fetch(url, { method: 'GET', redirect: 'follow', signal: controller.signal });
    if (!response.ok) warnings.push(`${url} returned HTTP ${response.status}`);
  } catch (error) {
    warnings.push(`${url} could not be checked (${error instanceof Error ? error.message : 'network error'})`);
  } finally {
    clearTimeout(timer);
  }
}

await Promise.all(externalUrls.map(probe));

if (warnings.length) {
  console.warn('External link warnings (non-blocking):');
  warnings.forEach((warning) => console.warn(`- ${warning}`));
}
if (errors.length) {
  console.error('Link validation failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Links valid: ${navigationLinks.length} internal anchors and ${externalUrls.length} external URLs checked.`);
