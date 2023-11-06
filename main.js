/*===== CONFIGURATION =====*/

const gameStateMessage = document.getElementById('game-state');
const board = document.getElementById('board');
const actionButton = document.querySelector('button');

// Necessary for CSS reset of board after a win;
const squares = document.querySelectorAll('#board div');
// See init() definition below

const players = {
  '0': {
    token: '',
    squareColor: 'darkgray'
  },
  '1': {
    token: 'X',
    tokenColor: '#622',
    squareColor: '#c88'
  },
  '-1': {
    token: 'O',
    tokenColor: '#226',
    squareColor: '#88c'
  }
};

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal wins
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical wins
  [0, 4, 8], [2, 4, 6]             // diagonal wins
];


/*===== MODEL =====*/

let currentPlayer, winner, currentBoard, winningCombination;


/*===== CONTROLLER =====*/

function handleBoardClick(event) {
  if (event.target.tagName !== 'DIV') return;
  if (!winner && !event.target.textContent) {
    const i = event.target.getAttribute('id');
    currentBoard[i] = currentPlayer;
    currentPlayer = -currentPlayer;
    winner = checkForWinner();
  }
  render();
}

function handleActionButtonClick() {
  init();
}

function checkForWinner() {
  for (const combination of winningCombinations) {
    const check = combination.map(i => currentBoard[i]);
    if (check.every(j => j === 1) || check.every(j => j === -1)) {
      winner = check[0];
      winningCombination = combination;
      break;
    }
  }
  return winner || null;
}


/*===== VIEW =====*/

board.addEventListener('click', handleBoardClick);
actionButton.addEventListener('click', handleActionButtonClick);


/*===== UTILITY FUNCTIONS =====*/

function init() {
  currentPlayer = 1;
  winner = null;
  winningCombination = null;
  gameStateMessage.textContent = `Player ‘${players[currentPlayer].token}’, make your move!`;
  currentBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  
  /*
  There has to be a better way to reset the board CSS when using 
  actionButton to reset the game after a win, but this solution (below)
  is the best I could come up with.
  */
  board.style.backgroundColor = 'white';
  squares.forEach(square => {
    square.style.opacity = '1';
    square.style.boxShadow = 'none';
  });

  render();
}

function render() {
  renderGameStateMessage();
  renderBoard();
  if (winner) renderWinningBoard(winningCombination);
  renderActionButton();
}

function renderGameStateMessage() {
  if (winner) {
    gameStateMessage.textContent = `Player ‘${players[winner].token}’ wins!`;
  } else if (currentBoard.indexOf(0) === -1) {
    gameStateMessage.textContent = 'Cat’s game! It’s a tie!';
  } else {
    gameStateMessage.textContent = `Player ‘${players[currentPlayer].token}’, make your move!`;
  }
}

function renderBoard() {
  currentBoard.forEach((val, i) => {
    const square = document.getElementById(i);
    square.textContent = players[val].token;
    square.style.color = players[val].tokenColor;
    square.style.backgroundColor = players[val].squareColor;
  });
}

function renderActionButton() {
  !winner && currentBoard.every(i => i === 0) ?
    actionButton.setAttribute('disabled', '') :
    actionButton.removeAttribute('disabled');
  actionButton.textContent =
    !winner && currentBoard.indexOf(0) !== -1 ? 'RESET GAME' : 'PLAY AGAIN';
}

function renderWinningBoard(combination) {
  board.style.backgroundColor = 'darkgray';
  currentBoard.forEach((val, i) => {
    const square = document.getElementById(i);
    if (!combination.includes(i)) {
      square.style.backgroundColor = 'lightgray';
      square.style.opacity = '0.3';
    } else {
      square.style.backgroundColor = 'white';
      square.style.boxShadow = '0 0 1.5vmin gold';
    }
  });
}


/*===== GAME LOOP =====*/

init();
