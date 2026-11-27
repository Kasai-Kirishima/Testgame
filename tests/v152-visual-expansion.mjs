import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {CHARACTERS,getUnlockedCharacterArts} from '../src/data/characters.js';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const exists=p=>fs.existsSync(path.join(root,p));
const altIds=['ino','temari','kurenai','tsunade','mirai','karin','tenten','shizune'];
for(const id of altIds){
  const character=CHARACTERS.find(item=>item.id===id);
  assert.ok(character,`missing character ${id}`);
  assert.equal(character.art.length,2,`${id} should have an additional portrait`);
  assert.ok(exists(character.art[1].src),`missing alternative portrait ${id}`);
  assert.equal(getUnlockedCharacterArts({bonds:{}},character).length,1,`${id} alt portrait must stay locked before meetings`);
  assert.equal(getUnlockedCharacterArts({bonds:{[id]:{meetings:2}}},character).length,2,`${id} alt portrait unlocks after two meetings`);
}
for(const tone of ['gold','silver','blue','pink','red']) assert.ok(exists(`assets/ui/achievement/medal-${tone}.webp`),`missing ${tone} medal art`);
assert.ok(exists('assets/ui/enot-mascot.webp'),'missing Konoha mascot asset');
const render=fs.readFileSync(path.join(root,'src/ui/render.js'),'utf8');
assert.match(render,/achievement-medal-art/,'achievement cards should render category medal art');
assert.match(render,/pets-empty-mascot/,'pet empty state should show mascot illustration');
const css=fs.readFileSync(path.join(root,'assets/css/style.css'),'utf8');
assert.match(css,/\.achievement-icon \.achievement-medal-art/,'achievement medal styling missing');
assert.match(css,/\.pets-empty-mascot/,'pet mascot responsive styling missing');
console.log(`v1.5.2 visual expansion passed: ${altIds.length} extra character portraits, 5 medal assets, mascot art and unlock rules.`);
