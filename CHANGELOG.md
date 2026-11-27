# Changelog

## v1.5.5
- Rebuilt the title screen with a new Konoha-branded menu panel, updated typography, decorative crest, feature strip, and responsive mobile layout.
- Reworked character creation into a two-column character atelier with a layered full-body live preview that updates immediately when gender, hairstyle, outfit, name or clan changes.
- Added adult-only, non-sexual romance routes for a female player character: individualized date preferences, distinct responses, mood tracking, energy costs, relationship milestones, confession requirements and NPC-initiated invitations.
- Romantic routes are friendship- and consent-led; accepting or declining an invitation is tracked without coercive penalties. Existing saves migrate with an empty relationship state.
- Kept all prior wardrobe, portrait, world, dialogue, gallery and progression assets intact. Updated cache-busting keys and expanded regression coverage.

## v1.5.4
- Expanded the layered player wardrobe from 31 to 49 separate SVG clothing pieces across six strict slots: headwear, top, outer layer, bottoms, shoes and accessories.
- Added more everyday, work, academy, festival, cold-weather and date-ready clothing, including blouses, hoodies, formal academy tops, cardigans, winter coats, short haori, jeans, wide trousers, a long pleated skirt, high-top shoes and accessories.
- Added a true arrow-driven selector: left/right previews one item in the selected slot and the player avatar updates immediately; only items in that slot can be equipped, so incompatible combinations such as bottoms on the head are rejected.
- Kept the six outfit presets migration-safe and composed only from starter-owned items; extra pieces are bought at the market and can be worn at home or in the shop.
- Rebuilt 49 inline SVG thumbnail crops from their matching clothing layers; all assets remain vector-based with transparent backgrounds and share the avatar coordinate system.
- Removed stale visual-preview and debug images from the release root, keeping only the current wardrobe preview; preserved all game assets, current character art, backgrounds and save data compatibility.
- Updated the art manifest and regression tests for layered player rendering, item-slot validation, arrow cycling, purchases, outfit presets and legacy-save migration.

## v1.5.2
- Added eight additional fully clothed portrait variants for Ino, Temari, Kurenai, Tsunade, Mirai, Karin, Tenten and Shizune; each variant unlocks after two personal meetings and is appended without replacing existing character art.
- Added five category-colored achievement medal assets and wired achievement cards to render the matching medal by category.
- Added a Konoha raccoon mascot illustration to the empty pet screen. Existing pet mechanics and good location backgrounds remain unchanged.
- Updated the character art catalog and art manifest, CSS cache key, standalone runtime and visual regression coverage.

## v1.5.1
- Added four new, optimized 16:9 environment illustrations: Konoha at sunrise, a warm scroll archive, a twilight tea pavilion, and a rain-washed training yard.
- Connected the new scenes to the title screen, main street, library/archive, tea house, training area and the location browser; rainy weather can switch the training yard background.
- Refined the visual system with a custom Konoha crest, sakura pattern, parchment texture, achievement medal, improved scene overlays, card depth, keyboard focus states and reduced-motion-aware transitions.
- Updated the gallery to show every character-art variant currently unlocked by relationship progression, while keeping locked variants hidden.
- Added a dedicated visual asset audit covering all location variants, scene manifest backgrounds, character art, CSS image references and cache-busted runtime/style versions.
- Rebuilt the standalone runtime; see QA report for the exact regression run.

## v1.5.0
- Added 21 Steam-style achievements with points, progress bars, hidden conditions and save migration.
- Added the secret collectible journal “Листья и истории”: discovered in the library, with later issues hidden in the scroll archive and tea house. The magazine remains absent from navigation until discovered.
- Added nine original editorial pages about Konoha, crafts, training, market life, cooking and travel; each uses existing local environment artwork. Reading gives a small knowledge/focus reward once per page.
- Reused existing game assets only; no images generated and no external archive imagery embedded.
- Added migration-safe persistence and dedicated tests for achievement unlocks, issue gating, page reading, asset existence and hidden navigation.

## v1.5.3
- Integrated the generated transparent player outfit sprites into the wardrobe: six male and three fully clothed female looks, including casual, shinobi, festival, travel, raincoat and workwear variants.
- Created nine transparent head-and-shoulder avatar crops from the outfit sprites so the sidebar portrait reflects the selected look without shrinking the full-body sprite.
- Added workwear to character creation, random look selection, quick wardrobe presets, home storage and the clothing shop; initial selected looks are now included in owned wardrobe items and legacy saves migrate safely.
- Wired six generated animal sprites into pet cards and shop entries, with names for tanuki, fox, cats, crow and frog.
- Connected 23 generated transparent UI assets across title actions, side and bottom navigation, RP HUD, phone, inventory, crafting, help, notifications, achievement and magazine panels.
- Kept existing location backgrounds, roster artwork, six character triptychs and prior visual variants unchanged.
- Added generated-art manifest and integration tests; validated the real alpha channel on all 47 listed PNG assets, all local HTML/CSS asset paths, rebuilt standalone runtime and passed all 13 automated suites.


## v1.4.8
- Added a daily board with three rotating optional contracts, progress tracking, one-time rewards and a 14-day history.
- Added six character-skill tracks with XP and five mastery levels, plus a home workbench with three useful recipes and consumable items.
- Added choice-based location situations across the village; situations now require the player to return to the correct place, validate required items and prevent duplicate rewards.
- Improved patrol combat edge cases: persistent player HP, correct handling of insufficient chakra, rejection of unknown moves, retreat cost when closing an active encounter, and blocking new patrols at zero HP.
- Improved free-text purchase handling so purchases outside shops do not spend money/time, while ramen orders (including natural purchase phrasing) use Ichiraku's restaurant flow.
- Hardened time advancement against invalid numeric input and added regression coverage for all the above.
- Rebuilt the standalone runtime and passed all nine automated test suites. A real Chromium launch was attempted but the sandbox browser process did not complete startup; no browser-playthrough is claimed.

