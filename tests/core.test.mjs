import test from 'node:test';
import assert from 'node:assert/strict';
import { createInputController } from '../src/core/InputController.js';
import { createMenuController } from '../src/ui/MenuController.js';
import { SaveRepository } from '../src/data/SaveRepository.js';
import { filterInventory } from '../src/data/InventoryQuery.js';
import { MeshBuilder } from '../src/engine/MeshBuilder.js';
import { ITEMS, PROFESSIONS, TRAITS, RECIPES, BUILDINGS, NIGHTMARES } from '../src/data/catalog.js';

function makeEvent(code, target = null) {
  return { code, target, repeat: false, prevented: false, stopped: false,
    preventDefault() { this.prevented = true; }, stopPropagation() { this.stopped = true; } };
}

test('input controller tracks WASD and arrow aliases', () => {
  const handlers = {};
  globalThis.window = { addEventListener: (name, fn) => { handlers[`w:${name}`] = fn; }, removeEventListener() {} };
  globalThis.document = { pointerLockElement: null, hidden: false, activeElement: null,
    addEventListener: (name, fn) => { handlers[`d:${name}`] = fn; }, removeEventListener() {},
    querySelector: () => ({ classList: { contains: () => true } }) };
  const state = { active: true, paused: false, uiOpen: false, keys: {}, player: { y: 2 }, onGround: true, selectedSlot: 0 };
  const calls = [];
  const canvas = { tabIndex: 0, style: {}, focus() {} };
  const controller = createInputController({ state, canvas, callbacks: {
    pause: () => { state.paused = true; calls.push('pause'); },
    toggleFlashlight: () => calls.push('flashlight'),
    updateQuickbar: () => calls.push('quickbar')
  } });
  controller.install();
  handlers['w:keydown'](makeEvent('KeyW'));
  assert.equal(state.keys.KeyW, true);
  handlers['w:keyup'](makeEvent('KeyW'));
  assert.equal(state.keys.KeyW, false);
  handlers['w:keydown'](makeEvent('ArrowUp'));
  assert.equal(state.keys.KeyW, true);
  handlers['w:keyup'](makeEvent('ArrowUp'));
  assert.equal(state.keys.KeyW, false);
  handlers['w:keydown'](makeEvent('KeyW'));
  handlers['w:keydown'](makeEvent('ShiftLeft'));
  handlers['w:blur']();
  assert.equal(state.keys.KeyW, false, 'blur must release movement');
  assert.equal(state.keys.ShiftLeft, false, 'blur must release sprint');
  handlers['w:keydown'](makeEvent('KeyF'));
  assert.ok(calls.includes('flashlight'));
  handlers['w:keydown'](makeEvent('Digit2'));
  assert.equal(state.selectedSlot, 1);
  assert.ok(calls.includes('quickbar'));
  handlers['w:keydown'](makeEvent('Escape'));
  assert.ok(calls.includes('pause'));
  controller.destroy();
});

test('typing in form fields does not trigger gameplay actions', () => {
  const handlers = {};
  globalThis.window = { addEventListener: (name, fn) => { handlers[`w:${name}`] = fn; }, removeEventListener() {} };
  globalThis.document = { pointerLockElement: null, hidden: false, activeElement: null,
    addEventListener() {}, removeEventListener() {} };
  const state = { active: true, paused: false, uiOpen: false, keys: {}, player: { y: 2 } };
  let count = 0;
  const controller = createInputController({ state, canvas: { tabIndex: 0, style: {}, focus() {} }, callbacks: { interact: () => count++ } });
  controller.install();
  const target = { closest: selector => selector.includes('input') ? {} : null };
  handlers['w:keydown'](makeEvent('KeyE', target));
  assert.equal(count, 0);
  assert.equal(state.keys.KeyE, undefined);
  controller.destroy();
});

test('save repository writes v3 and reads legacy records', () => {
  const values = new Map();
  const storage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key) };
  const repository = new SaveRepository(storage);
  const saved = repository.write(1, { player: { name: 'Tester', hp: 80 }, inventory: [], clock: 90 });
  assert.equal(saved.version, 3);
  assert.equal(repository.read(1).player.name, 'Tester');
  values.set('quiet-dream-save-0', JSON.stringify({ player: { name: 'Old save' }, clock: 5 }));
  assert.equal(repository.read(0).player.name, 'Old save');
  values.set('quiet-dream-save-auto', JSON.stringify({ player: { name: 'Old autosave' }, clock: 8 }));
  assert.equal(repository.read('auto').player.name, 'Old autosave');
  repository.write('auto', { player: { name: 'Migrated' }, inventory: [] });
  assert.equal(repository.read('auto').player.name, 'Migrated');
  assert.equal(values.has('quiet-dream-save-auto'), false, 'legacy autosave is removed after migration');
  repository.remove(1);
  assert.equal(repository.read(1), null);
});

