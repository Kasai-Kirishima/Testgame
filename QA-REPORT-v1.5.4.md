# Naruto Enot Garem v1.5.4 — QA report

## Summary

- Modular clothing catalog: **49 items** across **6 compatible slots**.
- New clothing: blouses, academy top, hoodie, festival top, cardigan, winter coat, short haori, jeans, long pleated skirt, wide trousers, festival hakama, high-top shoes, winter shoes, tote, gloves, beret and floral hair ribbon.
- Player avatar uses separate SVG layers for body, hair, clothes and accessories; arrow preview updates one slot at a time.
- Old full outfit presets remain available and are composed from owned starter items.
- Save migration keeps old `look` and `ownedLooks` values and creates a compatible layered equipment object.
- Current preview is retained; stale v1.5.1/v1.5.2 previews, debug layer preview and duplicate QA documents removed from the release root.

## Validation performed

- `node scripts/build-standalone.mjs` rebuilt the bundled runtime.
- `node --test tests/*.mjs`: **14/14 suites passed, 0 failed**.
- SVG path audit: every catalog item has a full-body layer and a slot-cropped thumbnail; all 49 layers and 49 thumbnails share the same `260×520` avatar coordinate system and contain no painted background rectangle or baked checkerboard.
- Asset-path audit: all clothing layers, thumbnails, body bases, hairstyles, character portraits, pets, environments and UI references resolve locally. Obsolete monolithic player-avatar PNGs were removed after migration to the layered avatar.
- Wardrobe behavior coverage: six slots, arrow cycling and wraparound, wrong-slot rejection, purchase location/currency checks, duplicate purchase rejection, preset application and old-save migration.

## Browser note

A full manual Chromium playthrough is not claimed for this build. The game is static/offline and the standalone runtime and automated DOM/state smoke tests are used for release validation.

