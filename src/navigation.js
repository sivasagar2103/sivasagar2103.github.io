export const initNavigation = () => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  menuButton?.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    nav?.classList.toggle('is-open', !expanded);
  });

  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));

  const connectButton = document.querySelector('.connect-toggle');
  const connectOptions = document.querySelector('.connect-options');

  connectButton?.addEventListener('click', () => {
    const expanded = connectButton.getAttribute('aria-expanded') === 'true';
    connectButton.setAttribute('aria-expanded', String(!expanded));
    connectOptions?.classList.toggle('is-open', !expanded);
  });

  document.addEventListener('click', event => {
    if (!(event.target instanceof Element) || event.target.closest('.connect-menu')) return;
    connectButton?.setAttribute('aria-expanded', 'false');
    connectOptions?.classList.remove('is-open');
  });

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    nav?.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    connectButton?.setAttribute('aria-expanded', 'false');
    connectOptions?.classList.remove('is-open');
    if (document.activeElement?.closest('.connect-menu')) connectButton?.focus();
  });
};
