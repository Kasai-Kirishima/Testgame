import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {createInitialState,getBond} from '../src/core/store.js';
import {CHARACTERS,getCharacter} from '../src/data/characters.js';
import {ORIGINS,LOCATIONS} from '../src/data/world.js';
import {travelTo,doActivity,assignDailyTask,sleepUntilMorning,skipTime} from '../src/core/life.js';
import {talkToCharacter,analyzeText} from '../src/core/gm.js';
import {renderView} from '../src/ui/render.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const state = createInitialState({name:'Тестовый игрок',origin:'shinobi'});
assert.equal(CHARACTERS.length,28,'В списке должно быть 28 персонажей');
assert.equal(ORIGINS.length,10,'Должно быть 10 вариантов происхождения');
assert.equal(LOCATIONS.length,17,'Карта должна содержать 17 мест');
assert.equal(state.unlocked.length,27,'Все персонажи, кроме секретного Хаку, доступны в начале');
assert.equal(getCharacter('haku').secret,true,'Хаку должен быть секретным персонажем');
for (const character of CHARACTERS) {
  assert.equal(character.art.length,3,`${character.name}: должно быть три варианта арта`);
  for (const art of character.art) assert.ok(fs.existsSync(path.join(root,art.src)),`${character.name}: файл арта ${art.src} должен существовать`);
}

const initialMinute = state.world.minute;
travelTo(state,'ichiraku');
assert.equal(state.world.location,'ichiraku');
assert.ok(state.world.minute > initialMinute,'Переход должен продвинуть время');

doActivity(state,'meal');
assert.ok(state.player.stats.stamina > 0,'Приём пищи должен поддерживать выносливость');

const ayame = getCharacter('ayame');
const firstTalk = talkToCharacter(state,ayame,'Привет! Как проходит твой день?');
assert.ok(firstTalk.reply.length > 20,'Игровой мастер должен дать содержательный ответ');
assert.equal(getBond(state,'ayame').meetings,1,'Встреча должна учитываться');
assert.equal(analyzeText('Я обещаю помочь завтра').kind,'promise','Должен распознаваться тип обещания');

talkToCharacter(state,ayame,'Я обещаю помочь тебе на кухне.');
const promise = state.scroll.find(item=>item.kind==='promise' && item.characterId==='ayame' && !item.done);
assert.ok(promise,'Обещание должно появиться в свитке');
talkToCharacter(state,ayame,'Не получится выполнить обещание, давай отменим.');
assert.ok(promise.done,'Отмена обещания должна обновлять свиток');

state.ui.pendingGiftId='tea';
const teaBefore = state.inventory.find(item=>item.id==='tea').qty;
talkToCharacter(state,ayame,'Дарю тебе чай.');
const teaAfter = state.inventory.find(item=>item.id==='tea').qty;
assert.equal(teaAfter,teaBefore-1,'Подарок должен уменьшать количество предметов');

const plan = assignDailyTask(state,'ayame','cook');
assert.equal(plan.ok,true,'Можно назначить бытовое занятие персонажу');
const planUpdate = assignDailyTask(state,'ayame','study');
assert.equal(planUpdate.ok,true,'План персонажа можно изменить');
assert.equal(state.assignments.find(item=>item.actorId==='ayame').task,'study');
const dayBefore = state.world.day;
sleepUntilMorning(state);
assert.ok(state.world.day > dayBefore,'Сон должен переводить на следующий день');
assert.equal(state.assignments.find(item=>item.actorId==='ayame').done,true,'План должен выполниться при наступлении нового дня');

skipTime(state,2);
assert.ok(state.world.minute >= 0 && state.world.minute < 1440,'Время должно оставаться в пределах суток');

state.ui.view='world';
assert.match(renderView(state),/Карта Конохи/,'Экран мира должен выводить карту');
assert.match(renderView(state),/data-action="patrol"/,'На карте доступен патруль');
for (const location of LOCATIONS) assert.ok(fs.existsSync(path.join(root,location.bg)),`${location.name}: локальный фон должен существовать`);
state.ui.view='people';
state.ui.targetId='';
assert.match(renderView(state),/Жители и союзники/,'Экран персонажей должен рендериться');
state.ui.targetId='ayame';
assert.match(renderView(state),/chat-form/,'Карточка персонажа должна включать свободный чат');
assert.match(renderView(state),/character-art-grid/,'Карточка персонажа должна показывать галерею артов');
state.ui.view='scroll';
assert.match(renderView(state),/Свиток дел/,'Экран заданий должен рендериться');
state.ui.view='bag';
assert.match(renderView(state),/Инвентарь/,'Экран инвентаря должен рендериться');

// Haku's clue is designed to appear only during winter exploration.
for(let i=0;i<21;i++) sleepUntilMorning(state);
assert.equal(state.world.season,3,'После смены сезонов должен наступить зимний период');
travelTo(state,'forest');
assert.equal(state.world.secretClue,true,'Зимняя лесная тропа должна открыть подсказку о Хаку');

console.log('OK: core systems, local GM, memory, gifting, daily plans, quests, season cycle and view rendering.');
