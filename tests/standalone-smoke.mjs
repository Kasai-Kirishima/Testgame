import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

class FakeClassList {
  constructor(element) { this.element = element; }
  values() { return new Set(String(this.element.className || '').split(/\s+/).filter(Boolean)); }
  toggle(name, force) {
    const values = this.values();
    const shouldAdd = force === undefined ? !values.has(name) : Boolean(force);
    if (shouldAdd) values.add(name); else values.delete(name);
    this.element.className = [...values].join(' ');
    return shouldAdd;
  }
  contains(name) { return this.values().has(name); }
  add(name) { this.toggle(name, true); }
  remove(name) { this.toggle(name, false); }
}
class FakeElement {
  constructor(id='') {
    this.id = id; this.className = ''; this.classList = new FakeClassList(this);
    this.dataset = {}; this.style = {}; this.children = []; this.value = '';
    this.textContent = ''; this.innerHTML = ''; this.disabled = false; this.files = []; this.data = {}; this.classList = new FakeClassList(this);
    this.matches = selector => selector.startsWith('.') ? this.classList.contains(selector.slice(1)) : false;
  }
  append(...items) { this.children.push(...items); }
  remove() { this.removed = true; }
  click() { this.clicked = true; }
}
const elements = new Map();
const initialClasses = {'title-screen':'title-screen','creation-screen':'creation-screen hidden','game-screen':'game-screen hidden'};
function getElement(id) {
  if (!elements.has(id)) {
    const node = new FakeElement(id);
    if (initialClasses[id]) node.className = initialClasses[id];
    if (id === 'player-origin') node.value = 'resident';
    elements.set(id, node);
  }
  return elements.get(id);
}
const listeners = {};
const document = {
  getElementById: getElement,
  createElement: (tag) => new FakeElement(tag),
  querySelectorAll: () => [],
  addEventListener: (type, callback) => (listeners[type] ||= []).push(callback),
  body: new FakeElement('body')
};
const local = new Map();
const localStorage = {
  getItem: key => local.has(key) ? local.get(key) : null,
  setItem: (key,value) => local.set(key,String(value)),
  removeItem: key => local.delete(key)
};
class FakeFormData {
  constructor(form) { this.data = form.data || {}; }
  get(key) { return this.data[key] ?? null; }
}
const window = { addEventListener(){}, setTimeout(){ return 1; }, open(){} };
const context = {document,window,localStorage,FormData:FakeFormData,console,confirm:()=>true,Blob:class{},URL:{},FileReader:class{}};
vm.runInNewContext(fs.readFileSync(new URL('../standalone.js', import.meta.url),'utf8'), context, {filename:'standalone.js'});

const click = listeners.click?.[0];
assert.equal(typeof click,'function','click handler must initialize');
// Title settings and gallery must never create a phantom player/save.
assert.equal(context.window.NEG_TEST.state(),null,'fresh install must not have a game state');
const titleSettingsButton={dataset:{action:'title-settings'},textContent:'Настройки',closest(){return this;}};
click({target:{closest:selector=>selector==='[data-action]'?titleSettingsButton:null,classList:{contains:()=>false}}});
assert.equal(context.window.NEG_TEST.state(),null,'opening title settings must not create a player');
assert.ok(getElement('modal-root').innerHTML.includes('Настройки'),'title settings should open as a modal');
assert.equal(getElement('game-screen').classList.contains('hidden'),true,'title settings must not enter the game');
const closeTitleModal={dataset:{action:'close-modal'},textContent:'Закрыть',closest(){return this;}};
click({target:{closest:selector=>selector==='[data-action]'?closeTitleModal:null,classList:{contains:()=>false}}});
const newGameButton = {dataset:{action:'new-game'},textContent:'Новая история',closest(){return this;}};
click({target:{closest:()=>newGameButton,classList:{contains:()=>false}}});
assert.equal(getElement('creation-screen').classList.contains('hidden'),false,'new-game button must reveal character creation');
assert.ok(getElement('player-origin').innerHTML.includes('Житель Конохи'),'origin options must populate');
const randomNameButton = {dataset:{action:'random-name'},textContent:'Случайное имя',closest(){return this;}};
click({target:{closest:()=>randomNameButton,classList:{contains:()=>false}}});
assert.ok(getElement('player-name').value.length>2,'random name button must fill the character name');
context.window.NEG_TEST.randomize();
for (const id of ['player-origin','player-style','player-look','player-clan','player-chakra','player-specialty','player-gender','player-hair','player-eyes','player-goal','player-village','player-tool','player-age','player-mark']) assert.ok(getElement(id).value,`full random creator fills ${id}`);

