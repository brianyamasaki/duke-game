import React from 'react'
import { Grid } from 'react-bootstrap'

const details = [
  'Now both dark and light tiles can capture tiles!',
  'Supporting moves blocked by tiles'
];
const todos = [
];
const About = () => (
  <Grid>
    <h1 className="text-center">About</h1>
    <h2>The Project</h2>
    <p>This is an open source project written in React. The code is available on <a href="https://github.com/brianyamasaki/duke-game">https://github.com/brianyamasaki/duke-game</a></p>
    <h2>New Features</h2>
    <ul>
      {details.map((detail, i) => (<li key={i}>{detail}</li>))}
    </ul>
    <h2>To Do</h2>
    <ul>
      {todos.map((todo, i) => (<li key={i}>{todo}</li>))}
    </ul>
  </Grid>
)

export default About
