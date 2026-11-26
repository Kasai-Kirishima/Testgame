/* Naruto Enot Garem — generated standalone runtime. Edit src/ modules, then run: node scripts/build-standalone.mjs */
(function(){
'use strict';
const __factories = {
"src/data/characters.js": function(__require) {

const cast = [
  ['anko','Анко','Инструктор и любительница розыгрышей','Дерзкая, азартная, любит поддразнивать и проверять людей на смелость.','Уважает честность, чувство юмора и тех, кто не боится признать ошибку.',['розыгрыши','соревнования','острая еда'],'🍡','#d4a17b','#745044','training','playful'],
  ['ayame','Аяме','Работница «Ичираку»','Тёплая, гостеприимная, умеет слушать и замечает усталость посетителей.','Любит кулинарию, заботу о гостях и спокойные беседы.',['рамен','кулинария','помощь'],'🍜','#e8bc9b','#bd7356','ichiraku','warm'],
  ['buntan','Бунтан','Шиноби и участница испытаний','Самоуверенная, соревновательная, ценит самостоятельность.','Не любит пустые обещания; уважает честное соперничество.',['тренировки','вызовы','честность'],'⚡','#a9b6c8','#50657b','training','bold'],
  ['ino','Ино','Специалистка сенсорного отряда','Общительная, уверенная, любит красоту и быстро считывает настроение.','Любит цветы, моду и внимание к деталям; не терпит грубости.',['цветы','мода','разговоры'],'🌸','#e6a6b7','#a45b7c','flower-shop','bright'],
  ['yodo','Йодо','Шиноби Песка','Сдержанная, наблюдательная, аналитичная и немногословная.','Ценит точность, спокойствие и продуманные планы.',['стратегия','тишина','чай'],'🪶','#c9b8a3','#796a58','tea-house','quiet'],
  ['kaguya','Кагуя','Загадочная гостья','Отстранённая и непривычная к обычаям людей; постепенно изучает мир.','Лучше реагирует на терпеливые объяснения и уважение к границам.',['история','природа','наблюдение'],'☾','#d8d8df','#7b7c9d','forest','mysterious'],
  ['karin','Карин','Сенсор и исследовательница','Резкая на словах, умная, проницательная и эмоциональная.','Ценит прямоту, полезность и отсутствие фальши.',['книги','исследования','порядок'],'🔮','#d98994','#8e5367','hospital','sharp'],
  ['konan','Конан','Организатор и стратег','Спокойная, дисциплинированная, немногословная и внимательная.','Любит оригами, тишину и надёжных союзников.',['оригами','порядок','доверие'],'🪽','#d2d7e2','#78869c','tea-house','quiet'],
  ['kurenai','Куренай','Наставница','Мудрая, наблюдательная и тактичная; умеет поддержать без лишних слов.','Предпочитает вдумчивые беседы, книги и прогулки в саду.',['сад','книги','наблюдение'],'🌿','#a8c3a1','#587a61','garden','wise'],
  ['kurotsuchi','Куроцучи','Куноичи Камня','Ироничная, прямолинейная, уверенная в себе и практичная.','Любит остроумные споры и людей, которые не теряются.',['юмор','споры','походы'],'🪨','#b7b28b','#6f7550','gate','bold'],
  ['kushina','Кушина','Гостья из Узумаки','Энергичная, заботливая, вспыльчивая, но отходчивая.','Семейные истории и вкусная еда быстро располагают её.',['семья','готовка','праздники'],'🍅','#df8e91','#a4474e','home','warm'],
  ['mabui','Мабуи','Секретарь и координатор','Собранная, рациональная, пунктуальная и ответственная.','Уважает тех, кто ценит чужое время и помогает без напоминаний.',['планирование','чай','документы'],'📜','#c4cbd0','#697d89','hokage','formal'],
  ['mei','Мэй','Дипломат и лидер','Харизматичная, умная, дипломатичная, с тонким чувством юмора.','Ценит такт, инициативу и умение видеть несколько сторон ситуации.',['дипломатия','искусство','чай'],'🌺','#d8a5b0','#8e5e75','hokage','bright'],
  ['mikoto','Микото','Уважаемая жительница Конохи','Мягкая, чуткая, терпеливая и внимательная к людям.','Любит домашний уют, семейные истории и добрые поступки.',['дом','семья','сад'],'🫖','#c7a8a2','#866b67','garden','warm'],
  ['mirai','Мирай','Шиноби и телохранитель','Дисциплинированная, ответственная, сдержанная, но с хорошим юмором.','Уважает тренировки, ясные договорённости и командную работу.',['тренировки','долг','чай'],'🎴','#a6b5a6','#657a70','training','formal'],
  ['mito','Мито','Хранительница старых историй','Мудрая, спокойная и терпеливая; любит передавать знания.','Обожает легенды, старые свитки и неспешные беседы.',['истории','свитки','чай'],'📚','#c9a9a0','#846c5c','library','wise'],
  ['rin','Рин','Медицинская куноичи','Добрая, искренняя, заботливая и оптимистичная.','Всегда замечает, когда кому-то нужна помощь.',['медицина','живопись','прогулки'],'🌼','#e3b4b6','#97717c','hospital','warm'],
  ['sakura','Сакура','Медицинский ниндзя','Решительная, умная, эмоциональная и преданная друзьям.','Ценит целеустремлённость, честность и уважение к труду.',['медицина','тренировки','книги'],'🌸','#e9a8b2','#a55d73','hospital','direct'],
  ['samui','Самуи','Шиноби Облака','Хладнокровная, лаконичная и очень наблюдательная.','Её располагают спокойствие, надёжность и отсутствие суеты.',['порядок','природа','стратегия'],'❄️','#c9d5d7','#788e98','main-street','quiet'],
  ['sarada','Сарада','Шиноби нового поколения','Амбициозная, рассудительная и целеустремлённая.','Любит ясные цели, командные задачи и разговоры о будущем.',['книги','цели','тренировки'],'👓','#cf8b9b','#844b60','library','direct'],
  ['tayuya','Таюя','Музыкант и шиноби','Колкая, независимая, вспыльчивая, но ценит талант и верность.','Музыка помогает ей расслабиться; не любит назойливость.',['музыка','состязания','свобода'],'🎵','#b78ea0','#67485f','tea-house','sharp'],
  ['temari','Темари','Посланница Песка','Практичная, резкая, уверенная и очень сообразительная.','Уважает умение принимать решения и нести ответственность.',['стратегия','ветер','чай'],'🍃','#d0b58e','#8d714b','gate','direct'],
  ['tenten','Тентен','Мастер ремесла','Энергичная, общительная, увлечённая мастерством и путешествиями.','Любит создавать полезные вещи, искать редкости и делиться находками.',['ремесло','рынок','путешествия'],'⚒️','#cba68d','#8b6755','market','bright'],
  ['hanabi','Ханаби','Шиноби клана Хьюга','Собранная, наблюдательная, настойчивая и требовательная к себе.','Уважает дисциплину, но ценит искреннее участие.',['тренировки','сад','спокойствие'],'🌙','#c6c5dd','#72749b','training','formal'],
  ['hinata','Хината','Куноичи клана Хьюга','Скромная, доброжелательная, внимательная и терпеливая.','Легче раскрывается в спокойной обстановке и небольших компаниях.',['цветы','прогулки','забота'],'🪻','#aeb9d8','#6e7c9e','garden','gentle'],
  ['tsunade','Цунаде','Легендарная медик и наставница','Властная, прямолинейная, опытная и вспыльчивая.','Ценит смелость, ответственность и людей, которые не сдаются.',['медицина','наставничество','честность'],'🐌','#d8a883','#976847','hokage','direct'],
  ['haku','Хаку','Секретный путешественник','Вежливый, мягкий, внимательный и необычайно наблюдательный.','Открывается постепенно. Важны доброта, спокойствие и доверие.',['снежинки','травы','тишина'],'❄️','#b5cbdc','#6b8aa0','forest','gentle'],
  ['shizune','Шизуне','Медицинский помощник','Ответственная, заботливая, организованная и немного тревожная.','Любит порядок, животных и людей, которые умеют благодарить.',['медицина','порядок','забота'],'🐷','#c8b3a7','#83706b','hospital','warm']
];

const CHARACTERS = cast.map(([id,name,role,personality,notes,likes,icon,c1,c2,startLocation,style]) => ({
  id,name,role,personality,notes,likes,icon,colors:[c1,c2],startLocation,style,
  intro:`${name} здесь. ${personality}`,
  art:['anko','ayame','konan','sakura','hanabi','hinata'].includes(id)
    ? ['daily','shinobi','festival'].map((variant,index)=>({
        src:`assets/characters/${id}/${variant}.webp`,
        label:['Повседневный образ','Тренировка шиноби','Вечерний фестиваль'][index]
      }))
    : [{src:`assets/characters/${id}/portrait.webp`,label:'Портрет персонажа'}],
  secret:id==='haku'
}));
const getCharacter = id => CHARACTERS.find(character => character.id === id);
const initials = name => (name || '?').trim().slice(0,1).toUpperCase();

return { CHARACTERS, getCharacter, initials };
},
"src/data/enemies.js": function(__require) {

const ENEMIES = [
  {id:'masked-scout',name:'Маскированный разведчик',role:'Разведчик',description:'Пытается проверить границы деревни и уходит от прямого столкновения.',image:'assets/enemies/masked-scout.webp',hp:42,attack:7,reward:18,style:'Быстрый и осторожный'},
  {id:'road-rogue',name:'Дорожный налётчик',role:'Нарушитель порядка',description:'Промышляет мелкими нападениями на караваны. Его можно остановить без лишнего риска.',image:'assets/enemies/road-rogue.webp',hp:50,attack:8,reward:22,style:'Напористый противник'},
  {id:'armored-guard',name:'Наёмный страж',role:'Охранник склада',description:'Закрыл проход к заброшенному складу и не хочет слушать предупреждения.',image:'assets/enemies/armored-guard.webp',hp:62,attack:9,reward:28,style:'Крепкая защита'},
  {id:'forest-ambusher',name:'Лесной засадник',role:'Нарушитель на тропе',description:'Прячется у дороги и пытается напугать путников.',image:'assets/enemies/forest-ambusher.webp',hp:46,attack:8,reward:20,style:'Скрытные выпады'},
  {id:'chakra-adept',name:'Бродячий техник',role:'Пользователь чакры',description:'Использует простые приёмы чакры и держит дистанцию.',image:'assets/enemies/chakra-adept.webp',hp:54,attack:10,reward:26,style:'Дальняя атака'},
  {id:'stone-guardian',name:'Каменный страж',role:'Тренировочный голем',description:'Старинный голем у руин. Его активация похожа на проверку навыков.',image:'assets/enemies/stone-guardian.webp',hp:72,attack:8,reward:34,style:'Медленный и выносливый'}
];
const getEnemy = id => ENEMIES.find(enemy => enemy.id === id) || ENEMIES[0];

return { ENEMIES, getEnemy };
},
"src/data/world.js": function(__require) {

const ORIGINS = [
  {id:'resident',name:'Житель Конохи',note:'Ты знаешь городские привычки и начинаешь с хорошей репутацией среди жителей.',stats:{stamina:78,chakra:48,focus:65,renown:10,coins:90}},
  {id:'shinobi',name:'Шиноби Конохи',note:'Базовая подготовка помогает в испытаниях и командных делах.',stats:{stamina:88,chakra:72,focus:66,renown:14,coins:55}},
  {id:'traveler',name:'Путешественник',note:'Ты легко ориентируешься в незнакомых местах и умеешь находить общий язык.',stats:{stamina:72,chakra:52,focus:76,renown:4,coins:80}},
  {id:'guest',name:'Гость другой деревни',note:'К тебе присматриваются с любопытством, но новые знакомства даются быстро.',stats:{stamina:70,chakra:62,focus:72,renown:6,coins:75}},
  {id:'medic',name:'Ученик медицинского корпуса',note:'Ты внимателен к деталям и умеешь помогать людям.',stats:{stamina:66,chakra:62,focus:86,renown:8,coins:55}},
  {id:'merchant',name:'Помощник торговца',note:'Ты знаешь рынок, умеешь считать расходы и начинаешь с запасом рё.',stats:{stamina:72,chakra:45,focus:78,renown:7,coins:145}},
  {id:'craft',name:'Подмастерье ремесленника',note:'Ты умеешь чинить бытовые вещи и ценишь аккуратную работу.',stats:{stamina:75,chakra:48,focus:82,renown:7,coins:95}},
  {id:'instructor',name:'Помощник инструктора',note:'Ты привык объяснять сложное простыми словами и поддерживать команду.',stats:{stamina:84,chakra:68,focus:78,renown:12,coins:65}},
  {id:'clan',name:'Наследник небольшого клана',note:'Некоторые семьи знают твою фамилию и готовы дать первый совет.',stats:{stamina:80,chakra:74,focus:68,renown:16,coins:100}},
  {id:'otherworld',name:'Попаданец из другого мира',note:'Местные порядки для тебя новы, зато ты замечаешь необычные решения.',stats:{stamina:68,chakra:60,focus:90,renown:0,coins:70}}
];

const LOCATIONS = [
  {id:'main-street',name:'Главная улица',icon:'🏮',area:'Центр',desc:'Шумная улица с лавками, прохожими и городскими новостями.',bg:'assets/backgrounds/konoha-main.webp',rainBg:'assets/backgrounds/rainy-alley.webp',nightBg:'assets/backgrounds/festival-street.webp',activities:['Прогуляться','Осмотреть витрины','Поговорить с жителями']},
  {id:'ichiraku',name:'Ичираку',icon:'🍜',area:'Центр',desc:'Знаменитая лапшичная. Здесь всегда уютно и пахнет бульоном.',bg:'assets/backgrounds/ichiraku.webp',activities:['Поесть рамен','Помочь на кухне','Отдохнуть']},
  {id:'flower-shop',name:'Цветочная лавка',icon:'🌸',area:'Торговый квартал',desc:'Цветы, семена и небольшие подарки для друзей.',bg:'assets/backgrounds/flower-shop.webp',activities:['Купить цветы','Помочь с букетами','Изучить растения']},
  {id:'market',name:'Рынок',icon:'🧺',area:'Торговый квартал',desc:'Торговцы, ремесленники и полезные мелочи для повседневной жизни.',bg:'assets/backgrounds/market-street.webp',nightBg:'assets/backgrounds/festival-street.webp',activities:['Купить предметы','Помочь торговцам','Осмотреть товары']},
  {id:'training',name:'Тренировочная площадка',icon:'🥋',area:'Восток',desc:'Место для упражнений, командных испытаний и обучения контролю чакры.',bg:'assets/backgrounds/training-ground.webp',activities:['Тренировка контроля','Испытание на ловкость','Защитный барьер']},
  {id:'hospital',name:'Больница',icon:'🏥',area:'Восток',desc:'Медицинский корпус и тихий внутренний двор.',bg:'assets/backgrounds/clinic.webp',activities:['Помочь медикам','Изучить медицинские свитки','Отдохнуть']},
  {id:'hokage',name:'Резиденция Хокаге',icon:'🏯',area:'Центр',desc:'Кабинеты, архивы и доска необязательных поручений.',bg:'assets/backgrounds/hokage-office.webp',activities:['Посмотреть поручения','Изучить архив','Поговорить с чиновниками']},
  {id:'tea-house',name:'Чайный домик',icon:'🍵',area:'Юг',desc:'Небольшой домик у сада, где приятно переждать дождь.',bg:'assets/backgrounds/tatami-home.webp',activities:['Выпить чай','Почитать','Поговорить']},
  {id:'river',name:'Берег реки',icon:'🌊',area:'Юг',desc:'Спокойное место у воды, особенно красивое на закате.',bg:'assets/backgrounds/river-sunset.webp',nightBg:'assets/backgrounds/campsite.webp',activities:['Послушать воду','Порыбачить','Прогуляться']},
  {id:'forest',name:'Лесная тропа',icon:'🌲',area:'За воротами',desc:'Тропа за деревней. Здесь можно собирать травы и замечать редкие следы.',bg:'assets/backgrounds/mountain-trail.webp',nightBg:'assets/backgrounds/campsite.webp',rainBg:'assets/backgrounds/rainy-alley.webp',activities:['Собрать травы','Исследовать тропу','Понаблюдать за птицами']},
  {id:'memorial',name:'Мемориальный парк',icon:'🕯️',area:'Запад',desc:'Тихое место памяти, где принято говорить негромко.',bg:'assets/backgrounds/memorial-garden.webp',activities:['Возложить цветы','Вспомнить прошлое','Посидеть в тишине']},
  {id:'gate',name:'Главные ворота',icon:'⛩️',area:'Север',desc:'Вход в деревню и место встреч с путешественниками.',bg:'assets/backgrounds/village-gate.webp',activities:['Встретить гостей','Узнать новости','Осмотреть окрестности']},
  {id:'library',name:'Библиотека',icon:'📚',area:'Запад',desc:'Книги по истории, медицине, природе и контролю чакры.',bg:'assets/backgrounds/library.webp',activities:['Почитать','Изучить свитки','Навести порядок']},
  {id:'garden',name:'Общественный сад',icon:'🌿',area:'Юг',desc:'Тихий сад с дорожками, скамейками и сезонными цветами.',bg:'assets/backgrounds/bathhouse-garden.webp',activities:['Полить растения','Прогуляться','Посидеть в тишине']},
  {id:'home',name:'Твой дом',icon:'🏡',area:'Жилой квартал',desc:'Небольшой дом, где можно готовить, отдыхать и планировать день.',bg:'assets/backgrounds/tatami-home.webp',activities:['Приготовить еду','Убраться','Отдохнуть']},
  {id:'academy',name:'Академия',icon:'🎓',area:'Восток',desc:'Учебный двор, классы и тренировочные занятия для шиноби.',bg:'assets/backgrounds/academy-courtyard.webp',activities:['Посетить занятие','Повторить основы','Помочь ученикам']},
  {id:'campsite',name:'Лесной привал',icon:'🏕️',area:'За воротами',desc:'Тихая стоянка у реки для короткого отдыха во время вылазок.',bg:'assets/backgrounds/campsite.webp',activities:['Разбить лагерь','Приготовить ужин','Отдохнуть у костра']}
];

const SEASONS = ['Весна','Лето','Осень','Зима'];
const WEATHER = [
  {id:'sunny',label:'Ясно',icon:'☀️',effect:'Прогулки и встречи проходят особенно приятно.'},
  {id:'cloudy',label:'Облачно',icon:'☁️',effect:'Хороший день для спокойных дел и разговоров.'},
  {id:'rain',label:'Дождь',icon:'🌧️',effect:'Уютные места и горячий чай становятся популярнее.'},
  {id:'wind',label:'Ветер',icon:'🍃',effect:'На открытых площадках удобно тренировать контроль чакры.'},
  {id:'snow',label:'Снег',icon:'❄️',effect:'Зимние прогулки открывают редкие события.'},
  {id:'fog',label:'Туман',icon:'🌫️',effect:'Лесные маршруты становятся загадочнее.'}
];
const getLocation = id => LOCATIONS.find(location => location.id === id) || LOCATIONS[0];
const getOrigin = id => ORIGINS.find(origin => origin.id === id) || ORIGINS[0];

return { ORIGINS, LOCATIONS, SEASONS, WEATHER, getLocation, getOrigin };
},
"src/core/store.js": function(__require) {
const { ORIGINS } = __require("src/data/world.js");
const { CHARACTERS } = __require("src/data/characters.js");


const SAVE_KEY = 'naruto-enot-garem-save-v2';

function createInitialState(player = {}) {
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
      stats: {...origin.stats, stamina: origin.stats.stamina, chakra: origin.stats.chakra, focus: origin.stats.focus}
    },
    world: {location:'main-street',day:1,minute:8*60,season:0,weather:'sunny',actions:0},
    bonds: {},
    memories: {},
    dialogues: {},
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
    npcShuffle: Math.floor(Math.random()*100000),
    pets: [],
    phone: {tab:'feed',posts:[],messages:[],lastPostAction:0},
    settings: {autosave:true,animations:true,textSize:'normal',contrast:'normal',musicLink:true,confirmReset:true},
    ui: {screen:'world',view:'world',targetId:'',sceneCharacterId:'hinata',lastActionText:'',lastActionResult:'Ты прибыл в Коноху. Напиши, куда хочешь пойти, что сделать или с кем поговорить.',showHelp:true}
  };
}

function normalizeState(input) {
  const base = createInitialState(input?.player || {});
  if (!input || typeof input !== 'object') return base;
  return {
    ...base,
    ...input,
    player: {...base.player,...input.player,stats:{...base.player.stats,...input.player?.stats}},
    world: {...base.world,...input.world},
    settings: {...base.settings,...input.settings},
    ui: {...base.ui,...input.ui},
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
    phone: {...base.phone,...(input.phone || {}),posts:Array.isArray(input.phone?.posts)?input.phone.posts:[],messages:Array.isArray(input.phone?.messages)?input.phone.messages:[]}
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    return raw ? normalizeState(JSON.parse(raw)) : null;
  } catch (error) {
    console.warn('Не удалось прочитать сохранение:', error);
    return null;
  }
}

function saveState(state) {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); return true; }
  catch (error) { console.warn('Не удалось сохранить игру:', error); return false; }
}