## v1.4.7
- Reworked the local GM's reciprocal dialogue flow: NPC opening prompts are now personality-specific and tracked as pending questions so natural player answers can be understood in context.
- Added per-character memory for player-shared interests, goals, hometown, pets and work; players can ask what an NPC remembers, and trusted characters can proactively revisit a remembered topic on later encounters.
- Varied reply selection by character, turn count and in-game time so repeating the same sentence does not always return the same wording.
- Added a cooldown for repeating the same social action; repeated gestures no longer farm friendship/trust and receive an in-character explanation.
- Added focused QA for NPC-led prompts, natural answer handling, player-fact memory, proactive memory callbacks, reply variation and action anti-farming.
- Preserved the existing 500-phrase and 14,000 established-dialogue regression checks, all 50 response categories and 100 conversation actions.
- Rebuilt the standalone runtime and validated the interaction flow through the standalone VM/DOM smoke suite.

## v1.4.5
- Audited all 28 character portrait/gallery references against the actual bundled files.
- Added 19 clean portrait crops from the existing source artwork to remove leftover name labels; original source files remain intact. No new artwork was generated.
- Repointed character data, the catalog and the art manifest to the clean crops and verified all referenced files exist.
- Removed stale manifest entries that referenced non-existent SVG character art.
- Visually checked all six existing three-look sets (daily, shinobi training and festival) and the 18 local location backgrounds.
- Added a reproducible crop script and an image audit report.
- Flagged two uncertain canon-image matches (Kaguya and Mito) rather than substituting unrelated art; additional source art is needed for reliable replacement.
- Rebuilt standalone runtime and ran the complete regression suite, including the new character-art audit.

## v1.4.4
- Audited the existing dialogue library: 800 additional prompts are merged into 50 topical reply categories, each with multiple response variants.
- Audited the conversation-action library: exactly 100 unique, non-sexual social and everyday RP actions, arranged in 10 groups of 10.
- Added a content-count regression test that exercises all 100 actions and checks every topic bank.
- Added tests that prove the hidden Moon Lantern music hall is absent from the map and inaccessible until the player discovers it through an RP conversation; it then becomes visible and travelable.
- Gave the discovered music hall a stable map coordinate and distance-based travel time.
- Fixed a duplicate cooking prompt that was overwriting the food intent in the dialogue lookup.
- Updated the map smoke test to account for all 24 world locations.
- Rebuilt the standalone runtime and ran the full regression suite.

## v1.4.3
- Added 500 additional Russian conversation prompts across 20 topics: personality, ambitions, teamwork, missions, village life, clan, values, routines, feelings, friendship, learning, strategy, nature, festivals, books, music, food, travel and memories.
- Added 20 topic-specific reply banks with three answer variants each, character-aware selection and reciprocal questions; retained the previous 500-phrase dialogue behavior.
- Characters can now initiate a conversation when the personal chat opens, with an in-game cooldown so the opening line does not repeat on every click.
- Added chat actions for waving, handshakes, high-fives and requesting a friendly hug. Actions are available as buttons and natural-language inputs; a hug requires trust and friendship, and unwanted contact is declined with a relationship consequence.
- Added dialogue QA for all 500 new phrases against first-contact and established conversations with all 28 characters (14,000 established checks), NPC-initiated conversation, consent-aware gestures and the rendered chat controls.
- Rebuilt the standalone runtime and reran the full regression suite.

## v1.4.2
- Expanded the dialogue regression corpus from 300 to 500 natural Russian player phrases across the existing conversation intents.
- Added broader phrasing coverage for greetings, introductions/name capture, mood questions, pets, food, weather, work, compliments, disagreements, plans, invitations, training, challenges and jokes.
- Fixed ambiguous keyword collisions: “здорово получилось” is praise rather than a greeting; “небольшая новость” is not weather; pet terms no longer match inside unrelated words such as “упущена”.
- Added response variants for 15 everyday social categories, with deterministic variation based on character and message so answers feel different without becoming random noise.
- Added an exhaustive established-conversation regression pass: all 500 phrases against all 28 roster characters (14,000 checks), in addition to first-contact relevance checks.
- Rebuilt the standalone runtime and reran the dialogue corpus, situational GM, core smoke and standalone smoke suites.

## v1.4.1
- Reworked title-screen and interaction polish against the stored Konoha reference: full-screen local PNG background, left translucent menu panel, and project wordmark at top-right.
- Title settings and gallery now remain in the title flow without creating a player or entering a game; the game view guard prevents an uninitialized session.
- Moved personal conversation back to the RP scene; character dossiers show known facts and encounter history without a duplicate chat composer.
- Kept map travel marker-driven and return to the RP scene immediately after a successful transition.
- Added typewriter text animation for current scene/dialogue and short optional Web Audio UI tones. External Pixabay music remains a link; no MP3 is bundled.
- Improved common Russian dialogue handling for “как дела?” and natural action text such as ordering food at Ichiraku.
- Added regression coverage for title settings without a save, title background asset, title wordmark, free-text ordering, and dialogue intent.
- Rebuilt `standalone.js` from the 10 source modules and reran all automated suites. No new images generated.


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
