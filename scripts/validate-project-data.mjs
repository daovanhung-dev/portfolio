import { experiences } from '../src/data/experience.ts';
import { contactLinks, navigationLinks, sectionIds } from '../src/data/links.ts';
import { projects } from '../src/data/projects.ts';

const errors = [];
const allowedExperienceStatuses = new Set(['Đã kết thúc', 'Đã hoàn thành', 'Đang hoạt động', 'Đang thiết kế', 'Đang phát triển']);
const allowedProjectStatuses = new Set(['Đã kết thúc', 'Đang phát triển', 'Dự án nội bộ', 'Đang thiết kế', 'Đã triển khai', 'Thiết kế hệ thống', 'Thiết kế / phát triển']);
const privateProjects = new Set(['fpt-enterprise', 'linguasphere']);
const forbiddenClaims = /\b(expert|master|advanced|senior|pentester|enterprise-grade|highly scalable)\b/i;
const secretPattern = /(sk-[a-z0-9]{16,}|AIza[0-9a-z_-]{20,}|service[_ -]?role|supabase[_ -]?service[_ -]?role[_ -]?key|gemini[_ -]?api[_ -]?key|bearer\s+[a-z0-9._-]{20,})/i;

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

uniqueIds(experiences, 'experiences');
uniqueIds(projects, 'projects');

const projectIds = new Set(projects.map((project) => project.id));
const experienceIds = new Set(experiences.map((experience) => experience.id));
const sortedExperiences = experiences.slice().sort((a, b) => a.order - b.order);
const sortedProjects = projects.slice().sort((a, b) => a.order - b.order);

if (experiences.length !== 8) errors.push(`Expected 8 timeline entries, received ${experiences.length}`);
if (sortedExperiences.some((experience, index) => experience.order !== index + 1)) errors.push('Timeline order must be a continuous sequence from 1 to 8');
if (sortedProjects.some((project, index) => project.order !== index + 1)) errors.push('Project order must be a continuous sequence');

for (const experience of experiences) {
  if (!allowedExperienceStatuses.has(experience.status)) errors.push(`Experience ${experience.id} has an invalid status`);
  if (experience.highlights.length > 3) errors.push(`Experience ${experience.id} has more than 3 highlights`);
  for (const projectId of experience.projectIds) {
    if (!projectIds.has(projectId)) errors.push(`Experience ${experience.id} references missing project ${projectId}`);
  }
}

for (const project of projects) {
  if (!allowedProjectStatuses.has(project.status)) errors.push(`Project ${project.id} has an invalid status`);
  if (!privateProjects.has(project.id) && !project.repository) errors.push(`Project ${project.id} is missing repository`);
  if (project.timelineExperienceId && !experienceIds.has(project.timelineExperienceId)) errors.push(`Project ${project.id} references missing experience ${project.timelineExperienceId}`);
  if (project.liveUrl) checkUrl(project.liveUrl, `Project ${project.id} liveUrl`);
  if (project.repository) checkUrl(project.repository, `Project ${project.id} repository`);
  for (const link of project.relatedUrls ?? []) checkUrl(link.url, `Project ${project.id} related link`);
}

for (const link of navigationLinks) {
  if (!link.url.startsWith('#') || !sectionIds.includes(link.url.slice(1))) errors.push(`Navigation link ${link.label} points to a missing section`);
}
for (const link of contactLinks) checkUrl(link.url, `Contact link ${link.label}`);

const content = collectStrings({ experiences, projects });
for (const value of content) {
  if (forbiddenClaims.test(value)) errors.push(`Potential overclaim detected: ${value}`);
  if (secretPattern.test(value)) errors.push(`Potential secret-like value detected: ${value}`);
}

if (errors.length) {
  console.error('Portfolio data validation failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Portfolio data valid: ${experiences.length} timeline entries, ${projects.length} projects.`);
