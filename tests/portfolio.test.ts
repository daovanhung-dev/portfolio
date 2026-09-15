// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import { experiences } from '../src/data/experience';
import { navigationLinks } from '../src/data/links';
import { projects } from '../src/data/projects';
import { mountPortfolio } from '../src/main';

describe('timeline and project data', () => {
  it('contains eight ordered timeline entries', () => {
    expect(experiences).toHaveLength(8);
    expect(experiences.map((experience) => experience.order)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(experiences.every((experience) => experience.projectIds.length > 0)).toBe(true);
  });

  it('keeps projects in timeline order and supports private projects without fake links', () => {
    expect(projects.map((project) => project.id)).toEqual([
      'learn2earn',
      'labvnua',
      'fpt-enterprise',
      'nanobio',
      'linguasphere',
      'hvc-management',
      'study2work',
      'nihongo',
      'hung-quynh',
      'portfolio',
    ]);
    expect(projects.find((project) => project.id === 'fpt-enterprise')?.repository).toBeUndefined();
    expect(projects.find((project) => project.id === 'linguasphere')?.liveUrl).toBeUndefined();
  });

  it('preserves the FPT measurable work', () => {
    const fpt = experiences.find((experience) => experience.id === 'fpt-intern');
    expect(fpt?.highlights.join(' ')).toContain('06 REST API');
    expect(fpt?.highlights.join(' ')).toContain('02 màn hình');
  });
});

describe('simple portfolio rendering', () => {
  beforeEach(() => {
    document.documentElement.dataset.theme = 'dark';
    document.body.innerHTML = '<div id="siteHeader"></div><main id="app"></main><div id="siteFooter"></div>';
    mountPortfolio();
  });

  it('renders Timeline first, then Projects, then Contact', () => {
    const sections = [...document.querySelectorAll('main section[id]')].map((section) => section.id);
    expect(sections).toEqual(['experience', 'projects', 'contact']);
    expect(document.querySelectorAll('.timeline-item')).toHaveLength(8);
    expect(document.querySelectorAll('.project-card')).toHaveLength(10);
    expect(document.querySelectorAll('.nav-link')).toHaveLength(navigationLinks.length * 2);
    expect(document.querySelector('#capabilities')).toBeNull();
    expect(document.querySelector('#cases')).toBeNull();
    expect(document.querySelector('#live-products')).toBeNull();
  });

  it('renders the project detail fields and only real actions', () => {
    const trigger = document.querySelector<HTMLButtonElement>('[data-project-id="nanobio"]');
    const modal = document.querySelector<HTMLElement>('#projectModal');
    trigger?.focus();
    trigger?.click();
    expect(modal?.classList.contains('open')).toBe(true);
    expect(document.querySelector('#modal-title')?.textContent).toContain('NanoBio');
    expect(document.querySelector('#modal-summary')?.textContent).toContain('chăm sóc sức khỏe');
    expect(document.querySelector('.modal-label')?.textContent).toContain('Tổng quan');
    expect([...document.querySelectorAll('.modal-section')].some((section) => section.textContent?.includes('Kiến trúc'))).toBe(true);
    expect(document.querySelector('.modal-actions a[href*="github.com"]')).toBeTruthy();
    expect(document.querySelector('.modal-actions a[href*="NanoBioAI"]')).toBeTruthy();
    document.querySelector<HTMLButtonElement>('.modal-close')?.click();
    expect(modal?.classList.contains('open')).toBe(false);
    expect(document.activeElement).toBe(trigger);
  });

  it('does not render GitHub or demo CTA for private projects', () => {
    document.querySelector<HTMLButtonElement>('[data-project-id="fpt-enterprise"]')?.click();
    const actions = document.querySelector('.modal-actions');
    expect(actions?.querySelector('a[href*="github.com"]')).toBeNull();
    expect(actions?.querySelector('a[href*="github.io"]')).toBeNull();
    expect(actions?.textContent).toContain('Repository nội bộ');
  });

  it('closes the modal with Escape and toggles theme', () => {
    document.querySelector<HTMLButtonElement>('[data-project-id="study2work"]')?.click();
    const modal = document.querySelector<HTMLElement>('#projectModal');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(modal?.classList.contains('open')).toBe(false);

    const originalTheme = document.documentElement.dataset.theme;
    document.querySelector<HTMLButtonElement>('#themeToggle')?.click();
    expect(document.documentElement.dataset.theme).not.toBe(originalTheme);
    expect(document.querySelector('#projects')).toBeTruthy();
  });
});
