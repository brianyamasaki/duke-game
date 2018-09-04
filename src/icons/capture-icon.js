import React from 'react';

const CaptureIcon = ({ center, maxWidth}) => {
  const radius = Math.floor(maxWidth * 0.4);
  return (
    <g 
      fill="none" 
      stroke="#C40000" 
      strokeWidth={Math.floor(maxWidth / 12)} 
      strokeMiterlimit="10" 
      strokeOpacity="0.6"
    >
      <circle 
        cx={center.x} 
        cy={center.y} 
        r={radius}
      />
      <line 
        x1={center.x - radius} 
        y1={center.y} 
        x2={center.x + radius} 
        y2={center.y} 
      />
      <line 
        x1={center.x} 
        y1={center.y - radius} 
        x2={center.x} 
        y2={center.y + radius} 
      />
    </g>
  )
}

export { CaptureIcon };