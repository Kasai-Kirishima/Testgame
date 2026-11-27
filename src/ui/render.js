import {CHARACTERS,getCharacter,getUnlockedCharacterArts,initials} from '../data/characters.js';
import {LOCATIONS,ORIGINS,getLocation,WEATHER,SEASONS} from '../data/world.js';
import {getBond} from '../core/store.js';
import {clockLabel,timePeriod,getWeather,seasonLabel,getNpcLocation,getTravelMinutes,getLocationAccess} from '../core/life.js';
import {PETS} from '../data/pets.js';
import {JOBS,getJob} from '../data/jobs.js';
import {getEnemy} from '../data/enemies.js';
import {CONVERSATION_ACTIONS,CONVERSATION_ACTION_GROUPS} from '../data/conversation-actions.js';
import {ensureDailyBoard,SKILL_META,getSkillLevel,RECIPES,canCraft} from '../core/progression.js';
import {ACHIEVEMENTS,getAchievementProgress} from '../core/achievements.js';
import {MAGAZINE_ISSUES} from '../data/secret-magazine.js';
import {CLOTHING,CLOTHING_BY_ID,CLOTHING_SLOTS,LOOK_TO_PRESET,normalizeEquipment} from '../data/clothing.js';

export const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g,char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

function heading(title,subtitle) {
  return `<div class="page-heading"><div class="eyebrow">ХРОНИКИ КОНОХИ</div><h2>${title}</h2><p class="muted">${subtitle}</p></div>`;
}

function avatar(character,large=false) {
  const portrait = character.art?.[0]?.src;
  return `<div class="person-avatar ${large?'large':''}" style="--av1:${character.colors[0]};--av2:${character.colors[1]}">${portrait?`<img src="${portrait}" alt="" loading="lazy"><span class="avatar-fallback">${character.icon}</span>`:character.icon}</div>`;
}

function renderPlayerAvatarStack(player={}) {
  const equipment=normalizeEquipment(player.equipment,player.look);
  const hair=['short','medium','long','tied','wild'].includes(player.hair)?player.hair:'medium';
  const base=player.gender==='female'?'base-body-female.svg':'base-body.svg';
  const order=['bottom','shoes','top','outer','accessory','head'];
  return `<div class="player-avatar-layer-stack"><img src="assets/player/layers/${base}" alt=""><img src="assets/player/layers/hair-${hair}.svg" alt="">${order.map(slot=>{const item=CLOTHING_BY_ID[equipment[slot]];return item?`<img src="${item.src}" alt="">`:''}).join('')}</div>`;
}

function renderLayeredPlayer(player={},equipment={},className='wardrobe-avatar-stage') {
  const normalized=normalizeEquipment(equipment,player.look);
  const hair=['short','medium','long','tied','wild'].includes(player.hair)?player.hair:'medium';
  const base=player.gender==='female'?'base-body-female.svg':'base-body.svg';
  const order=['bottom','shoes','top','outer','accessory','head'];
  return `<div class="${className}" aria-label="Предпросмотр выбранной одежды"><img class="wardrobe-avatar-base" src="assets/player/layers/${base}" alt="Основа персонажа"><img class="wardrobe-avatar-layer layer-hair" src="assets/player/layers/hair-${hair}.svg" alt="Причёска персонажа">${order.map(slot=>{const item=CLOTHING_BY_ID[normalized[slot]];return item?`<img class="wardrobe-avatar-layer layer-${slot}" data-slot="${slot}" src="${item.src}" alt="${escapeHTML(item.name)}">`:''}).join('')}</div>`;
}

