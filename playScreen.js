import shuffle from "./shuffle.js";
import handleAnswer from "./gamelogic.js";
import {
  currentGamePoints,
  scorePrevRound,
  feedbackOnGuess,
} from "./gamelogic.js";
/* This file handles the gaming UI and logic to present a question to the user */

// Get the root-element for game rendering
const playGround = document.querySelector("#playground");
let numOfGuess = 0; // counter for guesses
let gameArray = []; // array for the random students

//starts the game (from scratch or restart).. Foundation for the whole game
export function startGame(player) {
  numOfGuess = 0; // reset the number if user wanna go again
  gameArray = getGameArray(students, player.guesses); //Get randomized students to guess on every round
  renderGameScreen(player); // renders game when everything is ready
}

//Get randomized students
function getGameArray(students, guesses) {
  // shuffle students. Slice so we only get the amount user is guessing on
  return shuffle.shuffleArray(students).slice(0, guesses);
}

export default { startGame }; //Only exporting startGame becuase it sets the foundation to the game.

function renderScoreBoard(player) {
  //Render the scoreboard under playing time
  const currScore = currentGamePoints(); // return array of the ans user got right
  let score = currScore.filter((ans) => ans.right === true).length;

  // Getting the score from prev round
  const prevRound = scorePrevRound(
    player.prevRound[player.prevRound.length - 1] // could use pop, but I just want the last array-item with out chaning the array
  );

  return `
  <aside id="scoreBoard" class="scoreBoard">
    <div>
      <p>Best Score:</p>
      <p class="head">${player.bestScore ? player.bestScore : "0"}</p>
    </div>
    <div>
      <p>Prev Round: </p>
      <p class="head">${prevRound}</p>
    </div>
    <div>
      <p>Points:</p>
      <p class="head">${score}</p>
    </div>
  </aside>
    `;
}

// render the gameScreen
function renderGameScreen(player) {
  //render img with response btns
  //renderScoreBoard -> Render the scoreboard under IMG
  // getAnswers -> Render the buttons with answers
  playGround.innerHTML = `
<div class="outerContainer">
        <img src="${gameArray[numOfGuess].image}" data-id="${
    gameArray[numOfGuess].id
    /* Give the img a value attribute so we can compare img to the guess of the user */
  }" class="studentImg"/>
      <div class="scoreBoard">
        ${renderScoreBoard(player)} 
      </div>
      <div class="answerContainer">
        ${getAnswers(gameArray[numOfGuess].id, gameArray)}
      </div>
</div>
    `;
  // add eventListeners to the buttons that contain the answers
  handleAnswerEvent(player); //sends in playerObject
}

// correctAnswerID is the ID of the students showing
// The game array is sent in to find 3 alternativ answer
function getAnswers(correctAnswerID, array) {
  // Get the student obj that is the correct answer
  const rightAnswer = array.filter((students) => {
    if (students.id === correctAnswerID) {
      return students.name;
    }
  });

  /* Creates a random number so we slice from random place everytime we getting answers
 the +3 make certain that we end up with 3 students no more, no less */
  const randomNum = Math.random() * (array.length - 3);

  //get the wrong answers from student array
  const wrongAnswers = array
    .filter((students) => students.id !== correctAnswerID)
    .slice(randomNum, randomNum + 3); // slice and only give back 3 wrong alternatives

  /* concat right answer with wrong answers and send it as an argument. I then map the result and returns the buttons
  with HTML. The reason I can do this is becuase I initiate the function with in back-tickets in renderGameScreen  */
  return shuffle
    .shuffleArray(rightAnswer.concat(wrongAnswers))
    .map((student) => {
      return `<button value="${student.id}">${student.name}</button>`;
    })
    .join(""); // Join take aways comas between the btn
}

// Adds eventListeners to the buttons and initiate a function that handles the choice from the user
function handleAnswerEvent(player) {
  const buttonContainer = document.querySelector(".answerContainer");

  buttonContainer.addEventListener("click", (event) => {
    const rightAnswer = document.querySelector(".studentImg").dataset.id;

    //handle button feedback
    feedbackOnGuess(event.target, rightAnswer);

    setTimeout(() => {
      handleAnswer(event.target.value, rightAnswer, player);
      numOfGuess++;
      if (numOfGuess < player.guesses) {
        renderGameScreen(player);
      }
    }, 750);
  });
}
