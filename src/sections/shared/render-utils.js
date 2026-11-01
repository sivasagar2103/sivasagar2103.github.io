export const escapeHtml = value => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

export const renderTags = (items = []) => items.map(item => `<span>${escapeHtml(item)}</span>`).join('');

export const renderInto = (selector, content) => {
  const element = document.querySelector(selector);
  if (element) element.innerHTML = content;
};
