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
    switch (slide) {
      case SLIDE_UP:
        spaces = spaces.concat(spacesAlongColumn(iSpace, sign));
        break;
      case SLIDE_DOWN:
        spaces =  spaces.concat(spacesAlongColumn(iSpace, -1 * sign));
        break;
      case SLIDE_LEFT:
        spaces = spaces.concat(spacesAlongRow(iSpace, sign));
        break;
      case SLIDE_RIGHT:
        spaces = spaces.concat(spacesAlongRow(iSpace, -1 * sign));
        break;
      case SLIDE_DIAG_UP_LEFT:
      case SLIDE_DIAG_UP_RIGHT:
      case SLIDE_DIAG_DOWN_LEFT:
      case SLIDE_DIAG_DOWN_RIGHT:
        break;
      default:
        window.alert('Illegal Slide rule in tile rules');
        break;
    }
  })
  return spaces;
}

const spacesFromRowColRules = (iSpace, rules, iPlayer) => {
  const sign = iPlayer ? -1 : 1;
  const spaces = rules.map(rule => {
    return iSpace + (rule.row * sign * BOARD_ROW_COUNT) + (sign * rule.col);
  })
  return spaces;
}

const spacesAlongRow = (iSpace, sign) => {
  const spaces = [];
  let i;
  if (sign === 1) {
    for (i = Math.floor(iSpace / BOARD_ROW_COUNT) * BOARD_ROW_COUNT; i <= iSpace; i++) {
      spaces.push(i);
    }
  } else {
    for (i = Math.ceil(iSpace / BOARD_ROW_COUNT) * BOARD_ROW_COUNT - 1; i >= iSpace; i--) {
      spaces.push(i);
    }
  }
  return spaces;
}

const spacesAlongColumn = (iSpace, sign) => {
  const spaces = [];
  let i = iSpace;
  if (sign === 1) {
    for (; i >= 0; i -= BOARD_ROW_COUNT ) {
      spaces.push(i);
    }
  } else {
    for (; i < BOARD_ROW_COUNT * BOARD_COL_COUNT; i += BOARD_ROW_COUNT) {
      spaces.push(i);
    }
  }  
  return spaces;
}