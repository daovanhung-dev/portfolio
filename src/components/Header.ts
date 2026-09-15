import type { LinkItem, Profile } from '../data/types';
import { escapeHtml, linkItem } from './utils';

export function renderHeader(profile: Profile, navigationLinks: LinkItem[]): string {
  const nav = navigationLinks.map((link) => linkItem(link.label, link.url, 'nav-link')).join('');
  return `<header class="site-header" id="top">
    <a class="brand" href="#top" aria-label="Về đầu trang">
      <span class="brand-mark">${escapeHtml(profile.shortName.slice(0, 1))}</span>
      <span class="brand-text">${escapeHtml(profile.name)}</span>
    </a>
    <nav class="desktop-nav" aria-label="Điều hướng chính">${nav}</nav>
    <div class="header-actions">
      <button class="icon-btn mobile-menu-toggle" id="mobileMenuToggle" type="button" aria-expanded="false" aria-controls="mobileNav" aria-label="Mở menu">☰</button>
      <button class="icon-btn" id="themeToggle" type="button" aria-label="Đổi giao diện sáng tối">☼</button>
    </div>
    <nav class="mobile-nav" id="mobileNav" aria-label="Điều hướng di động" hidden>${nav}</nav>
  </header>`;
}
