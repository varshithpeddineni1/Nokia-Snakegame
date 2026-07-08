# CLAUDE.md — Working Guidance

This file tells Claude Code how to work on Nokia Snake. Read it, then read `spec.md`, `rules.md`, and `implementation-plan.md` before writing any code.

## What this project is
A browser-based Snake game on an HTML canvas, wrapped in a Nokia 3310 phone body built in CSS. Plain HTML/CSS/JS, no framework, no build step, no backend. High score lives in `localStorage`. Deploys as a static site.

## Read first (source of truth)
- `spec.md` — what to build (concept, stack, scope, visual spec, rules, decisions).
- `rules.md` — how to build it (binding SHALL-statements).
- `implementation-plan.md` — the phased order of work, each phase ending in a Verify bar.

If code and these docs disagree, the docs win. If a doc is wrong, fix the doc in the same change — don't let code and docs drift apart.

## How to work
- Work **one phase at a time**, in order. Do not jump ahead or build multiple phases in one pass.
- A phase is done only when its **Verify** bar is demonstrably true by running/playing the game — not when the code merely compiles.
- Keep the three concerns separate: **game logic** (state, movement, collision), **rendering** (canvas), and **presentation** (the Nokia CSS skin). Game logic must not depend on the skin.
- Keep one direction-handling path shared by keyboard and the on-screen keypad. Never two.
- Prefer small, readable functions over cleverness. This is a learning project; clarity beats compression.
- No new dependencies without a good reason. A pixel web-font for the score is the only expected exception.

## Reviewing changes
- Before merging a phase, review your own diff against `spec.md` and `rules.md`.
- List concrete issues with file/line and a severity. Say explicitly if you found nothing. Do not give a vague "looks good."
- There is **no** separate PR-review bot and **no** 8-layer review in this project. Your own diff review is the review layer; the human confirms the Verify bar by playing.

## Current state
Keep this section honest and up to date. Update it every time a phase completes.

- [x] Phase 0 — Scaffold + deploy pipeline (blank green screen live)
- [x] Phase 1 — LCD screen + game loop (static snake draws, loop ticks)
- [x] Phase 2 — Movement + input (snake glides, steers, no self-reverse)
- [x] Phase 3 — Food, growth, collision, score (playable; edges wrap; self-collision ends game)
- [x] Phase 4 — Nokia body in CSS (reads as a 3310)
- [x] Phase 5 — Feel + persistence (speed ramps, high score persists, start/over screens)
- [x] Phase 6 — Clickable keypad + mobile + final deploy (playable by tapping on a phone)

## Deployment notes
- Static host (e.g. Vercel). No env vars, no server, no database.
- After any deploy, confirm the live URL reflects the latest commit before calling it done (a stale deploy is a real failure mode).
- The game must work on both desktop and mobile at the live URL.
