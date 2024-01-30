/* This file handle game logic under the game session */
import showResult from "./resultScreen.js";
import createStartScreen from "./app.js";
import { startGame } from "./playScreen.js";

let gameStats = []; //holds obj that contain info on every question, answer, right answer and if right.
let numOfGuess = 0;

//Handle event when user Answers
function handleAnswer(answer, rightAnswer, playerObj) {
  handleGuess(answer, rightAnswer); // handle the guess
  numOfGuess++;

  // if num of guesses is the same as playerobj.guesses the game is over.
  if (numOfGuess == playerObj.guesses) {
    showResult(gameStats, playerObj); // handle the result of the game round
    gameStats = []; // game is over and restor gameStats
    numOfGuess = 0; //
  }
}
export default handleAnswer;

//store info of every question under gaming round
function handleGuess(answer, right) {
  gameStats.push({
    rightAnswer: right,
    answer: answer,
    right: answer === right ? true : false,
  });
}

//Keep track of the quistions user have gotten right under a gaming round
export function currentGamePoints() {
  return gameStats.filter((ans) => {
    return ans.right === true;
  });
}

//* Köra om flera spel fungerar
export function handleEndGame(value, playerObj) {
  if (value === "yes") {
    startGame(playerObj);
    gameStats = [];
  } else {
    createStartScreen();
  }
}

export function scorePrevRound(prevRound) {
  return prevRound
    ? prevRound.filter((question) => question.right === true).length
    : 0;
}

export function feedbackOnGuess(pressedbtn, rightAnswer) {
  pressedbtn.className = pressedbtn.value === rightAnswer ? "RIGHT" : "WRONG";
}

export function startFromZero() {
  return {
    name: "",
    guesses: "",
    score: null,
    bestScore: null,
    prevRound: [],
  };
}
