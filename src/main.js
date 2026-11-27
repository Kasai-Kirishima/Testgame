import {CHARACTERS,getCharacter,getUnlockedCharacterArts} from './data/characters.js';
import {ENEMIES,getEnemy} from './data/enemies.js';
import {ORIGINS,LOCATIONS,getLocation} from './data/world.js';
import {createInitialState,loadState,saveState,clearSave,addFeed,updateBond,removeItem,addItem} from './core/store.js';
import {talkToCharacter,npcOpeningLine,performConversationAction} from './core/gm.js';
import {travelTo,doActivity,skipTime,sleepUntilMorning,assignDailyTask,tickAction,advanceTime,updateNpcPositions,getNpcLocation,resolveWorldSituation} from './core/life.js';
import {recordDailyProgress,gainSkillXP,craftItem,useCraftedItem} from './core/progression.js';
import {evaluateAchievements} from './core/achievements.js';
import {getMagazineIssue,getMagazinePage} from './data/secret-magazine.js';
import {getPet} from './data/pets.js';
import {getJob} from './data/jobs.js';
import {CLOTHING,CLOTHING_BY_ID,CLOTHING_SLOTS,STARTER_CLOTHING,PRESET_EQUIPMENT,LOOK_TO_PRESET} from './data/clothing.js';
import {cycleWardrobePreview,equipClothing,purchaseClothing,applyWardrobePreset} from './core/wardrobe.js';
import {normalizeEquipment} from './data/clothing.js';
import {canRomance,completeRomanticDate,confessFeelings,resolveInitiative} from './core/relationships.js';
import {renderView,renderStatus,populateOrigins,updateOriginNote,renderSettings,escapeHTML} from './ui/render.js';

const PIXABAY_TRACK = 'https://pixabay.com/music/ambient-japanese-style-ambient-475587/';
let state = loadState();
let dialogueTypingTimer = null;
let lastTypedDialogue = '';
let uiAudioContext = null;
if (state) updateNpcPositions(state,true);
const elements = {
  title: document.getElementById('title-screen'),
  creation: document.getElementById('creation-screen'),
  game: document.getElementById('game-screen'),
  view: document.getElementById('view-root'),
  modal: document.getElementById('modal-root'),
  toast: document.getElementById('toast-root')
};

function toast(message) {
  const item = document.createElement('div');
  item.className = 'toast';
  item.textContent = message;
  elements.toast.append(item);
  window.setTimeout(() => item.remove(), 2800);
}

const NAME_BANK = {
  male: ['Рэн','Рику','Харуто','Акира','Сора','Дайчи','Ицуки','Кайто','Наоки','Тома','Юто','Хару'],
  female: ['Аой','Юна','Мэй','Рин','Хана','Акари','Саки','Мио','Нацуми','Кохару','Рэй','Ая'],
  other: ['Хару','Аки','Нао','Сора','Рин','Хикару','Рэн','Мити','Юки','Каору']
};
const FAMILY_BANK = ['Морикава','Акияма','Фудзимото','Куросава','Мидзуно','Татибана','Хаяси','Кобаяси','Арата','Симидзу','Кандзаки','Хосино'];
function randomPlayerName() {
  const gender=document.getElementById('player-gender')?.value || 'male';
  const given=NAME_BANK[gender] || NAME_BANK.other;
  const pick=list=>list[Math.floor(Math.random()*list.length)];
  return `${pick(given)} ${pick(FAMILY_BANK)}`;
}

function randomizeCreator() {
  const pick = list => list[Math.floor(Math.random()*list.length)];
  const choices = {
    'player-origin':['resident','shinobi','traveler','guest','medic','merchant','craft','instructor','clan','otherworld'],
    'player-style':['balanced','bold','kind','quiet','witty'],
    'player-look':['casual','shinobi','festival','travel','raincoat','workwear'],
    'player-clan':['none','Узумаки','Учиха','Хьюга','Нара','Яманака','Акимичи','Инузука','Абураме','Хатаке','Сарутоби','Другой / неизвестный'],
    'player-chakra':['fire','water','wind','earth','lightning','balanced'],
    'player-specialty':['taijutsu','ninjutsu','genjutsu','medical','sensors','craft','none'],
    'player-gender':['male','female','other'],
    'player-hair':['short','medium','long','tied','wild'],
    'player-eyes':['Карие','Серые','Голубые','Зелёные','Чёрные','Фиолетовые'],
    'player-goal':['protect','master','explore','family','fame','peace'],
    'player-village':['konoha','suna','kiri','iwa','kumo','independent'],
    'player-tool':['kunai','shuriken','katana','scroll','medicine','wire'],
    'player-age':['18','19','20','21','22','25','30'],
    'player-mark':['none','scar','earring','ribbon','glasses']
  };
  for (const [id,values] of Object.entries(choices)) {
    const field=document.getElementById(id);
    if (field) field.value=pick(values);
  }
  const name=document.getElementById('player-name');
  if (name) name.value=randomPlayerName();
  updateOriginNote();
  toast('Случайный персонаж создан полностью. Можно изменить любые параметры.');
  updateCreatorPreview();
}

function updateCreatorPreview() {
  const gender=document.getElementById('player-gender')?.value || 'male';
  const hair=['short','medium','long','tied','wild'].includes(document.getElementById('player-hair')?.value)?document.getElementById('player-hair').value:'medium';
  const look=document.getElementById('player-look')?.value || 'casual';
  const equipment=normalizeEquipment({},look);
  const base=gender==='female'?'base-body-female.svg':'base-body.svg';
  const order=['bottom','shoes','top','outer','accessory','head'];
  const stage=document.getElementById('creator-avatar');
  if(stage) stage.innerHTML=`<img class="wardrobe-avatar-base" src="assets/player/layers/${base}" alt="Основа персонажа"><img class="wardrobe-avatar-layer layer-hair" src="assets/player/layers/hair-${hair}.svg" alt="Причёска">${order.map(slot=>{const item=CLOTHING_BY_ID[equipment[slot]];return item?`<img class="wardrobe-avatar-layer layer-${slot}" src="${item.src}" alt="${item.name}">`:''}).join('')}`;
  const name=document.getElementById('creator-name-preview');
  if(name) name.textContent=(document.getElementById('player-name')?.value||'Твой персонаж').trim()||'Твой персонаж';
  const genderLabel=document.getElementById('creator-gender-preview');
  if(genderLabel) genderLabel.textContent=gender==='female'?'Куноичи':gender==='other'?'Шиноби':'Шиноби';
  const clan=document.getElementById('player-clan')?.value || 'none';
  const clanLabel=document.getElementById('creator-clan-preview');
  if(clanLabel) clanLabel.textContent=clan==='none'?'Без клана':`Клан ${clan}`;
}

function persist() {
  if (state && !state.previewOnly && state.settings.autosave) saveState(state);
}

function render() {
  if (!state) return;
  const newlyUnlocked = evaluateAchievements(state);
  for (const achievement of newlyUnlocked) {
    addFeed(state,`Получено достижение: «${achievement.title}» (+${achievement.points} очков).`);
    toast(`🏆 ${achievement.title} · +${achievement.points} очков`);
  }
  renderStatus(state);
  elements.view.innerHTML = renderView(state);
  animateCurrentDialogue();
  document.getElementById('app').dataset.view = state.ui.view;
  document.getElementById('app').dataset.textSize = state.settings.textSize;
  document.getElementById('app').dataset.contrast = state.settings.contrast;
  document.getElementById('app').dataset.motion = state.settings.animations ? 'on' : 'off';
  document.getElementById('app').dataset.showNames = state.settings.showNames === false ? 'off' : 'on';
  if (state.ui.view === 'people') {
    const chat = document.getElementById('chat-log');
    if (chat) chat.scrollTop = chat.scrollHeight;
  }
  persist();
}

function animateCurrentDialogue() {
  const node=document.querySelector?.('[data-typewriter]') || null;
  if (!node) { lastTypedDialogue=''; if(dialogueTypingTimer){clearInterval(dialogueTypingTimer);dialogueTypingTimer=null;} return; }
  const full=node.textContent||'';
  if (!full || full===lastTypedDialogue) return;
  lastTypedDialogue=full;
  if (dialogueTypingTimer) clearInterval(dialogueTypingTimer);
  const noMotion=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || document.getElementById('app')?.dataset.motion==='off';
  if (noMotion) return;
  node.textContent=''; let index=0;
  dialogueTypingTimer=setInterval(()=>{
    index=Math.min(full.length,index+2);
    node.textContent=full.slice(0,index);
    if(index>=full.length){clearInterval(dialogueTypingTimer);dialogueTypingTimer=null;}
  },12);
}

function playUiSound(kind='tap') {
  try {
    const effectVolume=state?.settings?.effectVolume ?? 45;
    if(effectVolume<=0) return;
    const AudioCtx=window.AudioContext||window.webkitAudioContext;
    if(!AudioCtx) return;
    uiAudioContext ||= new AudioCtx();
    if(uiAudioContext.state==='suspended') uiAudioContext.resume();
    const osc=uiAudioContext.createOscillator(); const gain=uiAudioContext.createGain();
    const now=uiAudioContext.currentTime;
    const notes=kind==='success'?[660,880]:kind==='nav'?[420,560]:[510,430];
    osc.type='sine'; osc.frequency.setValueAtTime(notes[0],now); osc.frequency.linearRampToValueAtTime(notes[1],now+.075);
    gain.gain.setValueAtTime(Math.min(.035,effectVolume/100*.045),now); gain.gain.exponentialRampToValueAtTime(.0001,now+.105);
    osc.connect(gain); gain.connect(uiAudioContext.destination); osc.start(now); osc.stop(now+.11);
  } catch { /* Audio is optional; input and navigation must remain usable. */ }
}

function showScreen(name) {
  if (name === 'game' && !state) name = 'title';
  elements.title.classList.toggle('hidden',name !== 'title');
  elements.creation.classList.toggle('hidden',name !== 'creation');
  elements.game.classList.toggle('hidden',name !== 'game');
  if (name === 'game') render();
  if (name === 'title') {
    const button = document.getElementById('continue-button');
    button.disabled = !loadState();
    button.classList.toggle('disabled',button.disabled);
  }
}

function startGame(player) {
  state = createInitialState(player);
  updateNpcPositions(state,true);
  state.ui.screen = 'game';
  addFeed(state,`${state.player.name} начинает новую историю в Конохе. Прошлое: ${state.player.originName}.`);
  saveState(state);
  showScreen('game');
  toast('История началась. Добро пожаловать в Коноху!');
}

