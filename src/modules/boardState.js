import { 
  BOARD_ROW_COUNT, 
  BOARD_COL_COUNT,
  HIGHLIGHT_MOVE,
  HIGHLIGHT_CAPTURE,
  HIGHLIGHT_CAPTURE_STRIKE
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
export const GAME_OTHER_PLAYER_CHOOSE_DUKE_POSITION = 'GAME_OTHER_PLAYER_CHOOSE_DUKE_POSITION';
export const GAME_SELECT_OR_DRAW = 'GAME_SELECT_OR_DRAW';
export const GAME_TILE_SELECTED = 'GAME_TILE_SELECTED';
export const GAME_TILE_MOVE = 'GAME_TILE_MOVED';
export const GAME_SELECT_TILE_IN_BAG = 'GAME_SELECT_TILE_IN_BAG';
export const GAME_SWAP_PLAYERS = 'GAME_SWAP_PLAYERS';
export const GAME_DEBUG_MODE = 'GAME_DEBUG_MODE';

export const PLAYERS_INIT = 'PLAYERS_INIT';

const playerDft = {
  name: '',
  tilesInBag: [],
  tilesOnBoard: [],
  tilesCaptured: []
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

const cloneAndModifyPlayers = (players, iPlayer, fn) => {
  const playersCopy = cloneObject(players);

  fn(playersCopy);
  return playersCopy;
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

const dukePlacement = iPlayer => {
  if (iPlayer === 0) {
    return [
      {
        iSpace: 32,
        type: HIGHLIGHT_MOVE
      },
      {
        iSpace: 33,
        type: HIGHLIGHT_MOVE
      }
    ];
  }
  return [
    {
      iSpace: 2,
      type: HIGHLIGHT_MOVE
    },
    {
      iSpace: 3,
      type: HIGHLIGHT_MOVE
    }
  ];
}

const debugHighlights = () => {
  const highlights = [];
  for (let i = 0; i < BOARD_COL_COUNT * BOARD_ROW_COUNT; i++) {
    highlights.push({
      type: HIGHLIGHT_MOVE,
      iSpace: i
    });
  }
  return highlights;
}

export const setDebugMode = (mode) => {
  return {
    type: GAME_DEBUG_MODE,
    payload: mode
  };
}

// place tile from bag onto the board
const placeTileFromBagOnBoard = (player, iPlayer, tileType, iSpace) => {
  if (tileType) {
    const tileIndex = player.tilesInBag.findIndex(tileInfo => tileInfo.type === tileType);
    if (tileIndex !== -1) {
      const tiles = player.tilesInBag.splice(tileIndex, 1);
      tiles[0].iSpace = iSpace;
      tiles[0].moves = 1;
      tiles[0].iPlayer = iPlayer;
      player.tilesOnBoard = player.tilesOnBoard.concat(tiles);
    }
  } 
}

export default (state = initialState, action) => {
  let playersClone;
  switch (action.type) {
    case SPACES_INIT:
      return {
        ...state,
        spaces: spacesNew(),
        highlighted: dukePlacement(state.currentPlayer),
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
    case GAME_SWAP_PLAYERS:
      return {
        ...state,
        currentPlayer: state.currentPlayer ? 0 : 1
      };
    case GAME_DEBUG_MODE:
      return {
        ...state,
        gameDebugMode: action.payload
      };
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
      return {
        ...state,
        gameState: GAME_CHOOSE_FOOTMAN2_POSITION,
        highlighted: highlightsFromType(
          state.players,
          dukeIndex(state.players[state.currentPlayer].tilesOnBoard),
          HIGHLIGHTS_DUKES_FOOTMEN,
          false,
          state.currentPlayer
        ),
        uiHint: action.payload.uiHint,
        players: cloneAndModifyPlayers(
          state.players, 
          state.currentPlayer, 
          (players) => placeTileFromBagOnBoard(
            players[state.currentPlayer], 
            state.currentPlayer, 
            TILE_FOOTMAN, 
            action.payload.iSpace)
        )
      };
    case GAME_CHOOSE_FOOTMAN2_POSITION:
      return {
        ...state,
        gameState: GAME_SELECT_OR_DRAW,
        highlighted: [], // no highlighted spaces
        uiHint: action.payload.uiHint,
        players: cloneAndModifyPlayers(
          state.players, 
          state.currentPlayer, 
          (players) => placeTileFromBagOnBoard(
            players[state.currentPlayer], 
            state.currentPlayer, 
            TILE_FOOTMAN, 
            action.payload.iSpace)
        )
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
        selected: [],
        selectedTile: selectedTileDft,
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
        players: cloneAndModifyPlayers(
          state.players,
          state.currentPlayer,
          (players) => {
            const player = players[state.currentPlayer];
            if (state.selectedTile.selectionType === SELECTED_TILE_ON_BOARD) {
              // move tile currently on the board
              const tileSelected = player.tilesOnBoard.find(tileInfo => tileInfo.iSpace === state.selected[0]);
              if (tileSelected) {
                if (action.payload.highlightType === HIGHLIGHT_CAPTURE) {
                  // remove captured tile off of board
                  const playerOther = players[state.currentPlayer ? 0 : 1];
                  const tileToCaptureIndex = playerOther.tilesOnBoard.findIndex((tileInfo) => tileInfo.iSpace === action.payload.iSpace);
                  if (tileToCaptureIndex !== -1) {
                    playerOther.tilesCaptured.push(playerOther.tilesOnBoard[tileToCaptureIndex]);
                    playerOther.tilesOnBoard.splice(tileToCaptureIndex, 1);
                  }
                }
                if (action.payload.highlightType !== HIGHLIGHT_CAPTURE_STRIKE) {
                  // actually move the selected tile
                  tileSelected.iSpace = action.payload.iSpace;
                }
                tileSelected.moves += 1;
                tileSelected.iPlayer = state.currentPlayer;
              }
            } else {
              placeTileFromBagOnBoard(player, state.currentPlayer, state.selectedTile.tileType, action.payload.iSpace);
            }
          }
        ),
        gameState: GAME_SELECT_OR_DRAW,
        selectedTile: selectedTileDft
      }
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
        selectedTile: {
          selectionType: SELECTED_TILE_IN_BAG,
          tileType
        },
        highlighted
      }
    default:
      return state
  }
}

const randomTileFromBag = (player) => {
  return player.tilesInBag[0].type;
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
export const spaceClicked = (iSpace, gameState, tileType, isOdd, highlightType) => {
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
          iSpace,
          highlightType
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
