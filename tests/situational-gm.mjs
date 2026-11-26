import assert from 'node:assert/strict';
import { analyzeText, talkToCharacter } from '../src/core/gm.js';
import { createInitialState } from '../src/core/store.js';
import { CHARACTERS } from '../src/data/characters.js';

const byId = id => CHARACTERS.find(character => character.id === id);
const scenarios = [
  ['danger', 'За нами кто-то следит, ты заметила?', /где именно|патрул|что видел/i],
  ['confide', 'Мне нужно тебе кое-что доверить.', /рассказать|довер|поделиться/i],
  ['lie', 'Ты врёшь, это неправда.', /факт|не сходится|неправд/i],
  ['unexpected', 'Я случайно разбил чужую вазу.', /владел|исправ|произошло|исправить/i],
  ['unexpected', 'Я потерял свиток по дороге домой.', /последнее место|потер|начнём поиск/i],
  ['negotiate', 'Давай договоримся об условиях.', /услов|сделк|соглаш/i],
  ['privacy', 'Оставь меня в покое, пожалуйста.', /не буду навязываться|оставлю тебя|не буду/i],
  ['followup', 'А почему ты так считаешь?', /к чему относится|почему|имею в виду|уточни/i],
  ['news', 'Я хочу поделиться новостью.', /что произошло|информац|слушаю/i],
  ['refusal', 'Нет, спасибо, мне это не подходит.', /не стану настаивать|другой вариант|отложим/i],
  ['admitLie', 'Я соврал тебе и должен признаться.', /призн|правду|довер|честн/i],
  ['conflict', 'Мы с подругой поссорились и перестали общаться.', /ссор|причин|помир|обстоятельств/i]
];

let checked = 0;
for (const [expected, text, marker] of scenarios) {
  assert.equal(analyzeText(text).kind, expected, `intent mismatch for: ${text}`);
  const state = createInitialState({name:'Рэн'});
  const reply = talkToCharacter(state, byId('sakura'), text).reply;
  assert.ok(reply.length >= 20, `reply too short for: ${text}`);
  assert.match(reply, marker, `reply not contextually relevant for: ${text}\n${reply}`);
  assert.doesNotMatch(reply, /первые весенние цветы|праздничная одежда сегодня|день только начинается|за окном дождь/i);
  checked++;
}

// A follow-up must connect to the previous exchange instead of pretending that it is an unrelated question.
const followState = createInitialState({name:'Рэн'});
const ino = byId('ino');
const initial = talkToCharacter(followState, ino, 'Какие у тебя планы на вечер?');
const follow = talkToCharacter(followState, ino, 'А почему именно так?');
assert.match(initial.reply, /планы|занимаюсь|дела/i);
assert.match(follow.reply, /планы|вечер|предыдущ|сказала|имею в виду/i);
assert.ok(followState.dialogueMeta.ino.recent.length >= 2, 'dialogue history should keep recent turns');

// Relationship changes must affect how the same request is received.
const neutralState = createInitialState({name:'Рэн'});
const warmState = createInitialState({name:'Рэн'});
neutralState.bonds.sakura = {friendship:4,trust:3,respect:0,irritation:0,meetings:1,stage:'Знакомство'};
warmState.bonds.sakura = {friendship:72,trust:61,respect:30,irritation:0,meetings:8,stage:'Близкий знакомый'};
const neutralInvite = talkToCharacter(neutralState, byId('sakura'), 'Давай прогуляемся после работы?').reply;
const warmInvite = talkToCharacter(warmState, byId('sakura'), 'Давай прогуляемся после работы?').reply;
assert.notEqual(neutralInvite, warmInvite, 'relationship level must change the response');
assert.match(neutralInvite, /пока не так хорошо знакомы|сначала поговорим/i);
assert.match(warmInvite, /можно|давай|хорошая мысль/i);

const angryState = createInitialState({name:'Рэн'});
angryState.bonds.karin = {friendship:0,trust:0,respect:0,irritation:70,meetings:4,stage:'Серьёзная неприязнь'};
const angry = talkToCharacter(angryState, byId('karin'), 'Может, обсудим книги?').reply;
assert.match(angry, /не хочу продолжать|не нравится|хватит|после того|переходил границы/i);

// Repeating praise in the same short window must not farm relationship points.
const repeatState = createInitialState({name:'Рэн'});
const sakura = byId('sakura');
talkToCharacter(repeatState, sakura, 'Ты отлично справилась.');
const afterFirst = repeatState.bonds.sakura.friendship;
talkToCharacter(repeatState, sakura, 'Ты отлично справилась.');
assert.equal(repeatState.bonds.sakura.friendship, afterFirst, 'repeated same-intent message should not farm friendship');

// Character voices should not collapse into a single universal reply.
const voiceTexts = ['За нами кто-то следит.'];
const voiceReplies = ['anko','hinata','konan','karin','kurenai','mei','temari','shizune'].map(id => {
  const state = createInitialState({name:'Рэн'});
  talkToCharacter(state, byId(id), 'Привет!'); // first meeting establishes a conversational turn
  return talkToCharacter(state, byId(id), voiceTexts[0]).reply;
});
assert.ok(new Set(voiceReplies).size >= 4, 'different personalities should produce distinct reactions');

// Every roster entry must produce a grounded non-empty answer to an unusual situation.
for (const character of CHARACTERS) {
  const state = createInitialState({name:'Рэн'});
  const reply = talkToCharacter(state, character, 'Я потерялся и не знаю, как вернуться.').reply;
  assert.ok(reply.length > 20, `${character.name} should answer an unusual situation`);
}

console.log(`PASS: ${checked} unusual situations; follow-up memory, relationship-dependent decisions, anger, repeat cooldown and 28 character responses verified.`);
