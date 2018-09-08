import { TILE_DRAGOON, SLIDE_DIAG_DOWN_LEFT, SLIDE_DIAG_DOWN_RIGHT } from './cardConstants';

export const dragoonMoves = {
  type: TILE_DRAGOON,
  name: 'Dragoon',
  countInBag: 1,
  odd: {
    move: [
      { row: 0, col: -1 },
      { row: 0, col: 1 }
    ],
    strike: [
        { row: -2, col: 0 },
        { row: -2, col: 2 },
        { row: -2, col: -2}
    ]
  }, 
  even: {
    move: [
      { row: -2, col: 0, denyMoveSpaces: [{ row: -1, col: 0 }] },
      { row: -1, col: 0 }
    ],
    jump: [
      { row: -2, col: 1 },
      { row: -2, col: -1 }
    ],
    slide: [
      SLIDE_DIAG_DOWN_LEFT, SLIDE_DIAG_DOWN_RIGHT
    ]
  }
}