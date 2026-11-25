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
  const available = CHARACTERS.filter(character => state.unlocked.includes(character.id));
  const peopleHere = available.filter(character => character.startLocation === place.id);
  const featured = available.find(character => character.id === state.ui.sceneCharacterId)
    || peopleHere[0]
    || available.find(character => ['hinata','sakura','konan','anko','ayame','hanabi'].includes(character.id))
    || available[0];
  if (featured && state.ui.sceneCharacterId !== featured.id) state.ui.sceneCharacterId = featured.id;
  const bond = featured ? getBond(state, featured.id) : {friendship:0,trust:0,respect:0,stage:'Знакомство',meetings:0};
  const bondValue = featured ? Math.max(bond.friendship,bond.trust,bond.respect) : 0;
  const assignments = state.assignments.filter(item => item.day === state.world.day);
  const taskOptions = [['cook','Готовка'],['tidy','Уборка'],['shop','Покупки'],['study','Учёба'],['train','Тренировка'],['garden','Сад'],['clinic','Помощь в больнице'],['rest','Отдых']];
  const sceneArt = featured?.art?.[0]?.src || '';
  const lastResult = state.ui.lastActionResult || `Ты находишься в месте «${place.name}». ${place.desc} Напиши, что хочешь сделать, или выбери персонажа для разговора.`;
  return `${heading('Жизнь в Конохе','Один мир, свободные действия и разговоры: напиши, куда идёшь, что делаешь или кому отвечаешь.')}
    <div class="vn-home-layout">
      <aside class="vn-roster panel-card">
        <div class="vn-panel-title"><div><span class="eyebrow">КОНОХА</span><h3>Персонажи</h3></div><b>${available.length}</b></div>
        <div class="vn-roster-list">${available.map(character=>{
          const currentBond = getBond(state,character.id);
          const selected = featured?.id === character.id;
          return `<button class="vn-roster-item ${selected?'selected':''}" data-action="select-scene-character" data-id="${character.id}" aria-pressed="${selected}">${avatar(character)}<span class="vn-roster-name"><b>${escapeHTML(character.name)}</b><small>${escapeHTML(character.role)}</small></span><span class="vn-roster-heart">${Math.max(currentBond.friendship,currentBond.trust)}<i>♥</i></span></button>`;
        }).join('')}</div>
        <button class="vn-roster-all" data-view="people">Все профили и истории <span>↗</span></button>
      </aside>

      <section class="vn-center-column">
        <section class="vn-stage" data-weather="${weather.id}" style="--scene-image:url('${sceneImage || 'assets/backgrounds/konoha-main.webp'}')">
          <div class="vn-stage-shade"></div>
          <div class="vn-stage-topline"><span class="vn-location-pill"><img src="assets/ui/cropped/location.png" alt="">${escapeHTML(place.name)}</span><span>${weather.icon} ${weather.label} · ${seasonLabel(state)} · ${timePeriod(state.world.minute)} ${clockLabel(state.world.minute)}</span></div>
          <div class="vn-stage-copy"><div class="eyebrow">ДЕНЬ ${state.world.day} · ${escapeHTML(place.area.toUpperCase())}</div><h3>${escapeHTML(place.name)}</h3><p>${escapeHTML(place.desc)}</p></div>
          ${featured?`<button class="vn-stage-character" data-action="open-person" data-id="${featured.id}" aria-label="Открыть профиль ${escapeHTML(featured.name)}"><img src="${sceneArt}" alt="${escapeHTML(featured.name)}" loading="eager"><span class="vn-stage-nameplate"><b>${escapeHTML(featured.name)}</b><small>${escapeHTML(featured.role)}</small></span></button>`:''}
          <div class="vn-stage-bottom"><span>✦ ${peopleHere.length ? `${peopleHere.length} знакомых могут быть неподалёку` : 'Улица живёт своей жизнью'}</span><span>Рё ${stats.coins}</span></div>
        </section>

        <section class="vn-dialogue-card" aria-live="polite">
          <div class="vn-master-mark">GM</div>
          <div class="vn-dialogue-copy"><span class="vn-speaker-label">ИГРОВОЙ МАСТЕР · ХРОНИКА</span><p>${escapeHTML(lastResult)}</p></div>
        </section>

        <div class="vn-input-grid">
          <section class="panel-card vn-input-card action-input-card">
            <div class="vn-panel-title"><div><span class="eyebrow">СВОБОДНЫЙ RP</span><h3>Что ты делаешь?</h3></div><img src="assets/ui/cropped/location.png" alt=""></div>
            <form id="world-action-form" class="vn-input-form">
              <textarea name="action" rows="3" maxlength="420" placeholder="Например: иду в больницу, ищу Сакуру и предлагаю помочь; затем покупаю чай на рынке…" required>${escapeHTML(state.ui.lastActionText || '')}</textarea>
              <div class="vn-prompt-chips"><button type="button" data-sample="Иду в библиотеку и ищу книгу о контроле чакры.">В библиотеку</button><button type="button" data-sample="Иду на рынок и покупаю зелёный чай.">На рынок</button><button type="button" data-sample="Осматриваю это место и ищу полезные вещи.">Осмотреться</button><button type="button" data-sample="Тренируюсь на площадке и отрабатываю защитную стойку.">Тренировка</button></div>
              <div class="vn-form-footer"><small>Можно писать обычным языком: перемещение, поиск, покупки, отдых, тренировка и бытовые дела.</small><button class="btn btn-primary" type="submit">Выполнить действие <span>↗</span></button></div>
            </form>
          </section>
          <section class="panel-card vn-input-card dialogue-input-card">
            <div class="vn-panel-title"><div><span class="eyebrow">СВОБОДНЫЙ ДИАЛОГ</span><h3>Что ты скажешь?</h3></div><img src="assets/ui/cropped/chat.png" alt=""></div>
            <form id="world-dialogue-form" class="vn-input-form">
              <label class="vn-select-label" for="world-dialogue-target">С кем говоришь?</label>
              <select id="world-dialogue-target" name="characterId">${available.map(character=>`<option value="${character.id}" ${featured?.id===character.id?'selected':''}>${escapeHTML(character.name)}</option>`).join('')}</select>
              <textarea name="message" rows="3" maxlength="500" placeholder="Напиши реплику своими словами…" required></textarea>
              <div class="vn-form-footer"><small>Персонаж ответит с учётом своего характера и ваших прошлых встреч.</small><button class="btn btn-soft" type="submit">Отправить реплику <span>➤</span></button></div>
            </form>
          </section>
        </div>

        <details class="panel-card vn-map-drawer">
          <summary><span><img src="assets/ui/map.svg" alt=""> Карта Конохи и окрестностей</span><small>${place.name} · ${LOCATIONS.length} мест</small></summary>
          <div class="map-grid vn-map-grid">${LOCATIONS.map(location=>`<button class="map-point ${location.id===place.id?'current':''}" style="--map-bg:url('${location.bg || 'assets/backgrounds/konoha-main.webp'}')" data-action="travel" data-id="${location.id}"><span class="pin">${location.icon}</span><strong>${escapeHTML(location.name)}</strong><small>${escapeHTML(location.area)}</small></button>`).join('')}</div>
        </details>

        <details class="panel-card vn-plans-drawer">
          <summary><span>Планы на день</span><small>${assignments.length} назначено</small></summary>
          <form id="assignment-form" class="assignment-form"><label>Кто<select name="actor"><option value="player">${escapeHTML(state.player.name)}</option>${available.map(character=>`<option value="${character.id}">${escapeHTML(character.name)}</option>`).join('')}</select></label><label>Занятие<select name="task">${taskOptions.map(([id,label])=>`<option value="${id}">${label}</option>`).join('')}</select></label><button class="btn btn-primary" type="submit">Назначить</button></form>
          ${assignments.length?`<div class="plan-list">${assignments.map(item=>`<div class="plan-chip"><span>✓</span><b>${escapeHTML(item.actorName)}</b><small>${taskOptions.find(([id])=>id===item.task)?.[1]||item.task}</small><em>${item.done?'Выполнено':'Запланировано'}</em></div>`).join('')}</div>`:'<div class="empty-inline">Пока нет планов. Выбери дела для себя или знакомых.</div>'}
        </details>
      </section>

      <aside class="vn-right-rail">
        ${featured?`<section class="panel-card vn-profile-card"><div class="vn-panel-title"><div><span class="eyebrow">СЕЙЧАС В ФОКУСЕ</span><h3>${escapeHTML(featured.name)}</h3></div><span class="vn-heart-badge">♥ ${bondValue}</span></div><p class="vn-profile-role">${escapeHTML(featured.role)}</p><p class="vn-profile-desc">${escapeHTML(featured.personality)}</p><div class="vn-bond-mini"><div><span>Дружба</span><b>${bond.friendship}/100</b></div><i><em style="width:${bond.friendship}%"></em></i><div><span>Доверие</span><b>${bond.trust}/100</b></div><i><em style="width:${bond.trust}%"></em></i><div><span>Уважение</span><b>${bond.respect}/100</b></div><i><em style="width:${bond.respect}%"></em></i></div><div class="vn-like-tags">${featured.likes.slice(0,3).map(like=>`<span>${escapeHTML(like)}</span>`).join('')}</div><div class="vn-profile-actions"><button data-action="open-person" data-id="${featured.id}"><img src="assets/ui/cropped/chat.png" alt="">Профиль и чат</button><button data-action="person-action" data-id="${featured.id}" data-type="invite"><img src="assets/ui/cropped/heart.png" alt="">Прогулка</button><button data-action="person-action" data-id="${featured.id}" data-type="help"><img src="assets/ui/cropped/gift.png" alt="">Помощь</button></div></section>`:''}
        <section class="panel-card vn-quick-panel"><div class="vn-panel-title"><div><span class="eyebrow">БЫСТРЫЕ ДЕЛА</span><h3>На сегодня</h3></div><img src="assets/ui/cropped/star.png" alt=""></div><div class="vn-quick-grid">
          <button data-action="activity" data-type="rest"><img src="assets/ui/tea.svg" alt=""><b>Отдохнуть</b><small>Силы +</small></button>
          <button data-action="activity" data-type="meal"><img src="assets/ui/bento.svg" alt=""><b>Поесть</b><small>12 рё</small></button>
          <button data-action="activity" data-type="train"><img src="assets/ui/chakra.svg" alt=""><b>Тренировка</b><small>Чакра +</small></button>
          <button data-action="activity" data-type="search"><img src="assets/ui/cropped/location.png" alt=""><b>Обыскать</b><small>Находки</small></button>
          <button class="vn-patrol-action" data-action="patrol"><img src="assets/ui/kunai.svg" alt=""><b>Патруль</b><small>Случайная встреча</small></button>
          <button data-action="sleep"><img src="assets/ui/cropped/sleep.png" alt=""><b>Спать</b><small>До утра</small></button>
        </div></section>
        <section class="panel-card vn-time-panel"><div class="vn-panel-title"><div><span class="eyebrow">ПЕРСОНАЖ</span><h3>${escapeHTML(state.player.name)}</h3></div><img src="assets/ui/cropped/mood.png" alt=""></div><div class="vn-stat-compact"><span>Выносливость</span><b>${stats.stamina}/100</b></div><div class="vn-stat-compact"><span>Чакра</span><b>${stats.chakra}/100</b></div><div class="vn-stat-compact"><span>Внимание</span><b>${stats.focus}/100</b></div><button class="vn-time-skip" data-action="skip-time" data-hours="2">Пропустить 2 часа ↗</button></section>
      </aside>
    </div>
    <section class="story-feed vn-feed"><div class="card-head"><h3>Хроника дня</h3><small>ПОСЛЕДНИЕ СОБЫТИЯ</small></div>${state.feed.slice(0,5).map((line,index)=>`<div class="feed-line"><time>${index===0?'СЕЙЧАС':'ИСТОРИЯ'}</time>${escapeHTML(line)}</div>`).join('')}</section>`;
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
