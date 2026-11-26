# Dialogue & GM QA

`dialogue-corpus.mjs` contains exactly 500 base Russian player phrases. It checks intent classification and topical first-meeting replies, then tests all 500 phrases in established conversations with all 28 characters (14,000 additional response checks). Fifteen everyday social categories are checked for response variation.

`dialogue-expansion.mjs` contains exactly 500 additional unique phrases across the first 20 topic groups; these are merged with 300 further prompts and 30 more reply banks in `dialogue-expansion-extra.js`, for 800 extra prompts and 50 total reply categories. It tests first-contact and established responses, all 14,000 character/phrase combinations, three-way answer variation in every topic, NPC-initiated openings and their cooldown, free-text social gestures, consent-aware friendly hugs, and boundary consequences. `content-counts.mjs` asserts exactly 50 topic/reply categories and 100 unique conversation actions (10 groups × 10) and verifies every action returns a response.

`situational-gm.mjs` adds 12 edge-case scenarios: danger reports, private disclosure, accusations, admitting a lie, conflict, negotiation, lost items, accidental damage, privacy requests, follow-up questions, news sharing and refusal. It also checks that follow-ups connect to previous turns, relationship level changes invitation outcomes, anger affects responses, repeated praise cannot farm relationship points, and the full character roster answers an unusual situation.

Run from the project root:

```bash
node tests/dialogue-corpus.mjs
node tests/dialogue-expansion.mjs
node tests/situational-gm.mjs
node tests/content-counts.mjs
node tests/smoke.mjs
node scripts/build-standalone.mjs
node --check standalone.js
node tests/standalone-smoke.mjs
```

Latest result: both 500-phrase corpora pass; the merged expanded data has 800 prompts and 50 reply categories; all 100 chat actions and hidden RP music-hall discovery are tested; 14,000 established-conversation checks across all 28 characters pass.
