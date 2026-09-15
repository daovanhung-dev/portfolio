import type { LiveProduct } from '../data/types';
import { statusBadge } from './EvidenceBadge';
import { escapeHtml, externalAttrs } from './utils';

export function renderLiveProductCard(product: LiveProduct): string {
  return `<article class="live-product-card card reveal">
    <div class="live-product-top"><span class="live-product-mark">●</span>${statusBadge(product.status)}</div>
    <h3>${escapeHtml(product.name)}</h3>
    <p>${escapeHtml(product.purpose)}</p>
    <div class="live-product-detail"><strong>Architecture</strong><span>${escapeHtml(product.architectureHighlight)}</span></div>
    <div class="live-product-detail"><strong>Role</strong><span>${escapeHtml(product.role)}</span></div>
    <div class="live-product-actions">
      <a class="btn btn-small btn-primary" href="${escapeHtml(product.liveUrl)}"${externalAttrs(product.liveUrl)}>Live Demo ↗</a>
      ${product.repository ? `<a class="btn btn-small btn-ghost" href="${escapeHtml(product.repository)}"${externalAttrs(product.repository)}>Repository ↗</a>` : ''}
    </div>
  </article>`;
}

export function renderLiveProducts(products: LiveProduct[]): string {
  return `<section class="section shell" id="live-products" aria-labelledby="live-products-heading">
    <div class="section-heading compact reveal">
      <div><p class="section-kicker">04 — LIVE PRODUCTS</p><h2 id="live-products-heading">Những gì có thể mở và kiểm tra</h2></div>
      <p>Live URL là evidence của deployment tại thời điểm audit; status không tự động có nghĩa là mọi capability đã hoàn tất.</p>
    </div>
    <div class="live-products-grid">${products.map(renderLiveProductCard).join('')}</div>
  </section>`;
}
