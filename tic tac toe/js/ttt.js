//in html i differentiate class for css and id for js.

//dom elements
const boxElements= document.querySelectorAll("[data-cell");
const board = document.getElementById("board")
const resultPage = document.getElementById("resultMessage");
const winningMessage = document.querySelector("[data-result-message-text]");
const restartBtn = document.getElementById("restartBtn");

const X_TURN = "x";
const O_TURN = "o";
const WINNER_COMBO = [[0,1,2],
[0,3,6],
[0,4,8],
[3,4,5],
[6,7,8],
[1,4,7],
[2,5,8],
[2,4,6]
];

let circleTurn; // true or false?

start()

restartBtn.addEventListener("click", start);

////////////////////////functions////////////////////

function start(){
    circleTurn = false;
    boxElements.forEach(box => {
        box.classList.remove(X_TURN)
        box.classList.remove(O_TURN)
        box.removeEventListener("click", clicked)// we have to clear everything out in order to make it restart
        box.addEventListener("click", clicked, {once: true}) //{once:true} means that you will be able to click there only once
    })

addHoverClass()
resultPage.classList.remove("show")
}

function clicked(e){
//console.log("clicked")
const box = e.target;
//whose turn is it?
let turn = circleTurn? O_TURN: X_TURN;
//1 add a sign
addsign(box, turn)
if(checkWin(turn)){
//console.log("winner!")
endGame(false)
}else if(isDraw()){
endGame(true)
}else{
switchTurn()
addHoverClass()}
}

function addsign(box, turn){
    box.classList.add(turn)
}

function switchTurn(){
    circleTurn = !circleTurn
}

function addHoverClass(){
board.classList.remove(X_TURN);
board.classList.remove(O_TURN);
circleTurn? board.classList.add(O_TURN):board.classList.add(X_TURN)
}

function checkWin(turn){
    //check if won
    return WINNER_COMBO.some(combo => {
    //return = stop checking if u cant find it
    return combo.every(i => {
        return boxElements[i].classList.contains(turn)
    })
    })
}

function endGame(draw){
if(draw){
    winningMessage.innerText = "Draw!"
}
else{
winningMessage.innerText = `${circleTurn ? "O's" : "X's"} wins!`
}
resultPage.classList.add("show")// this is added anyway
}

function isDraw(){
    // check if all boxes are filled
    return [...boxElements].every(box => {
        //boxElements is a node and not an actual array so we use destructuring to turn it into an array
    return box.classList.contains(X_TURN) || box.classList.contains(O_TURN)
    })
}