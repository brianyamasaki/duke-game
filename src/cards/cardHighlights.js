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
  SLIDE_DIAG_DOWN_RIGHT,
  TILE_RANGER,
  TILE_PIKEMAN
} from './cardConstants';
import { BOARD_ROW_COUNT, BOARD_COL_COUNT } from '../constants';
import { rowColToIndex, indexToRowCol } from '../shared';
import { dukeMoves, dukeFootmen } from './duke';
import { footmanMoves } from './footman';
import { knightMoves } from './knight';
import { priestMoves } from './priest';
import { seerMoves } from './seer';
import { rangerMoves } from './ranger';
import { pikemanMoves } from './pikeman';

const isTileOnSpace = (players, iSpace) => {
  let tileInfos = [];
  players.forEach(player => {
    tileInfos = tileInfos.concat(player.tilesOnBoard);
  })
  const index = tileInfos.findIndex(tileInfo => tileInfo.iSpace === iSpace);
  if (index >= 0) {
    const tile = tileInfos[index];
    return {
      type: tile.type,
      iPlayer: tile.iPlayer
    };
  }
};

export const highlightsFromType = (players, iSpace, type, isOdd, iPlayer) => {
  let moves;
  switch (type) {
    case TILE_DUKE:
      moves = dukeMoves;
      break;
    case TILE_FOOTMAN:
      moves = footmanMoves;
      break;
    case TILE_KNIGHT:
      moves = knightMoves;
      break;
    case TILE_PIKEMAN:
      moves = pikemanMoves;
      break;
    case TILE_PRIEST:
      moves = priestMoves;
      break;
    case TILE_RANGER:
      moves = rangerMoves;
      break;
    case TILE_SEER:
      moves = seerMoves;
      break;
    case HIGHLIGHTS_DUKES_FOOTMEN:
      moves = dukeFootmen;
      break;
    default:
      window.alert('No movement rules for tile type ' + type);
      return [];
  }
  return highlightsFromRules(players, iSpace, moves, isOdd, iPlayer);
};

const highlightsFromRules = (players, iSpace, moves, isOdd, iPlayer) => {
  let highlights = [];
  const ruleSet = isOdd ? moves.odd : moves.even;
  for (let key in ruleSet) {
    switch (key) {
      case 'move':
      case 'jump':
      case 'strike':
        highlights = highlights.concat(
          spacesFromRowColRules(
            players,
            iSpace, 
            ruleSet[key], 
            iPlayer,
            key === 'jump')
        );
        break;
      case 'slide':
      case 'jumpSlide':
        highlights = highlights.concat(
          spacesFromSlideRules(players, iSpace, ruleSet[key], iPlayer, key === 'jumpSlide')
        );
        break;
      case 'type':
        console.log('Reading rule for tile type ' + ruleSet[key]);
        break;
      default:
        window.alert(`Rule type ${key} not supported`);
        break;
    }
  }
  return highlights;
}

const spacesFromSlideRules = (players, iSpace, rules, iPlayer, isJump) => {
  const sign = iPlayer ? -1 : 1;
  let highlights = [];
  rules.forEach(slide => {
    highlights = highlights.concat(spacesAlongSlide(players, iSpace, sign, slide, iPlayer, isJump));
  })
  return highlights;
}

const spacesFromRowColRules = (players, iSpace, rules, iPlayer) => {
  const sign = iPlayer ? -1 : 1;
  const { row, col } = indexToRowCol(iSpace);
  const highlights = [];
  rules.forEach(rule => {
    const rowRule = row + (rule.row * sign);
    const colRule = col + (rule.col * sign);
    const iSpaceT = rowColToIndex(rowRule, colRule);
    if (rowRule >= 0 && 
      rowRule < BOARD_ROW_COUNT &&
      colRule >= 0 && 
      colRule < BOARD_COL_COUNT) {
        const tileInfo = isTileOnSpace(players, iSpaceT);
        
        if (!tileInfo || tileInfo.iPlayer !== iPlayer) {
          highlights.push(iSpaceT);
        } 
    }
  })
  return highlights;
}

function spacesAlongSlide(players, iSpace, sign, slide, iPlayer, isJump) {
  const highlights = [];
  const { row, col } = indexToRowCol(iSpace);
  let rule, 
    i,
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
  for (i = 0; i < BOARD_ROW_COUNT; i++) {
    colT += rule.col;
    rowT += rule.row;
    let iSpaceT = rowColToIndex(rowT, colT);
    if (colT < 0  || colT >= BOARD_ROW_COUNT ||
      rowT < 0 || rowT >= BOARD_ROW_COUNT) {
        break;
      } else {
        const tileInfo = isTileOnSpace(players, iSpaceT);
        if (!tileInfo) {
          highlights.push(iSpaceT);
        } else if (tileInfo.iPlayer !== iPlayer) {
          highlights.push(iSpaceT);
          if (!isJump)
            break;
        } else {
          if (!isJump)
            break;
        }
      }
  }
  return highlights;
}

