import {CHARACTERS,getCharacter,initials} from '../data/characters.js';
import {LOCATIONS,ORIGINS,getLocation,WEATHER,SEASONS} from '../data/world.js';
import {getBond} from '../core/store.js';
import {clockLabel,timePeriod,getWeather,seasonLabel,getNpcLocation} from '../core/life.js';
import {PETS} from '../data/pets.js';
import {getEnemy} from '../data/enemies.js';

export const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g,char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

function heading(title,subtitle) {
  return `<div class="page-heading"><div class="eyebrow">ХРОНИКИ КОНОХИ</div><h2>${title}</h2><p class="muted">${subtitle}</p></div>`;
}

function avatar(character,large=false) {
  const portrait = character.art?.[0]?.src;
  return `<div class="person-avatar ${large?'large':''}" style="--av1:${character.colors[0]};--av2:${character.colors[1]}">${portrait?`<img src="${portrait}" alt="" loading="lazy"><span class="avatar-fallback">${character.icon}</span>`:character.icon}</div>`;
}

function renderWorld(state) {
  const place = getLocation(state.world.location);
  const weather = getWeather(state);
  const hour = Math.floor(state.world.minute/60);
  const isNight = hour >= 19 || hour < 5;
  const sceneImage = weather.id === 'rain' && place.rainBg ? place.rainBg : isNight && place.nightBg ? place.nightBg : place.bg;
  const available = CHARACTERS.filter(character => state.unlocked.includes(character.id));
  const peopleHere = available.filter(character => getNpcLocation(state,character.id) === place.id);
  // Scheduler guarantees at most one character in each location.
  const featured = peopleHere[0] || null;
  if (state.ui.sceneCharacterId && !peopleHere.some(item=>item.id===state.ui.sceneCharacterId)) state.ui.sceneCharacterId = featured?.id || '';
  if (featured && !state.ui.sceneCharacterId) state.ui.sceneCharacterId = featured.id;
  const bond = featured ? getBond(state,featured.id) : {friendship:0,trust:0,respect:0,stage:'Тихая локация',meetings:0};
  const stats = state.player.stats;
  const lastResult = state.ui.lastActionResult || `Ты находишься в месте «${place.name}». ${place.desc} Напиши действие или реплику — игровой мастер разберёт твой текст.`;
  const quickPlaces = ['ichiraku','flower-shop','market','training','hospital','river'].map(id=>LOCATIONS.find(item=>item.id===id)).filter(Boolean);
  const ambientPet = state.pets?.[0];
  const dangerMap = {forest:'forest-ambusher',gate:'road-rogue',campsite:'masked-scout'};
  const enemyId = dangerMap[place.id] || '';
  const enemyVisible = Boolean(enemyId && ((state.world.day * 13 + state.world.actions * 7 + state.world.minute) % 4 === 1));
  const ambientEnemy = enemyVisible ? getEnemy(enemyId) : null;
  return `${heading('Хроники Конохи','Твоя история продолжается в реальном времени игрового мира.')}
    <section class="rp-scene" style="--scene:url('${sceneImage || 'assets/backgrounds/konoha-main.webp'}')">
      <div class="rp-scene-vignette"></div>
      <div class="rp-scene-hud"><span class="rp-chip"><img src="assets/ui/cropped/location.png" alt="">${escapeHTML(place.name)}</span><span class="rp-chip">${weather.icon} ${weather.label} · ${seasonLabel(state)} · ${clockLabel(state.world.minute)}</span><span class="rp-chip">День ${state.world.day}</span></div>
      ${featured?`<button class="rp-character" data-action="open-person" data-id="${featured.id}" aria-label="Открыть профиль ${escapeHTML(featured.name)}"><img src="${featured.art[0].src}" alt="${escapeHTML(featured.name)}" loading="eager"><span class="rp-character-label"><b>${escapeHTML(featured.name)}</b><small>${escapeHTML(featured.role)}</small><i>Дружба ${Math.max(bond.friendship,bond.trust,bond.respect)}/100</i></span></button>`:''}
      ${ambientPet?`<div class="rp-pet-peek" title="${escapeHTML(ambientPet.name)}">${ambientPet.icon||'🐾'}</div>`:''}
      ${ambientEnemy?`<button class="rp-enemy" data-action="scene-patrol" data-id="${ambientEnemy.id}" aria-label="Встреча: ${escapeHTML(ambientEnemy.name)}"><img src="${ambientEnemy.image}" alt=""><span><b>${escapeHTML(ambientEnemy.name)}</b><small>Замечена опасность · проверить</small></span></button>`:''}
      <div class="rp-scene-caption"><small>СЕЙЧАС В КОНОХЕ</small><h3>${escapeHTML(place.name)}</h3><p>${escapeHTML(place.desc)}</p><div class="rp-scene-actions"><button class="btn btn-primary" data-view="map">Карта</button><button class="btn btn-soft" data-action="patrol">Патруль</button><button class="btn btn-ghost" data-action="skip-time" data-hours="1">+1 час</button></div></div>
      <div class="rp-scene-foot"><span>${featured?`Рядом: ${escapeHTML(featured.name)}`:'Пока никого рядом нет — жители заняты своими делами.'}</span><span><img src="assets/ui/cropped/coin.png" alt=""> ${stats.coins} рё</span></div>
    </section>
    <div class="rp-writing-grid">
      <section class="panel-card rp-write-card"><div class="ref-section-title"><span class="ref-section-icon"><img src="assets/ui/cropped/location.png" alt=""></span><div><small>СВОБОДНОЕ ДЕЙСТВИЕ</small><h3>Что делаешь?</h3></div></div>
        <form id="world-action-form" class="vn-input-form rp-input-form"><textarea name="action" rows="3" maxlength="700" placeholder="Напиши своими словами: иду на рынок, ищу Сакуру, покупаю чай, осматриваю лавку…" required>${escapeHTML(state.ui.lastActionText || '')}</textarea><div class="ref-form-footer"><small>Пиши вручную. Можно описать несколько действий подряд.</small><button class="btn btn-primary" type="submit">Выполнить ↗</button></div></form>
      </section>
      <section class="panel-card rp-write-card"><div class="ref-section-title"><span class="ref-section-icon"><img src="assets/ui/cropped/chat.png" alt=""></span><div><small>СВОБОДНЫЙ ДИАЛОГ</small><h3>Что скажешь?</h3></div></div>
        <form id="world-dialogue-form" class="vn-input-form rp-input-form"><label class="vn-select-label" for="world-dialogue-target">С кем говоришь?</label>${peopleHere.length?`<select id="world-dialogue-target" name="characterId">${peopleHere.map(character=>`<option value="${character.id}" ${featured?.id===character.id?'selected':''}>${escapeHTML(character.name)}</option>`).join('')}</select><textarea name="message" rows="3" maxlength="700" placeholder="Напиши реплику полностью своими словами…" required></textarea><div class="ref-form-footer"><small>Только твоя реплика, без готовых ответов.</small><button class="btn btn-soft" type="submit">Отправить ➤</button></div>`:`<p class="chat-hint">В этой локации сейчас никого нет. Посмотри карту или напиши знакомым через смартфон.</p><button class="btn btn-soft" type="button" data-view="phone">Открыть смартфон</button>`}</form>
      </section>
    </div>
    <section class="ref-narrator panel-card"><div class="ref-narrator-mark">GM</div><div><small>ЛОКАЛЬНЫЙ ИГРОВОЙ МАСТЕР</small><p>${escapeHTML(lastResult)}</p></div></section>
    <section class="ref-quick-locations"><div class="ref-section-heading"><div><small>МИР ВОКРУГ</small><h3>Куда направиться?</h3></div><button class="text-link" data-view="map">Все места ↗</button></div><div class="ref-location-strip">${quickPlaces.map(item=>`<button class="ref-location-card ${item.id===place.id?'current':''}" data-action="travel" data-id="${item.id}" style="--tile:url('${item.bg}')"><span>${item.icon}</span><b>${escapeHTML(item.name)}</b></button>`).join('')}</div></section>
    <section class="ref-history panel-card"><div class="ref-section-heading"><div><small>ХРОНИКА</small><h3>Последние события</h3></div><button class="text-link" data-view="day">Распорядок ↗</button></div>${state.feed.slice(0,3).map(line=>`<p class="ref-history-line">${escapeHTML(line)}</p>`).join('')}</section>`;
}