function getPetImage(pet={}) {
  return pet.image || PETS.find(item=>item.id===pet.id)?.image || '';
}
function renderWorld(state) {
  const place = getLocation(state.world.location);
  const weather = getWeather(state);
  const hour = Math.floor(state.world.minute/60);
  const isNight = hour >= 19 || hour < 5;
  const sceneImage = weather.id === 'rain' && place.rainBg ? place.rainBg : isNight && place.nightBg ? place.nightBg : place.bg;
  const available = CHARACTERS.filter(character => state.unlocked.includes(character.id));
  const peopleHere = available.filter(character => getNpcLocation(state,character.id) === place.id);
  const featured = peopleHere[0] || null;
  if (state.ui.sceneCharacterId && !peopleHere.some(item=>item.id===state.ui.sceneCharacterId)) state.ui.sceneCharacterId = featured?.id || '';
  if (featured && !state.ui.sceneCharacterId) state.ui.sceneCharacterId = featured.id;
  const activeCharacter = peopleHere.find(item=>item.id===state.ui.sceneCharacterId) || featured;
  const bond = activeCharacter ? getBond(state,activeCharacter.id) : {friendship:0,trust:0,respect:0,stage:'Тихая локация',meetings:0};
  const stats = state.player.stats;
  state.gallerySeen ||= {characters:{},backgrounds:[]};
  state.gallerySeen.characters ||= {};
  state.gallerySeen.backgrounds ||= [];
  if (!state.gallerySeen.backgrounds.includes(sceneImage)) state.gallerySeen.backgrounds.push(sceneImage);
  if (activeCharacter) {
    state.gallerySeen.characters[activeCharacter.id] ||= [];
    const src = activeCharacter.art?.[0]?.src;
    if (src && !state.gallerySeen.characters[activeCharacter.id].includes(src)) state.gallerySeen.characters[activeCharacter.id].push(src);
  }
  const lastChat = activeCharacter ? (state.dialogues[activeCharacter.id]||[]).slice(-1)[0] : null;
  const speaker = lastChat?.from==='npc' ? activeCharacter?.name : 'Игровой мастер';
  const narration = lastChat?.from==='npc' ? lastChat.text : (state.ui.lastActionResult || `${place.desc} Ты можешь осмотреться, поговорить с тем, кто рядом, или отправиться дальше.`);
  const dangerMap = {forest:'forest-ambusher',gate:'road-rogue',campsite:'masked-scout'};
  const enemyId = dangerMap[place.id] || '';
  const enemyVisible = Boolean(enemyId && ((state.world.day * 13 + state.world.actions * 7 + state.world.minute) % 4 === 1));
  const ambientEnemy = enemyVisible ? getEnemy(enemyId) : null;
  const ambientPet = state.pets?.[0];
  const foundIssues = state.collectibles?.unlockedIssues || [];
  let secretSearch='';
  if (place.id==='library' && !state.collectibles?.magazineFound) secretSearch='<button class="secret-find-btn" data-action="discover-magazine">🔎 Осмотреть старый стеллаж</button>';
  else if (place.id==='archive' && state.collectibles?.magazineFound && !foundIssues.includes('issue-02')) secretSearch='<button class="secret-find-btn" data-action="find-magazine-issue" data-id="issue-02">📜 Проверить папку старых заметок</button>';
  else if (place.id==='tea-house' && foundIssues.includes('issue-02') && !foundIssues.includes('issue-03')) secretSearch='<button class="secret-find-btn" data-action="find-magazine-issue" data-id="issue-03">🍵 Поговорить о старых выпусках</button>';
  return `<section class="rp-full-scene" aria-label="Игровая сцена">
      <img class="rp-full-bg" src="${escapeHTML(sceneImage||'assets/backgrounds/konoha-main.webp')}" alt="${escapeHTML(place.name)}" loading="eager" decoding="async">
      <div class="rp-full-vignette"></div>
      <div class="rp-hud-top"><span class="rp-chip"><img src="assets/ui/generated/location.png" alt="">${escapeHTML(place.name)}</span><span class="rp-chip">${weather.icon} ${weather.label} · ${seasonLabel(state)} · ${clockLabel(state.world.minute)}</span><span class="rp-chip">День ${state.world.day}</span></div>
      <div class="rp-health-hud"><span>♥ ${stats.hp??100} HP</span><span>◈ ${stats.stamina} EN</span></div>
      ${activeCharacter?`<button class="rp-cutout" data-action="open-person" data-id="${activeCharacter.id}" aria-label="Открыть досье: ${escapeHTML(activeCharacter.name)}"><img src="${escapeHTML(activeCharacter.art?.[0]?.src||'')}" alt="${escapeHTML(activeCharacter.name)}"><span class="rp-cutout-name"><b>${escapeHTML(activeCharacter.name)}</b><small>${escapeHTML(activeCharacter.role)}</small></span></button>`:''}
      ${ambientPet?`<div class="rp-full-pet" title="${escapeHTML(ambientPet.name)}">${getPetImage(ambientPet)?`<img src="${escapeHTML(getPetImage(ambientPet))}" alt="${escapeHTML(ambientPet.name)}">`:ambientPet.icon||'🐾'}</div>`:''}
      ${ambientEnemy?`<button class="rp-full-enemy" data-action="scene-patrol" data-id="${ambientEnemy.id}"><img src="${ambientEnemy.image}" alt=""><span>${escapeHTML(ambientEnemy.name)} · проверить</span></button>`:''}
      <div class="rp-place-title"><small>СЕЙЧАС В КОНОХЕ</small><h2>${escapeHTML(place.name)}</h2><p>${escapeHTML(place.desc)}</p></div>
      <div class="rp-scene-bottom"><div class="rp-speaker-line"><b>${escapeHTML(speaker)}</b><span>${activeCharacter?`Рядом · ${escapeHTML(activeCharacter.name)}`:'Тихая сцена'}</span></div><p data-typewriter>${escapeHTML(narration)}</p></div>
    </section>
    <section class="rp-control-deck">
      <form id="world-action-form" class="rp-text-action"><label><span>СВОБОДНОЕ ДЕЙСТВИЕ</span><small>Пиши, что делаешь, куда идёшь или что исследуешь</small></label><textarea name="action" rows="2" maxlength="700" placeholder="Например: осматриваю витрину, затем захожу в цветочную лавку…" required>${escapeHTML(state.ui.lastActionText||'')}</textarea><button class="btn btn-primary" type="submit">Выполнить ↗</button></form>
      <form id="world-dialogue-form" class="rp-text-dialogue"><label><span>ТВОЯ РЕПЛИКА</span><small>${activeCharacter?`Разговор с ${escapeHTML(activeCharacter.name)} · только ручной ввод`:'Рядом сейчас никого нет'}</small></label>${activeCharacter?`<input type="hidden" name="characterId" value="${activeCharacter.id}"><textarea name="message" rows="2" maxlength="700" placeholder="Напиши своими словами, что говоришь…" required></textarea><button class="btn btn-soft" type="submit">Сказать ➤</button>`:`<div class="rp-empty-talk">Персонаж появится в этой сцене, когда окажется в локации. Можно отправиться по карте или немного подождать.</div><button class="btn btn-soft" type="button" data-view="map">Открыть карту</button>`}</form>
    </section>
    <div class="rp-bottom-shortcuts"><button data-view="locations"><img src="assets/ui/generated/location.png" alt="">Локации</button><button data-view="map"><img src="assets/ui/generated/location.png" alt="">Карта</button><button data-view="scroll"><img src="assets/ui/generated/scroll-case.png" alt="">Задания</button><button data-view="gallery"><img src="assets/ui/generated/journal.png" alt="">Галерея</button><button data-view="achievements"><img src="assets/ui/generated/trophy.png" alt="">Достижения</button>${state.collectibles?.magazineFound?'<button data-view="magazine"><img src="assets/ui/generated/journal.png" alt="">Альманах</button>':''}${secretSearch}<button data-action="skip-time" data-hours="1"><img src="assets/ui/generated/pause.png" alt="">+1 час</button>${['training','forest','gate','campsite'].includes(place.id)?'<button data-action="patrol">🥋 Учебный патруль</button>':''}</div>`;
}
function renderMap(state) {
  const place = getLocation(state.world.location);
  const coords = {
    'main-street':[49,48],'ichiraku':[30,37],'flower-shop':[66,37],market:[80,48],training:[76,73],hospital:[44,82],hokage:[51,17],
    'tea-house':[28,56],river:[15,83],forest:[7,51],memorial:[14,18],gate:[50,5],library:[20,39],garden:[34,70],home:[56,64],'music-hall':[88,48],
    academy:[81,20],campsite:[6,83],bathhouse:[21,63],dojo:[89,76],archive:[19,29],residential:[64,55],rooftop:[69,22],greenhouse:[40,70]
  };
  const visibleLocations=LOCATIONS.filter(location=>!location.hidden || state.discoveredLocations?.includes(location.id));
  const pins = visibleLocations.map(location=>{
    const [x,y]=coords[location.id]||[50,50];
    const access=getLocationAccess(state,location.id); const locked=!access.allowed; const minutes=getTravelMinutes(place.id,location.id);
    return `<button class="map-pin ${location.id===place.id?'current':''} ${locked?'locked':''}" style="left:${x}%;top:${y}%" data-action="travel" data-id="${location.id}" ${locked?'disabled':''} title="${escapeHTML(locked?access.reason:location.name)}"><span>${location.icon}</span><b>${escapeHTML(location.name)}</b><i>${location.id===place.id?'Здесь':locked?'Закрыто':`${minutes} мин`}</i></button>`;
  }).join('');
  return `${heading('Карта Конохи','Выбирай точку на схеме. Переход займёт игровое время; внезапный уход со встречи может повлиять на отношения.')}
    <section class="map-ornate-banner map-ornate-banner-v2"><div><small>🌸 КАРТА КОНОХИ</small><h3>Деревня Скрытого Листа</h3><p>Текущее место: <b>${escapeHTML(place.name)}</b></p></div><button class="btn btn-soft" data-action="toggle-map-legend">${state.ui.mapLegend?'Скрыть легенду':'Открыть легенду'}</button></section>
    ${state.ui.mapLegend?`<section class="panel-card map-legend"><b>Легенда карты</b><span>🏠 Жилые места</span><span>🍜 Еда и магазины</span><span>⚕️ Службы и госпиталь</span><span>🥋 Тренировки</span><span>🌲 Природа</span><span>🔒 Временно закрытая зона</span><p>Переход занимает от 5 до 32 игровых минут в зависимости от расстояния. Если ты договаривался о встрече, внезапный уход будет заметен собеседнику.</p></section>`:''}
    <section class="map-overview" aria-label="Схематичная карта Конохи"><svg class="map-roads" viewBox="0 0 1000 640" preserveAspectRatio="none" aria-hidden="true"><defs><pattern id="map-grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="rgba(246,208,231,.06)" stroke-width="1"/></pattern></defs><rect width="1000" height="640" fill="url(#map-grid)"/><path d="M-40 250 C170 205 230 300 390 275 S720 190 1040 255 M170 -30 C220 120 350 170 500 230 S650 420 610 680 M-30 485 C180 430 280 520 445 495 S770 410 1030 485" fill="none" stroke="#c89bb9" stroke-width="25" opacity=".16" stroke-linecap="round"/><path d="M-40 250 C170 205 230 300 390 275 S720 190 1040 255 M170 -30 C220 120 350 170 500 230 S650 420 610 680 M-30 485 C180 430 280 520 445 495 S770 410 1030 485" fill="none" stroke="#e3c3d9" stroke-width="2" opacity=".22" stroke-dasharray="7 13"/><path d="M740 -20 C690 100 830 180 790 300 S860 520 1010 660" fill="none" stroke="#6fa8b2" stroke-width="50" opacity=".2"/><path d="M70 80 L230 35 390 85 470 40 690 65 930 120 950 330 875 580 660 605 450 570 240 605 50 500Z" fill="none" stroke="rgba(246,198,225,.22)" stroke-width="3" stroke-dasharray="10 10"/><g fill="rgba(195,139,176,.16)" stroke="rgba(236,188,220,.16)"><rect x="335" y="95" width="135" height="78" rx="12"/><rect x="520" y="95" width="170" height="90" rx="12"/><rect x="340" y="370" width="155" height="90" rx="12"/><rect x="560" y="365" width="125" height="100" rx="12"/></g><g fill="rgba(232,176,211,.35)" font-size="18" font-family="sans-serif"><text x="390" y="140">ЦЕНТР</text><text x="565" y="145">ТОРГОВЫЙ РЯД</text><text x="367" y="420">ЖИЛОЙ КВАРТАЛ</text><text x="575" y="420">ВОСТОК</text></g></svg>${pins}<div class="map-compass">N<br>✦</div><div class="map-scale">СХЕМА ДЕРЕВНИ · НЕ В МАСШТАБЕ</div></section>
    <p class="map-tap-hint">Нажми на метку на карте, чтобы перейти. Закрытые места отмечены замком; причина ограничения появится при выборе.</p>`;
}
function renderDay(state) {
  const companions = CHARACTERS.filter(character=>state.companions?.includes(character.id));
  const assignments = state.assignments.filter(item=>item.day===state.world.day);
  const taskOptions = [['cook','Приготовить еду'],['tidy','Уборка дома'],['shop','Покупки на рынке'],['study','Учёба и чтение'],['train','Тренировка'],['garden','Уход за садом'],['clinic','Помощь в больнице'],['rest','Отдых']];
  return `${heading('Распорядок дня','Личные планы жителей скрыты. Поручения можно распределять только тем спутницам, которые согласились войти в твой ближний круг.')}
    <section class="ref-day-banner" style="--scene:url('assets/backgrounds/tatami-home.webp')"><div><small>ДЕНЬ ${state.world.day} · ${seasonLabel(state)}</small><h3>Домашние дела и совместные планы</h3><p>Собственные занятия персонажей остаются их личным делом; поручения можно менять или отменять.</p></div></section>
    <section class="panel-card ref-day-form-card"><div class="ref-section-title"><span class="ref-section-icon"><img src="assets/ui/cropped/home.png" alt=""></span><div><small>НОВОЕ ЗАНЯТИЕ</small><h3>Распределить дела</h3></div></div>${companions.length?`<form id="assignment-form" class="assignment-form"><label>Кто займётся?<select name="actor"><option value="player">${escapeHTML(state.player.name)}</option>${companions.map(character=>`<option value="${character.id}">${escapeHTML(character.name)}</option>`).join('')}</select></label><label>Чем займётся?<select name="task">${taskOptions.map(([id,label])=>`<option value="${id}">${label}</option>`).join('')}</select></label><button class="btn btn-primary" type="submit">Назначить дело</button></form>`:`<div class="empty-state">Пока некому поручать бытовые дела. Сначала укрепи доверие и пригласи девушку в ближний круг из её профиля.</div>`}</section>
    <section class="ref-plan-grid">${assignments.length?assignments.map(item=>`<article class="ref-plan-card"><span class="ref-plan-icon">${item.done?'✓':'✦'}</span><div><b>${escapeHTML(item.actorName)}</b><small>${escapeHTML(taskOptions.find(([id])=>id===item.task)?.[1]||item.task)}</small></div><em class="${item.done?'done':''}">${item.done?'Выполнено':'Запланировано'}</em></article>`).join(''):'<div class="empty-state">На сегодня пока нет назначенных дел.</div>'}</section>
    <section class="panel-card private-routine-note"><div class="card-head"><h3>Повседневная жизнь Конохи</h3><small>РАСПИСАНИЯ НЕ ПОКАЗЫВАЮТСЯ</small></div><p>У каждого жителя есть собственные планы и предпочтения. Они перемещаются самостоятельно. Ты узнаёшь, где находится персонаж, только при встрече, наблюдении или в разговоре — личное расписание целиком не раскрывается.</p></section>`;
}

