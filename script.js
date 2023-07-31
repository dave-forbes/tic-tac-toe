const playerOne = 'X';
const playerTwo = 'O';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let activePlayer = 'X';


function displayBoard() {
  const cells = document.querySelectorAll('div.game-cell');
  cells.forEach(cell => cell.innerHTML = '');
  gameBoard.forEach((item, index) => {
    const cell = document.querySelector(`#cell-${index + 1}`);
    cell.textContent = item;
  })
};

function switchActivePlayer() {
  activePlayer = activePlayer == 'X' ? 'O' : 'X';
  const h1 = document.querySelector('h1');
  h1.textContent = `${activePlayer} turn`;
};

switchActivePlayer();

const cells = document.querySelectorAll('.game-cell');

cells.forEach(button => button.addEventListener('click', () => {
  const cellIndex = button.getAttribute('id').slice(5);
  console.log(cellIndex);
  console.log(activePlayer);
  gameBoard[cellIndex - 1] = activePlayer;
  console.table(gameBoard);
  switchActivePlayer();
  displayBoard();
  checkWinner();
}))

function checkWinner() {
  if (gameBoard[0] == gameBoard[1] && gameBoard[1] == gameBoard[2] && gameBoard[0] !== "") {
    displayWinner();
  } else if (gameBoard[3] == gameBoard[4] && gameBoard[4] == gameBoard[5] && gameBoard[3] !== "") {
    displayWinner();
  } else if (gameBoard[6] == gameBoard[7] && gameBoard[7] == gameBoard[8] && gameBoard[6] !== "") {
    displayWinner();
  } else if (gameBoard[0] == gameBoard[3] && gameBoard[3] == gameBoard[6] && gameBoard[0] !== "") {
    displayWinner();
  } else if (gameBoard[1] == gameBoard[4] && gameBoard[4] == gameBoard[7] && gameBoard[1] !== "") {
    displayWinner();
  } else if (gameBoard[2] == gameBoard[5] && gameBoard[5] == gameBoard[8] && gameBoard[2] !== "") {
    displayWinner();
  } else if (gameBoard[0] == gameBoard[4] && gameBoard[4] == gameBoard[8] && gameBoard[0] !== "") {
    displayWinner();
  } else if (gameBoard[2] == gameBoard[4] && gameBoard[4] == gameBoard[6] && gameBoard[2] !== "") {
    displayWinner();
  }
}

function displayWinner() {
  switchActivePlayer();
  const h1 = document.querySelector('h1');
  h1.textContent = `${activePlayer} won`;
  const cells = document.querySelectorAll('button.game-cell');
  cells.forEach(cell => cell.disabled = true);
}