test('content catalogue exports all game systems', () => {
  assert.ok(Object.keys(ITEMS).length >= 200);
  assert.ok(PROFESSIONS.length >= 5);
  assert.ok(TRAITS.length >= 10);
  assert.ok(RECIPES.length >= 5);
  assert.ok(BUILDINGS.length >= 10);
  assert.ok(NIGHTMARES.length >= 17);
});



test('game action keys dispatch once to their matching systems', () => {
  const handlers = {};
  globalThis.window = { addEventListener: (name, fn) => { handlers[`w:${name}`] = fn; }, removeEventListener() {} };
  globalThis.document = { pointerLockElement: null, hidden: false, activeElement: null,
    addEventListener() {}, removeEventListener() {} };
  const state = { active: true, paused: false, uiOpen: false, keys: {}, selectedSlot: 0 };
  const called = [];
  const callbacks = Object.fromEntries([
    ['interact','KeyE'],['useQuickSlot','KeyQ'],['toggleInventory','KeyI'],['toggleMap','KeyM'],
    ['openBuild','KeyB'],['inspectItem','KeyR'],['toggleFlashlight','KeyF'],['toggleCamera','KeyV']
  ].map(([name]) => [name, () => called.push(name)]));
  const controller = createInputController({ state, canvas: { tabIndex: 0, style: {}, focus() {} }, callbacks });
  controller.install();
  for (const code of ['KeyE','KeyQ','KeyI','KeyM','KeyB','KeyR','KeyF','KeyV']) {
    handlers['w:keydown'](makeEvent(code));
  }
  assert.deepEqual(called.sort(), Object.keys(callbacks).sort());
  controller.destroy();
});

test('menu controller moves focus with arrows and ignores text fields', () => {
  const buttons = [0, 1, 2].map(index => ({
    index,
    disabled: false,
    focus() { document.activeElement = this; },
    getClientRects: () => [{}],
    matches: () => false
  }));
  const screen = {
    id: 'main-menu',
    dataset: {},
    classList: { contains: () => false },
    contains: element => buttons.includes(element),
    querySelectorAll: () => buttons
  };
  let keydown;
  globalThis.document = {
    activeElement: {},
    querySelectorAll: () => [screen],
    addEventListener: (name, fn) => { if (name === 'keydown') keydown = fn; },
    removeEventListener() {}
  };
  globalThis.getComputedStyle = () => ({ display: 'block', visibility: 'visible' });
  globalThis.MutationObserver = class {
    observe() {}
    disconnect() {}
  };

  const controller = createMenuController();
  controller.install();
  assert.equal(document.activeElement, buttons[0], 'first available menu button receives focus');
  const down = { code: 'ArrowDown', preventDefault() { this.prevented = true; } };
  keydown(down);
  assert.equal(document.activeElement, buttons[1]);
  assert.equal(down.prevented, true);

  const field = { matches: selector => selector.includes('input') };
  document.activeElement = field;
  keydown({ code: 'ArrowDown', preventDefault() { this.prevented = true; } });
  assert.equal(document.activeElement, field, 'menu navigation must not steal arrows from text fields');
  controller.destroy();
});


test('inventory search, category and sort preserve the source array', () => {
  const source = [
    { name: 'Яблоко', count: 2, freshness: 65 },
    { name: 'Бинт', count: 1 },
    { name: 'Вода', count: 3, freshness: 100 }
  ];
  const info = name => ({
    'Яблоко': { category: 'food', description: 'Свежий фрукт' },
    'Бинт': { category: 'medical', description: 'Для лечения' },
    'Вода': { category: 'drink', description: 'Питьевая вода' }
  }[name]);
  assert.deepEqual(filterInventory(source, { query: 'ябл', category: 'all' }, info).map(x => x.name), ['Яблоко']);
  assert.deepEqual(filterInventory(source, { category: 'medical' }, info).map(x => x.name), ['Бинт']);
  assert.deepEqual(filterInventory(source, { sort: 'name' }, info).map(x => x.name), ['Бинт','Вода','Яблоко']);
  assert.equal(source.length, 3, 'sorting/filtering must not mutate source inventory');
});

