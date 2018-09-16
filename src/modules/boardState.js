import { 
  HIGHLIGHT_COMMAND,
  SELECTED_TILE_IN_BAG,
  SELECTED_TILE_ON_BOARD
} from '../constants';
import { 
  shuffleDeck,
  TILE_DUKE,
  TILE_FOOTMAN,
  HIGHLIGHTS_DUKES_FOOTMEN
 } from '../cards';
import { cloneObject } from '../shared';
import { 
  highlightsFromType,
  commandHighlightsFromType
} from '../cards/cardHighlights';
import {
  HINT_SELECT_OR_DRAW,
  HINT_PLACE_DUKE,
  HINT_PLACE_FIRST_FOOTMAN,
  HINT_PLACE_SECOND_FOOTMAN,
  HINT_MOVE_TILE
} from '../strings';
import {
  dukeIndex,
  moveTileHelper,
  placeTileFromBagOnBoard,
  spacesNew,
  debugHighlights,
  dukePlacement,
  randomTileFromBag
} from '../shared/boardUtilities';

export const BOARD_INIT = 'BOARD_INIT';
export const GAME_WAIT_START = 'GAME_WAIT_START';
export const GAME_CHOOSE_DUKE_POSITION = 'GAME_CHOOSE_DUKE_POSITION';
export const GAME_DUKE_PLACED = 'GAME_DUKE_PLACED';
export const GAME_CHOOSE_FOOTMAN1_POSITION = 'GAME_CHOOSE_FOOTMAN1_POSITION';
export const GAME_CHOOSE_FOOTMAN2_POSITION = 'GAME_CHOOSE_FOOTMAN2_POSITION';
export const GAME_OTHER_PLAYER_CHOOSE_DUKE_POSITION = 'GAME_OTHER_PLAYER_CHOOSE_DUKE_POSITION';
export const GAME_SELECT_OR_DRAW = 'GAME_SELECT_OR_DRAW';
export const GAME_TILE_SELECTED = 'GAME_TILE_SELECTED';
export const GAME_TILE_SELECTED_COMMAND_HIGHLIGHT = 'GAME_TILE_SELECTED_COMMAND_HIGHLIGHT';
export const GAME_TILE_MOVE = 'GAME_TILE_MOVED';
export const GAME_SELECT_TILE_IN_BAG = 'GAME_SELECT_TILE_IN_BAG';
export const GAME_SWAP_PLAYERS = 'GAME_SWAP_PLAYERS';
export const GAME_DEBUG_MODE = 'GAME_DEBUG_MODE';
export const GAME_UNDO_MOVE = 'GAME_UNDO_MOVE';

export const PLAYERS_INIT = 'PLAYERS_INIT';

const playerDft = {
  name: '',
  tilesInBag: [],
  tilesOnBoard: [],
  tilesCaptured: []
};

const initialState = {
  spaces: [],
  selectedTileStack: [],
  highlighted: [],
  gameState: '',
  currentPlayer: 0,
  players: [playerDft, playerDft],
  uiHint: '',
  gameDebugMode: false,
  isUndoable: false,
  previousStates: []
};

