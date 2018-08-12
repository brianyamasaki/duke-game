import { 
  TILE_RANGER,
  SLIDE_DOWN,
  SLIDE_UP,
  SLIDE_DIAG_UP_LEFT,
  SLIDE_DIAG_UP_RIGHT
} from './cardConstants';

export const rangerMoves = {
  type: TILE_RANGER,
  odd: {
    jump: [
      { row: -2, col: -1 },
      { row: -2, col: 1 },
      { row: -1, col: -2 },
      { row: -1, col: 2 }
    ],
    slide: [
      SLIDE_UP,
      SLIDE_DOWN
    ]
  },
  even: {
    jump: [
      { row: 2, col: -1 },
      { row: 2, col: 1 }
    ],
    slide: [
      SLIDE_DIAG_UP_LEFT,
      SLIDE_DIAG_UP_RIGHT
    ]
  }
}