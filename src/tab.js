const XLMNS = "http://www.w3.org/2000/svg";
var offsetX = 35;
var tabWidth = 120;
var tabHeight = 150
var fretHeight = tabHeight / 5;
var fingerSize = 8;

var chordsData = {
  "major": {
    "Ab": ["Ab", "C", "Eb"],
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
  },
  "minor": {
    "Ab": ["Ab", "B", "Eb"],
    "A": ["A", "C", "E"],
    "Bb": ["Bb", "C#", "F"],
    "B": ["B", "D", "F#"],
    "C": ["C", "Eb", "G"],
    "C#": ["C#", "E", "Ab"],
    "D": ["D", "F", "A"],
    "Eb": ["Eb", "F#", "Bb"],
    "E": ["E", "G", "B"],
    "F": ["F", "Ab", "C"],
    "F#": ["F#", "A", "C#"],
    "G": ["G", "Bb", "D"]
  },
  "aug": {
    "Ab": ["Ab", "C", "E"],
    "A": ["A", "C#", "F"],
    "Bb": ["Bb", "D", "F#"],
    "B": ["B", "Eb", "G"],
    "C": ["C", "E", "Ab"],
    "C#": ["C#", "F", "A"],
    "D": ["D", "F#", "Bb"],
    "Eb": ["Eb", "G", "B"],
    "E": ["E", "Ab", "C"],
    "F": ["F", "A", "C#"],
    "F#": ["F#", "Bb", "D"],
    "G": ["G", "B", "Eb"]
  },
  "7th": {
    "Ab": ["Ab", "C", "Eb", "F#"],
    "A": ["A", "C#", "E", "G"],
    "Bb": ["Bb", "D", "F", "Ab"],
    "B": ["B", "Eb", "F#", "A"],
    "C": ["C", "E", "G", "Bb"],
    "C#": ["C#", "F", "Ab", "B"],
    "D": ["D", "F#", "A", "C"],
    "Eb": ["Eb", "G", "Bb", "C#"],
    "E": ["E", "Ab", "B", "D"],
    "F": ["F", "A", "C", "Eb"],
    "F#": ["F#", "Bb", "C#", "E"],
    "G": ["G", "B", "D", "F"]
  },
  "minor 7": {
    "Ab": ["Ab", "B", "Eb", "F#"],
    "A": ["A", "C", "E", "G"],
    "Bb": ["Bb", "C#", "F", "Ab"],
    "B": ["B", "D", "F#", "A"],
    "C": ["C", "Eb", "G", "Bb"],
    "C#": ["C#", "E", "Ab", "B"],
    "D": ["D", "F", "A", "C"],
    "Eb": ["Eb", "F#", "Bb", "C#"],
    "E": ["E", "G", "B", "D"],
    "F": ["F", "Ab", "C", "Eb"],
    "F#": ["F#", "A", "C#", "E"],
    "G": ["G", "Bb", "D", "F"]
  },
  "major 7": {
    "Ab": ["Ab", "C", "Eb", "G"],
    "A": ["A", "C#", "E", "Ab"],
    "Bb": ["Bb", "D", "F", "A"],
    "B": ["B", "Eb", "F#", "Bb"],
    "C": ["C", "E", "G", "B"],
    "C#": ["C#", "F", "Ab", "C"],
    "D": ["D", "F#", "A", "C#"],
    "Eb": ["Eb", "G", "Bb", "D"],
    "E": ["E", "Ab", "B", "Eb"],
    "F": ["F", "A", "C", "E"],
    "F#": ["F#", "Bb", "C#", "F"],
    "G": ["G", "B", "D", "F#"]
  },
  "sus 4": {
    "Ab": ["Ab", "C#", "Eb"],
    "A": ["A", "D", "E"],
    "Bb": ["Bb", "Eb", "F"],
    "B": ["B", "E", "F#"],
    "C": ["C", "F", "G"],
    "C#": ["C#", "F#", "Ab"],
    "D": ["D", "G", "A"],
    "Eb": ["Eb", "Ab", "Bb"],
    "E": ["E", "A", "B"],
    "F": ["F", "Bb", "C"],
    "F#": ["F#", "B", "C#"],
    "G": ["G", "C", "D"],
  },
  "7 sus 4": {
    "Ab": ["Ab", "C#", "Eb", "F#"],
    "A": ["A", "D", "E", "G"],
    "Bb": ["Bb", "Eb", "F", "Ab"],
    "B": ["B", "E", "F#", "A"],
    "C": ["C", "F", "G", "Bb"],
    "C#": ["C#", "F#", "Ab", "B"],
    "D": ["D", "G", "A", "C"],
    "Eb": ["Eb", "Ab", "Bb", "C#"],
    "E": ["E", "A", "B", "D"],
    "F": ["F", "Bb", "C", "Eb"],
    "F#": ["F#", "B", "C#", "E"],
    "G": ["G", "C", "D", "F"]
  },
  "6th": {
    "Ab": ["Ab", "C", "Eb", "F"],
    "A": ["A", "C#", "E", "F#"],
    "Bb": ["Bb", "D", "F", "G"],
    "B": ["B", "Eb", "F#", "Ab"],
    "C": ["C", "E", "G", "A"],
    "C#": ["C#", "F", "Ab", "Bb"],
    "D": ["D", "F#", "A", "B"],
    "Eb": ["Eb", "G", "Bb", "C"],
    "E": ["E", "Ab", "B", "C#"],
    "F": ["F", "A", "C", "D"],
    "F#": ["F#", "Bb", "C#", "Eb"],
    "G": ["G", "B", "D", "E"]
  },
  "min 6": {
    "Ab": ["Ab", "B", "Eb", "F"],
    "A": ["A", "C", "E", "F#"],
    "Bb": ["Bb", "C#", "F", "G"],
    "B": ["B", "D", "F#", "Ab"],
    "C": ["C", "Eb", "G", "A"],
    "C#": ["C#", "E", "Ab", "Bb"],
    "D": ["D", "F", "A", "B"],
    "Eb": ["Eb", "F#", "Bb", "C"],
    "E": ["E", "G", "B", "C#"],
    "F": ["F", "Ab", "C", "D"],
    "F#": ["F#", "A", "C#", "Eb"],
    "G": ["G", "Bb", "D", "E"]
  },
  "dim": {
    "Ab": ["Ab", "B", "D"],
    "A": ["A", "C", "Eb"],
    "Bb": ["Bb", "C#", "E"],
    "B": ["B", "D", "F"],
    "C": ["C", "Eb", "F#"],
    "C#": ["C#", "E", "G"],
    "D": ["D", "F", "Ab"],
    "Eb": ["Eb", "F#", "A"],
    "E": ["E", "G", "Bb"],
    "F": ["F", "Ab", "B"],
    "F#": ["F#", "A", "C"],
    "G": ["G", "Bb", "C#"]
  },
  "dim 7": {
    "Ab": ["Ab", "B", "D", "F"],
    "A": ["A", "C", "Eb", "F#"],
    "Bb": ["Bb", "C#", "E", "G"],
    "B": ["B", "D", "F", "Ab"],
    "C": ["C", "Eb", "F#", "A"],
    "C#": ["C#", "E", "G", "Bb"],
    "D": ["D", "F", "Ab", "B"],
    "Eb": ["Eb", "F#", "A", "C"],
    "E": ["E", "G", "Bb", "C#"],
    "F": ["F", "Ab", "B", "D"],
    "F#": ["F#", "A", "C", "Eb"],
    "G": ["G", "Bb", "C#", "E"]
  },
  "7 - 5": {
    "Ab": ["Ab", "C", "D", "F#"],
    "A": ["A", "C#", "Eb", "G"],
    "Bb": ["Bb", "D", "E", "Ab"],
    "B": ["B", "Eb", "F", "A"],
    "C": ["C", "E", "F#", "Bb"],
    "C#": ["C#", "F", "G", "B"],
    "D": ["D", "F#", "Ab", "C"],
    "Eb": ["Eb", "G", "A", "C#"],
    "E": ["E", "Ab", "Bb", "D"],
    "F": ["F", "A", "B", "Eb"],
    "F#": ["F#", "Bb", "C", "E"],
    "G": ["G", "B", "C#", "F"]
  },
  "7 + 5": {
    "Ab": ["Ab", "C", "E", "F#"],
    "A": ["A", "C#", "F", "G"],
    "Bb": ["Bb", "D", "F#", "Ab"],
    "B": ["B", "Eb", "G", "A"],
    "C": ["C", "E", "Ab", "Bb"],
    "C#": ["C#", "F", "A", "B"],
    "D": ["D", "F#", "Bb", "C"],
    "Eb": ["Eb", "G", "B", "C#"],
    "E": ["E", "Ab", "C", "D"],
    "F": ["F", "A", "C#", "Eb"],
    "F#": ["F#", "Bb", "D", "E"],
    "G": ["G", "B", "Eb", "F"]
  },
  "minor 7 - 5": {
    "Ab": ["Ab", "B", "D", "F#"],
    "A": ["A", "C", "Eb", "G"],
    "Bb": ["Bb", "C#", "E", "Ab"],
    "B": ["B", "D", "F", "A"],
    "C": ["C", "Eb", "F#", "Bb"],
    "C#": ["C#", "E", "G", "B"],
    "D": ["D", "F", "Ab", "C"],
    "Eb": ["Eb", "F#", "A", "C#"],
    "E": ["E", "G", "Bb", "D"],
    "F": ["F", "Ab", "B", "Eb"],
    "F#": ["F#", "A", "C", "E"],
    "G": ["G", "Bb", "C#", "F"]
  },
  "minor/major 7": {
    "Ab": ["Ab", "B", "Eb", "G"],
    "A": ["A", "C", "E", "Ab"],
    "Bb": ["Bb", "C#", "F", "A"],
    "B": ["B", "D", "F#", "Bb"],
    "C": ["C", "Eb", "G", "B"],
    "C#": ["C#", "E", "Ab", "C"],
    "D": ["D", "F", "A", "C#"],
    "Eb": ["Eb", "F#", "Bb", "D"],
    "E": ["E", "G", "B", "Eb"],
    "F": ["F", "Ab", "C", "E"],
    "F#": ["F#", "A", "C#", "F"],
    "G": ["G", "Bb", "D", "F#"]
  },
  "major 7 + 5": {
    "Ab": ["Ab", "C", "E", "G"],
    "A": ["A", "C#", "F", "Ab"],
    "Bb": ["Bb", "D", "F#", "A"],
    "B": ["B", "Eb", "G", "Bb"],
    "C": ["C", "E", "Ab", "B"],
    "C#": ["C#", "F", "A", "C"],
    "D": ["D", "F#", "Bb", "C#"],
    "Eb": ["Eb", "G", "B", "D"],
    "E": ["E", "Ab", "C", "Eb"],
    "F": ["F", "A", "C#", "E"],
    "F#": ["F#", "Bb", "D", "F"],
    "G": ["G", "B", "Eb", "F#"]
  },
  "major 7 - 5": {
    "C": ["C", "E", "F#", "B"],
    "C#": ["C#", "F", "G", "C"],
    "D": ["D", "F#", "Ab", "C#"],
    "Eb": ["Eb", "G", "A", "D"],
    "E": ["E", "Ab", "Bb", "Eb"],
    "F": ["F", "A", "B", "E"],
    "F#": ["F#", "Bb", "C", "F"],
    "G": ["G", "B", "C#", "F#"],
    "Ab": ["Ab", "C", "D", "G"],
    "A": ["A", "C#", "Eb", "Ab"],
    "Bb": ["Bb", "D", "E", "A"],
    "B": ["B", "Eb", "F", "Bb"],
  },
  "9th": {
    "Ab": ["Ab", "C", "Eb", "F#", "Bb"],
    "A": ["A", "C#", "E", "G", "B"],
    "Bb": ["Bb", "D", "F", "Ab", "C"],
    "B": ["B", "Eb", "F#", "A", "C#"],
    "C": ["C", "E", "G", "Bb", "D"],
    "C#": ["C#", "F", "Ab", "B", "Eb"],
    "D": ["D", "F#", "A", "C", "E"],
    "Eb": ["Eb", "G", "Bb", "C#", "F"],
    "E": ["E", "Ab", "B", "D", "F#"],
    "F": ["F", "A", "C", "Eb", "G"],
    "F#": ["F#", "Bb", "C#", "E", "Ab"],
    "G": ["G", "B", "D", "F", "A"]
  },
  "add 9": {
    "C": ["C", "E", "G", "D"],
    "C#": ["C#", "F", "Ab", "Eb"],
    "D": ["D", "F#", "A", "E"],
    "Eb": ["Eb", "G", "Bb", "F"],
    "E": ["E", "Ab", "B", "F#"],
    "F": ["F", "A", "C", "G"],
    "F#": ["F#", "Bb", "C#", "Ab"],
    "G": ["G", "B", "D", "A"],
    "Ab": ["Ab", "C", "Eb", "Bb"],
    "A": ["A", "C#", "E", "B"],
    "Bb": ["Bb", "D", "F", "C"],
    "B": ["B", "Eb", "F#", "C#"],
  },
  "minor 9": {
    "Ab": ["Ab", "B", "Eb", "F#", "Bb"],
    "A": ["A", "C", "E", "G", "B"],
    "Bb": ["Bb", "C#", "F", "Ab", "C"],
    "B": ["B", "D", "F#", "A", "C#"],
    "C": ["C", "Eb", "G", "Bb", "D"],
    "C#": ["C#", "E", "Ab", "B", "Eb"],
    "D": ["D", "F", "A", "C", "E"],
    "Eb": ["Eb", "F#", "Bb", "C#", "F"],
    "E": ["E", "G", "B", "D", "F#"],
    "F": ["F", "Ab", "C", "Eb", "G"],
    "F#": ["F#", "A", "C#", "E", "Ab"],
    "G": ["G", "Bb", "D", "F", "A"]
  },
  "sus 2": {
    "Ab": ["Ab", "Bb", "Eb"],
    "A": ["A", "B", "E"],
    "Bb": ["Bb", "C", "F"],
    "B": ["B", "C#", "F#"],
    "C": ["C", "D", "G"],
    "C#": ["C#", "Eb", "Ab"],
    "D": ["D", "E", "A"],
    "Eb": ["Eb", "F", "Bb"],
    "E": ["E", "F#", "B"],
    "F": ["F", "G", "C"],
    "F#": ["F#", "Ab", "C#"],
    "G": ["G", "A", "D"]
  }
};

