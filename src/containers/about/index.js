import React from 'react'
import { Grid } from 'react-bootstrap'

const details = [
  'Limited tiles available in the Tile Bag (2 of each)',
  'Priest movements not supported yet',
  'Only handling a single player yet',
  'Probably doesn\'t handle touch events'
];
const About = () => (
  <Grid>
    <h1>Implementation Details</h1>
    <ul>
      {details.map(detail => (<li>{detail}</li>))}
    </ul>
  </Grid>
)

export default About
