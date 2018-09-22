import React, { Component } from 'react';
import { connect } from 'react-redux';
import SpacesOnBoard from './pieces';
import GameOverModal from './gameOver';
import { isDukeCaptured } from '../../../modules/selectors/isGameOver';
import { checkStates } from '../../../modules/selectors/isDukeInCheck';
import { HINT_DUKE_IN_CHECK } from '../../../strings';

import "./board.css";

class Board extends Component {
  state = {
    width: 0,
    height: 0,
    piecePlacement: [],
    gameOverState: ''
  };

  componentDidUpdate(prevProps) {
    const { gameOverState} = this.props;
    if (prevProps.gameOverState !== gameOverState) {
      this.setState({
        gameOverState
      });
    }
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  refCallback = element => {
    if (element) {
      this.element = element;
      this.onWindowResize();
    }
    window.addEventListener('resize', this.onWindowResize);
  }

  onWindowResize = () => {
    const bounds = this.element.getBoundingClientRect();
    this.setState({
      height: bounds.width,
      width: bounds.width
    });
  }
  renderModal = () => {
    if (this.props.gameOverState) {
      return <GameOverModal show={true} message={this.props.gameOverState} />;
    }
  }

  renderNotifications = () => {
    const { uiHint, checkStates } = this.props;

    if (checkStates.length > 0) {
      return (
        <div className="notifications">
          {HINT_DUKE_IN_CHECK}
        </div>
      );  
    }
    if (uiHint) {
      return (
        <div className="notifications">
          {uiHint}
        </div>
      );  
    }
  }

  render() {
    const style = {
      height: `${Math.floor(this.state.height)}px`,
      padding: `${Math.floor(this.state.width / 8)}px`
    };

    const classes = [
      'board'
    ];

    if (this.props.currentPlayer !== 0) {
      classes.push('playerOther');
    }
    
    return (
      <div id="boardBackground">
        <div 
          className={classes.join(' ')} 
          ref={this.refCallback} 
          style={style}>
          <SpacesOnBoard boardWidth={this.state.width}/>
        </div>
        {this.renderModal()}
        {this.renderNotifications()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { boardState } = state;
  return {
    currentPlayer: boardState.currentPlayer,
    gameOverState: isDukeCaptured(state),
    checkStates: checkStates(state),
    uiHint: boardState.uiHint
  }
}

export default connect(mapStateToProps)(Board);