function switchView(view) {
  if (!state) { showScreen('title'); toast('Сначала начни новую игру или загрузи сохранение.'); return; }
  state.ui.drawerOpen = false;
  document.getElementById('game-screen')?.classList.remove('drawer-open');
  state.ui.view = view;
  if (!['profile','conversation'].includes(view)) state.ui.targetId = '';
  render();
}

function appendDialogue(characterId,from,text) {
  if (!state.dialogues[characterId]) state.dialogues[characterId] = [];
  state.dialogues[characterId].push({from,text:String(text).slice(0,700),day:state.world.day,minute:state.world.minute});
  state.dialogues[characterId] = state.dialogues[characterId].slice(-40);
}

function speakAsAction(characterId,type) {
  const character = getCharacter(characterId);
  if (!character) return;
  const lines = {
    invite:`Я предлагаю прогуляться с тобой по ${getLocation(state.world.location).name}.`,
    help:'Могу помочь тебе с делами. Давай распределим обязанности.',
    train:'Давай проведём дружеское упражнение на контроль чакры.',
    challenge:'Предлагаю небольшое командное испытание. Проверим смекалку и координацию.'
  };
  const text = lines[type] || 'Давай поговорим.';
  appendDialogue(characterId,'player',text);
  const result = talkToCharacter(state,character,text);
  appendDialogue(characterId,'npc',result.reply);
  recordDailyProgress(state,'talk',1); gainSkillXP(state,'social',3);
  if (type === 'invite') {
    state.world.lastMeetup = {characterId,day:state.world.day,location:state.world.location};
    state.player.stats.stamina = Math.max(0,state.player.stats.stamina-2);
  }
  render();
}

function addCustomPromise(text) {
  const clean = String(text || '').trim().slice(0,140);
  if (!clean) return;
  state.scroll.unshift({id:`custom-${Date.now()}`,title:'Личная запись',desc:clean,kind:'promise',done:false,optional:true});
  addFeed(state,`В свиток добавлена запись: ${clean}`);
  toast('Запись добавлена в свиток.');
  render();
}

function handleQuest(action,id) {
  const quest = state.scroll.find(item => item.id === id);
  if (!quest || quest.done) return;
  if (action === 'quest-complete' && quest.id==='first-walk' && (quest.progress||0)<(quest.target||3)) { toast(`Нужно посетить ещё ${(quest.target||3)-(quest.progress||0)} места. Прогресс: ${quest.progress||0}/${quest.target||3}.`); return; }
  if (action === 'quest-complete' && quest.id==='clinic-help' && !quest.done) { toast('Сначала зайди в больницу и помоги медицинскому корпусу через текстовое действие.'); return; }
  if (action === 'quest-complete') {
    quest.done = true;
    quest.completedDay = state.world.day;
    state.player.stats.renown = Math.min(100,state.player.stats.renown+2);
    if (quest.characterId) updateBond(state,quest.characterId,{friendship:2,trust:3});
    addFeed(state,`Запись «${quest.title}» отмечена выполненной.`);
    toast('Готово — свиток обновлён.');
  } else if (action === 'quest-ignore') {
    quest.hidden = true;
    addFeed(state,`Ты отложил запись «${quest.title}». Никакого штрафа нет.`);
    toast('Запись отложена.');
  } else if (action === 'quest-cancel') {
    quest.done = true;
    quest.cancelled = true;
    if (quest.characterId) updateBond(state,quest.characterId,{trust:1});
    addFeed(state,`Ты честно пересмотрел обещание «${quest.title}».`);
    toast('Обещание отменено без штрафа.');
  }
  render();
}

function assignPlan(form) {
  const data = new FormData(form);
  const result = assignDailyTask(state,data.get('actor'),data.get('task'));
  toast(result.message);
  render();
}

function openHomeStorage(kind='fridge') {
  if(state.world.location!=='home'){toast('Домашний схрон доступен только у тебя дома.');return;}
  state.storage ||= {fridge:[]}; state.storage.fridge ||= [];
  if(kind==='wardrobe') {
    const equipment=state.player.equipment||{};
    const equipped=CLOTHING_SLOTS.map(slot=>`<div class="storage-row"><span>${slot.icon}</span><b>${slot.label}: ${CLOTHING_BY_ID[equipment[slot.id]]?.name||'—'}</b></div>`).join('');
    const looks=[['casual','Повседневный комплект','male-casual'],['shinobi','Форма шиноби','male-shinobi'],['festival','Праздничное кимоно','male-formal'],['travel','Дорожный комплект','male-travel'],['raincoat','Дождевой комплект','male-raincoat'],['workwear','Рабочая форма','male-work']];
    elements.modal.innerHTML=`<div class="modal-backdrop"><section class="modal-card storage-modal"><div class="modal-head"><div><div class="eyebrow">ДОМАШНИЙ СХРОН</div><h3>Шкаф с одеждой</h3><small>Шесть независимых слотов — вещи можно сочетать как угодно.</small></div><button class="close-button" data-action="close-modal">×</button></div><div class="storage-list">${equipped}</div><button class="btn btn-primary" data-action="open-wardrobe">Открыть гардероб и выбрать вещи</button><details class="ready-outfit-details"><summary>Готовые комплекты</summary><div class="storage-list">${looks.filter(([id])=>(state.player.ownedLooks||[]).includes(id)).map(([id,name,art])=>`<div class="storage-row wardrobe-storage-row"><img src="assets/player/outfits/${state.player.gender==='female'?(id==='festival'?'female-festival':id==='shinobi'?'female-shinobi':'female-travel'):art}.png" alt=""><b>${name}</b><button class="mini-btn" data-action="outfit" data-id="${id}">${state.player.look===id?'Надето':'Переодеться'}</button></div>`).join('')||'<p class="empty-state">Готовых комплектов пока нет.</p>'}</div></details><p class="chat-hint">В шкафу можно менять отдельные вещи и сохранять разные сочетания. Старые готовые комплекты тоже остались доступны.</p></section></div>`;
    return;
  }
  const food=state.inventory.filter(item=>item.kind==='food'&&item.qty>0);
  const stored=state.storage.fridge;
  elements.modal.innerHTML=`<div class="modal-backdrop"><section class="modal-card storage-modal"><div class="modal-head"><div><div class="eyebrow">ДОМАШНИЙ СХРОН</div><h3>Холодильник</h3></div><button class="close-button" data-action="close-modal">×</button></div><div class="storage-columns"><div><b>В сумке</b>${food.map(item=>`<div class="storage-row"><span>🍱</span><b>${escapeHTML(item.name)} ×${item.qty}</b><button class="mini-btn" data-action="storage-put" data-id="${item.id}">Положить</button></div>`).join('')||'<small>Еды в сумке нет.</small>'}</div><div><b>В холодильнике</b>${stored.map(item=>`<div class="storage-row"><span>🧊</span><b>${escapeHTML(item.name)} ×${item.qty}</b><button class="mini-btn" data-action="storage-take" data-id="${item.id}">Забрать</button></div>`).join('')||'<small>Холодильник пуст.</small>'}</div></div></section></div>`;
}

function openGiftPicker(itemId) {
  const item = state.inventory.find(entry=>entry.id===itemId);
  if (!item) return;
  const people = CHARACTERS.filter(character=>state.unlocked.includes(character.id));
  elements.modal.innerHTML = `<div class="modal-backdrop"><section class="modal-card"><div class="modal-head"><div><div class="eyebrow">ПОДАРОК</div><h3>${escapeHTML(item.name)}</h3></div><button class="close-button" data-action="close-modal">×</button></div><p>Кому передать этот предмет?</p><div class="gift-people">${people.map(character=>`<button class="gift-person" data-action="gift-to-person" data-id="${character.id}" data-item="${item.id}"><span>${character.icon}</span><b>${character.name}</b></button>`).join('')}</div></section></div>`;
}

function giveItemToPerson(characterId,itemId) {
  const character = getCharacter(characterId);
  const item = state.inventory.find(entry=>entry.id===itemId && entry.qty>0);
  if (!character || !item) return;
  state.ui.view = 'people';
  state.ui.targetId = characterId;
  state.ui.pendingGiftId = itemId;
  state.metCharacters ||= []; if(!state.metCharacters.includes(characterId)) state.metCharacters.push(characterId);
  state.meetingHistory ||= {}; state.meetingHistory[characterId] ||= {firstDay:state.world.day,firstLocation:state.world.location,firstMinute:state.world.minute};
  const text = `Дарю тебе ${item.name}. Надеюсь, пригодится.`;
  appendDialogue(characterId,'player',text);
  state.giftHistory ||= {}; state.giftHistory[characterId] ||= [];
  state.giftHistory[characterId].unshift({name:item.name,day:state.world.day,price:item.price||0});
  state.metCharacters ||= []; if(!state.metCharacters.includes(characterId)) state.metCharacters.push(characterId);
  state.meetingHistory ||= {}; state.meetingHistory[characterId] ||= {firstDay:state.world.day,firstLocation:state.world.location,firstMinute:state.world.minute};
  const result = talkToCharacter(state,character,text);
  appendDialogue(characterId,'npc',result.reply);
  elements.modal.innerHTML = '';
  toast(`${item.name}: подарок передан ${character.name}.`);
  render();
}

const LOCATION_ALIASES = [
  ['main-street',['главную улицу','главной улице','главная улица','центральную улицу','центр деревни','центр']],
  ['ichiraku',['ичираку','лапшичную','лапшичная','за раменом']],
  ['flower-shop',['цветочную лавку','цветочная лавка','цветочный магазин','за цветами']],
  ['market',['на рынок','рынок','торговый квартал','магазины']],
  ['training',['тренировочную площадку','тренировочная площадка','полигон','на площадку']],
  ['hospital',['в больницу','больницу','больница','госпиталь','медицинский корпус','медкорпус']],
  ['hokage',['резиденцию хокаге','кабинет хокаге','резиденция хокаге','к хокаге']],
  ['tea-house',['чайный домик','чайную','чайная','домик у сада']],
  ['river',['берег реки','к реке','на реку','реку','набережную']],
  ['forest',['лесную тропу','лесная тропа','в лес','к лесу','лес']],
  ['memorial',['мемориальный парк','парк памяти','мемориал']],
  ['gate',['главные ворота','к воротам','на ворота','ворота']],
  ['library',['в библиотеку','библиотеку','библиотека','читальный зал','архив']],
  ['garden',['общественный сад','в сад','к саду','сад']],
  ['home',['домой','к себе домой','в свой дом','дом']],
  ['academy',['в академию','академию','академия','учебный двор']],
  ['campsite',['лесной привал','к привалу','в лагерь','лагерь','стоянку']]
].flatMap(([id,aliases])=>aliases.map(alias=>({id,alias}))).sort((a,b)=>b.alias.length-a.alias.length);

