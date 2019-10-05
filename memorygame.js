document.addEventListener('DOMContentLoaded', startGame)
var pairingSound

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

/*function getUserInput(){
  var userBoardSize = window.prompt("What size would you like the game? (between 2 and 6)")
  var userNumOfBombs = window.prompt("How many bombs would you like?")
  var userInput = [userBoardSize, userNumOfBombs]
  return userInput
}*/


// Define your `board` object here!
function makeColumnArray(boardSide){
  var n=0
  var columnArray = []
  do {
    for (i=0; i<boardSide; i++){
      columnArray.push(i)
    }
    n++
  }
  while (n < boardSide)
  // console.log(columnArray)
  return columnArray
}

function makeRowArray(boardSide){
  var rowArray = makeColumnArray(boardSide).sort(function(a, b){return a-b})
  return rowArray
}


function makeBoard(boardSide){
  var anyBoard = {cells:[]}
  var columnArray = makeColumnArray(boardSide)
  var rowArray = makeRowArray(boardSide)
  for (i=0; i<(Math.pow(boardSide, 2)); i++){
    anyBoard.cells.push({
      col : columnArray[i],
      row : rowArray[i],
      //isMarked : false,
      face: 'MargoHayes',
      hidden : true
    })  
  }  
  return anyBoard
}


function makeIndexArray(anyBoard){
  var i = 0
  var indexArray = []
  //console.log("this is the length of board " + anyBoard.cells.length)
  do{
    indexArray.push(i)
    i++
  } while (i<anyBoard.cells.length)
  console.log("this is index array " + indexArray)
  return indexArray
}

function addFaces(anyBoard){
  console.log('addFaces is called')
  var cellsIndexArray = makeIndexArray(anyBoard)
  var faceArray = ['Margo','Marie_Currie','Jacinda','Rosa_Parks','Greta_Thunberg','Ada_Lovelace','Rosalind_Franklin','Angela_Burdett_Coutts','Jane_Autsen','Wangari_Maathai','Simone_de_Beauvoir','Ada_Lovelace','Grace_Hopper','Frida_Kahlo','Mary_Wollstonecraft','Hypatia','Sacagawea','Lise_Meitner','Margo','Marie_Currie','Jacinda','Rosa_Parks','Greta_Thunberg','Bessie_Coleman','Rosalind_Franklin','Angela_Burdett_Coutts','Jane_Autsen','Wangari_Maathai','Simone_de_Beauvoir','Bessie_Coleman','Grace_Hopper','Frida_Kahlo','Mary_Wollstonecraft','Hypatia','Sacagawea','Lise_Meitner']
  i = 0
  do{
    console.log('faceArray length ' + faceArray.length)
    let randomFaceIndex = Math.floor(Math.random() * (cellsIndexArray.length - i))
    let faceIndex = cellsIndexArray.splice(randomFaceIndex, 1)[0]
    anyBoard.cells[faceIndex].face = faceArray[i]
    i++
  }
  while (i < anyBoard.cells.length)
}

var board;

function initialize(size){
  board = makeBoard(size)
  addFaces(board)
  // addMines(board, userInput[1])
  console.log(board)
}

function startGame (){
  initialize(6)
  pairingSound = new sound('ding-sound-effect_2.mp3')
  losingSound = new sound('Losing-sound.mp3')
  document.addEventListener("click", checkForPair)
  document.addEventListener("click", checkForWin)
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

var checking = false
var lastIdx
var timeOut = 0
var Elt
function checkForPair (evt){
  var idx = getCellIndex(getRow(evt.target), getCol(evt.target))
  lastElt = Elt
  console.log(timeOut)
  if(timeOut != 0){
    return
  }
  if(idx === lastIdx){
    return
  }
  if(checking === false){
    checking = true
    lastIdx = idx
    Elt = evt.target
  }
  else if(checking === true){
    console.log('current cell  '+board.cells[lastIdx].face)
    if(board.cells[idx].face === board.cells[lastIdx].face){
      pairingSound.play()
      console.log('found a pair')
      checking = false
    }
    else if(board.cells[idx].face != board.cells[lastIdx].face){
      board.cells[lastIdx].hidden = true
      console.log('evt target '+evt.target)
      function hideCell(){
        evt.target.classList.toggle('hidden')
        Elt.classList.toggle('hidden')
        timeOut = 0
      }
      losingSound.play()
      timeOut = setTimeout(hideCell,1200)
      board.cells[idx].hidden = true
      lastIdx = undefined
      checking = false
    }
  }
}

function checkForWin(){
  if(board.cells.some(cell => cell.hidden === true)){
    return
  }
  else{
    lib.displayMessage('You win!')
  }
}