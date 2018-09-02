import React from 'react';

const commandPolyTop = [
  { x: 0, y: 0 },
  { x: 0.5, y: 0 },
  { x: 0, y: 0.5 }
];

const commandPolyBottom = [
  { x: 1.0, y: 0.5 },
  { x: 1.0, y: 1.0 },
  { x: 0.5, y: 1.0 }
];

const CommandIcon = ({ center, maxWidth }) => {
  const halfWidth = maxWidth / 2;
  const xMin = center.x - halfWidth;
  const yMin = center.y - halfWidth;
  const points = commandPolyBottom.map(offset => 
    `${xMin + maxWidth * offset.x},${yMin + maxWidth * offset.y}`
  );
  const points2 = commandPolyTop.map(offset => 
    `${xMin + maxWidth * offset.x},${yMin + maxWidth * offset.y}`
  );

  return (
    <g>
      <polygon
        fill="#000"
        fillOpacity="0.6"
        points={points}
      />
      <polygon
        fill="000"
        fillOpacity="0.6"
        points={points2}
      />
    </g>
  )
}

export default CommandIcon;