function renderSettingsPage(state) {
  const s=state.settings;
  return `${heading('Настройки','Тёмно-фиолетовая тема, розовые акценты и параметры сохранения.')}
    <section class="panel-card ref-settings-card settings-ornate"><div class="ref-section-title"><span class="ref-section-icon">⚙</span><div><small>ОБЩИЕ ПАРАМЕТРЫ</small><h3>Игровой процесс</h3></div></div>
      <label class="setting-row"><span><b>Автосохранение</b><small>Записывать прогресс после действий</small></span><input class="switch" type="checkbox" data-setting="autosave" ${s.autosave?'checked':''}></label>
      <label class="setting-row"><span><b>Показывать имена персонажей</b><small>Подписи над фигурами в игровых сценах</small></span><input class="switch" type="checkbox" data-setting="showNames" ${s.showNames!==false?'checked':''}></label>
      <label class="setting-row"><span><b>Анимации</b><small>Плавные переходы и эффекты сцены</small></span><input class="switch" type="checkbox" data-setting="animations" ${s.animations?'checked':''}></label>
      <label class="setting-row"><span><b>Скрывать романтические эпизоды</b><small>Нейтральный переход сцены без подробностей</small></span><input class="switch" type="checkbox" data-setting="romanceFadeToBlack" ${s.romanceFadeToBlack!==false?'checked':''}></label>
      <label class="setting-row"><span><b>Режим приватности</b><small>Скрывать нейтральные романтические переходы и отмечать чувствительные темы плашкой «Цензура»</small></span><input class="switch" type="checkbox" data-setting="hideSensitiveText" ${s.hideSensitiveText!==false?'checked':''}></label>
      <label class="setting-row"><span><b>Размер текста</b><small>Удобство чтения на телефоне</small></span><select class="small-select" data-setting="textSize"><option value="normal" ${s.textSize==='normal'?'selected':''}>Обычный</option><option value="large" ${s.textSize==='large'?'selected':''}>Крупный</option></select></label>
      <label class="setting-row"><span><b>Контраст</b><small>Выделение текста и элементов</small></span><select class="small-select" data-setting="contrast"><option value="normal" ${s.contrast==='normal'?'selected':''}>Обычный</option><option value="high" ${s.contrast==='high'?'selected':''}>Повышенный</option></select></label>
      <div class="settings-slider-row"><label for="music-volume"><b>Громкость музыки</b><output>${s.musicVolume??55}%</output></label><input id="music-volume" type="range" min="0" max="100" value="${s.musicVolume??55}" data-setting="musicVolume"></div>
      <div class="settings-slider-row"><label for="effect-volume"><b>Громкость эффектов</b><output>${s.effectVolume??70}%</output></label><input id="effect-volume" type="range" min="0" max="100" value="${s.effectVolume??70}" data-setting="effectVolume"></div>
      <div class="language-cycle"><div><b>Язык интерфейса</b><small>Пока доступен только русский</small></div><div class="language-buttons"><button data-action="language-prev" aria-label="Предыдущий язык">‹</button><strong>Русский</strong><button data-action="language-next" aria-label="Следующий язык">›</button></div></div>
      <div class="ref-music-panel"><b>Музыка из библиотеки</b><p>Атмосферная японская инструментальная композиция. Управление громкостью будет применяться к встроенному звуку, когда он подключён.</p><a href="https://pixabay.com/music/ambient-japanese-style-ambient-475587/" target="_blank" rel="noopener">Открыть Pixabay ↗</a></div>
      <div class="ref-save-actions"><button class="btn btn-soft" data-action="save-now">Сохранить сейчас</button><button class="btn btn-soft" data-action="export-save">Экспортировать прогресс</button><button class="btn btn-soft" data-action="import-save">Импортировать прогресс</button><input id="import-file" type="file" accept="application/json,.json" hidden><button class="btn btn-ghost" data-action="reset-save">Сбросить сохранение</button></div>
    </section>`;
}
function renderPersonCard(state,character) {
  const bond = getBond(state,character.id);
  const value = Math.max(bond.friendship,bond.trust,bond.respect);
  const portrait = character.art?.[0]?.src || '';
  const statusClass=value>=75?'bond-close':value>=40?'bond-warm':value<=8?'bond-new':'bond-neutral';
  return `<button class="person-card ref-person-card ${statusClass}" data-action="open-person" data-id="${character.id}"><span class="ref-card-portrait"><img src="${portrait}" alt="${escapeHTML(character.name)}" loading="lazy"><i>${escapeHTML(character.role)}</i></span><span class="ref-card-copy"><strong>${escapeHTML(character.name)}</strong><small>${escapeHTML(character.personality)}</small><span class="bond-line"><span>${escapeHTML(bond.stage||'Знакомая')}</span><b>${value}/100</b></span><span class="bond-track"><i style="width:${value}%"></i></span></span></button>`;
}

function renderPeople(state) {
  const met = new Set([...(state.metCharacters||[]),...Object.keys(state.bonds||{}).filter(id=>(state.bonds?.[id]?.meetings||0)>0)]);
  const available = CHARACTERS.filter(item => state.unlocked.includes(item.id) && met.has(item.id));
  const secretOpen = state.unlocked.includes('haku');
  return `${heading('Герои','Здесь появляются только те, с кем ты уже познакомился лично.')}
    <div class="people-toolbar"><span>${available.length} знакомых персонажей</span><span>Рамка карточки отражает текущее состояние отношений</span></div>
    ${available.length?`<div class="people-grid">${available.map(item=>renderPersonCard(state,item)).join('')}</div>`:`<section class="panel-card empty-heroes"><div class="empty-heroes-mark">🌸</div><h3>Пока нет знакомых героев</h3><p>Посещай места Конохи, замечай людей на сцене и начинай разговор. После первой личной беседы героиня появится здесь.</p><button class="btn btn-primary" data-view="world">Вернуться в RP</button></section>`}
    ${!secretOpen?`<button class="person-card secret-card" data-action="secret-hint"><div class="person-top"><div class="person-avatar secret-avatar">?</div><div><strong>Неизвестный гость</strong><small>Секретная встреча</small></div></div><p class="person-desc">В старом лесу иногда видят незнакомого путешественника. Следы чаще появляются зимой.</p><div class="bond-line"><span>Загадка</span><b>???</b></div></button>`:''}`;
}
function renderPersonDetail(state,character) {
  const bond = getBond(state,character.id);
  const history = state.dialogues[character.id] || [];
  const lastMemories = state.memories[character.id] || [];
  const value = Math.max(bond.friendship,bond.trust,bond.respect);
  const characterPlace=getNpcLocation(state,character.id);
  const isHere=characterPlace===state.world.location;
  const placeName=characterPlace?getLocation(characterPlace).name:'за пределами деревни';
  const allArt=character.art||[];
  const art=getUnlockedCharacterArts(state,character);
  const index=Math.min(art.length-1,Math.max(0,state.ui.profileArtIndex||0));
  const currentArt=art[index]||art[0]||allArt[0];
  state.gallerySeen ||= {characters:{},backgrounds:[]}; state.gallerySeen.characters ||= {};
  state.gallerySeen.characters[character.id] ||= [];
  if(currentArt?.src&&!state.gallerySeen.characters[character.id].includes(currentArt.src)) state.gallerySeen.characters[character.id].push(currentArt.src);
  const knownSince=state.meetingHistory?.[character.id]?.firstDay;
  const gifts=state.giftHistory?.[character.id]||[];
  const stageValue=Math.max(bond.friendship||0,bond.trust||0,bond.respect||0);
  const stageClass=stageValue>=70?'high':stageValue>=35?'mid':'new';
  const meetingText=knownSince?`Знакомы с ${knownSince} дня`:'Дата знакомства пока неизвестна';
  return `${heading(character.name,`${character.role} · ${character.personality}`)}
    <div class="dossier-layout">
      <aside class="panel-card dossier-stats ${stageClass}"><div class="dossier-person-head">${avatar(character,true)}<h3>${escapeHTML(character.name)}</h3><small>${escapeHTML(character.role)}</small></div>
        <div class="dossier-status-badge">${escapeHTML(bond.stage||'Знакомы')}</div>
        <div class="dossier-metric"><span>Дружба</span><b>${bond.friendship||0}/100</b><i><u style="width:${bond.friendship||0}%"></u></i></div>
        <div class="dossier-metric"><span>Доверие</span><b>${bond.trust||0}/100</b><i><u style="width:${bond.trust||0}%"></u></i></div>
        <div class="dossier-metric"><span>Уважение</span><b>${bond.respect||0}/100</b><i><u style="width:${bond.respect||0}%"></u></i></div>
        <dl class="dossier-facts"><div><dt>Статус</dt><dd>${escapeHTML(bond.stage||'Знакомая')}</dd></div><div><dt>Встреч</dt><dd>${bond.meetings||0}</dd></div><div><dt>Знакомы</dt><dd>${escapeHTML(meetingText)}</dd></div><div><dt>Энергия</dt><dd>Неизвестна</dd></div><div><dt>Настроение</dt><dd>${isHere?'Можно понять по поведению':'Неизвестно'}</dd></div><div><dt>Личные деньги</dt><dd>Неизвестно</dd></div></dl>
        <div class="dossier-likes"><b>Что известно</b><p>Нравится: ${character.likes.map(escapeHTML).join(', ')||'Пока неизвестно'}</p><p>Характер: ${escapeHTML(character.personality)}</p><p>Не любит: ${escapeHTML(character.dislikes||'Пока не выяснено')}</p></div>
        ${state.companions?.includes(character.id)?'<div class="companion-state">Входит в ближний круг</div>':(bond.friendship>=35&&bond.trust>=25?`<button class="btn btn-soft full-width" data-action="invite-companion" data-id="${character.id}">Пригласить в ближний круг</button>`:'')}
        <button class="btn btn-ghost full-width" data-action="back-people">← К героям</button>
      </aside>
      <div class="dossier-main">
        <section class="panel-card dossier-gallery"><div class="card-head"><h3>Галерея персонажа</h3><small>${index+1} / ${art.length} открыто</small></div>
          <div class="dossier-art-stage"><button class="art-arrow prev" data-action="profile-art-prev" data-id="${character.id}" aria-label="Предыдущее изображение">‹</button><img src="${escapeHTML(currentArt?.src||'')}" alt="${escapeHTML(character.name)} — ${escapeHTML(currentArt?.label||'Портрет')}" data-action="view-art" data-src="${escapeHTML(currentArt?.src||'')}" loading="eager"><button class="art-arrow next" data-action="profile-art-next" data-id="${character.id}" aria-label="Следующее изображение">›</button><span class="art-caption">${escapeHTML(currentArt?.label||'Портрет')}</span></div>
          <div class="dossier-art-dots">${art.map((item,i)=>`<button class="${i===index?'active':''}" data-action="profile-art-set" data-id="${character.id}" data-index="${i}" aria-label="${escapeHTML(item.label)}"></button>`).join('')}</div>${allArt.length>art.length?`<p class="art-unlock-hint">Следующие образы открываются по мере развития знакомства. Сейчас открыто ${art.length} из ${allArt.length}.</p>`:''}
        </section>
        <section class="panel-card dossier-story"><div class="card-head"><h3>История знакомства</h3><small>${bond.meetings||0} встреч</small></div><p class="dossier-bio">${escapeHTML(character.notes||character.personality)}</p><div class="dossier-history">${lastMemories.length?lastMemories.slice(-8).reverse().map(item=>`<div class="dossier-history-line"><b>${escapeHTML(item.title||'Событие')}</b><p>${escapeHTML(item.text||'Вы провели время вместе.')}</p><small>${item.day?`День ${item.day}`:'Запись знакомства'}</small></div>`).join(''):`<p class="chat-hint">Пока нет важных событий. После встреч здесь появятся запомнившиеся моменты, договорённости и поступки.</p>`}</div></section>
        <section class="panel-card dossier-gifts"><div class="card-head"><h3>Подарки и расходы</h3><small>${gifts.length} записей</small></div>${gifts.length?`<ul>${gifts.map(item=>`<li>${escapeHTML(item.name)} · ${item.price?`${item.price} рё`: 'стоимость неизвестна'} · день ${item.day}</li>`).join('')}</ul>`:'<p class="chat-hint">Пока подарков и расходов на неё не записано.</p>'}</section>
        <section class="panel-card dossier-availability"><div class="card-head"><h3>Последняя известная встреча</h3><small>${isHere?'РЯДОМ':'НЕ РЯДОМ'}</small></div><p>${isHere?`${escapeHTML(character.name)} сейчас находится в той же локации. Вернись к RP-сцене, чтобы продолжить разговор.`:`Последняя известная локация: ${escapeHTML(placeName)}. Точное расписание персонажа остаётся скрытым.`}</p><button class="btn btn-soft" data-view="world">Вернуться к RP-сцене</button></section>
      </div>
    </div>`;
}
function renderConversation(state,character) {
  if (!character) return `${heading('Разговор','Выбери героиню из списка знакомых.')}`;
  const placeId=getNpcLocation(state,character.id);
  const isHere=placeId===state.world.location;
  const history=state.dialogues[character.id]||[];
  const lines=history.slice(-30).map(item=>`<article class="conversation-line ${item.from==='player'?'from-player':'from-npc'}"><b>${item.from==='player'?escapeHTML(state.player.name):escapeHTML(character.name)}</b><p>${escapeHTML(item.text)}</p><small>День ${item.day} · ${String(Math.floor((item.minute||0)/60)).padStart(2,'0')}:${String((item.minute||0)%60).padStart(2,'0')}</small></article>`).join('');
  return `${heading(`Разговор с ${escapeHTML(character.name)}`,`Личная беседа · ${isHere?'героиня находится рядом':'героиня сейчас в другом месте'}`)}
    <section class="conversation-shell panel-card">
      <div class="conversation-head">${avatar(character,true)}<div><h3>${escapeHTML(character.name)}</h3><small>${isHere?`Сейчас здесь: ${escapeHTML(getLocation(state.world.location).name)}`:`Сейчас: ${escapeHTML(placeId?getLocation(placeId).name:'неизвестно')}`}</small></div><button class="btn btn-ghost" data-action="back-profile" data-id="${character.id}">Досье</button></div>
      <div class="conversation-log" id="conversation-log">${lines||'<div class="empty-state">Вы ещё не разговаривали. Начни с приветствия или вопроса о делах.</div>'}</div>
      ${isHere?`<div class="conversation-actions" aria-label="Частые дружеские действия"><span>Частые действия</span><button class="btn btn-soft" data-action="conversation-gesture" data-type="wave">👋 Помахать</button><button class="btn btn-soft" data-action="conversation-gesture" data-type="handshake">🤝 Пожать руку</button><button class="btn btn-soft" data-action="conversation-gesture" data-type="highfive">✋ Дать пять</button><button class="btn btn-soft" data-action="conversation-gesture" data-type="hug">🫂 Попросить обнять</button></div><details class="conversation-action-library"><summary>Каталог действий · ${CONVERSATION_ACTIONS.length}</summary><div class="conversation-action-groups">${CONVERSATION_ACTION_GROUPS.map(group=>`<section class="conversation-action-group"><h4>${escapeHTML(group.label)}</h4><div>${group.actions.map(action=>`<button class="btn btn-soft" data-action="conversation-gesture" data-type="${escapeHTML(action.id)}">${escapeHTML(action.label)}</button>`).join('')}</div></section>`).join('')}</div></details><form id="conversation-form" class="conversation-compose"><textarea name="message" rows="2" maxlength="500" placeholder="Напиши свою реплику вручную…" required></textarea><button class="btn btn-primary" type="submit">Отправить ↗</button></form>`:`<div class="chat-away-note">Сейчас она не рядом, поэтому личный разговор недоступен. Найди её на карте или дождись следующей встречи.</div><button class="btn btn-soft" data-action="open-map-to-character" data-id="${character.id}">Открыть карту</button>`}
    </section>`;
}