function renderMap(state) {
  const place = getLocation(state.world.location);
  return `${heading('Карта Конохи','Выбирай направление и отправляйся в любую открытую локацию. Переход занимает игровое время.')}
    <section class="ref-map-banner" style="--scene:url('assets/backgrounds/konoha-main.webp')"><div><small>КАРТА ДЕРЕВНИ</small><h3>Листья скрывают множество историй</h3><p>Сейчас ты находишься: <b>${escapeHTML(place.name)}</b></p></div></section>
    <div class="ref-location-grid">${LOCATIONS.map(location=>`<button class="ref-location-tile ${location.id===place.id?'current':''}" data-action="travel" data-id="${location.id}"><span class="ref-tile-image" style="background-image:url('${location.bg}')"></span><span class="ref-tile-body"><b>${location.icon} ${escapeHTML(location.name)}</b><small>${escapeHTML(location.area)}</small><em>${escapeHTML(location.desc)}</em>${location.id===place.id?'<i class="current-stamp">ТЫ ЗДЕСЬ</i>':'<i class="travel-stamp">Перейти ↗</i>'}</span></button>`).join('')}</div>`;
}

function renderDay(state) {
  const available = CHARACTERS.filter(character=>state.unlocked.includes(character.id));
  const assignments = state.assignments.filter(item=>item.day===state.world.day);
  const taskOptions = [['cook','Приготовить еду'],['tidy','Уборка дома'],['shop','Покупки на рынке'],['study','Учёба и чтение'],['train','Тренировка'],['garden','Уход за садом'],['clinic','Помощь в больнице'],['rest','Отдых']];
  return `${heading('Распорядок дня','Решай, чем займёшься сам и кому поручишь бытовые дела. Запланированное не обязательно выполнять.')}
    <section class="ref-day-banner" style="--scene:url('assets/backgrounds/tatami-home.webp')"><div><small>ДЕНЬ ${state.world.day} · ${seasonLabel(state)}</small><h3>У каждого найдётся своё занятие</h3><p>Планы можно менять в течение дня — никто не обязан выполнять каждое поручение.</p></div></section>
    <section class="panel-card ref-day-form-card"><div class="ref-section-title"><span class="ref-section-icon"><img src="assets/ui/cropped/home.png" alt=""></span><div><small>НОВОЕ ЗАНЯТИЕ</small><h3>Распределить дела</h3></div></div><form id="assignment-form" class="assignment-form"><label>Кто займётся?<select name="actor"><option value="player">${escapeHTML(state.player.name)}</option>${available.map(character=>`<option value="${character.id}">${escapeHTML(character.name)}</option>`).join('')}</select></label><label>Чем займётся?<select name="task">${taskOptions.map(([id,label])=>`<option value="${id}">${label}</option>`).join('')}</select></label><button class="btn btn-primary" type="submit">Назначить дело</button></form></section>
    <section class="ref-plan-grid">${assignments.length?assignments.map(item=>`<article class="ref-plan-card"><span class="ref-plan-icon">${item.done?'✓':'✦'}</span><div><b>${escapeHTML(item.actorName)}</b><small>${escapeHTML(taskOptions.find(([id])=>id===item.task)?.[1]||item.task)}</small></div><em class="${item.done?'done':''}">${item.done?'Выполнено':'Запланировано'}</em></article>`).join(''):'<div class="empty-state">На сегодня пока нет планов. Назначь занятие себе или кому-нибудь из знакомых.</div>'}</section>
    <section class="panel-card"><div class="card-head"><h3>Персональный распорядок жителей</h3><small>${timePeriod(state.world.minute).toUpperCase()} · МАРШРУТЫ ОБНОВЛЯЮТСЯ</small></div><div class="npc-schedule-grid">${available.filter(character=>getNpcLocation(state,character.id)).map(character=>{const placeId=getNpcLocation(state,character.id);const placeName=getLocation(placeId).name;const plan=state.assignments.find(item=>item.actorId===character.id && item.day===state.world.day && !item.done);const routine=plan?({cook:'помогает с приготовлением еды',tidy:'занята домашними делами',shop:'закупает необходимые вещи',study:'занимается учёбой',train:'тренируется',garden:'ухаживает за растениями',clinic:'помогает медикам',rest:'отдыхает'})[plan.task]:(character.likes[(state.world.day+state.world.minute+character.id.length)%character.likes.length]||'занята своими делами');return `<article class="npc-schedule-item">${avatar(character)}<div><b>${escapeHTML(character.name)}</b><small>Сейчас: ${escapeHTML(placeName)}</small><em>${escapeHTML(routine)}</em>${plan?'<small>Есть назначенное дело</small>':''}</div></article>`}).join('')}</div><p class="chat-hint">В каждой локации одновременно может находиться только один персонаж. Маршруты меняются утром, днём, вечером и ночью в зависимости от характера и интересов.</p></section>`;
}

