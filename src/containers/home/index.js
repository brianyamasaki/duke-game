import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap';
import './index.css';

const Home = props => (
  <Grid className='homePage'>
    <h1 className='text-center'>The Duke Board Game</h1>
  
    <Row>
      <Col xs={12} sm={12} md={8}>
        <h3 className='text-center'>Welcome to our version of The Duke</h3>
        <p>This is our version of The Duke board game. This game is a little like Chess, 
          but with more aggressive pieces. And with every other move, each tile flips over
          and gives you different moves. This means you have to think at least one move ahead. </p>
        <p>Here's a fantastic YouTube video describing how to Play the Duke</p>
        <iframe title="WatchItPlayed" width="560" height="315" src="https://www.youtube.com/embed/msWtSzLxcaE?rel=0" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
        <p>The <a href="https://www.catalystgamelabs.com/download/The%20Duke%20Rulebook%20Hi-Res_FINAL.pdf">rules for the Duke </a> 
        are also available for download if you really want to get to know the game. 
        There's a very short <a href="https://www.catalystgamelabs.com/duke/" target='_blank' rel="noopener noreferrer">introduction to the Duke</a> on the Catalyst Games website as well. </p>
      </Col>

      <Col className='sidebar' xs={12} sm={12} md={4}>
        <h3 className='text-center'>Buy the Duke board game</h3>
        <p>Buy the Duke board game from <a href="https://www.catalystgamelabs.com/casual-games/the-duke/">Catalyst Games</a>. 
        When you buy the actual board game, you will get physical tiles that don't disappear in a power failure. You also get some 
        blank tiles that allows you to design your own tiles to play with.</p>
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
