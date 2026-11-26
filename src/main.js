import {CHARACTERS,getCharacter} from './data/characters.js';
import {ENEMIES,getEnemy} from './data/enemies.js';
import {ORIGINS,LOCATIONS,getLocation} from './data/world.js';
import {createInitialState,loadState,saveState,clearSave,addFeed,updateBond,removeItem,addItem} from './core/store.js';
import {talkToCharacter} from './core/gm.js';
import {travelTo,doActivity,skipTime,sleepUntilMorning,assignDailyTask,tickAction,updateNpcPositions,getNpcLocation} from './core/life.js';
import {getPet} from './data/pets.js';
import {renderView,renderStatus,populateOrigins,updateOriginNote,renderSettings,escapeHTML} from './ui/render.js';

const PIXABAY_TRACK = 'https://pixabay.com/music/ambient-japanese-style-ambient-475587/';
let state = loadState();
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
    'player-look':['casual','shinobi','festival','travel','raincoat'],
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
}

function persist() {
  if (state && state.settings.autosave) saveState(state);
}

function render() {
  if (!state) return;
  renderStatus(state);
  elements.view.innerHTML = renderView(state);
  document.getElementById('app').dataset.view = state.ui.view;
  document.getElementById('app').dataset.textSize = state.settings.textSize;
  document.getElementById('app').dataset.contrast = state.settings.contrast;
  document.getElementById('app').dataset.motion = state.settings.animations ? 'on' : 'off';
  if (state.ui.view === 'people') {
    const chat = document.getElementById('chat-log');
    if (chat) chat.scrollTop = chat.scrollHeight;
  }
  persist();
}