function renderSettingsPage(state) {
  const s=state.settings;
  return `${heading('Настройки','Подстрой игру под себя, управляй сохранениями и внешним видом интерфейса.')}
    <section class="panel-card ref-settings-card"><div class="ref-section-title"><span class="ref-section-icon"><img src="assets/ui/cropped/settings.png" alt=""></span><div><small>ОБЩИЕ ПАРАМЕТРЫ</small><h3>Игровой процесс</h3></div></div>
      <label class="setting-row"><span><b>Автосохранение</b><small>Записывать прогресс после действий</small></span><input class="switch" type="checkbox" data-setting="autosave" ${s.autosave?'checked':''}></label>
      <label class="setting-row"><span><b>Анимации интерфейса</b><small>Плавные переходы и подсветка</small></span><input class="switch" type="checkbox" data-setting="animations" ${s.animations?'checked':''}></label>
      <label class="setting-row"><span><b>Размер текста</b><small>Удобство чтения на телефоне</small></span><select class="small-select" data-setting="textSize"><option value="normal" ${s.textSize==='normal'?'selected':''}>Обычный</option><option value="large" ${s.textSize==='large'?'selected':''}>Крупный</option></select></label>
      <label class="setting-row"><span><b>Контраст</b><small>Выделение текста и элементов</small></span><select class="small-select" data-setting="contrast"><option value="normal" ${s.contrast==='normal'?'selected':''}>Обычный</option><option value="high" ${s.contrast==='high'?'selected':''}>Повышенный</option></select></label>
      <div class="ref-music-panel"><b>Музыка из библиотеки</b><p>Японская атмосферная инструментальная композиция, открывается на странице библиотеки.</p><a href="https://pixabay.com/music/ambient-japanese-style-ambient-475587/" target="_blank" rel="noopener">Открыть Pixabay ↗</a></div>
      <div class="ref-save-actions"><button class="btn btn-soft" data-action="save-now">Сохранить сейчас</button><button class="btn btn-soft" data-action="export-save">Экспортировать прогресс</button><button class="btn btn-soft" data-action="import-save">Импортировать прогресс</button><input id="import-file" type="file" accept="application/json,.json" hidden><button class="btn btn-ghost" data-action="reset-save">Сбросить сохранение</button></div>
    </section>`;
}

