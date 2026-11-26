import assert from 'node:assert/strict';
import { createInitialState } from '../src/core/store.js';
import { CHARACTERS } from '../src/data/characters.js';
import { npcOpeningLine, talkToCharacter, performConversationAction } from '../src/core/gm.js';

const byId=id=>CHARACTERS.find(character=>character.id===id);

// NPC starts the conversation and keeps the question as pending context.
const state=createInitialState({name:'Рэн'});
const hinata=byId('hinata');
const opening=npcOpeningLine(state,hinata);
assert.ok(opening.includes('?'),'NPC opening must invite a player response');
assert.equal(state.dialogueMeta.hinata.pendingQuestion,opening,'opening question must be tracked');

// Player can answer in natural language and the NPC remembers a personal fact.
const originReply=talkToCharacter(state,hinata,'Я недавно приехал из Сунагакуре.').reply;
assert.match(originReply,/Сунагакуре|родные места|оттуда/i,'reply should acknowledge the actual answer');
assert.equal(state.dialogueMeta.hinata.playerFacts.home,'Сунагакуре','NPC should save the stated hometown');

// Player interests become character-specific memories and can be recalled later.
talkToCharacter(state,hinata,'Я люблю рисовать пейзажи.');
assert.equal(state.dialogueMeta.hinata.playerFacts.likes,'рисовать пейзажи');
const recall=talkToCharacter(state,hinata,'Что ты помнишь обо мне?').reply;
assert.match(recall,/рисовать пейзажи/,'memory reply must recall a voluntarily shared interest');

// After a relationship develops, the NPC may proactively bring up a remembered fact.
state.bonds.hinata={friendship:40,trust:30,respect:10,irritation:0,meetings:4,stage:'Хороший знакомый'};
state.world.day+=3;
state.world.minute=10*60;
state.dialogueMeta.hinata.lastNpcInitiationDay=state.world.day-1;
const proactive=npcOpeningLine(state,hinata);
assert.match(proactive,/рисовать пейзажи|Сунагакуре/,'NPC should sometimes initiate using a remembered fact');

// Repeating the same text over several turns produces more than one phrasing.
const variationState=createInitialState({name:'Рэн'});
variationState.bonds.sakura={friendship:42,trust:30,respect:15,irritation:0,meetings:5,stage:'Хороший знакомый'};
const replies=[];
for(let i=0;i<8;i++) replies.push(talkToCharacter(variationState,byId('sakura'),'Как дела?').reply);
assert.ok(new Set(replies).size>=2,'identical prompts should vary over time');

// Repeating the same social action cannot farm relationship points.
const actionState=createInitialState({name:'Рэн'});
const sakura=byId('sakura');
const first=performConversationAction(actionState,sakura,'highfive');
const afterFirst=first.bond.friendship;
const second=performConversationAction(actionState,sakura,'highfive');
assert.equal(second.onCooldown,true,'same action should enter cooldown');
assert.equal(second.bond.friendship,afterFirst,'repeat action must not award extra friendship');
assert.match(second.reply,/только что|повтор|повторение/i,'repeat action should explain why it did not reward points');

console.log('PASS: NPC-led prompts, natural follow-up answers, player-fact memory, proactive memory callback, response variation, and anti-farming action cooldown verified.');
