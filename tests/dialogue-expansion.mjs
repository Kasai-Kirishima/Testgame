import assert from 'node:assert/strict';
import { analyzeText, talkToCharacter, npcOpeningLine, performConversationAction } from '../src/core/gm.js';
import { EXPANDED_DIALOGUE, EXPANDED_REPLY_BANK } from '../src/data/dialogue-expansion.js';
import { createInitialState } from '../src/core/store.js';
import { CHARACTERS } from '../src/data/characters.js';

assert.equal(EXPANDED_DIALOGUE.length,500,'500 additional phrases must be present');
assert.equal(new Set(EXPANDED_DIALOGUE.map(item=>item.text.toLocaleLowerCase('ru-RU').replace(/ё/g,'е'))).size,500,'all 500 phrases must be unique');
const byId=id=>CHARACTERS.find(item=>item.id===id);
const failures=[];
let firstContactChecks=0, establishedChecks=0;
const variations={};

for (const item of EXPANDED_DIALOGUE) {
  const parsed=analyzeText(item.text);
  if(parsed.kind!==item.kind) failures.push({text:item.text,expected:item.kind,actual:parsed.kind});
  const firstState=createInitialState({name:'Рэн'});
  const firstChar=CHARACTERS[firstContactChecks%CHARACTERS.length];
  const first=talkToCharacter(firstState,firstChar,item.text);
  if(!first.reply||first.reply.length<30) failures.push({text:item.text,character:firstChar.id,error:'empty first-contact answer'});
  firstContactChecks++;
  for(const character of CHARACTERS){
    const state=createInitialState({name:'Рэн'});
    state.bonds[character.id]={friendship:42,trust:32,respect:24,irritation:0,meetings:4,stage:'Знакомство'};
    state.knownNames[character.id]='Рэн';
    const result=talkToCharacter(state,character,item.text);
    if(!result.reply||result.reply.length<50) failures.push({text:item.text,character:character.id,error:'empty established-conversation answer'});
    if(!result.reply.includes('?')) failures.push({text:item.text,character:character.id,error:'NPC did not ask a reciprocal question'});
    establishedChecks++;
  }
  (variations[item.kind] ||= new Set()).add(talkToCharacter(Object.assign(createInitialState({name:'Рэн'}),{bonds:{sakura:{friendship:42,trust:32,respect:24,irritation:0,meetings:4,stage:'Знакомство'}},knownNames:{sakura:'Рэн'}}),byId('sakura'),item.text).reply);
}
for(const kind of Object.keys(EXPANDED_REPLY_BANK)){
  assert.ok(EXPANDED_REPLY_BANK[kind].length>=3,`${kind} needs at least three response variants`);
  assert.ok(variations[kind]?.size>=3,`${kind} should produce distinct character replies`);
}
assert.deepEqual(failures.slice(0,10),[],`Dialogue corpus failures: ${JSON.stringify(failures.slice(0,10))}`);

// NPC starts the conversation, then respects the initiation cooldown.
const openerState=createInitialState({name:'Рэн'});
const sakura=byId('sakura');
const opener=npcOpeningLine(openerState,sakura);
assert.match(opener,/\?/,'first contact should include a question from the NPC');
assert.equal(npcOpeningLine(openerState,sakura),'','NPC should not repeat an opening line immediately');
openerState.world.minute+=300;
assert.ok(npcOpeningLine(openerState,sakura).length>10,'NPC may initiate again after the cooldown');

// Friendly actions are consent-aware and relationship-aware.
const newFriendState=createInitialState({name:'Рэн'});
const cautiousHug=performConversationAction(newFriendState,sakura,'hug');
assert.match(cautiousHug.reply,/пока отказывается|давай узнаем друг друга получше/i);
assert.equal(newFriendState.bonds.sakura?.friendship||0,0,'a declined hug request must not award friendship');
const closeState=createInitialState({name:'Рэн'});
closeState.bonds.sakura={friendship:35,trust:25,respect:20,irritation:0,meetings:5,stage:'Друзья'};
const acceptedHug=performConversationAction(closeState,sakura,'hug');
assert.match(acceptedHug.reply,/соглашается|принимает дружеское объятие/i);
assert.ok(closeState.bonds.sakura.friendship>35&&closeState.bonds.sakura.trust>25);
const angryState=createInitialState({name:'Рэн'});
angryState.bonds.sakura={friendship:50,trust:40,respect:20,irritation:35,meetings:6,stage:'Знакомство'};
assert.match(performConversationAction(angryState,sakura,'hug').reply,/нужно пространство/i);
assert.ok(performConversationAction(createInitialState({name:'Рэн'}),sakura,'wave').reply.length>20);
const typedGestureState=createInitialState({name:'Рэн'});
const typedWave=talkToCharacter(typedGestureState,sakura,'Я машу тебе рукой.');
assert.equal(typedWave.kind,'gestureWave','free-text wave action should be recognized');
assert.match(typedWave.reply,/машет в ответ|кивает в ответ|поднимает руку/i);
const typedHugState=createInitialState({name:'Рэн'});
const typedHug=talkToCharacter(typedHugState,sakura,'Можно тебя обнять?');
assert.equal(typedHug.kind,'gestureHugRequest','free-text hug permission request should be recognized');
assert.match(typedHug.reply,/пока отказывается|спасибо, что спросил/i);
const unaskedHugState=createInitialState({name:'Рэн'});
const unaskedHug=talkToCharacter(unaskedHugState,sakura,'Обнимаю.');
assert.equal(unaskedHug.kind,'gestureHugUnasked','uninvited hug attempt should be recognized distinctly');
assert.match(unaskedHug.reply,/сначала спроси/i);
const boundaryState=createInitialState({name:'Рэн'});
boundaryState.bonds.sakura={friendship:25,trust:18,respect:10,irritation:0,meetings:2,stage:'Знакомство'};
assert.equal(analyzeText('Я трогаю тебя за грудь.').kind,'boundary','intimate unwanted contact should be treated as a boundary violation');
const boundaryReply=talkToCharacter(boundaryState,sakura,'Я трогаю тебя за грудь.');
assert.ok(boundaryReply.bond.irritation>0,'boundary violation should have a negative in-game consequence');

console.log(`PASS: ${EXPANDED_DIALOGUE.length}/500 new phrases, ${firstContactChecks} first-contact responses, ${establishedChecks} established conversations across ${CHARACTERS.length} characters.`);
console.log(`PASS: ${Object.keys(EXPANDED_REPLY_BANK).length} intent-specific response banks, three-way variation, NPC-initiated conversation cooldown, and consent-aware social actions.`);
