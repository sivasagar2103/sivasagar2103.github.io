export const initRevealAnimations = () => {
  const revealItems = document.querySelectorAll(
    '.reveal, .section-kicker, .focus-grid article, .impact-grid strong, ' +
    '.section-heading, .timeline-item, .skill-card, .content-card, ' +
    '.education-grid, .contact > h2, .page-switcher a'
  );
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!('IntersectionObserver' in window) || reducedMotion) {
    revealItems.forEach(item => item.classList.add('is-visible'));
    return;
  }

  revealItems.forEach((item, index) => {
    item.classList.add('will-reveal');
    item.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 70}ms`);
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      if (entry.target.matches('.impact-grid strong')) animateStat(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });

  revealItems.forEach(item => observer.observe(item));
};

const animateStat = element => {
  const match = element.textContent.trim().match(/^(\d+)(.*)$/);
  if (!match) return;

  const target = Number(match[1]);
  const suffix = match[2];
  const duration = 950;
  const start = performance.now();

  const update = now => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - (1 - progress) ** 3;
    element.textContent = `${Math.round(target * eased)}${suffix}`;
    if (progress < 1) requestAnimationFrame(update);
  };

  requestAnimationFrame(update);
};
