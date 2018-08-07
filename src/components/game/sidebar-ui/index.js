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

  renderDrawTileButton() {
    if (this.props.boardState.gameState !== GAME_SELECT_OR_DRAW)
      return;
    return <Button bsStyle='primary' onClick={()=> {window.alert('Not Yet Implemented')}}>Draw Tile</Button>;
  }

  render() {
    const { boardState } = this.props;

    return (
      <div className='sidebar-ui pull-right text-center'>
        <h3 className='text-center'>{boardState.players[0].name}</h3>
        {this.renderDrawTileButton()}
        <p>{this.state.uiHint}</p>
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
