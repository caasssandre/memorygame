document.addEventListener('DOMContentLoaded', startGame)
var pairingSound
var losingSound

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
  this.reload = function(){
    this.sound.load();
  }
}


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
  var faceArray = ['Margo','Marie_Curie','Jacinda','Rosa_Parks','Greta_Thunberg','Ada_Lovelace','Rosalind_Franklin','Angela_Burdett_Coutts','Jane_Austen','Wangari_Maathai','Simone_de_Beauvoir','Ada_Lovelace','Grace_Hopper','Frida_Kahlo','Mary_Wollstonecraft','Hypatia','Sacagawea','Lise_Meitner','Margo','Marie_Curie','Jacinda','Rosa_Parks','Greta_Thunberg','Bessie_Coleman','Rosalind_Franklin','Angela_Burdett_Coutts','Jane_Austen','Wangari_Maathai','Simone_de_Beauvoir','Bessie_Coleman','Grace_Hopper','Frida_Kahlo','Mary_Wollstonecraft','Hypatia','Sacagawea','Lise_Meitner']
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
var closeBtn
function initialize(size){
  board = makeBoard(size)
  addFaces(board)
  console.log(board)
  closeBtn = document.getElementsByClassName('close');
  addEventListenersCloseModal()
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
var idx
function checkForPair (evt){
  idx = getCellIndex(getRow(evt.target), getCol(evt.target))
  if(timeOut != 0 || board.cells[idx].hidden == false){
    return
  }
  if(idx === lastIdx){
    return
  }
  board.cells[idx].hidden = false
  lastElt = Elt
  console.log(board.cells[idx].hidden)
  if(checking === false){
    checking = true
    lastIdx = idx
    Elt = evt.target
  }
  else if(checking === true){
    console.log('current cell  '+board.cells[lastIdx].face)
    if(board.cells[idx].face === board.cells[lastIdx].face){
      pairingSound.reload()
      pairingSound.play()
      bioModal(idx)
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
      losingSound.reload()
      losingSound.play()
      timeOut = setTimeout(hideCell,1000)
      board.cells[idx].hidden = true
      lastIdx = undefined
      checking = false
    }
  }
}


function addEventListenersCloseModal(){
  for(let i=0; i<closeBtn.length; i++){
    closeBtn[i].addEventListener('click', closeModal);
  }
  window.addEventListener('click', outsideClick);
}

function closeModal() {
  margoModal.style.display = 'none'
  marieCurieModal.style.display = 'none'
  jacindaModal.style.display = 'none'
  rosaParksModal.style.display = 'none'
  gretaThunbergModal.style.display = 'none'
  adaLovelaceModal.style.display = 'none'
  rosalindFranklinModal.style.display = 'none'
  angelaBurdettCouttsModal.style.display = 'none'
  janeAustenModal.style.display = 'none'
  wangariMaathaiModal.style.display = 'none'
  simonedeBeauvoirModal.style.display = 'none'
  graceHopperModal.style.display = 'none'
  fridaKahloModal.style.display = 'none'
  maryWollstonecraftModal.style.display = 'none'
  hypatiaModal.style.display = 'none'
  sacagaweaModal.style.display = 'none'
  bessieColemanModal.style.display = 'none'
  liseMeitnerModal.style.display = 'none'
  startModal.style.display = 'none'
}


function outsideClick(e) {
  if (e.target == margoModal) {
    margoModal.style.display = 'none'
  }
  if (e.target == marieCurieModal) {
    marieCurieModal.style.display = 'none'
  }
  if (e.target == jacindaModal) {
    jacindaModal.style.display = 'none'
  }
  if (e.target == rosaParksModal) {
    rosaParksModal.style.display = 'none'
  }
  if (e.target == gretaThunbergModal) {
    gretaThunbergModal.style.display = 'none'
  }
  if (e.target == adaLovelaceModal) {
    adaLovelaceModal.style.display = 'none'
  }
  if (e.target == rosalindFranklinModal) {
    rosalindFranklinModal.style.display = 'none'
  }
  if (e.target == angelaBurdettCouttsModal) {
    angelaBurdettCouttsModal.style.display = 'none'
  }
  if (e.target == janeAustenModal) {
    janeAustenModal.style.display = 'none'
  }
  if (e.target == wangariMaathaiModal) {
    wangariMaathaiModal.style.display = 'none'
  }
  if (e.target == simonedeBeauvoirModal) {
    simonedeBeauvoirModal.style.display = 'none'
  }
  if (e.target == graceHopperModal) {
    graceHopperModal.style.display = 'none'
  }
  if (e.target == fridaKahloModal) {
    fridaKahloModal.style.display = 'none'
  }
  if (e.target == maryWollstonecraftModal) {
    maryWollstonecraftModal.style.display = 'none'
  }
  if (e.target == hypatiaModal) {
    hypatiaModal.style.display = 'none'
  }
  if (e.target == sacagaweaModal) {
    sacagaweaModal.style.display = 'none'
  }
  if (e.target == bessieColemanModal) {
    bessieColemanModal.style.display = 'none'
  }
  if (e.target == liseMeitnerModal) {
    liseMeitnerModal.style.display = 'none'
  }
  if (e.target == startModal) {
    startModal.style.display = 'none'
  }
}

function bioModal(idx){
  if(board.cells[idx].face === 'Margo'){
    margoModal.style.display = 'block'
  }
  if(board.cells[idx].face === 'Marie_Curie'){
    marieCurieModal.style.display = 'block'
  }
  if(board.cells[idx].face === 'Jacinda'){
    jacindaModal.style.display = 'block'
  }
  if(board.cells[idx].face === 'Rosa_Parks'){
    rosaParksModal.style.display = 'block'
  }
  if(board.cells[idx].face === 'Greta_Thunberg'){
    gretaThunbergModal.style.display = 'block'
  }
  if(board.cells[idx].face === 'Ada_Lovelace'){
    adaLovelaceModal.style.display = 'block'
  }
  if(board.cells[idx].face === 'Rosalind_Franklin'){
    rosalindFranklinModal.style.display = 'block'
  }
  if(board.cells[idx].face === 'Angela_Burdett_Coutts'){
    angelaBurdettCouttsModal.style.display = 'block'
  }
  if(board.cells[idx].face === 'Jane_Austen'){
    janeAustenModal.style.display = 'block'
  }
  if(board.cells[idx].face === 'Wangari_Maathai'){
    wangariMaathaiModal.style.display = 'block'
  }
  if(board.cells[idx].face === 'Simone_de_Beauvoir'){
    simonedeBeauvoirModal.style.display = 'block'
  }
  if(board.cells[idx].face === 'Grace_Hopper'){
    graceHopperModal.style.display = 'block'
  }
  if(board.cells[idx].face === 'Frida_Kahlo'){
    fridaKahloModal.style.display = 'block'
  }
  if(board.cells[idx].face === 'Mary_Wollstonecraft'){
    maryWollstonecraftModal.style.display = 'block'
  }
  if(board.cells[idx].face === 'Hypatia'){
    hypatiaModal.style.display = 'block'
  }
  if(board.cells[idx].face === 'Sacagawea'){
    sacagaweaModal.style.display = 'block'
  }
  if(board.cells[idx].face === 'Bessie_Coleman'){
    bessieColemanModal.style.display = 'block'
  }
  if(board.cells[idx].face === 'Lise_Meitner'){
    liseMeitnerModal.style.display = 'block'
  }  
}

function checkForWin(){
  if(board.cells.some(cell => cell.hidden === true)){
    return
  }
  else{
    winButton.style.display = 'block'
    winButton.addEventListener('click', reloadPage)
  }
}

function reloadPage(){
  location.reload()
}