# Nokia Snake — Engineering Rules

Rules are written as SHALL-statements. They are binding on all code in this project, whether written by a human or an agent. Where a rule and the spec disagree, the spec wins for *what* to build and these rules win for *how* to build it.

## 1. Stack and structure
- The project SHALL be plain HTML, CSS, and JavaScript with no framework and no build step.
- The project SHALL NOT add a backend, database, or server process of any kind.
- The only persisted state SHALL be the high score in `localStorage`.
- Code SHALL be organized into three separable concerns: **game logic** (state, movement, collision), **rendering** (canvas drawing), and **presentation** (the Nokia CSS skin). Logic SHALL NOT depend on the skin.
- Third-party dependencies SHALL be avoided; a pixel web-font for the score is the only expected exception.

## 2. Game behavior
- The snake SHALL move exactly one cell per tick in its current direction.
- The play area SHALL wrap on all four edges: leaving one edge re-enters the opposite edge.
- The game SHALL end only when the snake's head enters a cell occupied by its own body.
- The snake SHALL NOT be able to reverse directly into itself within a single tick.
- Eating food SHALL grow the snake by one segment, increase the score, and respawn food on a random unoccupied cell.
- Movement speed SHALL increase gradually as the score rises.
- The high score SHALL be read on load and updated whenever the current score exceeds it.

## 3. Visual rules
- The LCD SHALL use exactly two colors: one background ("pixel off") and one foreground ("pixel on"). No gradients or shadows inside the screen.
- Each drawn cell SHALL leave a small gap to its neighbors so the grid reads as chunky LCD pixels.
- The Nokia body SHALL be a presentation layer only and SHALL NOT contain game logic.
- Score and on-screen text SHALL use a blocky pixel font consistent with the LCD look.

## 4. Controls
- Arrow keys SHALL steer the snake.
- A dedicated key SHALL start and restart the game.
- The on-screen keypad / D-pad SHALL, once implemented, drive the *same* direction logic as the keyboard — there SHALL be one direction-handling path, not two.

## 5. Workflow
- Work SHALL proceed one phase at a time, in the order given by the implementation plan.
- A phase SHALL NOT be considered done until its **Verify** bar is demonstrably true by playing the game.
- Before merging a phase, the diff SHALL be reviewed against the spec and this file, and concrete issues SHALL be listed and resolved. (Claude Code reviews its own diff; there is no separate review bot.)
- There SHALL be no 8-layer PR review agent in this project.
- The "current state" note in the agent docs SHALL be kept honest and up to date as phases complete.

## 6. Deployment
- The site SHALL deploy as static files to a static host; no env vars or server config are required.
- After any deploy, the live URL SHALL be confirmed to reflect the latest commit before the deploy is considered done.
- The game SHALL be playable on both desktop and mobile at the live URL.
