import { capabilityMappings, portfolioCaseStudies, portfolioExperiences, portfolioLabs, portfolioProjects } from '../src/data/portfolio-content.ts';
import { evidence } from '../src/data/evidence.ts';
import { navigationLinks } from '../src/data/links.ts';
import { repositories } from '../src/data/repositories.ts';

const errors = [];
const allText = (value) => {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(allText);
  if (value && typeof value === 'object') return Object.values(value).flatMap(allText);
  return [];
};
const unique = (items, key, label) => {
  const values = items.map((item) => item[key]);
  const duplicate = values.filter((id, index) => values.indexOf(id) !== index);
  if (duplicate.length) errors.push(`${label} has duplicate ${key}: ${[...new Set(duplicate)].join(', ')}`);
};
const validUrl = (value, label) => {
  try {
    const parsed = new URL(value);
    if (!['https:', 'mailto:'].includes(parsed.protocol)) errors.push(`${label}: unsupported protocol ${parsed.protocol}`);
  } catch { errors.push(`${label}: malformed URL`); }
};

unique(repositories, 'id', 'Repositories');
unique(evidence, 'id', 'Evidence');
unique(portfolioProjects, 'id', 'Projects');
unique(portfolioProjects, 'slug', 'Projects');
unique(portfolioExperiences, 'id', 'Experiences');
unique(portfolioCaseStudies, 'id', 'Cases');
unique(portfolioCaseStudies, 'slug', 'Cases');
unique(portfolioLabs, 'id', 'Labs');
unique(capabilityMappings, 'id', 'Capabilities');

if (repositories.length !== 16) errors.push(`Expected 16 audited repositories, received ${repositories.length}`);
if (portfolioCaseStudies.length !== 8) errors.push(`Expected 8 evidence-backed cases, received ${portfolioCaseStudies.length}`);
const repositoryIds = new Set(repositories.map((item) => item.id));
const evidenceIds = new Set(evidence.map((item) => item.id));
const projectIds = new Set(portfolioProjects.map((item) => item.id));
const featureIds = [];

for (const repo of repositories) {
  if (repo.state === 'empty') {
    if (repo.url || repo.defaultSha || repo.newestBranchSha || repo.remoteBranchCount || repo.tagCount) errors.push(`Empty repository ${repo.id} must not have source refs or a public URL`);
  } else {
    if (!repo.defaultSha || !/^[a-f0-9]{40}$/.test(repo.defaultSha)) errors.push(`Repository ${repo.id} is missing a full default SHA`);
    if (!repo.newestBranchSha || !/^[a-f0-9]{40}$/.test(repo.newestBranchSha)) errors.push(`Repository ${repo.id} is missing a full newest branch SHA`);
    if (!repo.defaultBranch || !repo.newestBranch) errors.push(`Repository ${repo.id} is missing branch metadata`);
  }
  if (repo.url) validUrl(repo.url, `Repository ${repo.id}`);
}

for (const ref of evidence) {
  if (ref.publicSafe !== true) errors.push(`Evidence ${ref.id} is not explicitly public safe`);
  if (!/^2026-\d{2}-\d{2}$/.test(ref.observedAt)) errors.push(`Evidence ${ref.id} has an invalid observation date`);
  if (ref.repoId && !repositoryIds.has(ref.repoId)) errors.push(`Evidence ${ref.id} references missing repository ${ref.repoId}`);
  if (ref.commitSha && !/^[a-f0-9]{40}$/.test(ref.commitSha)) errors.push(`Evidence ${ref.id} has an invalid commit SHA`);
  if (ref.url) validUrl(ref.url, `Evidence ${ref.id}`);
  if (!ref.note.trim()) errors.push(`Evidence ${ref.id} has no limitation or note`);
}

