import {STARTER_CLOTHING,normalizeEquipment} from '../data/clothing.js';
import {ORIGINS} from '../data/world.js';
import {CHARACTERS} from '../data/characters.js';

export const SAVE_KEY = 'naruto-enot-garem-save-v2';

export function createInitialState(player = {}) {
  const origin = ORIGINS.find(item => item.id === player.origin) || ORIGINS[0];
  const unlocked = CHARACTERS.filter(character => !character.secret).map(character => character.id);
  return {
    version: 2,
    started: true,
    player: {
      name: String(player.name || 'Рэн').trim().slice(0, 22) || 'Рэн',
      origin: origin.id,
      originName: origin.name,
      style: player.style || 'balanced',
      look: player.look || 'casual',
      equipment: normalizeEquipment(player.equipment,player.look||'casual'),
      ownedClothing: [...new Set([...STARTER_CLOTHING,...(Array.isArray(player.ownedClothing)?player.ownedClothing:[]),...Object.values(normalizeEquipment(player.equipment,player.look||'casual'))])],
      ownedLooks: Array.isArray(player.ownedLooks) ? [...new Set([...player.ownedLooks, player.look || 'casual'])] : [...new Set(['casual','shinobi',player.look || 'casual'])],
      jobId: player.jobId || '',
      workShifts: Number(player.workShifts)||0,
      workShiftsTotal: Math.max(0,Number(player.workShiftsTotal)||0),
      lastWorkDay: Number(player.lastWorkDay)||0,
      mark: player.mark || 'none',
      gender: player.gender || 'male',
      age: Math.max(18,Math.min(40,Number(player.age)||20)),
      clan: player.clan || 'none',
      chakraNature: player.chakra || 'balanced',
      specialty: player.specialty || 'none',
      hair: player.hair || 'medium',
      eyes: player.eyes || 'Карие',
      goal: player.goal || 'protect',
      village: player.village || 'konoha',
      signatureTool: player.signatureTool || 'kunai',
      stats: {...origin.stats, hp:100, stamina: origin.stats.stamina, chakra: origin.stats.chakra, focus: origin.stats.focus}
    },
    world: {location:'main-street',day:1,minute:8*60,season:0,weather:'sunny',actions:0},
    dailyBoard: null,
    dailyBoardHistory: [],
    skills: {chakra:{xp:0,level:1},fieldcraft:{xp:0,level:1},support:{xp:0,level:1},knowledge:{xp:0,level:1},social:{xp:0,level:1},craft:{xp:0,level:1}},
    bonds: {},
    metCharacters: [],
    gallerySeen: {},
    achievements: {unlocked:[],points:0},
    collectibles: {magazineFound:false,unlockedIssues:[],readPages:[]},
    giftHistory: {},
    meetingHistory: {},
    knownNames: {},
    dialogueMeta: {},
    companions: [],
    memories: {},
    dialogues: {},
    storage: {fridge:[]},
    inventory: [
      {id:'tea',name:'Зелёный чай',desc:'Ароматный чай для спокойного перерыва.',qty:2,kind:'gift'},
      {id:'flower',name:'Полевые цветы',desc:'Небольшой букет, собранный у дороги.',qty:1,kind:'gift'},
      {id:'paper',name:'Качественная бумага',desc:'Подойдёт для записок и оригами.',qty:2,kind:'gift'},
      {id:'herb',name:'Лечебная трава',desc:'Полезная находка для медицинского корпуса.',qty:1,kind:'material'},
      {id:'bento',name:'Домашний бэнто',desc:'Простой обед, приготовленный заранее.',qty:1,kind:'food'}
    ],
    scroll: [
      {id:'first-walk',title:'Осмотреть Коноху',desc:'Посети три разных места и узнай, чем живёт деревня.',kind:'task',done:false,optional:true,progress:1,target:3},
      {id:'clinic-help',title:'Помощь медицинскому корпусу',desc:'Загляни в больницу и помоги с повседневными делами.',kind:'task',done:false,optional:true},
      {id:'secret-trail',title:'След на заснеженной тропе',desc:'Поищи необычные следы в лесу. Возможно, встретится редкий путешественник.',kind:'mystery',done:false,optional:true,hidden:true}
    ],
    feed: ['Ты прибыл в Коноху. Впереди целая деревня, полная незнакомых историй.'],
    unlocked,
    assignments: [],
    npcLocations: {},
    npcPeriod: '',
    visitedLocations: ['main-street'],
    discoveredLocations: [],
    npcShuffle: Math.floor(Math.random()*100000),
    pets: [],
    phone: {app:'home',tab:'feed',posts:[],messages:[],videoViews:[],activeVideo:'',lastPostAction:0},
    settings: {autosave:true,animations:true,textSize:'normal',contrast:'normal',musicLink:true,confirmReset:true,showNames:true,musicVolume:55,effectVolume:70,languageIndex:0,romanceFadeToBlack:true,hideSensitiveText:true},
    ui: {screen:'world',view:'world',targetId:'',sceneCharacterId:'hinata',lastActionText:'',lastActionResult:'Ты прибыл в Коноху. Напиши, куда хочешь пойти, что сделать или с кем поговорить.',showHelp:true,drawerOpen:false,questTab:'active',bagTab:'all',selectedItemId:'',profileArtIndex:0}
  };
}

