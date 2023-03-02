// Define constants
const HOLES = 9;
const SCORE_TO_WIN = 10;
// Define variables
let score = 0;
let gameStarted = false;
let level = 1;
let Fspeed = 1;
let MOLE_APPEAR_TIME = 1000 * Fspeed;
let GAME_DURATION = 10 * MOLE_APPEAR_TIME;
// Select DOM elements
const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const startButton = document.querySelector(".start-button");
const mode = document.querySelector(".mode")

// Define functions
function startGame() {
   // console.log("startgame");
  gameStarted = true;
  score = 0;
  scoreBoard.textContent = score;
  startButton.disabled = true;
  setTimeout(() => {
    gameStarted = false;
    startButton.disabled = false;
    if(score<10){
        alert(`Game over! Your score is ${score}`);
    }
  }, GAME_DURATION);
  appearMole();
}

function appearMole() {
  if (gameStarted) {
    const holeIndex = Math.floor(Math.random() * HOLES);
    holes[holeIndex].classList.add("mole");
    setTimeout(() => {
      if (gameStarted) {
        holes[holeIndex].classList.remove("mole");
        appearMole();
      }
    }, MOLE_APPEAR_TIME);
  }
}

function whackMole(event) {
  if (event.target.classList.contains("mole")) {
    score++;
    scoreBoard.textContent = score;
    event.target.classList.remove("mole");
  }
  if (score === SCORE_TO_WIN) {
    gameStarted = false;
    startButton.disabled = false;
    alert("Congratulations, you won!");
  }
}
function updatemod(){
  switch(level) {
    case 1:
      level++;
      mode.textContent = "Mittel";
      mode.style.backgroundColor = "yellow";
      Fspeed = 0.75;
      break;
    case 2:
      level++;
      mode.textContent = "Schwer";
      mode.style.backgroundColor = "red";
      Fspeed = 0.50;
      break;
    default:
      level = 1; 
      mode.textContent = "Leicht";
      mode.style.backgroundColor = "limegreen";
      Fspeed = 1;
  }
}
// Add event listeners
holes.forEach(hole => hole.addEventListener("click", whackMole));
startButton.addEventListener("click", startGame);
mode.addEventListener("click", updatemod )