function renderPhone(state) {
  const app=state.phone?.app || 'home';
  const posts=state.phone?.posts || [];
  const messages=state.phone?.messages || [];
  const contacts=CHARACTERS.filter(character=>state.unlocked.includes(character.id) && (state.bonds?.[character.id]?.meetings||0)>0);
  const stamp=minute=>`${String(Math.floor(minute/60)).padStart(2,'0')}:${String(minute%60).padStart(2,'0')}`;
  const apps=[
    ['konohagram','◎','Konohagram','Фото и повседневная лента','photo'],
    ['line','<img src="assets/ui/generated/chat.png" alt="">','KonohaLine','Личные сообщения','chat'],
    ['shinobix','𝕏','ShinobiX','Короткие записи и обсуждения','text'],
    ['scrolltube','▶','ScrollTube','Видео из жизни деревни','video']
  ];
  const names={konohagram:'Konohagram',line:'KonohaLine',shinobix:'ShinobiX',scrolltube:'ScrollTube'};
  const activeName=names[app]||'Смартфон';
  const appButton=(item)=>`<button class="phone-launch-app app-${item[0]}" data-action="phone-app" data-id="${item[0]}"><span class="phone-launch-icon">${item[1]}</span><b>${item[2]}</b><small>${item[3]}</small></button>`;
  let content='';
  if(app==='home') {
    content=`<div class="phone-app-grid">${apps.map(appButton).join('')}</div><section class="phone-widget"><small>СЕГОДНЯ В КОНОХЕ</small><b>${state.phone.posts?.length||0} публикаций в ленте</b><p>Новые записи появляются по мере того, как знакомые занимаются своими делами.</p></section>`;
  } else if(app==='konohagram' || app==='shinobix') {
    const platformPosts=posts.filter(post=>(post.platform||'konohagram')===app);
    content=`<form id="social-post-form" class="phone-compose" data-platform="${app}"><textarea name="post" rows="2" maxlength="${app==='shinobix'?280:400}" placeholder="${app==='shinobix'?'Что думаешь? Напиши короткую запись…':'Поделись моментом из сегодняшнего дня…'}" required></textarea><button class="btn btn-primary" type="submit">Опубликовать</button></form><div class="phone-feed">${platformPosts.length?platformPosts.map(post=>{const author=CHARACTERS.find(character=>character.id===post.authorId);const avatarSrc=author?.art?.[0]?.src;const media=app==='konohagram'?`<div class="social-photo" style="background-image:url('${escapeHTML(post.image||'assets/backgrounds/konoha-main.webp')}')"></div>`:'';return `<article class="phone-post ${app==='shinobix'?'short-post':''}"><div class="phone-post-head">${avatarSrc?`<img src="${avatarSrc}" alt="">`:'<span class="phone-player-avatar">Я</span>'}<div><b>${escapeHTML(author?.name||state.player.name)}</b><small>День ${post.day} · ${stamp(post.minute||0)}</small></div><span class="phone-post-source">${author?'подписка':'ты'}</span></div>${media}<p>${escapeHTML(post.text)}</p><button data-action="phone-like" data-id="${post.id}" class="phone-like ${post.liked?'liked':''}">♥ ${post.likes||0}</button></article>`}).join(''):'<div class="empty-state">Лента пока пустая. Напиши первую публикацию — знакомые смогут на неё отреагировать.</div>'}</div>`;
  } else if(app==='line') {
    content=`${contacts.length?`<form id="phone-message-form" class="phone-compose"><label class="vn-select-label">Контакт</label><select name="characterId">${contacts.map(character=>`<option value="${character.id}">${escapeHTML(character.name)}</option>`).join('')}</select><textarea name="message" rows="3" maxlength="500" placeholder="Сообщение вручную…" required></textarea><button class="btn btn-primary" type="submit">Отправить</button></form>`:'<div class="empty-state">Контактов пока нет. Сначала встреться с персонажем лично, чтобы обменяться контактами.</div>'}<div class="phone-messages">${messages.slice(-35).reverse().map(message=>{const author=CHARACTERS.find(character=>character.id===message.characterId);return `<article class="phone-message ${message.from==='player'?'outgoing':'incoming'}"><small>${escapeHTML(author?.name||'Собеседник')} · ${stamp(message.minute||0)}</small><p>${escapeHTML(message.text)}</p></article>`}).join('')}</div>`;
  } else if(app==='scrolltube') {
    const videos=[
      {id:'v1',title:'Тренировка контроля чакры: базовые упражнения',author:'Академия Конохи',place:'training-ground.webp',duration:'08:42',views:128,desc:'Спокойный разбор базовых упражнений на контроль чакры.'},
      {id:'v2',title:'Утро на главной улице Конохи',author:'Городской канал',place:'konoha-main.webp',duration:'03:16',views:84,desc:'Небольшая прогулка по центру деревни.'},
      {id:'v3',title:'Как приготовить рамен дома',author:'Ичираку',place:'ichiraku.webp',duration:'12:05',views:241,desc:'Рецепт бульона и сборка простой порции рамена.'},
      {id:'v4',title:'Вечерняя прогулка у реки',author:'Личный дневник',place:'river-sunset.webp',duration:'05:31',views:67,desc:'Вечерние виды и шум воды.'}
    ];
    const active=videos.find(video=>video.id===state.phone.activeVideo);
    content=active?`<div class="video-player"><button class="phone-back video-back" data-action="video-back">‹ К списку видео</button><div class="video-player-screen" style="background-image:url('assets/backgrounds/${active.place}')"><span>▶</span><small>${active.duration}</small></div><h3>${active.title}</h3><p>${active.desc}</p><small>${active.author} · ${active.views+(state.phone.videoViews?.includes(active.id)?1:0)} просмотров</small></div>`:`<div class="video-feed">${videos.map(video=>`<article class="video-card"><button class="video-thumb" data-action="video-play" data-id="${video.id}" style="background-image:url('assets/backgrounds/${video.place}')"><span>▶</span><small>${video.duration}</small></button><div><b>${video.title}</b><small>${video.author} · ${video.views+(state.phone.videoViews?.includes(video.id)?1:0)} просмотров</small></div></article>`).join('')}</div><p class="chat-hint">Локальный видеоканал с сюжетными роликами о жизни Конохи.</p>`;
  }
  return `${heading('Смартфон','Четыре местных приложения: фото-лента, личные сообщения, короткие посты и видеоканал.')}
    <section class="phone-shell"><div class="phone-notch"></div><div class="phone-statusbar"><b>木ノ葉 NET</b><span>${stamp(state.world.minute)} · ${state.world.weather==='rain'?'🌧️':state.world.weather==='snow'?'❄️':'☀️'} · ${state.player.stats.coins} рё</span></div>
      <div class="phone-app-head"><button class="phone-back" data-action="phone-app" data-id="home" aria-label="На главный экран телефона">${app==='home'?'葉':'‹'}</button><div><b>${activeName}</b><small>${app==='home'?'Главный экран приложений':'Локальная сеть Конохи'}</small></div><span class="phone-online">● сеть</span></div>
      <div class="phone-app-content">${content}</div>
      <div class="phone-bottom"><button data-action="phone-app" data-id="home">⌂ Домой</button><button data-action="phone-app" data-id="konohagram">◎ Фото</button><button data-action="phone-app" data-id="line">✉ Чат</button><button data-action="phone-app" data-id="shinobix">𝕏 Посты</button></div>
    </section>`;
}

