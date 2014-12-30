var board, currentPlayer;
var turns = 1;
var errors = 0;

var resetBoard = function () {
  board = [
    [' X ', 'wht', ' X ', 'wht', ' X ', 'wht', ' X ', 'wht'],
    ['wht', ' X ', 'wht', ' X ', 'wht', ' X ', 'wht', ' X '],
    [' X ', 'wht', ' X ', 'wht', ' X ', 'wht', ' X ', 'wht'],
    [' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X '],
    [' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X '],
    ['red', ' X ', 'red', ' X ', 'red', ' X ', 'red', ' X '],
    [' X ', 'red', ' X ', 'red', ' X ', 'red', ' X ', 'red'],
    ['red', ' X ', 'red', ' X ', 'red', ' X ', 'red', ' X ']
  ];

  currentPlayer = 'wht'
};

var attemptMove = function(row1, col1, row2, col2){
  row1 = charToNum[row1.slice(8)]
  col1 = col1.slice(8)
  row2 = charToNum[row2.slice(8)]
  col2 = col2.slice(8)

  console.log('startRow: ', row1, 'startCol: ', col1, 'endRow: ', row2, 'endCol: ', col2)
  // Confirm appropriate starting piece.
  if (board[row1][col1] !== currentPlayer) {
    errors++
    currentPlayer === 'wht' ? console.log('Please select white piece. Error number', errors) : console.log('Please select red piece. Error number', errors)
  }
  // Square is black.
  else if (col1.indexOf('empty') > -1 || col2.indexOf('empty') > -1){
    errors++
    console.log('Cannot select red space!  Error number', errors)
  }
  // White left capture.
  else if (currentPlayer === 'wht' && (row2 - row1 === 2) && (col2 - col1 === -2 || col2 - col1 === 2) && board[row1+1][col1-1] === 'red') {
    makeMove(row1, col1, row2, col2)
    board[row1+1][col1-1] = ' X '
    turns++
    currentPlayer === 'wht' ? currentPlayer = 'red' : currentPlayer = 'wht'
    displayBoard();

    console.log('White caputes red piece!')
    console.log('Turn ', turns)
    currentPlayer === 'wht' ? console.log("It is White's turn to move!") : console.log("It is Red's turn to move!")
  }
  // Move forward one row only.
  else if ( (currentPlayer === 'wht' && (row2 - row1 !== 1)) || (currentPlayer === 'red' && (row2 - row1 !== -1)) ){
    errors++
    console.log('Can only move one row foward!  Error number', errors)
  }
  // Move left or right one column.
  else if ( (col2 - col1 > 1) || (col2 - col1 < -1) ){
    errors++
    console.log('Can only move one column left or right!  Error number', errors)
  }
  // Valid move, non-capture.
  else if (board[row1][col1] === currentPlayer && board[row2][col2] === ' X '){
    makeMove(row1, col1, row2, col2)
    turns++
    currentPlayer === 'wht' ? currentPlayer = 'red' : currentPlayer = 'wht'
    displayBoard();

    console.log('Turn ', turns)
    currentPlayer === 'wht' ? console.log("It is White's turn to move!") : console.log("It is Red's turn to move!")
  }
  // Temp error.
  else{
    errors++
    console.log('error!  Error number ', errors);
    $(document).trigger('invalidMove')

  }
};

var getMove = function(){
  var moves = {}

  console.log('Turn ', turns)
  currentPlayer === 'wht' ? console.log("It is White's turn to move!") : console.log("It is Red's turn to move!")

  $(document).ready(function (){
    var selection = [];

    $('span').click(function(event) {
      event.preventDefault();
      selection.push(this.className)
      console.log('selection length: ', selection.length)

      if (selection.length > 3){
        moves = {
          startRow: selection[1],
          startCol: selection[0],
          endRow: selection[3],
          endCol: selection[2]
        }
        console.log(moves)
        selection = []
        event.stopPropagation();
        attemptMove(moves.startRow, moves.startCol, moves.endRow, moves.endCol)
      }
    })
  })
};

var makeMove = function(row1, col1, row2, col2){
  board[row1][col1] = ' X '
  board[row2][col2] = currentPlayer

  $(document).trigger('boardChange', board)
};

var play = function(){
  resetBoard();
  $(document).ready( function(){
    displayBoard();
    getMove();
  })
}

var removePiece = function(row, col){
  $(document).trigger('pieceTaken', currentPlayer, enemy, row, col)
};

play();