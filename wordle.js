async function setUp() {
    let wordOfTheDay = await newWord();
    initialisedLetterCounts(wordOfTheDay)

}

async function newWord() {
    const url =  "https://words.dev-apis.com/word-of-the-day";
  const promise = await fetch(url);
  const processedResponse = await promise.json();
  wordOfTheDay = processedResponse.word 
  console.log("Word of the day:" ,wordOfTheDay)
    return wordOfTheDay
}

function initialisedLetterCounts(wordOfTheDay) {
    const wordOfTheDayLetterCounts = {};
    console.log(wordOfTheDay)
   for (let i = 0; i < wordOfTheDay.length; i++) {
    console.log(wordOfTheDayLetterCounts[wordOfTheDay[i]] == undefined)
    if (wordOfTheDayLetterCounts[wordOfTheDay[i]] == undefined) {
        wordOfTheDayLetterCounts[wordOfTheDay[i]]= 1
    } else {
        wordOfTheDayLetterCounts[wordOfTheDay[i]] += 1; 
    }
 }
    console.log(wordOfTheDayLetterCounts)
}
setUp()

const ROUNDS = 6
let done = false
const cellsPerRow = 5
let userGuess = ""
let rowLength = cellsPerRow 
let currentRowIndex = 0

//letter in a box
let currentCellIndex = 0;
const cells = Array.from(document.querySelectorAll(".cell"));

document.addEventListener("keydown", function(event) {
    const rowStart = currentRowIndex * cellsPerRow
    const key = event.key;
    if (/^[a-zA-Z]$/.test(key) && currentCellIndex < cellsPerRow) { 
        const cell = cells[rowStart + currentCellIndex];
        cell.textContent = key.toUpperCase();

        currentCellIndex++; 
        userGuess += key
    } else if (event.key === "Enter" && currentCellIndex === cellsPerRow) {
        console.log("Userguess:", userGuess);
        console.log("Target Word:", wordOfTheDay);

        
    //colour cells 
    for (let i = 0; i < userGuess.length; i++) {
        const cellId = rowStart + i
        const cell = document.getElementById(cellId)
        if (userGuess [i] === wordOfTheDay [i]) {
            cell.classList.add("correct");
        } else if (wordOfTheDay.includes (userGuess[i])) {
            cell.classList.add("nearly")
        } else {
            cell.classList.add("incorrect");
        }
    }

    if (userGuess === wordOfTheDay) {
            alert("Yay! You win :)")
            console.log("Correct!");
            done = true;
            return; 
        } else {
            console.log("Incorrect!");
        } 

        currentRowIndex++ 
        currentCellIndex = 0;
        userGuess = '';
        
        if (currentRowIndex >= ROUNDS) {
            alert (`Oh no you lose :( The correct word was ${wordOfTheDay}`)
            done = true;
        }

     

    } else if (event.key === "Backspace" && currentCellIndex > 0 ) {
        currentCellIndex--
        const rowStart = currentRowIndex * cellsPerRow;
        const cell = cells[rowStart + currentCellIndex];
        cell.textContent = '';
        userGuess = userGuess.slice (0, -1);
    }
})