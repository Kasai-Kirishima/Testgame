import {CHARACTERS,getCharacter} from '../data/characters.js';
import {getBond,updateBond,addFeed} from './store.js';

// Adult-only, non-sexual romance routes. Younger/age-ambiguous characters stay friendship-only.
export const ROMANCE_PROFILES = {
  anko: {preference:['training','music'], dislikes:['quiet'], initiation:'Спарринг на закате? После можно зайти за данго. Не откажешься от компании?', invite:'Анко усмехается: «Неплохо придумано. Давай, но без скучных разговоров!»', mood:'Азартное настроение'},
  ayame: {preference:['tea','cooking','walk'], dislikes:['training'], initiation:'Я закрываю лавку чуть раньше. Может, прогуляемся и поговорим без спешки?', invite:'Аяме тепло улыбается: «С удовольствием. Я как раз хотела немного проветриться».', mood:'Тёплое настроение'},
  ino: {preference:['flowers','festival','walk'], dislikes:['training'], initiation:'Я присмотрела одну красивую аллею. Составишь мне компанию?', invite:'Ино довольно улыбается: «Вот это уже похоже на хороший план!»', mood:'Общительное настроение'},
  konan: {preference:['origami','tea','quiet'], dislikes:['festival'], initiation:'Я собираюсь в тихий павильон. Если тебе тоже хочется спокойствия, приходи.', invite:'Конан слегка кивает: «Хорошо. Думаю, нам будет о чём поговорить».', mood:'Спокойное настроение'},
  kurenai: {preference:['garden','books','tea'], dislikes:['training'], initiation:'В саду сегодня особенно красиво. Не хочешь пройтись вместе?', invite:'Куренай мягко улыбается: «Тогда пойдём. Такая прогулка пойдёт нам на пользу».', mood:'Умиротворённое настроение'},
  kurotsuchi: {preference:['training','strategy','walk'], dislikes:['quiet'], initiation:'Есть идея устроить небольшое испытание. Проверим, кто лучше соображает?', invite:'Куроцучи улыбается уголком губ: «Наконец-то что-то интересное».', mood:'Боевой настрой'},
  mabui: {preference:['tea','books','quiet'], dislikes:['festival'], initiation:'У меня появился свободный час. Предлагаю чай и спокойный разговор.', invite:'Мабуи отвечает сдержанной улыбкой: «Такой план мне подходит».', mood:'Собранное настроение'},
  mei: {preference:['tea','festival','art'], dislikes:['training'], initiation:'Сегодня в деревне небольшой вечерний фестиваль. Составишь мне компанию?', invite:'Мэй весело смеётся: «Прекрасно. Обещаю, вечер будет интересным».', mood:'Игривое настроение'},
  mikoto: {preference:['cooking','garden','tea'], dislikes:['training'], initiation:'Я приготовила чай и кое-что к нему. Заглянешь ненадолго?', invite:'Микото приветливо кивает: «Я рада, что ты пришла. Устраивайся поудобнее».', mood:'Домашнее настроение'},
  sakura: {preference:['training','books','tea'], dislikes:['festival'], initiation:'Я закончила дела в госпитале. Может, немного прогуляемся?', invite:'Сакура улыбается: «Договорились. Сегодня можно никуда не торопиться».', mood:'Энергичное настроение'},
  samui: {preference:['quiet','strategy','walk'], dislikes:['festival'], initiation:'Я собираюсь пройтись по тихой части деревни. Можешь присоединиться.', invite:'Самуи спокойно кивает: «Хорошо. Тишина иногда полезна».', mood:'Сдержанное настроение'},
  temari: {preference:['strategy','tea','walk'], dislikes:['cooking'], initiation:'Мне нужно проветрить голову после переговоров. Пройдёмся?', invite:'Темари одобрительно кивает: «Отлично. Заодно обсудим пару вещей».', mood:'Решительное настроение'},
  tenten: {preference:['market','craft','walk'], dislikes:['quiet'], initiation:'На рынке привезли новые инструменты. Хочешь посмотреть вместе?', invite:'Тентен оживляется: «Отлично! Мне как раз нужен второй взгляд».', mood:'Любознательное настроение'},
  tsunade: {preference:['tea','strategy','walk'], dislikes:['festival'], initiation:'У меня редкий свободный вечер. Прогуляемся, пока никто не принёс новые бумаги?', invite:'Цунаде усмехается: «Ладно, но никаких разговоров о работе».', mood:'Редко свободное настроение'},
  shizune: {preference:['tea','garden','pets'], dislikes:['training'], initiation:'Я собиралась немного отдохнуть после смены. Не хочешь пройтись со мной?', invite:'Шизуне с облегчением улыбается: «Спасибо. Мне будет приятно».', mood:'Заботливое настроение'},
  karin: {preference:['books','strategy','tea'], dislikes:['festival'], initiation:'Я нашла интересные записи. Можем обсудить их за чаем.', invite:'Карин поправляет очки: «Ладно, но записи действительно интересные!»', mood:'Внимательное настроение'}
};

