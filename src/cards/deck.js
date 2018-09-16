import {
  deckContains
} from './cardHelpers';

const createCard = type => {
  return {
    type,
    moveIndex: 1
  }
}

export const shuffleDeck = () => {
  const deck = [];
  const deckContents = deckContains();

  deckContents.forEach(countType => {
    for (let i = 0; i < countType.count; i++ ) {
      deck.push(createCard(countType.type));
    }
  });

  // shuffle the tiles
  const deckCount = deck.length
  for (let i = 0; i < deckCount; i++) {
    const iSwap = Math.floor(Math.random() * deckCount);
    const temp = deck[i];
    deck[i] = deck[iSwap];
    deck[iSwap] = temp;
  }

  return deck;
}