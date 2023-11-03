const prompt = document.querySelector('p');
const boardDisplay = document.getElementById('board');
const actionButton = document.querySelector('button');

let currentPlayer;
const board = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
const playerMarkers = {
  X: {
    marker: 'X',
    markerColor: '#622',
    markerBackgroundColor: '#c88'
  },
  O: {
    marker: 'O',
    markerColor: '#226',
    markerBackgroundColor: '#88c'
  }
}

boardDisplay.addEventListener('click', handleBoardClick);

function handleBoardClick(event) {
  if (event.target.tagName !== 'DIV') return;
  
  if (!event.target.textContent) {
    event.target.textContent = playerMarkers[currentPlayer].marker;
    event.target.style.color = playerMarkers[currentPlayer].markerColor;
    event.target.style.backgroundColor = playerMarkers[currentPlayer].markerBackgroundColor;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    prompt.textContent = `Player ‘${currentPlayer}’, make your move!`
  }
}

function init() {
  currentPlayer = 'X';
  prompt.textContent = 'Player ‘X’, make your move!';
}

init();
