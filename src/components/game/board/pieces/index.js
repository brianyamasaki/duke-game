import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tile from './tile';
import { BOARD_SPACE_DIVISOR } from '../../../../constants';
import { spacesInit, spaceClicked } from '../../../../modules/boardState';

import './index.css';

class SpacesOnBoard extends Component {
  state = {
    boardWidth: 0
  }

  componentDidMount() {
    this.props.spacesInit();
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

  renderSpace = (space, i) => {
    const height = `${Math.floor(this.props.boardWidth / BOARD_SPACE_DIVISOR)}px`;
    const style = {
      height,
      width: height
    };
    const isHighlighted = this.props.boardState.highlighted.indexOf(i) !== -1;
    const isSelected = this.props.boardState.selected.indexOf(i) !== -1;
    const tile = space.tile ? <Tile type={space.tile} /> : '';
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
        onClick={e => { isHighlighted && this.onClick(e, i)}}
        style={style}>
        {tile}
      </span> 
    );
  }

  renderSpaces() {
    if (!this.props.boardState.spaces) {
      return;
    }
    return this.props.boardState.spaces.map(this.renderSpace);
  }

  render() {
    return this.renderSpaces()
  }
}

const mapStateToProps = state => {
  const { boardState } = state;
  return {
    boardState
  };
};

export default connect(mapStateToProps, {
  spacesInit,
  spaceClicked
})(SpacesOnBoard);