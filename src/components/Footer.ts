import type { LinkItem, Profile } from '../data/types';
import { escapeHtml, externalAttrs } from './utils';

export function renderContact(profile: Profile, contactLinks: LinkItem[]): string {
  return `<section class="section shell" id="contact" aria-labelledby="contact-heading">
    <div class="contact-panel reveal">
      <div><p class="section-kicker">LET'S BUILD</p><h2 id="contact-heading">Tôi thích những bài toán cần vừa hiểu nghiệp vụ, vừa làm hệ thống chạy thật.</h2><p>Nếu bạn đang tìm một developer có thể đi từ API/DB đến Flutter/web, đồng thời chịu khó truy nguyên lỗi và tài liệu hóa rõ ràng — hãy kết nối với tôi.</p></div>
      <div class="contact-actions">${contactLinks.map((link, index) => `<a class="btn ${index === 0 ? 'btn-primary' : 'btn-ghost'}" href="${escapeHtml(link.url)}"${externalAttrs(link.url)}>${escapeHtml(link.label)}${link.kind === 'external' ? ' ↗' : ''}</a>`).join('')}</div>
    </div>
  </section>`;
}

export function renderFooter(profile: Profile, contactLinks: LinkItem[]): string {
  return `<footer class="site-footer shell"><div><strong>${escapeHtml(profile.name)}</strong><span>${escapeHtml(profile.role)} · Backend Python · Flutter · System Analysis</span></div><div class="footer-right"><span>Built for evidence, not buzzwords.</span><div class="footer-links">${contactLinks.map((link) => `<a href="${escapeHtml(link.url)}"${externalAttrs(link.url)}>${escapeHtml(link.label)}</a>`).join('')}<a href="#top">Back to top ↑</a></div></div></footer>`;
}
