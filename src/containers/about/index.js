import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import packageJson from '../../../package.json';

const details = [
  'Command moves are now supported',
  'All tiles are drawn using SVG, meaning they literally reflect the movement rules',
  'Jump Slide rules are now supported - Assassin tile implemented'
];
const todos = [
  'Champion Tile',
  'Marshall Tile',
  'Bowman Tile',
  'Duchess Tile',
  'Oracle Tile'
];
const About = () => (
  <Grid>
    <h1 className="text-center">About</h1>
    <Row>
      <Col sm={12} md={6} lg={7}>
        <h2>The Project</h2>
        <p>
          This game is a work in progress. Currently both players play on the same browser and must click the End of Turn button to let the other player play,
          mostly because we haven't implemented Undo yet. We also don't save the game when you navigate away from the page. All this in an effort to get the game
          playable as soon as possible. We will eventually create a server and a player matching service to allow players to play
          over the Internet.
        </p>
        <p>
          It's currently designed just using a mouse and simple clicks, no drag and drop support or special
          touchscreen support yet. 
        </p>
        <p>
          This is an open source project written in React. The code is available on <a href="https://github.com/brianyamasaki/duke-game">https://github.com/brianyamasaki/duke-game</a>. 
        </p>
        <p>
          Version {packageJson.version} &mdash; Copyright 2018 Yamasaki Design.
        </p>
      </Col>
      <Col sm={12} md={6} lg={5}>
        <h2>New Features</h2>
        <ul>
          {details.map((detail, i) => (<li key={i}>{detail}</li>))}
        </ul>
        <h2>To Do</h2>
        <ul>
          {todos.map((todo, i) => (<li key={i}>{todo}</li>))}
        </ul>
      </Col>
    </Row>
  </Grid>
)

export default About
