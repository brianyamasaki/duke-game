export const commandPolyTop = [
  { x: -50, y: -50 },
  { x: 0, y: -50 },
  { x: -50, y: 0 }
];

export const commandPolyBottom = [
  { x: 50, y: 0 },
  { x: 50, y: 50 },
  { x: 0, y: 50 }
];

export const commandPolygons = (center, maxWidth) => {
  const ratio = maxWidth / 100;
  const points = commandPolyBottom.map(offset => 
    `${(center.x + offset.x) * ratio},${(center.y + offset.y) * ratio}`
  );
  const points2 = commandPolyTop.map(offset =>
    `${(center.x + offset.x) * ratio},${(center.y + offset.y) * ratio}`
  );
  return [points.join(' '), points2.join(' ')];
}