import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tile from './tile';
import { BOARD_SPACE_DIVISOR } from '../../../../constants';
import { spacesInit, spaceClicked, GAME_SELECT_OR_DRAW, playersInit } from '../../../../modules/boardState';
import { tiledSpaces } from '../../../../modules/selectors/boardSpaces';

import './index.css';

class SpacesOnBoard extends Component {
  state = {
    boardWidth: 0
  }

  componentDidMount() {
    this.props.spacesInit();
    this.props.playersInit();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.boardWidth !== this.props.boardWidth) {
      this.setState({ boardWidth: this.props.boardWidth });
    }
  }

  onClick = (e, i) => {
    const { spaceClicked, boardState } = this.props;
    spaceClicked(i, boardState.gameState);
  }

  renderTile = (tile) => {
    if (!tile.type) return;
    return <Tile type={tile.type} player={tile.iPlayer} />
  }

  renderSpace = (space, i) => {
    const { boardWidth, boardState } = this.props;
    const height = `${Math.floor(boardWidth / BOARD_SPACE_DIVISOR)}px`;
    const style = {
      height,
      width: height
    };
    const isHighlighted = boardState.highlighted.indexOf(i) !== -1;
    const isSelected = boardState.selected.indexOf(i) !== -1;
    const isTileSelectable = space.type && boardState.gameState === GAME_SELECT_OR_DRAW;
    const classes = ['space'];
    if (isHighlighted) {
      classes.push('highlight');
    }
    if (isSelected) {
      classes.push('selected');
    }
    return (
      <span 
        key={i} 
        className={classes.join(' ')}
        onClick={e => { (isHighlighted || isTileSelectable) && this.onClick(e, i)}}
        style={style}>
        { this.renderTile(space)}
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
    boardState
  };
};

export default connect(mapStateToProps, {
  spacesInit,
  spaceClicked,
  playersInit
})(SpacesOnBoard);