const submit = listeners.submit?.[0];
const form = new FakeElement('creation-form'); Object.assign(form,{id:'creation-form',data:{name:'Проверка',origin:'shinobi',style:'balanced',look:'casual',mark:'none',gender:'female',age:'22',clan:'Хьюга',chakra:'wind',specialty:'sensors',hair:'long',eyes:'Фиолетовые',goal:'explore',village:'konoha',signatureTool:'scroll'}});
submit({target:form,preventDefault(){}});
assert.equal(getElement('game-screen').classList.contains('hidden'),false,'creation form must start the game');
assert.equal(context.window.NEG_TEST.state().player.village,'konoha','creator should store village selection');
assert.equal(context.window.NEG_TEST.state().player.signatureTool,'scroll','creator should store tool selection');
assert.equal(context.window.NEG_TEST.state().player.age,22,'creator should store age selection');
assert.ok(getElement('view-root').innerHTML.includes('rp-full-scene'),'game screen must render the full-screen RP scene');
assert.ok(getElement('view-root').innerHTML.includes('world-action-form'),'world screen must show free-text actions');
assert.ok(getElement('view-root').innerHTML.includes('world-dialogue-form'),'world screen must show free-text dialogue');
assert.ok(getElement('view-root').innerHTML.includes('rp-scene-bottom'),'world screen must show the scene dialogue overlay');
const worldActionForm = new FakeElement('world-action-form'); Object.assign(worldActionForm,{id:'world-action-form',data:{action:'Я иду в больницу.'}});
submit({target:worldActionForm,preventDefault(){}});
assert.equal(context.window.NEG_TEST.state().world.location,'hospital','free-text movement must navigate to a named location');
assert.ok(context.window.NEG_TEST.state().ui.lastActionResult.includes('направляешься'),'free-text action must return a narrated result');
context.window.NEG_TEST.state().world.location='ichiraku';
context.window.NEG_TEST.state().player.stats.stamina=60;
const coinsBeforeOrder=context.window.NEG_TEST.state().player.stats.coins; const staminaBeforeOrder=context.window.NEG_TEST.state().player.stats.stamina;
context.window.NEG_TEST.action('Я голоден, заказал еду.');
assert.ok(context.window.NEG_TEST.state().ui.lastActionResult.includes('горячая миска рамена'),'food-order action should produce a contextual restaurant scene');
assert.equal(context.window.NEG_TEST.state().player.stats.coins,coinsBeforeOrder-18,'ordering ramen should deduct its price');
assert.ok(context.window.NEG_TEST.state().player.stats.stamina>staminaBeforeOrder,'eating should restore stamina');
// Purchases require a valid shop; ordering food uses the restaurant path instead of generic merchandise.
context.window.NEG_TEST.state().world.location='home';
const coinsBeforeWrongShop=context.window.NEG_TEST.state().player.stats.coins;
const minuteBeforeWrongShop=context.window.NEG_TEST.state().world.minute;
const inventoryBeforeWrongShop=context.window.NEG_TEST.state().inventory.length;
context.window.NEG_TEST.action('Покупаю зелёный чай.');
assert.equal(context.window.NEG_TEST.state().player.stats.coins,coinsBeforeWrongShop,'Buying outside a shop must not charge coins');
assert.equal(context.window.NEG_TEST.state().world.minute,minuteBeforeWrongShop,'Rejected purchase must not advance time');
assert.equal(context.window.NEG_TEST.state().inventory.length,inventoryBeforeWrongShop,'Rejected purchase must not create an item');
assert.match(context.window.NEG_TEST.state().ui.lastActionResult,/рынок|цветочн/i,'Rejected purchase should explain where to shop');
context.window.NEG_TEST.state().world.location='ichiraku';
const coinsBeforeRamen=context.window.NEG_TEST.state().player.stats.coins;
context.window.NEG_TEST.action('Покупаю рамен.');
assert.equal(context.window.NEG_TEST.state().player.stats.coins,coinsBeforeRamen-18,'Ramen purchase phrasing should use the restaurant order path');
assert.match(context.window.NEG_TEST.state().ui.lastActionResult,/миска рамена/i,'Ramen purchase should create the restaurant scene');
context.window.NEG_TEST.state().world.location='hospital';
const worldDialogueForm = new FakeElement('world-dialogue-form'); context.window.NEG_TEST.state().npcLocations.sakura='hospital'; Object.assign(worldDialogueForm,{id:'world-dialogue-form',data:{characterId:'sakura',message:'Привет, Сакура! Как прошёл твой день?'}});
submit({target:worldDialogueForm,preventDefault(){}});
assert.equal(context.window.NEG_TEST.state().ui.view,'world','free-text dialogue must stay on the RP home page');
assert.ok(context.window.NEG_TEST.state().dialogues.sakura.some(message=>message.from==='player' && message.text.includes('Как прошёл')),'free-text dialogue must be saved in the character history');
const naturalActionForm = new FakeElement('world-action-form'); context.window.NEG_TEST.state().npcLocations.hinata='hospital'; Object.assign(naturalActionForm,{id:'world-action-form',data:{action:'Иду к Хинате и спрашиваю, как прошёл её день.'}});
submit({target:naturalActionForm,preventDefault(){}});
assert.equal(context.window.NEG_TEST.state().ui.targetId,'hinata','free-text RP must resolve an inflected character name');
assert.ok(context.window.NEG_TEST.state().dialogues.hinata.some(message=>message.from==='player' && message.text.includes('спрашиваю')),'action text can include dialogue and resolve it to a character');
// Context-sensitive GM actions: observing, waiting, losing and damaging something create distinct outcomes.
context.window.NEG_TEST.state().world.location='main-street';
context.window.NEG_TEST.action('Оглядываюсь и прислушиваюсь.');
assert.ok(context.window.NEG_TEST.state().ui.lastActionResult.includes('Улица живёт своим ритмом'),'observation should describe the current scene, not a random generic result');
context.window.NEG_TEST.state().npcLocations.hinata='main-street';
context.window.NEG_TEST.action('Жду Хинату.');
assert.ok(/остаёшься на месте|подождал немного/i.test(context.window.NEG_TEST.state().ui.lastActionResult),'waiting for a character should resolve as a wait action');
context.window.NEG_TEST.action('Я потерял свиток.');
const lostIncident=context.window.NEG_TEST.state().world.incidents?.find(item=>item.kind==='lost'&&!item.resolved);
assert.ok(lostIncident,'losing an item should create a persistent incident');
assert.ok(context.window.NEG_TEST.state().scroll.some(item=>item.incidentId===lostIncident.id),'lost-item incident should be tracked in the scroll');
context.window.NEG_TEST.action('Обыскиваю место и ищу свиток.');
assert.equal(lostIncident.resolved,true,'searching the last-seen location should resolve the lost-item incident');
context.window.NEG_TEST.action('Я случайно разбил чужую вазу.');
const repairIncident=context.window.NEG_TEST.state().world.incidents?.find(item=>item.kind==='repair'&&!item.resolved);
assert.ok(repairIncident,'accidental damage should create a repair incident');
context.window.NEG_TEST.action('Нахожу владельца и предлагаю возместить ущерб.');
assert.equal(repairIncident.resolved,true,'taking responsibility should resolve the repair incident');
assert.ok(JSON.parse(local.get('naruto-enot-garem-save-v2')).player.name === 'Проверка','new game must save progress');
const navHandler = listeners.click?.[1];
assert.equal(typeof navHandler,'function','page navigation handler must initialize');
context.window.NEG_TEST.state().ui.view='world';
const fakeApp = {dataset:{view:'world'},matches:()=>false,closest:selector=>selector==='button[data-view]'?null:null};
navHandler({target:{closest:selector=>selector==='button[data-view]'?null:fakeApp}});
assert.equal(context.window.NEG_TEST.state().ui.view,'world','clicks inside the app must not be misread as navigation');

