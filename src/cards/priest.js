import { 
  TILE_PRIEST,
  SLIDE_DIAG_DOWN_LEFT, 
  SLIDE_DIAG_DOWN_RIGHT, 
  SLIDE_DIAG_UP_LEFT, 
  SLIDE_DIAG_UP_RIGHT
} from './cardConstants';

export const priestMoves = {
  type: TILE_PRIEST,
  odd: {
    slide: [
      SLIDE_DIAG_UP_LEFT, 
      SLIDE_DIAG_UP_RIGHT, 
      SLIDE_DIAG_DOWN_LEFT, 
      SLIDE_DIAG_DOWN_RIGHT
    ]
  },
  even: {
    move: [
      { row: -1, col: -1 },
      { row: -1, col: 1 },
      { row: 1, col: -1 },
      { row: 1, col: 1 }
    ],
    jump: [
      { row: -2, col: -2 },
      { row: -2, col: 2 },
      { row: 2, col: -2 },
      { row: 2, col: 2}
    ]
  }
}