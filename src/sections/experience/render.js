import { experience } from './data.js';
import { renderTags, renderInto } from '../shared/render-utils.js';

export const renderExperience = () => {
  const markup = experience.map((job, index) => `
    <article class="timeline-item ${job.current ? 'is-current' : ''}">
      <div class="timeline-marker"><span>${String(index + 1).padStart(2, '0')}</span></div>
      <div class="timeline-main">
        <div class="job-topline"><span class="job-period">${job.period}</span>${job.current ? '<span class="current-label"><i></i> CURRENT</span>' : ''}</div>
        <h3>${job.role}</h3><div class="company-line">${job.company} <span>·</span> ${job.location}</div>
        <ul>${job.highlights.map(item => `<li>${item}</li>`).join('')}</ul>
        <div class="tag-list">${renderTags(job.tags)}</div>
      </div>
    </article>`).join('');

  renderInto('#experience-list', markup);
};
