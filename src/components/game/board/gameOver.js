import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

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

  render() {
    return (
      <Modal.Dialog show={this.state.show}>
        <Modal.Title className='text-center'>The Duke</Modal.Title>
        <Modal.Body>{this.state.message}</Modal.Body>
      </Modal.Dialog>
    );
  }
}

export default GameOverModal;