var instruments = {
  "banjo": ["G", "D", "G", "B", "D"],
  "guitar": ["E", "A", "D", "G", "B", "E"],
  "bass": ["E", "A", "D", "G"],
  "mandolin": ["G", "D", "A", "E"],
  "violin": ["G", "D", "A", "E"],
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

function tabPositions(chordName, base, scale) {
  var tabs = [];
  for (var b = 0; b < base.length; b++) {
    var cd = chordsData[scale][chordName];
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
  el.setAttribute('viewBox', "0 0 200 190");
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
  for (var i = 0; i < n; i++) {
    el.appendChild(fret(i * fretHeight));
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
  var td = tabWidth / (s - 1);
  for (var i = 1; i < s - 1; i++) {
    el.appendChild(string(td * i + offsetX));
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

  xy.x = tabWidth / (ts - 1) * s + offsetX;
  xy.y = p * fretHeight - (fretHeight / 2);
  if (xy.y < 0)
    xy.y = 0;
  return xy
}

function chordName(n) {
  var el = document.createElementNS(XLMNS, "text");
  el.setAttribute('x', 35);
  el.setAttribute('y', 180);
  el.setAttribute('font-family', "Verdana");
  el.setAttribute('font-size', "25");
  el.innerHTML = n;
  return el;
}

function getScale(el) {
  return el.getAttribute("scale") || "major";
}

function processPage() {
  var els = document.getElementsByTagName("c-tab");
  for (var i = 0; i < els.length; i++) {
    var chord = els[i].getAttribute('chord');
    var instrument = els[i].getAttribute('instrument');
    //var scale = els[i].getAttribute('instrument') || "major";
    var scale = getScale(els[i]);
    console.log(scale);
    var note = tabPositions(chord, instruments[instrument], scale);
    if (note == undefined) {
      console.error("instrument " + instrument + " or chord " + chord + " not available ");
      continue;
    }
    var tab = svg();
    tab = createFrets(tab, 5);

    tab = createStrings(tab, note.length);

    for (var j = 0; j < note.length; j++) {
      var fPos = calcFinger(j, note[j], note.length);
      if (fPos.y > 0)
        tab.appendChild(createFinger(fPos.x, fPos.y));
    }
    tab.appendChild(chordName(chord + " " + scale));
    els[i].appendChild(tab);
  }
}

processPage();
