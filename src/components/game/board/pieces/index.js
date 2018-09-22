import React, { Component } from 'react';
import { connect } from 'react-redux';
import TileSvg from './tilesvg';
import { 
  BOARD_SPACE_DIVISOR, 
  HIGHLIGHT_STRIKE, 
  HIGHLIGHT_CAPTURE,
  HIGHLIGHT_CAPTURE_STRIKE
} from '../../../../constants';
import { 
  boardInit, 
  spaceClicked, 
  GAME_SELECT_OR_DRAW, 
  playersInit, 
  cancelSelection,
  otherPlayerPlaceDuke,
} from '../../../../modules/boardState';
import { tiledSpaces } from '../../../../modules/selectors/boardSpaces';
import { checkStates } from '../../../../modules/selectors/isDukeInCheck';
import { CaptureIcon, StrikeIcon } from '../../../../icons';

import './index.css';

class SpacesOnBoard extends Component {
  state = {
    boardWidth: 0
  }

  componentDidMount() {
    this.props.boardInit();
  }

  componentDidUpdate(prevProps) {
    const { 
      boardWidth, 
      boardState, 
      otherPlayerPlaceDuke,
      gameDebugMode,
      gameState
    } = this.props;
    if (prevProps.boardWidth !== boardWidth) {
      this.setState({ boardWidth });
    }
    // check if the other player has a Duke in his bag, if so, swap players
    if (prevProps.gameState !== gameState &&
    gameState === GAME_SELECT_OR_DRAW) {
      const otherPlayerIndex = boardState.currentPlayer ? 0 : 1;
      if (!gameDebugMode && 
        boardState.players[otherPlayerIndex].tilesInBag.find(tileInfo => tileInfo.type === 'duke')) {
        otherPlayerPlaceDuke();
      }
    }
  }

  // e: event
  // i: index of space
  // tileType: type of tile (may be undefined)
  // moves: number of moves made (may be undefined)
  // highlight: highlight type (may be undefined)
  // tilePlayer: index of player that owns the tile (0 or 1)
  onClick = (e, i, tileType, moves, highlight, tilePlayer) => {
    const { spaceClicked, boardState } = this.props;
    const isOdd = tileType && moves ? moves % 2 : false;
    spaceClicked(i, boardState.gameState, tileType, isOdd, tilePlayer, highlight ? highlight.type : null);
  }

  renderTile = (tile, highlightType) => {
    if (!tile.type && highlightType) {
      return this.renderHighlightIcon(highlightType)
    }
    return <TileSvg type={tile.type} player={tile.iPlayer} moves={tile.moves} highlight={highlightType} />
  }

  renderHighlightIcon = (highlightType) => {
    switch (highlightType) {
      case HIGHLIGHT_STRIKE:
        return <StrikeIcon />;
      case HIGHLIGHT_CAPTURE:
        return <CaptureIcon />;
      default: 
        return;
    }
  }

  renderSpace = (space, i) => {
    const { boardWidth, boardState, cancelSelection, selectedTileStack, gameState, checkStates } = this.props;
    const height = `${Math.floor(boardWidth / BOARD_SPACE_DIVISOR)}px`;
    const style = {
      height,
      width: height
    };
    const highlight = boardState.highlighted.find(item => item.iSpace === i);
    let highlightType = highlight ? highlight.type : null;
    const isSelected = selectedTileStack.findIndex(selectedTile => selectedTile.iSpace === i) !== -1;
    const isTileSelectable = space.type && gameState === GAME_SELECT_OR_DRAW;
    let isInCheck = false;
    const classes = ['space'];
    if (checkStates.length > 0) {
      const checkState = checkStates.find(checkState => (
        checkState.iSpaceDuke === i || checkState.iSpaceCapturingTile === i
      ));
      if (checkState) {
        if (checkState.iSpaceDuke === i) {
          isInCheck = true;
          classes.push('capture');
          classes.push('highlight');
        } else {
          classes.push('selected');
        }
      }
    } else if (highlightType) {
      classes.push('highlight');
      if (highlightType === HIGHLIGHT_CAPTURE) {
        classes.push('capture');
      } else if (highlightType === HIGHLIGHT_CAPTURE_STRIKE) {
        classes.push('capture');
        classes.push('strike');
      }
    }
    if (isSelected) {
      classes.push('selected');
    }
    return (
      <span 
        key={i} 
        id={'space' + i}
        className={classes.join(' ')}
        onClick={e => {
          if (isSelected) {
            cancelSelection();
            return;
          } 
          (highlight || isTileSelectable) && this.onClick(e, i, space.type, space.moves, highlight, space.iPlayer)
        }}
        style={style}>
        { this.renderTile(space, isInCheck ? HIGHLIGHT_CAPTURE : highlightType)}
      </span> 
    );
  }

  renderSpaces() {
    const { tiledSpaces } = this.props;
    if (!tiledSpaces) {
      return;
    }
    return tiledSpaces.map(this.renderSpace);
  }

  render() {
    return this.renderSpaces()
  }
}

const mapStateToProps = state => {
  const { boardState } = state;
  return {
    tiledSpaces: tiledSpaces(state),
    checkStates: checkStates(state),
    boardState,
    gameDebugMode: boardState.gameDebugMode,
    gameState: boardState.gameState,
    selectedTileStack: boardState.selectedTileStack
  };
};

export default connect(mapStateToProps, {
  boardInit,
  spaceClicked,
  playersInit,
  cancelSelection,
  otherPlayerPlaceDuke
})(SpacesOnBoard);