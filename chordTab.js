var offsetX = 25;
var tabWidth = 120;

function createString(x) {
  var newString = document.createElementNS("http://www.w3.org/2000/svg", "line");

  newString.setAttribute('class', 'string');
  newString.setAttribute('x1', x);
  newString.setAttribute('x2', x);
  newString.setAttribute('y1', 0);
  newString.setAttribute('y2', 300);
  return newString;
}

function createTab(s) {
  var td = tabWidth / (s-1);
  for (var i=1; i<s-1; i++) {
    document.getElementById("chordTab").appendChild(createString(td*i+offsetX));
  }    
}

function createFinger(x, y) {
  var newFinger = document.createElementNS("http://www.w3.org/2000/svg", "circle");

  newFinger.setAttribute('class', 'fingers');
  newFinger.setAttribute('cx', x);
  newFinger.setAttribute('cy', y);
  newFinger.setAttribute('r', "10");
  newFinger.setAttribute('stroke', "green");
  newFinger.setAttribute('fill', "green");
  return newFinger;
}

function calcFinger(s, p, ts) {
  var xy = {
    x: 0,
    y: 0
  };

  xy.x = tabWidth / (ts-1) * s + offsetX;
  xy.y = p * 60;
  return xy
}

function deleteFingers() {
  var fingers = document.getElementsByClassName("fingers");
  while(fingers.length > 0) {
    fingers[0].parentNode.removeChild(fingers[0]);  
  }

}

var f = calcFinger(4,1,6);
document.getElementById("chordTab").appendChild(createFinger(f.x, f.y));

createTab(4);
//deleteFingers();

