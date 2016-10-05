// //First Epic:
// Purpose:
// Signature:
// Example:
// As a user I can see a 10 x 10 grid so that I can see the gameboard.
//
// Hint: Use a for loop to append to a table a <tr> tag, within that loop create another for loop to create the <td> tags. For a recap on loops look at Learn Day "Javascript Arrays and Iteration".
// Hint: Each loop will count to 10.
// Hint: Each <td> needs to have an id.
//
// As a user when I click on a position, the position changes color so that I can tell that a position has been torpedoed.
//
// Hint: Use .on("click", function() {...}) and addClass("...").
//
// As a user I can see how many torpedoes I have used, so that I can keep track of how many I have used.
// As a user once a position has been torpedoed, it cannot be torpedoed again so that I don't waste torpedoes.
//
// Hint: Use $("...").off("click")
//
// As user I expect there to be 5 single length ships on the board.
var board = [
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  []
]
var shots_fired = 0;
var SHIP = 1;

$(document).ready(function() {
  // Start game
  make_board();

  placesShips();

  // Make a move
  $("td").on("click", function(){
    make_shot_at($(this).off("click"));
  });
});

function make_shot_at(position) {
// 2. As a user when I click on a position, the position changes color so that I can tell that a position has been torpedoed.
// Hint: Use .on("click", function() {...}) and addClass("...").
  shots_fired++;

  $("h3").text("Torpedoes Hit: " + shots_fired);
  console.log("shots fired: " + shots_fired);
  position.addClass("torpedoed");
}

//  4. As a user once a position has been torpedoed, it cannot be torpedoed again so that I don't waste torpedoes.
// Hint: Use $("...").off("click")
// If user already hit the posision it was already torpedoed and cannot be torpedoed again.

//Create a 10x10 gameboard
function make_board() {
  console.log ("making 10x10 gameboard");
  console.log("shots fired: " + shots_fired);

  var html = "";
  var box_number = 0;


  for (var row = 0; row < 10; row++) {
    // Start the row
    html = html + "<tr>";
    // second loop (for table data)
    for (var data = 0; data < 10; data++) {
      // add IDs to html tds as row/data values, append to table var so we don't keep adding extra tds to the row forever
      html = html + '<td id="' + box_number + '"></td>';
      box_number++;
    }
    // End the row
    html = html + "</tr>";
  }
  $("table").append(html);
}

function placesShips() {
  var shipsPlaced = 0;
  var row;
  var column;
  while (shipsPlaced < 5) {
    row = Math.floor(Math.random() * 10);
    column = Math.floor(Math.random() * 10);
    if (board[row][column] != SHIP) {
      board[row][column] = SHIP
      shipsPlaced++;
    }
  }
  console.log(board)
}

// TODO: check for position of SHIP on board[row][column]
// TODO: if above is true, addClass/onclick magic works (this part will happen in the controller)
