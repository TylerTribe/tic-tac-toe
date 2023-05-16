document.addEventListener('DOMContentLoaded', function() {
    // Define a variable to keep track of the current player (either "X" or "O")
    var currentPlayer = "X";
  
    // Function to handle square click events
    function handleSquareClick() {
      // Check if the square is already marked
      if (this.textContent !== "") {
        return; // Ignore the click if the square is already marked
      }
  
      // Set the text content of the clicked square to the current player
      this.textContent = currentPlayer;
  
      // Toggle the current player between "X" and "O"
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  
    // Function to create the game board
    function createGameBoard() {
      var parentElement = document.getElementById('gameBoard');
  
      // Iterate over the rows
      for (var i = 0; i < 3; i++) {
        // Iterate over the columns
        for (var j = 0; j < 3; j++) {
          // Create a new square element
          var square = document.createElement('div');
          square.className = 'square';
          
          // Add event listener to handle square clicks
          square.addEventListener('click', handleSquareClick);
  
          // Append the square to the parent element
          parentElement.appendChild(square);
        }
      }
    }
  
    // Call the function to create the game board
    createGameBoard();
  });
  