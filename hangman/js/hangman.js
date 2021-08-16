let states = ["enugu", "fct", "lagos", "bauchi", "kaduna", "katsina", "kano", "sokoto", "abia", 
"imo", "anambra", "adamawa", "akwaibom", "bayelsa", "benue", "borno", "crossriver", "delta", "gombe",
 "jigawa","sokoto", "niger", "ebonyi", "edo", "ekiti", "kebbi", "kogi", "kwara", "nasarawa", "ogun", "ondo", "osun",
"oyo", "plateau", "rivers", "taraba", "yobe", "zamfara" ]


let answer = "";
let maximumWrongLetters = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;


function randomWord(){
    answer = states[Math.floor(Math.random() * states.length)]
}

function generateButton (){
    let buttonHTML = "abcdefghijklmnopqrstuvwxyz".split("").map(letter =>
        `
        <button 
        class="btn btn-lg btn-primary m-2" 
        id= '` + letter + `'
        onClick ="handleGuess('` + letter + `')"> ${letter}</button>
         `).join("") ;

        document.getElementById("keyboard").innerHTML = buttonHTML
}

function handleGuess(chosenLetter){
guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter): null; //-1 means it doesnt exist
// if indexOf "a" is not present in the guessed words array then add it to the array if is present then null
document.getElementById(chosenLetter).setAttribute("disabled", true) // this is a repetiotion of null

//alert(answer);

if(answer.indexOf(chosenLetter) >= 0){
// 0 means it exists
guessedWord()
checkWin()
} else if (answer.indexOf(chosenLetter) === -1){
    mistakes++;
    updateMistakes();
    checkLoss();
    updatePicture();
}
}

function updatePicture(){
    document.getElementById("hangmanPic").src = "./images/" + mistakes + ".jpg";
}

function checkWin(){
if(wordStatus === answer){
    document.getElementById("keyboard").innerHTML = "You won!!!";
}
}

function checkLoss(){
    if(mistakes === maximumWrongLetters){
        document.getElementById("wordspotlight").innerHTML= "The correct answer was: " + answer
        document.getElementById("keyboard").innerHTML = "You Lost!!!";
    }
}


function guessedWord(){
wordStatus = answer.split("").map(letter => (guessed.indexOf(letter)>= 0 ? letter : " _ ")).join("");

document.getElementById("wordspotlight").innerHTML= wordStatus;
}


function updateMistakes(){
document.getElementById("mistakes").innerHTML= mistakes;

}

function reset(){
   mistakes = 0;
   guessed = [];
   document.getElementById("hangmanPic").src = "./images/0.jpg"; 

   randomWord()
   guessedWord()

   updateMistakes()
   generateButton()
}

document.getElementById("maxwrong").innerHTML = maximumWrongLetters;

randomWord()
guessedWord()
generateButton()
