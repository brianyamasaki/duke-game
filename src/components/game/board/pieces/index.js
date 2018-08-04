import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tile from './tile';
import { BOARD_SPACE_DIVISOR } from '../../../../constants';
import { indexToRowCol, addPiece } from '../../../../modules/boardState';

class PiecesOnBoard extends Component {
  state = {
    boardWidth: 0
  }

  componentDidUpdate(prevProps) {
    if (prevProps.boardWidth !== this.props.boardWidth) {
      this.setState({ boardWidth: this.props.boardWidth });
    }
  }

  onClick = (e, i) => {
    const rowCol = indexToRowCol(i);
    this.props.addPiece(0, 'duke', rowCol.row, rowCol.col);
  }

  renderSpace = (space, i) => {
    const height = `${Math.floor(this.props.boardWidth / BOARD_SPACE_DIVISOR)}px`;
    const style = {
      height,
      width: height
    };
    const tile = space.tile ? <Tile type="duke" /> : ''
    return (
      <span 
        key={i} 
        className="space" 
        onClick={e => this.onClick(e, i)}
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
  addPiece
})(PiecesOnBoard);