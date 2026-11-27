import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LOCATIONS } from '../src/data/world.js';
import { CHARACTERS } from '../src/data/characters.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const exists = (relative) => fs.existsSync(path.join(root, relative));
const world = LOCATIONS.flatMap(location => [location.bg, location.rainBg, location.nightBg].filter(Boolean));
for (const asset of world) assert.ok(exists(asset), `Missing world background: ${asset}`);
for (const character of CHARACTERS) {
  for (const art of character.art || []) assert.ok(exists(art.src), `Missing character art: ${character.id} -> ${art.src}`);
}
const sceneManifest = JSON.parse(fs.readFileSync(path.join(root, 'assets/scene-manifest.json'), 'utf8'));
for (const [name, asset] of Object.entries(sceneManifest.backgrounds)) assert.ok(exists(asset), `Missing scene manifest asset ${name}: ${asset}`);
for (const [id, asset] of Object.entries({
  'konoha-crest':'assets/ui/konoha-crest.svg',
  'sakura-pattern':'assets/ui/sakura-pattern.svg',
  'parchment-texture':'assets/ui/parchment-texture.svg',
  'achievement-medal':'assets/ui/achievement-medal.svg'
})) assert.ok(exists(asset), `Missing UI asset ${id}: ${asset}`);
const css = fs.readFileSync(path.join(root, 'assets/css/style.css'), 'utf8');
for (const match of css.matchAll(/url\(['"]?([^'"\)]+)['"]?\)/g)) {
  const ref = match[1];
  if (/^(data:|https?:|#|%23)/i.test(ref)) continue;
  const resolved = path.resolve(root, 'assets/css', ref);
  assert.ok(fs.existsSync(resolved), `Missing CSS URL asset: ${ref}`);
}
const render = fs.readFileSync(path.join(root, 'src/ui/render.js'), 'utf8');
assert.match(render, /getUnlockedCharacterArts\(state,character\)/, 'Gallery should show every art variant unlocked by progression');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
assert.match(html, /style\.css\?v=1\.5\.4/);
assert.match(html, /standalone\.js\?v=1\.5\.4/);
assert.ok(exists('assets/backgrounds/konoha-dawn.webp'));
assert.ok(exists('assets/backgrounds/archive-glow.webp'));
assert.ok(exists('assets/backgrounds/twilight-pavilion.webp'));
assert.ok(exists('assets/backgrounds/rain-training.webp'));
assert.ok(exists('assets/ui/enot-mascot.webp'));
for (const tone of ['gold','silver','blue','pink','red']) assert.ok(exists(`assets/ui/achievement/medal-${tone}.webp`));
assert.match(html,/VERSION 1\.5\.4/);
console.log(`Visual asset audit passed: ${world.length} location variants, ${CHARACTERS.length} character art references, ${Object.keys(sceneManifest.backgrounds).length} scene manifest backgrounds, local CSS URLs and gallery unlock rendering.`);
