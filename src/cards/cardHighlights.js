//import { } from './cardConstants';
import { BOARD_ROW_COUNT } from '../constants';
import { dukeMoves } from './duke';
import { footmanMoves } from './footman';
import { knightMoves } from './knight';
import { priestMoves } from './priest';
import { seerMoves } from './seer';

export const highlightsFromType = (iSpace, type, isOdd, iPlayer) => {
  switch (type) {
    case 'duke':
      return highlightsFromRules(iSpace, dukeMoves, isOdd, iPlayer);
    case 'footman':
      return highlightsFromRules(iSpace, footmanMoves, isOdd, iPlayer);
    case 'knight':
      break;
    case 'priest':
      break;
    case 'seer':
      break;
    default:
      break;
  }
  return [];
};

const highlightsFromRules = (iSpace, moves, isOdd, iPlayer) => {
  let highlights = [];
  const ruleSet = isOdd ? moves.odd : moves.even;
  for (let key in ruleSet) {
    switch (key) {
      case 'move':
      case 'jump':
        highlights = highlights.concat(
          spacesFromRowColRules(
            iSpace, 
            ruleSet[key], 
            isOdd, 
            iPlayer)
        );
        break;
      default:

        break;
    }
  }
  return highlights;
} 

const spacesFromRowColRules = (iSpace, rules, isOdd, iPlayer) => {
  const sign = iPlayer ? -1 : 1;
  const spaces = rules.map(rule => {
    return iSpace - (rule.row * sign * BOARD_ROW_COUNT) + (sign * rule.col);
  })
  return spaces;
}