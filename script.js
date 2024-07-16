let gameMode = '';
let player1Move = '';
let player2Move = '';

function navigateToGame(game) {
    window.location.href = game;
}

function navigateToHome() {
    window.location.href = 'index.html';
}

function startGame(mode) {
    gameMode = mode;
    document.getElementById('mode-selection').style.display = 'none';
    document.getElementById('game-area').style.display = 'block';
    document.getElementById('player1-area').style.display = 'block';
    if (gameMode === 'bot') {
        document.getElementById('player2-area').style.display = 'none';
    }
}

function makeMove(move) {
    if (gameMode === 'friend') {
        if (!player1Move) {
            player1Move = move;
            document.getElementById('player1-area').style.display = 'none';
            document.getElementById('player2-area').style.display = 'block';
        } else {
            player2Move = move;
            determineWinner();
        }
    } else if (gameMode === 'bot') {
        player1Move = move;
        player2Move = getBotMove();
        determineWinner();
    }
}

function getBotMove() {
    const moves = ['rock', 'scissors', 'paper'];
    const randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
}

function determineWinner() {
    document.getElementById('game-area').style.display = 'none';
    document.getElementById('result').style.display = 'block';

    const resultText = document.getElementById('result-text');
    const movesText = `Игрок 1 выбрал: ${translateMove(player1Move)}. Игрок 2 выбрал: ${translateMove(player2Move)}.`;
    document.getElementById('moves').textContent = movesText;

    if (player1Move === player2Move) {
        resultText.textContent = 'Ничья!';
    } else if (
        (player1Move === 'rock' && player2Move === 'scissors') ||
        (player1Move === 'scissors' && player2Move === 'paper') ||
        (player1Move === 'paper' && player2Move === 'rock')
    ) {
        resultText.textContent = `Игрок 1 выиграл! ${translateMove(player1Move)} побеждает ${translateMove(player2Move)}.`;
    } else {
        resultText.textContent = `Игрок 2 выиграл! ${translateMove(player2Move)} побеждает ${translateMove(player1Move)}.`;
    }
}

function translateMove(move) {
    if (move === 'rock') return 'Камень';
    if (move === 'scissors') return 'Ножницы';
    if (move === 'paper') return 'Бумага';
}

function restartGame() {
    gameMode = '';
    player1Move = '';
    player2Move = '';
    document.getElementById('mode-selection').style.display = 'block';
    document.getElementById('game-area').style.display = 'none';
    document.getElementById('result').style.display = 'none';
}
