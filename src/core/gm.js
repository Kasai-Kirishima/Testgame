import {getBond,updateBond,addFeed,addMemory,removeItem} from './store.js';
import {tickAction} from './life.js';
import {getWeather,clockLabel,timePeriod,seasonLabel} from './life.js';

const INTENTS = [
  ['greet',/(привет|здравствуй|доброе утро|добрый день|добрый вечер|хай|салют|как дела)/i],
  ['apology',/(прости|извини|прошу прощения|я был неправ|я была неправа|не хотел обидеть)/i],
  ['promiseCancel',/(не буду выполнять|отказываюсь от обещания|не успеваю|не получится выполнить|снимем обещание)/i],
  ['promise',/(обещаю|даю слово|я сделаю|обязательно помогу|можешь на меня рассчитывать)/i],
  ['help',/(помог|помочь|нужна помощь|давай помогу|могу помочь|поддержу|сделаем вместе)/i],
  ['gift',/(дарю|подарю|держи|это тебе|прими подарок|вот тебе)/i],
  ['invite',/(пойд[её]м|составишь компанию|прогуляемся|давай прогуляемся|сходим|вместе пообедаем|пойдём вместе)/i],
  ['train',/(трениров|испытани|потренируемся|покажи технику|обуч|упражнен|контроль чакры)/i],
  ['challenge',/(соревн|спорим|проверим|вызов|состязани|попробуем на скорость)/i],
  ['lead',/(я решу|следуй за мной|я беру инициативу|давай по моему плану|я организую|предлагаю такой план)/i],
  ['defer',/(как скажешь|решай ты|выбирай ты|я доверяю тебе|пусть будет по-твоему|твой выбор)/i],
  ['memory',/(помнишь|в прошлый раз|вчера|тогда|как мы|ты помнишь)/i],
  ['joke',/(шутк|смешно|рассмеш|прикол|ха-ха|ахах)/i],
  ['kind',/(спасибо|классн|крут|молодец|ты умн|ты добрая|ты добрый|приятно видеть|рад тебя видеть|хорошо выглядишь|уважаю)/i],
  ['question',/(расскажи|почему|что думаешь|как считаешь|что случилось|что нового|поговорим|расскажи о себе|твоё мнение)/i],
  ['farewell',/(пока|до встречи|увидимся|мне пора|до скорого|спокойной ночи)/i]
];

const TEMPLATES = {
  greet: [c => `Привет! ${c.notes}`, c => `О, ты здесь. Как проходит твой день?`, c => `Здравствуй. Хорошо, что заглянул. Что нового?`],
  help: [c => `Спасибо. Когда рядом есть надёжные люди, дела идут легче.`, c => `Это кстати. Давай распределим задачи и не будем мешать друг другу.`, c => `Я не против помощи. Главное — делать всё спокойно и по плану.`],
  apology: [c => `Принимаю извинения. Важно, что ты решил поговорить об этом.`, c => `Ладно. Давай учтём это на будущее и не будем возвращаться к ссоре.`, c => `Все ошибаются. Для меня важнее то, что будет дальше.`],
  promiseCancel: [c => `Спасибо, что предупредил. Лучше честно пересмотреть план, чем молча пропасть.`, c => `Понимаю. Не всё идёт по плану — давай снимем это обещание.`, c => `Я не стану держать тебя за слова. Честность тоже важна.`],
  promise: [c => `Хорошо. Я запомню твоё обещание, но не стану требовать невозможного.`, c => `Договорились. Только оцени силы заранее.`, c => `Записала. Надеюсь, мы сможем выполнить это вместе.`],
  gift: [c => `О, спасибо. Ты помнишь, что мне нравится.`, c => `Неожиданно и приятно. Такой знак внимания я ценю.`, c => `Благодарю. Я постараюсь найти этому хорошее применение.`],
  invite: [c => `Почему бы и нет? ${c.likes[0]} звучит как хорошая тема для прогулки.`, c => `С удовольствием. Давай выберем спокойное место.`, c => `Хорошая идея. Немного сменить обстановку полезно.`],
  train: [c => `Давай начнём с упражнения на концентрацию. Не нужно торопиться.`, c => `Хорошо. Проверим контроль чакры и точность движений.`, c => `Согласна. Только сначала короткая разминка.`],
  challenge: [c => `Вот это уже интересно. Давай устроим дружеское испытание!`, c => `Соревнование? Только без обид, если я выиграю.`, c => `Договорились. Проверим не силу, а смекалку.`],
  lead: [c => `План звучит понятно. Я помогу с организацией.`, c => `Хорошо, беру на себя свою часть.`, c => `Неплохой подход. Главное — оставить время на отдых.`],
  defer: [c => `Тогда я предложу спокойный вариант. Думаю, он подойдёт.`, c => `Доверяешь мне выбор? Хорошо, постараюсь не подвести.`, c => `Ладно. Иногда полезно посмотреть на ситуацию с другой стороны.`],
  memory: [c => `Помню. Такие мелочи постепенно складываются в общую историю.`, c => `Конечно помню. Ты тогда поступил довольно необычно.`, c => `Да, это было хорошее воспоминание.`],
  joke: [c => `Ха! Ладно, признаю, получилось смешно.`, c => `У тебя странное чувство юмора. Но это даже неплохо.`, c => `Я пыталась сохранять серьёзный вид, но не вышло.`],
  kind: [c => `Спасибо. Не каждый замечает такие вещи. Я это ценю.`, c => `Хм, умеешь поднять настроение. Благодарю.`, c => `Это приятно слышать. Я запомню твою доброту.`],
  question: [c => `Интересный вопрос. ${c.notes}`, c => `Думаю, главное — не торопиться с выводами. А ты как считаешь?`, c => `Могу рассказать, но тогда и ты поделись своей историей.`],
  farewell: [c => `До встречи. Береги себя по дороге.`, c => `Увидимся позже. У меня ещё есть дела.`, c => `Хорошего дня. Буду рада продолжить разговор.`],
  default: [c => `Я услышала тебя. Расскажи чуть подробнее — мне важно правильно понять, что ты задумал.`, c => `Любопытная мысль. А что подтолкнуло тебя к этому?`, c => `Давай разберёмся вместе. Что ты хочешь получить в итоге?`]
};

