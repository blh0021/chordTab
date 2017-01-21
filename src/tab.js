const XLMNS = "http://www.w3.org/2000/svg";
var offsetX = 35;
var tabWidth = 120;
var tabHeight = 150
var fretHeight = tabHeight / 5;
var fingerSize = 8;

var chordsData = {
  "A": ["A", "C#", "E"],
  "Bb": ["Bb", "D", "F"],
  "B": ["B", "Eb", "F#"],
  "C": ["C", "E", "G"],
  "C#": ["C#", "F", "Ab"],
  "D": ["D", "F#", "A"],
  "Eb": ["Eb", "G", "Bb"],
  "E": ["E", "Ab", "B"],
  "F": ["F", "A", "C"],
  "F#": ["F#", "Bb", "C#"],
  "G": ["G", "B", "D"]
};

var instruments = {
  "guitar": ["E", "A", "D", "G", "B", "E"],
  "mandolin": ["G", "D", "A", "E"],
  "ukulele": ["G", "C", "E", "A"] 
};

var progress = ["A", "Bb", "B", "C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab"];

function distance(org, end) {
  var place = progress.indexOf(org);
  var note = progress.indexOf(end);
  if (note - place >= 0)
    return note - place;
  else
    return progress.length - place + note;
}

function findSmallestPositive(arr) {
  var small = 1000;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < small && arr[i] >= 0) {
      small = arr[i];
    }
  }
  return small;
}

function tabPositions(chordName, base) {
  var tabs = [];
  for (var b = 0; b < base.length; b++) {
    var cd = chordsData[chordName];
    if (cd == undefined)
      return undefined;
    var darr = [];
    for (var i = 0; i < cd.length; i++) {
      darr.push(distance(base[b], cd[i]));
    }
    var idx = findSmallestPositive(darr);
    tabs.push(idx);
  }
  return tabs;
}

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
  el.setAttribute('x', 90);
  el.setAttribute('y', 180);
  el.setAttribute('font-family', "Verdana");
  el.setAttribute('font-size', "25");
  el.innerHTML = n;

  return el; 
}

var els = document.getElementsByTagName("c-tab");
for (var i=0; i<els.length; i++) {
  var chord = els[i].getAttribute('chord');
  var instrument = els[i].getAttribute('instrument');
  var note = tabPositions(chord, instruments[instrument]);
  if (note == undefined) {
    console.error("instrument " + instrument + " or chord " + chord + " not available ");
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