function findMentionedLocation(text) {
  const clean = String(text || '').toLowerCase().replace(/ё/g,'е');
  return LOCATION_ALIASES.find(entry=>clean.includes(entry.alias.replace(/ё/g,'е')))?.id || '';
}

function findMentionedLocations(text) {
  const clean=String(text||'').toLowerCase().replace(/ё/g,'е');
  const hits=LOCATION_ALIASES.map(entry=>({id:entry.id,index:clean.indexOf(entry.alias.replace(/ё/g,'е'))}))
    .filter(entry=>entry.index>=0).sort((a,b)=>a.index-b.index);
  const unique=[];
  for(const hit of hits) if(!unique.some(item=>item.id===hit.id)) unique.push(hit);
  return unique.map(item=>item.id);
}

function findMentionedCharacter(text) {
  const clean = String(text || '').toLocaleLowerCase('ru-RU').replace(/ё/g,'е');
  const variantsFor = name => {
    const base=name.toLocaleLowerCase('ru-RU').replace(/ё/g,'е');
    const variants=[base];
    if (/[ая]$/.test(base)) {
      const stem=base.slice(0,-1);
      variants.push(stem,`${stem}у`,`${stem}е`,`${stem}ой`,`${stem}ою`,`${stem}ы`,`${stem}и`);
    } else if (/[ео]$/.test(base)) {
      variants.push(base.slice(0,-1),base.slice(0,-1)+'е');
    }
    return [...new Set(variants)].filter(v=>v.length>=3).sort((a,b)=>b.length-a.length);
  };
  return CHARACTERS.find(character => state.unlocked.includes(character.id) && variantsFor(character.name).some(variant => clean.includes(variant))) || null;
}

function setActionResult(input,result) {
  state.ui.lastActionText = String(input).slice(0,420);
  state.ui.lastActionResult = result;
  addFeed(state,result);
}

