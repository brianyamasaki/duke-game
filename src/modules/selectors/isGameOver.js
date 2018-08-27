import { createSelector } from 'reselect';
import { PLAYER_ONE_WINS, PLAYER_ZERO_WINS } from '../../constants';
import { GAME_SELECT_OR_DRAW } from '../../modules/boardState';

const players = (state) => state.boardState.players;
const gameState = (state) => state.boardState.gameState;

export const isDukeCaptured = createSelector(
  players,
  gameState,
  (players, gameState) => {
    if (gameState !== GAME_SELECT_OR_DRAW) {
      return;
    }
    const hasDuke = [];
    players.forEach((player, iPlayer) => {
      const tileInfo = player.tilesOnBoard.find(tileInfo => (
        tileInfo.type === 'duke'
      ));
      hasDuke[iPlayer] = tileInfo ? true : false;
    })
    if (hasDuke[0] && hasDuke[1]) {
      return;
    } else if (!hasDuke[0]) {
      return PLAYER_ONE_WINS;
    }
    return PLAYER_ZERO_WINS;
  }
)