function clearSave() { try { localStorage.removeItem(SAVE_KEY); } catch {} }

function getBond(state,id) {
  return state.bonds[id] || {friendship:0,trust:0,respect:0,meetings:0,stage:'Знакомство'};
}

function updateBond(state,id,delta={}) {
  const current = getBond(state,id);
  const next = {...current};
  for (const key of ['friendship','trust','respect']) {
    if (typeof delta[key] === 'number') next[key] = Math.max(0,Math.min(100,current[key] + delta[key]));
  }
  next.meetings = current.meetings + 1;
  next.stage = next.friendship >= 80 ? 'Надёжный товарищ' : next.friendship >= 50 ? 'Близкий друг' : next.friendship >= 20 ? 'Хороший знакомый' : 'Знакомство';
  state.bonds[id] = next;
  return next;
}

function addFeed(state,message) {
  state.feed.unshift(String(message));
  state.feed = state.feed.slice(0,16);
}

function addMemory(state,id,message) {
  if (!state.memories[id]) state.memories[id] = [];
  state.memories[id].unshift({text:String(message),day:state.world.day,minute:state.world.minute});
  state.memories[id] = state.memories[id].slice(0,16);
}

function addItem(state,item) {
  const existing = state.inventory.find(entry => entry.id === item.id);
  if (existing) existing.qty += item.qty || 1;
  else state.inventory.push({...item,qty:item.qty || 1});
}