// Home storage transfers food between bag and fridge rather than showing a placeholder.
context.window.NEG_TEST.state().world.location='home';
const fridgeButton={dataset:{action:'home-storage',id:'fridge'},textContent:'Открыть холодильник',closest(){return this;}};
click({target:{closest:selector=>selector==='[data-action]'?fridgeButton:null,classList:{contains:()=>false}}});
assert.ok(getElement('modal-root').innerHTML.includes('Холодильник'),'fridge should open a real storage modal');
const foodBefore=context.window.NEG_TEST.state().inventory.find(item=>item.id==='bento')?.qty||0;
const putFood={dataset:{action:'storage-put',id:'bento'},textContent:'Положить',closest(){return this;}};
click({target:{closest:selector=>selector==='[data-action]'?putFood:null,classList:{contains:()=>false}}});
assert.equal(context.window.NEG_TEST.state().storage.fridge.find(item=>item.id==='bento')?.qty,1,'putting food should save it in the fridge');
assert.equal(context.window.NEG_TEST.state().inventory.find(item=>item.id==='bento')?.qty||0,foodBefore-1,'putting food should remove it from the bag');

const mapNav = {dataset:{view:'map'},closest(){return this;}};
navHandler({target:{closest:selector=>selector==='button[data-view]'?mapNav:null}});
assert.equal(context.window.NEG_TEST.state().ui.view,'map','map must be a separate page');
const peopleNav = {dataset:{view:'people'},closest(){return this;}};
navHandler({target:{closest:selector=>selector==='button[data-view]'?peopleNav:null}});
assert.equal(context.window.NEG_TEST.state().ui.view,'people','character list must be a separate page');
context.window.NEG_TEST.state().world.location='main-street'; context.window.NEG_TEST.state().npcLocations.sakura='memorial';
const openProfileButton = {dataset:{action:'open-person',id:'sakura'},textContent:'Сакура',closest(){return this;}};
click({target:{closest:selector=>selector==='[data-action]'?openProfileButton:null,classList:{contains:()=>false}}});
assert.equal(context.window.NEG_TEST.state().ui.view,'profile','character dossier must be a separate page');
const profileAwayHtml=getElement('view-root').innerHTML;
assert.ok(!profileAwayHtml.includes('id="chat-form"'),'profile should not expose a personal chat form when character is away');
assert.ok(profileAwayHtml.includes('Последняя известная встреча'),'profile should show last known meeting without chat controls');
assert.ok(!profileAwayHtml.includes('conversation-form')&&!profileAwayHtml.includes('chat-form'),'profile dossier must not contain any dialogue form');
const backToPeopleButton = {dataset:{action:'back-people'},textContent:'К списку',closest(){return this;}};
click({target:{closest:selector=>selector==='[data-action]'?backToPeopleButton:null,classList:{contains:()=>false}}});
assert.equal(context.window.NEG_TEST.state().ui.view,'people','profile back button must return to character list');

