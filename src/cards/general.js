import { 
  TILE_GENERAL
} from './cardConstants';

export const generalMoves = {
  type: TILE_GENERAL,
  odd: {
    move: [
      { row: -1, col: 0 },
      { row: 1, col: 0 },
      { row: 0, col: -2 },
      { row: 0, col: 2 }
    ],
    jump: [
      { row: -2, col: -1 },
      { row: -2, col: 1 }
    ]
  },
  even: {
    move: [
      { row: -1, col: 0 },
      { row: 0, col: -2, denyMoveSpaces: [{ row: 0, col: -1 }]},
      { row: 0, col: -1 },
      { row: 0, col: 1 },
      { row: 0, col: 2, denyMoveSpaces: [{ row: 0, col: 1 }]}
    ],
    jump: [
      { row: -2, col: -1 },
      { row: -2, col: 1 }
    ],
    command: [
      { row: 0, col: -1 },
      { row: 0, col: 1 },
      { row: 1, col: -1 },
      { row: 1, col: 0 },
      { row: 1, col: 1 }
    ]
  }
}