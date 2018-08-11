import { 
  BOARD_ROW_COUNT, 
  BOARD_COL_COUNT
} from '../constants';
import { 
  shuffleDeck,
  TILE_DUKE,
  TILE_FOOTMAN,
  HIGHLIGHTS_DUKES_FOOTMEN
 } from '../cards';
import { cloneObject } from '../shared';
import { highlightsFromType } from '../cards/cardHighlights';
import {
  HINT_SELECT_OR_DRAW,
  HINT_PLACE_DUKE,
  HINT_PLACE_FIRST_FOOTMAN,
  HINT_PLACE_SECOND_FOOTMAN,
  HINT_MOVE_TILE
} from '../strings';

export const SPACES_INIT = 'SPACES_INIT';
export const GAME_CHOOSE_DUKE_POSITION = 'GAME_CHOOSE_DUKE_POSITION';
export const GAME_DUKE_PLACED = 'GAME_DUKE_PLACED';
export const GAME_CHOOSE_FOOTMAN1_POSITION = 'GAME_CHOOSE_FOOTMAN1_POSITION';
export const GAME_CHOOSE_FOOTMAN2_POSITION = 'GAME_CHOOSE_FOOTMAN2_POSITION';
export const GAME_SELECT_OR_DRAW = 'GAME_SELECT_OR_DRAW';
export const GAME_TILE_SELECTED = 'GAME_TILE_SELECTED';
export const GAME_TILE_MOVE = 'GAME_TILE_MOVED';
export const GAME_SELECT_TILE_IN_BAG = 'GAME_SELECT_TILE_IN_BAG';
export const GAME_DEBUG_MODE = 'GAME_DEBUG_MODE';

export const PLAYERS_INIT = 'PLAYERS_INIT';

const playerDft = {
  name: '',
  tilesInBag: [],
  tilesOnBoard: []
};

const SELECTED_TILE_IN_BAG = 'SELECTED_TILE_IN_BAG';
const SELECTED_TILE_ON_BOARD = 'SELECTED_TILE_ON_BOARD';
const selectedTileDft = {
  tileType: '',
  selectionType: undefined
}

