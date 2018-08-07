export const seerMoves = {
  type: 'seer',
  odd: {
    move: [
      { row: -1, col: -1},
      { row: -1, col: 1},
      { row: 1, col: -1},
      { row: 1, col: 1}
    ],
    jump: [
      { row: -2, col: 0 }, 
      { row: 0, col: -2 }, 
      { row: 0, col: 2 }, 
      { row: 2, col: 0 }
    ]
  },
  even: {
    move: [
      { row: -1, col: 0 },
      { row: 1, col: 1},
      { row: 0, col: -1 },
      { row: 0, col: 1}
    ],
    jump: [
      { row: -2, col: -2 },
      { row: -2, col: 2 },
      { row: 2, col: -2 },
      { row: 2, col: 2 }
    ]
  }
};