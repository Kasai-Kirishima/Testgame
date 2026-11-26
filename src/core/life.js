import {WEATHER,SEASONS,LOCATIONS,getLocation} from '../data/world.js';
import {getBond,updateBond,addFeed,addItem} from './store.js';
import {CHARACTERS} from '../data/characters.js';

export function clockLabel(minute) {
  const h = Math.floor(minute / 60) % 24;
  const m = minute % 60;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
}

export function timePeriod(minute) {
  const h = Math.floor(minute / 60) % 24;
  if (h >= 5 && h < 11) return 'Утро';
  if (h >= 11 && h < 17) return 'День';
  if (h >= 17 && h < 21) return 'Вечер';
  return 'Ночь';
}

export function getWeather(state) { return WEATHER.find(item => item.id === state.world.weather) || WEATHER[0]; }
export function seasonLabel(state) { return SEASONS[state.world.season] || 'Весна'; }

function settleAssignments(state,day) {
  const pending = state.assignments.filter(item => !item.done && item.day < day);
  for (const assignment of pending) {
    assignment.done = true;
    const stats = state.player.stats;
    const reward = {
      cook: ['Приготовление еды', 'На кухне всё прошло спокойно. В доме теперь есть свежая еда.', () => { stats.stamina = Math.min(100,stats.stamina+8); addItem(state,{id:'bento',name:'Домашний бэнто',desc:'Свежий обед, приготовленный дома.',kind:'food',qty:1}); }],
      tidy: ['Уборка дома', 'В доме стало заметно уютнее и легче сосредоточиться.', () => { stats.focus = Math.min(100,stats.focus+6); }],
      shop: ['Покупки', 'Нужные продукты куплены. Расходы записаны в семейный список.', () => { stats.coins = Math.max(0,stats.coins-8); addItem(state,{id:'tea',name:'Зелёный чай',desc:'Ароматный чай для спокойного перерыва.',kind:'gift',qty:1}); }],
      study: ['Учёба', 'Вечером удалось разобрать несколько полезных заметок.', () => { stats.focus = Math.min(100,stats.focus+8); stats.chakra = Math.min(100,stats.chakra+3); }],
      train: ['Тренировка', 'Короткая тренировка улучшила контроль чакры.', () => { stats.chakra = Math.min(100,stats.chakra+7); stats.stamina = Math.max(0,stats.stamina-4); }],
      garden: ['Уход за садом', 'Растения политы, а на клумбе появились новые ростки.', () => { stats.renown = Math.min(100,stats.renown+1); addItem(state,{id:'flower',name:'Полевые цветы',desc:'Свежие цветы из сада.',kind:'gift',qty:1}); }],
      clinic: ['Помощь в больнице', 'Медицинскому корпусу стало немного легче после смены.', () => { stats.renown = Math.min(100,stats.renown+2); stats.focus = Math.min(100,stats.focus+3); }],
      rest: ['Отдых', 'Спокойный отдых помог восстановить силы.', () => { stats.stamina = Math.min(100,stats.stamina+14); }]
    }[assignment.task];
    if (reward) {
      reward[2]();
      addFeed(state,`${assignment.actorName}: ${reward[0]}. ${reward[1]}`);
      if (assignment.characterId) updateBond(state,assignment.characterId,{friendship:2,trust:2});
    }
  }
  state.assignments = state.assignments.filter(item => item.day >= day - 2);
}

export function advanceTime(state,minutes) {
  const oldDay = state.world.day;
  let total = state.world.minute + Math.max(0,minutes);
  while (total >= 1440) {
    total -= 1440;
    state.world.day += 1;
  }
  state.world.minute = total;
  if (state.world.day !== oldDay) {
    settleAssignments(state,state.world.day);
    for (const pet of (state.pets || [])) { pet.hunger = Math.min(100,(pet.hunger ?? 45)+18); pet.mood = Math.max(0,(pet.mood ?? 55)-5); pet.energy = Math.min(100,(pet.energy ?? 80)+12); }
    if ((state.world.day - 1) % 7 === 0 && state.world.day > 1) {
      state.world.season = (state.world.season + 1) % 4;
      addFeed(state,`Сезон сменился: наступила ${SEASONS[state.world.season].toLowerCase()}.`);
    }
    state.world.weather = WEATHER[(state.world.day + state.world.season * 2) % WEATHER.length].id;
  } else if (Math.random() < 0.12) {
    let pool = WEATHER;
    if (state.world.season === 1) pool = WEATHER.filter(item => item.id !== 'snow');
    if (state.world.season === 3) pool = WEATHER.filter(item => item.id !== 'rain');
    state.world.weather = pool[Math.floor(Math.random() * pool.length)].id;
  }
  updateNpcPositions(state,false);
  return state;
}

