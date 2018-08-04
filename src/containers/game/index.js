import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import Game from '../../components/game';

class GamePage extends Component {
  render() {
    return (
      <Grid>
        <h1 className='text-center'>Game Page</h1>
        <Game />
      </Grid>
    );
  }
}

export default GamePage;
