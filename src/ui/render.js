import {CHARACTERS,getCharacter,initials} from '../data/characters.js';
import {LOCATIONS,ORIGINS,getLocation,WEATHER,SEASONS} from '../data/world.js';
import {getBond} from '../core/store.js';
import {clockLabel,timePeriod,getWeather,seasonLabel} from '../core/life.js';

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
  const stats = state.player.stats;
  const hour = Math.floor(state.world.minute/60);
  const isNight = hour >= 19 || hour < 5;
  const sceneImage = weather.id === 'rain' && place.rainBg ? place.rainBg : isNight && place.nightBg ? place.nightBg : place.bg;
  const assignments = state.assignments.filter(item => item.day === state.world.day);
  const peopleHere = CHARACTERS.filter(character => state.unlocked.includes(character.id) && character.startLocation === place.id);
  const taskOptions = [['cook','Готовка'],['tidy','Уборка'],['shop','Покупки'],['study','Учёба'],['train','Тренировка'],['garden','Сад'],['clinic','Помощь в больнице'],['rest','Отдых']];
  return `${heading('Коноха','Свободно перемещайся по деревне, занимайся своими делами и узнавай истории жителей.')}
    <section class="world-hero" data-scene="${place.id}" data-weather="${weather.id}" style="--scene-image:url('${sceneImage || 'assets/backgrounds/konoha-main.webp'}')">
      <div class="hero-copy"><div class="eyebrow">СЕЙЧАС · ДЕНЬ ${state.world.day}</div><h3>${place.icon} ${place.name}</h3><p>${place.desc}</p><div class="hero-meta"><span>${weather.icon} ${weather.label}</span><span>🌿 ${seasonLabel(state)}</span><span>◷ ${timePeriod(state.world.minute)} · ${clockLabel(state.world.minute)}</span></div></div>
      <div class="hero-actions"><button class="btn btn-primary" data-action="sleep">Спать до утра</button><button class="btn btn-ghost" data-action="skip-time" data-hours="2">Пропустить 2 часа</button></div>
    </section>
    <div class="world-grid">
      <section class="panel-card"><div class="card-head"><h3><img class="ui-inline-icon" src="assets/ui/map.svg" alt=""> Карта Конохи</h3><small>НАЖМИ НА МЕСТО ДЛЯ ПЕРЕМЕЩЕНИЯ</small></div><div class="map-grid">${LOCATIONS.map(location=>`<button class="map-point ${location.id===place.id?'current':''}" style="--map-bg:url('${location.bg || 'assets/backgrounds/konoha-main.webp'}')" data-action="travel" data-id="${location.id}"><span class="pin">${location.icon}</span><strong>${location.name}</strong><small>${location.area}</small></button>`).join('')}</div></section>
      <section class="panel-card"><div class="card-head"><h3>Чем заняться</h3><small>ОДНО ДЕЙСТВИЕ = 25 МИНУТ</small></div><div class="quick-actions">
        <button class="action-tile" data-action="activity" data-type="rest"><span><img class="tile-icon" src="assets/ui/tea.svg" alt=""></span>Отдохнуть<small>Восстановить силы</small></button>
        <button class="action-tile" data-action="activity" data-type="meal"><span><img class="tile-icon" src="assets/ui/bento.svg" alt=""></span>Поесть<small>Потратить 12 рё</small></button>
        <button class="action-tile" data-action="activity" data-type="train"><span><img class="tile-icon" src="assets/ui/chakra.svg" alt=""></span>Тренировка<small>Контроль чакры</small></button>
        <button class="action-tile" data-action="activity" data-type="help"><span><img class="tile-icon" src="assets/ui/cropped/chat.png" alt=""></span>Помочь жителям<small>Репутация и находки</small></button>
        <button class="action-tile" data-action="activity" data-type="search"><span><img class="tile-icon" src="assets/ui/cropped/location.png" alt=""></span>Осмотреться<small>Найти полезную мелочь</small></button>
        <button class="action-tile" data-action="activity" data-type="focus"><span><img class="tile-icon" src="assets/ui/cropped/mood.png" alt=""></span>Медитация<small>Восстановить чакру</small></button>
        <button class="action-tile patrol-tile" data-action="patrol"><span><img class="tile-icon" src="assets/ui/kunai.svg" alt=""></span>Патруль территории<small>Случайная встреча и тактический бой</small></button>
      </div><p class="chat-hint">${weather.effect}</p>${peopleHere.length?`<div class="nearby"><b>Неподалёку:</b> ${peopleHere.map(character=>`<button class="text-link" data-action="open-person" data-id="${character.id}">${character.name}</button>`).join(' · ')}</div>`:''}</section>
    </div>
    <section class="panel-card routine-card"><div class="card-head"><h3>Планы на день</h3><small>НАЗНАЧЬ ЗАНЯТИЕ СЕБЕ ИЛИ УЧАСТНИКУ КОМАНДЫ</small></div>
      <form id="assignment-form" class="assignment-form"><label>Кто<select name="actor"><option value="player">${escapeHTML(state.player.name)}</option>${CHARACTERS.filter(character=>state.unlocked.includes(character.id)).map(character=>`<option value="${character.id}">${character.name}</option>`).join('')}</select></label><label>Занятие<select name="task">${taskOptions.map(([id,label])=>`<option value="${id}">${label}</option>`).join('')}</select></label><button class="btn btn-primary" type="submit">Назначить</button></form>
      ${assignments.length?`<div class="plan-list">${assignments.map(item=>`<div class="plan-chip"><span>✓</span><b>${escapeHTML(item.actorName)}</b><small>${taskOptions.find(([id])=>id===item.task)?.[1]||item.task}</small><em>${item.done?'Выполнено':'Запланировано'}</em></div>`).join('')}</div>`:'<div class="empty-inline">На сегодня пока нет планов. Назначь занятия — они завершатся, когда наступит следующий день.</div>'}
    </section>
    <section class="story-feed"><div class="card-head"><h3>Хроника дня</h3><small>ПОСЛЕДНИЕ СОБЫТИЯ</small></div>${state.feed.slice(0,6).map((line,index)=>`<div class="feed-line"><time>${index===0?'СЕЙЧАС':'ИСТОРИЯ'}</time>${escapeHTML(line)}</div>`).join('')}</section>`;
}

