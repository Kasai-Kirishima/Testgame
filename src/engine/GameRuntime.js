import * as THREE from 'three';
import { createInputController } from '../core/InputController.js';
import { createMenuController } from '../ui/MenuController.js';
import { SaveRepository } from '../data/SaveRepository.js';
import { filterInventory } from '../data/InventoryQuery.js';
import { $, $$, clamp, rand, distance2 } from '../core/utils.js';
import { state } from '../core/GameState.js';


import { ITEMS, PROFESSIONS, TRAITS, RECIPES, BUILDINGS, NIGHTMARES } from '../data/catalog.js';

let scene,camera,renderer,clock,ground,terrain,hemi,sun,moon,forest=[], lootMeshes=[], raycaster=new THREE.Raycaster(), pointer=new THREE.Vector2(0,0), handGroup, handItem=null, leftLight=null, activeLook=null;
const canvas=$('#world');
canvas.tabIndex = 0;
canvas.setAttribute('aria-label', 'Игровой мир. Кликните, чтобы захватить мышь; клавиатура доступна без захвата.');

function showScreen(id){ $$('.screen').forEach(e=>e.classList.add('hidden')); $(id).classList.remove('hidden'); }
function hideScreen(id){ $(id).classList.add('hidden'); }
function toast(msg){ const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('show'),1900); }
function itemInfo(name){return ITEMS[name]||{name,icon:'◆',category:'resource',description:'Предмет из мира сна.'};}
function addItem(name,count=1){const info=itemInfo(name);let existing=state.inventory.find(x=>x.name===name&&info.stack);if(existing)existing.count+=count;else state.inventory.push({name,count});renderInventory();updateQuickbar();}
function removeItem(name,count=1){let it=state.inventory.find(x=>x.name===name);if(!it||it.count<count)return false;it.count-=count;if(it.count<=0){state.inventory=state.inventory.filter(x=>x!==it);state.quick=state.quick.map(q=>q===name?null:q);}renderInventory();updateQuickbar();return true;}
function hasItems(cost){return Object.entries(cost).every(([n,c])=>state.inventory.some(it=>it.name===n&&it.count>=c));}
function consumeCost(cost){for(const [n,c] of Object.entries(cost))removeItem(n,c);}
function formatCost(cost){return Object.entries(cost).map(([n,c])=>`${n} ×${c}`).join(' · ');}

// Character creation
function populateCreator(){
  $('#profession').innerHTML=PROFESSIONS.map((p,i)=>`<option value="${i}">${p.name} · ${p.cost>=0?'-':''}${p.cost} оч.</option>`).join('');
  $('#positive-traits').innerHTML=TRAITS.filter(t=>t.side==='positive').map(t=>traitHTML(t)).join('');
  $('#negative-traits').innerHTML=TRAITS.filter(t=>t.side==='negative').map(t=>traitHTML(t)).join('');
  $$('.trait-option').forEach(el=>el.addEventListener('click',()=>{el.classList.toggle('selected');updateTraitPoints();}));
  $('#profession').onchange=updateTraitPoints;
  updateTraitPoints();
}
function traitHTML(t){return `<div class="trait-option" data-name="${t.name}"><span>${t.name}<br><small>${t.stat}</small></span><small>${t.cost>0?'+':''}${t.cost}</small></div>`;}
function selectedTraits(){return $$('.trait-option.selected').map(e=>e.dataset.name);}
function updateTraitPoints(){let profession=PROFESSIONS[Number($('#profession').value||0)];let points=8-profession.cost;for(const name of selectedTraits())points+=TRAITS.find(t=>t.name===name).cost;$('#trait-points').textContent=`${points} оч.`;$('#trait-points').style.color=points<0?'#cf6a5d':'#c6a66b';$('#to-appearance').disabled=points<0;$('#trait-stats').innerHTML=Object.entries(profession.stats).map(([k,v])=>`<span>${k}: <b>${v>=0?'+':''}${v}</b></span>`).join('')+selectedTraits().map(n=>`<span>${n}</span>`).join('');}
function randomCharacter(){
  $('#profession').value=String(Math.floor(Math.random()*PROFESSIONS.length));
  $$('.trait-option').forEach(e=>e.classList.remove('selected'));
  const positives=TRAITS.filter(t=>t.side==='positive'), negatives=TRAITS.filter(t=>t.side==='negative');
  const candidates=[...positives.sort(()=>Math.random()-.5).slice(0,2),...negatives.sort(()=>Math.random()-.5).slice(0,2)];
  candidates.forEach(t=>{$(`.trait-option[data-name="${t.name}"]`)?.classList.add('selected');});
  const pick=(id)=>{const e=$(id);if(e&&e.options.length)e.selectedIndex=Math.floor(Math.random()*e.options.length);};
  pick('#char-build');pick('#char-skin');pick('#char-hair');pick('#char-hair-style');pick('#char-clothes');pick('#char-eyes');pick('#char-tattoo');
  $('#char-age').value=Math.round(rand(20,55));$('#char-height').value=Math.round(rand(160,198));$('#char-weight').value=Math.round(rand(52,108));
  while(Number($('#trait-points').textContent)<0){const removable=$$('.trait-option.selected').filter(el=>TRAITS.find(t=>t.name===el.dataset.name).cost<0).pop();if(removable){removable.classList.remove('selected');updateTraitPoints();}else{$('#profession').value='0';updateTraitPoints();break;}}updateTraitPoints();
}
$('#new-game').onclick=()=>{showScreen('#creator');};
$('#creator-back').onclick=()=>showScreen('#main-menu');
$('#random-traits').onclick=randomCharacter;
$('#to-appearance').onclick=()=>{if(Number($('#trait-points').textContent)<0)return;$('#traits-step').classList.add('hidden');$('#appearance-step').classList.remove('hidden');$('#tab-traits').classList.remove('active');$('#tab-look').classList.add('active');};
$('#back-traits').onclick=()=>{$('#appearance-step').classList.add('hidden');$('#traits-step').classList.remove('hidden');$('#tab-look').classList.remove('active');$('#tab-traits').classList.add('active');};
$('#begin-game').onclick=()=>{
  const p=PROFESSIONS[Number($('#profession').value)];
  const profile={name:$('#char-name').value.trim()||'Странник',profession:p.name,traits:selectedTraits(),age:clamp(Number($('#char-age').value)||27,18,70),height:clamp(Number($('#char-height').value)||178,150,205),weight:clamp(Number($('#char-weight').value)||76,45,125),build:$('#char-build').value,skin:$('#char-skin').value,hair:$('#char-hair').value,hairStyle:$('#char-hair-style')?.value||'Короткая стрижка',clothes:$('#char-clothes')?.value||'Походная куртка',eyes:$('#char-eyes').value,tattoo:$('#char-tattoo').value};
  startNewGame(profile,p.stats);
};

// Three.js world and procedural materials
function makeCanvasTexture(kind){
  const c=document.createElement('canvas');c.width=c.height=512;const ctx=c.getContext('2d');
  if(kind==='ground'){
    ctx.fillStyle='#514735';ctx.fillRect(0,0,512,512);
    for(let i=0;i<22000;i++){const x=Math.random()*512,y=Math.random()*512,r=Math.random()*2+0.3;const pal=['#6b5b3d','#7b6744','#3f4830','#866d48','#594934','#9a7548','#4b5035'];ctx.globalAlpha=rand(.12,.45);ctx.fillStyle=pal[Math.floor(Math.random()*pal.length)];ctx.beginPath();ctx.ellipse(x,y,r*2,r,rand(0,Math.PI),0,Math.PI*2);ctx.fill();}
    for(let i=0;i<450;i++){ctx.globalAlpha=.48;ctx.fillStyle=['#b26f37','#c18d40','#8d4e2e','#d0a34f'][i%4];ctx.beginPath();ctx.ellipse(Math.random()*512,Math.random()*512,rand(2,7),rand(1,3),rand(0,3),0,Math.PI*2);ctx.fill();}
  }else if(kind==='bark'){
    ctx.fillStyle='#463326';ctx.fillRect(0,0,512,512);for(let i=0;i<1700;i++){ctx.globalAlpha=rand(.08,.4);ctx.strokeStyle=['#98714a','#201b16','#74543b'][i%3];ctx.lineWidth=rand(1,4);ctx.beginPath();let x=Math.random()*512;ctx.moveTo(x,0);ctx.bezierCurveTo(x+rand(-20,20),140,x+rand(-20,20),320,x+rand(-20,20),512);ctx.stroke();}
  }else if(kind==='leaf'){
    ctx.clearRect(0,0,512,512);for(let i=0;i<5000;i++){ctx.globalAlpha=rand(.18,.65);ctx.fillStyle=['#a94f25','#c47b2e','#d69b3b','#6d6c2d','#94432c'][i%5];ctx.beginPath();ctx.ellipse(Math.random()*512,Math.random()*512,rand(1,5),rand(2,8),rand(0,Math.PI),0,Math.PI*2);ctx.fill();}
  }
  const tex=new THREE.CanvasTexture(c);tex.wrapS=tex.wrapT=THREE.RepeatWrapping;tex.colorSpace=THREE.SRGBColorSpace;return tex;
}
const groundTex=makeCanvasTexture('ground');groundTex.repeat.set(14,14);
const barkTex=makeCanvasTexture('bark');
const leafTex=makeCanvasTexture('leaf');
function terrainHeight(x,z){return Math.sin(x*.115)*1.55+Math.cos(z*.095)*1.15+Math.sin((x+z)*.07)*.9+Math.sin(x*.31+z*.16)*.22;}
function initThree(){
  scene=new THREE.Scene();scene.background=new THREE.Color(0x707267);scene.fog=new THREE.FogExp2(0x626355,.0095);
  camera=new THREE.PerspectiveCamera(state.settings.fov,innerWidth/innerHeight,.1,280);camera.rotation.order='YXZ';
  renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio,1.8));renderer.setSize(innerWidth,innerHeight);renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
  hemi=new THREE.HemisphereLight(0xc8d1bd,0x51402e,1.05);scene.add(hemi);
  sun=new THREE.DirectionalLight(0xffdfad,2.1);sun.position.set(-35,55,28);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-72;sun.shadow.camera.right=72;sun.shadow.camera.top=72;sun.shadow.camera.bottom=-72;sun.shadow.bias=-.0003;scene.add(sun);
  moon=new THREE.DirectionalLight(0x9baecb,.15);moon.position.set(30,25,-20);scene.add(moon);
  const groundGeo=new THREE.PlaneGeometry(140,140,120,120);groundGeo.rotateX(-Math.PI/2);const pos=groundGeo.attributes.position;
  for(let i=0;i<pos.count;i++){const x=pos.getX(i),z=-pos.getY(i);pos.setY(i,terrainHeight(x,z));}groundGeo.computeVertexNormals();
  ground=new THREE.Mesh(groundGeo,new THREE.MeshStandardMaterial({map:groundTex,color:0xc3aa7e,roughness:1,metalness:0}));ground.receiveShadow=true;ground.name='ground';scene.add(ground);
  const boundary=new THREE.Mesh(new THREE.RingGeometry(56.5,60.5,128),new THREE.MeshBasicMaterial({color:0x080b08,transparent:true,opacity:.25,side:THREE.DoubleSide,depthWrite:false}));boundary.rotation.x=-Math.PI/2;boundary.position.y=.03;scene.add(boundary);
  const darkWall=new THREE.Mesh(new THREE.CylinderGeometry(59,59,22,128,1,true),new THREE.MeshBasicMaterial({color:0x050806,transparent:true,opacity:.44,side:THREE.DoubleSide,depthWrite:false}));darkWall.position.y=9;darkWall.renderOrder=2;scene.add(darkWall);
  handGroup=new THREE.Group();camera.add(handGroup);scene.add(camera);
  buildForest();
  buildLandmarks();
  buildLoot();
  window.addEventListener('resize',onResize);
}
function material(color,roughness=.85,opts={}){return new THREE.MeshStandardMaterial({color,roughness,...opts});}
function makeTree(x,z,scale=1){
  const g=new THREE.Group();g.position.set(x,terrainHeight(x,z),z);g.scale.setScalar(scale);
  const trunkH=rand(4.1,6.5);const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.19,.37,trunkH,9,4),new THREE.MeshStandardMaterial({color:0x6b4830,map:barkTex,roughness:1}));trunk.position.y=trunkH/2;trunk.castShadow=true;trunk.receiveShadow=true;g.add(trunk);
  for(let i=0;i<3;i++){const start=new THREE.Vector3(rand(-.04,.04),trunkH*(.45+i*.14),0);const end=new THREE.Vector3(rand(-1.2,1.2),trunkH*(.72+i*.06),rand(-1.1,1.1));const dir=end.clone().sub(start);const b=new THREE.Mesh(new THREE.CylinderGeometry(.055,.12,dir.length(),6),material(0x63452e));b.position.copy(start).add(end).multiplyScalar(.5);b.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),dir.normalize());b.castShadow=true;g.add(b);}
  const palette=[0x9b542b,0xb77432,0xc58b3c,0x73723a,0x99502a,0xb65e2d];const base=palette[Math.floor(Math.random()*palette.length)];
  const foliageMat=new THREE.MeshStandardMaterial({color:base,map:leafTex,roughness:1,alphaTest:.12});
  const crown=new THREE.Group();crown.position.y=trunkH*.83;g.add(crown);
  for(let i=0;i<7;i++){const s=rand(1.0,1.75);const blob=new THREE.Mesh(new THREE.IcosahedronGeometry(1,2),foliageMat.clone());blob.material.color.setHex(palette[Math.floor(Math.random()*palette.length)]);blob.scale.set(s*rand(.85,1.15),s*rand(.85,1.3),s*rand(.85,1.15));blob.position.set(rand(-1.35,1.35),rand(-.45,1.15),rand(-1.35,1.35));blob.castShadow=true;blob.receiveShadow=true;crown.add(blob);}
  g.userData.sway=rand(0,Math.PI*2);forest.push(g);scene.add(g);return g;
}
function makeBush(x,z){const g=new THREE.Group();g.position.set(x,terrainHeight(x,z),z);const c=[0x6e6c32,0x77703a,0x8f5930][Math.floor(Math.random()*3)];for(let i=0;i<5;i++){const m=new THREE.Mesh(new THREE.IcosahedronGeometry(rand(.35,.65),1),material(c));m.position.set(rand(-.55,.55),rand(.15,.5),rand(-.55,.55));m.scale.y=.7;m.castShadow=true;g.add(m);}scene.add(g);}
function makeRock(x,z,s){const m=new THREE.Mesh(new THREE.DodecahedronGeometry(s,1),new THREE.MeshStandardMaterial({color:0x716b5c,roughness:1}));m.position.set(x,terrainHeight(x,z)+s*.55,z);m.rotation.set(rand(0,1),rand(0,3),rand(0,1));m.scale.set(1,rand(.65,1.15),rand(.8,1.2));m.castShadow=true;m.receiveShadow=true;scene.add(m);}
function buildForest(){
  const count=175;
  for(let i=0;i<count;i++){const a=Math.random()*Math.PI*2,r=rand(11,57);const x=Math.cos(a)*r,z=Math.sin(a)*r;makeTree(x,z,rand(.78,1.35));}
  for(let i=0;i<105;i++){const a=Math.random()*Math.PI*2,r=rand(6,56);makeBush(Math.cos(a)*r,Math.sin(a)*r);}
  for(let i=0;i<48;i++){const a=Math.random()*Math.PI*2,r=rand(8,56);makeRock(Math.cos(a)*r,Math.sin(a)*r,rand(.25,.8));}
  // Fallen logs and scattered leaf mounds
  for(let i=0;i<16;i++){const a=Math.random()*Math.PI*2,r=rand(10,52),x=Math.cos(a)*r,z=Math.sin(a)*r;const log=new THREE.Mesh(new THREE.CylinderGeometry(.19,.24,rand(2.3,4.5),9),new THREE.MeshStandardMaterial({color:0x60452f,map:barkTex,roughness:1}));log.rotation.z=Math.PI/2+rand(-.2,.2);log.rotation.y=rand(0,Math.PI);log.position.set(x,terrainHeight(x,z)+.22,z);log.castShadow=true;scene.add(log);}
}
function makeItemLabel(name,kind){
  const c=document.createElement('canvas');c.width=512;c.height=256;const ctx=c.getContext('2d');
  const palette=kind==='food'?['#9a633b','#b38a56','#61724b','#8d4936']:kind==='medical'?['#d9d9c9','#c4d0c4']:['#59665b','#73664d'];
  ctx.fillStyle=palette[Math.floor(Math.random()*palette.length)];ctx.fillRect(0,0,512,256);
  ctx.fillStyle='rgba(20,24,18,.2)';ctx.fillRect(0,0,512,26);ctx.fillRect(0,226,512,30);
  ctx.strokeStyle='rgba(239,224,186,.45)';ctx.lineWidth=5;ctx.strokeRect(12,12,488,232);
  if(kind==='medical'){ctx.fillStyle='#a94c43';ctx.fillRect(220,42,72,170);ctx.fillRect(170,91,172,72);}
  else {ctx.fillStyle='rgba(242,229,200,.92)';ctx.font='bold 30px sans-serif';ctx.textAlign='center';ctx.fillText(name.slice(0,24),256,145);}
  const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;return tex;
}
function makeLootMeshBase(name,x,z){
  const info=itemInfo(name);const g=new THREE.Group();g.position.set(x,terrainHeight(x,z)+.28,z);g.userData={kind:'loot',name,baseY:g.position.y};
  const label=new THREE.MeshStandardMaterial({color:0xffffff,map:makeItemLabel(name,info.category==='food'?'food':info.category==='medical'?'medical':'tool'),roughness:.8});
  if(info.category==='drink'){
    const glass=new THREE.MeshStandardMaterial({color:0x9eb7ae,roughness:.18,metalness:.12,transparent:true,opacity:.83});
    const bottle=new THREE.Mesh(new THREE.CylinderGeometry(.115,.14,.38,12),glass);bottle.position.y=.2;g.add(bottle);
    const neck=new THREE.Mesh(new THREE.CylinderGeometry(.055,.07,.12,10),glass);neck.position.y=.44;g.add(neck);
    const cap=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,.055,10),material(0x8d7050,.4));cap.position.y=.53;g.add(cap);
    const liquid=new THREE.Mesh(new THREE.CylinderGeometry(.104,.125,.25,12),new THREE.MeshStandardMaterial({color:0x75998c,transparent:true,opacity:.52,roughness:.2}));liquid.position.y=.13;g.add(liquid);
  }else if(info.category==='food'){
    if(name.includes('консерв')||name==='Тушёнка'||name==='Килька в томате'){
      const can=new THREE.Mesh(new THREE.CylinderGeometry(.17,.17,.3,16),label);can.position.y=.16;g.add(can);
      const top=new THREE.Mesh(new THREE.CylinderGeometry(.172,.172,.025,16),material(0xb8b9a9,.32,{metalness:.65}));top.position.y=.32;g.add(top);
      const rim=new THREE.Mesh(new THREE.TorusGeometry(.155,.018,6,16),material(0x999d91,.3,{metalness:.7}));rim.rotation.x=Math.PI/2;rim.position.y=.33;g.add(rim);
    }else{
      const pack=new THREE.Mesh(new THREE.BoxGeometry(.42,.28,.26),label);pack.position.y=.15;pack.rotation.y=rand(-.25,.25);pack.castShadow=true;g.add(pack);
      const band=new THREE.Mesh(new THREE.BoxGeometry(.43,.045,.27),material(0xc4ad7d,.9));band.position.y=.16;g.add(band);
    }
  }else if(info.category==='medical'){
    const box=new THREE.Mesh(new THREE.BoxGeometry(.38,.26,.3),label);box.position.y=.14;g.add(box);
    const crossV=new THREE.Mesh(new THREE.BoxGeometry(.055,.19,.018),material(0xb94f45));crossV.position.set(0,.15,.16);g.add(crossV);
    const crossH=new THREE.Mesh(new THREE.BoxGeometry(.19,.055,.018),material(0xb94f45));crossH.position.set(0,.15,.16);g.add(crossH);
    const latch=new THREE.Mesh(new THREE.BoxGeometry(.08,.035,.02),material(0x7e857a,.4,{metalness:.35}));latch.position.set(0,.28,.16);g.add(latch);
  }else if(info.category==='resource'){
    if(name==='Камень'){const rock=new THREE.Mesh(new THREE.DodecahedronGeometry(.21,1),material(0x777467));rock.position.y=.14;rock.scale.set(1,.72,.85);g.add(rock);}
    else{for(let i=0;i<3;i++){const plank=new THREE.Mesh(new THREE.BoxGeometry(.48,.095,.18),new THREE.MeshStandardMaterial({color:0x82603e,map:barkTex,roughness:1}));plank.position.set(0,.07+i*.105,(i-1)*.035);plank.rotation.y=(i-1)*.035;plank.castShadow=true;g.add(plank);}}
  }else if(info.category==='tool'&&name.toLowerCase().includes('фонарь')){
    const body=new THREE.Mesh(new THREE.CylinderGeometry(.075,.09,.36,12),material(0x46524b,.35,{metalness:.45}));body.rotation.z=Math.PI/2;body.position.y=.16;g.add(body);
    const lens=new THREE.Mesh(new THREE.CircleGeometry(.075,16),new THREE.MeshStandardMaterial({color:0xe5d39b,emissive:0x9c7c39,emissiveIntensity:.35}));lens.rotation.y=Math.PI/2;lens.position.set(.19,.16,0);g.add(lens);
    const grip=new THREE.Mesh(new THREE.TorusGeometry(.11,.018,7,16),material(0x252d29,.35,{metalness:.4}));grip.position.y=.16;grip.rotation.y=Math.PI/2;grip.position.x=-.08;g.add(grip);
  }else if(info.category==='tool'&&name==='Компас'){
    const base=new THREE.Mesh(new THREE.CylinderGeometry(.19,.19,.08,20),material(0x6a7464,.35,{metalness:.45}));base.position.y=.15;g.add(base);
    const face=new THREE.Mesh(new THREE.CircleGeometry(.16,24),material(0xd1c9a8,.4));face.rotation.x=-Math.PI/2;face.position.y=.2;g.add(face);
    const needle=new THREE.Mesh(new THREE.ConeGeometry(.035,.18,4),material(0xa74f3d));needle.position.set(0,.24,0);g.add(needle);
  }else{
    const obj=new THREE.Mesh(new THREE.DodecahedronGeometry(.2,1),material(info.category==='collectible'?0x77796d:0x857b61));obj.position.y=.15;obj.scale.set(1,.7,1.15);g.add(obj);
  }
  g.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});
  const halo=new THREE.Mesh(new THREE.CircleGeometry(.42,18),new THREE.MeshBasicMaterial({color:info.category==='medical'?0x8ba78a:0xc4a66c,transparent:true,opacity:.15,side:THREE.DoubleSide}));halo.rotation.x=-Math.PI/2;halo.position.y=-.25;g.add(halo);
  scene.add(g);state.objects.push(g);lootMeshes.push(g);return g;
}
function buildLootBase(){
  const lootPool=['Испорченная еда','Бутылка воды','Хлеб','Яблоко','Килька в томате','Копчёное мясо','Бинт','Пластырь','Аптечка','Динамо-фонарь','Верёвка','Древесина','Доска','Камень','Металлолом','Ткань','Гвозди','Спички','Блокнот','Компас','Палатка','Шоколадный батончик','Минеральная вода','Гречка','Свеча','Термометр','Бинокль','Молоток','Топор','Шуруповёрт','ПНВ 3 поколения','Ряженка','Фисташки','Сухарики с сыром','Брезент','Испорченная еда'];
  for(let i=0;i<70;i++){const a=Math.random()*Math.PI*2,r=rand(5,55),x=Math.cos(a)*r,z=Math.sin(a)*r;makeLootMesh(lootPool[Math.floor(Math.random()*lootPool.length)],x,z);}
}

// First-person hands and held prop (non-combat objects only)
function makeHandMeshBase(){
  handGroup.clear();handItem=null;
  if(leftLight){camera.remove(leftLight);camera.remove(leftLight.target);leftLight=null;}
  const sleeve=new THREE.Mesh(new THREE.CylinderGeometry(.11,.15,.58,10),material(0x485047));sleeve.rotation.z=-.48;sleeve.position.set(.36,-.42,-.62);handGroup.add(sleeve);
  const hand=new THREE.Mesh(new THREE.SphereGeometry(.105,12,10),material(state.player.profile?.skin||0xc78e68));hand.position.set(.43,-.19,-.74);hand.scale.set(1,.82,1.2);handGroup.add(hand);
  if(state.leftHandOn){const leftSleeve=new THREE.Mesh(new THREE.CylinderGeometry(.11,.15,.53,10),material(0x485047));leftSleeve.rotation.z=.48;leftSleeve.position.set(-.36,-.43,-.62);handGroup.add(leftSleeve);const leftHand=new THREE.Mesh(new THREE.SphereGeometry(.1,12,10),material(state.player.profile?.skin||0xc78e68));leftHand.position.set(-.43,-.2,-.74);handGroup.add(leftHand);const flashlight=new THREE.Group();const body=new THREE.Mesh(new THREE.CylinderGeometry(.055,.075,.31,10),material(0x3c4740,.35,{metalness:.45}));body.rotation.x=Math.PI/2;flashlight.add(body);flashlight.position.set(-.44,-.27,-.67);handGroup.add(flashlight);leftLight=new THREE.SpotLight(0xffe4a8,0,24,Math.PI/7,.45,1.1);leftLight.position.set(-.43,-.25,-.74);leftLight.target.position.set(-.45,-.4,-1);camera.add(leftLight);camera.add(leftLight.target);}
  const itemName=state.quick[state.selectedSlot];
  if(itemName){const info=itemInfo(itemName);let prop;
    if(itemName.toLowerCase().includes('фонарь')){prop=new THREE.Group();const body=new THREE.Mesh(new THREE.CylinderGeometry(.065,.09,.36,12),material(0x454e46,.3,{metalness:.4}));body.rotation.x=Math.PI/2;prop.add(body);const lens=new THREE.Mesh(new THREE.CircleGeometry(.07,16),new THREE.MeshBasicMaterial({color:0xf5d994}));lens.position.z=-.19;prop.add(lens);}
    else if(info.category==='tool'&&itemName==='Топор'){prop=new THREE.Group();const shaft=new THREE.Mesh(new THREE.CylinderGeometry(.025,.035,.48,8),material(0x79583b));prop.add(shaft);const head=new THREE.Mesh(new THREE.BoxGeometry(.2,.12,.11),material(0x777d79,.25,{metalness:.7}));head.position.y=.2;prop.add(head);}
    else {prop=new THREE.Mesh(new THREE.BoxGeometry(.2,.14,.13),material(0x87734f));}
    prop.position.set(.48,-.36,-.72);prop.rotation.set(.2,-.3,-.42);prop.scale.setScalar(.8);handGroup.add(prop);handItem=prop;
  }
}

// Game lifecycle
function startNewGameBase(profile,professionStats={}){
  if(!scene)initThree();else resetWorld();
  state.inventory=[];state.quick=[null,null,null];state.selectedSlot=0;state.leftHandOn=true;state.structures=[];state.markers=[];state.explored=new Set();state.player={x:0,z:0,y:terrainHeight(0,0)+1.72,hp:100,hunger:100,thirst:100,stamina:100,name:profile.name,age:profile.age,profile,stats:professionStats,lastDamage:0};
  const positives=profile.traits||[];if(positives.includes('Крепкое здоровье'))state.player.stats.Восстановление=(state.player.stats.Восстановление||0)+2;
  if(positives.includes('Выносливый'))state.player.stats.Выносливость=(state.player.stats.Выносливость||0)+2;
  if(positives.includes('Наблюдательность'))state.player.stats.Поиск=(state.player.stats.Поиск||0)+2;
  addItem('Бутылка воды',2);addItem('Хлеб',2);addItem('Бинт',2);addItem('Древесина',5);addItem('Верёвка',2);addItem('Ткань',2);addItem('Динамо-фонарь',1);addItem('Спички',1);state.quick[0]='Динамо-фонарь';state.leftHandOn=true;state.quick[1]='Бинт';state.quick[2]='Хлеб';
  finishNightmare();state.clock=0;state.dayTime=.60;state.active=true;state.paused=false;state.nightmare=0;state.fear=0;state.nextNightmare=rand(85,145);state.lastTick=performance.now();
  $('#hud').classList.remove('hidden');hideScreen('#creator');hideScreen('#main-menu');makeHandMesh();updateQuickbar();renderInventory();updateHud(true);toast('Ты проснулся в лесу');
  requestPointerLock();
}
function resetWorld(){
  // Keep the procedural forest and replace only loot, structures and active dream threats.
  finishNightmare();state.objects.forEach(o=>scene.remove(o));state.objects=[];lootMeshes=[];state.structures.forEach(o=>scene.remove(o));state.structures=[];buildLoot();
}
function requestPointerLock(){if(!state.active||state.uiOpen)return;try{canvas.focus({preventScroll:true});const result=canvas.requestPointerLock();if(result&&typeof result.catch==='function')result.catch(()=>{});}catch(e){/* Keyboard input remains available without pointer lock. */}}
function enterMainMenu(){state.active=false;state.paused=true;state.uiOpen=false;$('#hud').classList.add('hidden');closeOverlays();if(document.pointerLockElement)document.exitPointerLock();showScreen('#main-menu');}

// HUD / inventory / effects
function updateQuickbar(){
  $$('.quick-slot').forEach((el,i)=>{el.classList.toggle('active',i===state.selectedSlot);el.querySelector('span').textContent=state.quick[i]||'—';});
  $('#left-hand span').textContent=state.leftHandOn?'Фонарь':'—';
  $('#right-hand span').textContent=state.quick[state.selectedSlot]||'—';
  if(handGroup)makeHandMesh();
}
function updateHud(force=false){
  const p=state.player;$('#hp-value').textContent=Math.round(p.hp);$('#hunger-fill').style.width=`${p.hunger}%`;$('#thirst-fill').style.width=`${p.thirst}%`;
  const bpm=Math.round(65+(100-p.hp)*.9+(100-p.thirst)*.14+(100-p.hunger)*.09+(state.nightmare>0?18:0)+state.fear*.12);$('#bpm').textContent=`${bpm} BPM`;$('#heart').style.animationDuration=`${clamp(60/bpm,.35,1.2)}s`;$('#ecg polyline').style.animationDuration=`${clamp(4-bpm/55,.45,2.3)}s`;
  $('#health-panel').style.borderLeftColor=p.hp<30?'#d04f48':'rgba(188,93,81,.75)';
  const effects=[];
  if(p.hunger<35)effects.push(['🍂','Сильный голод','bad']);if(p.thirst<35)effects.push(['💧','Обезвоживание','bad']);if(p.hp<55)effects.push(['🩹','Ранение','bad']);if(state.fear>35)effects.push(['◌',`Страх: ${Math.round(state.fear)}%`,'bad']);if(state.currentNightmare)effects.push([state.currentNightmare.icon,`Кошмар: ${state.currentNightmare.name}`,'bad']);if(p.hp>90&&p.hunger>50&&p.thirst>50)effects.push(['✚','Восстановление','good']);
  $('#status-effects').innerHTML=effects.map(e=>`<div class="effect-icon" data-tone="${e[2]}" data-tip="${e[1]}">${e[0]}</div>`).join('');
  const card=$('#nightmare-card');if(state.currentNightmare){card.classList.remove('hidden');$('#nightmare-name').textContent=state.currentNightmare.name;$('#nightmare-guide').textContent=state.currentNightmare.hint;$('#nightmare-time').textContent=`${Math.ceil(state.nightmare)}с`;$('#nightmare-progress').style.width=`${clamp(state.nightmare/state.currentNightmare.duration*100,0,100)}%`;card.dataset.kind=state.currentNightmare.kind;}else card.classList.add('hidden');
  drawMap($('#minimap'),true);
}
function renderInventory(){
  const grid=$('#inventory-grid');if(!grid)return;let html='';const total=Math.max(20,Math.ceil(state.inventory.length/5)*5);$('#capacity-label').textContent=`${state.inventory.length} предметов · ${total} ячеек`;
  for(let i=0;i<total;i++){const it=state.inventory[i];if(it){const inf=itemInfo(it.name);html+=`<div class="inventory-slot ${state.selectedItem===it.name?'selected':''}" data-item="${encodeURIComponent(it.name)}"><span class="item-count">${it.count>1?it.count:''}</span><span class="item-icon">${inf.icon}</span><span class="item-name">${it.name}</span></div>`;}else html+=`<div class="inventory-slot empty"></div>`;}
  grid.innerHTML=html;$$('.inventory-slot[data-item]').forEach(el=>el.addEventListener('click',()=>selectItem(decodeURIComponent(el.dataset.item))));renderCraftRecipes();
}
function selectItem(name){state.selectedItem=name;const item=itemInfo(name);const it=state.inventory.find(x=>x.name===name);const detail=$('#item-details');detail.innerHTML=`<strong>${item.icon} ${name}</strong>${item.description}<div style="margin-top:5px;color:#c0a773">Количество: ${it?.count||0}</div><div class="item-actions">${item.usable?'<button id="use-selected">Использовать</button>':''}<button id="assign-selected">В быстрый слот</button><button id="drop-selected">Выбросить</button></div>`;
  $('#use-selected')?.addEventListener('click',()=>useItem(name));$('#assign-selected').onclick=()=>{const free=state.quick.findIndex(x=>!x);const slot=free>=0?free:state.selectedSlot;state.quick[slot]=name;updateQuickbar();toast(`Слот ${slot+1}: ${name}`);};$('#drop-selected').onclick=()=>{if(removeItem(name,1)){spawnLootNearPlayer(name);toast(`Оставлено: ${name}`);state.selectedItem=null;renderInventory();}};renderInventorySelection();}
