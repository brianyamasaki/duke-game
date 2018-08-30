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
  RULETYPE_JUMPSLIDE,
  TILE_LONGBOWMAN
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
      // case RULETYPE_JUMPSLIDE:
        points = mpSlideTypePolygonOffsets[ruleMarker.slideType].map(offset => 
          `${ruleMarker.x + offset.x},${ruleMarker.y + offset.y}`
        );
        if (ruleMarker.ruleType === RULETYPE_SLIDE) {
          return (
            <polygon
              fill="000"
              points={points.join(' ')}
              key={i}
            />
          );
        }
        return (
          <polygon
            fill="none"
            stroke="#000"
            strokeWidth="8"
            points={points.join(' ')}
            key={i}
          />
        );

      default:
        window.alert('No support for rules of type ' + ruleMarker.ruleType);
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
    const polygonOffsets = [
      { x: -16, y: 24 },
      { x: -22, y: 39.5 },
      { x: 21, y: 39.5 },
      { x: 15, y: 24 }
    ];
    const x = 250;
    const y = this.state.type === TILE_LONGBOWMAN ? 350 : 250;
    const polyPoints = polygonOffsets.map(offset => (
      `${x + offset.x},${y + offset.y}`
    ));

    if (this.state.isFront) {
      return (
        <g>
          <circle cx={x} cy={y - 27.75} r="12.75"/>
          <polygon 
            points={polyPoints.join(' ')}
          />
          <circle cx={x} cy={y - 9} r="12.5"/>
          <circle cx={x} cy={y + 16.666} r="12.5"/>
          <rect x={x - 12.5} y={y - 10} width="25" height="26"/>
        </g>
      );
    }
    return (
      <g>
        <rect x={x - 50} y={y - 50} width="100" height="100" />
        <circle fill="#fff" cx={x} cy={y - 27.75} r="12.75"/>
        <polygon fill="#fff"
          points={polyPoints.join(' ')}
        />
        <circle fill="#fff" cx={x} cy={y - 9} r="12.5"/>
        <circle fill="#fff" cx={x} cy={y + 16.666} r="12.5"/>
        <rect fill="#fff" x={x - 12.5} y={y - 10} width="25" height="26"/>
      </g>
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