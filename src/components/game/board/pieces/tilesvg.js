import React, { Component} from 'react';
import {
  RULETYPE_MOVE,
  RULETYPE_JUMP,
  RULETYPE_STRIKE,
  RULETYPE_COMMAND,
  RULETYPE_SLIDE,
  SLIDE_UP,
  SLIDE_DOWN,
  SLIDE_LEFT,
  SLIDE_RIGHT,
  SLIDE_DIAG_UP_LEFT,
  SLIDE_DIAG_UP_RIGHT,
  SLIDE_DIAG_DOWN_LEFT,
  SLIDE_DIAG_DOWN_RIGHT,
  RULETYPE_JUMPSLIDE
} from '../../../../cards/cardConstants';
import { movesFromTiletype } from '../../../../cards/cardHelpers';
import strikePolyPoints from '../../../game/shapes/strikeStar';
import { 
  upArrow,
  leftArrow,
  rightArrow,
  downArrow,
  upLeftArrow,
  upRightArrow,
  downLeftArrow,
  downRightArrow
} from '../../../game/shapes/slidePolygons';

const mpSlideTypePos = {
  [SLIDE_UP]: { row: -1, col: 0 },
  [SLIDE_DOWN]: { row: 1, col: 0 },
  [SLIDE_LEFT]: { row: 0, col: -1 },
  [SLIDE_RIGHT]: { row: 0, col: 1 },
  [SLIDE_DIAG_UP_LEFT]: { row: -1, col: -1 },
  [SLIDE_DIAG_UP_RIGHT]: { row: -1, col: 1 },
  [SLIDE_DIAG_DOWN_LEFT]: { row: 1, col: -1 },
  [SLIDE_DIAG_DOWN_RIGHT]: { row: 1, col: 1 }
};

const mpSlideTypePolygonOffsets = {
  [SLIDE_UP]: upArrow,
  [SLIDE_DOWN]: downArrow,
  [SLIDE_LEFT]: leftArrow,
  [SLIDE_RIGHT]: rightArrow,
  [SLIDE_DIAG_UP_LEFT]: upLeftArrow,
  [SLIDE_DIAG_UP_RIGHT]: upRightArrow,
  [SLIDE_DIAG_DOWN_LEFT]: downLeftArrow,
  [SLIDE_DIAG_DOWN_RIGHT]: downRightArrow
};

const ruleMarkersFromTiletype = (tileType, isOdd) => {
  const moves = movesFromTiletype(tileType);
  const ruleset = moves[isOdd ? 'odd' : 'even'];
  const pieceCenter = moves.pieceCenter || { row: 2, col: 2 };
  const ruleMarkers = [];
  Object.keys(ruleset).forEach(ruleType => {
    switch (ruleType) {
      case RULETYPE_MOVE:
      case RULETYPE_JUMP:
      case RULETYPE_STRIKE:
      case RULETYPE_COMMAND:
        ruleset[ruleType].forEach(rule => {
          ruleMarkers.push(
            {
              ruleType,
              y: (pieceCenter.row + rule.row) * 100 + 50,
              x: (pieceCenter.col + rule.col) * 100 + 50
            }
          );
        });
        break;
      case RULETYPE_SLIDE:
      case RULETYPE_JUMPSLIDE:
        ruleset[ruleType].forEach(slideType => {
          const rulePos = mpSlideTypePos[slideType];
          ruleMarkers.push(
            {
              ruleType,
              slideType,
              y: (pieceCenter.row + rulePos.row) * 100 + 50,
              x: (pieceCenter.col + rulePos.col) * 100 + 50
            }
          )
        })
        break;
      default:
        break;
    }
  });
  return ruleMarkers;
}

class Tile extends Component {
  state = {
    isFront: true,
    type: null, 
    strokeWidth: 8
  };
  moveRadius = 32;

