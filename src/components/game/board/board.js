import React, { Component } from 'react';
import { connect } from 'react-redux';
import SpacesOnBoard from './pieces';

import "./board.css";

class Board extends Component {
  state = {
    width: 0,
    height: 0,
    piecePlacement: []
  };
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  refCallback = element => {
    if (element) {
      this.element = element;
      this.onWindowResize();
    }
    window.addEventListener('resize', this.onWindowResize);
  }

  onWindowResize = () => {
    const bounds = this.element.getBoundingClientRect();
    this.setState({
      height: bounds.width,
      width: bounds.width
    });
  }

  render() {
    const style = {
      height: `${Math.floor(this.state.height)}px`,
      padding: `${Math.floor(this.state.width / 8)}px`
    };
    return (
      <div 
        className="board" 
        ref={this.refCallback} 
        style={style}>
        <SpacesOnBoard boardWidth={this.state.width}/>
      </div>
    );
  }
}

export default connect(null)(Board);
