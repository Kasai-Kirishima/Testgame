import test from 'node:test';
import assert from 'node:assert/strict';
import { createInputController } from '../src/core/InputController.js';
import { createMenuController } from '../src/ui/MenuController.js';
import { SaveRepository } from '../src/data/SaveRepository.js';
import { filterInventory } from '../src/data/InventoryQuery.js';
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
