import { experience, skillGroups, projects, blogs, resources } from './data.js';

const renderTags = (items = []) => items.map(item => `<span>${item}</span>`).join('');

document.querySelector('#experience-list').innerHTML = experience.map((job, index) => `
  <article class="timeline-item ${job.current ? 'is-current' : ''}">
    <div class="timeline-marker"><span>${String(index + 1).padStart(2, '0')}</span></div>
    <div class="timeline-main">
      <div class="job-topline"><span class="job-period">${job.period}</span>${job.current ? '<span class="current-label"><i></i> CURRENT</span>' : ''}</div>
      <h3>${job.role}</h3><div class="company-line">${job.company} <span>·</span> ${job.location}</div>
      <ul>${job.highlights.map(item => `<li>${item}</li>`).join('')}</ul>
      <div class="tag-list">${renderTags(job.tags)}</div>
    </div>
  </article>`).join('');

document.querySelector('#skill-groups').innerHTML = skillGroups.map((group, index) => `
  <article class="skill-card"><div class="skill-number">0${index + 1}</div><h3>${group.name}</h3><div class="skill-pills">${renderTags(group.items)}</div></article>`).join('');

document.querySelector('#project-list').innerHTML = projects.map((project, index) => `
  <article class="content-card">
    <div class="card-topline"><span>${project.type}</span><span class="card-index">0${index + 1}</span></div>
    <h3>${project.title}</h3><p>${project.summary}</p>
    <ul class="mini-list">${(project.highlights || []).map(item => `<li>${item}</li>`).join('')}</ul>
    <div class="tag-list">${renderTags(project.stack)}</div>
    <div class="card-bottom"><span>${project.status || 'Project'}</span>${project.link ? `<a href="${project.link}" target="_blank" rel="noreferrer">View project ↗</a>` : '<span class="muted-note">Case study link coming soon</span>'}</div>
  </article>`).join('');

document.querySelector('#blog-list').innerHTML = blogs.map((post, index) => `
  <article class="content-card blog-card">
    <div class="card-topline"><span>${post.category}</span><span class="card-index">0${index + 1}</span></div>
    <div class="post-meta">${post.date} <span>·</span> ${post.readTime}</div>
    <h3>${post.title}</h3><p>${post.excerpt}</p>
    <div class="card-bottom">${post.link ? `<a href="${post.link}" target="_blank" rel="noreferrer">Read article ↗</a>` : '<span class="muted-note">Starter example · add your published URL in data.js</span>'}</div>
  </article>`).join('');

document.querySelector('#resource-list').innerHTML = resources.map((resource, index) => `
  <a class="resource-row" href="${resource.url}" target="_blank" rel="noreferrer">
    <span class="resource-number">0${index + 1}</span><span class="resource-copy"><small>${resource.kind}</small><strong>${resource.title}</strong><em>${resource.description}</em></span><span class="resource-arrow">↗</span>
  </a>`).join('');

document.querySelector('#year').textContent = new Date().getFullYear();
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('is-open', !expanded);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('is-open'); menuButton.setAttribute('aria-expanded', 'false');
}));

// Subtle entrance reveals; content remains visible when reduced motion is requested or JS is unavailable.
const revealItems = document.querySelectorAll('.reveal, .focus-grid article, .timeline-item, .skill-card, .content-card, .resource-row');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealItems.forEach(item => item.classList.add('will-reveal'));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('is-visible'));
}
