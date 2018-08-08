import React, { Component} from 'react';

import './tile.css'
class Tile extends Component {

  render() {
    if (!this.props.type) {
      return;
    }
    const classes = ['tile'];
    classes.push(this.props.type);
    classes.push(this.props.moves % 2 === 1 ? 'frontside' : 'backside');
    return <div className={classes.join(' ')} />;
  }
}

export default Tile;