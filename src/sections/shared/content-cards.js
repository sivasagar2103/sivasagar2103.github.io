import { escapeHtml as e, renderInto, renderTags } from './render-utils.js';

export const renderContentCards = (selector, items) => renderInto(selector, items.length ? items.map(item => `
  <article class="content-card">
    <div class="card-topline"><span>${e(item.category)}</span><span>${e(item.timeline || item.status || '')}</span></div>
    <h3>${e(item.title)}</h3><p>${e(item.excerpt)}</p>
    <div class="tag-list">${renderTags(item.stack)}</div>
    <div class="card-bottom"><a href="${e(item.link)}">Read story ↗</a></div>
  </article>`).join('') : '<p class="search-empty">New stories are on the way. Check back soon.</p>');