function renderPets(state) {
  const owned = state.pets || [];
  const portrait = pet => getPetImage(pet) ? `<img src="${escapeHTML(getPetImage(pet))}" alt="${escapeHTML(pet.name)}" loading="lazy">` : `<span>${pet.icon||'🐾'}</span>`;
  return `${heading('Питомцы','Заводи животных, выбирай имена и ухаживай за ними. У каждого вида свой портрет, характер и привычки.')}
    <section class="panel-card pets-owned"><div class="card-head"><h3>Твои питомцы</h3><small>${owned.length} / 5</small></div>${owned.length?`<div class="pets-grid">${owned.map(pet=>`<article class="pet-card"><div class="pet-portrait">${portrait(pet)}</div><div><b>${escapeHTML(pet.name)}</b><small>${escapeHTML(pet.kind)} · ${escapeHTML(pet.temperament||'дружелюбный')}</small><p>Привязанность: ${pet.affection||0}/100 · Настроение: ${pet.mood??55}/100</p><small>Сытость: ${100-(pet.hunger??45)} · Энергия: ${pet.energy??80}</small><div class="bond-track"><i style="width:${pet.affection||0}%"></i></div><div class="pet-actions"><button class="mini-btn" data-action="pet-care" data-type="feed" data-id="${pet.uid}">Покормить</button><button class="mini-btn" data-action="pet-care" data-type="play" data-id="${pet.uid}">Поиграть</button><button class="mini-btn" data-action="pet-care" data-type="walk" data-id="${pet.uid}">Прогуляться</button></div><form class="pet-name-form" data-pet-id="${pet.uid}"><input name="name" maxlength="20" value="${escapeHTML(pet.name)}" aria-label="Имя питомца"><button class="mini-btn" type="submit">Переименовать</button></form></div></article>`).join('')}</div>`:'<div class="pets-empty"><img class="pets-empty-mascot" src="assets/ui/enot-mascot.webp" alt="Маскот Конохи"><h3>Пока дома тихо</h3><p>Выбери питомца в магазине ниже. У каждого свой характер и любимые занятия.</p></div>'}</section>
    <section class="panel-card pet-shop-panel"><div class="card-head"><h3>Магазин животных</h3><small>БЮДЖЕТ: ${state.player.stats.coins} РЁ</small></div><div class="pets-grid">${PETS.map(pet=>`<article class="pet-shop-card"><div class="pet-shop-icon">${pet.image?`<img src="${escapeHTML(pet.image)}" alt="${escapeHTML(pet.name)}" loading="lazy">`:pet.icon}</div><h4>${escapeHTML(pet.name)}</h4><p>${escapeHTML(pet.desc)}</p><small>Темперамент: ${escapeHTML(pet.temperament)}</small><div class="pet-shop-footer"><b>${pet.price} рё</b><button class="btn btn-primary" data-action="buy-pet" data-id="${pet.id}" ${owned.length>=5?'disabled':''}>Завести</button></div></article>`).join('')}</div><p class="chat-hint">В доме может жить не больше пяти питомцев одновременно. Виды с собственными иллюстрациями отмечены отдельными портретами.</p></section>`;
}

function renderScroll(state) {
  const board=ensureDailyBoard(state);
  const entries = state.scroll.filter(item=>!item.hidden || item.visited);
  const history=entries.filter(item=>item.done||item.cancelled);
  const active=entries.filter(item=>!item.done&&!item.cancelled);
  const shown=state.ui.questTab==='history'?history:active;
  const contracts=board.contracts.map(item=>`<article class="daily-contract ${item.done?'done':''}"><div class="daily-contract-icon">${item.done?'✓':'✦'}</div><div class="daily-contract-copy"><b>${escapeHTML(item.title)}</b><small>${escapeHTML(item.desc)}</small><div class="quest-progress"><i style="width:${Math.min(100,(item.progress/item.target)*100)}%"></i></div><small>${item.progress}/${item.target} · награда ${item.reward} рё</small></div>${item.done?'<span class="done-mark">✓</span>':''}</article>`).join('');
  const skills=Object.entries(SKILL_META).map(([id,meta])=>{const skill=state.skills?.[id]||{level:1,xp:0};const level=getSkillLevel(state,id);const goal=level*20;const progress=level>=5?100:Math.min(100,(skill.xp/goal)*100);return `<article class="mastery-chip"><span>${meta.icon}</span><div><b>${escapeHTML(meta.name)} · ур. ${level}</b><div class="quest-progress"><i style="width:${progress}%"></i></div><small>${level>=5?'Максимальный уровень':`${skill.xp}/${goal} опыта`}</small></div></article>`}).join('');
  return `${heading('Задания','Ежедневные поручения, необычные события, обещания и личные цели. Выбор в ситуациях влияет на награды и развитие навыков.')}
    <section class="quest-banner"><div><small>🌸 СВИТОК КОНОХИ</small><h3>Твои дела и обещания</h3><p>Завершай ежедневные поручения и выбирай, как поступить в неожиданных ситуациях.</p></div></section>
    <section class="panel-card daily-board"><div class="card-head"><h3>Поручения на день ${board.day}</h3><small>${board.contracts.filter(item=>item.done).length}/${board.contracts.length} ГОТОВО</small></div><div class="daily-contract-list">${contracts}</div><p class="chat-hint">Новые поручения появляются утром. Незавершённые задачи истекают без штрафа.</p></section>
    <section class="panel-card mastery-panel"><div class="card-head"><h3>Развитие навыков</h3><small>ОПЫТ ЗА ДЕЙСТВИЯ</small></div><div class="mastery-grid">${skills}</div></section>
    <div class="quest-tabs"><button data-action="quest-tab" data-id="active" class="${state.ui.questTab!=='history'?'active':''}">Активные <b>${active.length}</b></button><button data-action="quest-tab" data-id="history" class="${state.ui.questTab==='history'?'active':''}">История <b>${history.length}</b></button></div>
    <section class="panel-card"><div class="scroll-list">${shown.length?shown.map(item=>`<article class="scroll-item ${item.done?'completed':''}"><div class="scroll-icon">${item.kind==='promise'?'🌸':item.kind==='mystery'?'❔':item.kind==='situation'?'✨':'📜'}</div><div><strong>${escapeHTML(item.title)}</strong><p>${escapeHTML(item.desc)}</p>${item.progress!=null?`<div class="quest-progress"><i style="width:${Math.min(100,(item.progress/(item.target||1))*100)}%"></i></div>`:''}${item.outcome?`<p class="situation-outcome">${escapeHTML(item.outcome)}</p>`:''}<small class="scroll-state">${item.done?(item.cancelled?'Отменено':'Выполнено'):(item.deadline?`Срок: ${escapeHTML(item.deadline)}`:'Без указанного срока')}</small></div><div class="quest-actions">${item.kind==='situation'&&!item.done?item.choices.map(choice=>`<button class="mini-btn" data-action="resolve-situation" data-id="${item.id}" data-type="${choice.id}">${escapeHTML(choice.label)}</button>`).join(''):!item.done?`<button class="mini-btn" data-action="quest-complete" data-id="${item.id}">Отметить</button><button class="mini-btn muted-btn" data-action="quest-ignore" data-id="${item.id}">Отложить</button>${item.kind==='promise'?`<button class="mini-btn muted-btn" data-action="quest-cancel" data-id="${item.id}">Отменить</button>`:''}`:'<span class="done-mark">✓</span>'}</div></article>`).join(''):'<div class="empty-state">В этом разделе пока пусто.</div>'}</div></section>
    <section class="panel-card promise-card"><div class="card-head"><h3>Поставить личную цель</h3><small>ЗАПИСЬ ИГРОКА</small></div><form id="promise-form" class="promise-form"><input name="promise" maxlength="140" placeholder="Например: встретиться с Темари до вечера" required><button class="btn btn-primary" type="submit">Добавить</button></form><p class="chat-hint">Личная цель не даёт награду сама по себе — это твоя заметка и ориентир.</p></section>`;
}

