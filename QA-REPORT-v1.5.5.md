# Naruto Enot Garem v1.5.5 — QA report

## Summary

- Main menu rebuilt with a new Konoha crest panel, intro copy, decorative separators, feature panel, revised button treatment and a dedicated mobile layout.
- Character creation redesigned as a two-column character atelier. The left preview renders the actual layered avatar assets and updates for gender, hairstyle, appearance preset, name and clan.
- Added non-sexual, adult-only romantic routes for a female player character. NPCs have individual preferred and disliked date activities, custom replies, relationship mood, date count, energy costs, confession requirements and independent route state.
- Eligible NPCs can occasionally initiate an invitation at 18:00 when friendship and trust are sufficiently high. The player can accept or politely decline; declining does not reduce friendship.
- Existing saves migrate with an empty `relationships` object. Existing wardrobe, inventory, character art, dialogue, achievements, map and progression state are retained.

## Regression results

`node --check standalone.js` passed.

`node --test tests/*.mjs`: **15/15 suites passed, 0 failed**.

The new `romance-routes.mjs` suite checks:
- female-player route gating and friendship-only access for age-ambiguous characters;
- individual preferences and positive/negative/neutral date results;
- energy costs and mood tracking;
- confession thresholds and relationship state;
- NPC-initiated evening invitations, acceptance and polite decline;
- migration of existing saves;
- actual rendering of relationship controls in character dossiers;
- menu and creator markup, live-preview assets and cache-busted v1.5.5 resources.

Existing tests also pass for wardrobe layering (49 items / 6 slots), all 28 character portraits, 50 dialogue categories, 800 additional prompts, 100 social actions, achievements, secret magazine, gameplay, pets, visual assets and standalone startup.

## Browser note

A Chromium headless screenshot attempt did not complete in this environment. No manual browser playthrough or visual-browser QA is claimed. The release is validated by source syntax, standalone build, asset checks, DOM/state smoke tests and the full automated regression suite.

## Content scope

Relationship routes are limited to non-sexual dates, mutual affection, clear responses and respect for personal boundaries. Sexual interactions and pregnancy-probability mechanics are not included.