export const DATE_ACTIVITIES = [
  {id:'walk',label:'Прогулка',icon:'🌿',cost:5},
  {id:'tea',label:'Чайная',icon:'🍵',cost:6},
  {id:'flowers',label:'Цветочная лавка',icon:'🌸',cost:8},
  {id:'training',label:'Тренировка',icon:'🥋',cost:9},
  {id:'festival',label:'Фестиваль',icon:'🏮',cost:10},
  {id:'books',label:'Библиотека',icon:'📚',cost:5},
  {id:'garden',label:'Сад',icon:'🌷',cost:5},
  {id:'strategy',label:'Шахматы и стратегии',icon:'♟️',cost:6},
  {id:'music',label:'Музыка',icon:'🎵',cost:7},
  {id:'cooking',label:'Готовка',icon:'🍱',cost:8},
  {id:'origami',label:'Оригами',icon:'🪽',cost:5},
  {id:'market',label:'Рынок',icon:'🛍️',cost:7},
  {id:'craft',label:'Мастерская',icon:'⚒️',cost:8},
  {id:'art',label:'Галерея искусства',icon:'🎨',cost:6},
  {id:'quiet',label:'Тихий павильон',icon:'🌙',cost:4},
  {id:'pets',label:'Питомцы',icon:'🐾',cost:5}
];

export function canRomance(state,characterId) {
  return Boolean(state?.player?.gender==='female' && Number(state?.player?.age)>=18 && ROMANCE_PROFILES[characterId] && getCharacter(characterId));
}

export function getRelationship(state,characterId) {
  state.relationships ||= {};
  const current=state.relationships[characterId]||{};
  return state.relationships[characterId]={status:'none',mood:55,dates:0,lastInitiativeDay:0,pending:null,...current};
}

function clamp(value,min=0,max=100) { return Math.max(min,Math.min(max,Number(value)||0)); }

export function completeRomanticDate(state,characterId,activityId) {
  const character=getCharacter(characterId), profile=ROMANCE_PROFILES[characterId];
  if(!character || !canRomance(state,characterId)) return {ok:false,message:'Этот маршрут доступен только для взрослой версии персонажа и героини 18+ в истории.'};
  const bond=getBond(state,characterId), relation=getRelationship(state,characterId);
  const activity=DATE_ACTIVITIES.find(item=>item.id===activityId);
  if(!activity) return {ok:false,message:'Такого варианта встречи нет.'};
  if((bond.friendship||0)<15 || (bond.trust||0)<10) return {ok:false,message:`${character.name} пока недостаточно тебя знает. Сначала укрепи дружбу и доверие.`};
  if((state.player.stats.stamina||0)<activity.cost) return {ok:false,message:'Ты слишком устала. Отдохни перед встречей.'};
  const likes=profile.preference.includes(activityId);
  const dislikes=profile.dislikes.includes(activityId);
  const delta=likes?{friendship:7,trust:5,respect:2}:dislikes?{friendship:-2,trust:-1,irritation:2}:{friendship:3,trust:3,respect:1};
  updateBond(state,characterId,delta,{countMeeting:false});
  relation.dates+=1;
  relation.mood=clamp(relation.mood+(likes?10:dislikes?-7:4));
  relation.lastActivity=activityId;
  relation.lastDateDay=state.world.day;
  state.player.stats.stamina=clamp(state.player.stats.stamina-activity.cost);
  const message=likes
    ? `${character.name} явно наслаждается встречей. Вы нашли общую тему, и разговор идёт легко.`
    : dislikes
      ? `${character.name} старается поддержать разговор, но выбранный план оказался не совсем её. В следующий раз лучше учесть её интересы.`
      : `${character.name} благодарит за встречу. Вы хорошо провели время и стали немного ближе.`;
  addFeed(state,`Встреча с ${character.name}: ${message}`);
  return {ok:true,message,liked:likes,disliked:dislikes};
}

