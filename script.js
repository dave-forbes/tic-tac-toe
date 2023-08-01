let gameBoard = ['', '', '', '', '', '', '', '', ''];
let activePlayer = 'X';


function displayBoard() {
  const cells = document.querySelectorAll('.game-cell');
  cells.forEach(cell => cell.innerHTML = '');
  gameBoard.forEach((item, index) => {
    const cell = document.querySelector(`#cell-${index + 1}`);
    cell.textContent = item;
  })
};

function switchActivePlayer() {
  activePlayer = activePlayer == 'X' ? 'O' : 'X';
  const h2 = document.querySelector('h2');
  player = activePlayer == 'X' ? 'Crosses' : 'Noughts'
  h2.textContent = `${player}' turn...`;
};

(function selectCell() {
  document.querySelector('#game-grid').addEventListener('click', click);

  function click(e) {
    const buttonId = e.target.getAttribute('id').slice(5);
    makePlayerChoice(buttonId);
  }
})();

function makePlayerChoice(cellIndex) {
  if (gameBoard[cellIndex - 1] !== '') return;
  gameBoard[cellIndex - 1] = activePlayer;
  switchActivePlayer();
  displayBoard();
  checkWinner();
}


function checkWinner() {
  if (gameBoard[0] == gameBoard[1] && gameBoard[1] == gameBoard[2] && gameBoard[0] !== "") {
    displayWinner('.top-row');
  } else if (gameBoard[3] == gameBoard[4] && gameBoard[4] == gameBoard[5] && gameBoard[3] !== "") {
    displayWinner('.middle-row');
  } else if (gameBoard[6] == gameBoard[7] && gameBoard[7] == gameBoard[8] && gameBoard[6] !== "") {
    displayWinner('.bottom-row');
  } else if (gameBoard[0] == gameBoard[3] && gameBoard[3] == gameBoard[6] && gameBoard[0] !== "") {
    displayWinner('.left-column');
  } else if (gameBoard[1] == gameBoard[4] && gameBoard[4] == gameBoard[7] && gameBoard[1] !== "") {
    displayWinner('.middle-column');
  } else if (gameBoard[2] == gameBoard[5] && gameBoard[5] == gameBoard[8] && gameBoard[2] !== "") {
    displayWinner('.right-column');
  } else if (gameBoard[0] == gameBoard[4] && gameBoard[4] == gameBoard[8] && gameBoard[0] !== "") {
    displayWinner('.diagonal-1');
  } else if (gameBoard[2] == gameBoard[4] && gameBoard[4] == gameBoard[6] && gameBoard[2] !== "") {
    displayWinner('.diagonal-2');
  } else if (gameBoard.every(cell => cell !== '')) {
    const h2 = document.querySelector('h2');
    h2.textContent = `It's a tie!`;
    disableButtons();
  }
}

function displayWinner(buttonClass) {
  const buttons = document.querySelectorAll(`button${buttonClass}`);
  buttons.forEach(button => button.style.backgroundColor = 'rgb(238, 126, 126)');
  switchActivePlayer();
  const h2 = document.querySelector('h2');
  winner = activePlayer == 'X' ? 'Crosses' : 'Noughts'
  h2.textContent = `${winner} win!`;
  disableButtons();
}

function disableButtons() {
  const cells = document.querySelectorAll('button.game-cell');
  cells.forEach(cell => cell.disabled = true);
}

(function startAgain() {
  const startAgainButton = document.querySelector('#start-again-button');
  startAgainButton.addEventListener('click', () => location.reload())
})();