function renderInventorySelection(){$$('.inventory-slot[data-item]').forEach(e=>e.classList.toggle('selected',decodeURIComponent(e.dataset.item)===state.selectedItem));}
function renderCraftRecipes(){
  $('#craft-recipes').innerHTML=RECIPES.filter(r=>!r.station||state.structures.some(o=>o.userData.building==='workbench'&&distance2({x:o.position.x,z:o.position.z},state.player)<4)).map((r,i)=>`<button class="craft-recipe" data-recipe="${i}" ${hasItems(r.cost)?'':'disabled'}><span>${r.icon}</span><span>${r.name}<br><small>${formatCost(r.cost)}</small></span></button>`).join('');
  $$('.craft-recipe').forEach(b=>b.onclick=()=>craft(Number(b.dataset.recipe)));
}
function craft(index){const r=RECIPES[index];if(!hasItems(r.cost)){toast('Не хватает материалов');return;}consumeCost(r.cost);addItem(r.out,r.count);toast(`Создано: ${r.name}`);renderInventory();}
function useItem(name){const info=itemInfo(name);if(!info.usable&&info.category!=='food'){toast('Этот предмет нельзя использовать');return;}if(info.category==='food')playEatAnimation(name,info);else if(info.usable==='drink'){playEatAnimation(name,info);}else if(info.usable==='heal'){playEatAnimation(name,info);}else toast('Нельзя использовать сейчас');}
function playEatAnimation(name,info){
  if(state.consuming)return;state.consuming=true;const itemMesh=new THREE.Group();const body=new THREE.Mesh(new THREE.BoxGeometry(.18,.14,.12),material(info.category==='drink'?0x8da9a4:0x9b805a));itemMesh.add(body);itemMesh.position.set(.5,-.48,-.68);itemMesh.rotation.z=-.3;handGroup.add(itemMesh);
  const start=performance.now();const duration=1450;function frame(now){const t=clamp((now-start)/duration,0,1);itemMesh.position.lerpVectors(new THREE.Vector3(.5,-.48,-.68),new THREE.Vector3(.19,-.16,-.48),Math.min(t*1.5,1));itemMesh.rotation.x=t*1.5; if(t>.45)itemMesh.scale.setScalar(1-(t-.45)*.85);if(t<1)requestAnimationFrame(frame);else{handGroup.remove(itemMesh);if(info.usable==='drink'||info.category==='drink')state.player.thirst=clamp(state.player.thirst+(info.thirst||24),0,100);else if(info.usable==='heal')state.player.hp=clamp(state.player.hp+(info.heal||12),0,100);else{state.player.hunger=clamp(state.player.hunger+(info.hunger===undefined?12:info.hunger),0,100);state.player.thirst=clamp(state.player.thirst+(info.thirst||0),0,100);if(info.spoiled)damage(12,'Испорченная еда');}removeItem(name,1);state.consuming=false;toast(name+' использовано');updateHud(true);}}requestAnimationFrame(frame);
}

// Maps and exploration
function worldToMap(x,z,size){return {x:(x+70)/140*size,y:(z+70)/140*size};}
function drawMap(canvasEl,mini=false){
  if(!canvasEl||!state.player)return;const ctx=canvasEl.getContext('2d'),w=canvasEl.width,h=canvasEl.height;ctx.clearRect(0,0,w,h);ctx.fillStyle='#273126';ctx.fillRect(0,0,w,h);
  for(let i=0;i<500;i++){const x=((i*127.13)%997)/997*w,y=((i*311.71)%991)/991*h;ctx.fillStyle=i%3?'rgba(122,111,73,.09)':'rgba(183,126,61,.1)';ctx.fillRect(x,y,1+(i%4),1+(i%3));}
  const scale=w/140;
  // reveal circle around player and persistent explored cells
  ctx.save();ctx.fillStyle='rgba(8,12,9,.83)';ctx.fillRect(0,0,w,h);ctx.globalCompositeOperation='destination-out';
  const pos=worldToMap(state.player.x,state.player.z,w);const g=ctx.createRadialGradient(pos.x,pos.y,mini?8:20,pos.x,pos.y,mini?48:180);g.addColorStop(0,'rgba(0,0,0,1)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(pos.x,pos.y,mini?50:185,0,Math.PI*2);ctx.fill();
  for(const cell of state.explored){const [cx,cz]=cell.split(',').map(Number);const p=worldToMap(cx*3.5,cz*3.5,w);ctx.beginPath();ctx.arc(p.x,p.y,mini?5:12,0,Math.PI*2);ctx.fill();}ctx.restore();
  // paths / boundary
  ctx.strokeStyle='rgba(178,143,88,.25)';ctx.lineWidth=1;ctx.beginPath();ctx.arc(w/2,h/2,58*scale,0,Math.PI*2);ctx.stroke();
  if(!mini){ctx.strokeStyle='rgba(230,220,191,.1)';ctx.lineWidth=1;for(let i=0;i<=10;i++){ctx.beginPath();ctx.moveTo(i*w/10,0);ctx.lineTo(i*w/10,h);ctx.stroke();ctx.beginPath();ctx.moveTo(0,i*h/10);ctx.lineTo(w,i*h/10);ctx.stroke();}}
  if(typeof LANDMARKS!=='undefined'){for(const lm of LANDMARKS){const gx=Math.round(lm.x/3.5),gz=Math.round(lm.z/3.5);if(!state.explored.has(`${gx},${gz}`))continue;const q=worldToMap(lm.x,lm.z,w);ctx.fillStyle='rgba(215,191,145,.85)';ctx.beginPath();ctx.arc(q.x,q.y,mini?2:4,0,Math.PI*2);ctx.fill();if(!mini){ctx.font='11px sans-serif';ctx.fillText(lm.name,q.x+7,q.y-5);}}}
  // known loot, structures, markers
  for(const obj of state.objects){if(obj.userData.kind!=='loot')continue;const gx=Math.round(obj.position.x/3.5),gz=Math.round(obj.position.z/3.5);if(!state.explored.has(`${gx},${gz}`))continue;const p=worldToMap(obj.position.x,obj.position.z,w);ctx.fillStyle='rgba(207,174,113,.8)';ctx.fillRect(p.x-1.5,p.y-1.5,3,3);}
  for(const obj of state.structures){const p=worldToMap(obj.position.x,obj.position.z,w);ctx.fillStyle='#b8b88a';ctx.fillRect(p.x-3,p.y-3,6,6);}
  for(const m of state.markers){const p=worldToMap(m.x,m.z,w);ctx.fillStyle='#d76a54';ctx.beginPath();ctx.arc(p.x,p.y,mini?3:6,0,Math.PI*2);ctx.fill();}
  const p=worldToMap(state.player.x,state.player.z,w);ctx.save();ctx.translate(p.x,p.y);ctx.rotate(state.yaw);ctx.fillStyle='#eee6cb';ctx.beginPath();ctx.moveTo(0,-(mini?7:12));ctx.lineTo(mini?5:8,mini?7:10);ctx.lineTo(0,mini?4:7);ctx.lineTo(mini?-5:-8,mini?7:10);ctx.closePath();ctx.fill();ctx.restore();
  if(mini){ctx.strokeStyle='rgba(241,228,195,.5)';ctx.lineWidth=1;ctx.beginPath();ctx.arc(w/2,h/2,w*.47,0,Math.PI*2);ctx.stroke();}
}
function addMarkerAtCanvas(canvasEl,ev){const r=canvasEl.getBoundingClientRect();const x=(ev.clientX-r.left)/r.width*canvasEl.width,z=(ev.clientY-r.top)/r.height*canvasEl.height;state.markers.push({x:x/canvasEl.width*140-70,z:z/canvasEl.height*140-70});drawMap($('#full-map'));toast('Метка поставлена');}
$('#full-map').addEventListener('click',e=>addMarkerAtCanvas($('#full-map'),e));$('#clear-markers').onclick=()=>{state.markers=[];drawMap($('#full-map'));};
$('#minimap').addEventListener('click',()=>{openOverlay('#map-panel');drawMap($('#full-map'));});
$('#hide-minimap').onclick=()=>$('#minimap-wrap').classList.toggle('minimap-hidden');

// Build mode
function buildModelBase(id,transparent=false){
  const g=new THREE.Group();const wood=material(0x82603d,.9,{transparent,opacity:transparent?.48:1});const metal=material(0x6f7771,.5,{metalness:.45,transparent,opacity:transparent?.48:1});
  if(id==='floor'){const m=new THREE.Mesh(new THREE.BoxGeometry(3.2,.18,3.2),wood);m.position.y=.08;g.add(m);for(let i=-1;i<=1;i++){const plank=new THREE.Mesh(new THREE.BoxGeometry(.1,.08,3.25),material(0x513b29,.9,{transparent,opacity:transparent?.45:1}));plank.position.x=i*1.05;plank.position.y=.19;g.add(plank);}}
  if(id==='wall'||id==='shelter'){for(let i=0;i<5;i++){const p=new THREE.Mesh(new THREE.BoxGeometry(3,.25,.16),wood);p.position.set(0,.25+i*.29,0);g.add(p);}if(id==='shelter'){const roof=new THREE.Mesh(new THREE.ConeGeometry(2.3,1.5,4),wood);roof.rotation.y=Math.PI/4;roof.position.y=2.25;g.add(roof);}}
  if(id==='tent'){const fabric=new THREE.Mesh(new THREE.ConeGeometry(1.7,2.5,4),new THREE.MeshStandardMaterial({color:0x777b55,roughness:1,transparent,opacity:transparent?.55:1,side:THREE.DoubleSide}));fabric.rotation.y=Math.PI/4;fabric.position.y=1.15;g.add(fabric);}
  if(id==='bed'){const base=new THREE.Mesh(new THREE.BoxGeometry(1.9,.22,.85),wood);base.position.y=.4;g.add(base);const mattress=new THREE.Mesh(new THREE.BoxGeometry(1.75,.2,.76),material(0x777b70,.95,{transparent,opacity:transparent?.5:1}));mattress.position.y=.61;g.add(mattress);}
  if(id==='storage'){const box=new THREE.Mesh(new THREE.BoxGeometry(1.2,.8,.85),wood);box.position.y=.45;g.add(box);const lid=new THREE.Mesh(new THREE.BoxGeometry(1.27,.12,.91),metal);lid.position.y=.91;g.add(lid);}
  if(id==='workbench'){const top=new THREE.Mesh(new THREE.BoxGeometry(2,.16,.9),wood);top.position.y=1.05;g.add(top);for(const x of [-.8,.8])for(const z of [-.3,.3]){const leg=new THREE.Mesh(new THREE.BoxGeometry(.12,1,.12),wood);leg.position.set(x,.5,z);g.add(leg);}}
  if(id==='stove'){const body=new THREE.Mesh(new THREE.CylinderGeometry(.58,.64,.55,12),metal);body.position.y=.3;g.add(body);const ring=new THREE.Mesh(new THREE.TorusGeometry(.42,.07,8,16),material(0x393a34,.4,{transparent,opacity:transparent?.5:1}));ring.rotation.x=Math.PI/2;ring.position.y=.62;g.add(ring);}
  if(id==='collector'){const tub=new THREE.Mesh(new THREE.CylinderGeometry(.55,.45,1.15,12),material(0x737d78,.4,{metalness:.2,transparent,opacity:transparent?.5:1}));tub.position.y=.58;g.add(tub);}
  if(id==='lantern'){const pole=new THREE.Mesh(new THREE.CylinderGeometry(.045,.07,2.2,8),metal);pole.position.y=1.1;g.add(pole);const lamp=new THREE.Mesh(new THREE.SphereGeometry(.22,12,10),new THREE.MeshStandardMaterial({color:0xffd78a,emissive:0xffa33d,emissiveIntensity:.4,transparent,opacity:transparent?.55:1}));lamp.position.y=2.25;g.add(lamp);}
  if(transparent)g.traverse(o=>{if(o.material){o.material.transparent=true;o.material.opacity=.42;o.material.depthWrite=false;}});
  return g;
}
function openBuild(){openOverlay('#build-panel');$('#build-options').innerHTML=BUILDINGS.map(b=>`<button class="build-option" data-build="${b.id}"><b>${b.icon} ${b.name}</b><small>${b.desc}</small><em>${formatCost(b.cost)}</em></button>`).join('');$$('.build-option').forEach(el=>el.onclick=()=>selectBuild(el.dataset.build));}
function selectBuild(id){const b=BUILDINGS.find(x=>x.id===id);if(!hasItems(b.cost)){toast('Не хватает материалов');return;}closeOverlays();state.buildMode=id;if(state.buildPreview)scene.remove(state.buildPreview);state.buildPreview=buildModel(id,true);scene.add(state.buildPreview);toast('ЛКМ — установить · Esc — отмена');requestPointerLock();}
function currentBuildPosition(){const px=state.player.x-Math.sin(state.yaw)*4.2,pz=state.player.z-Math.cos(state.yaw)*4.2;return {x:clamp(px,-56,56),z:clamp(pz,-56,56)};}
function placeBuild(){if(!state.buildMode)return;const b=BUILDINGS.find(x=>x.id===state.buildMode);if(!hasItems(b.cost)){toast('Не хватает материалов');cancelBuild();return;}const pos=currentBuildPosition();consumeCost(b.cost);const obj=buildModel(b.id,false);obj.position.set(pos.x,terrainHeight(pos.x,pos.z),pos.z);obj.rotation.y=state.yaw;obj.userData={kind:'building',building:b.id,name:b.name};scene.add(obj);state.structures.push(obj);state.buildMode=null;if(state.buildPreview){scene.remove(state.buildPreview);state.buildPreview=null;}toast(`${b.name} построено`);renderInventory();}
function cancelBuild(){state.buildMode=null;if(state.buildPreview){scene.remove(state.buildPreview);state.buildPreview=null;}}

// World interaction
function spawnLootNearPlayer(name){const a=state.yaw;makeLootMesh(name,state.player.x-Math.sin(a)*1.2,state.player.z-Math.cos(a)*1.2);}
function pickupAnimation(){if(!handGroup||state.pickupAnimating)return;state.pickupAnimating=true;const start=performance.now();function step(now){const t=clamp((now-start)/420,0,1);handGroup.position.y=Math.sin(t*Math.PI)*.12;if(t<1)requestAnimationFrame(step);else{handGroup.position.y=0;state.pickupAnimating=false;}}requestAnimationFrame(step);}
function inspectHeldItem(){const name=state.quick[state.selectedSlot];if(!name){toast('Рука пуста');return;}if(!handItem)makeHandMesh();const obj=handItem;if(!obj)return;const basePos=obj.position.clone(),baseRot=obj.rotation.clone();const targetPos=new THREE.Vector3(.08,-.12,-.55);const targetRot=new THREE.Euler(.08,0,.05);const label=$('#inspect-label');label.textContent=name;label.classList.add('show');const start=performance.now();function step(now){const t=(now-start)/1900;if(t<.42){const k=clamp(t/.42,0,1);obj.position.lerpVectors(basePos,targetPos,k);obj.rotation.set(baseRot.x+(targetRot.x-baseRot.x)*k,baseRot.y+(targetRot.y-baseRot.y)*k,baseRot.z+(targetRot.z-baseRot.z)*k);}else if(t>.72){const k=clamp((t-.72)/.28,0,1);obj.position.lerpVectors(targetPos,basePos,k);obj.rotation.set(targetRot.x+(baseRot.x-targetRot.x)*k,targetRot.y+(baseRot.y-targetRot.y)*k,targetRot.z+(baseRot.z-targetRot.z)*k);}if(t<1)requestAnimationFrame(step);else{obj.position.copy(basePos);obj.rotation.copy(baseRot);label.classList.remove('show');}}requestAnimationFrame(step);}
function interact(){
  if(state.buildMode)return;raycaster.setFromCamera(pointer,camera);const candidates=[...state.objects,...state.structures];const hits=raycaster.intersectObjects(candidates,true).filter(h=>h.distance<4.2);
  let root=hits[0]?.object;while(root&&root.parent&&!root.userData.kind)root=root.parent;
  if(root?.userData.kind==='loot'){const name=root.userData.name;addItem(name,1);pickupAnimation();scene.remove(root);state.objects=state.objects.filter(o=>o!==root);lootMeshes=lootMeshes.filter(o=>o!==root);toast(`Найдено: ${name}`);return;}
  if(root?.userData.kind==='building'){if(root.userData.building==='workbench'||root.userData.building==='stove'){openOverlay('#inventory-panel');renderInventory();toast('Рабочее место доступно');}else if(root.userData.building==='bed'||root.userData.building==='tent'){state.player.hp=clamp(state.player.hp+6,0,100);state.player.stamina=100;toast('Ты немного отдохнул');}else toast(root.userData.name||'Постройка');return;}
  toast('Здесь ничего нет');
}
function updateInteractionPrompt(){if(state.clock-(state.lastPrompt||0)<.12)return;state.lastPrompt=state.clock;raycaster.setFromCamera(pointer,camera);const hits=raycaster.intersectObjects([...state.objects,...state.structures],true).filter(h=>h.distance<4.2);let root=hits[0]?.object;while(root&&root.parent&&!root.userData.kind)root=root.parent;const p=$('#interaction-prompt');if(root?.userData.kind==='loot')p.textContent=`[E] Взять: ${root.userData.name}`;else if(root?.userData.kind==='building')p.textContent=`[E] ${root.userData.name||'Использовать'}`;else p.textContent='';}

// Input and overlays
function openOverlay(id){['#inventory-panel','#map-panel','#build-panel','#camp-panel'].forEach(other=>{if(other!==id)$(other)?.classList.add('hidden');});state.uiOpen=true;$(id).classList.remove('hidden');if(document.pointerLockElement)document.exitPointerLock();}
function closeOverlays(){['#inventory-panel','#map-panel','#build-panel','#save-screen','#settings-screen'].forEach(id=>$(id).classList.add('hidden'));state.uiOpen=false;}
$$('[data-close]').forEach(b=>b.addEventListener('click',()=>{const id=b.dataset.close;if(id==='settings-screen'){showScreen(state.screenReturn||'#main-menu');return;}if(id==='save-screen'){showScreen(state.screenReturn||'#main-menu');return;}hideScreen('#'+id);if(['inventory-panel','map-panel','build-panel'].includes(id)){state.uiOpen=false;requestPointerLock();}}));
function toggleInventory(){if($('#inventory-panel').classList.contains('hidden')){renderInventory();openOverlay('#inventory-panel');}else{closeOverlays();requestPointerLock();}}
function toggleMap(){if($('#map-panel').classList.contains('hidden')){openOverlay('#map-panel');drawMap($('#full-map'));}else{closeOverlays();requestPointerLock();}}
$('#inventory-toggle').onclick=toggleInventory;
$$('.quick-slot').forEach(el=>el.onclick=()=>{state.selectedSlot=Number(el.dataset.slot);updateQuickbar();});
$('#left-hand').onclick=()=>{const flashlight=state.inventory.find(i=>i.name.toLowerCase().includes('фонарь'));if(!flashlight){toast('Нет фонаря');return;}state.leftHandOn=!state.leftHandOn;makeHandMesh();updateQuickbar();toast(state.leftHandOn?'Фонарь включён':'Левая рука свободна');};
function setMinimapVisible(visible){$('#minimap-wrap').classList.toggle('hidden',!visible);$('#show-minimap').classList.toggle('hidden',visible);}
$('#hide-minimap').onclick=()=>setMinimapVisible(false);
$('#show-minimap').onclick=()=>setMinimapVisible(true);
$('#save-screen [data-close]')?.addEventListener('click',()=>{});
$('#choose-save').onclick=()=>{state.screenReturn='#main-menu';renderSaveList(false);showScreen('#save-screen');};
$('#open-settings').onclick=()=>{state.screenReturn='#main-menu';showScreen('#settings-screen');};
$('#exit-game').onclick=()=>{window.close();};
$('#pause-settings').onclick=()=>{state.screenReturn='#pause-screen';showScreen('#settings-screen');};
$('#resume-game').onclick=()=>{hideScreen('#pause-screen');if(state.player.hp<=0){state.player.hp=35;state.player.hunger=45;state.player.thirst=45;state.player.x=0;state.player.z=0;state.player.y=terrainHeight(0,0)+1.72;state.active=true;camera.position.set(0,state.player.y,0);toast('Ты снова в лесу');}state.paused=false;requestPointerLock();};
$('#quick-save').onclick=()=>{state.screenReturn='#pause-screen';renderSaveList(true);showScreen('#save-screen');};
$('#to-main-menu').onclick=enterMainMenu;
$('#sensitivity').oninput=e=>state.settings.sensitivity=Number(e.target.value);
$('#fov').oninput=e=>{state.settings.fov=Number(e.target.value);if(camera)camera.fov=state.settings.fov,camera.updateProjectionMatrix();};
$('#shadow-quality').onchange=e=>{state.settings.shadows=e.target.value;if(renderer){renderer.shadowMap.enabled=e.target.value!=='off';sun.shadow.mapSize.setScalar(e.target.value==='high'?1024:512);}};
canvas.addEventListener('click',()=>{if(state.active&&!state.paused&&!state.uiOpen){if(state.buildMode)placeBuild();else requestPointerLock();}});


// Save/load
function serializeGame(){return {player:state.player,inventory:state.inventory,quick:state.quick,leftHandOn:state.leftHandOn,selectedSlot:state.selectedSlot,fear:state.fear,nightmareId:state.currentNightmare?.id||null,nightmareRemaining:state.nightmare,nextNightmare:state.nextNightmare,structures:state.structures.map(o=>({id:o.userData.building,x:o.position.x,z:o.position.z,rotation:o.rotation.y})),markers:state.markers,explored:[...state.explored],loot:state.objects.map(o=>({name:o.userData.name,x:o.position.x,z:o.position.z})),yaw:state.yaw,pitch:state.pitch,dayTime:state.dayTime,clock:state.clock};}

// Simulation loop
function updateWorld(delta){
  if(!state.active||state.paused||state.uiOpen)return;
  const p=state.player;let forward=(state.keys.KeyW?1:0)-(state.keys.KeyS?1:0);let side=(state.keys.KeyD?1:0)-(state.keys.KeyA?1:0);const reversed=state.currentNightmare?.id==='reverseNorth'&&state.nightmare>state.currentNightmare.duration-7;if(reversed){forward*=-1;side*=-1;}const sprint=state.keys.ShiftLeft||state.keys.ShiftRight;const moving=forward!==0||side!==0;
  const speed=(sprint?6.2:4.1)*(p.stats?.Выносливость>=2?1.08:1)*(p.profile?.traits?.includes('Лёгкая походка')?1.06:1)*(state.currentNightmare?.id==='sleepDrop'?.58:1);
  if(moving){const len=Math.hypot(forward,side)||1;const f=forward/len,s=side/len;p.x+=(-Math.sin(state.yaw)*f+Math.cos(state.yaw)*s)*speed*delta;p.z+=(-Math.cos(state.yaw)*f-Math.sin(state.yaw)*s)*speed*delta;}
  p.x=clamp(p.x,-67,67);p.z=clamp(p.z,-67,67);
  const floor=terrainHeight(p.x,p.z)+1.72;
  if(state.onGround&&floor<p.y-.48){state.onGround=false;state.velY=0;state.jumpStart=p.y;}
  if(!state.onGround){state.velY-=14*delta;p.y+=state.velY*delta;if(p.y<=floor){const drop=state.jumpStart-floor;p.y=floor;state.velY=0;state.onGround=true;if(drop>2.5)damage(clamp((drop-2.2)*5,5,35),'Падение');}}
  else p.y=floor;
  camera.position.set(p.x,p.y,p.z);camera.rotation.set(state.pitch,state.yaw,0,'YXZ');
  if(moving&&state.onGround){const sway=Math.sin(state.clock*9)*(sprint ? .045 : .025);camera.position.y+=sway;}
  if(state.buildPreview){const pos=currentBuildPosition();state.buildPreview.position.set(pos.x,terrainHeight(pos.x,pos.z),pos.z);state.buildPreview.rotation.y=state.yaw;}
  // survival needs
  const hungerRate=p.profile?.traits?.includes('Хороший аппетит') ? .0052 : .0032;const thirstRate=.0046;
  p.hunger=clamp(p.hunger-hungerRate*delta*60,0,100);p.thirst=clamp(p.thirst-thirstRate*delta*60,0,100);
  if(p.hunger<=0||p.thirst<=0){damage((p.thirst<=0?1.25:.6)*delta,'Истощение');}
  else if(p.hunger>45&&p.thirst>45&&p.hp<100&&state.clock-p.lastDamage>8){p.hp=clamp(p.hp+(0.22+(p.stats?.Восстановление||0)*.05)*delta,0,100);}
  const radius=Math.hypot(p.x,p.z);if(radius>57){damage((radius-57)*.08*delta*60,'Граница сна');$('#damage-overlay').style.opacity=String(clamp((radius-57)/10,0,.7));}else $('#damage-overlay').style.opacity=String(clamp((100-p.hp)/100*.18,0,.22));
  // Resting stamina
  p.stamina=clamp(p.stamina+(sprint&&moving?-11:8)*delta,0,100);
  // Day-night cycle (about 18 real minutes)
  state.dayTime=(state.dayTime+delta/1080)%1;const angle=state.dayTime*Math.PI*2-Math.PI/2;const sunHeight=Math.sin(angle);sun.position.set(Math.cos(angle)*58,Math.max(-8,sunHeight*68),Math.sin(angle)*50);sun.intensity=clamp(.18+Math.max(0,sunHeight)*2.3,.12,2.2);hemi.intensity=clamp(.28+Math.max(0,sunHeight)*.95,.23,1.25);moon.intensity=clamp(.35-Math.max(0,sunHeight)*.32,.08,.33);
  const night=clamp(1-(sunHeight+.12)*2.2,0,1);const sky=new THREE.Color(0x778073).lerp(new THREE.Color(0x111a23),night);scene.background.copy(sky);scene.fog.color.copy(sky);scene.fog.density=.008+night*.006+(state.currentNightmare?.id==='muteFog'?.026:state.currentNightmare?.id==='blackSquall'?.014:0);renderer.toneMappingExposure=1.12-night*.22-(state.currentNightmare?.id==='falseDawn'?.28:0);
  // Nightmares: entities and reality-warping events.
  if((night>.48||state.clock>120)&&!state.currentNightmare){state.nextNightmare-=delta*(p.profile?.traits?.includes('Бессонница')?1.35:1);if(state.nextNightmare<=0){const choices=NIGHTMARES.filter(n=>!p.profile?.traits?.includes('Крепкий сон')||n.kind!=='entity'||Math.random()>.12);const pick=choices[Math.floor(Math.random()*choices.length)];startNightmare(pick.id);state.nextNightmare=rand(85,150);}}
  if(state.currentNightmare){state.nightmare=Math.max(0,state.nightmare-delta);updateNightmare(delta);if(state.nightmare<=0)finishNightmare();}else{state.fear=clamp(state.fear-delta*2.7,0,100);$('#nightmare-overlay').style.opacity='0';}
  if(leftLight)leftLight.intensity=state.leftHandOn?1.45:0;
  // leaf canopy breeze
  for(const tree of forest){const t=tree.userData.sway;tree.rotation.z=Math.sin(state.clock*.55+t)*.012;tree.rotation.x=Math.cos(state.clock*.42+t)*.009;}
  // exploration memory grid
  const gx=Math.round(p.x/3.5),gz=Math.round(p.z/3.5);for(let x=-4;x<=4;x++)for(let z=-4;z<=4;z++)if(x*x+z*z<17)state.explored.add(`${gx+x},${gz+z}`);
  // floating loot
  for(const o of state.objects){o.position.y=o.userData.baseY+Math.sin(state.clock*1.6+o.position.x)*.035;o.rotation.y+=delta*.18;}
  updateInteractionPrompt();
  if(state.clock-state.lastHud>.12){updateHud();state.lastHud=state.clock;}
  if(state.clock-state.lastSave>180){state.lastSave=state.clock;}
}
function addNightmareLimb(parent,a,b,rTop,rBottom,mat){
  const v=b.clone().sub(a);const limb=new THREE.Mesh(new THREE.CylinderGeometry(rTop,rBottom,v.length(),7),mat);limb.position.copy(a).add(b).multiplyScalar(.5);limb.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),v.normalize());limb.castShadow=false;parent.add(limb);return limb;
}
function makeNightmareModel(model){
  const g=new THREE.Group();
  const shadow=new THREE.MeshStandardMaterial({color:model==='glass'?0x182126:0x080a0b,roughness:.96,metalness:.05,emissive:model==='glass'?0x203d45:0x19070a,emissiveIntensity:model==='glass'?.5:.35,transparent:true,opacity:.93});
  const edge=new THREE.MeshStandardMaterial({color:0x1b1114,roughness:1,emissive:0x310d13,emissiveIntensity:.25});
  const eye=new THREE.MeshStandardMaterial({color:0xe9a19a,emissive:0xc51f2d,emissiveIntensity:2.2,roughness:.25});
  const sphere=(parent,pos,scale,mat)=>{const m=new THREE.Mesh(new THREE.SphereGeometry(1,12,10),mat);m.position.copy(pos);m.scale.copy(scale);m.castShadow=false;parent.add(m);return m;};
  const up=new THREE.Vector3(0,1,0);
  if(model==='crawler'){
    sphere(g,new THREE.Vector3(0,.78,0),new THREE.Vector3(.58,.33,.85),shadow);sphere(g,new THREE.Vector3(0,.88,-.64),new THREE.Vector3(.25,.23,.28),edge);
    for(const x of [-1,1])for(const z of [-1,1]){const hip=new THREE.Vector3(x*.34,.72,z*.48),knee=new THREE.Vector3(x*.72,.38,z*.75),foot=new THREE.Vector3(x*.78,.12,z*1.02);addNightmareLimb(g,hip,knee,.12,.09,shadow);addNightmareLimb(g,knee,foot,.085,.035,edge);}
    for(let i=0;i<5;i++){const thorn=new THREE.Mesh(new THREE.ConeGeometry(.11,.42,5),edge);thorn.position.set(rand(-.42,.42),1.03,rand(-.45,.5));thorn.rotation.z=rand(-.5,.5);g.add(thorn);}
  }else if(model==='deer'){
    sphere(g,new THREE.Vector3(0,1.14,0),new THREE.Vector3(.42,.48,.82),shadow);addNightmareLimb(g,new THREE.Vector3(0,1.45,-.48),new THREE.Vector3(0,1.95,-.72),.16,.11,shadow);sphere(g,new THREE.Vector3(0,2.02,-.82),new THREE.Vector3(.22,.24,.33),shadow);
    for(const x of [-.27,.27])for(const z of [-.48,.48])addNightmareLimb(g,new THREE.Vector3(x,1.03,z),new THREE.Vector3(x*1.1,.08,z*1.12),.085,.035,edge);
    for(const x of [-1,1]){addNightmareLimb(g,new THREE.Vector3(x*.12,2.15,-.82),new THREE.Vector3(x*.5,2.65,-.82),.055,.025,edge);addNightmareLimb(g,new THREE.Vector3(x*.5,2.65,-.82),new THREE.Vector3(x*.72,2.9,-.92),.035,.012,edge);addNightmareLimb(g,new THREE.Vector3(x*.42,2.58,-.82),new THREE.Vector3(x*.55,2.88,-.65),.035,.012,edge);}
  }else if(model==='brute'){
    sphere(g,new THREE.Vector3(0,1.48,0),new THREE.Vector3(.72,.92,.52),shadow);sphere(g,new THREE.Vector3(0,2.43,-.05),new THREE.Vector3(.34,.38,.32),edge);
    for(const x of [-1,1]){addNightmareLimb(g,new THREE.Vector3(x*.58,2.02,0),new THREE.Vector3(x*.95,.88,-.12),.24,.16,shadow);addNightmareLimb(g,new THREE.Vector3(x*.95,.88,-.12),new THREE.Vector3(x*1.04,.18,-.25),.16,.08,edge);addNightmareLimb(g,new THREE.Vector3(x*.27,.85,.05),new THREE.Vector3(x*.34,.08,.15),.2,.09,shadow);}
  }else if(model==='orb'){
    sphere(g,new THREE.Vector3(0,1.65,0),new THREE.Vector3(.42,.48,.42),shadow);
    for(let i=0;i<7;i++){const a=i/7*Math.PI*2;const start=new THREE.Vector3(Math.cos(a)*.24,1.42,Math.sin(a)*.24),mid=new THREE.Vector3(Math.cos(a)*.68,.85+rand(-.25,.25),Math.sin(a)*.68),end=new THREE.Vector3(Math.cos(a)*.95,.12,Math.sin(a)*.95);addNightmareLimb(g,start,mid,.08,.045,shadow);addNightmareLimb(g,mid,end,.05,.012,edge);}
  }else{
    const height=model==='brute'?2.6:2.3;
    sphere(g,new THREE.Vector3(0,1.32,0),new THREE.Vector3(model==='brute'?.55:.32,model==='brute'?.72:.78,.31),shadow);
    sphere(g,new THREE.Vector3(0,2.2,-.03),new THREE.Vector3(.24,.29,.23),edge);
    for(const x of [-1,1]){
      addNightmareLimb(g,new THREE.Vector3(x*.27,1.82,0),new THREE.Vector3(x*(model==='branch'?.75:.62),1.05,-.08),.11,.075,shadow);
      addNightmareLimb(g,new THREE.Vector3(x*(model==='branch'?.75:.62),1.05,-.08),new THREE.Vector3(x*(model==='branch'?1.05:.76),.34,-.24),.075,.025,edge);
      addNightmareLimb(g,new THREE.Vector3(x*.14,.72,0),new THREE.Vector3(x*.2,.08,.06),.12,.04,shadow);
    }
    if(model==='branch'||model==='thin')for(const x of [-1,1]){addNightmareLimb(g,new THREE.Vector3(x*.12,2.35,-.02),new THREE.Vector3(x*.42,2.78,-.04),.055,.018,edge);addNightmareLimb(g,new THREE.Vector3(x*.42,2.78,-.04),new THREE.Vector3(x*.68,2.92,.05),.025,.008,edge);}
    if(model==='echo'){
      const shawl=new THREE.Mesh(new THREE.ConeGeometry(.56,1.25,8),shadow);shawl.position.y=1.45;g.add(shawl);
    }
    if(model==='glass'){
      const shard=new THREE.Mesh(new THREE.OctahedronGeometry(.33,0),new THREE.MeshStandardMaterial({color:0x55777a,metalness:.4,roughness:.2,transparent:true,opacity:.55,emissive:0x183c44,emissiveIntensity:.8}));shard.position.set(0,1.4,.18);g.add(shard);
    }
  }
  // Small dim eyes are the only bright detail visible through the fog.
  const eyeY=model==='crawler'?.91:model==='deer'?2.04:model==='orb'?1.65:2.22;const eyeZ=model==='crawler'?-.87:model==='deer'?-1.08:model==='orb'?-.39:-.235;
  sphere(g,new THREE.Vector3(-.085,eyeY,eyeZ),new THREE.Vector3(.035,.026,.018),eye);sphere(g,new THREE.Vector3(.085,eyeY,eyeZ),new THREE.Vector3(.035,.026,.018),eye);
  const haze=new THREE.Mesh(new THREE.SphereGeometry(.9,12,10),new THREE.MeshBasicMaterial({color:0x6b1820,transparent:true,opacity:.055,depthWrite:false}));haze.position.y=1.1;g.add(haze);
  g.userData.floatOffset=rand(0,Math.PI*2);return g;
}
function spawnNightmareEntity(def){
  const a=rand(0,Math.PI*2),r=rand(23,31);const x=clamp(state.player.x+Math.cos(a)*r,-53,53),z=clamp(state.player.z+Math.sin(a)*r,-53,53);const mesh=makeNightmareModel(def.model);mesh.position.set(x,terrainHeight(x,z),z);scene.add(mesh);
  state.nightmareEntities.push({mesh,def,attackCooldown:rand(.5,2),charge:0,chargeWait:rand(3,6),blink:rand(2,4),phase:rand(0,Math.PI*2),lastTarget:{x:state.player.x,z:state.player.z},lastSeenTime:0,awareness:.5,wanderTarget:null});
}
function startNightmare(id,restoring=false,remaining=null){
  const def=NIGHTMARES.find(n=>n.id===id);if(!def||!scene)return;finishNightmare();state.currentNightmare=def;state.nightmare=remaining>0?remaining:def.duration;state.nightmareOrigin={x:state.player.x,z:state.player.z};state.nightmareFxTick=0;state.nightmareEntities=[];
  if(def.kind==='entity')spawnNightmareEntity(def);
  const overlay=$('#nightmare-overlay');overlay.dataset.effect=def.id;overlay.style.opacity='.22';
  $('#nightmare-card').classList.remove('hidden');updateHud(true);if(!restoring)toast(`Кошмар: ${def.name}`);
}
function finishNightmare(){
  if(state.nightmareEntities&&scene)state.nightmareEntities.forEach(e=>scene.remove(e.mesh));state.nightmareEntities=[];state.currentNightmare=null;state.nightmare=0;
  const overlay=$('#nightmare-overlay');if(overlay){overlay.style.opacity='0';overlay.dataset.effect='';}const card=$('#nightmare-card');if(card)card.classList.add('hidden');if($('#compass'))$('#compass').textContent='N';
}
function nearSafeLight(){
  const p=state.player;return state.structures.some(o=>{const id=o.userData.building;const r=id==='lantern'?7:(id==='shelter'||id==='tent'?3.5:0);return r>0&&distance2({x:o.position.x,z:o.position.z},p)<r;});
}
function updateNightmare(delta){
  const def=state.currentNightmare;if(!def)return;const p=state.player;const id=def.id;const overlay=$('#nightmare-overlay');
  let nearest=99;
  const forward=new THREE.Vector3(-Math.sin(state.yaw),0,-Math.cos(state.yaw));
  for(const e of state.nightmareEntities){
    const m=e.mesh,dv=new THREE.Vector3(p.x-m.position.x,0,p.z-m.position.z);const dist=dv.length();nearest=Math.min(nearest,dist);const dir=dv.clone().normalize();const toEntity=new THREE.Vector3(m.position.x-p.x,0,m.position.z-p.z).normalize();const looking=forward.dot(toEntity)>.78;const inBeam=state.leftHandOn&&dist<15&&forward.dot(toEntity)>.48;const safe=nearSafeLight();
    e.attackCooldown-=delta;e.chargeWait-=delta;e.blink-=delta;
    let speed=def.speed;
    if(def.mode==='watch'&&looking)speed=0;if(def.mode==='watch'&&inBeam)speed=-1.15;
    if(def.mode==='light'&&inBeam)speed=-1.5;
    if(def.mode==='charge'){if(e.charge<=0&&e.chargeWait<=0&&dist<22){e.charge=2.2;e.chargeWait=4.8;}if(e.charge>0){e.charge-=delta;speed=5.4;}else speed*=.7;}
    if(def.mode==='mirror'&&e.blink<=0&&dist<17&&!looking){const a=state.yaw+Math.PI+rand(-.65,.65);m.position.set(clamp(p.x-Math.sin(a)*12,-53,53),terrainHeight(p.x-Math.sin(a)*12,p.z-Math.cos(a)*12),clamp(p.z-Math.cos(a)*12,-53,53));e.blink=5.5;}
    if(def.mode==='blink'&&e.blink<=0&&dist<13){const a=rand(0,Math.PI*2);const x=clamp(p.x+Math.cos(a)*rand(9,15),-53,53),z=clamp(p.z+Math.sin(a)*rand(9,15),-53,53);m.position.set(x,terrainHeight(x,z),z);e.blink=4.2;}
    if(safe){speed=-Math.max(1.2,Math.abs(speed));}
    const move=dir.multiplyScalar(speed*delta);m.position.x=clamp(m.position.x+move.x,-55,55);m.position.z=clamp(m.position.z+move.z,-55,55);m.position.y=terrainHeight(m.position.x,m.position.z)+Math.sin(state.clock*2.1+e.phase)*.035;
    m.rotation.y=Math.atan2(p.x-m.position.x,p.z-m.position.z)+Math.PI;m.rotation.z=Math.sin(state.clock*2+e.phase)*.025;
    if(def.mode==='aura'&&dist<10)p.stamina=clamp(p.stamina-delta*(10-dist)*.65,0,100);
    if(def.mode==='fear'&&dist<14)state.fear=clamp(state.fear+delta*5,0,100);
    if(dist<1.65&&e.attackCooldown<=0&&!safe){damage(def.damage,'Кошмар');p.stamina=clamp(p.stamina-22,0,100);e.attackCooldown=1.65;}
    m.position.y+=Math.sin(state.clock*2.7+e.phase)*.015;
  }
  if(state.nightmareEntities.length){if(nearest<19)state.fear=clamp(state.fear+delta*(19-nearest)*.42,0,100);else state.fear=clamp(state.fear-delta*2.2,0,100);}
  const safe=nearSafeLight();state.nightmareFxTick-=delta;
  if(id==='muteFog'){overlay.style.opacity=String(.18+Math.sin(state.clock*2.3)*.035);}
  else if(id==='reverseNorth'){overlay.style.opacity=String(.12+Math.sin(state.clock*5)*.06);if($('#compass'))$('#compass').textContent=state.nightmare>def.duration-7?'?':(state.yaw%(Math.PI*2)>0?'N':'S');}
  else if(id==='blackSquall'){overlay.style.opacity=String(.24+Math.sin(state.clock*13)*.08);p.stamina=clamp(p.stamina-delta*(safe?1.2:7),0,100);}
  else if(id==='falseDawn'){overlay.style.opacity=String(.18+Math.sin(state.clock*3)*.05);if(!safe&&state.nightmare<def.duration-4&&state.nightmareFxTick<=0){damage(1,'Ложный рассвет');state.nightmareFxTick=2.8;}}
  else if(id==='bell'){overlay.style.opacity=String(.16+Math.max(0,Math.sin(state.clock*4.2))*.19);if(state.nightmareFxTick<=0){const still=!state.keys.KeyW&&!state.keys.KeyA&&!state.keys.KeyS&&!state.keys.KeyD;p.stamina=clamp(p.stamina-(still?12:3),0,100);state.fear=clamp(state.fear+(still?7:2),0,100);state.nightmareFxTick=5.2;}}
  else if(id==='wrongTracks'){overlay.style.opacity=String(.13+Math.sin(state.clock*7)*.05);if($('#compass'))$('#compass').textContent=['N','E','S','W'][Math.floor(state.clock*1.8)%4];}
  else if(id==='sleepDrop'){overlay.style.opacity=String(.17+Math.sin(state.clock*2.1)*.08);p.stamina=clamp(p.stamina-delta*3.5,0,100);}
  else if(id==='emptyPath'){overlay.style.opacity=String(.2+Math.sin(state.clock*4)*.045);if(distance2(p,state.nightmareOrigin)>24)damage(delta*2.4,'Пустая тропа');}
  else {overlay.style.opacity=String(.2+Math.sin(state.clock*8)*.055);}
  if(id==='muteFog'||id==='blackSquall'||id==='falseDawn'||id==='emptyPath'){$('#nightmare-card').dataset.kind='event';}
}