test('dimensional item artwork renders dedicated SVGs without external assets', async () => {
  const fs = await import('node:fs');
  const vm = await import('node:vm');
  const source = fs.readFileSync(new URL('../src/ui/item-icons.js', import.meta.url), 'utf8');
  const window = {};
  vm.runInNewContext(source, { window });
  const bottle = window.QDItemIcons.render('Бутылка воды', { category: 'drink' });
  const lamp = window.QDItemIcons.render('Керосиновая лампа', { category: 'tool' });
  const med = window.QDItemIcons.render('Аптечка', { category: 'medical' });
  assert.match(bottle, /<svg/);
  assert.match(lamp, /<svg/);
  assert.match(med, /<svg/);
  assert.notEqual(bottle, lamp);
  assert.equal(window.QDItemIcons.kindFor('Компас', {}), 'instrument');
  assert.equal(window.QDItemIcons.kindFor('Хлеб', { category: 'food' }), 'food');
});

test('startup fallback is loaded before the optional Three.js module', async () => {
  const fs = await import('node:fs');
  const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  assert.ok(html.indexOf('src="src/boot.js"') < html.indexOf('type="module" src="src/main.js"'));
  assert.match(html, /QD_BOOT\?\.showFallback/);
  const runtime = fs.readFileSync(new URL('../src/engine/GameRuntime.js', import.meta.url), 'utf8');
  assert.equal((runtime.match(/\bsetup\(\);/g) || []).length, 1);
  assert.ok(runtime.lastIndexOf('setup();') > runtime.indexOf('const inputController'));
  const boot = fs.readFileSync(new URL('../src/boot.js', import.meta.url), 'utf8');
  assert.match(boot, /function startFallback\(/);
  assert.match(boot, /KeyW/);
  assert.match(boot, /qd-fallback-save/);
});

test('offline fallback draws a world and character preview without WebGL', async () => {
  const fs = await import('node:fs');
  const boot = fs.readFileSync(new URL('../src/boot.js', import.meta.url), 'utf8');
  const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(boot, /function drawFallback2D\(/);
  assert.match(boot, /function drawCharacterFallback\(/);
  assert.match(boot, /if\(!rendered\)drawCharacterFallback/);
  assert.match(boot, /else\{force2DFallback=true;drawFallback2D/);
  assert.match(html, /src=\"src\/engine\/Local3D\.js\" onerror=/);
});

test('character creator spends positive-trait points and refunds negative-trait points', () => {
  assert.equal(PROFESSIONS.length, 23);
  assert.equal(TRAITS.length, 28);
  assert.equal(globalThis.QDCharacterData.STAT_LABELS.length, 12);
  assert.ok(TRAITS.filter(t => t.side === 'positive').every(t => t.cost > 0));
  assert.ok(TRAITS.filter(t => t.side === 'negative').every(t => t.cost < 0));
  const profession = PROFESSIONS.find(p => p.name === 'Безработный');
  const good = TRAITS.find(t => t.name === 'Выносливый');
  const bad = TRAITS.find(t => t.name === 'Одышка');
  const rules = globalThis.QDCharacterData;
  assert.equal(rules.calculatePoints(profession, []), 10);
  assert.equal(rules.calculatePoints(profession, [good.name]), 7, 'positive trait must deduct its cost');
  assert.equal(rules.calculatePoints(profession, [bad.name]), 13, 'negative trait must grant its points');
  assert.equal(rules.calculatePoints(profession, [good.name, bad.name]), 10, 'balanced good and bad traits offset each other');
  const stats = rules.calculateStats(profession, [good.name, bad.name]);
  assert.equal(stats.Выносливость, 0, 'trait bonuses must also be combined through the shared rule');
});

test('local fallback is a real perspective WebGL renderer, not the removed flat canvas projection', async () => {
  const fs = await import('node:fs');
  const local3d = fs.readFileSync(new URL('../src/engine/Local3D.js', import.meta.url), 'utf8');
  const boot = fs.readFileSync(new URL('../src/boot.js', import.meta.url), 'utf8');
  assert.match(local3d, /getContext\('webgl'/);
  assert.match(local3d, /gl\.enable\(gl\.DEPTH_TEST\)/);
  assert.match(local3d, /perspective\(70\*PI\/180/);
  assert.match(local3d, /buildTerrain\(b\)/);
  assert.match(local3d, /buildForest\(b,game\.trees/);
  assert.match(local3d, /function addChar\(/);
  assert.match(local3d, /quadReverse/);
  assert.doesNotMatch(local3d, /loseContext/);
  assert.doesNotMatch(boot, /function drawTree\(/);
  assert.doesNotMatch(boot, /function project\(/);
  assert.match(boot, /QDLocal3D\.createWorld\(canvas\)/);
});


test('3D mesh winding produces outward normals for terrain, spheres and box props', () => {
  const ground = new MeshBuilder();
  ground.quadReverse([0,0,0],[1,0,0],[1,0,1],[0,0,1],'#777777');
  const gd = ground.arrays();
  assert.ok(gd.n[1] > 0.99, 'terrain top faces must point upward');

  const sphere = new MeshBuilder();
  sphere.sphere(0,0,0,1,1,1,'#ffffff',12,8);
  const sd = sphere.arrays();
  let checked = 0;
  for (let i=0;i<sd.p.length;i+=3) {
    const dot=sd.p[i]*sd.n[i]+sd.p[i+1]*sd.n[i+1]+sd.p[i+2]*sd.n[i+2];
    assert.ok(dot > -0.001, 'ellipsoid face normal must not point inward');
    if (dot > 0.05) checked++;
  }
  assert.ok(checked > 100, 'ellipsoid needs a meaningful set of outward-facing surfaces');

  const box = new MeshBuilder();
  box.box(0,0,0,2,2,2,'#ffffff');
  const bd=box.arrays();
  for(let i=0;i<bd.p.length;i+=3){
    const dot=bd.p[i]*bd.n[i]+bd.p[i+1]*bd.n[i+1]+bd.p[i+2]*bd.n[i+2];
    assert.ok(dot > 0.99, 'box face normals must face away from the center');
  }
});

test('3D previews initialize in the main engine and redraw after creator becomes visible', async () => {
  const fs = await import('node:fs');
  const runtime = fs.readFileSync(new URL('../src/engine/GameRuntime.js', import.meta.url), 'utf8');
  const boot = fs.readFileSync(new URL('../src/boot.js', import.meta.url), 'utf8');
  assert.match(runtime, /populateCreator\(\);advInitPreview\(\);/);
  assert.match(runtime, /early&&window\.QDLocal3D\?\.renderCharacter\)window\.QDLocal3D\.renderCharacter\(early,profile,advEarlyPreviewAngle\)/);
  const showCreator = boot.indexOf("showScreen('#creator');requestAnimationFrame(updateCharacterPreview)");
  assert.ok(showCreator > 0, 'fallback preview is redrawn only after the creator canvas is visible');
});

test('actual generated world and player mesh contain finite 3D vertices', async () => {
  globalThis.window = { dispatchEvent() {} };
  await import('../src/engine/Local3D.js');
  const trees = Array.from({ length: 6 }, (_, i) => ({
    x: (i - 3) * 4, z: 8 + i * 4, height: .9 + i * .08, shade: i % 5, w: .9
  }));
  const world = globalThis.window.QDLocal3D.createDebugGeometry({ trees });
  const profile = { height: 178, weight: 76, build: 'Обычное', skin: '#c78e68', hair: 'Русые', hairStyle: 'Средняя', eyes: 'Карие', clothes: 'Походная куртка' };
  const player = globalThis.window.QDLocal3D.createDebugCharacter(profile, .1);
  for (const mesh of [world, player]) {
    assert.ok(mesh.count > 1000, 'generated mesh has a real triangle buffer');
    for (const key of ['p','n','c']) assert.ok(mesh[key].every(Number.isFinite), `${key} vertex data must not contain NaN or Infinity`);
  }
  const ys = [];
  for (let i = 1; i < player.p.length; i += 3) ys.push(player.p[i]);
  const top = Math.max(...ys);
  assert.ok(top > 1.7 && top < 2.0, '178 cm character model should be represented near realistic scale');
});


test('forest canopy is generated as an irregular triangulated 3D volume', async () => {
  const fs = await import('node:fs');
  const local3d = fs.readFileSync(new URL('../src/engine/Local3D.js', import.meta.url), 'utf8');
  assert.match(local3d, /function leafCanopy\(/);
  assert.match(local3d, /leafCanopy\(b,x,crownY,z/);
  const mesh = globalThis.window.QDLocal3D.createDebugGeometry({ trees: [{ x: 0, z: 6, height: 1, w: 1, shade: 3 }] });
  assert.ok(mesh.count > 50000, 'terrain, trunks, branches and foliage must form a real mesh');
  for (const key of ['p','n','c']) assert.ok(mesh[key].every(Number.isFinite), `${key} canopy buffers must stay finite`);
});

test('fallback saves preserve world loot and first-person equipment state', async () => {
  const { readFile } = await import('node:fs/promises');
  const source = await readFile(new URL('../src/boot.js', import.meta.url), 'utf8');
  assert.match(source, /version:2,profile,game:/);
  assert.match(source, /loot:game\.loot\.map/);
  assert.match(source, /thirdPerson:!!game\.thirdPerson,flash:!!game\.flash/);
  assert.match(source, /game\.keys=\{\};game\.panel=null/);
});
