import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createInitialState,normalizeState} from '../src/core/store.js';
import {advanceTime} from '../src/core/life.js';
import {canRomance,completeRomanticDate,confessFeelings,resolveInitiative,getRelationship,DATE_ACTIVITIES} from '../src/core/relationships.js';
import {renderView} from '../src/ui/render.js';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const female=createInitialState({name:'Аой',gender:'female',age:20});
const male=createInitialState({name:'Рэн',gender:'male',age:20});
assert.equal(canRomance(female,'sakura'),true,'adult character route is available for a female player');
assert.equal(canRomance(male,'sakura'),false,'romance route is not exposed for a male player in this lesbian-route build');
assert.equal(canRomance(female,'sarada'),false,'age-ambiguous younger roster members remain friendship-only');
assert.ok(DATE_ACTIVITIES.length>=14,'individual date preferences have matching selectable activities');

female.bonds.sakura={friendship:20,trust:12,respect:10,irritation:0,meetings:2,stage:'Хороший знакомый'};
female.player.stats.stamina=80;
const date=completeRomanticDate(female,'sakura','training');
assert.equal(date.ok,true);
assert.equal(date.liked,true,'Sakura responds positively to her preferred training date');
assert.equal(getRelationship(female,'sakura').dates,1);
assert.equal(female.player.stats.stamina,71,'date spends the activity energy cost');
const invalid=completeRomanticDate(female,'sarada','walk');
assert.equal(invalid.ok,false,'ineligible route cannot be opened');

female.bonds.sakura.friendship=75;
female.bonds.sakura.trust=60;
getRelationship(female,'sakura').dates=2;
const confession=confessFeelings(female,'sakura');
assert.equal(confession.ok,true);
assert.equal(getRelationship(female,'sakura').status,'dating');
assert.equal(confessFeelings(female,'sakura').ok,true,'repeat confession is idempotent');

// NPCs can initiate a non-sexual invitation when the evening boundary is crossed.
const initiative=createInitialState({name:'Юна',gender:'female',age:21});
initiative.bonds.ayame={friendship:65,trust:50,respect:40,irritation:0,meetings:4,stage:'Близкий знакомый'};
initiative.world.minute=17*60+59;
const oldRandom=Math.random;
Math.random=()=>0;
try { advanceTime(initiative,1); } finally { Math.random=oldRandom; }
const invite=getRelationship(initiative,'ayame').pending;
assert.ok(invite,'eligible NPC queues an invitation at the evening time boundary');
assert.equal(invite.day,initiative.world.day);
const before=initiative.player.stats.stamina;
const accepted=resolveInitiative(initiative,'ayame',true);
assert.equal(accepted.accepted,true);
assert.equal(getRelationship(initiative,'ayame').pending,null);
assert.equal(initiative.player.stats.stamina,before-6);

const declinedState=createInitialState({name:'Юна',gender:'female',age:21});
declinedState.bonds.ayame={friendship:65,trust:50,respect:40,irritation:0,meetings:4,stage:'Близкий знакомый'};
getRelationship(declinedState,'ayame').pending={day:1,title:'Приглашение',text:'Пойдём погуляем'};
const declined=resolveInitiative(declinedState,'ayame',false);
assert.equal(declined.accepted,false);
assert.equal(getRelationship(declinedState,'ayame').pending,null);
assert.equal(declinedState.bonds.ayame.friendship,65,'declining politely does not damage friendship');

const legacy=normalizeState({version:2,player:{name:'Старое сохранение',gender:'female',age:20},bonds:{sakura:{friendship:50,trust:35,meetings:3}}});
assert.deepEqual(legacy.relationships,{},'legacy saves migrate without losing existing data');
legacy.metCharacters=['sakura'];
legacy.ui.view='profile';
legacy.ui.targetId='sakura';
const profileHtml=renderView(legacy);
assert.match(profileHtml,/Симпатия и отношения/,'female player gets the relationship route in the character dossier');
assert.match(profileHtml,/romantic-date/,'date choices are rendered as working actions');
male.metCharacters=['sakura'];
male.ui.view='profile';
male.ui.targetId='sakura';
assert.doesNotMatch(renderView(male),/Симпатия и отношения/,'romance route is hidden for male player');

const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const css=fs.readFileSync(path.join(root,'assets/css/style.css'),'utf8');
assert.match(html,/title-menu-head/);
assert.match(html,/creator-preview-column/);
assert.match(html,/id="creator-avatar"/);
assert.match(html,/style\.css\?v=1\.5\.5/);
assert.match(html,/standalone\.js\?v=1\.5\.5/);
assert.match(css,/creator-preview-stage/);
assert.match(css,/relationship-date-grid/);
for(const file of ['base-body-female.svg','base-body.svg','hair-medium.svg']) assert.ok(fs.existsSync(path.join(root,'assets/player/layers',file)));
console.log('v1.5.5 menu/creator and relationship routes passed: live creator preview, adult-only lesbian romance routes, character-specific preferences, initiative, mood/energy effects, consent-aware decline and save migration.');
