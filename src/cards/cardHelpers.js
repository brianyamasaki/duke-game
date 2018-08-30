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

const mpMovesTiletype = {
  [HIGHLIGHTS_DUKES_FOOTMEN]: dukeFootmen,
  [TILE_DUKE]: dukeMoves,
  [TILE_FOOTMAN]: footmanMoves,
  [TILE_KNIGHT]: knightMoves,
  [TILE_PRIEST]: priestMoves,
  [TILE_SEER]: seerMoves,
  [TILE_RANGER]: rangerMoves,
  [TILE_PIKEMAN]: pikemanMoves,
  [TILE_LONGBOWMAN]: longbowmanMoves,
  [TILE_GENERAL]: generalMoves
};

export function movesFromTiletype(tileType) {
  return mpMovesTiletype[tileType];
}