# Nokia Snake — Spec

## 1. Concept
A browser-based Snake game rendered on an HTML canvas, wrapped in a full Nokia 3310 phone body built in CSS. The screen mimics the old monochrome LCD: a pale grey-green background with dark, chunky "pixels." The phone frame around it — body, logo, earpiece, D-pad, and keypad — is part of the experience, not just decoration.

## 2. Goals
- Build a real-time game loop (the main new skill vs. XO Duel's turn-based logic).
- Learn canvas drawing: clearing and redrawing a grid every frame.
- Nail a convincing retro aesthetic with a strict two-color palette.
- Ship it live as a static site — no backend, no deployment gauntlet.

## 3. Tech stack
- **Plain HTML / CSS / JavaScript.** No framework, no build step.
- **Canvas** for the game screen.
- **localStorage** for the high score (per-device, no server).
- **Static hosting** (Vercel or Netlify) for deployment.

Rationale: a canvas game loop fights React's render model; the Nokia body is static CSS; no server is needed. This is deliberately the opposite of XO Duel's stack — the point is the game loop, not the infrastructure.

## 4. Scope

### In scope
- Classic Snake: move, eat, grow, die on wall or self collision.
- Score display + persistent local high score.
- Full Nokia 3310 CSS body around the LCD.
- Keyboard controls (arrows), then clickable/tappable keypad.
- Increasing speed as the snake grows.
- Start screen and game-over/restart flow.

### Out of scope (for now)
- Global leaderboard (would require a backend — deliberately excluded).
- Accounts, multiplayer, online anything.
- Sound is optional polish, not core.

## 5. Visual spec (Nokia LCD)
Starting palette tokens (tweak to taste):
- LCD background (pixel "off"): `#aebd9a` (grey-green). Alt Game Boy look: `#9bbc0f`.
- Pixel "on" (snake, food, text): `#34432b` (dark green-black).
- Phone body: dark grey gradient, e.g. `#3b3f45` to `#23262b`.

LCD rules:
- Fixed grid of cells (e.g. 20x16). Each drawn object fills its cell minus a 1–2px gap, so a thin background line shows between cells — this sells the chunky-LCD look.
- No gradients or shadows inside the screen. Two colors only.
- Blocky pixel font for the score (e.g. "Press Start 2P").

Phone body:
- Rounded dark body around the canvas, earpiece slit, Nokia-style logo, a D-pad and number keypad below the screen.
- Optional touches later: LCD glass tint, pixel signal/battery bars, startup animation, beep on eat.

## 6. Game rules (SHALL format)
- The snake SHALL move one cell per tick in its current direction, automatically.
- Arrow keys (and later keypad) SHALL change direction.
- The snake SHALL NOT be able to reverse directly into itself in one step.
- Eating food SHALL grow the snake by one segment and increase the score.
- Food SHALL respawn on a random empty cell after being eaten.
- The play area SHALL wrap: exiting one edge re-enters from the opposite edge (authentic Nokia 3310 Snake II behavior).
- Colliding with the snake's own body SHALL end the game.
- On game over, the player SHALL be able to restart.
- The high score SHALL persist across reloads via localStorage.
- Speed SHALL increase gradually as the score rises.

## 7. Controls
- **Keyboard:** Arrow keys steer; a key (e.g. Enter/Space) starts or restarts.
- **Keypad (later phase):** 2/4/6/8 and/or the D-pad steer, so the game is playable by tapping on a phone screen.

## 8. Data
- `localStorage["snake_highscore"]` — integer. That's the only persisted state. No backend.

## 9. Deployment
- Static build (just the files) pushed to a static host.
- No env vars, no server process, no database.
- A single live URL, playable on desktop and mobile.

## 10. Open decisions
- Phone body in pure CSS (flexible, editable) vs. a single background image (faster, pixel-perfect). Leaning CSS.
- Decided: edges **wrap** (authentic 3310 Snake II) — snake exits one side, re-enters the other. A "walls kill" hard mode could be an optional toggle later.
- Grid dimensions and base tick speed — tune during Phase 3.