const patrolButton = {dataset:{action:'patrol'},textContent:'Патруль',closest(){return this;}};
click({target:{closest:()=>patrolButton,classList:{contains:()=>false}}});
assert.ok(getElement('modal-root').innerHTML.includes('battle-modal'),'patrol must open the encounter panel');
assert.ok(context.window.NEG_TEST.state().encounter,'patrol must create a combat encounter');
for (let i=0;i<8;i++) {
  const current = context.window.NEG_TEST.state().encounter;
  if (!current || current.won || current.lost) break;
  const moveButton = {dataset:{action:'combat-move',type:'technique'},textContent:'Техника чакры',closest(){return this;}};
  click({target:{closest:()=>moveButton,classList:{contains:()=>false}}});
}
assert.ok(context.window.NEG_TEST.state().encounter?.won || context.window.NEG_TEST.state().encounter?.lost,'combat moves must resolve the encounter');
const closeButton = {dataset:{action:'close-encounter'},textContent:'Закрыть',closest(){return this;}};
click({target:{closest:()=>closeButton,classList:{contains:()=>false}}});
assert.equal(context.window.NEG_TEST.state().encounter,null,'encounter can be closed');
// Patrols use persistent health, reject impossible techniques and preserve health after retreat.
context.window.NEG_TEST.state().world.location='forest';
context.window.NEG_TEST.state().player.stats.hp=72;
context.window.NEG_TEST.state().player.stats.chakra=0;
context.window.NEG_TEST.patrol('stone-guardian');
assert.equal(context.window.NEG_TEST.state().encounter.playerHp,72,'Patrol should begin with the player current HP');
const enemyHpBeforeInvalidMove=context.window.NEG_TEST.state().encounter.hp;
context.window.NEG_TEST.combat('technique');
assert.equal(context.window.NEG_TEST.state().encounter.hp,enemyHpBeforeInvalidMove,'Insufficient chakra should not resolve an enemy turn');
assert.equal(context.window.NEG_TEST.state().player.stats.hp,72,'Invalid technique should not damage the player');
context.window.NEG_TEST.combat('guard');
assert.ok(context.window.NEG_TEST.state().player.stats.hp<72,'Enemy counterattack should reduce persistent player HP');
assert.equal(context.window.NEG_TEST.state().encounter.playerHp,context.window.NEG_TEST.state().player.stats.hp,'Encounter HP display should stay synchronized with saved player HP');
const hpBeforeRetreat=context.window.NEG_TEST.state().player.stats.hp;
context.window.NEG_TEST.combat('retreat');
assert.equal(context.window.NEG_TEST.state().encounter,null,'Retreat should end the patrol encounter');
assert.equal(context.window.NEG_TEST.state().player.stats.hp,hpBeforeRetreat,'Retreat should preserve current health');
context.window.NEG_TEST.state().world.minute=600;
context.window.NEG_TEST.patrol('stone-guardian');
const minuteBeforeClose=context.window.NEG_TEST.state().world.minute;
const closeActivePatrol={dataset:{action:'close-encounter'},textContent:'Закрыть',closest(){return this;}};
click({target:{closest:selector=>selector==='[data-action]'?closeActivePatrol:null,classList:{contains:()=>false}}});
assert.equal(context.window.NEG_TEST.state().encounter,null,'Closing an active patrol must route through safe retreat');
assert.equal(context.window.NEG_TEST.state().world.minute,minuteBeforeClose+5,'Closing an active patrol must cost the normal retreat time');
context.window.NEG_TEST.patrol('stone-guardian');
const hpBeforeInvalidMove=context.window.NEG_TEST.state().player.stats.hp;
context.window.NEG_TEST.combat('dance');
assert.equal(context.window.NEG_TEST.state().player.stats.hp,hpBeforeInvalidMove,'Unknown combat actions must not grant the enemy a free turn');
context.window.NEG_TEST.combat('retreat');
context.window.NEG_TEST.state().player.stats.hp=0;
context.window.NEG_TEST.patrol('stone-guardian');
assert.equal(context.window.NEG_TEST.state().encounter,null,'A player with zero HP cannot start another patrol');
context.window.NEG_TEST.state().player.stats.hp=80;

