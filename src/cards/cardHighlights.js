import { 
  TILE_DUKE,
  TILE_FOOTMAN,
  TILE_KNIGHT,
  TILE_PRIEST,
  TILE_SEER,
  TILE_LONGBOWMAN,
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
  TILE_PIKEMAN,
  RULETYPE_MOVE,
  RULETYPE_JUMP,
  RULETYPE_STRIKE,
  RULETYPE_SLIDE,
  RULETYPE_JUMPSLIDE,
  DENYMOVESPACES
} from './cardConstants';
import { 
  BOARD_ROW_COUNT, 
  BOARD_COL_COUNT,
  HIGHLIGHT_MOVE,
  HIGHLIGHT_JUMP,
  HIGHLIGHT_SLIDE,
  // HIGHLIGHT_COMMAND,
  HIGHLIGHT_STRIKE,
  HIGHLIGHT_JUMPSLIDE,
  HIGHLIGHT_CAPTURE
} from '../constants';
import { rowColToIndex, indexToRowCol } from '../shared';
import { dukeMoves, dukeFootmen } from './duke';
import { footmanMoves } from './footman';
import { knightMoves } from './knight';
import { priestMoves } from './priest';
import { seerMoves } from './seer';
import { rangerMoves } from './ranger';
import { pikemanMoves } from './pikeman';
import { longbowmanMoves } from './longbowman';

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
    case TILE_LONGBOWMAN:
      moves = longbowmanMoves;
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

const highlightTypes = {
  RULETYPE_MOVE: HIGHLIGHT_MOVE,
  RULETYPE_JUMP: HIGHLIGHT_JUMP,
  RULETYPE_SLIDE: HIGHLIGHT_SLIDE,
  RULETYPE_JUMPSLIDE: HIGHLIGHT_JUMPSLIDE,
  RULETYPE_STRIKE: HIGHLIGHT_STRIKE,
}

const highlightsFromRules = (players, iSpace, moves, isOdd, iPlayer) => {
  let highlights = [];
  const ruleSet = isOdd ? moves.odd : moves.even;
  for (let key in ruleSet) {
    switch (key) {
      case RULETYPE_MOVE:
      case RULETYPE_JUMP:
      case RULETYPE_STRIKE:
        highlights = highlights.concat(
          spacesFromRowColRules(
            players,
            iSpace, 
            ruleSet[key], 
            iPlayer,
            key
          )
        );
        break;
      case RULETYPE_SLIDE:
      case RULETYPE_JUMPSLIDE:
        highlights = highlights.concat(
          spacesFromSlideRules(
            players, 
            iSpace, 
            ruleSet[key], 
            iPlayer, 
            key
          )
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

const spacesFromSlideRules = (players, iSpace, rules, iPlayer, ruleType) => {
  const sign = iPlayer ? -1 : 1;
  let highlights = [];
  rules.forEach(slide => {
    highlights = highlights.concat(spacesAlongSlide(players, iSpace, sign, slide, iPlayer, ruleType));
  })
  return highlights;
}

const isValidSpace = (row, col) => {
  if (row >= 0 && 
    row < BOARD_ROW_COUNT &&
    col >= 0 && 
    col < BOARD_COL_COUNT) {
      return true;
  }
  return false;
}

const highlightFromRule = (rule, players, iPlayer, rowTile, colTile, ruleType) => {
  const sign = iPlayer ? -1 : 1;
  const rowFromRule = rowTile + (rule.row * sign);
  const colFromRule = colTile + (rule.col * sign);
  let denyTile;

  // check if space indicated by rule is off the board
  if (isValidSpace(rowFromRule, colFromRule)) {
    // check if there are tiles that would get in the way of a move?
    if (Array.isArray(rule[DENYMOVESPACES])) {
      const denySpaces  = rule[DENYMOVESPACES];
      denyTile = denySpaces.some(offset => {
        const row = rowTile + (offset.row * sign);
        const col = colTile + (offset.col * sign);
        if (isValidSpace(row, col)) {
          const iSpace = rowColToIndex(row, col);
          const tileInfo = isTileOnSpace(players, iSpace);
          return !!tileInfo;
        }
        return false;

      });
    }
    if (!denyTile) {
      const iSpace = rowColToIndex(rowFromRule, colFromRule);
      const tileInfo = isTileOnSpace(players, iSpace);
      if (!tileInfo) {
        return {
          iSpace,
          type: highlightTypes[ruleType]
        };
      } else if (tileInfo.iPlayer !== iPlayer) {
        return {
          iSpace,
          type: HIGHLIGHT_CAPTURE
        }
      }
    }
  } 
}

const spacesFromRowColRules = (players, iSpace, rules, iPlayer, ruleType) => {
  const { row, col } = indexToRowCol(iSpace);
  const highlights = [];
  rules.forEach(rule => {
    const highlight = highlightFromRule(rule, players, iPlayer, row, col, ruleType);
    if (highlight) {
      highlights.push(highlight);
    }
  })
  return highlights;
}

function spacesAlongSlide(players, iSpace, sign, slide, iPlayer, ruleType) {
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
          highlights.push({
            iSpace: iSpaceT,
            type: highlightTypes[ruleType]
          });
        } else if (tileInfo.iPlayer !== iPlayer) {
          highlights.push({
            iSpace: iSpaceT,
            type: HIGHLIGHT_CAPTURE
          });
          if (ruleType !== RULETYPE_JUMPSLIDE)
            break;
        } else {
          if (ruleType !== RULETYPE_JUMPSLIDE)
            break;
        }
      }
  }
  return highlights;
}

