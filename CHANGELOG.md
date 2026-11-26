# Changelog

## v1.3.1
- Finalized reference-inspired title screen and the full-bleed roleplay scene; the Konoha background is a local WebP asset.
- Dedicated page navigation, character dossiers, location browser, inventory storage, task history, map legend, gallery unlock tracking, settings and help remain integrated in the static build.
- Rebuilt standalone runtime from the current 10 source modules and refreshed cache version references.
- Verified all 28 character catalogs and 68 portrait/gallery references exist, plus all 29 location background variants referenced by world data.
- Re-ran dialogue corpus (300 phrases), unusual-situation GM tests (12 scenarios), core smoke tests and standalone smoke tests.
- No new images generated; existing library artworks and extracted UI assets reused.


## v1.3.0
- Reworked the title menu with Konoha background, translucent plum panel, pink navigation labels, and five menu actions.
- Rebuilt the RP scene as a large full-width location background with HUD, visible character/enemy/pet layers, narration panel, and separate manual action/dialogue inputs.
- Added a sliding side drawer, mobile bottom navigation, and dedicated pages for map, heroes, gallery, locations, plans, work, scroll, inventory, phone, pets, settings and help.
- Hero roster now only includes personally met characters. Character dossier shows relationship metrics, known facts, encounter history, gifts and a location-aware personal chat.
- Added gradual unlock progression for character gallery variants: first image on introduction, additional images after meetings and relationship growth.
- Gallery separates roster portraits from scene backgrounds and character art already seen during RP.
- Replaced the map cards with a stylized overhead village map, legend, access explanations and distance-based travel times.
- Added functioning home refrigerator and wardrobe storage panels; updated inventory categories and shop/home outfit changes.
- Added title-screen preview mode for gallery/settings without requiring a save file.
- Added smoke tests for title navigation, dedicated page presence, and progressive art unlocking.
- Reused existing library assets only; no new images were generated for this release.
- Privacy controls provide neutral fade-to-black/censor labels; no explicit sexual scenes are included.

## v1.2.0
- Bumped asset cache keys and title-screen version to 1.2.0.
- Expanded the local GM with context-aware handling for danger reports, private disclosures, accusations, admitting a lie, interpersonal conflicts, negotiation, unexpected incidents, privacy requests, refusals, news and follow-up questions.
- Added short conversation history per character so follow-up questions can refer to the previous exchange instead of receiving a disconnected generic answer.
- Added individual response voices for personality styles across greetings, help, training, comfort, challenges and unusual events.
- Reduced repetitive relationship farming: repeating the same intent within a short window no longer adds another bond reward.
- Gift dialogue now distinguishes a real transferred item from merely saying that a gift will be given.
- Added contextual free-text actions for observing scenes, waiting for a character, and watching a character from a respectful distance.
- Lost items and accidental damage now create optional incident entries in the scroll; searching the last-seen location or taking responsibility can resolve them.
- Removed automatic weather and season filler from unrelated free-text action results.
- Added a 12-scenario GM regression suite and more standalone action tests.


## v1.1.0
- Rebuilt first-contact replies so every supported intent gets a topic-specific, polite answer instead of the generic fallback.
- Added response-relevance checks to the 300-phrase dialogue corpus across 30 intent categories.
- Fixed introduction/name memory phrases and kept the initial relationship neutral until the player's behaviour changes it.
- Personal dialogue is now available only when the heroine is physically present; profile pages explain when she is elsewhere. Remote messages require a prior personal meeting.
- NPC schedules remain hidden and update after sleeping or skipping time.
- Added job board actions, paid shifts, and tests for work and clothing purchases/equipping.
- Added ScrollTube video detail screen and tests for smartphone app rendering.
