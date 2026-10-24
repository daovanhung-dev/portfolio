import './styles/tokens.css';
import './styles/global.css';
import './styles/components.css';
import './styles/responsive.css';
import './styles/portfolio.css';

import { renderQuickView, renderSiteFooter, renderSiteHeader, resolveRoute } from './routes';

type Theme = 'light' | 'dark';

function savedTheme(): Theme | null {
  try {
    const value = window.localStorage.getItem('portfolio-theme');
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  const button = document.getElementById('themeToggle');
  if (button) {
    button.textContent = theme === 'light' ? '☾' : '☼';
    button.setAttribute('aria-label', theme === 'light' ? 'Chuyển sang giao diện tối' : 'Chuyển sang giao diện sáng');
  }
}

function updateRoute(app: HTMLElement, focusHeading: boolean): void {
  const route = resolveRoute(window.location.hash);
  app.innerHTML = route.html;
  document.title = route.title;
  document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', route.description);
  document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute('content', route.title);
  document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute('content', route.description);
  if (focusHeading) {
    const heading = app.querySelector<HTMLElement>('#main-heading');
    heading?.focus({ preventScroll: true });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
  const search = app.querySelector<HTMLInputElement>('#projectSearch');
  if (search) {
    const cards = [...app.querySelectorAll<HTMLElement>('[data-project-card]')];
    const count = app.querySelector<HTMLElement>('#projectCount');
    const empty = app.querySelector<HTMLElement>('#projectEmpty');
    search.addEventListener('input', () => {
      const query = search.value.trim().toLocaleLowerCase();
      let visible = 0;
      cards.forEach((card) => {
        const matches = card.dataset.name?.includes(query) ?? false;
        card.hidden = !matches;
        if (matches) visible += 1;
      });
      if (count) count.textContent = `${visible} mục`;
      if (empty) empty.hidden = visible > 0;
    });
  }
}

export function mountPortfolio(documentRef: Document = document): void {
  const app = documentRef.getElementById('app');
  const header = documentRef.getElementById('siteHeader');
  const footer = documentRef.getElementById('siteFooter');
  if (!app || !header || !footer) return;

  header.innerHTML = renderSiteHeader();
  footer.innerHTML = renderSiteFooter();
  applyTheme(savedTheme() ?? (window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));
  document.getElementById('themeToggle')?.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    applyTheme(next);
    try { window.localStorage.setItem('portfolio-theme', next); } catch { /* Theme persistence is optional. */ }
  });

  const menuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileNav');
  if (menuToggle && mobileMenu) {
    mobileMenu.hidden = false;
    mobileMenu.inert = true;
    menuToggle.addEventListener('click', () => {
      const open = menuToggle.getAttribute('aria-expanded') !== 'true';
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
      mobileMenu.setAttribute('aria-hidden', String(!open));
      mobileMenu.dataset.open = String(open);
      mobileMenu.inert = !open;
    });
    mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Mở menu');
      mobileMenu.setAttribute('aria-hidden', 'true');
      mobileMenu.dataset.open = 'false';
      mobileMenu.inert = true;
    }));
  }

  updateRoute(app, false);
  window.addEventListener('hashchange', () => updateRoute(app, true));
  app.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const quickTrigger = target.closest<HTMLButtonElement>('[data-quickview]');
    const dialog = app.querySelector<HTMLDialogElement>('#quickView');
    if (!quickTrigger || !dialog) return;
    const content = app.querySelector<HTMLElement>('#quickContent');
    if (content) content.innerHTML = renderQuickView(quickTrigger.dataset.quickview ?? '');
    if (!dialog.open) dialog.showModal();
    dialog.querySelector<HTMLButtonElement>('.dialog-close')?.focus();
  });
  app.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const close = target.closest<HTMLButtonElement>('.dialog-close');
    if (close) app.querySelector<HTMLDialogElement>('#quickView')?.close();
    const dialogLink = target.closest<HTMLAnchorElement>('#quickContent a');
    if (dialogLink) app.querySelector<HTMLDialogElement>('#quickView')?.close();
  });
  app.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const skip = target.closest<HTMLAnchorElement>('.skip-link');
    if (!skip) return;
    event.preventDefault();
    app.querySelector<HTMLElement>('#main-heading')?.focus();
  });
  document.querySelector<HTMLAnchorElement>('.skip-link')?.addEventListener('click', (event) => {
    event.preventDefault();
    app.querySelector<HTMLElement>('#main-heading')?.focus();
  });
}

if (typeof document !== 'undefined') mountPortfolio();