function renderPersonCard(state,character) {
  const bond = getBond(state,character.id);
  const value = Math.max(bond.friendship,bond.trust,bond.respect);
  const portrait = character.art?.[0]?.src || '';
  return `<button class="person-card ref-person-card" data-action="open-person" data-id="${character.id}"><span class="ref-card-portrait"><img src="${portrait}" alt="${escapeHTML(character.name)}" loading="lazy"><i>${escapeHTML(character.role)}</i></span><span class="ref-card-copy"><strong>${escapeHTML(character.name)}</strong><small>${escapeHTML(character.personality)}</small><span class="bond-line"><span>${escapeHTML(bond.stage)}</span><b>${value}/100</b></span><span class="bond-track"><i style="width:${value}%"></i></span></span></button>`;
}

function renderPeople(state) {
  const available = CHARACTERS.filter(item => state.unlocked.includes(item.id));
  const secretOpen = state.unlocked.includes('haku');
  return `${heading('Жители и союзники','У каждого свой характер, распорядок, интересы и память о ваших встречах.')}
    <div class="people-toolbar"><span>${available.length} знакомых персонажей</span><span>Связи развиваются через поступки и разговоры</span></div>
    <div class="people-grid">${available.map(item=>renderPersonCard(state,item)).join('')}
      ${!secretOpen?`<button class="person-card secret-card" data-action="secret-hint"><div class="person-top"><div class="person-avatar secret-avatar">?</div><div><strong>Неизвестный гость</strong><small>Секретная встреча</small></div></div><p class="person-desc">В старом лесу иногда видят незнакомого путешественника. Следы чаще появляются зимой.</p><div class="bond-line"><span>Загадка</span><b>???</b></div></button>`:''}
    </div>`;
}

