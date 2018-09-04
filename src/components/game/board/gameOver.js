import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { boardInit } from '../../../modules/boardState';

class GameOverModal extends Component {
  state = {
    show: false,
    message: ''
  };

  componentDidMount() {
    const { show, message } = this.props;
    this.setState({
      show, 
      message
    });
  }

  componentDidUpdate(prevProps) {
    const { show, message } = this.props;
    if (prevProps.show !== show) {
      this.setState({
        show
      });
    }
    if (prevProps.message !== message) {
      this.setState({
        message
      });
    }
  }

  restartGame = () => {
    this.setState({
      show: false,
      message: ''
    });
    this.props.boardInit();
  }

  render() {
    return (
      <Modal 
        show={this.state.show}
        onHide={() => this.setState({ show: false })}
      >
        <Modal.Header closeButton>
          <Modal.Title className='text-center'>The Duke</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>{this.state.message}</Modal.Body>
        <Modal.Footer><Button bsStyle='primary' onClick={this.restartGame}>Start a New Game</Button></Modal.Footer>
      </Modal>
    );
  }
}

export default connect(null, {
  boardInit
})(GameOverModal);