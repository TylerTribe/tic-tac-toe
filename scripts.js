var currentPlayer = "X";
var gameEnded = false;
var difficulty = "random"; // "random" or "unbeatable"

// Array to store the game board state"
/*
Game Board Positions:

  0,0 | 0,1 | 0,2
 -----+-----+-----
  1,0 | 1,1 | 1,2       This visual representation will be how we can check for winners.
 -----+-----+-----      For example, a game where board[0][0] && board[1][1] && board[2][2] will represent a winner using diagonal top left to bottom right.
  2,0 | 2,1 | 2,2

  */

var board = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];

// Function to handle square click events
function handleSquareClick() {
  if (gameEnded || this.textContent !== "") {
    return;
  }

  var rowIndex = this.dataset.row;
  var colIndex = this.dataset.col;

  board[rowIndex][colIndex] = currentPlayer;
  this.textContent = currentPlayer;

  var winner = checkForWinner();
  if (winner) {
    announceResult(winner);
    gameEnded = true;
  } else if (checkForDraw()) {
    announceResult("draw");
    gameEnded = true;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (currentPlayer === "O") {
      makeComputerMove();
    }
  }
}

// Function to check for a winner
function checkForWinner() {
  for (var i = 0; i < 3; i++) {
    if (
      board[i][0] !== 0 &&
      board[i][0] === board[i][1] &&
      board[i][0] === board[i][2]
    ) {
      return board[i][0];
    }
  }

  for (var j = 0; j < 3; j++) {
    if (
      board[0][j] !== 0 &&
      board[0][j] === board[1][j] &&
      board[0][j] === board[2][j]
    ) {
      return board[0][j];
    }
  }

  if (
    (board[0][0] !== 0 &&
      board[0][0] === board[1][1] &&
      board[0][0] === board[2][2]) ||
    (board[0][2] !== 0 && board[0][2] === board[1][1] && board[0][2] === board[2][0])
  ) {
    return board[1][1];
  }

  return null;
}

// Function to check for a draw
function checkForDraw() {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (board[i][j] === 0) {
        return false;
      }
    }
  }
  return true;
}

// Function to announce the result
function announceResult(result) {
  if (result === "draw") {
    if (confirm("It's a draw! Do you want to restart the game?")) {
      restartGame();
    }
  } else {
    if (confirm("Player " + result + " wins! Do you want to restart the game?")) {
      restartGame();
    }
  }
}

// Function to handle the difficulty toggle
function toggleDifficulty() {
  if (difficulty === "random") {
    difficulty = "unbeatable";
  } else if (difficulty === "unbeatable") {
    difficulty = "random";
  }
}

// Function to handle the button click event
function handleToggleClick() {
  toggleDifficulty();
  restartGame();
}

// Function to make a random computer move
function makeComputerMoveRandom() {
  var availableSquares = [];

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (board[i][j] === 0) {
        availableSquares.push({ row: i, col: j });
      }
    }
  }

  if (availableSquares.length > 0) {
    var randomIndex = Math.floor(Math.random() * availableSquares.length);
    var randomSquare = availableSquares[randomIndex];

    board[randomSquare.row][randomSquare.col] = currentPlayer;
    var square = document.querySelector(
      '.square[data-row="' + randomSquare.row + '"][data-col="' + randomSquare.col + '"]'
    );
    square.textContent = currentPlayer;

    var winner = checkForWinner();
    if (winner) {
      announceResult(winner);
      gameEnded = true;
    } else if (checkForDraw()) {
      announceResult("draw");
      gameEnded = true;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
}

// Function to make an unbeatable computer move
function makeComputerMoveUnbeatable() {
  var bestMove = findBestMove();

  board[bestMove.row][bestMove.col] = currentPlayer;
  var square = document.querySelector(
    '.square[data-row="' + bestMove.row + '"][data-col="' + bestMove.col + '"]'
  );
  square.textContent = currentPlayer;

  var winner = checkForWinner();
  if (winner) {
    announceResult(winner);
    gameEnded = true;
  } else if (checkForDraw()) {
    announceResult("draw");
    gameEnded = true;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

// Function to find the best move using the minimax algorithm
function findBestMove() {
  var bestScore = -Infinity;
  var bestMove;

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (board[i][j] === 0) {
        board[i][j] = currentPlayer;
        var score = minimax(board, 0, false);
        board[i][j] = 0;

        if (score > bestScore) {
          bestScore = score;
          bestMove = { row: i, col: j };
        }
      }
    }
  }

  return bestMove;
}

// Function to calculate the minimax score
function minimax(board, depth, isMaximizing) {
  var winner = checkForWinner();

  if (winner === "X") {
    return -1;
  } else if (winner === "O") {
    return 1;
  } else if (checkForDraw()) {
    return 0;
  }

  if (isMaximizing) {
    var bestScore = -Infinity;

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (board[i][j] === 0) {
          board[i][j] = currentPlayer;
          var score = minimax(board, depth + 1, false);
          board[i][j] = 0;

          bestScore = Math.max(score, bestScore);
        }
      }
    }

    return bestScore;
  } else {
    var bestScore = Infinity;

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (board[i][j] === 0) {
          board[i][j] = currentPlayer === "X" ? "O" : "X";
          var score = minimax(board, depth + 1, true);
          board[i][j] = 0;

          bestScore = Math.min(score, bestScore);
        }
      }
    }

    return bestScore;
  }
}


// Function to make a computer move based on the selected difficulty
function makeComputerMove() {
  if (difficulty === "random") {
    makeComputerMoveRandom();
  } else if (difficulty === "unbeatable") {
    makeComputerMoveUnbeatable();
  }
}

// Function to restart the game
function restartGame() {
  window.location.reload();
}

function createGameboard() {
  var parentElement = document.getElementById('gameBoard');

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      var square = document.createElement('div');
      /* Set the data attributes for the row and column index
      When a square is clicked, the handleSquareClick function is invoked, and within that function, you can access the row and column index of the clicked square using the dataset property of the square element:
      With these row and column indices, you can update the corresponding position in the board array with the current player's symbol.
      The data attributes row and col serve as a way to connect the rendered game board with the underlying board array. They provide a means to identify and update the correct position in the board array when a square is clicked. */
      square.className = 'square';
      square.dataset.row = i;
      square.dataset.col = j;
      square.addEventListener('click', handleSquareClick);
      parentElement.appendChild(square);
    }
  }
}

createGameboard();

// Function to update the button text and class based on the selected difficulty
function updateToggleButton() {
  var toggleButton = document.getElementById('toggleDifficulty');
  toggleButton.textContent = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  toggleButton.classList.remove('random', 'unbeatable');
  toggleButton.classList.add(difficulty);
}

// Function to handle the button click event
function handleToggleClick() {
  toggleDifficulty();
  updateToggleButton();
  if (currentPlayer === "O") {
    makeComputerMove();
  }
}



// Call the function to update the button text and class initially
updateToggleButton();

// event listener to the toggle button
var toggleButton = document.getElementById('toggleDifficulty');
toggleButton.addEventListener('click', handleToggleClick);