const WORLD_EVENTS = [
  {title:'Потерянная записка',desc:'На скамейке лежит записка. Можно отнести её в резиденцию или оставить на доске находок.',place:'main-street'},
  {title:'Суета на рынке',desc:'Торговцу нужна помощь с небольшими покупками. Это простой шанс проявить себя.',place:'market'},
  {title:'Разговор в саду',desc:'В саду кто-то ищет тихое место, чтобы подумать. Можно составить компанию.',place:'garden'},
  {title:'Командное испытание',desc:'На площадке собирают небольшую группу для упражнения на контроль чакры.',place:'training'},
  {title:'Смена в больнице',desc:'Медицинскому корпусу нужны дополнительные руки для повседневных дел.',place:'hospital'},
  {title:'Неизвестная тропа',desc:'После дождя заметны следы, ведущие к старой лесной беседке.',place:'forest'},
  {title:'Городская подготовка к празднику',desc:'На главной улице развешивают фонари. Можно помочь с украшениями.',place:'main-street'},
  {title:'Книжный обмен',desc:'В библиотеке собирают книги для обмена. Возможно, найдётся что-то интересное.',place:'library'}
];

function maybeAddWorldEvent(state) {
  if (state.world.actions === 0 || state.world.actions % 4 !== 0) return;
  const pending = state.scroll.some(item => item.kind === 'event' && !item.done);
  if (pending) return;
  const candidates = WORLD_EVENTS.filter(item => item.place === state.world.location);
  const pool = candidates.length ? candidates : WORLD_EVENTS;
  const event = pool[(state.world.day + state.world.actions + state.world.minute) % pool.length];
  state.scroll.unshift({...event,id:`event-${state.world.day}-${state.world.actions}`,kind:'event',done:false,optional:true});
  addFeed(state,`Новое событие: ${event.title}.`);
}

export function tickAction(state,minutes=20) {
  state.world.actions += 1;
  advanceTime(state,minutes);
  maybeAddWorldEvent(state);
  updateNpcPositions(state,false);
  maybePhonePost(state);
  return state;
}

export function skipTime(state,hours=1) {
  const safeHours = Math.max(1,Math.min(12,Number(hours)||1));
  advanceTime(state,safeHours * 60);
  addFeed(state,`Ты провёл время за своими делами. Сейчас ${timePeriod(state.world.minute)} · ${clockLabel(state.world.minute)}.`);
  return state;
}

export function sleepUntilMorning(state) {
  const minutes = (24 * 60 - state.world.minute) + 7 * 60;
  advanceTime(state,minutes);
  state.player.stats.stamina = Math.min(100,state.player.stats.stamina + 32);
  state.player.stats.focus = Math.min(100,state.player.stats.focus + 16);
  addFeed(state,`Ты хорошо отдохнул. Начался новый день — ${clockLabel(state.world.minute)}.`);
  return state;
}

export function travelTo(state,id) {
  const place = getLocation(id);
  if (state.world.location === id) return false;
  state.world.location = id;
  tickAction(state,18);
  addFeed(state,`Ты пришёл в место «${place.name}». ${place.desc}`);
  if (!Array.isArray(state.visitedLocations)) state.visitedLocations = [];
  if (!state.visitedLocations.includes(id)) {
    state.visitedLocations.push(id);
    const walk = state.scroll.find(item => item.id === 'first-walk' && !item.done);
    if (walk) {
      walk.progress = Math.min(walk.target || 3,state.visitedLocations.length);
      if (walk.progress >= (walk.target || 3)) { walk.done = true; addFeed(state,'Поручение «Осмотреть Коноху» завершено: ты посетил три разных места. Репутация выросла.'); state.player.stats.renown = Math.min(100,state.player.stats.renown+3); }
    }
  }
  if (id === 'hospital') {
    const clinic = state.scroll.find(item => item.id === 'clinic-help' && !item.done);
    if (clinic) clinic.visited = true;
  }
  if (id === 'forest' && state.world.season === 3 && !state.unlocked.includes('haku')) {
    state.world.secretClue = true;
    const clue = state.scroll.find(item => item.id === 'secret-trail');
    if (clue) { clue.hidden = false; clue.desc = 'Ты заметил следы у старой беседки. Поговори о них с местными.'; }
    addFeed(state,'На снегу видны аккуратные следы. Кто-то недавно проходил по тропе.');
  }
  return true;
}

