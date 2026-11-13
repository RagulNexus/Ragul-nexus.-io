

// MOBILE MENU
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

document.querySelectorAll("#navMenu a").forEach(link => {
  link.addEventListener("click", () => navMenu.classList.remove("show"));
});

// FOOTER YEAR
document.getElementById("year").textContent = new Date().getFullYear();

// TYPING EFFECT
const words = ["Developer", "Creator", "Gamer", "Dreamer"];
const typingElement = document.getElementById("typing");

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const word = words[wordIndex];

  typingElement.textContent = word.substring(0, charIndex);

  if (!deleting) {
    charIndex++;
    if (charIndex > word.length) {
      deleting = true;
      setTimeout(typeEffect, 1000);
      return;
    }
  } else {
    charIndex--;
    if (charIndex < 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      charIndex = 0;
    }
  }

  setTimeout(typeEffect, deleting ? 55 : 110);
}

typeEffect();

// NEON RACER GAME
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreText = document.getElementById("score");
const message = document.getElementById("gameMessage");
const startButton = document.getElementById("startGame");

const road = { x: 45, width: 230 };
const lanes = [95, 160, 225];

let playerLane = 1;
let obstacles = [];
let score = 0;
let speed = 3;
let running = false;
let gameOver = false;
let animationId = null;
let lastObstacleTime = 0;

function drawRoad() {
  ctx.fillStyle = "#101010";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#292929";
  ctx.fillRect(road.x, 0, road.width, canvas.height);

  ctx.strokeStyle = "#eeeeee";
  ctx.lineWidth = 3;
  ctx.setLineDash([22, 20]);

  ctx.beginPath();
  ctx.moveTo(road.x + road.width / 3, 0);
  ctx.lineTo(road.x + road.width / 3, canvas.height);
  ctx.moveTo(road.x + (road.width * 2) / 3, 0);
  ctx.lineTo(road.x + (road.width * 2) / 3, canvas.height);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = "#ff6a00";
  ctx.fillRect(road.x - 3, 0, 3, canvas.height);
  ctx.fillRect(road.x + road.width, 0, 3, canvas.height);
}

function drawCar(x, y, color, isPlayer = false) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(x - 16, y, 32, 55, 7);
  ctx.fill();

  ctx.fillStyle = isPlayer ? "#fff0d9" : "#222";
  ctx.fillRect(x - 10, y + 9, 20, 13);

  ctx.fillStyle = "#111";
  ctx.fillRect(x - 20, y + 9, 5, 13);
  ctx.fillRect(x + 15, y + 9, 5, 13);
  ctx.fillRect(x - 20, y + 36, 5, 12);
  ctx.fillRect(x + 15, y + 36, 5, 12);

  if (isPlayer) {
    ctx.shadowColor = "#ff6a00";
    ctx.shadowBlur = 15;
    ctx.strokeStyle = "#ff9d42";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.shadowBlur = 0;
  }
}

function drawGame() {
  drawRoad();

  // Player car
  drawCar(lanes[playerLane], 390, "#ff6a00", true);

  // Traffic cars
  obstacles.forEach(car => {
    drawCar(lanes[car.lane], car.y, car.color);
  });
}

function movePlayer(direction) {
  if (!running) return;
  playerLane = Math.max(0, Math.min(2, playerLane + direction));
}

document.addEventListener("keydown", event => {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    movePlayer(-1);
  }
  if (event.key === "ArrowRight") {
    event.preventDefault();
    movePlayer(1);
  }
});

document.getElementById("leftBtn").addEventListener("click", () => movePlayer(-1));
document.getElementById("rightBtn").addEventListener("click", () => movePlayer(1));

function createObstacle() {
  const colors = ["#00c8ff", "#e83cff", "#48d17a", "#eeeeee"];
  const lane = Math.floor(Math.random() * 3);

  obstacles.push({
    lane,
    y: -65,
    color: colors[Math.floor(Math.random() * colors.length)]
  });
}

function checkCollision(car) {
  const sameLane = car.lane === playerLane;
  const closeEnough = car.y + 55 > 390 && car.y < 445;
  return sameLane && closeEnough;
}

function endGame() {
  running = false;
  gameOver = true;
  message.textContent = "💥 GAME OVER! Your score: " + score;
  startButton.textContent = "PLAY AGAIN";
  cancelAnimationFrame(animationId);
}

function gameLoop(timestamp) {
  if (!running) return;

  if (timestamp - lastObstacleTime > Math.max(450, 1050 - score * 8)) {
    createObstacle();
    lastObstacleTime = timestamp;
  }

  obstacles.forEach(car => {
    car.y += speed;
  });

  obstacles = obstacles.filter(car => car.y < canvas.height + 70);

  for (const car of obstacles) {
    if (checkCollision(car)) {
      endGame();
      drawGame();
      return;
    }
  }

  score++;
  scoreText.textContent = Math.floor(score / 10);
  speed = 3 + Math.min(score / 250, 4);

  drawGame();
  animationId = requestAnimationFrame(gameLoop);
}

function startGame() {
  cancelAnimationFrame(animationId);

  playerLane = 1;
  obstacles = [];
  score = 0;
  speed = 3;
  lastObstacleTime = 0;
  running = true;
  gameOver = false;

  scoreText.textContent = "0";
  message.textContent = "Race started! Dodge the traffic!";
  startButton.textContent = "RESTART";

  drawGame();
  animationId = requestAnimationFrame(gameLoop);
}

startButton.addEventListener("click", startGame);

drawGame();
