import { 
  TILE_MARSHALL, 
  SLIDE_LEFT,
  SLIDE_RIGHT 
} from './cardConstants';

export const marshallMoves = {
  type: TILE_MARSHALL,
  name: 'Marshall',
  countInBag: 1,
  odd: {
    jump: [
      { row: -2, col: -2 },
      { row: -2, col: 2 },
      { row: 2, col: 0 }
    ],
    slide: [
      SLIDE_LEFT,
      SLIDE_RIGHT
    ]
  },
  even: {
    move: [
      { row: -1, col: -1 },
      { row: -1, col: 0 },
      { row: -1, col: 1 },
      { row: 0, col: -2, denyMoveSpaces: [{ row: 0, col: -1 }]},
      { row: 0, col: -1 },
      { row: 0, col: 1 },
      { row: 0, col: 2, denyMoveSpaces: [{ row: 0, col: 1 }]},
      { row: 1, col: -1 },
      { row: 1, col: 1 }
    ],
    command: [
      { row: -1, col: -1 },
      { row: -1, col: 0 },
      { row: -1, col: 1 }
    ]
  }
}