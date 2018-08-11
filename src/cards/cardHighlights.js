import { 
  TILE_DUKE,
  TILE_FOOTMAN,
  TILE_KNIGHT,
  TILE_PRIEST,
  TILE_SEER,
  HIGHLIGHTS_DUKES_FOOTMEN,
  SLIDE_UP, 
  SLIDE_DOWN, 
  SLIDE_RIGHT, 
  SLIDE_LEFT,
  SLIDE_DIAG_UP_LEFT,
  SLIDE_DIAG_UP_RIGHT,
  SLIDE_DIAG_DOWN_LEFT,
  SLIDE_DIAG_DOWN_RIGHT
} from './cardConstants';
import { BOARD_ROW_COUNT, BOARD_COL_COUNT } from '../constants';
import { rowColToIndex, indexToRowCol } from '../shared';
import { dukeMoves, dukeFootmen } from './duke';
import { footmanMoves } from './footman';
import { knightMoves } from './knight';
import { priestMoves } from './priest';
import { seerMoves } from './seer';

export const highlightsFromType = (iSpace, type, isOdd, iPlayer) => {
  switch (type) {
    case TILE_DUKE:
      return highlightsFromRules(iSpace, dukeMoves, isOdd, iPlayer);
    case TILE_FOOTMAN:
      return highlightsFromRules(iSpace, footmanMoves, isOdd, iPlayer);
    case TILE_KNIGHT:
      return highlightsFromRules(iSpace, knightMoves, isOdd, iPlayer);
    case TILE_PRIEST:
      return highlightsFromRules(iSpace, priestMoves, isOdd,iPlayer);
    case TILE_SEER:
      return highlightsFromRules(iSpace, seerMoves, isOdd, iPlayer);
    case HIGHLIGHTS_DUKES_FOOTMEN:
      return highlightsFromRules(iSpace, dukeFootmen, isOdd, iPlayer);
    default:
      window.alert('No movement rules for tile type ' + type);
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
            iPlayer)
        );
        break;
      case 'slide':
        highlights = highlights.concat(
          spacesFromSlideRules(iSpace, ruleSet[key], iPlayer)
        );
        break;
      case 'type':
        console.log('Reading rule for tile type ' + ruleSet[key]);
        break;
      default:
        break;
    }
  }
  return highlights;
}

const spacesFromSlideRules = (iSpace, rules, iPlayer) => {
  const sign = iPlayer ? -1 : 1;
  let spaces = [];
  rules.forEach(slide => {
    spaces = spaces.concat(spacesAlongSlide(iSpace, sign, slide));
  })
  return spaces;
}

const spacesFromRowColRules = (iSpace, rules, iPlayer) => {
  const sign = iPlayer ? -1 : 1;
  const { row, col } = indexToRowCol(iSpace);
  const spaces = [];
  rules.forEach(rule => {
    const rowRule = row + (rule.row * sign);
    const colRule = col + (rule.col * sign);
    if (rowRule >= 0 && 
      rowRule < BOARD_ROW_COUNT &&
      colRule >= 0 && 
      colRule < BOARD_COL_COUNT) {
      spaces.push(rowColToIndex(rowRule, colRule));
    }
  })
  return spaces;
}

const spacesAlongSlide = (iSpace, sign, slide) => {
  const spaces = [];
  const { row, col } = indexToRowCol(iSpace);
  let rule, 
    rowT = row, 
    colT = col;
  switch(slide) {
    case SLIDE_DIAG_UP_LEFT:
      rule = { row: -1 * sign, col: -1 * sign };
      break;
    case SLIDE_DIAG_UP_RIGHT:
      rule = { row: -1 * sign, col: 1 * sign };
      break;
    case SLIDE_DIAG_DOWN_LEFT:
      rule = { row: 1 * sign, col: -1 * sign };
      break;
    case SLIDE_DIAG_DOWN_RIGHT:
      rule = { row: 1 * sign, col: 1 * sign };
      break;
    case SLIDE_UP:
      rule = { row: -1 * sign, col: 0 };
      break;
    case SLIDE_DOWN:
      rule = { row: 1 * sign, col: 0 };
      break;
    case SLIDE_LEFT:
      rule = { row: 0, col: -1 * sign };
      break;
    case SLIDE_RIGHT:
      rule = { row: 0, col: 1 * sign };
      break;
    default:
      window.alert('Illegal SLIDE type ' + slide);
      break;
  }
  for (let i = 0; i < BOARD_ROW_COUNT; i++) {
    colT += rule.col;
    rowT += rule.row;
    if (colT >= 0 && colT < BOARD_ROW_COUNT &&
      rowT >= 0 && rowT < BOARD_ROW_COUNT) {
        spaces.push(rowColToIndex(rowT, colT));
      } else {
        break;
      }
  }
  return spaces;
}

