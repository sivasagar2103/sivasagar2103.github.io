import { experience, skillGroups, projects, blogs, resources } from './data.js';

const searchEntries = [
  {
    title: 'About and engineering approach',
    category: 'About',
    detail: 'Practical engineering, useful AI automation, maintainable services, dependable backend platforms, reliability, and keeping people in the loop.',
    href: 'index.html#about'
  },
  {
    title: 'Agentic systems',
    category: 'Focus area',
    detail: 'Tool-using workflows, orchestration, MCP services and human approval for high-impact actions.',
    href: 'index.html#about'
  },
  {
    title: 'Backend engineering',
    category: 'Focus area',
    detail: 'APIs, authentication, multi-tenancy, distributed workers and data-intensive services.',
    href: 'index.html#about'
  },
  {
    title: 'Cloud intelligence',
    category: 'Focus area',
    detail: 'Multi-cloud governance, cost optimisation, observability and operational automation.',
    href: 'index.html#about'
  },
  {
    title: 'Education and recognition',
    category: 'Education',
    detail: 'Bachelor of Technology in Electronics and Communication Engineering from Jawaharlal Nehru Technological University, Anantapur. Oracle Agentic AI Foundations Associate. Best Employee of the Quarter.',
    href: 'index.html#education'
  },
  ...experience.map(job => ({
    title: job.role,
    category: 'Experience',
    detail: `${job.company} · ${job.period} · ${job.highlights.join(' ')}`,
    href: 'index.html#work'
  })),
  ...skillGroups.map(group => ({
    title: group.name,
    category: 'Toolkit',
    detail: group.items.join(' '),
    href: 'index.html#toolkit'
  })),
  ...projects.map(project => ({
    title: project.title,
    category: 'Project',
    detail: `${project.summary} ${project.stack.join(' ')}`,
    href: 'projects.html'
  })),
  ...blogs.map(post => ({
    title: post.title,
    category: 'Writing',
    detail: `${post.category} ${post.excerpt}`,
    href: 'blog.html'
  })),
  ...resources.map(resource => ({
    title: resource.title,
    category: 'Resource',
    detail: `${resource.kind} ${resource.description}`,
    href: 'resources.html',
    externalHref: resource.url
  }))
];

const normalize = value => value.toLocaleLowerCase().trim();

export const initSearch = () => {
  const openButton = document.querySelector('.search-toggle');
  if (!openButton) return;

  const dialog = document.createElement('dialog');
  dialog.className = 'search-dialog';
  dialog.setAttribute('aria-labelledby', 'search-title');
  dialog.innerHTML = `
    <div class="search-panel">
      <div class="search-heading">
        <div><span class="section-kicker">PORTFOLIO SEARCH</span><h2 id="search-title">What are you looking for?</h2></div>
        <button class="search-close" type="button" aria-label="Close search">×</button>
      </div>
      <label class="search-field">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 5 5"></path></svg>
        <input type="search" placeholder="Try “FastAPI”, “agentic AI”, or “cloud”" autocomplete="off" />
        <kbd>ESC</kbd>
      </label>
      <p class="search-hint">Search projects, notes, experience, skills and resources.</p>
      <div class="search-results" aria-label="Search results">
        <p class="search-empty">Start typing to explore the portfolio.</p>
      </div>
    </div>`;
  document.body.append(dialog);

  const input = dialog.querySelector('input');
  const results = dialog.querySelector('.search-results');
  const closeButton = dialog.querySelector('.search-close');

  const renderResults = query => {
    const normalizedQuery = normalize(query);
    if (!normalizedQuery) {
      results.innerHTML = '<p class="search-empty">Start typing to explore the portfolio.</p>';
      return;
    }

    const terms = normalizedQuery.split(/\s+/);
    const matches = searchEntries.filter(entry => {
      const searchableText = normalize(`${entry.title} ${entry.category} ${entry.detail}`);
      return terms.every(term => searchableText.includes(term));
    }).slice(0, 8);

    if (!matches.length) {
      results.innerHTML = '<p class="search-empty">No matches yet. Try another keyword.</p>';
      return;
    }

    results.innerHTML = matches.map(entry => `
      <a class="search-result" href="${entry.externalHref || entry.href}" ${entry.externalHref ? 'target="_blank" rel="noreferrer"' : ''}>
        <span><small>${entry.category}</small><strong>${entry.title}</strong><em>${entry.detail.slice(0, 150)}${entry.detail.length > 150 ? '…' : ''}</em></span>
        <b aria-hidden="true">↗</b>
      </a>`).join('');
  };

  openButton.addEventListener('click', () => {
    dialog.showModal();
    input.focus();
  });
  closeButton.addEventListener('click', () => dialog.close());
  input.addEventListener('input', () => renderResults(input.value));
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    input.value = '';
    renderResults('');
    openButton.focus();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && dialog.open) {
      dialog.close();
      return;
    }

    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      if (!dialog.open) openButton.click();
    }
  });
};
