import { blogs } from './data.js';
import { escapeHtml, renderInto } from '../shared/render-utils.js';

export const renderWriting = () => {
  if (!blogs.length) {
    renderInto('#blog-list', '<p class="search-empty">New notes are on the way. Check back soon.</p>');
    return;
  }

  const markup = blogs.map((post, index) => `
    <article class="content-card blog-card">
      <div class="card-topline"><span>${escapeHtml(post.category)}</span><span class="card-index">${String(index + 1).padStart(2, '0')}</span></div>
      <div class="post-meta">${escapeHtml(post.date)} <span>·</span> ${escapeHtml(post.readTime)}</div>
      <h3>${escapeHtml(post.title)}</h3><p>${escapeHtml(post.excerpt)}</p>
      <div class="card-bottom"><a href="${escapeHtml(post.link)}">Read note ↗</a></div>
    </article>`).join('');

  renderInto('#blog-list', markup);
};
