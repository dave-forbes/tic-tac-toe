let playerOne;
let playerTwo;
let Ai;
const game = GameController();

(function startGame() {
  const startGameButton = document.querySelector('#start-game-button');
  const form = document.querySelector('form');
  const gameGrid = document.querySelector('#game-grid');
  const h2 = document.querySelector('h2');
  const startAgainButton = document.querySelector('#start-again-button');
  startGameButton.addEventListener('click', () => {
    if (document.querySelector('#player1').value == '' || document.querySelector('#player2').value == '') {
      return document.querySelector('#error').style.display = 'block';
    } else {
      document.querySelector('#error').style.display = 'none';
      playerOne = document.querySelector('#player1').value;
      playerTwo = document.querySelector('#player2').value;
      if (document.querySelector('#yes').checked == true) {
        Ai = true;
        playerTwo = 'AI ' + playerTwo;
      }
      h2.textContent = `${playerOne}'s turn...`;
      form.style.display = 'none';
      gameGrid.style.display = 'grid'
      h2.style.display = 'block';
      startAgainButton.style.display = 'block';
    }
  });
})();

function GameController() {

  let gameBoard = ['', '', '', '', '', '', '', '', ''];
  let activePlayer = 'X';
  let endGame = false;

  const displayBoard = () => {
    const cells = document.querySelectorAll('.game-cell');
    cells.forEach(cell => cell.innerHTML = '');
    gameBoard.forEach((item, index) => {
      const cell = document.querySelector(`#cell-${index + 1}`);
      cell.textContent = item;
    })
  };

  const makePlayerChoice = (cellIndex) => {
    if (gameBoard[cellIndex - 1] !== '') return;
    gameBoard[cellIndex - 1] = activePlayer;
    switchActivePlayer();
    displayBoard();
    checkWinner();
    if (endGame == true) return;
    if (Ai == true) {
      makeAiChoice();
    }
  }

  const makeAiChoice = () => {
    let choice;
    if (gameBoard[1] == gameBoard[2] && gameBoard[1] == 'X' || gameBoard[3] == gameBoard[6] && gameBoard[3] == 'X' || gameBoard[4] == gameBoard[8] && gameBoard[4] == 'X') {
      choice = 0;
    } else if (gameBoard[0] == gameBoard[2] && gameBoard[0] == 'X' || gameBoard[4] == gameBoard[7] && gameBoard[4] == 'X') {
      choice = 1;
    } else if (gameBoard[0] == gameBoard[1] && gameBoard[0] == 'X' || gameBoard[8] == gameBoard[5] && gameBoard[8] == 'X' || gameBoard[6] == gameBoard[4] && gameBoard[6] == 'X') {
      choice = 2;
    } else if (gameBoard[0] == gameBoard[6] && gameBoard[0] == 'X' || gameBoard[4] == gameBoard[5] && gameBoard[4] == 'X') {
      choice = 3;
    } else if (gameBoard[0] == gameBoard[8] && gameBoard[0] == 'X' || gameBoard[2] == gameBoard[6] && gameBoard[2] == 'X' || gameBoard[1] == gameBoard[7] && gameBoard[1] == 'X' || gameBoard[3] == gameBoard[5] && gameBoard[3] == 'X') {
      choice = 4;
    } else if (gameBoard[2] == gameBoard[8] && gameBoard[2] == 'X' || gameBoard[3] == gameBoard[4] && gameBoard[3] == 'X') {
      choice = 5;
    } else if (gameBoard[0] == gameBoard[3] && gameBoard[0] == 'X' || gameBoard[7] == gameBoard[8] && gameBoard[7] == 'X' || gameBoard[2] == gameBoard[4] && gameBoard[2] == 'X') {
      choice = 6;
    } else if (gameBoard[6] == gameBoard[8] && gameBoard[6] == 'X' || gameBoard[1] == gameBoard[4] && gameBoard[1] == 'X') {
      choice = 7;
    } else if (gameBoard[6] == gameBoard[7] && gameBoard[6] == 'X' || gameBoard[2] == gameBoard[5] && gameBoard[2] == 'X' || gameBoard[0] == gameBoard[4] && gameBoard[0] == 'X') {
      choice = 8;
    } else {
      choice = Math.floor(Math.random() * 9);
    }
    console.log(choice);
    if (gameBoard[choice] !== '') { choice = gameBoard.findLastIndex(item => item == ''); }
    gameBoard[choice] = 'O';
    switchActivePlayer();
    displayBoard();
    checkWinner();
    console.log(gameBoard);
    console.log(activePlayer);
  }

  const switchActivePlayer = () => {
    activePlayer = activePlayer == 'X' ? 'O' : 'X';
    const h2 = document.querySelector('h2');
    player = activePlayer == 'X' ? `${playerOne}` : `${playerTwo}`;
    h2.textContent = `${player}'s turn...`;
  };

  const checkWinner = () => {
    if (gameBoard.every(cell => cell == '')) return;
    if (gameBoard[0] == gameBoard[1] && gameBoard[1] == gameBoard[2] && gameBoard[0]) {
      displayWinner('.top-row');
    } else if (gameBoard[3] == gameBoard[4] && gameBoard[4] == gameBoard[5] && gameBoard[3]) {
      displayWinner('.middle-row');
    } else if (gameBoard[6] == gameBoard[7] && gameBoard[7] == gameBoard[8] && gameBoard[6]) {
      displayWinner('.bottom-row');
    } else if (gameBoard[0] == gameBoard[3] && gameBoard[3] == gameBoard[6] && gameBoard[0]) {
      displayWinner('.left-column');
    } else if (gameBoard[1] == gameBoard[4] && gameBoard[4] == gameBoard[7] && gameBoard[1]) {
      displayWinner('.middle-column');
    } else if (gameBoard[2] == gameBoard[5] && gameBoard[5] == gameBoard[8] && gameBoard[2]) {
      displayWinner('.right-column');
    } else if (gameBoard[0] == gameBoard[4] && gameBoard[4] == gameBoard[8] && gameBoard[0]) {
      displayWinner('.diagonal-1');
    } else if (gameBoard[2] == gameBoard[4] && gameBoard[4] == gameBoard[6] && gameBoard[2]) {
      displayWinner('.diagonal-2');
    } else if (gameBoard.every(cell => cell !== '')) {
      const h2 = document.querySelector('h2');
      const startAgain = document.querySelector('#start-again-button');
      h2.textContent = `It's a tie!`;
      startAgain.classList.add('red');
      disableButtons();
      endGame = true;
    }
  }

  const displayWinner = (buttonClass) => {
    const buttons = document.querySelectorAll(`button${buttonClass}`);
    buttons.forEach(button => button.style.backgroundColor = 'rgb(238, 126, 126)');
    const startAgain = document.querySelector('#start-again-button');
    startAgain.classList.add('red');
    switchActivePlayer();
    const h2 = document.querySelector('h2');
    winner = activePlayer == 'X' ? `${playerOne}` : `${playerTwo}`;
    h2.textContent = `${winner} wins!`;
    disableButtons();
    endGame = true;
  }

  const disableButtons = () => {
    const cells = document.querySelectorAll('button.game-cell');
    cells.forEach(cell => cell.disabled = true);
  }

  const reload = () => { location.reload() };

  return { makePlayerChoice, reload };
}


(function selectCell() {
  const gameGrid = document.querySelector('#game-grid');
  gameGrid.addEventListener('click', (event) => {
    const buttonId = event.target.getAttribute('id').slice(5);
    game.makePlayerChoice(buttonId);
  });
})();

(function startAgain() {
  const startAgainButton = document.querySelector('#start-again-button');
  startAgainButton.addEventListener('click', () => { game.reload() })
})();


