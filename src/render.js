import { experience, skillGroups, projects, blogs, resources } from './data.js';

const renderTags = (items = []) => items.map(item => `<span>${item}</span>`).join('');

const renderInto = (selector, content) => {
  const element = document.querySelector(selector);
  if (element) element.innerHTML = content;
};

const renderExperience = () => experience.map((job, index) => `
  <article class="timeline-item ${job.current ? 'is-current' : ''}">
    <div class="timeline-marker"><span>${String(index + 1).padStart(2, '0')}</span></div>
    <div class="timeline-main">
      <div class="job-topline"><span class="job-period">${job.period}</span>${job.current ? '<span class="current-label"><i></i> CURRENT</span>' : ''}</div>
      <h3>${job.role}</h3><div class="company-line">${job.company} <span>·</span> ${job.location}</div>
      <ul>${job.highlights.map(item => `<li>${item}</li>`).join('')}</ul>
      <div class="tag-list">${renderTags(job.tags)}</div>
    </div>
  </article>`).join('');

const renderSkills = () => skillGroups.map((group, index) => `
  <article class="skill-card">
    <div class="skill-number">${String(index + 1).padStart(2, '0')}</div>
    <h3>${group.name}</h3>
    <div class="skill-pills">${renderTags(group.items)}</div>
  </article>`).join('');

const renderProjects = () => projects.map((project, index) => `
  <article class="content-card">
    <div class="card-topline"><span>${project.type}</span><span class="card-index">${String(index + 1).padStart(2, '0')}</span></div>
    <h3>${project.title}</h3><p>${project.summary}</p>
    <ul class="mini-list">${(project.highlights || []).map(item => `<li>${item}</li>`).join('')}</ul>
    <div class="tag-list">${renderTags(project.stack)}</div>
    <div class="card-bottom"><span>${project.status || 'Project'}</span>${project.link ? `<a href="${project.link}" target="_blank" rel="noreferrer">View project ↗</a>` : '<span class="muted-note">Case study link coming soon</span>'}</div>
  </article>`).join('');

const renderBlogs = () => blogs.map((post, index) => `
  <article class="content-card blog-card">
    <div class="card-topline"><span>${post.category}</span><span class="card-index">${String(index + 1).padStart(2, '0')}</span></div>
    <div class="post-meta">${post.date} <span>·</span> ${post.readTime}</div>
    <h3>${post.title}</h3><p>${post.excerpt}</p>
    <div class="card-bottom">${post.link ? `<a href="${post.link}" target="_blank" rel="noreferrer">Read article ↗</a>` : '<span class="muted-note">Starter example · add your published URL in data.js</span>'}</div>
  </article>`).join('');

const renderResources = () => resources.map((resource, index) => `
  <a class="resource-row" href="${resource.url}" target="_blank" rel="noreferrer">
    <span class="resource-number">${String(index + 1).padStart(2, '0')}</span>
    <span class="resource-copy"><small>${resource.kind}</small><strong>${resource.title}</strong><em>${resource.description}</em></span>
    <span class="resource-arrow">↗</span>
  </a>`).join('');

export const renderPortfolioContent = () => {
  renderInto('#experience-list', renderExperience());
  renderInto('#skill-groups', renderSkills());
  renderInto('#project-list', renderProjects());
  renderInto('#blog-list', renderBlogs());
  renderInto('#resource-list', renderResources());
};
