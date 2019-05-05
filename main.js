let height = 20
let width = 20
const gol = new GameOfLife(height, width)

const tds = []

const table = document.createElement('tbody')
for(let i = 1; i <= height; i++){
  const row = document.createElement('tr')
  for(let j = 1; j <= width; j++){
    const cell = document.createElement('td')
    cell.dataset.row = i  //dataset property of an element allows up to put in data we need which we'll use when a user choose the starting nodes to start the game of life
    cell.dataset.col = j  //when they click a node, thier row and col positions will be set back up so we can change those to "alive"
    row.append(cell)
    tds.push(cell)
  }
  table.append(row)
}

const toggleAlive = element => {
  // console.log(element.dataset.row)
  // console.log(element.dataset.col) 
  element.classList.contains('alive')? gol.board[element.dataset.row - 1][element.dataset.col - 1] = 0 : gol.board[element.dataset.row - 1][element.dataset.col - 1] = 1
  element.classList.contains('alive')? element.classList.remove('alive') : element.classList.add('alive') 
}
document.getElementById('board').append(table)

document.getElementById('board').addEventListener('click', event => {
  if(event.srcElement.tagName === 'TD'){
    return toggleAlive(event.srcElement)
  }
})

document.getElementById('pause').addEventListener('click', event => {

})

document.getElementById('one-stop').addEventListener('click', event => {

})

document.getElementById('random').addEventListener('click', event => {

})

document.getElementById('clear').addEventListener('click', event => {
  for(let i = 0; i < tds.length; i++){
    const cell = tds[i]
    cell.classList.remove('alive')
  }
  gol.clearBoard()
})