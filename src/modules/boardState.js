import { BOARD_ROW_COUNT, BOARD_COL_COUNT } from '../constants';
import { POS_ABOVE, POS_LEFT, POS_RIGHT, POS_BELOW, shuffleDeck } from '../cards';
import { cloneObject } from '../shared';
import { highlightsFromType } from '../cards/cardHighlights';

export const SPACES_INIT = 'SPACES_INIT';
export const GAME_CHOOSE_DUKE_POSITION = 'GAME_CHOOSE_DUKE_POSITION';
export const GAME_DUKE_PLACED = 'GAME_DUKE_PLACED';
export const GAME_CHOOSE_FOOTMAN1_POSITION = 'GAME_CHOOSE_FOOTMAN1_POSITION';
export const GAME_CHOOSE_FOOTMAN2_POSITION = 'GAME_CHOOSE_FOOTMAN2_POSITION';
export const GAME_SELECT_OR_DRAW = 'GAME_SELECT_OR_DRAW';
export const GAME_TILE_SELECTED = 'GAME_TILE_SELECTED';

export const highlightsForDukesFootman = [POS_LEFT, POS_RIGHT, POS_ABOVE];

export const PLAYERS_INIT = 'PLAYERS_INIT';

const playerDft = {
  name: '',
  tilesInBag: [],
  tilesOnBoard: []
};

const initialState = {
  spaces: [],
  selected: [],
  highlighted: [],
  gameState: '',
  selectedTileType: '',
  currentPlayer: 0,
  players: [playerDft, playerDft],
  uiHint: 'Please click on a highlighted space to place your Duke',
};

export const rowColToIndex = (row, col) => (row * BOARD_COL_COUNT + col);

export const indexToRowCol = (index) => {
  const row = Math.floor(index / BOARD_COL_COUNT);
  return {
    row,
    col: index - (row * BOARD_COL_COUNT)
  };
}

const cloneAndModifyPlayer = (players, iPlayer, fn) => {
  return players.map((player, i) => {
    const playerCopy = cloneObject(player);
    if (i === iPlayer) {
      fn(playerCopy);  
    }
    return playerCopy;
  })
}

export const spacesNew = () => {
  const spaces = []; 
  for (let i = 0; i < BOARD_COL_COUNT * BOARD_ROW_COUNT; i++) {
    spaces.push({});
  }
  return spaces;
}

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
const dukeIndex = (tilesOnBoard) => {
  const dukeTileInfo = tilesOnBoard.find(tileInfo =>(tileInfo.type === 'duke'));
  return dukeTileInfo.iSpace;
}

export default (state = initialState, action) => {
  let playersClone;
  switch (action.type) {
    case SPACES_INIT:
      return {
        ...state,
        spaces: spacesNew(),
        highlighted: [32, 33],
        gameState: GAME_CHOOSE_DUKE_POSITION
      }
    case PLAYERS_INIT:
      return {
        ...state,
        players: state.players.map((player, i) => {
          const playerClone = cloneObject(player);
          playerClone.name = action.payload.names[i];
          playerClone.tilesInBag = shuffleDeck();
          return playerClone;
        })
      }
    case GAME_DUKE_PLACED:
      playersClone = cloneAndModifyPlayer(
        state.players, 
        state.currentPlayer, 
        (player) => player.tilesOnBoard.push({
          type: 'duke',
          iSpace: action.payload.iSpace,
          moves: 1
         })
      );
      return {
        ...state,
        gameState: GAME_CHOOSE_FOOTMAN1_POSITION,
        highlighted: highlightSpaces(action.payload.iSpace, highlightsForDukesFootman),
        uiHint: action.payload.uiHint,
        players: playersClone
      };
    case GAME_CHOOSE_FOOTMAN1_POSITION:
      return {
        ...state,
        gameState: GAME_CHOOSE_FOOTMAN2_POSITION,
        highlighted: highlightSpaces(
            dukeIndex(state.players[state.currentPlayer].tilesOnBoard), 
            highlightsForDukesFootman, [action.payload.iSpace]
          ),
        uiHint: action.payload.uiHint,
        players: cloneAndModifyPlayer(
          state.players, 
          state.currentPlayer, 
          (player) => player.tilesOnBoard.push({
            type: 'footman',
            iSpace: action.payload.iSpace,
            moves: 1
           })
        )
      };
    case GAME_CHOOSE_FOOTMAN2_POSITION:
      return {
        ...state,
        gameState: GAME_SELECT_OR_DRAW,
        highlighted: [], // no highlighted spaces
        uiHint: action.payload.uiHint,
        players: cloneAndModifyPlayer(
          state.players, 
          state.currentPlayer, 
          (player) => player.tilesOnBoard.push({
            type: 'footman',
            iSpace: action.payload.iSpace,
            moves: 1
           })
        )
      };
    case GAME_TILE_SELECTED:
      return {
        ...state,
        highlighted: highlightsFromType(
          action.payload.iSpace,
          action.payload.tileType,
          action.payload.isOdd,
          state.currentPlayer
        ),
        selectedTileType: action.payload.tileType,
        selected: [action.payload.iSpace],
        uiHint: action.payload.uiHint,
        selectedTileType: action.payload.tileType
      }
    default:
      return state
  }
}

// initialize the spaces array
export const spacesInit = () => {
  return {
    type: SPACES_INIT
  };
}

export const playersInit = (name1 = 'Player One', name2 = 'Player Two') => {
  return {
    type: PLAYERS_INIT,
    payload: {
      names: [name1, name2]
    }
  }
}

// state machine for clicking on tiles
export const spaceClicked = (iSpace, gameState, tileType, isOdd) => {
  switch (gameState) {
    case GAME_CHOOSE_DUKE_POSITION:
      return {
        type: GAME_DUKE_PLACED,
        payload: {
          iSpace,
          uiHint: 'Please click on a highlighted space to place your first Footman'
        }
      }
    case GAME_CHOOSE_FOOTMAN1_POSITION:
      return {
        type: GAME_CHOOSE_FOOTMAN1_POSITION,
        payload: {
          iSpace,
          uiHint: 'Please click on a highlighted space to place your second Footman'
        }
      };
    case GAME_CHOOSE_FOOTMAN2_POSITION:
      return {
        type: GAME_CHOOSE_FOOTMAN2_POSITION,
        payload: {
          iSpace,
          uiHint: 'Select a tile to move OR draw a new tile'
        }
      }
    case GAME_SELECT_OR_DRAW: 
      return {
        type: GAME_TILE_SELECTED,
        payload: {
          iSpace,
          uiHint: 'Click on a highlighted space to move this tile',
          tileType,
          isOdd
        }
      }
    default:
      console.error(`gameState passed to spaceClicked() is ${gameState}`);
      break;
  }
}
