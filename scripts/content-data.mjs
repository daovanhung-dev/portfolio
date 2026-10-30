import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const root = new URL('../', import.meta.url);
export const contentDirectories = {
  projects: 'src/content/projects',
  experiences: 'src/content/experiences',
  cases: 'src/content/cases',
  labs: 'src/content/labs',
  capabilities: 'src/content/capabilities',
  profile: 'src/content/profile',
  education: 'src/content/education',
  contact: 'src/content/contact',
};

export async function readCollection(name) {
  const directory = new URL(contentDirectories[name] + '/', root);
  const files = (await readdir(directory)).filter((file) => file.endsWith('.mdx')).sort();
  return Promise.all(files.map(async (file) => {
    const source = await readFile(new URL(file, directory), 'utf8');
    const parsed = matter(source);
    return { file, slug: file.slice(0, -4), data: parsed.data, body: parsed.content, source };
  }));
}

export async function readPortfolioData() {
  const names = Object.keys(contentDirectories);
  const collections = Object.fromEntries(await Promise.all(names.map(async (name) => [name, await readCollection(name)])));
  const [evidenceText, repositoriesText] = await Promise.all([
    readFile(new URL('src/data/evidence.json', root), 'utf8'),
    readFile(new URL('src/data/repositories.json', root), 'utf8'),
  ]);
  return {
    collections,
    evidence: JSON.parse(evidenceText),
    repositories: JSON.parse(repositoriesText),
    root: fileURLToPath(root),
  };
}

const uniqueBy = (items, key, label, errors) => {
  const values = items.map((item) => key === 'slug' ? item.slug : item.data ? item.data[key] : item[key]);
  const seen = new Set();
  for (const value of values) {
    if (seen.has(value)) errors.push(label + ' has duplicate ' + key + ': ' + value);
    seen.add(value);
  }
};

