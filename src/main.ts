import './styles/tokens.css';
import './styles/global.css';
import './styles/components.css';
import './styles/responsive.css';

import { renderCaseStudies } from './components/CaseStudies';
import { renderCapabilityMatrix } from './components/CapabilityMatrix';
import { renderContact, renderFooter } from './components/Footer';
import { renderDirectionSections } from './components/DirectionSections';
import { renderEducation } from './components/Education';
import { renderExperienceTimeline } from './components/ExperienceTimeline';
import { renderHeader } from './components/Header';
import { renderHero } from './components/Hero';
import { renderLiveProducts } from './components/LiveProductCard';
import { renderProfileSummary } from './components/ProfileSummary';
import { renderProjectDialog, renderProjects } from './components/ProjectCard';
import { renderProjectModalContent } from './components/ProjectModal';
import { caseStudies } from './data/case-studies';
import { capabilityGroups } from './data/capabilities';
import { education } from './data/education';
import { experiences } from './data/experience';
import { contactLinks, navigationLinks } from './data/links';
import { liveProducts } from './data/live-products';
import { profile } from './data/profile';
import { projects } from './data/projects';

function getSavedTheme(): 'light' | 'dark' | null {
  try {
    const value = window.localStorage.getItem('portfolio-theme');
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

function preferredTheme(): 'light' | 'dark' {
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme: 'light' | 'dark'): void {
  document.documentElement.dataset.theme = theme;
  const button = document.getElementById('themeToggle');
  if (!button) return;
  button.textContent = theme === 'light' ? '☾' : '☼';
  button.setAttribute('aria-label', theme === 'light' ? 'Chuyển sang giao diện tối' : 'Chuyển sang giao diện sáng');
}

function setupTheme(): void {
  applyTheme(getSavedTheme() ?? preferredTheme());
  document.getElementById('themeToggle')?.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    applyTheme(next);
    try {
      window.localStorage.setItem('portfolio-theme', next);
    } catch {
      // Theme persistence is a progressive enhancement.
    }
  });
}

function setupMobileNavigation(): void {
  const toggle = document.getElementById('mobileMenuToggle');
  const menu = document.getElementById('mobileNav');
  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const open = menu.hidden;
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
  });
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
}

function setupProgress(): void {
  const progressBar = document.getElementById('progressBar');
  if (!progressBar) return;
  const updateProgress = () => {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = height > 0 ? (window.scrollY / height) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

function setupReveal(): void {
  const elements = document.querySelectorAll<HTMLElement>('.reveal');
  if (!('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  elements.forEach((element) => observer.observe(element));
}

function setupActiveNavigation(): void {
  const sections = [...document.querySelectorAll<HTMLElement>('main section[id]')];
  const links = [...document.querySelectorAll<HTMLAnchorElement>('.nav-link')];
  if (!('IntersectionObserver' in window) || sections.length === 0) return;
  const observer = new IntersectionObserver((entries) => {
    const active = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!active) return;
    links.forEach((link) => link.classList.toggle('active', link.hash === `#${active.target.id}`));
  }, { rootMargin: '-24% 0px -62% 0px', threshold: [0.05, 0.2, 0.5] });
  sections.forEach((section) => observer.observe(section));
}

function setupProjectModal(): void {
  const modal = document.getElementById('projectModal');
  const content = document.getElementById('modal-content');
  const modalPanel = modal?.querySelector<HTMLElement>('.project-modal');
  if (!modal || !content || !modalPanel) return;
  const closeButton = modal.querySelector<HTMLButtonElement>('.modal-close');
  let lastFocused: HTMLElement | null = null;

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (lastFocused) lastFocused.focus();
  };

  document.querySelectorAll<HTMLButtonElement>('[data-project-id]').forEach((button) => {
    button.addEventListener('click', () => {
      const project = projects.find((item) => item.id === button.dataset.projectId);
      if (!project) return;
      lastFocused = document.activeElement as HTMLElement;
      content.innerHTML = renderProjectModalContent(project);
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      closeButton?.focus();
    });
  });

  modal.querySelectorAll<HTMLElement>('[data-modal-close]').forEach((element) => element.addEventListener('click', closeModal));
  closeButton?.addEventListener('click', closeModal);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
  modalPanel.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const focusable = [...modalPanel.querySelectorAll<HTMLElement>('button, a[href]')];
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}

export function mountPortfolio(documentRef: Document = document): void {
  const app = documentRef.getElementById('app');
  const header = documentRef.getElementById('siteHeader');
  const footer = documentRef.getElementById('siteFooter');
  if (!app || !header || !footer) return;

  header.innerHTML = renderHeader(profile, navigationLinks);
  app.innerHTML = [
    renderHero(profile),
    renderProfileSummary(profile),
    renderExperienceTimeline(experiences),
    renderProjects(projects),
    renderLiveProducts(liveProducts),
    renderCapabilityMatrix(capabilityGroups, projects, experiences),
    renderCaseStudies(caseStudies),
    renderDirectionSections(profile),
    renderEducation(education),
    renderContact(profile, contactLinks),
    renderProjectDialog(),
  ].join('');
  footer.innerHTML = renderFooter(profile, contactLinks);

  setupTheme();
  setupMobileNavigation();
  setupProgress();
  setupReveal();
  setupActiveNavigation();
  setupProjectModal();
}

if (typeof document !== 'undefined') mountPortfolio();
