import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { GAME_SELECT_OR_DRAW } from '../../../modules/boardState';

import './index.css';

class SidebarUi extends Component {
  state = {
    uiHint: ''
  }

  componentDidMount() {
    this.setState({ uiHint: this.props.boardState.uiHint });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.boardState.gameState !== this.props.boardState.gameState) {
      this.setState({ uiHint: this.props.boardState.uiHint});
    }
  }

  renderDrawTileButton = (i) => {
    const { boardState } = this.props;

    if (boardState.currentPlayer !== i || boardState.gameState !== GAME_SELECT_OR_DRAW)
      return;
    return <Button bsStyle='primary' onClick={()=> {window.alert('Not Yet Implemented')}}>Draw Tile</Button>;
  }

  renderHint = (i) => {
    if (this.props.boardState.currentPlayer === i) {
      return (
        <p>{this.state.uiHint}</p>
      );
    }
  }

  renderPlayer = (player, i) => {
    return (
      <div>
        <h4 className='text-center'>{player.name}</h4>
        {this.renderHint(i)}
        {this.renderDrawTileButton(i)}
      </div>
    );
  }

  render() {
    const { boardState } = this.props;

    return (
      <div className='sidebar-ui pull-right text-center'>
        {boardState.players.map(this.renderPlayer)} 

      </div>
    );
  }
}

const mapStateToProps = ({ boardState, players }) => {
  return {
    boardState
  }
}



export default connect(mapStateToProps)(SidebarUi);
