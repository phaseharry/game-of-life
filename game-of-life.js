// Any live cell with two or three live neighbors lives on to the next generation.
// Any live cell with fewer than two live neighbors dies, as if caused by under-population.
// Any live cell with more than three live neighbors dies, as if by overcrowding.
// Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

/* 
  typical case to worry about (cell is at a location that has 8 cells around it)
  [0, 1, 0]
  [1, cell, 1]
  [0, 0, 1]
*/
/* Edge cases (cells in awkward sitations with less that 8 cells around it) 

  1) Cell is at the outer corner of the board
  [cell, 1] 
  [0, 1]

  2) Cell is at the top or bottom row of the table but not the edges
  [1, cell, 0]
  [0, 1, 1]

  3) Cell is at the beginning of a column or end but not near edge
  [0, 1]
  [cell, 1]
  [1, 0]

*/

class GameOfLife {
  constructor(height, width){
    this.height = height
    this.width = width
    this.board = this.makeBoard()

  }
  tick(){

  }
  makeBoard(){
    const board = []
    for(let i = 1; i <= this.height; i++){
      const row = []
      for(let j = 1; j <= this.width; j++){
        const neighbors = this.livingNeighbors(i, j)
        if(neighbors > 1 && neighbors <= 3){
          row.push(1)
        } else {
          row.push(0)
        }
      }
      board.push(row)
    }
    return board
  }
  livingNeighbors(row, col){ //checks the cells coordinates for all living neighbors near it to determine if current cell lives or dies

  }
  clearBoard(){
    const board = []
    for(let i = 1; i <= this.height; i++){
      const row = []
      for(let j = 1; j <= this.width; j++){
        row.push(0)
      }
      board.push(row)
    }
    this.board = board
  }
}