import assert from 'node:assert/strict';
import {ALL_EXPANDED_DIALOGUE,ALL_EXPANDED_REPLY_BANK} from '../src/data/dialogue-expansion.js';
import {CONVERSATION_ACTION_GROUPS,CONVERSATION_ACTIONS} from '../src/data/conversation-actions.js';
import {CHARACTERS} from '../src/data/characters.js';
import {createInitialState} from '../src/core/store.js';
import {analyzeText,talkToCharacter,performConversationAction} from '../src/core/gm.js';
import {getLocationAccess,travelTo} from '../src/core/life.js';
import {LOCATIONS} from '../src/data/world.js';
import {renderView} from '../src/ui/render.js';

// Content targets: 50 reply categories and 100 distinct, non-sexual conversation actions.
assert.equal(Object.keys(ALL_EXPANDED_REPLY_BANK).length,50,'there must be exactly 50 topic/reply categories');
assert.ok(ALL_EXPANDED_DIALOGUE.length>=800,'the merged dialogue pool should contain at least 800 phrases');
for(const [kind,bank] of Object.entries(ALL_EXPANDED_REPLY_BANK)) {
  assert.ok(Array.isArray(bank)&&bank.length>=3,`${kind} should have at least three reply variants`);
}
assert.equal(CONVERSATION_ACTION_GROUPS.length,10,'conversation actions should be arranged in 10 groups');
assert.ok(CONVERSATION_ACTION_GROUPS.every(group=>group.actions.length===10),'each action group should contain 10 actions');
assert.equal(CONVERSATION_ACTIONS.length,100,'there must be exactly 100 conversation actions');
assert.equal(new Set(CONVERSATION_ACTIONS.map(action=>action.id)).size,100,'conversation action ids must be unique');
for(const action of CONVERSATION_ACTIONS) {
  assert.ok(action.label&&action.playerText,`${action.id} needs a button label and an RP action description`);
  const state=createInitialState({name:'Рэн'});
  const result=performConversationAction(state,CHARACTERS[0],action.id);
  assert.ok(result.playerText.length>8,`${action.id} should produce player narration`);
  assert.ok(result.reply.length>15,`${action.id} should produce an NPC response`);
}

// The music venue remains a harmless RP-discovered location: it is not shown on the map or travelable before discovery.
const hall=LOCATIONS.find(location=>location.id==='music-hall');
assert.ok(hall?.hidden,'the music hall must be marked as hidden');
const state=createInitialState({name:'Рэн'});
state.ui.view='map';
let map=renderView(state);
assert.ok(!map.includes('Лунный фонарь'),'hidden venue must not appear on the map before RP discovery');
assert.equal(getLocationAccess(state,'music-hall').allowed,false,'hidden venue travel must be locked before discovery');
assert.equal(travelTo(state,'music-hall'),false,'direct travel must not bypass RP discovery');
assert.notEqual(state.world.location,'music-hall');

const npc=CHARACTERS.find(character=>!character.secret)||CHARACTERS[0];
const rumor='Где можно послушать музыку?';
assert.equal(analyzeText(rumor).kind,'venueRumor','the RP rumor prompt should be recognized');
talkToCharacter(state,npc,rumor);
assert.ok(state.discoveredLocations.includes('music-hall'),'the RP conversation should unlock the music hall');
assert.equal(getLocationAccess(state,'music-hall').allowed,true,'the venue should become accessible after discovery');
map=renderView(state);
assert.ok(map.includes('Лунный фонарь'),'the venue should appear on the map after RP discovery');
assert.equal(travelTo(state,'music-hall'),true,'the player should be able to travel after discovery');

console.log(`PASS: ${Object.keys(ALL_EXPANDED_REPLY_BANK).length} reply categories, ${ALL_EXPANDED_DIALOGUE.length} dialogue prompts, ${CONVERSATION_ACTIONS.length} unique actions.`);
console.log('PASS: every action returns narration and an NPC response.');
console.log('PASS: hidden music venue is absent from map/travel until discovered through RP, then appears and is reachable.');
