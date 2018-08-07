import { dukeMoves } from './duke';
import { footmanMoves } from './footman'
import { seerMoves } from './seer';
import { priestMoves } from './priest';
import { knightMoves } from './knight';

const createCard = type => {
  let moves;
  switch(type) {
    case 'duke':
      moves = dukeMoves;
      break;
    case 'footman':
      moves = footmanMoves;
      break;
    case 'seer':
      moves = seerMoves;
      break;
    case 'priest':
      moves = priestMoves;
      break;
    case 'knight':
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
  deck.push(createCard('footman'));
  deck.push(createCard('footman'));
  deck.push(createCard('knight'));
  deck.push(createCard('seer'));
  deck.push(createCard('priest'));

  return deck;
}