export const footmanMoves = {
  type: 'footman',
  odd: {
    move: [
      { row: -1, col: 0 },
      { row: 1, col: 0 },
      { row: 0, col: -1 },
      { row: 0, col: 1 }
    ]
  }, 
  even: {
    move: [
      { row: -2,col: 0 },
      { row: -1, col: -1 },
      { row: -1, col: 1 },
      { row: 1, col: -1 },
      { row: 1, col: 1 }
    ]
  }
}