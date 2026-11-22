import { describe, expect, it } from 'vitest';
import { readPortfolioData, validatePortfolioData } from '../scripts/content-data.mjs';
import { siteAsset, sitePath } from '../src/utils/paths';

describe('portfolio content model', () => {
  it('has unique routes and valid evidence relationships across every collection', async () => {
    const portfolio = await readPortfolioData();
    expect(validatePortfolioData(portfolio)).toEqual([]);
  });

  it('keeps the migrated recruiter route set content-backed', async () => {
    const { collections } = await readPortfolioData();
    expect(collections.projects.length).toBeGreaterThan(0);
    expect(collections.cases.length).toBeGreaterThan(0);
    expect(collections.experiences.length).toBeGreaterThan(0);
    expect(collections.labs.length).toBeGreaterThan(0);
    expect(collections.profile).toHaveLength(1);
    expect(collections.education).toHaveLength(1);
    expect(collections.contact).toHaveLength(1);
  });

  it('loads the sanitized server diagnostics report as a lab route', async () => {
    const { collections } = await readPortfolioData();
    const labSlugs = collections.labs.map((lab: { slug: string }) => lab.slug);
    expect(labSlugs).toContain('server-connectivity-diagnostics');
    for (const oldSlug of [
      'linux-ssh',
      'networking-fundamentals',
      'web-security-fundamentals',
      'xiaozhi-esp32-source-study',
    ]) {
      expect(labSlugs).not.toContain(oldSlug);
    }
    const lab = collections.labs.find((entry: { slug: string }) => entry.slug === 'server-connectivity-diagnostics') as
      { data: { evidenceIds: string[] } } | undefined;
    expect(lab?.data.evidenceIds).toContain('ev-lab-server-diagnostics');
  });
});

describe('GitHub Pages paths', () => {
  it('normalizes routes and assets under Astro base', () => {
    const base = import.meta.env.BASE_URL.replace(/\/$/, '');
    expect(sitePath('/')).toBe(base + '/');
    expect(sitePath('/projects/nanobio-local-cloud')).toBe(base + '/projects/nanobio-local-cloud/');
    expect(siteAsset('/favicon.svg')).toBe(base + '/favicon.svg');
  });
});