function damage(amount,reason){if(amount<=0)return;const p=state.player;p.hp=clamp(p.hp-amount,0,100);p.lastDamage=state.clock;if(amount>2){$('#damage-overlay').style.opacity='.6';setTimeout(()=>$('#damage-overlay').style.opacity='.12',180);}if(p.hp<=0){finishNightmare();state.nextNightmare=rand(45,75);state.active=false;state.paused=true;toast('Сон оборвался');$('#hud').classList.add('hidden');setTimeout(()=>{showScreen('#pause-screen');$('#pause-screen h2').textContent='Тишина';$('#resume-game').textContent='Вернуться в сон';},500);}}
function onResize(){if(!camera||!renderer)return;camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);}
function animate(now){requestAnimationFrame(animate);const delta=Math.min((now-state.lastTick)/1000,.05);state.lastTick=now;if(state.active&&!state.paused&&!state.uiOpen)state.clock+=delta;updateWorld(delta);if(renderer&&scene&&camera)renderer.render(scene,camera);}

// Main menu and default configuration
/* ========================================================================
   QUIET DREAM — survival, camp, weather and persistence expansion
   ======================================================================== */

let weatherPoints = null;
let weatherGeometry = null;
let weatherPositions = null;
let weatherVelocities = null;
let weatherFlashLight = null;
let activeCamp = null;
let activeStation = null;
let weatherState = { current: 'clear', timer: 95, lightning: 0, flash: 0 };
const WEATHER_LABELS = { clear: 'ЯСНО', clouds: 'ПАСМУРНО', rain: 'ДОЖДЬ', fog: 'ТУМАН', storm: 'ГРОЗА' };
const WEATHER_TEMPERATURE = { clear: 2, clouds: -1, rain: -4, fog: -2, storm: -6 };
const LANDMARKS = [
  {name:'Старая просека',x:18,z:-12},
  {name:'Лесная низина',x:-22,z:18},
  {name:'Каменный склон',x:29,z:27},
  {name:'Заросший пруд',x:-24,z:-18},
  {name:'Заброшенный привал',x:9,z:34}
];
const SAVE_PREFIX = 'quiet-dream-save-';

// Additional props, wearable equipment and camp materials.
ITEMS['Сухие дрова'] = { name:'Сухие дрова', icon:'🪵', category:'resource', stack:true, description:'Сухое топливо для костра.', stack:true };
ITEMS['Тёплая куртка'] = { name:'Тёплая куртка', icon:'🧥', category:'tool', stack:false, wearable:'coat', warmth:6, description:'Тёплая верхняя одежда. Снижает потерю тепла.' };
ITEMS['Шерстяная шапка'] = { name:'Шерстяная шапка', icon:'🧢', category:'tool', stack:false, wearable:'hat', warmth:2, description:'Сохраняет немного тепла в холодную погоду.' };
ITEMS['Сухие носки'] = { name:'Сухие носки', icon:'🧦', category:'tool', stack:false, wearable:'socks', warmth:2, description:'Помогают сохранять тепло после дождя.' };
ITEMS['Тёплый чай'] = { name:'Тёплый чай', icon:'🍵', category:'drink', stack:true, thirst:18, warmth:3, description:'Тёплый напиток. Немного согревает и утоляет жажду.', usable:'drink' };
ITEMS['Овощной суп'] = { name:'Овощной суп', icon:'🥣', category:'food', stack:true, hunger:28, warmth:2, description:'Горячая еда, приготовленная в лагере.' };
ITEMS['Приготовленные пельмени'] = { name:'Приготовленные пельмени', icon:'🥟', category:'food', stack:true, hunger:32, description:'Горячее блюдо. Восстанавливает сытость.' };
ITEMS['Жареное мясо'] = { name:'Жареное мясо', icon:'🍖', category:'food', stack:true, hunger:34, description:'Приготовленное мясо.' };
ITEMS['Чистая вода'] = { name:'Чистая вода', icon:'💧', category:'drink', stack:true, thirst:40, description:'Собранная и очищенная питьевая вода.', usable:'drink' };
ITEMS['Сырая вода'] = { name:'Сырая вода', icon:'🫗', category:'drink', stack:true, thirst:24, description:'Вода из дождесборника. Перед употреблением лучше очистить.', usable:'drink' };
ITEMS['Испорченная еда'] = { name:'Испорченная еда', icon:'🦠', category:'food', stack:true, description:'Испорченный продукт. Не восстанавливает силы.', hunger:-8, spoiled:true };
for (const item of Object.values(ITEMS)) {
  if (item.category === 'food' && !item.spoiled && item.perishable !== false) item.perishable = true;
  if (item.category === 'drink' && item.name !== 'Чистая вода') item.perishable = false;
}
addItems('tool', [
  ['Кусачки','🗜️'], ['Фонарик на батарейках','🔦'], ['Фильтр для воды','🧰'], ['Термос','🍶'],
  ['Рабочие перчатки','🧤'], ['Дождевик','🧥'], ['Запасные батарейки','🔋']
], { description:'Снаряжение и полезные предметы для лагеря.' });
ITEMS['Дождевик'].wearable='raincoat';ITEMS['Дождевик'].warmth=3;

BUILDINGS.push(
  {id:'campfire',name:'Кострище',icon:'🔥',cost:{'Древесина':3,'Камень':2},desc:'Источник тепла и света. Требует топлива.'},
  {id:'dryingRack',name:'Сушилка',icon:'▤',cost:{'Древесина':3,'Верёвка':2},desc:'Место для просушки одежды и припасов.'},
  {id:'woodRack',name:'Поленница',icon:'🪵',cost:{'Доска':3,'Гвозди':2},desc:'Организованное хранение топлива.'}
);
RECIPES.push(
  {name:'Сухие дрова',icon:'🪵',cost:{'Древесина':2},out:'Сухие дрова',count:2},
  {name:'Овощной суп',icon:'🥣',cost:{'Картофель':1,'Морковь':1,'Лук':1,'Бутылка воды':1},out:'Овощной суп',count:1,station:'stove'},
  {name:'Тёплый чай',icon:'🍵',cost:{'Бутылка воды':1,'Сахар':1},out:'Тёплый чай',count:1,station:'stove'},
  {name:'Приготовленные пельмени',icon:'🥟',cost:{'Пельмени':1,'Бутылка воды':1},out:'Приготовленные пельмени',count:1,station:'stove'},
  {name:'Жареное мясо',icon:'🍖',cost:{'Свиной фарш':1,'Соль':1},out:'Жареное мясо',count:1,station:'stove'},
  {name:'Чистая вода',icon:'💧',cost:{'Сырая вода':1},out:'Чистая вода',count:1,station:'stove'},
  {name:'Тканевая повязка',icon:'🩹',cost:{'Ткань':1},out:'Бинт',count:1},
  {name:'Доски',icon:'🪵',cost:{'Древесина':2},out:'Доска',count:2}
);

state.wetness = 0;
state.temperature = 12;
state.weather = 'clear';
state.effects = { cold:0, poison:0, bandage:0, fatigue:0 };
state.currentStation = null;
state.activeStorage = null;
state.lastAutoSave = 0;
state.player.equipment = { coat:false, hat:false, socks:false, raincoat:false };
state.player.wetness = 0;
state.player.stamina = 100;

function loadSettings() {
  try {
    const stored = JSON.parse(localStorage.getItem('quiet-dream-settings') || '{}');
    state.settings = { ...state.settings, ...stored };
  } catch {}
}
function persistSettings() {
  try { localStorage.setItem('quiet-dream-settings', JSON.stringify(state.settings)); } catch { toast('Не удалось сохранить настройки браузера'); }
}
function ensurePlayerSystems() {
  const p = state.player;
  p.equipment ||= { coat:false, hat:false, socks:false, raincoat:false };
  p.wetness = Number.isFinite(p.wetness) ? p.wetness : 0;
  p.stamina = Number.isFinite(p.stamina) ? p.stamina : 100;
  p.hp = clamp(Number.isFinite(Number(p.hp)) ? Number(p.hp) : 100, 0, 100);
  p.hunger = clamp(Number.isFinite(Number(p.hunger)) ? Number(p.hunger) : 100, 0, 100);
  p.thirst = clamp(Number.isFinite(Number(p.thirst)) ? Number(p.thirst) : 100, 0, 100);
  state.effects ||= { cold:0, poison:0, bandage:0, fatigue:0 };
}


function buildLandmarks() {
  if(!scene)return;
  const waterMat=new THREE.MeshPhysicalMaterial({color:0x4b6661,roughness:.22,metalness:.12,transparent:true,opacity:.74,clearcoat:.7,clearcoatRoughness:.16,side:THREE.DoubleSide});
  // A small pond set into the terrain with a natural, uneven shoreline.
  const pondX=-24,pondZ=-18,pondY=terrainHeight(pondX,pondZ)-.025;
  const pond=new THREE.Mesh(new THREE.CircleGeometry(5.1,48),waterMat);pond.rotation.x=-Math.PI/2;pond.position.set(pondX,pondY,pondZ);pond.scale.set(1,.73,1);pond.name='pond';scene.add(pond);
  const bankMat=material(0x5a4d37,.98);
  for(let i=0;i<34;i++){const a=i/34*Math.PI*2;const r=rand(4.9,5.8);const rock=new THREE.Mesh(new THREE.DodecahedronGeometry(rand(.16,.34),1),bankMat);rock.position.set(pondX+Math.cos(a)*r,terrainHeight(pondX+Math.cos(a)*r,pondZ+Math.sin(a)*r)+.06,pondZ+Math.sin(a)*r);rock.scale.set(1,.55,rand(.8,1.4));rock.castShadow=true;scene.add(rock);}
  // Winding shallow creek in the eastern part of the forest.
  const curve=new THREE.CatmullRomCurve3([
    new THREE.Vector3(15,0,-28),new THREE.Vector3(18,0,-17),new THREE.Vector3(14,0,-7),
    new THREE.Vector3(19,0,3),new THREE.Vector3(17,0,15),new THREE.Vector3(23,0,28)
  ]);
  const vertices=[],indices=[],segments=65;
  for(let i=0;i<=segments;i++){
    const t=i/segments,pt=curve.getPoint(t),tangent=curve.getTangent(t),side=new THREE.Vector3(-tangent.z,0,tangent.x).normalize();
    const width=1.05+Math.sin(t*Math.PI*5)*.18,y=terrainHeight(pt.x,pt.z)-.045;
    vertices.push(pt.x+side.x*width,y,pt.z+side.z*width,pt.x-side.x*width,y,pt.z-side.z*width);
    if(i<segments){const a=i*2;indices.push(a,a+1,a+2,a+1,a+3,a+2);}
  }
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));geo.setIndex(indices);geo.computeVertexNormals();
  const creek=new THREE.Mesh(geo,waterMat);creek.name='creek';scene.add(creek);
  // Remains of an abandoned resting spot, serving as a visible landmark.
  const camp=new THREE.Group();camp.position.set(9,terrainHeight(9,34),34);
  const logMat=new THREE.MeshStandardMaterial({color:0x57402e,map:barkTex,roughness:1});
  for(let i=0;i<3;i++){const log=new THREE.Mesh(new THREE.CylinderGeometry(.14,.17,2.5,9),logMat);log.rotation.z=Math.PI/2;log.rotation.y=i*.4;log.position.set((i-1)*.4,.2,0);log.castShadow=true;camp.add(log);}
  const coldFire=new THREE.Mesh(new THREE.CylinderGeometry(.48,.55,.12,12),bankMat);coldFire.position.y=.08;camp.add(coldFire);
  const blackAsh=new THREE.Mesh(new THREE.CircleGeometry(.35,16),material(0x282823,1));blackAsh.rotation.x=-Math.PI/2;blackAsh.position.y=.15;camp.add(blackAsh);
  scene.add(camp);
}

function createWeatherFX() {
  if (!scene || weatherPoints) return;
  const count = 900;
  weatherPositions = new Float32Array(count * 3);
  weatherVelocities = new Float32Array(count);
  for (let i=0;i<count;i++) {
    weatherPositions[i*3] = rand(-34,34);
    weatherPositions[i*3+1] = rand(-3,28);
    weatherPositions[i*3+2] = rand(-34,34);
    weatherVelocities[i] = rand(9,16);
  }
  weatherGeometry = new THREE.BufferGeometry();
  weatherGeometry.setAttribute('position', new THREE.BufferAttribute(weatherPositions,3));
  const weatherMaterial = new THREE.PointsMaterial({ color:0xc8d2cc, size:.055, transparent:true, opacity:.46, depthWrite:false, sizeAttenuation:true });
  weatherPoints = new THREE.Points(weatherGeometry,weatherMaterial);
  weatherPoints.visible = false;
  scene.add(weatherPoints);
  weatherFlashLight = new THREE.PointLight(0xdce6ff,0,125,2);
  weatherFlashLight.position.set(0,28,0);
  scene.add(weatherFlashLight);
}
function setWeather(next) {
  weatherState.current = next;
  state.weather = next;
  weatherState.timer = rand(85,160);
  if (weatherPoints) {
    weatherPoints.visible = next === 'rain' || next === 'storm';
    weatherPoints.material.color.setHex(next === 'storm' ? 0xaebbc5 : 0xc8d2cc);
    weatherPoints.material.opacity = next === 'storm' ? .62 : .4;
  }
  toast(`Погода: ${WEATHER_LABELS[next].toLowerCase()}`);
}
function updateWeather(delta, sunHeight, night) {
  weatherState.timer -= delta;
  if (weatherState.timer <= 0) {
    const pool = ['clear','clouds','rain','fog','storm'];
    const weights = [24,25,24,17,10];
    let roll = Math.random()*weights.reduce((a,b)=>a+b,0), pick = 'clear';
    for(let i=0;i<pool.length;i++){roll-=weights[i];if(roll<=0){pick=pool[i];break;}}
    setWeather(pick);
  }
  const p = state.player;
  const rain = weatherState.current === 'rain' || weatherState.current === 'storm';
  if (rain && !p.equipment.raincoat) p.wetness = clamp(p.wetness + delta*(weatherState.current==='storm'?4.2:2.5),0,100);
  else p.wetness = clamp(p.wetness - delta*(weatherState.current==='clear'?1.35:.45),0,100);
  const near = (id, radius) => state.structures.some(o => o.userData.building===id && distance2({x:o.position.x,z:o.position.z},p)<radius);
  const nearFire = state.structures.some(o => o.userData.building==='campfire' && o.userData.lit && o.userData.fuel>0 && distance2({x:o.position.x,z:o.position.z},p)<7);
  const nearShelter = near('shelter',4.5) || near('tent',3.4);
  p.warmthBoost=Math.max(0,(p.warmthBoost||0)-delta);
  const warmth = (p.equipment.coat?6:0)+(p.equipment.hat?2:0)+(p.equipment.socks?2:0)+(p.equipment.raincoat?3:0)+(nearShelter?2:0)+(nearFire?9:0)+(p.warmthBoost||0)*.055;
  const base = 13 + sunHeight*5 + WEATHER_TEMPERATURE[weatherState.current] - night*2;
  state.temperature = Math.round((base + warmth - p.wetness*.085)*10)/10;
  if (state.temperature < 2) {
    const severity = (2-state.temperature) * (p.wetness>50 ? .025 : .012);
    p.stamina = clamp(p.stamina-delta*severity*5,0,100);
    state.effects.cold = clamp(state.effects.cold+delta*(p.wetness>50?.75:.4),0,100);
    if (state.effects.cold>55) damage(delta*.13,'Переохлаждение');
  } else state.effects.cold = clamp(state.effects.cold-delta*1.6,0,100);
  if (weatherPoints && weatherPoints.visible && camera) {
    const pos = weatherGeometry.attributes.position.array;
    for(let i=0;i<weatherVelocities.length;i++) {
      const j=i*3; pos[j+1]-=weatherVelocities[i]*delta;
      pos[j]+=delta*(weatherState.current==='storm'?2.5:1.1);
      if(pos[j+1]<-5){pos[j+1]=rand(12,30);pos[j]=rand(-32,32);pos[j+2]=rand(-32,32);}
      if(Math.abs(pos[j])>38)pos[j]=rand(-30,30);
      if(Math.abs(pos[j+2])>38)pos[j+2]=rand(-30,30);
    }
    weatherGeometry.attributes.position.needsUpdate = true;
    weatherPoints.position.set(camera.position.x,camera.position.y,camera.position.z);
  }
  if (weatherFlashLight) {
    if(weatherState.current==='storm') {
      weatherState.lightning -= delta;
      if(weatherState.lightning<=0 && Math.random()<.012) { weatherState.flash=rand(.12,.28);weatherState.lightning=rand(7,19); }
    } else weatherState.flash=0;
    weatherState.flash=Math.max(0,weatherState.flash-delta);
    weatherFlashLight.intensity=weatherState.flash>0?rand(2,5):0;
    weatherFlashLight.position.set(p.x+rand(-10,10),p.y+18,p.z+rand(-10,10));
  }
  for (const o of state.structures) {
    if(o.userData.building==='collector' && rain && o.userData.water<5) o.userData.water=clamp((o.userData.water||0)+delta*.06,0,5);
    if(o.userData.building==='campfire' && o.userData.lit && o.userData.fuel>0) {
      o.userData.fuel=Math.max(0,o.userData.fuel-delta);
      const fire=o.getObjectByName('fireGlow'); if(fire)fire.intensity=1.5+Math.sin(state.clock*9)*.24;
      if(o.userData.fuel<=0){o.userData.lit=false;toast('Костёр погас');}
    }
  }
}

function makeLootMesh(name,x,z,freshness=100) {
  const g = makeLootMeshBase(name,x,z);
  g.userData.freshness = freshness;
  // Add recognisable silhouettes to important utility props rather than using one generic lump.
  const woodMat = material(0x765235,.92);
  const ironMat = material(0x6e7771,.34,{metalness:.62});
  const addMesh = (geo,mat,pos,rot) => {const m=new THREE.Mesh(geo,mat);m.position.set(...pos);if(rot)m.rotation.set(...rot);m.castShadow=true;m.receiveShadow=true;g.add(m);return m;};
  if(name==='Топор'||name==='Лопата'||name==='Молоток'||name==='Кувалда') {
    addMesh(new THREE.CylinderGeometry(.025,.035,.52,8),woodMat,[0,.28,0],[0,0,.12]);
    if(name==='Топор') addMesh(new THREE.BoxGeometry(.25,.14,.09),ironMat,[.11,.52,0],[0,0,-.2]);
    else if(name==='Лопата') addMesh(new THREE.BoxGeometry(.12,.22,.035),ironMat,[0,.02,0],[0,0,-.12]);
    else addMesh(new THREE.BoxGeometry(.2,.11,.13),ironMat,[0,.53,0]);
  } else if(name==='Молоток') {
    addMesh(new THREE.CylinderGeometry(.024,.03,.42,8),woodMat,[0,.28,0]);addMesh(new THREE.BoxGeometry(.23,.1,.1),ironMat,[0,.5,0]);
  } else if(name==='Керосиновая лампа'||name==='Свеча') {
    addMesh(new THREE.CylinderGeometry(.12,.16,.16,12),material(0x796a4b,.65),[0,.12,0]);
    addMesh(new THREE.CylinderGeometry(.045,.055,.28,10),material(0xb4aa8b,.25,{transparent:true,opacity:.55}),[0,.32,0]);
    addMesh(new THREE.SphereGeometry(.035,8,8),new THREE.MeshBasicMaterial({color:0xffbd68}),[0,.5,0]);
  } else if(name==='Палатка') {
    const tent=addMesh(new THREE.ConeGeometry(.38,.5,3),material(0x64704e,.95,{side:THREE.DoubleSide}),[0,.22,0]);tent.rotation.y=Math.PI/4;
  } else if(name==='Блокнот'||name==='Дневник'||name==='Тетрадь в клетку') {
    addMesh(new THREE.BoxGeometry(.34,.045,.25),material(0x765342,.95),[0,.13,0]);
    addMesh(new THREE.BoxGeometry(.3,.012,.22),material(0xd0c9af,.95),[0,.158,.005]);
  } else if(name==='Спички'||name==='Запасные батарейки') {
    addMesh(new THREE.BoxGeometry(.29,.16,.2),material(name==='Спички'?0x8b5038:0x56615b,.8),[0,.13,0]);
  }
  return g;
}

