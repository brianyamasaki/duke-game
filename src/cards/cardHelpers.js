// import moves from each file
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
import { assassinMoves } from './assassin';

// insert all moves into this array
const moves = [
  dukeMoves,
  dukeFootmen,
  footmanMoves,
  knightMoves,
  priestMoves,
  seerMoves,
  rangerMoves,
  pikemanMoves,
  longbowmanMoves,
  generalMoves,
  marshallMoves,
  assassinMoves
];

const mpTiletypeInfo = {};

// This code creates an object with all tile data, moves, names, countInBag
moves.forEach(moves => mpTiletypeInfo[moves.type] = {
  moves,
  name: moves.name,
  countInBag: moves.countInBag
});

export function movesFromTiletype(tileType) {
  return mpTiletypeInfo[tileType].moves;
}

export const allTiletypes = () => {
  return Object.keys(mpTiletypeInfo);
}

export const nameFromTiletype = (tileType) => mpTiletypeInfo[tileType].name;

export const deckContains = () => {
  const contents = [];
  for(let tileType in mpTiletypeInfo) {
    contents.push({
      type: tileType,
      count: mpTiletypeInfo[tileType].countInBag
    });
  }
  return contents;
}