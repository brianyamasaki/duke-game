import { TILE_PIKEMAN } from './cardConstants';

export const pikemanMoves = {
  type: TILE_PIKEMAN,
  odd: {
    move: [
      { row: -2, col: -2 },
      { row: -1, col: -1 },
      { row: -2, col: 2 },
      { row: -1, col: 1 }
    ]
  },
  even: {
    move: [
      { row: -1, col: 0 },
      { row: 1, col: 0 },
      { row: 2, col: 0 }
    ],
    strike: [
      { row: -2, col: -1 },
      { row: -2, col: 1 }
    ]
  }
};