export function normalizeState(input) {
  const base = createInitialState(input?.player || {});
  if (!input || typeof input !== 'object') return base;
  return {
    ...base,
    ...input,
    knownNames: input.knownNames && typeof input.knownNames === 'object' ? input.knownNames : {},
    metCharacters: Array.isArray(input.metCharacters) ? input.metCharacters : Object.keys(input.bonds||{}).filter(id=>(input.bonds?.[id]?.meetings||0)>0),
    gallerySeen: input.gallerySeen && typeof input.gallerySeen === 'object' ? input.gallerySeen : {},
    achievements: {unlocked:Array.isArray(input.achievements?.unlocked)?input.achievements.unlocked:[],points:Math.max(0,Number(input.achievements?.points)||0)},
    collectibles: {magazineFound:Boolean(input.collectibles?.magazineFound),unlockedIssues:Array.isArray(input.collectibles?.unlockedIssues)?input.collectibles.unlockedIssues:[],readPages:Array.isArray(input.collectibles?.readPages)?input.collectibles.readPages:[]},
    giftHistory: input.giftHistory && typeof input.giftHistory === 'object' ? input.giftHistory : {},
    meetingHistory: input.meetingHistory && typeof input.meetingHistory === 'object' ? input.meetingHistory : {},
    dialogueMeta: input.dialogueMeta && typeof input.dialogueMeta === 'object' ? input.dialogueMeta : {},
    companions: Array.isArray(input.companions) ? input.companions : [],
    player: {...base.player,...input.player,equipment:normalizeEquipment(input.player?.equipment,input.player?.look||base.player.look),ownedClothing:[...new Set([...STARTER_CLOTHING,...(Array.isArray(input.player?.ownedClothing)?input.player.ownedClothing:[]),...Object.values(normalizeEquipment(input.player?.equipment,input.player?.look||base.player.look))])],ownedLooks:Array.isArray(input.player?.ownedLooks)?[...new Set([...input.player.ownedLooks,input.player?.look||base.player.look])]:[...new Set([...base.player.ownedLooks,input.player?.look||base.player.look])],workShifts:Number(input.player?.workShifts)||0,workShiftsTotal:Math.max(0,Number(input.player?.workShiftsTotal)||0),lastWorkDay:Number(input.player?.lastWorkDay)||0,stats:{...base.player.stats,...input.player?.stats,hp:Number(input.player?.stats?.hp??base.player.stats.hp)}},
    world: {...base.world,...input.world},
    dailyBoard: input.dailyBoard && typeof input.dailyBoard==='object' ? input.dailyBoard : base.dailyBoard,
    dailyBoardHistory: Array.isArray(input.dailyBoardHistory) ? input.dailyBoardHistory.slice(0,14) : [],
    skills: {...base.skills,...(input.skills||{})},
    settings: {...base.settings,...input.settings},
    ui: {...base.ui,...input.ui,wardrobeSlot:['head','top','outer','bottom','shoes','accessory'].includes(input.ui?.wardrobeSlot)?input.ui.wardrobeSlot:'top',wardrobePreview:input.ui?.wardrobePreview&&typeof input.ui.wardrobePreview==='object'?input.ui.wardrobePreview:null,drawerOpen:false,questTab:['active','history'].includes(input.ui?.questTab)?input.ui.questTab:'active',bagTab:['all','food','gift','clothing','material','other'].includes(input.ui?.bagTab)?input.ui.bagTab:'all',profileArtIndex:Math.max(0,Number(input.ui?.profileArtIndex)||0)},
    bonds: input.bonds && typeof input.bonds === 'object' ? input.bonds : {},
    memories: input.memories && typeof input.memories === 'object' ? input.memories : {},
    dialogues: input.dialogues && typeof input.dialogues === 'object' ? input.dialogues : {},
    inventory: Array.isArray(input.inventory) ? input.inventory : base.inventory,
    scroll: Array.isArray(input.scroll) ? input.scroll : base.scroll,
    feed: Array.isArray(input.feed) ? input.feed : base.feed,
    unlocked: Array.isArray(input.unlocked) ? input.unlocked : base.unlocked,
    assignments: Array.isArray(input.assignments) ? input.assignments : [],
    npcLocations: input.npcLocations && typeof input.npcLocations === 'object' ? input.npcLocations : {},
    npcPeriod: typeof input.npcPeriod === 'string' ? input.npcPeriod : '',
    visitedLocations: Array.isArray(input.visitedLocations) ? input.visitedLocations : [],
    npcShuffle: Number.isFinite(Number(input.npcShuffle)) ? Number(input.npcShuffle) : Math.floor(Math.random()*100000),
    pets: Array.isArray(input.pets) ? input.pets : [],
    phone: {...base.phone,...(input.phone || {}),app:input.phone?.app||'home',posts:Array.isArray(input.phone?.posts)?input.phone.posts:[],messages:Array.isArray(input.phone?.messages)?input.phone.messages:[],videoViews:Array.isArray(input.phone?.videoViews)?input.phone.videoViews:[],activeVideo:typeof input.phone?.activeVideo==='string'?input.phone.activeVideo:''}
  };
}

