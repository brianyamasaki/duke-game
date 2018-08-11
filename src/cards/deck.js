import { 
  TILE_DUKE,
  TILE_FOOTMAN,
  TILE_KNIGHT,
  TILE_PRIEST,
  TILE_SEER
} from './cardConstants';
import { dukeMoves } from './duke';
import { footmanMoves } from './footman'
import { seerMoves } from './seer';
import { priestMoves } from './priest';
import { knightMoves } from './knight';

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
export const shuffleDeck = () => {
  const deck = [];
  deck.push(createCard(TILE_FOOTMAN));
  deck.push(createCard(TILE_FOOTMAN));
  deck.push(createCard(TILE_KNIGHT));
  deck.push(createCard(TILE_KNIGHT));
  deck.push(createCard(TILE_SEER));
  deck.push(createCard(TILE_SEER));
  deck.push(createCard(TILE_PRIEST));
  deck.push(createCard(TILE_PRIEST));

  return deck;
}