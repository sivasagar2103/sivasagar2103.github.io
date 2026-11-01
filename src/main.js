import { renderPortfolioContent } from './render.js';
import { initNavigation } from './navigation.js';
import { initSearch } from './search.js';
import { initRevealAnimations } from './animations.js';

renderPortfolioContent();
initNavigation();
initSearch();
initRevealAnimations();

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
