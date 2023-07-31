const playerOne = 'X';
const playerTwo = 'O';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let activePlayer = 'X';


function displayBoard() {
  const cells = document.querySelectorAll('div.game-cell');
  cells.forEach(cell => cell.innerHTML = '');
  gameBoard.forEach((item, index) => {
    const cell = document.querySelector(`#cell-${index + 1}`);
    const button = document.createElement('button');
    button.innerHTML = item;
    cell.appendChild(button);
  })
};

function switchActivePlayer() {
  activePlayer = activePlayer == 'X' ? 'O' : 'X';
  console.log(`${activePlayer} turn`);
}

const cells = document.querySelectorAll('div.game-cell');

cells.forEach(div => div.addEventListener('click', () => {
  const cellIndex = div.getAttribute('id').slice(5);
  console.log(cellIndex);
  console.log(activePlayer);
  gameBoard[cellIndex - 1] = activePlayer;
  console.log(gameBoard);
  switchActivePlayer();
  displayBoard();
}))
