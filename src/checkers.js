var board, currentPlayer;

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
  if (board[row1][col2] === currentPlayer && board[row2][col2] === ' X '){
    makeMove();
  }
  else {
    alert('error!');
    $(document).trigger('invalidMove')
  }
};

var getMove = function(){
  alert(currentPlayer + "'s turn to move!")
  var moves = {}

  $(document).ready(function (){
    var selection = []
    $('span').click(function(event) {
      event.preventDefault();
      selection.push(this.className)
      console.log(selection.length)

      if (selection.length === 4){
        moves = {
        startRow: selection[1].slice(8),
        startCol: selection[0].slice(8, 9),
        endRow: selection[3].slice(8),
        endCol: selection[2].slice(8, 9)
        }
        console.log(moves)
        return moves
      }
    })
  }) 
};

var makeMove = function(row1, col1, row2, col2){
  board[row1][col1] = ' X '
  board[row2][col2] = currentPlayer

  $(document).trigger('boardChange', board)
};

var removePiece = function(row, col){
  $(document).trigger('pieceTaken', currentPlayer, enemy, row, col)
};