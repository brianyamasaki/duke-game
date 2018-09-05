import { 
  BOARD_ROW_COUNT,
  BOARD_COL_COUNT,
  HIGHLIGHT_CAPTURE,
  HIGHLIGHT_CAPTURE_STRIKE,
  HIGHLIGHT_MOVE,
  SELECTED_TILE_ON_BOARD 
} from '../constants';
import {
  TILE_DUKE
} from '../cards/cardConstants';

export const rowColToIndex = (row, col) => (row * BOARD_COL_COUNT + col);

export const indexToRowCol = (index) => {
  const row = Math.floor(index / BOARD_COL_COUNT);
  return {
    row,
    col: index - (row * BOARD_COL_COUNT)
  };
}

// find the index of the space the Duke is on
export const dukeIndex = (tilesOnBoard) => {
  const dukeTileInfo = tilesOnBoard.find(tileInfo =>(tileInfo.type === TILE_DUKE));
  return dukeTileInfo.iSpace;
}

// Duke can only be place on two spots for either player
export const dukePlacement = iPlayer => {
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
export const debugHighlights = () => {
  const highlights = [];
  for (let i = 0; i < BOARD_COL_COUNT * BOARD_ROW_COUNT; i++) {
    highlights.push({
      type: HIGHLIGHT_MOVE,
      iSpace: i
    });
  }
  return highlights;
}

export const spacesNew = () => {
  const spaces = []; 
  for (let i = 0; i < BOARD_COL_COUNT * BOARD_ROW_COUNT; i++) {
    spaces.push({});
  }
  return spaces;
}

export const randomTileFromBag = (player) => {
  return player.tilesInBag[0].type;
}

// passed into cloneAndModifyPlayers to move a tile
export const moveTileHelper = (players, state, payload) => {
  const currentPlayer = state.currentPlayer;
  const selectedTileStack = state.selectedTileStack;
  const player = players[currentPlayer];
  const selectedTile = selectedTileStack[selectedTileStack.length - 1];
  if (selectedTile.selectionType === SELECTED_TILE_ON_BOARD) {
    // move tile currently on the board
    const tileSelected = player.tilesOnBoard.find(tileInfo => tileInfo.iSpace === selectedTile.iSpace);
    if (tileSelected) {
      if (payload.highlightType === HIGHLIGHT_CAPTURE) {
        // remove captured tile off of board
        const playerOther = players[currentPlayer ? 0 : 1];
        const tileToCaptureIndex = playerOther.tilesOnBoard.findIndex((tileInfo) => tileInfo.iSpace === payload.iSpace);
        if (tileToCaptureIndex !== -1) {
          playerOther.tilesCaptured.push(playerOther.tilesOnBoard[tileToCaptureIndex]);
          playerOther.tilesOnBoard.splice(tileToCaptureIndex, 1);
        }
      }
      if (payload.highlightType !== HIGHLIGHT_CAPTURE_STRIKE) {
        // actually move the selected tile
        tileSelected.iSpace = payload.iSpace;
      }
      tileSelected.moves += 1;
      tileSelected.iPlayer = currentPlayer;
    }
  } else {
    placeTileFromBagOnBoard(player, currentPlayer, selectedTile.tileType, payload.iSpace);
  }
}

// place tile from bag onto the board
export const placeTileFromBagOnBoard = (player, iPlayer, tileType, iSpace) => {
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

