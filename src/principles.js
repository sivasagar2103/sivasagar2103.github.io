// The complete statement stays readable without JavaScript or motion support.
export const initPrinciples = () => {
  const panel = document.querySelector('.principles');
  if (!panel) return;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const replay = panel.querySelector('.principles-replay');
  const play = () => {
    panel.classList.remove('is-building');
    if (motion.matches) return;
    // Restart the finite CSS sequence, including when Replay is pressed.
    void panel.offsetWidth;
    panel.classList.add('is-building');
  };
  const syncMotion = () => {
    replay.hidden = motion.matches;
    if (motion.matches) panel.classList.remove('is-building');
  };
  replay.addEventListener('click', play);
  motion.addEventListener('change', syncMotion);
  syncMotion();
  if (!motion.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      play();
      observer.disconnect();
    }, { threshold: 0.35 });
    observer.observe(panel);
  }
};
