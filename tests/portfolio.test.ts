// @vitest-environment jsdom
import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { evidence } from '../src/data/evidence';
import { capabilityMappings, portfolioCaseStudies, portfolioExperiences, portfolioLabs, portfolioProjects } from '../src/data/portfolio-content';
import { repositories } from '../src/data/repositories';
import { mountPortfolio } from '../src/main';
import { resolveRoute } from '../src/routes';

beforeAll(() => {
  document.head.innerHTML = '<meta name="description" content=""><meta property="og:title" content=""><meta property="og:description" content="">';
  document.body.innerHTML = '<a class="skip-link" href="#main-heading">Skip</a><div id="siteHeader"></div><main id="app" tabindex="-1"></main><div id="siteFooter"></div>';
  if (!HTMLDialogElement.prototype.showModal) HTMLDialogElement.prototype.showModal = function showModal() { this.open = true; };
  if (!HTMLDialogElement.prototype.close) HTMLDialogElement.prototype.close = function close() { this.open = false; };
  mountPortfolio();
});

beforeEach(() => {
  window.history.replaceState(null, '', `${window.location.pathname}#/`);
  window.dispatchEvent(new HashChangeEvent('hashchange'));
});

describe('typed evidence model', () => {
  it('covers the sixteen repository audit records and represents every non-empty source', () => {
    expect(repositories).toHaveLength(16);
    const empty = repositories.find((repo) => repo.id === 'my-courses');
    expect(empty?.state).toBe('empty');
    expect(portfolioProjects.some((project) => project.repositoryIds.includes('my-courses'))).toBe(false);
    const represented = new Set(portfolioProjects.flatMap((project) => project.repositoryIds));
    expect(repositories.filter((repo) => repo.state === 'available').every((repo) => represented.has(repo.id))).toBe(true);
  });

  it('keeps source state, URL availability, and feature verification separate', () => {
    const fastApi = portfolioProjects.find((project) => project.id === 'nanobio-backend');
    const mobile = portfolioProjects.find((project) => project.id === 'nanobio-mobile');
    expect(fastApi?.status).toBe('source-only');
    expect(fastApi?.liveAvailability).toBe('unknown');
    expect(fastApi?.featureVerifiedAt).toBeUndefined();
    expect(mobile?.featureProofs.some((item) => item.state === 'partial')).toBe(true);
  });

  it('contains the eight requested case themes with source and limitation references', () => {
    expect(portfolioCaseStudies).toHaveLength(8);
    const slugs = portfolioCaseStudies.map((item) => item.slug);
    expect(slugs).toEqual(expect.arrayContaining([
      'fpt-debugging', 'nanobio-local-cloud-ai', 'nanobio-fastapi-foundation', 'study2work-contracts-runtime',
      'hvc-implementation-evolution', 'ai-local-inference', 'xiaozhi-fork-attribution', 'privacy-safe-story-delivery',
    ]));
    expect(portfolioCaseStudies.every((item) => item.evidenceRefIds.length > 0 && item.limitations.length > 0)).toBe(true);
  });

  it('does not publish direct links or personal content for the private story source', () => {
    const privateRepo = repositories.find((repo) => repo.id === 'our-story-private');
    const story = portfolioProjects.find((project) => project.id === 'story-delivery');
    expect(privateRepo?.url).toBeUndefined();
    expect(story?.liveUrl).toBeUndefined();
    expect(story?.repositoryIds).toContain('our-story-private');
    expect(evidence.find((ref) => ref.id === 'ev-story-delivery')?.url).toBeUndefined();
  });

  it('references only existing IDs across career, capabilities, labs, and evidence', () => {
    const projectIds = new Set(portfolioProjects.map((item) => item.id));
    const evidenceIds = new Set(evidence.map((item) => item.id));
    expect(portfolioExperiences.every((item) => item.projectIds.every((id) => projectIds.has(id)) && item.evidenceRefIds.every((id) => evidenceIds.has(id)))).toBe(true);
    expect(capabilityMappings.every((item) => item.projectIds.every((id) => projectIds.has(id)) && item.evidenceRefIds.every((id) => evidenceIds.has(id)))).toBe(true);
    expect(portfolioLabs.every((item) => item.evidenceRefIds.every((id) => evidenceIds.has(id)))).toBe(true);
  });
});

describe('hash routes and interaction', () => {
  it('renders a concise recruiter home with project, case, and process routes', () => {
    expect(document.querySelector('#main-heading')?.textContent).toBe('Đào Văn Hùng');
    expect(document.querySelectorAll('.work-card').length).toBe(4);
    expect(document.querySelector('a[href="#/projects"]')).toBeTruthy();
    expect(document.querySelector('a[href="#/case-studies"]')).toBeTruthy();
    expect(document.querySelector('a[href="#/process"]')).toBeTruthy();
  });

  it('resolves case, project, labs, and not-found deep links', () => {
    expect(resolveRoute('#/projects/nanobio-fastapi-foundation').title).toContain('FastAPI foundation');
    expect(resolveRoute('#/case-studies/xiaozhi-fork-attribution').html).toContain('attribution');
    expect(resolveRoute('#/labs').html).toContain('Linux và SSH fundamentals');
    expect(resolveRoute('#/missing').title).toContain('Không tìm thấy');
  });

  it('updates content and metadata after a route change', () => {
    window.location.hash = '#/projects/nanobio-fastapi-foundation';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    expect(document.querySelector('#main-heading')?.textContent).toContain('FastAPI foundation');
    expect(document.title).toContain('FastAPI foundation');
    expect(document.querySelector<HTMLMetaElement>('meta[name="description"]')?.content).toContain('FastAPI');
  });

  it('supports project filtering and mobile navigation state', () => {
    window.location.hash = '#/projects';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    const search = document.querySelector<HTMLInputElement>('#projectSearch');
    search!.value = 'Flutter';
    search!.dispatchEvent(new Event('input', { bubbles: true }));
    expect(document.querySelectorAll<HTMLElement>('[data-project-card]:not([hidden])').length).toBeGreaterThan(0);
    const toggle = document.querySelector<HTMLButtonElement>('#mobileMenuToggle')!;
    const menu = document.querySelector<HTMLElement>('#mobileNav')!;
    toggle.click();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(menu.inert).toBe(false);
    toggle.click();
    expect(menu.inert).toBe(true);
  });

  it('opens a native project dialog with matching quick-view content', () => {
    window.history.replaceState(null, '', `${window.location.pathname}#/`);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    document.querySelector<HTMLButtonElement>('[data-quickview="nanobio-local-cloud"]')?.click();
    const dialog = document.querySelector<HTMLDialogElement>('#quickView');
    expect(dialog?.open).toBe(true);
    expect(dialog?.textContent).toContain('NanoBioAI · local-first mobile');
    dialog?.querySelector<HTMLButtonElement>('.dialog-close')?.click();
    expect(dialog?.open).toBe(false);
  });
});