const cloneAndModifyPlayers = (players, iPlayer, fn) => {
  const playersCopy = cloneObject(players);

  fn(playersCopy);
  return playersCopy;
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
    case BOARD_INIT:
      return {
        ...state,
        spaces: spacesNew(),
        gameState: GAME_WAIT_START,
        players: [playerDft, playerDft],
        currentPlayer: 0
      }
    case PLAYERS_INIT:
      playersClone = state.players.map((player, i) => {
        const playerClone = cloneObject(player);
        playerClone.name = action.payload.names[i];
        playerClone.tilesInBag = shuffleDeck();
        return playerClone;
      })
      if (state.gameDebugMode) {
        return {
          ...state,
          players: playersClone,
          gameState: GAME_SELECT_OR_DRAW
        }
      }
      return {
        ...state,
        players: playersClone,
        gameState: GAME_CHOOSE_DUKE_POSITION,
        highlighted: dukePlacement(0),
        uiHint: HINT_PLACE_DUKE
      }
    case GAME_SWAP_PLAYERS:
      return {
        ...state,
        currentPlayer: state.currentPlayer ? 0 : 1,
        isUndoable: false
      };
    case GAME_DEBUG_MODE:
      return {
        ...state,
        gameDebugMode: action.payload
      };
    case GAME_CHOOSE_DUKE_POSITION:
      return {
        ...state,
        highlighted: dukePlacement(state.currentPlayer)
      }
    case GAME_DUKE_PLACED:
      playersClone = cloneAndModifyPlayers(
        state.players, 
        state.currentPlayer, 
        (players) => placeTileFromBagOnBoard(
          players[state.currentPlayer], 
          state.currentPlayer, 
          TILE_DUKE, action.payload.iSpace)
      );
      return {
        ...state,
        gameState: GAME_CHOOSE_FOOTMAN1_POSITION,
        highlighted: highlightsFromType(
          state.players,
          action.payload.iSpace, 
          HIGHLIGHTS_DUKES_FOOTMEN,
          false,
          state.currentPlayer
        ),
        uiHint: action.payload.uiHint,
        players: playersClone
      };
    case GAME_CHOOSE_FOOTMAN1_POSITION:
      playersClone = cloneAndModifyPlayers(
        state.players, 
        state.currentPlayer, 
        (players) => placeTileFromBagOnBoard(
          players[state.currentPlayer], 
          state.currentPlayer, 
          TILE_FOOTMAN, 
          action.payload.iSpace)
      );
      return {
        ...state,
        gameState: GAME_CHOOSE_FOOTMAN2_POSITION,
        highlighted: highlightsFromType(
          playersClone,
          dukeIndex(state.players[state.currentPlayer].tilesOnBoard),
          HIGHLIGHTS_DUKES_FOOTMEN,
          false,
          state.currentPlayer
        ),
        uiHint: action.payload.uiHint,
        players: playersClone 
      };
    case GAME_CHOOSE_FOOTMAN2_POSITION:
      playersClone = cloneAndModifyPlayers(
        state.players, 
        state.currentPlayer, 
        (players) => placeTileFromBagOnBoard(
          players[state.currentPlayer], 
          state.currentPlayer, 
          TILE_FOOTMAN, 
          action.payload.iSpace)
      );
      return {
        ...state,
        gameState: GAME_SELECT_OR_DRAW,
        highlighted: [], // no highlighted spaces
        uiHint: action.payload.uiHint,
        players: playersClone,
        previousStates: state.previousStates.concat([cloneObject(state.players)]),
        isUndoable: true
      };
    case GAME_OTHER_PLAYER_CHOOSE_DUKE_POSITION:
      return {
        ...state,
        currentPlayer: state.currentPlayer ? 0 : 1,
        highlighted: dukePlacement(1),
        gameState: GAME_CHOOSE_DUKE_POSITION
      };
    case GAME_SELECT_OR_DRAW:
      return {
        ...state,
        gameState: GAME_SELECT_OR_DRAW,
        highlighted: [],
        selectedTileStack: [],
        uiHint: HINT_SELECT_OR_DRAW
      };
    case GAME_TILE_SELECTED:
      return {
        ...state,
        highlighted: highlightsFromType(
          state.players,
          action.payload.iSpace,
          action.payload.tileType,
          action.payload.isOdd,
          state.currentPlayer,
          action.payload.tilePlayer
        ),
        gameState: GAME_TILE_SELECTED,
        selectedTileStack: state.selectedTileStack.concat({
          iSpace: action.payload.iSpace,
          tileType: action.payload.tileType,
          selectionType: SELECTED_TILE_ON_BOARD
        }),
        uiHint: action.payload.uiHint,
      };
    case GAME_TILE_SELECTED_COMMAND_HIGHLIGHT:
      return {
        ...state,
        highlighted: commandHighlightsFromType(
          state.players,
          state.selectedTileStack[0].iSpace,
          state.selectedTileStack[0].tileType,
          action.payload.isOdd,
          state.currentPlayer,
          state.selectedTileStack[0].iPlayer
        ),
        selectedTileStack: state.selectedTileStack.concat({
          iSpace: action.payload.iSpace,
          tileType: action.payload.tileType,
          selectionType: SELECTED_TILE_ON_BOARD
        }),
        uiHint: action.payload.uiHint
      };
    case GAME_TILE_MOVE:
      playersClone = cloneAndModifyPlayers(
        state.players,
        state.currentPlayer,
        (players) => {
          moveTileHelper(players, state, action.payload);
        }
      );
      return {
        ...state,
        highlighted: [],
        selectedTileStack: [],
        players: playersClone,
        gameState: GAME_SELECT_OR_DRAW,
        previousStates: state.previousStates.concat([cloneObject(state.players)]),
        isUndoable: true
      };
    case GAME_SELECT_TILE_IN_BAG:
      const highlighted = state.gameDebugMode ? 
        debugHighlights() :
        highlightsFromType(
          state.players,
          dukeIndex(state.players[state.currentPlayer].tilesOnBoard),
          HIGHLIGHTS_DUKES_FOOTMEN,
          false,
          state.currentPlayer
        );
        let tileType = action.payload ? action.payload : randomTileFromBag(state.players[state.currentPlayer]) ;
      return {
        ...state,
        gameState: GAME_TILE_MOVE,
        highlighted,
        selectedTileStack: [{
          iSpace: -1,
          highlightType: SELECTED_TILE_IN_BAG,
          tileType
        }]
      }
    case GAME_UNDO_MOVE:
      playersClone = cloneObject(state.previousStates[state.previousStates.length - 1]);
      return {
        ...state,
        players: playersClone,
        previousStates: state.previousStates.slice(0, state.previousStates.length - 1),
        isUndoable: false
      };
    default:
      return state
  }
}

// initialize the board and players
export const boardInit = () => {
  return {
    type: BOARD_INIT
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

export const swapPlayers = () => {
  return {
    type: GAME_SWAP_PLAYERS
  };
}

export const otherPlayerPlaceDuke = () => {
  return {
    type: GAME_OTHER_PLAYER_CHOOSE_DUKE_POSITION
  }
}

// state machine for clicking on tiles
export const spaceClicked = (iSpace, gameState, tileType, isOdd, tilePlayer, highlightType) => {
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
          isOdd,
          tilePlayer
        }
      }
    case GAME_TILE_SELECTED:
      return {
        type: highlightType === HIGHLIGHT_COMMAND ? GAME_TILE_SELECTED_COMMAND_HIGHLIGHT : GAME_TILE_MOVE,
        payload: {
          iSpace,
          highlightType,
          tilePlayer
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

export const undoMove = () => (
  {
    type: GAME_UNDO_MOVE
  }
)