function buildModel(id, transparent=false) {
  if (!['campfire','dryingRack','woodRack'].includes(id)) {
    const obj = buildModelBase(id,transparent);
    if(id==='lantern'&&!transparent){
      const bulb = new THREE.PointLight(0xffcb7d,1.35,13,2);bulb.position.set(0,2.25,0);bulb.name='builtLight';obj.add(bulb);
    }
    return obj;
  }
  const g=new THREE.Group();
  const wood=material(0x745235,.94,{transparent,opacity:transparent?.42:1});
  const stone=material(0x66665b,.98,{transparent,opacity:transparent?.45:1});
  if(id==='campfire'){
    for(let i=0;i<9;i++){const a=i/9*Math.PI*2;const rock=new THREE.Mesh(new THREE.DodecahedronGeometry(.24,1),stone);rock.position.set(Math.cos(a)*.62,.13,Math.sin(a)*.62);rock.scale.set(1,.7,1);g.add(rock);}
    for(let i=0;i<3;i++){const log=new THREE.Mesh(new THREE.CylinderGeometry(.09,.11,.95,8),wood);log.rotation.z=Math.PI/2;log.rotation.y=i*Math.PI/3;log.position.y=.22+i*.025;g.add(log);}
    if(!transparent){
      const flameMat=new THREE.MeshBasicMaterial({color:0xff9d42,transparent:true,opacity:.78});
      for(let i=0;i<3;i++){const flame=new THREE.Mesh(new THREE.ConeGeometry(.16+rand(0,.07),.65+rand(0,.25),7),flameMat.clone());flame.position.set(rand(-.13,.13),.58,rand(-.12,.12));flame.name='flame';g.add(flame);}
      const glow=new THREE.PointLight(0xff963d,1.8,9,2);glow.position.y=.8;glow.name='fireGlow';g.add(glow);
    }
  }
  if(id==='dryingRack'){
    for(const x of [-.85,.85]){const post=new THREE.Mesh(new THREE.CylinderGeometry(.055,.075,1.8,8),wood);post.position.set(x,.9,0);g.add(post);}
    const beam=new THREE.Mesh(new THREE.CylinderGeometry(.045,.045,1.9,8),wood);beam.rotation.z=Math.PI/2;beam.position.y=1.65;g.add(beam);
    for(let i=0;i<3;i++){const cloth=new THREE.Mesh(new THREE.BoxGeometry(.36,.5,.035),material([0x8f927d,0x9b755c,0x697b75][i],.9,{transparent,opacity:transparent?.45:.9}));cloth.position.set(-.48+i*.48,1.32,.02);g.add(cloth);}
  }
  if(id==='woodRack'){
    for(const x of [-.7,.7])for(const z of [-.28,.28]){const post=new THREE.Mesh(new THREE.BoxGeometry(.12,1,.12),wood);post.position.set(x,.5,z);g.add(post);}
    for(let i=0;i<4;i++){const log=new THREE.Mesh(new THREE.CylinderGeometry(.095,.11,1.55,8),wood);log.rotation.z=Math.PI/2;log.position.set(0,.2+i*.19,0);g.add(log);}
  }
  if(transparent)g.traverse(o=>{if(o.material){o.material.transparent=true;o.material.opacity=.4;o.material.depthWrite=false;}});
  g.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});
  return g;
}

function addItem(name,count=1,freshness=100) {
  const info=itemInfo(name);
  const existing=state.inventory.find(x=>x.name===name&&info.stack);
  if(existing){
    const oldCount=existing.count||1;existing.freshness=typeof existing.freshness==='number'?((existing.freshness*oldCount+freshness*count)/(oldCount+count)):freshness;existing.count+=count;
  } else state.inventory.push({name,count,freshness});
  renderInventory();updateQuickbar();
}
function selectItem(name) {
  state.selectedItem=name;
  const item=itemInfo(name), stack=state.inventory.find(x=>x.name===name), detail=$('#item-details');
  const freshness = item.perishable ? `<div class="item-meta">Свежесть: ${Math.round(stack?.freshness??100)}%</div><div class="item-freshness"><i style="width:${clamp(stack?.freshness??100,0,100)}%"></i></div>` : '';
  const equip = item.wearable ? '<button id="equip-selected">Экипировать / снять</button>' : '';
  const canUse = item.usable || item.category==='food' || item.category==='drink' || ['Активированный уголь','Антидот','Успокоительное'].includes(name);
  detail.innerHTML=`<strong>${item.icon} ${name}</strong>${item.description}<div class="item-meta">Количество: ${stack?.count||0}</div>${freshness}<div class="item-actions">${canUse?'<button id="use-selected">Использовать</button>':''}${equip}<button id="assign-selected">В быстрый слот</button><button id="drop-selected">Выбросить</button></div>`;
  $('#use-selected')?.addEventListener('click',()=>useItem(name));
  $('#equip-selected')?.addEventListener('click',()=>useItem(name));
  $('#assign-selected').onclick=()=>{const free=state.quick.findIndex(x=>!x);const slot=free>=0?free:state.selectedSlot;state.quick[slot]=name;updateQuickbar();toast(`Слот ${slot+1}: ${name}`);};
  $('#drop-selected').onclick=()=>{if(removeItem(name,stack?.count||1)){spawnLootNearPlayer(name);toast(`Оставлено: ${name}`);state.selectedItem=null;renderInventory();}};
  renderInventorySelection();
}
function renderInventory() {
  const grid=$('#inventory-grid');if(!grid)return;
  const query=($('#inventory-search')?.value||'').trim().toLocaleLowerCase('ru');
  const category=$('#inventory-category')?.value||'all';
  const sort=$('#inventory-sort')?.value||'default';
  const visible=filterInventory(state.inventory,{query,category,sort},itemInfo);
  const total=Math.max(20,Math.ceil(visible.length/5)*5);
  $('#capacity-label').textContent=`${state.inventory.length} предметов · ${Math.max(20,Math.ceil(state.inventory.length/5)*5)} ячеек`;
  $('#inventory-filter-meta').textContent=query||category!=='all'?`Найдено: ${visible.length}`:`Показаны все предметы · ${visible.length}`;
  grid.innerHTML=visible.length?Array.from({length:Math.max(20,Math.ceil(visible.length/5)*5)},(_,i)=>{
    const it=visible[i];if(!it)return '<div class="inventory-slot empty"></div>';
    const inf=itemInfo(it.name);const quality=inf.perishable?`<div class="item-freshness"><i style="width:${clamp(it.freshness??100,0,100)}%"></i></div>`:'';
    return `<div class="inventory-slot ${state.selectedItem===it.name?'selected':''}" data-item="${encodeURIComponent(it.name)}" title="${it.name}"><span class="item-count">${it.count>1?it.count:''}</span><span class="item-icon">${inf.icon}</span><span class="item-name">${it.name}</span>${quality}</div>`;
  }).join(''):`<div class="inventory-empty"><span>⌕</span><b>Ничего не найдено</b><small>Измени запрос или выбери другую категорию</small></div>`;
  $$('.inventory-slot[data-item]').forEach(el=>el.addEventListener('click',()=>selectItem(decodeURIComponent(el.dataset.item))));
  renderCraftRecipes();
}
function renderCraftRecipes() {
  const available=RECIPES.map((r,index)=>({r,index})).filter(({r})=>{
    if(!r.station)return true;
    const station=r.station;
    return state.structures.some(o=>{
      const id=o.userData.building;
      return (station==='workbench'&&id==='workbench'||station==='stove'&&(id==='stove'||id==='campfire'))&&distance2({x:o.position.x,z:o.position.z},state.player)<5;
    });
  });
  $('#craft-recipes').innerHTML=available.map(({r,index})=>`<button class="craft-recipe" data-recipe="${index}" ${hasItems(r.cost)?'':'disabled'}><span>${r.icon}</span><span>${r.name}<br><small>${formatCost(r.cost)}</small></span></button>`).join('')||'<span class="camp-empty">Нет доступных рецептов</span>';
  $$('.craft-recipe').forEach(b=>b.onclick=()=>craft(Number(b.dataset.recipe)));
}
function craft(index) {
  const r=RECIPES[index];if(!r)return;
  if(r.station){const nearby=state.structures.some(o=>{
    const id=o.userData.building;return (r.station==='workbench'&&id==='workbench'||r.station==='stove'&&(id==='stove'||id==='campfire'))&&distance2({x:o.position.x,z:o.position.z},state.player)<5;
  });if(!nearby){toast('Нужна подходящая рабочая станция');return;}}
  if(!hasItems(r.cost)){toast('Не хватает материалов');return;}
  consumeCost(r.cost);addItem(r.out,r.count);toast(`Создано: ${r.name}`);renderInventory();
}
function applyConsumable(name,info) {
  const p=state.player;const entry=state.inventory.find(x=>x.name===name);const freshness=entry?.freshness??100;
  if(info.wearable){const slot=info.wearable;p.equipment[slot]=!p.equipment[slot];toast(p.equipment[slot]?`${name}: экипировано`:`${name}: снято`);updateHud(true);return;}
  if(info.category==='drink'||info.usable==='drink') {
    p.thirst=clamp(p.thirst+(info.thirst||24),0,100);
    if(info.warmth)p.warmthBoost=Math.max(p.warmthBoost||0,info.warmth*18);
  } else if(info.category==='food') {
    if(info.spoiled || info.perishable&&freshness<20) {
      p.hunger=clamp(p.hunger+Math.min(3,info.hunger||0),0,100);
      state.effects.poison=clamp(state.effects.poison+35,0,100);
      state.fear=clamp(state.fear+4,0,100);toast('Самочувствие ухудшилось');
    } else {
      p.hunger=clamp(p.hunger+(info.hunger??12),0,100);p.thirst=clamp(p.thirst+(info.thirst||0),0,100);
      if(info.warmth)p.warmthBoost=Math.max(p.warmthBoost||0,info.warmth*18);
    }
  } else if(info.usable==='heal') {
    p.hp=clamp(p.hp+(info.heal||12),0,100);
    state.effects.bandage=Math.max(state.effects.bandage,info.heal>=18?95:45);
  } else if(name==='Активированный уголь'||name==='Антидот') {
    state.effects.poison=clamp(state.effects.poison-(name==='Антидот'?75:35),0,100);toast('Состояние немного улучшилось');
  } else if(name==='Успокоительное') {
    state.fear=clamp(state.fear-28,0,100);state.effects.fatigue=clamp(state.effects.fatigue+8,0,100);
  }
  removeItem(name,1);updateHud(true);
}
function playEatAnimation(name,info) {
  if(state.consuming||!handGroup)return;state.consuming=true;
  const mesh=new THREE.Group();const mat=material(info.category==='drink'?0x8da9a4:0x9b805a,.6);
  const body=new THREE.Mesh(info.category==='drink'?new THREE.CylinderGeometry(.07,.09,.24,10):new THREE.BoxGeometry(.2,.14,.13),mat);mesh.add(body);
  mesh.position.set(.48,-.42,-.72);mesh.rotation.z=-.3;handGroup.add(mesh);
  const start=performance.now(),from=mesh.position.clone();
  function frame(now){
    const t=clamp((now-start)/1350,0,1);mesh.position.lerpVectors(from,new THREE.Vector3(.2,-.17,-.48),Math.min(1,t*1.4));mesh.rotation.x=t*1.2;
    const portion=t<.45?1:t<.7?1-(t-.45)*.8:Math.max(.08,.8-(t-.7)*2.4);mesh.scale.setScalar(portion);
    if(t<1)requestAnimationFrame(frame);else{handGroup.remove(mesh);applyConsumable(name,info);state.consuming=false;toast(name+' использовано');}
  }
  requestAnimationFrame(frame);
}
function useItem(name) {
  const info=itemInfo(name);const entry=state.inventory.find(x=>x.name===name);if(!entry)return;
  if(info.wearable){applyConsumable(name,info);return;}
  if(info.category==='food'||info.category==='drink'||info.usable==='drink'||info.usable==='heal'||name==='Активированный уголь'||name==='Антидот'||name==='Успокоительное')playEatAnimation(name,info);
  else toast('Этот предмет пока нельзя применить');
}

function renderStorage() {
  if(!state.activeStorage)return;
  const storage=state.activeStorage.userData.storage||(state.activeStorage.userData.storage=[]);
  const inv=$('#camp-inventory'),stored=$('#camp-stored-items');
  const isRack=state.activeStorage.userData.building==='woodRack';
  const allowed=it=>!isRack||['Сухие дрова','Древесина'].includes(it.name);
  const visibleInventory=state.inventory.filter(allowed);
  const row=(it,action,label)=>`<div class="camp-item"><span>${itemInfo(it.name).icon} ${it.name} ×${it.count}</span><button data-${action}="${encodeURIComponent(it.name)}">${label}</button></div>`;
  inv.innerHTML=visibleInventory.length?visibleInventory.map(it=>row(it,'store',isRack?'В поленницу':'В сундук')).join(''):'<div class="camp-empty">'+(isRack?'Нет древесины или дров':'Рюкзак пуст')+'</div>';
  stored.innerHTML=storage.length?storage.map(it=>row(it,'take','Забрать')).join(''):'<div class="camp-empty">Пока пусто</div>';
  $$('#camp-inventory [data-store]').forEach(b=>b.onclick=()=>{
    const name=decodeURIComponent(b.dataset.store),it=state.inventory.find(x=>x.name===name);if(!it||!allowed(it))return;
    const existing=storage.find(x=>x.name===name);if(existing){existing.count+=it.count;if(typeof it.freshness==='number')existing.freshness=Math.min(existing.freshness,it.freshness);}else storage.push({...it});removeItem(name,it.count);renderStorage();
  });
  $$('#camp-stored-items [data-take]').forEach(b=>b.onclick=()=>{
    const name=decodeURIComponent(b.dataset.take),idx=storage.findIndex(x=>x.name===name);if(idx<0)return;
    const it=storage.splice(idx,1)[0];addItem(it.name,it.count,it.freshness??100);renderStorage();
  });
}
function campAction(action) {
  const obj=activeCamp;if(!obj)return;const id=obj.userData.building;
  if(action==='close'){closeOverlays();requestPointerLock();return;}
  if(action==='rest'){
    const p=state.player;p.hp=clamp(p.hp+8,0,100);p.stamina=100;p.wetness=clamp(p.wetness-25,0,100);state.effects.fatigue=clamp(state.effects.fatigue-28,0,100);state.fear=clamp(state.fear-10,0,100);state.dayTime=(state.dayTime+1/24)%1;p.hunger=clamp(p.hunger-2,0,100);p.thirst=clamp(p.thirst-3,0,100);toast('Ты отдохнул около часа');updateHud(true);return;
  }
  if(action==='sleep'){
    const angle=state.dayTime*Math.PI*2-Math.PI/2;const sunHeight=Math.sin(angle);const remaining=(sunHeight>0?1-state.dayTime:((.25-state.dayTime+1)%1));const hours=Math.max(1,remaining*24);
    state.dayTime=(state.dayTime+remaining)%1;state.player.hp=clamp(state.player.hp+18,0,100);state.player.stamina=100;state.player.wetness=clamp(state.player.wetness-55,0,100);state.player.hunger=clamp(state.player.hunger-hours*.9,0,100);state.player.thirst=clamp(state.player.thirst-hours*1.1,0,100);state.effects.fatigue=clamp(state.effects.fatigue-55,0,100);state.fear=clamp(state.fear-28,0,100);state.nextNightmare=Math.max(state.nextNightmare,65);toast('Ты проснулся после отдыха');updateHud(true);return;
  }
  if(action==='light'){
    if(obj.userData.fuel<=0){toast('Нет топлива. Добавь сухие дрова.');return;}
    obj.userData.lit=!obj.userData.lit;const glow=obj.getObjectByName('fireGlow');if(glow)glow.intensity=obj.userData.lit?1.8:0;obj.traverse(o=>{if(o.name==='flame')o.visible=obj.userData.lit;});toast(obj.userData.lit?'Костёр разожжён':'Костёр потушен');return;
  }
  if(action==='fuel'){
    if(!removeItem('Сухие дрова',1)&&!removeItem('Древесина',1)){toast('Нужны дрова или древесина');return;}
    obj.userData.fuel=clamp((obj.userData.fuel||0)+150,0,600);obj.userData.lit=true;const glow=obj.getObjectByName('fireGlow');if(glow)glow.intensity=1.8;obj.traverse(o=>{if(o.name==='flame')o.visible=true;});toast('В костёр добавлено топливо');renderInventory();return;
  }
  if(action==='collect'){
    const amount=Math.floor(obj.userData.water||0);if(amount<1){toast(weatherState.current==='rain'||weatherState.current==='storm'?'Вода ещё собирается':'Дождись дождя');return;}
    obj.userData.water-=amount;addItem('Сырая вода',amount);renderCampPanel(obj);toast(`Собрано воды: ${amount}`);return;
  }
  if(action==='cook'){
    activeStation=id==='workbench'?'workbench':'stove';
    $('#camp-description').textContent='Выбери рецепт. Приготовленная пища лучше насыщает.';
    const recipes=RECIPES.map((r,index)=>({r,index})).filter(x=>!x.r.station||id==='workbench'&&x.r.station==='workbench'||id!=='workbench'&&x.r.station==='stove');
    $('#camp-actions').innerHTML=recipes.map(({r,index})=>`<button class="camp-action" data-camp-craft="${index}" ${hasItems(r.cost)?'':'disabled'}><b>${r.icon} ${r.name}</b><small>${formatCost(r.cost)} → ${r.out}</small></button>`).join('');
    $$('#camp-actions [data-camp-craft]').forEach(b=>b.onclick=()=>{craft(Number(b.dataset.campCraft));renderCampPanel(obj);});return;
  }
}
function renderCampPanel(obj) {
  activeCamp=obj;state.activeStorage=['storage','woodRack'].includes(obj.userData.building)?obj:null;state.currentStation=obj.userData.building;
  const id=obj.userData.building;const title=BUILDINGS.find(b=>b.id===id)?.name||'Лагерь';
  $('#camp-eyebrow').textContent=id==='storage'?'ХРАНИЛИЩЕ':id==='woodRack'?'ПОЛЕННИЦА':'ЛАГЕРЬ';$('#camp-title').textContent=title;
  $('#camp-storage').classList.toggle('hidden',!['storage','woodRack'].includes(id));
  $('#camp-storage .camp-column:first-child h3').textContent=id==='woodRack'?'Древесина в рюкзаке':'Рюкзак';
  $('#camp-storage .camp-column:last-child h3').textContent=id==='woodRack'?'Запас топлива':'Хранилище';
  let desc='';let actions=[];
  if(id==='storage'||id==='woodRack'){
    desc=id==='woodRack'?'Поленница хранит древесину и сухие дрова отдельно от рюкзака.':'Переноси предметы между рюкзаком и сундуком. Содержимое сохраняется вместе с миром.';renderStorage();
  } else if(id==='bed'||id==='tent'||id==='shelter'){
    desc='Отдых восстанавливает силы. Сон ускоряет время, но потребляет припасы.';
    actions=[['rest','Отдохнуть час','Небольшое восстановление здоровья и сил.'],['sleep','Спать до рассвета','Восстановить силы и переждать тёмное время.']];
  } else if(id==='campfire') {
    desc=`Топливо: ${Math.ceil(obj.userData.fuel||0)} сек. Костёр согревает, сушит одежду и отпугивает часть кошмаров.`;
    actions=[['light',obj.userData.lit?'Потушить костёр':'Разжечь костёр','Переключить пламя.'],['fuel','Добавить дрова','Продлить горение на 150 секунд.'],['cook','Приготовить еду','Открыть рецепты походной кухни.']];
  } else if(id==='stove') {
    desc='Походная кухня позволяет готовить горячую пищу и напитки.';actions=[['cook','Открыть рецепты','Приготовление блюд из найденных продуктов.']];
  } else if(id==='workbench') {
    desc='Верстак позволяет создавать более сложные предметы.';actions=[['cook','Открыть рецепты','Ремонтные и полезные рецепты.']];
  } else if(id==='collector') {
    desc=`В резервуаре: ${(obj.userData.water||0).toFixed(1)} / 5 порций. Во время дождя вода собирается автоматически.`;actions=[['collect','Забрать воду','Собранная вода попадёт в рюкзак.']];
  } else if(id==='dryingRack') {
    desc='Сушилка помогает высушить одежду и уменьшить влажность.';actions=[['dry','Просушиться','Снизить влажность одежды.']];
  } else {
    desc='Постройка лагеря. Она сохраняет своё положение в сохранении.';
  }
  $('#camp-description').textContent=desc;
  $('#camp-actions').innerHTML=actions.map(([a,t,d])=>`<button class="camp-action" data-camp-action="${a}"><b>${t}</b><small>${d}</small></button>`).join('');
  $$('#camp-actions [data-camp-action]').forEach(b=>b.onclick=()=>{
    if(b.dataset.campAction==='dry'){state.player.wetness=clamp(state.player.wetness-55,0,100);state.effects.cold=clamp(state.effects.cold-25,0,100);toast('Одежда немного просохла');updateHud(true);return;}
    campAction(b.dataset.campAction);
  });
}
function openCampPanel(obj) {
  state.uiOpen=true;if(document.pointerLockElement)document.exitPointerLock();$('#camp-panel').classList.remove('hidden');renderCampPanel(obj);
}
function interact() {
  if(state.buildMode)return;
  raycaster.setFromCamera(pointer,camera);
  const hits=raycaster.intersectObjects([...state.objects,...state.structures],true).filter(h=>h.distance<4.6);
  let root=hits[0]?.object;while(root&&root.parent&&!root.userData.kind)root=root.parent;
  if(root?.userData.kind==='loot'){
    const name=root.userData.name;addItem(name,1,root.userData.freshness??rand(60,100));pickupAnimation();scene.remove(root);state.objects=state.objects.filter(o=>o!==root);lootMeshes=lootMeshes.filter(o=>o!==root);toast(`Найдено: ${name}`);return;
  }
  if(root?.userData.kind==='building'){
    const id=root.userData.building;
    if(['storage','workbench','stove','bed','tent','shelter','collector','campfire','dryingRack','woodRack'].includes(id)){openCampPanel(root);return;}
    toast(root.userData.name||'Постройка');return;
  }
  toast('Здесь ничего нет');
}
function openOverlay(id){['#inventory-panel','#map-panel','#build-panel','#camp-panel'].forEach(other=>{if(other!==id)$(other)?.classList.add('hidden');});state.uiOpen=true;$(id).classList.remove('hidden');if(document.pointerLockElement)document.exitPointerLock();}
function closeOverlays(){['#inventory-panel','#map-panel','#build-panel','#save-screen','#settings-screen','#camp-panel'].forEach(id=>$(id)?.classList.add('hidden'));state.uiOpen=false;activeCamp=null;state.activeStorage=null;state.currentStation=null;}

function placeBuild() {
  if(!state.buildMode)return;
  const b=BUILDINGS.find(x=>x.id===state.buildMode);if(!b)return;
  if(!hasItems(b.cost)){toast('Не хватает материалов');cancelBuild();return;}
  const pos=currentBuildPosition();consumeCost(b.cost);
  const obj=buildModel(b.id,false);obj.position.set(pos.x,terrainHeight(pos.x,pos.z),pos.z);obj.rotation.y=state.yaw;
  obj.userData={kind:'building',building:b.id,name:b.name,storage:[],water:0,fuel:b.id==='campfire'?180:0,lit:b.id==='campfire'};
  scene.add(obj);state.structures.push(obj);state.buildMode=null;
  if(state.buildPreview){scene.remove(state.buildPreview);state.buildPreview=null;}
  toast(`${b.name} построено`);renderInventory();
}
function nearSafeLight(){
  const p=state.player;
  return state.structures.some(o=>{
    const id=o.userData.building,r=id==='lantern'?8:id==='campfire'&&o.userData.lit&&o.userData.fuel>0?7:(id==='shelter'||id==='tent'?3.5:0);
    return r>0&&distance2({x:o.position.x,z:o.position.z},p)<r;
  });
}
function updateHud(force=false) {
  ensurePlayerSystems();const p=state.player;
  $('#hp-value').textContent=Math.round(p.hp);$('#hunger-fill').style.width=`${p.hunger}%`;$('#thirst-fill').style.width=`${p.thirst}%`;
  $('#stamina-fill').style.width=`${p.stamina}%`;$('#weather-label').textContent=WEATHER_LABELS[weatherState.current]||'ЯСНО';
  $('#temperature-label').textContent=`${state.temperature.toFixed(1)}°C`;$('#wetness-label').textContent=p.wetness>65?'Промок':p.wetness>25?'Влажно':'Сухо';
  const dayHour=Math.floor(state.dayTime*24),minutes=Math.floor((state.dayTime*24-dayHour)*60);$('#clock-label').textContent=`${String(dayHour).padStart(2,'0')}:${String(minutes).padStart(2,'0')}`;
  const bpm=Math.round(65+(100-p.hp)*.9+(100-p.thirst)*.14+(100-p.hunger)*.09+(state.currentNightmare?18:0)+state.fear*.12+(state.temperature<0?8:0));
  $('#bpm').textContent=`${bpm} BPM`;$('#heart').style.animationDuration=`${clamp(60/bpm,.35,1.2)}s`;$('#ecg polyline').style.animationDuration=`${clamp(4-bpm/55,.45,2.3)}s`;
  $('#health-panel').style.borderLeftColor=p.hp<30?'#d04f48':'rgba(188,93,81,.75)';
  const effects=[];
  if(p.hunger<35)effects.push(['🍂','Сильный голод','bad']);if(p.thirst<35)effects.push(['💧','Обезвоживание','bad']);if(p.hp<55)effects.push(['🩹','Ранение','bad']);
  if(p.stamina<25)effects.push(['⌁','Истощение выносливости','bad']);if(p.wetness>60)effects.push(['☔','Промокшая одежда','bad']);
  if(state.temperature<2)effects.push(['❄','Холод: риск переохлаждения','bad']);if(state.effects.poison>0)effects.push(['☣','Плохое самочувствие','bad']);
  if(state.effects.fatigue>30)effects.push(['◌','Усталость','bad']);if(state.fear>35)effects.push(['◌',`Страх: ${Math.round(state.fear)}%`,'bad']);
  if(state.currentNightmare)effects.push([state.currentNightmare.icon,`Кошмар: ${state.currentNightmare.name}`,'bad']);
  if(p.equipment.coat)effects.push(['🧥','Тёплая куртка','good']);if(p.hp>90&&p.hunger>50&&p.thirst>50)effects.push(['✚','Восстановление','good']);
  $('#status-effects').innerHTML=effects.map(e=>`<div class="effect-icon" data-tone="${e[2]}" data-tip="${e[1]}">${e[0]}</div>`).join('');
  const card=$('#nightmare-card');if(state.currentNightmare){card.classList.remove('hidden');$('#nightmare-name').textContent=state.currentNightmare.name;$('#nightmare-guide').textContent=state.currentNightmare.hint;$('#nightmare-time').textContent=`${Math.ceil(state.nightmare)}с`;$('#nightmare-progress').style.width=`${clamp(state.nightmare/state.currentNightmare.duration*100,0,100)}%`;card.dataset.kind=state.currentNightmare.kind;}else card.classList.add('hidden');
  const cold=$('#cold-overlay');if(cold)cold.style.opacity=String(clamp((4-state.temperature)/13,0,.32));
  drawMap($('#minimap'),true);
}

function serializeGame() {
  return {
    version:2,player:state.player,inventory:state.inventory,quick:state.quick,leftHandOn:state.leftHandOn,selectedSlot:state.selectedSlot,
    fear:state.fear,nightmareId:state.currentNightmare?.id||null,nightmareRemaining:state.nightmare,nextNightmare:state.nextNightmare,
    structures:state.structures.map(o=>({id:o.userData.building,x:o.position.x,z:o.position.z,rotation:o.rotation.y,storage:o.userData.storage||[],water:o.userData.water||0,fuel:o.userData.fuel||0,lit:!!o.userData.lit})),
    markers:state.markers,explored:[...state.explored],loot:state.objects.map(o=>({name:o.userData.name,x:o.position.x,z:o.position.z,freshness:o.userData.freshness??100})),
    yaw:state.yaw,pitch:state.pitch,dayTime:state.dayTime,clock:state.clock,weather:weatherState.current,weatherTimer:weatherState.timer,effects:state.effects,temperature:state.temperature
  };
}
function saveGame(slot,silent=false) {
  if(!state.active&&!silent){toast('Нет активной игры');return false;}
  try {
    saveRepository.write(slot,serializeGame());state.lastSave=state.clock;state.lastAutoSave=state.clock;
    if(!silent)toast(slot==='auto'?'Автосохранение записано':`Сохранение ${Number(slot)+1} записано`);
    return true;
  } catch(e) { if(!silent)toast('Не удалось сохранить: возможно, закончилось место');return false; }
}
function renderSaveList(allowSave=false) {
  const list=$('#save-list');
  const entries=[{id:'auto',title:'Автосохранение',key:'quiet-dream-autosave'},...[0,1,2].map(i=>({id:i,title:`Сохранение ${i+1}`,key:`${SAVE_PREFIX}${i}`}))];
  list.innerHTML=entries.map(entry=>{
    const data=saveRepository.read(entry.id);
    const note=data?`${data.player?.name||'Странник'} · HP ${Math.round(data.player?.hp||0)} · ${Math.floor((data.clock||0)/60)} мин.`:'Пусто';
    return `<div class="save-entry"><div><b>${entry.title}</b><small>${note}</small></div><div class="save-actions"><button data-load="${entry.id}" ${data?'':'disabled'}>Загрузить</button>${allowSave&&entry.id!=='auto'?`<button data-save="${entry.id}">Записать</button>`:''}</div></div>`;
  }).join('');
  $$('.save-entry [data-load]').forEach(b=>b.onclick=()=>loadGame(b.dataset.load==='auto'?'auto':Number(b.dataset.load)));
  $$('.save-entry [data-save]').forEach(b=>b.onclick=()=>{saveGame(Number(b.dataset.save));state.screenReturn='#pause-screen';showScreen('#pause-screen');});
}
function loadGame(slot) {
  try {
    const d=saveRepository.read(slot);if(!d)return;
    if(!d.player)throw new Error('Некорректное сохранение');
    if(!scene)initThree();else resetWorld();
    state.player=d.player;ensurePlayerSystems();state.inventory=d.inventory||[];state.quick=d.quick||[null,null,null];state.leftHandOn=!!d.leftHandOn;state.fear=d.fear||0;
    state.nextNightmare=d.nextNightmare||rand(85,145);state.selectedSlot=clamp(Number(d.selectedSlot)||0,0,2);state.markers=d.markers||[];state.yaw=d.yaw||0;state.pitch=d.pitch||0;
    state.objects.forEach(o=>scene.remove(o));state.objects=[];lootMeshes=[];(d.loot||[]).forEach(o=>makeLootMesh(o.name,o.x,o.z,o.freshness??100));
    state.explored=new Set(d.explored||[]);state.dayTime=Number.isFinite(d.dayTime)?d.dayTime:.6;state.clock=d.clock||0;state.effects={cold:0,poison:0,poisonTick:0,bandage:0,fatigue:0,...d.effects};
    state.structures.forEach(o=>scene.remove(o));state.structures=[];
    (d.structures||[]).forEach(s=>{const o=buildModel(s.id);o.position.set(s.x,terrainHeight(s.x,s.z),s.z);o.rotation.y=s.rotation||0;o.userData={kind:'building',building:s.id,name:BUILDINGS.find(b=>b.id===s.id)?.name,storage:s.storage||[],water:s.water||0,fuel:s.fuel||0,lit:!!s.lit};if(s.id==='campfire'&&!s.lit){const glow=o.getObjectByName('fireGlow');if(glow)glow.intensity=0;o.traverse(x=>{if(x.name==='flame')x.visible=false;});}scene.add(o);state.structures.push(o);});
    state.temperature=d.temperature??12;weatherState.current=d.weather||'clear';state.weather=weatherState.current;weatherState.timer=d.weatherTimer||90;setWeatherVisualOnly(weatherState.current);
    state.active=true;state.paused=false;state.uiOpen=false;state.keys={};if(d.nightmareId)startNightmare(d.nightmareId,true,d.nightmareRemaining);
    $('#hud').classList.remove('hidden');hideScreen('#save-screen');hideScreen('#main-menu');hideScreen('#pause-screen');camera.position.set(state.player.x,state.player.y,state.player.z);camera.rotation.set(state.pitch,state.yaw,0,'YXZ');makeHandMesh();updateQuickbar();renderInventory();updateHud(true);toast('Сохранение загружено');requestPointerLock();
  } catch(e) { console.error(e);toast('Не удалось загрузить сохранение'); }
}
function setWeatherVisualOnly(type) {
  if(!weatherPoints)return;weatherPoints.visible=type==='rain'||type==='storm';weatherPoints.material.opacity=type==='storm'?.62:.4;
}
function reviveAfterCollapse() {
  const p=state.player;let resting=null,best=1e9;
  for(const o of state.structures){if(['bed','tent','shelter'].includes(o.userData.building)){const d=distance2({x:o.position.x,z:o.position.z},p);if(d<best){best=d;resting=o;}}}
  if(resting){p.x=resting.position.x;p.z=resting.position.z;}else{p.x=0;p.z=0;}
  p.y=terrainHeight(p.x,p.z)+1.72;p.hp=35;p.hunger=clamp(p.hunger-12,0,100);p.thirst=clamp(p.thirst-16,0,100);p.stamina=65;p.wetness=clamp(p.wetness,0,65);
  state.effects={cold:0,poison:0,bandage:0,fatigue:15};state.fear=24;state.active=true;state.paused=false;state.nextNightmare=rand(90,140);
  camera.position.set(p.x,p.y,p.z);$('#pause-screen h2').textContent='Лес не спит';$('#resume-game').textContent='Продолжить';$('#hud').classList.remove('hidden');hideScreen('#pause-screen');requestPointerLock();toast(resting?'Ты очнулся возле своего укрытия':'Ты снова оказался на лесной поляне');
}
function damage(amount,reason) {
  if(amount<=0||!state.player)return;const p=state.player;p.hp=clamp(p.hp-amount,0,100);p.lastDamage=state.clock;
  if(amount>2){$('#damage-overlay').style.opacity='.56';clearTimeout(damage.flashTimer);damage.flashTimer=setTimeout(()=>$('#damage-overlay').style.opacity='.12',190);}
  if(p.hp<=0&&state.active){finishNightmare();state.active=false;state.paused=true;$('#hud').classList.add('hidden');if(document.pointerLockElement)document.exitPointerLock();setTimeout(()=>{showScreen('#pause-screen');$('#pause-screen h2').textContent='Сон оборвался';$('#resume-game').textContent='Вернуться в сон';},250);}
}