// Phone/social network, pet ownership and in-world pet actions.
const socialPostForm = new FakeElement('social-post-form'); Object.assign(socialPostForm,{id:'social-post-form',data:{post:'Сегодня гулял по Конохе и нашёл новую чайную.'}});
submit({target:socialPostForm,preventDefault(){}});
assert.ok(context.window.NEG_TEST.state().phone.posts.some(post=>post.text.includes('новую чайную')),'phone post must be published from manual text');
context.window.NEG_TEST.state().bonds.ayame={friendship:1,trust:1,respect:0,irritation:0,meetings:1,stage:'Знакомство'};
const phoneMessageForm = new FakeElement('phone-message-form'); Object.assign(phoneMessageForm,{id:'phone-message-form',data:{characterId:'ayame',message:'Привет! Как сегодня дела в Ичираку?'}});
submit({target:phoneMessageForm,preventDefault(){}});
assert.ok(context.window.NEG_TEST.state().phone.messages.some(message=>message.from==='npc' && message.characterId==='ayame'),'phone message must get a local-GM reply');
const testPet = {id:'konoha-cat',uid:'pet-test',name:'Мару',kind:'Кот',icon:'🐈',affection:10,hunger:45,mood:55,energy:80};
context.window.NEG_TEST.state().pets.push(testPet);
context.window.NEG_TEST.action('Кормлю кота Мару');
assert.equal(testPet.hunger,10,'free-text pet care must reduce hunger');
context.window.NEG_TEST.action('Играю с Мару');
assert.ok(testPet.affection>10 && testPet.mood>55,'free-text pet play must improve affection and mood');

