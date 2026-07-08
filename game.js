const LCD_OFF = "#aebd9a";
const LCD_ON = "#34432b";

const GRID_COLS = 20;
const GRID_ROWS = 16;
const CELL_SIZE = 16;
const CELL_GAP = 2;

const BASE_TICKS_PER_MOVE = 10;
const MIN_TICKS_PER_MOVE = 4;
const SPEED_STEP_SCORE = 3;

const HIGH_SCORE_KEY = "snake_highscore";

// --- game state (logic) ---

function initialSnake() {
  return [
    { x: 10, y: 8 },
    { x: 9, y: 8 },
    { x: 8, y: 8 },
  ];
}

let snake = initialSnake();
let direction = { x: 1, y: 0 };
let nextDirection = direction;
let score = 0;
let highScore = Number(localStorage.getItem(HIGH_SCORE_KEY)) || 0;
let state = "start"; // "start" | "playing" | "gameover"
const food = { x: 0, y: 0 };

function setDirection(x, y) {
  const isReverse = x === -direction.x && y === -direction.y;
  if (isReverse) return;
  nextDirection = { x, y };
}

function randomCell() {
  return {
    x: Math.floor(Math.random() * GRID_COLS),
    y: Math.floor(Math.random() * GRID_ROWS),
  };
}

function respawnFood() {
  let cell;
  do {
    cell = randomCell();
  } while (snake.some((segment) => segment.x === cell.x && segment.y === cell.y));
  food.x = cell.x;
  food.y = cell.y;
}

function ticksPerMove() {
  const speedUps = Math.floor(score / SPEED_STEP_SCORE);
  return Math.max(MIN_TICKS_PER_MOVE, BASE_TICKS_PER_MOVE - speedUps);
}

function startGame() {
  snake = initialSnake();
  direction = { x: 1, y: 0 };
  nextDirection = direction;
  score = 0;
  framesSinceTick = 0;
  state = "playing";
  updateScoreDisplay();
  setStatus("");
  respawnFood();
}

function endGame() {
  state = "gameover";
  if (score > highScore) {
    highScore = score;
    localStorage.setItem(HIGH_SCORE_KEY, String(highScore));
  }
  updateScoreDisplay();
  setStatus(`Game Over — Score ${score} — Press Enter`);
}

function tick() {
  direction = nextDirection;
  const head = snake[0];
  const newHead = {
    x: (head.x + direction.x + GRID_COLS) % GRID_COLS,
    y: (head.y + direction.y + GRID_ROWS) % GRID_ROWS,
  };

  const willEat = newHead.x === food.x && newHead.y === food.y;
  const body = willEat ? snake : snake.slice(0, -1);
  const hitSelf = body.some((segment) => segment.x === newHead.x && segment.y === newHead.y);

  if (hitSelf) {
    endGame();
    return;
  }

  snake.unshift(newHead);
  if (willEat) {
    score++;
    updateScoreDisplay();
    respawnFood();
  } else {
    snake.pop();
  }
}

// --- input ---

const KEY_DIRECTIONS = {
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
};

document.addEventListener("keydown", (event) => {
  if (state !== "playing") {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      startGame();
    }
    return;
  }

  const mapped = KEY_DIRECTIONS[event.key];
  if (mapped) {
    event.preventDefault();
    setDirection(mapped[0], mapped[1]);
  }
});

// --- presentation hooks (DOM text outside the canvas) ---

const scoreEl = document.getElementById("score");
const statusEl = document.getElementById("status");

function updateScoreDisplay() {
  scoreEl.textContent = `Score: ${score}    High: ${highScore}`;
}

function setStatus(text) {
  statusEl.textContent = text;
}

// --- rendering ---

const canvas = document.getElementById("screen");
canvas.width = GRID_COLS * CELL_SIZE;
canvas.height = GRID_ROWS * CELL_SIZE;
const ctx = canvas.getContext("2d");

function drawCell(x, y) {
  ctx.fillRect(
    x * CELL_SIZE + CELL_GAP / 2,
    y * CELL_SIZE + CELL_GAP / 2,
    CELL_SIZE - CELL_GAP,
    CELL_SIZE - CELL_GAP
  );
}

function draw() {
  ctx.fillStyle = LCD_OFF;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = LCD_ON;
  for (const segment of snake) {
    drawCell(segment.x, segment.y);
  }
  drawCell(food.x, food.y);
}

// --- loop ---

let framesSinceTick = 0;

function loop() {
  framesSinceTick++;
  if (state === "playing" && framesSinceTick >= ticksPerMove()) {
    framesSinceTick = 0;
    tick();
  }
  draw();
  requestAnimationFrame(loop);
}

respawnFood();
updateScoreDisplay();
setStatus("Press Enter to Start");
requestAnimationFrame(loop);