function executeFreeAction(rawText) {
  const raw = String(rawText || '').trim().slice(0,420);
  if (!raw || !state) return;
  const clean = raw.toLowerCase().replace(/ё/g,'е');
  state.ui.lastActionText = raw;
  if (/(ищу работу|хочу устроиться|подработк|посмотреть вакансии|найти работу)/i.test(clean)) { state.ui.view='work'; state.ui.lastActionResult='Ты открываешь список доступных подработок. Выбери занятие, отправляйся по адресу и поговори с работодателем.'; addFeed(state,state.ui.lastActionResult); render(); return; }
  let resultParts = [];
  const foodOrderIntent = /(я\s+голоден|я\s+голодна|проголодал|заказал\s+еду|заказала\s+еду|заказываю\s+еду|хочу\s+заказать\s+(?:рамен|еду)|заказал\s+рамен|заказала\s+рамен|заказываю\s+рамен|покупаю\s+рамен|куплю\s+рамен|покупаю\s+еду|перекусить)/i.test(clean);
  if (foodOrderIntent) {
    if (state.world.location==='ichiraku') {
      const cost=18;
      if (state.player.stats.coins>=cost) {
        state.player.stats.coins-=cost;
        state.player.stats.stamina=Math.min(100,state.player.stats.stamina+18);
        tickAction(state,16);
        const ayameHere=getNpcLocation(state,'ayame')==='ichiraku';
        const serve=ayameHere?'Аяме принимает заказ и через несколько минут ставит перед тобой горячую миску.':'Через несколько минут перед тобой появляется горячая миска рамена.';
        const line=`Ты устраиваешься у стойки Ичираку и заказываешь рамен. ${serve} Бульон согревает, и голод наконец отпускает. Потрачено ${cost} рё.`;
        setActionResult(raw,line); render(); return;
      }
      const line='Ты уже выбрал, что заказать, но в кошельке не хватает рё. Можно взять что-то попроще или вернуться позже.';
      setActionResult(raw,line); render(); return;
    }
    const here=getLocation(state.world.location);
    const line=/заказал|заказала|заказываю/.test(clean)
      ? `Ты вспоминаешь о заказе, но здесь еду не подают. Сейчас ты в «${here.name}». За раменом можно зайти в Ичираку через карту.`
      : `Похоже, пора поесть. Сейчас ты в «${here.name}». В Ичираку можно заказать рамен, а дома проверить холодильник.`;
    tickAction(state,3); setActionResult(raw,line); render(); return;
  }
  const movement = /(?:^|\s)(иду|идем|идём|пойду|пойти|схожу|сходить|пошел|пошёл|пошла|направляюсь|отправляюсь|отправился|отправилась|двигаюсь|возвращаюсь|захожу|зайду|зайти|перехожу|перемещаюсь|прогуляюсь|бегу|подхожу|выхожу|вышел|вышла|ищу|навещаю|встречаю|посещаю|посетить)(?:\s|$)/i.test(clean);
  const mentionedCharacter = findMentionedCharacter(clean);
  const mentionedNpcPlace = mentionedCharacter ? getNpcLocation(state,mentionedCharacter.id) : '';
  const explicitLocation = findMentionedLocation(clean);
  const locationsInText = findMentionedLocations(clean);
  const destinationId = explicitLocation || (mentionedNpcPlace && /(?:иду|пойду|ищу|навещаю|встречаю|подхожу)/i.test(clean) ? mentionedNpcPlace : '');
  if (destinationId && (movement || /^(?:в|на|к)\s/.test(clean))) {
    const route = movement && locationsInText.length ? locationsInText : [destinationId];
    for (const stopId of route) {
      const destination = getLocation(stopId);
      if (travelTo(state,stopId)) {
        const local = CHARACTERS.find(item=>state.unlocked.includes(item.id) && getNpcLocation(state,item.id)===stopId);
        if (local) state.ui.sceneCharacterId=local.id;
        resultParts.push(`Ты направляешься в «${destination.name}». ${destination.desc}`);
      } else if (stopId===route[0]) resultParts.push(state.ui.travelFailure || `Ты не смог попасть в «${destination.name}».`);
    }
  }

  const character = mentionedCharacter;
  const waitForCharacter = character && /(жду|ожидаю|подожду|дожидаюсь|сижу и жду)/i.test(clean);
  if (waitForCharacter) {
    tickAction(state,20);
    const stillHere = getNpcLocation(state,character.id) === state.world.location;
    const line = stillHere
      ? `Ты остаёшься на месте. ${character.name} замечает тебя; можно поздороваться или спокойно объяснить, зачем ты хотел встретиться.`
      : `Ты подождал немного, но ${character.name} пока не появилась. Не стоит считать встречу назначенной — можно заняться своими делами и попробовать позже.`;
    state.ui.sceneCharacterId = stillHere ? character.id : state.ui.sceneCharacterId;
    setActionResult(raw,line); render(); return;
  }
  const observingCharacter = character && /(наблюдаю за|смотрю на|замечаю|издалека наблюдаю|оглядываюсь в сторону)/i.test(clean);
  if (observingCharacter) {
    const present = getNpcLocation(state,character.id) === state.world.location;
    tickAction(state,6);
    let line;
    if (!present) line = `Ты оглядываешься в поисках ${character.name}, но сейчас её не видно. Ты не знаешь, где она находится, пока не встретишь её или не спросишь напрямую.`;
    else {
      const mood = Number(state.bonds?.[character.id]?.irritation || 0);
      const style = character.style;
      line = mood >= 28
        ? `${character.name} замечает пристальный взгляд и хмурится. Похоже, сейчас лучше не нарушать её пространство.`
        : style === 'quiet' || style === 'gentle'
          ? `${character.name} замечает тебя краем глаза и слегка кивает, после чего возвращается к своим делам.`
          : style === 'sharp' || style === 'direct'
            ? `${character.name} замечает наблюдение и спокойно спрашивает: «Что-то хотел?»`
            : style === 'playful' || style === 'bold'
              ? `${character.name} ловит твой взгляд и с лёгкой усмешкой приподнимает бровь: «Ну? Есть причина так внимательно смотреть?»`
              : `${character.name} замечает тебя и ненадолго отвлекается от своих дел, ожидая, скажешь ли ты что-нибудь.`;
      state.ui.sceneCharacterId = character.id;
    }
    setActionResult(raw,line); render(); return;
  }
  const observing = !character && /(оглядываюсь|осматриваюсь|смотрю вокруг|осматриваю обстановку|прислушиваюсь|внимательно осматриваю|наблюдаю за прохожими)/i.test(clean);
  if (observing) {
    tickAction(state,8);
    const sceneNotes = {
      'main-street':'Улица живёт своим ритмом: торговцы выставляют товары, прохожие обсуждают новости, а у доски объявлений кто-то задержался прочитать свежую запись.',
      market:'На рынке шумно. Один торговец спорит о цене, другой раскладывает свежий товар; неподалёку висит объявление о подработке.',
      forest:'Лес кажется спокойным, но после дождя на земле хорошо видны следы животных и недавних путников. Ты не можешь пока сказать, кому они принадлежат.',
      training:'На площадке несколько шиноби отрабатывают базовые упражнения. Инструктор поправляет стойку ученика, а у мишеней никого нет.',
      hospital:'В коридоре слышны шаги медиков и тихие голоса. Персонал занят, поэтому лучше не мешать проходу.',
      library:'В читальном зале тихо. За дальним столом оставили раскрытый справочник, а библиотекарь разбирает стопку свитков.',
      memorial:'В саду почти нет посетителей. Ветер шевелит листья, а у каменной плиты лежат недавно принесённые цветы.',
      rooftop:'С высоты хорошо видны крыши и улицы. По движению людей можно понять, какие районы сейчас оживлённее.',
      garden:'В саду кто-то недавно полил клумбы. На скамье остался забытый платок; стоит отнести его смотрителю, а не забирать себе.',
      home:'Дома тихо. Можно осмотреть вещи, приготовить еду или привести комнату в порядок.'
    };
    const line = sceneNotes[state.world.location] || `Ты внимательно осматриваешь место. ${getLocation(state.world.location).desc} Ничего необычного пока не происходит.`;
    setActionResult(raw,line); render(); return;
  }
  if (!character && /(стучу в дверь|постучал в дверь|звоню в дверь|нажимаю на звонок)/i.test(clean)) {
    tickAction(state,5);
    const line = ['home','residential'].includes(state.world.location)
      ? 'Ты стучишь в дверь ближайшего дома. За ней слышится движение, но отвечают не сразу. Лучше назвать себя и объяснить, кого ищешь.'
      : 'Ты оглядываешься в поисках двери, но здесь нет жилого входа. Возможно, стоит направиться в жилой переулок.';
    setActionResult(raw,line); render(); return;
  }
  const speaksToCharacter = character && /(?:говорю|сказал|спрашиваю|спросил|поговорить|поговорю|обращаюсь|здороваюсь|приветствую|поздоровал|привет|здравствуй|зову|отвечаю|передаю|предлагаю помощь|помогаю|приглашаю|дарю|рассказываю|спрашиваю у)/i.test(clean);
  if (speaksToCharacter) {
    const currentNpcPlace=getNpcLocation(state,character.id);
    if (currentNpcPlace !== state.world.location) {
      const remoteLine=`${character.name} сейчас не здесь${currentNpcPlace?` — она находится в «${getLocation(currentNpcPlace).name}»`: ' и занята своими делами'}. Чтобы поговорить лично, отправляйся туда или напиши ей через смартфон, если вы уже обменялись контактами.`;
      setActionResult(raw,remoteLine); render(); return;
    }
    state.ui.sceneCharacterId = character.id;
    state.ui.targetId = character.id;
    state.ui.view = 'world';
    appendDialogue(character.id,'player',raw);
    const response = talkToCharacter(state,character,raw);
    appendDialogue(character.id,'npc',response.reply);
    const line = `${character.name} замечает тебя и отвечает: ${response.reply}`;
    state.ui.lastActionText = raw;
    state.ui.lastActionResult = line;
    addFeed(state,`${state.player.name}: ${raw}`);
    recordDailyProgress(state,'talk',1); gainSkillXP(state,'social',5);
    render();
    return;
  }

  if (character && !speaksToCharacter) {
    const currentNpcPlace = getNpcLocation(state,character.id);
    if (currentNpcPlace && state.world.location !== currentNpcPlace) {
      resultParts.push(`${character.name} сейчас находится в другом месте — ${getLocation(currentNpcPlace).name}. Напиши, что направляешься туда, чтобы встретиться.`);
      setActionResult(raw,resultParts.join(' ')); render(); return;
    }
    state.ui.sceneCharacterId = character.id;
    state.ui.targetId = character.id;
    state.ui.view = 'world';
    const approach = `Ты подходишь к ${character.name}. Она замечает тебя и готова поговорить.`;
    appendDialogue(character.id,'player',raw);
    appendDialogue(character.id,'npc',approach);
    state.ui.lastActionResult = approach;
    addFeed(state,`${state.player.name}: ${raw}`);
    render();
    return;
  }

  // Unscripted incidents become persistent optional story threads instead of generic flavour text.
  const lostMatch = raw.match(/(?:потерял|потеряла|обронил|обронила)\s+(?:свой\s+|свою\s+|свои\s+)?(свиток|ключи|сумку|кошел[её]к|документы|записку|перчатки)/i);
  if (lostMatch) {
    state.world.incidents ||= [];
    const itemName = lostMatch[1];
    const existing = state.world.incidents.find(item=>item.kind==='lost' && item.item.toLowerCase()===itemName.toLowerCase() && !item.resolved);
    if (!existing) {
      const incident={id:`lost-${Date.now()}`,kind:'lost',item:itemName,location:state.world.location,day:state.world.day,resolved:false};
      state.world.incidents.push(incident);
      state.scroll.unshift({id:incident.id,title:`Найти: ${itemName}`,desc:`Ты заметил пропажу в месте «${getLocation(state.world.location).name}». Вспомни, где видел вещь в последний раз, и осмотри подходящие места.`,kind:'incident',done:false,optional:true,incidentId:incident.id});
    }
    tickAction(state,8);
    resultParts.push(`Ты проверяешь вещи и понимаешь, что пропал предмет: ${itemName}. Последнее место, где ты точно помнишь его при себе, — «${getLocation(state.world.location).name}». Запись добавлена в свиток; можно вернуться по следам или спросить тех, кто был рядом.`);
    setActionResult(raw,resultParts.join(' ')); render(); return;
  }
  const brokenMatch = raw.match(/(?:случайно\s+)?(?:разбил|разбила|сломал|сломала|уронил|уронила)\s+(?:чужую\s+|чужой\s+|чужое\s+)?([а-яё-]{3,28})/i);
  if (brokenMatch) {
    state.world.incidents ||= [];
    const objectName=brokenMatch[1];
    const incident={id:`repair-${Date.now()}`,kind:'repair',item:objectName,location:state.world.location,day:state.world.day,resolved:false};
    state.world.incidents.push(incident);
    state.scroll.unshift({id:incident.id,title:`Разобраться с поломкой: ${objectName}`,desc:`Ты повредил вещь в месте «${getLocation(state.world.location).name}». Не скрывай случившееся: найди владельца и предложи исправить ущерб.`,kind:'incident',done:false,optional:true,incidentId:incident.id});
    tickAction(state,8);
    resultParts.push(`Ты замечаешь последствия неловкого движения: повреждена вещь (${objectName}). Убедись, что никто не пострадал, и честно сообщи владельцу. В свитке появилась необязательная запись, чтобы не забыть исправить ситуацию.`);
    setActionResult(raw,resultParts.join(' ')); render(); return;
  }

  const activityRules = [
    ['train',/(тренир|тренировка|отрабатываю прием|отрабатываю технику|контроль чакры)/i],
    ['search',/(осматрива|обыскива|ищу вещи|исследую|проверяю окрестности|собираю находки)/i],
    ['rest',/(отдыхаю|прилег|сажусь отдохнуть|расслабляюсь|сижу на скамейке)/i],
    ['meal',/(ем|перекусываю|заказываю рамен|обедаю|ужинаю|поесть)/i],
    ['focus',/(медитир|сосредоточиваюсь|концентрируюсь)/i],
    ['help',/(помогаю|помочь|поддерживаю|лечу|помогаю медикам)/i],
    ['cook',/(готовлю|приготовить еду|варю чай|готовлю бэнто)/i],
    ['read',/(читаю|изучаю свиток|изучаю книгу|занимаюсь в библиотеке)/i],
    ['garden',/(поливаю|ухаживаю за садом|сажаю цветы|собираю цветы)/i],
    ['tidy',/(убираю|наводю порядок|наводжу порядок|прибираюсь|мою пол|мою посуду|вытираю пыль)/i],
    ['read',/(учу|повторяю конспект|занимаюсь языком|пишу заметки)/i],
    ['garden',/(собираю урожай|сажаю рассаду|подстригаю кусты)/i]
  ];
  const activityTypes=activityRules.filter(([,pattern])=>pattern.test(clean)).map(([type])=>type);
  const openIncident=(state.world.incidents||[]).find(item=>!item.resolved);
  let incidentActionResolved=false;
  if (openIncident && activityTypes.includes('search')) {
    if (openIncident.kind==='lost' && state.world.location===openIncident.location) {
      openIncident.resolved=true;
      const incidentQuest=state.scroll.find(item=>item.incidentId===openIncident.id);
      if (incidentQuest) { incidentQuest.done=true; incidentQuest.completedDay=state.world.day; }
      addFeed(state,`Ты нашёл пропавшую вещь: ${openIncident.item}. Запись в свитке закрыта.`);
      resultParts.push(`После внимательного осмотра ты находишь ${openIncident.item}. Хорошо, что удалось вернуться в нужное место.`);
    } else if (openIncident.kind==='lost') {
      resultParts.push(`Здесь нет следов ${openIncident.item}. Последний раз вещь видели в «${getLocation(openIncident.location).name}».`);
    }
  }
  if (openIncident && openIncident.kind==='repair' && /(нахожу владельца|признаюсь владельцу|извиняюсь за поломку|предлагаю возместить|оплатить ущерб)/i.test(clean)) {
    openIncident.resolved=true;
    const incidentQuest=state.scroll.find(item=>item.incidentId===openIncident.id);
    if (incidentQuest) { incidentQuest.done=true; incidentQuest.completedDay=state.world.day; }
    resultParts.push('Ты честно объясняешь, что произошло, и предлагаешь исправить ущерб. Владелец не скрывает недовольства, но ценит, что ты не стал уходить от ответственности.');
    addFeed(state,'Ты признал случайную поломку и договорился исправить ущерб.');
    incidentActionResolved=true;
  }
  const pet = (state.pets || []).find(item => clean.includes(String(item.name||'').toLowerCase()) || /(питомц|животн|кот|собак|кролик|ястреб|черепах)/i.test(clean));
  if (pet && /(кормлю|накормил|накормлю|даю корм|кормить)/i.test(clean)) {
    pet.hunger = Math.max(0,(pet.hunger ?? 45)-35); pet.affection = Math.min(100,(pet.affection||0)+3); tickAction(state,8);
    resultParts.push(`Ты покормил ${pet.name}. Питомец спокойно доедает и выглядит довольным.`);
  } else if (pet && /(играю|поиграю|играть|бросаю мяч)/i.test(clean)) {
    pet.mood = Math.min(100,(pet.mood ?? 55)+18); pet.affection = Math.min(100,(pet.affection||0)+8); tickAction(state,12);
    resultParts.push(`Ты поиграл с ${pet.name}. Настроение питомца улучшилось, а доверие к тебе выросло.`);
  } else if (pet && /(гуляю|прогулк|вывожу|вожу гулять)/i.test(clean)) {
    pet.energy = Math.max(0,(pet.energy ?? 80)-12); pet.affection = Math.min(100,(pet.affection||0)+6); tickAction(state,18);
    resultParts.push(`Ты прогулялся с ${pet.name}. Свежий воздух пошёл вам обоим на пользу.`);
  }
  if (/(ложусь спать|иду спать|засыпаю|отправляюсь спать)/i.test(clean)) {
    sleepUntilMorning(state);
    resultParts.push('Ты устраиваешься поудобнее и отдыхаешь до утра.');
  }
  const purchaseMatch=/(покупаю|покупка|купить|приобретаю)/i.test(clean) && !/(заказываю рамен|заказываю еду)/i.test(clean);
  if (purchaseMatch) {
    if (!['market','flower-shop'].includes(state.world.location)) {
      resultParts.push('Для покупок отправляйся на рынок или в цветочную лавку. Здесь деньги не списываются.');
    } else {
    const price = state.world.location === 'flower-shop' ? 16 : 12;
    if (state.player.stats.coins >= price) {
      state.player.stats.coins -= price;
      const item = state.world.location === 'flower-shop'
        ? {id:'flower',name:'Букет цветов',desc:'Небольшой букет из цветочной лавки.',kind:'gift',qty:1}
        : {id:'tea',name:'Зелёный чай',desc:'Покупка с местного рынка.',kind:'gift',qty:1};
      addItem(state,item);
      tickAction(state,20);
      resultParts.push(`Покупка завершена: ${item.name}. Потрачено ${price} рё.`);
    } else resultParts.push('Не хватает рё на эту покупку. Можно поискать небольшую подработку или выбрать другое занятие.');
    }
  }
  for (const activityType of activityTypes) {
    if (activityType==='help' && state.world.location==='hospital') resultParts.push(doActivity(state,'clinic'));
    else resultParts.push(doActivity(state,activityType));
  }
  const petActionDone = Boolean(pet && /(кормлю|накормил|накормлю|даю корм|кормить|играю|поиграю|играть|бросаю мяч|гуляю|прогулк|вывожу|вожу гулять)/i.test(clean));
  if (!purchaseMatch && !activityTypes.length && !destinationId && !petActionDone && !incidentActionResolved) {
    tickAction(state,12);
    const place=getLocation(state.world.location);
    const contextual = /(сижу|сажусь|присел|присела|устраиваюсь)/i.test(clean) ? `Ты устраиваешься поудобнее в «${place.name}». Вокруг продолжается обычная жизнь деревни.`
      : /(жду|ожидаю|подожду)/i.test(clean) ? `Ты остаёшься в «${place.name}» и ждёшь. Проходит несколько минут; пока ничего не меняется.`
      : /(слушаю|прислушиваюсь)/i.test(clean) ? `Ты на минуту замолкаешь и прислушиваешься. ${place.desc}`
      : /(пишу|записываю|делаю заметки)/i.test(clean) ? `Ты находишь спокойное место и записываешь мысли, чтобы не забыть важные детали.`
      : `Ты занимаешься этим в «${place.name}». ${place.desc}`;
    resultParts.push(contextual);
  }

  const weatherLabels = {sunny:'светит солнце',rain:'идёт дождь',snow:'падает снег',wind:'дует ветер',cloudy:'небо затянуто облаками',fog:'улицы скрыты туманом'};
  const weatherRelevant = /(погод|дожд|снег|ветер|ветрено|холодно|жарко|на улице|прогул|осматрива|прислушива)/i.test(clean);
  const indoors = ['home','hospital','library','hokage','ichiraku','tea-house'].includes(state.world.location);
  if (weatherRelevant && !indoors && state.world.weather && weatherLabels[state.world.weather]) resultParts.push(`На улице ${weatherLabels[state.world.weather]}.`);
  const output = resultParts.join(' ') || `Ты продолжаешь свой день в ${getLocation(state.world.location).name}.`;
  setActionResult(raw,output);
  render();
}

