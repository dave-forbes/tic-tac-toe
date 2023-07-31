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
  player = activePlayer == 'X' ? 'Crosses' : 'Noughts'
  h1.textContent = `${player}' turn...`;
};

(function () {
  const cells = document.querySelectorAll('.game-cell');
  cells.forEach(button => button.addEventListener('click', () => {
    const cellIndex = button.getAttribute('id').slice(5);
    if (gameBoard[cellIndex - 1] !== '') return;
    gameBoard[cellIndex - 1] = activePlayer;
    switchActivePlayer();
    displayBoard();
    checkWinner();
  }))
})();


function checkWinner() {
  if (gameBoard[0] == gameBoard[1] && gameBoard[1] == gameBoard[2] && gameBoard[0] !== "") {
    displayWinner('#top-row');
  } else if (gameBoard[3] == gameBoard[4] && gameBoard[4] == gameBoard[5] && gameBoard[3] !== "") {
    displayWinner('#middle-row');
  } else if (gameBoard[6] == gameBoard[7] && gameBoard[7] == gameBoard[8] && gameBoard[6] !== "") {
    displayWinner('#bottom-row');
  } else if (gameBoard[0] == gameBoard[3] && gameBoard[3] == gameBoard[6] && gameBoard[0] !== "") {
    displayWinner('#left-column');
  } else if (gameBoard[1] == gameBoard[4] && gameBoard[4] == gameBoard[7] && gameBoard[1] !== "") {
    displayWinner('#middle-column');
  } else if (gameBoard[2] == gameBoard[5] && gameBoard[5] == gameBoard[8] && gameBoard[2] !== "") {
    displayWinner('#right-column');
  } else if (gameBoard[0] == gameBoard[4] && gameBoard[4] == gameBoard[8] && gameBoard[0] !== "") {
    displayWinner('#diagonal-1');
  } else if (gameBoard[2] == gameBoard[4] && gameBoard[4] == gameBoard[6] && gameBoard[2] !== "") {
    displayWinner('#diagonal-2');
  } else if (gameBoard.every(cell => cell !== '')) {
    const h1 = document.querySelector('h1');
    h1.textContent = `It's a tie!`;
    disableButtons();
  }
}

function displayWinner(id) {
  document.querySelector(id).style.display = 'block';
  switchActivePlayer();
  const h1 = document.querySelector('h1');
  winner = activePlayer == 'X' ? 'Crosses' : 'Noughts'
  h1.textContent = `${winner} win!`;
  disableButtons();
}

function disableButtons() {
  const cells = document.querySelectorAll('button.game-cell');
  cells.forEach(cell => cell.disabled = true);
}

const startAgain = document.querySelector('#start-again-button');
startAgain.addEventListener('click', () => location.reload());