function renderPersonDetail(state,character) {
  const bond = getBond(state,character.id);
  const history = state.dialogues[character.id] || [];
  const messages = history.length ? history : [{from:'npc',text:character.intro}];
  const lastMemories = state.memories[character.id] || [];
  const value = Math.max(bond.friendship,bond.trust,bond.respect);
  return `${heading('Персонаж',`Личная история с ${character.name}. Диалоги сохраняются в этом браузере.`)}
    <div class="person-detail">
      <div><section class="profile-banner">${avatar(character,true)}<div><div class="eyebrow">${character.role}</div><h3>${character.name}</h3><p>${character.personality}</p><div class="trait-tags">${character.likes.map(like=>`<span class="tag">${like}</span>`).join('')}</div></div></section>
        <section class="panel-card character-art-panel"><div class="card-head"><h3>Галерея образов</h3><small>${character.art.length===3?'3 ОБРАЗА':'ПОРТРЕТ'}</small></div><div class="character-art-grid">${character.art.map(art=>`<figure class="character-art"><img src="${art.src}" alt="${character.name} — ${art.label}" loading="lazy"><figcaption>${art.label}</figcaption></figure>`).join('')}</div></section>
        <section class="panel-card chat-card"><div class="card-head"><h3>Свободный разговор</h3><small>ЛОКАЛЬНЫЙ ИГРОВОЙ МАСТЕР</small></div><div class="chat-log" id="chat-log">${messages.map(message=>`<div class="chat-bubble ${message.from==='player'?'player':'npc'}"><span class="chat-meta">${message.from==='player'?escapeHTML(state.player.name):character.name}</span>${escapeHTML(message.text)}</div>`).join('')}</div>
          <form id="chat-form" class="chat-form"><input type="hidden" name="characterId" value="${character.id}"><textarea name="message" class="chat-input" rows="2" maxlength="500" placeholder="Напиши, что говоришь или делаешь…" required></textarea><button class="send-button" type="submit" aria-label="Отправить">➤</button></form><p class="chat-hint">Игровой мастер учитывает смысл фразы, характер собеседника, погоду, время и предыдущие встречи. Работает без API и интернета.</p></section>
      </div>
      <aside class="panel-card bond-panel"><div class="card-head"><h3>Ваша связь</h3><small>${bond.meetings} встреч</small></div><div class="bond-status">${bond.stage}</div><div class="bond-stat"><span>Дружба</span><b>${bond.friendship}/100</b><div class="bond-track"><i style="width:${bond.friendship}%"></i></div></div><div class="bond-stat"><span>Доверие</span><b>${bond.trust}/100</b><div class="bond-track"><i style="width:${bond.trust}%"></i></div></div><div class="bond-stat"><span>Уважение</span><b>${bond.respect}/100</b><div class="bond-track"><i style="width:${bond.respect}%"></i></div></div>
        <div class="side-actions"><p class="chat-hint">Все действия и реплики вводятся вручную. Напиши, что хочешь сказать или сделать, в поле разговора.</p><button class="btn btn-ghost" data-action="back-people"><img class="button-icon" src="assets/ui/cropped/location.png" alt=""> К списку персонажей</button><button class="btn btn-soft" data-view="phone"><img class="button-icon" src="assets/ui/cropped/chat.png" alt=""> Написать в смартфоне</button></div>
        <div class="memory-box"><b>Что запомнилось</b>${lastMemories.length?`<ul>${lastMemories.slice(0,5).map(item=>`<li>${escapeHTML(item.text)} <small>· день ${item.day}</small></li>`).join('')}</ul>`:'<p>Пока нет особых воспоминаний. Начни разговор или проведи совместное занятие.</p>'}</div>
      </aside>
    </div>`;
}

