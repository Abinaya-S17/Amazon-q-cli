const grid = document.getElementById("grid");
const scoreDisplay = document.getElementById("score");

let cells = [];
let playerScore = 0;
let botScore = 0;
let timeLeft = 60;
let timer;
let botInterval;
let botDelay = 800;
let freezeActive = false;
let freezeTimeout;

function startGame() {
  grid.innerHTML = "";
  cells = [];
  playerScore = 0;
  botScore = 0;
  timeLeft = 60;
  botDelay = 800;
  updateScore();

  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", () => handleClick(cell));
    grid.appendChild(cell);
    cells.push(cell);
  }

  startBotLoop();
  startTimer();
}

function handleClick(cell) {
  if (cell.classList.contains("player") || cell.classList.contains("bot")) return;

  if (cell.classList.contains("freeze")) {
    freezeBot();
    cell.classList.remove("freeze");
    cell.textContent = "";
    return;
  }

  cell.classList.add("player");
  playerScore++;
  updateScore();
}

function updateScore() {
  scoreDisplay.textContent = `You: ${playerScore} | Bot: ${botScore} | Time: ${timeLeft}s`;
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    updateScore();

    if (timeLeft % 15 === 0 && botDelay > 200) {
      botDelay -= 100;
      restartBotLoop();
    }

    if (timeLeft % 10 === 0) {
      spawnFreezeTile();
    }

    if (timeLeft === 0) endGame();
  }, 1000);
}

function startBotLoop() {
  botInterval = setInterval(botPaint, botDelay);
}

function restartBotLoop() {
  clearInterval(botInterval);
  startBotLoop();
}

function botPaint() {
  if (freezeActive) return;

  const unclaimed = cells.filter(
    c => !c.classList.contains("player") && !c.classList.contains("bot") && !c.classList.contains("freeze")
  );
  if (unclaimed.length === 0) return;

  const randomCell = unclaimed[Math.floor(Math.random() * unclaimed.length)];
  randomCell.classList.add("bot");
  botScore++;
  updateScore();
}

function freezeBot() {
  freezeActive = true;
  clearInterval(botInterval);
  freezeTimeout = setTimeout(() => {
    freezeActive = false;
    startBotLoop();
  }, 3000);
}

function spawnFreezeTile() {
  const unclaimed = cells.filter(
    c => !c.classList.contains("player") && !c.classList.contains("bot") && !c.classList.contains("freeze")
  );
  if (unclaimed.length === 0) return;

  const cell = unclaimed[Math.floor(Math.random() * unclaimed.length)];
  cell.classList.add("freeze");
  cell.textContent = "🧊";
}

function endGame() {
  clearInterval(timer);
  clearInterval(botInterval);
  clearTimeout(freezeTimeout);

  const result = playerScore > botScore
    ? "win"
    : playerScore < botScore
    ? "lose"
    : "tie";

  document.getElementById("resultType").value = result;
  document.getElementById("playerScore").value = playerScore;
  document.getElementById("botScore").value = botScore;

  document.getElementById("resultForm").submit();
}

startGame();
