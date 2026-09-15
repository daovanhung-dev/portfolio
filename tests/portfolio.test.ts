// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import { capabilityGroups } from '../src/data/capabilities';
import { caseStudies } from '../src/data/case-studies';
import { experiences } from '../src/data/experience';
import { liveProducts } from '../src/data/live-products';
import { navigationLinks } from '../src/data/links';
import { projects } from '../src/data/projects';
import { mountPortfolio } from '../src/main';

describe('portfolio data contract', () => {
  it('has unique project IDs and all flagship repositories', () => {
    expect(new Set(projects.map((project) => project.id)).size).toBe(projects.length);
    expect(projects).toHaveLength(7);
    expect(projects.every((project) => project.repository)).toBe(true);
  });

  it('maps every capability item to project or experience evidence', () => {
    expect(capabilityGroups.flatMap((group) => group.items).every((item) => item.evidenceProjectIds?.length || item.evidenceExperienceIds?.length)).toBe(true);
  });

  it('keeps live products and live projects actionable', () => {
    expect(liveProducts).toHaveLength(6);
    expect(liveProducts.every((product) => product.status === 'LIVE' && product.liveUrl.startsWith('https://'))).toBe(true);
    expect(projects.filter((project) => project.status === 'LIVE').every((project) => project.liveUrl)).toBe(true);
  });

  it('preserves evidence counts and the planned case-study set', () => {
    expect(experiences.find((experience) => experience.id === 'fpt-intern')?.highlights.join(' ')).toContain('06 REST API');
    expect(experiences.find((experience) => experience.id === 'fpt-intern')?.highlights.join(' ')).toContain('02 màn hình');
    expect(caseStudies).toHaveLength(7);
  });
});

describe('portfolio rendering', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="siteHeader"></div><main id="app"></main><div id="siteFooter"></div><div id="progressBar"></div>';
    mountPortfolio();
  });

  it('renders navigation, sections, projects, live products and capability evidence', () => {
    expect(document.querySelectorAll('.nav-link')).toHaveLength(navigationLinks.length * 2);
    expect(document.querySelectorAll('.project-card')).toHaveLength(7);
    expect(document.querySelectorAll('.live-product-card')).toHaveLength(6);
    expect(document.querySelectorAll('.capability-item').length).toBeGreaterThan(30);
    expect(document.querySelector('#cases')).toBeTruthy();
    expect(document.querySelector('#contact')).toBeTruthy();
  });

  it('opens and closes a project detail modal', () => {
    const trigger = document.querySelector<HTMLButtonElement>('[data-project-id="nanobio"]');
    const modal = document.querySelector<HTMLElement>('#projectModal');
    expect(trigger).toBeTruthy();
    trigger?.click();
    expect(modal?.classList.contains('open')).toBe(true);
    expect(document.querySelector('#modal-title')?.textContent).toContain('NanoBio');
    document.querySelector<HTMLButtonElement>('.modal-close')?.click();
    expect(modal?.classList.contains('open')).toBe(false);
  });

  it('toggles the theme without losing the page', () => {
    const toggle = document.querySelector<HTMLButtonElement>('#themeToggle');
    toggle?.click();
    expect(['light', 'dark']).toContain(document.documentElement.dataset.theme);
    expect(document.querySelector('#projects')).toBeTruthy();
  });
});
