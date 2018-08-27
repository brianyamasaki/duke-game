import { 
  TILE_DUKE,
  SLIDE_DOWN, 
  SLIDE_UP, 
  SLIDE_LEFT, 
  SLIDE_RIGHT 
} from './cardConstants';

export const dukeMoves = {
  type: TILE_DUKE,
  odd: {
    slide: [
      SLIDE_LEFT,
      SLIDE_RIGHT
    ]
  },
  even: {
    slide: [
      SLIDE_UP,
      SLIDE_DOWN
    ]
  }
};

export const dukeFootmen = {
  odd: {
    move: [
     { row: -1, col: 0 },
     { row: 0, col: -1 },
     { row: 0, col: 1 },
     { row: 1, col: 0 }
    ]
  },
  even: {
    move: [
      { row: -1, col: 0 },
      { row: 0, col: -1 },
      { row: 0, col: 1 },
      { row: 1, col: 0 }
    ] 
  }
};