export function confessFeelings(state,characterId) {
  const character=getCharacter(characterId), relation=getRelationship(state,characterId), bond=getBond(state,characterId);
  if(!character || !canRomance(state,characterId)) return {ok:false,message:'Этот романтический маршрут сейчас недоступен.'};
  if(relation.status==='dating') return {ok:true,message:`Вы с ${character.name} уже договорились быть вместе. Береги доверие и продолжай узнавать её.`};
  if((bond.friendship||0)<70 || (bond.trust||0)<55 || relation.dates<2) return {ok:false,message:`${character.name} пока не готова к такому разговору. Нужны дружба 70+, доверие 55+ и хотя бы две совместные встречи.`};
  relation.status='dating';
  relation.mood=clamp(relation.mood+12);
  updateBond(state,characterId,{friendship:5,trust:7,respect:2},{countMeeting:false});
  const message=`${character.name} внимательно выслушивает тебя, а затем отвечает взаимностью. Вы решили попробовать строить отношения, не торопясь и уважая границы друг друга.`;
  addFeed(state,message);
  return {ok:true,message};
}

export function resolveInitiative(state,characterId,accept) {
  const character=getCharacter(characterId), relation=getRelationship(state,characterId), bond=getBond(state,characterId), pending=relation.pending;
  if(!character || !pending || !canRomance(state,characterId)) return {ok:false,message:'Приглашение уже неактуально.'};
  relation.pending=null;
  if(accept) {
    state.player.stats.stamina=clamp(state.player.stats.stamina-6);
    relation.mood=clamp(relation.mood+9);
    relation.dates+=1;
    updateBond(state,characterId,{friendship:5,trust:5,respect:1},{countMeeting:false});
    const message=`Ты приняла приглашение ${character.name}. ${pending.activityText||'Вы провели время вместе и спокойно поговорили.'}`;
    addFeed(state,message);
    return {ok:true,message,accepted:true};
  }
  relation.mood=clamp(relation.mood-2);
  addFeed(state,`Ты вежливо перенесла встречу с ${character.name}. Она отнеслась к этому с пониманием.`);
  return {ok:true,message:`Ты вежливо отказалась от встречи с ${character.name}. Она ответила: «Ничего страшного, может быть, в другой раз».`,accepted:false};
}

export function maybeQueueRelationshipInitiative(state,oldDay,oldMinute) {
  if(state?.player?.gender!=='female' || Number(state?.player?.age)<18) return null;
  const crossedEvening=oldDay===state.world.day && oldMinute<18*60 && state.world.minute>=18*60;
  if(!crossedEvening) return null;
  const candidates=CHARACTERS.filter(character=>{
    if(!canRomance(state,character.id)) return false;
    const bond=getBond(state,character.id), relation=getRelationship(state,character.id);
    return (bond.friendship||0)>=58 && (bond.trust||0)>=42 && relation.lastInitiativeDay!==state.world.day && !relation.pending;
  });
  if(!candidates.length || Math.random()>.42) return null;
  const character=candidates[(state.world.day+state.world.actions)%candidates.length];
  const profile=ROMANCE_PROFILES[character.id], relation=getRelationship(state,character.id);
  relation.lastInitiativeDay=state.world.day;
  relation.pending={day:state.world.day,title:`Приглашение от ${character.name}`,text:profile.initiation,activityText:profile.initiation,activityId:profile.preference[0]};
  addFeed(state,`${character.name} сама предложила провести время вместе. Открой её досье, чтобы ответить.`);
  return character.id;
}
