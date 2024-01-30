import gameScreen from "./playScreen.js";
import { startFromZero } from "./gamelogic.js";

// get the root-element where the game is rendered
/* The root-element make it easy to render new stuff. I just need to change the inner.HTML */
const playGround = document.querySelector("#playground");

// Render the startscreen -> Name and how many guesses the user want to do
export default function createStartScreen() {
  // createe a obj that is a gamer profile.
  const player = startFromZero();

  playGround.innerHTML = `
    <div class="outerContainer">
      <form id="form">
        <label>Skriv in ditt namn</label>
        <input id="playerNameEl" placeholder="Write your name">
        <div class="containerLevels">
        <label name="level10"><input for="level10" name="level" class="altBtn" value="10" type="radio">10</label>
        <label name="level20"><input for="level20" name="level" class="altBtn" value="20" type="radio">20</label>
        <label name="levelAll"><input for="levelAll" name="level" class="altBtn" value="all"type="radio">Alla</label>
        </div>
        <button class="startGame" value="1">Start Game</button>
      </form>
      <div id="errorMessages"></div>
    </div>
  `;
  // sets eventListeners to the choices.
  addEventListeners(player);
}

/* Set listener to the form for starting the game and which choices that are made. */
function addEventListeners(player) {
  // get the form so we can add eventListeners
  const form = playGround.querySelector("form");
  // get the player name

  // add eventListener to the form so we can listen on clicks inside the form
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const errorMsg = document.querySelector("#errorMessages");
    const playerNameEl = document.querySelector("#playerNameEl").value;
    const selectedLevel = document.querySelector("input[name='level']:checked");
    var numOfGuesses = selectedLevel ? selectedLevel.value : "";

    //get the elements that had an action on it, threw activeElement

    if (!playerNameEl && !numOfGuesses) {
      errorMsg.innerHTML = `
      <div>
        <p>Måste ange namn och antal gissningar du vill göra</p>
      </div>
      `;
    } else if (!playerNameEl) {
      errorMsg.innerHTML = `
      <div>
        <p>Vad heter du? Ange ditt namn</p>
      </div>
      `;
    } else if (!numOfGuesses) {
      errorMsg.innerHTML = `
      <div>
        <p>Vi behöver veta hur många gissningar du vill göra ${playerNameEl}</p>
      </div>
      `;
    } else {
      errorMsg.remove();
      player.guesses =
        numOfGuesses == "all" ? students.length : Number(numOfGuesses);
      player.name = playerNameEl;
      gameScreen.startGame(player);
    }
  });
}

//Kör createStartScreen() when page is loaded or re-loaded!
createStartScreen();
