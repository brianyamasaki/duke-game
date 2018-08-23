import { TILE_KNIGHT, SLIDE_UP } from './cardConstants';

export const knightMoves = {
  type: TILE_KNIGHT,
  odd: {
    move: [
      { row: 0, col: -1 },
      { row: 0, col: 1 },
      { row: 1, col: 0 },
      { row: 2, col: 0, denyMoveSpaces: [{ row: 1, col: 0 }] }
    ],
    jump: [
      { row: -2, col: -1 },
      { row: -2, col: 1 }
    ]
  },
  even: {
    move: [
      { row: 1, col: -1 },
      { row: 1, col: 1 },
      { row: 2, col: -2, denyMoveSpaces: [{ row: 1, col: -1 }] },
      { row: 2, col: 2, denyMoveSpaces: [{ row: 1, col: 1 }] }
    ],
    slide: [
      SLIDE_UP
    ]
  }
}