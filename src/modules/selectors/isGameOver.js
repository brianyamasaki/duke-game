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
    const dukeCaptured = [];
    players.forEach((player, iPlayer) => {
      const tileInfo = player.tilesCaptured.find(tileInfo => (
        tileInfo.type === 'duke'
      ));
      dukeCaptured[iPlayer] = tileInfo ? true : false;
    })
    if (dukeCaptured[0]) {
      return PLAYER_ONE_WINS;
    } else if (dukeCaptured[1]) {
      return PLAYER_ZERO_WINS;
    }
    return;
  }
)