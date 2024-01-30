import { handleEndGame } from "./gamelogic.js";

const playGround = document.querySelector("#playground");

function showResult(gameStatsArr, playerObj) {
  playGround.innerHTML = `
  <section class="resultContainer">
    <table>
        <thead>
            <tr>
                <td></td>
                <td>Rätt Svar</td>
                <td>Ditt Svar</td>
            </tr>
        </thead>
        <tbody class="tbodyEl">
            ${renderGameSession(gameStatsArr)}
            ${renderSummary(gameStatsArr, playerObj.guesses)}
        </tbody>
    </table>
    <div class="buttonContainer">
    <button  value="yes">Go Again</button>
    <button  value="no">I am done</button>
    </div>
</section>`;
  addEventListener(playerObj, gameStatsArr);
}
export default showResult;

function renderGameSession(gameStatsArr) {
  const tableRows = gameStatsArr
    .map((question) => {
      return `
        <tr>
            <td>${question.right === true ? "✅" : "❌"}</td>
            <td>${findStudentName(question.rightAnswer, students)}</td>
            <td>${findStudentName(question.answer, students)}</td>
        </tr>
    `;
    })
    .join(""); //if no join, commas will show on screen
  return tableRows;
}

function findStudentName(studentId, students) {
  return students.find((stud) => Number(studentId) === stud.id).name;
}

function renderSummary(gameStats, guesses) {
  const rightAnswers = gameStats.filter((ans) => ans.right === true).length;

  //todo lägg till best score
  return `
  <tfoot>
   <tr>
     <td>${rightAnswers}/${guesses}</td>
     <td></td>
     <td></td>
   </tr>
  <tfoot>
  `;
}

function addEventListener(playerObj, gamestatArr) {
  const btnEvent = document.querySelector(".buttonContainer");

  //Add this round to prevRound Array
  playerObj.prevRound.push(gamestatArr);

  //sort out how many right answers we got
  const numOfRightAnsw = gamestatArr.filter(
    (answers) => answers.right === true
  ).length;
  //check if we have a new score, if so, we assign it.
  playerObj.bestScore =
    numOfRightAnsw > playerObj.bestScore ? numOfRightAnsw : playerObj.bestScore;

  //---------------------------------------------------------------------------------

  btnEvent.addEventListener("click", (event) => {
    handleEndGame(event.target.value, playerObj);
  });
}
