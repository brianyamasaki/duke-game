import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import Game from '../../components/game';

class GamePage extends Component {
  render() {
    return (
      <Grid>
        <Game />
      </Grid>
    );
  }
}

export default GamePage;
