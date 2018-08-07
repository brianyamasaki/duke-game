import { SLIDE_DOWN, SLIDE_UP, SLIDE_LEFT, SLIDE_RIGHT } from './cardConstants';

export const dukeMoves = {
  type: 'duke',
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