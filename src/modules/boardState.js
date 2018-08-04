import { BOARD_ROW_COUNT, BOARD_COL_COUNT } from '../constants';
const ADD_PIECE_TO_BOARD = 'ADD_PIECE_TO_BOARD';
const spaceDft = {};
const initialState = {
  spaces: [
    spaceDft, spaceDft, spaceDft, spaceDft, spaceDft, spaceDft,
    spaceDft, spaceDft, spaceDft, spaceDft, spaceDft, spaceDft,
    spaceDft, spaceDft, spaceDft, spaceDft, spaceDft, spaceDft,
    spaceDft, spaceDft, spaceDft, spaceDft, spaceDft, spaceDft,
    spaceDft, spaceDft, spaceDft, spaceDft, spaceDft, spaceDft,
    spaceDft, spaceDft, spaceDft, spaceDft, spaceDft, spaceDft
  ]
};

export const rowColToIndex = (row, col) => (row * BOARD_COL_COUNT + col);

export const indexToRowCol = (index) => {
  const row = Math.floor(index / BOARD_COL_COUNT);
  return {
    row,
    col: index - (row * BOARD_COL_COUNT)
  };
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PIECE_TO_BOARD:
      const { payload } = action;
      const piece = {
        player: payload.player,
        tile: payload.piece,
        side: 0
      };
      const spacesCopy = state.spaces.slice(0);
      spacesCopy[rowColToIndex(payload.row, payload.col)] = piece;
      return {
        ...state,
        spaces: spacesCopy
      }

    default:
      return state
  }
}

export const addPiece = (player, piece, row, col) => {
  return {
    type: ADD_PIECE_TO_BOARD,
    payload: {
      player,
      piece,
      row,
      col
    }
  }
}