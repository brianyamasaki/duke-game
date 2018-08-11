import { BOARD_COL_COUNT } from '../constants';

export const rowColToIndex = (row, col) => (row * BOARD_COL_COUNT + col);

export const indexToRowCol = (index) => {
  const row = Math.floor(index / BOARD_COL_COUNT);
  return {
    row,
    col: index - (row * BOARD_COL_COUNT)
  };
}