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

function getUnlockedCharacterArts(state,character) {
  if(!character) return [];
  const bond=state?.bonds?.[character.id]||{};
  const meetings=Number(bond.meetings)||0;
  const friendship=Number(bond.friendship)||0;
  const trust=Number(bond.trust)||0;
  return (character.art||[]).filter((_art,index)=>index===0 || (index===1 && (meetings>=2 || friendship>=20)) || (index===2 && (meetings>=4 || (friendship>=40 && trust>=25))));
}


return { CHARACTERS, getCharacter, initials, getUnlockedCharacterArts };
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
  {id:'campsite',name:'Лесной привал',icon:'🏕️',area:'За воротами',desc:'Тихая стоянка у реки для короткого отдыха во время вылазок.',bg:'assets/backgrounds/campsite.webp',activities:['Разбить лагерь','Приготовить ужин','Отдохнуть у костра']},
  {id:'bathhouse',name:'Термальный сад',icon:'♨️',area:'Юг',desc:'Тихая общественная зона отдыха с каменными дорожками и горячими источниками.',bg:'assets/backgrounds/bathhouse-garden.webp',activities:['Отдохнуть','Послушать воду','Поговорить']},
  {id:'dojo',name:'Зал додзё',icon:'🥋',area:'Восток',desc:'Крытый зал для спокойных упражнений, растяжки и командной подготовки.',bg:'assets/backgrounds/training-ground.webp',activities:['Отработать стойку','Тренировать контроль','Наблюдать за занятием']},
  {id:'archive',name:'Архив свитков',icon:'📜',area:'Запад',desc:'Специальное хранилище старых карт, отчётов и исторических записей.',bg:'assets/backgrounds/library.webp',activities:['Изучить карту','Найти старый отчёт','Разобрать свитки']},
  {id:'residential',name:'Жилой переулок',icon:'🏘️',area:'Жилой квартал',desc:'Небольшая улица с домами, садами и тихими двориками.',bg:'assets/backgrounds/tatami-home.webp',activities:['Прогуляться','Поздороваться с соседями','Осмотреть двор']},
  {id:'rooftop',name:'Крыши Конохи',icon:'🌆',area:'Центр',desc:'Высокие крыши с видом на улицы и монумент Хокаге.',bg:'assets/backgrounds/village-gate.webp',activities:['Посмотреть на город','Подышать воздухом','Понаблюдать за улицами']},
  {id:'greenhouse',name:'Оранжерея',icon:'🌺',area:'Юг',desc:'Небольшая теплица с сезонными растениями и редкими семенами.',bg:'assets/backgrounds/flower-shop.webp',activities:['Полить растения','Изучить семена','Помочь садовнику']}
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
      ownedLooks: Array.isArray(player.ownedLooks) ? [...new Set(player.ownedLooks)] : ['casual','shinobi'],
      jobId: player.jobId || '',
      workShifts: Number(player.workShifts)||0,
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
    bonds: {},
    metCharacters: [],
    gallerySeen: {},
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
    npcShuffle: Math.floor(Math.random()*100000),
    pets: [],
    phone: {app:'home',tab:'feed',posts:[],messages:[],videoViews:[],activeVideo:'',lastPostAction:0},
    settings: {autosave:true,animations:true,textSize:'normal',contrast:'normal',musicLink:true,confirmReset:true,showNames:true,musicVolume:55,effectVolume:70,languageIndex:0,romanceFadeToBlack:true,hideSensitiveText:true},
    ui: {screen:'world',view:'world',targetId:'',sceneCharacterId:'hinata',lastActionText:'',lastActionResult:'Ты прибыл в Коноху. Напиши, куда хочешь пойти, что сделать или с кем поговорить.',showHelp:true,drawerOpen:false,questTab:'active',bagTab:'all',selectedItemId:'',profileArtIndex:0}
  };
}

