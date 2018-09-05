import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col } from 'react-bootstrap';
import TileSvg from '../../game/board/pieces/tilesvg';

import packageJson from '../../../../package.json';
import { 
  GAME_SELECT_OR_DRAW, 
  GAME_WAIT_START,
  setDebugMode, 
  selectTileInBag,
  swapPlayers,
  playersInit
} from '../../../modules/boardState';

import {
  allTiletypes,
  nameFromTiletype
} from '../../../cards/cardHelpers';

import './index.css';

class SidebarUi extends Component {
  state = {
    uiHint: '',
    gameDebugMode: false,
    selectedTile: {}
  };

  componentDidMount() {
    this.setState({ uiHint: this.props.uiHint });
  }

  componentDidUpdate(prevProps) {
    const { gameState, gameDebugMode, selectedTile, uiHint } = this.props;
    if (prevProps.gameState !== gameState) {
      this.setState({ uiHint });
    }
    if (prevProps.gameDebugMode !== gameDebugMode) {
      this.setState({ gameDebugMode });
    }
    if (prevProps.selectedTile !== selectedTile) {
      this.setState({ selectedTile });
    }
    if (prevProps.uiHint !== uiHint) {
      this.setState({ uiHint });
    }
  }

  renderSelectedTileInfo(iPlayer) {
    const { selectedTile, currentPlayer } = this.props;
    if (iPlayer !== currentPlayer || !selectedTile.tileType) {
      return;
    }
    return (
      <Row>
        <Col md={6} >
          <TileSvg isPreview={true} type={selectedTile.tileType} player={currentPlayer} moves={1} />
        </Col>
        <Col md={6} >
          <TileSvg isPreview={true} type={selectedTile.tileType} player={currentPlayer} moves={2}/>
        </Col>
      </Row>
    );
  }

  renderCapturedTiles = (player, iPlayer) => {
    if (player.tilesCaptured.length === 0) return;

    return (
      <div className='capturedTiles text-left'>
        <h5>Captured tiles</h5>
        <ul>
          {player.tilesCaptured.map((tileInfo,i) => (<li key={i} className='smallFont'>{tileInfo.type}</li>))}
        </ul>
      </div>
    );
  }

  renderDebugTileDrawButton = (iPlayer, type, btnText, i) => {
    const { players, selectTileInBag } = this.props;
    if (players[iPlayer].tilesInBag.find(tileInfo => tileInfo.type === type))
      return <Button key={i} bsStyle='primary' onClick={()=> selectTileInBag(type)}>{btnText}</Button>
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
    return (
      <div>
        {allTiletypes().map((tileType, i) => this.renderDebugTileDrawButton(
          currentPlayer,
          tileType,
          `Draw ${nameFromTiletype(tileType)}`,
          i
        ))}
      </div>
    );
  }

  renderEndOfTurn = () => {
    const { gameState, swapPlayers } = this.props;

    if (gameState === GAME_SELECT_OR_DRAW)
      return (
        <div className='buttonZone'>
          <Button bsStyle='default' onClick={swapPlayers}>End of Turn</Button>
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

  renderPlayers() {
    const { players, gameState, playersInit } = this.props;

    if (gameState === GAME_WAIT_START) {
      return (
        <div className='buttonZone'>
          <Button bsStyle='primary' onClick={() => playersInit()}>Start Game</Button>
        </div>
      );
    }
    return players.map(this.renderPlayer);
  }

  renderPlayer = (player, i) => {
    return (
      <div key={i} className='playerDiv'>
        <h4 className='text-center'>{player.name}</h4>
        {this.renderHint(i)}
        {this.renderDrawTileButton(i)}
        {this.renderSelectedTileInfo(i)}
        {this.renderCapturedTiles(player, i)}
      </div>
    );
  }

  renderDebugControl = () => {
    const { setDebugMode } = this.props;
    const { gameDebugMode } = this.state;
    return (
      <div>
        <label htmlFor="debugMode">Debug Mode</label>&nbsp;
        <input id="debugMode" type="checkbox" checked={gameDebugMode} onClick={() => setDebugMode(!gameDebugMode)} />
      </div>
    )
  }

  // use to debug how tiles look, but not used in the game
  renderTileSvg = () => {
    return allTiletypes().map((tile, i) => (
      <div key={i} >
        <TileSvg type={tile.type} moves={1} />
        <TileSvg type={tile.type} moves={2} /> 
      </div>
      )
    )
  }

  render() {
    return (
      <div className='sidebar-ui text-center'>
        {this.renderPlayers()} 
        {this.renderEndOfTurn()}
        {this.renderDebugControl()}
        <p className='smallFont'>Version {packageJson.version}</p>
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
    gameDebugMode,
    selectedTileStack
  } = boardState;
  const selectedTile = selectedTileStack.length > 0 ? 
      selectedTileStack[selectedTileStack.length - 1] : 
      {
        tileType: ''
      };
  return {
    gameState,
    players,
    currentPlayer,
    uiHint,
    gameDebugMode,
    selectedTile
  };
}



export default connect(mapStateToProps, {
  setDebugMode,
  selectTileInBag,
  swapPlayers,
  playersInit
})(SidebarUi);