export function loadState() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    return raw ? normalizeState(JSON.parse(raw)) : null;
  } catch (error) {
    console.warn('Не удалось прочитать сохранение:', error);
    return null;
  }
}

export function saveState(state) {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); return true; }
  catch (error) { console.warn('Не удалось сохранить игру:', error); return false; }
}

export function clearSave() { try { localStorage.removeItem(SAVE_KEY); } catch {} }

export function getBond(state,id) {
  return state.bonds[id] || {friendship:0,trust:0,respect:0,irritation:0,meetings:0,stage:'Знакомство'};
}

export function updateBond(state,id,delta={},options={}) {
  const current = getBond(state,id);
  const next = {...current};
  for (const key of ['friendship','trust','respect','irritation']) {
    if (typeof delta[key] === 'number') next[key] = Math.max(0,Math.min(100,current[key] + delta[key]));
  }
  next.meetings = current.meetings + (options.countMeeting===false?0:1);
  next.stage = next.irritation >= 55 ? 'Серьёзная неприязнь' : next.irritation >= 28 ? 'Настороженность' : next.friendship >= 80 && next.trust >= 55 ? 'Надёжный товарищ' : next.friendship >= 50 ? 'Близкий знакомый' : next.friendship >= 20 ? 'Хороший знакомый' : 'Знакомство';
  state.bonds[id] = next;
  return next;
}

export function addFeed(state,message) {
  state.feed.unshift(String(message));
  state.feed = state.feed.slice(0,16);
}

export function addMemory(state,id,message) {
  if (!state.memories[id]) state.memories[id] = [];
  state.memories[id].unshift({text:String(message),day:state.world.day,minute:state.world.minute});
  state.memories[id] = state.memories[id].slice(0,16);
}

export function addItem(state,item) {
  const existing = state.inventory.find(entry => entry.id === item.id);
  if (existing) existing.qty += item.qty || 1;
  else state.inventory.push({...item,qty:item.qty || 1});
}

export function removeItem(state,id,qty=1) {
  const item = state.inventory.find(entry => entry.id === id);
  if (!item || item.qty < qty) return false;
  item.qty -= qty;
  if (item.qty <= 0) state.inventory = state.inventory.filter(entry => entry.qty > 0);
  return true;
}
