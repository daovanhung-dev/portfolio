import type { LinkItem, Profile } from '../data/types';
import { escapeHtml, externalAttrs } from './utils';

export function renderContact(profile: Profile, contactLinks: LinkItem[]): string {
  return `<section class="section shell" id="contact" aria-labelledby="contact-heading">
    <div class="contact-panel reveal">
      <div><p class="section-kicker">LIÊN HỆ</p><h2 id="contact-heading">Bạn muốn trao đổi về một dự án?</h2><p>Mình sẵn sàng nói chuyện về backend, Flutter, frontend hoặc phân tích hệ thống.</p></div>
      <div class="contact-actions">${contactLinks.map((link, index) => `<a class="btn ${index === 0 ? 'btn-primary' : 'btn-ghost'}" href="${escapeHtml(link.url)}"${externalAttrs(link.url)}>${escapeHtml(link.label)}${link.kind === 'external' ? ' ↗' : ''}</a>`).join('')}</div>
    </div>
  </section>`;
}

export function renderFooter(profile: Profile, contactLinks: LinkItem[]): string {
  return `<footer class="site-footer shell"><div><strong>${escapeHtml(profile.name)}</strong><span>${escapeHtml(profile.role)} · Backend · Flutter · System Analysis</span></div><div class="footer-right"><div class="footer-links">${contactLinks.map((link) => `<a href="${escapeHtml(link.url)}"${externalAttrs(link.url)}>${escapeHtml(link.label)}</a>`).join('')}<a href="#top">Về đầu trang ↑</a></div></div></footer>`;
}