function updateWorld(delta) {
  if(!state.active||state.paused||state.uiOpen)return;
  ensurePlayerSystems();const p=state.player;
  let forward=(state.keys.KeyW?1:0)-(state.keys.KeyS?1:0),side=(state.keys.KeyD?1:0)-(state.keys.KeyA?1:0);
  const reversed=state.currentNightmare?.id==='reverseNorth'&&state.nightmare>state.currentNightmare.duration-7;if(reversed){forward*=-1;side*=-1;}
  const moving=forward!==0||side!==0;const wantsSprint=!!(state.keys.ShiftLeft||state.keys.ShiftRight);const sprint=wantsSprint&&moving&&p.stamina>3;
  const staminaFactor=p.stamina<=0?.58:1;
  const speed=(sprint?6.1:4.05)*staminaFactor*(p.stats?.Выносливость>=2?1.08:1)*(p.profile?.traits?.includes('Лёгкая походка')?1.06:1)*(state.currentNightmare?.id==='sleepDrop'?.58:1);
  if(moving){const len=Math.hypot(forward,side)||1;const f=forward/len,s=side/len;p.x+=(-Math.sin(state.yaw)*f+Math.cos(state.yaw)*s)*speed*delta;p.z+=(-Math.cos(state.yaw)*f-Math.sin(state.yaw)*s)*speed*delta;}
  p.x=clamp(p.x,-67,67);p.z=clamp(p.z,-67,67);
  // Soft tree collision keeps the player from walking through thick trunks.
  for(const tree of forest){const dx=p.x-tree.position.x,dz=p.z-tree.position.z,d=Math.hypot(dx,dz),r=.42*(tree.scale.x||1);if(d<r+.28&&d>.001){p.x=tree.position.x+dx/d*(r+.28);p.z=tree.position.z+dz/d*(r+.28);}}
  const floor=terrainHeight(p.x,p.z)+1.72;
  if(state.onGround&&floor<p.y-.48){state.onGround=false;state.velY=0;state.jumpStart=p.y;}
  if(!state.onGround){state.velY-=14*delta;p.y+=state.velY*delta;if(p.y<=floor){const drop=state.jumpStart-floor;p.y=floor;state.velY=0;state.onGround=true;if(drop>2.5)damage(clamp((drop-2.2)*5,5,35),'Падение');}}
  else p.y=floor;
  camera.position.set(p.x,p.y,p.z);camera.rotation.set(state.pitch,state.yaw,0,'YXZ');
  if(moving&&state.onGround){const sway=Math.sin(state.clock*(sprint?11:8))*(sprint?.055:.025);camera.position.y+=sway;}
  if(state.buildPreview){const pos=currentBuildPosition();state.buildPreview.position.set(pos.x,terrainHeight(pos.x,pos.z),pos.z);state.buildPreview.rotation.y=state.yaw;}
  // Needs, stamina and spoilage.
  const hungerRate=p.profile?.traits?.includes('Хороший аппетит')?.0042:.0029;const thirstRate=.0038;
  p.hunger=clamp(p.hunger-hungerRate*delta*60,0,100);p.thirst=clamp(p.thirst-thirstRate*delta*60,0,100);
  p.stamina=clamp(p.stamina+(sprint?-13:moving?-1.2:9)*delta,0,100);
  if(!state.effects.bandage)state.effects.bandage=0;else state.effects.bandage=Math.max(0,state.effects.bandage-delta);
  if(state.effects.poison>0){state.effects.poison=Math.max(0,state.effects.poison-delta*.65);state.effects.poisonTick=(state.effects.poisonTick||0)-delta;if(state.effects.poisonTick<=0){damage(.6,'Плохое самочувствие');state.effects.poisonTick=3.5;}}
  if(p.hunger<=0||p.thirst<=0)damage((p.thirst<=0?1.05:.45)*delta,'Истощение');
  else if(p.hunger>45&&p.thirst>45&&p.hp<100&&state.clock-p.lastDamage>8){p.hp=clamp(p.hp+(0.2+(p.stats?.Восстановление||0)*.05)*delta,0,100);}
  if(moving&&sprint)state.effects.fatigue=clamp(state.effects.fatigue+delta*.8,0,100);else state.effects.fatigue=clamp(state.effects.fatigue-delta*.25,0,100);
  for(const it of state.inventory){const info=itemInfo(it.name);if(info.perishable&&it.freshness>0){const rate=(weatherState.current==='clear'?1.05:.75)*(state.temperature>20?1.3:1);it.freshness=Math.max(0,(it.freshness??100)-delta*rate*.12);}}
  for(const o of state.objects){const info=itemInfo(o.userData.name);if(info.perishable)o.userData.freshness=Math.max(0,(o.userData.freshness??rand(55,100))-delta*.035);}
  const radius=Math.hypot(p.x,p.z);if(radius>57){damage((radius-57)*.08*delta*60,'Граница сна');$('#damage-overlay').style.opacity=String(clamp((radius-57)/10,0,.7));}else $('#damage-overlay').style.opacity=String(clamp((100-p.hp)/100*.18,0,.22));
  // Day/night lighting and sky.
  state.dayTime=(state.dayTime+delta/1080)%1;const angle=state.dayTime*Math.PI*2-Math.PI/2,sunHeight=Math.sin(angle);
  sun.position.set(Math.cos(angle)*58,Math.max(-8,sunHeight*68),Math.sin(angle)*50);sun.intensity=clamp(.18+Math.max(0,sunHeight)*2.3,.12,2.2);
  hemi.intensity=clamp(.28+Math.max(0,sunHeight)*.95,.23,1.25);moon.intensity=clamp(.35-Math.max(0,sunHeight)*.32,.08,.33);
  const night=clamp(1-(sunHeight+.12)*2.2,0,1);const sky=new THREE.Color(0x778073).lerp(new THREE.Color(0x111a23),night);
  if(weatherState.current==='clouds'||weatherState.current==='rain'||weatherState.current==='storm')sky.lerp(new THREE.Color(0x4e5758),.18);
  if(weatherState.current==='fog')sky.lerp(new THREE.Color(0x999a91),.28);
  scene.background.copy(sky);scene.fog.color.copy(sky);
  scene.fog.density=.0075+night*.006+(weatherState.current==='fog'?.013:weatherState.current==='rain'?.003:weatherState.current==='storm'?.008:0)+(state.currentNightmare?.id==='muteFog'?.022:state.currentNightmare?.id==='blackSquall'?.014:0);
  renderer.toneMappingExposure=1.12-night*.22-(state.currentNightmare?.id==='falseDawn'?.28:0);
  updateWeather(delta,sunHeight,night);
  // Nightmare cycle and effects.
  if((night>.48||state.clock>120)&&!state.currentNightmare){state.nextNightmare-=delta*(p.profile?.traits?.includes('Бессонница')?1.35:1);if(state.nextNightmare<=0){const choices=NIGHTMARES.filter(n=>!p.profile?.traits?.includes('Крепкий сон')||n.kind!=='entity'||Math.random()>.12);startNightmare(choices[Math.floor(Math.random()*choices.length)].id);state.nextNightmare=rand(85,150);}}
  if(state.currentNightmare){state.nightmare=Math.max(0,state.nightmare-delta);updateNightmare(delta);if(state.nightmare<=0)finishNightmare();}else{state.fear=clamp(state.fear-delta*2.7,0,100);$('#nightmare-overlay').style.opacity='0';}
  if(leftLight)leftLight.intensity=state.leftHandOn?1.45:0;
  for(const tree of forest){const t=tree.userData.sway;const wind=weatherState.current==='storm'?.028:weatherState.current==='rain'?.018:.012;tree.rotation.z=Math.sin(state.clock*.55+t)*wind;tree.rotation.x=Math.cos(state.clock*.42+t)*wind*.75;}
  for(const o of state.objects){o.position.y=o.userData.baseY+Math.sin(state.clock*1.6+o.position.x)*.025;o.rotation.y+=delta*.12;}
  for(const s of state.structures){let fi=0;s.traverse(o=>{if(o.name==='flame'){o.scale.y=.82+Math.sin(state.clock*8+fi)*.18;o.rotation.z=Math.sin(state.clock*4+fi)*.08;fi++;}});}
  const gx=Math.round(p.x/3.5),gz=Math.round(p.z/3.5);for(let x=-4;x<=4;x++)for(let z=-4;z<=4;z++)if(x*x+z*z<17)state.explored.add(`${gx+x},${gz+z}`);
  updateInteractionPrompt();
  if(state.clock-state.lastHud>.15){updateHud();state.lastHud=state.clock;}
  if(state.clock-state.lastAutoSave>180){saveGame('auto',true);toast('Автосохранение');}
}

function setup() {
  loadSettings();ensurePlayerSystems();
  $('#sensitivity').value=state.settings.sensitivity;$('#fov').value=state.settings.fov;$('#shadow-quality').value=state.settings.shadows;
  $('#minimap-wrap').classList.remove('minimap-hidden');setMinimapVisible(true);populateCreator();
  $('#inventory-search')?.addEventListener('input',renderInventory);
  $('#inventory-category')?.addEventListener('change',renderInventory);
  $('#inventory-sort')?.addEventListener('change',renderInventory);
  window.addEventListener('contextmenu',e=>e.preventDefault());
  $('#exit-game').onclick=()=>{enterMainMenu();toast('Игру можно закрыть вкладкой браузера');};
  $('#resume-game').onclick=()=>{if(state.player.hp<=0){reviveAfterCollapse();return;}hideScreen('#pause-screen');state.paused=false;requestPointerLock();};
  $('#sensitivity').oninput=e=>{state.settings.sensitivity=Number(e.target.value);persistSettings();};
  $('#fov').oninput=e=>{state.settings.fov=Number(e.target.value);if(camera){camera.fov=state.settings.fov;camera.updateProjectionMatrix();}persistSettings();};
  $('#shadow-quality').onchange=e=>{state.settings.shadows=e.target.value;if(renderer){renderer.shadowMap.enabled=e.target.value!=='off';sun.shadow.mapSize.setScalar(e.target.value==='high'?1024:512);}persistSettings();};
  $('#camp-panel [data-close]').addEventListener('click',()=>{state.uiOpen=false;activeCamp=null;state.activeStorage=null;state.currentStation=null;requestPointerLock();});
  try {
    initThree();createWeatherFX();
    renderer.shadowMap.enabled=state.settings.shadows!=='off';sun.shadow.mapSize.setScalar(state.settings.shadows==='high'?1024:512);
    camera.position.set(0,terrainHeight(0,0)+1.72,0);animate(performance.now());
  } catch (error) {
    console.error('3D startup failed:',error);
    $('#engine-error').classList.remove('hidden');
    $('#engine-error p').textContent='Браузер не смог создать WebGL-сцену. Проверьте аппаратное ускорение, обновите браузер и убедитесь, что сайт может загружать Three.js с CDN.';
  }
}


function buildLoot() {
  buildLootBase();
  const extra=['Картофель','Морковь','Лук','Помидор','Огурец','Пельмени','Свиной фарш','Сахар','Соль','Бутылка воды','Ткань','Брезент','Сухие дрова','Шерстяная шапка','Тёплая куртка','Дождевик','Сухие носки','Фонарик на батарейках','Фильтр для воды','Термос','Запасные батарейки'];
  for(let i=0;i<24;i++){const a=Math.random()*Math.PI*2,r=rand(7,53),x=Math.cos(a)*r,z=Math.sin(a)*r;const name=extra[Math.floor(Math.random()*extra.length)];makeLootMesh(name,x,z,rand(52,100));}
  for(const o of state.objects){if(itemInfo(o.userData.name).perishable)o.userData.freshness=rand(48,100);}
}
function startNewGame(profile,professionStats={}) {
  cancelBuild();closeOverlays();startNewGameBase(profile,professionStats);ensurePlayerSystems();
  state.yaw=0;state.pitch=0;state.keys={};state.onGround=true;state.velY=0;state.fear=0;state.activeStorage=null;state.currentStation=null;
  state.player.equipment={coat:false,hat:false,socks:false,raincoat:false};state.player.wetness=0;state.effects={cold:0,poison:0,poisonTick:0,bandage:0,fatigue:0};
  addItem('Камень',3);addItem('Доска',2);addItem('Гвозди',2);addItem('Сухие дрова',2);addItem('Чистая вода',1);
  weatherState={current:'clear',timer:80,lightning:0,flash:0};state.weather='clear';state.temperature=14;state.lastAutoSave=0;state.lastSave=0;
  setWeatherVisualOnly('clear');createWeatherFX();makeHandMesh();updateQuickbar();renderInventory();updateHud(true);
}
function enterMainMenu() {
  if(state.active)saveGame('auto',true);cancelBuild();
  state.active=false;state.paused=true;state.uiOpen=false;$('#hud').classList.add('hidden');closeOverlays();
  if(document.pointerLockElement)document.exitPointerLock();showScreen('#main-menu');updateContinueButton();
}

window.addEventListener('beforeunload',()=>{if(state.active)saveGame('auto',true);});


function makeHandMesh() {
  if(!handGroup||!camera)return;handGroup.clear();handItem=null;
  if(leftLight){camera.remove(leftLight);camera.remove(leftLight.target);leftLight=null;}
  const skin=material(state.player.profile?.skin||0xc78e68,.88),fabric=material(0x424b42,.96),cuff=material(0x292f2a,.92);
  const limb=(x,y,z,length,top,bottom,mat,rz)=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(top,bottom,length,12,2),mat);m.position.set(x,y,z);m.rotation.z=rz;m.castShadow=true;handGroup.add(m);return m;};
  const addHand=(x,y,z,flip=1)=>{
    const palm=new THREE.Mesh(new THREE.SphereGeometry(.105,14,12),skin);palm.position.set(x,y,z);palm.scale.set(1,.7,1.25);handGroup.add(palm);
    for(let i=0;i<4;i++){const f=new THREE.Mesh(new THREE.CapsuleGeometry(.018,.085,3,6),skin);f.position.set(x+(i-1.5)*.045,y-.047,z-.105);f.rotation.x=Math.PI/2;f.rotation.z=flip*(i-1.5)*.08;handGroup.add(f);}
    const thumb=new THREE.Mesh(new THREE.CapsuleGeometry(.02,.07,3,6),skin);thumb.position.set(x+flip*.11,y-.015,z-.025);thumb.rotation.set(.4,0,flip*.85);handGroup.add(thumb);
  };
  // Right forearm, cuff, palm and fingers.
  limb(.37,-.42,-.57,.62,.115,.155,fabric,-.48);limb(.47,-.21,-.78,.18,.087,.105,skin,-.48);addHand(.49,-.14,-.88,1);
  const wristRing=new THREE.Mesh(new THREE.TorusGeometry(.108,.012,6,18),cuff);wristRing.position.set(.45,-.38,-.6);wristRing.rotation.y=Math.PI/2;handGroup.add(wristRing);
  if(state.player.profile?.tattoo==='Правая рука'||state.player.profile?.tattoo==='Обе руки'){
    for(let i=0;i<3;i++){const tattoo=new THREE.Mesh(new THREE.TorusGeometry(.079+i*.006,.004,4,18),material(0x292923));tattoo.position.set(.45,-.38-i*.045,-.6);tattoo.rotation.y=Math.PI/2;handGroup.add(tattoo);}
  }
  if(state.leftHandOn){
    limb(-.36,-.43,-.57,.58,.11,.145,fabric,.48);limb(-.46,-.22,-.77,.17,.08,.1,skin,.48);addHand(-.48,-.15,-.88,-1);
    if(state.player.profile?.tattoo==='Левая рука'||state.player.profile?.tattoo==='Обе руки'){
      for(let i=0;i<3;i++){const tattoo=new THREE.Mesh(new THREE.TorusGeometry(.079+i*.006,.004,4,18),material(0x292923));tattoo.position.set(-.44,-.39-i*.045,-.6);tattoo.rotation.y=Math.PI/2;handGroup.add(tattoo);}
    }
    const flashlight=new THREE.Group();const body=new THREE.Mesh(new THREE.CylinderGeometry(.055,.075,.34,12),material(0x35423b,.32,{metalness:.42}));body.rotation.x=Math.PI/2;flashlight.add(body);
    const lens=new THREE.Mesh(new THREE.CircleGeometry(.065,18),new THREE.MeshBasicMaterial({color:0xffe2a1}));lens.position.z=-.176;flashlight.add(lens);flashlight.position.set(-.48,-.27,-.74);flashlight.rotation.x=.12;handGroup.add(flashlight);
    leftLight=new THREE.SpotLight(0xffe1a3,1.45,26,Math.PI/7,.48,1.15);leftLight.position.set(-.48,-.26,-.78);leftLight.target.position.set(-.52,-.38,-1.7);camera.add(leftLight);camera.add(leftLight.target);
  }
  const name=state.quick[state.selectedSlot];if(!name)return;
  const item=itemInfo(name);const prop=new THREE.Group();const iron=material(0x68716d,.3,{metalness:.62}),wood=material(0x795638,.9);
  if(name.toLowerCase().includes('фонарь')){
    const body=new THREE.Mesh(new THREE.CylinderGeometry(.065,.085,.38,14),material(0x3c4943,.3,{metalness:.5}));body.rotation.x=Math.PI/2;prop.add(body);
    const lens=new THREE.Mesh(new THREE.CircleGeometry(.07,18),new THREE.MeshBasicMaterial({color:0xffdda0}));lens.position.z=-.195;prop.add(lens);
    const ring=new THREE.Mesh(new THREE.TorusGeometry(.075,.012,6,16),iron);ring.position.z=-.18;prop.add(ring);
  } else if(name==='Компас') {
    const base=new THREE.Mesh(new THREE.CylinderGeometry(.16,.17,.065,24),iron);prop.add(base);
    const face=new THREE.Mesh(new THREE.CircleGeometry(.135,24),material(0xd8d0b6,.35));face.position.y=.035;face.rotation.x=-Math.PI/2;prop.add(face);
    const needle=new THREE.Mesh(new THREE.ConeGeometry(.025,.12,4),material(0xa94e43));needle.position.set(0,.055,0);prop.add(needle);
  } else if(name==='Топор'||name==='Молоток'||name==='Лопата') {
    const shaft=new THREE.Mesh(new THREE.CylinderGeometry(.025,.035,.52,9),wood);prop.add(shaft);
    const head=name==='Топор'?new THREE.BoxGeometry(.24,.16,.1):name==='Лопата'?new THREE.BoxGeometry(.15,.24,.045):new THREE.BoxGeometry(.22,.12,.13);
    const toolHead=new THREE.Mesh(head,iron);toolHead.position.y=.23;prop.add(toolHead);
  } else if(item.category==='drink'||name.includes('Бутылка')||name.includes('Термос')) {
    const bottle=new THREE.Mesh(new THREE.CylinderGeometry(.075,.09,.29,14),material(0x8da69b,.25,{transparent:true,opacity:.8}));prop.add(bottle);
    const cap=new THREE.Mesh(new THREE.CylinderGeometry(.045,.045,.045,10),iron);cap.position.y=.16;prop.add(cap);
  } else if(name.includes('Бинт')||name.includes('Аптеч')) {
    const box=new THREE.Mesh(new THREE.BoxGeometry(.22,.15,.17),material(0xe3e0d4,.9));prop.add(box);
    const cross=new THREE.Mesh(new THREE.BoxGeometry(.06,.17,.012),material(0xb94e46));prop.add(cross);
  } else if(name==='Хлеб'||name==='Булочка с кунжутом') {
    const loaf=new THREE.Mesh(new THREE.SphereGeometry(.13,14,10),material(0xb68a4d,.9));loaf.scale.set(1,.65,1.25);prop.add(loaf);
  } else {
    const shape=item.category==='food'?new THREE.BoxGeometry(.22,.15,.15):new THREE.DodecahedronGeometry(.12,1);
    const generic=new THREE.Mesh(shape,material(item.category==='medical'?0xd9d7c8:0x8c7958,.86));prop.add(generic);
  }
  prop.position.set(.48,-.35,-.72);prop.rotation.set(.18,-.24,-.4);prop.scale.setScalar(.86);prop.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});handGroup.add(prop);handItem=prop;
}

setup();

/* ========================================================================
   QUIET DREAM v0.7 — rigged characters, creature AI, pathfinding and CC0 audio
   ======================================================================== */

const ADV_AUDIO_URLS = {
  forest: 'https://spritepilot.com/free-assets/sound-effects/ambient/forest.ogg',
  wind: 'https://spritepilot.com/free-assets/sound-effects/ambient/wind.ogg',
  rain: 'https://spritepilot.com/free-assets/sound-effects/ambient/rain.ogg',
  campfire: 'https://spritepilot.com/free-assets/sound-effects/ambient/campfire.ogg',
  night: 'https://spritepilot.com/free-assets/sound-effects/ambient/night.ogg',
  river: 'https://spritepilot.com/free-assets/sound-effects/ambient/river.ogg',
  thunder: 'https://sfxmint.com/dl/ambience-thunder-04.mp3',
  wood: 'https://spritepilot.com/free-assets/sound-effects/movement/steps-wood.ogg',
  grass: 'https://spritepilot.com/free-assets/sound-effects/movement/steps-grass.ogg',
  ghost: 'https://spritepilot.com/free-assets/sound-effects/creatures/ghost.ogg',
  zombie: 'https://spritepilot.com/free-assets/sound-effects/creatures/zombie.ogg',
  wolf: 'https://spritepilot.com/free-assets/sound-effects/creatures/wolf-howl.ogg',
  bird: 'https://spritepilot.com/free-assets/sound-effects/creatures/bird.ogg',
  growl: 'https://spritepilot.com/free-assets/sound-effects/creatures/monster-growl.ogg',
  roar: 'https://spritepilot.com/free-assets/sound-effects/creatures/boss-roar.ogg'
};

const advAudio = {
  started:false, enabled:localStorage.getItem('qd-audio-enabled')!=='false', volume:Number(localStorage.getItem('qd-audio-volume')||.65),
  loops:{}, stepTimer:0, birdTimer:15, wolfTimer:27, thunderTimer:14, lastThreatSound:0,
  init(){
    if(this.started)return;
    this.started=true;
    for(const key of ['forest','wind','rain','campfire','night','river']){
      const a=new Audio(ADV_AUDIO_URLS[key]);a.loop=true;a.preload='auto';a.volume=0;a.playsInline=true;
      this.loops[key]=a;
      const p=a.play();if(p&&p.catch)p.catch(()=>{});
    }
    const volume=$('#master-volume');if(volume)volume.value=Math.round(this.volume*100);
    const toggle=$('#sound-toggle');if(toggle)toggle.textContent=`Звук: ${this.enabled?'включён':'выключен'}`;
  },
  target(key,value){const a=this.loops[key];if(!a)return;const target=this.enabled?clamp(value*this.volume,0,1):0;a.volume+=(target-a.volume)*.09;if(a.volume<.003&&target===0&&!a.paused)a.pause();else if(a.paused&&target>.002){const p=a.play();if(p&&p.catch)p.catch(()=>{});}},
  oneShot(key,volume=.5,rate=1){if(!this.enabled)return;const url=ADV_AUDIO_URLS[key];if(!url)return;try{const a=new Audio(url);a.volume=clamp(volume*this.volume,0,1);a.playbackRate=rate;a.preload='auto';a.addEventListener('ended',()=>{a.removeAttribute('src');a.load();},{once:true});const p=a.play();if(p&&p.catch)p.catch(()=>{});}catch(e){}},
  update(delta){
    if(!this.started)return;
    const night=clamp(1-(Math.sin(state.dayTime*Math.PI*2-Math.PI/2)+.12)*2.2,0,1);
    const weather=weatherState?.current||'clear';
    const moving=!!(state.keys.KeyW||state.keys.KeyA||state.keys.KeyS||state.keys.KeyD);
    const sprint=!!(state.keys.ShiftLeft||state.keys.ShiftRight);
    this.target('forest',.24*(1-night*.48));
    this.target('wind',weather==='storm'?.24:weather==='rain'?.14:weather==='fog'?.12:.07);
    this.target('rain',weather==='storm'?.34:weather==='rain'?.27:0);
    this.target('night',night*.24);
    const camp=state.structures?.find(o=>o.userData.building==='campfire'&&o.userData.lit&&o.userData.fuel>0);
    const campDist=camp?distance2({x:camp.position.x,z:camp.position.z},state.player):999;
    this.target('campfire',camp?clamp(.21*(1-campDist/20),0,.21):0);
    const riverDist=distance2(state.player,{x:-24,z:-18});
    this.target('river',clamp(.15*(1-riverDist/24),0,.15));
    const onWood=state.structures?.some(o=>['floor','bed','workbench'].includes(o.userData.building)&&distance2({x:o.position.x,z:o.position.z},state.player)<1.5);
    if(moving&&state.onGround){this.stepTimer-=delta;if(this.stepTimer<=0){this.oneShot(onWood?'wood':'grass',sprint?.20:.14,sprint?rand(1.02,1.14):rand(.92,1.04));this.stepTimer=sprint?.34:.48;}}else this.stepTimer=.18;
    this.thunderTimer-=delta;if(weather==='storm'&&this.thunderTimer<=0){this.oneShot('thunder',rand(.19,.32),rand(.88,1.04));this.thunderTimer=rand(24,42);}
    this.birdTimer-=delta;if(this.birdTimer<=0&&night<.58&&weather!=='storm'){this.oneShot('bird',rand(.14,.28),rand(.88,1.12));this.birdTimer=rand(22,39);}
    this.wolfTimer-=delta;if(this.wolfTimer<=0&&night>.58){this.oneShot('wolf',rand(.12,.25),rand(.83,1.06));this.wolfTimer=rand(32,54);}
  },
  setEnabled(value){this.enabled=!!value;localStorage.setItem('qd-audio-enabled',String(this.enabled));const b=$('#sound-toggle');if(b)b.textContent=`Звук: ${this.enabled?'включён':'выключен'}`;if(!this.enabled)for(const a of Object.values(this.loops))a.pause();else if(this.started)for(const a of Object.values(this.loops)){const p=a.play();if(p&&p.catch)p.catch(()=>{});}},
  setVolume(value){this.volume=clamp(Number(value)/100,0,1);localStorage.setItem('qd-audio-volume',String(this.volume));}
};

let advPreviewRenderer=null, advPreviewScene=null, advPreviewCamera=null, advPreviewRig=null, advWorldAvatar=null, advThirdPerson=false;
let advNavGrid=null, advNavSize=0, advNavCell=2.5, advNavMin=-57.5, advNavRefresh=2.5;

