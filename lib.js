var lib = {
  initBoard: initBoard,
}

function initBoard () {
  board.cells.sort(cellCompare)
  var boardNode = document.getElementsByClassName('board')[0]
 // while (boardNode.firstChild) {
  //  boardNode.removeChild(boardNode.firstChild);
//}
  drawBoard(boardNode)
  addListeners(boardNode)
  return true
}

// Draw board based on number of cells and an assumption about how much 
// space should be allowed for each cell.
function drawBoard (boardNode) {
  boardNode.style.width = Math.sqrt(board.cells.length) * 98 + 'px'
  board.cells.reduce(cellsToNodes, boardNode)
}

function cellCompare (a, b) {
  if (a.row < b.row) {
    return -1
  } else if (a.row > b.row) {
    return 1
  }
  if (a.col < b.col) {
    return -1
  } else if (a.col > b.col) {
    return 1
  }
  return 0
}

function cellsToNodes (boardNode, cell) {
  var node = document.createElement('div')
  node.classList.add('row-' + cell.row)
  node.classList.add('col-' + cell.col)
  if (cell.face) {
    node.classList.add(cell.face)
  }
  if (cell.hidden) {
    node.classList.add('hidden')
  } else {
  }
  boardNode.appendChild(node)
  return boardNode
}

function addListeners (boardNode) {
  for (var i = 0; i < boardNode.children.length; i++) {
    boardNode.children[i].addEventListener('click', showCell)
  }
}

function showCell (evt) {
  if(timeOut != 0){
    return
  }
  var idx = getCellIndex(getRow(evt.target), getCol(evt.target))
  var cell = board.cells[idx]
  cell.isMarked = false
  evt.target.classList.remove('hidden')
  evt.target.classList.remove('marked')
}

// Array.includes polyfill
if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
    'use strict'
    var O = Object(this)
    var len = parseInt(O.length, 10) || 0
    if (len === 0) {
      return false
    }
    var n = parseInt(arguments[1], 10) || 0
    var k
    if (n >= 0) {
      k = n
    } else {
      k = len + n
      if (k < 0) {k = 0}
    }
    var currentElement
    while (k < len) {
      currentElement = O[k]
      if (searchElement === currentElement) { // NaN !== NaN
        return true
      }
      k++
    }
    return false
  }
}


// Returns a subset of the `cells` array, including only those cells
// which are adjacent to `row`, `col`

// For the given DOM element, displays surrounding mine counts
// under the following conditions:
//  - cell is not a mine
//  - cell has not already been checked
function showSurrounding (element) {
  getSurroundingCells(getRow(element), getCol(element))
    .filter(function (cell) {
      return !cell.isMine && !cell.isMarked
    })
    .filter(function (cell) {
      // Avoid breaking the call stack with recurrent checks on same cell
      return !cell.isProcessed
    })
    //.forEach(setInnerHTML)
}

function getRange(begin, end) {
  return Array.apply(begin, Array(end - begin + 1))
    .map(function (n, i) {
      return begin + i
    })
}

function getLowerBound (n) {
  return n - 1 < 0 ? 0 : n -1
}

function getUpperBound (n) {
  var limit = Math.sqrt(board.cells.length)
  return n + 1 > limit ? limit : n + 1
}

function getRow (element) {
  return parseInt(getCoordinate(element, 'row'), 10)
}

function getCol (element) {
  return parseInt(getCoordinate(element, 'col'), 10)
}

function getCoordinate (element, coordinate) {
  return makeArray(element.classList)
    .find(function (cssClass) {
      return cssClass.substring(0, coordinate.length) === coordinate
    })
    .split('-')[1]
}

function revealMines () {
  makeArray(document.getElementsByClassName('mine'))
    .forEach(function (element) {
      element.classList.remove('hidden')
      element.classList.remove('marked')
    })
}

// Cloning removes event listeners
function removeListeners () {
  var board = document.getElementsByClassName('board')[0]
  var clone = board.cloneNode(true)
  board.parentNode.replaceChild(clone, board)
}

// Convert classLists and HTMLCollections
function makeArray (list) {
  return [].slice.call(list)
}

function getCellIndex (row, col) {
  var idx = null
  board.cells.find(function (cell, i) {
    if (cell.row === row && cell.col === col) {
      idx = i
      return true
    }
  })
  return idx
}

function getNodeByCoordinates (row, col) {
  var rowClass = 'row-' + row
  var colClass = 'col-' + col
  return document.getElementsByClassName(rowClass + ' ' + colClass)[0]
}
