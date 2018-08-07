import { createSelector } from 'reselect';
import { spacesNew } from '../boardState';

const spaces = (state) => state.boardState.spaces;
const players = (state) => state.boardState.players;

export const tiledSpaces = createSelector(
  spaces,
  players,
  (spaces, players) => {
    const spacesNext = spacesNew();
    players.forEach((player, iPlayer) => {
      player.tilesOnBoard.forEach(tileInfo => {
        spacesNext[tileInfo.iSpace] = {
          type: tileInfo.type,
          iSpace: tileInfo.iSpace,
          iPlayer
        } 
      })
    })
    return spacesNext;
  }
)