function advMat(color,roughness=.84,opts={}){return new THREE.MeshStandardMaterial({color,roughness,...opts});}
const advSurfaceCache={};
function advSurfaceMap(kind='fabric'){
  if(advSurfaceCache[kind])return advSurfaceCache[kind];
  const c=document.createElement('canvas');c.width=128;c.height=128;const ctx=c.getContext('2d');
  ctx.fillStyle=kind==='skin'?'#dfd9d1':kind==='leather'?'#c8c2b8':'#d5d3cc';ctx.fillRect(0,0,128,128);
  let seed=kind==='skin'?13:kind==='leather'?29:47;const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
  for(let i=0;i<(kind==='fabric'?950:kind==='leather'?720:420);i++){
    const v=Math.floor(170+random()*72);ctx.fillStyle=`rgba(${v},${v},${v},${kind==='fabric'?.16:kind==='leather'?.10:.07})`;
    const x=random()*128,y=random()*128,r=kind==='leather'?1.5:1;ctx.fillRect(x,y,r,r);
  }
  if(kind==='fabric'){
    ctx.strokeStyle='rgba(70,70,70,.10)';ctx.lineWidth=1;
    for(let y=2;y<128;y+=5){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(128,y);ctx.stroke();}
    ctx.strokeStyle='rgba(255,255,255,.13)';for(let x=1;x<128;x+=5){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,128);ctx.stroke();}
  }else if(kind==='leather'){
    for(let i=0;i<100;i++){ctx.beginPath();ctx.arc(random()*128,random()*128,random()*1.2+.3,0,Math.PI*2);ctx.fillStyle='rgba(45,38,29,.13)';ctx.fill();}
  }else{
    for(let i=0;i<24;i++){ctx.beginPath();ctx.arc(random()*128,random()*128,random()*4+1,0,Math.PI*2);ctx.fillStyle='rgba(175,113,92,.035)';ctx.fill();}
  }
  const texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.repeat.set(2,2);texture.anisotropy=4;advSurfaceCache[kind]=texture;return texture;
}
function advTexturedMat(color,kind='fabric',roughness=.86,opts={}){
  return new THREE.MeshStandardMaterial({color,roughness,map:advSurfaceMap(kind),...opts});
}
function advMakeBone(parent,name,x,y,z,bones){const b=new THREE.Bone();b.name=name;b.position.set(x,y,z);parent.add(b);bones.push(b);return b;}
function advSetLayer(obj,layer){obj.traverse(o=>{if(o.layers)o.layers.set(layer);if(o.isMesh){o.castShadow=true;o.receiveShadow=true;o.frustumCulled=false;}});}
function advAddSkinned(geom,mat,bone,skeleton,group,layer){
  const count=geom.getAttribute('position').count,indices=new Uint16Array(count*4),weights=new Float32Array(count*4),boneIndex=skeleton.bones.indexOf(bone);
  for(let i=0;i<count;i++){indices[i*4]=Math.max(0,boneIndex);weights[i*4]=1;}
  geom.setAttribute('skinIndex',new THREE.Uint16BufferAttribute(indices,4));geom.setAttribute('skinWeight',new THREE.Float32BufferAttribute(weights,4));
  const mesh=new THREE.SkinnedMesh(geom,mat);mesh.bind(skeleton);mesh.frustumCulled=false;mesh.castShadow=true;mesh.receiveShadow=true;mesh.layers.set(layer);group.add(mesh);return mesh;
}
function advPrimitive(rig,geometry,material,bone,position,scale=new THREE.Vector3(1,1,1),quaternion=new THREE.Quaternion()){
  const g=geometry.clone();const matrix=new THREE.Matrix4().compose(position,quaternion,scale);g.applyMatrix4(matrix);return advAddSkinned(g,material,bone,rig.skeleton,rig.group,rig.layer);
}
function advSphere(rig,bone,position,scale,mat){return advPrimitive(rig,new THREE.SphereGeometry(1,20,16),mat,bone,position,scale);}
function advBox(rig,bone,position,scale,mat,rotation=new THREE.Euler()) {const q=new THREE.Quaternion().setFromEuler(rotation);return advPrimitive(rig,new THREE.BoxGeometry(1,1,1),mat,bone,position,scale,q);}
function advSegment(rig,bone,a,b,radius,mat,scaleX=1,scaleZ=1){
  const dir=b.clone().sub(a),length=dir.length();if(length<.01)return null;
  const cylinder=Math.max(.02,length-radius*2),geo=new THREE.CapsuleGeometry(radius,cylinder,4,10);
  const q=new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),dir.normalize());
  return advPrimitive(rig,geo,mat,bone,a.clone().add(b).multiplyScalar(.5),new THREE.Vector3(scaleX,1,scaleZ),q);
}
function advMaterialForHair(value){const v=String(value||'Тёмные');return v==='Светлые'?0xb99862:v==='Русые'?0x70543b:v==='Рыжие'?0x9a482b:0x211d1a;}
function advMaterialForEyes(value){const v=String(value||'Карие');return v==='Голубые'?0x6c9bb4:v==='Зелёные'?0x72906a:v==='Серые'?0x87908d:0x61432d;}
function advCreateHumanoid(profile={},variant='player',layer=1){
  const group=new THREE.Group();group.name=`Rigged_${variant}`;
  const bones=[],root=advMakeBone(group,'root',0,0,0,bones);
  const pelvis=advMakeBone(root,'pelvis',0,.86,0,bones),spine=advMakeBone(pelvis,'spine',0,.11,0,bones),chest=advMakeBone(spine,'chest',0,.29,0,bones),neck=advMakeBone(chest,'neck',0,.29,0,bones),head=advMakeBone(neck,'head',0,.12,0,bones);
  const arm={};
  for(const side of ['L','R']){const sign=side==='L'?-1:1;const shoulder=advMakeBone(chest,`shoulder${side}`,sign*.27,.12,0,bones);const elbow=advMakeBone(shoulder,`elbow${side}`,sign*.015,-.29,0,bones);const wrist=advMakeBone(elbow,`wrist${side}`,sign*.015,-.27,-.005,bones);const hand=advMakeBone(wrist,`hand${side}`,0,-.06,-.015,bones);arm[side]={shoulder,elbow,wrist,hand,sign};}
  const leg={};
  for(const side of ['L','R']){const sign=side==='L'?-1:1;const hip=advMakeBone(pelvis,`hip${side}`,sign*.13,-.07,0,bones);const knee=advMakeBone(hip,`knee${side}`,0,-.40,.01,bones);const ankle=advMakeBone(knee,`ankle${side}`,0,-.39,0,bones);const foot=advMakeBone(ankle,`foot${side}`,0,-.025,-.06,bones);leg[side]={hip,knee,ankle,foot,sign};}
  group.updateMatrixWorld(true);const skeleton=new THREE.Skeleton(bones);skeleton.calculateInverses();
  const rig={group,root,pelvis,spine,chest,neck,head,arm,leg,bones,skeleton,layer,variant,phase:rand(0,6),
    animate(t,moving=false,running=false,attack=false){const speed=running?11:moving?7.2:1.1,amp=moving?(running?.67:.38):.025,step=Math.sin(t*speed+this.phase);this.root.position.y=moving?Math.abs(Math.sin(t*speed*2))*.025:Math.sin(t*1.2+this.phase)*.008;this.spine.rotation.z=Math.sin(t*speed+this.phase)*.025*amp;this.spine.rotation.x=attack?-.24:Math.sin(t*speed+this.phase)*.035*amp;this.head.rotation.y=Math.sin(t*.55+this.phase)*.07;for(const side of ['L','R']){const s=this.arm[side],l=this.leg[side],sign=s.sign;const offset=side==='L'?0:Math.PI;s.shoulder.rotation.x=moving?Math.sin(t*speed+offset)*amp*.85:Math.sin(t*.8+offset)*.025;s.shoulder.rotation.z=sign*.07+(attack?sign*.55:0);s.elbow.rotation.x=attack?-.65:(moving?Math.max(0,Math.sin(t*speed+offset))*.16:0);l.hip.rotation.x=moving?Math.sin(t*speed+offset+Math.PI)*amp:Math.sin(t*.7+offset)*.012;l.knee.rotation.x=moving?Math.max(0,-Math.sin(t*speed+offset+Math.PI))*.65:0;l.ankle.rotation.x=moving?Math.sin(t*speed+offset)*.12:0;}}
  };
  const skin=advTexturedMat(profile.skin||'#bd8967','skin',.82),hair=advTexturedMat(advMaterialForHair(profile.hair),'leather',.92),eyeWhite=advMat(0xd6d4c8,.3),iris=advMat(advMaterialForEyes(profile.eyes),.25,{metalness:.08}),pupil=advMat(0x10100f,.2),clothes=profile.clothes||'Походная куртка',coatColor=clothes==='Дождевик'?0x424c4b:clothes==='Флисовая кофта'?0x505b50:clothes==='Рабочая одежда'?0x625642:0x485344,jacket=advTexturedMat(variant==='player'?coatColor:variant==='brute'?0x22231e:0x171b1b,'fabric',.95),jacketHi=advTexturedMat(variant==='player'?(clothes==='Дождевик'?0x687775:clothes==='Флисовая кофта'?0x697469:0x626c55):0x302e2a,'fabric',.88),pants=advTexturedMat(variant==='player'?0x393a32:0x101211,'fabric',.96),boots=advTexturedMat(0x29251f,'leather',.92),metal=advMat(0x7b7565,.36,{metalness:.55}),zipper=advMat(0xb4a17a,.34,{metalness:.6});
  // Outer torso layers and collar, weighted to spine and chest bones.
  advSegment(rig,spine,new THREE.Vector3(0,.88,0),new THREE.Vector3(0,1.47,0),.25,jacket,1.03,.88);
  advSphere(rig,chest,new THREE.Vector3(0,1.34,0),new THREE.Vector3(.285,.24,.205),jacket);
  advBox(rig,chest,new THREE.Vector3(0,1.49,-.015),new THREE.Vector3(.31,.10,.28),jacketHi,new THREE.Euler(.12,0,0));
  if(clothes==='Дождевик'){advBox(rig,chest,new THREE.Vector3(0,1.57,.015),new THREE.Vector3(.34,.10,.20),jacket,new THREE.Euler(.18,0,0));for(const sign of [-1,1])advBox(rig,chest,new THREE.Vector3(sign*.20,1.34,-.05),new THREE.Vector3(.018,.24,.12),jacketHi,new THREE.Euler(0,0,sign*.15));}
  if(clothes==='Флисовая кофта')for(let i=0;i<5;i++)advBox(rig,chest,new THREE.Vector3(0,1.08+i*.07,-.235),new THREE.Vector3(.24,.008,.009),jacketHi);
  advSegment(rig,neck,new THREE.Vector3(0,1.54,0),new THREE.Vector3(0,1.70,0),.07,skin);
  // Pants, articulated legs, boots and reinforced knees.
  for(const side of ['L','R']){const s=leg[side],sign=s.sign;advSegment(rig,s.hip,new THREE.Vector3(sign*.13,.82,0),new THREE.Vector3(sign*.14,.43,0),.115,pants);advSegment(rig,s.knee,new THREE.Vector3(sign*.14,.43,0),new THREE.Vector3(sign*.14,.08,0),.082,pants);advSphere(rig,s.knee,new THREE.Vector3(sign*.14,.42,-.005),new THREE.Vector3(.095,.105,.10),jacketHi);advBox(rig,s.foot,new THREE.Vector3(sign*.14,.045,-.08),new THREE.Vector3(.15,.09,.27),boots,new THREE.Euler(.05,0,0));advBox(rig,s.ankle,new THREE.Vector3(sign*.14,.12,.02),new THREE.Vector3(.16,.1,.15),boots);}
  // Arms with jacket sleeves, cuffs, hands and articulated fingers as attached details.
  for(const side of ['L','R']){const a=arm[side],sign=a.sign;advSegment(rig,a.shoulder,new THREE.Vector3(sign*.28,1.43,0),new THREE.Vector3(sign*.31,1.12,0),.105,jacket);advSegment(rig,a.elbow,new THREE.Vector3(sign*.31,1.12,0),new THREE.Vector3(sign*.34,.87,-.01),.078,jacketHi);advSphere(rig,a.wrist,new THREE.Vector3(sign*.34,.85,-.01),new THREE.Vector3(.075,.055,.072),skin);advSphere(rig,a.hand,new THREE.Vector3(sign*.34,.77,-.055),new THREE.Vector3(.075,.09,.055),skin);for(let f=0;f<4;f++){advSegment(rig,a.hand,new THREE.Vector3(sign*.34+(f-1.5)*.027,.77,-.085),new THREE.Vector3(sign*.34+(f-1.5)*.03,.72,-.12),.012,skin);}}
  // Face: ears, eye sockets, iris, nose and a clear mouth line.
  advSphere(rig,head,new THREE.Vector3(0,1.76,-.005),new THREE.Vector3(.145,.188,.13),skin);
  for(const sign of [-1,1]){advSphere(rig,head,new THREE.Vector3(sign*.144,1.77,0),new THREE.Vector3(.035,.065,.034),skin);advSphere(rig,head,new THREE.Vector3(sign*.056,1.805,-.112),new THREE.Vector3(.034,.024,.019),eyeWhite);advSphere(rig,head,new THREE.Vector3(sign*.056,1.805,-.13),new THREE.Vector3(.017,.018,.009),iris);advSphere(rig,head,new THREE.Vector3(sign*.056,1.805,-.137),new THREE.Vector3(.008,.012,.005),pupil);advBox(rig,head,new THREE.Vector3(sign*.056,1.846,-.11),new THREE.Vector3(.06,.014,.018),hair,new THREE.Euler(0,0,sign*-.08));}
  advSphere(rig,head,new THREE.Vector3(0,1.765,-.143),new THREE.Vector3(.025,.034,.027),skin);
  advBox(rig,head,new THREE.Vector3(0,1.70,-.132),new THREE.Vector3(.055,.008,.012),advMat(0x4b2422,.55));
  // Hair cap and hairstyle locks. Bald is a deliberate selectable look.
  const hairStyle=profile.hairStyle||(profile.hair==='Бритая голова'?'Бритая голова':'Короткая стрижка');
  if(hairStyle!=='Бритая голова'&&profile.hair!=='Бритая голова'){
    const capGeo=new THREE.SphereGeometry(.151,24,18,0,Math.PI*2,0,Math.PI*.64);advPrimitive(rig,capGeo,hair,head,new THREE.Vector3(0,1.84,.005));
    const fringe=hairStyle==='Длинные волосы'?.09:hairStyle==='Средняя'?.065:.035;
    for(let i=0;i<7;i++){const x=(i-3)*.039;advSphere(rig,head,new THREE.Vector3(x,1.89+Math.sin(i*1.7)*.012,.012),new THREE.Vector3(.031,.052+fringe*.35,.055),hair);}
    if(hairStyle==='Средняя'||hairStyle==='Длинные волосы'||hairStyle==='Хвост')for(const sign of [-1,1])advSegment(rig,head,new THREE.Vector3(sign*.12,1.81,.03),new THREE.Vector3(sign*.14,1.60-(hairStyle==='Длинные волосы'?.18:0),.12),.045,hair);
    if(hairStyle==='Длинные волосы'){for(const sign of [-1,1])advSegment(rig,head,new THREE.Vector3(sign*.12,1.68,.12),new THREE.Vector3(sign*.13,1.36,.16),.04,hair);}
    if(hairStyle==='Хвост'){advSegment(rig,head,new THREE.Vector3(0,1.83,.10),new THREE.Vector3(0,1.68,.35),.052,hair);advSegment(rig,head,new THREE.Vector3(0,1.68,.35),new THREE.Vector3(.015,1.43,.46),.035,hair);}
  }
  // Clothing details: zipper, pockets, webbing, belt, backpack and fabric seams.
  advBox(rig,chest,new THREE.Vector3(0,1.18,-.226),new THREE.Vector3(.018,.40,.012),zipper);
  for(const sign of [-1,1]){advBox(rig,chest,new THREE.Vector3(sign*.145,1.27,-.207),new THREE.Vector3(.095,.12,.026),jacketHi);advBox(rig,chest,new THREE.Vector3(sign*.145,1.215,-.224),new THREE.Vector3(.08,.012,.008),metal);}
  advBox(rig,pelvis,new THREE.Vector3(0,.91,.19),new THREE.Vector3(.30,.35,.16),advMat(0x343d37,.96));
  advBox(rig,pelvis,new THREE.Vector3(0,.84,-.13),new THREE.Vector3(.30,.045,.035),metal);
  // Tattooes are visible on the exposed wrist/forearm area.
  if(profile.tattoo==='Обе руки'||profile.tattoo==='Левая рука'||profile.tattoo==='Правая рука'){
    const sides=profile.tattoo==='Обе руки'?[-1,1]:[profile.tattoo==='Левая рука'?-1:1];
    for(const sign of sides){const ink=advMat(0x39332c,.95);for(let i=0;i<3;i++)advBox(rig,sign<0?arm.L.wrist:arm.R.wrist,new THREE.Vector3(sign*.34,.88+i*.018,-.075),new THREE.Vector3(.09,.008,.008),ink,new THREE.Euler(0,0,.18*i));}
  }
  // Shoes get stitched toe caps; face and clothes use separate physically based materials.
  for(const side of ['L','R']){const sign=leg[side].sign;advBox(rig,leg[side].foot,new THREE.Vector3(sign*.14,.06,-.205),new THREE.Vector3(.12,.045,.035),advMat(0x4d4639,.8));}
  group.updateMatrixWorld(true);
  rig.scale=clamp((Number(profile.height)||178)/178*.92,.78,1.08);const buildWidth=profile.build==='Худощавое'?.94:profile.build==='Крепкое'?1.055:profile.build==='Плотное'?1.09:1;const weightWidth=clamp(1+((Number(profile.weight)||76)-76)/520,.94,1.07);group.scale.set(rig.scale*buildWidth*weightWidth,rig.scale,rig.scale*buildWidth*weightWidth);
  rig.dispose=()=>{group.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material&&Array.isArray(o.material))o.material.forEach(m=>m.dispose());});};
  return rig;
}

function advCreateDeer(layer=0){
  const group=new THREE.Group(),bones=[],root=advMakeBone(group,'root',0,0,0,bones),body=advMakeBone(root,'body',0,1.0,0,bones),neck=advMakeBone(body,'neck',0,.10,-.45,bones),head=advMakeBone(neck,'head',0,.22,-.22,bones),legs={};
  for(const [i,x] of [-1,1].entries())for(const [j,z] of [-1,1].entries()){const id=`leg${i}${j}`,hip=advMakeBone(body,id, x*.25,-.13,z*.36,bones),knee=advMakeBone(hip,id+'Knee',x*.015,-.39,z*.015,bones),ankle=advMakeBone(knee,id+'Ankle',0,-.38,0,bones);legs[id]={hip,knee,ankle,phase:(i+j)*Math.PI};}
  const tail=advMakeBone(body,'tail',0,.04,.48,bones);group.updateMatrixWorld(true);const skeleton=new THREE.Skeleton(bones);skeleton.calculateInverses();const rig={group,bones,root,body,neck,head,legs,tail,skeleton,layer,phase:rand(0,6),animate(t,moving,running,attack){const s=running?10:moving?6.8:1;for(const l of Object.values(this.legs)){l.hip.rotation.x=moving?Math.sin(t*s+l.phase)*.42:Math.sin(t*.8+l.phase)*.02;l.knee.rotation.x=moving?Math.max(0,-Math.sin(t*s+l.phase))*.55:0;}this.neck.rotation.x=attack?-.28:Math.sin(t*1.4)*.035;this.head.rotation.y=Math.sin(t*.7)*.04;this.tail.rotation.x=Math.sin(t*2.4)*.2;this.root.position.y=Math.abs(Math.sin(t*s*2))*(moving?.025:0.008);}};
  const dark=advMat(0x171a17,.96),hide=advMat(0x302f29,.98),horn=advMat(0x4b4333,.82),eye=advMat(0xd84a35,.25,{emissive:0x9b1814,emissiveIntensity:1.8});
  advSphere(rig,body,new THREE.Vector3(0,1.0,.05),new THREE.Vector3(.43,.46,.76),dark);
  advSegment(rig,neck,new THREE.Vector3(0,1.08,-.34),new THREE.Vector3(0,1.82,-.68),.14,hide);
  advSphere(rig,head,new THREE.Vector3(0,1.91,-.82),new THREE.Vector3(.23,.22,.33),dark);
  advSphere(rig,head,new THREE.Vector3(0,1.84,-1.08),new THREE.Vector3(.14,.10,.20),hide);
  for(const sign of [-1,1]){advSphere(rig,head,new THREE.Vector3(sign*.12,1.99,-1.02),new THREE.Vector3(.04,.032,.02),eye);advSegment(rig,head,new THREE.Vector3(sign*.12,2.04,-.76),new THREE.Vector3(sign*.28,2.42,-.78),.04,horn);advSegment(rig,head,new THREE.Vector3(sign*.28,2.42,-.78),new THREE.Vector3(sign*.35,2.64,-.88),.025,horn);advSegment(rig,head,new THREE.Vector3(sign*.25,2.34,-.78),new THREE.Vector3(sign*.48,2.47,-.76),.02,horn);}
  for(const [id,l] of Object.entries(legs)){const x=l.hip.position.x,z=l.hip.position.z;const sign=Math.sign(x);const start=new THREE.Vector3(x, .87,z),knee=new THREE.Vector3(x+sign*.02,.49,z),foot=new THREE.Vector3(x+sign*.025,.10,z-.025);advSegment(rig,l.hip,start,knee,.085,hide);advSegment(rig,l.knee,knee,foot,.055,dark);advBox(rig,l.ankle,new THREE.Vector3(x,.065,z-.07),new THREE.Vector3(.11,.11,.18),horn);}
  group.updateMatrixWorld(true);return rig;
}
function advCreateCrawler(layer=0){
  const group=new THREE.Group(),bones=[],root=advMakeBone(group,'root',0,0,0,bones),body=advMakeBone(root,'body',0,.54,0,bones),head=advMakeBone(body,'head',0,.03,-.56,bones),legs=[];
  for(let i=0;i<3;i++)for(const sign of [-1,1]){const hip=advMakeBone(body,`leg${i}${sign}`,sign*.26,-.03,(i-1)*.36,bones),knee=advMakeBone(hip,`knee${i}${sign}`,sign*.30,-.10,(i-1)*.14,bones),foot=advMakeBone(knee,`foot${i}${sign}`,sign*.22,-.12,(i-1)*.1,bones);legs.push({hip,knee,foot,phase:(i+(sign>0?1:0))*Math.PI});}
  group.updateMatrixWorld(true);const skeleton=new THREE.Skeleton(bones);skeleton.calculateInverses();const rig={group,bones,root,body,head,legs,skeleton,layer,phase:rand(0,6),animate(t,moving,running,attack){const s=moving?9:2;for(const l of this.legs){l.hip.rotation.z=Math.sin(t*s+l.phase)*.42;l.hip.rotation.x=Math.cos(t*s+l.phase)*.18;l.knee.rotation.z=-Math.max(0,Math.sin(t*s+l.phase))*.38;l.foot.rotation.z=.2*Math.sin(t*s+l.phase+1);}this.body.rotation.z=Math.sin(t*s*2)*.045;this.root.position.y=Math.sin(t*s*2)*.025;}};
  const shell=advMat(0x1c211d,.98),plates=advMat(0x35392d,.92),edge=advMat(0x101411,.95),eyes=advMat(0xe54a37,.2,{emissive:0xb62318,emissiveIntensity:2});
  advSphere(rig,body,new THREE.Vector3(0,.57,.02),new THREE.Vector3(.43,.27,.82),shell);
  advSphere(rig,head,new THREE.Vector3(0,.59,-.65),new THREE.Vector3(.24,.21,.25),edge);
  for(const sign of [-1,1])advSphere(rig,head,new THREE.Vector3(sign*.10,.67,-.83),new THREE.Vector3(.04,.03,.025),eyes);
  for(const l of legs){const sign=Math.sign(l.hip.position.x),i=Math.round(l.hip.position.z/.36)+1;const hip=new THREE.Vector3(sign*.27,.56,(i-1)*.36),knee=new THREE.Vector3(sign*.57,.44,(i-1)*.5),foot=new THREE.Vector3(sign*.79,.30,(i-1)*.6);advSegment(rig,l.hip,hip,knee,.07,plates);advSegment(rig,l.knee,knee,foot,.045,edge);advSphere(rig,l.foot,foot,new THREE.Vector3(.08,.045,.09),shell);}
  for(let i=0;i<9;i++){const z=-.55+i*.14;advSegment(rig,body,new THREE.Vector3(0,.78,z),new THREE.Vector3(0,1.03,z+.03),.045,plates);}
  group.updateMatrixWorld(true);return rig;
}
function advCreateOrb(layer=0){
  const group=new THREE.Group(),bones=[],root=advMakeBone(group,'root',0,0,0,bones),core=advMakeBone(root,'core',0,1.32,0,bones),tentacles=[];
  for(let i=0;i<8;i++){const a=i/8*Math.PI*2;const hip=advMakeBone(core,`t${i}`,Math.cos(a)*.25,-.05,Math.sin(a)*.25,bones),mid=advMakeBone(hip,`m${i}`,Math.cos(a)*.35,-.18,Math.sin(a)*.35,bones),end=advMakeBone(mid,`e${i}`,Math.cos(a)*.32,-.20,Math.sin(a)*.32,bones);tentacles.push({hip,mid,end,a,phase:i*.7});}
  group.updateMatrixWorld(true);const skeleton=new THREE.Skeleton(bones);skeleton.calculateInverses();const rig={group,bones,root,core,tentacles,skeleton,layer,phase:rand(0,6),animate(t,moving,running,attack){this.root.position.y=Math.sin(t*1.7+this.phase)*.14;this.core.rotation.y=Math.sin(t*.45)*.18;for(const a of this.tentacles){a.hip.rotation.x=Math.sin(t*1.8+a.phase)*.2;a.hip.rotation.z=Math.cos(t*1.4+a.phase)*.25;a.mid.rotation.x=Math.sin(t*2.2+a.phase)*.18;a.end.rotation.z=Math.cos(t*1.9+a.phase)*.16;}}};
  const black=advMat(0x080c10,.18,{metalness:.28,emissive:0x1e2732,emissiveIntensity:.55}),glow=advMat(0xe1b9ac,.2,{emissive:0x9e3344,emissiveIntensity:1.7});
  advSphere(rig,core,new THREE.Vector3(0,1.34,0),new THREE.Vector3(.46,.52,.43),black);
  for(const sign of [-1,1])advSphere(rig,core,new THREE.Vector3(sign*.13,1.39,-.37),new THREE.Vector3(.065,.05,.03),glow);
  for(const t of tentacles){const rootPoint=new THREE.Vector3(Math.cos(t.a)*.25,1.25,Math.sin(t.a)*.25),midPoint=new THREE.Vector3(Math.cos(t.a)*.60,1.05,Math.sin(t.a)*.60),endPoint=new THREE.Vector3(Math.cos(t.a)*.90,.82,Math.sin(t.a)*.90);advSegment(rig,t.hip,rootPoint,midPoint,.065,black);advSegment(rig,t.mid,midPoint,endPoint,.04,black);advSphere(rig,t.end,endPoint,new THREE.Vector3(.07,.06,.07),glow);}
  group.updateMatrixWorld(true);return rig;
}
function advCreateMonster(model){
  if(model==='deer')return advCreateDeer(0);if(model==='crawler')return advCreateCrawler(0);if(model==='orb')return advCreateOrb(0);
  const profile={skin:'#121313',hair:'Бритая голова',eyes:model==='glass'?'Серые':'Карие',build:model==='brute'?'Крепкое':'Худощавое',height:model==='thin'?198:178,tattoo:'Нет'};
  const rig=advCreateHumanoid(profile,model,0),group=rig.group;
  const pale=advMat(0x111516,.98),bone=advMat(0x49453c,.86),glow=advMat(model==='glass'?0x9ad7d6:0xc7473e,.22,{emissive:model==='glass'?0x367d80:0x8c1a18,emissiveIntensity:2.4});
  if(model==='brute')group.scale.set(1.2,1.08,1.08);
  if(model==='thin')group.scale.set(.82,1.12,.86);
  if(model==='glass')group.scale.set(.98,1.02,.98);
  if(model==='branch')group.scale.set(1.06,1.04,1.02);
  if(model==='echo')group.scale.set(.94,1.02,.94);
  // Distinct silhouettes: antler crown, twig spines, crystal plates, hood and elongated shroud.
  const h=rig.head;
  function localSegment(parent,a,b,r,mat){const dir=b.clone().sub(a),len=dir.length(),m=new THREE.Mesh(new THREE.CylinderGeometry(r*.55,r,len,7),mat);m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),dir.normalize());m.castShadow=true;m.layers.set(0);parent.add(m);return m;}
  if(model==='watcher'||model==='stalker'||model==='branch'){
    for(const sign of [-1,1]){localSegment(h,new THREE.Vector3(sign*.07,.12,0),new THREE.Vector3(sign*.20,.39,.04),.045,bone);localSegment(h,new THREE.Vector3(sign*.20,.39,.04),new THREE.Vector3(sign*.32,.52,-.02),.022,bone);if(model==='branch')localSegment(h,new THREE.Vector3(sign*.2,.26,.03),new THREE.Vector3(sign*.38,.40,.1),.018,bone);}
  }
  if(model==='echo'){
    const hood=new THREE.Mesh(new THREE.ConeGeometry(.26,.4,9),pale);hood.position.set(0,.06,.04);hood.layers.set(0);h.add(hood);
    const shroud=new THREE.Mesh(new THREE.ConeGeometry(.52,1.0,9,1,true),advMat(0x080c0b,.98,{transparent:true,opacity:.72,side:THREE.DoubleSide}));shroud.position.set(0,-.37,.12);shroud.layers.set(0);rig.pelvis.add(shroud);
  }
  if(model==='glass'){
    for(let i=0;i<7;i++){const shard=new THREE.Mesh(new THREE.OctahedronGeometry(rand(.08,.18),1),advMat(0x63959a,.22,{metalness:.48,transparent:true,opacity:.78,emissive:0x17454c,emissiveIntensity:.7}));shard.position.set(rand(-.28,.28),rand(.94,1.53),rand(-.15,.2));shard.rotation.set(rand(0,2),rand(0,2),rand(0,2));shard.layers.set(0);group.add(shard);}
  }
  if(model==='branch'){
    for(let i=0;i<6;i++){const b=new THREE.Mesh(new THREE.ConeGeometry(.04,.42,6),bone);b.position.set(rand(-.23,.23),rand(.95,1.5),rand(-.1,.16));b.rotation.z=rand(-.8,.8);b.layers.set(0);rig.chest.add(b);}
  }
  // Face lights are visible through the fog; the model otherwise absorbs light.
  for(const sign of [-1,1]){const eye=new THREE.Mesh(new THREE.SphereGeometry(.026,12,10),glow);eye.position.set(sign*.057,1.805,-.14);eye.layers.set(0);h.add(eye);}
  const haze=new THREE.Mesh(new THREE.SphereGeometry(model==='brute'?1.15:.85,14,12),new THREE.MeshBasicMaterial({color:model==='glass'?0x5b9ba0:0x6b1820,transparent:true,opacity:.065,depthWrite:false}));haze.position.set(0,1.08,0);haze.layers.set(0);group.add(haze);
  rig.animate=(t,moving,running,attack)=>{
    const speed=running?12:moving?7:1,amp=moving?(running?.82:.52):.035,step=Math.sin(t*speed+rig.phase);rig.root.position.y=moving?Math.abs(Math.sin(t*speed*2))*.035:Math.sin(t*1.2+rig.phase)*.012;rig.spine.rotation.z=Math.sin(t*speed)*.03;rig.spine.rotation.x=attack?-.38:Math.sin(t*speed)*.05;
    for(const side of ['L','R']){const a=rig.arm[side],l=rig.leg[side],offset=side==='L'?0:Math.PI;a.shoulder.rotation.x=moving?Math.sin(t*speed+offset)*amp:Math.sin(t*.8+offset)*.04;a.shoulder.rotation.z=a.sign*(model==='brute'?.24:.08)+(attack?a.sign*.75:0);a.elbow.rotation.x=attack?-.85:(moving?Math.max(0,Math.sin(t*speed+offset))*.35:0);l.hip.rotation.x=moving?Math.sin(t*speed+offset+Math.PI)*amp:Math.sin(t*.5+offset)*.025;l.knee.rotation.x=moving?Math.max(0,-Math.sin(t*speed+offset+Math.PI))*.8:0;}
  };
  rig.kind=model;return rig;
}

function advCreatorProfile(){return {name:$('#char-name').value.trim()||'Странник',age:Number($('#char-age').value)||27,height:Number($('#char-height').value)||178,weight:Number($('#char-weight').value)||76,build:$('#char-build').value,skin:$('#char-skin').value,hair:$('#char-hair').value,hairStyle:$('#char-hair-style')?.value||'Короткая стрижка',clothes:$('#char-clothes')?.value||'Походная куртка',eyes:$('#char-eyes').value,tattoo:$('#char-tattoo').value};}
function advDisposeRig(rig){if(!rig)return;rig.group.traverse(o=>{if(o.isMesh){o.geometry?.dispose();if(o.material&&!Array.isArray(o.material))o.material.dispose();}});}
function advRefreshPreview(){
  if(!advPreviewScene||!$('#appearance-step'))return;
  if(advPreviewRenderer&&advPreviewCamera){const canvas=$('#character-preview');const width=canvas?.clientWidth||320,height=canvas?.clientHeight||340;advPreviewRenderer.setSize(width,height,false);advPreviewCamera.aspect=width/height;advPreviewCamera.updateProjectionMatrix();}
  if(advPreviewRig){advPreviewScene.remove(advPreviewRig.group);advDisposeRig(advPreviewRig);}
  advPreviewRig=advCreateHumanoid(advCreatorProfile(),'player',1);advPreviewScene.add(advPreviewRig.group);advPreviewRig.group.position.set(0,-.02,0);advPreviewRig.group.rotation.y=-.25;
}
function advInitPreview(){
  const c=$('#character-preview');if(!c||advPreviewRenderer)return;
  try{advPreviewRenderer=new THREE.WebGLRenderer({canvas:c,alpha:true,antialias:true,powerPreference:'low-power'});advPreviewRenderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));advPreviewRenderer.setSize(c.clientWidth||300,c.clientHeight||290,false);advPreviewRenderer.outputColorSpace=THREE.SRGBColorSpace;advPreviewRenderer.toneMapping=THREE.ACESFilmicToneMapping;advPreviewScene=new THREE.Scene();advPreviewCamera=new THREE.PerspectiveCamera(34,1,.1,30);advPreviewCamera.position.set(0,1.08,4.7);advPreviewCamera.lookAt(0,1.0,0);advPreviewCamera.layers.set(1);const hemiLight=new THREE.HemisphereLight(0xe4e0d1,0x34352d,1.65);hemiLight.layers.enable(1);advPreviewScene.add(hemiLight);const key=new THREE.DirectionalLight(0xffe1bd,2.2);key.position.set(-3,5,4);key.layers.enable(1);advPreviewScene.add(key);const fill=new THREE.DirectionalLight(0x91a9a2,.8);fill.position.set(3,2,-2);fill.layers.enable(1);advPreviewScene.add(fill);advRefreshPreview();
    const draw=(time)=>{if(!advPreviewRenderer)return;requestAnimationFrame(draw);if(advPreviewRig){advPreviewRig.group.rotation.y=Math.sin(time*.00035)*.17-.25;advPreviewRig.animate(time*.001,false,false,false);}advPreviewRenderer.render(advPreviewScene,advPreviewCamera);};requestAnimationFrame(draw);
    const resize=()=>{if(!advPreviewRenderer)return;const w=c.clientWidth||300,h=c.clientHeight||290;advPreviewRenderer.setSize(w,h,false);advPreviewCamera.aspect=w/h;advPreviewCamera.updateProjectionMatrix();};window.addEventListener('resize',resize);
    ['#char-name','#char-age','#char-height','#char-weight','#char-build','#char-skin','#char-hair','#char-hair-style','#char-clothes','#char-eyes','#char-tattoo'].forEach(sel=>{$(sel)?.addEventListener('change',advRefreshPreview);$(sel)?.addEventListener('input',advRefreshPreview);});
    $('#to-appearance')?.addEventListener('click',()=>setTimeout(advRefreshPreview,50));$('#random-traits')?.addEventListener('click',()=>setTimeout(advRefreshPreview,50));
  }catch(e){console.warn('Character preview unavailable',e);}
}