function renderPersonCard(state,character) {
  const bond = getBond(state,character.id);
  const value = Math.max(bond.friendship,bond.trust,bond.respect);
  return `<button class="person-card" data-action="open-person" data-id="${character.id}"><div class="person-top">${avatar(character)}<div><strong>${character.name}</strong><small>${character.role}</small></div></div><p class="person-desc">${character.personality}</p><div class="bond-line"><span>${bond.stage}</span><b>${value}/100</b></div><div class="bond-track"><i style="width:${value}%"></i></div></button>`;
}

function renderPeople(state) {
  const character = getCharacter(state.ui.targetId);
  if (character && state.unlocked.includes(character.id)) return renderPersonDetail(state,character);
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
        <section class="panel-card character-art-panel"><div class="card-head"><h3>Галерея образов</h3><small>3 СИТУАЦИИ</small></div><div class="character-art-grid">${character.art.map(art=>`<figure class="character-art"><img src="${art.src}" alt="${character.name} — ${art.label}" loading="lazy"><figcaption>${art.label}</figcaption></figure>`).join('')}</div></section>
        <section class="panel-card chat-card"><div class="card-head"><h3>Свободный разговор</h3><small>ЛОКАЛЬНЫЙ ИГРОВОЙ МАСТЕР</small></div><div class="chat-log" id="chat-log">${messages.map(message=>`<div class="chat-bubble ${message.from==='player'?'player':'npc'}"><span class="chat-meta">${message.from==='player'?escapeHTML(state.player.name):character.name}</span>${escapeHTML(message.text)}</div>`).join('')}</div>
          <form id="chat-form" class="chat-form"><input type="hidden" name="characterId" value="${character.id}"><textarea name="message" class="chat-input" rows="2" maxlength="500" placeholder="Напиши, что говоришь или делаешь…" required></textarea><button class="send-button" type="submit" aria-label="Отправить">➤</button></form><p class="chat-hint">Игровой мастер учитывает смысл фразы, характер собеседника, погоду, время и предыдущие встречи. Работает без API и интернета.</p></section>
      </div>
      <aside class="panel-card bond-panel"><div class="card-head"><h3>Ваша связь</h3><small>${bond.meetings} встреч</small></div><div class="bond-status">${bond.stage}</div><div class="bond-stat"><span>Дружба</span><b>${bond.friendship}/100</b><div class="bond-track"><i style="width:${bond.friendship}%"></i></div></div><div class="bond-stat"><span>Доверие</span><b>${bond.trust}/100</b><div class="bond-track"><i style="width:${bond.trust}%"></i></div></div><div class="bond-stat"><span>Уважение</span><b>${bond.respect}/100</b><div class="bond-track"><i style="width:${bond.respect}%"></i></div></div>
        <div class="side-actions"><button class="btn btn-soft" data-action="person-action" data-id="${character.id}" data-type="invite"><img class="button-icon" src="assets/ui/cropped/heart.png" alt=""> Прогуляться</button><button class="btn btn-soft" data-action="person-action" data-id="${character.id}" data-type="help"><img class="button-icon" src="assets/ui/cropped/chat.png" alt=""> Предложить помощь</button><button class="btn btn-soft" data-action="person-action" data-id="${character.id}" data-type="train"><img class="button-icon" src="assets/ui/cropped/training.png" alt=""> Тренироваться</button><button class="btn btn-ghost" data-action="back-people"><img class="button-icon" src="assets/ui/cropped/location.png" alt=""> К списку персонажей</button></div>
        <div class="memory-box"><b>Что запомнилось</b>${lastMemories.length?`<ul>${lastMemories.slice(0,5).map(item=>`<li>${escapeHTML(item.text)} <small>· день ${item.day}</small></li>`).join('')}</ul>`:'<p>Пока нет особых воспоминаний. Начни разговор или проведи совместное занятие.</p>'}</div>
      </aside>
    </div>`;
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
    case 'people': return renderPeople(state);
    case 'scroll': return renderScroll(state);
    case 'bag': return renderBag(state);
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
  document.getElementById('player-origin-label').textContent = state.player.originName;
  document.getElementById('player-avatar').textContent = state.player.name.slice(0,1).toUpperCase();
  document.getElementById('player-stats').innerHTML = statLine('Выносливость',stats.stamina)+statLine('Чакра',stats.chakra)+statLine('Внимание',stats.focus)+`<div class="stat-row"><span>Репутация</span><b>${stats.renown}</b></div><div class="stat-row"><span>Рё</span><b>¥${stats.coins}</b></div>`;
  const place = getLocation(state.world.location);
  document.getElementById('current-place').innerHTML = `<span class="pin"><img src="assets/ui/cropped/location.png" alt="">${place.icon}</span><b>${place.name}</b><small>${place.area}</small>`;
  document.querySelectorAll('.nav-item').forEach(button=>button.classList.toggle('active',button.dataset.view===state.ui.view));
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
