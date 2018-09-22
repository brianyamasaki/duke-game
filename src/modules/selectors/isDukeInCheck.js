import { createSelector } from 'reselect';
import { isDukeInCheck } from '../../shared/dukeInCheck';

const players = (state) => state.boardState.players;

export const checkStates = createSelector(
  players,
  (players) => {
    return isDukeInCheck(players);
  }
);