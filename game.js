const LCD_OFF = "#aebd9a";
const LCD_ON = "#34432b";

const GRID_COLS = 20;
const GRID_ROWS = 16;
const CELL_SIZE = 16;
const CELL_GAP = 2;

const TICKS_PER_MOVE = 10;

// --- game state (logic) ---

const snake = [
  { x: 10, y: 8 },
  { x: 9, y: 8 },
  { x: 8, y: 8 },
];

const food = { x: 15, y: 8 };

let tickCount = 0;

function tick() {
  tickCount++;
  console.log("tick", tickCount);
}

// --- rendering ---

const canvas = document.getElementById("screen");
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

let frameCount = 0;

function loop() {
  frameCount++;
  if (frameCount % TICKS_PER_MOVE === 0) {
    tick();
  }
  draw();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
