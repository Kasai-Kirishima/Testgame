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
    this.textContent = ''; this.innerHTML = ''; this.disabled = false; this.files = [];
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
const newGameButton = {dataset:{action:'new-game'},textContent:'Новая история',closest(){return this;}};
click({target:{closest:()=>newGameButton,classList:{contains:()=>false}}});
assert.equal(getElement('creation-screen').classList.contains('hidden'),false,'new-game button must reveal character creation');
assert.ok(getElement('player-origin').innerHTML.includes('Житель Конохи'),'origin options must populate');
const randomNameButton = {dataset:{action:'random-name'},textContent:'Случайное имя',closest(){return this;}};
click({target:{closest:()=>randomNameButton,classList:{contains:()=>false}}});
assert.ok(getElement('player-name').value.length>2,'random name button must fill the character name');

const submit = listeners.submit?.[0];
const form = {id:'creation-form',data:{name:'Проверка',origin:'shinobi',style:'balanced',look:'casual',mark:'none',gender:'female',age:'22',clan:'Хьюга',chakra:'wind',specialty:'sensors',hair:'long',eyes:'Фиолетовые',goal:'explore',village:'konoha',signatureTool:'scroll'}};
submit({target:form,preventDefault(){}});
assert.equal(getElement('game-screen').classList.contains('hidden'),false,'creation form must start the game');
assert.equal(context.window.NEG_TEST.state().player.village,'konoha','creator should store village selection');
assert.equal(context.window.NEG_TEST.state().player.signatureTool,'scroll','creator should store tool selection');
assert.equal(context.window.NEG_TEST.state().player.age,22,'creator should store age selection');
assert.ok(getElement('view-root').innerHTML.includes('Хроники Конохи'),'game screen must render the world page');
assert.ok(getElement('view-root').innerHTML.includes('world-action-form'),'world screen must show free-text actions');
assert.ok(getElement('view-root').innerHTML.includes('world-dialogue-form'),'world screen must show free-text dialogue');
assert.ok(getElement('view-root').innerHTML.includes('data-action="patrol"'),'world screen must expose patrol action');
const worldActionForm = {id:'world-action-form',data:{action:'Я иду в больницу.'}};
submit({target:worldActionForm,preventDefault(){}});
assert.equal(context.window.NEG_TEST.state().world.location,'hospital','free-text movement must navigate to a named location');
assert.ok(context.window.NEG_TEST.state().ui.lastActionResult.includes('направляешься'),'free-text action must return a narrated result');
const worldDialogueForm = {id:'world-dialogue-form',data:{characterId:'sakura',message:'Привет, Сакура! Как прошёл твой день?'}};
submit({target:worldDialogueForm,preventDefault(){}});
assert.equal(context.window.NEG_TEST.state().ui.view,'profile','free-text dialogue must open the selected character profile page');
assert.ok(context.window.NEG_TEST.state().dialogues.sakura.some(message=>message.from==='player' && message.text.includes('Как прошёл')),'free-text dialogue must be saved in the character history');
const naturalActionForm = {id:'world-action-form',data:{action:'Иду к Хинате и спрашиваю, как прошёл её день.'}};
submit({target:naturalActionForm,preventDefault(){}});
assert.equal(context.window.NEG_TEST.state().ui.targetId,'hinata','free-text RP must resolve an inflected character name');
assert.ok(context.window.NEG_TEST.state().dialogues.hinata.some(message=>message.from==='player' && message.text.includes('спрашиваю')),'action text can include dialogue and resolve it to a character');
assert.ok(JSON.parse(local.get('naruto-enot-garem-save-v2')).player.name === 'Проверка','new game must save progress');
const navHandler = listeners.click?.[1];
assert.equal(typeof navHandler,'function','page navigation handler must initialize');
const mapNav = {dataset:{view:'map'},closest(){return this;}};
navHandler({target:{closest:selector=>selector==='[data-view]'?mapNav:null}});
assert.equal(context.window.NEG_TEST.state().ui.view,'map','map must be a separate page');
const peopleNav = {dataset:{view:'people'},closest(){return this;}};
navHandler({target:{closest:selector=>selector==='[data-view]'?peopleNav:null}});
assert.equal(context.window.NEG_TEST.state().ui.view,'people','character list must be a separate page');
const openProfileButton = {dataset:{action:'open-person',id:'sakura'},textContent:'Сакура',closest(){return this;}};
click({target:{closest:selector=>selector==='[data-action]'?openProfileButton:null,classList:{contains:()=>false}}});
assert.equal(context.window.NEG_TEST.state().ui.view,'profile','character dossier must be a separate page');
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
for (const scene of ['konoha-main','training-ground','ichiraku','tatami-home','river-sunset','festival-street','clinic','library','flower-shop','hokage-office','village-gate','memorial-garden','market-street','academy-courtyard','bathhouse-garden','rainy-alley','mountain-trail','campsite']) assert.ok(fs.existsSync(new URL(`../assets/backgrounds/${scene}.webp`, import.meta.url)),`${scene} background must exist`);
for (const enemy of ['masked-scout','road-rogue','armored-guard','forest-ambusher','chakra-adept','stone-guardian']) assert.ok(fs.existsSync(new URL(`../assets/enemies/${enemy}.webp`, import.meta.url)),`${enemy} enemy art must exist`);

const uiSprites = ['leaf-mark','flower','sun','location','coin','gem','settings','save','chat','training','gift','outfit','heart','home','sleep','promise','mood'];
for (const sprite of uiSprites) {
  assert.ok(fs.existsSync(new URL(`../assets/ui/cropped/${sprite}.png`, import.meta.url)),`UI sprite ${sprite} must exist`);
}
assert.ok(fs.existsSync(new URL('../ui-atlas-preview.jpg', import.meta.url)),'UI sprite atlas preview must exist');

console.log('OK: start flow, free actions/dialogue, save, 28 portraits, 6 detailed triptychs, 18 backgrounds, 6 enemies, and 17 UI sprites.');
