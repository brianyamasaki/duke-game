// offsets for an icon of 100x100 when passed in a midpoint
const strikePolyPoints = [
  { x: -10, y: -17.32 },
  { x: 0, y: -40 },
  { x: 10, y: -17.32 },
  { x: 34.641, y: -20 },
  { x: 20, y: 0 },
  { x: 34.641, y: 20},
  { x: 10, y: 17.32 },
  { x: 0, y: 40 },
  { x: -10, y: 17.32 },
  { x: -34.641, y: 20 },
  { x: -20, y: 0 },
  { x: -34.641, y: -20 }
];

export const strikeIconPoints = (center, maxWidth) => {
  const ratio = maxWidth / 100;
  const points = strikePolyPoints.map(offset => (
    `${(center.x + offset.x) * ratio},${(center.y + offset.y) * ratio}`
  ));
  return points.join(' ');
}
