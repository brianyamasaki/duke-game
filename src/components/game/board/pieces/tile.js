import React, { Component} from 'react';

import './tile.css'
class Tile extends Component {

  render() {
    if (!this.props.type) {
      return;
    }
    const classes = `tile ${this.props.type}`;
    return <div className={classes} />;
  }
}

export default Tile;