for (const project of portfolioProjects) {
  if (!project.summary.trim() || !project.role.trim()) errors.push(`Project ${project.id} is missing summary or role`);
  if (!project.evidenceRefIds.length) errors.push(`Project ${project.id} has no evidence references`);
  for (const repoId of project.repositoryIds) {
    if (!repositoryIds.has(repoId)) errors.push(`Project ${project.id} references missing repository ${repoId}`);
    if (repositories.find((repo) => repo.id === repoId)?.state === 'empty') errors.push(`Project ${project.id} must not reference an empty repository`);
  }
  for (const refId of project.evidenceRefIds) if (!evidenceIds.has(refId)) errors.push(`Project ${project.id} references missing evidence ${refId}`);
  if (!project.featureProofs.length) errors.push(`Project ${project.id} has no feature proof record`);
  for (const feature of project.featureProofs) {
    featureIds.push(feature.id);
    if (!feature.evidenceRefIds.length) errors.push(`Feature ${project.id}/${feature.id} has no evidence references`);
    for (const refId of feature.evidenceRefIds) if (!evidenceIds.has(refId)) errors.push(`Feature ${project.id}/${feature.id} references missing evidence ${refId}`);
  }
  if (project.liveAvailability === 'reachable' && (!project.liveUrl || !project.availabilityCheckedAt)) errors.push(`Project ${project.id} reports reachable without URL and check date`);
  if (project.liveAvailability === 'unreachable' && (!project.liveUrl || !project.availabilityCheckedAt)) errors.push(`Project ${project.id} reports unreachable without URL and check date`);
  if (project.liveUrl) validUrl(project.liveUrl, `Project ${project.id} live URL`);
  if (project.liveAvailability !== 'unknown' && !project.featureVerifiedAt) errors.push(`Project ${project.id} must separate live availability from feature verification date`);
}
unique(featureIds.map((id) => ({ id })), 'id', 'Feature proofs');

for (const item of portfolioExperiences) {
  for (const refId of item.evidenceRefIds) if (!evidenceIds.has(refId)) errors.push(`Experience ${item.id} references missing evidence ${refId}`);
  for (const projectId of item.projectIds) if (!projectIds.has(projectId)) errors.push(`Experience ${item.id} references missing project ${projectId}`);
}
for (const item of portfolioCaseStudies) {
  if (!item.context.trim() || !item.result.trim() || !item.limitations.length) errors.push(`Case ${item.id} needs context, result, and limitations`);
  for (const refId of item.evidenceRefIds) if (!evidenceIds.has(refId)) errors.push(`Case ${item.id} references missing evidence ${refId}`);
}
for (const item of portfolioLabs) {
  for (const refId of item.evidenceRefIds) if (!evidenceIds.has(refId)) errors.push(`Lab ${item.id} references missing evidence ${refId}`);
}
for (const item of capabilityMappings) {
  for (const projectId of item.projectIds) if (!projectIds.has(projectId)) errors.push(`Capability ${item.id} references missing project ${projectId}`);
  for (const refId of item.evidenceRefIds) if (!evidenceIds.has(refId)) errors.push(`Capability ${item.id} references missing evidence ${refId}`);
}

const nonEmptyRepoIds = new Set(repositories.filter((repo) => repo.state === 'available').map((repo) => repo.id));
const representedRepoIds = new Set(portfolioProjects.flatMap((project) => project.repositoryIds));
for (const id of nonEmptyRepoIds) if (!representedRepoIds.has(id)) errors.push(`Non-empty repository ${id} is missing from typed project mapping`);
if (representedRepoIds.has('my-courses')) errors.push('My_Courses is empty and must not be represented as a project');
if (repositories.find((repo) => repo.id === 'our-story-private')?.url) errors.push('Private story source must not expose a repository URL');
if (portfolioProjects.find((project) => project.id === 'story-delivery')?.liveUrl) errors.push('Private story experience must not expose a public URL');
for (const link of navigationLinks) {
  if (!/^#\/(projects|case-studies|labs|process)$/.test(link.url)) errors.push(`Navigation item ${link.label} points to an unknown route`);
}

const content = allText({ repositories, evidence, portfolioProjects, portfolioExperiences, portfolioCaseStudies, portfolioLabs, capabilityMappings });
const secretPattern = /(sk-[a-z0-9]{16,}|AIza[0-9a-z_-]{20,}|service[_ -]?role[_ -]?key|gemini[_ -]?api[_ -]?key|bearer\s+[a-z0-9._-]{20,})/i;
const unsafeClaimPattern = /\b(?:I am|we are|is|are)\s+(?:an?\s+)?(?:expert|senior engineer|professional pentester|highly scalable)\b|\bdeployed and production[- ]ready\b/i;
for (const value of content) {
  if (secretPattern.test(value)) errors.push('Public portfolio data contains a secret-like value.');
  if (unsafeClaimPattern.test(value)) errors.push(`Potential unsupported claim: ${value}`);
}

if (errors.length) {
  console.error('Evidence data validation failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log(`Evidence data valid: ${repositories.length} repositories, ${portfolioProjects.length} projects, ${portfolioCaseStudies.length} cases, ${portfolioLabs.length} labs.`);