function sendWorldDialogue(characterId,rawText) {
  const character = getCharacter(characterId);
  const text = String(rawText || '').trim().slice(0,500);
  if (!character || !state.unlocked.includes(character.id) || !text) return;
  const npcPlace = getNpcLocation(state,character.id);
  if (npcPlace !== state.world.location) {
    state.ui.lastActionText = text;
    state.ui.lastActionResult = `${character.name} сейчас не здесь. Она находится в ${npcPlace ? getLocation(npcPlace).name : 'другой части деревни'}. Напиши ей через смартфон или отправляйся туда.`;
    render(); toast('Персонаж сейчас в другой локации.'); return;
  }
  state.ui.sceneCharacterId = character.id;
  state.ui.targetId = character.id;
  if (!['world','conversation'].includes(state.ui.view)) state.ui.view = 'world';
  state.metCharacters ||= [];
  if (!state.metCharacters.includes(character.id)) state.metCharacters.push(character.id);
  state.meetingHistory ||= {};
  state.meetingHistory[character.id] ||= {firstDay:state.world.day,firstLocation:state.world.location,firstMinute:state.world.minute};
  state.gallerySeen ||= {characters:{},backgrounds:[]};
  state.gallerySeen.characters ||= {};
  state.gallerySeen.characters[character.id] ||= [];
  if (character.art?.[0]?.src && !state.gallerySeen.characters[character.id].includes(character.art[0].src)) state.gallerySeen.characters[character.id].push(character.art[0].src);
  state.ui.profileArtIndex = 0;
  appendDialogue(character.id,'player',text);
  const response = talkToCharacter(state,character,text);
  appendDialogue(character.id,'npc',response.reply);
  state.ui.lastActionText = text;
  state.ui.lastActionResult = `${character.name}: ${response.reply}`;
  addFeed(state,`${state.player.name} поговорил с ${character.name}.`);
  recordDailyProgress(state,'talk',1); gainSkillXP(state,'social',5);
  render();
}

function sendConversationAction(characterId,action) {
  const character=getCharacter(characterId);
  if (!character || !state.unlocked.includes(character.id)) return;
  if (getNpcLocation(state,character.id)!==state.world.location) {
    toast(`${character.name} сейчас не рядом.`);
    return;
  }
  const result=performConversationAction(state,character,action);
  if (!result?.playerText || !result?.reply) return;
  appendDialogue(character.id,'player',result.playerText);
  appendDialogue(character.id,'npc',result.reply);
  state.ui.targetId=character.id;
  state.ui.view='conversation';
  addFeed(state,`${state.player.name} использовал дружеский жест в разговоре с ${character.name}.`);
  recordDailyProgress(state,'talk',1); gainSkillXP(state,'social',2);
  render();
}

function publishPhonePost(rawText,platform='konohagram') {
  const text=String(rawText||'').trim().slice(0,400);
  if (!text) return;
  if (!state.phone) state.phone={tab:'feed',posts:[],messages:[],lastPostAction:0};
  state.phone.posts.unshift({id:`player-post-${Date.now()}`,authorId:null,text,platform,day:state.world.day,minute:state.world.minute,likes:0,liked:false,image:state.world.location==='main-street'?'assets/backgrounds/konoha-main.webp':getLocation(state.world.location).bg});
  state.phone.posts=state.phone.posts.slice(0,40);
  state.phone.app=platform;
  state.phone.tab='feed';
  addFeed(state,`Ты опубликовал новую запись в ${platform==='shinobix'?'ShinobiX':'Konohagram'}.`);
  render(); toast('Публикация размещена.');
}

function sendPhoneMessage(characterId,rawText) {
  const character=getCharacter(characterId);
  const text=String(rawText||'').trim().slice(0,500);
  if (!character || !state.unlocked.includes(character.id) || !text) return;
  if (!(state.bonds?.[character.id]?.meetings > 0)) { toast('Сначала познакомься с персонажем лично и обменяйся контактами.'); return; }
  appendDialogue(character.id,'player',text);
  const response=talkToCharacter(state,character,text);
  appendDialogue(character.id,'npc',response.reply);
  if (!state.phone) state.phone={tab:'messages',posts:[],messages:[],lastPostAction:0};
  state.phone.messages.push({characterId,from:'player',text,day:state.world.day,minute:state.world.minute});
  state.phone.messages.push({characterId,from:'npc',text:response.reply,day:state.world.day,minute:state.world.minute});
  state.phone.messages=state.phone.messages.slice(-80);
  state.phone.app='line';
  state.phone.tab='messages';
  addFeed(state,`Новое сообщение: ${character.name} ответила в KonohaLine.`);
  state.ui.view='phone'; render(); toast(`Сообщение отправлено ${character.name}.`);
}

function exportSave() {
  const blob = new Blob([JSON.stringify(state,null,2)],{type:'application/json'});
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'naruto-enot-garem-save.json';
  anchor.click();
  URL.revokeObjectURL(url);
  toast('Файл сохранения подготовлен.');
}


function renderEncounter() {
  const encounter = state?.encounter;
  if (!encounter) { elements.modal.innerHTML = ''; return; }
  const enemy = getEnemy(encounter.enemyId);
  const enemyPercent = Math.max(0,Math.min(100,encounter.hp / encounter.maxHp * 100));
  const playerPercent = Math.max(0,Math.min(100,encounter.playerHp));
  const ended = encounter.won || encounter.lost;
  const status = encounter.won ? 'Патруль завершён успешно' : encounter.lost ? 'Пришлось отступить' : 'Полевое столкновение';
  elements.modal.innerHTML = `<div class="modal-backdrop"><section class="modal-card battle-modal"><div class="modal-head"><div><div class="eyebrow">ПАТРУЛЬ · ${escapeHTML(getLocation(state.world.location).name)}</div><h3>${status}</h3></div><button class="close-button" data-action="close-encounter" aria-label="Закрыть">×</button></div>
    <div class="battle-scene"><img src="${enemy.image}" alt="${escapeHTML(enemy.name)}" loading="eager"><div class="battle-info"><div class="battle-role">${escapeHTML(enemy.role)}</div><h4>${escapeHTML(enemy.name)}</h4><p>${escapeHTML(enemy.description)}</p><span class="enemy-badge">${enemy.icon} ${escapeHTML(enemy.style)}</span><div class="battle-hp"><i style="width:${enemyPercent}%"></i></div><small>Силы противника: ${Math.max(0,encounter.hp)} / ${encounter.maxHp}</small><div class="battle-hp player-hp"><i style="width:${playerPercent}%"></i></div><small>Твоя стойкость: ${Math.max(0,encounter.playerHp)} / 100</small></div></div>
    <div class="battle-log">${encounter.log.slice(-3).map(line=>`<div>${escapeHTML(line)}</div>`).join('')}</div>
    ${encounter.won?`<div class="battle-reward">Победа! Получено ${enemy.reward} рё и +2 репутации. Территория снова в безопасности.</div>`:''}
    ${encounter.lost?`<div class="battle-reward">Ты решил не рисковать и отступил. Отдохни перед следующей вылазкой.</div>`:''}
    <div class="battle-actions">${ended?`<button class="btn btn-primary" data-action="close-encounter">Вернуться в Коноху</button>`:`<button class="btn btn-primary" data-action="combat-move" data-type="attack">⚔️ Обычная атака</button><button class="btn btn-soft" data-action="combat-move" data-type="technique">🌀 Техника чакры · 12</button><button class="btn btn-soft" data-action="combat-move" data-type="guard">🛡️ Защита</button><button class="btn btn-ghost" data-action="combat-move" data-type="retreat">↩ Отступить</button>`}</div>
    </section></div>`;
}

function startPatrol(enemyId='') {
  if (!state) return;
  const hp=Number(state.player.stats.hp??100);
  if (hp<=0) { toast('Сначала восстанови здоровье аптечкой.'); return; }
  const remote = ['forest','gate','campsite'].includes(state.world.location);
  const pool = remote ? ENEMIES : ENEMIES.filter(enemy=>enemy.id!=='stone-guardian');
  const requested = enemyId ? ENEMIES.find(item=>item.id===enemyId) : null;
  const enemy = requested || pool[(state.world.day*11 + state.world.actions*7 + Math.floor(state.world.minute/30)) % pool.length];
  state.encounter = {enemyId:enemy.id,hp:enemy.hp,maxHp:enemy.hp,playerHp:hp,log:[`Ты замечаешь: ${enemy.description}`],rounds:0,won:false,lost:false};
  tickAction(state,15);
  addFeed(state,`Патруль: встреча с противником «${enemy.name}».`);
  renderEncounter();
  persist();
}

