var locational1 = randomLoc;
var locational2 = locational1 + 1;
var locational3 = locational2 + 1;

randomLoc = Math.floor(Math.random() * 5);

var guess;
var hits = 0;
var guesses = 0;

var isSunk = false;

while (isSunk == false) {
  guess = prompt("Ready, aim, fire! (enter a number 0-6): ");
  if (guess < 0 || guess > 6) {
    alert("please enter a valid cell number!");
  } else {
    guesses = guesses + 1;

    if (guess == locational1 || guess == locational2 || guess == locational3) {
      hits = hits + 1;
      alert("HIT!");
      if ((hits = 3)) {
        isSunk = true;
        alert("you sunk my battleship");
      }
    } else {
      alert("MISS!");
    }
  }
}

//游戏后分析

var stats =
  "you took" +
  guess +
  "guesses to sink the battleship," +
  "which means your shooting accuracy was " +
  3 / guesses;
alert(stats);