const initialState = {
  spaces: [],
  selected: [],
  highlighted: [],
  gameState: '',
  selectedTile: selectedTileDft,
  currentPlayer: 0,
  players: [playerDft, playerDft],
  uiHint: '',
  gameDebugMode: false
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

// find the index of the space the Duke is on
const dukeIndex = (tilesOnBoard) => {
  const dukeTileInfo = tilesOnBoard.find(tileInfo =>(tileInfo.type === TILE_DUKE));
  return dukeTileInfo.iSpace;
}

export const setDebugMode = (mode) => {
  return {
    type: GAME_DEBUG_MODE,
    payload: mode
  };
}
export default (state = initialState, action) => {
  let playersClone;
  switch (action.type) {
    case SPACES_INIT:
      return {
        ...state,
        spaces: spacesNew(),
        highlighted: state.currentPlayer === 0 ? [32, 33]: [2,3],
        gameState: GAME_CHOOSE_DUKE_POSITION,
        uiHint: HINT_PLACE_DUKE
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
    case GAME_DEBUG_MODE:
      return {
        ...state,
        gameDebugMode: action.payload
      };
    case GAME_DUKE_PLACED:
      playersClone = cloneAndModifyPlayer(
        state.players, 
        state.currentPlayer, 
        (player) => player.tilesOnBoard.push({
          type: TILE_DUKE,
          iSpace: action.payload.iSpace,
          moves: 1
         })
      );
      return {
        ...state,
        gameState: GAME_CHOOSE_FOOTMAN1_POSITION,
        highlighted: highlightsFromType(
          action.payload.iSpace, 
          HIGHLIGHTS_DUKES_FOOTMEN,
          false,
          state.currentPlayer
        ),
        uiHint: action.payload.uiHint,
        players: playersClone
      };
    case GAME_CHOOSE_FOOTMAN1_POSITION:
      return {
        ...state,
        gameState: GAME_CHOOSE_FOOTMAN2_POSITION,
        highlighted: highlightsFromType(
          dukeIndex(state.players[state.currentPlayer].tilesOnBoard),
          HIGHLIGHTS_DUKES_FOOTMEN,
          false,
          state.currentPlayer
        ),
        uiHint: action.payload.uiHint,
        players: cloneAndModifyPlayer(
          state.players, 
          state.currentPlayer, 
          (player) => player.tilesOnBoard.push({
            type: TILE_FOOTMAN,
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
            type: TILE_FOOTMAN,
            iSpace: action.payload.iSpace,
            moves: 1
           })
        )
      };
    case GAME_SELECT_OR_DRAW:
      return {
        ...state,
        gameState: GAME_SELECT_OR_DRAW,
        highlighted: [],
        selected: [],
        uiHint: HINT_SELECT_OR_DRAW
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
        gameState: GAME_TILE_SELECTED,
        selected: [action.payload.iSpace],
        uiHint: action.payload.uiHint,
        selectedTile: {
          tileType: action.payload.tileType,
          selectionType: SELECTED_TILE_ON_BOARD
        }
      }
    case GAME_TILE_MOVE:
      return {
        ...state,
        highlighted: [],
        selected: [],
        players: cloneAndModifyPlayer(
          state.players,
          state.currentPlayer,
          (player) => {
            if (state.selectedTile.selectionType === SELECTED_TILE_ON_BOARD) {
              const tileSelected = player.tilesOnBoard.find(tileInfo => tileInfo.iSpace === state.selected[0]);
              if (tileSelected) {
                tileSelected.iSpace = action.payload.iSpace;
                tileSelected.moves += 1;
              }
            } else {
              const tileIndex = player.tilesInBag.findIndex(tileInfo => tileInfo.type === state.selectedTile.tileType);
              if (tileIndex !== -1) {
                const tiles = player.tilesInBag.splice(tileIndex, 1);
                tiles[0].iSpace = action.payload.iSpace;
                tiles[0].moves = 1;
                player.tilesOnBoard = player.tilesOnBoard.concat(tiles);
              }
            }
          }
        ),
        gameState: GAME_SELECT_OR_DRAW,
        selectedTile: selectedTileDft
      }
    case GAME_SELECT_TILE_IN_BAG:
      const highlighted = state.gameDebugMode ? 
        [ 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35] :
        highlightsFromType(
          dukeIndex(state.players[state.currentPlayer].tilesOnBoard),
          HIGHLIGHTS_DUKES_FOOTMEN,
          false,
          state.currentPlayer
        );
      return {
        ...state,
        gameState: GAME_TILE_MOVE,
        selectedTile: {
          selectionType: SELECTED_TILE_IN_BAG,
          tileType: action.payload
        },
        highlighted
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

export const cancelSelection = () => {
  return {
    type: GAME_SELECT_OR_DRAW
  };
}

// type is only passed in during debug mode
export const selectTileInBag = (type) => {
  return {
    type: GAME_SELECT_TILE_IN_BAG,
    payload: type
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
          uiHint: HINT_PLACE_FIRST_FOOTMAN
        }
      }
    case GAME_CHOOSE_FOOTMAN1_POSITION:
      return {
        type: GAME_CHOOSE_FOOTMAN1_POSITION,
        payload: {
          iSpace,
          uiHint: HINT_PLACE_SECOND_FOOTMAN
        }
      };
    case GAME_CHOOSE_FOOTMAN2_POSITION:
      return {
        type: GAME_CHOOSE_FOOTMAN2_POSITION,
        payload: {
          iSpace,
          uiHint: HINT_SELECT_OR_DRAW
        }
      }
    case GAME_SELECT_OR_DRAW: 
      return {
        type: GAME_TILE_SELECTED,
        payload: {
          iSpace,
          uiHint: HINT_MOVE_TILE,
          tileType,
          isOdd
        }
      }
    case GAME_TILE_SELECTED:
      return {
        type: GAME_TILE_MOVE,
        payload: {
          iSpace
        }
      };
    case GAME_TILE_MOVE:
      return {
        type: GAME_TILE_MOVE,
        payload: {
          iSpace
        }
      }
    default:
      window.alert(`Unhandled gameState passed to spaceClicked() is ${gameState}`);
      break;
  }
}
