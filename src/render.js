import { renderChallenges } from './sections/challenges/render.js';
import { renderExperience } from './sections/experience/render.js';
import { renderToolkit } from './sections/toolkit/render.js';
import { renderProjects } from './sections/projects/render.js';
import { renderWriting } from './sections/writing/render.js';

export const renderPortfolioContent = () => {
  renderChallenges();
  renderExperience();
  renderToolkit();
  renderProjects();
  renderWriting();
};
