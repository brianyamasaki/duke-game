import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col } from 'react-bootstrap';
import Tile from '../../game/board/pieces/tile';
import TileSvg from '../../game/board/pieces/tilesvg';

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
  TILE_PIKEMAN,
  TILE_LONGBOWMAN
} from '../../../cards';

import './index.css';

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
  },
  {
    type: TILE_LONGBOWMAN,
    text: 'Draw Longbowman'
  }
];

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
  }

  renderSelectedTileInfo(iPlayer) {
    const { selectedTile, currentPlayer } = this.props;
    if (iPlayer !== currentPlayer || !selectedTile.tileType) {
      return;
    }
    return (
      <Row>
        <Col md={6} >
          <Tile isPreview={true} type={selectedTile.tileType} player={currentPlayer} moves={1} />
        </Col>
        <Col md={6} >
          <Tile isPreview={true} type={selectedTile.tileType} player={currentPlayer} moves={2}/>
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
        {tileTypes.map((tileType, i) => this.renderDebugTileDrawButton(
          currentPlayer,
          tileType.type,
          tileType.text,
          i
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
    const { gameDebugMode, setDebugMode } = this.props;
    return (
      <div>
        <label htmlFor="debugMode">Debug Mode</label>&nbsp;
        <input id="debugMode" type="checkbox" value={this.state.gameDebugMode} onClick={() => setDebugMode(!gameDebugMode)} />
      </div>
    )
  }

  renderTileSvg = () => {
    return tileTypes.map(tile => (
      <div>
        <TileSvg type={tile.type} moves={1} />
        <TileSvg type={tile.type} moves={2} /> 
      </div>
      )
    )
  }

  render() {
    const { players } = this.props;

    return (
      <div className='sidebar-ui text-center'>
        {players.map(this.renderPlayer)} 
        {this.renderEndOfTurn()}
        {this.renderDebugControl()}
        <p className='smallFont'>Version {packageJson.version}</p>
        {this.renderTileSvg()}
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
    selectedTile
  } = boardState;
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
  swapPlayers
})(SidebarUi);
