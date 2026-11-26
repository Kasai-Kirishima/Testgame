# Dialogue & GM QA

`dialogue-corpus.mjs` contains exactly 300 Russian user phrases across 30 intent groups. It verifies intent classification, response availability, first-meeting relevance, name memory, repeated-greeting cooldown, neutral first-contact disposition, boundaries, and relationship changes after insults/apologies.

`situational-gm.mjs` adds 12 edge-case scenarios: suspicion/danger reports, private disclosure, accusation, admitting a lie, conflict, negotiation, a lost item, accidental damage, a privacy request, a follow-up question, news sharing and refusal. It also checks that follow-ups connect to the previous turn, relationship level changes invitation outcomes, anger affects responses, repeated praise cannot farm relationship points, and the full 28-character roster answers an unusual situation.

Run:

```bash
node tests/dialogue-corpus.mjs
node tests/situational-gm.mjs
node tests/smoke.mjs
node scripts/build-standalone.mjs
node --check standalone.js
node tests/standalone-smoke.mjs
```

Latest result: all checks pass in the local test environment.
