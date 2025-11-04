const url =  "https://words.dev-apis.com/word-of-the-day";
async function newWord() {
  const promise = await fetch(url);
  const processedResponse = await promise.json();
  target = processedResponse.word
  console.log("Word of the day:" ,target)
  return target 
}
const wordOfTheDay= newWord () 

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
        console.log(userGuess, wordOfTheDay)
    
        currentRowIndex++ 
        currentCellIndex = 0;
        userGuess = '';

    } else if (event.key === "Backspace" && currentCellIndex > 0 ) {
        currentCellIndex--
        const rowStart = currentRowIndex * cellsPerRow;
        const cell = cells[rowStart + currentCellIndex];
        cell.textContent = '';
        userGuess = userGuess.slice (0, -1);
    }
})

