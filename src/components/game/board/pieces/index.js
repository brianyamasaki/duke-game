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
import StrikeIcon from '../../../../icons/strike-icon';
import CaptureIcon from '../../../../icons/capture-icon';

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
      gameDebugMode
    } = this.props;
    if (prevProps.boardWidth !== boardWidth) {
      this.setState({ boardWidth });
    }
    // check if the other player has a Duke in his bag, if so, swap players
    if (prevProps.boardState.gameState !== boardState &&
    boardState.gameState === GAME_SELECT_OR_DRAW) {
      const otherPlayerIndex = boardState.currentPlayer ? 0 : 1;
      if (!gameDebugMode && 
        boardState.players[otherPlayerIndex].tilesInBag.find(tileInfo => tileInfo.type === 'duke')) {
        otherPlayerPlaceDuke();
      }
    }
  }

  onClick = (e, i, tileType, moves, highlight) => {
    const { spaceClicked, boardState } = this.props;
    const isOdd = tileType && moves ? moves % 2 : false;
    spaceClicked(i, boardState.gameState, tileType, isOdd, highlight ? highlight.type : null);
  }

  renderTile = (tile, highlight) => {
    if (!tile.type && highlight) {
      return this.renderHighlightIcon(highlight)
    }
    return <TileSvg type={tile.type} player={tile.iPlayer} moves={tile.moves} highlight={highlight} />
  }

  renderHighlightIcon = (highlight) => {
    if (!highlight)
      return;
    switch (highlight.type) {
      case HIGHLIGHT_STRIKE:
        return <StrikeIcon />;
      case HIGHLIGHT_CAPTURE:
        return <CaptureIcon />;
      default: 
        return;
    }
  }

  renderSpace = (space, i) => {
    const { boardWidth, boardState, cancelSelection } = this.props;
    const height = `${Math.floor(boardWidth / BOARD_SPACE_DIVISOR)}px`;
    const style = {
      height,
      width: height
    };
    const highlight = boardState.highlighted.find(item => item.iSpace === i);
    const isSelected = boardState.selected.indexOf(i) !== -1;
    const isTileSelectable = space.type && boardState.gameState === GAME_SELECT_OR_DRAW;
    const classes = ['space'];
    if (highlight) {
      classes.push('highlight');
      if (highlight.type === HIGHLIGHT_CAPTURE) {
        classes.push('capture');
      } else if (highlight.type === HIGHLIGHT_CAPTURE_STRIKE) {
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
          (highlight || isTileSelectable) && this.onClick(e, i, space.type, space.moves, highlight)
        }}
        style={style}>
        { this.renderTile(space, highlight)}
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
    boardState,
    gameDebugMode: boardState.gameDebugMode
  };
};

export default connect(mapStateToProps, {
  boardInit,
  spaceClicked,
  playersInit,
  cancelSelection,
  otherPlayerPlaceDuke
})(SpacesOnBoard);