/* Quiet Dream resilient boot. The menu and a playable local fallback do not depend on Three.js/CDN. */
(() => {
  'use strict';
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const storageGet = key => { try { return window.localStorage?.getItem(key) ?? null; } catch { return null; } };
  const storageSet = (key, value) => { try { window.localStorage?.setItem(key, value); return true; } catch { return false; } };
  const {PROFESSIONS:professions, TRAITS:traits, BASE_POINTS} = window.QDCharacterData;
  let fallbackAvailable = false;
  let fallbackActive = false;
  let creatorPopulated = false;
  let profile = null;
  let traitsSelected = new Set();
  let points = 0;
  let game = null;
  let animation = 0;
  let lastFrame = 0;
  let toastTimer = 0;
  let dpr = 1;
  let canvas, fallbackRenderer = null;

  function toast(message) {
    const node = $('#qd-fallback-toast');
    if (!node) return;
    node.textContent = message;
    node.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => node.classList.remove('show'), 2100);
  }
  function hideScreens() { $$('.screen').forEach(el => el.classList.add('hidden')); }
  function showScreen(id) { hideScreens(); $(id)?.classList.remove('hidden'); }
  function populateCreator() {
    if (creatorPopulated) { updateTraits(); return; }
    creatorPopulated = true;
    $('#profession').innerHTML = professions.map((p,i)=>`<option value="${i}">${esc(p.name)} · ${p.cost>0?'−'+p.cost:p.cost<0?'+'+Math.abs(p.cost):'0'} оч.</option>`).join('');
    $('#positive-traits').innerHTML = traits.filter(t=>t.side==='positive').map(traitHTML).join('');
    $('#negative-traits').innerHTML = traits.filter(t=>t.side==='negative').map(traitHTML).join('');
    $$('.trait-option').forEach(el => {
      el.addEventListener('click', () => {
        const name = el.dataset.name;
        if (traitsSelected.has(name)) traitsSelected.delete(name); else traitsSelected.add(name);
        el.classList.toggle('selected', traitsSelected.has(name));
        updateTraits();
      });
    });
    $('#profession').addEventListener('change', updateTraits);
    $('#random-appearance')?.addEventListener('click', randomAppearance);
    ['#char-name','#char-age','#char-height','#char-weight','#char-build','#char-skin','#char-hair','#char-hair-style','#char-clothes','#char-eyes','#char-tattoo'].forEach(id=>{const e=$(id);e?.addEventListener('input',updateCharacterPreview);e?.addEventListener('change',updateCharacterPreview);});
    for(const preview of [$('#character-preview-traits'),$('#character-preview')].filter(Boolean)){let lastX=0;preview.addEventListener('pointerdown',e=>{lastX=e.clientX;preview.setPointerCapture(e.pointerId);});preview.addEventListener('pointermove',e=>{if(e.buttons){previewAngle+=(e.clientX-lastX)*.012;lastX=e.clientX;updateCharacterPreview();}});}
    updateTraits(); updateCharacterPreview();
  }
  function traitHTML(t) { return `<button type="button" class="trait-option" data-name="${esc(t.name)}"><span>${esc(t.name)}<br><small>${esc(t.stat)}</small></span><small>${t.cost>0?'−':'+'}${Math.abs(t.cost)}</small></button>`; }
  function updateTraits() {
    const profession = professions[Number($('#profession').value)||0];
    points = window.QDCharacterData.calculatePoints(profession,[...traitsSelected]);
    $('#trait-points').textContent = `${points} оч.`;
    $('#trait-points').style.color = points < 0 ? '#cf6a5d' : '#c6a66b';
    $('#to-appearance').disabled = points < 0;
    const stats=window.QDCharacterData.calculateStats(profession,[...traitsSelected]); const statHtml=window.QDCharacterData.STAT_LABELS.map(k=>`<span>${esc(k)} <b>${stats[k]>=0?'+':''}${stats[k]||0}</b></span>`).join(''); $('#trait-stats').innerHTML = `<span class="profession-description">${esc(profession.desc)}</span>${statHtml}`; updateCharacterPreview();
  }
  function randomCharacter() {
    const pick = (arr) => arr[Math.floor(Math.random()*arr.length)];
    $('#char-name').value=pick(['Алексей','Иван','Дмитрий','Сергей','Артём','Максим','Никита','Михаил','Андрей','Евгений','Павел','Кирилл','Денис','Антон','Руслан']);
    $('#profession').value = String(Math.floor(Math.random()*professions.length));
    traitsSelected = new Set();
    const candidates=[...traits].sort(()=>Math.random()-.5);
    const profession=professions[Number($('#profession').value)||0];
    const positive=candidates.filter(t=>t.side==='positive'), negative=candidates.filter(t=>t.side==='negative');
    const order=[...positive.slice(0,2),...negative.slice(0,3),...candidates];
    for(const t of order){if(traitsSelected.size>=5)break;if(traitsSelected.has(t.name))continue;const spent=[...traitsSelected].reduce((sum,n)=>sum+(traits.find(x=>x.name===n)?.cost||0),0)+t.cost;if(BASE_POINTS-profession.cost-spent>=0)traitsSelected.add(t.name);}
    $$('.trait-option').forEach(el=>el.classList.toggle('selected',traitsSelected.has(el.dataset.name)));
    ['#char-build','#char-skin','#char-hair','#char-hair-style','#char-clothes','#char-eyes','#char-tattoo'].forEach(id=>{const e=$(id);if(e&&e.options.length)e.selectedIndex=Math.floor(Math.random()*e.options.length);});
    $('#char-age').value=20+Math.floor(Math.random()*35);$('#char-height').value=160+Math.floor(Math.random()*39);$('#char-weight').value=52+Math.floor(Math.random()*57);
    updateTraits(); updateCharacterPreview();
    toast('Случайный персонаж создан');
  }
  function randomAppearance(){
    ['#char-build','#char-skin','#char-hair','#char-hair-style','#char-clothes','#char-eyes','#char-tattoo'].forEach(id=>{const e=$(id);if(e&&e.options.length)e.selectedIndex=Math.floor(Math.random()*e.options.length);});
    $('#char-age').value=20+Math.floor(Math.random()*35);$('#char-height').value=160+Math.floor(Math.random()*39);$('#char-weight').value=52+Math.floor(Math.random()*57);
    updateCharacterPreview();
  }
  function currentProfile(){
    const profession=professions[Number($('#profession').value)||0],stats=window.QDCharacterData.calculateStats(profession,[...traitsSelected]);
    return {name:$('#char-name').value.trim()||'Странник',profession:profession.name,traits:[...traitsSelected],stats,age:Math.max(18,Math.min(70,Number($('#char-age').value)||27)),height:Math.max(150,Math.min(205,Number($('#char-height').value)||178)),weight:Math.max(45,Math.min(125,Number($('#char-weight').value)||76)),build:$('#char-build').value,skin:$('#char-skin').value,hair:$('#char-hair').value,hairStyle:$('#char-hair-style').value,clothes:$('#char-clothes').value,eyes:$('#char-eyes').value,tattoo:$('#char-tattoo').value};
  }
  let previewAngle=0;
  function updateCharacterPreview(){if(!window.QDLocal3D?.renderCharacter)return;const p=currentProfile();for(const id of ['#character-preview-traits','#character-preview']){const c=$(id);if(c&&c.getClientRects().length)window.QDLocal3D.renderCharacter(c,p,previewAngle);}}

  function ensureFallbackDOM() {
    if ($('#qd-fallback-game')) return;
    const wrap = document.createElement('section');
    wrap.id = 'qd-fallback-game';
    wrap.className = 'qd-fallback-game hidden';
    wrap.innerHTML = `
      <canvas id="qd-fallback-world" aria-label="Резервный игровой мир"></canvas>
      <div class="qdf-top"><div><b>ТИХИЙ СОН</b><small id="qdf-weather">ОСЕННИЙ ЛЕС · РЕЗЕРВНЫЙ РЕЖИМ</small></div><div class="qdf-coords" id="qdf-coords">X 0 · Z 0</div></div>
      <div class="qdf-status"><div><span>ЗДОРОВЬЕ</span><b id="qdf-hp">100</b><i><em id="qdf-hpbar"></em></i></div><div><span>ГОЛОД</span><b id="qdf-hunger">100</b><i><em id="qdf-hungerbar"></em></i></div><div><span>ЖАЖДА</span><b id="qdf-thirst">100</b><i><em id="qdf-thirstbar"></em></i></div></div>
      <div class="qdf-bottom"><div class="qdf-hand">ЛЕВАЯ<br><b id="qdf-left">ФОНАРЬ</b></div><div class="qdf-slots" id="qdf-slots"></div><div class="qdf-hand">ПРАВАЯ<br><b id="qdf-right">ПУСТО</b></div></div>
      <div class="qdf-prompt" id="qdf-prompt"></div><div class="qdf-hint">WASD — движение · мышь — обзор · E — подобрать · Q — использовать · F — фонарь · V — камера · I — инвентарь · M — карта · Esc — пауза</div>
      <div id="qdf-panel" class="qdf-panel hidden"></div>
      <div id="qd-fallback-toast" class="qd-fallback-toast"></div>
      <div id="qdf-crosshair">+</div>
    `;
    document.body.appendChild(wrap);
    canvas = $('#qd-fallback-world');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    $('#qd-fallback-world').addEventListener('click', () => { if (fallbackActive && game?.panel === null) { try { canvas.requestPointerLock?.(); } catch {} } });
    document.addEventListener('mousemove', e=>{if(fallbackActive&&game&&document.pointerLockElement===canvas){game.yaw+=e.movementX*.0022;game.pitch=Math.max(-.85,Math.min(.85,(game.pitch||0)-e.movementY*.0022));}});
  }
  function resizeCanvas() {
    if (!canvas) return;
    canvas.style.width = `${innerWidth}px`; canvas.style.height = `${innerHeight}px`;
    if (fallbackRenderer) fallbackRenderer.resize?.();
  }
  function itemIcon(name, info = {}) {
    const kit = window.QDItemIcons;
    return kit ? kit.render(name, info, 'small') : `<span class="qdf-glyph">${esc(info.icon||'◆')}</span>`;
  }
  function showFallback(reason = 'Внешняя 3D-библиотека недоступна. Игра запущена в автономном режиме.') {
    fallbackAvailable = true;
    $('#engine-error')?.classList.add('hidden');
    $('#console-status')?.classList.add('fallback-status');
    const status = $('.console-status');
    if (status) { status.innerHTML = '<i></i> РЕЗЕРВНЫЙ ЗАПУСК'; status.classList.add('fallback-status'); }
    const hasFallbackSave = !!storageGet('qd-fallback-save');
    const continueButton = $('#continue-game');
    if (continueButton) continueButton.disabled = !hasFallbackSave;
    $('#menu-save-meta').textContent = hasFallbackSave ? 'ЛОКАЛЬНОЕ СОХРАНЕНИЕ НАЙДЕНО' : 'АВТОНОМНЫЙ РЕЖИМ ДОСТУПЕН';
    if (!$('#qd-fallback-game')) ensureFallbackDOM();
    console.warn('[Quiet Dream] fallback mode available:', reason);
  }
  function makeWorld() {
    const trees=[];
    let seed=982451653;
    const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
    for(let i=0;i<210;i++) {
      const a=random()*Math.PI*2, r=13+random()*52;
      trees.push({x:Math.cos(a)*r,z:Math.sin(a)*r,height:0.8+random()*.8,shade:Math.floor(random()*4),w:.7+random()*.55});
    }
    const lootNames=['Бутылка воды','Хлеб','Бинт','Компас','Динамо-фонарь','Яблоко','Консервы','Доска','Сухие дрова','Термос','Аптечка','Блокнот','Картофель','Морковь'];
    const loot=[];
    const bonusLoot=Math.max(0,Math.min(12,Math.round(((profile?.stats?.Поиск||0)+(profile?.stats?.Удача||0))*.6)));for(let i=0;i<34+bonusLoot;i++){const a=random()*Math.PI*2,r=7+random()*48;loot.push({x:Math.cos(a)*r,z:Math.sin(a)*r,name:lootNames[Math.floor(random()*lootNames.length)],taken:false,phase:random()*6.28});}
    return {x:0,z:0,yaw:0,pitch:0,thirdPerson:false,hp:100,hunger:100,thirst:100,stamina:100,flash:false,run:false,keys:{},items:[{name:'Бутылка воды',count:2},{name:'Хлеб',count:2},{name:'Бинт',count:1},{name:'Динамо-фонарь',count:1},{name:'Компас',count:1},{name:'Доска',count:3},{name:'Сухие дрова',count:2}],quick:['Динамо-фонарь','Бинт','Хлеб'],selected:0,trees,loot,markers:[],panel:null,clock:0,profile,toast:'Ты проснулся в лесу',lastSave:0};
  }
  function startFallback() {
    if (!fallbackAvailable) showFallback();
    fallbackActive = true;
    window.__QD_FALLBACK_ACTIVE = true;
    profile = currentProfile();
    game=makeWorld();
    if(fallbackRenderer){fallbackRenderer.dispose?.();fallbackRenderer=null;}
    hideScreens();
    $('#hud')?.classList.add('hidden');
    $('#qd-fallback-game').classList.remove('hidden');
    $('#qdf-weather').textContent=`${profile.name.toUpperCase()} · ${profile.profession.toUpperCase()}`;
    renderSlots(); renderHud();
    game.toast='Ты проснулся в лесу';
    startLoop();
    toast('Резервный режим запущен. Исследуй лес.');
  }
  function renderSlots() {
    if(!game)return;
    $('#qdf-slots').innerHTML=game.quick.map((name,i)=>`<button class="qdf-slot ${game.selected===i?'active':''}" data-fslot="${i}"><kbd>${i+1}</kbd>${name?itemIcon(name,{category:categoryFor(name)}):'<span class="qdf-empty-slot">—</span>'}<small>${esc(name||'Пусто')}</small></button>`).join('');
    $$('#qdf-slots [data-fslot]').forEach(b=>b.addEventListener('click',()=>{game.selected=Number(b.dataset.fslot);renderSlots();}));
    $('#qdf-right').textContent=game.quick[game.selected]||'ПУСТО';$('#qdf-left').textContent=game.flash?'СВЕТ ВКЛЮЧЁН':'ФОНАРЬ';
  }
  function categoryFor(name) {
    const n=name.toLowerCase();
    if(/вода|бутыл|термос/.test(n))return 'drink';if(/бинт|аптеч/.test(n))return 'medical';if(/хлеб|яблок|картоф|морков/.test(n))return 'food';if(/дров|доска|камень/.test(n))return 'resource';if(/компас|фонар/.test(n))return 'tool';return 'collectible';
  }
  function renderHud() {
    if(!game)return;
    for(const [id,value] of [['hp',game.hp],['hunger',game.hunger],['thirst',game.thirst]]){$(`#qdf-${id}`).textContent=Math.round(value);$(`#qdf-${id}bar`).style.width=`${value}%`;}
    $('#qdf-coords').textContent=`X ${Math.round(game.x)} · Z ${Math.round(game.z)} · ${Math.floor(game.clock/60)}:${String(Math.floor(game.clock%60)).padStart(2,'0')}`;
  }
  function addItem(name) {const found=game.items.find(x=>x.name===name);if(found)found.count++;else game.items.push({name,count:1});renderHud();}
  function useItem(name) {
    const item=game.items.find(x=>x.name===name);if(!item)return;
    const n=name.toLowerCase();
    if(/вода|сок|термос/.test(n)){game.thirst=Math.min(100,game.thirst+32);toast('Жажда утолена');}
    else if(/хлеб|яблок|картоф|морков|консерв/.test(n)){const cook=game.profile?.stats?.Кулинария||0;game.hunger=Math.min(100,game.hunger+28*(1+Math.max(-.18,Math.min(.22,cook*.025))));toast('Ты немного поел');}
    else if(/бинт|аптеч/.test(n)){const medical=game.profile?.stats?.Медицина||0;game.hp=Math.min(100,game.hp+24*(1+Math.max(-.2,Math.min(.28,medical*.035))));toast('Самочувствие улучшилось');}
    else if(/фонар/.test(n)){game.flash=!game.flash;toast(game.flash?'Фонарь включён':'Фонарь выключен');renderSlots();return;}
    else {toast('Пока нельзя использовать этот предмет');return;}
    item.count--;if(item.count<=0)game.items=game.items.filter(x=>x!==item);renderHud();renderInventory();
  }
  function saveFallback() {
    if(!game)return;
    const data={version:2,profile,game:{x:game.x,z:game.z,yaw:game.yaw,pitch:game.pitch||0,thirdPerson:!!game.thirdPerson,flash:!!game.flash,hp:game.hp,hunger:game.hunger,thirst:game.thirst,stamina:game.stamina,items:game.items,quick:game.quick,selected:game.selected,clock:game.clock,markers:game.markers,loot:game.loot.map(item=>({x:item.x,z:item.z,name:item.name,taken:!!item.taken,phase:item.phase||0}))}};
    if(storageSet('qd-fallback-save',JSON.stringify(data))){game.lastSave=game.clock;toast('Игра сохранена в этом браузере');}else toast('Хранилище браузера недоступно');
  }
  function loadFallback() {
    try{const data=JSON.parse(storageGet('qd-fallback-save')||'null');if(!data?.game)return false;profile=data.profile||{name:'Странник'};game=makeWorld();const saved=data.game;Object.assign(game,saved);if(Array.isArray(saved.loot)){const byKey=new Map(saved.loot.map(item=>[`${item.name}|${Math.round(item.x*100)}|${Math.round(item.z*100)}`,item]));for(const item of game.loot){const match=byKey.get(`${item.name}|${Math.round(item.x*100)}|${Math.round(item.z*100)}`);if(match)item.taken=!!match.taken;}if(saved.loot.length===game.loot.length)game.loot=saved.loot.map(item=>({...item}));}game.keys={};game.panel=null;if(fallbackRenderer){fallbackRenderer.dispose?.();fallbackRenderer=null;}return true;}catch{return false;}
  }
  function renderInventory() {
    if(!game)return;
    const found=game.items.map((it,i)=>({...it,index:i}));
    $('#qdf-panel').innerHTML=`<div class="qdf-panel-head"><span>РЮКЗАК · ${game.items.reduce((s,x)=>s+x.count,0)} ПРЕДМ.</span><button data-fclose>✕</button></div><h2>Инвентарь</h2><div class="qdf-inventory-grid">${found.map(it=>`<button class="qdf-inventory-item" data-fitem="${it.index}">${itemIcon(it.name,{category:categoryFor(it.name)})}<b>${esc(it.name)}</b><small>×${it.count}</small></button>`).join('')||'<p>Рюкзак пуст.</p>'}</div><div class="qdf-panel-help">Выберите предмет для использования. Нажмите I или Esc, чтобы закрыть.</div>`;
    $('#qdf-panel').classList.remove('hidden');game.panel='inventory';
    $$('[data-fclose]').forEach(b=>b.onclick=closePanel);
    $$('[data-fitem]').forEach(b=>b.onclick=()=>{const it=game.items[Number(b.dataset.fitem)];if(it)useItem(it.name);});
  }
  function renderMap() {
    if(!game)return;
    $('#qdf-panel').innerHTML=`<div class="qdf-panel-head"><span>КАРТА ИССЛЕДОВАННОЙ ЧАСТИ</span><button data-fclose>✕</button></div><h2>Лесная карта</h2><canvas id="qdf-map" width="540" height="430"></canvas><p class="qdf-panel-help">Карта условная. Вы отмечены светлой точкой.</p>`;
    $('#qdf-panel').classList.remove('hidden');game.panel='map';drawMiniMap($('#qdf-map').getContext('2d'),540,430);
    $$('[data-fclose]').forEach(b=>b.onclick=closePanel);
    $('#qdf-map').addEventListener('click',e=>{const r=e.target.getBoundingClientRect();game.markers.push({x:(e.clientX-r.left)/r.width*100-50,z:(e.clientY-r.top)/r.height*100-50});drawMiniMap($('#qdf-map').getContext('2d'),540,430);});
  }
  function drawMiniMap(c,w,h) {
    c.clearRect(0,0,w,h);c.fillStyle='#28362b';c.fillRect(0,0,w,h);
    for(let i=0;i<150;i++){const x=(i*83)%w,y=(i*137)%h;c.fillStyle=i%3?'#536247':'#81613c';c.beginPath();c.arc(x,y,3+(i%4),0,Math.PI*2);c.fill();}
    c.strokeStyle='#6f8070';c.lineWidth=7;c.beginPath();c.moveTo(w*.16,h*.8);c.bezierCurveTo(w*.35,h*.65,w*.42,h*.25,w*.87,h*.18);c.stroke();
    for(const m of game.markers){c.fillStyle='#e3ae61';c.beginPath();c.arc(w*(.5+m.x/100),h*(.5+m.z/100),6,0,Math.PI*2);c.fill();}
    c.fillStyle='#fff3d4';c.beginPath();c.arc(w/2,h/2,7,0,Math.PI*2);c.fill();c.strokeStyle='#fff';c.lineWidth=2;c.beginPath();c.moveTo(w/2,h/2-14);c.lineTo(w/2,h/2+3);c.stroke();
  }
  function renderPause() {
    $('#qdf-panel').innerHTML=`<div class="qdf-panel-head"><span>СЕАНС ПРИОСТАНОВЛЕН</span></div><h2>Лес не спит</h2><button class="qdf-action" data-fresume>Продолжить</button><button class="qdf-action" data-fsave>Сохранить</button><button class="qdf-action" data-fmenu>В главное меню</button>`;
    $('#qdf-panel').classList.remove('hidden');game.panel='pause';
    $('[data-fresume]').onclick=closePanel;$('[data-fsave]').onclick=saveFallback;$('[data-fmenu]').onclick=()=>{saveFallback();game=null;fallbackActive=false;window.__QD_FALLBACK_ACTIVE=false;$('#qd-fallback-game').classList.add('hidden');showScreen('#main-menu');};
  }
  function closePanel(){if(!game)return;game.panel=null;$('#qdf-panel').classList.add('hidden');}
  function nearestLoot() {let best=null,dist=999;for(const o of game.loot){if(o.taken)continue;const d=Math.hypot(o.x-game.x,o.z-game.z);if(d<dist){dist=d;best=o;}}const range=5+Math.max(-1,Math.min(2,(game.profile?.stats?.Поиск||0)*.15));return dist<range?best:null;}
  function interact() {const item=nearestLoot();if(!item){toast('Рядом ничего нет');return;}item.taken=true;addItem(item.name);toast(`Подобрано: ${item.name}`);}
  function handleKeyDown(e) {
    if(!fallbackActive||!game)return;
    const code=e.code;
    if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(code))e.preventDefault();
    if(code==='Escape'){if(game.panel)closePanel();else renderPause();return;}
    if(game.panel)return;
    if(code==='KeyW'||code==='KeyA'||code==='KeyS'||code==='KeyD'||code.startsWith('Arrow')||code==='ShiftLeft'||code==='ShiftRight'){game.keys[code]=true;return;}
    if(e.repeat)return;
    if(code==='KeyE')interact();
    else if(code==='KeyI')renderInventory();
    else if(code==='KeyM')renderMap();
    else if(code==='KeyF'){game.flash=!game.flash;renderSlots();toast(game.flash?'Фонарь включён':'Фонарь выключен');}
    else if(code==='KeyV'){game.thirdPerson=!game.thirdPerson;toast(game.thirdPerson?'Камера: от третьего лица':'Камера: от первого лица');}
    else if(code==='KeyQ'){const name=game.quick[game.selected];if(name)useItem(name);}
    else if(code==='Digit1'||code==='Digit2'||code==='Digit3'){game.selected=Number(code.slice(-1))-1;renderSlots();}
  }
  function handleKeyUp(e){if(game)game.keys[e.code]=false;}
  function update(dt) {
    if(!fallbackActive||!game||game.panel)return;
    game.clock+=dt;
    const keys=game.keys;const sprint=keys.ShiftLeft||keys.ShiftRight;
    const forward=(keys.KeyW||keys.ArrowUp?1:0)-(keys.KeyS||keys.ArrowDown?1:0);
    const side=(keys.KeyD?1:0)-(keys.KeyA?1:0);
    if(keys.ArrowLeft)game.yaw-=dt*1.65;if(keys.ArrowRight)game.yaw+=dt*1.65;
    const staminaStat=game.profile?.stats?.Выносливость||0;const speed=(sprint?6.4:4.1)*(1+Math.max(-.12,Math.min(.16,staminaStat*.025)))*(game.stamina<=0?.62:1);
    const norm=Math.hypot(forward,side)||1;
    game.x+=(Math.sin(game.yaw)*forward/norm+Math.cos(game.yaw)*side/norm)*speed*dt;
    game.z+=(Math.cos(game.yaw)*forward/norm-Math.sin(game.yaw)*side/norm)*speed*dt;
    const radius=Math.hypot(game.x,game.z);if(radius>54){game.hp=Math.max(0,game.hp-dt*3);game.x*=.998;game.z*=.998;}
    const digestion=game.profile?.stats?.Пищеварение||0;const consumption=Math.max(.62,Math.min(1.55,1-digestion*.035));game.hunger=Math.max(0,game.hunger-dt*.035*consumption);game.thirst=Math.max(0,game.thirst-dt*.05*Math.max(.78,Math.min(1.25,1-digestion*.012)));if(game.hp<100&&game.hunger>45&&game.thirst>45)game.hp=Math.min(100,game.hp+dt*(.015+(game.profile?.stats?.Восстановление||0)*.005));
    if(game.hunger<18||game.thirst<18)game.hp=Math.max(0,game.hp-dt*.6);
    const staminaDrain=1-Math.max(-.18,Math.min(.3,staminaStat*.035));game.stamina=Math.max(0,Math.min(100,game.stamina+(sprint&&forward?-18*staminaDrain:10)*dt));
    if(game.hp<=0){renderPause();toast('Ты потерял сознание');}
    if(game.clock-game.lastSave>180){saveFallback();}
    renderHud();
  }
  // The local fallback is rendered only by the real WebGL mesh renderer in Local3D.js.
  function drawFrame(time) {
    if(!fallbackActive||!game)return;
    const dt=Math.min((time-lastFrame)/1000,.05)||0;lastFrame=time;update(dt);
    if(!window.QDLocal3D){animation=requestAnimationFrame(drawFrame);return;}
    try {
      if(!fallbackRenderer) fallbackRenderer=window.QDLocal3D.createWorld(canvas);
      const cam={x:game.x,y:window.QDLocal3D.terrainHeight(game.x,game.z)+1.72,z:game.z,yaw:game.yaw,pitch:game.pitch||0,flash:game.flash,clock:game.clock,thirdPerson:!!game.thirdPerson};
      fallbackRenderer.render(cam,game);
      const near=nearestLoot();$('#qdf-prompt').textContent=near?`[ E ]  Подобрать: ${near.name}`:'';
    } catch(error) {
      console.error('[Quiet Dream] Local 3D renderer failed:',error);
      $('#qdf-weather').textContent='ОШИБКА 3D · WebGL НЕ ДОСТУПЕН';
      const gl=canvas.getContext('webgl'); if(!gl){const p=canvas.parentElement.querySelector('.qdf-hint');if(p)p.textContent='Включи аппаратное ускорение / WebGL в браузере.';}
    }
    animation=requestAnimationFrame(drawFrame);
  }
  function startLoop(){cancelAnimationFrame(animation);lastFrame=performance.now();animation=requestAnimationFrame(drawFrame);}

  function menuClickHandler(event) {
    const button=event.target.closest('button');
    if(!button)return;
    const id=button.id;
    if(id==='new-game') { event.preventDefault();event.stopImmediatePropagation();if(!fallbackAvailable)showFallback();populateCreator();traitsSelected.clear();$$('.trait-option').forEach(el=>el.classList.remove('selected'));updateTraits();showScreen('#creator');requestAnimationFrame(updateCharacterPreview);return; }
    if(id==='creator-back') {event.preventDefault();event.stopImmediatePropagation();showScreen('#main-menu');return;}
    if(id==='random-traits' && fallbackActive===false) {event.preventDefault();event.stopImmediatePropagation();randomCharacter();return;}
    if(id==='random-appearance') {event.preventDefault();event.stopImmediatePropagation();randomAppearance();return;}
    if(id==='to-appearance') {event.preventDefault();event.stopImmediatePropagation();if(points<0){toast('Нужно сбалансировать черты');return;}$('#traits-step').classList.add('hidden');$('#appearance-step').classList.remove('hidden');$('#tab-traits').classList.remove('active');$('#tab-look').classList.add('active');updateCharacterPreview();return;}
    if(id==='back-traits') {event.preventDefault();event.stopImmediatePropagation();$('#appearance-step').classList.add('hidden');$('#traits-step').classList.remove('hidden');$('#tab-look').classList.remove('active');$('#tab-traits').classList.add('active');return;}
    if(id==='begin-game') {event.preventDefault();event.stopImmediatePropagation();startFallback();return;}
    if(id==='continue-game') {event.preventDefault();event.stopImmediatePropagation();showFallback();if(loadFallback()){fallbackAvailable=true;fallbackActive=true;window.__QD_FALLBACK_ACTIVE=true;hideScreens();$('#qd-fallback-game').classList.remove('hidden');renderSlots();renderHud();startLoop();toast('Сохранение загружено');}else toast('Сохранение не найдено');return;}
    if(id==='open-settings'||id==='pause-settings') {event.preventDefault();event.stopImmediatePropagation();showScreen('#settings-screen');return;}
    if(id==='choose-save') {event.preventDefault();event.stopImmediatePropagation();const d=storageGet('qd-fallback-save');$('#save-list').innerHTML=d?'<div class="save-entry"><div><b>Локальное сохранение</b><small>Доступно в этом браузере</small></div><div class="save-actions"><button data-fallback-load>Загрузить</button></div></div>':'<p class="camp-empty">Локальных сохранений пока нет.</p>';showScreen('#save-screen');return;}
    if(button.matches('[data-close]')) {event.preventDefault();event.stopImmediatePropagation();const dest=button.dataset.close;if(dest==='settings-screen'||dest==='save-screen')showScreen(fallbackActive?'#qd-no-screen':'#main-menu');else if(fallbackActive)closePanel();else hideScreens();return;}
    if(id==='exit-game') {event.preventDefault();event.stopImmediatePropagation();toast('Игру можно закрыть вкладкой браузера');return;}
    if(id==='sound-toggle') {event.preventDefault();event.stopImmediatePropagation();button.textContent=button.textContent.includes('включён')?'Звук: выключен':'Звук: включён';storageSet('qd-fallback-sound',button.textContent.includes('включён')?'1':'0');return;}
    if(id==='resume-game') {event.preventDefault();event.stopImmediatePropagation();closePanel();return;}
    if(id==='quick-save') {event.preventDefault();event.stopImmediatePropagation();saveFallback();return;}
    if(id==='to-main-menu') {event.preventDefault();event.stopImmediatePropagation();saveFallback();cancelAnimationFrame(animation);fallbackActive=false;window.__QD_FALLBACK_ACTIVE=false;$('#qd-fallback-game').classList.add('hidden');showScreen('#main-menu');return;}
    if(id==='inventory-toggle') {event.preventDefault();event.stopImmediatePropagation();renderInventory();return;}
    if(id==='show-minimap'||id==='minimap-toggle') {event.preventDefault();event.stopImmediatePropagation();renderMap();return;}
    if(button.hasAttribute('data-fallback-load')) {event.preventDefault();event.stopImmediatePropagation();if(loadFallback()){fallbackActive=true;window.__QD_FALLBACK_ACTIVE=true;$('#qd-fallback-game').classList.remove('hidden');hideScreens();renderSlots();renderHud();startLoop();}return;}
  }
  function keyCapture(e) {
    if (fallbackActive) { handleKeyDown(e); return; }
    if (window.__QD_ENGINE_READY || !['ArrowDown','ArrowUp','Enter'].includes(e.code)) return;
    if (e.target?.matches?.('input,select,textarea,[contenteditable=true]')) return;
    const screen=[...document.querySelectorAll('.screen')].find(el=>!el.classList.contains('hidden'));
    if(!screen)return;
    const focusable=[...screen.querySelectorAll('button:not(:disabled),input:not(:disabled),select:not(:disabled)')].filter(el=>el.getClientRects().length);
    if(!focusable.length)return;
    if(e.code==='Enter'){document.activeElement?.click?.();e.preventDefault();return;}
    const index=focusable.indexOf(document.activeElement),next=(index+(e.code==='ArrowDown'?1:-1)+focusable.length)%focusable.length;
    focusable[next].focus({preventScroll:true});e.preventDefault();
  }
  document.addEventListener('click', event=>{if(!window.__QD_ENGINE_READY)menuClickHandler(event);},true);
  window.addEventListener('keydown',keyCapture,true);
  window.addEventListener('keyup',e=>{if(fallbackActive)handleKeyUp(e);},true);
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&game)game.keys={};});

  function onBootError(reason) { showFallback(reason || 'Не удалось загрузить игровой движок.'); }
  window.addEventListener('qd-local3d-ready',updateCharacterPreview);
  window.addEventListener('blur',()=>{if(game)game.keys={};});
  window.QD_BOOT = { showFallback:onBootError, startFallback, get available(){return fallbackAvailable;}, get active(){return fallbackActive;}, currentProfile, randomCharacter };
  // The classic bootstrap stays alive if the module import fails before any game handlers are registered.
})();
