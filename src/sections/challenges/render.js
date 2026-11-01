import { challenges } from './data.js';
import { renderContentCards } from '../shared/content-cards.js';
export const renderChallenges = () => renderContentCards('#challenges-list', challenges);