function renderBag(state) {
  const gender=state.player.gender||'male';
  const looks = gender==='female' ? [
    ['casual','Повседневный плащ','Спокойный образ для прогулок.','female-travel'],
    ['shinobi','Форма куноичи','Практичный комплект для заданий.','female-shinobi'],
    ['festival','Праздничное кимоно','Наряд для городского праздника.','female-festival'],
    ['travel','Дорожный плащ','Удобный вариант для поездок.','female-travel'],
    ['raincoat','Плащ от дождя','Универсальный верхний слой.','female-travel'],
    ['workwear','Форма помощницы','Собранный рабочий вариант.','female-shinobi']
  ] : [
    ['casual','Повседневная одежда','Удобный вариант для прогулок.','male-casual'],
    ['shinobi','Форма шиноби','Практичный стиль для тренировок.','male-shinobi'],
    ['festival','Праздничное кимоно','Наряд для городского праздника.','male-formal'],
    ['travel','Дорожный плащ','Подходит для прохладной погоды и поездок.','male-travel'],
    ['raincoat','Дождевой плащ','Тёплый плащ для дождя и ветра.','male-raincoat'],
    ['workwear','Рабочая форма','Форма для смены в мастерской или лавке.','male-work']
  ];
  const prices={festival:48,travel:36,raincoat:30,workwear:42};
  const kinds=[['all','Всё'],['food','Еда'],['gift','Подарки'],['clothing','Одежда'],['pet','Питомцам'],['material','Материалы'],['other','Прочее']];
  const filter=state.ui.bagTab||'all';
  const filtered=state.inventory.filter(item=>filter==='all'||item.kind===filter||(filter==='other'&&!['food','gift','clothing','material','pet'].includes(item.kind)));
  const selected=filtered.find(item=>item.id===state.ui.selectedItemId)||filtered[0]||null;
  const iconFor=item=>({tea:'assets/ui/tea.svg',flower:'assets/ui/generated/gift.png',paper:'assets/ui/generated/scroll-case.png',herb:'assets/ui/herb.svg',bento:'assets/ui/generated/ramen-bowl.png','pet-snack':'assets/ui/generated/gift-box.png','field-kit':'assets/ui/pouch.svg','herbal-tea':'assets/ui/tea.svg','pressed-bouquet':'assets/ui/generated/gift.png'}[item.id]||'assets/ui/pouch.svg');
  const owned=state.player.ownedLooks||['casual','shinobi'];
  const ownedClothing=new Set(state.player.ownedClothing||[]);
  const equipment=normalizeEquipment(state.player.equipment,state.player.look);
  const canChange=['home','market'].includes(state.world.location);
  const activeSlot=CLOTHING_SLOTS.some(slot=>slot.id===state.ui.wardrobeSlot)?state.ui.wardrobeSlot:'top';
  const slotInfo=CLOTHING_SLOTS.find(slot=>slot.id===activeSlot)||CLOTHING_SLOTS[1];
  const slotItems=CLOTHING.filter(item=>item.slot===activeSlot);
  const previewId=state.ui.wardrobePreview?.slot===activeSlot&&CLOTHING_BY_ID[state.ui.wardrobePreview.itemId]?.slot===activeSlot?state.ui.wardrobePreview.itemId:equipment[activeSlot];
  const previewItem=CLOTHING_BY_ID[previewId]||slotItems[0];
  const previewIndex=Math.max(0,slotItems.findIndex(item=>item.id===previewItem.id));
  const previewEquipment={...equipment,[activeSlot]:previewItem.id};
  const slotTabs=CLOTHING_SLOTS.map(slot=>`<button class="wardrobe-slot-tab ${activeSlot===slot.id?'active':''}" data-action="wardrobe-slot" data-id="${slot.id}"><span>${slot.icon}</span><b>${slot.label}</b><small>${escapeHTML(CLOTHING_BY_ID[equipment[slot.id]]?.name||'Не выбрано')}</small></button>`).join('');
  const previewOwned=ownedClothing.has(previewItem.id);
  const previewButton=previewOwned?`<button class="btn btn-primary" data-action="wardrobe-equip" data-id="${previewItem.id}" data-slot="${activeSlot}" ${!canChange?'disabled':''}>${equipment[activeSlot]===previewItem.id?'Уже надето':'Надеть'}</button>`:state.world.location==='market'?`<button class="btn btn-primary" data-action="buy-clothing" data-id="${previewItem.id}" data-slot="${activeSlot}">Купить · ${previewItem.price} рё</button>`:`<button class="btn btn-primary" disabled>Купить можно на рынке</button>`;
  const wardrobeDesigner=`<section class="wardrobe-designer panel-card"><div class="card-head"><div><h3>Собери образ по частям</h3><small>КАК В СИМУЛЯТОРАХ ЖИЗНИ · СЛОИ НЕ КОНФЛИКТУЮТ</small></div><span class="wardrobe-place-tag">${canChange?'МОЖНО ПЕРЕОДЕТЬСЯ':'ПРЕДПРОСМОТР'}</span></div>
      <div class="wardrobe-designer-layout"><div class="wardrobe-preview-column">${renderLayeredPlayer(state.player,previewEquipment)}<div class="wardrobe-preview-caption"><b>${escapeHTML(state.player.name)}</b><small>Предпросмотр: ${escapeHTML(previewItem.name)}</small></div></div>
      <div class="wardrobe-controls"><div class="wardrobe-slot-tabs">${slotTabs}</div><article class="wardrobe-item-picker"><div class="wardrobe-item-visual"><img src="assets/player/layers/thumbs/${previewItem.id}.svg" alt="${escapeHTML(previewItem.name)}"></div><div class="wardrobe-item-copy"><small>${escapeHTML(slotInfo.title.toUpperCase())} · ${previewIndex+1}/${slotItems.length}</small><h4>${escapeHTML(previewItem.name)}</h4><p>${escapeHTML(previewItem.desc)}</p><span class="wardrobe-fit-label">${previewOwned?'В гардеробе':`Цена: ${previewItem.price} рё`}</span></div><div class="wardrobe-arrow-row"><button class="wardrobe-arrow" data-action="wardrobe-cycle" data-slot="${activeSlot}" data-dir="-1" aria-label="Предыдущий предмет">‹</button><button class="wardrobe-arrow" data-action="wardrobe-cycle" data-slot="${activeSlot}" data-dir="1" aria-label="Следующий предмет">›</button></div><div class="wardrobe-picker-actions">${previewButton}<button class="btn btn-ghost" data-action="wardrobe-reset-preview">Сбросить просмотр</button></div></article><p class="wardrobe-rule-note"><b>Правила слоёв:</b> один предмет на каждый слот. Футболка не заменяет брюки, обувь выбирается отдельно, а куртка или жилет надевается поверх верха. ${!canChange?'Для сохранения образа вернись домой или зайди в магазин одежды.':''}</p></div></div>
      <div class="wardrobe-equipped-row">${CLOTHING_SLOTS.map(slot=>`<span><small>${slot.label}</small><b>${escapeHTML(CLOTHING_BY_ID[equipment[slot.id]]?.name||'—')}</b></span>`).join('')}</div></section>`;
  const outfitCards=looks.map(([id,name,desc,art])=>{
    const isOwned=owned.includes(id); const price=prices[id]||0;
    return `<article class="outfit-option ${(state.player.activeWardrobePreset||LOOK_TO_PRESET[state.player.look]||'casual')===LOOK_TO_PRESET[id]?'selected':''} ${isOwned?'owned':'locked'}"><div class="outfit-art-wrap">${art?`<img src="assets/player/outfits/${art}.png" alt="${escapeHTML(name)}" loading="lazy">`:'<span class="outfit-placeholder">👘</span>'}</div><b>${escapeHTML(name)}</b><small>${escapeHTML(desc)}</small>${isOwned?`<button class="mini-btn" data-action="outfit" data-id="${id}" ${!canChange?'disabled':''}>${(state.player.activeWardrobePreset||LOOK_TO_PRESET[state.player.look]||'casual')===LOOK_TO_PRESET[id]?'Комплект надет':canChange?'Применить комплект':'Доступно дома'}</button>`:`<button class="mini-btn" data-action="buy-outfit" data-id="${id}" ${state.world.location!=='market'?'disabled':''}>Купить · ${price} рё</button>`}</article>`;
  }).join('');
  return `${heading('Инвентарь','Предметы, одежда и мастерская. Выбирай вещи и собирай подходящий комплект для работы, прогулки, тренировки или встречи.')}
    <section class="bag-heading"><div><small>🌸 ЛИЧНЫЕ ВЕЩИ</small><h3>Инвентарь</h3><p>${state.inventory.reduce((sum,item)=>sum+item.qty,0)} предметов в сумке</p></div></section>
    <div class="bag-tabs">${kinds.map(([id,label])=>`<button data-action="bag-filter" data-id="${id}" class="${filter===id?'active':''}">${label}</button>`).join('')}</div>
    <section class="panel-card"><div class="inventory-grid">${filtered.length?filtered.map(item=>`<article class="item-card ${selected?.id===item.id?'selected':''}"><button class="item-select" data-action="select-item" data-id="${item.id}"><img class="item-art" src="${iconFor(item)}" alt="" loading="lazy"><span><strong>${escapeHTML(item.name)}</strong><small>${item.kind==='gift'?'Подарок':item.kind==='food'?'Еда':item.kind==='clothing'?'Одежда':item.kind==='pet'?'Для питомцев':item.kind==='material'?'Материал':'Прочее'}</small></span><b class="quantity">×${item.qty}</b></button><div class="item-tools">${item.kind==='gift'?`<button class="mini-btn" data-action="choose-gift" data-id="${item.id}">🎁 Подарить</button>`:''}${item.kind==='food'&&item.id!=='herbal-tea'?`<button class="mini-btn" data-action="use-food" data-id="${item.id}">Использовать</button>`:''}${item.kind==='pet'?`<button class="mini-btn" data-action="pet-item" data-id="${item.id}">Использовать</button>`:''}${item.id==='field-kit'||item.id==='herbal-tea'?`<button class="mini-btn" data-action="use-crafted-item" data-id="${item.id}">Применить</button>`:''}</div></article>`).join(''):'<div class="empty-state">В этой категории пока пусто.</div>'}</div>
      ${selected?`<section class="item-detail-panel"><div class="item-detail-art"><img src="${iconFor(selected)}" alt=""></div><div class="item-detail-copy"><small>ВЫБРАННЫЙ ПРЕДМЕТ</small><h3>${escapeHTML(selected.name)}</h3><p>${escapeHTML(selected.desc||'Описание пока неизвестно.')}</p><div class="item-detail-meta"><span>Категория: ${escapeHTML(selected.kind)}</span><b>Количество: ${selected.qty}</b></div><div class="item-detail-actions">${selected.kind==='gift'?`<button class="btn btn-primary" data-action="choose-gift" data-id="${selected.id}">Подарить</button>`:''}${selected.kind==='food'&&selected.id!=='herbal-tea'?`<button class="btn btn-primary" data-action="use-food" data-id="${selected.id}">Использовать</button>`:''}${selected.kind==='pet'?`<button class="btn btn-primary" data-action="pet-item" data-id="${selected.id}">Использовать для питомца</button>`:''}${selected.id==='field-kit'||selected.id==='herbal-tea'?`<button class="btn btn-primary" data-action="use-crafted-item" data-id="${selected.id}">Применить</button>`:''}</div></div></section>`:''}
    </section>
    ${wardrobeDesigner}
    <section class="panel-card wardrobe-panel"><div class="card-head"><div><h3>Быстрые комплекты</h3><small>ГОТОВЫЕ СОЧЕТАНИЯ ИЗ ОТКРЫТЫХ ВЕЩЕЙ</small></div><small>ПРЕСЕТЫ</small></div>
      <div class="wardrobe-presets">${['date','work','training','walk'].map((id)=>{const names={date:['На свидание','🌸'],work:['На работу','🧰'],training:['На тренировку','🥋'],walk:['На прогулку','🌿']};return `<button class="wardrobe-preset ${state.player.activeWardrobePreset===id?'active':''}" data-action="wardrobe-preset" data-id="${id}"><span>${names[id][1]}</span><b>${names[id][0]}</b><small>Применить сочетание</small></button>`}).join('')}</div>
      <details class="ready-outfit-details"><summary>Готовые комплекты целиком <small>Старые образы из гардероба</small></summary><div class="outfit-grid">${outfitCards}</div></details><p class="chat-hint">Каждый слот независим: верх, внешний слой, низ, обувь, головной убор и аксессуар. Предметы для примерки можно выбирать стрелками; покупка доступна на рынке.</p></section>
    <section class="panel-card craft-panel"><div class="card-head"><h3>Мастерская</h3><small>${state.world.location==='home'?'ДОМАШНИЙ РАБОЧИЙ СТОЛ':'ДОСТУПНО ТОЛЬКО ДОМА'}</small></div><p class="chat-hint">Комбинируй найденные материалы. Рецепты открыты сразу, но требуют нужных ресурсов.</p><div class="craft-grid">${RECIPES.map(recipe=>`<article class="craft-recipe"><div class="craft-recipe-icon"><img src="${recipe.id==='field-kit'?'assets/ui/pouch.svg':recipe.id==='herbal-tea'?'assets/ui/tea.svg':'assets/ui/generated/gift.png'}" alt=""></div><b>${escapeHTML(recipe.name)}</b><p>${escapeHTML(recipe.desc)}</p><small>Нужно: ${Object.entries(recipe.ingredients).map(([id,qty])=>`${qty}× ${id==='herb'?'трава':id==='paper'?'бумага':id==='tea'?'чай':'цветы'}`).join(' · ')}</small><button class="mini-btn" data-action="craft-item" data-id="${recipe.id}" ${canCraft(state,recipe.id)?'':'disabled'}>Изготовить</button></article>`).join('')}</div></section>
    ${state.world.location==='home'?`<section class="home-storage-grid"><article><b><img class="storage-heading-icon" src="assets/ui/generated/ramen-bowl.png" alt=""> Холодильник</b><p>Запасы еды дома: ${state.inventory.filter(x=>x.kind==='food').reduce((a,x)=>a+x.qty,0)}</p><button class="mini-btn" data-action="home-storage" data-id="fridge">Открыть</button></article><article><b><img class="storage-heading-icon" src="assets/ui/generated/gift-box.png" alt=""> Шкаф</b><p>Купленные наряды: ${(state.player.ownedLooks||[]).length}</p><button class="mini-btn" data-action="home-storage" data-id="wardrobe">Открыть</button></article></section>`:''}`;
}