function removeItem(state,id,qty=1) {
  const item = state.inventory.find(entry => entry.id === id);
  if (!item || item.qty < qty) return false;
  item.qty -= qty;
  if (item.qty <= 0) state.inventory = state.inventory.filter(entry => entry.qty > 0);
  return true;
}

return { SAVE_KEY, createInitialState, normalizeState, loadState, saveState, clearSave, getBond, updateBond, addFeed, addMemory, addItem, removeItem };
},
"src/core/life.js": function(__require) {
const { WEATHER,SEASONS,LOCATIONS,getLocation } = __require("src/data/world.js");
const { getBond,updateBond,addFeed,addItem } = __require("src/core/store.js");
const { CHARACTERS } = __require("src/data/characters.js");



function clockLabel(minute) {
  const h = Math.floor(minute / 60) % 24;
  const m = minute % 60;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
}

function timePeriod(minute) {
  const h = Math.floor(minute / 60) % 24;
  if (h >= 5 && h < 11) return 'Утро';
  if (h >= 11 && h < 17) return 'День';
  if (h >= 17 && h < 21) return 'Вечер';
  return 'Ночь';
}

function getWeather(state) { return WEATHER.find(item => item.id === state.world.weather) || WEATHER[0]; }
function seasonLabel(state) { return SEASONS[state.world.season] || 'Весна'; }

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

function advanceTime(state,minutes) {
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

function tickAction(state,minutes=20) {
  state.world.actions += 1;
  advanceTime(state,minutes);
  maybeAddWorldEvent(state);
  updateNpcPositions(state,false);
  maybePhonePost(state);
  return state;
}

function skipTime(state,hours=1) {
  const safeHours = Math.max(1,Math.min(12,Number(hours)||1));
  advanceTime(state,safeHours * 60);
  addFeed(state,`Ты провёл время за своими делами. Сейчас ${timePeriod(state.world.minute)} · ${clockLabel(state.world.minute)}.`);
  return state;
}

function sleepUntilMorning(state) {
  const minutes = (24 * 60 - state.world.minute) + 7 * 60;
  advanceTime(state,minutes);
  state.player.stats.stamina = Math.min(100,state.player.stats.stamina + 32);
  state.player.stats.focus = Math.min(100,state.player.stats.focus + 16);
  addFeed(state,`Ты хорошо отдохнул. Начался новый день — ${clockLabel(state.world.minute)}.`);
  return state;
}

function travelTo(state,id) {
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

function doActivity(state,type) {
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

function assignDailyTask(state,actor,task) {
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


function getWorldMood(state) {
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
function updateNpcPositions(state,force=false) {
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

function getNpcLocation(state,characterId) {
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

function getLocationList() { return LOCATIONS; }

return { clockLabel, timePeriod, getWeather, seasonLabel, advanceTime, tickAction, skipTime, sleepUntilMorning, travelTo, doActivity, assignDailyTask, getWorldMood, updateNpcPositions, getNpcLocation, getLocationList };
},
"src/core/gm.js": function(__require) {
const { getBond,updateBond,addFeed,addMemory,removeItem } = __require("src/core/store.js");
const { tickAction,getNpcLocation } = __require("src/core/life.js");
const { getLocation } = __require("src/data/world.js");
const { getWeather,clockLabel,timePeriod,seasonLabel } = __require("src/core/life.js");




const INTENTS = [
  ['greet',/(привет|здравствуй|доброе утро|добрый день|добрый вечер|хай|салют|как дела)/i],
  ['apology',/(прости|извини|прошу прощения|я был неправ|я была неправа|не хотел обидеть)/i],
  ['promiseCancel',/(не буду выполнять|отказываюсь от обещания|не успеваю|не получится выполнить|снимем обещание)/i],
  ['promise',/(обещаю|даю слово|я сделаю|обязательно помогу|можешь на меня рассчитывать)/i],
  ['help',/(помог|помочь|нужна помощь|давай помогу|могу помочь|поддержу|сделаем вместе)/i],
  ['gift',/(дарю|подарю|держи|это тебе|прими подарок|вот тебе)/i],
  ['where',/(где ты|где находишься|ты сейчас где|в каком месте|куда идешь|куда направляешься)/i],
  ['schedule',/(что сегодня делаешь|какие планы|чем занята|чем занимаешься|твой распорядок|свободна ли)/i],
  ['comfort',/(мне грустно|мне тяжело|переживаю|волнуюсь|устал|устала|не получается|плохой день)/i],
  ['pet',/(питомц|животн|кот|собак|кролик|ястреб|черепах)/i],
  ['food',/(рамен|поесть|еда|обед|ужин|чай|бэнто|перекус)/i],
  ['interests',/(что тебе нравится|что любишь|любимое занятие|какие увлечения|чем увлекаешься|расскажи о хобби)/i],
  ['compliment',/(ты отлично справилась|ты молодец|восхищаюсь|уважаю тебя|классно получилось|хорошая работа|ты здорово умеешь)/i],
  ['disagree',/(не согласен|не согласна|это плохая идея|я думаю иначе|не уверен|не уверена)/i],
  ['plan',/(давай запланируем|составим план|что будем делать дальше|предлагаю маршрут|распределим время)/i],
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
  where: [c => `Сейчас я занимаюсь своими делами. Если хочешь встретиться, напиши — подскажу, где буду.`, c => `Мои планы меняются в течение дня. Можем договориться о встрече отдельно.`],
  schedule: [c => `Сегодня хочу уделить время тому, что мне нравится: ${c.likes.slice(0,2).join(' и ')}. Позже посмотрим, как сложится день.`, c => `Планов несколько: сначала свои обязанности, потом немного времени на ${c.likes[0]}.`],
  comfort: [c => `Понимаю. Не обязательно решать всё сразу. Можем спокойно поговорить или просто немного пройтись.`, c => `Сочувствую. Давай без спешки: расскажи, что случилось, и попробуем разобраться.`, c => `Иногда помогает короткий перерыв. Я могу составить тебе компанию.`],
  pet: [c => `Животные отлично чувствуют настроение. ${c.likes[0]} тоже помогает отвлечься.`, c => `Питомец — это ответственность, но и хороший компаньон. Какого ты завёл?`],
  food: [c => `Хорошая идея. После дел можно заглянуть в Ичираку или выпить чаю.`, c => `Я не против небольшого перерыва на еду. В такой день это кстати.`],
  interests: [c => `Мне нравятся ${c.likes.slice(0,3).join(', ')}. Это помогает переключиться после обязанностей. А что нравится тебе?`, c => `В свободное время я чаще выбираю ${c.likes.slice(0,2).join(' и ')}. Но иногда приятно попробовать что-то новое.`],
  compliment: [c => `Спасибо. Я старалась, и приятно, что ты это заметил.`, c => `Хм, не ожидала такой оценки. Благодарю — это придаёт уверенности.`, c => `Спасибо за поддержку. Постараюсь и дальше держать планку.`],
  disagree: [c => `Похоже, мы смотрим на это по-разному. Давай спокойно разберём причины.`, c => `Не обязательно соглашаться во всём. Объясни, что именно тебя смущает.`, c => `Хорошо, я выслушаю твою точку зрения.`],
  plan: [c => `Давай сначала определим главное, а затем распределим время. Я могу взять на себя часть, связанную с ${c.likes[0]}.`, c => `Предлагаю не перегружать день: одно важное дело, небольшая пауза и потом продолжим.`],
  farewell: [c => `До встречи. Береги себя по дороге.`, c => `Увидимся позже. У меня ещё есть дела.`, c => `Хорошего дня. Буду рада продолжить разговор.`],
  default: [c => `Я услышала тебя. Расскажи чуть подробнее — мне важно правильно понять, что ты задумал.`, c => `Любопытная мысль. А что подтолкнуло тебя к этому?`, c => `Давай разберёмся вместе. Что ты хочешь получить в итоге?`]
};

const BOND_EFFECTS = {
  greet:{friendship:1,trust:1}, help:{friendship:4,trust:5,respect:2}, apology:{trust:5,respect:2}, where:{friendship:1}, schedule:{friendship:1,trust:1}, comfort:{friendship:3,trust:3}, pet:{friendship:2}, food:{friendship:1}, interests:{friendship:2,trust:1}, compliment:{friendship:2,respect:1}, disagree:{respect:1}, plan:{trust:2,respect:1},
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
    joke:'пошутил',kind:'сказал добрые слова',question:'задал вопрос',interests:'спросил об интересах',compliment:'поддержал добрыми словами',disagree:'обсудил разные взгляды',plan:'предложил совместный план',where:'спросил о местоположении',schedule:'узнал о планах',comfort:'поддержал разговором',pet:'поговорил о животных',food:'обсудил еду',farewell:'попрощался',default:'поделился мыслью'
  };
  return lines[kind] || lines.default;
}
function buildTone(char,kind) {
  const styles = {
    playful:'В голосе слышится весёлая нотка.',warm:'Она отвечает тепло и доброжелательно.',quiet:'Она говорит спокойно, не торопя разговор.',
    sharp:'В ответе чувствуется прямота, но без злости.',bold:'Она отвечает уверенно и не боится лёгкой иронии.',direct:'Она отвечает коротко и по делу.',wise:'Она на секунду задумывается, подбирая точные слова.',
    formal:'Она отвечает собранно и внимательно.',bright:'Её настроение заметно улучшается.',gentle:'Она говорит мягко и сдержанно.',
    mysterious:'Её ответ остаётся немного загадочным.'
  };
  if (char.id==='haku') return kind==='joke'?'В голосе слышится тихая улыбка.':'Он отвечает мягко и внимательно.';
  return styles[char.style] || '';
}

function analyzeText(text) {
  const clean = String(text || '').trim().slice(0,500);
  return {kind:selectIntent(clean),raw:clean};
}

function talkToCharacter(state,char,text) {
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
  if (kind === 'where') { const spot=getNpcLocation(state,char.id); if (spot) reply = `Сейчас я в ${getLocation(spot).name}. Если окажешься поблизости, можешь заглянуть.`; else reply = 'Сейчас у меня дела за пределами деревни. Напишу, когда вернусь.'; }
  if (kind === 'schedule') { const spot=getNpcLocation(state,char.id); const activity=char.likes?.[(state.world.day+state.world.minute+char.id.length)%char.likes.length] || 'свои дела'; reply = `Сегодня мой план — ${activity}. Сейчас я ${spot?`в месте «${getLocation(spot).name}»`:'занята за пределами деревни'}. Ближе к вечеру расписание может измениться.`; }
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

return { analyzeText, talkToCharacter };
},
"src/data/pets.js": function(__require) {

const PETS = [
  {id:'konoha-cat',name:'Кот из Конохи',kind:'Кот',icon:'🐈',price:45,desc:'Любопытный кот, любит тёплые места и наблюдать за улицей.',temperament:'любопытный',likes:['дом','сад','тихие места']},
  {id:'ninja-dog',name:'Щенок-ниндзя',kind:'Собака',icon:'🐕',price:65,desc:'Преданный и энергичный компаньон, которому нужны прогулки.',temperament:'энергичный',likes:['прогулки','тренировки','игры']},
  {id:'white-rabbit',name:'Белый кролик',kind:'Кролик',icon:'🐇',price:35,desc:'Тихий питомец, любит свежую зелень и спокойную обстановку.',temperament:'спокойный',likes:['дом','сад','зелень']},
  {id:'courier-hawk',name:'Почтовый ястреб',kind:'Птица',icon:'🦅',price:90,desc:'Умная птица, помогает доставлять короткие сообщения.',temperament:'независимый',likes:['высота','прогулки','простор']},
  {id:'pond-turtle',name:'Садовая черепаха',kind:'Черепаха',icon:'🐢',price:30,desc:'Невозмутимый питомец для небольшого домашнего сада.',temperament:'неторопливый',likes:['сад','вода','солнце']}
];
const getPet = id => PETS.find(pet => pet.id === id);

return { PETS, getPet };
},
"src/ui/render.js": function(__require) {
const { CHARACTERS,getCharacter,initials } = __require("src/data/characters.js");
const { LOCATIONS,ORIGINS,getLocation,WEATHER,SEASONS } = __require("src/data/world.js");
const { getBond } = __require("src/core/store.js");
const { clockLabel,timePeriod,getWeather,seasonLabel,getNpcLocation } = __require("src/core/life.js");
const { PETS } = __require("src/data/pets.js");
const { getEnemy } = __require("src/data/enemies.js");






const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g,char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

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

function renderView(state) {
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

function renderStatus(state) {
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

function populateOrigins() {
  const select = document.getElementById('player-origin');
  select.innerHTML = ORIGINS.map(origin=>`<option value="${origin.id}">${origin.name}</option>`).join('');
  updateOriginNote();
}

function updateOriginNote() {
  const selected = document.getElementById('player-origin')?.value;
  const origin = ORIGINS.find(item=>item.id===selected) || ORIGINS[0];
  const note = document.getElementById('origin-note');
  if (note) note.textContent = origin.note;
}

function renderSettings(state) {
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

return { escapeHTML, renderView, renderStatus, populateOrigins, updateOriginNote, renderSettings };
},
"src/main.js": function(__require) {
const { CHARACTERS,getCharacter } = __require("src/data/characters.js");
const { ENEMIES,getEnemy } = __require("src/data/enemies.js");
const { ORIGINS,LOCATIONS,getLocation } = __require("src/data/world.js");
const { createInitialState,loadState,saveState,clearSave,addFeed,updateBond,removeItem,addItem } = __require("src/core/store.js");
const { talkToCharacter } = __require("src/core/gm.js");
const { travelTo,doActivity,skipTime,sleepUntilMorning,assignDailyTask,tickAction,updateNpcPositions,getNpcLocation } = __require("src/core/life.js");
const { getPet } = __require("src/data/pets.js");
const { renderView,renderStatus,populateOrigins,updateOriginNote,renderSettings,escapeHTML } = __require("src/ui/render.js");








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

return {  };
}
};
const __cache = Object.create(null);
function __require(id){
  if (__cache[id]) return __cache[id];
  const factory = __factories[id];
  if (!factory) throw new Error('Missing bundled module: ' + id);
  const exports = factory(__require);
  __cache[id] = exports;
  return exports;
}
try { __require("src/main.js"); } catch (error) {
  console.error('Naruto Enot Garem failed to start:', error);
  const panel = document.createElement('section');
  panel.style.cssText = 'position:fixed;z-index:99999;inset:16px;padding:22px;background:#1b2a22;color:#fff;border:1px solid #9ab17f;border-radius:16px;font:14px/1.5 system-ui;overflow:auto';
  const title = document.createElement('h2'); title.textContent = 'Не удалось запустить игру';
  const help = document.createElement('p'); help.textContent = 'Обнови папку игры целиком. При повторной ошибке проверь, что рядом с index.html лежит standalone.js.';
  const details = document.createElement('pre'); details.style.cssText = 'white-space:pre-wrap;color:#e7c9a7'; details.textContent = String(error && (error.stack || error.message) || error);
  panel.append(title, help, details); document.body.append(panel);
}
})();
