import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import packageJson from '../../../../package.json';
import { GAME_SELECT_OR_DRAW, setDebugMode, selectTileInBag } from '../../../modules/boardState';
import { 
  TILE_KNIGHT,
  TILE_FOOTMAN,
  TILE_PRIEST,
  TILE_SEER,
  TILE_RANGER,
  TILE_PIKEMAN
} from '../../../cards';

import './index.css';

class SidebarUi extends Component {
  state = {
    uiHint: '',
    gameDebugMode: false
  };

  componentDidMount() {
    this.setState({ uiHint: this.props.uiHint });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.gameState !== this.props.gameState) {
      this.setState({ uiHint: this.props.uiHint});
    }
    if (prevProps.gameDebugMode !== this.props.gameDebugMode) {
      this.setState({ gameDebugMode: this.props.gameDebugMode});
    }
  }

  renderDrawTileButton = (i) => {
    const { currentPlayer, gameState, selectTileInBag, gameDebugMode } = this.props;

    if (currentPlayer !== i || gameState !== GAME_SELECT_OR_DRAW)
      return;
    if (!gameDebugMode) {
      return (
        <div>
          <Button bsStyle='primary' onClick={() => window.alert('Not Implemented')}>Draw a Tile</Button>
        </div>
      )
    }
    return (
      <div>
        <Button bsStyle='primary' onClick={()=> selectTileInBag(TILE_KNIGHT)}>Draw Knight</Button>
        <Button bsStyle='primary' onClick={()=> selectTileInBag(TILE_SEER)}>Draw Seer</Button>
        <Button bsStyle='primary' onClick={()=> selectTileInBag(TILE_PRIEST)}>Draw Priest</Button>
        <Button bsStyle='primary' onClick={()=> selectTileInBag(TILE_FOOTMAN)}>Draw Footman</Button>
        <Button bsStyle='primary' onClick={()=> selectTileInBag(TILE_RANGER)}>Draw Ranger</Button>
        <Button bsStyle='primary' onClick={()=> selectTileInBag(TILE_PIKEMAN)}>Draw Pikeman</Button>
      </div>
    );
  }

  renderHint = (i) => {
    if (this.props.currentPlayer === i) {
      return (
        <p>{this.state.uiHint}</p>
      );
    }
  }

  renderPlayer = (player, i) => {
    return (
      <div key={i}>
        <h4 className='text-center'>{player.name}</h4>
        {this.renderHint(i)}
        {this.renderDrawTileButton(i)}
      </div>
    );
  }

  renderDebugControl = () => {
    const { gameDebugMode, setDebugMode } = this.props;
    return (
      <div>
        <label htmlFor="debugMode">Debug Mode</label>&nbsp;
        <input id="debugMode" type="checkbox" value={this.state.gameDebugMode} onClick={() => setDebugMode(!gameDebugMode)} />
      </div>
    )
  }

  render() {
    const { players } = this.props;

    return (
      <div className='sidebar-ui pull-right text-center'>
        {players.map(this.renderPlayer)} 
        {this.renderDebugControl()}
        <p>Version {packageJson.version}</p>
      </div>
    );
  }
}

const mapStateToProps = ({ boardState }) => {
  const { 
    gameState, 
    players,
    currentPlayer,
    uiHint,
    gameDebugMode 
  } = boardState;
  return {
    gameState,
    players,
    currentPlayer,
    uiHint,
    gameDebugMode
  };
}



export default connect(mapStateToProps, {
  setDebugMode,
  selectTileInBag
})(SidebarUi);
