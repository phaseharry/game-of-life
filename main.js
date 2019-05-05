let height = 20
let width = 20
const gol = new GameOfLife(height, width)

const tds = []

const table = document.createElement('tbody')
for(let i = 0; i < height; i++){
  const row = document.createElement('tr')
  for(let j = 0; j < width; j++){
    const cell = document.createElement('td')
    cell.dataset.row = i  //dataset property of an element allows up to put in data we need which we'll use when a user choose the starting nodes to start the game of life
    cell.dataset.col = j  //when they click a node, thier row and col positions will be set back up so we can change those to "alive"
    row.append(cell)
    tds.push(cell)
  }
  table.append(row)
}

const toggleAlive = element => {
  element.classList.contains('alive')? gol.board[element.dataset.row ][element.dataset.col] = 0 : gol.board[element.dataset.row][element.dataset.col] = 1
}

const paint = () => {
  tds.forEach((td) => {
    const { row, col } = td.dataset
    if(gol.board[row][col]){
      td.classList.add('alive')
    } else {
      td.classList.remove('alive')
    }
  })
}

document.getElementById('board').append(table)

document.getElementById('board').addEventListener('click', event => {
  if(event.srcElement.tagName === 'TD'){
    toggleAlive(event.srcElement)
    paint()
  }
})

let interval;
document.getElementById('start').addEventListener('click', event => {
  if(!interval){
    interval = setInterval(() => {
      gol.tick()
      paint()
      let aliveCells = tds.some(cell => {
        return cell.classList.contains('alive')
      })
      if(!aliveCells){
        clearInterval(interval)
        interval = 0 
      }
    }, 100)
  } else {
    clearInterval(interval)
    interval = 0
  }
})

document.getElementById('one-stop').addEventListener('click', event => {
  gol.tick()
  paint()
})

document.getElementById('random').addEventListener('click', event => {
  gol.randomize()
  paint()
})

document.getElementById('clear').addEventListener('click', event => {
  gol.clearBoard()
  paint()
})