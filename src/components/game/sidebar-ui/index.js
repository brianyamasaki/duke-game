import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import packageJson from '../../../../package.json';
import { 
  GAME_SELECT_OR_DRAW, 
  setDebugMode, 
  selectTileInBag,
  swapPlayers
} from '../../../modules/boardState';

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

  renderDebugTileDrawButton = (iPlayer, type, btnText) => {
    const { players, selectTileInBag } = this.props;
    if (players[iPlayer].tilesInBag.find(tileInfo => tileInfo.type === type))
      return <Button bsStyle='primary' onClick={()=> selectTileInBag(type)}>{btnText}</Button>
  }

  renderDrawTileButton = (i) => {
    const { currentPlayer, gameState, gameDebugMode, selectTileInBag } = this.props;

    if (currentPlayer !== i || gameState !== GAME_SELECT_OR_DRAW)
      return;
    if (!gameDebugMode) {
      return (
        <div>
          <Button bsStyle='primary' onClick={() => selectTileInBag()}>Draw a Tile</Button>
        </div>
      )
    }
    const tileTypes = [
      { 
        type: TILE_KNIGHT,
        text: 'Draw Knight'
      },
      {
        type: TILE_SEER,
        text: 'Draw Seer'
      },
      {
        type: TILE_PRIEST,
        text: 'Draw Priest'
      },
      { 
        type: TILE_FOOTMAN,
        text: 'Draw Footman'
      },
      {
        type: TILE_RANGER,
        text: 'Draw Ranger'
      },
      {
        type: TILE_PIKEMAN,
        text: 'Draw Pikeman'
      }
    ];
    return (
      <div>
        {tileTypes.map(tileType => this.renderDebugTileDrawButton(
          currentPlayer,
          tileType.type,
          tileType.text
        ))}
      </div>
    );
  }

  renderEndOfTurn = () => {
    const { gameState, swapPlayers } = this.props;

    if (gameState === GAME_SELECT_OR_DRAW)
      return <Button bsStyle='default' onClick={swapPlayers}>End of Turn</Button>
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
      <div className='sidebar-ui text-center'>
        {players.map(this.renderPlayer)} 
        {this.renderEndOfTurn()}
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
  selectTileInBag,
  swapPlayers
})(SidebarUi);
