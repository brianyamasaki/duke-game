import React, { Component} from 'react';

import './tile.css'
class Tile extends Component {

  render() {
    const { type, moves, player } = this.props;
    if (!type) {
      return null;
    }
    const classes = [];
    if (this.props.isPreview) {
      classes.push('tilePreview')
    } else {
      classes.push('tile')
    }
    classes.push(type);
    classes.push(moves % 2 === 1 ? 'frontside' : 'backside');
    if (player === 1) {
      classes.push('dark');
    }
    return <div className={classes.join(' ')} />;
  }
}

export default Tile;