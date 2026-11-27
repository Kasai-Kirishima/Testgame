import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {CLOTHING,CLOTHING_BY_ID,CLOTHING_SLOTS,STARTER_CLOTHING,PRESET_EQUIPMENT,normalizeEquipment} from '../src/data/clothing.js';
import {cycleWardrobePreview,equipClothing,purchaseClothing,applyWardrobePreset} from '../src/core/wardrobe.js';
import {createInitialState,normalizeState} from '../src/core/store.js';
import {renderView} from '../src/ui/render.js';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const slots=new Set(CLOTHING_SLOTS.map(s=>s.id));
assert.equal(CLOTHING.length,49,'49 modular clothing pieces are available');
assert.ok(CLOTHING.some(item=>item.id==='top-blouse'),'date blouse is available');
assert.ok(CLOTHING.some(item=>item.id==='top-academy'),'academy outfit is available');
assert.ok(CLOTHING.some(item=>item.id==='bottom-pleated-skirt'),'long pleated skirt is available');
assert.ok(CLOTHING.some(item=>item.id==='outer-wintercoat'),'winter coat is available');
for(const slot of slots){
  const list=CLOTHING.filter(item=>item.slot===slot);
  assert.ok(list.length>=4,`${slot} needs at least four variants`);
  assert.equal(new Set(list.map(item=>item.id)).size,list.length,`${slot} IDs unique`);
}
for(const item of CLOTHING){
  assert.ok(slots.has(item.slot),`${item.id} must belong to a valid slot`);
  assert.ok(fs.existsSync(path.join(root,item.src)),`${item.id} SVG exists`);
  assert.ok(fs.existsSync(path.join(root,'assets/player/layers/thumbs',`${item.id}.svg`)),`${item.id} cropped selector thumbnail exists`);
  const svg=fs.readFileSync(path.join(root,item.src),'utf8');
  assert.match(svg,/<svg[^>]+viewBox="0 0 260 520"/,'all clothing layers share one avatar coordinate system');
  assert.doesNotMatch(svg,/<rect[^>]+width="260"[^>]+height="520"/,'clothing SVG has no painted background');
}
for(const [presetId,preset] of Object.entries(PRESET_EQUIPMENT)){
  for(const [slot,itemId] of Object.entries(preset)) assert.equal(CLOTHING_BY_ID[itemId]?.slot,slot,`${presetId}: ${itemId} must fit ${slot}`);
  assert.ok(Object.values(preset).every(itemId=>STARTER_CLOTHING.includes(itemId)),`${presetId} preset can be applied immediately`);
}

const state=createInitialState({name:'Модный игрок',gender:'male'});
assert.deepEqual(Object.keys(state.player.equipment).sort(),['accessory','bottom','head','outer','shoes','top'].sort());
for(const [slot,itemId] of Object.entries(state.player.equipment)){
  assert.equal(CLOTHING_BY_ID[itemId].slot,slot,'no slot mismatch in starting equipment');
  assert.ok(state.player.ownedClothing.includes(itemId),'starting equipment is owned');
}

// Old saves migrate to a valid layered outfit without losing the old look field.
const legacy=normalizeState({version:2,player:{name:'Старое сохранение',gender:'female',look:'festival',ownedLooks:['casual','shinobi','festival'],stats:{coins:150}}});
assert.equal(legacy.player.look,'festival');
for(const [slot,itemId] of Object.entries(legacy.player.equipment)) assert.equal(CLOTHING_BY_ID[itemId].slot,slot,'legacy save gets a valid layered preset');

// Arrow cycling is restricted to the selected slot and wraps around.
state.ui.wardrobeSlot='top';
const firstTop=cycleWardrobePreview(state,'top',1);
assert.equal(firstTop.ok,true);
assert.equal(CLOTHING_BY_ID[state.ui.wardrobePreview.itemId].slot,'top');
const invalidCycle=cycleWardrobePreview(state,'headphones',1);
assert.equal(invalidCycle.ok,false);

// Item categories cannot be mixed: shorts/head item and shirt/bottom item are rejected.
state.world.location='home';
const wrongSlot=equipClothing(state,'bottom-cargo','head');
assert.equal(wrongSlot.ok,false);
assert.equal(state.player.equipment.head,'head-none');
const wrongTop=equipClothing(state,'top-basic','bottom');
assert.equal(wrongTop.ok,false);

const equipResult=equipClothing(state,'top-formal','top');
assert.equal(equipResult.ok,true);
assert.equal(state.player.equipment.top,'top-formal');
assert.equal(equipClothing(state,'top-work','top').ok,true,'a second top replaces the first instead of stacking');
assert.equal(state.player.equipment.top,'top-work');

// Previewing a locked item is free, but purchase requires the market and money.
state.world.location='home';
assert.equal(purchaseClothing(state,'head-leaf-band','head').ok,false,'cannot shop from home');
state.world.location='market';
state.player.stats.coins=0;
assert.equal(purchaseClothing(state,'head-leaf-band','head').ok,false,'cannot buy without currency');
state.player.stats.coins=100;
const buy=purchaseClothing(state,'head-leaf-band','head');
assert.equal(buy.ok,true);
assert.equal(state.player.equipment.head,'head-leaf-band');
assert.ok(state.player.ownedClothing.includes('head-leaf-band'));
assert.equal(state.player.stats.coins,82);
assert.equal(purchaseClothing(state,'head-leaf-band','head').ok,false,'cannot purchase duplicate');

// A valid preset only uses the dedicated slot IDs, then a custom item can replace a single slot.
const preset=applyWardrobePreset(state,'date');
assert.equal(preset.ok,true);
assert.equal(state.player.equipment.top,'top-formal');
assert.equal(state.player.equipment.bottom,'bottom-formal');
assert.equal(state.player.equipment.shoes,'shoes-formal');
assert.equal(state.player.look,'festival');
assert.equal(applyWardrobePreset(state,'unknown').ok,false);

// Real rendered wardrobe includes a layered avatar and six independent arrow-controlled slots.
state.ui.view='bag';
state.ui.wardrobeSlot='top';
state.ui.wardrobePreview={slot:'top',itemId:'top-knit'};
const html=renderView(state);
assert.match(html,/wardrobe-avatar-stage/);
assert.match(html,/assets\/player\/layers\/base-body\.svg/);
assert.match(html,/assets\/player\/layers\/hair-medium\.svg/);
assert.match(html,/assets\/player\/layers\/thumbs\/top-knit\.svg/);
for(const slot of slots){
  assert.match(html,new RegExp(`data-action="wardrobe-slot" data-id="${slot}"`),`${slot} tab rendered`);
}
assert.match(html,/data-action="wardrobe-cycle"[^>]+data-dir="-1"/);
assert.match(html,/data-action="wardrobe-cycle"[^>]+data-dir="1"/);
assert.match(html,/layer-top/);
assert.match(html,/layer-outer/);
assert.match(html,/один предмет на каждый слот/i);
assert.match(html,/Быстрые комплекты/);

// Full-body mannequin and layer pieces are transparent SVG assets.
const base=fs.readFileSync(path.join(root,'assets/player/layers/base-body.svg'),'utf8');
assert.match(base,/<svg[^>]+viewBox="0 0 260 520"/);
console.log(`Modular wardrobe passed: ${CLOTHING.length} items, ${CLOTHING_SLOTS.length} slots, arrow preview, slot validation, purchases, presets and legacy-save migration.`);
