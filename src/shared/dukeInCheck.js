import { dukeIndex } from './boardUtilities';
import { highlightsFromType } from '../cards/cardHighlights';
import { isCaptureHighlight } from '../constants';

// determine if either Duke is in check
export const isDukeInCheck = (players) => {
  let playersInCheck = [];
  players.forEach((player, iPlayer) => {
    const iPlayerOther = iPlayer ? 0 : 1;
    const playerOther = players[iPlayerOther];
    const iSpacePlayerOtherDuke = dukeIndex(playerOther.tilesOnBoard);
    if (typeof iSpacePlayerOtherDuke === 'number') {
      player.tilesOnBoard.forEach((tileInfo) => {
        const highlights = highlightsFromType(
          players,
          tileInfo.iSpace,
          tileInfo.type,
          tileInfo.moves % 2,
          iPlayer,
          iPlayer
        );
        playersInCheck = playersInCheck.concat(
          highlights.filter(highlight => isCaptureHighlight(highlight) && highlight.iSpace === iSpacePlayerOtherDuke)
          .map(highlight => ({
            iSpaceDuke: highlight.iSpace,
            iSpaceCapturingTile: tileInfo.iSpace,
            highlights
          })
          )
        );
      });
    }
  });
  return playersInCheck;
};