const BOND_EFFECTS = {
  greet:{friendship:1,trust:1}, help:{friendship:4,trust:5,respect:2}, apology:{trust:5,respect:2},
  promise:{trust:3}, promiseCancel:{trust:1}, gift:{friendship:4,trust:2}, invite:{friendship:3,trust:1},
  train:{respect:3,friendship:1}, challenge:{respect:2}, lead:{respect:3}, defer:{trust:2,respect:1},
  memory:{friendship:2}, joke:{friendship:2}, kind:{friendship:3,trust:1}, question:{friendship:1}, farewell:{trust:1}, default:{friendship:1}
};

function selectIntent(text) {
  for (const [kind,pattern] of INTENTS) if (pattern.test(text)) return kind;
  return 'default';
}
function choose(list,seed) { return list[Math.abs(seed) % list.length]; }
function memoryLine(kind) {
  const lines = {
    greet:'поздоровался',help:'предложил помощь',apology:'извинился',promiseCancel:'честно пересмотрел обещание',
    promise:'дал обещание',gift:'сделал небольшой подарок',invite:'предложил прогуляться',train:'предложил тренировку',
    challenge:'предложил дружеское испытание',lead:'предложил план',defer:'доверил выбор',memory:'вспомнил прошлую встречу',
    joke:'пошутил',kind:'сказал добрые слова',question:'задал вопрос',farewell:'попрощался',default:'поделился мыслью'
  };
  return lines[kind] || lines.default;
}
function buildTone(char,kind) {
  const styles = {
    playful:'В голосе слышится весёлая нотка.',warm:'Она отвечает тепло и доброжелательно.',quiet:'Она говорит спокойно, не торопя разговор.',
    sharp:'В ответе чувствуется прямота, но без злости.',direct:'Она отвечает коротко и по делу.',wise:'Она на секунду задумывается, подбирая точные слова.',
    formal:'Она отвечает собранно и внимательно.',bright:'Её настроение заметно улучшается.',gentle:'Она говорит мягко и сдержанно.',
    mysterious:'Её ответ остаётся немного загадочным.'
  };
  return styles[char.style] || '';
}

export function analyzeText(text) {
  const clean = String(text || '').trim().slice(0,500);
  return {kind:selectIntent(clean),raw:clean};
}

