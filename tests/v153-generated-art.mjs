import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PETS } from '../src/data/pets.js';
import { createInitialState } from '../src/core/store.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const exists = file => fs.existsSync(path.join(root, file));
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'assets/generated-art-manifest.json'), 'utf8'));
const femaleStarter = createInitialState({gender:'female',look:'festival'});
assert.ok(femaleStarter.player.ownedLooks.includes('festival'), 'Selected starting look should be owned');
const workStarter = createInitialState({gender:'male',look:'workwear'});
assert.ok(workStarter.player.ownedLooks.includes('workwear'), 'Workwear selected at creation should be owned');

for (const [id, asset] of Object.entries(manifest.playerOutfits)) {
  assert.ok(exists(asset.src), `Missing player outfit ${id}: ${asset.src}`);
  assert.equal(asset.transparent, true, `Outfit ${id} must have real transparency`);
}
for (const [id, asset] of Object.entries(manifest.playerAvatars)) {
  assert.ok(exists(asset.src), `Missing player avatar ${id}: ${asset.src}`);
  assert.equal(asset.transparent, true, `Avatar ${id} must have real transparency`);
}
for (const pet of PETS) {
  if (pet.image) assert.ok(exists(pet.image), `Missing pet sprite ${pet.id}: ${pet.image}`);
}
for (const [id, asset] of Object.entries(manifest.pets)) {
  assert.ok(exists(asset.src), `Missing pet sprite ${id}: ${asset.src}`);
  assert.equal(asset.transparent, true, `Pet ${id} must have real transparency`);
}
for (const [id, asset] of Object.entries(manifest.ui)) {
  assert.ok(exists(asset.src), `Missing generated UI asset ${id}: ${asset.src}`);
  assert.equal(asset.transparent, true, `UI asset ${id} must have real transparency`);
}

const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const render = fs.readFileSync(path.join(root, 'src/ui/render.js'), 'utf8');
const main = fs.readFileSync(path.join(root, 'src/main.js'), 'utf8');
assert.match(html, /assets\/ui\/generated\/trophy\.png/);
assert.match(html, /assets\/pets\/white-cat\.png/);
const css = fs.readFileSync(path.join(root, 'assets/css/style.css'), 'utf8');
assert.match(css, /ui\/generated\/panel-dark\.png/);
assert.match(render, /assets\/player\/avatars\/\$\{chosen\}\.png/);
assert.match(render, /assets\/player\/outfits\/\$\{art\}\.png/);
assert.match(fs.readFileSync(path.join(root, 'src/data/pets.js'), 'utf8'), /assets\/pets\/.*\.png/);
assert.match(render, /assets\/ui\/generated\/chat\.png/);
assert.match(main, /workwear:42/);
assert.match(main, /courier-crow/);
assert.match(html, /value="workwear"/);

console.log(`v1.5.3 generated-art integration passed: ${Object.keys(manifest.playerOutfits).length} outfits, ${Object.keys(manifest.playerAvatars).length} avatar crops, ${Object.keys(manifest.pets).length} transparent pet sprites, ${Object.keys(manifest.ui).length} transparent UI assets.`);
