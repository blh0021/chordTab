const XLMNS = "http://www.w3.org/2000/svg";
var offsetX = 35;
var tabWidth = 120;
var tabHeight = 150
var fretHeight = tabHeight / 5;
var fingerSize = 8;

if (window.chrome) {
  var CTab = document.registerElement('c-tab', {
    prototype: Object.create(HTMLElement.prototype),
    extends: "div"
  });
}

var chordJson = {
  "banjo": {
    "a": [-1,2,2,2,2],
    "b": [-1,1,4,0,4],
    "c": [0,2,0,1,2],
    "d": [-1,0,2,3,4],
    "e": [-1,2,1,0,2],
    "f": [-1.3,2,1,3],
    "g": [0,5,4,3,4]
  },
 "guitar": {
    "a": [-1,0,1,1,1,0],
    "am": [-1,0,2,2,1,0],
    "a7": [-1,0,2,0,2,0],
    "b": [-1,2,4,4,4,2],
    "bm": [-1,2,4,4,3,2],
    "b7": [-1,2,1,2,0,2],
    "c": [-1,3,2,0,1,0],
    "cm": [-1,3,5,5,4,3],
    "c7": [-1,3,2,3,1,0],
    "d": [-1,-1,0,2,3,2],
    "dm": [-1,-1,0,2,3,1],
    "d7": [-1,-1,0,2,1,2],
    "e": [0,2,2,1,0,0],
    "em": [0,2,2,0,0,0],
    "e7": [0,2,0,1,0,0],
    "f": [1,3,3,2,1,1],
    "fm": [1,3,3,1,1,1],
    "f7": [1,3,1,2,1,1],
    "g": [3,2,0,0,0,2],
    "gm": [3,5,5,3,3,3],
    "g7": [3,2,0,0,0,1]
  },
  "mandolin": {
    "a": [2,2,0,0],
    "b": [4,4,6,7],
    "c": [0,2,3,0],
    "d": [2,0,0,2],
    "e": [4,2,2,0],
    "f": [5,3,0,1],
    "g": [0,0,2,3]
  },
  "ukulele": {
    "a": [2,1,0,0],
    "b": [4,3,2,2],
    "c": [0,0,0,3],
    "d": [2,2,2,5],
    "e": [4,4,4,2],
    "f": [2,0,1,0],
    "g": [0,2,3,2],
    "am": [2,0,0,0],
    "bm": [4,2,2,2],
    "cm": [0,3,3,3],
    "dm": [2,2,1,0],
    "em": [0,4,3,2],
    "fm": [1,0,1,3],
    "gm": [0,2,3,1],
    "a7": [0,1,0,0],
    "b7": [2,3,2,2],
    "c7": [0,0,0,1],
    "d7": [2,2,2,3],
    "e7": [0,2,0,2],
    "f7": [2,3,1,0],
    "g7": [0,2,1,2]
  }
 };

/**
 * svg()
 *
 * creates the base svg element
 *
 */

function svg() {
  var el = document.createElementNS(XLMNS, "svg");
  el.setAttribute('xlmns', XLMNS);
  el.setAttribute('version', "1.1");
  el.setAttribute('viewBox', "0 0 200 180");
  return el;
}

/**
 * fret(y)
 *
 * args y = the height to start drawing each fret
 *
 * returns a rectangle for the fret object at y height
 *
 */

function fret(y) {
  var el = document.createElementNS(XLMNS, "rect");

  el.setAttribute('class', "fret");
  el.setAttribute('x', offsetX);
  el.setAttribute('y', y);
  el.setAttribute('width', tabWidth);
  el.setAttribute('height', fretHeight);
  el.setAttribute('style', 'fill: rgb(255,255,255);stroke-width:2;stroke:rgb(0,0,0)');

  return el;
}

/**
 * createFrets(el, n)
 *
 * el -> parent element to attach frets to.
 * n  -> number of frets to add to the tab
 *
 */

function createFrets(el, n) {
  for (var i=0; i<n; i++) {
    el.appendChild(fret(i* fretHeight));
  }
  return el
}

function string(x) {
  var el = document.createElementNS(XLMNS, "line");

  el.setAttribute('class', 'string');
  el.setAttribute('x1', x);
  el.setAttribute('x2', x);
  el.setAttribute('y1', 0);
  el.setAttribute('y2', tabHeight);
  el.setAttribute('style', 'fill: rgb(255,255,255);stroke-width:2;stroke:rgb(0,0,0)');
  return el;
}

function createStrings(el, s) {
  var td = tabWidth / (s-1);
  for (var i=1; i<s-1; i++) {
    el.appendChild(string(td*i+offsetX));
  }    
  return el;
}

function createFinger(x, y) {
  var el = document.createElementNS(XLMNS, "circle");

  el.setAttribute('class', 'fingers');
  el.setAttribute('cx', x);
  el.setAttribute('cy', y);
  el.setAttribute('r', fingerSize);
  return el;
}

function calcFinger(s, p, ts) {
  var xy = {
    x: 0,
    y: 0
  };

  xy.x = tabWidth / (ts-1) * s + offsetX;
  xy.y = p * fretHeight - (fretHeight / 2);
  if (xy.y < 0)
    xy.y = 0;
  return xy
}

function chordName(n) {
  var el = document.createElementNS(XLMNS, "text");
  el.setAttribute('x', 0);
  el.setAttribute('y', 60);
  el.setAttribute('font-family', "Verdana");
  el.setAttribute('font-size', "25");
  el.innerHTML = n.toUpperCase();

  return el; 
}

var els = document.getElementsByTagName("c-tab");
for (var i=0; i<els.length; i++) {
  var chord = els[i].getAttribute('chord');
  var instrument = els[i].getAttribute('instrument');
  var note = chordJson[instrument][chord];
  if (note == undefined) {
    console.error("instrument or chord not available");
    continue;
  }
  var tab = svg();
  tab = createFrets(tab, 5);
  
  tab = createStrings(tab, note.length);

  for (var j=0; j<note.length; j++) {
    var fPos = calcFinger(j, note[j], note.length);
    if (fPos.y > 0)
      tab.appendChild(createFinger(fPos.x, fPos.y));  
  }
  tab.appendChild(chordName(chord));
  els[i].appendChild(tab);
}
