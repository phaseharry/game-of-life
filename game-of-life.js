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
    const newBoard = this.makeBoard()
    this.board.forEach((row, rowIdx) => {
      const newRow = row.reduce((newRow, cell, colIdx) => {
        newRow.push(this.cellCheck(cell, rowIdx, colIdx))
        return newRow
      }, [])
      newBoard[rowIdx] = newRow
    })
    this.board = newBoard
  }
  makeBoard(){
    const board = []
    for(let i = 0; i < this.height; i++){
      const row = []
      for(let j = 0; j < this.width; j++){
       row.push(0)
      }
      board.push(row)
    }
    return board
  }
  existOrNot(row, col){
    if(!this.board[row]){ //if you get an element out of a row that's non existent then an error will be thrown
      return;             //so return nothing so our checking condition will work
    } else {
      return this.board[row][col] //if the column doesn't exist no error would be thrown only a returned value of undefined which we could *1 to check if it's a number or NaN
    }
  }
  livingNeighbors(row, col){ //checks the cells coordinates for all living neighbors near it to determine if current cell lives or dies
    const neighbors = [
      [row + 1, col - 1],
      [row + 1, col],
      [row + 1, col + 1],
      [row, col - 1],
      [row, col + 1],
      [row - 1, col - 1],
      [row - 1, col],
      [row - 1, col + 1]
    ]
    return neighbors.reduce((neighbors, position) => {
      if(this.existOrNot(position[0], position[1])*1 === 1){
        neighbors++
      }
      return neighbors
    }, 0)
  }
  cellCheck(alive, row, col){
    let neighbors = 0
    if(alive){
      neighbors = this.livingNeighbors(row, col)
      return neighbors > 1 && neighbors <= 3? 1 : 0
    } else {
      neighbors = this.livingNeighbors(row, col)
      return neighbors === 3? 1 : 0
    }
  }
  randomize(){
    this.board = this.board.reduce((board, row) => {
      for(let i = 0; i < row.length; i++){
        row[i] = Math.round(Math.random())
      }
      board.push(row)
      return board
    }, [])
  }
  clearBoard(){
    this.board = this.makeBoard()
  }
}