export function validatePortfolioData(portfolio) {
  const errors = [];
  const { collections, evidence, repositories } = portfolio;
  const refs = new Map(evidence.map((item) => [item.id, item]));
  const repos = new Map(repositories.map((item) => [item.id, item]));
  const projects = collections.projects;
  const cases = collections.cases;
  const projectSlugs = new Set(projects.map((item) => item.slug));
  const caseSlugs = new Set(cases.map((item) => item.slug));
  const stateSet = new Set(['implemented', 'partial', 'placeholder', 'source-only', 'design', 'deployed-verified', 'historical']);
  const allowedProtocols = new Set(['https:', 'mailto:']);
  const checkUrl = (value, label) => {
    try {
      const url = new URL(value);
      if (!allowedProtocols.has(url.protocol)) errors.push(label + ' has unsupported protocol ' + url.protocol);
    } catch {
      errors.push(label + ' is malformed');
    }
  };
  const checkRefs = (ids, label) => {
    if (!Array.isArray(ids)) {
      errors.push(label + ' must have an evidence ID array');
      return;
    }
    for (const id of ids) if (!refs.has(id)) errors.push(label + ' references missing evidence ' + id);
  };

  for (const [name, entries] of Object.entries(collections)) {
    uniqueBy(entries, 'id', name, errors);
    uniqueBy(entries, 'slug', name + ' routes', errors);
    for (const entry of entries) if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.slug)) errors.push(name + ' has invalid slug ' + entry.slug);
  }
  uniqueBy(evidence, 'id', 'Evidence', errors);
  uniqueBy(repositories, 'id', 'Repositories', errors);

  if (collections.profile.length !== 1) errors.push('Profile must contain exactly one record');
  if (collections.education.length !== 1) errors.push('Education must contain exactly one record');
  if (collections.contact.length !== 1) errors.push('Contact must contain exactly one record');

  for (const repo of repositories) {
    if (!Number.isInteger(repo.remoteBranchCount) || !Number.isInteger(repo.windowCommitCount) || !Number.isInteger(repo.tagCount)) {
      errors.push('Repository ' + repo.id + ' has invalid audit counts');
    }
    if (repo.state === 'restricted') {
      if (repo.url || repo.defaultSha || repo.newestBranchSha || repo.defaultBranch || repo.newestBranch || repo.remoteBranchCount || repo.tagCount || repo.windowCommitCount) {
        errors.push('Restricted repository contains source metadata');
      }
    } else if (repo.state === 'empty') {
      if (repo.url || repo.defaultSha || repo.newestBranchSha || repo.remoteBranchCount || repo.tagCount || repo.windowCommitCount) {
        errors.push('Empty repository contains source metadata');
      }
    } else {
      if (!/^[a-f0-9]{40}$/.test(repo.defaultSha ?? '') || !/^[a-f0-9]{40}$/.test(repo.newestBranchSha ?? '')) {
        errors.push('Available repository ' + repo.id + ' needs full observed SHAs');
      }
      if (!repo.defaultBranch || !repo.newestBranch || !repo.url) errors.push('Available repository ' + repo.id + ' is missing public reference metadata');
      if (repo.url) checkUrl(repo.url, 'Repository ' + repo.id);
    }
  }

  for (const ref of evidence) {
    if (ref.publicSafe !== true) errors.push('Evidence ' + ref.id + ' is not marked public safe');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(ref.observedAt ?? '')) errors.push('Evidence ' + ref.id + ' has an invalid observed date');
    if (!ref.note?.trim()) errors.push('Evidence ' + ref.id + ' is missing a note');
    if (ref.repoId && !repos.has(ref.repoId)) errors.push('Evidence ' + ref.id + ' references missing repository ' + ref.repoId);
    if (ref.commitSha && !/^[a-f0-9]{40}$/.test(ref.commitSha)) errors.push('Evidence ' + ref.id + ' has an invalid SHA');
    if (ref.url) checkUrl(ref.url, 'Evidence ' + ref.id);
    if (ref.kind === 'sanitized-private') {
      if (ref.path || ref.commitSha || ref.branch || ref.url) errors.push('Sanitized private evidence contains source metadata');
      if (!ref.repoId || repos.get(ref.repoId)?.state !== 'restricted') errors.push('Sanitized private evidence must map to a restricted record');
    }
    if (ref.repoId && repos.get(ref.repoId)?.state === 'restricted' && ref.kind !== 'sanitized-private') {
      errors.push('Restricted repository evidence must use the sanitized-private classification');
    }
  }

  for (const entry of projects) {
    const project = entry.data;
    checkRefs(project.evidenceIds, 'Project ' + project.id);
    if (!stateSet.has(project.status)) errors.push('Project ' + project.id + ' has invalid content status');
    if (!project.title?.trim() || !project.summary?.trim() || !project.role?.trim()) errors.push('Project ' + project.id + ' is missing title, summary, or role');
    if (!project.filterGroup?.trim()) errors.push('Project ' + project.id + ' is missing its filter group');
    if (!Array.isArray(project.limitations) || !project.limitations.length) errors.push('Project ' + project.id + ' needs limitations');
    for (const repoId of project.repositoryIds ?? []) {
      if (!repos.has(repoId)) errors.push('Project ' + project.id + ' references missing repository ' + repoId);
      if (repos.get(repoId)?.state === 'empty') errors.push('Project ' + project.id + ' references an empty repository');
    }
    for (const feature of project.featureProofs ?? []) {
      checkRefs(feature.evidenceIds, 'Feature ' + project.id + '/' + feature.id);
      if (!stateSet.has(feature.state)) errors.push('Feature ' + project.id + '/' + feature.id + ' has invalid state');
    }
    if (project.availability !== 'unknown') errors.push('Project ' + project.id + ' reports URL availability without a fresh check');
    for (const slug of project.caseSlugs ?? []) if (!caseSlugs.has(slug)) errors.push('Project ' + project.id + ' references missing case route ' + slug);
  }

  for (const entry of collections.experiences) {
    checkRefs(entry.data.evidenceIds, 'Experience ' + entry.data.id);
    if (typeof entry.data.displayOnExperiencePage !== 'boolean') {
      errors.push('Experience ' + entry.data.id + ' needs an explicit page display state');
    }
    if (!Number.isInteger(entry.data.order) || entry.data.order < 1) {
      errors.push('Experience ' + entry.data.id + ' needs a positive display order');
    }
    if (entry.data.mapUrl) checkUrl(entry.data.mapUrl, 'Experience ' + entry.data.id + ' map URL');
    if (entry.data.displayOnExperiencePage && !entry.data.mapUrl) {
      errors.push('Visible experience ' + entry.data.id + ' needs a map URL');
    }
    if (!Array.isArray(entry.data.technologies)) {
      errors.push('Experience ' + entry.data.id + ' must have a technologies array');
    } else {
      if (entry.data.technologies.some((technology) => typeof technology !== 'string' || !technology.trim())) {
        errors.push('Experience ' + entry.data.id + ' has an empty technology');
      }
      if (new Set(entry.data.technologies).size !== entry.data.technologies.length) {
        errors.push('Experience ' + entry.data.id + ' has duplicate technologies');
      }
    }
    for (const slug of entry.data.projectSlugs ?? []) if (!projectSlugs.has(slug)) errors.push('Experience ' + entry.data.id + ' references missing project ' + slug);
  }
  uniqueBy(collections.experiences.filter((entry) => entry.data.displayOnExperiencePage), 'order', 'Visible experiences', errors);
  for (const entry of cases) {
    const item = entry.data;
    checkRefs(item.evidenceIds, 'Case ' + item.id);
    if (!item.context?.trim() || !item.role?.trim() || !item.verification?.trim() || !item.result?.trim()) errors.push('Case ' + item.id + ' needs context, role, verification, and result');
    if (!item.constraints?.length || !item.approach?.length || !item.limitations?.length) errors.push('Case ' + item.id + ' needs constraints, approach, and limitations');
    for (const slug of item.projectSlugs ?? []) if (!projectSlugs.has(slug)) errors.push('Case ' + item.id + ' references missing project ' + slug);
    for (const slug of item.relatedCaseSlugs ?? []) if (!caseSlugs.has(slug)) errors.push('Case ' + item.id + ' references missing related case ' + slug);
    for (const decision of item.decisions ?? []) checkRefs(decision.evidenceIds, 'Case decision ' + item.id);
  }
  for (const entry of collections.labs) checkRefs(entry.data.evidenceIds, 'Lab ' + entry.data.id);
  for (const entry of collections.capabilities) {
    checkRefs(entry.data.evidenceIds, 'Capability ' + entry.data.id);
    for (const slug of entry.data.projectSlugs ?? []) if (!projectSlugs.has(slug)) errors.push('Capability ' + entry.data.id + ' references missing project ' + slug);
  }
  for (const name of ['profile', 'education', 'contact']) {
    for (const entry of collections[name]) checkRefs(entry.data.evidenceIds, name + ' ' + entry.slug);
  }
  for (const link of collections.contact.flatMap((entry) => entry.data.links ?? [])) checkUrl(link.url, 'Contact ' + link.label);
  for (const entry of collections.contact) checkUrl('mailto:' + entry.data.email, 'Contact email');

  const availableRepositoryIds = new Set(repositories.filter((repo) => repo.state === 'available').map((repo) => repo.id));
  const representedRepositoryIds = new Set(projects.flatMap((entry) => entry.data.repositoryIds ?? []));
  for (const id of availableRepositoryIds) if (!representedRepositoryIds.has(id)) errors.push('Public repository ' + id + ' is not mapped to a project');
  if (representedRepositoryIds.has('my-courses')) errors.push('Empty My_Courses inventory item must not be shown as a project');

  const sourceText = [
    ...Object.values(collections).flatMap((items) => items.map((item) => item.source)),
    JSON.stringify(evidence),
    JSON.stringify(repositories),
  ].join('\n');
  if (/(?:sk-[a-z0-9]{16,}|AIza[0-9a-z_-]{20,}|bearer\s+[a-z0-9._-]{20,})/i.test(sourceText)) errors.push('Public content contains a secret-like value');
  if (/liveAvailability\s*:\s*['"](?:reachable|unreachable)['"]|https?:\/\/[^ "'\n]+(?:story|birthday|private)[^ "'\n]*/i.test(sourceText)) {
    errors.push('Public content contains a stale live flag or questionable private URL');
  }
  return errors;
}
