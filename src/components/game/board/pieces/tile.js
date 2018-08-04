import React, { Component} from 'react';

import './tile.css'
class Tile extends Component {
  render() {
    const classes = `tile ${this.props.type}`;
    return <div className={classes} />;
  }
}

export default Tile;