function renderJobs(state) {
  const active=getJob(state.player.jobId);
  return `${heading('Работа и подработки','Выбирай занятие, приходи в нужное место и бери смену. У каждой работы своя оплата и длительность.')}
    <section class="ref-day-banner" style="--scene:url('assets/backgrounds/market-street.webp')"><div><small>ПОВСЕДНЕВНАЯ ЖИЗНЬ</small><h3>${active?escapeHTML(active.name):'Найди своё дело в Конохе'}</h3><p>${active?`Твоя работа: ${escapeHTML(active.skill)}. Смен сегодня: ${state.player.lastWorkDay===state.world.day?state.player.workShifts||0:0}/2.`:'Небольшая подработка поможет заработать рё и узнать жителей.'}</p></div></section>
    <div class="job-grid">${JOBS.map(job=>{const here=state.world.location===job.place;const selected=state.player.jobId===job.id;return `<article class="panel-card job-card ${selected?'selected':''}"><div class="job-card-head"><span class="job-icon">${job.id==='ramen'?'🍜':job.id==='market'?'🧺':job.id==='flowers'?'🌸':job.id==='library'?'📚':job.id==='clinic'?'🏥':job.id==='courier'?'📜':'🎓'}</span><div><b>${escapeHTML(job.name)}</b><small>${escapeHTML(getLocation(job.place).name)} · ${job.duration} минут</small></div></div><p>${escapeHTML(job.desc)}</p><div class="job-card-footer"><strong>+${job.wage} рё / смена</strong>${here?`<button class="btn btn-primary" data-action="apply-job" data-id="${job.id}">${selected?'Выбрать смену':'Устроиться'}</button>`:`<button class="btn btn-soft" data-action="visit-job" data-id="${job.place}">Отправиться</button>`}</div>${selected&&here?`<button class="btn btn-primary job-shift" data-action="work-shift" data-id="${job.id}" ${(state.player.lastWorkDay===state.world.day&&(state.player.workShifts||0)>=2)?'disabled':''}>Начать смену</button>`:''}</article>`}).join('')}</div>`;
}

function renderLocations(state) {
  const current=getLocation(state.world.location);
  return `${heading('Локации','Каждое место имеет собственный фон, занятия и жителей. Некоторые места могут требовать приглашения.')}
    <section class="locations-heading"><span>🌸</span><div><small>МИР КОНОХИ</small><h3>Локации</h3><p>Текущее место: ${escapeHTML(current.name)}</p></div></section>
    <div class="ref-location-grid">${LOCATIONS.filter(location=>!location.hidden || state.discoveredLocations?.includes(location.id)).map(location=>`<button class="ref-location-tile ${location.id===current.id?'current':''} ${!getLocationAccess(state,location.id).allowed?'locked':''}" data-action="travel" data-id="${location.id}" ${!getLocationAccess(state,location.id).allowed?'disabled':''}><span class="ref-tile-image" style="background-image:url('${location.bg}')"></span><span class="ref-tile-body"><b>${location.icon} ${escapeHTML(location.name)}</b><small>${escapeHTML(location.area)}</small><em>${escapeHTML(location.desc)}</em><i class="travel-stamp">${location.id===current.id?'Ты здесь':getLocationAccess(state,location.id).allowed?'Открыть место ↗':`🔒 ${getLocationAccess(state,location.id).reason}`}</i></span></button>`).join('')}</div>`;
}

function renderGallery(state) {
  const gallery=state.gallerySeen||{};
  const people=gallery.characters||{};
  const met=new Set([...(state.metCharacters||[]),...Object.keys(people)]);
  const roster=CHARACTERS.filter(character=>state.unlocked.includes(character.id));
  const backgrounds=[...(gallery.backgrounds||[])];
  const allArts=roster.flatMap(character=>getUnlockedCharacterArts(state,character).map((art,index)=>{ const seen=people[character.id]||[]; return {character,src:art.src,seen:seen.includes(art.src),label:art.label||`Образ ${index+1}`,index}; }));
  return `${heading('Галерея','Портреты и дополнительные образы открываются по мере знакомства, встреч и укрепления доверия.')}
    <section class="gallery-section"><div class="gallery-section-title"><span>🌸</span><div><small>ПЕРСОНАЖИ И ОБРАЗЫ</small><h3>Галерея героинь · ${roster.length}</h3><small>Открытых образов: ${allArts.length}</small></div></div>
      <div class="gallery-grid">${allArts.map(entry=>`<button class="gallery-tile ${entry.seen?'':'gallery-unseen'}" data-action="view-art" data-src="${escapeHTML(entry.src||'')}"><img src="${escapeHTML(entry.src||'')}" alt="" loading="lazy"><span><b>${escapeHTML(entry.character.name)}</b><small>${escapeHTML(entry.label)} · ${entry.seen?'Открыто в RP':'Просмотр галереи'}</small></span></button>`).join('')}</div><p class="gallery-unlock-note">Следующие варианты внешности появляются после новых встреч и роста доверия. В галерею попадают только доступные образы.</p></section>
    <section class="gallery-section"><div class="gallery-section-title"><span>🏞️</span><div><small>ИСТОРИЯ ПУТЕШЕСТВИЙ</small><h3>Увиденные сцены · ${backgrounds.length}</h3></div></div><div class="gallery-backgrounds">${backgrounds.map(src=>`<button data-action="view-art" data-src="${escapeHTML(src)}"><img src="${escapeHTML(src)}" alt="Увиденная локация" loading="lazy"></button>`).join('')||'<div class="empty-state">Посещай новые места, чтобы сохранить их фоны в галерее.</div>'}</div></section>
    <section class="gallery-section"><div class="gallery-section-title"><span>✦</span><div><small>ОТКРЫТЫЕ ИЗОБРАЖЕНИЯ</small><h3>Встреченные арты · ${Object.values(people).reduce((sum,items)=>sum+(items||[]).length,0)}</h3></div></div><div class="gallery-grid">${Object.entries(people).flatMap(([id,paths])=>(paths||[]).map(src=>({character:getCharacter(id),src}))).filter(entry=>entry.character).map(entry=>`<button class="gallery-tile" data-action="view-art" data-src="${escapeHTML(entry.src)}"><img src="${escapeHTML(entry.src)}" alt="" loading="lazy"><span><b>${escapeHTML(entry.character.name)}</b><small>Открыть арт</small></span></button>`).join('')||'<div class="empty-state">Пока не открыто дополнительных изображений. Исследуй локации и встречай героинь.</div>'}</div></section>`;
}
function renderHelp() {
  return `${heading('Помощь','Кратко о том, как устроена игра и как писать команды.')}
    <section class="help-banner panel-card"><img src="assets/ui/generated/help.png" alt=""><div><b>Подсказка Конохи</b><small>Можно писать действия своими словами — игровой мастер разберёт намерение и проверит условия.</small></div><img class="help-banner-question" src="assets/ui/generated/question.png" alt=""></section>
    <section class="help-grid"><article class="panel-card"><h3>Свободные действия</h3><p>Пиши обычным текстом: «иду в цветочную лавку», «осматриваю комнату», «покупаю чай», «жду Аяме у входа». Игровой мастер проверит место, время и доступность действия.</p></article><article class="panel-card"><h3>Диалоги</h3><p>Для личной беседы персонаж должен находиться рядом. Напиши свою реплику вручную. Первое знакомство сдержанное; имя запоминается после представления.</p></article><article class="panel-card"><h3>Герои и галерея</h3><p>В разделе «Герои» показываются только те, с кем уже было личное взаимодействие. Изображения попадают в галерею после появления в RP.</p></article><article class="panel-card"><h3>Задания и обещания</h3><p>Задания могут появиться после разговора или твоего собственного плана. Награда указывается только если персонаж её назвал. Обещания можно отменять.</p></article><article class="panel-card"><h3>Карта и перемещения</h3><p>Переходы занимают игровое время. Резкий уход с договорённой встречи может быть замечен и повлиять на доверие.</p></article><article class="panel-card"><h3>Сохранение</h3><p>Прогресс сохраняется в этом браузере. На другом устройстве используй экспорт и импорт сохранения в настройках.</p></article></section>`;
}

function renderAchievements(state) {
  const unlocked = state.achievements?.unlocked || [];
  const unlockedIds = new Set(unlocked.map(item=>item.id));
  const points = state.achievements?.points || 0;
  const rows = ACHIEVEMENTS.map(item=>{
    const done=unlockedIds.has(item.id);
    const progress=getAchievementProgress(item,state);
    const hidden=item.hidden && !done;
    const title=hidden?'Секретное достижение':item.title;
    const desc=hidden?'Условия открытия неизвестны.':item.desc;
    const medalColor = ({'История':'gold','Исследование':'blue','Общение':'pink','Команда':'red','Повседневность':'silver','Развитие':'gold','Коллекция':'blue','Секреты':'red'})[item.group] || 'silver';
    return `<article class="achievement-card ${done?'is-unlocked':''} ${hidden?'is-hidden':''}">
      <div class="achievement-icon"><img class="achievement-medal-art" src="assets/ui/achievement/medal-${medalColor}.webp" alt="${escapeHTML(item.group)}"><span>${hidden?'?':item.icon}</span></div>
      <div class="achievement-body"><div class="achievement-topline"><b>${escapeHTML(title)}</b><span>${done?`+${item.points} оч.`:`${item.points} оч.`}</span></div><p>${escapeHTML(desc)}</p>
      ${done?`<small class="achievement-state">Получено · день ${unlocked.find(x=>x.id===item.id)?.day||1}</small>`:hidden?'<small class="achievement-state">Скрыто</small>':`<div class="achievement-progress"><i style="width:${progress.percent}%"></i></div><small class="achievement-state">${progress.value} / ${progress.target}</small>`}</div>
      <span class="achievement-check">${done?'✓':hidden?'✦':'◌'}</span></article>`;
  }).join('');
  return `${heading('Достижения','Трофеи за исследования, знакомства, мастерство и секреты Конохи. Некоторые условия скрыты — открывай их сам.')}
    <section class="achievement-summary panel-card"><div><small>ОТКРЫТО</small><strong>${unlocked.length} / ${ACHIEVEMENTS.length}</strong></div><div><small>ОЧКИ ДОСТИЖЕНИЙ</small><strong>${points}</strong></div><div><small>СЕКРЕТНЫЕ</small><strong>${ACHIEVEMENTS.filter(x=>x.hidden&&unlockedIds.has(x.id)).length} / ${ACHIEVEMENTS.filter(x=>x.hidden).length}</strong></div></section>
    <section class="achievement-grid">${rows}</section>`;
}

