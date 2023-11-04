/*===== CONFIGURATION =====*/

const gameStateMessage = document.getElementById('game-state');
const board = document.getElementById('board');
const actionButton = document.querySelector('button');

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


/*===== MODEL =====*/

let currentPlayer, winner, currentBoard;


/*===== CONTROLLER =====*/

function handleBoardClick(event) {
  if (event.target.tagName !== 'DIV') return;
  if (!event.target.textContent) {
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

}


/*===== VIEW =====*/

board.addEventListener('click', handleBoardClick);
actionButton.addEventListener('click', handleActionButtonClick);


/*===== UTILITY FUNCTIONS =====*/

function init() {
  currentPlayer = 1;
  gameStateMessage.textContent = `Player ‘${players[currentPlayer].token}’, make your move!`;
  currentBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  render();
}

function render() {
  renderGameStateMessage();
  renderBoard();
  renderActionButton();
}

function renderGameStateMessage() {
  gameStateMessage.textContent = `Player ‘${players[currentPlayer].token}’, make your move!`;
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
  actionButton.textContent = !winner ? 'RESET GAME' : 'PLAY AGAIN';
}


/*===== GAME LOOP =====*/

init();
