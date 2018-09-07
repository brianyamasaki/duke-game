import React from 'react';
import {
  SLIDE_UP,
  SLIDE_DOWN,
  SLIDE_LEFT,
  SLIDE_RIGHT,
  SLIDE_DIAG_UP_LEFT,
  SLIDE_DIAG_UP_RIGHT,
  SLIDE_DIAG_DOWN_LEFT,
  SLIDE_DIAG_DOWN_RIGHT,
  JUMPSLIDE_UP,
  JUMPSLIDE_DOWN,
  JUMPSLIDE_LEFT,
  JUMPSLIDE_RIGHT,
  JUMPSLIDE_DIAG_UP_LEFT,
  JUMPSLIDE_DIAG_UP_RIGHT,
  JUMPSLIDE_DIAG_DOWN_LEFT,
  JUMPSLIDE_DIAG_DOWN_RIGHT
} from '../cards/cardConstants';

const SlideIcon = ({ center, maxWidth, slideType }) => {
  const halfWidth = maxWidth / 2;
  const xMin = center.x - halfWidth;
  const yMin = center.y - halfWidth;
  const polyOffsets = mpSlideArrows[slideType];
  const points = polyOffsets.map(offset => 
    `${xMin + maxWidth * offset.x},${yMin + maxWidth * offset.y}`
  );

  return (
    <polygon
      key={1}
      fill="#000"
      points={points}
    />
  )
}

const JumpSlideIcon = ({ center, maxWidth, slideType }) => {
  const halfWidth = maxWidth / 2;
  const xMin = center.x - halfWidth;
  const yMin = center.y - halfWidth;
  const polyOffsets = mpSlideArrows[slideType];
  const points = polyOffsets.map(offset => 
    `${xMin + maxWidth * offset.x},${yMin + maxWidth * offset.y}`
  );

  return (
    <polygon
      key={1}
      fill="none"
      stroke="#000"
      strokeWidth={maxWidth / 12}
      points={points}
    />
  )
}

const downArrow = [
  { x: 0.15, y: 0.2 },
  { x: 0.85, y: 0.2 },
  { x: 0.5, y: 0.8 }
];

const upArrow = [
  { x: 0.5, y: 0.2 },
  { x: 0.85, y: 0.8 },
  { x: 0.15, y: 0.8 }
];

const leftArrow = [
  { x: 0.2, y: 0.5 },
  { x: 0.8, y: 0.15 },
  { x: 0.8, y: 0.85 }
];

const rightArrow = [
  { x: 0.2, y: 0.15 },
  { x: 0.8, y: 0.5 },
  { x: 0.2, y: 0.85 }
];

const upLeftArrow = [
  { x: 0.29, y: 0.21 },
  { x: 0.88, y: 0.4 },
  { x: 0.42, y: 0.86 }
];

const upRightArrow = [
  { x: 0.79, y: 0.22 },
  { x: 0.6, y: 0.87 },
  { x: 0.14, y: 0.42 }
];

const downLeftArrow = [
  { x: 0.43, y: 0.14 },
  { x: 0.88, y: 0.59 },
  { x: 0.23, y: 0.79 }
];

const downRightArrow = [
  { x: 0.59, y: 0.15 },
  { x: 0.79, y: 0.8 },
  { x: 0.14, y: 0.6 }
];

const mpSlideArrows = {
  [SLIDE_UP]: upArrow,
  [SLIDE_DOWN]: downArrow,
  [SLIDE_LEFT]: leftArrow,
  [SLIDE_RIGHT]: rightArrow,
  [SLIDE_DIAG_UP_LEFT]: upLeftArrow,
  [SLIDE_DIAG_UP_RIGHT]: upRightArrow,
  [SLIDE_DIAG_DOWN_LEFT]: downLeftArrow,
  [SLIDE_DIAG_DOWN_RIGHT]: downRightArrow,
  [JUMPSLIDE_UP]: upArrow,
  [JUMPSLIDE_DOWN]: downArrow,
  [JUMPSLIDE_LEFT]: leftArrow,
  [JUMPSLIDE_RIGHT]: rightArrow,
  [JUMPSLIDE_DIAG_UP_LEFT]: upLeftArrow,
  [JUMPSLIDE_DIAG_UP_RIGHT]: upRightArrow,
  [JUMPSLIDE_DIAG_DOWN_LEFT]: downLeftArrow,
  [JUMPSLIDE_DIAG_DOWN_RIGHT]: downRightArrow
}

export { SlideIcon, JumpSlideIcon };