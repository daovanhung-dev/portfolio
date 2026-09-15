import { capabilityGroups } from '../src/data/capabilities.ts';
import { caseStudies } from '../src/data/case-studies.ts';
import { experiences } from '../src/data/experience.ts';
import { liveProducts } from '../src/data/live-products.ts';
import { projects } from '../src/data/projects.ts';

const evidenceLevels = new Set([
  'ENTERPRISE',
  'PRODUCTION / ACTIVE PRODUCT',
  'LIVE PRODUCT',
  'TEAM LEAD',
  'ARCHITECTURE',
  'PROJECT',
  'DESIGN / DEVELOPMENT',
  'FRONTEND PROOF',
  'FOUNDATION',
  'LEARNING DIRECTION',
]);
const projectStatuses = new Set([
  'LIVE',
  'ACTIVE DEVELOPMENT',
  'PRODUCTION PRODUCT',
  'ENTERPRISE EXPERIENCE',
  'DESIGN / DEVELOPMENT',
  'HISTORICAL',
]);
const forbiddenClaims = /\b(expert|master|advanced|senior|pentester|enterprise-grade|highly scalable)\b/i;
const secretPattern = /(sk-[a-z0-9]{16,}|AIza[0-9a-z_-]{20,}|service[_ -]?role|supabase[_ -]?service[_ -]?role[_ -]?key|gemini[_ -]?api[_ -]?key|bearer\s+[a-z0-9._-]{20,})/i;
const errors = [];

function uniqueIds(items, label) {
  const ids = items.map((item) => item.id);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length) errors.push(`${label} contains duplicate id(s): ${[...new Set(duplicates)].join(', ')}`);
}

function checkUrl(url, label) {
  try {
    const parsed = new URL(url);
    if (!['https:', 'mailto:'].includes(parsed.protocol)) errors.push(`${label} uses unsupported protocol: ${url}`);
  } catch {
    errors.push(`${label} is malformed: ${url}`);
  }
}

function collectStrings(value) {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(collectStrings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(collectStrings);
  return [];
}

uniqueIds(projects, 'projects');
uniqueIds(experiences, 'experiences');
uniqueIds(liveProducts, 'live products');
uniqueIds(caseStudies, 'case studies');

const projectIds = new Set(projects.map((project) => project.id));
const experienceIds = new Set(experiences.map((experience) => experience.id));
const caseIds = new Set(caseStudies.map((item) => item.id));

for (const project of projects) {
  if (!project.repository) errors.push(`Project ${project.id} is missing repository`);
  if (!evidenceLevels.has(project.evidenceLevel)) errors.push(`Project ${project.id} has invalid evidence level`);
  if (!projectStatuses.has(project.status)) errors.push(`Project ${project.id} has invalid status`);
  if (project.status === 'LIVE' && !project.liveUrl) errors.push(`Live project ${project.id} is missing liveUrl`);
  if (project.liveUrl) checkUrl(project.liveUrl, `Project ${project.id} liveUrl`);
  if (project.repository) checkUrl(project.repository, `Project ${project.id} repository`);
  for (const link of project.relatedUrls ?? []) checkUrl(link.url, `Project ${project.id} related link`);
  for (const caseId of project.caseStudyIds ?? []) if (!caseIds.has(caseId)) errors.push(`Project ${project.id} references missing case ${caseId}`);
}

for (const product of liveProducts) {
  if (product.status !== 'LIVE') errors.push(`Live product ${product.id} must have LIVE status`);
  if (!product.liveUrl) errors.push(`Live product ${product.id} is missing liveUrl`);
  if (!projectIds.has(product.projectId) && product.projectId !== 'portfolio') errors.push(`Live product ${product.id} references missing project ${product.projectId}`);
  checkUrl(product.liveUrl, `Live product ${product.id} liveUrl`);
  if (product.repository) checkUrl(product.repository, `Live product ${product.id} repository`);
}

for (const group of capabilityGroups) {
  for (const item of group.items) {
    if (!item.evidenceProjectIds?.length && !item.evidenceExperienceIds?.length) errors.push(`Capability ${item.name} has no evidence mapping`);
    for (const id of item.evidenceProjectIds ?? []) if (!projectIds.has(id)) errors.push(`Capability ${item.name} references missing project ${id}`);
    for (const id of item.evidenceExperienceIds ?? []) if (!experienceIds.has(id)) errors.push(`Capability ${item.name} references missing experience ${id}`);
  }
}

const content = collectStrings({ projects, experiences, liveProducts, capabilityGroups, caseStudies });
for (const value of content) {
  if (forbiddenClaims.test(value)) errors.push(`Potential overclaim detected: ${value}`);
  if (secretPattern.test(value)) errors.push(`Potential secret-like value detected: ${value}`);
}

if (errors.length) {
  console.error('Project data validation failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Project data valid: ${projects.length} projects, ${liveProducts.length} live products, ${capabilityGroups.length} capability groups, ${caseStudies.length} case studies.`);