export function doActivity(state,type) {
  const stats = state.player.stats;
  tickAction(state,25);
  let line = '';
  switch (type) {
    case 'rest': stats.stamina = Math.min(100,stats.stamina+18); stats.focus = Math.min(100,stats.focus+7); line = 'Ты немного отдохнул. Силы восстановлены.'; break;
    case 'meal':
      if (stats.coins >= 12) { stats.coins -= 12; stats.stamina = Math.min(100,stats.stamina+24); line = 'Горячий обед восстановил силы. Потрачено 12 рё.'; }
      else line = 'Не хватает рё на полноценный обед. Можно отдохнуть дома.';
      break;
    case 'train': stats.stamina = Math.max(0,stats.stamina-10); stats.chakra = Math.min(100,stats.chakra+9); stats.focus = Math.min(100,stats.focus+5); stats.renown = Math.min(100,stats.renown+1); line = 'Ты выполнил тренировочное упражнение на контроль чакры. Навыки немного улучшились.'; break;
    case 'help': stats.renown = Math.min(100,stats.renown+2); stats.focus = Math.min(100,stats.focus+3); addItem(state,{id:'herb',name:'Лечебная трава',desc:'Полезная находка для медицинского корпуса.',kind:'material',qty:1}); line = 'Ты помог местным жителям. Репутация выросла, а в сумке появилась лечебная трава.'; break;
    case 'search': {
      const drops = [
        {id:'tea',name:'Зелёный чай',desc:'Ароматный чай для спокойного перерыва.',kind:'gift'},
        {id:'flower',name:'Полевые цветы',desc:'Небольшой букет, собранный у дороги.',kind:'gift'},
        {id:'paper',name:'Качественная бумага',desc:'Подойдёт для записок и оригами.',kind:'gift'},
        {id:'herb',name:'Лечебная трава',desc:'Полезная находка для медицинского корпуса.',kind:'material'}
      ];
      const item = drops[Math.floor(Math.random()*drops.length)]; addItem(state,{...item,qty:1}); line = `Во время осмотра территории ты нашёл: ${item.name}.`; break;
    }
    case 'focus': stats.chakra = Math.min(100,stats.chakra+14); stats.focus = Math.min(100,stats.focus+8); line = 'Ты спокойно сосредоточился и восстановил контроль над чакрой.'; break;
    case 'barrier':
      if (stats.chakra >= 8) { stats.chakra -= 8; stats.focus = Math.min(100,stats.focus+5); line = 'Ты потренировал защитный барьер и безопасную эвакуацию команды. Упражнение завершено.'; }
      else line = 'Чакры маловато. Сначала отдохни или потренируй концентрацию.';
      break;
    case 'cook': addItem(state,{id:'bento',name:'Домашний бэнто',desc:'Простой обед, приготовленный дома.',kind:'food',qty:1}); stats.stamina = Math.min(100,stats.stamina+8); line = 'Ты приготовил бэнто. В сумке появился обед.'; break;
    case 'read': stats.focus = Math.min(100,stats.focus+10); stats.chakra = Math.min(100,stats.chakra+2); line = 'Чтение помогло отвлечься и узнать кое-что новое.'; break;
    case 'garden': stats.focus = Math.min(100,stats.focus+5); addItem(state,{id:'flower',name:'Полевые цветы',desc:'Свежие цветы из общественного сада.',kind:'gift',qty:1}); line = 'Ты помог в саду и собрал несколько свежих цветов.'; break;
    case 'clinic': {
      stats.renown = Math.min(100,stats.renown+2); stats.focus = Math.min(100,stats.focus+4);
      line = 'Ты помог медицинскому корпусу с повседневными делами.';
      const clinicQuest = state.scroll.find(item=>item.id==='clinic-help' && !item.done);
      if (clinicQuest && state.world.location==='hospital' && clinicQuest.visited) { clinicQuest.done=true; clinicQuest.completedDay=state.world.day; addFeed(state,'Поручение «Помощь медицинскому корпусу» выполнено: ты помог медикам на месте.'); }
      break;
    }
    case 'tidy': stats.focus = Math.min(100,stats.focus+7); line = 'Ты навёл порядок. Теперь дома приятнее находиться.'; break;
    default: line = 'Ты провёл время в Конохе.';
  }
  addFeed(state,line);
  return line;
}

