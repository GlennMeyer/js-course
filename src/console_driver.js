var numToChar = ["a", "b", "c", "d", "e", "f", "g", "h"];
var charToNum = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7
}

var displayBoard = function () {
  var column = [0, 1, 2, 3, 4, 5, 6, 7];
  console.log("  | " + column.join("   "));
  console.log("-----------------------------------");
  for (var i = 0; i < board.length; i++) {
    console.log(numToChar[i] + " |" + board[i].join(" "));
    for (var j = 0; j < board.length; j++){
      if (board[i][j] === 'wht'){
        $('.row-' + numToChar[i]).find('.col-' + j).text('')
        var $div1 = $("<div>", {class: "white piece"})
        $('.row-' + numToChar[i]).find('.col-' + j).append($div1)//.append("<img src='white_piece.jpg' style='height: 50px; width: 50px;'/>")
      }
      else if (board[i][j] === 'red'){
        $('.row-' + numToChar[i]).find('.col-' + j).text('')
        var $div2 = $("<div>", {class: "red piece"})
        $('.row-' + numToChar[i]).find('.col-' + j).append($div2)//.append("<img src='red_piece.jpg' style='height: 50px; width: 50px;'/>")
      }
      else {
        $('.row-' + numToChar[i]).find('.col-' + j).text('')
      }
    }
  }
  $('.games').text(games)
  $('.current-player').text(currentPlayer === 'wht' ? 'White' : 'Red')
  $('.turns').text(turns)
  $('.errors').text(errors)
  $('.white-captures').text(whiteCaptures)
  $('.red-captures').text(redCaptures)
};