function showScreen(name) {
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
  state.ui.view = view;
  if (view !== 'profile') state.ui.targetId = '';
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
  const text = `Дарю тебе ${item.name}. Надеюсь, пригодится.`;
  appendDialogue(characterId,'player',text);
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
  let resultParts = [];
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
      } else if (stopId===route[0]) resultParts.push(`Ты уже находишься в месте «${destination.name}».`);
    }
  }

  const character = mentionedCharacter;
  const speaksToCharacter = character && /(?:говорю|сказал|спрашиваю|спросил|поговорить|поговорю|обращаюсь|здороваюсь|приветствую|поздоровал|привет|здравствуй|зову|отвечаю|передаю|предлагаю помощь|помогаю|приглашаю|дарю|рассказываю|спрашиваю у)/i.test(clean);
  if (speaksToCharacter) {
    state.ui.sceneCharacterId = character.id;
    state.ui.targetId = character.id;
    state.ui.view = 'profile';
    appendDialogue(character.id,'player',raw);
    const response = talkToCharacter(state,character,raw);
    appendDialogue(character.id,'npc',response.reply);
    const line = `${character.name} замечает тебя и отвечает: ${response.reply}`;
    state.ui.lastActionText = raw;
    state.ui.lastActionResult = line;
    addFeed(state,`${state.player.name}: ${raw}`);
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
    state.ui.view = 'profile';
    const approach = `Ты подходишь к ${character.name}. Она замечает тебя и готова поговорить.`;
    appendDialogue(character.id,'player',raw);
    appendDialogue(character.id,'npc',approach);
    state.ui.lastActionResult = approach;
    addFeed(state,`${state.player.name}: ${raw}`);
    render();
    return;
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
  const purchaseMatch=/(покупаю|покупка|купить|приобретаю|заказываю)/i.test(clean);
  if (purchaseMatch) {
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
  for (const activityType of activityTypes) {
    if (activityType==='help' && state.world.location==='hospital') resultParts.push(doActivity(state,'clinic'));
    else resultParts.push(doActivity(state,activityType));
  }
  const petActionDone = Boolean(pet && /(кормлю|накормил|накормлю|даю корм|кормить|играю|поиграю|играть|бросаю мяч|гуляю|прогулк|вывожу|вожу гулять)/i.test(clean));
  if (!purchaseMatch && !activityTypes.length && !destinationId && !petActionDone) {
    tickAction(state,12);
    resultParts.push(`Ты выполняешь задуманное: «${raw}». ${getLocation(state.world.location).desc}`);
  }

  const weatherLabels = {sunny:'светит солнце',rain:'идёт дождь',snow:'падает снег',wind:'дует ветер',cloudy:'небо затянуто облаками',fog:'улицы скрыты туманом'};
  if (state.world.weather && weatherLabels[state.world.weather]) resultParts.push(`Вокруг ${weatherLabels[state.world.weather]}.`);
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
  state.ui.view = 'profile';
  appendDialogue(character.id,'player',text);
  const response = talkToCharacter(state,character,text);
  appendDialogue(character.id,'npc',response.reply);
  state.ui.lastActionText = text;
  state.ui.lastActionResult = `${character.name}: ${response.reply}`;
  addFeed(state,`${state.player.name} поговорил с ${character.name}.`);
  render();
}

function publishPhonePost(rawText) {
  const text=String(rawText||'').trim().slice(0,220);
  if (!text) return;
  if (!state.phone) state.phone={tab:'feed',posts:[],messages:[],lastPostAction:0};
  state.phone.posts.unshift({id:`player-post-${Date.now()}`,authorId:null,text,day:state.world.day,minute:state.world.minute,likes:0,liked:false});
  state.phone.posts=state.phone.posts.slice(0,40);
  state.phone.tab='feed';
  addFeed(state,'Ты опубликовал новую запись в Konohagram.');
  render(); toast('Публикация размещена.');
}

function sendPhoneMessage(characterId,rawText) {
  const character=getCharacter(characterId);
  const text=String(rawText||'').trim().slice(0,500);
  if (!character || !state.unlocked.includes(character.id) || !text) return;
  appendDialogue(character.id,'player',text);
  const response=talkToCharacter(state,character,text);
  appendDialogue(character.id,'npc',response.reply);
  if (!state.phone) state.phone={tab:'messages',posts:[],messages:[],lastPostAction:0};
  state.phone.messages.push({characterId,from:'player',text,day:state.world.day,minute:state.world.minute});
  state.phone.messages.push({characterId,from:'npc',text:response.reply,day:state.world.day,minute:state.world.minute});
  state.phone.messages=state.phone.messages.slice(-80);
  state.phone.tab='messages';
  addFeed(state,`Новое сообщение: ${character.name} ответила в смартфоне.`);
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
  const remote = ['forest','gate','campsite'].includes(state.world.location);
  const pool = remote ? ENEMIES : ENEMIES.filter(enemy=>enemy.id!=='stone-guardian');
  const enemy = getEnemy(enemyId) || pool[(state.world.day + state.world.actions + Math.floor(Math.random()*pool.length)) % pool.length];
  state.encounter = {enemyId:enemy.id,hp:enemy.hp,maxHp:enemy.hp,playerHp:100,log:[`Ты замечаешь: ${enemy.description}`],rounds:0,won:false,lost:false};
  tickAction(state,15);
  addFeed(state,`Патруль: встреча с противником «${enemy.name}».`);
  renderEncounter();
  persist();
}

function combatMove(move) {
  const encounter = state?.encounter;
  if (!encounter || encounter.won || encounter.lost) return;
  const enemy = getEnemy(encounter.enemyId);
  const stats = state.player.stats;
  if (move === 'retreat') {
    addFeed(state,`Ты отступил после встречи с «${enemy.name}», не рискуя продолжать бой.`);
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
    addFeed(state,`Ты успешно завершил патруль и получил ${enemy.reward} рё.`);
  } else {
    const counter = Math.max(2,Math.round((enemy.attack + Math.floor(Math.random()*4))*counterScale));
    encounter.playerHp = Math.max(0,encounter.playerHp-counter);
    stats.stamina = Math.max(0,stats.stamina-2);
    encounter.log.push(`${enemy.name} отвечает осторожным выпадом: стойкость снижена на ${counter}.`);
    if (encounter.playerHp <= 0) {
      encounter.lost = true;
      stats.stamina = Math.max(8,stats.stamina-8);
      addFeed(state,`Ты завершил тренировочное столкновение отступлением от «${enemy.name}».`);
    }
  }
  renderEncounter();
  persist();
}

function openSettings() { renderSettings(state); }

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
  switch (action) {
    case 'new-game': populateOrigins(); showScreen('creation'); break;
    case 'random-name': { const field=document.getElementById('player-name'); if(field) field.value=randomPlayerName(); break; }
    case 'random-character': randomizeCreator(); break;
    case 'continue': { const loaded = loadState(); if (loaded) { state=loaded; showScreen('game'); } else toast('Сохранение не найдено.'); break; }
    case 'home': showScreen('title'); break;
    case 'open-settings': switchView('settings'); break;
    case 'phone-tab': state.phone.tab=type==='messages'?'messages':'feed'; render(); break;
    case 'phone-like': { const post=state.phone.posts.find(item=>item.id===id); if(post){post.liked=!post.liked;post.likes=Math.max(0,(post.likes||0)+(post.liked?1:-1));render();} break; }
    case 'buy-pet': { const pet=getPet(id); if(!pet) break; if((state.pets||[]).length>=5){toast('Можно завести не больше пяти питомцев.');break;} if(state.player.stats.coins<pet.price){toast('Не хватает рё.');break;} state.player.stats.coins-=pet.price; const names={ 'konoha-cat':['Мару','Юки','Сора'],'ninja-dog':['Ака','Кума','Рэй'],'white-rabbit':['Момо','Широ','Хана'],'courier-hawk':['Хая','Тори','Казэ'],'pond-turtle':['Каме','Тама','Нори']}; const choices=names[id]||['Тама']; const name=choices[Math.floor(Math.random()*choices.length)]; state.pets.push({...pet,uid:`pet-${Date.now()}`,name,affection:5,hunger:45,mood:55,energy:80}); addFeed(state,`В доме появился новый питомец: ${name} (${pet.kind}).`); render();toast(`${name} теперь твой питомец!`); break; }
    case 'pet-care': { const pet=state.pets.find(item=>item.uid===id); if(pet){ if(type==='feed'){pet.hunger=Math.max(0,(pet.hunger??45)-35);pet.affection=Math.min(100,(pet.affection||0)+3);tickAction(state,8);} else if(type==='walk'){pet.energy=Math.max(0,(pet.energy??80)-12);pet.affection=Math.min(100,(pet.affection||0)+6);tickAction(state,18);} else {pet.mood=Math.min(100,(pet.mood??55)+18);pet.affection=Math.min(100,(pet.affection||0)+8);tickAction(state,12);} addFeed(state,`Ты позаботился о питомце ${pet.name}.`); render();toast(`${pet.name} рад вниманию.`);} break; }
    case 'close-modal': elements.modal.innerHTML=''; break;
    case 'skip-time': skipTime(state,Number(hours)||1); render(); break;
    case 'sleep': sleepUntilMorning(state); render(); toast('Наступило утро.'); break;
    case 'travel': if (travelTo(state,id)) { const local = CHARACTERS.find(character=>state.unlocked.includes(character.id) && getNpcLocation(state,character.id)===id); state.ui.sceneCharacterId=local?.id || ''; render(); } else toast('Ты уже находишься здесь.'); break;
    case 'activity': doActivity(state,type); render(); break;
    case 'patrol': startPatrol(); break;
    case 'scene-patrol': startPatrol(id); break;
    case 'combat-move': combatMove(type); break;
    case 'close-encounter': state.encounter=null; elements.modal.innerHTML=''; render(); break;
    case 'open-person': state.ui.view='profile'; state.ui.targetId=id; state.ui.sceneCharacterId=id; render(); break;
    case 'select-scene-character': state.ui.sceneCharacterId=id; render(); break;
    case 'back-people': state.ui.view='people'; state.ui.targetId=''; render(); break;
    case 'person-action': speakAsAction(id,type); break;
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
    case 'outfit': state.player.look=id; addFeed(state,`Ты переоделся: ${button.textContent.trim()}.`); render(); toast('Одежда изменена.'); break;
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
  if (nav && state) switchView(nav.dataset.view);
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
  if (event.target.id === 'chat-form') {
    event.preventDefault();
    const form = new FormData(event.target);
    const character = getCharacter(form.get('characterId'));
    const text = String(form.get('message') || '').trim();
    if (!character || !text) return;
    appendDialogue(character.id,'player',text);
    const result = talkToCharacter(state,character,text);
    appendDialogue(character.id,'npc',result.reply);
    render();
  }
  if (event.target.id === 'social-post-form') { event.preventDefault(); publishPhonePost(new FormData(event.target).get('post')); }
  if (event.target.id === 'phone-message-form') { event.preventDefault(); const data=new FormData(event.target); sendPhoneMessage(data.get('characterId'),data.get('message')); }
  if (event.target.classList?.contains?.('pet-name-form')) { event.preventDefault(); const pet=state.pets.find(item=>item.uid===event.target.dataset.petId); const name=String(new FormData(event.target).get('name')||'').trim().slice(0,20); if(pet&&name){pet.name=name;addFeed(state,`Ты выбрал новое имя для питомца: ${name}.`);render();toast('Имя питомца изменено.');} }
  if (event.target.id === 'assignment-form') { event.preventDefault(); assignPlan(event.target); }
  if (event.target.id === 'promise-form') { event.preventDefault(); addCustomPromise(new FormData(event.target).get('promise')); }
});

document.addEventListener('change',event=>{
  if (event.target.id === 'player-origin') updateOriginNote();
  if (event.target.dataset.setting && state) {
    const key = event.target.dataset.setting;
    state.settings[key] = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    if (state.ui.view === 'settings') render(); else renderSettings(state);
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
  randomize: () => randomizeCreator()
};

showScreen(state ? 'title' : 'title');