export function assignDailyTask(state,actor,task) {
  const taskNames = {cook:'Приготовить еду',tidy:'Уборка дома',shop:'Сходить за покупками',study:'Заниматься в библиотеке',train:'Тренировка контроля чакры',garden:'Уход за садом',clinic:'Помочь в больнице',rest:'Отдых'};
  if (!taskNames[task]) return {ok:false,message:'Неизвестное занятие.'};
  const key = actor === 'player' ? 'player' : actor;
  const already = state.assignments.find(item => item.day === state.world.day && item.actorId === key && !item.done);
  if (already) {
    already.task = task;
    updateNpcPositions(state,true);
    addFeed(state,`${already.actorName}: план на день изменён.`);
    return {ok:true,message:`План изменён: ${already.actorName}.`};
  }
  const character = CHARACTERS.find(item => item.id === actor);
  const actorName = actor === 'player' ? state.player.name : (character?.name || 'Участник команды');
  state.assignments.push({id:`plan-${state.world.day}-${key}`,day:state.world.day,actorId:key,actorName,characterId:character?.id || null,task,done:false});
  updateNpcPositions(state,true);
  addFeed(state,`${actorName}: план на день — ${taskNames[task].toLowerCase()}.`);
  return {ok:true,message:`План назначен: ${actorName} — ${taskNames[task]}. Он будет выполнен после завершения дня.`};
}


export function getWorldMood(state) {
  const weather = getWeather(state);
  return `${seasonLabel(state).toLowerCase()}, ${weather.label.toLowerCase()}. ${weather.effect}`;
}

const NPC_LIKE_LOCATIONS = {
  ramen:['ichiraku','market'], cooking:['ichiraku','home'], help:['hospital','home'], медицина:['hospital'],
  цветы:['flower-shop','garden'], мода:['market','flower-shop'], разговоры:['tea-house','main-street'],
  стратегия:['library','hokage','gate'], тишина:['garden','tea-house','memorial'], чай:['tea-house','ichiraku'],
  книги:['library','tea-house'], исследования:['library','forest'], порядок:['hokage','library','home'],
  оригами:['library','tea-house'], сад:['garden','flower-shop'], природа:['forest','river','garden'],
  семья:['home','ichiraku'], праздники:['market','festival'], документы:['hokage','library'],
  дипломатия:['hokage','tea-house'], тренировки:['training','academy'], долг:['hokage','gate'],
  история:['library','memorial'], свитки:['library','hokage'], живопись:['garden','river'], прогулки:['garden','river','main-street'],
  цели:['academy','library'], музыка:['tea-house','market'], свобода:['river','forest'], состязания:['training','academy'],
  ветер:['gate','river'], ремесло:['market','academy'], путешествия:['gate','market'], спокойствие:['garden','tea-house'],
  забота:['hospital','home'], наблюдение:['memorial','garden','library'], розыгрыши:['market','training'], соревнования:['training','academy'],
  острая:['ichiraku','market'], вызовы:['training','gate'], честность:['tea-house','training'],
  умения:['academy','training'], красота:['flower-shop','market'], внимание:['library','garden'],
  снежинки:['forest','river'], травы:['forest','hospital'],
};

function npcPeriod(minute) {
  const hour = Math.floor(minute / 60) % 24;
  if (hour >= 5 && hour < 10) return 'morning';
  if (hour >= 10 && hour < 16) return 'day';
  if (hour >= 16 && hour < 21) return 'evening';
  return 'night';
}

function locationChoicesFor(character,period,state) {
  const choices = [];
  const add = id => { if (id && LOCATIONS.some(place=>place.id===id) && !choices.includes(id)) choices.push(id); };
  const assignment = state?.assignments?.find(item=>item.actorId===character.id && item.day===state.world.day && !item.done);
  const taskPlaces = {cook:['home','ichiraku'],tidy:['home'],shop:['market'],study:['library'],train:['training'],garden:['garden'],clinic:['hospital'],rest:['home','tea-house']};
  for (const id of (taskPlaces[assignment?.task] || [])) add(id);
  if (period === 'morning') add(character.startLocation);
  const likes = (character.likes || []).map(v=>String(v).toLowerCase());
  for (const like of likes) for (const id of (NPC_LIKE_LOCATIONS[like] || [])) add(id);
  if (period === 'day') add(character.startLocation);
  const temperamentSpots = {
    quiet:['garden','tea-house','library','memorial'], warm:['ichiraku','flower-shop','garden','home'],
    playful:['market','training','main-street','academy'], sharp:['training','gate','hokage','library'],
    direct:['hokage','training','hospital','gate'], wise:['library','memorial','tea-house','hokage'],
    formal:['hokage','library','hospital','academy'], bright:['flower-shop','market','garden','ichiraku'],
    gentle:['hospital','garden','tea-house','home'], mysterious:['forest','memorial','river','gate']
  };
  for (const id of (temperamentSpots[character.style] || [])) add(id);
  if (period === 'evening') {
    for (const id of ['ichiraku','tea-house','garden','river','market']) add(id);
  }
  if (period === 'night') {
    for (const id of ['home','tea-house','garden','ichiraku']) add(id);
  }
  for (const id of ['main-street','market','garden','tea-house','library','home','training','river','ichiraku','flower-shop','hospital','gate','academy','hokage','forest','memorial','campsite']) add(id);
  return choices;
}