function renderPhone(state) {
  const tab = state.phone?.tab || 'feed';
  const posts = state.phone?.posts || [];
  const messages = state.phone?.messages || [];
  const available = CHARACTERS.filter(character=>state.unlocked.includes(character.id));
  const stamp = minute => `${String(Math.floor(minute/60)).padStart(2,'0')}:${String(minute%60).padStart(2,'0')}`;
  return `${heading('Смартфон','Локальная социальная сеть Конохи, сообщения и заметки. Контент меняется по ходу игры.')}
    <section class="phone-shell"><div class="phone-notch"></div><div class="phone-statusbar"><b>木ノ葉 NET</b><span>${stamp(state.world.minute)} · ${state.world.weather==='rain'?'🌧️':'☀️'} · ${state.player.stats.coins} рё</span></div>
      <div class="phone-app-head"><span class="phone-app-icon">葉</span><div><b>Konohagram</b><small>Деревня на связи</small></div><span class="phone-online">● онлайн</span></div>
      <div class="phone-tabs"><button data-action="phone-tab" data-type="feed" class="${tab==='feed'?'active':''}">Лента</button><button data-action="phone-tab" data-type="messages" class="${tab==='messages'?'active':''}">Сообщения</button></div>
      ${tab==='feed'?`<form id="social-post-form" class="phone-compose"><textarea name="post" rows="2" maxlength="220" placeholder="Что происходит? Напиши публикацию…" required></textarea><button class="btn btn-primary" type="submit">Опубликовать</button></form><div class="phone-feed">${posts.length?posts.map(post=>{const author=CHARACTERS.find(character=>character.id===post.authorId);return `<article class="phone-post"><div class="phone-post-head">${author?`<img src="${author.art[0].src}" alt="">`:'<span class="phone-player-avatar">Я</span>'}<div><b>${escapeHTML(author?.name || state.player.name)}</b><small>День ${post.day} · ${stamp(post.minute||0)}</small></div><span class="phone-post-source">${author?'персонаж':'ты'}</span></div><p>${escapeHTML(post.text)}</p><button data-action="phone-like" data-id="${post.id}" class="phone-like ${post.liked?'liked':''}">♥ ${post.likes||0} нравится</button></article>`}).join(''):'<div class="empty-state">Лента пока тихая. Опубликуй первую заметку или продолжай играть — знакомые будут появляться здесь.</div>'}</div>`:`<form id="phone-message-form" class="phone-compose"><label class="vn-select-label">Кому написать?</label><select name="characterId">${available.map(character=>`<option value="${character.id}">${escapeHTML(character.name)}</option>`).join('')}</select><textarea name="message" rows="3" maxlength="500" placeholder="Напиши сообщение вручную…" required></textarea><button class="btn btn-primary" type="submit">Отправить сообщение</button></form><div class="phone-messages">${messages.slice(-20).reverse().map(message=>{const author=CHARACTERS.find(character=>character.id===message.characterId);return `<article class="phone-message ${message.from==='player'?'outgoing':'incoming'}"><small>${escapeHTML(author?.name||'Собеседник')} · ${stamp(message.minute||0)}</small><p>${escapeHTML(message.text)}</p></article>`}).join('')||'<div class="empty-state">Здесь появятся ваши переписки. Можно написать первым.</div>'}</div>`}
      <div class="phone-bottom"><span>⌂ Лента</span><span>♡ Друзья</span><span>◉ Профиль</span></div>
    </section>`;
}