function combatMove(move) {
  const encounter = state?.encounter;
  if (!encounter || encounter.won || encounter.lost) return;
  if (!['attack','technique','guard','retreat'].includes(move)) { toast('Выбери доступный боевой приём.'); return; }
  const enemy = getEnemy(encounter.enemyId);
  const stats = state.player.stats;
  if (move === 'retreat') {
    addFeed(state,`Ты отступил после встречи с «${enemy.name}», не рискуя продолжать бой.`);
    advanceTime(state,5);
    state.encounter = null;
    elements.modal.innerHTML = '';
    render();
    toast('Ты вернулся на безопасную территорию.');
    return;
  }
  let damage = 0;
  let counterScale = 1;
  if (move === 'attack') {
    const staminaBonus = stats.stamina >= 20 ? 5 : 0;
    damage = 11 + Math.floor(stats.focus/18) + staminaBonus;
    stats.stamina = Math.max(0,stats.stamina-5);
    encounter.log.push(`Ты проводишь точную атаку и наносишь ${damage} урона.`);
  } else if (move === 'technique') {
    if (stats.chakra < 12) { toast('Недостаточно чакры. Выбери атаку или защиту.'); return; }
    stats.chakra -= 12;
    damage = 19 + Math.floor(stats.chakra/22) + Math.floor(stats.focus/25);
    counterScale = 0.7;
    encounter.log.push(`Ты используешь контроль чакры и наносишь ${damage} урона.`);
  } else if (move === 'guard') {
    damage = 3;
    counterScale = 0.25;
    stats.focus = Math.min(100,stats.focus+4);
    encounter.log.push('Ты принимаешь защитную стойку и готовишься к ответному движению.');
  }
  encounter.hp = Math.max(0,encounter.hp-damage);
  encounter.rounds += 1;
  if (encounter.hp <= 0) {
    encounter.won = true;
    stats.coins += enemy.reward;
    stats.renown = Math.min(100,stats.renown+2);
    stats.stamina = Math.max(0,stats.stamina-3);
    recordDailyProgress(state,'patrol',1); gainSkillXP(state,'fieldcraft',8);
    addFeed(state,`Ты успешно завершил патруль и получил ${enemy.reward} рё.`);
  } else {
    const counter = Math.max(2,Math.round((enemy.attack + Math.floor(Math.random()*4))*counterScale));
    stats.hp = Math.max(0,(stats.hp??100)-counter);
    encounter.playerHp = stats.hp;
    stats.stamina = Math.max(0,stats.stamina-2);
    encounter.log.push(`${enemy.name} отвечает осторожным выпадом: здоровье снижено на ${counter}.`);
    if (encounter.playerHp <= 0) {
      encounter.lost = true;
      stats.stamina = Math.max(8,stats.stamina-8);
      encounter.log.push('Сил больше не хватает продолжать столкновение. Перед следующей вылазкой нужно восстановить здоровье.');
      addFeed(state,`Ты выбыл из патруля после столкновения с «${enemy.name}». Восстанови здоровье перед новой вылазкой.`);
    }
  }
  advanceTime(state,4);
  renderEncounter();
  persist();
}

function openSettings() { renderSettings(state); }

const TITLE_PREF_KEY = 'neg-title-preferences-v1';
function getTitlePreferences() {
  try { return {...{musicVolume:35,sfxVolume:55,animations:true},...JSON.parse(localStorage.getItem(TITLE_PREF_KEY)||'{}')}; }
  catch { return {musicVolume:35,sfxVolume:55,animations:true}; }
}
function openTitleSettings() {
  const prefs=getTitlePreferences();
  elements.modal.innerHTML = `<div class="modal-backdrop"><section class="modal-card settings-modal"><div class="modal-head"><div><div class="eyebrow">NARUTO ENOT GAREM</div><h3>Настройки</h3><small>Настройки меню не создают игровое сохранение.</small></div><button class="close-button" data-action="close-modal">×</button></div>
    <label class="setting-row"><span>Громкость музыки <output>${prefs.musicVolume}%</output></span><input type="range" min="0" max="100" value="${prefs.musicVolume}" data-title-setting="musicVolume"></label>
    <label class="setting-row"><span>Громкость эффектов <output>${prefs.sfxVolume}%</output></span><input type="range" min="0" max="100" value="${prefs.sfxVolume}" data-title-setting="sfxVolume"></label>
    <label class="setting-row"><span>Анимации интерфейса</span><input class="switch" type="checkbox" data-title-setting="animations" ${prefs.animations?'checked':''}></label>
    <div class="music-note"><b>Фоновая композиция</b><br>Japanese-style ambient · Pixabay, cornist. Трек открывается в библиотеке автора; MP3 не включён в проект.<br><a class="external-link" href="https://pixabay.com/music/ambient-japanese-style-ambient-475587/" target="_blank" rel="noopener">Открыть композицию на Pixabay ↗</a></div>
    <div class="settings-actions"><button class="btn btn-primary" data-action="close-modal">Готово</button></div></section></div>`;
}
function openTitleGallery() {
  const seen=state?.gallerySeen?.characters||{};
  const cards=CHARACTERS.map(character=>{
    const src=character.art?.[0]?.src||'';
    const wasSeen=(seen[character.id]||[]).includes(src);
    return `<button class="title-gallery-tile" data-action="view-art" data-src="${escapeHTML(src)}"><img src="${escapeHTML(src)}" alt="" loading="lazy"><span>${escapeHTML(character.name)}</span><small>${wasSeen?'Встречено в RP':'Портрет персонажа'}</small></button>`;
  }).join('');
  const seenScenes=state?.gallerySeen?.backgrounds||[];
  elements.modal.innerHTML=`<div class="modal-backdrop"><section class="modal-card title-gallery-modal"><div class="modal-head"><div><div class="eyebrow">АРХИВ КОНОХИ</div><h3>Галерея</h3><small>Портреты персонажей и сцены, встреченные в текущей истории.</small></div><button class="close-button" data-action="close-modal">×</button></div><div class="title-gallery-grid">${cards}</div><div class="title-gallery-scenes"><b>Сцены из твоей истории · ${seenScenes.length}</b><div>${seenScenes.length?seenScenes.map(src=>`<button data-action="view-art" data-src="${escapeHTML(src)}"><img src="${escapeHTML(src)}" alt="" loading="lazy"></button>`).join(''):'<p class="chat-hint">После начала истории посещённые локации появятся здесь.</p>'}</div></div></section></div>`;
}

function openArtViewer(src) {
  const safe = String(src||'').replace(/[<>"']/g,'');
  if (!safe) return;
  elements.modal.innerHTML = `<div class="art-viewer-backdrop" data-action="close-modal"><button class="art-viewer-close" data-action="close-modal" aria-label="Закрыть">×</button><img src="${safe}" alt="Иллюстрация" loading="eager"></div>`;
}

function importSaveFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(String(reader.result));
      if (!imported || imported.version !== 2 || !imported.player || !imported.world) throw new Error('Некорректное сохранение');
      state = imported;
      saveState(state);
      elements.modal.innerHTML = '';
      showScreen('game');
      toast('Сохранение загружено.');
    } catch (error) {
      toast('Не удалось прочитать этот файл сохранения.');
    }
  };
  reader.readAsText(file);
}