function normalizeState(input) {
  const base = createInitialState(input?.player || {});
  if (!input || typeof input !== 'object') return base;
  return {
    ...base,
    ...input,
    knownNames: input.knownNames && typeof input.knownNames === 'object' ? input.knownNames : {},
    metCharacters: Array.isArray(input.metCharacters) ? input.metCharacters : Object.keys(input.bonds||{}).filter(id=>(input.bonds?.[id]?.meetings||0)>0),
    gallerySeen: input.gallerySeen && typeof input.gallerySeen === 'object' ? input.gallerySeen : {},
    giftHistory: input.giftHistory && typeof input.giftHistory === 'object' ? input.giftHistory : {},
    meetingHistory: input.meetingHistory && typeof input.meetingHistory === 'object' ? input.meetingHistory : {},
    dialogueMeta: input.dialogueMeta && typeof input.dialogueMeta === 'object' ? input.dialogueMeta : {},
    companions: Array.isArray(input.companions) ? input.companions : [],
    player: {...base.player,...input.player,ownedLooks:Array.isArray(input.player?.ownedLooks)?[...new Set(input.player.ownedLooks)]:base.player.ownedLooks,workShifts:Number(input.player?.workShifts)||0,lastWorkDay:Number(input.player?.lastWorkDay)||0,stats:{...base.player.stats,...input.player?.stats,hp:Number(input.player?.stats?.hp??base.player.stats.hp)}},
    world: {...base.world,...input.world},
    settings: {...base.settings,...input.settings},
    ui: {...base.ui,...input.ui,drawerOpen:false,questTab:['active','history'].includes(input.ui?.questTab)?input.ui.questTab:'active',bagTab:['all','food','gift','clothing','material','other'].includes(input.ui?.bagTab)?input.ui.bagTab:'all',profileArtIndex:Math.max(0,Number(input.ui?.profileArtIndex)||0)},
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
  return state.bonds[id] || {friendship:0,trust:0,respect:0,irritation:0,meetings:0,stage:'Знакомство'};
}

function updateBond(state,id,delta={},options={}) {
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


const MAP_COORDS = {
  'main-street':[49,48],'ichiraku':[30,37],'flower-shop':[66,37],market:[80,48],training:[76,73],hospital:[44,82],hokage:[51,17],
  'tea-house':[28,56],river:[15,83],forest:[7,51],memorial:[14,18],gate:[50,5],library:[20,39],garden:[34,70],home:[56,64],
  academy:[81,20],campsite:[6,83],bathhouse:[21,63],dojo:[89,76],archive:[19,29],residential:[64,55],rooftop:[69,22],greenhouse:[40,70]
};

function getLocationAccess(state,id) {
  const place=getLocation(id);
  const renown=Number(state?.player?.stats?.renown)||0;
  if(id==='archive' && renown<12 && state?.player?.jobId!=='library') return {allowed:false,reason:'Для доступа в архив нужен 12-й уровень репутации или работа в библиотеке.'};
  if(id==='hokage' && renown<6) return {allowed:false,reason:'В резиденцию Хокаге пускают по делу или с поручительством. Сначала заслужи доверие жителей.'};
  if(place.locked) return {allowed:false,reason:place.lockReason||'Эта зона сейчас закрыта.'};
  return {allowed:true,reason:''};
}

function getTravelMinutes(fromId,toId) {
  const from=MAP_COORDS[fromId]||[50,50];
  const to=MAP_COORDS[toId]||[50,50];
  const distance=Math.hypot(from[0]-to[0],from[1]-to[1]);
  return Math.max(5,Math.min(32,Math.round(distance*.22)+5));
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
    state.npcShuffle = Math.floor(Math.random()*1000000);
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
  updateNpcPositions(state,false);
  addFeed(state,`Ты провёл время за своими делами. Сейчас ${timePeriod(state.world.minute)} · ${clockLabel(state.world.minute)}.`);
  return state;
}

function sleepUntilMorning(state) {
  const minutes = (24 * 60 - state.world.minute) + 7 * 60;
  advanceTime(state,minutes);
  updateNpcPositions(state,false);
  state.player.stats.stamina = Math.min(100,state.player.stats.stamina + 32);
  state.player.stats.focus = Math.min(100,state.player.stats.focus + 16);
  addFeed(state,`Ты хорошо отдохнул. Начался новый день — ${clockLabel(state.world.minute)}.`);
  return state;
}

function travelTo(state,id) {
  const place = getLocation(id);
  if (state.world.location === id) { state.ui.travelFailure='Ты уже находишься здесь.'; return false; }
  const access=getLocationAccess(state,id);
  if(!access.allowed) { state.ui.travelFailure=access.reason; return false; }
  const previousPlace=state.world.location;
  const travelMinutes=getTravelMinutes(previousPlace,id);
  const meetup=state.world.lastMeetup;
  if (meetup && meetup.day===state.world.day && meetup.location===previousPlace && (state.world.minute-(meetup.minute||state.world.minute))<=60) {
    const person=CHARACTERS.find(item=>item.id===meetup.characterId);
    if(person) {
      updateBond(state,person.id,{trust:-3,friendship:-1,irritation:2});
      addFeed(state,`Ты резко ушёл из «${getLocation(previousPlace).name}», не завершив встречу с ${person.name}. Она могла воспринять это как невнимательность.`);
    }
    state.world.lastMeetup=null;
  }
  state.world.location = id;
  tickAction(state,travelMinutes);
  state.ui.lastTravelMinutes=travelMinutes; state.ui.travelFailure='';
  addFeed(state,`Ты добрался до места «${place.name}» за ${travelMinutes} минут. ${place.desc}`);
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
  if (key !== 'player' && !state.companions?.includes(key)) return {ok:false,message:'Поручать бытовые дела можно только спутницам, которые согласились войти в твой ближний круг.'};
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
  for (const id of ['main-street','market','garden','tea-house','library','home','training','river','ichiraku','flower-shop','hospital','gate','academy','hokage','forest','memorial','campsite','bathhouse','dojo','archive','residential','rooftop','greenhouse']) add(id);
  return choices;
}

/** Place at most one heroine/NPC in each location for the current schedule slot. */
function updateNpcPositions(state,force=false) {
  if (!state) return {};
  const period = npcPeriod(state.world.minute);
  const stamp = `${state.world.day}:${period}`;
  if (!force && state.npcPeriod && state.npcPeriod !== stamp) state.npcShuffle = Math.floor(Math.random()*1000000);
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
  const topics = character.likes || ['повседневные дела'];
  const topic = topics[Math.floor(Math.random()*topics.length)];
  const moodLines = {
    quiet:[`Наконец-то нашлось немного тишины. Иногда это лучше любого отдыха.`,`Сегодня хочется пройтись без спешки и никуда не опаздывать.`,`Оставлю здесь маленькую заметку о спокойном дне.`],
    warm:[`Кто-нибудь уже успел сегодня порадовать близкого человека? Маленькие вещи правда важны.`,`Увидела кое-что красивое по дороге. Захотелось поделиться.`,`Надеюсь, у всех сегодня найдётся время на хороший обед.`],
    playful:[`У меня есть план на вечер. Пока не скажу какой — пусть будет сюрприз.`,`Кажется, сегодня я кого-то обыграю на тренировке.`,`Коноха сегодня шумная. И это даже весело.`],
    sharp:[`Напоминание: не обещайте того, что не собираетесь выполнять.`,`Работы много, но порядок в делах многое решает.`,`Небольшой совет: сначала подумайте, потом действуйте.`],
    gentle:[`Пожалуйста, не забывайте отдыхать между делами.`,`Сегодня помогла одному человеку. Надеюсь, у него всё наладится.`,`Берегите себя и не пропускайте обед.`]
  };
  const lines = moodLines[character.style] || [`Сегодняшний день оказался насыщенным.`,`Небольшая пауза между делами — и снова за работу.`,`Кто-нибудь хочет обсудить ${topic}?`];
  const platform=Math.random()<.62?'konohagram':'shinobix';
  const postText=lines[Math.floor(Math.random()*lines.length)];
  state.phone.posts.unshift({id:`post-${state.world.day}-${state.world.actions}-${character.id}`,authorId:character.id,text:postText,platform,day:state.world.day,minute:state.world.minute,likes:Math.floor(Math.random()*17),liked:false,image:state.world.location==='main-street'?'assets/backgrounds/konoha-main.webp':getLocation(state.npcLocations[character.id]||'main-street').bg});
  state.phone.posts = state.phone.posts.slice(0,40);
  state.phone.lastPostAction = state.world.actions;
}

function getLocationList() { return LOCATIONS; }

return { clockLabel, timePeriod, getLocationAccess, getTravelMinutes, getWeather, seasonLabel, advanceTime, tickAction, skipTime, sleepUntilMorning, travelTo, doActivity, assignDailyTask, getWorldMood, updateNpcPositions, getNpcLocation, getLocationList };
},
"src/core/gm.js": function(__require) {
const { getBond,updateBond,addFeed,addMemory,removeItem } = __require("src/core/store.js");
const { tickAction,getNpcLocation } = __require("src/core/life.js");
const { getLocation } = __require("src/data/world.js");



const INTENTS = [
  ['insult',/(заткнись|отстань|ненавижу|тупая|дура|идиот|бесполезн|молчи уже|замолчи|надоело.*слушать|поступил.*неприятно|не хочу.*видеть|глупо.*с твоей стороны|ты переходишь границ|не собираюсь.*терпеть|не разговаривай.*тоном|ты мне противна|ты ведешь себя грубо|ты ведёшь себя грубо)/i],
  ['boundary',/(пошл|неприлич|интим|секс|раздень|раздевай|покажи тело|эрот|неуместн|неудобный вопрос|личн.*вопрос|границ|некомфорт|смен(им|ить) тему|не хочу обсуждать|не спрашивай|неприятно.*обсуждать|уважительн.*общен|друг(ую|ую)? тему|поговорим.*другом|чем-нибудь другом)/i],
  ['introduce',/(меня зовут|зови меня|можно просто звать|я по имени|представлюсь|представиться|меня обычно называют|давай познакомимся|позволь представиться)/i],
  ['askName',/(как тебя зовут|назови свое имя|назови своё имя|кто ты|представься|как к тебе обращаться|твое имя|твоё имя|забыл.*имя|забы(л|ла).*имя|как тебя называют|напомнишь.*имя|узнать.*имя)/i],
  ['apology',/(прости|извини|прошу прощения|я был неправ|я была неправа|не хотел тебя обидеть|сожалею|мне жаль|исправлю свою ошибку|перегнул палку)/i],
  ['promiseCancel',/(не буду выполнять|отказываюсь.*обещан|не успеваю|не получится выполнить|снимем обещание|не смогу обещать|не смогу.*обещан|пересмотреть свои слова|отказаться от договор|честно отменим|не смогу прийти|не хочу обещать)/i],
  ['promise',/(обещаю|даю слово|я сделаю|обязательно помогу|можешь на меня рассчитывать|не забуду.*договор|постараюсь выполнить|беру эту задачу на себя|сделаю все|сделаю всё|не подвести)/i],
  ['memory',/(помнишь|в прошлый раз|вчера мы|тогда мы|как мы|ты помнишь|наша прогулка|прошлую встречку|прошлая встречка|запомнился наш прошлый|справились тогда|тот разговор)/i],
  ['where',/(где ты|где находишься|ты сейчас где|ты сейчас в|в каком месте|куда идешь|куда направляешься|куда ты направля|далеко от центра|где мы можем встрет|в какой части|все еще в больнице|всё ещё в больнице|где тебя найти|где искать)/i],
  ['pet',/(питом|животн|кот(?!ор)|собак|кролик|ястреб|черепах|котен|котён)/i],
  ['gift',/(^|\s)дарю|подарю|держи|это тебе|прими.*подар|вот тебе|принес.*цвет|принёс.*цвет|вручу.*подар|вручить.*подар|знак благодарности|купил для тебя|этот подарок|подарок пригодится/i],
  ['food',/(рамен|поесть|обед|ужин|чай|бэнто|перекус|готовк|горячего|ичираку|место для чая|умеешь готовить|какую еду|поедим|кушать)/i],
  ['interests',/(что тебе нравится|что любишь|любимое занятие|какие увлечения|увлечения|чем увлекаешься|расскажи о хобби|любишь больше всего|занимаешься после дел|нравятся книги|часто гуляешь|какую музыку|что тебя вдохновляет|любишь учиться|занятие.*успокаивает|что тебе по душе)/i],
  ['schedule',/(какие у тебя планы|что сегодня делаешь|чем сегодня занята|чем занята|чем занимаешься|твой распорядок|свободна ли|что собираешься делать|свободна сейчас|как проходит твой день|есть планы|много дел|найти свободное время|как проведешь день|как проведёшь день|планы на вечер|свободное время)/i],
  ['farewell',/(^|[\s,])пока([\s.!?,]|$)|до встречи|увидимся|мне пора|до скорого|спокойной ночи|хорошего вечера|береги себя/i],
  ['greet',/(привет|здравствуй|доброе утро|добрый день|добрый вечер|хай|салют|как дела|рад тебя видеть|приветствую)/i],
  ['comfort',/(грустно|тяжелый день|тяжёлый день|переживаю|волнуюсь|устал|устала|не получается|плохой день|мне одиноко|нет сил|не знаю, как поступить|нужно с кем-то поговорить|посидеть рядом)/i],
  ['compliment',/(ты отлично справилась|ты молодец|восхищаюсь|уважаю тво|уважаю тебя|классно получилось|хорошая работа|ты здорово умеешь|красиво выглядишь|хорошо выглядишь|здорово получилось|ты очень умная|ты умная|прекрасно организовала|нравится твой подход|замечать детали)/i],
  ['disagree',/(не согласен|не согласна|это плохая идея|я думаю иначе|я думаю немного иначе|не уверен|не уверена|другое мнение|ситуацию иначе|другой путь|не думаю, что это справедливо|позволь возразить|не подходит такой вариант|не убеждает|другой вариант)/i],
  ['plan',/(давай запланируем|составим план|что будем делать дальше|предлагаю маршрут|распределим время|предлагаю сначала|давай выберем маршрут|сначала решим|обсудить порядок действий|организовать встречу|список необходимых вещей|договориться о следующем шаге)/i],
  ['challenge',/(соревн|спорим|проверим наши навыки|вызов|состязани|попробуем на скорость|сравним результаты|готова к испытанию|кто точнее|полосу препятствий|проверим, кто)/i],
  ['train',/(трениров|потренируемся|покажешь.*техник|покажи технику|обуч|упражнен|контроль чакры|базовую технику|защитный барьер|точность движений|правильную стойку|командную координацию)/i],
  ['help',/(помог|помочь|нужна помощь|давай помогу|могу помочь|поддержу|могу поддержать|сделаем.*вместе|часть работы|могу сходить|разделить обязанности|что нужно сделать|помогу донести|возьму.*работы)/i],
  ['invite',/(пойд[её]м|составишь.*компани|прогуляемся|давай прогуляемся|сходим|вместе пообедаем|пойдём вместе|хочешь пройтись|заглянем в библиотеку|встретимся|немного пройтись|выпьем чаю вместе|сходить в сад|составить компанию)/i],
  ['weather',/(погод|дожд|снег|ветер|ветрено|жарк|холодно|похолод|солнечно|солнце|туман)/i],
  ['work',/(работ(а|у|ы|ой)(?=$|[^а-яё])|подработ|смена|смену|заработ|деньги|зарплат|трудоустро|дополнительные руки|платят|устроиться|свободное место|помощником повара)/i],
  ['joke',/(шутк|смешно|рассмеш|прикол|ха-ха|ахах|анекдот|забавн|перепутал двери|вот это поворот)/i],
  ['kind',/(спасибо|классн|крут|молодец|ты умн|ты добрая|ты добрый|приятно видеть|хорошо выглядишь|уважаю|рад, что мы встретились|хороший товарищ|приятно с тобой|ценю твою поддержку|доброжелательно|благодарю за совет|рядом как союзник|рад, что мы познаком|ценю|благодарю)/i],
  // Situations that are not ordinary small talk: the GM must ask for facts or offer a sensible next step.
  ['danger',/(за нами следят|кто-то следит|кто то следит|нас преследуют|меня преследуют|подозрительн.*человек|чужак.*рядом|неизвестный.*в лесу|слышал.*крик|кто-то кричит|кто то кричит|кажется.*опасност|что-то случилось|что то случилось|тревога|пропал человек|пропала девушка|пропал ребёнок|пропал ребенок)/i],
  ['confide',/(можно тебе довериться|хочу довериться|мне нужно выговориться|мне надо выговориться|есть кое-что личное|есть кое что личное|я хочу рассказать правду|хочу рассказать кое|мне нужно кое-что рассказать|мне нужно кое что рассказать|никому не рассказывал|никому не рассказывала|держи это в секрете|между нами|мне трудно признаться|боюсь рассказать|доверить тебе|довериться тебе|мне нужно тебе.{0,28}доверить|мне нужно тебе.{0,28}довериться)/i],
  ['lie',/(ты врешь|ты врёшь|ты лжешь|ты лжёшь|это неправда|я тебе не верю|не верю твоим словам|ты что-то скрываешь|ты что-то недоговариваешь|ты что то скрываешь|похоже, ты врешь|похоже, ты врёшь)/i],
  ['negotiate',/(давай договоримся|предлагаю сделку|в обмен на|мои условия|твои условия|какова цена|что ты хочешь взамен|чем я могу отплатить|обсудим условия|договоримся на таких условиях)/i],
  ['unexpected',/(я потерял|я потеряла|потерялся|потерялась|заблудился|заблудилась|случайно.*(разбил|разбила|сломал|сломала|уронил|уронила|разлил|разлила)|сломал чужую|сломала чужую|опоздал на встречу|опоздала на встречу|забыл о встрече|забыла о встрече|сорвалось|всё пошло не так|все пошло не так|случилась неприятность|у меня неприятности)/i],
  ['privacy',/(оставь меня|мне нужно побыть одному|мне нужно побыть одной|хочу побыть один|хочу побыть одна|не сейчас|мне нужно пространство|дай мне время|поговорим позже|не готов говорить|не готова говорить)/i],
  ['followup',/^(а\s+почему|а\s+зачем|и\s+что дальше|что потом|расскажи подробнее|можешь продолжить|что было дальше|и как ты решила|откуда ты знаешь|почему так|а если|что ты имеешь в виду|в каком смысле)/i],
  ['news',/(я узнал|я узнала|слышал новость|слышала новость|есть новость|хочу поделиться|случилось вот что|сегодня произошло|мне рассказали|говорят, что|похоже, что)/i],
  ['refusal',/(нет, спасибо|мне это не подходит|я не согласен на это|я не согласна на это|не согласен на это|не согласна на это)/i],
  ['question',/(расскажи|почему|что думаешь|как считаешь|что случилось|что нового|поговорим|расскажи о себе|твоё мнение|твое мнение|как лучше|что для тебя|можешь объяснить|объясни)/i]
];

const EFFECTS = {
  greet:{friendship:1,trust:0,respect:0,irritation:-1}, introduce:{friendship:1,trust:1}, askName:{friendship:1}, apology:{trust:5,respect:2,irritation:-18},
  promiseCancel:{trust:1,irritation:-1}, promise:{trust:3,respect:1}, help:{friendship:3,trust:5,respect:2,irritation:-2}, gift:{friendship:3,trust:2},
  invite:{friendship:2,trust:1}, train:{respect:3,friendship:1}, challenge:{respect:2}, comfort:{friendship:3,trust:3}, pet:{friendship:2},
  food:{friendship:1}, weather:{friendship:0}, work:{respect:1}, interests:{friendship:2,trust:1}, compliment:{friendship:2,respect:1},
  disagree:{respect:1}, plan:{trust:2,respect:1}, memory:{friendship:1,trust:1}, joke:{friendship:1}, kind:{friendship:2,trust:1},
  farewell:{trust:0}, question:{friendship:0}, boundary:{irritation:1}, insult:{friendship:-6,trust:-8,respect:-5,irritation:18},
  danger:{trust:2,respect:1}, confide:{trust:3,friendship:1}, lie:{irritation:3,respect:-1}, admitLie:{trust:-2,respect:2,irritation:1}, conflict:{trust:1}, negotiate:{respect:1}, unexpected:{trust:1}, privacy:{respect:1}, followup:{friendship:0}, news:{friendship:1}, refusal:{respect:1}, default:{friendship:0,trust:0,respect:0}
};

const normalize = value => String(value || '').toLocaleLowerCase('ru-RU').replace(/ё/g,'е').trim();
const choose = (list,seed=0) => list[Math.abs(seed) % list.length];
const hash = value => [...String(value)].reduce((n,ch)=>((n*31)+ch.charCodeAt(0))|0,7);

const styleTone = {
  playful:{open:['Ух ты, вот это поворот.','Любопытно. Давай разберёмся.','Хм, неожиданно.'],close:['Но не делай поспешных выводов.','Сначала факты, потом шутки.','Ладно, слушаю дальше.']},
  bold:{open:['Хорошо, говори прямо.','Не будем ходить вокруг да около.','Звучит серьёзно.'],close:['Я предпочитаю ясность.','Действовать будем с умом.','Проверим это на деле.']},
  sharp:{open:['Подожди. Тут не всё так просто.','Давай без драматизации.','Сначала уточним детали.'],close:['Не делай выводов раньше времени.','Мне нужны факты, а не догадки.','Вот тогда и решим.']},
  quiet:{open:['Давай спокойно. Я слушаю.','Поняла. Не торопись.','Хорошо, расскажи.'],close:['Не обязательно решать всё прямо сейчас.','Можно сначала просто разобраться.','Я не стану торопить тебя.']},
  gentle:{open:['Я рядом и слушаю.','Хорошо, можешь рассказать.','Не переживай, давай спокойно.'],close:['Решим шаг за шагом.','Тебе не нужно справляться в одиночку.','Главное — не торопиться.']},
  warm:{open:['Давай посмотрим, что можно сделать.','Спасибо, что рассказал.','Я тебя слушаю.'],close:['Вместе будет проще разобраться.','Давай начнём с малого.','Я помогу, чем смогу.']},
  formal:{open:['Поняла. Давайте уточним обстоятельства.','Хорошо. Сначала проверим сведения.','Принято. Нужны подробности.'],close:['После этого выберем дальнейшие действия.','Важно не делать поспешных выводов.','Так будет надёжнее.']},
  wise:{open:['Необычная ситуация. Давай рассмотрим её внимательно.','Понимаю. Начнём с того, что известно точно.','Спокойствие сейчас важнее поспешных решений.'],close:['Потом станет яснее, что делать дальше.','Опыт подсказывает не торопиться с выводами.','Каждый следующий шаг должен быть осмысленным.']},
  direct:{open:['Хорошо. К сути.','Поняла. Что произошло?','Давай по порядку.'],close:['После этого решим.','Не усложняй то, что можно проверить.','Жду конкретики.']},
  bright:{open:['Ого, не ожидала такого поворота.','Вот это новости. Рассказывай.','Интересно, давай разберёмся.'],close:['Только не будем паниковать раньше времени.','Найдём разумный выход.','Думаю, всё можно прояснить.']},
  mysterious:{open:['Любопытно... В этой истории явно не всё сказано.','Я слушаю. Некоторые детали важнее других.','Необычное совпадение.'],close:['Не будем раскрывать всё раньше времени.','Наблюдение иногда полезнее догадок.','Продолжай, я запомню детали.']}
};
function voice(char,part='open',seed='') {
  const bank=styleTone[char.style] || styleTone.warm;
  return choose(bank[part] || bank.open,hash(`${char.id}:${seed}:${part}`));
}
function topicFromText(raw) {
  const clean=normalize(raw);
  const topics=[
    ['работе',/работ|смен|зарплат|подработ/],['встрече',/встрет|опоздал|опоздала|ждал|ждала/],['питомце',/кот|собак|питом|животн|кролик|ястреб|черепах/],
    ['плане',/план|маршрут|дальше|сначала/],['тренировке',/тренир|чакр|упражнен|стойк/],['подарке',/подар|цвет|сувенир/],['еде',/рамен|еда|обед|ужин|чай|кухн/],
    ['случившемся',/случил|произош|неприятност|проблем|потерял|потеряла/],['погоде',/погод|дожд|снег|ветер|туман/],['доверии',/довер|секрет|правд|врешь|врёшь|лжешь|лжёшь/]
  ];
  return topics.find(([,pattern])=>pattern.test(clean))?.[0] || 'этом разговоре';
}
function recentContextReply(char,raw,state,meta) {
  const prev=meta?.lastPlayerText || '';
  const topic=topicFromText(prev);
  const text=normalize(raw);
  if (/почему|зачем/.test(text)) return `${voice(char,'open',raw)} Я имела в виду ${topic}: ${meta?.lastNpcReply || 'сказанное мной раньше'}. Если коротко, я не хочу делать выводы без деталей.`;
  if (/и что дальше|что потом|как именно|расскажи подробнее|можешь продолжить/.test(text)) return `Дальше я бы разобрала ${topic} по шагам. Сначала уточним, что уже известно, а потом решим, кто и что может сделать.`;
  if (/а если/.test(text)) return `Тогда стоит предусмотреть и такой вариант. Если ситуация изменится, мы пересмотрим решение, а не будем слепо держаться первоначального плана.`;
  if (/в каком смысле|что ты имеешь в виду/.test(text)) return `Я говорю о ${topic}. Не утверждаю, что знаю всё наверняка — просто обращаю внимание на детали, которые пока не сходятся.`;
  return `Ты возвращаешься к ${topic}. Я помню, о чём мы говорили: ${String(meta?.lastNpcReply || 'давай уточним это вместе').slice(0,150)}`;
}

function analyzeText(text) {
  const raw = String(text || '').trim().slice(0,500);
  const clean = normalize(raw);
  // Resolve uncommon but meaningful situations before broad everyday keywords.
  // Example: the substring "чай" inside "случайно" must not turn an accident into a food topic.
  const priority = [
    ['danger',/(за нами следят|кто-то следит|кто то следит|нас преследуют|меня преследуют|подозрительн.*человек|слышал.*крик|кто-то кричит|кто то кричит|кажется.*опасност|что-то случилось|что то случилось|тревога|пропал человек|пропала девушка)/i],
    ['confide',/(можно тебе довериться|хочу довериться|мне нужно выговориться|мне надо выговориться|есть кое-?что личное|хочу рассказать кое|мне нужно кое-?что рассказать|никому не рассказывал|никому не рассказывала|держи это в секрете|между нами|мне трудно признаться|боюсь рассказать|доверить тебе|довериться тебе)/i],
    ['lie',/(ты врешь|ты лжешь|это неправда|я тебе не верю|не верю твоим словам|ты что-то скрываешь|ты что-то недоговариваешь)/i],
    ['unexpected',/(я потерял|я потеряла|потерялся|потерялась|заблудился|заблудилась|случайно.*(разбил|разбила|сломал|сломала|уронил|уронила|разлил|разлила)|сломал чужую|сломала чужую|опоздал на встречу|опоздала на встречу|забыл о встрече|забыла о встрече|сорвалось|все пошло не так|всё пошло не так|случилась неприятность|у меня неприятности)/i],
    ['negotiate',/(давай договоримся|предлагаю сделку|в обмен на|мои условия|твои условия|что ты хочешь взамен|обсудим условия|договоримся на таких условиях)/i],
    ['privacy',/(оставь меня|мне нужно побыть одному|мне нужно побыть одной|хочу побыть один|хочу побыть одна|не сейчас|мне нужно пространство|дай мне время|поговорим позже|не готов говорить|не готова говорить|давай помолчим|мне нужна тишина)/i],
    ['admitLie',/(я соврал|я соврала|я солгал|я солгала|я тебе наврал|я тебе наврала|я скрыл правду|я скрыла правду|я не сказал правду|я не сказала правду)/i],
    ['conflict',/(мы поссорились|я поссорился|я поссорилась|мы поругались|я поругался|я поругалась|у нас конфликт|у нас ссора|перестали общаться|она на меня обиделась|он на меня обиделся)/i],
    ['followup',/^(а\s+почему|а\s+зачем|и\s+что дальше|что потом|расскажи подробнее|можешь продолжить|что было дальше|и как ты решила|откуда ты знаешь|почему так|а если|что ты имеешь в виду|в каком смысле)/i],
    ['news',/(я узнал|я узнала|слышал новость|слышала новость|есть новость|хочу поделиться|случилось вот что|сегодня произошло|мне рассказали|говорят, что|похоже, что)/i],
    ['refusal',/(нет, спасибо|мне это не подходит|я не согласен на это|я не согласна на это|не согласен на это|не согласна на это)/i]
  ];
  const intent = priority.find(([,pattern])=>pattern.test(clean))?.[0] || INTENTS.find(([,pattern])=>pattern.test(clean))?.[0] || (/[?？]/.test(raw) ? 'question' : 'default');
  return {kind:intent,raw};
}

function firstMeetReply(char,kind,raw,state) {
  const clean = normalize(raw);
  const playerName = String(state.player?.name || '').trim();
  const nameMatch = raw.match(/(?:меня зовут|зови меня|можно просто звать)\s+([А-ЯЁа-яё-]{2,24})/i);
  const introducedName = nameMatch?.[1] || playerName;
  const introduced = /меня зовут|зови меня|можно просто звать|я по имени|представлюсь|представиться|хочу представиться|меня обычно называют|давай познакомимся|позволь представиться/i.test(clean);
  if (introduced) {
    state.knownNames ||= {};
    state.knownNames[char.id] = introducedName || true;
    return `Приятно познакомиться, ${introducedName || 'рада знакомству'}. Я ${char.name}. ${choose([
      'Ты недавно в Конохе?', 'Ты здесь по делам или просто осматриваешь деревню?', 'Что привело тебя сюда?'
    ],hash(char.id+raw))}`;
  }
  if (kind === 'greet') {
    const greeting = char.style==='formal' || char.style==='wise' ? 'Добрый день' : char.style==='quiet' || char.style==='gentle' ? 'Здравствуйте' : 'Привет';
    return `${greeting}. Я ${char.name}. Кажется, мы раньше не встречались. Как к вам обращаться?`;
  }
  if (kind === 'askName') return `Я ${char.name}. Приятно познакомиться. А как мне называть тебя?`;
  if (kind === 'boundary') return `Я ${char.name}. Мне некомфортно обсуждать такое с незнакомым человеком. Давай сменим тему.`;
  if (kind === 'insult') return `Я ${char.name}. Не собираюсь продолжать разговор в таком тоне. Если хочешь познакомиться, начни с уважительного обращения.`;
  const answer = firstMeetAnswer(char,kind,raw,state);
  const selfIntro=choose([`Я ${char.name}, кстати.`, `Меня зовут ${char.name}.`],hash(char.id+kind));
  if (['privacy','farewell'].includes(kind)) return `${selfIntro} ${answer}`;
  if (kind==='followup') return `${selfIntro} Мы только начали разговор, поэтому не уверена, к чему относится вопрос. Уточни, пожалуйста, о чём именно ты спрашиваешь.`;
  return `${selfIntro} ${answer} Мы ещё не знакомы — как тебя зовут?`;
}
function firstMeetAnswer(char,kind,raw,state) {
  const place=getNpcLocation(state,char.id);
  const placeName=place?getLocation(place).name:'за пределами деревни';
  const weather={sunny:'Сегодня довольно ясно.',cloudy:'Небо затянуто облаками.',rain:'Идёт дождь, так что я стараюсь держаться под крышей.',snow:'Снегопад сегодня заметный.',wind:'На улице ветрено.',fog:'Сегодня в деревне туманно.'}[state.world.weather] || 'Погода сегодня переменчивая.';
  switch(kind) {
    case 'help': return 'Спасибо за предложение. Сначала расскажи, чем именно можешь помочь — я не люблю поручать дела наугад.';
    case 'gift': return 'Спасибо. Не ожидала подарка от человека, с которым только познакомилась, но внимание приятно.';
    case 'interests': return `В свободное время я обычно выбираю ${char.likes?.slice(0,2).join(' и ') || 'что-нибудь спокойное'}. А чем любишь заниматься ты?`;
    case 'food': return char.likes?.some(item=>/рамен|кулинар|еда|чай/i.test(item)) ? 'Я люблю хорошую еду. В Ичираку готовят неплохо — ты уже заходил туда?' : 'Сейчас можно сделать перерыв. Ты уже пробовал местную лапшу или предпочитаешь что-то другое?';
    case 'train': return 'Тренировка — неплохая идея. Сначала посмотрим, какой у тебя уровень подготовки, и выберем безопасное упражнение.';
    case 'weather': return `${weather} Ты давно в Конохе?`;
    case 'question': return 'Могу ответить, если пойму, о чём именно ты спрашиваешь. Сформулируй вопрос чуть конкретнее.';
    case 'compliment': return 'Спасибо за добрые слова. Мы только познакомились, но это всё равно приятно.';
    case 'kind': return 'Спасибо. Доброе отношение приятно даже от человека, с которым только что познакомилась.';
    case 'invite': return 'Мы только познакомились. Давай сначала немного поговорим здесь, а потом решим, будет ли нам интересно прогуляться.';
    case 'apology': return 'Ничего страшного. Мы почти не знакомы, поэтому я не уверена, за что ты извиняешься, но ценю вежливость.';
    case 'promise': return 'Спасибо за намерение. Мы пока мало знакомы, поэтому я не стану сразу полагаться на обещание — посмотрим, как всё сложится.';
    case 'promiseCancel': return 'Не переживай. Мы ещё не успели договориться о чём-то важном. Лучше предупредить заранее, чем обещать без уверенности.';
    case 'memory': return 'Мы только встретились, так что общих воспоминаний у нас пока нет. Возможно, со временем появятся.';
    case 'where': return `Сейчас я в районе «${placeName}», по своим делам. А ты где находишься?`;
    case 'schedule': return 'Точные планы на день я обычно не рассказываю незнакомым людям. Сейчас занимаюсь своими делами, а дальше посмотрим.';
    case 'pet': return char.style==='gentle' || char.style==='warm' ? 'Я хорошо отношусь к животным. Они часто чувствуют настроение лучше людей. У тебя уже есть питомец?' : 'Животные требуют заботы и терпения. Ты уже завёл кого-нибудь или пока только присматриваешься?';
    case 'comfort': return char.style==='sharp' ? 'Не знаю, смогу ли сразу помочь, ведь мы только познакомились. Но можешь рассказать, что случилось.' : 'Жаль, что у тебя выдался тяжёлый день. Мы пока не знакомы, но я могу выслушать, если хочешь рассказать.';
    case 'disagree': return 'У нас может быть разное мнение. Давай обсудим конкретно, без спешки и личных выпадов.';
    case 'plan': return 'Сначала уточним, чего ты хочешь добиться, а затем выберем один понятный следующий шаг.';
    case 'challenge': return 'Звучит интересно, но сначала договоримся о правилах. Мы ведь только познакомились, и я не хочу недоразумений.';
    case 'work': return 'Если ищешь подработку, посмотри объявления на рынке или спроси в местных заведениях. Там обычно подскажут, кому нужны помощники.';
    case 'joke': return char.style==='sharp' ? 'Хм. Не уверена, что это смешно, но попытку засчитываю.' : 'Неожиданно. Улыбнулась, хотя мы пока слишком мало знакомы, чтобы я поняла твоё чувство юмора.';
    case 'danger': return 'Не будем паниковать. Сначала скажи, где именно ты это заметил и что видел своими глазами. Если угроза реальная, лучше сразу сообщить патрулю.';
    case 'confide': return 'Я не стану давить. Можешь рассказать только то, чем готов поделиться. Если вопрос серьёзный, вместе подумаем, к кому обратиться.';
    case 'lie': return 'Мы только познакомились, поэтому не хочу спорить на пустом месте. Что именно показалось тебе неправдой? Давай сверим факты.';
    case 'admitLie': return 'Спасибо, что признался. Мы пока мало знакомы, поэтому я не могу сразу оценить ситуацию, но честность сейчас — правильный шаг.';
    case 'conflict': return 'Ссоры случаются, но я не хочу судить о другом человеке по одной стороне истории. Что произошло перед этим?';
    case 'negotiate': return 'Я готова выслушать предложение, но сначала обозначь условия и то, что предлагаешь взамен. Без этого соглашаться рано.';
    case 'unexpected':
      if (/потерял|потеряла|заблудил|заблудил/i.test(normalize(raw))) return 'Не паникуй. Вспомни последнее место, где ты точно видел свиток или ориентировался на местности. Начни поиск оттуда; если речь о потерявшемся человеке, лучше сразу сообщить патрулю.';
      if (/разбил|разбила|сломал|сломала|уронил|уронила/i.test(normalize(raw))) return 'Сначала убедись, что никто не пострадал. Потом лучше честно сообщить владельцу и предложить исправить ущерб. Скрывать случайность обычно только хуже.';
      return 'Похоже, день пошёл не по плану. Что конкретно произошло и что сейчас важнее всего исправить?';
    case 'privacy': return 'Хорошо, не буду навязываться. Иногда действительно полезно побыть одному. Береги себя.';
    case 'followup': return 'Мы только начали разговор, поэтому уточни, к какой части ты возвращаешься. Я не хочу додумывать за тебя.';
    case 'news': return 'Слушаю. Только давай отделим то, что ты знаешь сам, от слухов. Что произошло на самом деле?';
    case 'refusal': return 'Хорошо, я услышала. Не буду настаивать. Если захочешь предложить другой вариант, скажи.';
    case 'farewell': return 'До встречи. Надеюсь, ты быстро освоишься в деревне. Береги себя.';
    default: return 'Я тебя услышала. Давай чуть конкретнее: ты хочешь спросить о деревне, обсудить какое-то дело или просто познакомиться?';
  }
}

function disposition(char,bond) {
  const irritated = bond.irritation || 0;
  if (irritated >= 55) return 'angry';
  if (irritated >= 28) return 'cold';
  if (bond.friendship >= 55 && bond.trust >= 35) return 'warm';
  if (bond.friendship >= 25 || bond.trust >= 20) return 'familiar';
  return 'neutral';
}

function responseFor(char,kind,raw,state,bond,firstMeet=false) {
  const clean=normalize(raw);
  const liked=char.likes?.find(item=>clean.includes(normalize(item)));
  const mood=disposition(char,bond);
  const known=Boolean(state.knownNames?.[char.id]);
  const address=known && bond.friendship>=35 ? `, ${state.player.name}` : '';
  const hasRecentMeetup=state.world.lastMeetup?.characterId===char.id && state.world.lastMeetup.day===state.world.day;
  if (firstMeet) return firstMeetReply(char,kind,raw,state);
  if (mood==='angry' && !['apology','farewell','boundary','privacy','danger'].includes(kind)) {
    return choose([
      'Сейчас я не хочу продолжать этот разговор. После того, как ты извинишься, возможно, мы сможем поговорить.',
      'Ты уже переходил границы. Скажи, зачем пришёл, и не трать моё время.',
      'Мне не нравится, как ты со мной разговариваешь. На сегодня хватит.'
    ],hash(char.id+raw+bond.meetings));
  }
  if (mood==='cold' && !['apology','farewell','boundary','privacy','danger'].includes(kind) && !['warm','gentle'].includes(char.style)) {
    return choose(['Слушаю. Только давай без лишних слов — что ты хотел?','Я пока не уверена, что могу тебе доверять. Говори по делу.','Не обещаю, что соглашусь, но можешь объяснить.'],hash(char.id+raw));
  }
  if (kind==='followup') return recentContextReply(char,raw,state,state.dialogueMeta?.[char.id] || {});
  switch(kind) {
    case 'greet': {
      if (mood==='warm') return `Привет${address}. Рада тебя видеть. Как прошёл день?`;
      if (mood==='familiar') return `Привет${address}. Как дела? Давно не обсуждали, чем ты сейчас занят.`;
      const greetings={
        playful:'Привет. Ты сегодня просто поздороваться или уже придумал какую-нибудь затею?',
        bold:'Привет. Есть дело или просто решил заглянуть?',
        quiet:'Здравствуйте. Здесь сейчас спокойно. Можем немного поговорить.',
        warm:'Привет! Как проходит день?',
        sharp:'Привет. Что хотел обсудить?',
        direct:'Здравствуйте. Давай сразу к делу — что случилось?',
        formal:'Добрый день. Чем могу быть полезна?',
        wise:'Рада встрече. Как идут твои дела?',
        gentle:'Привет. Надеюсь, день проходит спокойно.',
        bright:'Привет! Что нового у тебя сегодня?',
        mysterious:'Привет. Неожиданная встреча. Что привело тебя сюда?'
      };
      return greetings[char.style] || choose(['Здравствуйте. Что привело тебя сюда?','Привет. Как у тебя дела?','Добрый день. Ты по какому-то делу?'],hash(char.id+raw+bond.meetings));
    }
    case 'introduce': return known ? `Мы уже знакомы, ${state.player.name}. Я ${char.name}. Что хотел рассказать?` : `Приятно познакомиться. Я ${char.name}. Чем сейчас занимаешься в Конохе?`;
    case 'askName': return `Я ${char.name}. Мы уже встречались, но повториться не помешает.`;
    case 'apology': return bond.irritation>0 ? 'Ладно. Я услышала извинения. Посмотрим, изменится ли что-нибудь дальше.' : 'Спасибо, что сказал это прямо. Давай постараемся не повторять ту же ситуацию.';
    case 'promiseCancel': return 'Поняла. Спасибо, что предупредил заранее. Я пересмотрю свои ожидания.';
    case 'promise': return 'Хорошо. Я запомню, но не буду считать обещание выполненным, пока не увижу результат.';
    case 'help': { const helpLines={warm:'Спасибо, помощь действительно пригодится. Давай решим, что сделать первым.',gentle:'Это очень кстати. Можешь помочь с одной небольшой задачей?',sharp:'Возможно. Только не хватайся за всё сразу — сначала уточним, что требуется.',formal:'Благодарю за предложение. Назову конкретную задачу, чтобы не тратить твоё время.',quiet:'Спасибо. Если не сложно, помоги мне с одной вещью.',playful:'О, доброволец? Тогда посмотрим, насколько ты надёжен. Начнём с простого.',direct:'Хорошо. Возьми на себя конкретную часть работы, остальное я сделаю сама.'}; return helpLines[char.style] || 'Возможно, помощь пригодится. Сначала уточним, что именно нужно сделать.'; }
    case 'gift': return state.ui?.lastGiftGiven ? (char.style==='quiet'||char.style==='gentle' ? 'Спасибо. Я не всегда умею сразу подобрать слова, но мне правда приятно.' : char.style==='sharp' ? 'Спасибо. Не думай, что подарками можно решить любой вопрос, но жест я ценю.' : 'Спасибо. Это очень внимательный жест. Я сохраню подарок.') : 'Ты говоришь о подарке, но пока ничего не передал. Не нужно торопиться — важнее само внимание.';
    case 'invite':
      if (mood==='angry') return 'Нет. Сейчас я не хочу проводить с тобой время.';
      if (mood==='neutral' || mood==='cold') return 'Мы пока не так хорошо знакомы. Давай сначала поговорим здесь.';
      return hasRecentMeetup ? 'Мы уже гуляли сегодня. Давай не будем торопиться и выберем другой день.' : choose(['Можно. Я как раз хотела немного пройтись.','Давай, но без спешки. Куда ты предлагаешь пойти?','Хорошая мысль. Я закончу дела и присоединюсь.'],hash(char.id+raw));
    case 'train': return char.style==='playful' || char.style==='bold' ? 'Наконец-то предложение по делу. Покажи, что умеешь.' : char.style==='quiet' || char.style==='gentle' ? 'Давай начнём спокойно с разминки и контроля чакры. Не стоит торопиться.' : char.style==='formal' ? 'Сначала определим цель тренировки, затем выберем подходящее упражнение.' : 'Хорошо. Начнём с разминки и простого упражнения, затем усложним.';
    case 'challenge': { const lines={playful:'Вот это уже интереснее. Только потом не говори, что я не предупреждала.',bold:'Принимаю. Выбирай испытание, но правила должны быть честными.',quiet:'Я предпочитаю командные упражнения соревнованию, но могу попробовать, если всё будет безопасно.',gentle:'Можно устроить дружеское состязание. Главное — без риска и обид.',formal:'Сначала определим условия, критерии и границы упражнения. Тогда согласна.',sharp:'Принимаю, если у тебя есть конкретное предложение, а не просто громкие слова.',direct:'Хорошо. Выбирай испытание и обозначь правила.'}; return lines[char.style] || 'Принимаю. Только договоримся о правилах заранее — так будет честно.'; }
    case 'lead': return char.style==='sharp' || char.style==='direct' ? 'План понятен. Посмотрим, насколько хорошо он сработает.' : 'Хорошо, я возьму на себя свою часть. Держи меня в курсе.';
    case 'defer': return 'Тогда я выберу вариант, который не создаст лишних проблем. Если передумаешь — скажи.';
    case 'memory': {
      const memory=(state.memories[char.id]||[]).find(item=>item.kind==='notable' && item.day <= state.world.day);
      return memory ? `Помню, как мы ${memory.text}. Тогда это действительно имело значение.` : 'Пока у нас не так много общих воспоминаний. Думаю, со временем это изменится.';
    }
    case 'joke': return char.style==='sharp' || char.style==='bold' ? 'Ха. Ладно, это было неплохо. Не думай, что я так легко рассмеюсь второй раз.' : char.style==='quiet' || char.style==='formal' ? 'Неожиданная шутка. Уголки губ всё-таки дрогнули.' : 'Ха-ха, ладно, это меня рассмешило.';
    case 'kind': return mood==='warm' ? 'Спасибо. От тебя такие слова особенно приятно слышать.' : 'Спасибо. Хорошо, когда замечают не только ошибки.';
    case 'compliment': return mood==='warm' ? 'Ты умеешь подобрать слова. Спасибо, мне приятно.' : 'Спасибо. Немного смущает, но я ценю искренность.';
    case 'disagree': return char.style==='bold' || char.style==='sharp' ? 'Не согласна — и готова объяснить почему. Давай сравним аргументы.' : 'Хорошо, у нас разные взгляды. Объясни, что именно тебя не убеждает.';
    case 'plan': return `Давай начнём с конкретики. Что важнее всего: ${char.likes?.[0] || 'главная задача'} или что-то другое?`;
    case 'where': { const loc=getNpcLocation(state,char.id); return loc ? `Сейчас я в районе «${getLocation(loc).name}». Если ты поблизости, можем пересечься.` : 'Сейчас я за пределами деревни. Когда вернусь, сообщу.'; }
    case 'schedule': return choose(['Планы на весь день я обычно не расписываю. Сейчас занимаюсь своими делами, а дальше посмотрим.','Пока не решила, как пройдёт остаток дня. Не люблю обещать заранее.','Есть несколько личных дел, но точного расписания у меня нет.'],hash(char.id+raw+state.world.day));
    case 'comfort': { const lines={sharp:'Не люблю пустые утешения. Расскажи, что случилось, и подумаем, что можно сделать.',direct:'Что именно произошло? Давай разберём проблему по пунктам.',quiet:'Мне жаль, что тебе тяжело. Можем просто немного посидеть, если не хочется говорить.',gentle:'Мне жаль, что день выдался таким. Хочешь рассказать подробнее? Я выслушаю.',warm:'Не держи всё в себе. Расскажи, что случилось — попробуем найти выход.',formal:'Если хочешь, я помогу спокойно разобрать ситуацию и определить следующий шаг.',playful:'Не обещаю мгновенно исправить весь мир, но выслушать точно могу.',wise:'Иногда полезно сначала назвать то, что тревожит. Давай начнём с этого.'}; return lines[char.style] || 'Мне жаль, что день выдался таким. Хочешь рассказать подробнее? Я выслушаю.'; }
    case 'pet': return char.style==='warm' || char.style==='gentle' ? 'Люблю животных. Они часто чувствуют настроение лучше людей. Как зовут твоего питомца?' : 'Животные требуют заботы и терпения. Ты уже завёл кого-нибудь?';
    case 'food': return liked || char.likes?.includes('рамен') ? 'Тогда нам стоит заглянуть в Ичираку. Я знаю, что там готовят хорошо.' : 'Я не против перекусить. Ты уже выбрал место?';
    case 'weather': return state.world.weather==='rain' ? 'Дождь усилился. Я бы предпочла переждать его под крышей.' : state.world.weather==='snow' ? 'Снег сегодня красивый, но на дорогах скользко.' : state.world.weather==='sunny' ? 'Погода располагает к прогулке. Главное — не забыть о делах.' : 'Погода переменчивая. Посмотрим, что будет ближе к вечеру.';
    case 'work': return `В Конохе можно найти подработку в разных местах. Я бы посоветовала начать с того, что у тебя получается лучше всего — ${char.likes?.[0] || 'помощи жителям'}.`;
    case 'interests': return `Мне действительно нравятся ${char.likes?.slice(0,3).join(', ') || 'спокойные занятия'}. Особенно ${char.likes?.[0] || 'то, чем можно заняться с пользой'}. А что интересно тебе?`;
    case 'boundary': return mood==='angry' ? 'Я уже говорила, что не хочу обсуждать такое. Если не сменишь тему, я уйду.' : 'Мне некомфортны такие вопросы. Давай сменим тему и поговорим уважительно.';
    case 'insult': return 'Не разговаривай со мной так. Я не собираюсь продолжать этот разговор, пока ты не изменишь тон.';
    case 'farewell': return mood==='warm' ? 'До встречи. Напиши, когда доберёшься домой.' : 'До встречи. У меня ещё остались дела.';
    case 'danger': {
      const lines={
        gentle:'Не пугайся. Давай останемся там, где есть люди, и спокойно вспомним детали. Я помогу передать сообщение патрулю.',
        warm:'Оставайся рядом с людным местом. Расскажи, что заметил, а я помогу связаться с патрулём.',
        formal:'Укажи точное место, время и признаки, которые ты заметил. Мы должны передать проверяемую информацию ответственным.',
        quiet:'Не пытайся выяснять это самостоятельно. Скажи, что именно ты заметил, и мы спокойно проверим сведения.',
        sharp:'Без догадок. Где, когда и что именно ты видел? Если есть конкретные признаки опасности, сообщим патрулю.',
        direct:'Сначала факты: место, время и что ты видел. Потом решим, кому сообщить. Самостоятельно проверять подозрительное место не нужно.',
        playful:'Это не тот случай, где стоит геройствовать. Расскажи, что заметил, и позовём тех, кто должен проверить ситуацию.',
        bold:'Хорошо, действуем с головой. Опиши, что видел, но не пытайся вступать в конфликт. Я помогу предупредить патруль.',
        wise:'Ощущение может обмануть, поэтому отделим наблюдения от предположений. Что ты видел собственными глазами и где?',
        mysterious:'Иногда тень — просто тень. Но детали стоит проверить: что именно показалось тебе подозрительным?'
      };
      return lines[char.style] || `Сначала факты: место, время и что именно ты видел. Не будем обвинять случайных прохожих. Если есть реальная угроза, позовём патруль.`;
    }
    case 'confide': return bond.trust>=25
      ? `${voice(char,'open',raw)} Я сохраню это между нами в рамках разговора. Расскажи, что произошло, и скажи, хочешь ли ты совета или просто чтобы тебя выслушали.`
      : `Я готова выслушать, но доверие не появляется мгновенно. Начни с того, что тебе комфортно рассказать; личные подробности можешь оставить при себе.`;
    case 'lie': return char.style==='direct'||char.style==='sharp'
      ? `Не спеши обвинять. Покажи, какая именно часть моих слов не сходится с тем, что ты знаешь. Если я ошиблась, признаю это.`
      : `Мне неприятно, что ты мне не веришь, но спорить бесполезно. Давай разберём конкретные факты и выясним, где возникло недоразумение.`;
    case 'admitLie': return bond.trust>=25
      ? `Мне неприятно это слышать, но я ценю, что ты наконец сказал правду. Теперь мне понадобится время, чтобы снова поверить словам — начни с честных поступков.`
      : `Понимаю. Признаться непросто, но это не отменяет последствий. Я не стану делать вид, будто ничего не произошло; доверие придётся восстановить.`;
    case 'conflict': return char.style==='wise'||char.style==='formal'
      ? `Не буду выбирать сторону, пока не знаю обстоятельств. Расскажи, с чего начался спор, что каждый из вас сказал и чего ты хочешь теперь.`
      : `Неприятная ситуация. Не торопись писать или говорить что-то сгоряча. Что стало причиной ссоры и хочешь ли ты помириться?`;
    case 'negotiate': return char.style==='formal'||char.style==='wise'
      ? `Давай зафиксируем три вещи: что нужно сделать, что предлагаешь ты и какие есть ограничения. После этого можно обсуждать соглашение.`
      : `Сначала назови условия и свою часть сделки. Я не соглашусь на то, что оставляет одну сторону с одними обязанностями.`;
    case 'unexpected': {
      if (/потерял|потеряла|заблудил|заблудил/i.test(clean)) return `Не паникуй. Вспомни последнее место, где вещь была у тебя или где ты точно знал дорогу. Начнём поиск оттуда.`;
      if (/опоздал|опоздала|забыл.*встреч|забыла.*встреч/i.test(clean)) return `Тогда лучше честно предупредить тех, кто ждёт, и не придумывать оправданий. Ты уже сообщил им, что задерживаешься?`;
      if (/разбил|сломал|сломала|сломал чужую/i.test(clean)) return `Сначала убедись, что никто не пострадал. Потом лучше сразу сказать владельцу и предложить исправить ущерб. Скрывать случайность обычно только хуже.`;
      return `${voice(char,'open',raw)} Расскажи, что случилось сначала и что уже удалось сделать. Выберем ближайший разумный шаг, а не будем пытаться решить всё сразу.`;
    }
    case 'privacy': return mood==='warm'||mood==='familiar'
      ? `Хорошо. Я не буду тебя тревожить. Когда захочешь вернуться к разговору, просто дай знать.`
      : `Поняла. Я оставлю тебя в покое. Не буду задавать лишних вопросов.`;
    case 'news': return `Слушаю. Что именно произошло и откуда у тебя эта информация? Если это пока слух, не стоит распространять его дальше.`;
    case 'refusal': return `Хорошо, я не стану настаивать. Давай подберём другой вариант или просто отложим это решение.`;
    case 'question':
      if (liked) return `Ты спросил про ${liked}. Для меня это важно, потому что именно такие вещи помогают отвлечься от повседневных обязанностей.`;
      return choose(['Сложно ответить без контекста. Что именно ты хочешь узнать?','У меня есть своё мнение, но сначала уточни, о какой ситуации говоришь.','Могу рассказать, но хочу понять, что именно тебя интересует.'],hash(char.id+raw));
    default:
      if (liked) return `Ты упомянул ${liked}. Да, это одна из тем, в которых я разбираюсь. Что именно тебя интересует?`;
      return choose(['Поняла. И что ты собираешься делать дальше?','Я услышала. Можешь объяснить, почему решил поступить именно так?','Хм. Мне нужно немного подумать. Ты хочешь узнать моё мнение или просто поделился новостью?'],hash(char.id+raw+bond.meetings));
  }
}

function memoryFor(kind,raw) {
  const map={help:'ты предложил помощь',gift:'ты сделал мне подарок',promise:'ты дал обещание',promiseCancel:'мы пересмотрели обещание',invite:'ты предложил совместную прогулку',train:'мы обсуждали тренировку',apology:'ты извинился',insult:'ты говорил со мной резко',danger:'ты сообщил о возможной опасности',confide:'ты поделился личной проблемой',negotiate:'мы обсуждали условия',unexpected:'у тебя возникла непредвиденная ситуация',news:'ты поделился новостью',admitLie:'ты признался, что скрыл правду',conflict:'ты рассказал о ссоре'};
  if (!map[kind]) return null;
  return {kind:'notable',text:map[kind],source:kind,raw:String(raw).slice(0,100)};
}

function talkToCharacter(state,char,text) {
  const {kind,raw}=analyzeText(text);
  if (!raw) return {kind:'default',reply:'Не расслышала. Повтори, пожалуйста.',bond:getBond(state,char.id),usedText:''};
  const before=getBond(state,char.id);
  const firstMeet=before.meetings===0;
  const knownName=Boolean(state.knownNames?.[char.id]);
  state.dialogueMeta ||= {};
  const meta=state.dialogueMeta[char.id] || {};
  const repeatedGreeting=kind==='greet' && meta.lastGreetDay===state.world.day && (state.world.minute-meta.lastGreetMinute)<90;
  const encounterKey=`${state.world.day}:${state.world.location}`;
  const isNewEncounter=meta.lastEncounterKey!==encounterKey;
  const delta={...(EFFECTS[kind]||EFFECTS.default)};
  const sameIntentTooSoon = meta.lastKind===kind && meta.lastDay===state.world.day && (state.world.minute-(meta.lastMinute||0))<45;
  if (repeatedGreeting || sameIntentTooSoon) { delta.friendship=0; delta.trust=0; delta.respect=0; delta.irritation=0; }
  const giftId=state.ui?.pendingGiftId;
  const gift=kind==='gift'?(state.inventory.find(item=>item.id===giftId&&item.qty>0)||state.inventory.find(item=>item.kind==='gift'&&item.qty>0)):null;
  if (kind==='gift' && !gift) { delta.friendship=0; delta.trust=0; }
  if (kind==='boundary' && before.irritation>=20) delta.irritation=7;
  const bond=repeatedGreeting?before:updateBond(state,char.id,delta,{countMeeting:isNewEncounter});
  tickAction(state,12);
  if (kind==='gift' && gift) { removeItem(state,gift.id,1); state.ui.pendingGiftId=null; }
  if (kind==='promise') state.scroll.unshift({id:`promise-${Date.now()}`,title:`Обещание: ${char.name}`,desc:raw.slice(0,130),kind:'promise',done:false,optional:true,characterId:char.id});
  if (kind==='promiseCancel') { const p=state.scroll.find(item=>item.characterId===char.id&&item.kind==='promise'&&!item.done); if(p){p.done=true;p.cancelled=true;p.status='Пересмотрено';} }
  if (kind==='train') { state.player.stats.chakra=Math.min(100,state.player.stats.chakra+3); state.player.stats.focus=Math.min(100,state.player.stats.focus+2); }
  if (kind==='invite' && bond.friendship>=20 && bond.trust>=10) state.world.lastMeetup={characterId:char.id,day:state.world.day,location:state.world.location};
  state.knownNames ||= {};
  const introMatch=/меня зовут|зови меня|можно просто звать|я по имени|представлюсь|представиться|хочу представиться|меня обычно называют|давай познакомимся|позволь представиться/i.test(normalize(raw));
  if (introMatch) { const stated=raw.match(/(?:меня зовут|зови меня|можно просто звать)\s+([А-ЯЁа-яё-]{2,24})/i)?.[1]; state.knownNames[char.id]=stated || state.player.name || true; }
  else if (knownName && normalize(raw).includes(normalize(state.player.name))) state.knownNames[char.id]=state.knownNames[char.id] || state.player.name;
  state.ui.lastGiftGiven = Boolean(kind==='gift' && gift);
  const reply=repeatedGreeting
    ? 'Мы совсем недавно уже поздоровались. Ты хотел что-то обсудить?'
    : firstMeet ? firstMeetReply(char,kind,raw,state) : responseFor(char,kind,raw,state,bond,false);
  const recent = [...(meta.recent || []),{player:raw,npc:reply,kind,day:state.world.day,minute:state.world.minute}].slice(-8);
  state.dialogueMeta[char.id]={...meta,lastKind:kind,lastMinute:state.world.minute,lastDay:state.world.day,lastEncounterKey:encounterKey,lastPlayerText:raw,lastNpcReply:reply,recent,turnCount:(meta.turnCount||0)+1,...(kind==='greet'&&!repeatedGreeting?{lastGreetDay:state.world.day,lastGreetMinute:state.world.minute}:{})};
  const memory=memoryFor(kind,raw);
  if(memory) addMemory(state,char.id,memory);
  state.ui.targetId=char.id;
  state.ui.pendingGiftId=null;
  return {kind,reply,bond,usedText:raw,knownName:Boolean(state.knownNames[char.id])};
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
"src/data/jobs.js": function(__require) {

const JOBS = [
  {id:'ramen',name:'Помощник в Ичираку',place:'ichiraku',wage:28,duration:90,desc:'Помогать на кухне, принимать заказы и поддерживать чистоту.',skill:'Сервис и готовка'},
  {id:'market',name:'Работник рынка',place:'market',wage:24,duration:90,desc:'Раскладывать товары и помогать торговцам с покупателями.',skill:'Торговля'},
  {id:'flowers',name:'Помощник цветочной лавки',place:'flower-shop',wage:22,duration:75,desc:'Собирать букеты и ухаживать за цветами.',skill:'Растения и ремесло'},
  {id:'library',name:'Помощник библиотеки',place:'library',wage:20,duration:90,desc:'Сортировать свитки и помогать посетителям находить книги.',skill:'Знания'},
  {id:'clinic',name:'Помощник медицинского корпуса',place:'hospital',wage:30,duration:100,desc:'Подготавливать материалы и выполнять простые поручения медиков.',skill:'Медицина'},
  {id:'courier',name:'Курьер резиденции',place:'hokage',wage:32,duration:80,desc:'Передавать документы между учреждениями деревни.',skill:'Логистика'},
  {id:'academy',name:'Помощник инструктора',place:'academy',wage:26,duration:100,desc:'Подготавливать площадку и помогать с безопасными упражнениями.',skill:'Обучение'}
];
const getJob = id => JOBS.find(job=>job.id===id) || null;

return { JOBS, getJob };
},
"src/ui/render.js": function(__require) {
const { CHARACTERS,getCharacter,getUnlockedCharacterArts,initials } = __require("src/data/characters.js");
const { LOCATIONS,ORIGINS,getLocation,WEATHER,SEASONS } = __require("src/data/world.js");
const { getBond } = __require("src/core/store.js");
const { clockLabel,timePeriod,getWeather,seasonLabel,getNpcLocation,getTravelMinutes,getLocationAccess } = __require("src/core/life.js");
const { PETS } = __require("src/data/pets.js");
const { JOBS,getJob } = __require("src/data/jobs.js");
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
  const featured = peopleHere[0] || null;
  if (state.ui.sceneCharacterId && !peopleHere.some(item=>item.id===state.ui.sceneCharacterId)) state.ui.sceneCharacterId = featured?.id || '';
  if (featured && !state.ui.sceneCharacterId) state.ui.sceneCharacterId = featured.id;
  const activeCharacter = peopleHere.find(item=>item.id===state.ui.sceneCharacterId) || featured;
  const bond = activeCharacter ? getBond(state,activeCharacter.id) : {friendship:0,trust:0,respect:0,stage:'Тихая локация',meetings:0};
  const stats = state.player.stats;
  state.gallerySeen ||= {characters:{},backgrounds:[]};
  state.gallerySeen.characters ||= {};
  state.gallerySeen.backgrounds ||= [];
  if (!state.gallerySeen.backgrounds.includes(sceneImage)) state.gallerySeen.backgrounds.push(sceneImage);
  if (activeCharacter) {
    state.gallerySeen.characters[activeCharacter.id] ||= [];
    const src = activeCharacter.art?.[0]?.src;
    if (src && !state.gallerySeen.characters[activeCharacter.id].includes(src)) state.gallerySeen.characters[activeCharacter.id].push(src);
  }
  const lastChat = activeCharacter ? (state.dialogues[activeCharacter.id]||[]).slice(-1)[0] : null;
  const speaker = lastChat?.from==='npc' ? activeCharacter?.name : 'Игровой мастер';
  const narration = lastChat?.from==='npc' ? lastChat.text : (state.ui.lastActionResult || `${place.desc} Ты можешь осмотреться, поговорить с тем, кто рядом, или отправиться дальше.`);
  const dangerMap = {forest:'forest-ambusher',gate:'road-rogue',campsite:'masked-scout'};
  const enemyId = dangerMap[place.id] || '';
  const enemyVisible = Boolean(enemyId && ((state.world.day * 13 + state.world.actions * 7 + state.world.minute) % 4 === 1));
  const ambientEnemy = enemyVisible ? getEnemy(enemyId) : null;
  const ambientPet = state.pets?.[0];
  return `<section class="rp-full-scene" aria-label="Игровая сцена">
      <img class="rp-full-bg" src="${escapeHTML(sceneImage||'assets/backgrounds/konoha-main.webp')}" alt="${escapeHTML(place.name)}" loading="eager" decoding="async">
      <div class="rp-full-vignette"></div>
      <div class="rp-hud-top"><span class="rp-chip"><img src="assets/ui/cropped/location.png" alt="">${escapeHTML(place.name)}</span><span class="rp-chip">${weather.icon} ${weather.label} · ${seasonLabel(state)} · ${clockLabel(state.world.minute)}</span><span class="rp-chip">День ${state.world.day}</span></div>
      <div class="rp-health-hud"><span>♥ ${stats.hp??100} HP</span><span>◈ ${stats.stamina} EN</span></div>
      ${activeCharacter?`<button class="rp-cutout" data-action="open-person" data-id="${activeCharacter.id}" aria-label="Открыть досье: ${escapeHTML(activeCharacter.name)}"><img src="${escapeHTML(activeCharacter.art?.[0]?.src||'')}" alt="${escapeHTML(activeCharacter.name)}"><span class="rp-cutout-name"><b>${escapeHTML(activeCharacter.name)}</b><small>${escapeHTML(activeCharacter.role)}</small></span></button>`:''}
      ${ambientPet?`<div class="rp-full-pet" title="${escapeHTML(ambientPet.name)}">${ambientPet.icon||'🐾'}</div>`:''}
      ${ambientEnemy?`<button class="rp-full-enemy" data-action="scene-patrol" data-id="${ambientEnemy.id}"><img src="${ambientEnemy.image}" alt=""><span>${escapeHTML(ambientEnemy.name)} · проверить</span></button>`:''}
      <div class="rp-place-title"><small>СЕЙЧАС В КОНОХЕ</small><h2>${escapeHTML(place.name)}</h2><p>${escapeHTML(place.desc)}</p></div>
      <div class="rp-scene-bottom"><div class="rp-speaker-line"><b>${escapeHTML(speaker)}</b><span>${activeCharacter?`Рядом · ${escapeHTML(activeCharacter.name)}`:'Тихая сцена'}</span></div><p>${escapeHTML(narration)}</p></div>
    </section>
    <section class="rp-control-deck">
      <form id="world-action-form" class="rp-text-action"><label><span>СВОБОДНОЕ ДЕЙСТВИЕ</span><small>Пиши, что делаешь, куда идёшь или что исследуешь</small></label><textarea name="action" rows="2" maxlength="700" placeholder="Например: осматриваю витрину, затем захожу в цветочную лавку…" required>${escapeHTML(state.ui.lastActionText||'')}</textarea><button class="btn btn-primary" type="submit">Выполнить ↗</button></form>
      <form id="world-dialogue-form" class="rp-text-dialogue"><label><span>ТВОЯ РЕПЛИКА</span><small>${activeCharacter?`Разговор с ${escapeHTML(activeCharacter.name)} · только ручной ввод`:'Рядом сейчас никого нет'}</small></label>${activeCharacter?`<input type="hidden" name="characterId" value="${activeCharacter.id}"><textarea name="message" rows="2" maxlength="700" placeholder="Напиши своими словами, что говоришь…" required></textarea><button class="btn btn-soft" type="submit">Сказать ➤</button>`:`<div class="rp-empty-talk">Персонаж появится в этой сцене, когда окажется в локации. Можно отправиться по карте или немного подождать.</div><button class="btn btn-soft" type="button" data-view="map">Открыть карту</button>`}</form>
    </section>
    <div class="rp-bottom-shortcuts"><button data-view="locations">🌸 Локации</button><button data-view="map">⌖ Карта</button><button data-view="scroll">📜 Задания</button><button data-view="gallery">▧ Галерея</button><button data-action="skip-time" data-hours="1">◷ +1 час</button></div>`;
}
function renderMap(state) {
  const place = getLocation(state.world.location);
  const coords = {
    'main-street':[49,48],'ichiraku':[30,37],'flower-shop':[66,37],market:[80,48],training:[76,73],hospital:[44,82],hokage:[51,17],
    'tea-house':[28,56],river:[15,83],forest:[7,51],memorial:[14,18],gate:[50,5],library:[20,39],garden:[34,70],home:[56,64],
    academy:[81,20],campsite:[6,83],bathhouse:[21,63],dojo:[89,76],archive:[19,29],residential:[64,55],rooftop:[69,22],greenhouse:[40,70]
  };
  const pins = LOCATIONS.map(location=>{
    const [x,y]=coords[location.id]||[50,50];
    const access=getLocationAccess(state,location.id); const locked=!access.allowed; const minutes=getTravelMinutes(place.id,location.id);
    return `<button class="map-pin ${location.id===place.id?'current':''} ${locked?'locked':''}" style="left:${x}%;top:${y}%" data-action="travel" data-id="${location.id}" ${locked?'disabled':''} title="${escapeHTML(locked?access.reason:location.name)}"><span>${location.icon}</span><b>${escapeHTML(location.name)}</b><i>${location.id===place.id?'Здесь':locked?'Закрыто':`${minutes} мин`}</i></button>`;
  }).join('');
  return `${heading('Карта Конохи','Выбирай точку на схеме. Переход займёт игровое время; внезапный уход со встречи может повлиять на отношения.')}
    <section class="map-ornate-banner map-ornate-banner-v2"><div><small>🌸 КАРТА КОНОХИ</small><h3>Деревня Скрытого Листа</h3><p>Текущее место: <b>${escapeHTML(place.name)}</b></p></div><button class="btn btn-soft" data-action="toggle-map-legend">${state.ui.mapLegend?'Скрыть легенду':'Открыть легенду'}</button></section>
    ${state.ui.mapLegend?`<section class="panel-card map-legend"><b>Легенда карты</b><span>🏠 Жилые места</span><span>🍜 Еда и магазины</span><span>⚕️ Службы и госпиталь</span><span>🥋 Тренировки</span><span>🌲 Природа</span><span>🔒 Временно закрытая зона</span><p>Переход занимает от 5 до 32 игровых минут в зависимости от расстояния. Если ты договаривался о встрече, внезапный уход будет заметен собеседнику.</p></section>`:''}
    <section class="map-overview" aria-label="Схематичная карта Конохи"><svg class="map-roads" viewBox="0 0 1000 640" preserveAspectRatio="none" aria-hidden="true"><defs><pattern id="map-grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="rgba(246,208,231,.06)" stroke-width="1"/></pattern></defs><rect width="1000" height="640" fill="url(#map-grid)"/><path d="M-40 250 C170 205 230 300 390 275 S720 190 1040 255 M170 -30 C220 120 350 170 500 230 S650 420 610 680 M-30 485 C180 430 280 520 445 495 S770 410 1030 485" fill="none" stroke="#c89bb9" stroke-width="25" opacity=".16" stroke-linecap="round"/><path d="M-40 250 C170 205 230 300 390 275 S720 190 1040 255 M170 -30 C220 120 350 170 500 230 S650 420 610 680 M-30 485 C180 430 280 520 445 495 S770 410 1030 485" fill="none" stroke="#e3c3d9" stroke-width="2" opacity=".22" stroke-dasharray="7 13"/><path d="M740 -20 C690 100 830 180 790 300 S860 520 1010 660" fill="none" stroke="#6fa8b2" stroke-width="50" opacity=".2"/><path d="M70 80 L230 35 390 85 470 40 690 65 930 120 950 330 875 580 660 605 450 570 240 605 50 500Z" fill="none" stroke="rgba(246,198,225,.22)" stroke-width="3" stroke-dasharray="10 10"/><g fill="rgba(195,139,176,.16)" stroke="rgba(236,188,220,.16)"><rect x="335" y="95" width="135" height="78" rx="12"/><rect x="520" y="95" width="170" height="90" rx="12"/><rect x="340" y="370" width="155" height="90" rx="12"/><rect x="560" y="365" width="125" height="100" rx="12"/></g><g fill="rgba(232,176,211,.35)" font-size="18" font-family="sans-serif"><text x="390" y="140">ЦЕНТР</text><text x="565" y="145">ТОРГОВЫЙ РЯД</text><text x="367" y="420">ЖИЛОЙ КВАРТАЛ</text><text x="575" y="420">ВОСТОК</text></g></svg>${pins}<div class="map-compass">N<br>✦</div><div class="map-scale">СХЕМА ДЕРЕВНИ · НЕ В МАСШТАБЕ</div></section>
    <div class="map-locations-list">${LOCATIONS.map(location=>`<button class="map-list-row ${location.id===place.id?'current':''}" data-action="travel" data-id="${location.id}" ${!getLocationAccess(state,location.id).allowed?'disabled':''}><span>${location.icon}</span><b>${escapeHTML(location.name)}</b><small>${escapeHTML(location.area)}</small><em>${location.id===place.id?'Ты здесь':getLocationAccess(state,location.id).allowed?`${getTravelMinutes(place.id,location.id)} мин · Перейти`:'Закрыто 🔒'}</em></button>`).join('')}</div>`;
}
function renderDay(state) {
  const companions = CHARACTERS.filter(character=>state.companions?.includes(character.id));
  const assignments = state.assignments.filter(item=>item.day===state.world.day);
  const taskOptions = [['cook','Приготовить еду'],['tidy','Уборка дома'],['shop','Покупки на рынке'],['study','Учёба и чтение'],['train','Тренировка'],['garden','Уход за садом'],['clinic','Помощь в больнице'],['rest','Отдых']];
  return `${heading('Распорядок дня','Личные планы жителей скрыты. Поручения можно распределять только тем спутницам, которые согласились войти в твой ближний круг.')}
    <section class="ref-day-banner" style="--scene:url('assets/backgrounds/tatami-home.webp')"><div><small>ДЕНЬ ${state.world.day} · ${seasonLabel(state)}</small><h3>Домашние дела и совместные планы</h3><p>Собственные занятия персонажей остаются их личным делом; поручения можно менять или отменять.</p></div></section>
    <section class="panel-card ref-day-form-card"><div class="ref-section-title"><span class="ref-section-icon"><img src="assets/ui/cropped/home.png" alt=""></span><div><small>НОВОЕ ЗАНЯТИЕ</small><h3>Распределить дела</h3></div></div>${companions.length?`<form id="assignment-form" class="assignment-form"><label>Кто займётся?<select name="actor"><option value="player">${escapeHTML(state.player.name)}</option>${companions.map(character=>`<option value="${character.id}">${escapeHTML(character.name)}</option>`).join('')}</select></label><label>Чем займётся?<select name="task">${taskOptions.map(([id,label])=>`<option value="${id}">${label}</option>`).join('')}</select></label><button class="btn btn-primary" type="submit">Назначить дело</button></form>`:`<div class="empty-state">Пока некому поручать бытовые дела. Сначала укрепи доверие и пригласи девушку в ближний круг из её профиля.</div>`}</section>
    <section class="ref-plan-grid">${assignments.length?assignments.map(item=>`<article class="ref-plan-card"><span class="ref-plan-icon">${item.done?'✓':'✦'}</span><div><b>${escapeHTML(item.actorName)}</b><small>${escapeHTML(taskOptions.find(([id])=>id===item.task)?.[1]||item.task)}</small></div><em class="${item.done?'done':''}">${item.done?'Выполнено':'Запланировано'}</em></article>`).join(''):'<div class="empty-state">На сегодня пока нет назначенных дел.</div>'}</section>
    <section class="panel-card private-routine-note"><div class="card-head"><h3>Повседневная жизнь Конохи</h3><small>РАСПИСАНИЯ НЕ ПОКАЗЫВАЮТСЯ</small></div><p>У каждого жителя есть собственные планы и предпочтения. Они перемещаются самостоятельно. Ты узнаёшь, где находится персонаж, только при встрече, наблюдении или в разговоре — личное расписание целиком не раскрывается.</p></section>`;
}

function renderSettingsPage(state) {
  const s=state.settings;
  return `${heading('Настройки','Тёмно-фиолетовая тема, розовые акценты и параметры сохранения.')}
    <section class="panel-card ref-settings-card settings-ornate"><div class="ref-section-title"><span class="ref-section-icon">⚙</span><div><small>ОБЩИЕ ПАРАМЕТРЫ</small><h3>Игровой процесс</h3></div></div>
      <label class="setting-row"><span><b>Автосохранение</b><small>Записывать прогресс после действий</small></span><input class="switch" type="checkbox" data-setting="autosave" ${s.autosave?'checked':''}></label>
      <label class="setting-row"><span><b>Показывать имена персонажей</b><small>Подписи над фигурами в игровых сценах</small></span><input class="switch" type="checkbox" data-setting="showNames" ${s.showNames!==false?'checked':''}></label>
      <label class="setting-row"><span><b>Анимации</b><small>Плавные переходы и эффекты сцены</small></span><input class="switch" type="checkbox" data-setting="animations" ${s.animations?'checked':''}></label>
      <label class="setting-row"><span><b>Скрывать романтические эпизоды</b><small>Нейтральный переход сцены без подробностей</small></span><input class="switch" type="checkbox" data-setting="romanceFadeToBlack" ${s.romanceFadeToBlack!==false?'checked':''}></label>
      <label class="setting-row"><span><b>Режим приватности</b><small>Скрывать нейтральные романтические переходы и отмечать чувствительные темы плашкой «Цензура»</small></span><input class="switch" type="checkbox" data-setting="hideSensitiveText" ${s.hideSensitiveText!==false?'checked':''}></label>
      <label class="setting-row"><span><b>Размер текста</b><small>Удобство чтения на телефоне</small></span><select class="small-select" data-setting="textSize"><option value="normal" ${s.textSize==='normal'?'selected':''}>Обычный</option><option value="large" ${s.textSize==='large'?'selected':''}>Крупный</option></select></label>
      <label class="setting-row"><span><b>Контраст</b><small>Выделение текста и элементов</small></span><select class="small-select" data-setting="contrast"><option value="normal" ${s.contrast==='normal'?'selected':''}>Обычный</option><option value="high" ${s.contrast==='high'?'selected':''}>Повышенный</option></select></label>
      <div class="settings-slider-row"><label for="music-volume"><b>Громкость музыки</b><output>${s.musicVolume??55}%</output></label><input id="music-volume" type="range" min="0" max="100" value="${s.musicVolume??55}" data-setting="musicVolume"></div>
      <div class="settings-slider-row"><label for="effect-volume"><b>Громкость эффектов</b><output>${s.effectVolume??70}%</output></label><input id="effect-volume" type="range" min="0" max="100" value="${s.effectVolume??70}" data-setting="effectVolume"></div>
      <div class="language-cycle"><div><b>Язык интерфейса</b><small>Пока доступен только русский</small></div><div class="language-buttons"><button data-action="language-prev" aria-label="Предыдущий язык">‹</button><strong>Русский</strong><button data-action="language-next" aria-label="Следующий язык">›</button></div></div>
      <div class="ref-music-panel"><b>Музыка из библиотеки</b><p>Атмосферная японская инструментальная композиция. Управление громкостью будет применяться к встроенному звуку, когда он подключён.</p><a href="https://pixabay.com/music/ambient-japanese-style-ambient-475587/" target="_blank" rel="noopener">Открыть Pixabay ↗</a></div>
      <div class="ref-save-actions"><button class="btn btn-soft" data-action="save-now">Сохранить сейчас</button><button class="btn btn-soft" data-action="export-save">Экспортировать прогресс</button><button class="btn btn-soft" data-action="import-save">Импортировать прогресс</button><input id="import-file" type="file" accept="application/json,.json" hidden><button class="btn btn-ghost" data-action="reset-save">Сбросить сохранение</button></div>
    </section>`;
}
function renderPersonCard(state,character) {
  const bond = getBond(state,character.id);
  const value = Math.max(bond.friendship,bond.trust,bond.respect);
  const portrait = character.art?.[0]?.src || '';
  const statusClass=value>=75?'bond-close':value>=40?'bond-warm':value<=8?'bond-new':'bond-neutral';
  return `<button class="person-card ref-person-card ${statusClass}" data-action="open-person" data-id="${character.id}"><span class="ref-card-portrait"><img src="${portrait}" alt="${escapeHTML(character.name)}" loading="lazy"><i>${escapeHTML(character.role)}</i></span><span class="ref-card-copy"><strong>${escapeHTML(character.name)}</strong><small>${escapeHTML(character.personality)}</small><span class="bond-line"><span>${escapeHTML(bond.stage||'Знакомая')}</span><b>${value}/100</b></span><span class="bond-track"><i style="width:${value}%"></i></span></span></button>`;
}

function renderPeople(state) {
  const met = new Set([...(state.metCharacters||[]),...Object.keys(state.bonds||{}).filter(id=>(state.bonds?.[id]?.meetings||0)>0)]);
  const available = CHARACTERS.filter(item => state.unlocked.includes(item.id) && met.has(item.id));
  const secretOpen = state.unlocked.includes('haku');
  return `${heading('Герои','Здесь появляются только те, с кем ты уже познакомился лично.')}
    <div class="people-toolbar"><span>${available.length} знакомых персонажей</span><span>Рамка карточки отражает текущее состояние отношений</span></div>
    ${available.length?`<div class="people-grid">${available.map(item=>renderPersonCard(state,item)).join('')}</div>`:`<section class="panel-card empty-heroes"><div class="empty-heroes-mark">🌸</div><h3>Пока нет знакомых героев</h3><p>Посещай места Конохи, замечай людей на сцене и начинай разговор. После первой личной беседы героиня появится здесь.</p><button class="btn btn-primary" data-view="world">Вернуться в RP</button></section>`}
    ${!secretOpen?`<button class="person-card secret-card" data-action="secret-hint"><div class="person-top"><div class="person-avatar secret-avatar">?</div><div><strong>Неизвестный гость</strong><small>Секретная встреча</small></div></div><p class="person-desc">В старом лесу иногда видят незнакомого путешественника. Следы чаще появляются зимой.</p><div class="bond-line"><span>Загадка</span><b>???</b></div></button>`:''}`;
}
function renderPersonDetail(state,character) {
  const bond = getBond(state,character.id);
  const history = state.dialogues[character.id] || [];
  const lastMemories = state.memories[character.id] || [];
  const value = Math.max(bond.friendship,bond.trust,bond.respect);
  const characterPlace=getNpcLocation(state,character.id);
  const isHere=characterPlace===state.world.location;
  const placeName=characterPlace?getLocation(characterPlace).name:'за пределами деревни';
  const allArt=character.art||[];
  const art=getUnlockedCharacterArts(state,character);
  const index=Math.min(art.length-1,Math.max(0,state.ui.profileArtIndex||0));
  const currentArt=art[index]||art[0]||allArt[0];
  state.gallerySeen ||= {characters:{},backgrounds:[]}; state.gallerySeen.characters ||= {};
  state.gallerySeen.characters[character.id] ||= [];
  if(currentArt?.src&&!state.gallerySeen.characters[character.id].includes(currentArt.src)) state.gallerySeen.characters[character.id].push(currentArt.src);
  const knownSince=state.meetingHistory?.[character.id]?.firstDay;
  const gifts=state.giftHistory?.[character.id]||[];
  const stageClass=value>=70?'high':value>=35?'mid':'new';
  const meetingText=knownSince?`Знакомы с ${knownSince} дня`:'Дата знакомства пока неизвестна';
  return `${heading(character.name,`${character.role} · ${character.personality}`)}
    <div class="dossier-layout">
      <aside class="panel-card dossier-stats ${stageClass}"><div class="dossier-person-head">${avatar(character,true)}<h3>${escapeHTML(character.name)}</h3><small>${escapeHTML(character.role)}</small></div>
        <div class="dossier-status-badge">${escapeHTML(bond.stage||'Знакомы')}</div>
        <div class="dossier-metric"><span>Дружба</span><b>${bond.friendship||0}/100</b><i><u style="width:${bond.friendship||0}%"></u></i></div>
        <div class="dossier-metric"><span>Доверие</span><b>${bond.trust||0}/100</b><i><u style="width:${bond.trust||0}%"></u></i></div>
        <div class="dossier-metric"><span>Уважение</span><b>${bond.respect||0}/100</b><i><u style="width:${bond.respect||0}%"></u></i></div>
        <dl class="dossier-facts"><div><dt>Статус</dt><dd>${escapeHTML(bond.stage||'Знакомая')}</dd></div><div><dt>Встреч</dt><dd>${bond.meetings||0}</dd></div><div><dt>Знакомы</dt><dd>${escapeHTML(meetingText)}</dd></div><div><dt>Энергия</dt><dd>Неизвестна</dd></div><div><dt>Настроение</dt><dd>${isHere?'Можно понять по поведению':'Неизвестно'}</dd></div><div><dt>Личные деньги</dt><dd>Неизвестно</dd></div></dl>
        <div class="dossier-likes"><b>Что известно</b><p>Нравится: ${character.likes.map(escapeHTML).join(', ')||'Пока неизвестно'}</p><p>Характер: ${escapeHTML(character.personality)}</p><p>Не любит: ${escapeHTML(character.dislikes||'Пока не выяснено')}</p></div>
        ${state.companions?.includes(character.id)?'<div class="companion-state">Входит в ближний круг</div>':(bond.friendship>=35&&bond.trust>=25?`<button class="btn btn-soft full-width" data-action="invite-companion" data-id="${character.id}">Пригласить в ближний круг</button>`:'')}
        <button class="btn btn-ghost full-width" data-action="back-people">← К героям</button>
      </aside>
      <div class="dossier-main">
        <section class="panel-card dossier-gallery"><div class="card-head"><h3>Галерея персонажа</h3><small>${index+1} / ${art.length} открыто</small></div>
          <div class="dossier-art-stage"><button class="art-arrow prev" data-action="profile-art-prev" data-id="${character.id}" aria-label="Предыдущее изображение">‹</button><img src="${escapeHTML(currentArt?.src||'')}" alt="${escapeHTML(character.name)} — ${escapeHTML(currentArt?.label||'Портрет')}" data-action="view-art" data-src="${escapeHTML(currentArt?.src||'')}" loading="eager"><button class="art-arrow next" data-action="profile-art-next" data-id="${character.id}" aria-label="Следующее изображение">›</button><span class="art-caption">${escapeHTML(currentArt?.label||'Портрет')}</span></div>
          <div class="dossier-art-dots">${art.map((item,i)=>`<button class="${i===index?'active':''}" data-action="profile-art-set" data-id="${character.id}" data-index="${i}" aria-label="${escapeHTML(item.label)}"></button>`).join('')}</div>${allArt.length>art.length?`<p class="art-unlock-hint">Следующие образы открываются по мере развития знакомства. Сейчас открыто ${art.length} из ${allArt.length}.</p>`:''}
        </section>
        <section class="panel-card dossier-story"><div class="card-head"><h3>История ваших встреч</h3><small>${history.length} реплик</small></div><p class="dossier-bio">${escapeHTML(character.notes||character.personality)}</p><div class="dossier-history">${history.length?history.slice(-12).map(item=>`<div class="dossier-history-line ${item.from==='player'?'from-player':'from-npc'}"><b>${item.from==='player'?escapeHTML(state.player.name):escapeHTML(character.name)}</b><p>${escapeHTML(item.text)}</p><small>День ${item.day} · ${String(Math.floor((item.minute||0)/60)).padStart(2,'0')}:${String((item.minute||0)%60).padStart(2,'0')}</small></div>`).join(''):'<p class="chat-hint">Пока здесь нет сохранённых разговоров. История будет пополняться после встреч.</p>'}</div></section>
        <section class="panel-card dossier-gifts"><div class="card-head"><h3>Подарки и расходы</h3><small>${gifts.length} записей</small></div>${gifts.length?`<ul>${gifts.map(item=>`<li>${escapeHTML(item.name)} · ${item.price?`${item.price} рё`: 'стоимость неизвестна'} · день ${item.day}</li>`).join('')}</ul>`:'<p class="chat-hint">Пока подарков и расходов на неё не записано.</p>'}</section>
        <section class="panel-card chat-card"><div class="card-head"><h3>Личный разговор</h3><small>${isHere?'ОНА РЯДОМ':'НЕТ НА МЕСТЕ'}</small></div>${isHere?`<form id="chat-form" class="chat-form"><input type="hidden" name="characterId" value="${character.id}"><textarea name="message" class="chat-input" rows="2" maxlength="500" placeholder="Напиши свою реплику вручную…" required></textarea><button class="send-button" type="submit">➤</button></form>`:`<div class="chat-away-note">${escapeHTML(character.name)} сейчас в локации «${escapeHTML(placeName)}». Личная беседа доступна после встречи.</div>`}</section>
      </div>
    </div>`;
}
function renderPhone(state) {
  const app=state.phone?.app || 'home';
  const posts=state.phone?.posts || [];
  const messages=state.phone?.messages || [];
  const contacts=CHARACTERS.filter(character=>state.unlocked.includes(character.id) && (state.bonds?.[character.id]?.meetings||0)>0);
  const stamp=minute=>`${String(Math.floor(minute/60)).padStart(2,'0')}:${String(minute%60).padStart(2,'0')}`;
  const apps=[
    ['konohagram','◎','Konohagram','Фото и повседневная лента','photo'],
    ['line','✉','KonohaLine','Личные сообщения','chat'],
    ['shinobix','𝕏','ShinobiX','Короткие записи и обсуждения','text'],
    ['scrolltube','▶','ScrollTube','Видео из жизни деревни','video']
  ];
  const names={konohagram:'Konohagram',line:'KonohaLine',shinobix:'ShinobiX',scrolltube:'ScrollTube'};
  const activeName=names[app]||'Смартфон';
  const appButton=(item)=>`<button class="phone-launch-app app-${item[0]}" data-action="phone-app" data-id="${item[0]}"><span class="phone-launch-icon">${item[1]}</span><b>${item[2]}</b><small>${item[3]}</small></button>`;
  let content='';
  if(app==='home') {
    content=`<div class="phone-app-grid">${apps.map(appButton).join('')}</div><section class="phone-widget"><small>СЕГОДНЯ В КОНОХЕ</small><b>${state.phone.posts?.length||0} публикаций в ленте</b><p>Новые записи появляются по мере того, как знакомые занимаются своими делами.</p></section>`;
  } else if(app==='konohagram' || app==='shinobix') {
    const platformPosts=posts.filter(post=>(post.platform||'konohagram')===app);
    content=`<form id="social-post-form" class="phone-compose" data-platform="${app}"><textarea name="post" rows="2" maxlength="${app==='shinobix'?280:400}" placeholder="${app==='shinobix'?'Что думаешь? Напиши короткую запись…':'Поделись моментом из сегодняшнего дня…'}" required></textarea><button class="btn btn-primary" type="submit">Опубликовать</button></form><div class="phone-feed">${platformPosts.length?platformPosts.map(post=>{const author=CHARACTERS.find(character=>character.id===post.authorId);const avatarSrc=author?.art?.[0]?.src;const media=app==='konohagram'?`<div class="social-photo" style="background-image:url('${escapeHTML(post.image||'assets/backgrounds/konoha-main.webp')}')"></div>`:'';return `<article class="phone-post ${app==='shinobix'?'short-post':''}"><div class="phone-post-head">${avatarSrc?`<img src="${avatarSrc}" alt="">`:'<span class="phone-player-avatar">Я</span>'}<div><b>${escapeHTML(author?.name||state.player.name)}</b><small>День ${post.day} · ${stamp(post.minute||0)}</small></div><span class="phone-post-source">${author?'подписка':'ты'}</span></div>${media}<p>${escapeHTML(post.text)}</p><button data-action="phone-like" data-id="${post.id}" class="phone-like ${post.liked?'liked':''}">♥ ${post.likes||0}</button></article>`}).join(''):'<div class="empty-state">Лента пока пустая. Напиши первую публикацию — знакомые смогут на неё отреагировать.</div>'}</div>`;
  } else if(app==='line') {
    content=`${contacts.length?`<form id="phone-message-form" class="phone-compose"><label class="vn-select-label">Контакт</label><select name="characterId">${contacts.map(character=>`<option value="${character.id}">${escapeHTML(character.name)}</option>`).join('')}</select><textarea name="message" rows="3" maxlength="500" placeholder="Сообщение вручную…" required></textarea><button class="btn btn-primary" type="submit">Отправить</button></form>`:'<div class="empty-state">Контактов пока нет. Сначала встреться с персонажем лично, чтобы обменяться контактами.</div>'}<div class="phone-messages">${messages.slice(-35).reverse().map(message=>{const author=CHARACTERS.find(character=>character.id===message.characterId);return `<article class="phone-message ${message.from==='player'?'outgoing':'incoming'}"><small>${escapeHTML(author?.name||'Собеседник')} · ${stamp(message.minute||0)}</small><p>${escapeHTML(message.text)}</p></article>`}).join('')}</div>`;
  } else if(app==='scrolltube') {
    const videos=[
      {id:'v1',title:'Тренировка контроля чакры: базовые упражнения',author:'Академия Конохи',place:'training-ground.webp',duration:'08:42',views:128,desc:'Спокойный разбор базовых упражнений на контроль чакры.'},
      {id:'v2',title:'Утро на главной улице Конохи',author:'Городской канал',place:'konoha-main.webp',duration:'03:16',views:84,desc:'Небольшая прогулка по центру деревни.'},
      {id:'v3',title:'Как приготовить рамен дома',author:'Ичираку',place:'ichiraku.webp',duration:'12:05',views:241,desc:'Рецепт бульона и сборка простой порции рамена.'},
      {id:'v4',title:'Вечерняя прогулка у реки',author:'Личный дневник',place:'river-sunset.webp',duration:'05:31',views:67,desc:'Вечерние виды и шум воды.'}
    ];
    const active=videos.find(video=>video.id===state.phone.activeVideo);
    content=active?`<div class="video-player"><button class="phone-back video-back" data-action="video-back">‹ К списку видео</button><div class="video-player-screen" style="background-image:url('assets/backgrounds/${active.place}')"><span>▶</span><small>${active.duration}</small></div><h3>${active.title}</h3><p>${active.desc}</p><small>${active.author} · ${active.views+(state.phone.videoViews?.includes(active.id)?1:0)} просмотров</small></div>`:`<div class="video-feed">${videos.map(video=>`<article class="video-card"><button class="video-thumb" data-action="video-play" data-id="${video.id}" style="background-image:url('assets/backgrounds/${video.place}')"><span>▶</span><small>${video.duration}</small></button><div><b>${video.title}</b><small>${video.author} · ${video.views+(state.phone.videoViews?.includes(video.id)?1:0)} просмотров</small></div></article>`).join('')}</div><p class="chat-hint">Локальный видеоканал с сюжетными роликами о жизни Конохи.</p>`;
  }
  return `${heading('Смартфон','Четыре местных приложения: фото-лента, личные сообщения, короткие посты и видеоканал.')}
    <section class="phone-shell"><div class="phone-notch"></div><div class="phone-statusbar"><b>木ノ葉 NET</b><span>${stamp(state.world.minute)} · ${state.world.weather==='rain'?'🌧️':state.world.weather==='snow'?'❄️':'☀️'} · ${state.player.stats.coins} рё</span></div>
      <div class="phone-app-head"><button class="phone-back" data-action="phone-app" data-id="home" aria-label="На главный экран телефона">${app==='home'?'葉':'‹'}</button><div><b>${activeName}</b><small>${app==='home'?'Главный экран приложений':'Локальная сеть Конохи'}</small></div><span class="phone-online">● сеть</span></div>
      <div class="phone-app-content">${content}</div>
      <div class="phone-bottom"><button data-action="phone-app" data-id="home">⌂ Домой</button><button data-action="phone-app" data-id="konohagram">◎ Фото</button><button data-action="phone-app" data-id="line">✉ Чат</button><button data-action="phone-app" data-id="shinobix">𝕏 Посты</button></div>
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
  const history=entries.filter(item=>item.done||item.cancelled);
  const active=entries.filter(item=>!item.done&&!item.cancelled);
  const shown=state.ui.questTab==='history'?history:active;
  return `${heading('Задания','Обещания, просьбы героинь и личные цели. Награды отображаются только тогда, когда о них прямо сказано.')}
    <section class="quest-banner"><div><small>🌸 СВИТОК КОНОХИ</small><h3>Твои дела и обещания</h3><p>Задание может появиться после разговора, договорённости или твоей собственной цели.</p></div></section>
    <div class="quest-tabs"><button data-action="quest-tab" data-id="active" class="${state.ui.questTab!=='history'?'active':''}">Активные <b>${active.length}</b></button><button data-action="quest-tab" data-id="history" class="${state.ui.questTab==='history'?'active':''}">История <b>${history.length}</b></button></div>
    <section class="panel-card"><div class="scroll-list">${shown.length?shown.map(item=>`<article class="scroll-item ${item.done?'completed':''}"><div class="scroll-icon">${item.kind==='promise'?'🌸':item.kind==='mystery'?'❔':'📜'}</div><div><strong>${escapeHTML(item.title)}</strong><p>${escapeHTML(item.desc)}</p>${item.progress!=null?`<div class="quest-progress"><i style="width:${Math.min(100,(item.progress/(item.target||1))*100)}%"></i></div>`:''}<small class="scroll-state">${item.done?(item.cancelled?'Отменено':'Выполнено'):(item.deadline?`Срок: ${escapeHTML(item.deadline)}`:'Без указанного срока')}</small></div><div class="quest-actions">${!item.done?`<button class="mini-btn" data-action="quest-complete" data-id="${item.id}">Отметить</button><button class="mini-btn muted-btn" data-action="quest-ignore" data-id="${item.id}">Отложить</button>${item.kind==='promise'?`<button class="mini-btn muted-btn" data-action="quest-cancel" data-id="${item.id}">Отменить</button>`:''}`:'<span class="done-mark">✓</span>'}</div></article>`).join(''):'<div class="empty-state">В этом разделе пока нет записей.</div>'}</div></section>
    <section class="panel-card promise-card"><div class="card-head"><h3>Поставить личную цель</h3><small>ЗАПИСЬ ИГРОКА</small></div><form id="promise-form" class="promise-form"><input name="promise" maxlength="140" placeholder="Например: встретиться с Темари до вечера" required><button class="btn btn-primary" type="submit">Добавить</button></form><p class="chat-hint">Личная цель не даёт награды сама по себе — это твоя заметка и ориентир.</p></section>`;
}
function renderBag(state) {
  const looks = [['casual','Повседневная одежда','Удобный вариант для прогулок.'],['shinobi','Форма шиноби','Практичный стиль для тренировок.'],['festival','Праздничное кимоно','Наряд для городского праздника.'],['travel','Дорожный плащ','Подходит для прохладной погоды и поездок.'],['raincoat','Дождевой плащ','Удобно в дождь и ветер.']];
  const kinds=[['all','Всё'],['food','Еда'],['gift','Подарки'],['clothing','Одежда'],['pet','Питомцам'],['material','Материалы'],['other','Прочее']];
  const filter=state.ui.bagTab||'all';
  const filtered=state.inventory.filter(item=>filter==='all'||item.kind===filter||(filter==='other'&&!['food','gift','clothing','material','pet'].includes(item.kind)));
  const selected=filtered.find(item=>item.id===state.ui.selectedItemId)||filtered[0]||null;
  const iconFor=item=>({tea:'tea',flower:'flower',paper:'scroll',herb:'herb',bento:'bento','pet-snack':'gift'}[item.id]||'pouch');
  return `${heading('Инвентарь','Выбери предмет, чтобы посмотреть описание и доступные действия. Вещи можно хранить в домашнем схроне.')}
    <section class="bag-heading"><div><small>🌸 ЛИЧНЫЕ ВЕЩИ</small><h3>Инвентарь</h3><p>${state.inventory.reduce((sum,item)=>sum+item.qty,0)} предметов в сумке</p></div></section>
    <div class="bag-tabs">${kinds.map(([id,label])=>`<button data-action="bag-filter" data-id="${id}" class="${filter===id?'active':''}">${label}</button>`).join('')}</div>
    <section class="panel-card"><div class="inventory-grid">${filtered.length?filtered.map(item=>`<article class="item-card ${selected?.id===item.id?'selected':''}"><button class="item-select" data-action="select-item" data-id="${item.id}"><img class="item-art" src="assets/ui/${iconFor(item)}.svg" alt=""><span><strong>${escapeHTML(item.name)}</strong><small>${item.kind==='gift'?'Подарок':item.kind==='food'?'Еда':item.kind==='clothing'?'Одежда':item.kind==='pet'?'Для питомцев':'Материал'}</small></span><b class="quantity">×${item.qty}</b></button><div class="item-tools">${item.kind==='gift'?`<button class="mini-btn" data-action="choose-gift" data-id="${item.id}">🎁 Подарить</button>`:''}${item.kind==='food'?`<button class="mini-btn" data-action="use-food" data-id="${item.id}">Использовать</button>`:''}${item.kind==='pet'?`<button class="mini-btn" data-action="pet-item" data-id="${item.id}">Использовать</button>`:''}</div></article>`).join(''):'<div class="empty-state">В этой категории пока пусто.</div>'}</div>
      ${selected?`<section class="item-detail-panel"><div class="item-detail-art"><img src="assets/ui/${iconFor(selected)}.svg" alt=""></div><div class="item-detail-copy"><small>ВЫБРАННЫЙ ПРЕДМЕТ</small><h3>${escapeHTML(selected.name)}</h3><p>${escapeHTML(selected.desc||'Описание пока неизвестно.')}</p><div class="item-detail-meta"><span>Категория: ${escapeHTML(selected.kind)}</span><b>Количество: ${selected.qty}</b></div><div class="item-detail-actions">${selected.kind==='gift'?`<button class="btn btn-primary" data-action="choose-gift" data-id="${selected.id}">Подарить</button>`:''}${selected.kind==='food'?`<button class="btn btn-primary" data-action="use-food" data-id="${selected.id}">Использовать</button>`:''}${selected.kind==='pet'?`<button class="btn btn-primary" data-action="pet-item" data-id="${selected.id}">Использовать для питомца</button>`:''}</div></div></section>`:''}
    </section>
    <section class="panel-card outfit-card"><div class="card-head"><h3>Гардероб</h3><small>${state.world.location==='home'?'ДОМАШНИЙ ШКАФ':state.world.location==='market'?'МАГАЗИН ОДЕЖДЫ':'ПЕРЕОДЕВАНИЕ ДОМА ИЛИ В МАГАЗИНЕ'}</small></div><div class="outfit-grid">${looks.map(([id,name,desc])=>{const owned=(state.player.ownedLooks||['casual','shinobi']).includes(id);const price={festival:48,travel:36,raincoat:30}[id]||0;const canChange=['home','market'].includes(state.world.location);return `<article class="outfit-option ${state.player.look===id?'selected':''}"><span>👘</span><b>${name}</b><small>${desc}</small>${owned?`<button class="mini-btn" data-action="outfit" data-id="${id}" ${!canChange?'disabled':''}>${state.player.look===id?'Надето':canChange?'Переодеться':'Доступно дома'}</button>`:`<button class="mini-btn" data-action="buy-outfit" data-id="${id}" ${state.world.location!=='market'?'disabled':''}>Купить · ${price} рё</button>`}</article>`}).join('')}</div></section>
    ${state.world.location==='home'?`<section class="home-storage-grid"><article><b>🧊 Холодильник</b><p>Запасы еды дома: ${state.inventory.filter(x=>x.kind==='food').reduce((a,x)=>a+x.qty,0)}</p><button class="mini-btn" data-action="home-storage" data-id="fridge">Открыть</button></article><article><b>👘 Шкаф</b><p>Купленные наряды: ${(state.player.ownedLooks||[]).length}</p><button class="mini-btn" data-action="home-storage" data-id="wardrobe">Открыть</button></article></section>`:''}`;
}
function renderJobs(state) {
  const active=getJob(state.player.jobId);
  return `${heading('Работа и подработки','Выбирай занятие, приходи в нужное место и бери смену. У каждой работы своя оплата и длительность.')}
    <section class="ref-day-banner" style="--scene:url('assets/backgrounds/market-street.webp')"><div><small>ПОВСЕДНЕВНАЯ ЖИЗНЬ</small><h3>${active?escapeHTML(active.name):'Найди своё дело в Конохе'}</h3><p>${active?`Твоя работа: ${escapeHTML(active.skill)}. Смен сегодня: ${state.player.lastWorkDay===state.world.day?state.player.workShifts||0:0}/2.`:'Небольшая подработка поможет заработать рё и узнать жителей.'}</p></div></section>
    <div class="job-grid">${JOBS.map(job=>{const here=state.world.location===job.place;const selected=state.player.jobId===job.id;return `<article class="panel-card job-card ${selected?'selected':''}"><div class="job-card-head"><span class="job-icon">${job.id==='ramen'?'🍜':job.id==='market'?'🧺':job.id==='flowers'?'🌸':job.id==='library'?'📚':job.id==='clinic'?'🏥':job.id==='courier'?'📜':'🎓'}</span><div><b>${escapeHTML(job.name)}</b><small>${escapeHTML(getLocation(job.place).name)} · ${job.duration} минут</small></div></div><p>${escapeHTML(job.desc)}</p><div class="job-card-footer"><strong>+${job.wage} рё / смена</strong>${here?`<button class="btn btn-primary" data-action="apply-job" data-id="${job.id}">${selected?'Выбрать смену':'Устроиться'}</button>`:`<button class="btn btn-soft" data-action="visit-job" data-id="${job.place}">Отправиться</button>`}</div>${selected&&here?`<button class="btn btn-primary job-shift" data-action="work-shift" data-id="${job.id}" ${(state.player.lastWorkDay===state.world.day&&(state.player.workShifts||0)>=2)?'disabled':''}>Начать смену</button>`:''}</article>`}).join('')}</div>`;
}

function renderLocations(state) {
  const current=getLocation(state.world.location);
  return `${heading('Локации','Каждое место имеет собственный фон, занятия и жителей. Некоторые места могут требовать приглашения.')}
    <section class="locations-heading"><span>🌸</span><div><small>МИР КОНОХИ</small><h3>Локации</h3><p>Текущее место: ${escapeHTML(current.name)}</p></div></section>
    <div class="ref-location-grid">${LOCATIONS.map(location=>`<button class="ref-location-tile ${location.id===current.id?'current':''} ${!getLocationAccess(state,location.id).allowed?'locked':''}" data-action="travel" data-id="${location.id}" ${!getLocationAccess(state,location.id).allowed?'disabled':''}><span class="ref-tile-image" style="background-image:url('${location.bg}')"></span><span class="ref-tile-body"><b>${location.icon} ${escapeHTML(location.name)}</b><small>${escapeHTML(location.area)}</small><em>${escapeHTML(location.desc)}</em><i class="travel-stamp">${location.id===current.id?'Ты здесь':getLocationAccess(state,location.id).allowed?'Открыть место ↗':`🔒 ${getLocationAccess(state,location.id).reason}`}</i></span></button>`).join('')}</div>`;
}

function renderGallery(state) {
  const gallery=state.gallerySeen||{};
  const people=gallery.characters||{};
  const met=new Set([...(state.metCharacters||[]),...Object.keys(people)]);
  const roster=CHARACTERS.filter(character=>state.unlocked.includes(character.id));
  const backgrounds=[...(gallery.backgrounds||[])];
  const allArts=roster.map(character=>{ const seen=people[character.id]||[]; const first=character.art?.[0]?.src; return {character,src:first,seen:Boolean(first&&seen.includes(first)),label:character.art?.[0]?.label||'Портрет'}; });
  return `${heading('Галерея','Портреты всех доступных героинь и изображения, которые уже встречались в твоей истории.')}
    <section class="gallery-section"><div class="gallery-section-title"><span>🌸</span><div><small>ПЕРСОНАЖИ</small><h3>Галерея героинь · ${roster.length}</h3></div></div>
      <div class="gallery-grid">${allArts.map(entry=>`<button class="gallery-tile ${entry.seen?'':'gallery-unseen'}" data-action="view-art" data-src="${escapeHTML(entry.src||'')}"><img src="${escapeHTML(entry.src||'')}" alt="" loading="lazy"><span><b>${escapeHTML(entry.character.name)}</b><small>${escapeHTML(entry.label)} · ${entry.seen?'Открыто в RP':'Просмотр галереи'}</small></span></button>`).join('')}</div></section>
    <section class="gallery-section"><div class="gallery-section-title"><span>🏞️</span><div><small>ИСТОРИЯ ПУТЕШЕСТВИЙ</small><h3>Увиденные сцены · ${backgrounds.length}</h3></div></div><div class="gallery-backgrounds">${backgrounds.map(src=>`<button data-action="view-art" data-src="${escapeHTML(src)}"><img src="${escapeHTML(src)}" alt="Увиденная локация" loading="lazy"></button>`).join('')||'<div class="empty-state">Посещай новые места, чтобы сохранить их фоны в галерее.</div>'}</div></section>
    <section class="gallery-section"><div class="gallery-section-title"><span>✦</span><div><small>ОТКРЫТЫЕ ИЗОБРАЖЕНИЯ</small><h3>Встреченные арты · ${Object.values(people).reduce((sum,items)=>sum+(items||[]).length,0)}</h3></div></div><div class="gallery-grid">${Object.entries(people).flatMap(([id,paths])=>(paths||[]).map(src=>({character:getCharacter(id),src}))).filter(entry=>entry.character).map(entry=>`<button class="gallery-tile" data-action="view-art" data-src="${escapeHTML(entry.src)}"><img src="${escapeHTML(entry.src)}" alt="" loading="lazy"><span><b>${escapeHTML(entry.character.name)}</b><small>Открыть арт</small></span></button>`).join('')||'<div class="empty-state">Пока не открыто дополнительных изображений. Исследуй локации и встречай героинь.</div>'}</div></section>`;
}
function renderHelp() {
  return `${heading('Помощь','Кратко о том, как устроена игра и как писать команды.')}
    <section class="help-grid"><article class="panel-card"><h3>Свободные действия</h3><p>Пиши обычным текстом: «иду в цветочную лавку», «осматриваю комнату», «покупаю чай», «жду Аяме у входа». Игровой мастер проверит место, время и доступность действия.</p></article><article class="panel-card"><h3>Диалоги</h3><p>Для личной беседы персонаж должен находиться рядом. Напиши свою реплику вручную. Первое знакомство сдержанное; имя запоминается после представления.</p></article><article class="panel-card"><h3>Герои и галерея</h3><p>В разделе «Герои» показываются только те, с кем уже было личное взаимодействие. Изображения попадают в галерею после появления в RP.</p></article><article class="panel-card"><h3>Задания и обещания</h3><p>Задания могут появиться после разговора или твоего собственного плана. Награда указывается только если персонаж её назвал. Обещания можно отменять.</p></article><article class="panel-card"><h3>Карта и перемещения</h3><p>Переходы занимают игровое время. Резкий уход с договорённой встречи может быть замечен и повлиять на доверие.</p></article><article class="panel-card"><h3>Сохранение</h3><p>Прогресс сохраняется в этом браузере. На другом устройстве используй экспорт и импорт сохранения в настройках.</p></article></section>`;
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
    case 'work': return renderJobs(state);
    case 'settings': return renderSettingsPage(state);
    case 'locations': return renderLocations(state);
    case 'gallery': return renderGallery(state);
    case 'help': return renderHelp(state);
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
  const topHp=document.getElementById('top-hp'); if(topHp) topHp.textContent=`♥ ${stats.hp??100} HP`;
  document.getElementById('mobile-status').innerHTML = `<span class="status-pill"><span class="clock-symbol">◷</span>${clockLabel(state.world.minute)}</span><span class="status-pill">${status}</span><span class="status-pill">♥ ${stats.hp??100} HP</span><span class="status-pill"><img class="status-icon" src="assets/ui/cropped/coin.png" alt="">${stats.coins} рё</span>`;
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
const { CHARACTERS,getCharacter,getUnlockedCharacterArts } = __require("src/data/characters.js");
const { ENEMIES,getEnemy } = __require("src/data/enemies.js");
const { ORIGINS,LOCATIONS,getLocation } = __require("src/data/world.js");
const { createInitialState,loadState,saveState,clearSave,addFeed,updateBond,removeItem,addItem } = __require("src/core/store.js");
const { talkToCharacter } = __require("src/core/gm.js");
const { travelTo,doActivity,skipTime,sleepUntilMorning,assignDailyTask,tickAction,updateNpcPositions,getNpcLocation } = __require("src/core/life.js");
const { getPet } = __require("src/data/pets.js");
const { getJob } = __require("src/data/jobs.js");
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
  if (state && !state.previewOnly && state.settings.autosave) saveState(state);
}

function render() {
  if (!state) return;
  renderStatus(state);
  elements.view.innerHTML = renderView(state);
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
  state.ui.drawerOpen = false;
  document.getElementById('game-screen')?.classList.remove('drawer-open');
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

function openHomeStorage(kind='fridge') {
  if(state.world.location!=='home'){toast('Домашний схрон доступен только у тебя дома.');return;}
  state.storage ||= {fridge:[]}; state.storage.fridge ||= [];
  if(kind==='wardrobe') {
    const looks=[['casual','Повседневная одежда'],['shinobi','Форма шиноби'],['festival','Праздничный наряд'],['travel','Дорожный плащ'],['raincoat','Дождевой плащ']];
    elements.modal.innerHTML=`<div class="modal-backdrop"><section class="modal-card storage-modal"><div class="modal-head"><div><div class="eyebrow">ДОМАШНИЙ СХРОН</div><h3>Шкаф с одеждой</h3></div><button class="close-button" data-action="close-modal">×</button></div><div class="storage-list">${looks.filter(([id])=>(state.player.ownedLooks||[]).includes(id)).map(([id,name])=>`<div class="storage-row"><span>👘</span><b>${name}</b><button class="mini-btn" data-action="outfit" data-id="${id}">${state.player.look===id?'Надето':'Переодеться'}</button></div>`).join('')||'<p class="empty-state">В шкафу пока пусто.</p>'}</div><p class="chat-hint">Одежду можно купить на рынке и хранить в шкафу. Переодевание доступно дома или в магазине.</p></section></div>`;
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
  if (!purchaseMatch && !activityTypes.length && !destinationId && !petActionDone && !incidentActionResolved) {
    tickAction(state,12);
    resultParts.push(`Ты выполняешь задуманное: «${raw}». ${getLocation(state.world.location).desc}`);
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
  state.ui.view = 'profile';
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

function openTitleSettings() {
  elements.modal.innerHTML = `<div class="modal-backdrop"><section class="modal-card"><div class="modal-head"><div><div class="eyebrow">NARUTO ENOT GAREM</div><h3>Настройки</h3></div><button class="close-button" data-action="close-modal">×</button></div><p>Создай или загрузи историю, чтобы сохранить игровые настройки. Пока доступны русский язык и локальная игра без ключей.</p><div class="settings-actions"><a class="btn btn-soft" href="https://pixabay.com/music/ambient-japanese-style-ambient-475587/" target="_blank" rel="noopener">Музыка из библиотеки ↗</a><button class="btn btn-primary" data-action="close-modal">Понятно</button></div></section></div>`;
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
  switch (action) {
    case 'new-game': populateOrigins(); showScreen('creation'); break;
    case 'random-name': { const field=document.getElementById('player-name'); if(field) field.value=randomPlayerName(); break; }
    case 'random-character': randomizeCreator(); break;
    case 'continue': { const loaded = loadState(); if (loaded) { state=loaded; showScreen('game'); } else toast('Сохранение не найдено.'); break; }
    case 'home': showScreen('title'); break;
    case 'title-settings': if (!state) { state=createInitialState({name:'Посетитель',origin:'resident'}); state.previewOnly=true; state.ui.view='settings'; } showScreen('game'); switchView('settings'); break;
    case 'open-gallery': { if (!state) { state=createInitialState({name:'Посетитель галереи',origin:'resident'}); state.previewOnly=true; state.ui.view='gallery'; } showScreen('game'); switchView('gallery'); break; }
    case 'exit-game': { const notice='Окно игры можно закрыть средствами браузера. Сохранение останется на этом устройстве.'; toast(notice); try { window.close(); } catch {} break; }
    case 'toggle-drawer': { const game=document.getElementById('game-screen'); game?.classList.toggle('drawer-open'); if(state) state.ui.drawerOpen=game?.classList.contains('drawer-open')||false; break; }
    case 'open-settings': switchView('settings'); break;
    case 'view-art': openArtViewer(button.dataset.src||''); break;
    case 'profile-art-prev': case 'profile-art-next': case 'profile-art-set': { const character=getCharacter(id); const arts=getUnlockedCharacterArts(state,character); if(!arts.length)break; const current=Number(state.ui.profileArtIndex)||0; const next=action==='profile-art-set'?Math.max(0,Math.min(arts.length-1,Number(button.dataset.index)||0)):(current+(action==='profile-art-next'?1:-1)+arts.length)%arts.length; state.ui.profileArtIndex=next; state.gallerySeen ||= {characters:{},backgrounds:[]}; state.gallerySeen.characters ||= {}; state.gallerySeen.characters[id] ||= []; const src=arts[next].src; if(!state.gallerySeen.characters[id].includes(src))state.gallerySeen.characters[id].push(src); render(); break; }
    case 'quest-tab': state.ui.questTab=id==='history'?'history':'active'; render(); break;
    case 'bag-filter': state.ui.bagTab=['all','food','gift','clothing','pet','material','other'].includes(id)?id:'all'; state.ui.selectedItemId=''; render(); break;
    case 'select-item': state.ui.selectedItemId=id; render(); break;
    case 'toggle-map-legend': state.ui.mapLegend=!state.ui.mapLegend; render(); break;
    case 'language-prev': case 'language-next': state.settings.languageIndex=0; toast('Пока доступен только русский язык.'); break;
    case 'home-storage': openHomeStorage(id); break;
    case 'storage-put': { const item=state.inventory.find(entry=>entry.id===id&&entry.kind==='food'&&entry.qty>0); if(!item){toast('Подходящий продукт не найден.');break;} state.storage ||= {fridge:[]}; state.storage.fridge ||= []; if(removeItem(state,id,1)){const stored=state.storage.fridge.find(entry=>entry.id===id);if(stored)stored.qty++;else state.storage.fridge.push({...item,qty:1});openHomeStorage('fridge');persist();} break; }
    case 'storage-take': { state.storage ||= {fridge:[]}; const item=state.storage.fridge.find(entry=>entry.id===id&&entry.qty>0); if(!item)break; addItem(state,{...item,qty:1}); item.qty--; if(item.qty<=0)state.storage.fridge=state.storage.fridge.filter(entry=>entry.qty>0); openHomeStorage('fridge');persist();break; }
    case 'phone-app': state.phone.app=['home','konohagram','line','shinobix','scrolltube'].includes(id)?id:'home'; render(); break;
    case 'phone-tab': state.phone.tab=type==='messages'?'messages':'feed'; state.phone.app=type==='messages'?'line':'konohagram'; render(); break;
    case 'video-play': { state.phone.videoViews ||= []; if(!state.phone.videoViews.includes(id)) state.phone.videoViews.push(id); state.phone.activeVideo=id; addFeed(state,'Ты открыл видео на ScrollTube.'); render(); break; }
    case 'video-back': state.phone.activeVideo=''; render(); break;
    case 'phone-like': { const post=state.phone.posts.find(item=>item.id===id); if(post){post.liked=!post.liked;post.likes=Math.max(0,(post.likes||0)+(post.liked?1:-1));render();} break; }
    case 'buy-pet': { const pet=getPet(id); if(!pet) break; if((state.pets||[]).length>=5){toast('Можно завести не больше пяти питомцев.');break;} if(state.player.stats.coins<pet.price){toast('Не хватает рё.');break;} state.player.stats.coins-=pet.price; const names={ 'konoha-cat':['Мару','Юки','Сора'],'ninja-dog':['Ака','Кума','Рэй'],'white-rabbit':['Момо','Широ','Хана'],'courier-hawk':['Хая','Тори','Казэ'],'pond-turtle':['Каме','Тама','Нори']}; const choices=names[id]||['Тама']; const name=choices[Math.floor(Math.random()*choices.length)]; state.pets.push({...pet,uid:`pet-${Date.now()}`,name,affection:5,hunger:45,mood:55,energy:80}); addFeed(state,`В доме появился новый питомец: ${name} (${pet.kind}).`); render();toast(`${name} теперь твой питомец!`); break; }
    case 'pet-care': { const pet=state.pets.find(item=>item.uid===id); if(pet){ if(type==='feed'){pet.hunger=Math.max(0,(pet.hunger??45)-35);pet.affection=Math.min(100,(pet.affection||0)+3);tickAction(state,8);} else if(type==='walk'){pet.energy=Math.max(0,(pet.energy??80)-12);pet.affection=Math.min(100,(pet.affection||0)+6);tickAction(state,18);} else {pet.mood=Math.min(100,(pet.mood??55)+18);pet.affection=Math.min(100,(pet.affection||0)+8);tickAction(state,12);} addFeed(state,`Ты позаботился о питомце ${pet.name}.`); render();toast(`${pet.name} рад вниманию.`);} break; }
    case 'close-modal': elements.modal.innerHTML=''; break;
    case 'skip-time': skipTime(state,Number(hours)||1); render(); break;
    case 'sleep': sleepUntilMorning(state); render(); toast('Наступило утро.'); break;
    case 'travel': if (travelTo(state,id)) { const local = CHARACTERS.find(character=>state.unlocked.includes(character.id) && getNpcLocation(state,character.id)===id); state.ui.sceneCharacterId=local?.id || ''; render(); toast(`Переход занял ${state.ui.lastTravelMinutes} мин.`); } else toast(state.ui.travelFailure||'Не удалось перейти в это место.'); break;
    case 'activity': doActivity(state,type); render(); break;
    case 'patrol': startPatrol(); break;
    case 'scene-patrol': startPatrol(id); break;
    case 'combat-move': combatMove(type); break;
    case 'close-encounter': state.encounter=null; elements.modal.innerHTML=''; render(); break;
    case 'open-person': state.ui.view='profile'; state.ui.targetId=id; state.ui.sceneCharacterId=id; state.ui.profileArtIndex=0; render(); break;
    case 'invite-companion': { const character=getCharacter(id); const bond=state.bonds?.[id]||{}; if(!character)break; if((bond.friendship||0)<35||(bond.trust||0)<25){toast('Сначала укрепи дружбу и доверие.');break;} state.companions ||= []; if(!state.companions.includes(id)) state.companions.push(id); addFeed(state,`${character.name} согласилась войти в твой ближний круг и помогать с общими делами.`); render(); toast(`${character.name} теперь твоя спутница.`); break; }
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
    case 'outfit': {
      const owned=state.player.ownedLooks||['casual','shinobi'];
      if(!['home','market'].includes(state.world.location)){toast('Переодеться можно дома или в магазине одежды.');break;}
      if(!owned.includes(id)){toast('Сначала купи этот наряд на рынке.');break;}
      state.player.look=id; addFeed(state,`Ты переоделся: ${button.textContent.trim()}.`); render(); toast('Одежда изменена.'); break;
    }
    case 'buy-outfit': {
      const prices={festival:48,travel:36,raincoat:30}; const price=prices[id];
      if(state.world.location!=='market'){toast('Новые наряды продаются на рынке.');break;}
      if(!price){toast('Этот комплект нельзя купить.');break;}
      state.player.ownedLooks ||= ['casual','shinobi'];
      if(state.player.ownedLooks.includes(id)){toast('Этот наряд уже куплен.');break;}
      if(state.player.stats.coins<price){toast('Не хватает рё.');break;}
      state.player.stats.coins-=price; state.player.ownedLooks.push(id); addFeed(state,`На рынке куплен новый наряд: ${id}.`); render(); toast('Наряд добавлен в гардероб.'); break;
    }
    case 'visit-job': if(travelTo(state,id)){state.ui.view='work';render();} break;
    case 'apply-job': {const job=getJob(id);if(!job)break;if(state.world.location!==job.place){toast('Нужно прийти на место работы.');break;}state.player.jobId=id;render();toast(`Ты договорился о работе: ${job.name}.`);break;}
    case 'work-shift': {const job=getJob(id);if(!job||state.player.jobId!==id||state.world.location!==job.place){toast('Сначала выбери работу и приди на место.');break;}if(state.player.lastWorkDay!==state.world.day){state.player.lastWorkDay=state.world.day;state.player.workShifts=0;}if(state.player.workShifts>=2){toast('На сегодня смен достаточно.');break;}state.player.workShifts++;state.player.stats.coins+=job.wage;state.player.stats.stamina=Math.max(5,state.player.stats.stamina-14);tickAction(state,job.duration);addFeed(state,`Смена завершена: ${job.name}. Получено ${job.wage} рё.`);render();toast(`Смена окончена. +${job.wage} рё.`);break;}
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
    const npcPlace=getNpcLocation(state,character.id);
    if (npcPlace!==state.world.location) { toast(`${character.name} сейчас не здесь. Личная беседа возможна только при встрече.`); state.ui.lastActionResult=`${character.name} сейчас находится в «${npcPlace?getLocation(npcPlace).name:'другой части деревни'}».`; render(); return; }
    state.metCharacters ||= []; if(!state.metCharacters.includes(character.id)) state.metCharacters.push(character.id);
    state.meetingHistory ||= {}; state.meetingHistory[character.id] ||= {firstDay:state.world.day,firstLocation:state.world.location,firstMinute:state.world.minute};
    state.gallerySeen ||= {characters:{},backgrounds:[]}; state.gallerySeen.characters ||= {}; state.gallerySeen.characters[character.id] ||= [];
    const firstArt=character.art?.[0]?.src; if(firstArt&&!state.gallerySeen.characters[character.id].includes(firstArt)) state.gallerySeen.characters[character.id].push(firstArt);
    appendDialogue(character.id,'player',text);
    const result = talkToCharacter(state,character,text);
    appendDialogue(character.id,'npc',result.reply);
    addFeed(state,`${state.player.name} поговорил с ${character.name}.`);
    render();
  }
  if (event.target.id === 'social-post-form') { event.preventDefault(); publishPhonePost(new FormData(event.target).get('post'),event.target.dataset.platform||'konohagram'); }
  if (event.target.id === 'phone-message-form') { event.preventDefault(); const data=new FormData(event.target); sendPhoneMessage(data.get('characterId'),data.get('message')); }
  if (event.target.classList?.contains?.('pet-name-form')) { event.preventDefault(); const pet=state.pets.find(item=>item.uid===event.target.dataset.petId); const name=String(new FormData(event.target).get('name')||'').trim().slice(0,20); if(pet&&name){pet.name=name;addFeed(state,`Ты выбрал новое имя для питомца: ${name}.`);render();toast('Имя питомца изменено.');} }
  if (event.target.id === 'assignment-form') { event.preventDefault(); assignPlan(event.target); }
  if (event.target.id === 'promise-form') { event.preventDefault(); addCustomPromise(new FormData(event.target).get('promise')); }
});

document.addEventListener('change',event=>{
  if (event.target.id === 'player-origin') updateOriginNote();
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
