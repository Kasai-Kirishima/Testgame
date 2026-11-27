import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const charactersDir = path.join(root, 'assets', 'characters');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'assets', 'character-art-manifest.json'), 'utf8'));
const catalog = JSON.parse(fs.readFileSync(path.join(charactersDir, 'catalog.json'), 'utf8'));
const source = fs.readFileSync(path.join(root, 'src', 'data', 'characters.js'), 'utf8');
const ids = Object.keys(manifest);
const failures = [];

if (ids.length !== 28) failures.push(`Expected 28 characters in art manifest, got ${ids.length}`);
if (catalog.characters.length !== 28) failures.push(`Expected 28 catalog entries, got ${catalog.characters.length}`);
if (!source.includes("const TRIPTYCH_ART = new Set(['anko','ayame','konan','sakura','hanabi','hinata'])")) failures.push('Triptych character set is missing or has changed unexpectedly');
if (!source.includes('portrait-clean')) failures.push('Clean portrait references are not wired into character data');

let portraits = 0;
let cleanPortraits = 0;
let triptychs = 0;
for (const [id, item] of Object.entries(manifest)) {
  for (const ref of [item.portrait, ...(item.gallery || [])]) {
    const full = path.join(root, ref);
    if (!fs.existsSync(full)) failures.push(`${id}: missing art file ${ref}`);
    else if (!/\.(webp|png|jpe?g)$/i.test(full)) failures.push(`${id}: unsupported art file ${ref}`);
  }
  if (item.portrait) portraits++;
  if (item.portrait?.endsWith('portrait-clean.webp')) cleanPortraits++;
  if (item.galleryType === 'portrait-plus' && (item.gallery || []).length !== 2) failures.push(`${id}: portrait-plus must have two images`);
  if (item.galleryType === 'triptych') {
    triptychs++;
    if ((item.gallery || []).length !== 3) failures.push(`${id}: triptych must have exactly three images`);
  }
}
if (portraits !== 28) failures.push(`Expected 28 portraits, got ${portraits}`);
if (cleanPortraits !== 19) failures.push(`Expected 19 clean portraits, got ${cleanPortraits}`);
if (triptychs !== 6) failures.push(`Expected 6 triptychs, got ${triptychs}`);
const portraitPlus=Object.values(manifest).filter(item=>item.galleryType==='portrait-plus').length;
if (portraitPlus !== 8) failures.push(`Expected 8 extra portrait sets, got ${portraitPlus}`);
if (JSON.stringify(manifest).includes('.svg')) failures.push('Art manifest still contains SVG entries; previous SVG assets were missing');

if (failures.length) {
  console.error('Character art audit failed:\n- ' + failures.join('\n- '));
  process.exit(1);
}
console.log(`Character art audit passed: ${portraits} portraits, ${cleanPortraits} clean crops, ${triptychs} triptychs, ${portraitPlus} extra portraits; all files exist.`);
