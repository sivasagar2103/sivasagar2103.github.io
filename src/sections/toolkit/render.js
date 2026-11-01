import { skillGroups } from './data.js';
import { renderTags, renderInto } from '../shared/render-utils.js';

export const renderToolkit = () => {
  const markup = skillGroups.map((group, index) => `
    <article class="skill-card">
      <div class="skill-number">${String(index + 1).padStart(2, '0')}</div>
      <h3>${group.name}</h3>
      <div class="skill-pills">${renderTags(group.items)}</div>
    </article>`).join('');

  renderInto('#skill-groups', markup);
};