function renderMagazine(state) {
  const collection=state.collectibles||{magazineFound:false,unlockedIssues:[],readPages:[]};
  const unlocked=new Set(collection.unlockedIssues||[]);
  const read=new Set(collection.readPages||[]);
  const issues=MAGAZINE_ISSUES.filter(issue=>unlocked.has(issue.id));
  const pages=issues.flatMap(issue=>issue.pages.map(page=>({issue,page})));
  return `${heading('Листья и истории','Тайный коллекционный альманах о людях, местах и маленьких открытиях Конохи.')}
    <section class="magazine-masthead"><div class="magazine-cover-scene" style="background-image:linear-gradient(90deg,rgba(19,14,26,.15),rgba(19,14,26,.84)),url('${issues[issues.length-1]?.cover||'assets/backgrounds/library.webp'}')"><div class="magazine-cover-mark"><small>ЧАСТНОЕ ИЗДАНИЕ · КОНОХА</small><strong>ЛИСТЬЯ</strong><span>ИСТОРИИ ИЗ ЖИЗНИ ДЕРЕВНИ</span></div></div><div class="magazine-info"><div class="eyebrow">КОЛЛЕКЦИЯ · ${issues.length} / ${MAGAZINE_ISSUES.length} ВЫПУСКА</div><h3>Найденное не всегда лежит на виду</h3><p>Старые заметки, интервью, маршруты и ремесленные советы. Новые выпуски появляются в разных уголках деревни.</p><div class="magazine-progress"><i style="width:${Math.round(issues.length/MAGAZINE_ISSUES.length*100)}%"></i></div><small>${read.size} страниц прочитано</small></div></section>
    ${issues.length?issues.map(issue=>`<section class="magazine-issue"><div class="magazine-issue-head"><div><small>ВЫПУСК № ${issue.number}</small><h3>${escapeHTML(issue.title)}</h3><p>${escapeHTML(issue.subtitle)}</p></div><div class="magazine-issue-cover" style="background-image:url('${issue.cover}')"></div></div><div class="magazine-pages">${issue.pages.map(page=>{const isRead=read.has(page.id);return `<article class="magazine-page ${isRead?'page-read':''}"><div class="magazine-page-image" style="background-image:url('${page.image}')"></div><div class="magazine-page-copy"><small>${escapeHTML(page.author)}</small><h4>${escapeHTML(page.title)}</h4><p>${escapeHTML(page.text)}</p><button class="btn ${isRead?'btn-soft':'btn-primary'}" data-action="read-magazine" data-id="${page.id}" ${isRead?'disabled':''}>${isRead?'✓ Прочитано':'Прочитать страницу'}</button></div></article>`}).join('')}</div></section>`).join(''):'<section class="panel-card empty-state">Альманах ещё не найден. В библиотеке Конохи стоит внимательнее осмотреть старые стеллажи.</section>'}
    <section class="panel-card magazine-clue"><b>Подсказка к следующему выпуску</b><p>${issues.length===0?'Ищи старую книжную полку в библиотеке.':issues.length===1?'Второй выпуск связан с архивом свитков.':'Следующая запись могла остаться в чайном домике.'}</p><button class="btn btn-soft" data-view="map">Открыть карту Конохи</button></section>`;
}

export function renderView(state) {
  switch (state.ui.view) {
    case 'map': return renderMap(state);
    case 'people': return renderPeople(state);
    case 'profile': {
      const character = getCharacter(state.ui.targetId);
      return character && state.unlocked.includes(character.id) ? renderPersonDetail(state,character) : renderPeople(state);
    }
    case 'conversation': {
      const character = getCharacter(state.ui.targetId);
      return character && state.unlocked.includes(character.id) ? renderConversation(state,character) : renderPeople(state);
    }
    case 'scroll': return renderScroll(state);
    case 'bag': return renderBag(state);
    case 'day': return renderDay(state);
    case 'phone': return renderPhone(state);
    case 'pets': return renderPets(state);
    case 'work': return renderJobs(state);
    case 'settings': return renderSettingsPage(state);
    case 'locations': return renderLocations(state);
    case 'gallery': return renderGallery(state);
    case 'achievements': return renderAchievements(state);
    case 'magazine': return state.collectibles?.magazineFound ? renderMagazine(state) : renderLocations(state);
    case 'help': return renderHelp(state);
    case 'world':
    default: return renderWorld(state);
  }
}

export function renderStatus(state) {
  const weather = getWeather(state);
  const stats = state.player.stats;
  const statLine = (label,value) => `<div class="stat-row"><span>${label}</span><b>${value}</b><div class="stat-track"><i class="stat-fill" style="width:${Math.max(0,Math.min(100,value))}%"></i></div></div>`;
  const status = `${weather.icon} ${weather.label} · ${seasonLabel(state)} · День ${state.world.day}`;
  document.getElementById('clock-pill').innerHTML = `<span class="clock-symbol">◷</span>${timePeriod(state.world.minute)} · ${clockLabel(state.world.minute)}`;
  document.getElementById('weather-pill').innerHTML = `${weather.id==='sunny'?'<img class="status-icon" src="assets/ui/cropped/sun.png" alt="">':`<span class="weather-emoji">${weather.icon}</span>`}${weather.label} · ${seasonLabel(state)} · День ${state.world.day}`;
  const topCoins = document.getElementById('top-coins');
  if (topCoins) topCoins.textContent = String(stats.coins);
  const topHp=document.getElementById('top-hp'); if(topHp) topHp.textContent=`♥ ${stats.hp??100} HP`;
  document.getElementById('mobile-status').innerHTML = `<span class="status-pill"><span class="clock-symbol">◷</span>${clockLabel(state.world.minute)}</span><span class="status-pill">${status}</span><span class="status-pill">♥ ${stats.hp??100} HP</span><span class="status-pill"><img class="status-icon" src="assets/ui/generated/coin.png" alt="">${stats.coins} рё</span>`;
  document.getElementById('player-name-label').textContent = state.player.name;
  document.getElementById('player-origin-label').textContent = `${state.player.originName}${state.player.clan && state.player.clan!=='none' ? ` · ${state.player.clan}` : ''}`;
  const playerAvatar=document.getElementById('player-avatar');
  if(playerAvatar){playerAvatar.innerHTML=renderPlayerAvatarStack(state.player);playerAvatar.classList.add('has-player-art');}
  document.getElementById('player-stats').innerHTML = statLine('Выносливость',stats.stamina)+statLine('Чакра',stats.chakra)+statLine('Внимание',stats.focus)+`<div class="stat-row"><span>Репутация</span><b>${stats.renown}</b></div><div class="stat-row"><span>Рё</span><b>¥${stats.coins}</b></div>`;
  const place = getLocation(state.world.location);
  document.getElementById('current-place').innerHTML = `<span class="pin"><img src="assets/ui/cropped/location.png" alt="">${place.icon}</span><b>${place.name}</b><small>${place.area}</small>`;
  const activeView = ['profile','conversation'].includes(state.ui.view) ? 'people' : state.ui.view;
  document.querySelectorAll('[data-view="magazine"]').forEach(button=>{button.hidden=!state.collectibles?.magazineFound;});
  document.querySelectorAll('.nav-item,.side-nav-item').forEach(button=>button.classList.toggle('active',button.dataset.view===activeView));
}

export function populateOrigins() {
  const select = document.getElementById('player-origin');
  select.innerHTML = ORIGINS.map(origin=>`<option value="${origin.id}">${origin.name}</option>`).join('');
  updateOriginNote();
}

export function updateOriginNote() {
  const selected = document.getElementById('player-origin')?.value;
  const origin = ORIGINS.find(item=>item.id===selected) || ORIGINS[0];
  const note = document.getElementById('origin-note');
  if (note) note.textContent = origin.note;
}

export function renderSettings(state) {
  const s = state.settings;
  document.getElementById('modal-root').innerHTML = `<div class="modal-backdrop"><section class="modal-card settings-modal"><div class="modal-head"><div><div class="eyebrow">ПАРАМЕТРЫ</div><h3>Настройки игры</h3></div><button class="close-button" data-action="close-modal" aria-label="Закрыть">×</button></div>
    <label class="setting-row"><span>Автосохранение</span><input class="switch" type="checkbox" data-setting="autosave" ${s.autosave?'checked':''}></label>
    <label class="setting-row"><span>Анимации интерфейса</span><input class="switch" type="checkbox" data-setting="animations" ${s.animations?'checked':''}></label>
    <label class="setting-row"><span>Размер текста</span><select class="small-select" data-setting="textSize"><option value="normal" ${s.textSize==='normal'?'selected':''}>Обычный</option><option value="large" ${s.textSize==='large'?'selected':''}>Крупный</option></select></label>
    <label class="setting-row"><span>Контраст</span><select class="small-select" data-setting="contrast"><option value="normal" ${s.contrast==='normal'?'selected':''}>Обычный</option><option value="high" ${s.contrast==='high'?'selected':''}>Повышенный</option></select></label>
    <div class="music-note"><b>Музыка из библиотеки</b><br>Japanese-style ambient — инструментальная композиция на Pixabay. Музыка открывается на странице автора, игра не загружает MP3 в репозиторий.<br><a class="external-link" href="https://pixabay.com/music/ambient-japanese-style-ambient-475587/" target="_blank" rel="noopener">Слушать на Pixabay ↗</a></div>
    <div class="settings-actions"><button class="btn btn-soft" data-action="save-now">Сохранить сейчас</button><button class="btn btn-soft" data-action="export-save">Экспорт сохранения</button><button class="btn btn-soft" data-action="import-save">Импорт сохранения</button><input id="import-file" type="file" accept="application/json,.json" hidden><button class="btn btn-ghost" data-action="reset-save">Удалить сохранение</button><button class="btn btn-ghost" data-action="close-modal">Закрыть</button></div>
    </section></div>`;
  document.getElementById('app').dataset.textSize = s.textSize;
  document.getElementById('app').dataset.contrast = s.contrast;
  document.getElementById('app').dataset.motion = s.animations ? 'on' : 'off';
}
