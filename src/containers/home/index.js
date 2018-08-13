import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap';

const Home = props => (
  <Grid>
    <h1 className='text-center'>The Duke Board Game</h1>
  
    <Row>
      <Col xs={12} sm={12} md={8}>
        <h3 className='text-center'>Welcome to our version of The Duke</h3>
        <p>This is our version of The Duke board game. This game is a little like Chess, 
          but with more aggressive pieces. And with every other move, each tile flips over
          and gives you different moves. This means you have to think at least one move ahead. </p>
        <p>Here's a fantastic YouTube video describing how to Play the Duke</p>
        <iframe title="WatchItPlayed" width="560" height="315" src="https://www.youtube.com/embed/msWtSzLxcaE?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        <p>The <a href="https://www.catalystgamelabs.com/download/The%20Duke%20Rulebook%20Hi-Res_FINAL.pdf">rules for the Duke </a> 
        are available for download so we won't try to explain the game. 
        There's a very good <a href="https://www.catalystgamelabs.com/duke/" target='_blank' rel="noopener noreferrer">introduction to the Duke</a> as well. </p>
      </Col>

      <Col xs={12} sm={12} md={4}>
        <h3 className='text-center'>Buy the real board game</h3>
        <p><a href="https://www.catalystgamelabs.com/casual-games/the-duke/">Catalyst Games </a> 
        is where you can buy the real board game. You get real physical tiles that don't rely on an internet
        connection to play the game.</p>
      </Col>
    </Row>

    <Row>
      <Col className='text-center'>
        <a href="/game" className='btn btn-primary'>
          Play the Duke
        </a>
      </Col>
    </Row>
  </Grid>
)

export default Home;
