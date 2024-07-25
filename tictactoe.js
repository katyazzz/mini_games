let gameMode = '';
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

function startGame(mode) {
    gameMode = mode;
    document.getElementById('mode-selection').style.display = 'none';
    document.getElementById('game-area').style.display = 'block';
    renderBoard();
}

function renderBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => handleCellClick(index));
        boardElement.appendChild(cellElement);
    });
}

function handleCellClick(index) {
    if (board[index] !== '' || !isGameActive) return;
    board[index] = currentPlayer;
    renderBoard();
    checkResult();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (gameMode === 'bot' && currentPlayer === 'O' && isGameActive) {
        setTimeout(botMove, 500);
    }
}

function botMove() {
    const emptyCells = board.map((cell, index) => (cell === '' ? index : null)).filter(index => index !== null);
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomIndex] = 'O';
    renderBoard();
    checkResult();
    currentPlayer = 'X';
}

function checkResult() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];
    let winner = null;
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winner = board[a];
            break;
        }
    }
    if (winner) {
        isGameActive = false;
        document.getElementById('result-text').textContent = `${winner} выиграл!`;
        document.getElementById('result').style.display = 'block';
    } else if (!board.includes('')) {
        isGameActive = false;
        document.getElementById('result-text').textContent = 'Ничья!';
        document.getElementById('result').style.display = 'block';
    }
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameActive = true;
    document.getElementById('result').style.display = 'none';
    renderBoard();
}

function navigateToHome() {
    window.location.href = 'index.html';
}
