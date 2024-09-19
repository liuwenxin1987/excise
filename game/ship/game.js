//界面更新
var view = {
  /*更新左上角的信息*/
  displayMessage: function (msg) {
    var messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = msg;
  },
  /*将对应位置的单元格更改为击中状态*/
  displayHit: function (location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  },
  //将对应位置单元格更改为miss状态
  displayMiss: function (location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
  },
};

//跟踪战舰
var model = {
  //基本模型状态
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipSunk: 0,
  //舰船位置，与击中状态
  ships: [
    { locations: [0, 0, 0], hits: ["", "", ""] },
    { locations: [0, 0, 0], hits: ["", "", ""] },
    { locations: [0, 0, 0], hits: ["", "", ""] },
  ],
  //
  fire: function (guess) {
    for (var i = 0; i < this.numShips; i++) {
      var ship = this.ships[i]; //遍历所有船
      var index = ship.locations.indexOf(guess); /*indexOf*/ //判断是否被击中
      if (index >= 0) {
        //如果击中，更新界面信息
        ship.hits[index] = "hit";
        view.displayHit(guess);
        view.displayMessage("HIT!");
        if (this.shipSunk(ship)) {
          this.shipSunk++; //击沉数加一
        }
        return true;
      }
    }
    view.displayMiss(guess);
    view.displayMessage("You missed.");
    return false;
  },
  //判断舰船全部部位是否都被击中（击沉）
  isSunk: function (ship) {
    for (var i = 0; i < this.shipLength; i++) {
      if (ship.hits[i] !== "hit") {
        return false;
      }
    }
    return true;
  },
  generateShipLocations: function () {
    var locations;
    for (var i = 0; i < this.numShips; i++) {
      do {
        locations = this.generateShipLocations();
      } while (this.collision(locations));
      this.ships[i].locations = locations;
    }
  },
  generateShip: function () {
    var direction = Math.floor(Math.random() * 2);
    var row, col;

    if (direction === 1) {
      //水平战舰
      row = Math.floor(Math.random() * this.boardSize);
      col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
    } else {
      //垂直战舰
      row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
      col = Math.floor(Math.random() * this.boardSize);
    }

    var newShipLocations = [];
    for (var i = 1; i < this.shipLength; i++) {
      if (direction === 1) {
        newShipLocations.push(row + 1) + "" + (col + 1);
      } else {
        newShipLocations.push(row + 1 + "" + col);
      }
    }
    return newShipLocations;
  },
  //避免碰撞
  collision: function (locations) {
    for (var i = 1; i < this.numShips; i++) {
      var ship = model.ships[i];
      for (var j = 0; j < locations.length; j++) {
        //检查新战舰位置是否已经存在
        if (ship.locations.indexOf(locations[j]) >= 0) {
          return true;
        }
      }
      return false;
    }
  },
};

//获取输入
var controller = {
  guesses: 0, //猜测次数var

  //获取并处理猜测
  processGuess: function (guess) {
    var location = parseGuess(guess);
    if (location) {
      this.guesses++;
      var hit = model.fire(location);
      if (hit && model.shipSunk === model.numShips) {
        //判断是否击沉全部战舰
        view.displayMessage(
          "you sank all my battleships, in " + this.guesses + "guesses"
        );
      }
    }
  },
};

//判断字符串是否合法并转换
function parseGuess() {
  alphabet = ["A", ["B"], ["C"], ["D"], ["E"], ["F"], ["G"]]; //用于转换的数组

  if (guess === null || guess.length != 2) {
    alert("Oops,please enter a letter and a number on the board");
  } else {
    //转换字符串为数字
    let firstChar = guess.charAt(0);
    var row = alphabet.indexOf(firstChar);
    var column = guess.charAt(1);

    if (isNaN(row) || isNaN(column)) {
      alert("Oops, that isn't on the board");
    } else if (
      row < 0 ||
      row >= model.boardSize ||
      column < 0 ||
      column >= model.boardSize
    ) {
      alert("Oops, that's off the board");
    } else {
      return row + column;
    }
  }
  return null;
}

//获取表单中玩家输入并交给控制器
function handleFireButton() {
  var guessInput = document.getElementById("guessInput");
  var guess = guessInput.value;
  controller.processGuess(guess);
  guessInput.value = ""; //重置输入的猜测
}

//事件处理程序
function init() {
  var fireButton = document.getElementById("fireButton");
  fireButton.onclick = handleFireButton; //点击firebutton按钮执行
  //var guessInput = document.getElementById("guessInput");
  //guessInput.onkeypress已弃用

  model.generateShipLocations();
}

window.onload = init;