// Click delegation keeps the game modular and works with dynamically rendered cards.
document.addEventListener('click',event=>{
  const sample = event.target.closest('[data-sample]');
  if (sample?.dataset?.sample) { const input = document.querySelector('#world-action-form textarea[name=action]'); if (input) { input.value = sample.dataset.sample || ''; input.focus(); } return; }
  const button = event.target.closest('[data-action]');
  if (event.target.classList.contains('modal-backdrop')) { elements.modal.innerHTML = ''; return; }
  if (!button) return;
  const {action,id,type,hours,item} = button.dataset;
  if (action!=='view-art' && action!=='close-modal') playUiSound(action==='new-game'||action==='continue'?'success':'tap');
  switch (action) {
    case 'new-game': populateOrigins(); showScreen('creation'); updateCreatorPreview(); break;
    case 'random-name': { const field=document.getElementById('player-name'); if(field) field.value=randomPlayerName(); updateCreatorPreview(); break; }
    case 'random-character': randomizeCreator(); break;
    case 'continue': { const loaded = loadState(); if (loaded) { state=loaded; showScreen('game'); } else toast('Сохранение не найдено.'); break; }
    case 'home': showScreen('title'); break;
    case 'title-settings': openTitleSettings(); break;
    case 'open-gallery': openTitleGallery(); break;
    case 'exit-game': { const notice='Окно игры можно закрыть средствами браузера. Сохранение останется на этом устройстве.'; toast(notice); try { window.close(); } catch {} break; }
    case 'toggle-drawer': { const game=document.getElementById('game-screen'); game?.classList.toggle('drawer-open'); if(state) state.ui.drawerOpen=game?.classList.contains('drawer-open')||false; break; }
    case 'open-settings': if(state) switchView('settings'); else openTitleSettings(); break;
    case 'view-art': openArtViewer(button.dataset.src||''); break;
    case 'profile-art-prev': case 'profile-art-next': case 'profile-art-set': { const character=getCharacter(id); const arts=getUnlockedCharacterArts(state,character); if(!arts.length)break; const current=Number(state.ui.profileArtIndex)||0; const next=action==='profile-art-set'?Math.max(0,Math.min(arts.length-1,Number(button.dataset.index)||0)):(current+(action==='profile-art-next'?1:-1)+arts.length)%arts.length; state.ui.profileArtIndex=next; state.gallerySeen ||= {characters:{},backgrounds:[]}; state.gallerySeen.characters ||= {}; state.gallerySeen.characters[id] ||= []; const src=arts[next].src; if(!state.gallerySeen.characters[id].includes(src))state.gallerySeen.characters[id].push(src); render(); break; }
    case 'quest-tab': state.ui.questTab=id==='history'?'history':'active'; render(); break;
    case 'bag-filter': state.ui.bagTab=['all','food','gift','clothing','pet','material','other'].includes(id)?id:'all'; state.ui.selectedItemId=''; render(); break;
    case 'select-item': state.ui.selectedItemId=id; render(); break;
    case 'wardrobe-slot': { if(!CLOTHING_SLOTS.some(slot=>slot.id===id))break; state.ui.wardrobeSlot=id; state.ui.wardrobePreview={slot:id,itemId:state.player.equipment?.[id]||CLOTHING.find(item=>item.slot===id)?.id}; render(); break; }
    case 'wardrobe-cycle': { const result=cycleWardrobePreview(state,button.dataset.slot,button.dataset.dir); if(!result.ok){toast(result.message);break;} render(); break; }
    case 'wardrobe-reset-preview': state.ui.wardrobePreview=null; render(); break;
    case 'wardrobe-equip': { const result=equipClothing(state,id,button.dataset.slot); if(!result.ok){toast(result.message);break;} addFeed(state,`Надет предмет одежды: ${result.item.name}.`); render(); persist(); toast(`Надето: ${result.item.name}.`); break; }
    case 'buy-clothing': { const result=purchaseClothing(state,id,button.dataset.slot); if(!result.ok){toast(result.message);break;} addFeed(state,`Куплено и надето: ${result.item.name}.`); render(); persist(); toast(`Куплено: ${result.item.name}.`); break; }
    case 'wardrobe-preset': { const result=applyWardrobePreset(state,id); if(!result.ok){toast(result.message);break;} addFeed(state,`Применён комплект: ${id}.`); render(); persist(); toast('Комплект полностью надет.'); break; }
    case 'toggle-map-legend': state.ui.mapLegend=!state.ui.mapLegend; render(); break;
    case 'language-prev': case 'language-next': if(state) state.settings.languageIndex=0; toast('Пока доступен только русский язык.'); break;
    case 'home-storage': openHomeStorage(id); break;
    case 'open-wardrobe': elements.modal.innerHTML=''; state.ui.view='bag'; render(); break;
    case 'storage-put': { const item=state.inventory.find(entry=>entry.id===id&&entry.kind==='food'&&entry.qty>0); if(!item){toast('Подходящий продукт не найден.');break;} state.storage ||= {fridge:[]}; state.storage.fridge ||= []; if(removeItem(state,id,1)){const stored=state.storage.fridge.find(entry=>entry.id===id);if(stored)stored.qty++;else state.storage.fridge.push({...item,qty:1});openHomeStorage('fridge');persist();} break; }
    case 'storage-take': { state.storage ||= {fridge:[]}; const item=state.storage.fridge.find(entry=>entry.id===id&&entry.qty>0); if(!item)break; addItem(state,{...item,qty:1}); item.qty--; if(item.qty<=0)state.storage.fridge=state.storage.fridge.filter(entry=>entry.qty>0); openHomeStorage('fridge');persist();break; }
    case 'phone-app': state.phone.app=['home','konohagram','line','shinobix','scrolltube'].includes(id)?id:'home'; render(); break;
    case 'phone-tab': state.phone.tab=type==='messages'?'messages':'feed'; state.phone.app=type==='messages'?'line':'konohagram'; render(); break;
    case 'video-play': { state.phone.videoViews ||= []; if(!state.phone.videoViews.includes(id)) state.phone.videoViews.push(id); state.phone.activeVideo=id; addFeed(state,'Ты открыл видео на ScrollTube.'); render(); break; }
    case 'video-back': state.phone.activeVideo=''; render(); break;
    case 'phone-like': { const post=state.phone.posts.find(item=>item.id===id); if(post){post.liked=!post.liked;post.likes=Math.max(0,(post.likes||0)+(post.liked?1:-1));render();} break; }
    case 'buy-pet': { const pet=getPet(id); if(!pet) break; if((state.pets||[]).length>=5){toast('Можно завести не больше пяти питомцев.');break;} if(state.player.stats.coins<pet.price){toast('Не хватает рё.');break;} state.player.stats.coins-=pet.price; const names={ 'konoha-cat':['Мару','Юки','Сора'],'ninja-dog':['Ака','Кума','Рэй'],'white-rabbit':['Момо','Широ','Хана'],'courier-hawk':['Хая','Тори','Казэ'],'pond-turtle':['Каме','Тама','Нори'],'tanuki-companion':['Тану','Куру','Мидзу'],'red-fox':['Кицу','Юдзу','Ака'],'black-cat-companion':['Куро','Суми','Кагэ'],'white-cat-companion':['Широ','Юки','Момо'],'courier-crow':['Кара','Хая','Куро'],'pond-frog':['Гэро','Ао','Мидори']}; const choices=names[id]||['Тама']; const name=choices[Math.floor(Math.random()*choices.length)]; state.pets.push({...pet,uid:`pet-${Date.now()}`,name,affection:5,hunger:45,mood:55,energy:80}); addFeed(state,`В доме появился новый питомец: ${name} (${pet.kind}).`); render();toast(`${name} теперь твой питомец!`); break; }
    case 'pet-care': { const pet=state.pets.find(item=>item.uid===id); if(pet){ if(type==='feed'){pet.hunger=Math.max(0,(pet.hunger??45)-35);pet.affection=Math.min(100,(pet.affection||0)+3);tickAction(state,8);} else if(type==='walk'){pet.energy=Math.max(0,(pet.energy??80)-12);pet.affection=Math.min(100,(pet.affection||0)+6);tickAction(state,18);} else {pet.mood=Math.min(100,(pet.mood??55)+18);pet.affection=Math.min(100,(pet.affection||0)+8);tickAction(state,12);} addFeed(state,`Ты позаботился о питомце ${pet.name}.`); render();toast(`${pet.name} рад вниманию.`);} break; }
    case 'close-modal': elements.modal.innerHTML=''; break;
    case 'skip-time': skipTime(state,Number(hours)||1); render(); break;
    case 'sleep': sleepUntilMorning(state); render(); toast('Наступило утро.'); break;
    case 'travel': if (travelTo(state,id)) { const local = CHARACTERS.find(character=>state.unlocked.includes(character.id) && getNpcLocation(state,character.id)===id); state.ui.sceneCharacterId=local?.id || ''; state.ui.view='world'; state.ui.targetId=''; state.ui.drawerOpen=false; document.getElementById('game-screen')?.classList.remove('drawer-open'); render(); toast(`Ты прибыл(а) в ${getLocation(id).name}. Переход занял ${state.ui.lastTravelMinutes} мин.`); } else toast(state.ui.travelFailure||'Не удалось перейти в это место.'); break;
    case 'activity': doActivity(state,type); render(); break;
    case 'resolve-situation': { const result=resolveWorldSituation(state,id,type); toast(result.message); render(); break; }
    case 'craft-item': { const result=craftItem(state,id); toast(result.message); render(); break; }
    case 'use-crafted-item': { const result=useCraftedItem(state,id); toast(result.message); render(); break; }
    case 'patrol': startPatrol(); break;
    case 'scene-patrol': startPatrol(id); break;
    case 'combat-move': combatMove(type); break;
    case 'close-encounter': if(state.encounter && !state.encounter.won && !state.encounter.lost){combatMove('retreat');}else{state.encounter=null;elements.modal.innerHTML='';render();} break;
    case 'open-person': state.ui.view='profile'; state.ui.targetId=id; state.ui.sceneCharacterId=id; state.ui.profileArtIndex=0; render(); break;
    case 'open-conversation': {
      const character=getCharacter(id); if(!character)break;
      const where=getNpcLocation(state,character.id);
      if(where!==state.world.location){toast(`${character.name} сейчас не здесь.`);break;}
      state.ui.view='conversation'; state.ui.targetId=id;
      const opening=npcOpeningLine(state,character);
      if(opening) appendDialogue(character.id,'npc',opening);
      render(); break;
    }
    case 'conversation-gesture': sendConversationAction(state?.ui?.targetId,type); break;
    case 'back-profile': state.ui.view='profile'; state.ui.targetId=id; render(); break;
    case 'open-map-to-character': { const character=getCharacter(id); if(character){state.ui.view='map';state.ui.targetId=id;render();toast('Найди метку на карте. Точное личное расписание не раскрывается.');} break; }
    case 'invite-companion': { const character=getCharacter(id); const bond=state.bonds?.[id]||{}; if(!character)break; if((bond.friendship||0)<35||(bond.trust||0)<25){toast('Сначала укрепи дружбу и доверие.');break;} state.companions ||= []; if(!state.companions.includes(id)) state.companions.push(id); addFeed(state,`${character.name} согласилась войти в твой ближний круг и помогать с общими делами.`); render(); toast(`${character.name} теперь твоя спутница.`); break; }
    case 'romantic-date': { const result=completeRomanticDate(state,id,type); if(!result.ok){toast(result.message);break;} tickAction(state,35); appendDialogue(id,'player',`Предлагаю провести время вместе: ${({walk:'прогулка',tea:'чайная',flowers:'цветочная лавка',training:'тренировка',festival:'фестиваль',books:'библиотека'})[type]||'встреча'}.`); appendDialogue(id,'npc',result.message); render(); toast(result.message); break; }
    case 'romantic-confess': { const result=confessFeelings(state,id); if(result.ok) appendDialogue(id,'npc',result.message); render(); toast(result.message); break; }
    case 'romantic-initiative': { const result=resolveInitiative(state,id,type==='accept'); if(result.accepted) tickAction(state,30); appendDialogue(id,'npc',result.message); render(); toast(result.message); break; }
    case 'select-scene-character': state.ui.sceneCharacterId=id; render(); break;
    case 'back-people': state.ui.view='people'; state.ui.targetId=''; render(); break;
    case 'person-action': speakAsAction(id,type); break;
    case 'discover-magazine': {
      state.collectibles ||= {magazineFound:false,unlockedIssues:[],readPages:[]};
      if (state.world.location!=='library') { toast('Старый стеллаж находится в библиотеке.'); break; }
      if (state.collectibles.magazineFound) { toast('Ты уже нашёл альманах.'); break; }
      tickAction(state,10);
      state.collectibles.magazineFound=true;
      state.collectibles.unlockedIssues=['issue-01'];
      addFeed(state,'В библиотеке ты нашёл тонкий журнал без каталожного номера — «Листья и истории». Внутри есть пометки о других выпусках.');
      state.ui.view='magazine'; state.ui.targetId=''; render(); toast('Найден секретный альманах: «Листья и истории».'); break;
    }
    case 'find-magazine-issue': {
      state.collectibles ||= {magazineFound:false,unlockedIssues:[],readPages:[]};
      const issue=getMagazineIssue(id);
      if (!state.collectibles.magazineFound || !issue) { toast('Сначала найди первый выпуск в библиотеке.'); break; }
      if (state.world.location!==issue.foundAt) { toast(`Ищи этот выпуск в локации: ${getLocation(issue.foundAt).name}.`); break; }
      if (state.collectibles.unlockedIssues.includes(id)) { toast('Этот выпуск уже есть в коллекции.'); break; }
      if (id==='issue-03' && !state.collectibles.unlockedIssues.includes('issue-02')) { toast('Сначала найди второй выпуск в архиве.'); break; }
      tickAction(state,12);
      state.collectibles.unlockedIssues.push(id);
      addFeed(state,`Ты нашёл выпуск № ${issue.number}: «${issue.title}».`);
      state.ui.view='magazine'; render(); toast(`Найден выпуск № ${issue.number}!`); break;
    }
    case 'read-magazine': {
      state.collectibles ||= {magazineFound:false,unlockedIssues:[],readPages:[]};
      const page=getMagazinePage(id);
      if (!page || !state.collectibles.magazineFound) { toast('Страница не найдена.'); break; }
      const issueForPage = ['issue-01','issue-02','issue-03'].map(getMagazineIssue).find(issue=>issue?.pages.some(entry=>entry.id===id));
      if (!issueForPage || !state.collectibles.unlockedIssues.includes(issueForPage.id)) { toast('Этот выпуск ещё не найден.'); break; }
      if (state.collectibles.readPages.includes(id)) { toast('Эта страница уже прочитана.'); break; }
      state.collectibles.readPages.push(id);
      gainSkillXP(state,'knowledge',3);
      state.player.stats.focus=Math.min(100,(state.player.stats.focus||0)+2);
      addFeed(state,`Прочитана страница альманаха: «${page.title}».`);
      render(); toast('Страница прочитана. +3 опыта знаний и +2 внимания.'); break;
    }
    case 'secret-hint':
      if (state.world.secretClue && !state.unlocked.includes('haku')) {
        state.unlocked.push('haku'); state.ui.view='profile'; state.ui.targetId='haku';
        addFeed(state,'У старой беседки ты встретил Хаку — тихого путешественника. Секретная ветка открыта.');
        appendDialogue('haku','npc','Привет. Я Хаку. Надеюсь, моё появление не стало неожиданностью.');
        render(); toast('Открыт секретный персонаж: Хаку.');
      } else toast('Поищи подсказку на лесной тропе зимой.');
      break;
    case 'quest-complete': case 'quest-ignore': case 'quest-cancel': handleQuest(action,id); break;
    case 'choose-gift': openGiftPicker(id); break;
    case 'gift-to-person': giveItemToPerson(id,item); break;
    case 'use-food': {
      if (removeItem(state,id,1)) { state.player.stats.stamina=Math.min(100,state.player.stats.stamina+16); tickAction(state,10); addFeed(state,'Ты съел домашний бэнто и восстановил силы.'); toast('Перекус помог восстановиться.'); render(); }
      break;
    }
    case 'outfit': {
      const owned=state.player.ownedLooks||['casual','shinobi'];
      if(!['home','market'].includes(state.world.location)){toast('Переодеться можно дома или в магазине одежды.');break;}
      if(!owned.includes(id)){toast('Сначала купи этот наряд на рынке.');break;}
      const result=applyWardrobePreset(state,LOOK_TO_PRESET[id]||'casual');
      if(!result.ok){toast(result.message);break;}
      state.player.look=id; addFeed(state,`Ты переоделся в готовый комплект: ${button.textContent.trim()}.`); render(); persist(); toast('Комплект надет.'); break;
    }
    case 'buy-outfit': {
      const prices={festival:48,travel:36,raincoat:30,workwear:42}; const price=prices[id];
      if(state.world.location!=='market'){toast('Новые наряды продаются на рынке.');break;}
      if(!price){toast('Этот комплект нельзя купить.');break;}
      state.player.ownedLooks ||= ['casual','shinobi'];
      if(state.player.ownedLooks.includes(id)){toast('Этот наряд уже куплен.');break;}
      if(state.player.stats.coins<price){toast('Не хватает рё.');break;}
      state.player.stats.coins-=price; state.player.ownedLooks.push(id); const preset=PRESET_EQUIPMENT[LOOK_TO_PRESET[id]||'casual']; state.player.ownedClothing ||= [...STARTER_CLOTHING]; for(const clothingId of Object.values(preset)) if(!state.player.ownedClothing.includes(clothingId)) state.player.ownedClothing.push(clothingId); addFeed(state,`На рынке куплен готовый комплект: ${id}.`); render(); persist(); toast('Комплект добавлен в гардероб.'); break;
    }
    case 'visit-job': if(travelTo(state,id)){state.ui.view='work';render();} break;
    case 'apply-job': {const job=getJob(id);if(!job)break;if(state.world.location!==job.place){toast('Нужно прийти на место работы.');break;}state.player.jobId=id;render();toast(`Ты договорился о работе: ${job.name}.`);break;}
    case 'work-shift': {const job=getJob(id);if(!job||state.player.jobId!==id||state.world.location!==job.place){toast('Сначала выбери работу и приди на место.');break;}if(state.player.lastWorkDay!==state.world.day){state.player.lastWorkDay=state.world.day;state.player.workShifts=0;}if(state.player.workShifts>=2){toast('На сегодня смен достаточно.');break;}state.player.workShifts++;state.player.workShiftsTotal=(state.player.workShiftsTotal||0)+1;state.player.stats.coins+=job.wage;state.player.stats.stamina=Math.max(5,state.player.stats.stamina-14);tickAction(state,job.duration);recordDailyProgress(state,'work',1);gainSkillXP(state,'support',5);addFeed(state,`Смена завершена: ${job.name}. Получено ${job.wage} рё.`);render();toast(`Смена окончена. +${job.wage} рё.`);break;}
    case 'save-now': saveState(state); toast('Сохранение записано в браузер.'); break;
    case 'export-save': exportSave(); break;
    case 'import-save': document.getElementById('import-file')?.click(); break;
    case 'music': window.open(PIXABAY_TRACK,'_blank','noopener'); break;
    case 'reset-save':
      if (!state.settings.confirmReset || confirm('Удалить текущее сохранение и начать заново?')) { clearSave(); state=null; elements.modal.innerHTML=''; showScreen('title'); toast('Сохранение удалено.'); }
      break;
  }
});

