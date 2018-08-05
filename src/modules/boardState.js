import { BOARD_ROW_COUNT, BOARD_COL_COUNT } from '../constants';

export const GAME_INIT = 'GAME_INIT';
export const GAME_CHOOSE_DUKE_POSITION = 'GAME_CHOOSE_DUKE_POSITION';
export const GAME_DUKE_PLACED = 'GAME_DUKE_PLACED';
export const GAME_CHOOSE_FOOTMAN1_POSITION = 'GAME_CHOOSE_FOOTMAN1_POSITION';
export const GAME_CHOOSE_FOOTMAN2_POSITION = 'GAME_CHOOSE_FOOTMAN2_POSITION';
export const GAME_SELECT_OR_DRAW = 'GAME_SELECT_OR_DRAW';

const initialState = {
  spaces: [],
  selected: [],
  highlighted: [32, 33],
  pieceToAdd: 'duke',
  gameState: GAME_CHOOSE_DUKE_POSITION,
  uiHint: 'Please click on a highlighted space to place your Duke'
};

export const rowColToIndex = (row, col) => (row * BOARD_COL_COUNT + col);

export const indexToRowCol = (index) => {
  const row = Math.floor(index / BOARD_COL_COUNT);
  return {
    row,
    col: index - (row * BOARD_COL_COUNT)
  };
}

const POS_ABOVE = 'POS_ABOVE';
const POS_LEFT = 'POS_LEFT';
const POS_RIGHT = 'POS_RIGHT';
const POS_BELOW = 'POS_BELOW';

const pushHighlight = (highlights, skipIndexes, iHighlight) => {
  if (skipIndexes.indexOf(iHighlight) === -1) {
    highlights.push(iHighlight);
  }
}

const highlightSpaces = (iSpace, positions, skipIndexes = [], player) => {
  const highlights = [];
  let iHighlight;
  if (positions.indexOf(POS_ABOVE) !== -1) {
    iHighlight = player ? iSpace + BOARD_COL_COUNT : iSpace - BOARD_COL_COUNT;
    pushHighlight(highlights, skipIndexes, iHighlight);
  }
  if (positions.indexOf(POS_LEFT) !== -1) {
    iHighlight = player ? iSpace + 1 : iSpace - 1;
    pushHighlight(highlights, skipIndexes, iHighlight);
  }
  if (positions.indexOf(POS_RIGHT) !== -1) {
    iHighlight = player ? iSpace - 1 : iSpace + 1;
    pushHighlight(highlights, skipIndexes, iHighlight);
  }
  if (positions.indexOf(POS_BELOW) !== -1) {
    iHighlight = player ? iSpace - BOARD_COL_COUNT : iSpace + BOARD_COL_COUNT;
    pushHighlight(highlights, skipIndexes, iHighlight);
  }
  return highlights;
}

// find the index of the space the Duke is on
const dukeIndex = (spaces) => {
  return spaces.findIndex(space =>(space.tile === 'duke'))
}

export default (state = initialState, action) => {
  let spacesCopy;
  switch (action.type) {
    case GAME_INIT:
      spacesCopy = []; 
      for (let i = 0; i < BOARD_COL_COUNT * BOARD_ROW_COUNT; i++) {
        spacesCopy.push({});
      }
      return {
        ...state,
        spaces: spacesCopy
      }
    case GAME_DUKE_PLACED:
      spacesCopy = state.spaces.slice(0);
      spacesCopy[action.payload.iSpace].tile = 'duke';
      return {
        ...state,
        gameState: GAME_CHOOSE_FOOTMAN1_POSITION,
        highlighted: highlightSpaces(dukeIndex(state.spaces), [POS_LEFT, POS_RIGHT, POS_ABOVE]),
        spaces: spacesCopy,
        uiHint: action.payload.uiHint
      };
    case GAME_CHOOSE_FOOTMAN1_POSITION:
      spacesCopy = state.spaces.slice(0);
      spacesCopy[action.payload.iSpace].tile = 'footman';
      return {
        ...state,
        gameState: GAME_CHOOSE_FOOTMAN2_POSITION,
        highlighted: highlightSpaces(dukeIndex(state.spaces), [POS_LEFT, POS_RIGHT, POS_ABOVE], [action.payload.iSpace]),
        spaces: spacesCopy,
        uiHint: action.payload.uiHint
      };
    case GAME_CHOOSE_FOOTMAN2_POSITION:
      spacesCopy = state.spaces.slice(0);
      spacesCopy[action.payload.iSpace].tile = 'footman';
      return {
        ...state,
        gameState: GAME_SELECT_OR_DRAW,
        highlighted: [], // no highlighted spaces
        spaces: spacesCopy,
        uiHint: action.payload.uiHint
      };
    default:
      return state
  }
}

// initialize the spaces array
export const spacesInit = () => {
  return {
    type: GAME_INIT
  };
}

// state machine for clicking on tiles
export const spaceClicked = (i, gameState) => {
  switch (gameState) {
    case GAME_CHOOSE_DUKE_POSITION:
      return {
        type: GAME_DUKE_PLACED,
        payload: {
          iSpace: i,
          uiHint: 'Please click on a highlighted space to place your first Footman'
        }
      }
    case GAME_CHOOSE_FOOTMAN1_POSITION:
      return {
        type: GAME_CHOOSE_FOOTMAN1_POSITION,
        payload: {
          iSpace: i,
          uiHint: 'Please click on a highlighted space to place your second Footman'
        }
      };
    case GAME_CHOOSE_FOOTMAN2_POSITION:
      return {
        type: GAME_CHOOSE_FOOTMAN2_POSITION,
        payload: {
          iSpace: i,
          uiHint: 'Select a tile to move OR draw a new tile'
        }
      }
    default:
      console.error(`gameState passed to spaceClicked() is ${gameState}`);
      break;
  }
}
