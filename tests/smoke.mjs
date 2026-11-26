import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {createInitialState,getBond} from '../src/core/store.js';
import {CHARACTERS,getCharacter,getUnlockedCharacterArts} from '../src/data/characters.js';
import {ORIGINS,LOCATIONS} from '../src/data/world.js';
import {travelTo,doActivity,assignDailyTask,sleepUntilMorning,skipTime,updateNpcPositions,advanceTime,getTravelMinutes,getLocationAccess} from '../src/core/life.js';
import {talkToCharacter,analyzeText} from '../src/core/gm.js';
import {renderView} from '../src/ui/render.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const state = createInitialState({name:'Тестовый игрок',origin:'shinobi'});
assert.equal(CHARACTERS.length,28,'В списке должно быть 28 персонажей');
assert.equal(ORIGINS.length,10,'Должно быть 10 вариантов происхождения');
assert.equal(LOCATIONS.length,24,'Каталог мира должен содержать 24 места, включая скрытый музыкальный зал');
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


// Character art should unlock gradually rather than revealing every image immediately.
const unlockState=createInitialState({name:'Галерея'});
const sakuraForArts=getCharacter('sakura');
assert.equal(getUnlockedCharacterArts(unlockState,sakuraForArts).length,1,'Only the first portrait should be available at first meeting');
unlockState.bonds.sakura={friendship:0,trust:0,respect:0,irritation:0,meetings:2,stage:'Знакомство'};
assert.equal(getUnlockedCharacterArts(unlockState,sakuraForArts).length,2,'Second art should unlock after two meetings');
unlockState.bonds.sakura={friendship:40,trust:25,respect:0,irritation:0,meetings:4,stage:'Близкий знакомый'};
assert.equal(getUnlockedCharacterArts(unlockState,sakuraForArts).length,3,'Third art should unlock after a sustained relationship');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
for (const label of ['Новая игра','Загрузить','Настройки','Галерея','Выход']) assert.ok(html.includes(label),`Title menu should include ${label}`);
const css=fs.readFileSync(path.join(root,'assets/css/style.css'),'utf8');
assert.match(css,/konoha-main-title\.png/,'Title menu must use the dedicated Konoha PNG background');
assert.ok(fs.existsSync(path.join(root,'assets/backgrounds/konoha-main-title.png')),'Dedicated title background image must exist');
assert.match(html,/title-project-mark/,'Project mark should be positioned separately from the menu');
for (const page of ['world','map','people','gallery','locations','day','work','scroll','bag','phone','pets','settings','help']) assert.ok(html.includes(`data-view="${page}"`),`Navigation should expose ${page} as a separate page`);

const initialMinute = state.world.minute;
assert.ok(getTravelMinutes('home','main-street')>=5 && getTravelMinutes('home','main-street')<=32,'Travel time should be distance-based and bounded');
const restrictedState=createInitialState({name:'Гость',origin:'otherworld'});
assert.equal(getLocationAccess(restrictedState,'archive').allowed,false,'Archive should require reputation or a library job');
assert.equal(getLocationAccess(restrictedState,'hokage').allowed,false,'Hokage residence should require basic reputation');
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

state.companions=['ayame'];
state.companions=['ayame'];
const plan = assignDailyTask(state,'ayame','cook');
assert.equal(plan.ok,true,'Можно назначить бытовое занятие персонажу');
const planUpdate = assignDailyTask(state,'ayame','study');
assert.equal(planUpdate.ok,true,'План персонажа можно изменить');
assert.equal(state.assignments.find(item=>item.actorId==='ayame').task,'study');
const dayBefore = state.world.day;
sleepUntilMorning(state);
assert.ok(state.world.day > dayBefore,'Сон должен переводить на следующий день');
assert.equal(state.assignments.find(item=>item.actorId==='ayame').done,true,'План должен выполниться при наступлении нового дня');

const priorNpcPeriod=state.npcPeriod;
skipTime(state,5);
assert.ok(state.world.minute >= 0 && state.world.minute < 1440,'Время должно оставаться в пределах суток');
assert.notEqual(state.npcPeriod,priorNpcPeriod,'NPC movement should update after a time-period skip');

const petState=createInitialState({name:'Зоовладелец'}); petState.pets=[{uid:'p1',name:'Мару',hunger:30,mood:60,energy:55}]; advanceTime(petState,1440);
assert.equal(petState.pets[0].hunger,48,'Pet hunger should rise gently after a full day');
assert.equal(petState.pets[0].mood,55,'Pet mood should reflect unattended daily care');


// Work and clothing rules: only buy at the market and change clothes at home/market.
const wardrobeState=createInitialState({name:'Гардероб'});
assert.deepEqual(wardrobeState.player.ownedLooks,['casual','shinobi']);
assert.ok(LOCATIONS.find(item=>item.id==='greenhouse'),'Additional location should be present');
// Schedules stay private to the player-facing render.
wardrobeState.ui.view='day';
assert.doesNotMatch(renderView(wardrobeState),/Персонаж.*в 08:|Персональный распорядок:/,'NPC private schedules should not be exposed');

