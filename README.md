# Nokia Snake

A browser-based Snake game rendered on an HTML canvas, wrapped in a full Nokia 3310 phone body built in CSS. Plain HTML/CSS/JS — no framework, no build step, no backend.

![status](https://img.shields.io/badge/status-complete-brightgreen) ![stack](https://img.shields.io/badge/stack-vanilla%20JS-yellow)

## Play it

Open `index.html` in a browser — that's it, no build step. Or serve the folder locally:

```bash
npx serve .
```

**Controls:** Arrow keys steer, Enter/Space starts or restarts. On touch devices, use the on-screen D-pad/keypad.

## Features

- Classic Snake: move, eat, grow, die on self-collision
- Edges **wrap** (authentic Nokia 3310 Snake II behavior — no wall kill)
- Score display with persistent local high score (`localStorage`)
- Speed ramps up as the snake grows
- Full Nokia 3310 CSS body: LCD screen, D-pad, number keypad, start/game-over screens
- Fully playable on desktop (keyboard) and mobile (tap controls)

## Tech stack

Plain HTML, CSS, and JavaScript. Canvas for the game screen, `localStorage` for the high score, static hosting for deployment. No frameworks, no dependencies beyond a pixel web font for the score display.

## Project structure

```
index.html   Markup: canvas screen + Nokia body chrome
style.css    Presentation: the Nokia CSS skin (LCD look, phone body, keypad)
game.js      Game logic + canvas rendering (state, movement, collision, draw loop)
```

Game logic, rendering, and presentation are kept as separate concerns — the game logic does not depend on the CSS skin, and the keyboard and on-screen keypad share a single direction-handling path.

## Development

```bash
npm install
npm run lint           # ESLint
npm run validate:html  # html-validate on index.html
```

CI runs both checks on every pull request against `main`.

## Docs

This project is documentation-driven — the docs are the source of truth, and code defers to them:

| File | Purpose |
|---|---|
| [`spec.md`](spec.md) | What to build — concept, scope, visual spec, rules, decisions |
| [`rules.md`](rules.md) | How to build it — binding SHALL-statements |
| [`implementation-plan.md`](implementation-plan.md) | Phased order of work, each ending in a Verify bar |
| [`CLAUDE.md`](CLAUDE.md) / [`AGENTS.md`](AGENTS.md) | Working guidance for coding agents on this repo |

## Deployment

Deploys as a static site (e.g. Vercel) — no env vars, no server, no database. After any deploy, the live URL is confirmed against the latest commit before being called done.
