import './styles/tokens.css';
import './styles/global.css';
import './styles/components.css';
import './styles/responsive.css';

import { renderContact, renderFooter } from './components/Footer';
import { renderHeader } from './components/Header';
import { renderExperienceTimeline } from './components/ExperienceTimeline';
import { renderProjectDialog, renderProjects } from './components/ProjectCard';
import { renderProjectModalContent } from './components/ProjectModal';
import { contactLinks, navigationLinks } from './data/links';
import { experiences } from './data/experience';
import { profile } from './data/profile';
import { projects } from './data/projects';

type Theme = 'light' | 'dark';

function getSavedTheme(): Theme | null {
  try {
    const value = window.localStorage.getItem('portfolio-theme');
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

function preferredTheme(): Theme {
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  const button = document.getElementById('themeToggle');
  if (!button) return;
  button.textContent = theme === 'light' ? '☾' : '☼';
  button.setAttribute('aria-label', theme === 'light' ? 'Chuyển sang giao diện tối' : 'Chuyển sang giao diện sáng');
  button.setAttribute('title', theme === 'light' ? 'Giao diện tối' : 'Giao diện sáng');
}

function setupTheme(): void {
  applyTheme(getSavedTheme() ?? preferredTheme());
  document.getElementById('themeToggle')?.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    applyTheme(next);
    try {
      window.localStorage.setItem('portfolio-theme', next);
    } catch {
      // Theme persistence is optional.
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
    toggle.setAttribute('aria-label', 'Mở menu');
  };

  toggle.addEventListener('click', () => {
    const open = menu.hidden;
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
  });
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
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
  const panel = modal?.querySelector<HTMLElement>('.project-modal');
  const closeButton = modal?.querySelector<HTMLButtonElement>('.modal-close');
  if (!modal || !content || !panel || !closeButton) return;

  let lastFocused: HTMLElement | null = null;

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    lastFocused?.focus();
  };

  const openModal = (projectId: string, trigger: HTMLElement) => {
    const project = projects.find((item) => item.id === projectId);
    if (!project) return;
    lastFocused = trigger;
    content.innerHTML = renderProjectModalContent(project);
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    closeButton.focus();
  };

  document.querySelectorAll<HTMLButtonElement>('[data-project-id]').forEach((button) => {
    button.addEventListener('click', () => openModal(button.dataset.projectId ?? '', button));
  });

  modal.querySelectorAll<HTMLElement>('[data-modal-close]').forEach((element) => element.addEventListener('click', closeModal));
  closeButton.addEventListener('click', closeModal);
  document.addEventListener('keydown', (event) => {
    if (!modal.classList.contains('open')) return;
    if (event.key === 'Escape') closeModal();
    if (event.key !== 'Tab') return;
    const focusable = [...panel.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])')];
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
    renderExperienceTimeline(experiences),
    renderProjects(projects, experiences),
    renderContact(profile, contactLinks),
    renderProjectDialog(),
  ].join('');
  footer.innerHTML = renderFooter(profile, contactLinks);

  setupTheme();
  setupMobileNavigation();
  setupActiveNavigation();
  setupProjectModal();
}

if (typeof document !== 'undefined') mountPortfolio();