function renderPets(state) {
  const owned = state.pets || [];
  return `${heading('Питомцы','Заводи животных, выбирай имена и ухаживай за ними. Питомцы сохраняются вместе с историей.')}
    <section class="panel-card pets-owned"><div class="card-head"><h3>Твои питомцы</h3><small>${owned.length} / 5</small></div>${owned.length?`<div class="pets-grid">${owned.map(pet=>`<article class="pet-card"><div class="pet-portrait">${pet.icon||'🐾'}</div><div><b>${escapeHTML(pet.name)}</b><small>${escapeHTML(pet.kind)} · ${escapeHTML(pet.temperament||'дружелюбный')}</small><p>Привязанность: ${pet.affection||0}/100 · Настроение: ${pet.mood??55}/100</p><small>Сытость: ${100-(pet.hunger??45)} · Энергия: ${pet.energy??80}</small><div class="bond-track"><i style="width:${pet.affection||0}%"></i></div><div class="pet-actions"><button class="mini-btn" data-action="pet-care" data-type="feed" data-id="${pet.uid}">Покормить</button><button class="mini-btn" data-action="pet-care" data-type="play" data-id="${pet.uid}">Поиграть</button><button class="mini-btn" data-action="pet-care" data-type="walk" data-id="${pet.uid}">Прогуляться</button></div><form class="pet-name-form" data-pet-id="${pet.uid}"><input name="name" maxlength="20" value="${escapeHTML(pet.name)}" aria-label="Имя питомца"><button class="mini-btn" type="submit">Переименовать</button></form></div></article>`).join('')}</div>`:'<div class="pets-empty"><div>🐾</div><h3>Пока дома тихо</h3><p>Выбери питомца в магазине ниже. У каждого свой характер и любимые занятия.</p></div>'}</section>
    <section class="panel-card"><div class="card-head"><h3>Магазин животных</h3><small>БЮДЖЕТ: ${state.player.stats.coins} РЁ</small></div><div class="pets-grid">${PETS.map(pet=>`<article class="pet-shop-card"><div class="pet-shop-icon">${pet.icon}</div><h4>${escapeHTML(pet.name)}</h4><p>${escapeHTML(pet.desc)}</p><small>Темперамент: ${escapeHTML(pet.temperament)}</small><div class="pet-shop-footer"><b>${pet.price} рё</b><button class="btn btn-primary" data-action="buy-pet" data-id="${pet.id}" ${owned.length>=5?'disabled':''}>Завести</button></div></article>`).join('')}</div></section>`;
}

function renderScroll(state) {
  const entries = state.scroll.filter(item=>!item.hidden || item.visited);
  return `${heading('Свиток дел','Задания, события и обещания необязательны. Их можно выполнить, отложить или честно отменить.')}
    <section class="panel-card"><div class="card-head"><h3>Текущие записи</h3><small>${entries.filter(item=>!item.done).length} активных</small></div><div class="scroll-list">${entries.map(item=>`<article class="scroll-item ${item.done?'completed':''}"><div class="scroll-icon"><img src="assets/ui/${item.kind==='promise'?'cropped/promise.png':item.kind==='mystery'?'cropped/location.png':'scroll.svg'}" alt=""></div><div><strong>${escapeHTML(item.title)}</strong><p>${escapeHTML(item.desc)}</p>${item.progress!=null?`<div class="quest-progress"><i style="width:${Math.min(100,(item.progress/(item.target||1))*100)}%"></i></div>`:''}<small class="scroll-state">${item.done?(item.cancelled?'Пересмотрено':'Завершено'):'Можно выполнить, отложить или отменить'}</small></div><div class="quest-actions">${!item.done?`<button class="mini-btn" data-action="quest-complete" data-id="${item.id}">Готово</button><button class="mini-btn muted-btn" data-action="quest-ignore" data-id="${item.id}">Отложить</button>${item.kind==='promise'?`<button class="mini-btn muted-btn" data-action="quest-cancel" data-id="${item.id}">Отменить</button>`:''}`:'<span class="done-mark">✓</span>'}</div></article>`).join('')}</div></section>
    <section class="panel-card promise-card"><div class="card-head"><h3>Добавить своё обещание</h3><small>СВОЙ ТЕКСТ</small></div><form id="promise-form" class="promise-form"><input name="promise" maxlength="140" placeholder="Например: помочь Аяме приготовить ужин" required><button class="btn btn-primary" type="submit">Записать</button></form><p class="chat-hint">Обещание — это заметка для твоей истории, а не обязательство. Можно отменить его в любое время.</p></section>`;
}