/** Place at most one heroine/NPC in each location for the current schedule slot. */
export function updateNpcPositions(state,force=false) {
  if (!state) return {};
  const period = npcPeriod(state.world.minute);
  const stamp = `${state.world.day}:${period}`;
  if (!force && state.npcPeriod === stamp && state.npcLocations && Object.keys(state.npcLocations).length) return state.npcLocations;
  const available = CHARACTERS.filter(character => state.unlocked?.includes(character.id));
  // Characters with a player-assigned plan get priority so their task can influence their actual location.
  const hasPlan = character => state.assignments?.some(item=>item.actorId===character.id && item.day===state.world.day && !item.done);
  const planned = available.filter(hasPlan);
  const unplanned = available.filter(character=>!hasPlan(character));
  // Rotate each group independently so randomization never pushes assigned plans behind background NPCs.
  const seedBase = (Number(state.npcShuffle)||0) + state.world.day * 3 + ['morning','day','evening','night'].indexOf(period) * 5;
  const rotate = (list,seed) => list.length ? [...list.slice(seed % list.length),...list.slice(0,seed % list.length)] : [];
  const ordered = [...rotate(planned,seedBase),...rotate(unplanned,seedBase + 7)];
  const occupied = new Set();
  const positions = {};
  for (const character of ordered) {
    const options = locationChoicesFor(character,period,state);
    const seed = ((Number(state.npcShuffle)||0) + state.world.day * 31 + state.world.minute + character.id.length * 17) % Math.max(1,options.length);
    const rotated = [...options.slice(seed),...options.slice(0,seed)];
    const assignment = state.assignments?.find(item=>item.actorId===character.id && item.day===state.world.day && !item.done);
    const taskPlaces = {cook:['home','ichiraku'],tidy:['home'],shop:['market'],study:['library'],train:['training'],garden:['garden'],clinic:['hospital'],rest:['home','tea-house']};
    const assignedPlace = (taskPlaces[assignment?.task] || []).find(id=>!occupied.has(id));
    const destination = assignedPlace || rotated.find(id=>!occupied.has(id));
    if (!destination) continue; // Others are busy elsewhere; nobody is duplicated.
    positions[character.id] = destination;
    occupied.add(destination);
  }
  state.npcLocations = positions;
  state.npcPeriod = stamp;
  return positions;
}

export function getNpcLocation(state,characterId) {
  const character = CHARACTERS.find(item=>item.id===characterId);
  if (!character) return '';
  if (!state.npcLocations || !state.npcPeriod) updateNpcPositions(state,true);
  return state.npcLocations?.[characterId] || '';
}

function maybePhonePost(state) {
  if (!state.phone) state.phone = {tab:'feed',posts:[],messages:[],lastPostAction:0};
  if (state.world.actions < 2 || state.world.actions - (state.phone.lastPostAction || 0) < 3) return;
  const present = CHARACTERS.filter(character => state.npcLocations?.[character.id]);
  if (!present.length) return;
  const character = present[(state.world.day + state.world.actions + state.world.minute) % present.length];
  const topics = character.likes || ['дела'];
  const topic = topics[(state.world.actions + character.id.length) % topics.length];
  const lines = [
    `Небольшая пауза между делами. Сегодня думаю о теме: ${topic}.`,
    `Кто-нибудь знает хорошее место для ${topic}? Хочу сменить обстановку.`,
    `Сегодняшний день оказался насыщенным. Хорошо, что нашлось время для ${topic}.`,
    `Записка себе на будущее: не забывать про ${topic} и отдых.`
  ];
  state.phone.posts.unshift({id:`post-${state.world.day}-${state.world.actions}-${character.id}`,authorId:character.id,text:lines[(state.world.actions + state.world.day) % lines.length],day:state.world.day,minute:state.world.minute,likes:0,liked:false});
  state.phone.posts = state.phone.posts.slice(0,40);
  state.phone.lastPostAction = state.world.actions;
}

export function getLocationList() { return LOCATIONS; }
