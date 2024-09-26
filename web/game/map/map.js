window.onload = init;

function init() {
  var map = document.getElementById("map");

  map.onmousemove = showCoords;
}

function showCoords(eventObj) {
  var map = document.getElementById("coords");
  let x = eventObj.pageX;
  let y = eventObj.pageY;
  map.innerHTML = "Map coordinates: " + x + "," + y;
}