const galleryFiles = ['daily','shinobi','festival'];
const detailedCharacters = ['anko','ayame','konan','sakura','hanabi','hinata'];
for (const characterId of detailedCharacters) {
  for (const variant of galleryFiles) {
    assert.ok(fs.existsSync(new URL(`../assets/characters/${characterId}/${variant}.webp`, import.meta.url)),`${characterId} ${variant} detailed art must exist`);
  }
}
const allCharacters = ['anko','ayame','buntan','ino','yodo','kaguya','karin','konan','kurenai','kurotsuchi','kushina','mabui','mei','mikoto','mirai','mito','rin','sakura','samui','sarada','tayuya','temari','tenten','hanabi','hinata','tsunade','haku','shizune'];
for (const characterId of allCharacters) {
  const portrait = new URL(`../assets/characters/${characterId}/portrait.webp`, import.meta.url);
  assert.ok(fs.existsSync(portrait),`${characterId} real portrait asset must exist`);
}
for (const characterId of detailedCharacters) {
  for (const variant of galleryFiles) {
    assert.ok(fs.existsSync(new URL(`../assets/characters/${characterId}/${variant}.webp`, import.meta.url)),`${characterId} ${variant} detailed art must exist`);
  }
}
for (const scene of ['konoha-main','training-ground','ichiraku','tatami-home','river-sunset','festival-street','clinic','library','flower-shop','hokage-office','village-gate','memorial-garden','market-street','academy-courtyard','bathhouse-garden','rainy-alley','mountain-trail','campsite','konoha-dawn','archive-glow','twilight-pavilion','rain-training']) assert.ok(fs.existsSync(new URL(`../assets/backgrounds/${scene}.webp`, import.meta.url)),`${scene} background must exist`);
for (const enemy of ['masked-scout','road-rogue','armored-guard','forest-ambusher','chakra-adept','stone-guardian']) assert.ok(fs.existsSync(new URL(`../assets/enemies/${enemy}.webp`, import.meta.url)),`${enemy} enemy art must exist`);

const uiSprites = ['leaf-mark','flower','sun','location','coin','gem','settings','save','chat','training','gift','outfit','heart','home','sleep','promise','mood'];
for (const sprite of uiSprites) {
  assert.ok(fs.existsSync(new URL(`../assets/ui/cropped/${sprite}.png`, import.meta.url)),`UI sprite ${sprite} must exist`);
}
assert.ok(fs.existsSync(new URL('../ui-atlas-preview.jpg', import.meta.url)),'UI sprite atlas preview must exist');


// Work and wardrobe buttons must have real effects, not merely render.
context.window.NEG_TEST.action('Ищу работу.');
assert.equal(context.window.NEG_TEST.state().ui.view,'work','Free text should open the work board');
context.window.NEG_TEST.action('Иду в Ичираку.');
const applyJob = {dataset:{action:'apply-job',id:'ramen'},textContent:'Устроиться',closest(){return this;}};
click({target:{closest:()=>applyJob,classList:{contains:()=>false}}});
assert.equal(context.window.NEG_TEST.state().player.jobId,'ramen','Apply button must save the selected job');
const beforeWage=context.window.NEG_TEST.state().player.stats.coins;
const workContract=context.window.NEG_TEST.state().dailyBoard?.contracts?.find(item=>item.metric==='work'&&!item.done);
const workBonus=workContract?.reward||0;
const startShift = {dataset:{action:'work-shift',id:'ramen'},textContent:'Начать смену',closest(){return this;}};
click({target:{closest:()=>startShift,classList:{contains:()=>false}}});
assert.equal(context.window.NEG_TEST.state().player.stats.coins,beforeWage+28+workBonus,'A shift must pay its wage plus any completed daily contract reward');
assert.equal(context.window.NEG_TEST.state().player.workShifts,1,'A completed shift must increment shift count');
context.window.NEG_TEST.action('Иду на рынок.');
const buyOutfit = {dataset:{action:'buy-outfit',id:'festival'},textContent:'Купить',closest(){return this;}};
click({target:{closest:()=>buyOutfit,classList:{contains:()=>false}}});
assert.ok(context.window.NEG_TEST.state().player.ownedLooks.includes('festival'),'Buying at market must add clothing to wardrobe');
context.window.NEG_TEST.action('Иду домой.');
const putOnOutfit = {dataset:{action:'outfit',id:'festival'},textContent:'Переодеться',closest(){return this;}};
click({target:{closest:()=>putOnOutfit,classList:{contains:()=>false}}});
assert.equal(context.window.NEG_TEST.state().player.look,'festival','Owned clothing can be equipped at home');
assert.ok(fs.readFileSync(new URL('../assets/css/style.css',import.meta.url),'utf8').includes('aspect-ratio:9 / 18.5'),'Phone must retain a vertical 9:18.5 aspect ratio');

console.log('OK: start, text actions/dialogue, 28 portraits, triptychs, 22 backgrounds, combat, smartphone, pets, jobs, wardrobe and UI sprites.');
