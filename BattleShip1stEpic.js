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

// var one_dimensional_array = [ 1, 2, 3 ];
// var two_dimensional_array = [ [1, 2, 3], [1, 2, 3], [1, 2, 3] ];

var board = [
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                                            ];

var shots_fired = 0;
var torpedoes = 25;
var shipsHit = 0;
var SHIP = 1;

$(document).ready(function() {

  // Start game
  makeBoard();
  makeShips();

  // Make a move
  $("td").on("click", function(){

    // Make shot
    shootAt($(this));

    // 4.  As a user once a position has been torpedoed, it cannot be torpedoed again so that I don't waste torpedoes.
    //
    // Hint: Use $("...").off("click")
    // Prevent same shot
    $(this).off("click");


    //hits the ships 5 times, you win.
    if (shipsHit ===5) {
      console.log("\nYou won the game! GAME OVER");
      $("h2").text("You won the game! GAME OVER");
      $("td").off("click");
    }
    //shots_fired 25 times, GAME OVER.
    if (shots_fired === 25) {
      $("td").off("click");
      console.log("\nNo more turns! LOST GAME!");
      $("h4").text("No more turns! LOST GAME!");
      revealShips();

    }
  })
});


function shipIsAt(position) {

  // Get position where user clicks
  var clicked = position.attr("id");

  // Convert position id to coordinates
  var row = clicked.charAt(0);
  var col = clicked.charAt(1);

  // If ship is at position
  if (board[row][col] == 1) {

    return true; // yes

  // If ship is not at position
  } else if (board[row][col] == 0) {

    return false; // no

  }

}


function shootAt(position) {
// 2. As a user when I click on a position, the position changes color so that I can tell that a position has been torpedoed.
// Hint: Use .on("click", function() {...}) and addClass("...").

  // Record the shot (by increasing shots_fired value by 1)
  shots_fired++;

  // Record torpedoes left
  torpedoes--;

  // Record shot in console
  console.log("\nwe shot at " + position.attr("id"))

  // if ship is hit
  if (shipIsAt(position)) {

    // show sinking ship
    position.addClass("hit");
    console.log("we hit ship!");

    // record hit
    shipsHit++;
    console.log("ships hit: " + shipsHit);

  // if ship is not hit
  } else {


    // Hint: Use .on("click", function() {...}) and addClass("...").

    // Show that position was torpedoed
    position.addClass("miss");
    console.log("we missed ship!");
  }
// 3. As a user I can see how many torpedoes I have used, so that I can keep track of how many I have used.
  // Show shots fired
  $("h3").text("Shots Fired: " + shots_fired);
  console.log("shots Fired: " + shots_fired);

  // $("h3").text("torpedoes: " - shipsHit);
  $("h4").text("Torpedoes Left: " + torpedoes);
  console.log("Torpedoes Left: " + torpedoes);
}

// 1. As a user I can see a 10 x 10 grid so that I can see the gameboard.
//Create a 10x10 gameboard
function makeBoard() {
  console.log ("making 10x10 gameboard");

  var html = "";

  for (var row = 0; row < 10; row++) {
    // Start the row
    html = html + "<tr>";
    // second loop (for table data in columns)
    for (var column = 0; column < 10; column++) {
      // add IDs to html tds as row/data values, append to table var so we don't keep adding extra tds to the row forever
      html = html + '<td id="' + row + column + '"></td>';
    }
    // End the row
    html = html + "</tr>";
  }
  $("table").append(html);
}

function makeShips() {

  // Track number of ships placed on board
  var shipsPlaced = 0;

  // Store ship position
  var row;
  var column;


  // 5.  As user I expect there to be 5 single length ships on the board.
  //
  // Hint: Create a global variable called board and have it hold an empty array. Have that empty array hold 10 empty arrays, creating a 2d array.
  // Hint: Create a global constant SHIP variable with a value of 1.
  // Hint: Create a loop that accesses the board at a random row and column and places a SHIP.

  // Make 5 ships and place them on board
  while (shipsPlaced < 5) {

    // Pick a random position
    row = Math.floor(Math.random() * 10);
    column = Math.floor(Math.random() * 10);

    // Save ship to board (unless ship already exists)
    if (board[row][column] != SHIP) {

      // Save ship if no ships are nearby
      if (radar(row, column) == 0) {

        // Add ship
        board[row][column] = SHIP;
        console.log("added a ship at " + row + column);
      }

      // Increment ship counter
      shipsPlaced++;
    }
  }
}

// As a user if I lose, I can see where the ships were, so that I know there were actual ships on the board.
//
// Hint: Use a .addClass("...") conditional on the torpedo counter.

function revealShips() {
  // TODO: Make a for loop to check rows
  // TODO: Inside that, a for look to check columns
  // TODO: If, inside those loops, there's a SHIP at a coordinate (board[row][col]), addClass to the coordinate
  for (row = 0; row < 10; row++) {
    for (column = 0; column < 10; column++)
    if(board[row][column] == SHIP) {
      $("#"+row+column).addClass("hit");
    };
  }
}

// Second Epic : 2. As a user I don't have ships that touch, so that there is always space between ships.


//Checks for horizontal
function radar(row, column) {
  var shipsOnRadar = 0;
  var row = row; // row where we want to put ship
  var column = column;  // column where we want to put ship

  // Look one block away from current position around ship
  // loop over potential rows
  // [0,1,2]
  //   // loop over potential columns
  //   [0,1,2]
  //     // check board for ship at potential position
  //     // board[potential row, potential column]
  //     board[0][0]; // check for ship
  //     board[0][1]; // check for ship
  //     board[0][2]; // check for ship
  //
  //     board[0][0]; // check for ship
  //     board[0][1]; // check for ship
  //     board[0][2]; // check for ship
  //
  //     board[0][0]; // check for ship
  //     board[0][1]; // check for ship
  //     board[0][2]; // check for ship

    // For each ship we find, increase shipsOnRadar count by 1
      // shipsRadar++;

  // Report shipsOnRadar back to our captain
  return shipsOnRadar;
}





// Hint: Create a function that checks the board horizontally for a ship.
// Hint: Create a function that checks the board vertically for a ship.
// Hint: Before placing the ship run both functions.
