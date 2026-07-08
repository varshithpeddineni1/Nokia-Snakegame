# Nokia Snake — Implementation Plan

Seven small phases (0–6). Each ends in a concrete **Verify** bar: don't move on until it's true. Build the game first, dress it as a Nokia second, deploy last.

---

## Phase 0 — Scaffold + deploy pipeline
Set up the skeleton and confirm the deploy path works while there's nothing to break.
- `index.html`, `style.css`, `game.js` — three files, no build step.
- A centered `<canvas>` with the LCD background color filled in.
- Push to a static host (Vercel/Netlify), get a live URL.

**Verify:** a blank grey-green screen is live on the web at a real URL.

---

## Phase 1 — LCD screen + game loop
Get the render loop running and draw a static snake.
- Define the grid (e.g. 20x16 cells) and a cell-size in pixels.
- A `requestAnimationFrame` loop that **ticks the game every N frames**, not every frame (so the snake moves at a playable speed, not 60/sec).
- A `draw()` that clears the screen and draws cells with the 1–2px gap.
- Draw a static 3-segment snake and one food cell.

**Verify:** the snake and food are visible on the green LCD, cells have gaps, and the loop is running at a fixed tick you can see in the console.

---

## Phase 2 — Movement + input
Make it move and steer.
- Snake is an array of `{x, y}` segments; each tick, add a new head in the current direction and drop the tail.
- Arrow keys set the direction.
- Guard against reversing directly into itself in a single tick.

**Verify:** the snake glides on its own, steers with the arrow keys, and cannot instantly reverse into its own neck.

---

## Phase 3 — Food, growth, collision, score
Turn it into an actual game.
- On eating food: keep the tail (grow by one), respawn food on a random empty cell, increment score.
- Edges wrap: exit one side, re-enter the opposite side (authentic 3310). Game over only on hitting the snake's own body.
- Show the current score; add a restart.

**Verify:** a fully playable Snake — eating grows the snake and raises the score, collisions end the game, and restart works.

---

## Phase 4 — Nokia body (CSS)
Wrap the working game in the phone.
- CSS phone body around the canvas: rounded dark frame, earpiece slit, Nokia-style logo.
- D-pad + number keypad below the screen (cosmetic for now).
- Pixel font for the score; optional LCD tint over the screen.

**Verify:** it reads as a Nokia 3310 — the green screen sits inside a recognizable phone body, and the game still plays exactly as before.

---

## Phase 5 — Feel + persistence
Make it feel finished.
- Speed ramps up gradually as the score climbs.
- High score saved to `localStorage`, shown on screen, survives reloads.
- A simple start screen and a clean game-over screen.
- Optional: a short beep on eating, pixel signal/battery bars, startup animation.

**Verify:** the high score persists across a full page reload, difficulty ramps as you grow, and the start/over screens feel intentional.

---

## Phase 6 — Clickable keypad + mobile + final deploy
Make it playable on a phone and ship it.
- Wire the D-pad / keypad buttons to the same direction logic the keyboard uses.
- Tap works on a touchscreen; layout scales sensibly on a phone.
- Final deploy; test the live URL on an actual phone.

**Verify:** on a real phone, you can play by tapping the on-screen keys, and the live URL works on both desktop and mobile.

---

## Notes for the build
- Keep **game logic** (state, movement, collision) separate from **rendering** (canvas draw) and from the **Nokia skin** (CSS). That separation is half the lesson.
- Tune grid size and tick speed in Phase 3 once it's playable; don't over-plan the numbers up front.
- No backend, no env vars, no accounts. If a global leaderboard ever tempts you, that's a separate project on top — don't let it creep into these phases.
