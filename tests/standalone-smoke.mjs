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

const submit = listeners.submit?.[0];
const form = {id:'creation-form',data:{name:'Проверка',origin:'shinobi',style:'balanced',look:'casual',mark:'none'}};
submit({target:form,preventDefault(){}});
assert.equal(getElement('game-screen').classList.contains('hidden'),false,'creation form must start the game');
assert.ok(getElement('view-root').innerHTML.includes('Карта Конохи'),'game screen must render the map');
assert.ok(JSON.parse(local.get('naruto-enot-garem-save-v2')).player.name === 'Проверка','new game must save progress');

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
  for (const variant of galleryFiles) {
    const webp = new URL(`../assets/characters/${characterId}/${variant}.webp`, import.meta.url);
    const svg = new URL(`../assets/characters/${characterId}/${variant}.svg`, import.meta.url);
    assert.ok(fs.existsSync(webp) || fs.existsSync(svg),`${characterId} ${variant} gallery asset must exist`);
  }
}
for (const scene of ['konoha-main','training-ground','ichiraku','tatami-home','river-sunset','festival-street','clinic','library','flower-shop','hokage-office','village-gate','memorial-garden','market-street','academy-courtyard','bathhouse-garden','rainy-alley','mountain-trail','campsite']) assert.ok(fs.existsSync(new URL(`../assets/backgrounds/${scene}.webp`, import.meta.url)),`${scene} background must exist`);
for (const enemy of ['masked-scout','road-rogue','armored-guard','forest-ambusher','chakra-adept','stone-guardian']) assert.ok(fs.existsSync(new URL(`../assets/enemies/${enemy}.webp`, import.meta.url)),`${enemy} enemy art must exist`);

const uiSprites = ['leaf-mark','flower','sun','location','coin','gem','settings','save','chat','training','gift','outfit','heart','home','sleep','promise','mood'];
for (const sprite of uiSprites) {
  assert.ok(fs.existsSync(new URL(`../assets/ui/cropped/${sprite}.png`, import.meta.url)),`UI sprite ${sprite} must exist`);
}
assert.ok(fs.existsSync(new URL('../ui-atlas-preview.jpg', import.meta.url)),'UI sprite atlas preview must exist');

console.log('OK: start flow, save, 28 character galleries, 18 scene backgrounds, 6 enemies, and 17 extracted UI sprites.');
