# Naruto Enot Garem v1.5.5

A local/offline fan-made social visual novel set in Konoha.

## Run the game

1. Extract the ZIP to a folder.
2. On Windows, double-click `start-local.bat`.
3. Open the local address shown in the terminal.

You can also serve this folder with any static HTTP server. Keep `index.html`, `standalone.js` and the `assets` folder together.

## v1.5.5 highlights

- Refreshed main menu and responsive mobile layout.
- Redesigned character creator with live layered-avatar preview.
- Adult-only, non-sexual romance routes for a female player character, with individual date preferences and occasional NPC invitations.
- Compatible with existing v1.5.4 saves and the previous wardrobe/catalogue.

See `CHANGELOG.md` for the complete history and `QA-REPORT-v1.5.5.md` for the current test report.

## Development

Edit the ES modules under `src/`, then rebuild the offline runtime:

```bash
node scripts/build-standalone.mjs
node --test tests/*.mjs
```
