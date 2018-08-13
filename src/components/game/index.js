import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import Board from './board/board';
import SidebarUi from './sidebar-ui';

const Game = () => ( 
  <Grid>
    <Row>
      <Col xs={12} sm={9} md={9} lg={8} > 
        <Board />
      </Col>
      <Col xs={12} sm={3} md={3} lg={4} >
        <SidebarUi />
      </Col>
    </Row>
  </Grid>
);

export default Game;