export function talkToCharacter(state,char,text) {
  const {kind,raw} = analyzeText(text);
  const lower = raw.toLowerCase();
  const delta = {...(BOND_EFFECTS[kind] || BOND_EFFECTS.default)};
  const preferredGiftId = state.ui?.pendingGiftId;
  const inventoryGift = kind === 'gift' ? (state.inventory.find(item => item.id === preferredGiftId && item.qty > 0) || state.inventory.find(item => item.kind === 'gift' && item.qty > 0)) : null;
  if (state.ui) state.ui.pendingGiftId = null;
  if (kind === 'gift' && !inventoryGift) { delta.friendship = 0; delta.trust = 0; }
  const bond = updateBond(state,char.id,delta);
  tickAction(state,18);

  if (kind === 'gift' && inventoryGift) removeItem(state,inventoryGift.id,1);
  if (kind === 'promise') {
    state.scroll.unshift({id:`promise-${Date.now()}`,title:`Обещание для ${char.name}`,desc:raw.slice(0,130),kind:'promise',done:false,optional:true,characterId:char.id});
  }
  if (kind === 'promiseCancel') {
    const promise = state.scroll.find(item => item.characterId === char.id && item.kind === 'promise' && !item.done);
    if (promise) { promise.done = true; promise.cancelled = true; promise.status = 'Пересмотрено'; }
  }
  if (kind === 'train') {
    state.player.stats.chakra = Math.min(100,state.player.stats.chakra + 4);
    state.player.stats.focus = Math.min(100,state.player.stats.focus + 3);
  }
  if (kind === 'invite') {
    state.world.lastMeetup = {characterId:char.id,day:state.world.day,location:state.world.location};
  }

  const history = state.memories[char.id] || [];
  const last = history[0];
  let reply = choose(TEMPLATES[kind] || TEMPLATES.default,char.id.length + raw.length + bond.meetings)(char);
  const likedWord = char.likes?.find(word => lower.includes(word.toLowerCase()));
  if (likedWord) reply += ` Я заметила, что ты тоже интересуешься темой «${likedWord}».`;
  else if (kind === 'default' && char.likes?.length) reply += ` Кстати, мне всегда интересно поговорить о таком: ${char.likes.slice(0,2).join(' или ')}.`;
  if (last && kind !== 'memory' && Math.random() < 0.72) reply += ` И да, я помню, что ты раньше ${last.text}.`;
  if (kind === 'gift' && !inventoryGift) reply += ' Похоже, подходящего подарка сейчас нет. Но внимание всё равно приятно.';
  const outfit = state.player.look;
  if (outfit === 'shinobi' && state.world.location === 'training') reply += ' Твоя форма как раз подходит для площадки.';
  else if (outfit === 'festival') reply += ' Праздничная одежда сегодня заметно выделяется среди прохожих.';
  else if (outfit === 'raincoat' && state.world.weather === 'rain') reply += ' Хорошо, что ты выбрал дождевой плащ.';
  else if (outfit === 'travel' && state.world.location === 'gate') reply += ' В дорожном плаще ты выглядишь как человек, который многое повидал.';
  reply += ` ${buildTone(char,kind)}`;
  const weather = getWeather(state);
  const period = timePeriod(state.world.minute);
  const season = seasonLabel(state);
  if (period === 'Утро') reply += ' День только начинается, и на улицах ещё спокойно.';
  else if (period === 'Вечер') reply += ' Вечерний свет постепенно ложится на крыши деревни.';
  else if (period === 'Ночь') reply += ' На улице стало тихо: большинство жителей уже дома.';
  if (season === 'Весна') reply += ' В саду уже заметны первые весенние цветы.';
  else if (season === 'Лето') reply += ' Тёплый воздух напоминает о летних каникулах.';
  else if (season === 'Осень') reply += ' Ветер гонит по дороге жёлтые листья.';
  else if (season === 'Зима') reply += ' Холодный воздух делает горячий чай особенно кстати.';
  if (state.world.weather === 'rain') reply += ' За окном дождь, и разговор звучит особенно уютно.';
  else if (state.world.weather === 'snow') reply += ' За окном тихо падает снег.';
  else if (state.world.weather === 'sunny') reply += ' Солнечный свет ложится на улицу.';
  if (bond.stage === 'Близкий друг' || bond.stage === 'Надёжный товарищ') reply += ` Мы уже неплохо знаем друг друга, ${state.player.name}.`;

  const memory = memoryLine(kind);
  addMemory(state,char.id,memory);
  addFeed(state,`${char.name}: ${memory}.`);
  state.ui.targetId = char.id;
  return {kind,reply,bond,usedText:raw,weather:weather.label};
}