function advCreateWorldAvatar(){
  if(!scene||!state.player)return;
  if(advWorldAvatar){scene.remove(advWorldAvatar.group);advDisposeRig(advWorldAvatar);advWorldAvatar=null;}
  const profile=state.player.profile||{};advWorldAvatar=advCreateHumanoid(profile,'player',1);advWorldAvatar.group.position.set(state.player.x,terrainHeight(state.player.x,state.player.z),state.player.z);advWorldAvatar.group.rotation.y=state.yaw;scene.add(advWorldAvatar.group);
  if(sun?.shadow?.camera)sun.shadow.camera.layers.enable(1);if(sun?.layers)sun.layers.enable(1);if(hemi?.layers)hemi.layers.enable(1);if(moon?.layers)moon.layers.enable(1);
  if(camera){if(advThirdPerson)camera.layers.enable(1);else camera.layers.set(0);}
}
function advToggleCamera(){if(!state.active||state.paused||state.uiOpen)return;advThirdPerson=!advThirdPerson;if(camera){if(advThirdPerson)camera.layers.enable(1);else camera.layers.set(0);}toast(advThirdPerson?'Камера: от третьего лица':'Камера: от первого лица');}
function advUpdateAvatar(delta){
  if(!advWorldAvatar||!state.player||!scene)return;advNavRefresh-=delta;if(advNavRefresh<=0){advBuildNavGrid();advNavRefresh=3.0;}const p=state.player;advWorldAvatar.group.position.set(p.x,terrainHeight(p.x,p.z),p.z);advWorldAvatar.group.rotation.y=state.yaw;
  const moving=!!(state.keys.KeyW||state.keys.KeyA||state.keys.KeyS||state.keys.KeyD),running=moving&&!!(state.keys.ShiftLeft||state.keys.ShiftRight)&&p.stamina>0;advWorldAvatar.animate(state.clock,moving,running,!!state.player.lastAttack);
  if(advThirdPerson&&camera){const target=new THREE.Vector3(p.x,p.y-.45,p.z);const look=new THREE.Vector3(-Math.sin(state.yaw)*Math.cos(state.pitch),Math.sin(state.pitch),-Math.cos(state.yaw)*Math.cos(state.pitch));const pos=target.clone().addScaledVector(look,-4.6);pos.y+=1.0;camera.position.copy(pos);camera.lookAt(target.x+look.x*1.6,target.y+look.y*1.6,target.z+look.z*1.6);}
}

function advBuildNavGrid(){
  advNavCell=2.5;advNavMin=-58;advNavSize=Math.ceil(116/advNavCell)+1;advNavGrid=new Uint8Array(advNavSize*advNavSize);
  const obstacles=(forest||[]).map(t=>({x:t.position.x,z:t.position.z,r:.78*(t.scale?.x||1)+.28}));
  for(const o of state.structures||[]){const id=o.userData.building;if(['wall','tent','shelter','workbench','storage','bed','floor','stove','collector','dryingRack','woodRack'].includes(id))obstacles.push({x:o.position.x,z:o.position.z,r:id==='wall'?1.5:id==='tent'||id==='shelter'?1.8:id==='floor'?.78:1.05});}
  for(let gz=0;gz<advNavSize;gz++)for(let gx=0;gx<advNavSize;gx++){const x=advNavMin+gx*advNavCell,z=advNavMin+gz*advNavCell;let blocked=Math.hypot(x,z)>56.8;for(const o of obstacles){const dx=x-o.x,dz=z-o.z;if(dx*dx+dz*dz<o.r*o.r){blocked=true;break;}}advNavGrid[gz*advNavSize+gx]=blocked?1:0;}
}
function advWorldToGrid(x,z){return {x:clamp(Math.round((x-advNavMin)/advNavCell),0,advNavSize-1),z:clamp(Math.round((z-advNavMin)/advNavCell),0,advNavSize-1)};}
function advGridToWorld(x,z){return {x:advNavMin+x*advNavCell,z:advNavMin+z*advNavCell};}
function advBlocked(x,z){if(!advNavGrid)return false;const p=advWorldToGrid(x,z);return advNavGrid[p.z*advNavSize+p.x]===1;}
function advNearestOpen(node){if(!advNavGrid)return node;if(!advNavGrid[node.z*advNavSize+node.x])return node;for(let r=1;r<6;r++)for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r;dx++){const x=node.x+dx,z=node.z+dz;if(x<0||z<0||x>=advNavSize||z>=advNavSize)continue;if(!advNavGrid[z*advNavSize+x])return {x,z};}return node;}
function advHeuristic(a,b){const dx=Math.abs(a.x-b.x),dz=Math.abs(a.z-b.z);return Math.max(dx,dz)+(Math.SQRT2-1)*Math.min(dx,dz);}
function advHeapPush(heap,node){heap.push(node);let i=heap.length-1;while(i>0){const p=(i-1)>>1;if(heap[p].f<=node.f)break;heap[i]=heap[p];i=p;}heap[i]=node;}
function advHeapPop(heap){const top=heap[0],last=heap.pop();if(heap.length){let i=0;while(true){let l=i*2+1,r=l+1;if(l>=heap.length)break;let c=r<heap.length&&heap[r].f<heap[l].f?r:l;if(heap[c].f>=last.f)break;heap[i]=heap[c];i=c;}heap[i]=last;}return top;}
function advLineClear(a,b){const dist=Math.hypot(b.x-a.x,b.z-a.z),steps=Math.ceil(dist/(advNavCell*.42));for(let i=1;i<steps;i++){const t=i/steps;if(advBlocked(a.x+(b.x-a.x)*t,a.z+(b.z-a.z)*t))return false;}return true;}
function advFindPath(from,to){
  if(!advNavGrid)return [to];let start=advNearestOpen(advWorldToGrid(from.x,from.z)),goal=advNearestOpen(advWorldToGrid(to.x,to.z));const n=advNavSize,total=n*n,startId=start.z*n+start.x,goalId=goal.z*n+goal.x;
  const g=new Float32Array(total);g.fill(Infinity);const parent=new Int32Array(total);parent.fill(-1);const closed=new Uint8Array(total),heap=[];g[startId]=0;advHeapPush(heap,{id:startId,x:start.x,z:start.z,f:advHeuristic(start,goal)});
  const dirs=[[1,0,1],[-1,0,1],[0,1,1],[0,-1,1],[1,1,Math.SQRT2],[1,-1,Math.SQRT2],[-1,1,Math.SQRT2],[-1,-1,Math.SQRT2]];let iterations=0;
  while(heap.length&&iterations++<n*n*.8){const cur=advHeapPop(heap);if(closed[cur.id])continue;if(cur.id===goalId)break;closed[cur.id]=1;
    for(const [dx,dz,cost] of dirs){const x=cur.x+dx,z=cur.z+dz;if(x<0||z<0||x>=n||z>=n)continue;const id=z*n+x;if(advNavGrid[id]||closed[id])continue;if(dx&&dz&&(advNavGrid[cur.z*n+x]||advNavGrid[z*n+cur.x]))continue;const ng=g[cur.id]+cost;if(ng<g[id]){g[id]=ng;parent[id]=cur.id;advHeapPush(heap,{id,x,z,f:ng+advHeuristic({x,z},goal)});}}
  }
  if(parent[goalId]===-1&&goalId!==startId)return [to];const ids=[];let cur=goalId;while(cur!==startId&&cur>=0){ids.push(cur);cur=parent[cur];if(ids.length>n*n)break;}ids.reverse();let path=ids.map(id=>advGridToWorld(id%n,Math.floor(id/n)));path.push({x:to.x,z:to.z});
  // String-pull: remove intermediate cells wherever the trunks leave a clear corridor.
  const smooth=[];let i=0;while(i<path.length){smooth.push(path[i]);let far=i+1;for(let j=i+2;j<path.length;j++){if(advLineClear(path[i],path[j]))far=j;else break;}i=far;}return smooth;
}
function advPlayCreatureSound(entity,kind='alert'){
  const dist=distance2({x:entity.mesh.position.x,z:entity.mesh.position.z},state.player);if(dist>34)return;let key='growl';if(entity.def.model==='deer')key='wolf';else if(entity.def.model==='orb'||entity.def.model==='glass'||entity.def.model==='echo')key='ghost';else if(entity.def.model==='brute')key='roar';else if(entity.def.model==='crawler')key='zombie';if(kind==='attack'&&entity.def.model==='brute')key='roar';advAudio.oneShot(key,clamp(.55*(1-dist/42),.08,.5),entity.def.model==='brute'?.78:rand(.88,1.06));
}

function advPlayerNoiseRadius(){const moving=pMoving(),running=moving&&(state.keys.ShiftLeft||state.keys.ShiftRight)&&state.player.stamina>0;return running?30:moving?17:7;}
function advNightVisionRange(){const w=weatherState?.current||'clear';const night=state.dayTime>.73||state.dayTime<.22;return w==='fog'?15:night?21:34;}
function advChooseWanderPoint(anchor){for(let i=0;i<12;i++){const a=rand(0,Math.PI*2),r=rand(3,9),x=clamp(anchor.x+Math.cos(a)*r,-52,52),z=clamp(anchor.z+Math.sin(a)*r,-52,52);if(!advBlocked(x,z))return {x,z};}return {x:anchor.x,z:anchor.z};}

function advUpdateNightmare(delta){
  const def=state.currentNightmare;if(!def)return;const p=state.player,id=def.id,overlay=$('#nightmare-overlay');let nearest=99;const forward=new THREE.Vector3(-Math.sin(state.yaw),0,-Math.cos(state.yaw));
  const safe=nearSafeLight();state.nightmareFxTick-=delta;
  for(const e of state.nightmareEntities){
    const m=e.mesh,rig=e.rig||m.userData.rig;let dx=p.x-m.position.x,dz=p.z-m.position.z,dist=Math.hypot(dx,dz),dir=new THREE.Vector3(dx,0,dz).normalize();nearest=Math.min(nearest,dist);
    const toEntity=new THREE.Vector3(-dx,0,-dz).normalize(),looking=forward.dot(toEntity)>.72,inBeam=state.leftHandOn&&dist<18&&forward.dot(toEntity)>.5;
    const canSee=dist<advNightVisionRange()&&advLineClear({x:m.position.x,z:m.position.z},p),heard=dist<advPlayerNoiseRadius();
    if(canSee||heard){e.lastTarget={x:p.x,z:p.z};e.lastSeenTime=0;e.awareness=canSee?1:.65;}else e.lastSeenTime=(e.lastSeenTime||0)+delta;
    if(!e.lastTarget)e.lastTarget={x:p.x,z:p.z};
    if(e.lastSeenTime>8&&(!e.wanderTarget||distance2({x:m.position.x,z:m.position.z},e.wanderTarget)<1.4))e.wanderTarget=advChooseWanderPoint(e.lastTarget);
    const goal=e.lastSeenTime>8?(e.wanderTarget||e.lastTarget):e.lastTarget;
    e.attackCooldown-=delta;e.pathTimer=(e.pathTimer||0)-delta;e.chargeWait=Math.max(0,(e.chargeWait||0)-delta);e.blink=(e.blink??3)-delta;e.callTimer=(e.callTimer??rand(8,13))-delta;
    let speed=e.def.speed,retreat=false,charging=false,shouldPath=true;
    if(e.def.mode==='watch'&&looking){speed=0;e.aiState='frozen under gaze';}
    else if(e.def.mode==='watch'&&inBeam){speed=1.15;retreat=true;e.aiState='retreating from light';}
    else if(e.def.mode==='light'&&inBeam){speed=1.65;retreat=true;e.aiState='retreating from beam';}
    else if(e.def.mode==='charge'){
      if(!e.charge&&e.chargeWait<=0&&dist<24&&canSee){e.charge=2.0;e.chargeWait=rand(4.5,6.5);advPlayCreatureSound(e,'attack');}
      if(e.charge>0){e.charge=Math.max(0,e.charge-delta);speed=5.8;charging=true;e.aiState='charging';}else{speed*=.78;e.aiState=dist>18?'stalking':'circling';}
    } else if(e.def.mode==='mirror'&&e.blink<=0&&dist<19&&!looking){const a=state.yaw+Math.PI+rand(-.5,.5),tx=clamp(p.x-Math.sin(a)*rand(9,13),-54,54),tz=clamp(p.z-Math.cos(a)*rand(9,13),-54,54);m.position.set(tx,terrainHeight(tx,tz),tz);e.path=[];e.pathTimer=0;e.blink=rand(6,9);advPlayCreatureSound(e,'alert');dx=p.x-m.position.x;dz=p.z-m.position.z;dist=Math.hypot(dx,dz);dir.set(dx,0,dz).normalize();}
    else if(e.def.mode==='blink'&&e.blink<=0&&dist<15){const a=rand(0,Math.PI*2),tx=clamp(p.x+Math.cos(a)*rand(8,14),-54,54),tz=clamp(p.z+Math.sin(a)*rand(8,14),-54,54);m.position.set(tx,terrainHeight(tx,tz),tz);e.path=[];e.pathTimer=0;e.blink=rand(5,8);dx=p.x-m.position.x;dz=p.z-m.position.z;dist=Math.hypot(dx,dz);dir.set(dx,0,dz).normalize();advPlayCreatureSound(e,'alert');}
    else e.aiState=dist>20?'searching':'closing distance';
    if(e.def.mode==='mirror'||e.def.mode==='blink')e.blink=Math.max(0,e.blink);
    let navGoal=goal;if(retreat)navGoal={x:clamp(m.position.x-dir.x*12,-53,53),z:clamp(m.position.z-dir.z*12,-53,53)};
    if(speed>0&&e.pathTimer<=0){e.path=advFindPath({x:m.position.x,z:m.position.z},navGoal);e.pathIndex=0;e.pathTimer=rand(.62,.92);}
    let moveDir=retreat?dir.clone().multiplyScalar(-1):new THREE.Vector3(navGoal.x-m.position.x,0,navGoal.z-m.position.z).normalize();
    if(speed>0&&e.path?.length){while(e.pathIndex<e.path.length-1&&distance2({x:m.position.x,z:m.position.z},e.path[e.pathIndex])<1.1)e.pathIndex++;const wp=e.path[e.pathIndex];moveDir.set(wp.x-m.position.x,0,wp.z-m.position.z).normalize();}
    const oldX=m.position.x,oldZ=m.position.z;
    if(Math.abs(speed)>.01){m.position.x=clamp(m.position.x+moveDir.x*speed*delta,-55,55);m.position.z=clamp(m.position.z+moveDir.z*speed*delta,-55,55);if(advBlocked(m.position.x,m.position.z)){m.position.x=oldX;m.position.z=oldZ;e.pathTimer=0;}}
    m.position.y=terrainHeight(m.position.x,m.position.z);
    if(Math.abs(speed)>.08)m.rotation.y=Math.atan2(-moveDir.x,-moveDir.z);
    rig?.animate(state.clock,speed>.15,speed>3,dist<2.5);e.attackCooldown=Math.max(0,e.attackCooldown);
    if(dist<1.62&&e.attackCooldown<=0&&!safe){damage(e.def.damage,'Кошмар');p.stamina=clamp(p.stamina-17,0,100);e.attackCooldown=1.8;advPlayCreatureSound(e,'attack');}
    if(e.def.mode==='aura'&&dist<12)p.stamina=clamp(p.stamina-delta*(12-dist)*.42,0,100);
    if(e.def.mode==='fear'&&dist<16)state.fear=clamp(state.fear+delta*4.5,0,100);
    if(e.callTimer<=0&&dist<30){advPlayCreatureSound(e,'idle');e.callTimer=rand(10,18);}
  }
  if(state.nightmareEntities.length){if(nearest<22)state.fear=clamp(state.fear+delta*(22-nearest)*.3,0,100);else state.fear=clamp(state.fear-delta*2.1,0,100);}
  if(id==='muteFog'){overlay.style.opacity=String(.19+Math.sin(state.clock*2.1)*.04);}
  else if(id==='reverseNorth'){overlay.style.opacity=String(.12+Math.sin(state.clock*5)*.06);if($('#compass'))$('#compass').textContent=state.nightmare>def.duration-7?'?':(state.yaw%(Math.PI*2)>0?'N':'S');}
  else if(id==='blackSquall'){overlay.style.opacity=String(.24+Math.sin(state.clock*13)*.08);p.stamina=clamp(p.stamina-delta*(safe?1.2:7),0,100);}
  else if(id==='falseDawn'){overlay.style.opacity=String(.18+Math.sin(state.clock*3)*.05);if(!safe&&state.nightmare<def.duration-4&&state.nightmareFxTick<=0){damage(1,'Ложный рассвет');state.nightmareFxTick=2.8;}}
  else if(id==='bell'){overlay.style.opacity=String(.16+Math.max(0,Math.sin(state.clock*4.2))*.19);if(state.nightmareFxTick<=0){const still=!pMoving();p.stamina=clamp(p.stamina-(still?12:3),0,100);state.fear=clamp(state.fear+(still?7:2),0,100);state.nightmareFxTick=5.2;}}
  else if(id==='wrongTracks'){overlay.style.opacity=String(.13+Math.sin(state.clock*7)*.05);if($('#compass'))$('#compass').textContent=['N','E','S','W'][Math.floor(state.clock*1.8)%4];}
  else if(id==='sleepDrop'){overlay.style.opacity=String(.17+Math.sin(state.clock*2.1)*.08);p.stamina=clamp(p.stamina-delta*3.5,0,100);}
  else if(id==='emptyPath'){overlay.style.opacity=String(.2+Math.sin(state.clock*4)*.045);if(distance2(p,state.nightmareOrigin)>24)damage(delta*2.4,'Пустая тропа');}
  else{overlay.style.opacity=String(.2+Math.sin(state.clock*8)*.055);}
  if(id==='muteFog'||id==='blackSquall'||id==='falseDawn'||id==='emptyPath')$('#nightmare-card').dataset.kind='event';
}
function pMoving(){return !!(state.keys.KeyW||state.keys.KeyA||state.keys.KeyS||state.keys.KeyD);}

const advBaseUpdateWorld=updateWorld;
updateWorld=function(delta){
  advBaseUpdateWorld(delta);
  if(!state.active||state.paused||state.uiOpen)return;
  advUpdateAvatar(delta);advAudio.update(delta);
};
const advBaseStartNewGame=startNewGame;
startNewGame=function(profile,professionStats={}){advThirdPerson=false;if(camera)camera.layers.set(0);advBaseStartNewGame(profile,professionStats);advBuildNavGrid();advCreateWorldAvatar();advAudio.init();advRefreshPreview();};
const advBaseLoadGame=loadGame;
loadGame=function(slot){advBaseLoadGame(slot);if(state.active){advBuildNavGrid();advCreateWorldAvatar();advAudio.init();}};
const advBaseRevive=reviveAfterCollapse;
reviveAfterCollapse=function(){advBaseRevive();advCreateWorldAvatar();};
makeNightmareModel=function(model){const rig=advCreateMonster(model);rig.group.userData.rig=rig;return rig.group;};
updateNightmare=advUpdateNightmare;

// Register the new controls and settings after the original game setup has run.
$('#master-volume')?.addEventListener('input',e=>advAudio.setVolume(e.target.value));
$('#sound-toggle')?.addEventListener('click',()=>advAudio.setEnabled(!advAudio.enabled));
$('#choose-save')?.addEventListener('click',()=>{if(state.active)advAudio.init();});
$('#new-game')?.addEventListener('click',()=>{setTimeout(advRefreshPreview,80);});
advInitPreview();
if(scene){advBuildNavGrid();if(sun?.layers)sun.layers.enable(1);if(hemi?.layers)hemi.layers.enable(1);if(moon?.layers)moon.layers.enable(1);if(sun?.shadow?.camera)sun.shadow.camera.layers.enable(1);}



/* Extra bespoke prop silhouettes, first-person bone rig and polished runtime wiring. */
ADV_AUDIO_URLS.grass='https://spritepilot.com/free-assets/sound-effects/movement/steps-grass.ogg';
ADV_AUDIO_URLS.zombie='https://spritepilot.com/free-assets/sound-effects/creatures/zombie-groan.ogg';

function advItemTextTexture(lines,bg='#54594d',fg='#ded8c4'){
  const c=document.createElement('canvas');c.width=256;c.height=128;const x=c.getContext('2d');x.fillStyle=bg;x.fillRect(0,0,256,128);x.strokeStyle='rgba(235,224,193,.55)';x.lineWidth=4;x.strokeRect(5,5,246,118);x.fillStyle=fg;x.textAlign='center';x.font='bold 22px sans-serif';x.fillText(lines[0]||'',128,54);x.font='12px sans-serif';x.fillText(lines[1]||'FIELD EQUIPMENT',128,82);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t;
}
function advLootMesh(g,geometry,mat,pos,rot){const m=new THREE.Mesh(geometry,mat);m.position.set(pos[0],pos[1],pos[2]);if(rot)m.rotation.set(rot[0],rot[1],rot[2]);m.castShadow=true;m.receiveShadow=true;g.add(m);return m;}
function advEnhanceLoot(g,name){
  const safeModels=new Set(['Керосиновая лампа','Свеча','Гитара','Цифровой фотоаппарат','Фотоаппарат Kodak','Электронный будильник','Термос','Компас','Блокнот','Дневник','Тетрадь в клетку','Палатка','Мешок','Брезент','Армейский котелок','Чайник','Кастрюля','Электронная плита','Динамо-фонарь','Химический источник света','Фонарик на батарейках','Бутылка воды','Чистая вода','Сырая вода','Термометр','Пластиковый контейнер','Пластмассовый ящик','Пластиковый тазик','Рамка для фотографии','Деревянный стульчик','Деревянный стул','Универсальная аптечка','Аптечка','Бинт','Пластырь','Яблоко','Манго','Лимон','Помидор','Огурец','Картофель','Морковь','Банан','Хлеб','Булочка с кунжутом']);
  if(!safeModels.has(name))return;
  // Replace the low-detail category proxy with a dedicated silhouette; keep the ground halo.
  for(const child of g.children){if(child.isMesh&&child.geometry?.type!=='CircleGeometry')child.visible=false;}
  const matte=advMat(0x6d6a5e,.92),dark=advMat(0x252b28,.42,{metalness:.36}),iron=advMat(0x69736d,.32,{metalness:.68}),glass=advMat(0x91aaa0,.16,{metalness:.08,transparent:true,opacity:.62}),wax=advMat(0xc8bda1,.86),cloth=advMat(0x505e4b,.96),cream=advMat(0xd5ccb4,.95);
  const box=(p,s,m,r)=>advLootMesh(g,new THREE.BoxGeometry(...s),m,p,r),cyl=(p,r1,r2,h,m,segments=18,rot)=>advLootMesh(g,new THREE.CylinderGeometry(r1,r2,h,segments),m,p,rot),sphere=(p,s,m)=>advLootMesh(g,new THREE.SphereGeometry(1,18,14),m,p).scale.set(...s),torus=(p,r,t,m,rot)=>advLootMesh(g,new THREE.TorusGeometry(r,t,8,24),m,p,rot);
  if(name==='Керосиновая лампа'){
    cyl([0,.12,0],.16,.12,.20,iron);cyl([0,.27,0],.07,.08,.12,matte);cyl([0,.52,0],.095,.095,.40,glass,16);torus([0,.32,0],.10,.018,iron);torus([0,.72,0],.095,.016,iron);cyl([0,.75,0],.035,.035,.08,iron);sphere([0,.4,0],[.035,.065,.035],new THREE.MeshBasicMaterial({color:0xffb45f}));const h=torus([0,.46,.06],.18,.018,iron,[Math.PI/2,0,0]);h.scale.set(.72,1,1);
    const glow=new THREE.PointLight(0xffb65c,.35,2.4);glow.position.set(0,.5,0);g.add(glow);
  }else if(name==='Свеча'){
    cyl([0,.19,0],.065,.07,.36,wax,16);cyl([0,.39,0],.008,.008,.045,dark,8);sphere([0,.45,0],[.024,.06,.024],new THREE.MeshBasicMaterial({color:0xffb45e}));const glow=new THREE.PointLight(0xffb96b,.24,2);glow.position.set(0,.48,0);g.add(glow);cyl([0,.025,0],.13,.13,.035,iron);
  }else if(name==='Гитара'){
    sphere([0,.24,0],[.25,.33,.075],advMat(0x86532f,.7));sphere([0,.14,.012],[.2,.19,.08],advMat(0xa06b3d,.7));box([0,.50,0],[.07,.48,.045],advMat(0x6a482d,.85),[0,0,-.06]);box([0,.75,0],[.12,.11,.07],advMat(0x493123,.8));torus([0,.2,-.076],.063,.008,dark,[0,0,0]);for(let i=0;i<6;i++)box([-.035+i*.014,.43,-.082],[.003,.50,.003],advMat(0xd6cbb1,.38,{metalness:.5}));box([0,.4,-.08],[.13,.025,.012],iron);
  }else if(name==='Цифровой фотоаппарат'||name==='Фотоаппарат Kodak'){
    box([0,.19,0],[.42,.25,.19],dark);box([-.1,.34,.01],[.12,.07,.18],matte);cyl([0,.2,-.12],.115,.10,.1,iron,24,[Math.PI/2,0,0]);cyl([0,.2,-.18],.078,.08,.035,advMat(0x172c32,.18,{metalness:.1}),24,[Math.PI/2,0,0]);torus([0,.2,-.20],.09,.012,iron,[0,0,0]);box([.12,.23,.102],[.12,.075,.012],advItemTextTexture(['PHOTO','DIGITAL'],'#323b3b','#d5d3c6'));box([-.15,.34,-.06],[.08,.03,.03],cream);
  }else if(name==='Электронный будильник'){
    const display=advItemTextTexture(['07:24','ALARM'],'#17211f','#a9c8ac');box([0,.19,0],[.44,.28,.18],dark);box([0,.22,-.096],[.32,.16,.012],new THREE.MeshStandardMaterial({map:display,roughness:.32}));for(let i=0;i<3;i++)cyl([-.12+i*.12,.36,.025],.025,.025,.03,iron,12);box([0,.045,0],[.36,.035,.13],matte);
  }else if(name==='Термос'){
    cyl([0,.27,0],.115,.10,.45,iron);cyl([0,.52,0],.105,.105,.12,dark);torus([0,.45,0],.105,.012,cream);box([0,.27,-.105],[.13,.14,.012],advItemTextTexture(['THERMO','0.75 L'],'#47554e','#e4dcc5'));
  }else if(name==='Компас'){
    cyl([0,.13,0],.17,.17,.07,iron,24);cyl([0,.18,0],.145,.145,.018,glass,24);torus([0,.19,0],.15,.012,matte);cyl([0,.195,0],.018,.018,.008,cream,8);const n=advLootMesh(g,new THREE.ConeGeometry(.025,.12,4),advMat(0xa84435,.35),[0,.23,-.015]);n.rotation.x=Math.PI/2;box([0,.085,0],[.22,.015,.12],dark);
  }else if(['Блокнот','Дневник','Тетрадь в клетку'].includes(name)){
    const cover=advMat(name==='Дневник'?0x614638:name==='Блокнот'?0x455444:0x8d8d82,.94);box([0,.11,0],[.34,.035,.25],cover);box([0,.134,-.003],[.30,.008,.22],cream);for(let i=0;i<7;i++)box([-.12+i*.04,.141,-.005],[.002,.002,.18],advMat(0x8b9aaa,.9));for(let i=0;i<4;i++)torus([-.16+i*.03,.12,.005],.012,.004,iron,[0,Math.PI/2,0]);box([0,.14,-.12],[.30,.012,.018],cover);
  }else if(name==='Палатка'){
    const fabric=new THREE.MeshStandardMaterial({color:0x596d4d,roughness:.96,side:THREE.DoubleSide});const shape=new THREE.ConeGeometry(.62,.66,3,1,true);const tent=advLootMesh(g,shape,fabric,[0,.39,0],[0,Math.PI/6,0]);box([0,.05,0],[.9,.07,.72],advMat(0x393b31,.98));const door=box([0,.3,-.30],[.24,.40,.015],advMat(0x29392e,.95));door.rotation.z=.25;for(const x of [-.4,.4])cyl([x,.05,.2],.012,.012,.3,iron,6,[Math.PI/2,0,0]);
  }else if(name==='Мешок'||name==='Брезент'){
    sphere([0,.20,0],[.26,.34,.22],cloth);torus([0,.48,0],.11,.025,advMat(0x66533c,.94));for(let i=0;i<3;i++)box([0,.1+i*.12,-.205],[.28,.012,.012],advMat(0x7b806a,.95));
  }else if(['Армейский котелок','Чайник','Кастрюля'].includes(name)){
    cyl([0,.18,0],.21,.17,.25,iron,20);cyl([0,.32,0],.22,.22,.035,matte,20);sphere([0,.36,0],[.045,.03,.045],dark);torus([0,.20,0],.22,.018,iron,[Math.PI/2,0,0]);if(name==='Чайник'){cyl([.24,.2,0],.07,.025,.22,iron,12,[0,0,-.95]);torus([0,.31,0],.15,.016,iron,[Math.PI/2,0,0]);}else{torus([-.23,.22,0],.17,.018,iron,[Math.PI/2,0,0]);torus([.23,.22,0],.17,.018,iron,[Math.PI/2,0,0]);}
  }else if(name==='Электронная плита'){
    box([0,.12,0],[.55,.20,.48],dark);box([0,.23,-.02],[.51,.035,.44],matte);for(let x of [-.14,.14])for(let z of [-.12,.12])torus([x,.255,z],.078,.012,iron);for(let i=0;i<3;i++)cyl([-.18+i*.18,.16,.25],.025,.025,.025,metal,12,[Math.PI/2,0,0]);
  }else if(['Бутылка воды','Чистая вода','Сырая вода'].includes(name)){
    const pts=[new THREE.Vector2(.08,0),new THREE.Vector2(.10,.035),new THREE.Vector2(.105,.24),new THREE.Vector2(.075,.31),new THREE.Vector2(.05,.34),new THREE.Vector2(.05,.40),new THREE.Vector2(.07,.42)];const geo=new THREE.LatheGeometry(pts,20);advLootMesh(g,geo,glass,[0,.04,0]);cyl([0,.44,0],.055,.055,.06,advMat(0x8d7953,.7),16);box([0,.21,-.103],[.12,.11,.008],advItemTextTexture(['WATER','0.5 L'],'#445951','#d7dfd2'));cyl([0,.08,0],.087,.087,.025,advMat(0x9cb6ab,.22,{transparent:true,opacity:.55}),20);
  }else if(name==='Динамо-фонарь'||name==='Фонарик на батарейках'){
    cyl([0,.18,0],.09,.07,.42,dark,18,[Math.PI/2,0,0]);cyl([0,.18,-.22],.11,.11,.08,iron,18,[Math.PI/2,0,0]);cyl([0,.18,-.27],.075,.075,.018,advMat(0xe9d8a5,.2,{emissive:0x6c603d,emissiveIntensity:.35}),18,[Math.PI/2,0,0]);torus([0,.18,-.235],.105,.015,matte,[Math.PI/2,0,0]);if(name==='Динамо-фонарь'){box([.13,.16,.03],[.04,.20,.10],iron);cyl([.16,.26,.03],.02,.02,.14,iron,10,[0,0,Math.PI/2]);}
  }else if(name==='Химический источник света'){
    cyl([0,.20,0],.06,.06,.38,glass,16);cyl([0,.40,0],.062,.062,.045,matte,12);cyl([0,.20,0],.043,.043,.31,new THREE.MeshStandardMaterial({color:0x92d18a,emissive:0x438b54,emissiveIntensity:.4,transparent:true,opacity:.82}),16);torus([0,.38,0],.06,.012,cream);
  }else if(name==='Термометр'){
    box([0,.22,0],[.14,.42,.055],cream);cyl([0,.10,-.03],.027,.027,.11,advMat(0xbd4d42,.5));box([0,.25,-.031],[.012,.25,.009],advMat(0xbd4d42,.5));for(let i=0;i<6;i++)box([.04,.12+i*.05,-.03],[.026,.004,.004],dark);
  }else if(name==='Пластиковый контейнер'||name==='Пластмассовый ящик'||name==='Пластиковый тазик'){
    const col=name==='Пластмассовый ящик'?0x53675e:0x82958d;box([0,.15,0],[.42,.30,.35],advMat(col,.55,{transparent:true,opacity:.86}));box([0,.31,0],[.45,.045,.38],advMat(0x6a756a,.45));for(let x of [-.18,.18])box([x,.17,-.18],[.04,.13,.02],dark);
  }else if(name==='Рамка для фотографии'){
    box([0,.20,0],[.39,.33,.035],advMat(0x654932,.83));box([0,.20,-.021],[.31,.25,.012],advItemTextTexture(['FOREST','AUTUMN 1998'],'#60735d','#d6d2c3'));box([0,.015,.05],[.20,.04,.12],matte);
  }else if(name==='Деревянный стул'||name==='Деревянный стульчик'){
    const h=name==='Деревянный стульчик'?.34:.48;box([0,h,0],[.42,.07,.38],advMat(0x78583a,.94));for(let x of [-.17,.17])for(let z of [-.14,.14])box([x,h/2,z],[.055,h,.055],advMat(0x62462e,.94));box([0,h+.25,.16],[.42,.45,.06],advMat(0x735338,.94));
  }else if(name==='Универсальная аптечка'||name==='Аптечка'){
    box([0,.15,0],[.40,.27,.28],advMat(0xd8d7c8,.82));box([0,.29,0],[.42,.035,.30],advMat(0x9b9e91,.8));box([0,.17,-.151],[.06,.19,.015],advMat(0xb84e42,.6));box([0,.17,-.153],[.19,.055,.015],advMat(0xb84e42,.6));box([0,.35,0],[.18,.045,.05],iron);
  }else if(name==='Бинт'||name==='Пластырь'){
    cyl([0,.13,0],.11,.11,.20,cream,18,[Math.PI/2,0,0]);torus([0,.13,-.11],.105,.014,advMat(0xd2c8b2,.92),[Math.PI/2,0,0]);box([0,.27,0],[.24,.035,.17],advMat(0xeee6d6,.95));
  }else if(['Яблоко','Манго','Лимон','Помидор','Огурец','Картофель','Банан','Морковь'].includes(name)){
    const color=name==='Яблоко'?0x9b3c2d:name==='Манго'?0xd18c38:name==='Лимон'?0xd7c54b:name==='Помидор'?0xb33b2b:name==='Огурец'?0x476b3a:name==='Картофель'?0x92754b:name==='Банан'?0xe5d28b:0xd47736;
    const fruit=advMat(color,.86);if(name==='Банан'){for(let i=0;i<3;i++){const f=advLootMesh(g,new THREE.CapsuleGeometry(.04,.32,4,10),fruit,[(i-1)*.065,.20,0],[0,0,(i-1)*.18]);} }else if(name==='Морковь'){const carrot=advLootMesh(g,new THREE.ConeGeometry(.09,.38,12),fruit,[0,.20,0],[0,0,Math.PI]);}else{sphere([0,.19,0],name==='Огурец'?[.11,.30,.10]:[.17,.18,.16],fruit);cyl([0,.37,0],.018,.018,.07,advMat(0x5a482e,.95),8);if(name==='Яблоко'||name==='Помидор')for(let i=0;i<5;i++){const leaf=advLootMesh(g,new THREE.ConeGeometry(.045,.12,5),advMat(0x52663a,.95),[Math.cos(i*1.2)*.055,.36,Math.sin(i*1.2)*.055],[.25,0,i*1.2]);}}
  }else if(name==='Хлеб'||name==='Булочка с кунжутом'){
    sphere([0,.16,0],[.27,.14,.16],advMat(0xb88a4d,.92));for(let i=0;i<7;i++)sphere([rand(-.19,.19),.25,rand(-.1,.1)],[.012,.006,.01],advMat(0xe6d8a8,.85));
  }
  g.userData.detailModel='authored-prop';g.userData.modelQuality='bespoke-procedural';
}
const advBaseMakeLootMesh=makeLootMesh;
makeLootMesh=function(name,x,z,freshness=100){const g=advBaseMakeLootMesh(name,x,z,freshness);advEnhanceLoot(g,name);return g;};