document.addEventListener('click',event=>{
  // #app itself also carries data-view for CSS; only actual navigation buttons may switch pages.
  const nav = event.target.closest('button[data-view]');
  if (nav && state) { playUiSound('nav'); switchView(nav.dataset.view); }
});

document.addEventListener('submit',event=>{
  if (event.target.id === 'creation-form') {
    event.preventDefault();
    const form = new FormData(event.target);
    startGame({name:String(form.get('name')||'').trim() || randomPlayerName(),origin:form.get('origin'),style:form.get('style'),look:form.get('look'),mark:form.get('mark'),gender:form.get('gender'),age:form.get('age'),clan:form.get('clan'),chakra:form.get('chakra'),specialty:form.get('specialty'),hair:form.get('hair'),eyes:form.get('eyes'),goal:form.get('goal'),village:form.get('village'),signatureTool:form.get('signatureTool')});
  }
  if (event.target.id === 'world-action-form') {
    event.preventDefault();
    executeFreeAction(new FormData(event.target).get('action'));
    return;
  }
  if (event.target.id === 'world-dialogue-form') {
    event.preventDefault();
    const form = new FormData(event.target);
    sendWorldDialogue(form.get('characterId'),form.get('message'));
    return;
  }
  if (event.target.id === 'conversation-form') {
    event.preventDefault();
    const form = new FormData(event.target);
    sendWorldDialogue(state?.ui?.targetId,form.get('message'));
    return;
  }
  if (event.target.id === 'social-post-form') { event.preventDefault(); publishPhonePost(new FormData(event.target).get('post'),event.target.dataset.platform||'konohagram'); }
  if (event.target.id === 'phone-message-form') { event.preventDefault(); const data=new FormData(event.target); sendPhoneMessage(data.get('characterId'),data.get('message')); }
  if (event.target.classList?.contains?.('pet-name-form')) { event.preventDefault(); const pet=state.pets.find(item=>item.uid===event.target.dataset.petId); const name=String(new FormData(event.target).get('name')||'').trim().slice(0,20); if(pet&&name){pet.name=name;addFeed(state,`Ты выбрал новое имя для питомца: ${name}.`);render();toast('Имя питомца изменено.');} }
  if (event.target.id === 'assignment-form') { event.preventDefault(); assignPlan(event.target); }
  if (event.target.id === 'promise-form') { event.preventDefault(); addCustomPromise(new FormData(event.target).get('promise')); }
});

document.addEventListener('input',event=>{
  if (['player-name','player-gender','player-hair','player-look','player-clan'].includes(event.target.id)) updateCreatorPreview();
  if (event.target.dataset.titleSetting && ['musicVolume','sfxVolume'].includes(event.target.dataset.titleSetting)) {
    const output=event.target.parentElement?.querySelector('output'); if(output) output.textContent=`${event.target.value}%`;
    const prefs=getTitlePreferences(); prefs[event.target.dataset.titleSetting]=Number(event.target.value); localStorage.setItem(TITLE_PREF_KEY,JSON.stringify(prefs));
  }
});

document.addEventListener('change',event=>{
  if (event.target.id === 'player-origin') updateOriginNote();
  if (['player-name','player-gender','player-hair','player-look','player-clan'].includes(event.target.id)) updateCreatorPreview();
  if (event.target.dataset.titleSetting) {
    const prefs=getTitlePreferences(); const key=event.target.dataset.titleSetting;
    prefs[key]=event.target.type==='checkbox'?event.target.checked:Number(event.target.value);
    localStorage.setItem(TITLE_PREF_KEY,JSON.stringify(prefs)); return;
  }
  if (event.target.dataset.setting && state) {
    const key = event.target.dataset.setting;
    state.settings[key] = event.target.type === 'checkbox' ? event.target.checked : (event.target.type === 'range' ? Number(event.target.value) : event.target.value);
    if (state.ui.view === 'settings' && event.target.type !== 'range') render();
    else if (event.target.type === 'range') { const output=event.target.parentElement?.querySelector('output'); if(output) output.textContent=`${event.target.value}%`; persist(); }
    if (key==='animations') document.getElementById('app').dataset.motion=state.settings.animations?'on':'off';
    if (key==='textSize') document.getElementById('app').dataset.textSize=state.settings.textSize;
    if (key==='contrast') document.getElementById('app').dataset.contrast=state.settings.contrast;
    persist();
  }
  if (event.target.id === 'import-file') importSaveFile(event.target.files?.[0]);
});

window.addEventListener('beforeunload',persist);

// Minimal debug hooks allow repeatable smoke tests in a local browser; they are not required to play.
window.NEG_TEST = {
  start: () => { if (!state) startGame({name:'Тест',origin:'shinobi'}); else showScreen('game'); },
  state: () => state,
  render: () => render(),
  action: text => executeFreeAction(text),
  dialogue: (id,text) => sendWorldDialogue(id,text),
  randomize: () => randomizeCreator(),
  patrol: enemyId => startPatrol(enemyId || ''),
  combat: move => combatMove(move)
};

showScreen(state ? 'title' : 'title');
