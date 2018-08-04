import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Grid, Row, Col, ButtonToolbar, Button } from 'react-bootstrap';
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from '../../modules/counter'

const Home = props => (
  <Grid>
    <h1 className='text-center'>Home</h1>
    <p>Count: {props.count}</p>

    <Row>
      <Col xs={12} md={6}>
        <ButtonToolbar>
          <Button bsStyle='primary' onClick={props.increment}>Increment</Button>
          <Button bsStyle='primary' onClick={props.incrementAsync} disabled={props.isIncrementing}>
            Increment Async
          </Button>
        </ButtonToolbar>
      </Col>

      <Col xs={12} md={6}>
        <ButtonToolbar>
          <Button bsStyle='primary' onClick={props.decrement}>Decrement</Button>
          <Button bsStyle='primary' onClick={props.decrementAsync} disabled={props.isDecrementing}>
            Decrement Async
          </Button>
        </ButtonToolbar>
      </Col>
    </Row>


      <ButtonToolbar className='text-center'>
        <Button bsStyle='info' onClick={() => props.changePage()}>
          Go to about page via redux
        </Button>
      </ButtonToolbar>
  </Grid>
)

const mapStateToProps = ({ counter }) => ({
  count: counter.count,
  isIncrementing: counter.isIncrementing,
  isDecrementing: counter.isDecrementing
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      increment,
      incrementAsync,
      decrement,
      decrementAsync,
      changePage: () => push('/about-us')
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
