import { projects } from './data.js';
import { renderContentCards } from '../shared/content-cards.js';
export const renderProjects = () => renderContentCards('#project-list', projects);