state.ui.view='world';
assert.match(renderView(state),/rp-full-scene/,'Главная RP-страница должна рендериться как полноэкранная сцена');
assert.match(renderView(state),/world-action-form/,'Главная страница должна содержать поле действий');
assert.match(renderView(state),/world-dialogue-form/,'Главная страница должна содержать свободный диалог');
assert.match(renderView(state),/rp-scene-bottom/,'Главная сцена должна показывать текст происходящего внизу');
assert.match(renderView(state),/rp-text-action/,'Главная страница должна содержать поле свободного действия');
const conversationState=createInitialState({name:'Тестовый игрок',origin:'shinobi'});
conversationState.ui.view='conversation';
conversationState.ui.targetId='sakura';
updateNpcPositions(conversationState,true);
conversationState.npcLocations.sakura=conversationState.world.location;
conversationState.dialogues.sakura=[{from:'npc',text:'Привет! Как проходит твой день?',day:1,minute:480}];
const conversationHtml=renderView(conversationState);
assert.match(conversationHtml,/conversation-form/,'Личный диалог должен иметь поле свободной реплики');
assert.match(conversationHtml,/conversation-gesture/,'В диалоге должны быть кнопки действий');
assert.match(conversationHtml,/Попросить обнять/,'Объятие должно предлагаться как действие с запросом согласия');
for (const location of LOCATIONS) assert.ok(fs.existsSync(path.join(root,location.bg)),`${location.name}: локальный фон должен существовать`);
state.ui.view='people';
state.ui.targetId='';
assert.match(renderView(state),/знакомых героев|Знакомые персонажи|познакомился лично/,'Страница героев должна быть отфильтрована по личным встречам');
state.ui.view='profile';
state.ui.targetId='ayame';
state.npcLocations.ayame=state.world.location;
assert.doesNotMatch(renderView(state),/id=\"chat-form\"|id=\"conversation-form\"/,'Досье не должно содержать форму чата');
state.npcLocations.ayame='hospital';
assert.doesNotMatch(renderView(state),/id="chat-form"/,'Профиль не должен позволять личный чат с персонажем в другой локации');
assert.match(renderView(state),/Последняя известная встреча/,'Досье должно показывать сведения о местонахождении отдельно от общения');
assert.match(renderView(state),/dossier-art-stage/,'Профиль персонажа должен показывать галерею изображений');
state.ui.view='scroll';
assert.match(renderView(state),/Задания/,'Экран заданий должен рендериться');
assert.match(renderView(state),/quest-tabs/,'Задания должны иметь вкладки активных записей и истории');
state.ui.view='bag';
assert.match(renderView(state),/Инвентарь/,'Экран инвентаря должен рендериться');
assert.match(renderView(state),/bag-tabs/,'Инвентарь должен иметь категории');
state.ui.view='day';
assert.match(renderView(state),/Распорядок дня/,'Экран планов должен рендериться');
state.ui.view='gallery';
assert.match(renderView(state),/Галерея/,'Галерея должна рендериться');
state.ui.view='help';
assert.match(renderView(state),/Помощь/,'Экран помощи должен рендериться');
state.ui.view='locations';
assert.match(renderView(state),/Локации/,'Экран локаций должен рендериться');
state.ui.view='phone';
assert.match(renderView(state),/Konohagram/,'Smartphone feed page should render');
state.phone.app='scrolltube'; state.phone.activeVideo='v1';
assert.match(renderView(state),/video-player/,'ScrollTube should render a selected local video screen');
state.phone.activeVideo=''; state.phone.app='home';
state.ui.view='pets';
assert.match(renderView(state),/Магазин животных/,'Pet store page should render');
state.ui.view='settings';
assert.match(renderView(state),/Настройки/,'Экран настроек должен рендериться');
state.ui.view='map';
assert.match(renderView(state),/map-overview/,'Карта должна показывать схему деревни сверху');
assert.match(renderView(state),/map-pin/,'Карта должна содержать интерактивные точки локаций');
assert.doesNotMatch(renderView(state),/map-locations-list/,'Map should not render a duplicate location list below pins');
assert.equal(analyzeText('Как дела?').kind,'howAre','How are you should be distinct from greeting');
assert.equal(analyzeText('Привет, как ты?').kind,'howAre','Mixed greeting and wellbeing question should be handled by howAre');

assert.match(renderView(state),/КАРТА КОНОХИ/,'Карта должна иметь собственную шапку с сакурой');
state.ui.view='gallery';
const galleryHtml=renderView(state);
assert.match(galleryHtml,/Галерея героинь/,'Галерея должна содержать весь доступный ростер');
assert.match(galleryHtml,/Открыто в RP|Просмотр галереи/,'Галерея должна различать открытые и просмотренные изображения');

// Assigned daily activities should influence the NPC's actual location.
const routineState=createInitialState({name:'Планировщик'}); routineState.unlocked=['ayame']; routineState.companions=['ayame']; updateNpcPositions(routineState,true);
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
