import { TILE_LONGBOWMAN } from './cardConstants';

export const longbowmanMoves = {
  type: TILE_LONGBOWMAN,
  odd: {
    move: [
      { row: -1, col: 0 },
      { row: 1, col: 0 },
      { row: 0, col: -1 },
      { row: 0, col: 1 }
    ]
  }, 
  even: {
    move: [
      { row: 1, col: -1 },
      { row: 1, col: 1 }
    ],
    strike: [
      { row: -2, col: 0 },
      { row: -3, col: 0 }
    ]
  }
}