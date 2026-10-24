import { evidence } from '../src/data/evidence.ts';
import { navigationLinks, contactLinks } from '../src/data/links.ts';
import { portfolioProjects } from '../src/data/portfolio-content.ts';
import { repositories } from '../src/data/repositories.ts';

const errors = [];
const warnings = [];
const allowedRoutes = new Set(['#/projects', '#/case-studies', '#/labs', '#/process']);
const checkUrl = (url, label) => {
  try {
    const parsed = new URL(url);
    if (!['https:', 'mailto:'].includes(parsed.protocol)) errors.push(`${label} uses unsupported protocol ${parsed.protocol}`);
    return parsed;
  } catch { errors.push(`${label} is malformed`); return null; }
};

for (const item of navigationLinks) if (!allowedRoutes.has(item.url)) errors.push(`Navigation link ${item.label} has no route target`);
for (const link of contactLinks) checkUrl(link.url, `Contact ${link.label}`);
for (const repo of repositories) if (repo.url) checkUrl(repo.url, `Repository ${repo.id}`);
for (const ref of evidence) if (ref.url) checkUrl(ref.url, `Evidence ${ref.id}`);
for (const project of portfolioProjects) if (project.liveUrl) checkUrl(project.liveUrl, `Live product ${project.id}`);

const externalUrls = [...new Set([
  ...contactLinks.map((item) => item.url),
  ...repositories.flatMap((item) => item.url ? [item.url] : []),
  ...evidence.flatMap((item) => item.url ? [item.url] : []),
].filter((url) => url.startsWith('https://')))];

async function probe(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    let response = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: controller.signal });
    if (response.status === 405) response = await fetch(url, { method: 'GET', redirect: 'follow', signal: controller.signal });
    if (!response.ok) warnings.push(`${url} returned HTTP ${response.status}`);
  } catch (error) {
    warnings.push(`${url} could not be checked (${error instanceof Error ? error.message : 'network error'})`);
  } finally { clearTimeout(timer); }
}

await Promise.all(externalUrls.map(probe));
if (errors.length) {
  console.error('Link validation failed:');
  errors.forEach((item) => console.error(`- ${item}`));
  process.exit(1);
}
if (warnings.length) {
  console.warn('External link warnings (non-blocking):');
  warnings.forEach((item) => console.warn(`- ${item}`));
}
console.log(`Links valid: ${navigationLinks.length} hash routes and ${externalUrls.length} external URLs checked.`);
