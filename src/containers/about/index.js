import React from 'react'
import { Grid } from 'react-bootstrap'

const details = [
  'Limited tiles available in the Tile Bag (2 of each)',
  'Currently only handling a single player',
  'Allows tiles on top of tiles - will address later',
  'Does not allow capturing enemy tiles yet',
  'Not supporting moves blocked by tiles'
];
const About = () => (
  <Grid>
    <h1 className="text-center">About</h1>
    <h2>The Project</h2>
    <p>This is an open source project written in React. The code is available on <a href="https://github.com/brianyamasaki/duke-game">github</a></p>
    <h2>Implementation Details</h2>
    <ul>
      {details.map(detail => (<li>{detail}</li>))}
    </ul>
  </Grid>
)

export default About
