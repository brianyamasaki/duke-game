import React, { Component } from 'react';
import { connect } from 'react-redux';
import Game from '../../components/game';

import { setDebugMode } from '../../modules/boardState';
import './index.css';

class GamePage extends Component {

  componentDidMount() {
    const { match, setDebugMode } = this.props;
    if (match && match.params && match.params.debug) {
      setDebugMode(true);
    }
  }

  render() {
    console.log(this.props.match);
    return (
      <div className='gamePage'>
        <Game />
      </div>
    );
  }
}


export default connect(null,{
  setDebugMode
})(GamePage);