var board, currentPlayer, turns, errors, whiteCaptures, redCaptures;
var games = 1;
var playing = false;

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
  turns = 1
  errors = 0
  whiteCaptures = 0
  redCaptures = 0
};

var attemptMove = function(row1, col1, row2, col2){
  row1 = charToNum[row1.slice(8)]
  if (col1.indexOf('empty') === -1){col1 = col1.slice(8, 9)}
  row2 = charToNum[row2.slice(8)]
  if (col2.indexOf('empty') === -1){col2 = col2.slice(8, 9)}

  console.log('startRow:', row1, 'startCol:', col1, 'endRow:', row2, 'endCol:', col2)
  // Confirm appropriate starting piece.
  if (board[row1][col1] !== currentPlayer) {
    errors++
    $('.console').text('')
    currentPlayer === 'wht' ? $('.console').append('Please select white piece.  Error number: ', errors) : $('.console').append('Please select red piece.  Error number: ', errors)
  }
  // Square is black.
  else if (col1.indexOf('empty') > -1 || col2.indexOf('empty') > -1){
    errors++
    $('.console').text('')
    $('.console').append('Cannot select red space!  Error number: ', errors)
  }
  // White capture.
  else if ( currentPlayer === 'wht' && (row2 - row1 === 2) && (col2 - col1 === -2 || col2 - col1 === 2) && ( board[row2-1][col2-1] === 'red' || board[row1+1][col1-1] === 'red' ) ) {
    makeMove(row1, col1, row2, col2)
    col2 - col1 < 0 ? board[row1+1][col1-1] = ' X ' : board[row2-1][col2-1] = ' X '
    turns++
    whiteCaptures++
    currentPlayer = 'red'
    displayBoard();

    $('.console').text('')
    $('.console').append('White captures red piece!  Capture: ', whiteCaptures, "<br>It is Red's turn to move!  Turn: ", turns)
  }
  // Red capture.
  else if ( currentPlayer === 'red'  && (row2 - row1 === -2) && (col2 - col1 === -2 || col2 - col1 === 2) && ( board[row2+1][col2-1] === 'wht' || board[row1-1][col1-1] === 'wht' )){
    makeMove(row1, col1, row2, col2)
    col2 - col1 < 0 ? board[row1-1][col1-1] = ' X ' : board[row2+1][col2-1] = ' X '
    turns++
    redCaptures++
    currentPlayer = 'wht'
    displayBoard();

    $('.console').text('')
    $('.console').append('Red captures white piece!  Capture: ', redCaptures, "<br>It is White's turn to move!  Turn: ", turns)
  }
  // Move forward one row only.
  else if ( (currentPlayer === 'wht' && (row2 - row1 !== 1)) || (currentPlayer === 'red' && (row2 - row1 !== -1)) ){
    errors++
    $('.console').text('')
    $('.console').append('Can only move one row foward!  Error number: ', errors)
  }
  // Move left or right one column.
  else if ( (col2 - col1 > 1) || (col2 - col1 < -1) ){
    errors++
    $('.console').text('')
    $('.console').append('Can only move one column left or right!  Error number: ', errors)
  }
  // Valid move, non-capture.
  else if (board[row1][col1] === currentPlayer && board[row2][col2] === ' X '){
    makeMove(row1, col1, row2, col2)
    turns++
    currentPlayer === 'wht' ? currentPlayer = 'red' : currentPlayer = 'wht'
    displayBoard();

    $('.console').text('')
    $('.console').append('Turn: ', turns, (currentPlayer === 'wht' ? ".  It is White's turn to move!" : ".  It is Red's turn to move!"))
  }
  // Temp error.
  else{
    errors++
    console.log('error!  Error number', errors);
    $(document).trigger('invalidMove')

  }
};

var getMove = function(){
  playing = true
  var moves = {}

  console.log('Turn', turns)
  currentPlayer === 'wht' ? console.log("It is White's turn to move!") : console.log("It is Red's turn to move!")

  $(document).ready(function (){
    var selection = [];

    $('span').click(function(event) {
      event.preventDefault();
      selection.push(this.className)
      // console.log('selection length:', selection.length)

      // if (selection.length > 1 && board[selection[1].slice(8)][selection[0].slice(8)] !== currentPlayer){
      //   currentPlayer === 'wht' ? console.log('Please select white piece.') : console.log('Please select red piece.')
      // }
      if (selection.length > 3){
        moves = {
          startRow: selection[1],
          startCol: selection[0],
          endRow: selection[3],
          endCol: selection[2]
        }
        // console.log(moves)
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
  $('.console').text("It is White's turn to move!")
  resetBoard();  
  displayBoard();
  if (playing === false){
    getMove();
  }
}

var removePiece = function(row, col){
  $(document).trigger('pieceTaken', currentPlayer, enemy, row, col)
};

$(document).ready(function() {
  $('.start').click(function(event){
    play();
    games++
    event.stopPropagation();
  })
})