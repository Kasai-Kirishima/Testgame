# Naruto Enot Garem v1.5.0 — QA report

## New systems
- 21 achievement definitions with progress, points, hidden states and migration-safe save data.
- A hidden 3-issue journal with 9 pages; discovery chain: library → archive → tea house.
- The secret journal is absent from navigation until found in the library. It is not a map location.
- Reading each page grants a small one-time knowledge/focus reward; repeat reads are blocked.
- All journal illustrations reference existing local environment artwork already included in the game.

## Regression results
- `dialogue-corpus.mjs`: 500/500 phrases and 14,000 established-conversation checks passed.
- `situational-gm.mjs`: 12 unusual-situation tests passed.
- `gm-upgrade.mjs`: NPC initiative, memory, response variation and anti-farming tests passed.
- `content-counts.mjs`: 50 reply categories, 800 prompts, 100 actions and secret-location gating passed.
- `character-art-audit.mjs`: 28 portraits, 19 clean crops and 6 triptychs verified.
- `smoke.mjs`, `standalone-smoke.mjs`, `gameplay-expansion.mjs`, `dialogue-expansion.mjs` passed.
- `achievements-magazine.mjs`: achievements, hidden unlocks, issue gating, page reading, local image paths and old-save migration passed.
- `standalone.js` syntax check passed; ZIP integrity check passed.

A headless Chromium interaction test was attempted but timed out in this environment. Interactive browser QA is therefore not claimed as complete; the checks above are automated source/runtime regression tests.

The separately uploaded `zipka.zip` is not embedded because it contains explicit sexual imagery. This build uses existing non-explicit environment artwork already in the project; no new images were generated.
