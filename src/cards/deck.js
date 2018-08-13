import { 
  TILE_DUKE,
  TILE_FOOTMAN,
  TILE_KNIGHT,
  TILE_PRIEST,
  TILE_SEER,
  TILE_PIKEMAN,
  TILE_RANGER
} from './cardConstants';
import { dukeMoves } from './duke';
import { footmanMoves } from './footman'
import { seerMoves } from './seer';
import { priestMoves } from './priest';
import { knightMoves } from './knight';
import { rangerMoves } from './ranger';
import { pikemanMoves } from './pikeman';

const createCard = type => {
  let moves;
  switch(type) {
    case TILE_DUKE:
      moves = dukeMoves;
      break;
    case TILE_FOOTMAN:
      moves = footmanMoves;
      break;
    case TILE_SEER:
      moves = seerMoves;
      break;
    case TILE_PRIEST:
      moves = priestMoves;
      break;
    case TILE_KNIGHT:
      moves = knightMoves;
      break;
    case TILE_PIKEMAN:
      moves = pikemanMoves;
      break;
    case TILE_RANGER:
      moves = rangerMoves;
      break;
    default:
      window.alert('illegal card type in createCard (deck.js)');
      break;
  }
  return {
    type,
    moves,
    moveIndex: 1,
    spaceIndex: -1
  }
}

const deckContents = [
  { type: TILE_DUKE, count: 1},
  { type: TILE_FOOTMAN, count: 3 },
  { type: TILE_KNIGHT, count: 1 },
  { type: TILE_SEER, count: 1 },
  { type: TILE_PRIEST, count: 1 },
  { type: TILE_PIKEMAN, count: 3 },
  { type: TILE_RANGER, count: 1 }
];

export const shuffleDeck = () => {
  const deck = [];

  deckContents.forEach(countType => {
    for (let i = 0; i < countType.count; i++ ) {
      deck.push(createCard(countType.type));
    }
  })

  return deck;
}