function renderBag(state) {
  const looks = [
    ['casual','Повседневная одежда','Удобный вариант для прогулок.'],
    ['shinobi','Форма шиноби','Практичный стиль для тренировок.'],
    ['festival','Праздничное кимоно','Наряд для городского праздника.'],
    ['travel','Дорожный плащ','Подходит для прохладной погоды и поездок.'],
    ['raincoat','Дождевой плащ','Удобно в дождь и ветер.']
  ];
  return `${heading('Инвентарь','Подарки, полезные мелочи и одежда для разных занятий.')}
    <section class="panel-card"><div class="card-head"><h3>Сумка</h3><small>${state.inventory.reduce((sum,item)=>sum+item.qty,0)} предметов</small></div><div class="inventory-grid">${state.inventory.length?state.inventory.map(item=>{const icon={tea:'tea',flower:'flower',paper:'scroll',herb:'herb',bento:'bento'}[item.id]||'pouch';return `<article class="item-card"><img class="item-art" src="assets/ui/${icon}.svg" alt="" loading="lazy"><div><strong>${escapeHTML(item.name)}</strong><p>${escapeHTML(item.desc)}</p><small class="item-kind">${item.kind==='gift'?'Можно подарить':item.kind==='food'?'Еда':'Материал'}</small></div><div class="item-tools"><span class="quantity">×${item.qty}</span>${item.kind==='gift'?`<button class="mini-btn" data-action="choose-gift" data-id="${item.id}"><img class="button-icon" src="assets/ui/cropped/gift.png" alt=""> Подарить</button>`:''}${item.kind==='food'?`<button class="mini-btn" data-action="use-food" data-id="${item.id}">Съесть</button>`:''}</div></article>`}).join(''):'<div class="empty-state">Сумка пока пуста.</div>'}</div></section>
    <section class="panel-card outfit-card"><div class="card-head"><h3>Гардероб</h3><small>ОДЕЖДА ВЛИЯЕТ НА РЕАКЦИИ</small></div><div class="outfit-grid">${looks.map(([id,name,desc])=>`<button class="outfit-option ${state.player.look===id?'selected':''}" data-action="outfit" data-id="${id}"><span><img class="tile-icon" src="assets/ui/cropped/${id==='shinobi'?'training':id==='festival'?'flower':id==='travel'?'location':id==='raincoat'?'mood':'outfit'}.png" alt=""></span><b>${name}</b><small>${desc}</small></button>`).join('')}</div><p class="chat-hint">Одежда влияет на небольшие реплики и комфорт в разную погоду. Никаких штрафов за внешний вид нет.</p></section>`;
}

export function renderView(state) {
  switch (state.ui.view) {
    case 'map': return renderMap(state);
    case 'people': return renderPeople(state);
    case 'profile': {
      const character = getCharacter(state.ui.targetId);
      return character && state.unlocked.includes(character.id) ? renderPersonDetail(state,character) : renderPeople(state);
    }
    case 'scroll': return renderScroll(state);
    case 'bag': return renderBag(state);
    case 'day': return renderDay(state);
    case 'phone': return renderPhone(state);
    case 'pets': return renderPets(state);
    case 'settings': return renderSettingsPage(state);
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
  document.getElementById('mobile-status').innerHTML = `<span class="status-pill"><span class="clock-symbol">◷</span>${clockLabel(state.world.minute)}</span><span class="status-pill">${status}</span><span class="status-pill"><img class="status-icon" src="assets/ui/cropped/coin.png" alt="">${stats.coins} рё</span>`;
  document.getElementById('player-name-label').textContent = state.player.name;
  document.getElementById('player-origin-label').textContent = `${state.player.originName}${state.player.clan && state.player.clan!=='none' ? ` · ${state.player.clan}` : ''}`;
  document.getElementById('player-avatar').textContent = state.player.name.slice(0,1).toUpperCase();
  document.getElementById('player-stats').innerHTML = statLine('Выносливость',stats.stamina)+statLine('Чакра',stats.chakra)+statLine('Внимание',stats.focus)+`<div class="stat-row"><span>Репутация</span><b>${stats.renown}</b></div><div class="stat-row"><span>Рё</span><b>¥${stats.coins}</b></div>`;
  const place = getLocation(state.world.location);
  document.getElementById('current-place').innerHTML = `<span class="pin"><img src="assets/ui/cropped/location.png" alt="">${place.icon}</span><b>${place.name}</b><small>${place.area}</small>`;
  const activeView = state.ui.view==='profile' ? 'people' : state.ui.view;
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
