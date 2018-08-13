import React, { Component} from 'react';
import {
  TILE_DUKE,
  TILE_FOOTMAN,
  TILE_KNIGHT,
  TILE_PIKEMAN,
  TILE_PRIEST,
  TILE_RANGER,
  TILE_SEER
} from '../../../../cards/cardConstants';

import './tile.css'
class Tile extends Component {
  state = {
    isFront: true,
    type: null
  };

  componentDidMount() {
    const { type, moves } = this.props;
    console.log('componentDidMount');
    this.setState({
      isFront: moves % 2 === 1,
      type
    });
  }

  componentDidUpdate(prevProps) {
    const { type, moves } = this.props;
    if (prevProps.type !== type) {
      this.setState({
        type
      });
    }
    if (prevProps.moves !== moves) {
      this.setState({
        moves
      });
    }
  }

  renderMoves() {
    const { type, isFront } = this.state;
    switch (type) {
      case TILE_DUKE:
        if (isFront) {
          return (
            <g>
              <path fill="none" d="M1.549 500.5h500v200h-500z"/>
              <path d="M381.55 250l-60 34.641v-69.282zM181.55 215.359v69.282l-60-34.641z"/>
            </g>
          )
        }
        return (
          <g>
            <path fill="none" d="M0 500.5h500v200H0z"/>
            <path d="M250 120l34.641 60h-69.282zM284.641 320L250 380l-34.641-60z"/>
          </g>
        )
      case TILE_FOOTMAN:
        if (isFront) {
          return (
            <g>
              <path fill="none" d="M1.549 500.5h500v200h-500z"/>
              <circle fill="#231F20" cx="250" cy="150" r="40"/>
              <circle fill="#231F20" cx="350" cy="250" r="40"/>
              <circle fill="#231F20" cx="150" cy="250" r="40"/>
              <circle fill="#231F20" cx="250" cy="350" r="40"/>
            </g>
          );
        }
        return (
          <g>
            <path fill="none" d="M0 501h500v200H0z"/>
            <circle fill="#231F20" cx="250" cy="50" r="40"/>
            <circle fill="#231F20" cx="350" cy="150" r="40"/>
            <circle fill="#231F20" cx="150" cy="150" r="40"/>
            <circle fill="#231F20" cx="350" cy="350" r="40"/>
            <circle fill="#231F20" cx="150" cy="350" r="40"/>
          </g>
        );
      default:
        break;
    }
    return null;
  }

  renderSideIndicator() {
    if (this.state.isFront) {
      return (
        <path fill="#231F20" d="M266.521 275.034h-5.067a9.014 9.014 0 0 0 1.857-5.48v-28.519c0-3.26-1.723-6.134-4.331-7.765 2.953-2.348 4.877-5.923 4.877-9.976 0-7.065-5.743-12.794-12.808-12.794-7.074 0-12.799 5.729-12.799 12.794 0 4.053 1.925 7.627 4.869 9.976-2.594 1.631-4.33 4.504-4.33 7.765v28.519c0 2.063.705 3.952 1.856 5.48h-5.067l-6.401 15.466h43.745l-6.401-15.466z"/>
      )
    }
    return (
      <path d="M200 200v100h100V200H200zm27.627 91l6.402-16h5.066c-1.151-1-2.096-3.383-2.096-5.446v-28.519c0-3.26 1.855-6.134 4.449-7.765-2.943-2.348-4.809-5.923-4.809-9.976 0-7.065 5.756-12.794 12.829-12.794 7.064 0 12.823 5.729 12.823 12.794 0 4.053-1.797 7.627-4.75 9.976 2.607 1.631 4.457 4.504 4.457 7.765v28.519c0 2.063-.936 4.446-2.096 5.446h5.066l6.402 16h-43.743z"/>
    );
  }

  render() {
    if (!this.state.type) {
      return null;
    }
    // const classes = ['tile'];
    // classes.push(this.props.type);
    // classes.push(this.props.moves % 2 === 1 ? 'frontside' : 'backside');
    // return <div className={classes.join(' ')} />;
    return (
      <svg 
        baseProfile="basic" 
        width="100" 
        height="100" 
        viewBox="0 0 700 700"
      >
        <path d="M498.55 501v195h-495V501h495m4-4h-503v203h503V497z"/>
        <path d="M498.55 4v492h-495V4h495m4-4h-503v500h503V0z"/>
        <path fill="none" stroke="#000" strokeWidth="8" strokeMiterlimit="10" d="M-.45 100h500M-.45 200h500M-.45 300h500M-.45 400h500M101.55 0v500M201.55 0v500M301.55 0v500M401.55 0v500"/>
        {this.renderSideIndicator()}
        {this.renderMoves()}
      </svg>
    );
  }
}

export default Tile;