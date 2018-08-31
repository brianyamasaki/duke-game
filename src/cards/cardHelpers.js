import { 
  TILE_DUKE,
  TILE_FOOTMAN,
  TILE_KNIGHT,
  TILE_PRIEST,
  TILE_SEER,
  TILE_RANGER,
  TILE_PIKEMAN,
  TILE_LONGBOWMAN,
  TILE_GENERAL,
  TILE_MARSHALL,
  HIGHLIGHTS_DUKES_FOOTMEN
} from './cardConstants';

import { dukeMoves, dukeFootmen } from './duke';
import { footmanMoves } from './footman';
import { knightMoves } from './knight';
import { priestMoves } from './priest';
import { seerMoves } from './seer';
import { rangerMoves } from './ranger';
import { pikemanMoves } from './pikeman';
import { longbowmanMoves } from './longbowman';
import { generalMoves } from './general';
import { marshallMoves } from './marshall';

const mpTiletypeInfo = {
  [HIGHLIGHTS_DUKES_FOOTMEN]: {
    moves: dukeFootmen,
    name: 'Duke'
  },
  [TILE_DUKE]: {
    moves: dukeMoves,
    name: 'Duke'
  },
  [TILE_FOOTMAN]: {
    moves: footmanMoves,
    name: 'Footman'
  },
  [TILE_KNIGHT]: {
    moves: knightMoves,
    name: 'Knight'
  },
  [TILE_PRIEST]: {
    moves: priestMoves,
    name: 'Priest'
  },
  [TILE_SEER]: {
    moves: seerMoves,
    name: 'Seer'
  },
  [TILE_RANGER]: {
    moves: rangerMoves,
    name: 'Ranger'
  },
  [TILE_PIKEMAN]: {
    moves: pikemanMoves,
    name: 'Pikeman'
  },
  [TILE_LONGBOWMAN]: {
    moves: longbowmanMoves,
    name: 'Longbowman'
  },
  [TILE_GENERAL]: {
    moves: generalMoves,
    name: 'General'
  },
  [TILE_MARSHALL]: {
    moves: marshallMoves,
    name: 'Marshall'
  }
};

export function movesFromTiletype(tileType) {
  return mpTiletypeInfo[tileType].moves;
}

export const allTiletypes = () => {
  return Object.keys(mpTiletypeInfo);
}

export const nameFromTiletype = (tileType) => mpTiletypeInfo[tileType].name;