  componentDidMount() {
    const { type, moves } = this.props;
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

  renderRuleMarker = (ruleMarker, i) => {
    let points;
    switch(ruleMarker.ruleType) {
      case RULETYPE_MOVE:
        return (
          <circle 
            fill="#000" 
            stroke="#000" 
            strokeWidth={this.state.strokeWidth} 
            cx={ruleMarker.x} 
            cy={ruleMarker.y} 
            r={this.moveRadius} 
            key={i}
          />
        ); 
      case RULETYPE_JUMP:
        return ( 
          <circle 
            fill="none" 
            stroke="#000" 
            strokeWidth={this.state.strokeWidth} 
            cx={ruleMarker.x} 
            cy={ruleMarker.y} 
            r={this.moveRadius} 
            key={i} 
          />
        );
      case RULETYPE_STRIKE:
        points = strikePolyPoints.map(offset => (
          `${ruleMarker.x + offset.x},${ruleMarker.y + offset.y}`
        ));
        return (
          <polygon 
            fill="none" 
            stroke="#000000" 
            strokeWidth="6" 
            strokeMiterlimit="10" 
            points={points.join(' ')}
            key={i}
          />
    
        );
      case RULETYPE_SLIDE:
        points = mpSlideTypePolygonOffsets[ruleMarker.slideType].map(offset => 
          `${ruleMarker.x + offset.x},${ruleMarker.y + offset.y}`
        );
        return (
          <polygon
            fill="000"
            points={points.join(' ')}
            key={i}
          />
        );
      default:
        break;
    }
    return;
  }

  renderMoves() {
    const { type, isFront } = this.state;
    const ruleMarkers = ruleMarkersFromTiletype(type, isFront);
    return (
      <g>
        {ruleMarkers.map(this.renderRuleMarker)}
      </g>
    )
  }

  renderTitle() {
    return (
      <foreignObject x="0" y="500" width="500" height="200" fontSize="90">
        <div className="title-container" xmlns="http://www.w3.org/1999/xhtml">
          {this.state.type}
        </div>
      </foreignObject>
    );
  }

  renderSideIndicator() {
    if (this.state.isFront) {
      return (
        <path 
          fill="#000" 
          d="M266.521 275.034h-5.067a9.014 9.014 0 0 0 1.857-5.48v-28.519c0-3.26-1.723-6.134-4.331-7.765 2.953-2.348 4.877-5.923 4.877-9.976 0-7.065-5.743-12.794-12.808-12.794-7.074 0-12.799 5.729-12.799 12.794 0 4.053 1.925 7.627 4.869 9.976-2.594 1.631-4.33 4.504-4.33 7.765v28.519c0 2.063.705 3.952 1.856 5.48h-5.067l-6.401 15.466h43.745l-6.401-15.466z"
        />
      )
    }
    return (
      <path 
        d="M200 200v100h100V200H200zm27.627 91l6.402-16h5.066c-1.151-1-2.096-3.383-2.096-5.446v-28.519c0-3.26 1.855-6.134 4.449-7.765-2.943-2.348-4.809-5.923-4.809-9.976 0-7.065 5.756-12.794 12.829-12.794 7.064 0 12.823 5.729 12.823 12.794 0 4.053-1.797 7.627-4.75 9.976 2.607 1.631 4.457 4.504 4.457 7.765v28.519c0 2.063-.936 4.446-2.096 5.446h5.066l6.402 16h-43.743z"
      />
    );
  }

  render() {
    if (!this.state.type) {
      return null;
    }
    const { strokeWidth } = this.state;
    return (
      <svg 
        baseProfile="basic" 
        viewBox="0 0 700 700"
      >
        <path
          stroke="#000" 
          strokeWidth={strokeWidth}
          d="M500 500v200h-500V500h500m4-4h-500v200h500V500z"
        />
        <path 
          stroke="#000" 
          strokeWidth={strokeWidth}
          d="M500 4v492h-495V4h495m4-4h-500v500h500V0z"
        />
        <path 
          fill="none" 
          stroke="#000" 
          strokeWidth={strokeWidth}
          strokeMiterlimit="10" 
          d="M0 100h500M0 200h500M0 300h500M0 400h500M100 0v500M200 0v500M300 0v500M400 0v500"
        />
        <rect 
          x="500" 
          y="4"
          fill="none"
          stroke="#000000"
          strokeWidth={strokeWidth}
          width="194" 
          height="694"
        />
        {this.renderSideIndicator()}
        {this.renderMoves()}
        {this.renderTitle()}
      </svg>
    );
  }
}

export default Tile;