function advAddArmMesh(parent,geometry,mat,position,rotation=new THREE.Euler(),scale=new THREE.Vector3(1,1,1)){
  const mesh=new THREE.Mesh(geometry,mat);mesh.position.copy(position);mesh.rotation.copy(rotation);mesh.scale.copy(scale);mesh.castShadow=true;mesh.layers.set(0);parent.add(mesh);return mesh;
}
function advBuildFirstPersonArms(){
  if(!handGroup||!camera)return;handGroup.clear();handItem=null;if(leftLight){camera.remove(leftLight);camera.remove(leftLight.target);leftLight=null;}
  const bones=[];const root=new THREE.Bone();root.name='fpRoot';bones.push(root);handGroup.add(root);
  const skin=advMat(state.player.profile?.skin||'#bd8967',.8),fabric=advMat(0x4a5445,.96),cuff=advMat(0x2c332d,.9),glove=advMat(0x333a32,.92),seam=advMat(0x8b7a5c,.7);
  const arms={};
  for(const side of ['R','L']){
    const sign=side==='L'?-1:1,shoulder=advMakeBone(root,`fpShoulder${side}`,sign*.39,-.42,-.57,bones),elbow=advMakeBone(shoulder,`fpElbow${side}`,sign*.06,-.19,-.17,bones),wrist=advMakeBone(elbow,`fpWrist${side}`,sign*.035,-.17,-.10,bones),hand=advMakeBone(wrist,`fpHand${side}`,0,-.055,-.045,bones);
    const upper=new THREE.CapsuleGeometry(.105,.33,4,10);advAddArmMesh(shoulder,upper,fabric,new THREE.Vector3(0,-.12,0),new THREE.Euler(0,0,sign*-.22));
    const lower=new THREE.CapsuleGeometry(.082,.27,4,10);advAddArmMesh(elbow,lower,fabric,new THREE.Vector3(0,-.105,0),new THREE.Euler(0,0,sign*-.12));
    const band=new THREE.Mesh(new THREE.TorusGeometry(.085,.012,6,18),cuff);band.position.set(0,-.22,-.005);band.layers.set(0);elbow.add(band);
    const palm=advAddArmMesh(hand,new THREE.SphereGeometry(.085,16,12),skin,new THREE.Vector3(0,-.01,-.04),new THREE.Euler(0,0,0),new THREE.Vector3(1,.72,1.18));
    for(let i=0;i<4;i++){const finger=advAddArmMesh(hand,new THREE.CapsuleGeometry(.015,.07,3,7),skin,new THREE.Vector3((i-1.5)*.034,-.055,-.115),new THREE.Euler(Math.PI/2,0,(i-1.5)*.07));}
    const thumb=advAddArmMesh(hand,new THREE.CapsuleGeometry(.018,.065,3,7),skin,new THREE.Vector3(sign*.09,-.03,-.06),new THREE.Euler(.5,0,sign*.85));
    for(let i=0;i<2;i++)advAddArmMesh(shoulder,new THREE.BoxGeometry(.025,.015,.01),seam,new THREE.Vector3(sign*.04,-.19-i*.04,-.098));
    arms[side]={shoulder,elbow,wrist,hand,sign};
  }
  const skeleton=new THREE.Skeleton(bones);skeleton.calculateInverses();handGroup.userData.advBones=arms;handGroup.userData.advSkeleton=skeleton;handGroup.userData.advRoot=root;
  if(state.leftHandOn){const flashlight=new THREE.Group();advAddArmMesh(flashlight,new THREE.CylinderGeometry(.055,.075,.31,14),advMat(0x39453d,.35,{metalness:.55}),new THREE.Vector3(0,0,0),new THREE.Euler(Math.PI/2,0,0));advAddArmMesh(flashlight,new THREE.CircleGeometry(.06,18),new THREE.MeshBasicMaterial({color:0xffe3a9}),new THREE.Vector3(0,0,-.16),new THREE.Euler(0,0,0));flashlight.position.set(-.01,-.07,-.17);arms.L.hand.add(flashlight);leftLight=new THREE.SpotLight(0xffe1a3,1.3,27,Math.PI/7,.48,1.15);leftLight.position.set(-.43,-.27,-.74);leftLight.target.position.set(-.5,-.36,-1.8);camera.add(leftLight);camera.add(leftLight.target);}
  const name=state.quick[state.selectedSlot];if(name){const prop=advCreateHeldProp(name);prop.position.set(.10,-.04,-.17);prop.rotation.set(.18,-.24,-.4);prop.scale.setScalar(.82);arms.R.hand.add(prop);handItem=prop;}
}
function advCreateHeldProp(name){
  const g=new THREE.Group(),iron=advMat(0x66716d,.32,{metalness:.58}),wood=advMat(0x775638,.9),glass=advMat(0x91aaa0,.2,{transparent:true,opacity:.75});
  const add=(geo,mat,p,r)=>{const m=new THREE.Mesh(geo,mat);m.position.set(...p);if(r)m.rotation.set(...r);m.castShadow=true;g.add(m);return m;};
  if(name==='Компас'){add(new THREE.CylinderGeometry(.14,.15,.05,22),iron,[0,0,0]);add(new THREE.CircleGeometry(.12,22),advMat(0xd6ceb7,.42),[0,.028,0],[ -Math.PI/2,0,0]);add(new THREE.ConeGeometry(.018,.09,4),advMat(0xa84b3f,.35),[0,.055,0]);}
  else if(name==='Термос'||name==='Бутылка воды'||name==='Чистая вода'){add(new THREE.CylinderGeometry(.075,.09,.3,18),glass,[0,0,0]);add(new THREE.CylinderGeometry(.05,.05,.05,14),iron,[0,.18,0]);}
  else if(name==='Бинт'||name==='Аптечка'){add(new THREE.BoxGeometry(.22,.15,.18),advMat(0xdedbce,.9),[0,0,0]);add(new THREE.BoxGeometry(.055,.14,.012),advMat(0xb84f45,.8),[0,0,-.095]);add(new THREE.BoxGeometry(.14,.045,.012),advMat(0xb84f45,.8),[0,0,-.095]);}
  else if(name==='Гитара'){add(new THREE.SphereGeometry(.15,16,12),wood,[0,-.03,0],[0,0,0]);add(new THREE.BoxGeometry(.045,.45,.04),wood,[0,.23,0]);for(let i=0;i<4;i++)add(new THREE.CylinderGeometry(.002,.002,.42,5),iron,[(i-1.5)*.009,.18,-.04]);}
  else if(name==='Динамо-фонарь'||name==='Фонарик на батарейках'){add(new THREE.CylinderGeometry(.06,.08,.34,14),iron,[0,0,0],[Math.PI/2,0,0]);add(new THREE.CircleGeometry(.065,18),advMat(0xffe5ae,.2,{emissive:0x8f7544,emissiveIntensity:.5}),[0,0,-.18]);}
  else if(name==='Свеча'){add(new THREE.CylinderGeometry(.045,.05,.2,14),advMat(0xcac1a7,.9),[0,0,0]);add(new THREE.ConeGeometry(.025,.08,10),new THREE.MeshBasicMaterial({color:0xffb86b}),[0,.14,0]);}
  else {add(new THREE.BoxGeometry(.19,.14,.15),name.includes('вода')?glass:advMat(0x8b785b,.86),[0,0,0]);}
  return g;
}
function makeHandMesh(){advBuildFirstPersonArms();}
function advAnimateFP(delta){const arms=handGroup?.userData?.advBones;if(!arms)return;const moving=pMoving(),running=moving&&(state.keys.ShiftLeft||state.keys.ShiftRight)&&state.player.stamina>0;const speed=running?11:moving?7.2:1,amp=moving?(running?.45:.24):.018;for(const side of ['L','R']){const a=arms[side],phase=side==='L'?0:Math.PI;a.shoulder.rotation.x=Math.sin(state.clock*speed+phase)*amp;a.shoulder.rotation.z=a.sign*.06+(side==='R'&&state.consuming?-.24:0);a.elbow.rotation.x=moving?Math.max(0,Math.sin(state.clock*speed+phase))*.16:0;a.wrist.rotation.x=Math.sin(state.clock*speed+phase)*.035;}handGroup.position.y=moving?Math.abs(Math.sin(state.clock*speed*2))*(running?.035:.02):Math.sin(state.clock*1.2)*.006;}

// Replace the earlier fixed-geometry hands with a bone-driven first-person armature.
const advOriginalMakeHandMesh=makeHandMesh;
makeHandMesh=function(){advBuildFirstPersonArms();};
const advBaseUpdateWorldWithRig=updateWorld;
updateWorld=function(delta){advBaseUpdateWorldWithRig(delta);if(state.active&&!state.paused&&!state.uiOpen)advAnimateFP(delta);};

if($('#master-volume'))$('#master-volume').value=Math.round(advAudio.volume*100);
if($('#sound-toggle'))$('#sound-toggle').textContent=`Звук: ${advAudio.enabled?'включён':'выключен'}`;

/* Additional handcrafted low-poly prop set: food packaging, field gear and household objects. */
const advExtraModelNames = new Set([
  'Килька в томате','Пачка макарон','Перец чили','Томатный соус','Соль','Сахар','Копчёное мясо','Сухое молоко','Свиной фарш','Сало','Майонез','Сгущённое молоко','Арбуз','Ананас','Пельмени','Петрушка','Лук','Паприка','Копчёная колбаса','Сосиски консервированные','Равиоли консервированные','Мясо консервированное','Охотничьи колбаски','Докторская колбаса','Гречка','Пюре быстрого приготовления','Виноград','Яйцо','Батон','Макароны консервированные','Горошек консервированный','Фасоль консервированная','Кукуруза консервированная','Яблочный сок','Апельсиновый сок','Медовый батончик','Леденец','Шоколадка','Сухарики с сыром','Чипсы со вкусом краба','Жевательная резинка','Тушёнка','Шоколадный батончик','Ряженка','Семечки','Фисташки','Минеральная вода','Вода с газом',
  'Шариковая ручка','Карандаш','Маркер','Калькулятор','Электронный будильник','Генератор','Автомобильный аккумулятор','Блокнот','Дневник','Тетрадь в клетку','Мухобойка','Метла','Швабра','Веник','Бидон','Механические часы','Электронный термометр','Спички','Сухой спирт','Железное ведро','Кухонная доска','Зонтик','Фляга','Бокал','Стакан','Зажигалка','Маскировочная сеть','Валик','Краска','Картон','Канистра','Бинокль','Пустая бутылка'
]);
function advExtraProp(g,name){
  if(!advExtraModelNames.has(name))return;
  for(const child of g.children){if(child.isMesh&&child.geometry?.type!=='CircleGeometry')child.visible=false;}
  const dark=advMat(0x282e2b,.42,{metalness:.35}),metal=advMat(0x778079,.34,{metalness:.68}),wood=advMat(0x755536,.92),paper=advMat(0xd0c6ac,.95),rubber=advMat(0x242722,.92),red=advMat(0x98443a,.72),green=advMat(0x58674a,.9);
  const box=(p,s,m,r)=>advLootMesh(g,new THREE.BoxGeometry(...s),m,p,r),cyl=(p,r1,r2,h,m,n=18,r)=>advLootMesh(g,new THREE.CylinderGeometry(r1,r2,h,n),m,p,r),sphere=(p,s,m)=>advLootMesh(g,new THREE.SphereGeometry(1,18,14),m,p).scale.set(...s),torus=(p,r,t,m,rot)=>advLootMesh(g,new THREE.TorusGeometry(r,t,7,22),m,p,rot);
  const label=(title,tag='FIELD SUPPLY',bg='#5a6250')=>advMat(0xffffff,.88,{map:advItemTextTexture([title,tag],bg,'#ede4cc')});
  const cans=['Килька в томате','Сосиски консервированные','Равиоли консервированные','Мясо консервированное','Макароны консервированные','Горошек консервированный','Фасоль консервированная','Кукуруза консервированная','Тушёнка'];
  const packets=['Пачка макарон','Сухое молоко','Гречка','Пюре быстрого приготовления','Сахар','Соль','Паприка','Перец чили','Сухарики с сыром','Чипсы со вкусом краба','Семечки','Фисташки','Медовый батончик','Леденец','Шоколадка','Шоколадный батончик','Жевательная резинка'];
  const meats=['Копчёное мясо','Свиной фарш','Сало','Копчёная колбаса','Охотничьи колбаски','Докторская колбаса'];
  const drinks=['Яблочный сок','Апельсиновый сок','Минеральная вода','Вода с газом','Ряженка','Пустая бутылка','Бутылка воды','Фляга'];
  if(cans.includes(name)){
    const col=name.includes('томат')?0x994a35:name.includes('гор')?0x71804d:name.includes('фас')?0x745b3e:0x626d5a;
    cyl([0,.19,0],.11,.11,.31,label(name,'PRESERVED FOOD',`#${col.toString(16).padStart(6,'0')}`),24);cyl([0,.355,0],.111,.111,.025,metal,24);cyl([0,.025,0],.111,.111,.024,metal,24);torus([0,.368,0],.09,.006,dark);box([0,.34,-.113],[.05,.025,.01],paper);
  }else if(packets.includes(name)){
    const sweet=['Медовый батончик','Леденец','Шоколадка','Шоколадный батончик','Жевательная резинка'].includes(name);
    if(sweet){box([0,.13,0],[.32,.13,.12],label(name,'SNACK', '#704d3b'));box([0,.205,0],[.30,.018,.12],red);for(let i=-1;i<=1;i++)box([i*.10,.132,-.065],[.012,.11,.006],paper);}
    else{const color=name.includes('чип')?0x9b733e:name.includes('сухар')?0x87623f:0x68714e;box([0,.19,0],[.29,.35,.12],label(name,'DRY FOOD',`#${color.toString(16)}`));box([0,.37,-.068],[.28,.025,.01],dark);for(let x of [-.13,.13])box([x,.19,-.066],[.01,.30,.01],paper);}
  }else if(meats.includes(name)){
    const sausage=name.includes('колбас')||name.includes('сосиски')||name.includes('сало');const geo=new THREE.CapsuleGeometry(sausage?.085:.12,sausage?.32:.20,5,14);advLootMesh(g,geo,advMat(name.includes('сало')?0xc2a17e:0x8e4e3d,.88),[0,.19,0],[0,0,Math.PI/2]);if(sausage){for(let i=-1;i<=1;i++)torus([i*.12,.19,0],.075,.009,red,[Math.PI/2,0,0]);}else box([0,.09,-.10],[.28,.018,.02],paper);
  }else if(drinks.includes(name)){
    const empty=name==='Пустая бутылка',juice=name.includes('сок'),dairy=name==='Ряженка';const glassMat=advMat(empty?0x9daea7:juice?0xb98a44:dairy?0xb9a47f:0x8fa59a,.18,{transparent:true,opacity:.58,metalness:.08});
    cyl([0,.17,0],.09,.085,.30,glassMat,20);cyl([0,.34,0],.046,.055,.075,glassMat,18);cyl([0,.39,0],.05,.05,.035,red,16);box([0,.18,-.087],[.11,.095,.008],label(name,'BOTTLED', '#536254'));torus([0,.025,0],.085,.009,metal);
  }else if(name==='Виноград'){
    for(let i=0;i<13;i++){const a=i*2.4,r=.08+(i%3)*.024;sphere([Math.cos(a)*r,.12+(i%4)*.045,Math.sin(a)*r],[.045,.05,.045],advMat(i%2?0x504b69:0x655b75,.55));}cyl([0,.34,0],.012,.012,.09,wood,8);
  }else if(name==='Ананас'){
    sphere([0,.18,0],[.15,.25,.15],advMat(0xa37a36,.93));for(let i=-2;i<=2;i++){const leaf=advLootMesh(g,new THREE.ConeGeometry(.045,.28,5),green,[i*.04,.46,0],[0,0,i*.19]);}for(let y=0;y<4;y++)for(let x=-1;x<=1;x++)box([x*.07,.08+y*.055,-.145],[.012,.012,.012],advMat(0x67512d,.9));
  }else if(name==='Арбуз'){
    sphere([0,.2,0],[.24,.19,.23],advMat(0x476344,.88));for(let i=0;i<5;i++){const stripe=new THREE.Mesh(new THREE.TorusGeometry(.195,.008,5,28),advMat(0x8b9a56,.85));stripe.position.set(0,.2,0);stripe.rotation.y=i*.63;g.add(stripe);}
  }else if(name==='Петрушка'||name==='Лук'){
    for(let i=0;i<7;i++){const leaf=advLootMesh(g,new THREE.ConeGeometry(.035,.31,6),green,[rand(-.07,.07),.22,rand(-.07,.07)],[rand(-.35,.35),0,rand(-.5,.5)]);}if(name==='Лук')sphere([0,.10,0],[.12,.13,.12],advMat(0xa18b62,.95));
  }else if(name==='Яйцо'){
    sphere([0,.17,0],[.105,.15,.09],advMat(0xe7dfca,.9));box([0,.025,0],[.28,.05,.20],paper);for(let i=0;i<4;i++){const e=advLootMesh(g,new THREE.SphereGeometry(1,14,12),advMat(0xe7dfca,.9),[(i-1.5)*.045,.11,.0]);e.scale.set(.04,.08,.04);}
  }else if(name==='Батон'){
    const loaf=advLootMesh(g,new THREE.CapsuleGeometry(.15,.42,6,16),advMat(0xc49a5d,.93),[0,.16,0],[0,0,Math.PI/2]);for(let i=0;i<4;i++)box([-.20+i*.13,.25,-.10],[.06,.012,.012],paper,[0,0,-.2]);
  }else if(name==='Шариковая ручка'||name==='Карандаш'||name==='Маркер'){
    const pen=name==='Карандаш'?advMat(0xc6a05c,.8):name==='Маркер'?advMat(0x87544e,.72):advMat(0x354f6b,.55);cyl([0,.20,0],.025,.025,.40,pen,12,[0,0,Math.PI/2]);cyl([.22,.20,0],.025,.025,.045,metal,10,[0,0,Math.PI/2]);advLootMesh(g,new THREE.ConeGeometry(.022,.055,10),dark,[ -.22,.20,0],[0,0,Math.PI/2]);
  }else if(name==='Калькулятор'||name==='Электронный будильник'){
    const alarm=name.includes('будильник');box([0,.16,0],[.36,.31,.09],dark,[.08,0,0]);box([0,.23,-.049],[.25,.095,.008],advMat(0xa0aa8b,.38,{emissive:0x1d261a,emissiveIntensity:.18}));box([0,.23,-.055],[.22,.065,.004],advItemTextTexture([alarm?'07:30':'123456','LCD DISPLAY'],'#626b54','#dce1bd'));for(let i=0;i<(alarm?2:9);i++){const x=alarm?(i-0.5)*.16:(i%3-.9)*.085,y=alarm?.07:.12-Math.floor(i/3)*.07;box([x,y,-.052],[.045,.035,.012],advMat(i%2?0x555d55:0x777e70,.6));}if(alarm)for(let x of [-.13,.13])torus([x,.31,0],.07,.018,metal);
  }else if(name==='Генератор'){
    box([0,.20,0],[.52,.34,.34],advMat(0x455045,.72,{metalness:.25}));box([0,.39,0],[.50,.055,.34],dark);for(let i=0;i<6;i++)box([-.19+i*.075,.2,-.178],[.025,.21,.012],metal);cyl([.20,.25,-.18],.045,.045,.06,red,12,[Math.PI/2,0,0]);for(let x of [-.20,.20])for(let z of [-.11,.11])cyl([x,.045,z],.055,.055,.04,rubber,12,[Math.PI/2,0,0]);box([0,.43,.18],[.25,.035,.03],metal);
  }else if(name==='Автомобильный аккумулятор'){
    box([0,.16,0],[.45,.28,.30],advMat(0x373f38,.55));box([-.12,.32,0],[.08,.04,.08],red);box([.12,.32,0],[.08,.04,.08],metal);box([0,.20,-.155],[.29,.10,.01],label('12V BATTERY','SEALED UNIT','#394b48'));for(let i=0;i<5;i++)box([-.15+i*.075,.32,-.12],[.025,.025,.025],dark);
  }else if(['Блокнот','Дневник','Тетрадь в клетку'].includes(name)){
    const cover=advMat(name==='Дневник'?0x72523c:name==='Тетрадь в клетку'?0x4e6271:0x62614f,.92);box([0,.15,0],[.34,.40,.045],cover);box([0,.15,-.026],[.29,.35,.008],paper);for(let y=0;y<5;y++)box([0,.04+y*.055,-.032],[.25,.003,.003],advMat(0x8998a4,.7));for(let x of [-.13,-.10,-.07])torus([x,.15,-.04],.018,.004,metal,[Math.PI/2,0,0]);
  }else if(['Механические часы'].includes(name)){
    box([0,.19,0],[.27,.28,.055],dark);box([0,.19,-.032],[.21,.22,.008],paper);torus([0,.19,-.04],.11,.012,metal);cyl([0,.19,-.048],.006,.006,.014,red,8);box([-.12,.19,0],[.07,.34,.035],rubber);box([.12,.19,0],[.07,.34,.035],rubber);for(let i=0;i<12;i++){const a=i/12*Math.PI*2;box([Math.cos(a)*.087,.19+Math.sin(a)*.087,-.049],[.012,.012,.003],dark);}
  }else if(name==='Электронный термометр'){
    box([0,.20,0],[.13,.40,.045],paper);box([0,.29,-.026],[.095,.10,.008],advItemTextTexture(['18.4°C','THERMO'],'#58634d','#e1dfbe'));cyl([0,.055,0],.038,.038,.06,red,12);box([0,.10,-.028],[.035,.018,.005],red);
  }else if(name==='Мухобойка'||name==='Метла'||name==='Швабра'||name==='Веник'||name==='Валик'){
    cyl([0,.40,0],.018,.018,.72,wood,9);if(name==='Мухобойка'){box([0,.76,0],[.19,.12,.012],green);for(let i=0;i<6;i++)box([-.08+i*.03,.76,.009],[.008,.10,.01],metal);}else if(name==='Валик'){cyl([0,.76,0],.065,.065,.20,advMat(0xa5a08a,.85),14,[Math.PI/2,0,0]);}else{for(let i=0;i<9;i++)cyl([-.11+i*.027,.10,0],.012,.012,.22,name==='Швабра'?paper:wood,7);box([0,.18,0],[.27,.035,.07],metal);}
  }else if(name==='Бидон'||name==='Железное ведро'||name==='Канистра'||name==='Пустая бутылка'){
    if(name==='Канистра'){box([0,.19,0],[.31,.37,.19],advMat(0x66704e,.56));box([-.05,.40,-.01],[.15,.03,.12],dark);cyl([.10,.38,-.04],.045,.045,.045,metal,12);}
    else{cyl([0,.17,0],.16,.12,.30,metal,20);torus([0,.33,0],.14,.018,metal);torus([0,.02,0],.15,.014,dark);const h=torus([0,.22,.02],.16,.012,metal,[Math.PI/2,0,0]);h.scale.set(.7,1,1);}
  }else if(name==='Бокал'||name==='Стакан'){
    const glassMat=advMat(0xa6b8b1,.12,{transparent:true,opacity:.45,metalness:.04});cyl([0,.15,0],name==='Бокал'?.08:.09,.07,.25,glassMat,18);if(name==='Бокал'){cyl([0,.015,0],.014,.014,.08,glassMat,12);cyl([0,-.025,0],.08,.08,.016,glassMat,18);}
  }else if(name==='Зонтик'){
    cyl([0,.38,0],.012,.012,.72,metal,8);advLootMesh(g,new THREE.SphereGeometry(.28,20,12,0,Math.PI*2,0,Math.PI/2),advMat(0x58614e,.88),[0,.76,0]);cyl([0,.03,0],.022,.022,.12,wood,10);
  }else if(name==='Зажигалка'){
    box([0,.13,0],[.13,.22,.07],metal);box([0,.25,-.01],[.10,.04,.06],dark);torus([.05,.27,0],.02,.006,metal,[Math.PI/2,0,0]);
  }else if(name==='Бинокль'){
    for(let x of [-.09,.09]){cyl([x,.18,0],.065,.055,.24,dark,16,[Math.PI/2,0,0]);torus([x,.18,-.13],.06,.012,metal,[Math.PI/2,0,0]);}box([0,.20,0],[.11,.12,.12],metal);
  }else if(name==='Маскировочная сеть'){
    const mat=advMat(0x65704f,.98,{wireframe:true});const mesh=new THREE.Mesh(new THREE.PlaneGeometry(.48,.40,9,8),mat);mesh.rotation.x=-.35;mesh.position.y=.24;g.add(mesh);for(let i=0;i<4;i++)box([-.18+i*.12,.04,0],[.025,.08,.025],wood);
  }else if(name==='Картон'||name==='Кухонная доска'){
    box([0,.10,0],name==='Картон'?[.38,.025,.30]:[.36,.045,.24],name==='Картон'?paper:wood);if(name==='Кухонная доска'){torus([0,.1,-.12],.025,.006,metal);}
  }else if(name==='Краска'){
    cyl([0,.17,0],.12,.10,.28,advMat(0x7b795e,.55,{metalness:.16}),18);cyl([0,.33,0],.07,.07,.045,metal,16);box([0,.20,-.105],[.12,.10,.01],label('PAINT','MATTE FINISH','#60705b'));
  }
  g.userData.detailModel='extended-authored-prop';g.userData.modelQuality='bespoke-procedural';
}
const advEnhanceLootV07=advEnhanceLoot;
advEnhanceLoot=function(group,name){advEnhanceLootV07(group,name);advExtraProp(group,name);};

// Watcher variant uses a branching crown silhouette in addition to its bone-driven humanoid rig.


// Application services: input, screens and local persistence are intentionally isolated.
const saveRepository = new SaveRepository();
const inputController = createInputController({
  state,
  canvas,
  getCamera: () => camera,
  callbacks: {
    interact: () => interact(),
    useQuickSlot: () => { const current=state.quick[state.selectedSlot]; if(current) useItem(current); },
    toggleInventory: () => toggleInventory(),
    toggleMap: () => toggleMap(),
    openBuild: () => openBuild(),
    inspectItem: () => inspectHeldItem(),
    toggleCamera: () => advToggleCamera(),
    updateQuickbar: () => updateQuickbar(),
    toggleFlashlight: () => {
      const flashlight=state.inventory.find(i=>i.name.toLowerCase().includes('фонарь'));
      if(!flashlight){toast('Нет фонаря');return;}
      state.leftHandOn=!state.leftHandOn;makeHandMesh();updateQuickbar();
      toast(state.leftHandOn?'Фонарь включён':'Фонарь выключен');
    },
    pause: () => {
      if(!state.active || state.paused || state.uiOpen)return;
      state.keys={};state.paused=true;
      if(document.pointerLockElement)document.exitPointerLock();
      showScreen('#pause-screen');
    },
    resume: () => $('#resume-game')?.click(),
    escapeBuild: () => cancelBuild(),
    closeOverlay: () => {closeOverlays();if(state.active&&!state.paused)requestPointerLock();},
    closeScreen: () => {
      const returnTo=state.screenReturn||'#main-menu';
      showScreen(returnTo);
      if(returnTo==='#pause-screen')state.paused=true;
    },
    returnCreator: () => {
      if(!$('#appearance-step').classList.contains('hidden'))$('#back-traits').click();
      else $('#creator-back').click();
    },
    requestPointerLock: () => requestPointerLock(),
    onLook: (dx,dy) => {
      if(!camera)return;
      state.yaw-=dx*.0022*state.settings.sensitivity;
      state.pitch=clamp(state.pitch-dy*.0022*state.settings.sensitivity,-1.42,1.42);
      camera.rotation.y=state.yaw;camera.rotation.x=state.pitch;
    }
  }
});
const menuController = createMenuController({
  onScreenChanged: () => updateContinueButton()
});

function updateContinueButton(){
  const button=$('#continue-game');
  if(!button)return;
  const hasAuto=!!saveRepository.read('auto');
  button.disabled=!hasAuto;
  button.classList.toggle('disabled',!hasAuto);
  const meta=$('#menu-save-meta');
  if(meta){
    const d=saveRepository.read('auto');
    meta.textContent=d?`ПОСЛЕДНЯЯ ЗАПИСЬ · ${d.player?.name||'Странник'} · ${Math.floor((d.clock||0)/60)} МИН.`:'АВТОСОХРАНЕНИЕ ПОКА ОТСУТСТВУЕТ';
  }
}
$('#continue-game')?.addEventListener('click',()=>{if(saveRepository.read('auto'))loadGame('auto');});
$('#new-game')?.addEventListener('click',()=>{state.keys={};});
$('#resume-game')?.addEventListener('click',()=>{state.keys={};});
updateContinueButton();
inputController.install();
menuController.install();
