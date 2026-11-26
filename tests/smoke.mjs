import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {createInitialState,getBond} from '../src/core/store.js';
import {CHARACTERS,getCharacter} from '../src/data/characters.js';
import {ORIGINS,LOCATIONS} from '../src/data/world.js';
import {travelTo,doActivity,assignDailyTask,sleepUntilMorning,skipTime,updateNpcPositions,advanceTime} from '../src/core/life.js';
import {talkToCharacter,analyzeText} from '../src/core/gm.js';
import {renderView} from '../src/ui/render.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const state = createInitialState({name:'Тестовый игрок',origin:'shinobi'});
assert.equal(CHARACTERS.length,28,'В списке должно быть 28 персонажей');
assert.equal(ORIGINS.length,10,'Должно быть 10 вариантов происхождения');
assert.equal(LOCATIONS.length,17,'Карта должна содержать 17 мест');
assert.equal(state.unlocked.length,27,'Все персонажи, кроме секретного Хаку, доступны в начале');
assert.equal(getCharacter('haku').secret,true,'Хаку должен быть секретным персонажем');
updateNpcPositions(state,true);
const scheduledLocations=Object.values(state.npcLocations);
assert.equal(new Set(scheduledLocations).size,scheduledLocations.length,'At most one NPC may be assigned to each location');
assert.ok(scheduledLocations.length<=LOCATIONS.length,'NPC schedule must not overfill locations');
for (const minute of [8*60,13*60,18*60,23*60]) { state.world.minute=minute; updateNpcPositions(state,true); const positions=Object.values(state.npcLocations); assert.equal(new Set(positions).size,positions.length,'NPCs must never share a scheduled location'); }
const detailedCharacters = new Set(['anko','ayame','konan','sakura','hanabi','hinata']);
for (const character of CHARACTERS) {
  assert.equal(character.art.length,detailedCharacters.has(character.id)?3:1,`${character.name}: число изображений должно соответствовать готовым материалам`);
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
assert.equal(analyzeText('Что тебе нравится?').kind,'interests','GM should understand an interest question');
assert.equal(analyzeText('Давай составим план на день').kind,'plan','GM should understand planning messages');
const whereReply = talkToCharacter(state,ayame,'Где ты сейчас?');
assert.ok(whereReply.reply.includes('Сейчас'), 'Location questions must use the live schedule without crashing');

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

const petState=createInitialState({name:'Зоовладелец'}); petState.pets=[{uid:'p1',name:'Мару',hunger:30,mood:60,energy:55}]; advanceTime(petState,1440);
assert.equal(petState.pets[0].hunger,48,'Pet hunger should rise gently after a full day');
assert.equal(petState.pets[0].mood,55,'Pet mood should reflect unattended daily care');

state.ui.view='world';
assert.match(renderView(state),/Хроники Конохи/,'Главная страница должна рендериться');
assert.match(renderView(state),/world-action-form/,'Главная страница должна содержать поле действий');
assert.match(renderView(state),/world-dialogue-form/,'Главная страница должна содержать свободный диалог');
assert.match(renderView(state),/data-action="patrol"/,'На главной странице доступен патруль');
for (const location of LOCATIONS) assert.ok(fs.existsSync(path.join(root,location.bg)),`${location.name}: локальный фон должен существовать`);
state.ui.view='people';
state.ui.targetId='';
assert.match(renderView(state),/Жители и союзники/,'Отдельная страница списка персонажей должна рендериться');
state.ui.view='profile';
state.ui.targetId='ayame';
assert.match(renderView(state),/chat-form/,'Отдельная страница профиля должна включать свободный чат');
assert.match(renderView(state),/character-art-grid/,'Профиль персонажа должен показывать доступные арты');
state.ui.view='scroll';
assert.match(renderView(state),/Свиток дел/,'Экран заданий должен рендериться');
state.ui.view='bag';
assert.match(renderView(state),/Инвентарь/,'Экран инвентаря должен рендериться');
state.ui.view='day';
assert.match(renderView(state),/Распорядок дня/,'Экран планов должен рендериться');
state.ui.view='phone';
assert.match(renderView(state),/Konohagram/,'Smartphone feed page should render');
state.ui.view='pets';
assert.match(renderView(state),/Магазин животных/,'Pet store page should render');
state.ui.view='settings';
assert.match(renderView(state),/Настройки/,'Экран настроек должен рендериться');
state.ui.view='map';
assert.match(renderView(state),/ref-location-grid/,'Карта должна рендериться отдельной страницей');

// Assigned daily activities should influence the NPC's actual location.
const routineState=createInitialState({name:'Планировщик'}); routineState.unlocked=['ayame']; updateNpcPositions(routineState,true);
const routinePlan=assignDailyTask(routineState,'ayame','train');
assert.equal(routinePlan.ok,true);
assert.equal(routineState.npcLocations.ayame,'training','A training assignment should move the NPC to the training ground');

// The village exploration task counts unique places, not repeated trips.
const exploreState=createInitialState({name:'Путешественник'});
const exploreQuest=()=>exploreState.scroll.find(item=>item.id==='first-walk');
travelTo(exploreState,'ichiraku'); assert.equal(exploreQuest().progress,2);
travelTo(exploreState,'main-street'); assert.equal(exploreQuest().progress,2,'Returning to the start should not add another unique location');
travelTo(exploreState,'ichiraku'); assert.equal(exploreQuest().progress,2,'Revisiting the same place should not count twice');
travelTo(exploreState,'market'); assert.equal(exploreQuest().progress,3);
assert.equal(exploreQuest().done,true,'Three different locations should complete the exploration task');

// Clinic quest only completes after an on-site visit and actual medical help.
const clinicState=createInitialState({name:'Медик'});
const clinicQuest=clinicState.scroll.find(item=>item.id==='clinic-help');
clinicState.world.location='main-street'; clinicQuest.visited=true; doActivity(clinicState,'clinic');
assert.equal(clinicQuest.done,false,'Clinic quest must not complete away from the hospital');
clinicState.world.location='hospital'; doActivity(clinicState,'clinic');
assert.equal(clinicQuest.done,true,'Clinic quest completes after helping at the hospital');

// Haku's clue is designed to appear only during winter exploration.
for(let i=0;i<21;i++) sleepUntilMorning(state);
assert.equal(state.world.season,3,'После смены сезонов должен наступить зимний период');
travelTo(state,'forest');
assert.equal(state.world.secretClue,true,'Зимняя лесная тропа должна открыть подсказку о Хаку');

console.log('OK: core systems, local GM, memory, gifting, daily plans, quests, season cycle and view rendering.');
