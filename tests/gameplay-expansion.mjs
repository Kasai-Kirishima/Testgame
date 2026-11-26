import assert from 'node:assert/strict';
import {createInitialState,normalizeState} from '../src/core/store.js';
import {advanceTime,doActivity,tickAction,resolveWorldSituation} from '../src/core/life.js';
import {ensureDailyBoard,recordDailyProgress,gainSkillXP,getSkillLevel,craftItem,useCraftedItem,canCraft,RECIPES} from '../src/core/progression.js';
import {renderView} from '../src/ui/render.js';

const state=createInitialState({name:'Тестировщик'});
const board=ensureDailyBoard(state);
assert.equal(board.contracts.length,3,'Every in-game day should provide three contracts');
const visit=board.contracts.find(item=>item.metric==='visit');
if (visit) {
  const initial=state.player.stats.coins;
  for(let i=0;i<visit.target;i++) recordDailyProgress(state,'visit');
  assert.equal(visit.done,true,'Daily contract should complete at target');
  assert.equal(state.player.stats.coins,initial+visit.reward,'Daily contract should pay exactly once');
  recordDailyProgress(state,'visit',4);
  assert.equal(state.player.stats.coins,initial+visit.reward,'Completed contract cannot be farmed');
}
const xpState=createInitialState({name:'Ученик'});
gainSkillXP(xpState,'chakra',60);
assert.equal(getSkillLevel(xpState,'chakra'),3,'Skill should level up at cumulative XP thresholds');

const poor=createInitialState({name:'Без рё'});
poor.player.stats.coins=0;
const minuteBefore=poor.world.minute,actionsBefore=poor.world.actions;
const meal=doActivity(poor,'meal');
assert.match(meal,/не потрачены/,'Failed meal should explain that no time or money was spent');
assert.equal(poor.world.minute,minuteBefore,'Failed action must not advance time');
assert.equal(poor.world.actions,actionsBefore,'Failed action must not count as an action');
poor.player.stats.chakra=0;
const barrier=doActivity(poor,'barrier');
assert.match(barrier,/Время не потрачено/,'Insufficient chakra must block barrier practice');
assert.equal(poor.world.actions,actionsBefore);

const crafter=createInitialState({name:'Мастер'});
crafter.world.location='home';
crafter.inventory=[{id:'herb',qty:2,kind:'material',name:'Трава'},{id:'paper',qty:2,kind:'material',name:'Бумага'},{id:'tea',qty:1,kind:'gift',name:'Чай'},{id:'flower',qty:2,kind:'gift',name:'Цветы'}];
assert.equal(RECIPES.length,3,'Three useful craft recipes should be available');
assert.equal(canCraft(crafter,'field-kit'),true);
crafter.player.stats.hp=48;
const kit=craftItem(crafter,'field-kit');
assert.equal(kit.ok,true,'Field kit should craft with the correct materials at home');
assert.equal(crafter.inventory.some(item=>item.id==='herb'),false,'Crafting must consume ingredients and remove depleted stacks');
assert.equal(useCraftedItem(crafter,'field-kit').ok,true);
assert.equal(crafter.player.stats.hp,76,'Field kit restores 28 HP');
crafter.inventory.push({id:'herb',qty:1,kind:'material',name:'Трава'});
const beforeTea= crafter.player.stats.stamina;
assert.equal(craftItem(crafter,'herbal-tea').ok,true,'Herbal tea should craft from herb and tea');
assert.equal(useCraftedItem(crafter,'herbal-tea').ok,true);
assert.equal(crafter.player.stats.stamina,Math.min(100,beforeTea+28));
assert.equal(craftItem(crafter,'pressed-bouquet').ok,true,'Pressed bouquet should craft from flowers and paper');
assert.ok(crafter.inventory.some(item=>item.id==='pressed-bouquet'&&item.qty===1));
const away=createInitialState({name:'Не дома'});
assert.equal(craftItem(away,'field-kit').ok,false,'Crafting away from home is blocked');

const eventState=createInitialState({name:'Ситуационный тест'});
eventState.world.location='hospital';
eventState.inventory=eventState.inventory.filter(item=>item.id!=='herb');
eventState.world.actions=3;
tickAction(eventState,1);
const incident=eventState.scroll.find(item=>item.kind==='situation'&&!item.done);
assert.ok(incident,'A location-specific unusual situation should appear after the event check');
eventState.world.location='market';
const awayFromScene=resolveWorldSituation(eventState,incident.id,'sort');
assert.equal(awayFromScene.ok,false,'A situation cannot be resolved remotely from another location');
assert.equal(incident.done,false,'Leaving a scene must not silently resolve it');
eventState.world.location='hospital';
const missingItem=resolveWorldSituation(eventState,incident.id,'donate');
assert.equal(missingItem.ok,false,'Choice requiring an absent item should be blocked');
assert.equal(incident.done,false,'Blocked choice must not resolve or reward the incident');
eventState.inventory.push({id:'herb',qty:1,kind:'material',name:'Трава'});
const beforeRenown=eventState.player.stats.renown;
const resolved=resolveWorldSituation(eventState,incident.id,'donate');
assert.equal(resolved.ok,true,'Valid situation choice should resolve');
assert.equal(incident.done,true);
assert.equal(eventState.player.stats.renown,Math.min(100,beforeRenown+3));
assert.equal(eventState.inventory.some(item=>item.id==='herb'),false,'Required ingredient should be consumed and removed');
const afterReward=eventState.player.stats.renown;
assert.equal(resolveWorldSituation(eventState,incident.id,'donate').ok,false,'Resolved situation cannot be replayed');
assert.equal(eventState.player.stats.renown,afterReward,'Resolved situation cannot pay twice');

const marketState=createInitialState({name:'Рыночный тест'});
marketState.world.location='market';marketState.world.actions=3;
tickAction(marketState,1);
assert.ok(marketState.scroll.some(item=>item.kind==='situation'&&item.scenarioId==='market-parcels'));

const dayState=createInitialState({name:'Смена дня'});
ensureDailyBoard(dayState);
advanceTime(dayState,1440);
assert.equal(dayState.world.day,2);
assert.equal(dayState.dailyBoard.day,2,'Daily contracts should refresh on a new day');
assert.equal(dayState.dailyBoardHistory.length,1,'Previous daily board should be archived');
const invalidTimeState=createInitialState({name:'Некорректное время'});
advanceTime(invalidTimeState,Number.NaN);
assert.equal(invalidTimeState.world.minute,480,'Invalid time input should be safely ignored');
assert.equal(invalidTimeState.world.day,1,'Invalid time input must not roll over the day');

const scrollState=createInitialState({name:'Интерфейс'});
scrollState.ui.view='scroll';
const scrollHtml=renderView(scrollState);
assert.match(scrollHtml,/Поручения на день/);
assert.match(scrollHtml,/Развитие навыков/);
const bagState=createInitialState({name:'Мастерская'});bagState.ui.view='bag';bagState.world.location='home';
assert.match(renderView(bagState),/Мастерская/);
assert.match(renderView(bagState),/Изготовить/);
const migrated=normalizeState({version:2,player:{name:'Старое сохранение'},world:{day:4,minute:450,location:'home'}});
assert.ok(migrated.skills && migrated.dailyBoardHistory,'Old saves should migrate to the new progression fields');

console.log('PASS: daily contracts, skill progression, resource validation, crafting, consumables, choice-based world situations, new-day rollover and UI rendering.');
