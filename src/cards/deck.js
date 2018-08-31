import { 
  TILE_DUKE,
  TILE_FOOTMAN,
  TILE_KNIGHT,
  TILE_PRIEST,
  TILE_SEER,
  TILE_PIKEMAN,
  TILE_RANGER,
  TILE_LONGBOWMAN,
  TILE_GENERAL,
  TILE_MARSHALL
} from './cardConstants';

const createCard = type => {
  return {
    type,
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
  { type: TILE_RANGER, count: 1 },
  { type: TILE_LONGBOWMAN, count: 1},
  { type: TILE_GENERAL, count: 1},
  { type: TILE_MARSHALL, count: 1}
];

export const shuffleDeck = () => {
  const deck = [];

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