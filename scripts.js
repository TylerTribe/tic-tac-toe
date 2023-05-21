// Tic tac toe
// Function that creates the game board
// function that listens for mouse click to display X or O
// buttons connected to a function that select difficulty
// difficulty selections: random and impossible - implement the logic
// function that checks for game win, loss, or draw
// function that displays an alert you win, lose, draw, then a restart button

var currentPlayer = "X";
var gameEnded = false;

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
  // Check if the game has already ended or if the square is already marked
  if (gameEnded || this.textContent !== "") {
    return; // Ignore the click if the game has ended or the square is already marked
  }

  // Get the row and column index of the clicked square
  var rowIndex = this.dataset.row;
  var colIndex = this.dataset.col;

  // Update the game board state
  board[rowIndex][colIndex] = currentPlayer;

  // Set the text content of the clicked square to the current player
  this.textContent = currentPlayer;

  // Check for a winner or draw
  var winner = checkForWinner();
  if (winner) {
    announceResult(winner);
    gameEnded = true;
  } else if (checkForDraw()) {
    announceResult("draw");
    gameEnded = true;
  } else {
    // Toggle the current player between "X" and "O"
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

// Function to check for a winner
function checkForWinner() {
  // Check rows
  for (var i = 0; i < 3; i++) {
    if (board[i][0] !== 0 && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
      return board[i][0]; // Return the winning player ("X" or "O")
    }
  }

  // Check columns
  for (var j = 0; j < 3; j++) {
    if (board[0][j] !== 0 && board[0][j] === board[1][j] && board[0][j] === board[2][j]) {
      return board[0][j]; // Return the winning player ("X" or "O")
    }
  }

  // Check diagonals
  if (
    (board[0][0] !== 0 && board[0][0] === board[1][1] && board[0][0] === board[2][2]) ||
    (board[0][2] !== 0 && board[0][2] === board[1][1] && board[0][2] === board[2][0])
  ) {
    return board[1][1]; // Return the winning player ("X" or "O")
  }

  return null; // Return null if there is no winner
}

// Function to check for a draw
function checkForDraw() {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (board[i][j] === 0) {
        return false; // Return false if there is an empty square
      }
    }
  }
  return true; // Return true if all squares are filled
}

// Function to announce the result
function announceResult(result) {
  if (result === "draw") {
    alert("It's a draw!");
  } else {
    alert("Player " + result + " wins!");
  }
}

function createGameboard() {
  var parentElement = document.getElementById('gameBoard');

  // iterate over the rows
  for (var i = 0; i < 3; i++) {

    // iterate over the columns
    for (var j = 0; j < 3; j++) {

      // create a new square element
      var square = document.createElement('div');
      square.className = 'square';

      // set the data attributes for the row and column index
      square.dataset.row = i;
      square.dataset.col = j;

      // add event listener to handle square clicks
      square.addEventListener('click', handleSquareClick);

      // append the square to the parent element
      parentElement.appendChild(square);
    }
  }
}

// call the function to create the game board
createGameboard();
