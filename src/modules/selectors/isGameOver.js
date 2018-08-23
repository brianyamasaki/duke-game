import { createSelector } from 'reselect';
import { PLAYER_ONE_WINS, PLAYER_ZERO_WINS } from '../../constants';

const players = (state) => state.boardState.players;
const currentPlayer = (state) => state.boardState.currentPlayer;

export const isDukeCaptured = createSelector(
  players,
  currentPlayer,
  (players, currentPlayer) => {
    hasDuke = [];
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