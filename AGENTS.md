# AGENTS.md — Agent Working Guidance

Guidance for any coding agent working on Nokia Snake. The canonical working guidance is `CLAUDE.md`; this file mirrors it so non-Claude agents have the same instructions. If the two ever diverge, `CLAUDE.md` is authoritative.

## Before doing anything
Read, in this order: `spec.md` (what to build), `rules.md` (how to build it, binding SHALL-statements), `implementation-plan.md` (phased order, each with a Verify bar). If code and docs disagree, the docs win; if a doc is wrong, fix it in the same change.

## Project in one line
Vanilla HTML/CSS/JS Snake game on a canvas, wrapped in a Nokia 3310 CSS body. No framework, no build step, no backend. High score in `localStorage`. Static deploy.

## Rules of engagement
- Work one phase at a time, in order. A phase is done only when its Verify bar is true by actually playing the game.
- Keep game logic, rendering, and the Nokia skin as separate concerns. Logic must not depend on the skin.
- Keyboard and on-screen keypad share one direction-handling path.
- Favor small, readable functions. No new dependencies beyond a pixel font without good reason.
- No backend, no accounts, no server. The only persisted state is the local high score.

## Review
- Review your own diff against `spec.md` and `rules.md` before merging. List concrete issues with severity; state plainly if none.
- There is no separate review bot and no 8-layer review in this project.

## Current state
The live, honest status lives in the "Current state" checklist in `CLAUDE.md`. Update it there when a phase completes; do not track status separately here.

## Deployment
Static host, no env vars or server config. After deploying, confirm the live URL reflects the latest commit. Must work on desktop and mobile.
