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

const TRIPTYCH_ART = new Set(['anko','ayame','konan','sakura','hanabi','hinata']);
const CLEAN_PORTRAIT_ART = new Set(['haku','hanabi','hinata','kurenai','kurotsuchi','kushina','mabui','mikoto','mirai','mito','rin','sakura','samui','sarada','shizune','tayuya','temari','tenten','tsunade']);

// Дополнительные закрытые портреты добавлены только тем персонажам, у кого раньше был один арт.
const ALT_PORTRAIT_ART = new Set(['ino','temari','kurenai','tsunade','mirai','karin','tenten','shizune']);

const CHARACTERS = cast.map(([id,name,role,personality,notes,likes,icon,c1,c2,startLocation,style]) => ({
  id,name,role,personality,notes,likes,icon,colors:[c1,c2],startLocation,style,
  intro:`${name} здесь. ${personality}`,
  art:TRIPTYCH_ART.has(id)
    ? ['daily','shinobi','festival'].map((variant,index)=>({
        src:`assets/characters/${id}/${variant}.webp`,
        label:['Повседневный образ','Тренировка шиноби','Вечерний фестиваль'][index]
      }))
    : [
        {
          src:`assets/characters/${id}/${CLEAN_PORTRAIT_ART.has(id)?'portrait-clean':'portrait'}.webp`,
          label:CLEAN_PORTRAIT_ART.has(id)?'Портрет без подписи':'Портрет персонажа'
        },
        ...(ALT_PORTRAIT_ART.has(id)?[{src:`assets/characters/${id}/portrait-alt.webp`,label:'Дополнительный портрет'}]:[])
      ],
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
  {id:'main-street',name:'Главная улица',icon:'🏮',area:'Центр',desc:'Шумная улица с лавками, прохожими и городскими новостями.',bg:'assets/backgrounds/konoha-dawn.webp',rainBg:'assets/backgrounds/rainy-alley.webp',nightBg:'assets/backgrounds/festival-street.webp',activities:['Прогуляться','Осмотреть витрины','Поговорить с жителями']},
  {id:'ichiraku',name:'Ичираку',icon:'🍜',area:'Центр',desc:'Знаменитая лапшичная. Здесь всегда уютно и пахнет бульоном.',bg:'assets/backgrounds/ichiraku.webp',activities:['Поесть рамен','Помочь на кухне','Отдохнуть']},
  {id:'flower-shop',name:'Цветочная лавка',icon:'🌸',area:'Торговый квартал',desc:'Цветы, семена и небольшие подарки для друзей.',bg:'assets/backgrounds/flower-shop.webp',activities:['Купить цветы','Помочь с букетами','Изучить растения']},
  {id:'market',name:'Рынок',icon:'🧺',area:'Торговый квартал',desc:'Торговцы, ремесленники и полезные мелочи для повседневной жизни.',bg:'assets/backgrounds/market-street.webp',nightBg:'assets/backgrounds/festival-street.webp',activities:['Купить предметы','Помочь торговцам','Осмотреть товары']},
  {id:'training',name:'Тренировочная площадка',icon:'🥋',area:'Восток',desc:'Место для упражнений, командных испытаний и обучения контролю чакры.',bg:'assets/backgrounds/training-ground.webp',rainBg:'assets/backgrounds/rain-training.webp',activities:['Тренировка контроля','Испытание на ловкость','Защитный барьер']},
  {id:'hospital',name:'Больница',icon:'🏥',area:'Восток',desc:'Медицинский корпус и тихий внутренний двор.',bg:'assets/backgrounds/clinic.webp',activities:['Помочь медикам','Изучить медицинские свитки','Отдохнуть']},
  {id:'hokage',name:'Резиденция Хокаге',icon:'🏯',area:'Центр',desc:'Кабинеты, архивы и доска необязательных поручений.',bg:'assets/backgrounds/hokage-office.webp',activities:['Посмотреть поручения','Изучить архив','Поговорить с чиновниками']},
  {id:'tea-house',name:'Чайный домик',icon:'🍵',area:'Юг',desc:'Небольшой домик у сада, где приятно переждать дождь.',bg:'assets/backgrounds/twilight-pavilion.webp',activities:['Выпить чай','Почитать','Поговорить']},
  {id:'river',name:'Берег реки',icon:'🌊',area:'Юг',desc:'Спокойное место у воды, особенно красивое на закате.',bg:'assets/backgrounds/river-sunset.webp',nightBg:'assets/backgrounds/twilight-pavilion.webp',activities:['Послушать воду','Порыбачить','Прогуляться']},
  {id:'forest',name:'Лесная тропа',icon:'🌲',area:'За воротами',desc:'Тропа за деревней. Здесь можно собирать травы и замечать редкие следы.',bg:'assets/backgrounds/mountain-trail.webp',nightBg:'assets/backgrounds/campsite.webp',rainBg:'assets/backgrounds/rainy-alley.webp',activities:['Собрать травы','Исследовать тропу','Понаблюдать за птицами']},
  {id:'memorial',name:'Мемориальный парк',icon:'🕯️',area:'Запад',desc:'Тихое место памяти, где принято говорить негромко.',bg:'assets/backgrounds/memorial-garden.webp',activities:['Возложить цветы','Вспомнить прошлое','Посидеть в тишине']},
  {id:'gate',name:'Главные ворота',icon:'⛩️',area:'Север',desc:'Вход в деревню и место встреч с путешественниками.',bg:'assets/backgrounds/village-gate.webp',activities:['Встретить гостей','Узнать новости','Осмотреть окрестности']},
  {id:'library',name:'Библиотека',icon:'📚',area:'Запад',desc:'Книги по истории, медицине, природе и контролю чакры.',bg:'assets/backgrounds/archive-glow.webp',activities:['Почитать','Изучить свитки','Навести порядок']},
  {id:'garden',name:'Общественный сад',icon:'🌿',area:'Юг',desc:'Тихий сад с дорожками, скамейками и сезонными цветами.',bg:'assets/backgrounds/bathhouse-garden.webp',activities:['Полить растения','Прогуляться','Посидеть в тишине']},
  {id:'home',name:'Твой дом',icon:'🏡',area:'Жилой квартал',desc:'Небольшой дом, где можно готовить, отдыхать и планировать день.',bg:'assets/backgrounds/tatami-home.webp',activities:['Приготовить еду','Убраться','Отдохнуть']},
  {id:'academy',name:'Академия',icon:'🎓',area:'Восток',desc:'Учебный двор, классы и тренировочные занятия для шиноби.',bg:'assets/backgrounds/academy-courtyard.webp',activities:['Посетить занятие','Повторить основы','Помочь ученикам']},
  {id:'campsite',name:'Лесной привал',icon:'🏕️',area:'За воротами',desc:'Тихая стоянка у реки для короткого отдыха во время вылазок.',bg:'assets/backgrounds/campsite.webp',activities:['Разбить лагерь','Приготовить ужин','Отдохнуть у костра']},
  {id:'bathhouse',name:'Термальный сад',icon:'♨️',area:'Юг',desc:'Тихая общественная зона отдыха с каменными дорожками и горячими источниками.',bg:'assets/backgrounds/bathhouse-garden.webp',activities:['Отдохнуть','Послушать воду','Поговорить']},
  {id:'dojo',name:'Зал додзё',icon:'🥋',area:'Восток',desc:'Крытый зал для спокойных упражнений, растяжки и командной подготовки.',bg:'assets/backgrounds/rain-training.webp',activities:['Отработать стойку','Тренировать контроль','Наблюдать за занятием']},
  {id:'archive',name:'Архив свитков',icon:'📜',area:'Запад',desc:'Специальное хранилище старых карт, отчётов и исторических записей.',bg:'assets/backgrounds/archive-glow.webp',activities:['Изучить карту','Найти старый отчёт','Разобрать свитки']},
  {id:'residential',name:'Жилой переулок',icon:'🏘️',area:'Жилой квартал',desc:'Небольшая улица с домами, садами и тихими двориками.',bg:'assets/backgrounds/tatami-home.webp',activities:['Прогуляться','Поздороваться с соседями','Осмотреть двор']},
  {id:'rooftop',name:'Крыши Конохи',icon:'🌆',area:'Центр',desc:'Высокие крыши с видом на улицы и монумент Хокаге.',bg:'assets/backgrounds/village-gate.webp',activities:['Посмотреть на город','Подышать воздухом','Понаблюдать за улицами']},
  {id:'music-hall',name:'Музыкальный зал «Лунный фонарь»',icon:'🎶',area:'За рынком',desc:'Небольшая площадка для открытых концертов, танцевальных занятий и творческих вечеров.',bg:'assets/backgrounds/festival-street.webp',nightBg:'assets/backgrounds/festival-street.webp',hidden:true,activities:['Послушать концерт','Посетить танцевальное занятие','Помочь с декорациями','Записаться на открытый вечер']},
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
"src/data/clothing.js": function(__require) {

const CLOTHING_SLOTS = [
  {id:'head',label:'Голова',title:'Головные уборы',icon:'◉',hint:'Повязка, заколка или капюшон'},
  {id:'top',label:'Верх',title:'Верхняя одежда',icon:'♧',hint:'Только один основной верхний предмет'},
  {id:'outer',label:'Слой',title:'Верхний слой',icon:'◇',hint:'Можно надеть поверх рубашки или формы'},
  {id:'bottom',label:'Низ',title:'Брюки и хакама',icon:'▤',hint:'Один предмет на слот'},
  {id:'shoes',label:'Обувь',title:'Обувь',icon:'⌁',hint:'Сандалии, ботинки или кеды'},
  {id:'accessory',label:'Аксессуар',title:'Аксессуары',icon:'✦',hint:'Шарф, пояс или сумка'}
];

const CLOTHING = [
  {id:'head-none',slot:'head',name:'Без головного убора',desc:'Открытая причёска.',price:0,src:'assets/player/layers/head-none.svg',starter:true},
  {id:'head-leaf-band',slot:'head',name:'Повязка Листа',desc:'Классическая повязка шиноби.',price:18,src:'assets/player/layers/head-leaf-band.svg'},
  {id:'head-cloth-band',slot:'head',name:'Тканевая повязка',desc:'Мягкая тёмная повязка для тренировок.',price:14,src:'assets/player/layers/head-cloth-band.svg'},
  {id:'head-flower-pin',slot:'head',name:'Заколка сакуры',desc:'Небольшая цветочная заколка.',price:16,src:'assets/player/layers/head-flower-pin.svg'},

  {id:'head-beret',slot:'head',name:'Берет с эмблемой',desc:'Мягкий берет для прогулки по деревне.',price:22,src:'assets/player/layers/head-beret.svg'},
  {id:'head-floral-ribbon',slot:'head',name:'Лента с цветком',desc:'Лёгкая лента для праздничного образа.',price:18,src:'assets/player/layers/head-floral-ribbon.svg'},

  {id:'top-basic',slot:'top',name:'Базовая футболка',desc:'Простой удобный слой на каждый день.',price:0,src:'assets/player/layers/top-basic.svg',starter:true},
  {id:'top-shinobi',slot:'top',name:'Форма шиноби',desc:'Практичная рубашка с защитными вставками.',price:0,src:'assets/player/layers/top-shinobi.svg',starter:true},
  {id:'top-work',starter:true,slot:'top',name:'Рабочая рубашка',desc:'Аккуратная форма для смены в мастерской.',price:20,src:'assets/player/layers/top-work.svg'},
  {id:'top-formal',starter:true,slot:'top',name:'Парадная рубашка',desc:'Сдержанный вариант для праздника и встречи.',price:26,src:'assets/player/layers/top-formal.svg'},
  {id:'top-knit',slot:'top',name:'Тёплый свитер',desc:'Мягкий высокий ворот для прохладного дня.',price:24,starter:true,src:'assets/player/layers/top-knit.svg'},
  {id:'top-kimono',slot:'top',name:'Верх кимоно',desc:'Традиционный верх с широкими рукавами.',price:34,src:'assets/player/layers/top-kimono.svg'},

  {id:'top-blouse',slot:'top',name:'Блуза с воротником',desc:'Светлая блуза с аккуратной застёжкой.',price:25,src:'assets/player/layers/top-blouse.svg'},
  {id:'top-academy',slot:'top',name:'Академическая форма',desc:'Строгая рубашка для учёбы и встреч.',price:27,src:'assets/player/layers/top-academy.svg'},
  {id:'top-hoodie',slot:'top',name:'Худи на молнии',desc:'Мягкое худи для свободного дня.',price:29,src:'assets/player/layers/top-hoodie.svg'},
  {id:'top-festival',slot:'top',name:'Праздничный верх',desc:'Нарядный верх с цветочным узором.',price:35,src:'assets/player/layers/top-festival.svg'},

  {id:'outer-none',slot:'outer',name:'Без верхнего слоя',desc:'Оставить основной верх открытым.',price:0,src:'assets/player/layers/outer-none.svg',starter:true},
  {id:'outer-vest',slot:'outer',name:'Жилет шиноби',desc:'Лёгкая защитная экипировка поверх формы.',price:0,src:'assets/player/layers/outer-vest.svg',starter:true},
  {id:'outer-jacket',slot:'outer',name:'Городская куртка',desc:'Короткая куртка для прогулок.',price:30,starter:true,src:'assets/player/layers/outer-jacket.svg'},
  {id:'outer-haori',slot:'outer',name:'Тёмное хаори',desc:'Свободный верхний слой с узорной каймой.',price:38,starter:true,src:'assets/player/layers/outer-haori.svg'},
  {id:'outer-raincoat',slot:'outer',name:'Дождевой плащ',desc:'Длинный плащ для непогоды.',price:40,starter:true,src:'assets/player/layers/outer-raincoat.svg'},
  {id:'outer-travel',slot:'outer',name:'Дорожный плащ',desc:'Удобный плащ с высоким воротом.',price:42,src:'assets/player/layers/outer-travel.svg'},

  {id:'outer-cardigan',slot:'outer',name:'Кардиган',desc:'Тёплый открытый слой поверх рубашки.',price:31,src:'assets/player/layers/outer-cardigan.svg'},
  {id:'outer-wintercoat',slot:'outer',name:'Зимнее пальто',desc:'Утеплённое пальто для холодных дней.',price:48,src:'assets/player/layers/outer-wintercoat.svg'},
  {id:'outer-short-haori',slot:'outer',name:'Короткое хаори',desc:'Лёгкий традиционный верхний слой.',price:39,src:'assets/player/layers/outer-short-haori.svg'},

  {id:'bottom-trousers',slot:'bottom',name:'Повседневные брюки',desc:'Универсальные прямые брюки.',price:0,src:'assets/player/layers/bottom-trousers.svg',starter:true},
  {id:'bottom-shinobi',slot:'bottom',name:'Брюки шиноби',desc:'Свободные штаны с бинтами на голени.',price:0,src:'assets/player/layers/bottom-shinobi.svg',starter:true},
  {id:'bottom-cargo',starter:true,slot:'bottom',name:'Карго с карманами',desc:'Практичный вариант для долгих поручений.',price:24,src:'assets/player/layers/bottom-cargo.svg'},
  {id:'bottom-formal',starter:true,slot:'bottom',name:'Парадные брюки',desc:'Чистый строгий силуэт.',price:28,src:'assets/player/layers/bottom-formal.svg'},
  {id:'bottom-hakama',slot:'bottom',name:'Хакама',desc:'Широкие традиционные штаны.',price:32,src:'assets/player/layers/bottom-hakama.svg'},
  {id:'bottom-skirt-long',slot:'bottom',name:'Длинная юбка',desc:'Сдержанный повседневный фасон до щиколотки.',price:27,src:'assets/player/layers/bottom-skirt-long.svg'},

  {id:'bottom-jeans',slot:'bottom',name:'Джинсы',desc:'Прочные джинсы на каждый день.',price:25,src:'assets/player/layers/bottom-jeans.svg'},
  {id:'bottom-pleated-skirt',slot:'bottom',name:'Плиссированная юбка',desc:'Длинная юбка со складками.',price:29,src:'assets/player/layers/bottom-pleated-skirt.svg'},
  {id:'bottom-wide-pants',slot:'bottom',name:'Свободные брюки',desc:'Комфортный широкий крой.',price:27,src:'assets/player/layers/bottom-wide-pants.svg'},
  {id:'bottom-festival-hakama',slot:'bottom',name:'Праздничная хакама',desc:'Традиционный низ с мягкими складками.',price:37,src:'assets/player/layers/bottom-festival-hakama.svg'},

  {id:'shoes-sandals',slot:'shoes',name:'Сандалии шиноби',desc:'Лёгкая обувь для привычных маршрутов.',price:0,src:'assets/player/layers/shoes-sandals.svg',starter:true},
  {id:'shoes-sneakers',slot:'shoes',name:'Городские кеды',desc:'Удобная обувь для прогулок.',price:0,src:'assets/player/layers/shoes-sneakers.svg',starter:true},
  {id:'shoes-boots',starter:true,slot:'shoes',name:'Высокие ботинки',desc:'Подходят для прохладной погоды и дороги.',price:22,src:'assets/player/layers/shoes-boots.svg'},
  {id:'shoes-formal',starter:true,slot:'shoes',name:'Парадная обувь',desc:'Аккуратная обувь для особых случаев.',price:24,src:'assets/player/layers/shoes-formal.svg'},

  {id:'shoes-high-top',slot:'shoes',name:'Высокие кеды',desc:'Высокая посадка и плотная подошва.',price:24,src:'assets/player/layers/shoes-high-top.svg'},
  {id:'shoes-winter',slot:'shoes',name:'Зимние сапоги',desc:'Тёплая обувь с мягким верхом.',price:32,src:'assets/player/layers/shoes-winter.svg'},

  {id:'accessory-none',slot:'accessory',name:'Без аксессуара',desc:'Оставить образ без дополнительных деталей.',price:0,src:'assets/player/layers/accessory-none.svg',starter:true},
  {id:'accessory-scarf',slot:'accessory',name:'Бордовый шарф',desc:'Тёплый шарф для прогулок.',price:16,starter:true,src:'assets/player/layers/accessory-scarf.svg'},
  {id:'accessory-belt',starter:true,slot:'accessory',name:'Пояс с подсумком',desc:'Полезная деталь для путешествий.',price:18,src:'assets/player/layers/accessory-belt.svg'},
  {id:'accessory-brooch',starter:true,slot:'accessory',name:'Брошь сакуры',desc:'Небольшой цветочный знак.',price:14,src:'assets/player/layers/accessory-brooch.svg'},
  {id:'accessory-tote',slot:'accessory',name:'Сумка-шоппер',desc:'Вместительная сумка для покупок.',price:19,src:'assets/player/layers/accessory-tote.svg'},
  {id:'accessory-gloves',slot:'accessory',name:'Перчатки',desc:'Практичные перчатки для прохладной погоды.',price:15,src:'assets/player/layers/accessory-gloves.svg'},
  {id:'accessory-flower-clip',slot:'accessory',name:'Цветочная заколка',desc:'Небольшой аксессуар для волос.',price:17,src:'assets/player/layers/accessory-flower-clip.svg'},
  {id:'accessory-shoulderbag',slot:'accessory',name:'Плечевая сумка',desc:'Небольшая сумка для мелочей.',price:20,src:'assets/player/layers/accessory-shoulderbag.svg'}
];

const CLOTHING_BY_ID = Object.fromEntries(CLOTHING.map(item=>[item.id,item]));
const STARTER_CLOTHING = CLOTHING.filter(item=>item.starter).map(item=>item.id);
const DEFAULT_EQUIPMENT = {head:'head-none',top:'top-basic',outer:'outer-none',bottom:'bottom-trousers',shoes:'shoes-sneakers',accessory:'accessory-none'};
const PRESET_EQUIPMENT = {
  casual:{...DEFAULT_EQUIPMENT,top:'top-basic',outer:'outer-jacket',bottom:'bottom-cargo',shoes:'shoes-sneakers',accessory:'accessory-none'},
  date:{...DEFAULT_EQUIPMENT,top:'top-formal',outer:'outer-haori',bottom:'bottom-formal',shoes:'shoes-formal',accessory:'accessory-brooch'},
  work:{...DEFAULT_EQUIPMENT,top:'top-work',outer:'outer-vest',bottom:'bottom-cargo',shoes:'shoes-boots',accessory:'accessory-belt'},
  training:{...DEFAULT_EQUIPMENT,top:'top-shinobi',outer:'outer-vest',bottom:'bottom-shinobi',shoes:'shoes-sandals',accessory:'accessory-none'},
  walk:{...DEFAULT_EQUIPMENT,top:'top-knit',outer:'outer-raincoat',bottom:'bottom-trousers',shoes:'shoes-boots',accessory:'accessory-scarf'}
};
const LOOK_TO_PRESET = {casual:'casual',shinobi:'training',festival:'date',travel:'walk',raincoat:'walk',workwear:'work'};

function normalizeEquipment(equipment,look='casual') {
  const preset=PRESET_EQUIPMENT[LOOK_TO_PRESET[look]||'casual'];
  const out={...preset};
  for (const slot of CLOTHING_SLOTS) {
    const candidate=equipment?.[slot.id];
    if (candidate && CLOTHING_BY_ID[candidate]?.slot===slot.id) out[slot.id]=candidate;
  }
  return out;
}

return { CLOTHING_SLOTS, CLOTHING, CLOTHING_BY_ID, STARTER_CLOTHING, DEFAULT_EQUIPMENT, PRESET_EQUIPMENT, LOOK_TO_PRESET, normalizeEquipment };
},
"src/core/store.js": function(__require) {
const { STARTER_CLOTHING,normalizeEquipment } = __require("src/data/clothing.js");
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
    relationships: {},
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

function normalizeState(input) {
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
    relationships: input.relationships && typeof input.relationships === 'object' ? input.relationships : {},
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
"src/core/progression.js": function(__require) {
const { addFeed,addItem,removeItem } = __require("src/core/store.js");

const SKILL_META = {
  chakra:{name:'Контроль чакры',icon:'🌀',description:'Тренировки, концентрация и защитные приёмы.'},
  fieldcraft:{name:'Полевые навыки',icon:'🧭',description:'Исследование мест, поиск и ориентирование.'},
  support:{name:'Помощь людям',icon:'🤝',description:'Поддержка жителей, медицина и работа в саду.'},
  knowledge:{name:'Знания',icon:'📚',description:'Чтение, обучение и полезные заметки.'},
  social:{name:'Общение',icon:'💬',description:'Разговоры, знакомство и внимательное отношение.'},
  craft:{name:'Ремесло',icon:'🧰',description:'Приготовление и создание полезных вещей.'}
};

const DAILY_POOL = [
  {id:'visit-two',title:'Пройтись по деревне',desc:'Посети два разных места Конохи.',metric:'visit',target:2,reward:18},
  {id:'train-twice',title:'Практика контроля',desc:'Проведи две тренировки.',metric:'train',target:2,reward:20},
  {id:'help-one',title:'Доброе дело',desc:'Помоги жителям или медицинскому корпусу.',metric:'help',target:1,reward:16},
  {id:'study-one',title:'Час знаний',desc:'Займись чтением или учёбой.',metric:'study',target:1,reward:14},
  {id:'search-two',title:'Внимательный наблюдатель',desc:'Дважды исследуй окружение.',metric:'search',target:2,reward:16},
  {id:'talk-two',title:'Не терять связь',desc:'Поговори с жителями два раза.',metric:'talk',target:2,reward:18},
  {id:'work-one',title:'Честная смена',desc:'Заверши одну рабочую смену.',metric:'work',target:1,reward:22},
  {id:'craft-one',title:'Полезная вещь',desc:'Изготовь любой предмет дома.',metric:'craft',target:1,reward:20},
  {id:'garden-one',title:'Зелёный уголок',desc:'Помоги в саду.',metric:'garden',target:1,reward:14},
  {id:'rest-one',title:'Восстановить силы',desc:'Найди время для отдыха.',metric:'rest',target:1,reward:12},
  {id:'patrol-one',title:'Патрульная смена',desc:'Заверши одно учебное столкновение или патруль.',metric:'patrol',target:1,reward:24}
];

function createDailyBoard(day=1) {
  const start=(Math.max(1,Number(day)||1)-1)%DAILY_POOL.length;
  const indices=[start,(start+3)%DAILY_POOL.length,(start+6)%DAILY_POOL.length];
  return {day:Number(day)||1,contracts:indices.map(index=>({...DAILY_POOL[index],progress:0,done:false}))};
}

function ensureDailyBoard(state) {
  if (!state.dailyBoard || state.dailyBoard.day !== state.world.day || !Array.isArray(state.dailyBoard.contracts) || !state.dailyBoard.contracts.length) {
    if (state.dailyBoard?.contracts?.length) {
      state.dailyBoardHistory ||= [];
      state.dailyBoardHistory.unshift({...state.dailyBoard,expired:true});
      state.dailyBoardHistory=state.dailyBoardHistory.slice(0,14);
    }
    state.dailyBoard=createDailyBoard(state.world.day);
  }
  return state.dailyBoard;
}

function recordDailyProgress(state,metric,amount=1) {
  const board=ensureDailyBoard(state);
  let completed=0;
  for (const contract of board.contracts) {
    if (contract.done || contract.metric!==metric) continue;
    contract.progress=Math.min(contract.target,Math.max(0,(contract.progress||0)+Math.max(0,amount)));
    if (contract.progress>=contract.target) {
      contract.done=true;
      completed++;
      state.player.stats.coins=Math.max(0,(state.player.stats.coins||0)+contract.reward);
      state.player.stats.renown=Math.min(100,(state.player.stats.renown||0)+1);
      addFeed(state,`Ежедневное поручение «${contract.title}» выполнено. Получено ${contract.reward} рё и +1 репутация.`);
    }
  }
  return completed;
}

function getSkillLevel(state,skill) {
  return Math.max(1,Math.min(5,Number(state.skills?.[skill]?.level)||1));
}

function gainSkillXP(state,skill,amount=1) {
  if (!SKILL_META[skill]) return null;
  state.skills ||= {};
  const current=state.skills[skill]||{xp:0,level:1};
  current.level=Math.max(1,Math.min(5,Number(current.level)||1));
  current.xp=Math.max(0,Number(current.xp)||0)+Math.max(0,Number(amount)||0);
  let levelUps=0;
  while (current.level<5 && current.xp>=current.level*20) {
    current.xp-=current.level*20;
    current.level++;
    levelUps++;
  }
  if (current.level>=5) current.xp=Math.min(current.xp,99);
  state.skills[skill]=current;
  if (levelUps) addFeed(state,`Навык «${SKILL_META[skill].name}» повышен до ${current.level}-го уровня.`);
  return current;
}

const RECIPES = [
  {id:'field-kit',name:'Походная аптечка',desc:'Небольшой набор для восстановления здоровья.',ingredients:{herb:2,paper:1},result:{id:'field-kit',name:'Походная аптечка',desc:'Используй, чтобы восстановить 28 HP.',kind:'other',qty:1}},
  {id:'herbal-tea',name:'Травяной чай',desc:'Тёплый напиток, который помогает восстановить силы.',ingredients:{herb:1,tea:1},result:{id:'herbal-tea',name:'Травяной чай',desc:'Восстанавливает 28 выносливости и 5 внимания.',kind:'food',qty:1}},
  {id:'pressed-bouquet',name:'Памятный букет',desc:'Аккуратная композиция из цветов и бумаги.',ingredients:{flower:2,paper:1},result:{id:'pressed-bouquet',name:'Памятный букет',desc:'Небольшой подарок ручной работы.',kind:'gift',qty:1}}
];

function canCraft(state,recipeId) {
  const recipe=RECIPES.find(item=>item.id===recipeId);
  if (!recipe || state.world.location!=='home') return false;
  return Object.entries(recipe.ingredients).every(([id,qty])=>(state.inventory.find(item=>item.id===id)?.qty||0)>=qty);
}

function craftItem(state,recipeId) {
  const recipe=RECIPES.find(item=>item.id===recipeId);
  if (!recipe) return {ok:false,message:'Такого рецепта нет.'};
  if (state.world.location!=='home') return {ok:false,message:'Изготавливать вещи можно на домашнем рабочем столе.'};
  const missing=Object.entries(recipe.ingredients).filter(([id,qty])=>(state.inventory.find(item=>item.id===id)?.qty||0)<qty);
  if (missing.length) return {ok:false,message:'Не хватает материалов для этого рецепта.'};
  for (const [id,qty] of Object.entries(recipe.ingredients)) removeItem(state,id,qty);
  addItem(state,recipe.result);
  gainSkillXP(state,'craft',8);
  recordDailyProgress(state,'craft',1);
  addFeed(state,`Изготовлено: ${recipe.result.name}. Материалы списаны из сумки.`);
  return {ok:true,message:`Готово: ${recipe.result.name}.`};
}

function useCraftedItem(state,itemId) {
  const item=state.inventory.find(entry=>entry.id===itemId && entry.qty>0);
  if (!item) return {ok:false,message:'Предмет не найден.'};
  const stats=state.player.stats;
  if (itemId==='field-kit') {
    if ((stats.hp??100)>=100) return {ok:false,message:'Здоровье уже полностью восстановлено.'};
    removeItem(state,itemId,1); stats.hp=Math.min(100,(stats.hp??100)+28);
    addFeed(state,'Ты использовал походную аптечку и восстановил 28 HP.');
    return {ok:true,message:'Аптечка использована: +28 HP.'};
  }
  if (itemId==='herbal-tea') {
    if (stats.stamina>=100 && stats.focus>=100) return {ok:false,message:'Сейчас отдых и напиток не нужны: силы уже восстановлены.'};
    removeItem(state,itemId,1); stats.stamina=Math.min(100,stats.stamina+28); stats.focus=Math.min(100,stats.focus+5);
    addFeed(state,'Ты выпил травяной чай и немного восстановил силы.');
    return {ok:true,message:'Травяной чай выпит: +28 EN, +5 внимания.'};
  }
  return {ok:false,message:'Этот предмет нельзя использовать напрямую.'};
}

return { SKILL_META, createDailyBoard, ensureDailyBoard, recordDailyProgress, getSkillLevel, gainSkillXP, RECIPES, canCraft, craftItem, useCraftedItem };
},
"src/core/relationships.js": function(__require) {
const { CHARACTERS,getCharacter } = __require("src/data/characters.js");
const { getBond,updateBond,addFeed } = __require("src/core/store.js");


// Adult-only, non-sexual romance routes. Younger/age-ambiguous characters stay friendship-only.
const ROMANCE_PROFILES = {
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

const DATE_ACTIVITIES = [
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

function canRomance(state,characterId) {
  return Boolean(state?.player?.gender==='female' && Number(state?.player?.age)>=18 && ROMANCE_PROFILES[characterId] && getCharacter(characterId));
}

function getRelationship(state,characterId) {
  state.relationships ||= {};
  const current=state.relationships[characterId]||{};
  return state.relationships[characterId]={status:'none',mood:55,dates:0,lastInitiativeDay:0,pending:null,...current};
}

function clamp(value,min=0,max=100) { return Math.max(min,Math.min(max,Number(value)||0)); }

function completeRomanticDate(state,characterId,activityId) {
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

function confessFeelings(state,characterId) {
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

function resolveInitiative(state,characterId,accept) {
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

function maybeQueueRelationshipInitiative(state,oldDay,oldMinute) {
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

return { ROMANCE_PROFILES, DATE_ACTIVITIES, canRomance, getRelationship, completeRomanticDate, confessFeelings, resolveInitiative, maybeQueueRelationshipInitiative };
},
"src/core/life.js": function(__require) {
const { WEATHER,SEASONS,LOCATIONS,getLocation } = __require("src/data/world.js");
const { getBond,updateBond,addFeed,addItem,removeItem } = __require("src/core/store.js");
const { CHARACTERS } = __require("src/data/characters.js");
const { ensureDailyBoard,recordDailyProgress,gainSkillXP } = __require("src/core/progression.js");
const { maybeQueueRelationshipInitiative } = __require("src/core/relationships.js");





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
  'tea-house':[28,56],river:[15,83],forest:[7,51],memorial:[14,18],gate:[50,5],library:[20,39],garden:[34,70],home:[56,64],'music-hall':[88,48],
  academy:[81,20],campsite:[6,83],bathhouse:[21,63],dojo:[89,76],archive:[19,29],residential:[64,55],rooftop:[69,22],greenhouse:[40,70]
};

function getLocationAccess(state,id) {
  const place=getLocation(id);
  const renown=Number(state?.player?.stats?.renown)||0;
  if(id==='music-hall' && !state?.discoveredLocations?.includes('music-hall')) return {allowed:false,reason:'Эту площадку ещё не нашли в ходе RP-разговора.'};
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
  const oldMinute = state.world.minute;
  const safeMinutes=Math.max(0,Number.isFinite(Number(minutes))?Number(minutes):0);
  const currentMinute=Math.max(0,Number.isFinite(Number(state.world.minute))?Number(state.world.minute):0);
  let total = currentMinute + safeMinutes;
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
    ensureDailyBoard(state);
  } else if (Math.random() < 0.12) {
    let pool = WEATHER;
    if (state.world.season === 1) pool = WEATHER.filter(item => item.id !== 'snow');
    if (state.world.season === 3) pool = WEATHER.filter(item => item.id !== 'rain');
    state.world.weather = pool[Math.floor(Math.random() * pool.length)].id;
  }
  updateNpcPositions(state,false);
  maybeQueueRelationshipInitiative(state,oldDay,oldMinute);
  return state;
}

const WORLD_EVENTS = [
  {id:'market-parcels',title:'Коробки у торгового ряда',desc:'Порыв ветра опрокинул коробки у прилавка. Торговец пытается удержать товар, а несколько свёртков уже катятся по улице.',place:'market',choices:[
    {id:'collect',label:'Помочь собрать коробки',outcome:'Вы вместе собрали товар. Торговец благодарит за быструю помощь.',effects:{renown:2,coins:8},skill:'support',xp:4},
    {id:'sort',label:'Разложить товар по местам',outcome:'Ты аккуратно рассортировал покупки. Торговец запомнил твою внимательность.',effects:{focus:5,renown:1},skill:'knowledge',xp:4}
  ]},
  {id:'garden-sapling',title:'Саженец после ливня',desc:'В саду молодой саженец накренился после дождя. Рядом лежат подпорки и небольшая лейка.',place:'garden',choices:[
    {id:'support',label:'Укрепить саженец',outcome:'Саженец выпрямлен и закреплён. Смотритель сада обещает присмотреть за ним.',effects:{renown:2,focus:3},item:{id:'flower',name:'Полевые цветы',desc:'Небольшой букет из общественного сада.',kind:'gift',qty:1},skill:'support',xp:5},
    {id:'water',label:'Полить соседние клумбы',outcome:'Ты полил соседние клумбы и убрал садовый инвентарь на место.',effects:{stamina:4,renown:1},skill:'support',xp:3}
  ]},
  {id:'training-target',title:'Сбившаяся мишень',desc:'На тренировочной площадке мишень перекосилась, а начинающий ученик не может понять, как правильно оценивать дистанцию.',place:'training',choices:[
    {id:'coach',label:'Объяснить принцип расчёта',outcome:'Ты спокойно объяснил, как оценивать расстояние и направление. Ученик благодарит за урок.',effects:{focus:6,renown:2},skill:'knowledge',xp:5},
    {id:'repair',label:'Починить крепление',outcome:'Мишень снова стоит ровно. Инструктор отмечает твою практичность.',effects:{stamina:-3,renown:2},skill:'fieldcraft',xp:5}
  ]},
  {id:'clinic-supplies',title:'Перепутанные медицинские свёртки',desc:'В больнице несколько коробок с перевязочными материалами оказались не на своих полках. Медсестра просит помочь с сортировкой.',place:'hospital',choices:[
    {id:'sort',label:'Рассортировать материалы',outcome:'Материалы разложены по подписям. Медперсоналу стало проще работать.',effects:{focus:5,renown:2},skill:'support',xp:6},
    {id:'donate',label:'Передать лечебную траву',outcome:'Ты передал лечебную траву в медицинский корпус. Её добавят в общий запас.',requires:{item:'herb',qty:1},effects:{renown:3,coins:4},skill:'support',xp:6}
  ]},
  {id:'forest-footprints',title:'Следы у старой беседки',desc:'После дождя у лесной тропы видны необычные следы. Рядом нет признаков опасности, но кажется, что кто-то потерял небольшой свёрток.',place:'forest',choices:[
    {id:'inspect',label:'Осмотреть тропу внимательно',outcome:'Ты нашёл свёрток с чистой бумагой и оставил его у сторожки, чтобы владелец мог забрать находку.',effects:{focus:4,renown:1},item:{id:'paper',name:'Качественная бумага',desc:'Бумага из найденного свёртка.',kind:'material',qty:1},skill:'fieldcraft',xp:6},
    {id:'mark',label:'Оставить отметку для патруля',outcome:'Ты отметил место на карте патруля. Следующая смена сможет проверить тропу.',effects:{renown:2,coins:5},skill:'fieldcraft',xp:5}
  ]},
  {id:'street-note',title:'Записка на скамье',desc:'На главной улице ты замечаешь записку с адресом. Похоже, её выронил кто-то из жителей.',place:'main-street',choices:[
    {id:'notice',label:'Отнести записку на доску находок',outcome:'Записка попала на доску находок. Владелец сможет её забрать.',effects:{renown:2,focus:2},skill:'support',xp:4},
    {id:'ask',label:'Спросить прохожих, кто её ищет',outcome:'Один из прохожих узнаёт почерк и обещает передать записку владельцу.',effects:{renown:1},skill:'social',xp:4}
  ]},
  {id:'library-book',title:'Книга без каталожного номера',desc:'В библиотеке обнаружилась старая книга без каталожной карточки. Библиотекарь не уверен, куда её вернуть.',place:'library',choices:[
    {id:'catalog',label:'Помочь найти раздел',outcome:'По оглавлению и теме ты определил подходящий раздел. Книга вернулась на полку.',effects:{focus:7,renown:1},skill:'knowledge',xp:7},
    {id:'copy',label:'Сделать заметку для каталога',outcome:'Ты составил краткую карточку, чтобы книгу было проще находить.',effects:{focus:5},item:{id:'paper',name:'Качественная бумага',desc:'Оставшийся лист для заметок.',kind:'material',qty:1},skill:'knowledge',xp:6}
  ]},
  {id:'river-lantern',title:'Фонарь у берега',desc:'У берега реки застрял бумажный фонарь с праздничной ленточкой. Он ещё цел, но течение может унести его дальше.',place:'river',choices:[
    {id:'retrieve',label:'Осторожно достать фонарь',outcome:'Ты достал фонарь и отнёс его к месту подготовки к празднику.',effects:{renown:2,stamina:-2},skill:'fieldcraft',xp:5},
    {id:'signal',label:'Позвать смотрителя берега',outcome:'Смотритель забрал фонарь специальным шестом и поблагодарил за внимательность.',effects:{renown:1,focus:2},skill:'support',xp:4}
  ]},
  {id:'ramen-order',title:'Перепутанный заказ в Ичираку',desc:'На стойке оказался лишний бэнто: похоже, два заказа перепутали. Повар пытается найти покупателя.',place:'ichiraku',choices:[
    {id:'check',label:'Помочь сверить заказы',outcome:'Вы нашли владельца заказа по записке. Повар угостил тебя чаем за помощь.',effects:{renown:1,stamina:5},item:{id:'tea',name:'Зелёный чай',desc:'Чай от повара Ичираку.',kind:'gift',qty:1},skill:'support',xp:4},
    {id:'wait',label:'Подождать, пока найдётся покупатель',outcome:'Покупатель вернулся сам. Ты не вмешивался, но помог сохранить порядок.',effects:{focus:3},skill:'social',xp:2}
  ]},
  {id:'tea-umbrella',title:'Забытый зонт',desc:'В чайном домике остался зонт. За окном начинается дождь, и хозяин не знает, кому он принадлежит.',place:'tea-house',choices:[
    {id:'register',label:'Оставить зонт у хозяина',outcome:'Хозяин записал находку в журнал забытых вещей.',effects:{renown:2},skill:'support',xp:4},
    {id:'dry',label:'Аккуратно просушить зонт',outcome:'Ты просушил зонт и оставил его у входа, чтобы владелец мог забрать вещь.',effects:{focus:4},skill:'craft',xp:3}
  ]},
  {id:'greenhouse-labels',title:'Перепутанные таблички',desc:'В теплице ветер перемешал таблички с названиями растений. Смотритель просит помочь восстановить порядок.',place:'greenhouse',choices:[
    {id:'identify',label:'Сверить растения по справочнику',outcome:'Ты сверил листья со справочником и вернул таблички на места.',effects:{focus:6,renown:2},skill:'knowledge',xp:6},
    {id:'organize',label:'Подготовить новые таблички',outcome:'Ты подготовил новые таблички и разложил их по грядкам.',effects:{renown:1},item:{id:'paper',name:'Качественная бумага',desc:'Остаток материала после табличек.',kind:'material',qty:1},skill:'craft',xp:5}
  ]}
];

function maybeAddWorldEvent(state) {
  if (state.world.actions === 0 || state.world.actions % 4 !== 0) return;
  const pending = state.scroll.some(item => item.kind === 'situation' && !item.done && !item.cancelled);
  if (pending) return;
  const candidates = WORLD_EVENTS.filter(item => item.place === state.world.location);
  if (!candidates.length) return;
  const event = candidates[(state.world.day + state.world.actions + state.world.minute) % candidates.length];
  const entry={id:`situation-${event.id}-${state.world.day}-${state.world.actions}`,title:event.title,desc:event.desc,kind:'situation',scenarioId:event.id,choices:event.choices.map(choice=>({id:choice.id,label:choice.label})),done:false,optional:true,day:state.world.day};
  state.scroll.unshift(entry);
  addFeed(state,`Необычная ситуация: ${event.title}. В свитке появились варианты действий.`);
}

function resolveWorldSituation(state,entryId,choiceId) {
  const entry=state.scroll.find(item=>item.id===entryId && item.kind==='situation');
  if (!entry || entry.done || entry.cancelled) return {ok:false,message:'Эта ситуация уже завершена или недоступна.'};
  const scenario=WORLD_EVENTS.find(item=>item.id===entry.scenarioId);
  const choice=scenario?.choices.find(item=>item.id===choiceId);
  if (!choice) return {ok:false,message:'Такого варианта нет.'};
  if (state.world.location!==scenario.place) return {ok:false,message:`Чтобы разобраться с этой ситуацией, вернись в «${getLocation(scenario.place).name}».`};
  if (choice.requires?.item && (state.inventory.find(item=>item.id===choice.requires.item)?.qty||0)<(choice.requires.qty||1)) return {ok:false,message:'Для этого решения не хватает нужного предмета.'};
  if (choice.requires?.item) removeItem(state,choice.requires.item,choice.requires.qty||1);
  const stats=state.player.stats;
  for (const [key,value] of Object.entries(choice.effects||{})) {
    if (!(key in stats)) continue;
    const max=key==='coins'?999999:100;
    stats[key]=Math.max(0,Math.min(max,(Number(stats[key])||0)+value));
  }
  if (choice.item) addItem(state,choice.item);
  if (choice.skill) gainSkillXP(state,choice.skill,choice.xp||3);
  entry.done=true;
  entry.completedDay=state.world.day;
  entry.outcome=choice.outcome;
  addFeed(state,`${entry.title}: ${choice.outcome}`);
  return {ok:true,message:choice.outcome};
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
    recordDailyProgress(state,'visit',1);
    gainSkillXP(state,'fieldcraft',4);
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
  const validTypes=new Set(['rest','meal','train','help','search','focus','barrier','cook','read','garden','clinic','tidy']);
  if (!validTypes.has(type)) return 'Неизвестное занятие.';
  if (type==='meal' && stats.coins<12) return 'Не хватает 12 рё на полноценный обед. Время и деньги не потрачены.';
  if (type==='barrier' && stats.chakra<8) return 'Чакры маловато для защитного упражнения. Время не потрачено.';
  if (['train','barrier'].includes(type) && stats.stamina<4) return 'Ты слишком устал для тренировки. Сначала отдохни.';
  tickAction(state,25);
  let line = '';
  const masteryBonus=skill=>Math.max(0,getSkillLevelSafe(state,skill)-1);
  switch (type) {
    case 'rest': stats.stamina = Math.min(100,stats.stamina+18); stats.focus = Math.min(100,stats.focus+7); line = 'Ты немного отдохнул. Силы восстановлены.'; recordDailyProgress(state,'rest'); gainSkillXP(state,'chakra',2); break;
    case 'meal': stats.coins -= 12; stats.stamina = Math.min(100,stats.stamina+24); line = 'Горячий обед восстановил силы. Потрачено 12 рё.'; break;
    case 'train': stats.stamina = Math.max(0,stats.stamina-10); stats.chakra = Math.min(100,stats.chakra+9+masteryBonus('chakra')); stats.focus = Math.min(100,stats.focus+5); stats.renown = Math.min(100,stats.renown+1); line = 'Ты выполнил тренировочное упражнение на контроль чакры. Навыки немного улучшились.'; recordDailyProgress(state,'train'); gainSkillXP(state,'chakra',8); break;
    case 'help': stats.renown = Math.min(100,stats.renown+2); stats.focus = Math.min(100,stats.focus+3); addItem(state,{id:'herb',name:'Лечебная трава',desc:'Полезная находка для медицинского корпуса.',kind:'material',qty:1}); line = 'Ты помог местным жителям. Репутация выросла, а в сумке появилась лечебная трава.'; recordDailyProgress(state,'help'); gainSkillXP(state,'support',7); break;
    case 'search': {
      const drops = [
        {id:'tea',name:'Зелёный чай',desc:'Ароматный чай для спокойного перерыва.',kind:'gift'},
        {id:'flower',name:'Полевые цветы',desc:'Небольшой букет, собранный у дороги.',kind:'gift'},
        {id:'paper',name:'Качественная бумага',desc:'Подойдёт для записок и оригами.',kind:'material'},
        {id:'herb',name:'Лечебная трава',desc:'Полезная находка для медицинского корпуса.',kind:'material'}
      ];
      const item = drops[Math.floor(Math.random()*drops.length)]; addItem(state,{...item,qty:1}); line = `Во время осмотра территории ты нашёл: ${item.name}.`; recordDailyProgress(state,'search'); gainSkillXP(state,'fieldcraft',6); break;
    }
    case 'focus': stats.chakra = Math.min(100,stats.chakra+14); stats.focus = Math.min(100,stats.focus+8); line = 'Ты спокойно сосредоточился и восстановил контроль над чакрой.'; gainSkillXP(state,'chakra',5); break;
    case 'barrier': stats.chakra -= 8; stats.focus = Math.min(100,stats.focus+5); line = 'Ты потренировал защитный барьер и безопасную эвакуацию команды. Упражнение завершено.'; gainSkillXP(state,'chakra',7); break;
    case 'cook': addItem(state,{id:'bento',name:'Домашний бэнто',desc:'Простой обед, приготовленный дома.',kind:'food',qty:1}); stats.stamina = Math.min(100,stats.stamina+8); line = 'Ты приготовил бэнто. В сумке появился обед.'; gainSkillXP(state,'craft',5); break;
    case 'read': stats.focus = Math.min(100,stats.focus+10); stats.chakra = Math.min(100,stats.chakra+2); line = 'Чтение помогло отвлечься и узнать кое-что новое.'; recordDailyProgress(state,'study'); gainSkillXP(state,'knowledge',7); break;
    case 'garden': stats.focus = Math.min(100,stats.focus+5); addItem(state,{id:'flower',name:'Полевые цветы',desc:'Свежие цветы из общественного сада.',kind:'gift',qty:1}); line = 'Ты помог в саду и собрал несколько свежих цветов.'; recordDailyProgress(state,'garden'); gainSkillXP(state,'support',5); break;
    case 'clinic': {
      stats.renown = Math.min(100,stats.renown+2); stats.focus = Math.min(100,stats.focus+4);
      line = 'Ты помог медицинскому корпусу с повседневными делами.';
      recordDailyProgress(state,'help'); gainSkillXP(state,'support',7);
      const clinicQuest = state.scroll.find(item=>item.id==='clinic-help' && !item.done);
      if (clinicQuest && state.world.location==='hospital' && clinicQuest.visited) { clinicQuest.done=true; clinicQuest.completedDay=state.world.day; addFeed(state,'Поручение «Помощь медицинскому корпусу» выполнено: ты помог медикам на месте.'); }
      break;
    }
    case 'tidy': stats.focus = Math.min(100,stats.focus+7); line = 'Ты навёл порядок. Теперь дома приятнее находиться.'; gainSkillXP(state,'craft',3); break;
  }
  addFeed(state,line);
  return line;
}

function getSkillLevelSafe(state,skill) {
  return Math.max(1,Math.min(5,Number(state.skills?.[skill]?.level)||1));
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
  const add = id => { if (id && LOCATIONS.some(place=>place.id===id) && !(LOCATIONS.find(place=>place.id===id)?.hidden && !state?.discoveredLocations?.includes(id)) && !choices.includes(id)) choices.push(id); };
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
    if (state?.discoveredLocations?.includes('music-hall')) add('music-hall');
  }
  if (period === 'night') {
    for (const id of ['home','tea-house','garden','ichiraku']) add(id);
    if (state?.discoveredLocations?.includes('music-hall')) add('music-hall');
  }
  for (const id of ['main-street','market','garden','tea-house','library','home','training','river','ichiraku','flower-shop','hospital','gate','academy','hokage','forest','memorial','campsite','bathhouse','dojo','archive','residential','rooftop','greenhouse','music-hall']) add(id);
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

return { clockLabel, timePeriod, getLocationAccess, getTravelMinutes, getWeather, seasonLabel, advanceTime, resolveWorldSituation, tickAction, skipTime, sleepUntilMorning, travelTo, doActivity, assignDailyTask, getWorldMood, updateNpcPositions, getNpcLocation, getLocationList };
},
"src/data/dialogue-expansion-extra.js": function(__require) {

// Thirty additional dialogue categories: 300 new exact-match prompts.
const EXTRA_DIALOGUE = [
  // hobbies
  {kind:'hobbies',text:'Чем ты любишь заниматься, когда выдаётся свободный час?'},
  {kind:'hobbies',text:'Есть ли у тебя хобби, о котором мало кто знает?'},
  {kind:'hobbies',text:'Какое занятие помогает тебе отвлечься от повседневных дел?'},
  {kind:'hobbies',text:'Ты предпочитаешь спокойные увлечения или активные?'},
  {kind:'hobbies',text:'Какое новое хобби ты хотела бы попробовать?'},
  {kind:'hobbies',text:'Тебе нравится собирать необычные вещи?'},
  {kind:'hobbies',text:'Как ты обычно находишь время для своих увлечений?'},
  {kind:'hobbies',text:'Есть ли занятие, которым ты можешь заниматься часами?'},
  {kind:'hobbies',text:'Какое увлечение ты посоветовала бы новичку?'},
  {kind:'hobbies',text:'Что из своих хобби ты хотела бы показать другим?'},
  // art
  {kind:'art',text:'Какое направление в искусстве тебе особенно интересно?'},
  {kind:'art',text:'Тебе больше нравится рисовать или рассматривать чужие работы?'},
  {kind:'art',text:'Какую картину ты хотела бы однажды создать?'},
  {kind:'art',text:'Какие цвета лучше всего передают твоё настроение?'},
  {kind:'art',text:'Ты замечаешь красивые детали в обычных вещах?'},
  {kind:'art',text:'Любишь ли ты посещать художественные выставки?'},
  {kind:'art',text:'Что важнее в рисунке: точность или настроение?'},
  {kind:'art',text:'Какой пейзаж Конохи ты хотела бы нарисовать?'},
  {kind:'art',text:'Тебе проще творить в тишине или под музыку?'},
  {kind:'art',text:'Как ты относишься к необычным художественным стилям?'},
  // crafts
  {kind:'crafts',text:'Тебе нравится делать вещи своими руками?'},
  {kind:'crafts',text:'Какое ремесло ты хотела бы освоить?'},
  {kind:'crafts',text:'Ты умеешь чинить простые бытовые предметы?'},
  {kind:'crafts',text:'Что приятнее создавать: полезные вещи или украшения?'},
  {kind:'crafts',text:'Есть ли у тебя любимый материал для поделок?'},
  {kind:'crafts',text:'Как ты учишься новому ремеслу?'},
  {kind:'crafts',text:'Что бы ты сделала в подарок своими руками?'},
  {kind:'crafts',text:'Тебе нравится работать с деревом или тканью?'},
  {kind:'crafts',text:'Как понять, что вещь сделана качественно?'},
  {kind:'crafts',text:'Какой небольшой проект можно выполнить за вечер?'},
  // pets
  {kind:'pets',text:'Какое животное лучше всего подходит для жизни в Конохе?'},
  {kind:'pets',text:'Ты больше любишь кошек, собак или птиц?'},
  {kind:'pets',text:'Как понять, что питомцу не хватает внимания?'},
  {kind:'pets',text:'Какое имя ты бы выбрала для маленького котёнка?'},
  {kind:'pets',text:'Ты когда-нибудь ухаживала за раненым животным?'},
  {kind:'pets',text:'Что важно подготовить перед тем, как завести питомца?'},
  {kind:'pets',text:'Как приучить животное не бояться незнакомых людей?'},
  {kind:'pets',text:'Тебе нравится наблюдать за птицами?'},
  {kind:'pets',text:'Какое животное кажется тебе самым сообразительным?'},
  {kind:'pets',text:'Как лучше ухаживать за питомцем во время путешествия?'},
  // gardening
  {kind:'gardening',text:'Какие растения лучше всего приживаются в нашем климате?'},
  {kind:'gardening',text:'Тебе нравится ухаживать за садом?'},
  {kind:'gardening',text:'Какое растение ты посадила бы возле дома?'},
  {kind:'gardening',text:'Ты умеешь выращивать цветы из семян?'},
  {kind:'gardening',text:'Что делать, если растение начинает увядать?'},
  {kind:'gardening',text:'Какие цветы лучше дарить весной?'},
  {kind:'gardening',text:'Любишь ли ты работать в теплице?'},
  {kind:'gardening',text:'Как сделать общественный сад уютнее?'},
  {kind:'gardening',text:'Какое дерево ты хотела бы посадить в Конохе?'},
  {kind:'gardening',text:'Что тебе нравится в уходе за растениями?'},
  // medicine
  {kind:'medicine',text:'Что самое важное в работе хорошего медика?'},
  {kind:'medicine',text:'Как ты сохраняешь спокойствие, когда кому-то нужна помощь?'},
  {kind:'medicine',text:'Какой медицинский навык ты хотела бы освоить?'},
  {kind:'medicine',text:'Почему важно внимательно выслушать пациента?'},
  {kind:'medicine',text:'Как организовать порядок в медицинском кабинете?'},
  {kind:'medicine',text:'Что помогает не забыть важные записи?'},
  {kind:'medicine',text:'Как ты относишься к профилактическим осмотрам?'},
  {kind:'medicine',text:'Чему можно научиться, помогая в больнице?'},
  {kind:'medicine',text:'Как поддержать человека, который волнуется перед осмотром?'},
  {kind:'medicine',text:'Какой совет по заботе о себе ты считаешь полезным?'},
  // cooking
  {kind:'cooking',text:'Какое блюдо у тебя получается особенно хорошо?'},
  {kind:'cooking',text:'Тебе нравится придумывать собственные рецепты?'},
  {kind:'cooking',text:'Какой ингредиент способен изменить вкус привычного блюда?'},
  {kind:'cooking',text:'Ты предпочитаешь готовить быстро или не спеша?'},
  {kind:'cooking',text:'Что проще всего приготовить для большой компании?'},
  {kind:'cooking',text:'Как понять, что суп уже достаточно настоялся?'},
  {kind:'cooking',text:'Какое блюдо напоминает тебе о доме?'},
  {kind:'cooking',text:'Ты любишь экспериментировать со специями?'},
  {kind:'cooking',text:'Как распределить обязанности, если готовят несколько человек?'},
  {kind:'cooking',text:'Какой рецепт ты хотела бы однажды передать ученикам?'},
  // style
  {kind:'style',text:'Как ты выбираешь одежду на обычный день?'},
  {kind:'style',text:'Тебе важнее удобство или внешний вид одежды?'},
  {kind:'style',text:'Какие цвета ты чаще выбираешь в одежде?'},
  {kind:'style',text:'Какой наряд лучше подходит для фестиваля?'},
  {kind:'style',text:'Ты любишь менять стиль или придерживаешься привычного?'},
  {kind:'style',text:'Как подобрать одежду под дождливую погоду?'},
  {kind:'style',text:'Есть ли у тебя вещь, которую носишь особенно часто?'},
  {kind:'style',text:'Что делает одежду удобной для долгого дня?'},
  {kind:'style',text:'Тебе нравится помогать друзьям выбирать наряд?'},
  {kind:'style',text:'Как ты относишься к одежде ручной работы?'},
  // shopping
  {kind:'shopping',text:'Ты любишь ходить по рынку без конкретной цели?'},
  {kind:'shopping',text:'Как понять, что цена на товар справедливая?'},
  {kind:'shopping',text:'Ты составляешь список покупок заранее?'},
  {kind:'shopping',text:'Какой отдел на рынке ты посещаешь чаще всего?'},
  {kind:'shopping',text:'Предпочитаешь покупать у знакомых торговцев?'},
  {kind:'shopping',text:'Как не потратить все деньги на мелочи?'},
  {kind:'shopping',text:'Что лучше покупать заранее, а что — по необходимости?'},
  {kind:'shopping',text:'Тебе нравится торговаться или это утомляет?'},
  {kind:'shopping',text:'Какой товар на рынке сложно найти?'},
  {kind:'shopping',text:'На что ты обращаешь внимание при выборе подарка?'},
  // games
  {kind:'games',text:'В какие настольные игры ты любишь играть?'},
  {kind:'games',text:'Тебе больше нравятся игры на удачу или на логику?'},
  {kind:'games',text:'Какую игру ты могла бы объяснить новичку за минуту?'},
  {kind:'games',text:'Ты предпочитаешь играть один на один или командами?'},
  {kind:'games',text:'Что важнее в игре: победа или хорошая компания?'},
  {kind:'games',text:'Как ты реагируешь на неожиданное поражение?'},
  {kind:'games',text:'Любишь ли ты загадки и словесные игры?'},
  {kind:'games',text:'Какую новую игру стоило бы придумать для академии?'},
  {kind:'games',text:'Ты умеешь придумывать правила на ходу?'},
  {kind:'games',text:'Как сделать игру интересной для людей разного возраста?'},
  // sports
  {kind:'sports',text:'Какой вид спорта тебе нравится больше всего?'},
  {kind:'sports',text:'Ты предпочитаешь командные игры или индивидуальные упражнения?'},
  {kind:'sports',text:'Как правильно чередовать тренировку и отдых?'},
  {kind:'sports',text:'Какой спортивный навык ты хотела бы улучшить?'},
  {kind:'sports',text:'Тебе нравятся соревнования на выносливость?'},
  {kind:'sports',text:'Как поддержать товарища после неудачного выступления?'},
  {kind:'sports',text:'Какую разминку ты считаешь самой полезной?'},
  {kind:'sports',text:'Тебе нравится плавание или бег?'},
  {kind:'sports',text:'Как сделать тренировку интереснее для команды?'},
  {kind:'sports',text:'Какой спортивный праздник ты хотела бы провести в деревне?'},
  // leadership
  {kind:'leadership',text:'Каким должен быть справедливый руководитель?'},
  {kind:'leadership',text:'Тебе комфортно брать ответственность за группу?'},
  {kind:'leadership',text:'Как распределить задачи, чтобы никого не перегрузить?'},
  {kind:'leadership',text:'Как поступить, если команда не согласна с решением лидера?'},
  {kind:'leadership',text:'Что важнее для руководителя: опыт или умение слушать?'},
  {kind:'leadership',text:'Как сообщить команде о сложном решении?'},
  {kind:'leadership',text:'Ты предпочитаешь руководить или быть надёжной опорой?'},
  {kind:'leadership',text:'Как заметить, что кто-то в команде выгорает?'},
  {kind:'leadership',text:'Что помогает заслужить уважение группы?'},
  {kind:'leadership',text:'Как признать ошибку, если ты отвечаешь за других?'},
  // mentoring
  {kind:'mentoring',text:'Тебе нравится объяснять другим то, что уже умеешь?'},
  {kind:'mentoring',text:'Как поддержать ученика, который боится ошибиться?'},
  {kind:'mentoring',text:'Какой наставник сильнее всего повлиял на тебя?'},
  {kind:'mentoring',text:'Что лучше: показать пример или объяснить словами?'},
  {kind:'mentoring',text:'Как понять, что ученик готов к самостоятельной работе?'},
  {kind:'mentoring',text:'Как давать советы, чтобы не звучать свысока?'},
  {kind:'mentoring',text:'Что делать, если ученик учится медленнее остальных?'},
  {kind:'mentoring',text:'Как поощрять любознательность у новичков?'},
  {kind:'mentoring',text:'Какой урок ты хотела бы провести в академии?'},
  {kind:'mentoring',text:'Что делает наставничество полезным для обеих сторон?'},
  // inventions
  {kind:'inventions',text:'Какое простое изобретение облегчило бы жизнь жителей?'},
  {kind:'inventions',text:'Тебе интересно разбираться в новых механизмах?'},
  {kind:'inventions',text:'Как проверить идею до того, как тратить материалы?'},
  {kind:'inventions',text:'Ты предпочитаешь улучшать готовые вещи или создавать новые?'},
  {kind:'inventions',text:'Какой бытовой прибор ты хотела бы увидеть в Конохе?'},
  {kind:'inventions',text:'Что делать, если опытный образец не работает?'},
  {kind:'inventions',text:'Как записывать идеи, чтобы не забыть их?'},
  {kind:'inventions',text:'Кого ты пригласила бы в команду изобретателей?'},
  {kind:'inventions',text:'Какое изобретение могло бы помочь библиотеке?'},
  {kind:'inventions',text:'Что важнее в полезной вещи: простота или много функций?'},
  // architecture
  {kind:'architecture',text:'Какой дом в Конохе кажется тебе самым красивым?'},
  {kind:'architecture',text:'Что делает улицу удобной для жителей?'},
  {kind:'architecture',text:'Ты предпочитаешь традиционные здания или современные?'},
  {kind:'architecture',text:'Как обустроить уютный внутренний двор?'},
  {kind:'architecture',text:'Какое общественное здание нужно деревне?'},
  {kind:'architecture',text:'Что важнее при строительстве: красота или практичность?'},
  {kind:'architecture',text:'Тебе нравится рассматривать старую архитектуру?'},
  {kind:'architecture',text:'Как сделать библиотеку светлее и уютнее?'},
  {kind:'architecture',text:'Какой вид открывается с самой красивой крыши?'},
  {kind:'architecture',text:'Как сохранить старые здания и не мешать развитию деревни?'},
  // folklore
  {kind:'folklore',text:'Какие местные легенды ты слышала в детстве?'},
  {kind:'folklore',text:'Ты веришь, что в старых историях есть доля правды?'},
  {kind:'folklore',text:'Какую легенду Конохи стоит рассказать гостям?'},
  {kind:'folklore',text:'Кто обычно передаёт истории из поколения в поколение?'},
  {kind:'folklore',text:'Есть ли сказка, которую ты помнишь наизусть?'},
  {kind:'folklore',text:'Как отличить народную легенду от выдумки?'},
  {kind:'folklore',text:'Ты любишь истории о путешественниках?'},
  {kind:'folklore',text:'Какую историю ты придумала бы для детей академии?'},
  {kind:'folklore',text:'Какие старинные приметы сохранились в деревне?'},
  {kind:'folklore',text:'Почему людям важно сохранять семейные предания?'},
  // languages
  {kind:'languages',text:'Какие языки ты понимаешь кроме родного?'},
  {kind:'languages',text:'Какой язык тебе хотелось бы выучить?'},
  {kind:'languages',text:'Тебе легче учить слова на слух или по книгам?'},
  {kind:'languages',text:'Как запоминать новые выражения?'},
  {kind:'languages',text:'Ты любишь сравнивать разные диалекты?'},
  {kind:'languages',text:'Как помочь приезжему, который плохо знает местный язык?'},
  {kind:'languages',text:'Какое слово на другом языке тебе особенно нравится?'},
  {kind:'languages',text:'Ты умеешь читать старинные надписи?'},
  {kind:'languages',text:'Как сделать языковую практику интереснее?'},
  {kind:'languages',text:'Какой язык пригодился бы в дальнем путешествии?'},
  // writing
  {kind:'writing',text:'Тебе нравится вести дневник?'},
  {kind:'writing',text:'Как ты начинаешь письмо, когда не знаешь, что написать?'},
  {kind:'writing',text:'Ты предпочитаешь короткие записки или подробные письма?'},
  {kind:'writing',text:'Какой рассказ ты хотела бы однажды написать?'},
  {kind:'writing',text:'Что помогает выразить мысль точнее?'},
  {kind:'writing',text:'Ты перечитываешь свои старые записи?'},
  {kind:'writing',text:'Как не забывать важные события в дороге?'},
  {kind:'writing',text:'Тебе нравится писать стихи или небольшие истории?'},
  {kind:'writing',text:'Какой совет ты дала бы начинающему автору?'},
  {kind:'writing',text:'О чём тебе интереснее всего писать?'},
  // photography
  {kind:'photography',text:'Тебе нравится сохранять красивые моменты на снимках?'},
  {kind:'photography',text:'Какой уголок Конохи ты хотела бы сфотографировать?'},
  {kind:'photography',text:'Что важнее в хорошем снимке: свет или композиция?'},
  {kind:'photography',text:'Ты предпочитаешь портреты или пейзажи?'},
  {kind:'photography',text:'Как поймать красивый кадр во время фестиваля?'},
  {kind:'photography',text:'Какие воспоминания ты хотела бы сохранить на снимках?'},
  {kind:'photography',text:'Тебе интереснее снимать природу или город?'},
  {kind:'photography',text:'Как сделать снимок интересным без сложного оборудования?'},
  {kind:'photography',text:'Ты любишь рассматривать старые фотографии?'},
  {kind:'photography',text:'Какой кадр лучше всего передал бы атмосферу Конохи?'},
  // theatre
  {kind:'theatre',text:'Тебе нравится смотреть театральные постановки?'},
  {kind:'theatre',text:'Какую роль ты хотела бы сыграть на сцене?'},
  {kind:'theatre',text:'Что сложнее: выучить текст или передать эмоции?'},
  {kind:'theatre',text:'Ты предпочитаешь комедии или серьёзные пьесы?'},
  {kind:'theatre',text:'Какую историю Конохи можно поставить в театре?'},
  {kind:'theatre',text:'Тебе интереснее выступать или помогать за кулисами?'},
  {kind:'theatre',text:'Что делает сцену запоминающейся?'},
  {kind:'theatre',text:'Как поддержать человека перед первым выступлением?'},
  {kind:'theatre',text:'Ты замечаешь работу декораторов и костюмеров?'},
  {kind:'theatre',text:'Какой спектакль стоит показать детям академии?'},
  // dance
  {kind:'dance',text:'Тебе нравится танцевать на праздниках?'},
  {kind:'dance',text:'Какой танец ты хотела бы научиться исполнять?'},
  {kind:'dance',text:'Тебе проще двигаться под быструю или спокойную музыку?'},
  {kind:'dance',text:'Как помочь новичку не стесняться на танцевальном занятии?'},
  {kind:'dance',text:'Ты предпочитаешь сольные выступления или танцы в группе?'},
  {kind:'dance',text:'Какой танец подошёл бы для фестиваля Конохи?'},
  {kind:'dance',text:'Что важнее в танце: точность движений или настроение?'},
  {kind:'dance',text:'Ты любишь смотреть народные танцы разных стран?'},
  {kind:'dance',text:'Как сделать танцевальную репетицию веселее?'},
  {kind:'dance',text:'Какой музыкальный ритм тебе ближе?'},
  // volunteering
  {kind:'volunteering',text:'Какая добровольная помощь нужнее всего жителям?'},
  {kind:'volunteering',text:'Ты участвовала в общественных работах?'},
  {kind:'volunteering',text:'Как организовать сбор вещей для нуждающихся?'},
  {kind:'volunteering',text:'Что помогает привлечь людей к доброму делу?'},
  {kind:'volunteering',text:'Как распределить волонтёров на большом мероприятии?'},
  {kind:'volunteering',text:'Как поддержать тех, кто помогает другим каждый день?'},
  {kind:'volunteering',text:'Какое место в деревне нуждается в совместной уборке?'},
  {kind:'volunteering',text:'Что важнее в добровольной работе: скорость или забота?'},
  {kind:'volunteering',text:'Ты бы провела день помощи пожилым жителям?'},
  {kind:'volunteering',text:'Как понять, какая помощь человеку действительно нужна?'},
  // community
  {kind:'community',text:'Что помогает соседям лучше узнавать друг друга?'},
  {kind:'community',text:'Какое общее мероприятие объединило бы жителей?'},
  {kind:'community',text:'Как решить спор между соседями мирным путём?'},
  {kind:'community',text:'Каких общественных мест не хватает в Конохе?'},
  {kind:'community',text:'Как сделать улицы удобнее для детей и пожилых?'},
  {kind:'community',text:'Тебе нравится участвовать в жизни района?'},
  {kind:'community',text:'Как собрать мнения жителей о важных изменениях?'},
  {kind:'community',text:'Что делает маленькое сообщество дружным?'},
  {kind:'community',text:'Как помочь новому жителю освоиться?'},
  {kind:'community',text:'Какую традицию соседского взаимопомощи ты бы ввела?'},
  // economy
  {kind:'economy',text:'Как ты обычно планируешь личные расходы?'},
  {kind:'economy',text:'На чём лучше не экономить?'},
  {kind:'economy',text:'Как накопить на большую покупку?'},
  {kind:'economy',text:'Ты сравниваешь цены перед покупкой?'},
  {kind:'economy',text:'Как отличить нужную покупку от спонтанной?'},
  {kind:'economy',text:'Что полезнее: копить понемногу или откладывать крупную сумму?'},
  {kind:'economy',text:'Как вести простой список доходов и расходов?'},
  {kind:'economy',text:'Какой совет по планированию бюджета ты считаешь разумным?'},
  {kind:'economy',text:'Ты предпочитаешь покупать качественную вещь надолго?'},
  {kind:'economy',text:'Как распределить общий бюджет команды на поездку?'},
  // worklife
  {kind:'worklife',text:'Как не забывать делать перерывы во время долгой работы?'},
  {kind:'worklife',text:'Ты предпочитаешь начинать с трудных задач или с простых?'},
  {kind:'worklife',text:'Как подготовить рабочее место к насыщенному дню?'},
  {kind:'worklife',text:'Что помогает сохранять внимание в конце смены?'},
  {kind:'worklife',text:'Как сообщить руководителю, что задач слишком много?'},
  {kind:'worklife',text:'Ты любишь работать по списку дел?'},
  {kind:'worklife',text:'Как восстановиться после напряжённой недели?'},
  {kind:'worklife',text:'Что делает рабочую команду справедливой?'},
  {kind:'worklife',text:'Как лучше принимать обратную связь?'},
  {kind:'worklife',text:'Какой рабочий навык ты хотела бы улучшить?'},
  // tools
  {kind:'tools',text:'Какой бытовой инструмент ты считаешь самым полезным?'},
  {kind:'tools',text:'Ты умеешь правильно ухаживать за инструментами?'},
  {kind:'tools',text:'Как организовать хранение мелких принадлежностей?'},
  {kind:'tools',text:'Что проверить перед началом простой починки?'},
  {kind:'tools',text:'Как понять, что инструмент пора заменить?'},
  {kind:'tools',text:'Ты предпочитаешь универсальные инструменты или специальные?'},
  {kind:'tools',text:'Как безопасно хранить острые хозяйственные предметы?'},
  {kind:'tools',text:'Какой инструмент стоило бы добавить в мастерскую?'},
  {kind:'tools',text:'Как научить новичка аккуратности в мастерской?'},
  {kind:'tools',text:'Что помогает поддерживать порядок после работы?'},
  // puzzles
  {kind:'puzzles',text:'Тебе нравятся логические загадки?'},
  {kind:'puzzles',text:'Как ты обычно подходишь к сложной головоломке?'},
  {kind:'puzzles',text:'Тебе проще решать загадки в одиночку или вместе?'},
  {kind:'puzzles',text:'Какую загадку ты помнишь с детства?'},
  {kind:'puzzles',text:'Что важнее при решении: терпение или догадливость?'},
  {kind:'puzzles',text:'Как придумать интересную головоломку для академии?'},
  {kind:'puzzles',text:'Ты любишь задачи на память?'},
  {kind:'puzzles',text:'Что делаешь, если решение никак не находится?'},
  {kind:'puzzles',text:'Как объяснить решение загадки так, чтобы не испортить интерес?'},
  {kind:'puzzles',text:'Какую тему ты выбрала бы для командной викторины?'},
  // weather
  {kind:'weather',text:'Какая погода лучше всего подходит для прогулки?'},
  {kind:'weather',text:'Что ты обычно делаешь в дождливый день?'},
  {kind:'weather',text:'Какой сезон в Конохе самый красивый?'},
  {kind:'weather',text:'Тебе нравится наблюдать за грозовыми облаками из укрытия?'},
  {kind:'weather',text:'Как подготовиться к внезапному похолоданию?'},
  {kind:'weather',text:'Ты любишь первые весенние дни?'},
  {kind:'weather',text:'Какой ветер тебе нравится больше: лёгкий или прохладный?'},
  {kind:'weather',text:'Что лучше делать в жаркий летний полдень?'},
  {kind:'weather',text:'Как погода влияет на твоё настроение?'},
  {kind:'weather',text:'Какое место в деревне особенно красиво после дождя?'},
  // communication
  {kind:'communication',text:'Как понять, что собеседник хочет высказаться?'},
  {kind:'communication',text:'Ты предпочитаешь говорить прямо или подбирать мягкие слова?'},
  {kind:'communication',text:'Как вести разговор, если мнения сильно различаются?'},
  {kind:'communication',text:'Что помогает избежать недопонимания в переписке?'},
  {kind:'communication',text:'Как лучше задавать вопросы, чтобы не звучать навязчиво?'},
  {kind:'communication',text:'Тебе легче обсуждать важные темы лично или письменно?'},
  {kind:'communication',text:'Как показать, что ты действительно слушаешь?'},
  {kind:'communication',text:'Что делать, если разговор зашёл в тупик?'},
  {kind:'communication',text:'Как корректно сменить неприятную тему?'},
  {kind:'communication',text:'Что делает беседу интересной для обоих?'},
  // conflict_resolution
  {kind:'conflict_resolution',text:'Как лучше начать разговор после серьёзной ссоры?'},
  {kind:'conflict_resolution',text:'Что помогает спокойно выслушать противоположную точку зрения?'},
  {kind:'conflict_resolution',text:'Как отличить компромисс от уступки под давлением?'},
  {kind:'conflict_resolution',text:'Что делать, если обе стороны считают себя правыми?'},
  {kind:'conflict_resolution',text:'Как извиниться так, чтобы слова не звучали пусто?'},
  {kind:'conflict_resolution',text:'Когда лучше взять паузу в споре?'},
  {kind:'conflict_resolution',text:'Как не переносить старые обиды в новый разговор?'},
  {kind:'conflict_resolution',text:'Что помогает восстановить доверие после недоразумения?'},
  {kind:'conflict_resolution',text:'Как обозначить границу без грубости?'},
  {kind:'conflict_resolution',text:'Как понять, что спор уже пора завершить?'},
];

const EXTRA_REPLY_BANK = {
  hobbies: [
    'Мне нравятся занятия, в которых можно замечать собственный прогресс. Даже небольшой шаг делает свободное время приятнее.',
    'Увлечения помогают переключиться. Я стараюсь выбирать то, что действительно интересно мне, а не то, что модно.',
    'Иногда лучшее хобби начинается случайно: попробуешь что-то из любопытства — и неожиданно втягиваешься.',
  ],
  art: [
    'В искусстве мне важнее настроение и идея, чем безупречная техника. Работа может быть простой, но всё равно запоминаться.',
    'Я люблю замечать, как разные люди видят один и тот же предмет. Это хороший способ взглянуть на привычные вещи иначе.',
    'Творчество требует практики, но не стоит ждать идеального результата с первой попытки.',
  ],
  crafts: [
    'Работа руками учит терпению. Мне нравится, когда в итоге получается вещь, которой можно пользоваться.',
    'Лучше начинать с небольшого проекта и не спешить. Аккуратность часто важнее скорости.',
    'Я ценю вещи, в которых виден труд мастера. Даже небольшая деталь может многое рассказать о человеке.',
  ],
  pets: [
    'Питомцу нужны не только корм и место для сна, но и спокойное внимание. Важно учитывать его характер.',
    'Животные по-разному показывают доверие. Лучше наблюдать и не заставлять их общаться, если они не готовы.',
    'Мне нравится, когда люди ответственно относятся к животным. Забота должна быть постоянной, а не только в первый день.',
  ],
  gardening: [
    'Сад учит не торопиться: растениям нужны время, подходящий уход и немного терпения.',
    'Я люблю наблюдать, как меняется клумба в течение сезона. Даже маленький росток может поднять настроение.',
    'Главное — подобрать растения под условия места и не забывать о регулярном уходе.',
  ],
  medicine: [
    'В медицине важно сочетать знания, внимательность и уважительное отношение к человеку.',
    'Мне кажется, хороший специалист не стесняется перепроверить сведения. Осторожность здесь полезнее самоуверенности.',
    'Иногда простое спокойное объяснение помогает человеку чувствовать себя увереннее.',
  ],
  cooking: [
    'Я люблю рецепты, которые можно адаптировать под продукты и настроение. Готовка не обязательно должна быть сложной.',
    'Лучше заранее подготовить ингредиенты и не забывать пробовать блюдо по ходу дела.',
    'Совместная готовка хороша тем, что каждый может внести свою идею и научиться чему-то новому.',
  ],
  style: [
    'Мне нравится, когда одежда отражает характер, но не мешает заниматься повседневными делами.',
    'Удобство для меня важно не меньше внешнего вида. Хорошая вещь должна подходить именно тому, кто её носит.',
    'Иногда небольшая деталь меняет весь образ. Главное — не пытаться подражать кому-то против своей воли.',
  ],
  shopping: [
    'Я стараюсь сравнивать качество и цену, а не выбирать только по красивой упаковке.',
    'Список покупок помогает не отвлекаться на каждую витрину. Но иногда можно оставить место для маленькой находки.',
    'Перед покупкой полезно подумать, действительно ли вещь пригодится и где её хранить.',
  ],
  games: [
    'Мне нравятся игры, в которых можно проявить смекалку и при этом посмеяться вместе.',
    'Хорошая игра должна быть понятной новичку и интересной тем, кто уже знает правила.',
    'Я не считаю поражение проблемой. Главное — честно играть и получать удовольствие от процесса.',
  ],
  sports: [
    'Регулярность важнее чрезмерной нагрузки. Лучше заниматься постепенно и давать себе время на восстановление.',
    'Командный спорт учит замечать сильные стороны других и поддерживать их.',
    'Мне нравится, когда соревнование остаётся честным и уважительным к участникам.',
  ],
  leadership: [
    'Руководитель должен не только принимать решения, но и объяснять их. Команда имеет право задавать вопросы.',
    'Я уважаю тех, кто умеет признавать ошибку и не перекладывает ответственность на других.',
    'Сильная команда не строится на страхе. Люди должны понимать общую цель и свою роль.',
  ],
  mentoring: [
    'Наставнику важно замечать темп ученика и давать задания по силам, постепенно усложняя их.',
    'Лучше показать несколько способов решения и позволить ученику подумать самому.',
    'Хорошее обучение помогает человеку стать самостоятельнее, а не зависеть от постоянных подсказок.',
  ],
  inventions: [
    'Я бы сначала записала идею и проверила её на простом образце. Так легче понять, стоит ли продолжать.',
    'Полезное изобретение не обязано быть сложным. Иногда простое решение экономит больше всего времени.',
    'Ошибки при испытаниях — часть работы. Главное, чтобы проверка была аккуратной и безопасной.',
  ],
  architecture: [
    'Мне нравятся здания, которые удобно использовать и приятно видеть каждый день.',
    'Город становится уютнее, когда в нём есть тень, скамейки и понятные пешеходные маршруты.',
    'Старые постройки хранят историю, поэтому их стоит изучать и бережно поддерживать.',
  ],
  folklore: [
    'Легенды помогают понять, что люди прошлого считали важным. Но любую историю полезно сверять с фактами.',
    'Мне нравятся рассказы, в которых за приключением скрывается простой жизненный урок.',
    'Истории стоит передавать дальше, но хорошо помнить, где заканчиваются свидетельства и начинаются выдумки.',
  ],
  languages: [
    'Я стараюсь запоминать слова в контексте. Так они быстрее связываются с реальными ситуациями.',
    'Ошибки в изучении языка неизбежны. Лучше говорить понемногу каждый день, чем ждать идеального момента.',
    'Мне нравится сравнивать выражения разных народов. В языке часто скрыт интересный взгляд на мир.',
  ],
  writing: [
    'Письмо помогает упорядочить мысли. Иногда достаточно начать с пары честных предложений.',
    'Я стараюсь не редактировать каждую строчку сразу. Сначала важнее закончить мысль, а потом улучшать текст.',
    'Хорошая запись не обязана быть длинной. Главное — чтобы через время было понятно, что ты хотел сохранить.',
  ],
  photography: [
    'Мне нравятся снимки, которые сохраняют атмосферу момента, а не только красивую картинку.',
    'Хороший кадр часто зависит от света и терпения. Иногда стоит просто немного подождать.',
    'Я бы сохраняла и обычные моменты: через годы именно они могут оказаться самыми ценными.',
  ],
  theatre: [
    'Театр интересен тем, что множество людей создают одно общее впечатление — и на сцене, и за кулисами.',
    'Мне нравятся постановки, после которых хочется обсудить персонажей и их решения.',
    'Первое выступление всегда волнительно. Хорошая подготовка и поддержка команды многое меняют.',
  ],
  dance: [
    'Танец помогает выразить настроение без длинных объяснений. Главное — чувствовать ритм и не сравнивать себя с другими.',
    'Я бы начала с простых движений и постепенно добавляла новые элементы.',
    'На празднике танцы особенно хороши, когда никто не заставляет участвовать и каждый может выбрать свой темп.',
  ],
  volunteering: [
    'Добровольная помощь должна отвечать реальным потребностям людей, а не только выглядеть красиво со стороны.',
    'Лучше распределить задачи заранее и не забывать благодарить всех участников.',
    'Даже небольшая помощь имеет смысл, если она действительно облегчает чей-то день.',
  ],
  community: [
    'Соседям проще доверять друг другу, когда они регулярно встречаются и вместе решают небольшие вопросы.',
    'Хорошее сообщество оставляет место для разных мнений и не заставляет всех быть одинаковыми.',
    'Мне нравятся общественные места, где можно спокойно пообщаться, отдохнуть или попросить совета.',
  ],
  economy: [
    'Я стараюсь сначала откладывать на важные цели, а уже потом тратить остаток на необязательные вещи.',
    'Бюджет не должен быть наказанием. Это просто способ заранее понимать свои возможности.',
    'Перед крупной покупкой полезно сравнить варианты и оставить небольшой запас на непредвиденные расходы.',
  ],
  worklife: [
    'Работа идёт лучше, когда задачи понятны, а перерывы запланированы заранее.',
    'Я стараюсь не путать занятость с результатом. Иногда короткий план экономит много времени.',
    'Если нагрузка становится слишком большой, честный разговор помогает найти разумное распределение дел.',
  ],
  tools: [
    'Инструменты служат дольше, если держать их чистыми и хранить на своих местах.',
    'Перед починкой стоит проверить условия работы и убедиться, что место безопасно.',
    'Я предпочитаю подходящий инструмент универсальному, который выполняет задачу кое-как.',
  ],
  puzzles: [
    'В головоломках полезно сначала внимательно прочитать условие и не придумывать лишних ограничений.',
    'Если решение не приходит, небольшой перерыв иногда помогает заметить очевидную деталь.',
    'Мне нравится обсуждать несколько способов решения — так можно научиться смотреть на задачу шире.',
  ],
  weather: [
    'Погода меняет настроение улиц. После дождя даже знакомые дорожки выглядят по-новому.',
    'Я предпочитаю одеваться по условиям и не пытаться спорить с холодом или жарой.',
    'У каждого сезона есть свои приятные стороны. Важно находить подходящие занятия для каждого дня.',
  ],
  communication: [
    'Хороший разговор строится на взаимности: важно не только говорить, но и давать другому закончить мысль.',
    'Я стараюсь уточнять, правильно ли поняла собеседника, прежде чем спорить с его словами.',
    'Иногда прямой вопрос звучит мягче, чем догадки и намёки.',
  ],
  conflict_resolution: [
    'В споре полезно обсуждать конкретный поступок, а не оценивать человека целиком.',
    'Пауза помогает остыть, но потом важно вернуться к разговору, если обе стороны готовы.',
    'Доверие восстанавливается постепенно: нужны честность, последовательность и уважение к границам.',
  ],
};

const EXTRA_RECIPROCAL_QUESTIONS = {
  hobbies: ['А чем ты любишь заниматься в свободное время?', 'Есть увлечение, которое ты давно хочешь попробовать?'],
  art: ['А какой вид искусства ближе тебе?', 'Ты сам когда-нибудь пробовал рисовать?'],
  crafts: ['А какую вещь тебе хотелось бы сделать своими руками?', 'Тебе нравится мастерить или чинить предметы?'],
  pets: ['А какое животное тебе нравится больше всего?', 'Ты когда-нибудь заботился о питомце?'],
  gardening: ['А какое растение ты хотел бы вырастить?', 'Тебе нравится проводить время в саду?'],
  medicine: ['А что ты считаешь важным в заботе о здоровье?', 'Тебе было бы интересно узнать основы первой помощи?'],
  cooking: ['А какое блюдо ты умеешь готовить?', 'Ты любишь пробовать новые рецепты?'],
  style: ['А в какой одежде тебе удобнее всего?', 'Ты любишь подбирать детали своего образа?'],
  shopping: ['А ты заранее планируешь покупки?', 'Что обычно ищешь на рынке?'],
  games: ['А в какие игры ты любишь играть?', 'Ты предпочитаешь играть ради процесса или результата?'],
  sports: ['А какой вид активности нравится тебе?', 'Ты чаще тренируешься один или с друзьями?'],
  leadership: ['А каким ты видишь хорошего руководителя?', 'Тебе нравится брать ответственность за группу?'],
  mentoring: ['А чему ты мог бы научить новичка?', 'Кто был твоим наставником?'],
  inventions: ['А какое изобретение пригодилось бы тебе каждый день?', 'Ты любишь придумывать новые решения?'],
  architecture: ['А какое здание Конохи тебе нравится?', 'Что бы ты изменил в городской планировке?'],
  folklore: ['А какую легенду ты помнишь?', 'Тебе нравятся истории из прошлого?'],
  languages: ['А какой язык ты хотел бы выучить?', 'Тебе легко запоминать новые слова?'],
  writing: ['А ты любишь вести записи или дневник?', 'О чём тебе хотелось бы написать?'],
  photography: ['А какие моменты ты хотел бы сохранить на снимках?', 'Ты больше любишь портреты или пейзажи?'],
  theatre: ['А какую постановку ты хотел бы увидеть?', 'Тебе интереснее сцена или работа за кулисами?'],
  dance: ['А тебе нравится танцевать?', 'Какую музыку ты выбрал бы для праздника?'],
  volunteering: ['А какому доброму делу ты хотел бы помочь?', 'Ты участвовал в общественных проектах?'],
  community: ['А что могло бы сделать наш район дружнее?', 'Ты знаешь соседей по имени?'],
  economy: ['А как ты планируешь свои расходы?', 'На какую цель ты сейчас копишь?'],
  worklife: ['А как ты распределяешь работу и отдых?', 'Что помогает тебе сосредоточиться?'],
  tools: ['А каким инструментом ты пользуешься чаще всего?', 'Ты любишь что-нибудь чинить?'],
  puzzles: ['А ты любишь решать головоломки?', 'Какая загадка тебе запомнилась?'],
  weather: ['А какая погода тебе нравится больше всего?', 'Что ты обычно делаешь в дождливый день?'],
  communication: ['А тебе проще говорить прямо или осторожно подбирать слова?', 'Что делает беседу комфортной для тебя?'],
  conflict_resolution: ['А как ты обычно миришься после спора?', 'Что помогает тебе спокойно выслушать чужую точку зрения?'],
};

return { EXTRA_DIALOGUE, EXTRA_REPLY_BANK, EXTRA_RECIPROCAL_QUESTIONS };
},
"src/data/dialogue-expansion.js": function(__require) {
const { EXTRA_DIALOGUE,EXTRA_REPLY_BANK,EXTRA_RECIPROCAL_QUESTIONS } = __require("src/data/dialogue-expansion-extra.js");
// 500 first-wave Russian utterances for richer, two-way NPC conversations.
// The next 300 prompts and 30 extra reply banks are merged below.

const EXPANDED_DIALOGUE = [
  // about: 25 new phrases
  {kind:'about',text:`Какой свой характер ты считаешь самой сильной стороной?` },
  {kind:'about',text:`Какая черта характера тебе самой в себе нравится?` },
  {kind:'about',text:`Что в людях ты замечаешь в первую очередь?` },
  {kind:'about',text:`Ты больше доверяешь интуиции или логике?` },
  {kind:'about',text:`Тебе проще говорить прямо или сначала всё обдумать?` },
  {kind:'about',text:`Что быстрее всего поднимает тебе настроение?` },
  {kind:'about',text:`Из-за чего ты обычно начинаешь волноваться?` },
  {kind:'about',text:`Ты считаешь себя терпеливой?` },
  {kind:'about',text:`Тебе нравится быть в центре внимания?` },
  {kind:'about',text:`В каких ситуациях ты становишься особенно упрямой?` },
  {kind:'about',text:`Что помогает тебе сохранять спокойствие?` },
  {kind:'about',text:`Ты быстро привыкаешь к новым людям?` },
  {kind:'about',text:`Какую свою привычку ты хотела бы изменить?` },
  {kind:'about',text:`Ты скорее ранняя пташка или любишь поспать?` },
  {kind:'about',text:`Тебе легче работать одной или в команде?` },
  {kind:'about',text:`Что тебя может по-настоящему рассмешить?` },
  {kind:'about',text:`Ты часто меняешь своё мнение?` },
  {kind:'about',text:`Как ты реагируешь на неожиданности?` },
  {kind:'about',text:`Ты любишь планировать всё заранее?` },
  {kind:'about',text:`Что для тебя значит быть сильной?` },
  {kind:'about',text:`Ты считаешь себя хорошим слушателем?` },
  {kind:'about',text:`Какая мелочь может испортить тебе день?` },
  {kind:'about',text:`Что тебе помогает собраться с мыслями?` },
  {kind:'about',text:`Ты больше любишь тишину или оживлённые места?` },
  {kind:'about',text:`За что ты уважаешь саму себя?` },
  // dreams: 25 new phrases
  {kind:'dreams',text:`О чём ты мечтаешь в последнее время?` },
  {kind:'dreams',text:`Какой цели тебе хочется достичь в ближайший год?` },
  {kind:'dreams',text:`Есть ли у тебя большая мечта?` },
  {kind:'dreams',text:`Чему ты хотела бы посвятить свободное время?` },
  {kind:'dreams',text:`Какой ты представляешь свою жизнь через несколько лет?` },
  {kind:'dreams',text:`Что бы ты сделала, если бы у тебя был целый свободный месяц?` },
  {kind:'dreams',text:`Есть ли место, которое ты давно хочешь увидеть?` },
  {kind:'dreams',text:`Какой навык ты мечтаешь освоить?` },
  {kind:'dreams',text:`Что для тебя было бы настоящим достижением?` },
  {kind:'dreams',text:`Ты когда-нибудь думала сменить профессию?` },
  {kind:'dreams',text:`Какую цель ты пока держишь при себе?` },
  {kind:'dreams',text:`Что бы ты хотела изменить в своей повседневной жизни?` },
  {kind:'dreams',text:`Есть ли у тебя план на далёкое будущее?` },
  {kind:'dreams',text:`Каким своим успехом ты хотела бы однажды гордиться?` },
  {kind:'dreams',text:`Что тебя вдохновляет двигаться вперёд?` },
  {kind:'dreams',text:`Какой проект ты хотела бы начать?` },
  {kind:'dreams',text:`Что бы ты попробовала, если бы не боялась ошибиться?` },
  {kind:'dreams',text:`Ты предпочитаешь большую мечту или несколько маленьких целей?` },
  {kind:'dreams',text:`Есть ли у тебя несбывшееся желание из детства?` },
  {kind:'dreams',text:`Чего тебе сейчас больше всего не хватает для мечты?` },
  {kind:'dreams',text:`Как ты понимаешь, что движешься в правильном направлении?` },
  {kind:'dreams',text:`Кем ты хотела стать, когда была младше?` },
  {kind:'dreams',text:`Какое приключение ты хотела бы пережить?` },
  {kind:'dreams',text:`Что ты хотела бы оставить после себя?` },
  {kind:'dreams',text:`Какой следующий шаг приблизит тебя к твоей цели?` },
  // team: 25 new phrases
  {kind:'team',text:`Что для тебя важнее всего в надёжном напарнике?` },
  {kind:'team',text:`Как понять, что команда действительно сработалась?` },
  {kind:'team',text:`Ты легко доверяешь людям в команде?` },
  {kind:'team',text:`Что делать, если товарищи не могут договориться?` },
  {kind:'team',text:`Какую роль ты обычно берёшь на себя в группе?` },
  {kind:'team',text:`Тебе нравится руководить или выполнять общий план?` },
  {kind:'team',text:`Что важнее для команды: скорость или согласованность?` },
  {kind:'team',text:`Как ты поддерживаешь напарника после ошибки?` },
  {kind:'team',text:`Можно ли сохранить дружбу после серьёзного спора?` },
  {kind:'team',text:`Как распределять обязанности честно?` },
  {kind:'team',text:`Что ты ценишь в командной работе?` },
  {kind:'team',text:`Как поступить, если один участник не выполняет свою часть?` },
  {kind:'team',text:`Ты предпочитаешь маленькую команду или большую группу?` },
  {kind:'team',text:`Как бы ты помогла новичку освоиться?` },
  {kind:'team',text:`Что разрушает доверие между напарниками?` },
  {kind:'team',text:`Нужно ли всегда соглашаться с лидером команды?` },
  {kind:'team',text:`Как ты относишься к совместным тренировкам?` },
  {kind:'team',text:`Что помогает команде не терять настрой?` },
  {kind:'team',text:`Как лучше обсуждать чужую ошибку?` },
  {kind:'team',text:`Ты можешь попросить о помощи, когда трудно?` },
  {kind:'team',text:`Как понять, что товарищу нужна поддержка?` },
  {kind:'team',text:`Что важнее в напарнике: опыт или ответственность?` },
  {kind:'team',text:`Как ты принимаешь решения при разногласиях?` },
  {kind:'team',text:`Тебе нравится работать с людьми разного характера?` },
  {kind:'team',text:`Какой командный успех ты вспоминаешь с гордостью?` },
  // missions: 25 new phrases
  {kind:'missions',text:`Какое задание научило тебя большему всего?` },
  {kind:'missions',text:`Ты предпочитаешь разведку или сопровождение?` },
  {kind:'missions',text:`Как подготовиться к незнакомому заданию?` },
  {kind:'missions',text:`Что ты проверяешь перед выходом из деревни?` },
  {kind:'missions',text:`Как действовать, если план миссии изменился?` },
  {kind:'missions',text:`Ты любишь задания, где нужно проявить смекалку?` },
  {kind:'missions',text:`Что труднее: подготовка или само выполнение?` },
  {kind:'missions',text:`Как ты восстанавливаешься после напряжённой работы?` },
  {kind:'missions',text:`Какой урок ты вынесла из сложного задания?` },
  {kind:'missions',text:`Что делать, если информации перед миссией недостаточно?` },
  {kind:'missions',text:`Ты предпочитаешь действовать быстро или осторожно?` },
  {kind:'missions',text:`Как понять, что команде пора сделать перерыв?` },
  {kind:'missions',text:`Что для тебя важнее при выполнении поручения?` },
  {kind:'missions',text:`Как ты относишься к заданиям по сопровождению?` },
  {kind:'missions',text:`Какая часть подготовки обычно занимает больше времени?` },
  {kind:'missions',text:`Что помогает не растеряться в незнакомом месте?` },
  {kind:'missions',text:`Ты ведёшь записи после важных заданий?` },
  {kind:'missions',text:`Как лучше распределять снаряжение перед выходом?` },
  {kind:'missions',text:`Что делать, если напарник устал раньше времени?` },
  {kind:'missions',text:`Как оценить риск, не поддаваясь панике?` },
  {kind:'missions',text:`Ты любишь разбирать итоги после завершения работы?` },
  {kind:'missions',text:`Что важнее: выполнить приказ или сообщить о проблеме?` },
  {kind:'missions',text:`Как ты сохраняешь внимание во время долгого пути?` },
  {kind:'missions',text:`Какой навык чаще всего выручает на задании?` },
  {kind:'missions',text:`Что бы ты посоветовала новичку перед первой миссией?` },
  // village: 25 new phrases
  {kind:'village',text:`Какое место в Конохе тебе нравится больше всего?` },
  {kind:'village',text:`Где в деревне можно спокойно посидеть и подумать?` },
  {kind:'village',text:`Какой район Конохи ты показываешь гостям первым?` },
  {kind:'village',text:`Что в нашей деревне изменилось за последнее время?` },
  {kind:'village',text:`Какое место здесь ты считаешь недооценённым?` },
  {kind:'village',text:`Где лучше всего встречать рассвет?` },
  {kind:'village',text:`Какой маршрут по деревне ты любишь?` },
  {kind:'village',text:`Что бы ты улучшила в Конохе?` },
  {kind:'village',text:`Какое местное заведение ты посещаешь чаще всего?` },
  {kind:'village',text:`Где можно найти самые интересные объявления?` },
  {kind:'village',text:`Как жители помогают друг другу в трудные дни?` },
  {kind:'village',text:`Что тебе больше всего нравится в жизни деревни?` },
  {kind:'village',text:`Есть ли здесь тихий уголок, о котором мало кто знает?` },
  {kind:'village',text:`Какое здание в Конохе имеет интересную историю?` },
  {kind:'village',text:`Куда лучше отправиться на вечернюю прогулку?` },
  {kind:'village',text:`Какие традиции деревни нельзя забывать?` },
  {kind:'village',text:`Что бы ты показала человеку, который приехал впервые?` },
  {kind:'village',text:`Как изменяется Коноха в разные сезоны?` },
  {kind:'village',text:`Какое событие объединяет жителей сильнее всего?` },
  {kind:'village',text:`Ты любишь городские праздники?` },
  {kind:'village',text:`Что делает это место домом для тебя?` },
  {kind:'village',text:`Где можно узнать последние новости деревни?` },
  {kind:'village',text:`Какой обычай Конохи тебе особенно дорог?` },
  {kind:'village',text:`Что стоит беречь в нашей деревне?` },
  {kind:'village',text:`Какой уголок деревни напоминает тебе о хорошем дне?` },
  // clan: 25 new phrases
  {kind:'clan',text:`Что для тебя значит принадлежать к своему клану?` },
  {kind:'clan',text:`Какая семейная традиция тебе особенно дорога?` },
  {kind:'clan',text:`Чему тебя научили старшие?` },
  {kind:'clan',text:`Ты часто проводишь время с родственниками?` },
  {kind:'clan',text:`Как ты относишься к семейным ожиданиям?` },
  {kind:'clan',text:`Что важнее: традиции или собственный выбор?` },
  {kind:'clan',text:`Есть ли семейная история, которую ты любишь вспоминать?` },
  {kind:'clan',text:`Как в твоей семье поддерживают друг друга?` },
  {kind:'clan',text:`Чему ты хотела бы научить младших?` },
  {kind:'clan',text:`Какая черта твоего клана тебе нравится?` },
  {kind:'clan',text:`Ты гордишься историей своей семьи?` },
  {kind:'clan',text:`Как не потерять себя под давлением ожиданий?` },
  {kind:'clan',text:`Есть ли обычай, который ты хотела бы сохранить?` },
  {kind:'clan',text:`Что помогает наладить отношения с родственниками?` },
  {kind:'clan',text:`Ты больше похожа на кого-то из семьи?` },
  {kind:'clan',text:`Какую семейную вещь ты хранишь?` },
  {kind:'clan',text:`Что ты хотела бы узнать о прошлом своего клана?` },
  {kind:'clan',text:`Можно ли изменить старую традицию к лучшему?` },
  {kind:'clan',text:`Как ты понимаешь семейную ответственность?` },
  {kind:'clan',text:`Кто научил тебя самому важному?` },
  {kind:'clan',text:`Что в твоём воспитании оказалось полезнее всего?` },
  {kind:'clan',text:`Как ты относишься к семейным встречам?` },
  {kind:'clan',text:`Какие истории передаются в твоей семье?` },
  {kind:'clan',text:`Что делает семью дружной?` },
  {kind:'clan',text:`Какой совет старших ты часто вспоминаешь?` },
  // values: 25 new phrases
  {kind:'values',text:`Что для тебя означает честность?` },
  {kind:'values',text:`Можно ли исправить однажды подорванное доверие?` },
  {kind:'values',text:`Как ты понимаешь справедливость?` },
  {kind:'values',text:`Что важнее: быть правой или сохранить уважение?` },
  {kind:'values',text:`Как ты относишься к обещаниям, которые трудно выполнить?` },
  {kind:'values',text:`Стоит ли всегда говорить правду прямо?` },
  {kind:'values',text:`Что ты никогда не стала бы делать ради успеха?` },
  {kind:'values',text:`Как отличить смелость от безрассудства?` },
  {kind:'values',text:`Что для тебя значит уважать чужие границы?` },
  {kind:'values',text:`Как ты относишься к людям, которые признают ошибки?` },
  {kind:'values',text:`Можно ли простить, но не забыть?` },
  {kind:'values',text:`Что важнее в поступке: намерение или результат?` },
  {kind:'values',text:`Как ты решаешь, кому можно доверять?` },
  {kind:'values',text:`Что для тебя является настоящей добротой?` },
  {kind:'values',text:`Нужно ли давать второй шанс?` },
  {kind:'values',text:`Как ты относишься к чужому мнению, если не согласна?` },
  {kind:'values',text:`Что делает человека достойным уважения?` },
  {kind:'values',text:`Как поступить, если правила кажутся несправедливыми?` },
  {kind:'values',text:`Что лучше: признать незнание или сделать вид, что всё понятно?` },
  {kind:'values',text:`Как ты понимаешь ответственность?` },
  {kind:'values',text:`Можно ли быть сильной и при этом просить помощи?` },
  {kind:'values',text:`Что для тебя недопустимо в дружбе?` },
  {kind:'values',text:`Как ты относишься к честному соревнованию?` },
  {kind:'values',text:`Что важнее: победа или достойное поведение?` },
  {kind:'values',text:`Какой принцип помогает тебе принимать решения?` },
  // favorites: 25 new phrases
  {kind:'favorites',text:`Какой цвет тебе особенно нравится?` },
  {kind:'favorites',text:`Какое время года ты ждёшь с нетерпением?` },
  {kind:'favorites',text:`Какой цветок тебе кажется самым красивым?` },
  {kind:'favorites',text:`Ты предпочитаешь горы или море?` },
  {kind:'favorites',text:`Какой запах напоминает тебе о доме?` },
  {kind:'favorites',text:`Какой праздник ты любишь больше всего?` },
  {kind:'favorites',text:`Тебе больше нравятся рассветы или закаты?` },
  {kind:'favorites',text:`Какая погода подходит тебе по настроению?` },
  {kind:'favorites',text:`Какой подарок ты считаешь самым душевным?` },
  {kind:'favorites',text:`Ты предпочитаешь чай или какао?` },
  {kind:'favorites',text:`Какой пейзаж тебе никогда не надоедает?` },
  {kind:'favorites',text:`Какое животное тебе особенно симпатично?` },
  {kind:'favorites',text:`Тебе нравятся тихие вечера?` },
  {kind:'favorites',text:`Какой звук помогает тебе расслабиться?` },
  {kind:'favorites',text:`Какой день недели ты любишь?` },
  {kind:'favorites',text:`Ты предпочитаешь прогулки утром или вечером?` },
  {kind:'favorites',text:`Какая мелочь всегда поднимает тебе настроение?` },
  {kind:'favorites',text:`Какой аромат ассоциируется у тебя с весной?` },
  {kind:'favorites',text:`Какую вещь ты всегда берёшь с собой?` },
  {kind:'favorites',text:`Что тебе приятнее: подарок или доброе письмо?` },
  {kind:'favorites',text:`Какой вид искусства тебе интересен?` },
  {kind:'favorites',text:`Ты любишь смотреть на звёзды?` },
  {kind:'favorites',text:`Какое место кажется тебе уютным?` },
  {kind:'favorites',text:`Что ты выбираешь для отдыха в выходной?` },
  {kind:'favorites',text:`Какая традиция делает праздник особенным?` },
  // routine: 25 new phrases
  {kind:'routine',text:`Как обычно начинается твое утро?` },
  {kind:'routine',text:`Что ты делаешь сразу после пробуждения?` },
  {kind:'routine',text:`В какое время дня ты наиболее продуктивна?` },
  {kind:'routine',text:`Как ты планируешь обычную неделю?` },
  {kind:'routine',text:`Что помогает тебе переключиться после работы?` },
  {kind:'routine',text:`Ты любишь заранее готовить вещи на завтра?` },
  {kind:'routine',text:`Как часто ты устраиваешь себе выходной?` },
  {kind:'routine',text:`Что обычно делаешь перед сном?` },
  {kind:'routine',text:`Ты предпочитаешь плотный распорядок или гибкий график?` },
  {kind:'routine',text:`Как ты распределяешь время между делами и отдыхом?` },
  {kind:'routine',text:`Что помогает тебе не забывать важные задачи?` },
  {kind:'routine',text:`Ты ведёшь дневник или заметки?` },
  {kind:'routine',text:`Какой маленький ритуал делает день лучше?` },
  {kind:'routine',text:`Ты любишь начинать день с прогулки?` },
  {kind:'routine',text:`Что ты делаешь, когда появляется свободный час?` },
  {kind:'routine',text:`Как ты отдыхаешь после насыщенного дня?` },
  {kind:'routine',text:`Есть ли у тебя привычка, которой ты гордишься?` },
  {kind:'routine',text:`Что обычно откладываешь на потом?` },
  {kind:'routine',text:`Как ты готовишься к важному разговору?` },
  {kind:'routine',text:`Тебе нравится порядок на рабочем месте?` },
  {kind:'routine',text:`Как часто ты меняешь планы в течение дня?` },
  {kind:'routine',text:`Что помогает тебе проснуться бодрой?` },
  {kind:'routine',text:`Ты любишь проводить выходные дома?` },
  {kind:'routine',text:`Как ты отмечаешь завершение трудной недели?` },
  {kind:'routine',text:`Какой распорядок помог бы тебе чувствовать себя спокойнее?` },
  // feelings: 25 new phrases
  {kind:'feelings',text:`Что обычно помогает тебе справиться с тревогой?` },
  {kind:'feelings',text:`Как ты понимаешь, что устала и пора отдохнуть?` },
  {kind:'feelings',text:`Тебе легко говорить о своих переживаниях?` },
  {kind:'feelings',text:`Что ты делаешь, когда злишься?` },
  {kind:'feelings',text:`Как ты поддерживаешь себя после неудачи?` },
  {kind:'feelings',text:`Что помогает тебе почувствовать уверенность?` },
  {kind:'feelings',text:`Ты предпочитаешь обсуждать проблему сразу или позже?` },
  {kind:'feelings',text:`Как понять, что тебе нужно немного побыть одной?` },
  {kind:'feelings',text:`Что делает тебя по-настоящему счастливой?` },
  {kind:'feelings',text:`Как ты справляешься с разочарованием?` },
  {kind:'feelings',text:`Тебе проще попросить поддержки или предложить её?` },
  {kind:'feelings',text:`Что помогает тебе успокоиться после спора?` },
  {kind:'feelings',text:`Ты часто переживаешь из-за чужого мнения?` },
  {kind:'feelings',text:`Как ты возвращаешь себе хорошее настроение?` },
  {kind:'feelings',text:`Что ты делаешь, когда чувствуешь усталость?` },
  {kind:'feelings',text:`Какую эмоцию тебе труднее всего показывать?` },
  {kind:'feelings',text:`Тебе нравится делиться хорошими новостями?` },
  {kind:'feelings',text:`Что может заставить тебя гордиться собой?` },
  {kind:'feelings',text:`Как ты реагируешь на неожиданную похвалу?` },
  {kind:'feelings',text:`Что помогает тебе не опускать руки?` },
  {kind:'feelings',text:`Ты умеешь вовремя делать паузу?` },
  {kind:'feelings',text:`Как ты относишься к своим ошибкам?` },
  {kind:'feelings',text:`Что помогает тебе почувствовать себя в безопасности?` },
  {kind:'feelings',text:`Тебе нравится, когда тебя внимательно слушают?` },
  {kind:'feelings',text:`Как понять, что сейчас лучше просто помолчать?` },
  // friendship: 25 new phrases
  {kind:'friendship',text:`Как ты понимаешь, что человек стал твоим другом?` },
  {kind:'friendship',text:`Что помогает сохранить дружбу на расстоянии?` },
  {kind:'friendship',text:`Ты любишь знакомиться с новыми людьми?` },
  {kind:'friendship',text:`Как часто нужно видеться, чтобы дружба оставалась крепкой?` },
  {kind:'friendship',text:`Что для тебя важнее в друге: надёжность или чувство юмора?` },
  {kind:'friendship',text:`Как ты обычно миришься после недоразумения?` },
  {kind:'friendship',text:`Можно ли дружить с человеком, который совсем на тебя не похож?` },
  {kind:'friendship',text:`Что делает разговор по-настоящему приятным?` },
  {kind:'friendship',text:`Как ты показываешь друзьям, что ценишь их?` },
  {kind:'friendship',text:`Тебе нравится получать неожиданные сообщения?` },
  {kind:'friendship',text:`Как поддержать друга, который не хочет говорить?` },
  {kind:'friendship',text:`Что ты считаешь хорошим знакомством?` },
  {kind:'friendship',text:`Как понять, что собеседник хочет закончить разговор?` },
  {kind:'friendship',text:`Ты предпочитаешь долгие беседы или короткие встречи?` },
  {kind:'friendship',text:`Что помогает тебе открыться новому знакомому?` },
  {kind:'friendship',text:`Как ты относишься к личному пространству друзей?` },
  {kind:'friendship',text:`Что лучше сделать после случайной обиды?` },
  {kind:'friendship',text:`Ты любишь совместные прогулки?` },
  {kind:'friendship',text:`Какой поступок укрепляет дружбу?` },
  {kind:'friendship',text:`Что ты ценишь в людях, с которыми работаешь?` },
  {kind:'friendship',text:`Как ты относишься к новым компаниям?` },
  {kind:'friendship',text:`Что помогает избегать недопонимания?` },
  {kind:'friendship',text:`Тебе проще общаться один на один или в группе?` },
  {kind:'friendship',text:`Каким должен быть хороший собеседник?` },
  {kind:'friendship',text:`Как ты понимаешь взаимную поддержку?` },
  // learning: 25 new phrases
  {kind:'learning',text:`Какой навык ты сейчас развиваешь?` },
  {kind:'learning',text:`Что тебе интереснее всего изучать?` },
  {kind:'learning',text:`Ты любишь учиться по книгам или на практике?` },
  {kind:'learning',text:`Как ты запоминаешь сложную информацию?` },
  {kind:'learning',text:`Какой предмет в академии тебе нравился?` },
  {kind:'learning',text:`Кто был твоим самым полезным наставником?` },
  {kind:'learning',text:`Что ты хотела бы объяснить новичку?` },
  {kind:'learning',text:`Как относишься к обучению через ошибки?` },
  {kind:'learning',text:`Какой язык ты хотела бы выучить?` },
  {kind:'learning',text:`Тебе нравится читать справочники?` },
  {kind:'learning',text:`Как ты выбираешь, чему учиться дальше?` },
  {kind:'learning',text:`Что помогает не бросать сложное занятие?` },
  {kind:'learning',text:`Ты предпочитаешь самостоятельное обучение?` },
  {kind:'learning',text:`Какой совет ты дала бы начинающему ученику?` },
  {kind:'learning',text:`Как ты проверяешь, что действительно поняла тему?` },
  {kind:'learning',text:`Что тебе хотелось бы изучить глубже?` },
  {kind:'learning',text:`Любишь ли ты обучать других?` },
  {kind:'learning',text:`Какой навык оказался полезнее, чем ты ожидала?` },
  {kind:'learning',text:`Что помогает тебе сосредоточиться на чтении?` },
  {kind:'learning',text:`Ты часто задаёшь вопросы преподавателям?` },
  {kind:'learning',text:`Как ты относишься к повторению пройденного?` },
  {kind:'learning',text:`Что легче освоить: теорию или практику?` },
  {kind:'learning',text:`Какой учебный проект тебе запомнился?` },
  {kind:'learning',text:`Что ты делаешь, если материал кажется слишком сложным?` },
  {kind:'learning',text:`Как отмечаешь свой прогресс в обучении?` },
  // strategy: 25 new phrases
  {kind:'strategy',text:`Как ты обычно выбираешь между двумя сложными вариантами?` },
  {kind:'strategy',text:`Что нужно проверить перед принятием решения?` },
  {kind:'strategy',text:`Ты любишь составлять запасной план?` },
  {kind:'strategy',text:`Как не упустить важную мелочь?` },
  {kind:'strategy',text:`Что делать, если данных для решения мало?` },
  {kind:'strategy',text:`Как ты распределяешь приоритеты?` },
  {kind:'strategy',text:`Лучше действовать сразу или подождать дополнительной информации?` },
  {kind:'strategy',text:`Как ты оцениваешь последствия решения?` },
  {kind:'strategy',text:`Что помогает сохранить ясную голову?` },
  {kind:'strategy',text:`Как поступить, если план перестал работать?` },
  {kind:'strategy',text:`Ты предпочитаешь обсуждать стратегию всей командой?` },
  {kind:'strategy',text:`Как распознать собственную ошибку в рассуждении?` },
  {kind:'strategy',text:`Что важнее при планировании: цель или ресурсы?` },
  {kind:'strategy',text:`Как ты относишься к неожиданным изменениям?` },
  {kind:'strategy',text:`Что делать, когда мнения в группе разделились?` },
  {kind:'strategy',text:`Как понять, что пора изменить подход?` },
  {kind:'strategy',text:`Ты записываешь варианты перед выбором?` },
  {kind:'strategy',text:`Как не торопиться под давлением времени?` },
  {kind:'strategy',text:`Что помогает отличить факт от предположения?` },
  {kind:'strategy',text:`Какую роль играет опыт в принятии решений?` },
  {kind:'strategy',text:`Как оценить, достаточно ли подготовлена команда?` },
  {kind:'strategy',text:`Ты сначала ищешь простое решение?` },
  {kind:'strategy',text:`Что делать, если два решения одинаково хороши?` },
  {kind:'strategy',text:`Как ты объясняешь сложный план простыми словами?` },
  {kind:'strategy',text:`Когда лучше попросить совета у другого человека?` },
  // nature: 25 new phrases
  {kind:'nature',text:`Какое место на природе ты любишь посещать?` },
  {kind:'nature',text:`Тебе нравится слушать шум леса?` },
  {kind:'nature',text:`Какое дерево тебе кажется самым красивым?` },
  {kind:'nature',text:`Ты замечаешь перемены природы по сезонам?` },
  {kind:'nature',text:`Любишь гулять у реки?` },
  {kind:'nature',text:`Какой пейзаж помогает тебе отдохнуть?` },
  {kind:'nature',text:`Тебе нравится ухаживать за растениями?` },
  {kind:'nature',text:`Какое животное ты хотела бы увидеть в лесу?` },
  {kind:'nature',text:`Ты предпочитаешь солнечную поляну или тенистую тропу?` },
  {kind:'nature',text:`Какой звук природы тебе приятнее всего?` },
  {kind:'nature',text:`Любишь ли ты собирать полевые цветы?` },
  {kind:'nature',text:`Как ты относишься к дождливым прогулкам?` },
  {kind:'nature',text:`Есть ли у тебя любимая лесная тропинка?` },
  {kind:'nature',text:`Какое время суток красивее всего в горах?` },
  {kind:'nature',text:`Ты умеешь определять растения по листьям?` },
  {kind:'nature',text:`Какой сезон лучше подходит для похода?` },
  {kind:'nature',text:`Тебе нравятся ночные прогулки под звёздами?` },
  {kind:'nature',text:`Как ты заботишься об окружающей среде?` },
  {kind:'nature',text:`Что интересного можно найти у берега?` },
  {kind:'nature',text:`Любишь наблюдать за птицами?` },
  {kind:'nature',text:`Какое место в лесу кажется тебе самым спокойным?` },
  {kind:'nature',text:`Ты предпочитаешь отдых у воды или среди деревьев?` },
  {kind:'nature',text:`Какой природный запах напоминает тебе о детстве?` },
  {kind:'nature',text:`Что бы ты посадила в небольшом саду?` },
  {kind:'nature',text:`Какой природный уголок стоит сохранить для будущих поколений?` },
  // festivals: 25 new phrases
  {kind:'festivals',text:`Какой праздник в Конохе ты ждёшь больше всего?` },
  {kind:'festivals',text:`Ты любишь фестивальные фонарики?` },
  {kind:'festivals',text:`Что обычно покупаешь на праздничных ярмарках?` },
  {kind:'festivals',text:`Тебе нравится смотреть праздничные выступления?` },
  {kind:'festivals',text:`Какой наряд ты выбираешь для фестиваля?` },
  {kind:'festivals',text:`Любишь ли ты запускать бумажные фонарики?` },
  {kind:'festivals',text:`Какую игру на ярмарке ты бы попробовала?` },
  {kind:'festivals',text:`Что делает праздник запоминающимся?` },
  {kind:'festivals',text:`Ты предпочитаешь шумные гуляния или спокойные встречи?` },
  {kind:'festivals',text:`Какое угощение ассоциируется у тебя с праздником?` },
  {kind:'festivals',text:`Тебе нравится помогать с подготовкой фестиваля?` },
  {kind:'festivals',text:`Какой подарок уместно принести на праздник?` },
  {kind:'festivals',text:`Ты часто фотографируешь памятные события?` },
  {kind:'festivals',text:`Какой праздник ты помнишь с детства?` },
  {kind:'festivals',text:`Что бы ты добавила в программу деревенского фестиваля?` },
  {kind:'festivals',text:`Любишь наблюдать за огнями вечером?` },
  {kind:'festivals',text:`Какую музыку хотелось бы услышать на празднике?` },
  {kind:'festivals',text:`Ты предпочитаешь приходить пораньше или ближе к вечеру?` },
  {kind:'festivals',text:`С кем тебе нравится посещать ярмарки?` },
  {kind:'festivals',text:`Что стоит обязательно попробовать на фестивале?` },
  {kind:'festivals',text:`Какой сувенир ты бы сохранила на память?` },
  {kind:'festivals',text:`Ты любишь праздничную атмосферу?` },
  {kind:'festivals',text:`Что помогает людям чувствовать себя частью праздника?` },
  {kind:'festivals',text:`Какую традицию можно было бы придумать для Конохи?` },
  {kind:'festivals',text:`Какой момент фестиваля обычно самый весёлый?` },
  // books: 25 new phrases
  {kind:'books',text:`Какую книгу ты могла бы перечитывать?` },
  {kind:'books',text:`Ты предпочитаешь истории или полезные справочники?` },
  {kind:'books',text:`Где тебе нравится читать?` },
  {kind:'books',text:`Какой жанр тебе интереснее всего?` },
  {kind:'books',text:`Ты часто делаешь пометки на полях?` },
  {kind:'books',text:`Как выбираешь следующую книгу?` },
  {kind:'books',text:`Есть ли герой книги, на которого ты равняешься?` },
  {kind:'books',text:`Тебе нравятся старые свитки с историей кланов?` },
  {kind:'books',text:`Какую книгу ты посоветовала бы новичку?` },
  {kind:'books',text:`Ты любишь читать перед сном?` },
  {kind:'books',text:`Что важнее в книге: сюжет или персонажи?` },
  {kind:'books',text:`Как относишься к длинным историческим хроникам?` },
  {kind:'books',text:`Какую историю ты запомнила надолго?` },
  {kind:'books',text:`Ты предпочитаешь бумажные книги?` },
  {kind:'books',text:`Что читаешь, когда хочется отвлечься?` },
  {kind:'books',text:`Какую тему хотела бы изучить по книгам?` },
  {kind:'books',text:`Ты обсуждаешь прочитанное с друзьями?` },
  {kind:'books',text:`Любишь ли ты загадки и детективы?` },
  {kind:'books',text:`Какая книга помогла тебе чему-то научиться?` },
  {kind:'books',text:`Ты быстро читаешь или смакуешь каждую страницу?` },
  {kind:'books',text:`Где в Конохе лучше всего читать?` },
  {kind:'books',text:`Как относишься к книгам с иллюстрациями?` },
  {kind:'books',text:`Какой персонаж из истории кажется тебе интересным?` },
  {kind:'books',text:`Ты ведёшь список прочитанных книг?` },
  {kind:'books',text:`Какую книгу стоило бы добавить в библиотеку?` },
  // music: 25 new phrases
  {kind:'music',text:`Какую музыку ты слушаешь, когда отдыхаешь?` },
  {kind:'music',text:`Тебе нравится тихая инструментальная музыка?` },
  {kind:'music',text:`Есть ли мелодия, которую ты помнишь с детства?` },
  {kind:'music',text:`Ты любишь играть на музыкальных инструментах?` },
  {kind:'music',text:`Какой звук у тебя ассоциируется с Конохой?` },
  {kind:'music',text:`Предпочитаешь спокойные или ритмичные мелодии?` },
  {kind:'music',text:`Ты слушаешь музыку во время работы?` },
  {kind:'music',text:`Какую песню выбрала бы для праздника?` },
  {kind:'music',text:`Тебе нравится музыка под дождь?` },
  {kind:'music',text:`Какой инструмент звучит красивее всего?` },
  {kind:'music',text:`Ты когда-нибудь училась играть на флейте?` },
  {kind:'music',text:`Какая мелодия помогает тебе сосредоточиться?` },
  {kind:'music',text:`Любишь ли ты уличных музыкантов?` },
  {kind:'music',text:`Что думаешь о традиционных японских инструментах?` },
  {kind:'music',text:`Ты запоминаешь мелодии с первого раза?` },
  {kind:'music',text:`Какую музыку включила бы для долгой дороги?` },
  {kind:'music',text:`Тебе нравятся концерты под открытым небом?` },
  {kind:'music',text:`Какой ритм подходит для тренировки?` },
  {kind:'music',text:`Ты предпочитаешь слушать музыку одна?` },
  {kind:'music',text:`Какой музыкальный стиль тебе хотелось бы попробовать?` },
  {kind:'music',text:`Есть ли мелодия, которая поднимает настроение?` },
  {kind:'music',text:`Ты любишь музыкальные фестивали?` },
  {kind:'music',text:`Как музыка влияет на твой настрой?` },
  {kind:'music',text:`Какой инструмент хотела бы освоить?` },
  {kind:'music',text:`Что для тебя важнее в музыке: ритм или настроение?` },
  // food: 25 new phrases
  {kind:'food',text:`Какое блюдо ты готовишь лучше всего?` },
  {kind:'food',text:`Какой суп тебе нравится в холодный день?` },
  {kind:'food',text:`Ты любишь острые блюда?` },
  {kind:'food',text:`Какой десерт напоминает тебе о празднике?` },
  {kind:'food',text:`Что обычно берёшь с собой в дорогу?` },
  {kind:'food',text:`Тебе нравится пробовать незнакомую еду?` },
  {kind:'food',text:`Какой чай лучше подходит для вечера?` },
  {kind:'food',text:`Ты предпочитаешь домашнюю еду или кафе?` },
  {kind:'food',text:`Какое блюдо хотела бы научиться готовить?` },
  {kind:'food',text:`Любишь ли ты сладкое данго?` },
  {kind:'food',text:`Что чаще выбираешь на завтрак?` },
  {kind:'food',text:`Какой ингредиент всегда держишь дома?` },
  {kind:'food',text:`Ты любишь готовить для друзей?` },
  {kind:'food',text:`Как относишься к необычным сочетаниям вкусов?` },
  {kind:'food',text:`Какое блюдо стоит попробовать в Конохе?` },
  {kind:'food',text:`Тебе нравится запах свежего хлеба?` },
  {kind:'food',text:`Что лучше взять для пикника?` },
  {kind:'food',text:`Ты предпочитаешь рис или лапшу?` },
  {kind:'food',text:`Какой напиток освежает тебя летом?` },
  {kind:'food',text:`Есть ли семейный рецепт, который ты помнишь?` },
  {kind:'food',text:`Какую еду ты выбрала бы после тренировки?` },
  {kind:'food',text:`Ты любишь готовить вместе с кем-нибудь?` },
  {kind:'food',text:`Какой перекус удобно брать на задание?` },
  {kind:'food',text:`Какое блюдо у тебя ассоциируется с домом?` },
  {kind:'food',text:`Что бы ты заказала в маленькой чайной?` },
  // travel: 25 new phrases
  {kind:'travel',text:`Какое место за пределами Конохи ты хотела бы посетить?` },
  {kind:'travel',text:`Тебе нравится путешествовать без чёткого плана?` },
  {kind:'travel',text:`Что обязательно берёшь в долгую дорогу?` },
  {kind:'travel',text:`Какой пейзаж ты мечтаешь увидеть своими глазами?` },
  {kind:'travel',text:`Ты предпочитаешь пешие маршруты или поездки?` },
  {kind:'travel',text:`Как подготовиться к путешествию в незнакомую страну?` },
  {kind:'travel',text:`Что интереснее: большие города или маленькие поселения?` },
  {kind:'travel',text:`Ты любишь узнавать местные традиции?` },
  {kind:'travel',text:`Какое путешествие запомнилось тебе больше всего?` },
  {kind:'travel',text:`Что делать, если спутники устали в дороге?` },
  {kind:'travel',text:`Как выбрать безопасный маршрут?` },
  {kind:'travel',text:`Тебе нравится останавливаться в небольших гостиницах?` },
  {kind:'travel',text:`Какую вещь нельзя забывать в поездке?` },
  {kind:'travel',text:`Ты предпочитаешь путешествовать с друзьями?` },
  {kind:'travel',text:`Что интересного можно привезти из другой страны?` },
  {kind:'travel',text:`Как ты ориентируешься в незнакомом месте?` },
  {kind:'travel',text:`Какое время года лучше для путешествий?` },
  {kind:'travel',text:`Тебе нравится открывать новые места рядом с домом?` },
  {kind:'travel',text:`Какой город ты хотела бы увидеть?` },
  {kind:'travel',text:`Что важнее в поездке: впечатления или комфорт?` },
  {kind:'travel',text:`Ты любишь составлять маршрут заранее?` },
  {kind:'travel',text:`Какой сувенир лучше всего хранит воспоминания?` },
  {kind:'travel',text:`Что ты обычно записываешь в дорожный дневник?` },
  {kind:'travel',text:`Тебе нравятся долгие поездки на поезде?` },
  {kind:'travel',text:`Какое приключение ты хотела бы разделить с командой?` },
  // memories: 25 new phrases
  {kind:'memories',text:`Какое воспоминание всегда вызывает у тебя улыбку?` },
  {kind:'memories',text:`Какой день из детства ты помнишь особенно хорошо?` },
  {kind:'memories',text:`Кто первым научил тебя важному навыку?` },
  {kind:'memories',text:`Какое событие сильно изменило твой взгляд на мир?` },
  {kind:'memories',text:`Ты часто пересматриваешь старые фотографии?` },
  {kind:'memories',text:`Какой совет ты запомнила на всю жизнь?` },
  {kind:'memories',text:`Есть ли место, куда тебе приятно возвращаться?` },
  {kind:'memories',text:`Какой подарок из прошлого ты хранишь?` },
  {kind:'memories',text:`Какую историю тебе часто рассказывали в детстве?` },
  {kind:'memories',text:`Какое знакомство оказалось неожиданно важным?` },
  {kind:'memories',text:`Какой урок дался тебе труднее всего?` },
  {kind:'memories',text:`Что ты хотела бы сказать себе младшей?` },
  {kind:'memories',text:`Какой совместный день ты хотела бы повторить?` },
  {kind:'memories',text:`Что напоминает тебе о старых друзьях?` },
  {kind:'memories',text:`Какую ошибку ты теперь вспоминаешь спокойно?` },
  {kind:'memories',text:`Какой момент помог тебе стать увереннее?` },
  {kind:'memories',text:`Есть ли запах, который возвращает тебя в прошлое?` },
  {kind:'memories',text:`Какое достижение было твоим первым?` },
  {kind:'memories',text:`Что из прошлого ты хотела бы сохранить неизменным?` },
  {kind:'memories',text:`Какой случай научил тебя терпению?` },
  {kind:'memories',text:`Какое место связано с хорошими семейными воспоминаниями?` },
  {kind:'memories',text:`Кто поддержал тебя в трудный период?` },
  {kind:'memories',text:`Какое событие ты бы записала в дневник?` },
  {kind:'memories',text:`Что из прошлого ты поняла только со временем?` },
  {kind:'memories',text:`Какую историю ты любишь рассказывать новым знакомым?` },
];

const EXPANDED_REPLY_BANK = {
  about: [
    `Думаю, лучше всего меня описывают поступки, а не красивые слова. Я стараюсь замечать, как мои решения влияют на других.`,
    `В каждом человеке есть противоречия. Я тоже могу быть упрямой, но учусь вовремя останавливаться и слушать.`,
    `Мне нравится узнавать себя через новые ситуации. Иногда простой разговор показывает о характере больше, чем долгое знакомство.`,
  ],
  dreams: [
    `У меня есть несколько целей, но я не хочу превращать мечту в гонку. Лучше двигаться постепенно и не забывать, ради чего стараешься.`,
    `Мне важно, чтобы цель была моей собственной, а не просто ожиданием окружающих. Тогда и трудности переносить легче.`,
    `Я пока не всё решила. Но есть направление, к которому хочется идти, и это уже неплохое начало.`,
  ],
  team: [
    `Надёжность для меня проявляется в мелочах: человек предупреждает о проблемах, держит слово и не бросает товарищей без объяснения.`,
    `Команда сильнее, когда каждый может высказать сомнение. Согласие ради видимости пользы не приносит.`,
    `Мне нравится, когда обязанности распределены честно, а успех не присваивает себе один человек.`,
  ],
  missions: [
    `Перед заданием я стараюсь уточнить цель, маршрут и сигналы связи. Хорошая подготовка не гарантирует лёгкий путь, но помогает не растеряться.`,
    `После сложной работы полезно спокойно разобрать, что получилось, а что стоит улучшить. Без поиска виноватых.`,
    `Опыт научил меня не путать решительность с поспешностью. Иногда лучший шаг — остановиться и проверить сведения.`,
  ],
  village: [
    `В Конохе много мест, которые становятся особенными благодаря людям, а не зданиям. Мне нравится, когда деревня живёт своей обычной жизнью.`,
    `У каждого района свой ритм. Иногда достаточно свернуть с главной улицы, чтобы найти тихое место.`,
    `Я бы хотела, чтобы в деревне было больше небольших общественных мест, где жители могли бы встречаться и помогать друг другу.`,
  ],
  clan: [
    `Семейные традиции могут поддерживать, но у каждого остаётся право выбирать собственный путь. Для меня важно уважать и то и другое.`,
    `Старшие передают не только правила, но и опыт. Не со всем обязательно соглашаться, однако стоит сначала понять, почему так сложилось.`,
    `Родные могут быть очень разными. Главное — уметь разговаривать и не превращать разногласия в соревнование.`,
  ],
  values: [
    `Для меня честность — не только говорить правду, но и не скрывать важные последствия своих решений.`,
    `Я считаю, что уважение видно по тому, как человек ведёт себя, когда ему говорят «нет».`,
    `Ошибку можно исправить не одним извинением, а последовательными поступками и готовностью выслушать другого.`,
  ],
  favorites: [
    `У меня есть любимые вещи, но настроение тоже многое меняет. Иногда новое место или вкус неожиданно становится самым приятным.`,
    `Я люблю детали, которые возвращают ощущение спокойствия: знакомый аромат, тихий вечер или красивый вид.`,
    `Выбирать одного фаворита сложно. Мне нравится пробовать разное и находить маленькие поводы для радости.`,
  ],
  routine: [
    `Мне помогает простой распорядок: сначала самое важное, потом небольшие дела и обязательно время на отдых.`,
    `Я стараюсь не заполнять каждую минуту. Иногда свободный час без плана оказывается самым полезным.`,
    `Привычки работают только тогда, когда подходят самому человеку. Я постепенно подстраиваю свой день под реальные силы.`,
  ],
  feelings: [
    `Не всегда нужно немедленно решать проблему. Иногда полезно сначала назвать то, что чувствуешь, и дать себе немного времени.`,
    `Я стараюсь не ругать себя за усталость. Пауза — это не слабость, а способ вернуться к делам с ясной головой.`,
    `Мне проще говорить о чувствах, когда собеседник не перебивает и не пытается сразу оценивать каждый мой ответ.`,
  ],
  friendship: [
    `Мне кажется, дружба держится на взаимности. Не обязательно быть рядом постоянно, но важно помнить друг о друге и уважать границы.`,
    `Хороший разговор — это когда оба могут задавать вопросы и не боятся честно сказать, что думают.`,
    `Недоразумения случаются. Главное — не додумывать за другого, а спокойно спросить и выслушать ответ.`,
  ],
  learning: [
    `Мне нравится сочетать теорию и практику. Книга помогает понять основу, а упражнение показывает, что ещё нужно улучшить.`,
    `Я стараюсь разбивать сложную тему на небольшие части. Так легче заметить собственный прогресс и не потерять интерес.`,
    `Учиться у других полезно, но вопросы задавать не стыдно. Гораздо хуже делать вид, будто всё понятно.`,
  ],
  strategy: [
    `Я сначала отделяю факты от предположений, а потом сравниваю варианты. Если данных мало, лучше признать это и уточнить.`,
    `Запасной план нужен не для того, чтобы ждать неудачи, а чтобы команда не теряла время при изменении обстоятельств.`,
    `Сложное решение легче принять, если ясно сформулировать цель и ограничения. Тогда лишнее постепенно отпадает.`,
  ],
  nature: [
    `На природе я лучше замечаю мелочи: перемены света, ветер, следы животных. Это помогает отвлечься от суеты.`,
    `Мне нравится бережное отношение к местам, куда хочется возвращаться. Красивый уголок легко испортить беспечностью.`,
    `Каждое время года по-своему интересно. Я люблю наблюдать, как знакомые места постепенно меняются.`,
  ],
  festivals: [
    `Праздники особенно хороши, когда в них есть место и шумным развлечениям, и спокойным встречам с друзьями.`,
    `Мне нравится подготовка не меньше самого события. Когда каждый вносит маленький вклад, праздник становится общим.`,
    `Самые приятные воспоминания обычно связаны не с дорогими вещами, а с людьми и неожиданными смешными моментами.`,
  ],
  books: [
    `Я выбираю книги под настроение. Иногда хочется истории, а иногда — справочника, который помогает разобраться в конкретном вопросе.`,
    `Хорошая книга оставляет вопрос, о котором думаешь уже после последней страницы. Такие истории я особенно ценю.`,
    `Мне нравится обсуждать прочитанное, но без споров о том, кто понял сюжет «правильно». У каждого свой взгляд.`,
  ],
  music: [
    `Музыка хорошо меняет настроение. Для сосредоточенной работы я выбираю спокойные мелодии, а для праздника — что-нибудь живее.`,
    `Некоторые мелодии запоминаются не из-за сложности, а потому что связаны с важным моментом.`,
    `Я люблю, когда музыка не мешает разговору, а создаёт подходящую атмосферу.`,
  ],
  food: [
    `Я люблю простую еду, приготовленную внимательно. Вкус часто зависит не от редких ингредиентов, а от отношения к делу. Здесь всегда можно найти что-нибудь вкусное.`,
    `Я люблю пробовать новую еду хотя бы из любопытства. Но после длинного дня всё равно приятно вернуться к знакомому вкусу.`,
    `Готовить еду вместе интересно: можно разделить работу, обменяться советами и заодно спокойно поговорить.`,
  ],
  travel: [
    `В путешествии мне важно заранее знать основные ориентиры, но оставлять место для небольших открытий по пути.`,
    `Лучше всего запоминаются не только достопримечательности, но и люди, местные привычки и случайные разговоры.`,
    `Я предпочитаю продумать безопасность и необходимые вещи заранее, чтобы на месте можно было спокойно наслаждаться дорогой.`,
  ],
  memories: [
    `Некоторые воспоминания становятся дороже со временем. Я стараюсь помнить не только события, но и то, чему они меня научили.`,
    `Мне нравится возвращаться к хорошим историям, но не жить прошлым. Впереди тоже есть чему удивить.`,
    `Я не всегда сразу понимаю значение момента. Иногда только позже замечаю, насколько он был важен.`,
  ],
};

const clean = value => String(value || '').toLocaleLowerCase('ru-RU').replace(/ё/g,'е').replace(/[!?.,;:…]+$/g,'').trim().replace(/\s+/g,' ');
const ALL_EXPANDED_DIALOGUE = [...EXPANDED_DIALOGUE,...EXTRA_DIALOGUE];
const ALL_EXPANDED_REPLY_BANK = {...EXPANDED_REPLY_BANK,...EXTRA_REPLY_BANK};
const ALL_RECIPROCAL_QUESTIONS = EXTRA_RECIPROCAL_QUESTIONS;
const EXPANDED_DIALOGUE_LOOKUP = new Map(ALL_EXPANDED_DIALOGUE.map(item => [clean(item.text), item.kind]));

return { EXPANDED_DIALOGUE, EXPANDED_REPLY_BANK, ALL_EXPANDED_DIALOGUE, ALL_EXPANDED_REPLY_BANK, ALL_RECIPROCAL_QUESTIONS, EXPANDED_DIALOGUE_LOOKUP };
},
"src/data/conversation-actions.js": function(__require) {

// One hundred safe, non-sexual RP actions for the personal conversation screen.
const CONVERSATION_ACTION_GROUPS = [
  {label:'Приветствие и вежливость',actions:[
    {id:'wave',label:'Помахать рукой',playerText:'Я дружелюбно машу рукой.'},
    {id:'nod',label:'Кивнуть',playerText:'Я приветственно киваю.'},
    {id:'bow',label:'Вежливо поклониться',playerText:'Я вежливо кланяюсь.'},
    {id:'salute',label:'Отдать короткое приветствие',playerText:'Я отдаю короткое приветствие.'},
    {id:'smile',label:'Улыбнуться',playerText:'Я приветливо улыбаюсь.'},
    {id:'say-thanks',label:'Поблагодарить',playerText:'Я искренне благодарю тебя.'},
    {id:'apologize-brief',label:'Коротко извиниться',playerText:'Я коротко извиняюсь за неудобство.'},
    {id:'ask-howday',label:'Спросить о дне',playerText:'Я спрашиваю, как проходит твой день.'},
    {id:'offer-seat',label:'Предложить место',playerText:'Я предлагаю тебе присесть.'},
    {id:'give-way',label:'Уступить дорогу',playerText:'Я вежливо уступаю тебе дорогу.'},
  ]},
  {label:'Разговор и внимание',actions:[
    {id:'listen',label:'Внимательно выслушать',playerText:'Я внимательно выслушиваю тебя.'},
    {id:'follow-up',label:'Задать уточняющий вопрос',playerText:'Я задаю уточняющий вопрос.'},
    {id:'let-finish',label:'Дать договорить',playerText:'Я не перебиваю и даю тебе закончить мысль.'},
    {id:'quiet-company',label:'Предложить тихую компанию',playerText:'Я предлагаю немного посидеть рядом в тишине.'},
    {id:'change-topic',label:'Предложить сменить тему',playerText:'Я предлагаю сменить тему разговора.'},
    {id:'ask-advice',label:'Попросить совет',playerText:'Я прошу у тебя совета.'},
    {id:'ask-opinion',label:'Спросить мнение',playerText:'Я спрашиваю твоё мнение.'},
    {id:'share-news',label:'Поделиться новостью',playerText:'Я делюсь с тобой небольшой новостью.'},
    {id:'tell-joke',label:'Рассказать шутку',playerText:'Я рассказываю короткую безобидную шутку.'},
    {id:'tell-story',label:'Рассказать историю',playerText:'Я рассказываю забавную историю из своего дня.'},
  ]},
  {label:'Дружеские жесты',actions:[
    {id:'handshake',label:'Предложить рукопожатие',playerText:'Я предлагаю тебе рукопожатие.'},
    {id:'highfive',label:'Дать пять',playerText:'Я предлагаю дать пять.'},
    {id:'fistbump',label:'Предложить дружеский кулак',playerText:'Я предлагаю дружеский жест кулаком.'},
    {id:'thumbsup',label:'Показать большой палец',playerText:'Я показываю большой палец в знак одобрения.'},
    {id:'clap',label:'Поаплодировать',playerText:'Я коротко аплодирую твоему успеху.'},
    {id:'peace-sign',label:'Показать знак мира',playerText:'Я показываю знак мира.'},
    {id:'respect-gesture',label:'Выразить уважение',playerText:'Я выражаю уважение коротким жестом.'},
    {id:'encourage',label:'Подбодрить',playerText:'Я стараюсь тебя подбодрить.'},
    {id:'congratulate',label:'Поздравить',playerText:'Я поздравляю тебя с удачей.'},
    {id:'hug',label:'Попросить дружеское объятие',playerText:'Я спрашиваю, можно ли тебя по-дружески обнять.'},
  ]},
  {label:'Поддержка и забота',actions:[
    {id:'offer-tissue',label:'Предложить платок',playerText:'Я предлагаю тебе чистый платок.'},
    {id:'offer-water',label:'Предложить воды',playerText:'Я предлагаю тебе воды.'},
    {id:'offer-tea',label:'Предложить чай',playerText:'Я предлагаю вместе выпить чаю.'},
    {id:'share-umbrella',label:'Поделиться зонтом',playerText:'Я предлагаю укрыться под моим зонтом.'},
    {id:'hold-door',label:'Придержать дверь',playerText:'Я придерживаю для тебя дверь.'},
    {id:'carry-bag',label:'Предложить помочь с сумкой',playerText:'Я предлагаю помочь донести сумку.'},
    {id:'give-space',label:'Дать личное пространство',playerText:'Я отхожу на шаг, чтобы не мешать.'},
    {id:'offer-help',label:'Предложить помощь',playerText:'Я спрашиваю, нужна ли тебе помощь.'},
    {id:'check-wellbeing',label:'Поинтересоваться самочувствием',playerText:'Я спрашиваю, всё ли у тебя в порядке.'},
    {id:'wait-patiently',label:'Терпеливо подождать',playerText:'Я спокойно жду, пока ты будешь готова продолжить.'},
  ]},
  {label:'Осмотр и впечатления',actions:[
    {id:'point-view',label:'Показать красивый вид',playerText:'Я указываю на красивый вид неподалёку.'},
    {id:'show-map',label:'Показать карту',playerText:'Я показываю тебе карту деревни.'},
    {id:'show-photo',label:'Показать снимок пейзажа',playerText:'Я показываю тебе снимок пейзажа.'},
    {id:'look-sky',label:'Посмотреть на небо',playerText:'Я предлагаю посмотреть на облака.'},
    {id:'show-flower',label:'Показать цветок',playerText:'Я показываю необычный цветок.'},
    {id:'pick-up-paper',label:'Поднять оброненную бумагу',playerText:'Я поднимаю с земли оброненный лист бумаги.'},
    {id:'open-window',label:'Открыть окно',playerText:'Я спрашиваю, не будет ли тебе мешать, если открыть окно.'},
    {id:'close-window',label:'Закрыть окно от сквозняка',playerText:'Я предлагаю закрыть окно, чтобы убрать сквозняк.'},
    {id:'adjust-chair',label:'Подвинуть свободный стул',playerText:'Я пододвигаю свободный стул поближе к столу.'},
    {id:'look-around',label:'Осмотреться вместе',playerText:'Я предлагаю вместе осмотреться вокруг.'},
  ]},
  {label:'Совместные планы',actions:[
    {id:'suggest-walk',label:'Предложить прогулку',playerText:'Я предлагаю прогуляться по деревне.'},
    {id:'suggest-training',label:'Предложить тренировку',playerText:'Я предлагаю вместе потренироваться.'},
    {id:'suggest-ramen',label:'Предложить рамен',playerText:'Я предлагаю заглянуть в Ичираку за раменом.'},
    {id:'suggest-tea',label:'Предложить чайную паузу',playerText:'Я предлагаю сделать перерыв на чай.'},
    {id:'suggest-library',label:'Предложить библиотеку',playerText:'Я предлагаю вместе заглянуть в библиотеку.'},
    {id:'suggest-garden',label:'Предложить прогулку в саду',playerText:'Я предлагаю пройтись по общественному саду.'},
    {id:'suggest-game',label:'Предложить игру',playerText:'Я предлагаю сыграть в настольную игру.'},
    {id:'suggest-puzzle',label:'Предложить головоломку',playerText:'Я предлагаю вместе решить головоломку.'},
    {id:'suggest-art',label:'Предложить порисовать',playerText:'Я предлагаю немного порисовать.'},
    {id:'suggest-origami',label:'Предложить оригами',playerText:'Я предлагаю сложить несколько фигурок оригами.'},
  ]},
  {label:'Бытовая помощь',actions:[
    {id:'help-box',label:'Помочь с коробкой',playerText:'Я предлагаю помочь перенести коробку.'},
    {id:'sort-scrolls',label:'Разобрать свитки',playerText:'Я предлагаю помочь разобрать свитки.'},
    {id:'water-plants',label:'Полить растения',playerText:'Я предлагаю полить растения.'},
    {id:'sweep-path',label:'Подмести дорожку',playerText:'Я берусь подмести дорожку.'},
    {id:'arrange-books',label:'Расставить книги',playerText:'Я предлагаю расставить книги по полкам.'},
    {id:'set-table',label:'Накрыть на стол',playerText:'Я предлагаю помочь накрыть на стол.'},
    {id:'clean-table',label:'Протереть стол',playerText:'Я протираю стол после занятий.'},
    {id:'organize-tools',label:'Разложить инструменты',playerText:'Я предлагаю разложить инструменты по местам.'},
    {id:'collect-leaves',label:'Собрать опавшие листья',playerText:'Я предлагаю собрать листья в саду.'},
    {id:'repair-bench',label:'Осмотреть скамейку',playerText:'Я предлагаю осмотреть скамейку и помочь с мелким ремонтом.'},
  ]},
  {label:'Спокойные упражнения',actions:[
    {id:'stretch',label:'Предложить разминку',playerText:'Я предлагаю сделать лёгкую разминку.'},
    {id:'breathing',label:'Выполнить дыхательное упражнение',playerText:'Я предлагаю спокойное дыхательное упражнение.'},
    {id:'balance',label:'Предложить упражнение на равновесие',playerText:'Я предлагаю небольшое упражнение на равновесие.'},
    {id:'memory-game',label:'Поиграть на память',playerText:'Я предлагаю короткую игру на память.'},
    {id:'coordination',label:'Проверить координацию',playerText:'Я предлагаю простое упражнение на координацию.'},
    {id:'calligraphy',label:'Потренировать каллиграфию',playerText:'Я предлагаю вместе потренировать каллиграфию.'},
    {id:'origami-lesson',label:'Показать оригами',playerText:'Я предлагаю показать простой способ складывания оригами.'},
    {id:'draw-sketch',label:'Сделать набросок',playerText:'Я предлагаю сделать быстрый набросок.'},
    {id:'hum-melody',label:'Напеть мелодию',playerText:'Я тихо напеваю знакомую мелодию.'},
    {id:'practice-focus',label:'Потренировать концентрацию',playerText:'Я предлагаю короткое упражнение на концентрацию.'},
  ]},
  {label:'Игры и наблюдения',actions:[
    {id:'look-clouds',label:'Понаблюдать за облаками',playerText:'Я предлагаю придумать, на что похожи облака.'},
    {id:'count-stars',label:'Посчитать звёзды',playerText:'Я предлагаю посчитать первые звёзды на небе.'},
    {id:'listen-birds',label:'Послушать птиц',playerText:'Я предлагаю на минуту прислушаться к пению птиц.'},
    {id:'guess-weather',label:'Угадать погоду',playerText:'Я предлагаю угадать, изменится ли погода.'},
    {id:'word-game',label:'Сыграть в слова',playerText:'Я предлагаю сыграть в простую словесную игру.'},
    {id:'riddle',label:'Загадать загадку',playerText:'Я загадываю тебе несложную загадку.'},
    {id:'rock-paper-scissors',label:'Сыграть в ладушки-камень-ножницы',playerText:'Я предлагаю сыграть в камень, ножницы, бумагу.'},
    {id:'paper-plane',label:'Сложить бумажный самолётик',playerText:'Я предлагаю сложить бумажный самолётик.'},
    {id:'name-flowers',label:'Назвать цветы',playerText:'Я предлагаю по очереди назвать цветы вокруг.'},
    {id:'photo-scenery',label:'Сфотографировать пейзаж',playerText:'Я предлагаю сохранить этот пейзаж на снимке.'},
  ]},
  {label:'Завершение и организация',actions:[
    {id:'plan-week',label:'Обсудить планы на неделю',playerText:'Я предлагаю обсудить планы на неделю.'},
    {id:'plan-event',label:'Спланировать небольшое событие',playerText:'Я предлагаю вместе спланировать небольшое событие.'},
    {id:'check-route',label:'Сверить маршрут',playerText:'Я предлагаю ещё раз сверить маршрут по карте.'},
    {id:'make-list',label:'Составить список дел',playerText:'Я предлагаю записать ближайшие дела.'},
    {id:'set-reminder',label:'Напомнить о договорённости',playerText:'Я предлагаю записать напоминание о нашей договорённости.'},
    {id:'schedule-meetup',label:'Договориться о новой встрече',playerText:'Я предлагаю выбрать удобное время для следующей встречи.'},
    {id:'compare-notes',label:'Сравнить заметки',playerText:'Я предлагаю сравнить наши заметки.'},
    {id:'share-book',label:'Порекомендовать книгу',playerText:'Я предлагаю обменяться книжными рекомендациями.'},
    {id:'say-goodbye',label:'Попрощаться',playerText:'Я тепло прощаюсь с тобой.'},
    {id:'farewell-wave',label:'Помахать на прощание',playerText:'Я машу тебе рукой на прощание.'},
  ]},
];

const CONVERSATION_ACTIONS = CONVERSATION_ACTION_GROUPS.flatMap(group => group.actions.map(action => ({...action,group:group.label})));

const ACTION_REPLY_BANK = {
  'Приветствие и вежливость': [
    '${char.name} отвечает на жест вежливой улыбкой: «Спасибо. Как у тебя проходит день?»',
    '${char.name} приветственно кивает: «Хорошо, что мы пересеклись. Что нового?»',
    '${char.name} принимает твоё внимание: «Это любезно. Чем займёмся дальше?»',
  ],
  'Разговор и внимание': [
    '${char.name} внимательно выслушивает тебя: «Я поняла. А что ты думаешь об этом сам?»',
    '${char.name} делает небольшую паузу и отвечает: «Спасибо, что не перебиваешь. Продолжай, я слушаю».',
    '${char.name} поддерживает разговор: «Хорошая тема. С чего ты предлагаешь начать?»',
  ],
  'Дружеские жесты': [
    '${char.name} отвечает на дружеский жест: «Вот это настрой! Как у тебя настроение?»',
    '${char.name} принимает приветствие, если ей комфортно: «Спасибо. Приятно общаться без спешки».',
    '${char.name} улыбается: «Дружеские жесты иногда говорят больше слов. Что дальше?»',
  ],
  'Поддержка и забота': [
    '${char.name} благодарит за внимание: «Спасибо, это очень кстати. Я ценю заботу».',
    '${char.name} спокойно принимает предложение: «Хорошо, давай так. Не нужно торопиться».',
    '${char.name} отвечает: «Спасибо, что спросил(а). Так мне гораздо удобнее».',
  ],
  'Осмотр и впечатления': [
    '${char.name} смотрит туда, куда ты указываешь: «Красивое место. Что ещё ты заметил?»',
    '${char.name} с интересом осматривается: «Я раньше не обращала внимания на эту деталь».',
    '${char.name} делится впечатлением: «Иногда полезно остановиться и посмотреть вокруг».',
  ],
  'Совместные планы': [
    '${char.name} обдумывает предложение: «Звучит неплохо. Давай выберем удобное время».',
    '${char.name} отвечает с интересом: «Можно попробовать. Что подготовим заранее?»',
    '${char.name} кивает: «Хорошая идея для совместного занятия. С чего начнём?»',
  ],
  'Бытовая помощь': [
    '${char.name} благодарит: «Спасибо, так дело пойдёт быстрее. Возьмёмся за это вместе».',
    '${char.name} оценивает результат: «Аккуратно получилось. Есть ещё одна небольшая задача».',
    '${char.name} отвечает: «Я ценю, когда помощь предлагают без лишнего шума».',
  ],
  'Спокойные упражнения': [
    '${char.name} пробует упражнение: «Неплохо. Главное — не торопиться и следить за самочувствием».',
    '${char.name} повторяет движение: «Давай сделаем ещё раз, но в удобном темпе».',
    '${char.name} улыбается: «Такая короткая практика помогает переключиться».',
  ],
  'Игры и наблюдения': [
    '${char.name} поддерживает идею: «Договорились! Кто начинает?»',
    '${char.name} с любопытством включается: «Интересно, что получится. Давай попробуем».',
    '${char.name} смеётся: «Вот это уже похоже на хорошую передышку».',
  ],
  'Завершение и организация': [
    '${char.name} соглашается: «Хорошо, запишем основные пункты, чтобы ничего не забыть».',
    '${char.name} подводит итог: «Отлично. Теперь у нас есть понятный следующий шаг».',
    '${char.name} отвечает: «Договорились. До встречи и береги себя!»',
  ],
};

return { CONVERSATION_ACTION_GROUPS, CONVERSATION_ACTIONS, ACTION_REPLY_BANK };
},
"src/core/gm.js": function(__require) {
const { getBond,updateBond,addFeed,addMemory,removeItem } = __require("src/core/store.js");
const { tickAction,getNpcLocation } = __require("src/core/life.js");
const { getLocation } = __require("src/data/world.js");
const { EXPANDED_DIALOGUE_LOOKUP,ALL_EXPANDED_REPLY_BANK,ALL_RECIPROCAL_QUESTIONS } = __require("src/data/dialogue-expansion.js");
const { CONVERSATION_ACTIONS,ACTION_REPLY_BANK } = __require("src/data/conversation-actions.js");





const INTENTS = [
  ['howAre',/(?:как\s+(?:у\s+тебя\s+)?дела|как\s+ты(?:\s+себя\s+(?:чувствуешь|ощущаешь))?(?![а-яё])(?!\s+(?:считаешь|думаешь|полагаешь|обычно|принимаешь|предпочитаешь|хочешь|можешь|умеешь|проводишь|отдыхаешь|занимаешься|выбираешь|относишься|сохраняешь|понимаешь))|как\s+поживаешь|как\s+настроение|как\s+самочувствие|как\s+проходит\s+день|как\s+жизнь|как\s+ты\s+сегодня|как\s+самочувствие\s+после|как\s+прошла\s+эта\s+неделя|как\s+прошел\s+этот\s+день|как\s+прошёл\s+этот\s+день|не\s+слишком\s+устал|не\s+слишком\s+устала|удалось\s+сегодня.*отдохнуть|смогла\s+отдохнуть|у\s+тебя\s+сегодня\s+хорошее\s+настроение|все\s+ли\s+у\s+тебя\s+хорошо|всё\s+ли\s+у\s+тебя\s+хорошо)/i],
  ['insult',/(заткнись|отстань|ненавижу|тупая|дура|идиот|бесполезн|молчи уже|замолчи|надоело.*слушать|поступил.*неприятно|не хочу.*видеть|глупо.*с твоей стороны|ты переходишь границ|не собираюсь.*терпеть|не разговаривай.*тоном|ты мне противна|ты ведешь себя грубо|ты ведёшь себя грубо)/i],
  ['boundary',/(пошл|неприлич|интим|секс|раздень|раздевай|покажи тело|эрот|неуместн|неудобный вопрос|личн.*вопрос|границ|некомфорт|смен(им|ить) тему|не хочу обсуждать|не спрашивай|неприятно.*обсуждать|уважительн.*общен|друг(ую|ую)? тему|поговорим.*другом|чем-нибудь другом|грудь|трогаю тебя|трогать тебя|лапа(ю|ть)|прикасаюсь к телу|попытк.*поцел|поцелуй)/i],
  ['introduce',/(меня зовут|зови меня|можно просто звать|можешь звать меня|я по имени|представлюсь|представиться|меня обычно называют|давай познакомимся|давай знакомиться|позволь представиться|для друзей я|мое имя|моё имя|я [а-яё-]{2,24}, приятно познакомиться|позволь назвать свое имя|позволь назвать своё имя)/i],
  ['askName',/(как тебя зовут|назови свое имя|назови своё имя|кто ты|представься|как к тебе обращаться|как мне тебя называть|твое имя|твоё имя|какое у тебя имя|какое имя мне использовать|забыл.*имя|забы(л|ла).*имя|не расслышал.*имя|напомни.*имя|напомнишь.*имя|представишься|как тебя называют|узнать.*имя)/i],
  ['apology',/(прости|извини|прошу прощения|приношу извинения|я был неправ|я была неправа|не хотел тебя обидеть|не хотел задеть|сожалею|мне жаль|следовало.*выслушать|моя резкость|свою резкость|мою резкость|мне.*жаль|понимаю свою ошибку|исправлю свою ошибку|перегнул палку)/i],
  ['promiseCancel',/(не буду выполнять|отказываюсь.*обещан|не успеваю|не получится выполнить|снимем обещание|не смогу обещать|не смогу.*обещан|пересмотреть свои слова|отказаться от договор|честно отменим|не смогу прийти|не хочу обещать)/i],
  ['promise',/(обещаю|даю слово|я сделаю|обязательно помогу|можешь на меня рассчитывать|не забуду.*договор|постараюсь выполнить|беру эту задачу на себя|сделаю все|сделаю всё|не подвести)/i],
  ['memory',/(помнишь|в прошлый раз|вчера мы|тогда мы|как мы|ты помнишь|наша прогулка|прошлую встречку|прошлая встречка|запомнился наш прошлый|справились тогда|тот разговор)/i],
  ['where',/(где ты|где находишься|ты сейчас где|ты сейчас в|в каком месте|куда идешь|куда направляешься|куда ты направля|далеко от центра|где мы можем встрет|в какой части|все еще в больнице|всё ещё в больнице|где тебя найти|где искать)/i],
  ['pet',/(?:^|[^а-яё])(?:питом|животн|кот(?!ор)|кошк|собак|щен|кролик|ястреб|черепах|котен|котён|птиц|корм)[а-яё]*(?=$|[^а-яё])/i],
  ['gift',/(^|\s)дарю|подарю|держи|это тебе|прими.*подар|вот тебе|принес.*цвет|принёс.*цвет|вручу.*подар|вручить.*подар|знак благодарности|купил для тебя|этот подарок|подарок пригодится/i],
  ['food',/(рамен|поесть|обед|ужин|завтрак|чай|бэнто|перекус|готовк|горячего|ичираку|место для чая|умеешь готовить|какую еду|поедим|кушать|проголодал|голоден|голодна|заказал еду|заказала еду|заказываю еду|хочу перекусить|онигири|данго|блюдо|лапш|рисов.*шарик|сладкое данго|в чайной)/i],
  ['interests',/(что тебе нравится|что любишь|любимое занятие|какие увлечения|увлечения|хобби|чем увлекаешься|расскажи о хобби|любишь больше всего|занимаешься после дел|нравятся книги|какие книги|часто гуляешь|какую музыку|что тебя вдохновляет|любишь учиться|занятие.*успокаивает|что тебе по душе|чем любишь заниматься|как ты обычно отдыхаешь|как обычно отдыхаешь|что помогает тебе отдохнуть|любишь рисовать|больше нравится сад|спокойного вечера|чему ты хотела бы научиться|какое занятие.*интересн)/i],
  ['schedule',/(какие у тебя планы|что сегодня делаешь|чем сегодня занята|чем занята|чем занимаешься|твой распорядок|свободна ли|что собираешься делать|свободна сейчас|как проходит твой день|есть планы|много дел|найти свободное время|как проведешь день|как проведёшь день|планы на вечер|свободное время|проводишь свободные вечера)/i],
  ['farewell',/(^|[\s,])пока([\s.!?,]|$)|до встречи|увидимся|мне пора|до скорого|спокойной ночи|хорошего вечера|береги себя/i],
  ['greet',/(привет|здравствуй|доброе утро|добрый день|добрый вечер|хай|салют|рад тебя видеть|приветствую|(?:^|[.!?]\s*)здорово(?=[!,.\s]|$)|хэй|доброго\s+утра|добрейшего\s+дня|вечер\s+добрый|рад\s+(?:снова\s+)?тебя\s+(?:видеть|увидеть)|рад\s+встрече|есть\s+минутка)/i],
  ['comfort',/(грустно|тяжелый день|тяжёлый день|переживаю|волнуюсь|устал|устала|не получается|плохой день|мне одиноко|нет сил|не знаю, как поступить|нужно с кем-то поговорить|посидеть рядом)/i],
  ['compliment',/(ты отлично справилась|ты молодец|восхищаюсь|уважаю тво|уважаю тебя|классно получилось|хорошая работа|ты здорово умеешь|красиво выглядишь|хорошо выглядишь|здорово получилось|ты очень умная|ты умная|прекрасно организовала|прекрасно справилась|нравится твой подход|замечать детали|внимательно все организовала|внимательно всё организовала|получается объяснять|ценю твою выдержку|замечательное чувство юмора|нравится.*принимаешь решения|замечаешь.*детали|легко работать в команде|отличный наставник|работа заслуживает похвалы)/i],
  ['disagree',/(не согласен|не согласна|это плохая идея|я думаю иначе|я думаю немного иначе|не уверен|не уверена|другое мнение|ситуацию иначе|другой путь|не думаю, что это справедливо|позволь возразить|не подходит такой вариант|не убеждает|другой вариант|вижу эту ситуацию по-другому|выводом.*поспорил|есть возражение|лучший выход|иную точку зрения|не соглашаться друг с другом|упущена важная деталь|не стал торопиться.*решением|другой подход|проверим оба варианта|упущена важная деталь|пропущена важная деталь)/i],
  ['plan',/(давай запланируем|составим план|что будем делать дальше|предлагаю маршрут|распределим время|предлагаю сначала|давай выберем маршрут|сначала решим|обсудить порядок действий|организовать встречу|список необходимых вещей|договориться о следующем шаге|с чего лучше начать|распределим задачи|следующий шаг|куда отправимся сначала|заранее подготовить|определим приоритеты|распланировать.*время|составим маршрут|кто за что отвечает|обсудим цель)/i],
  ['challenge',/(соревн|спорим|проверим наши навыки|вызов|состязани|попробуем на скорость|сравним результаты|готова к испытанию|кто точнее|полосу препятствий|проверим, кто|дружеский забег|сравним результаты наших упражнений|задачей на ловкость|честное соревнование|учебных мишенях|небольшому испытанию|командную эстафету|конкурса меткости|быстрее соберет снаряжение|быстрее соберёт снаряжение)/i],
  ['train',/(трениров|потренируемся|покажешь.*техник|покажи технику|обуч|упражнен|контроль чакры|базовую технику|защитный барьер|точность движений|точность броска|базовую разминку|равновесие|упражнение на скорость|технику дыхания|концентраци|защитную стойку|координацию движений|тренировку посоветуешь|правильную стойку|командную координацию)/i],
  ['help',/(помочь|помогу|помоги|поможем|помогать|нужна помощь|давай помогу|могу помочь|поддержу|могу поддержать|сделаем.*вместе|вместе закончим|вместе.*разберемся|вместе.*разберёмся|часть работы|могу сходить|разделить обязанности|что нужно сделать|помогу донести|возьму.*работы|взять часть.*дел|принесу все необходимое|принесу всё необходимое|есть задача.*выручить|лишняя пара рук|облегчить.*день|что я могу сделать)/i],
  ['invite',/(пойд[её]м|составишь.*компани|прогуляемся|давай прогуляемся|сходим|вместе пообедаем|пойдём вместе|хочешь пройтись|заглянем в библиотеку|встретимся|немного пройтись|выпьем чаю вместе|сходить в сад|составить компанию|вместе зайдем|вместе зайд[её]м|не против выпить|можем прогуляться|короткой прогулки|давай заглянем|посидим немного|встретимся возле моста|прогулке вечером|пойдем посмотрим|пойд[её]м посмотрим)/i],
  ['weather',/(погод|дожд|снег|ветер|ветрено|жарк|холодно|похолод|солнечн|солнце|туман|(?:^|[^а-яё])небо(?:$|[^а-яё])|туч|мороз|пасмур|день для прогулки|прохлад)/i],
  ['work',/(работ(а|у|ы|ой)(?=$|[^а-яё])|подработ|смена|смену|заработ|деньги|зарплат|трудоустро|дополнительные руки|платят|устроиться|свободное место|помощником повара|ваканс|нанимает|подзаработ|оплачиваемая работ|работа на несколько часов|размер оплаты|помощником в клинике|нанимают помощников)/i],
  ['joke',/(шутк|смешно|рассмеш|прикол|ха-ха|ахах|анекдот|забавн|перепутал двери|вот это поворот|комичная ситуация|смешная история|перепутал кабинеты|умудрился заблудиться|смешнее результата)/i],
  ['kind',/(спасибо|классн|крут|молодец|ты умн|ты добрая|ты добрый|приятно видеть|хорошо выглядишь|уважаю|рад, что мы встретились|хороший товарищ|приятно с тобой|ценю твою поддержку|доброжелательно|благодарю за совет|рядом как союзник|рад, что мы познаком|ценю|благодарю|приятно, что ты помогла|рад, что мы можем спокойно общаться|благодарю за твое терпение|благодарю за твоё терпение|надежный товарищ|надёжный товарищ|благодарен тебе за поддержку|не забуду твою поддержку|отнеслась с пониманием|на тебя можно положиться|ценю нашу дружбу|хорошо, что мы сегодня)/i],
  // Situations that are not ordinary small talk: the GM must ask for facts or offer a sensible next step.
  ['work',/(ваканс|нанимает|подзаработ|оплачиваемая работ|работа на несколько часов|размер оплаты|помощником в клинике|куда обратиться.*вакан|нанимают помощников)/i],
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
  howAre:{friendship:1,trust:0,respect:0}, greet:{friendship:1,trust:0,respect:0,irritation:-1}, introduce:{friendship:1,trust:1}, askName:{friendship:1}, apology:{trust:5,respect:2,irritation:-18},
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
const replySeed = (state,char,kind,raw,meta={}) => hash(`${char.id}:${kind}:${raw}:${meta.turnCount||0}:${state?.world?.day||1}:${state?.world?.minute||0}`);

function trimFact(value) {
  return String(value||'').replace(/[.!?]+$/,'').replace(/\s+/g,' ').trim().slice(0,90);
}

function capturePlayerFact(raw,meta={},kind='default') {
  const text=String(raw||'').trim();
  const rules=[
    ['likes',/(?:я\s+(?:очень\s+)?(?:люблю|обожаю|предпочитаю)|мне\s+(?:очень\s+)?нравится)\s+([^.!?]{2,90})/i],
    ['goal',/(?:я\s+мечтаю\s+(?:о|стать|заняться)?\s*|моя\s+мечта\s*[-—:]?\s*|моя\s+цель\s*[-—:]?\s*|я\s+хочу\s+стать\s+)([^.!?]{2,90})/i],
    ['home',/(?:я\s+(?:родом|приехал|приехала|прибыл|прибыла)\s+из|я\s+(?:недавно\s+)?(?:приехал|приехала|прибыл|прибыла)\s+из|я\s+из)\s+([^.!?]{2,70})/i],
    ['pet',/(?:у\s+меня\s+есть|завел(?:а)?\s+себе|мой\s+питомец\s*[-—:]?\s*)(?=[^.!?]{0,45}(?:кот|кошк|собак|щен|кролик|черепах|ястреб|птиц|питом|животн))([^.!?]{2,70})/i],
    ['work',/(?:я\s+работаю\s+(?:в|на|как)|моя\s+работа\s*[-—:]?\s*)([^.!?]{2,70})/i]
  ];
  for (const [key,pattern] of rules) {
    if (key==='likes' && ['compliment','boundary','pet','joke','disagree','news','insult'].includes(kind)) continue;
    const match=text.match(pattern);
    if (!match) continue;
    const value=trimFact(match[1]);
    if (!value) continue;
    const facts={...(meta.playerFacts||{}),[key]:value,lastUpdatedAt:Date.now()};
    return {key,value,playerFacts:facts};
  }
  return null;
}

function playerFactAcknowledgement(char,fact,seed=0) {
  const lines={
    likes:[`Запомню, что тебе нравится ${fact.value}. Интересно, давно это стало твоим увлечением?`,`Значит, тебе по душе ${fact.value}. А что в этом нравится больше всего?`,`Хорошо, буду иметь в виду: ${fact.value}. Расскажешь, как ты к этому пришёл?`],
    goal:[`Ты стремишься к тому, чтобы ${fact.value}. Это серьёзная цель. Что уже сделал для неё?`,`Поняла, твоя цель — ${fact.value}. Что сейчас больше всего помогает двигаться к ней?`,`Мне нравится, что у тебя есть направление. Почему именно ${fact.value}?`],
    home:[`Значит, ты родом из места: ${fact.value}. Сильно отличается от Конохи?`,`Теперь понимаю, откуда ты приехал: ${fact.value}. Чего тебе здесь пока не хватает?`,`Интересно. Что из родных мест ты вспоминаешь чаще всего?`],
    pet:[`У тебя есть ${fact.value}? Какой у него характер?`,`Здорово, питомцы часто становятся настоящими членами семьи. Как ты о нём заботишься?`,`Запомню. Как давно ${fact.value} живёт рядом с тобой?`],
    work:[`Значит, ты работаешь: ${fact.value}. Тебе нравится это занятие?`,`Теперь я знаю, чем ты занимаешься: ${fact.value}. Что в этой работе самое интересное?`,`Это многое объясняет. Как ты вообще пришёл к такой работе?`]
  };
  if (fact.key==='goal') return choose([
    `Поняла, это твоя большая цель: ${fact.value}. Что уже получилось сделать на этом пути?`,
    `Значит, ты хочешь добиться следующего: ${fact.value}. Что сейчас самый трудный шаг?`,
    `Запомню твою цель. Что вдохновило тебя выбрать именно это направление?`
  ],seed);
  if (fact.key==='home') return choose([
    `Теперь знаю, что ты приехал из ${fact.value}. Что тебе больше всего запомнилось оттуда?`,
    `Интересно, значит, твои корни связаны с ${fact.value}. Часто вспоминаешь родные места?`,
    `Поняла. Коноха сильно отличается от ${fact.value}?`
  ],seed);
  return choose(lines[fact.key]||lines.likes,seed);
}

function pendingQuestionReply(char,raw,meta,state,bond) {
  const question=String(meta?.pendingQuestion||'').trim();
  if (!question) return '';
  const clean=normalize(raw);
  if (!/^(да|нет|ага|неа|конечно|скорее да|скорее нет|пожалуй|возможно|не знаю|пока нет|не совсем|я думаю|мне кажется|я люблю|мне нравится|я хочу|я мечтаю|я из|я родом|я (?:недавно )?(?:приехал|приехала|прибыл|прибыла) из|у меня есть|родом из|предпочитаю)\b/i.test(clean)) return '';
  const fact=capturePlayerFact(raw,meta,'contextAnswer');
  if (fact) {
    meta.playerFacts=fact.playerFacts;
    return playerFactAcknowledgement(char,fact,replySeed(state,char,'answer',raw,meta));
  }
  const positive=/^(да|ага|конечно|скорее да|пожалуй)/i.test(clean);
  const negative=/^(нет|неа|скорее нет|пока нет|не совсем)/i.test(clean);
  if (positive) return choose([
    `Поняла. Тогда расскажи немного подробнее — мне интересно, что ты об этом думаешь.`,
    `Хорошо, я тебя услышала. А что подтолкнуло тебя к такому ответу?`,
    `Ясно. Не буду торопить тебя с подробностями, но готова послушать.`
  ],replySeed(state,char,'yes',raw,meta));
  if (negative) return choose([
    `Хорошо, значит, пока не так. Не стану настаивать. Что тебе ближе вместо этого?`,
    `Поняла. Спасибо за честный ответ. А как бы ты предпочёл поступить?`,
    `Ничего страшного. Иногда ответ меняется со временем. Хочешь объяснить почему?`
  ],replySeed(state,char,'no',raw,meta));
  return choose([
    `Теперь я лучше понимаю твою точку зрения. Можешь привести пример?`,
    `Интересно. Я не хочу додумывать за тебя — расскажи, что для тебя здесь главное.`,
    `Спасибо, что поделился. А это давно так или появилось недавно?`
  ],replySeed(state,char,'answer',raw,meta));
}

function latestPlayerFact(meta={}) {
  const facts=meta.playerFacts||{};
  const order=['goal','likes','pet','home','work'];
  for (const key of order) if (facts[key]) return {key,value:facts[key]};
  return null;
}

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
  // The additional corpus contains 800 explicit, QA-covered utterances.
  // Exact matching runs first so common words such as "работа" do not steal a more specific topic.
  const expandedKind = EXPANDED_DIALOGUE_LOOKUP.get(clean.replace(/[!?.,;:…]+$/g,'').replace(/\s+/g,' '));
  if (expandedKind) return {kind:expandedKind,raw};
  // Resolve uncommon but meaningful situations before broad everyday keywords.
  // Example: the substring "чай" inside "случайно" must not turn an accident into a food topic.
  const priority = [
    ['venueRumor',/(музыкальн.{0,24}(?:зал|клуб|сцен)|концертн.{0,24}(?:площад|мест)|где.{0,35}(?:послушать музыку|живая музыка)|выступлен.{0,24}(?:где|место))/i],
    // A cooking-related compliment/question about a specific dish belongs to food chat, not the cooking mini-activity intent.
    ['food',/(?:какое|что за)\s+блюдо.{0,35}(?:ты\s+)?готовишь/i],
    ['gestureHugRequest',/(можно\s+(?:тебя\s+)?обнять|можно\s+обнимемся|не\s+против\s+(?:дружеского\s+)?объятия|хочешь\s+обнимемся|давай\s+обнимемся|я\s+хочу\s+тебя\s+обнять)/i],
    ['gestureHugUnasked',/(?:я\s+)?обнимаю(?:\s+тебя)?|(?:я\s+)?обнял(?:а)?(?:\s+тебя)?/i],
    ['gestureHandshake',/(пожимаю\s+(?:тебе\s+)?руку|пожмем\s+руки|пожмём\s+руки|предлагаю\s+рукопожатие|протягиваю\s+(?:тебе\s+)?руку)/i],
    ['gestureHighfive',/(дай\s+пять|даю\s+пять|давай\s+пять|стукнемся\s+ладонями|ладонь\s+к\s+ладони)/i],
    ['gestureWave',/(машу\s+(?:тебе\s+)?рукой|помахал(?:а)?\s+(?:тебе\s+)?рукой|приветственный\s+жест\s+рукой)/i],
    ['joke',/(смешн.*истори|шутк|анекдот|забавн.*истори)/i],
    ['work',/(ваканс|нанимает|подзаработ|оплачиваемая работ|работа на несколько часов|размер оплаты|помощником в клинике|нанимают помощников)/i],
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
  const extendedPatterns = [
    ['about',/(какой у тебя характер|черта характера|что в людях ты замечаешь|доверяешь интуиц|реагируешь на неожидан|любишь планировать|сохранять спокойствие|любишь быть в центре внимания)/],
    ['dreams',/(о чем ты мечтаешь|о чем мечтаешь|какой цели|большая мечта|через несколько лет|если бы у тебя был.*месяц|давно хочешь увидеть|какой навык.*мечтаешь|что тебя вдохновляет двигаться|несбывшееся желание)/],
    ['team',/(надежн.*напарник|сработалась|доверяешь людям в команде|товарищи не могут договориться|роль.*в группе|распределять обязанности|поддерживаешь напарника|участник не выполняет|командной работе|командный успех)/],
    ['missions',/(какое задание|подготовиться к незнакомому заданию|план миссии|перед выходом из деревни|после напряженной работы|после напряжённой работы|итоги после|выполнении поручения|задания по сопровождению|перед первой миссией)/],
    ['village',/(место в конохе|район конохи|что в нашей деревне|улучшила в конохе|традиции деревни|жизни деревни|показываешь гостям|вечерней прогулки|обычай конохи)/],
    ['clan',/(принадлежать к своему клану|семейная традиция|научили старшие|семейные ожидания|история своей семьи|младших|история своего клана|семейная ответственность|семью дружной)/],
    ['values',/(означает честность|понимаешь справедливость|уважать чужие границы|призн.*ошибки|настоящей добротой|второй шанс|достойным уважения|понимаешь ответственность|победа или достойное поведение)/],
    ['favorites',/(какой цвет тебе|какое время года|какой цветок|горы или море|любишь рассветы|какая погода подходит|какой подарок.*душевным|какой аромат|любишь смотреть на звезды|какой вид искусства)/],
    ['routine',/(как обычно начинается|сразу после пробуждения|в какое время дня|распорядок|переключиться после работы|перед сном|плотный распорядок|свободный час|рабочем месте|завершение трудной недели)/],
    ['feelings',/(справиться с тревогой|пора отдохнуть|говорить о своих переживаниях|когда злишься|после неудачи|почувствовать уверенность|справляешься с разочарованием|не опускать руки|почувствовать себя в безопасности)/],
    ['friendship',/(человек стал твоим другом|сохранить дружбу|знакомиться с новыми людьми|крепкой дружбы|миришься после|долгие беседы|открыться новому знакомому|личному пространству друзей|совместные прогулки|хороший собеседник)/],
    ['learning',/(какой навык ты сейчас|изучать|учиться по книгам|запоминаешь сложную информацию|самым полезным наставником|обучению через ошибки|выбираешь.*учиться|самостоятельное обучение|начинающему ученику|сложным занятием)/],
    ['strategy',/(между двумя сложными вариантами|запасной план|важную мелочь|данных для решения|распределяешь приоритеты|последствия решения|если план перестал работать|собственной ошибки|изменить подход|факт от предположения)/],
    ['nature',/(место на природе|шум леса|перемены природы|гулять у реки|ухаживать за растениями|лесная тропинка|наблюдать за птицами|среди деревьев|природный запах|небольшом саду)/],
    ['festivals',/(праздник в конохе|фестивальные фонарики|праздничных ярмарках|праздничные выступления|подготовкой фестиваля|программа деревенского фестиваля|огнями вечером|посещать ярмарки|фестивальная атмосфера)/],
    ['books',/(какую книгу|жанр тебе|где тебе нравится читать|следующую книгу|герой книги|старые свитки|читать перед сном|исторические хроники|книги помогла|добавить в библиотеку)/],
    ['music',/(какую музыку|инструмент|мелодия.*детства|играть на музыкальных|музыка во время работы|музыка под дождем|музыка под дождём|уличных музыкантов|традиционных.*инструментах|музыкальные фестивали)/],
    ['food',/(какое блюдо|острые блюда|десерт напоминает|с собой в дорогу|пробовать незнакомую еду|какой чай|домашнюю еду|научиться готовить|сладкое данго|ингредиент всегда)/],
    ['travel',/(за пределами конохи|путешествовать без|долгую дорогу|пешие маршруты|местные традиции|незнакомую страну|спутники устали|безопасный маршрут|ориентируешься в незнакомом|дорожный дневник)/],
    ['memories',/(воспоминание.*улыб|из детства|научил тебя|изменило твой взгляд|старые фотографии|совет.*на всю жизнь|подарок из прошлого|знакомство.*важным|себе младшей|поддержал тебя в трудный)/]
  ];
  const intent = priority.find(([,pattern])=>pattern.test(clean))?.[0] || INTENTS.find(([,pattern])=>pattern.test(clean))?.[0] || extendedPatterns.find(([,pattern])=>pattern.test(clean))?.[0] || (/[?？]/.test(raw) ? 'question' : 'default');
  return {kind:intent,raw};
}

function expandedReplyFor(char,kind,raw,state,bond={},meta={}) {
  const bank=ALL_EXPANDED_REPLY_BANK[kind];
  if (!bank?.length) return '';
  const index=Math.abs(replySeed(state,char,kind,raw,meta)+Number(bond.meetings||0))%bank.length;
  const familiarity=(bond.friendship||0)>=45?'Мне приятно, что мы можем так спокойно обсуждать подобные вещи. ':'';
  const styleLead={playful:'Хм, хороший вопрос. ',bold:'Отвечу прямо. ',sharp:'Тут есть над чем подумать. ',quiet:'Дай секунду собраться с мыслями. ',gentle:'Рада, что ты спросил. ',warm:'О, это интересная тема. ',formal:'Позволь ответить по существу. ',wise:'Я бы посмотрела на это с нескольких сторон. ',direct:'Скажу коротко. ',bright:'Хорошая тема для разговора! ',mysterious:'Любопытно, что ты спросил именно об этом. '};
  const lead=choose([styleLead[char.style]||'', ''],replySeed(state,char,`lead-${kind}`,raw,meta));
  return `${familiarity}${lead}${bank[index]}`;
}

function reciprocalQuestion(char,kind,raw,state,meta={}) {
  const banks={
    ...ALL_RECIPROCAL_QUESTIONS,
    about:['А каким ты сам считаешь свой характер?','А какая черта в людях для тебя важнее всего?'], dreams:['А к какой цели ты сейчас стремишься?','А о чём ты сам мечтаешь?'],
    team:['А что ты больше всего ценишь в напарнике?','А тебе самому комфортнее вести команду или поддерживать её?'], missions:['А какое задание запомнилось тебе?','А как ты обычно готовишься к сложным поручениям?'],
    village:['А какое место в Конохе нравится тебе?','А что бы ты хотел изменить в деревне?'], clan:['А какие семейные традиции важны для тебя?','А чему тебя научили близкие?'],
    values:['А какой принцип ты стараешься не нарушать?','А как бы ты поступил в такой ситуации?'], favorites:['А что нравится тебе?','А есть вещь, которую ты особенно любишь?'],
    routine:['А как обычно проходит твой день?','А что помогает тебе отдыхать?'], feelings:['А что помогает тебе справляться с такими днями?','А тебе легко говорить о своих чувствах?'],
    friendship:['А что для тебя значит хорошая дружба?','А тебе легко заводить новых друзей?'], learning:['А чему ты хотел бы научиться?','А как ты предпочитаешь осваивать новое?'],
    strategy:['А какой вариант выбрал бы ты?','А что ты проверил бы в первую очередь?'], nature:['А где тебе нравится отдыхать на природе?','А какое время года тебе ближе?'],
    festivals:['А какой праздник ты ждёшь больше всего?','А ты любишь большие гуляния?'], books:['А какую книгу ты посоветовал бы мне?','А что тебе нравится читать?'],
    music:['А какую музыку слушаешь ты?','А есть мелодия, которая тебе особенно дорога?'], food:['А какое блюдо ты выбрал бы сейчас?','А ты любишь готовить сам?'],
    travel:['А куда тебе хотелось бы отправиться?','А ты предпочитаешь путешествовать один или с компанией?'], memories:['А какое воспоминание ты бережёшь?','А какой день тебе хотелось бы повторить?'],
    default:['А что ты сам об этом думаешь?','А как ты к этому пришёл?']
  };
  const list=banks[kind]||banks.default;
  let index=Math.abs(replySeed(state,char,kind,raw,meta))%list.length;
  const previous=meta.lastNpcQuestion;
  if (list.length>1 && list[index]===previous) index=(index+1)%list.length;
  return list[index];
}

function ensureNpcQuestion(reply,char,kind,raw,state,meta={}) {
  const quietKinds=['farewell','boundary','insult','privacy','refusal'];
  if (quietKinds.includes(kind) || /[?？]/.test(reply)) return reply;
  return `${reply} ${reciprocalQuestion(char,kind,raw,state,meta)}`;
}

function npcOpeningLine(state,char) {
  if (!state || !char) return '';
  state.dialogueMeta ||= {};
  const meta=state.dialogueMeta[char.id]||{};
  const day=state.world.day, minute=state.world.minute;
  if (meta.lastNpcInitiationDay===day && minute-(meta.lastNpcInitiationMinute||0)<240) return '';
  const bond=getBond(state,char.id);
  const first=(bond.meetings||0)===0;
  const hour=Math.floor(minute/60)%24;
  const dayPart=hour<6?'ночью':hour<12?'утром':hour<18?'днём':'вечером';
  const familiar=latestPlayerFact(meta);
  const personalized=familiar && bond.friendship>=25 && (meta.lastFactMentionDay==null || day-meta.lastFactMentionDay>=2);
  const fresh={
    playful:[`О, вот и ты! Я как раз собиралась устроить небольшую передышку. Как настроение?`,`Эй, есть минутка? У меня к тебе любопытный вопрос.`,`Ну здравствуй! Сегодня без розыгрышей… наверное. Как проходит ${dayPart}?`],
    bold:[`Ты вовремя. Я хотела обсудить одну идею. Что скажешь?`,`Привет. Есть силы на небольшое дело или сегодня отдыхаешь?`,`Рада встрече. Что интересного произошло с тех пор, как мы виделись?`],
    sharp:[`Привет. Надеюсь, сегодня у нас будет разговор по существу. Что нового?`,`А, это ты. У меня есть вопрос — сначала расскажи, как идут дела.`,`Хорошо, что встретились. Ты заметил что-нибудь необычное в деревне?`],
    quiet:[`Здравствуй. Здесь сейчас спокойно. Не хочешь немного передохнуть и поговорить?`,`Привет. Я не помешала? Можем просто немного посидеть.`,`Рада тебя видеть. Как прошёл твой день?`],
    gentle:[`Привет. Ты выглядишь задумчивым. Всё в порядке?`,`Хорошо, что ты заглянул. Как самочувствие?`,`Я как раз закончила дела. Хочешь немного поговорить?`],
    warm:[`Привет! Как ты? Надеюсь, день обходится без лишней суеты.`,`Рада встрече. Ты уже успел поесть или опять весь день в делах?`,`О, как раз хотела узнать, как у тебя идут дела.`],
    formal:[`Добрый день. Есть ли новости, которыми ты хотел бы поделиться?`,`Здравствуйте. Удобно ли тебе сейчас поговорить?`,`Рада встрече. Как продвигаются твои планы?`],
    wise:[`Иногда полезно сделать паузу. Как у тебя прошёл день?`,`Рада нашей встрече. Есть ли мысль, которой ты хотел бы поделиться?`,`Здравствуй. Что нового ты узнал с нашей последней встречи?`],
    direct:[`Привет. Что сегодня у тебя на уме?`,`Ты вовремя. Есть что обсудить?`,`Как дела? Надеюсь, без неприятных сюрпризов.`],
    bright:[`Привет! Какой сегодня повод для хорошего настроения?`,`О, рада тебя видеть! Есть новости или просто заглянул?`,`Как раз думала, чем заняться после дел. Какие планы?`],
    mysterious:[`Ты снова здесь… Любопытно, что привело тебя сегодня?`,`Иногда случайные встречи оказываются самыми интересными. Как настроение?`,`У меня появилось одно наблюдение. Хочешь услышать?`]
  };
  const firstLines=first
    ? [`Привет. Я ${char.name}. Кажется, мы раньше не встречались. Как тебя зовут?`,`Здравствуй. Меня зовут ${char.name}. Ты недавно в Конохе?`,`О, новый знакомый! Я ${char.name}. Что привело тебя сюда?`]
    : (fresh[char.style]||fresh.warm);
  const line=personalized
    ? `Кстати, я помню, ты говорил, что ${familiar.value}. Как у тебя с этим сейчас?`
    : choose(firstLines,replySeed(state,char,'opening',`${dayPart}:${minute}`,meta));
  state.dialogueMeta[char.id]={...meta,lastNpcInitiationDay:day,lastNpcInitiationMinute:minute,lastNpcReply:line,pendingQuestion:/[?？]/.test(line)?line:'',lastNpcQuestion:/[?？]/.test(line)?line:'',...(personalized?{lastFactMentionDay:day}:{})};
  return line;
}

function performConversationAction(state,char,action) {
  const bond=getBond(state,char.id);
  const irritated=(bond.irritation||0)>=28;
  state.dialogueMeta ||= {};
  const meta=state.dialogueMeta[char.id]||{};
  const history=meta.actionHistory||{};
  const previous=history[action];
  const cooldown=action==='hug'?180:action==='hug-unasked'?0:45;
  const onCooldown=Boolean(previous && previous.day===state.world.day && state.world.minute-previous.minute<cooldown);
  let playerText='',reply='',delta={friendship:0,trust:0,respect:0,irritation:0};
  if (action==='wave') {
    playerText='Я дружелюбно машу тебе рукой.';
    reply=choose(['Она замечает жест и приветливо машет в ответ. «Привет! Хорошо, что заглянул».','Она улыбается и кивает в ответ: «Рада тебя видеть».','Она поднимает руку в ответ на приветствие. «Как настроение?»'],hash(`${char.id}:${action}:${state.world.minute}`));
    delta={friendship:1,trust:0,respect:0,irritation:0};
  } else if (action==='handshake') {
    playerText='Я предлагаю тебе рукопожатие.';
    if (irritated) reply='Она спокойно отказывается от рукопожатия: «Сейчас мне нужно немного пространства. Давай сначала уладим наше недоразумение».';
    else {reply=choose(['Она пожимает руку. «Договорились. Приятно иметь дело с человеком, который уважает слово».','Она отвечает на рукопожатие и слегка улыбается. «Похоже, мы начинаем понимать друг друга».','Она принимает рукопожатие. «Хороший знак. Надеюсь, впереди у нас немало совместных дел».'],hash(`${char.id}:${action}:${bond.meetings}`));delta={friendship:1,trust:1,respect:1,irritation:0};}
  } else if (action==='highfive') {
    playerText='Я предлагаю тебе дать пять.';
    if (irritated) reply='Она смотрит на поднятую ладонь, но не отвечает на жест: «Я пока не в настроении для шуток».';
    else {reply=choose(['Она с улыбкой даёт пять. «Вот это настрой!»','Она легко касается ладонью твоей. «Отлично сработано!»','Она отвечает на жест и смеётся: «Считай, договорились!»'],hash(`${char.id}:${action}:${bond.friendship}`));delta={friendship:2,trust:0,respect:0,irritation:0};}
  } else if (action==='hug') {
    playerText='Я спрашиваю, можно ли тебя по-дружески обнять.';
    if (irritated) reply='Она мягко качает головой: «Спасибо, что спросил, но сейчас мне нужно пространство. Давай пока просто поговорим».';
    else if ((bond.friendship||0)>=20 && (bond.trust||0)>=15) {reply=choose(['Она на мгновение задумывается, затем соглашается на короткое дружеское объятие. «Спасибо. Это было кстати».','Она кивает и отвечает на объятие. «Мне приятно, что ты сначала спросил».','Она принимает дружеское объятие и чуть улыбается. «Иногда поддержка важнее слов».'],hash(`${char.id}:${action}:${bond.meetings}`));delta={friendship:2,trust:2,respect:0,irritation:0};}
    else reply='Она доброжелательно улыбается, но пока отказывается: «Спасибо, что спросил. Давай узнаем друг друга получше, а пока просто поболтаем».';
  } else if (action==='hug-unasked') {
    playerText='Я пытаюсь обнять тебя без предварительного вопроса.';
    reply='Она делает шаг назад, сохраняя спокойствие: «Пожалуйста, сначала спроси, комфортно ли мне. Я сама решу, соглашаться ли на объятие».';
    delta={friendship:0,trust:-1,respect:0,irritation:3};
  } else {
    const entry=CONVERSATION_ACTIONS.find(item=>item.id===action);
    if (entry) {
      playerText=entry.playerText;
      if (irritated && !['give-space','say-goodbye','farewell-wave'].includes(action)) {
        reply=`${char.name} вежливо отказывается сейчас участвовать: «Мне нужно немного пространства. Давай вернёмся к этому позже».`;
      } else {
        const replies=ACTION_REPLY_BANK[entry.group] || [];
        reply=choose(replies,hash(`${char.id}:${action}:${state.world.day}:${state.world.minute}`)).replaceAll('${char.name}',char.name);
      }
    } else {
      playerText='Я предлагаю продолжить разговор.';
      reply=`${char.name} кивает: «Конечно. О чём хочешь поговорить?»`;
    }
  }
  if (onCooldown && action!=='hug-unasked') {
    delta={friendship:0,trust:0,respect:0,irritation:0};
    reply=choose([
      `${char.name} улыбается: «Мы только что это делали. Давай сменим занятие, чтобы не превращать встречу в повторение одного жеста».`,
      `${char.name} мягко смеётся: «Не нужно повторять это каждые пару минут. Лучше расскажи, что у тебя нового».`,
      `${char.name} кивает: «Я помню этот жест. Давай теперь поговорим или займёмся чем-нибудь другим».`
    ],replySeed(state,char,'action-cooldown',action,meta));
  }
  if (delta.friendship||delta.trust||delta.respect||delta.irritation) updateBond(state,char.id,delta,{countMeeting:false});
  const actionHistory={...history,[action]:{day:state.world.day,minute:state.world.minute}};
  state.dialogueMeta[char.id]={...meta,actionHistory};
  tickAction(state,3);
  return {playerText,reply,bond:getBond(state,char.id),action,onCooldown};
}

function firstMeetReply(char,kind,raw,state) {
  const clean = normalize(raw);
  const playerName = String(state.player?.name || '').trim();
  const nameMatch = raw.match(/(?:меня зовут|зови меня|можно просто звать|можешь звать меня)\s+([А-ЯЁа-яё-]{2,24})/i) || raw.match(/(?:для друзей я|мое имя|моё имя|я)\s*[:—-]?\s*([А-ЯЁа-яё-]{2,24})/i);
  const introducedName = nameMatch?.[1] || playerName;
  const introduced = /меня зовут|зови меня|можно просто звать|можешь звать меня|я по имени|представлюсь|представиться|хочу представиться|меня обычно называют|давай познакомимся|давай знакомиться|позволь представиться|для друзей я|мое имя|моё имя|я [а-яё-]{2,24}, приятно познакомиться|позволь назвать свое имя|позволь назвать своё имя/i.test(clean);
  if (introduced) {
    state.knownNames ||= {};
    state.knownNames[char.id] = introducedName || true;
    return `Приятно познакомиться, ${introducedName || 'рада знакомству'}. Я ${char.name}. ${choose([
      'Ты недавно в Конохе?', 'Ты здесь по делам или просто осматриваешь деревню?', 'Что привело тебя сюда?'
    ],hash(`${char.id}:${kind}:${raw}:${state.world.day}:${state.world.minute}`))}`;
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
  if (kind==='followup') return `${selfIntro} Мы только начали разговор, поэтому я пока не знаю контекст. Уточни, пожалуйста, о какой ситуации речь.`;
  return `${selfIntro} ${answer} Мы ещё не знакомы — как тебя зовут?`;
}
function firstMeetAnswer(char,kind,raw,state) {
  const place=getNpcLocation(state,char.id);
  const placeName=place?getLocation(place).name:'за пределами деревни';
  const weather={sunny:'Сегодня довольно ясно.',cloudy:'Небо затянуто облаками.',rain:'Идёт дождь, так что я стараюсь держаться под крышей.',snow:'Снегопад сегодня заметный.',wind:'На улице ветрено.',fog:'Сегодня в деревне туманно.'}[state.world.weather] || 'Погода сегодня переменчивая.';
  const exactExpanded=EXPANDED_DIALOGUE_LOOKUP.get(normalize(raw).replace(/[!?.,;:…]+$/g,'').replace(/\s+/g,' '))===kind;
  const expanded=exactExpanded || !INTENTS.some(([intent])=>intent===kind) ? expandedReplyFor(char,kind,raw,state,{}) : '';
  if (expanded) return expanded;
  switch(kind) {
    case 'howAre': return choose(['Спасибо, у меня всё довольно спокойно. День ещё не закончился, так что посмотрим, что будет дальше. А у тебя как?','Нормально, немного устала после дел, но ничего серьёзного. Ты как?','Всё в порядке, спасибо, что спросил. Сегодня много обычных забот.'],hash(char.id+raw+'first-howare'));
    case 'help': return 'Спасибо за предложение. Сначала расскажи, чем именно можешь помочь — я не люблю поручать дела наугад.';
    case 'gift': return 'Спасибо. Не ожидала подарка от человека, с которым только познакомилась, но внимание приятно.';
    case 'interests': return `В свободное время я обычно выбираю ${char.likes?.slice(0,2).join(' и ') || 'что-нибудь спокойное'}. А чем любишь заниматься ты?`;
    case 'food': return char.likes?.some(item=>/рамен|кулинар|еда|чай/i.test(item)) ? 'Я люблю хорошую еду. В Ичираку готовят неплохо — ты уже заходил туда?' : 'Сейчас можно сделать перерыв. Ты уже пробовал местную лапшу или предпочитаешь что-то другое?';
    case 'train': return 'Тренировка — неплохая идея. Сначала посмотрим, какой у тебя уровень подготовки, и выберем безопасное упражнение.';
    case 'weather': return `${weather} Ты давно в Конохе?`;
    case 'venueRumor': return 'Слышала о небольшом зале «Лунный фонарь» в переулке за рынком. Там устраивают открытые музыкальные выступления, танцевальные занятия и творческие вечера. Я видела афишу у главной улицы. Ты любишь живую музыку?';
    case 'question': {
      const q=normalize(raw);
      if (/кто ты|как тебя зовут|имя/.test(q)) return `Я ${char.name}. Работаю здесь и занимаюсь своими обычными делами. А ты?`;
      if (/почему|зачем/.test(q)) return 'Тут всё зависит от обстоятельств. Уточни, пожалуйста, что именно тебя интересует, и я отвечу точнее.';
      if (/что думаешь|как считаешь|мнение/.test(q)) return 'У меня есть своё мнение, но я не хочу гадать без контекста. О какой ситуации говорим?';
      return 'Хороший вопрос. Я не уверена, что правильно поняла, о чём речь. Уточни, пожалуйста, что именно тебя интересует?';
    }
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
  const meta=state.dialogueMeta?.[char.id] || {};
  const seed=replySeed(state,char,kind,raw,meta);
  const address=known && bond.friendship>=35 ? `, ${state.player.name}` : '';
  const hasRecentMeetup=state.world.lastMeetup?.characterId===char.id && state.world.lastMeetup.day===state.world.day;
  if (firstMeet) return firstMeetReply(char,kind,raw,state);
  if (mood==='angry' && !['apology','farewell','boundary','privacy','danger'].includes(kind)) {
    return choose([
      'Сейчас я не хочу продолжать этот разговор. После того, как ты извинишься, возможно, мы сможем поговорить.',
      'Ты уже переходил границы. Скажи, зачем пришёл, и не трать моё время.',
      'Мне не нравится, как ты со мной разговариваешь. На сегодня хватит.'
    ],seed);
  }
  if (mood==='cold' && !['apology','farewell','boundary','privacy','danger'].includes(kind) && !['warm','gentle'].includes(char.style)) {
    return choose(['Слушаю. Только давай без лишних слов — что ты хотел?','Я пока не уверена, что могу тебе доверять. Говори по делу.','Не обещаю, что соглашусь, но можешь объяснить.'],seed);
  }
  if (kind==='followup') return recentContextReply(char,raw,state,state.dialogueMeta?.[char.id] || {});
  const exactExpanded=EXPANDED_DIALOGUE_LOOKUP.get(normalize(raw).replace(/[!?.,;:…]+$/g,'').replace(/\s+/g,' '))===kind;
  const expanded=exactExpanded || !INTENTS.some(([intent])=>intent===kind) ? expandedReplyFor(char,kind,raw,state,bond,meta) : '';
  if (expanded) return expanded;
  switch(kind) {
    case 'venueRumor': return 'Да, в Конохе появился небольшой музыкальный зал «Лунный фонарь». Там проходят открытые концерты, занятия танцами и творческие вечера — без особых правил, просто место для музыки и выступлений. Я видела афишу у главной улицы. Хочешь однажды заглянуть?';
    case 'howAre': {
      if (mood==='angry') return 'Не лучший момент, если честно. Мне нужно немного времени, чтобы остыть.';
      if (mood==='low' || mood==='cold') return 'День идёт обычно. Спасибо, что спросил. А у тебя что нового?';
      if (mood==='warm' || mood==='familiar') return choose(['Неплохо. Сегодня было много дел, но сейчас стало поспокойнее. А ты как?','В целом хорошо. Рада, что нашлось время передохнуть и поговорить. Как сам?','Уже лучше, особенно после небольшой передышки. А у тебя день как проходит?'],seed);
      return choose(['Всё нормально, спасибо. А у тебя?','Пока спокойно. Есть пара дел на сегодня, но ничего срочного.','Неплохо. Немного устала, но это обычный день.'],seed);
    }
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
      return greetings[char.style] || choose(['Здравствуйте. Что привело тебя сюда?','Привет. Как у тебя дела?','Добрый день. Ты по какому-то делу?'],seed);
    }
    case 'introduce': return known ? `Мы уже знакомы, ${state.player.name}. Я ${char.name}. Что хотел рассказать?` : `Приятно познакомиться. Я ${char.name}. Чем сейчас занимаешься в Конохе?`;
    case 'askName': return choose([`Я ${char.name}. Рада, что ты решил уточнить, а не гадать.`,`Меня зовут ${char.name}. Надеюсь, теперь запомнишь.`,`Я ${char.name}. Можешь обращаться ко мне по имени.`],seed);
    case 'apology': return bond.irritation>0 ? choose(['Ладно, я услышала. Но мне важно увидеть, что ты действительно сделал выводы.','Спасибо за извинения. Мне понадобится немного времени, чтобы снова расслабиться рядом с тобой.','Я принимаю твои слова. Давай посмотрим, изменится ли что-нибудь дальше.'],seed) : choose(['Спасибо, что сказал это прямо. Давай постараемся не повторять ту же ситуацию.','Я ценю, что ты признал ошибку. Можем спокойно двигаться дальше.','Хорошо, что ты решил поговорить об этом. Главное — сделать выводы.'],seed);
    case 'promiseCancel': return choose(['Поняла. Спасибо, что предупредил заранее. Я пересмотрю свои ожидания.','Жаль, что не получится, но честное предупреждение лучше пустых обещаний.','Хорошо, давай изменим план. Главное — сообщать о таких вещах вовремя.'],seed);
    case 'promise': return choose(['Хорошо. Я запомню, но не буду считать обещание выполненным, пока не увижу результат.','Договорились. Для меня важнее надёжные поступки, чем красивые слова.','Спасибо. Буду рассчитывать на тебя, но оставим немного места для непредвиденных обстоятельств.'],seed);
    case 'help': { const helpLines={warm:'Спасибо, помощь действительно пригодится. Давай решим, что сделать первым.',gentle:'Это очень кстати. Можешь помочь с одной небольшой задачей?',sharp:'Возможно. Только не хватайся за всё сразу — сначала уточним, что требуется.',formal:'Благодарю за предложение. Назову конкретную задачу, чтобы не тратить твоё время.',quiet:'Спасибо. Если не сложно, помоги мне с одной вещью.',playful:'О, доброволец? Тогда посмотрим, насколько ты надёжен. Начнём с простого.',direct:'Хорошо. Возьми на себя конкретную часть работы, остальное я сделаю сама.'}; return helpLines[char.style] || 'Возможно, помощь пригодится. Сначала уточним, что именно нужно сделать.'; }
    case 'gift': return state.ui?.lastGiftGiven ? (char.style==='quiet'||char.style==='gentle' ? 'Спасибо. Я не всегда умею сразу подобрать слова, но мне правда приятно.' : char.style==='sharp' ? 'Спасибо. Не думай, что подарками можно решить любой вопрос, но жест я ценю.' : 'Спасибо. Это очень внимательный жест. Я сохраню подарок.') : 'Ты говоришь о подарке, но пока ничего не передал. Не нужно торопиться — важнее само внимание.';
    case 'invite':
      if (mood==='angry') return 'Нет. Сейчас я не хочу проводить с тобой время.';
      if (mood==='neutral' || mood==='cold') return 'Мы пока не так хорошо знакомы. Давай сначала поговорим здесь.';
      return hasRecentMeetup ? 'Мы уже гуляли сегодня. Давай не будем торопиться и выберем другой день.' : choose(['Можно. Я как раз хотела немного пройтись.','Давай, но без спешки. Куда ты предлагаешь пойти?','Хорошая мысль. Я закончу дела и присоединюсь.'],seed);
    case 'train': return char.style==='playful' || char.style==='bold' ? 'Наконец-то предложение по делу. Покажи, что умеешь.' : char.style==='quiet' || char.style==='gentle' ? 'Давай начнём спокойно с разминки и контроля чакры. Не стоит торопиться.' : char.style==='formal' ? 'Сначала определим цель тренировки, затем выберем подходящее упражнение.' : 'Хорошо. Начнём с разминки и простого упражнения, затем усложним.';
    case 'challenge': { const lines={playful:'Вот это уже интереснее. Только потом не говори, что я не предупреждала.',bold:'Принимаю. Выбирай испытание, но правила должны быть честными.',quiet:'Я предпочитаю командные упражнения соревнованию, но могу попробовать, если всё будет безопасно.',gentle:'Можно устроить дружеское состязание. Главное — без риска и обид.',formal:'Сначала определим условия, критерии и границы упражнения. Тогда согласна.',sharp:'Принимаю, если у тебя есть конкретное предложение, а не просто громкие слова.',direct:'Хорошо. Выбирай испытание и обозначь правила.'}; return lines[char.style] || 'Принимаю. Только договоримся о правилах заранее — так будет честно.'; }
    case 'lead': return char.style==='sharp' || char.style==='direct' ? 'План понятен. Посмотрим, насколько хорошо он сработает.' : 'Хорошо, я возьму на себя свою часть. Держи меня в курсе.';
    case 'defer': return 'Тогда я выберу вариант, который не создаст лишних проблем. Если передумаешь — скажи.';
    case 'memory': {
      const facts=meta.playerFacts||{};
      if (/обо мне|что я люблю|что мне нравится|моя мечта|чего я хочу|что ты помнишь/.test(clean)) {
        const entries=[];
        if(facts.likes) entries.push(`тебе нравится ${facts.likes}`);
        if(facts.goal) entries.push(`твоя цель — ${facts.goal}`);
        if(facts.pet) entries.push(`у тебя есть ${facts.pet}`);
        if(facts.home) entries.push(`ты приехал из ${facts.home}`);
        if(facts.work) entries.push(`ты работаешь ${facts.work}`);
        if (entries.length) return `Конечно, я кое-что запомнила: ${entries.join('; ')}. Я ничего не перепутала?`;
      }
      const memory=(state.memories[char.id]||[]).find(item=>item.kind==='notable' && item.day <= state.world.day);
      return memory ? `Помню, как мы ${memory.text}. Тогда это действительно имело значение. Ты тоже это вспоминаешь?` : 'Пока у нас не так много общих воспоминаний. Есть момент, который ты хотел бы сохранить в памяти?';
    }
    case 'joke': { const lines=char.style==='sharp' || char.style==='bold' ? ['Ха. Ладно, это было неплохо. Не думай, что я так легко рассмеюсь второй раз.','Неплохо придумано. Но в следующий раз постарайся удивить меня сильнее.','Хм, засчитано. Хотя я всё ещё считаю, что могла бы пошутить лучше.'] : char.style==='quiet' || char.style==='formal' ? ['Неожиданная шутка. Уголки губ всё-таки дрогнули.','Это оказалось забавнее, чем я ожидала. Спасибо за улыбку.','Хорошая попытка. Я даже на секунду забыла о делах.'] : ['Ха-ха, ладно, это меня рассмешило.','Вот теперь настроение стало лучше. Есть ещё что-нибудь забавное?','Умеешь поднять настроение. Эту историю я запомню.']; return choose(lines,seed); }
    case 'kind': { const lines=mood==='warm' ? ['Спасибо. От тебя такие слова особенно приятно слышать.','Мне очень приятно это слышать. Я тоже ценю наше общение.','Ты умеешь поддержать в нужный момент. Спасибо.'] : ['Спасибо. Хорошо, когда замечают не только ошибки.','Это добрые слова. Я постараюсь оправдать такое доверие.','Приятно, что ты это заметил. Спасибо за поддержку.']; return choose(lines,seed); }
    case 'compliment': { const lines=mood==='warm' ? ['Ты умеешь подобрать слова. Спасибо, мне приятно.','От тебя особенно приятно это слышать.','Ты заметил то, над чем я действительно старалась. Спасибо.'] : ['Спасибо. Немного смущает, но я ценю искренность.','Это очень любезно с твоей стороны. Я рада, что результат заметен.','Благодарю. Главное, что работа действительно принесла пользу.']; return choose(lines,seed); }
    case 'disagree': return char.style==='bold' || char.style==='sharp' ? choose(['Не согласна — и готова объяснить почему. Давай сравним аргументы.','Тогда приведи свои доводы. Я не против спора, если он честный.','Возможно, мы смотрим на разные стороны ситуации. Давай проверим факты.'],seed) : choose(['Хорошо, у нас разные взгляды. Объясни, что именно тебя не убеждает.','Я не настаиваю на своей правоте. Давай спокойно разберём оба варианта.','Интересно, почему ты так считаешь? Возможно, мы упустили разные детали.'],seed);
    case 'plan': return choose([`Давай начнём с конкретики. Что важнее всего: ${char.likes?.[0] || 'главная задача'} или что-то другое?`,`Предлагаю сначала определить цель, а потом распределить шаги. С чего начнём?`,`Давай выберем приоритет. Что нужно решить в первую очередь?`],seed);
    case 'where': { const loc=getNpcLocation(state,char.id); return loc ? `Сейчас я в районе «${getLocation(loc).name}». Если ты поблизости, можем пересечься.` : 'Сейчас я за пределами деревни. Когда вернусь, сообщу.'; }
    case 'schedule': return choose(['Планы на весь день я обычно не расписываю. Сейчас занимаюсь своими делами, а дальше посмотрим.','Пока не решила, как пройдёт остаток дня. Не люблю обещать заранее.','Есть несколько личных дел, но точного расписания у меня нет.'],seed);
    case 'comfort': { const lines={sharp:'Не люблю пустые утешения. Расскажи, что случилось, и подумаем, что можно сделать.',direct:'Что именно произошло? Давай разберём проблему по пунктам.',quiet:'Мне жаль, что тебе тяжело. Можем просто немного посидеть, если не хочется говорить.',gentle:'Мне жаль, что день выдался таким. Хочешь рассказать подробнее? Я выслушаю.',warm:'Не держи всё в себе. Расскажи, что случилось — попробуем найти выход.',formal:'Если хочешь, я помогу спокойно разобрать ситуацию и определить следующий шаг.',playful:'Не обещаю мгновенно исправить весь мир, но выслушать точно могу.',wise:'Иногда полезно сначала назвать то, что тревожит. Давай начнём с этого.'}; return lines[char.style] || 'Мне жаль, что день выдался таким. Хочешь рассказать подробнее? Я выслушаю.'; }
    case 'pet': { const lines=char.style==='warm' || char.style==='gentle' ? ['Люблю животных. Они часто чувствуют настроение лучше людей. Как зовут твоего питомца?','С животными легко найти общий язык, если относиться к ним терпеливо. У тебя кто-нибудь живёт дома?','Мне нравится, как питомцы умеют радоваться простым вещам. Ты уже выбрал себе любимца?'] : ['Животные требуют заботы и терпения. Ты уже завёл кого-нибудь?','Питомец — это ответственность, а не украшение. Сначала стоит узнать его привычки и потребности.','Я отношусь к животным с уважением. Думаешь завести питомца или просто любишь за ними наблюдать?']; return choose(lines,seed); }
    case 'food': { const lines=liked || char.likes?.includes('рамен') ? ['Тогда нам стоит заглянуть в Ичираку. Я знаю, что там готовят хорошо.','О, это мне по душе. В Ичираку можно найти что-нибудь подходящее.','Звучит аппетитно. Я как раз знаю одно хорошее место неподалёку.'] : ['Я не против перекусить. Ты уже выбрал место?','Можно устроить небольшой перерыв. Что бы ты хотел попробовать?','После дел иногда полезно спокойно поесть. Есть идеи, куда зайти?']; return choose(lines,seed); }
    case 'weather': { const weatherLines={rain:['Дождь усилился. Я бы предпочла переждать его под крышей.','После такого дождя улицы станут скользкими. Лучше идти осторожно.','Люблю запах после дождя, но сейчас лучше укрыться.'],snow:['Снег сегодня красивый, но на дорогах скользко.','Зимой в деревне особенно тихо. Только не забудь тёплую одежду.','Снег укрыл крыши, и улицы выглядят совсем иначе.'],sunny:['Погода располагает к прогулке. Главное — не забыть о делах.','Такой ясный день поднимает настроение. Хорошо бы ненадолго выйти на улицу.','Солнце сегодня особенно яркое. Отличный повод немного проветриться.'],default:['Погода переменчивая. Посмотрим, что будет ближе к вечеру.','Небо сегодня меняется на глазах. Лучше быть готовыми к любому варианту.','Пока погода терпимая. Надеюсь, к вечеру не испортится.']}; return choose(weatherLines[state.world.weather] || weatherLines.default,seed); }
    case 'work': return `В Конохе можно найти подработку в разных местах. Я бы посоветовала начать с того, что у тебя получается лучше всего — ${char.likes?.[0] || 'помощи жителям'}.`;
    case 'interests': return `Мне действительно нравятся ${char.likes?.slice(0,3).join(', ') || 'спокойные занятия'}. Особенно ${char.likes?.[0] || 'то, чем можно заняться с пользой'}. А что интересно тебе?`;
    case 'boundary': return mood==='angry' ? 'Я уже говорила, что не хочу обсуждать такое. Если не сменишь тему, я уйду.' : 'Мне некомфортны такие вопросы. Давай сменим тему и поговорим уважительно.';
    case 'insult': return 'Не разговаривай со мной так. Я не собираюсь продолжать этот разговор, пока ты не изменишь тон.';
    case 'farewell': return mood==='warm' ? choose(['До встречи. Напиши, когда доберёшься домой.','Хорошо провели время. Увидимся в следующий раз.','Береги себя. Буду рада продолжить разговор позже.'],seed) : choose(['До встречи. У меня ещё остались дела.','Удачи тебе. Надеюсь, скоро снова пересечёмся.','Хорошего дня. Не забывай отдыхать между заданиями.'],seed);
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
      if (/кто ты|как тебя зовут|как тебя называют/.test(clean)) return `Я ${char.name}. Сейчас я ${char.role.toLowerCase()}. А ты хотел узнать что-то ещё?`;
      if (/как думаешь|что думаешь|как считаешь|твоё мнение|твое мнение/.test(clean)) return `Я бы не стала делать вывод сразу. ${char.likes?.[0] ? `Обычно я обращаю внимание на ${char.likes[0]}.` : 'Лучше сначала разобраться в обстоятельствах.'} Что именно произошло?`;
      if (liked) return `Ты спросил про ${liked}. Для меня это важно, хотя я не всегда нахожу время заниматься этим так часто, как хотелось бы.`;
      return choose(['Сложно ответить без контекста. Что именно ты хочешь узнать?','У меня есть своё мнение, но сначала уточни, о какой ситуации говоришь.','Могу рассказать, но хочу понять, что именно тебя интересует.'],seed);
    default:
      if (liked) return `Ты упомянул ${liked}. Да, это одна из тем, в которых я разбираюсь. Что именно тебя интересует?`;
      return choose(['Поняла. И что ты собираешься делать дальше?','Я услышала. Можешь объяснить, почему решил поступить именно так?','Хм. Мне нужно немного подумать. Ты хочешь узнать моё мнение или просто поделился новостью?'],seed);
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
  const gestureActions={gestureHugRequest:'hug',gestureHugUnasked:'hug-unasked',gestureHandshake:'handshake',gestureHighfive:'highfive',gestureWave:'wave'};
  if (gestureActions[kind]) {
    const actionResult=performConversationAction(state,char,gestureActions[kind]);
    return {kind,reply:actionResult.reply,bond:actionResult.bond,usedText:raw,knownName:Boolean(state.knownNames?.[char.id]),action:gestureActions[kind]};
  }
  const before=getBond(state,char.id);
  const firstMeet=before.meetings===0;
  const knownName=Boolean(state.knownNames?.[char.id]);
  if (kind==='venueRumor') {
    state.discoveredLocations ||= [];
    if (!state.discoveredLocations.includes('music-hall')) {
      state.discoveredLocations.push('music-hall');
      addFeed(state,'Из разговора ты узнал о музыкальном зале «Лунный фонарь». Новая точка появилась на карте Конохи.');
    }
  }
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
  const introMatch=/меня зовут|зови меня|можно просто звать|можешь звать меня|я по имени|представлюсь|представиться|хочу представиться|меня обычно называют|давай познакомимся|давай знакомиться|позволь представиться|для друзей я|мое имя|моё имя|я [а-яё-]{2,24}, приятно познакомиться|позволь назвать свое имя|позволь назвать своё имя/i.test(normalize(raw));
  if (introMatch) { const stated=raw.match(/(?:меня зовут|зови меня|можно просто звать)\s+([А-ЯЁа-яё-]{2,24})/i)?.[1]; state.knownNames[char.id]=stated || state.player.name || true; }
  else if (knownName && normalize(raw).includes(normalize(state.player.name))) state.knownNames[char.id]=state.knownNames[char.id] || state.player.name;
  state.ui.lastGiftGiven = Boolean(kind==='gift' && gift);
  const capturedFact=capturePlayerFact(raw,meta,kind);
  if (capturedFact) meta.playerFacts=capturedFact.playerFacts;
  const contextualAnswer=(!capturedFact && ['default','question'].includes(kind)) ? pendingQuestionReply(char,raw,meta,state,bond) : '';
  let reply=repeatedGreeting
    ? 'Мы совсем недавно уже поздоровались. Ты хотел что-то обсудить?'
    : capturedFact ? playerFactAcknowledgement(char,capturedFact,replySeed(state,char,'fact',raw,meta))
    : contextualAnswer || (firstMeet ? firstMeetReply(char,kind,raw,state) : responseFor(char,kind,raw,state,bond,false));
  if (firstMeet && !state.knownNames?.[char.id] && (capturedFact || contextualAnswer) && !/как тебя зовут|как мне тебя называть|как к тебе обращаться/i.test(reply)) reply += ' Кстати, как мне тебя называть?';
  reply=ensureNpcQuestion(reply,char,kind,raw,state,meta);
  const recent = [...(meta.recent || []),{player:raw,npc:reply,kind,day:state.world.day,minute:state.world.minute}].slice(-8);
  const lastQuestion=(reply.match(/[^?？]*[?？]/g)||[]).at(-1)||'';
  state.dialogueMeta[char.id]={...meta,lastKind:kind,lastMinute:state.world.minute,lastDay:state.world.day,lastEncounterKey:encounterKey,lastPlayerText:raw,lastNpcReply:reply,lastNpcQuestion:lastQuestion.trim(),pendingQuestion:lastQuestion.trim(),recent,turnCount:(meta.turnCount||0)+1,...(kind==='greet'&&!repeatedGreeting?{lastGreetDay:state.world.day,lastGreetMinute:state.world.minute}:{})};
  const memory=memoryFor(kind,raw);
  if(memory) addMemory(state,char.id,memory);
  state.ui.targetId=char.id;
  state.ui.pendingGiftId=null;
  return {kind,reply,bond,usedText:raw,knownName:Boolean(state.knownNames[char.id])};
}

return { analyzeText, npcOpeningLine, performConversationAction, talkToCharacter };
},
"src/core/achievements.js": function(__require) {

const ACHIEVEMENTS = [
  {id:'first-day',title:'Добро пожаловать в Коноху',desc:'Начни свою историю в деревне.',icon:'🌸',points:5,group:'История',goal:1,progress:s=>({value:s.started?1:0,target:1})},
  {id:'first-steps',title:'Первый маршрут',desc:'Посети три разные локации.',icon:'👣',points:10,group:'Исследование',goal:3,progress:s=>({value:new Set(s.visitedLocations||[]).size,target:3})},
  {id:'wanderer',title:'Знаю каждый переулок',desc:'Посети 12 разных локаций.',icon:'🗺️',points:25,group:'Исследование',goal:12,progress:s=>({value:new Set(s.visitedLocations||[]).size,target:12})},
  {id:'map-master',title:'Картограф Конохи',desc:'Посети 20 разных локаций.',icon:'🧭',points:50,group:'Исследование',goal:20,progress:s=>({value:new Set(s.visitedLocations||[]).size,target:20})},
  {id:'first-friend',title:'Новое знакомство',desc:'Познакомься с первым персонажем.',icon:'🤝',points:10,group:'Общение',goal:1,progress:s=>({value:(s.metCharacters||[]).length,target:1})},
  {id:'social-circle',title:'Большой круг общения',desc:'Познакомься с десятью персонажами.',icon:'💬',points:30,group:'Общение',goal:10,progress:s=>({value:(s.metCharacters||[]).length,target:10})},
  {id:'good-conversation',title:'Есть о чём поговорить',desc:'Отправь 25 реплик в личных диалогах.',icon:'🗨️',points:20,group:'Общение',goal:25,progress:s=>({value:Object.values(s.dialogues||{}).flat().filter(x=>x.from==='player').length,target:25})},
  {id:'close-friend',title:'Надёжный товарищ',desc:'Достигни 50 дружбы с одним персонажем.',icon:'💚',points:25,group:'Общение',goal:50,progress:s=>({value:Math.max(0,...Object.values(s.bonds||{}).map(x=>x.friendship||0)),target:50})},
  {id:'trusted-friend',title:'Доверие заслуживают',desc:'Достигни 60 доверия с одним персонажем.',icon:'🫶',points:35,group:'Общение',goal:60,progress:s=>({value:Math.max(0,...Object.values(s.bonds||{}).map(x=>x.trust||0)),target:60})},
  {id:'team-up',title:'Команда собирается',desc:'Пригласи первого спутника в ближний круг.',icon:'⚔️',points:20,group:'Команда',goal:1,progress:s=>({value:(s.companions||[]).length,target:1})},
  {id:'pet-friend',title:'Пушистый напарник',desc:'Заведи питомца.',icon:'🐾',points:15,group:'Повседневность',goal:1,progress:s=>({value:(s.pets||[]).length,target:1})},
  {id:'pet-bond',title:'Лучший друг человека',desc:'Подними привязанность питомца до 80.',icon:'🐕',points:25,group:'Повседневность',goal:80,progress:s=>({value:Math.max(0,...(s.pets||[]).map(x=>x.affection||0)),target:80})},
  {id:'first-shift',title:'Честный заработок',desc:'Отработай пять смен.',icon:'🧺',points:20,group:'Повседневность',goal:5,progress:s=>({value:s.player?.workShiftsTotal||0,target:5})},
  {id:'craft-starter',title:'Умелые руки',desc:'Подними навык ремесла до второго уровня.',icon:'🧵',points:15,group:'Развитие',goal:2,progress:s=>({value:s.skills?.craft?.level||1,target:2})},
  {id:'skillful',title:'Первые мастерства',desc:'Подними любые три навыка до третьего уровня.',icon:'📚',points:35,group:'Развитие',goal:3,progress:s=>({value:Object.values(s.skills||{}).filter(x=>(x.level||1)>=3).length,target:3})},
  {id:'daily-reader',title:'Заметки на полях',desc:'Прочитай три страницы секретного альманаха.',icon:'📖',points:25,group:'Коллекция',goal:3,progress:s=>({value:(s.collectibles?.readPages||[]).length,target:3}),hidden:true},
  {id:'secret-reader',title:'Тайный читатель',desc:'Найди секретный альманах в библиотеке.',icon:'🔎',points:20,group:'Коллекция',goal:1,progress:s=>({value:s.collectibles?.magazineFound?1:0,target:1}),hidden:true},
  {id:'all-issues',title:'Полное собрание',desc:'Собери все три выпуска альманаха.',icon:'📚',points:50,group:'Коллекция',goal:3,progress:s=>({value:(s.collectibles?.unlockedIssues||[]).length,target:3}),hidden:true},
  {id:'ten-days',title:'Привычка к деревне',desc:'Доживи до десятого дня истории.',icon:'🌅',points:30,group:'История',goal:10,progress:s=>({value:s.world?.day||1,target:10})},
  {id:'renaissance',title:'Человек многих талантов',desc:'Достигни третьего уровня в пяти навыках.',icon:'🏅',points:60,group:'Развитие',goal:5,progress:s=>({value:Object.values(s.skills||{}).filter(x=>(x.level||1)>=3).length,target:5})},
  {id:'secret-path',title:'Не всё на карте отмечено',desc:'Открой хотя бы одну скрытую возможность.',icon:'🌙',points:20,group:'Секреты',goal:1,progress:s=>({value:(s.discoveredLocations||[]).length+(s.collectibles?.magazineFound?1:0)>0?1:0,target:1}),hidden:true}
];

function getAchievementProgress(achievement,state) {
  const raw=achievement.progress?.(state)||{value:0,target:achievement.goal||1};
  const target=Math.max(1,Number(raw.target)||1);
  const value=Math.max(0,Number(raw.value)||0);
  return {value,target,percent:Math.max(0,Math.min(100,Math.round(value/target*100))),done:value>=target};
}

function evaluateAchievements(state) {
  state.achievements ||= {unlocked:[],points:0};
  state.achievements.unlocked ||= [];
  const newly=[];
  for (const achievement of ACHIEVEMENTS) {
    if (state.achievements.unlocked.some(item=>item.id===achievement.id)) continue;
    if (!getAchievementProgress(achievement,state).done) continue;
    const record={id:achievement.id,day:state.world?.day||1,minute:state.world?.minute||0};
    state.achievements.unlocked.push(record);
    state.achievements.points=(state.achievements.points||0)+achievement.points;
    newly.push(achievement);
  }
  return newly;
}

return { ACHIEVEMENTS, getAchievementProgress, evaluateAchievements };
},
"src/data/secret-magazine.js": function(__require) {

const MAGAZINE_ISSUES = [
  {
    id:'issue-01',number:'01',title:'За страницами Конохи',subtitle:'Люди, места и маленькие открытия',
    cover:'assets/backgrounds/library.webp',foundAt:'library',findLabel:'Осмотреть старый стеллаж',
    pages:[
      {id:'01-editorial',title:'Редакторская заметка: город просыпается',image:'assets/backgrounds/konoha-main.webp',author:'Редакция «Листьев»',text:'У каждого города есть два лица: то, которое видно на карте, и то, которое открывается в обычный день. Утренние лавки, шаги по деревянным мосткам, запах свежего хлеба и короткие разговоры у ворот складываются в настоящую историю Конохи. Этот выпуск посвящён именно таким деталям.'},
      {id:'01-craft',title:'Бумага, терпение и точность',image:'assets/backgrounds/library.webp',author:'Заметки о ремесле',text:'Оригами кажется простым лишь со стороны. Хорошая фигурка начинается с ровного листа, точного сгиба и готовности переделать неудачную линию. Попробуй сделать журавлика или маленький лист — это хороший способ успокоить мысли после насыщенного дня.'},
      {id:'01-training',title:'Тренировка без спешки',image:'assets/backgrounds/training-ground.webp',author:'Дневник инструктора',text:'Не каждая тренировка должна заканчиваться рекордом. Иногда полезнее уделить время стойке, дыханию и контролю чакры. Несколько спокойных повторений с вниманием к технике дают больше, чем десяток движений наспех.'}
    ]
  },
  {
    id:'issue-02',number:'02',title:'Голоса вечернего рынка',subtitle:'Кулинария, ремесло и городские привычки',
    cover:'assets/backgrounds/market-street.webp',foundAt:'archive',findLabel:'Проверить папку старых заметок',
    pages:[
      {id:'02-market',title:'Рынок после полудня',image:'assets/backgrounds/market-street.webp',author:'Городская хроника',text:'После полудня рынок меняется: торговцы уже знают постоянных покупателей, дети выбирают сладости, а мастера раскладывают инструменты для вечерней работы. Если не торопиться, можно узнать новости, найти полезные материалы и просто почувствовать ритм деревни.'},
      {id:'02-ramen',title:'Тёплая миска и хороший разговор',image:'assets/backgrounds/ichiraku.webp',author:'Кулинарная колонка',text:'У рамена нет единственного правильного рецепта. Одни любят густой бульон, другие — лёгкий, а третьи считают главным хрустящие добавки. Важнее всего, чтобы за столом было место для беседы и чтобы никто не торопил тебя до последней ложки.'},
      {id:'02-craft',title:'Мастерская Тентен: полезные мелочи',image:'assets/backgrounds/flower-shop.webp',author:'Ремесленная страница',text:'Небольшие вещи часто оказываются самыми нужными: аккуратный футляр для свитка, крепкая застёжка, ровно сложенный дорожный набор. Хорошее ремесло не обязательно выглядит эффектно — оно просто помогает в нужный момент.'}
    ]
  },
  {
    id:'issue-03',number:'03',title:'Тишина перед новым днём',subtitle:'Сады, путешествия и личные истории',
    cover:'assets/backgrounds/river-sunset.webp',foundAt:'tea-house',findLabel:'Поговорить с хозяином чайного домика о старых выпусках',
    pages:[
      {id:'03-garden',title:'Сад как место для передышки',image:'assets/backgrounds/memorial-garden.webp',author:'Колонка о спокойствии',text:'Несколько минут в саду помогают заметить то, что теряется в шуме: как меняется свет, как ветер двигает листья, как постепенно пустеют дорожки. Необязательно искать особый смысл — иногда отдых сам по себе уже полезен.'},
      {id:'03-river',title:'Маршрут к реке',image:'assets/backgrounds/river-sunset.webp',author:'Путевой блокнот',text:'Лучшее время для прогулки у воды — ближе к закату. Возьми с собой чай, проверь погоду и оставь достаточно времени на дорогу обратно. Если встретишь знакомого, не спеши: спокойный разговор иногда становится главным событием дня.'},
      {id:'03-festival',title:'Как устроить маленький праздник',image:'assets/backgrounds/festival-street.webp',author:'Календарь Конохи',text:'Для хорошего вечера не нужны сложные приготовления. Несколько фонарей, простая еда, музыка и люди, которым приятно быть рядом, уже создают атмосферу. Распредели дела заранее и оставь немного места для спонтанности.'}
    ]
  }
];

const getMagazineIssue = id => MAGAZINE_ISSUES.find(issue=>issue.id===id);
const getMagazinePage = id => MAGAZINE_ISSUES.flatMap(issue=>issue.pages).find(page=>page.id===id);

return { MAGAZINE_ISSUES, getMagazineIssue, getMagazinePage };
},
"src/data/pets.js": function(__require) {

const PETS = [
  {id:'konoha-cat',name:'Кот из Конохи',kind:'Кот',icon:'🐈',image:'assets/pets/black-cat.png',price:45,desc:'Любопытный кот, любит тёплые места и наблюдать за улицей.',temperament:'любопытный',likes:['дом','сад','тихие места']},
  {id:'ninja-dog',name:'Щенок-ниндзя',kind:'Собака',icon:'🐕',price:65,desc:'Преданный и энергичный компаньон, которому нужны прогулки.',temperament:'энергичный',likes:['прогулки','тренировки','игры']},
  {id:'white-rabbit',name:'Белый кролик',kind:'Кролик',icon:'🐇',price:35,desc:'Тихий питомец, любит свежую зелень и спокойную обстановку.',temperament:'спокойный',likes:['дом','сад','зелень']},
  {id:'courier-hawk',name:'Почтовый ястреб',kind:'Птица',icon:'🦅',price:90,desc:'Умная птица, помогает доставлять короткие сообщения.',temperament:'независимый',likes:['высота','прогулки','простор']},
  {id:'pond-turtle',name:'Садовая черепаха',kind:'Черепаха',icon:'🐢',price:30,desc:'Невозмутимый питомец для небольшого домашнего сада.',temperament:'неторопливый',likes:['сад','вода','солнце']},
  {id:'tanuki-companion',name:'Тануки',kind:'Енот-полоскун',icon:'🦝',image:'assets/pets/tanuki.png',price:75,desc:'Любопытный лесной сосед, который любит исследовать сумки и коробки.',temperament:'озорной',likes:['исследование','игрушки','ягоды']},
  {id:'red-fox',name:'Лисёнок',kind:'Лиса',icon:'🦊',image:'assets/pets/fox.png',price:85,desc:'Осторожный и умный зверёк. Быстро привыкает к спокойным людям.',temperament:'осторожный',likes:['лес','тишина','прогулки']},
  {id:'black-cat-companion',name:'Чёрный кот',kind:'Кот',icon:'🐈‍⬛',image:'assets/pets/black-cat.png',price:60,desc:'Независимый кот, который сам выбирает, когда приходит за вниманием.',temperament:'независимый',likes:['уют','высокие места','лакомства']},
  {id:'white-cat-companion',name:'Белый кот',kind:'Кот',icon:'🐈',image:'assets/pets/white-cat.png',price:60,desc:'Спокойный и ласковый кот с привычкой засыпать рядом с книгами.',temperament:'мягкий',likes:['книги','сон','поглаживания']},
  {id:'courier-crow',name:'Почтовый ворон',kind:'Птица',icon:'🐦‍⬛',image:'assets/pets/crow.png',price:78,desc:'Сообразительная птица, запоминающая короткие маршруты по деревне.',temperament:'наблюдательный',likes:['высота','блестящие вещи','простор']},
  {id:'pond-frog',name:'Садовая лягушка',kind:'Лягушка',icon:'🐸',image:'assets/pets/frog.png',price:28,desc:'Неприхотливый обитатель маленького пруда. Любит влажную прохладу.',temperament:'неторопливый',likes:['вода','камни','дождь']}
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
"src/core/wardrobe.js": function(__require) {
const { CLOTHING,CLOTHING_BY_ID,CLOTHING_SLOTS,STARTER_CLOTHING,PRESET_EQUIPMENT,LOOK_TO_PRESET,normalizeEquipment } = __require("src/data/clothing.js");

function cycleWardrobePreview(state,slot,direction=1) {
  if(!CLOTHING_SLOTS.some(entry=>entry.id===slot)) return {ok:false,message:'Слот одежды не найден.'};
  const list=CLOTHING.filter(item=>item.slot===slot);
  if(!list.length) return {ok:false,message:'Для этого слота пока нет вещей.'};
  const currentId=state.ui.wardrobePreview?.slot===slot?state.ui.wardrobePreview.itemId:state.player.equipment?.[slot];
  const currentIndex=Math.max(0,list.findIndex(item=>item.id===currentId));
  const nextIndex=(currentIndex+(Number(direction)<0?-1:1)+list.length)%list.length;
  state.ui.wardrobeSlot=slot;
  state.ui.wardrobePreview={slot,itemId:list[nextIndex].id};
  return {ok:true,item:list[nextIndex]};
}

function equipClothing(state,itemId,slot) {
  const item=CLOTHING_BY_ID[itemId];
  if(!item || item.slot!==slot || !CLOTHING_SLOTS.some(entry=>entry.id===slot)) return {ok:false,message:'Эта вещь не подходит для выбранного слота.'};
  if(!['home','market'].includes(state.world.location)) return {ok:false,message:'Переодеться можно дома или в магазине.'};
  state.player.ownedClothing ||= [...STARTER_CLOTHING];
  if(!state.player.ownedClothing.includes(itemId)) return {ok:false,message:'Сначала купи эту вещь на рынке.'};
  state.player.equipment=normalizeEquipment(state.player.equipment,state.player.look);
  state.player.equipment[slot]=itemId;
  state.player.activeWardrobePreset='custom';
  state.ui.wardrobeSlot=slot;
  state.ui.wardrobePreview={slot,itemId};
  return {ok:true,item};
}

function purchaseClothing(state,itemId,slot) {
  const item=CLOTHING_BY_ID[itemId];
  if(!item || item.slot!==slot || !CLOTHING_SLOTS.some(entry=>entry.id===slot)) return {ok:false,message:'Нельзя поместить эту вещь в выбранный слот.'};
  if(state.world.location!=='market') return {ok:false,message:'Одежду можно купить только на рынке.'};
  state.player.ownedClothing ||= [...STARTER_CLOTHING];
  if(state.player.ownedClothing.includes(itemId)) return {ok:false,message:'Эта вещь уже есть в гардеробе.'};
  if((state.player.stats.coins||0)<item.price) return {ok:false,message:'Не хватает рё для покупки.'};
  state.player.stats.coins-=item.price;
  state.player.ownedClothing.push(itemId);
  state.player.equipment=normalizeEquipment(state.player.equipment,state.player.look);
  state.player.equipment[slot]=itemId;
  state.player.activeWardrobePreset='custom';
  state.ui.wardrobeSlot=slot;
  state.ui.wardrobePreview={slot,itemId};
  return {ok:true,item,price:item.price};
}

function applyWardrobePreset(state,presetId) {
  const preset=PRESET_EQUIPMENT[presetId];
  if(!preset) return {ok:false,message:'Комплект не найден.'};
  if(!['home','market'].includes(state.world.location)) return {ok:false,message:'Комплект можно надеть дома или в магазине.'};
  state.player.ownedClothing ||= [...STARTER_CLOTHING];
  const missing=Object.values(preset).filter(itemId=>!state.player.ownedClothing.includes(itemId));
  if(missing.length) return {ok:false,message:'В комплекте есть вещи, которых ещё нет в гардеробе. Купи их на рынке.'};
  state.player.equipment={...preset};
  state.player.activeWardrobePreset=presetId;
  state.ui.wardrobePreview=null;
  state.player.look={date:'festival',work:'workwear',training:'shinobi',walk:'travel',casual:'casual'}[presetId]||'casual';
  return {ok:true,presetId};
}

return { cycleWardrobePreview, equipClothing, purchaseClothing, applyWardrobePreset };
},
"src/ui/render.js": function(__require) {
const { CHARACTERS,getCharacter,getUnlockedCharacterArts,initials } = __require("src/data/characters.js");
const { LOCATIONS,ORIGINS,getLocation,WEATHER,SEASONS } = __require("src/data/world.js");
const { getBond } = __require("src/core/store.js");
const { clockLabel,timePeriod,getWeather,seasonLabel,getNpcLocation,getTravelMinutes,getLocationAccess } = __require("src/core/life.js");
const { PETS } = __require("src/data/pets.js");
const { JOBS,getJob } = __require("src/data/jobs.js");
const { getEnemy } = __require("src/data/enemies.js");
const { CONVERSATION_ACTIONS,CONVERSATION_ACTION_GROUPS } = __require("src/data/conversation-actions.js");
const { ensureDailyBoard,SKILL_META,getSkillLevel,RECIPES,canCraft } = __require("src/core/progression.js");
const { ACHIEVEMENTS,getAchievementProgress } = __require("src/core/achievements.js");
const { MAGAZINE_ISSUES } = __require("src/data/secret-magazine.js");
const { CLOTHING,CLOTHING_BY_ID,CLOTHING_SLOTS,LOOK_TO_PRESET,normalizeEquipment } = __require("src/data/clothing.js");
const { canRomance,getRelationship,DATE_ACTIVITIES,ROMANCE_PROFILES } = __require("src/core/relationships.js");













const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g,char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

function heading(title,subtitle) {
  return `<div class="page-heading"><div class="eyebrow">ХРОНИКИ КОНОХИ</div><h2>${title}</h2><p class="muted">${subtitle}</p></div>`;
}

function avatar(character,large=false) {
  const portrait = character.art?.[0]?.src;
  return `<div class="person-avatar ${large?'large':''}" style="--av1:${character.colors[0]};--av2:${character.colors[1]}">${portrait?`<img src="${portrait}" alt="" loading="lazy"><span class="avatar-fallback">${character.icon}</span>`:character.icon}</div>`;
}

function renderPlayerAvatarStack(player={}) {
  const equipment=normalizeEquipment(player.equipment,player.look);
  const hair=['short','medium','long','tied','wild'].includes(player.hair)?player.hair:'medium';
  const base=player.gender==='female'?'base-body-female.svg':'base-body.svg';
  const order=['bottom','shoes','top','outer','accessory','head'];
  return `<div class="player-avatar-layer-stack"><img src="assets/player/layers/${base}" alt=""><img src="assets/player/layers/hair-${hair}.svg" alt="">${order.map(slot=>{const item=CLOTHING_BY_ID[equipment[slot]];return item?`<img src="${item.src}" alt="">`:''}).join('')}</div>`;
}

function renderLayeredPlayer(player={},equipment={},className='wardrobe-avatar-stage') {
  const normalized=normalizeEquipment(equipment,player.look);
  const hair=['short','medium','long','tied','wild'].includes(player.hair)?player.hair:'medium';
  const base=player.gender==='female'?'base-body-female.svg':'base-body.svg';
  const order=['bottom','shoes','top','outer','accessory','head'];
  return `<div class="${className}" aria-label="Предпросмотр выбранной одежды"><img class="wardrobe-avatar-base" src="assets/player/layers/${base}" alt="Основа персонажа"><img class="wardrobe-avatar-layer layer-hair" src="assets/player/layers/hair-${hair}.svg" alt="Причёска персонажа">${order.map(slot=>{const item=CLOTHING_BY_ID[normalized[slot]];return item?`<img class="wardrobe-avatar-layer layer-${slot}" data-slot="${slot}" src="${item.src}" alt="${escapeHTML(item.name)}">`:''}).join('')}</div>`;
}

function getPetImage(pet={}) {
  return pet.image || PETS.find(item=>item.id===pet.id)?.image || '';
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
  const foundIssues = state.collectibles?.unlockedIssues || [];
  let secretSearch='';
  if (place.id==='library' && !state.collectibles?.magazineFound) secretSearch='<button class="secret-find-btn" data-action="discover-magazine">🔎 Осмотреть старый стеллаж</button>';
  else if (place.id==='archive' && state.collectibles?.magazineFound && !foundIssues.includes('issue-02')) secretSearch='<button class="secret-find-btn" data-action="find-magazine-issue" data-id="issue-02">📜 Проверить папку старых заметок</button>';
  else if (place.id==='tea-house' && foundIssues.includes('issue-02') && !foundIssues.includes('issue-03')) secretSearch='<button class="secret-find-btn" data-action="find-magazine-issue" data-id="issue-03">🍵 Поговорить о старых выпусках</button>';
  return `<section class="rp-full-scene" aria-label="Игровая сцена">
      <img class="rp-full-bg" src="${escapeHTML(sceneImage||'assets/backgrounds/konoha-main.webp')}" alt="${escapeHTML(place.name)}" loading="eager" decoding="async">
      <div class="rp-full-vignette"></div>
      <div class="rp-hud-top"><span class="rp-chip"><img src="assets/ui/generated/location.png" alt="">${escapeHTML(place.name)}</span><span class="rp-chip">${weather.icon} ${weather.label} · ${seasonLabel(state)} · ${clockLabel(state.world.minute)}</span><span class="rp-chip">День ${state.world.day}</span></div>
      <div class="rp-health-hud"><span>♥ ${stats.hp??100} HP</span><span>◈ ${stats.stamina} EN</span></div>
      ${activeCharacter?`<button class="rp-cutout" data-action="open-person" data-id="${activeCharacter.id}" aria-label="Открыть досье: ${escapeHTML(activeCharacter.name)}"><img src="${escapeHTML(activeCharacter.art?.[0]?.src||'')}" alt="${escapeHTML(activeCharacter.name)}"><span class="rp-cutout-name"><b>${escapeHTML(activeCharacter.name)}</b><small>${escapeHTML(activeCharacter.role)}</small></span></button>`:''}
      ${ambientPet?`<div class="rp-full-pet" title="${escapeHTML(ambientPet.name)}">${getPetImage(ambientPet)?`<img src="${escapeHTML(getPetImage(ambientPet))}" alt="${escapeHTML(ambientPet.name)}">`:ambientPet.icon||'🐾'}</div>`:''}
      ${ambientEnemy?`<button class="rp-full-enemy" data-action="scene-patrol" data-id="${ambientEnemy.id}"><img src="${ambientEnemy.image}" alt=""><span>${escapeHTML(ambientEnemy.name)} · проверить</span></button>`:''}
      <div class="rp-place-title"><small>СЕЙЧАС В КОНОХЕ</small><h2>${escapeHTML(place.name)}</h2><p>${escapeHTML(place.desc)}</p></div>
      <div class="rp-scene-bottom"><div class="rp-speaker-line"><b>${escapeHTML(speaker)}</b><span>${activeCharacter?`Рядом · ${escapeHTML(activeCharacter.name)}`:'Тихая сцена'}</span></div><p data-typewriter>${escapeHTML(narration)}</p></div>
    </section>
    <section class="rp-control-deck">
      <form id="world-action-form" class="rp-text-action"><label><span>СВОБОДНОЕ ДЕЙСТВИЕ</span><small>Пиши, что делаешь, куда идёшь или что исследуешь</small></label><textarea name="action" rows="2" maxlength="700" placeholder="Например: осматриваю витрину, затем захожу в цветочную лавку…" required>${escapeHTML(state.ui.lastActionText||'')}</textarea><button class="btn btn-primary" type="submit">Выполнить ↗</button></form>
      <form id="world-dialogue-form" class="rp-text-dialogue"><label><span>ТВОЯ РЕПЛИКА</span><small>${activeCharacter?`Разговор с ${escapeHTML(activeCharacter.name)} · только ручной ввод`:'Рядом сейчас никого нет'}</small></label>${activeCharacter?`<input type="hidden" name="characterId" value="${activeCharacter.id}"><textarea name="message" rows="2" maxlength="700" placeholder="Напиши своими словами, что говоришь…" required></textarea><button class="btn btn-soft" type="submit">Сказать ➤</button>`:`<div class="rp-empty-talk">Персонаж появится в этой сцене, когда окажется в локации. Можно отправиться по карте или немного подождать.</div><button class="btn btn-soft" type="button" data-view="map">Открыть карту</button>`}</form>
    </section>
    <div class="rp-bottom-shortcuts"><button data-view="locations"><img src="assets/ui/generated/location.png" alt="">Локации</button><button data-view="map"><img src="assets/ui/generated/location.png" alt="">Карта</button><button data-view="scroll"><img src="assets/ui/generated/scroll-case.png" alt="">Задания</button><button data-view="gallery"><img src="assets/ui/generated/journal.png" alt="">Галерея</button><button data-view="achievements"><img src="assets/ui/generated/trophy.png" alt="">Достижения</button>${state.collectibles?.magazineFound?'<button data-view="magazine"><img src="assets/ui/generated/journal.png" alt="">Альманах</button>':''}${secretSearch}<button data-action="skip-time" data-hours="1"><img src="assets/ui/generated/pause.png" alt="">+1 час</button>${['training','forest','gate','campsite'].includes(place.id)?'<button data-action="patrol">🥋 Учебный патруль</button>':''}</div>`;
}
function renderMap(state) {
  const place = getLocation(state.world.location);
  const coords = {
    'main-street':[49,48],'ichiraku':[30,37],'flower-shop':[66,37],market:[80,48],training:[76,73],hospital:[44,82],hokage:[51,17],
    'tea-house':[28,56],river:[15,83],forest:[7,51],memorial:[14,18],gate:[50,5],library:[20,39],garden:[34,70],home:[56,64],'music-hall':[88,48],
    academy:[81,20],campsite:[6,83],bathhouse:[21,63],dojo:[89,76],archive:[19,29],residential:[64,55],rooftop:[69,22],greenhouse:[40,70]
  };
  const visibleLocations=LOCATIONS.filter(location=>!location.hidden || state.discoveredLocations?.includes(location.id));
  const pins = visibleLocations.map(location=>{
    const [x,y]=coords[location.id]||[50,50];
    const access=getLocationAccess(state,location.id); const locked=!access.allowed; const minutes=getTravelMinutes(place.id,location.id);
    return `<button class="map-pin ${location.id===place.id?'current':''} ${locked?'locked':''}" style="left:${x}%;top:${y}%" data-action="travel" data-id="${location.id}" ${locked?'disabled':''} title="${escapeHTML(locked?access.reason:location.name)}"><span>${location.icon}</span><b>${escapeHTML(location.name)}</b><i>${location.id===place.id?'Здесь':locked?'Закрыто':`${minutes} мин`}</i></button>`;
  }).join('');
  return `${heading('Карта Конохи','Выбирай точку на схеме. Переход займёт игровое время; внезапный уход со встречи может повлиять на отношения.')}
    <section class="map-ornate-banner map-ornate-banner-v2"><div><small>🌸 КАРТА КОНОХИ</small><h3>Деревня Скрытого Листа</h3><p>Текущее место: <b>${escapeHTML(place.name)}</b></p></div><button class="btn btn-soft" data-action="toggle-map-legend">${state.ui.mapLegend?'Скрыть легенду':'Открыть легенду'}</button></section>
    ${state.ui.mapLegend?`<section class="panel-card map-legend"><b>Легенда карты</b><span>🏠 Жилые места</span><span>🍜 Еда и магазины</span><span>⚕️ Службы и госпиталь</span><span>🥋 Тренировки</span><span>🌲 Природа</span><span>🔒 Временно закрытая зона</span><p>Переход занимает от 5 до 32 игровых минут в зависимости от расстояния. Если ты договаривался о встрече, внезапный уход будет заметен собеседнику.</p></section>`:''}
    <section class="map-overview" aria-label="Схематичная карта Конохи"><svg class="map-roads" viewBox="0 0 1000 640" preserveAspectRatio="none" aria-hidden="true"><defs><pattern id="map-grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="rgba(246,208,231,.06)" stroke-width="1"/></pattern></defs><rect width="1000" height="640" fill="url(#map-grid)"/><path d="M-40 250 C170 205 230 300 390 275 S720 190 1040 255 M170 -30 C220 120 350 170 500 230 S650 420 610 680 M-30 485 C180 430 280 520 445 495 S770 410 1030 485" fill="none" stroke="#c89bb9" stroke-width="25" opacity=".16" stroke-linecap="round"/><path d="M-40 250 C170 205 230 300 390 275 S720 190 1040 255 M170 -30 C220 120 350 170 500 230 S650 420 610 680 M-30 485 C180 430 280 520 445 495 S770 410 1030 485" fill="none" stroke="#e3c3d9" stroke-width="2" opacity=".22" stroke-dasharray="7 13"/><path d="M740 -20 C690 100 830 180 790 300 S860 520 1010 660" fill="none" stroke="#6fa8b2" stroke-width="50" opacity=".2"/><path d="M70 80 L230 35 390 85 470 40 690 65 930 120 950 330 875 580 660 605 450 570 240 605 50 500Z" fill="none" stroke="rgba(246,198,225,.22)" stroke-width="3" stroke-dasharray="10 10"/><g fill="rgba(195,139,176,.16)" stroke="rgba(236,188,220,.16)"><rect x="335" y="95" width="135" height="78" rx="12"/><rect x="520" y="95" width="170" height="90" rx="12"/><rect x="340" y="370" width="155" height="90" rx="12"/><rect x="560" y="365" width="125" height="100" rx="12"/></g><g fill="rgba(232,176,211,.35)" font-size="18" font-family="sans-serif"><text x="390" y="140">ЦЕНТР</text><text x="565" y="145">ТОРГОВЫЙ РЯД</text><text x="367" y="420">ЖИЛОЙ КВАРТАЛ</text><text x="575" y="420">ВОСТОК</text></g></svg>${pins}<div class="map-compass">N<br>✦</div><div class="map-scale">СХЕМА ДЕРЕВНИ · НЕ В МАСШТАБЕ</div></section>
    <p class="map-tap-hint">Нажми на метку на карте, чтобы перейти. Закрытые места отмечены замком; причина ограничения появится при выборе.</p>`;
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
  return `<button class="person-card ref-person-card ${statusClass}" data-action="open-person" data-id="${character.id}"><span class="ref-card-portrait"><img src="${portrait}" alt="${escapeHTML(character.name)}" loading="lazy"><i>${escapeHTML(character.role)}</i></span><span class="ref-card-copy"><strong>${escapeHTML(character.name)}${state.relationships?.[character.id]?.status==='dating'?' · ♥':''}</strong><small>${escapeHTML(character.personality)}</small><span class="bond-line"><span>${escapeHTML(bond.stage||'Знакомая')}</span><b>${value}/100</b></span><span class="bond-track"><i style="width:${value}%"></i></span></span></button>`;
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
function renderRelationshipPanel(state,character,bond) {
  if(!canRomance(state,character.id)) return '';
  const relation=getRelationship(state,character.id);
  const ready=(bond.friendship||0)>=15 && (bond.trust||0)>=10;
  const confessionReady=(bond.friendship||0)>=70 && (bond.trust||0)>=55 && relation.dates>=2;
  const status=relation.status==='dating'?'Вы вместе':relation.dates>0?'Постепенно сближаетесь':'Пока друзья';
  const preferred=ROMANCE_PROFILES[character.id].preference;
  const prefNames=preferred.map(id=>DATE_ACTIVITIES.find(item=>item.id===id)?.label).filter(Boolean).join(', ');
  const pending=relation.pending?`<div class="relationship-invite"><small>ЕЁ ПРИГЛАШЕНИЕ · ДЕНЬ ${relation.pending.day}</small><p>${escapeHTML(relation.pending.text)}</p><div class="relationship-invite-actions"><button class="btn btn-primary" data-action="romantic-initiative" data-id="${character.id}" data-type="accept">Принять</button><button class="btn btn-ghost" data-action="romantic-initiative" data-id="${character.id}" data-type="decline">В другой раз</button></div></div>`:'';
  return `<section class="panel-card relationship-panel"><div class="card-head"><div><small class="relationship-kicker">ЛИЧНЫЙ МАРШРУТ</small><h3>🌸 Симпатия и отношения</h3></div><span class="relationship-status">${status}</span></div>
    <div class="relationship-mood"><div><span>Настроение ${escapeHTML(character.name)}</span><b>${relation.mood}/100</b></div><i><u style="width:${relation.mood}%"></u></i></div>
    <p class="relationship-copy">Этот маршрут построен на дружбе, взаимной симпатии и уважении к личным границам. Совместные встречи расходуют немного энергии. Отказ от приглашения не разрушает отношения.</p>
    ${pending}
    <div class="relationship-date-head"><b>Предложить совместное занятие</b><small>${ready?'Она уже готова проводить с тобой время':'Сначала укрепи дружбу до 15 и доверие до 10'}</small></div>
    <div class="relationship-date-grid">${DATE_ACTIVITIES.map(item=>`<button class="relationship-date-option" data-action="romantic-date" data-id="${character.id}" data-type="${item.id}" ${ready?'':'disabled'}><span>${item.icon}</span><b>${item.label}</b><small>−${item.cost} энергии</small></button>`).join('')}</div>
    <div class="relationship-footer"><span>Совместных встреч: <b>${relation.dates}</b>${relation.dates>=3?` · Ей нравится: ${escapeHTML(prefNames)}`:' · Узнавай её вкусы в разговорах'}</span><button class="btn btn-primary" data-action="romantic-confess" data-id="${character.id}" ${confessionReady?'':'disabled'}>${relation.status==='dating'?'Вы уже пара':'Сказать о симпатии'}</button></div>
    ${!confessionReady&&relation.status!=='dating'?'<small class="relationship-requirements">Для признания нужны дружба 70+, доверие 55+ и две совместные встречи.</small>':''}
  </section>`;
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
  const stageValue=Math.max(bond.friendship||0,bond.trust||0,bond.respect||0);
  const stageClass=stageValue>=70?'high':stageValue>=35?'mid':'new';
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
        ${renderRelationshipPanel(state,character,bond)}
        <section class="panel-card dossier-story"><div class="card-head"><h3>История знакомства</h3><small>${bond.meetings||0} встреч</small></div><p class="dossier-bio">${escapeHTML(character.notes||character.personality)}</p><div class="dossier-history">${lastMemories.length?lastMemories.slice(-8).reverse().map(item=>`<div class="dossier-history-line"><b>${escapeHTML(item.title||'Событие')}</b><p>${escapeHTML(item.text||'Вы провели время вместе.')}</p><small>${item.day?`День ${item.day}`:'Запись знакомства'}</small></div>`).join(''):`<p class="chat-hint">Пока нет важных событий. После встреч здесь появятся запомнившиеся моменты, договорённости и поступки.</p>`}</div></section>
        <section class="panel-card dossier-gifts"><div class="card-head"><h3>Подарки и расходы</h3><small>${gifts.length} записей</small></div>${gifts.length?`<ul>${gifts.map(item=>`<li>${escapeHTML(item.name)} · ${item.price?`${item.price} рё`: 'стоимость неизвестна'} · день ${item.day}</li>`).join('')}</ul>`:'<p class="chat-hint">Пока подарков и расходов на неё не записано.</p>'}</section>
        <section class="panel-card dossier-availability"><div class="card-head"><h3>Последняя известная встреча</h3><small>${isHere?'РЯДОМ':'НЕ РЯДОМ'}</small></div><p>${isHere?`${escapeHTML(character.name)} сейчас находится в той же локации. Вернись к RP-сцене, чтобы продолжить разговор.`:`Последняя известная локация: ${escapeHTML(placeName)}. Точное расписание персонажа остаётся скрытым.`}</p><button class="btn btn-soft" data-view="world">Вернуться к RP-сцене</button></section>
      </div>
    </div>`;
}
function renderConversation(state,character) {
  if (!character) return `${heading('Разговор','Выбери героиню из списка знакомых.')}`;
  const placeId=getNpcLocation(state,character.id);
  const isHere=placeId===state.world.location;
  const history=state.dialogues[character.id]||[];
  const lines=history.slice(-30).map(item=>`<article class="conversation-line ${item.from==='player'?'from-player':'from-npc'}"><b>${item.from==='player'?escapeHTML(state.player.name):escapeHTML(character.name)}</b><p>${escapeHTML(item.text)}</p><small>День ${item.day} · ${String(Math.floor((item.minute||0)/60)).padStart(2,'0')}:${String((item.minute||0)%60).padStart(2,'0')}</small></article>`).join('');
  return `${heading(`Разговор с ${escapeHTML(character.name)}`,`Личная беседа · ${isHere?'героиня находится рядом':'героиня сейчас в другом месте'}`)}
    <section class="conversation-shell panel-card">
      <div class="conversation-head">${avatar(character,true)}<div><h3>${escapeHTML(character.name)}</h3><small>${isHere?`Сейчас здесь: ${escapeHTML(getLocation(state.world.location).name)}`:`Сейчас: ${escapeHTML(placeId?getLocation(placeId).name:'неизвестно')}`}</small></div><button class="btn btn-ghost" data-action="back-profile" data-id="${character.id}">Досье</button></div>
      <div class="conversation-log" id="conversation-log">${lines||'<div class="empty-state">Вы ещё не разговаривали. Начни с приветствия или вопроса о делах.</div>'}</div>
      ${isHere?`<div class="conversation-actions" aria-label="Частые дружеские действия"><span>Частые действия</span><button class="btn btn-soft" data-action="conversation-gesture" data-type="wave">👋 Помахать</button><button class="btn btn-soft" data-action="conversation-gesture" data-type="handshake">🤝 Пожать руку</button><button class="btn btn-soft" data-action="conversation-gesture" data-type="highfive">✋ Дать пять</button><button class="btn btn-soft" data-action="conversation-gesture" data-type="hug">🫂 Попросить обнять</button></div><details class="conversation-action-library"><summary>Каталог действий · ${CONVERSATION_ACTIONS.length}</summary><div class="conversation-action-groups">${CONVERSATION_ACTION_GROUPS.map(group=>`<section class="conversation-action-group"><h4>${escapeHTML(group.label)}</h4><div>${group.actions.map(action=>`<button class="btn btn-soft" data-action="conversation-gesture" data-type="${escapeHTML(action.id)}">${escapeHTML(action.label)}</button>`).join('')}</div></section>`).join('')}</div></details><form id="conversation-form" class="conversation-compose"><textarea name="message" rows="2" maxlength="500" placeholder="Напиши свою реплику вручную…" required></textarea><button class="btn btn-primary" type="submit">Отправить ↗</button></form>`:`<div class="chat-away-note">Сейчас она не рядом, поэтому личный разговор недоступен. Найди её на карте или дождись следующей встречи.</div><button class="btn btn-soft" data-action="open-map-to-character" data-id="${character.id}">Открыть карту</button>`}
    </section>`;
}

function renderPhone(state) {
  const app=state.phone?.app || 'home';
  const posts=state.phone?.posts || [];
  const messages=state.phone?.messages || [];
  const contacts=CHARACTERS.filter(character=>state.unlocked.includes(character.id) && (state.bonds?.[character.id]?.meetings||0)>0);
  const stamp=minute=>`${String(Math.floor(minute/60)).padStart(2,'0')}:${String(minute%60).padStart(2,'0')}`;
  const apps=[
    ['konohagram','◎','Konohagram','Фото и повседневная лента','photo'],
    ['line','<img src="assets/ui/generated/chat.png" alt="">','KonohaLine','Личные сообщения','chat'],
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
  const portrait = pet => getPetImage(pet) ? `<img src="${escapeHTML(getPetImage(pet))}" alt="${escapeHTML(pet.name)}" loading="lazy">` : `<span>${pet.icon||'🐾'}</span>`;
  return `${heading('Питомцы','Заводи животных, выбирай имена и ухаживай за ними. У каждого вида свой портрет, характер и привычки.')}
    <section class="panel-card pets-owned"><div class="card-head"><h3>Твои питомцы</h3><small>${owned.length} / 5</small></div>${owned.length?`<div class="pets-grid">${owned.map(pet=>`<article class="pet-card"><div class="pet-portrait">${portrait(pet)}</div><div><b>${escapeHTML(pet.name)}</b><small>${escapeHTML(pet.kind)} · ${escapeHTML(pet.temperament||'дружелюбный')}</small><p>Привязанность: ${pet.affection||0}/100 · Настроение: ${pet.mood??55}/100</p><small>Сытость: ${100-(pet.hunger??45)} · Энергия: ${pet.energy??80}</small><div class="bond-track"><i style="width:${pet.affection||0}%"></i></div><div class="pet-actions"><button class="mini-btn" data-action="pet-care" data-type="feed" data-id="${pet.uid}">Покормить</button><button class="mini-btn" data-action="pet-care" data-type="play" data-id="${pet.uid}">Поиграть</button><button class="mini-btn" data-action="pet-care" data-type="walk" data-id="${pet.uid}">Прогуляться</button></div><form class="pet-name-form" data-pet-id="${pet.uid}"><input name="name" maxlength="20" value="${escapeHTML(pet.name)}" aria-label="Имя питомца"><button class="mini-btn" type="submit">Переименовать</button></form></div></article>`).join('')}</div>`:'<div class="pets-empty"><img class="pets-empty-mascot" src="assets/ui/enot-mascot.webp" alt="Маскот Конохи"><h3>Пока дома тихо</h3><p>Выбери питомца в магазине ниже. У каждого свой характер и любимые занятия.</p></div>'}</section>
    <section class="panel-card pet-shop-panel"><div class="card-head"><h3>Магазин животных</h3><small>БЮДЖЕТ: ${state.player.stats.coins} РЁ</small></div><div class="pets-grid">${PETS.map(pet=>`<article class="pet-shop-card"><div class="pet-shop-icon">${pet.image?`<img src="${escapeHTML(pet.image)}" alt="${escapeHTML(pet.name)}" loading="lazy">`:pet.icon}</div><h4>${escapeHTML(pet.name)}</h4><p>${escapeHTML(pet.desc)}</p><small>Темперамент: ${escapeHTML(pet.temperament)}</small><div class="pet-shop-footer"><b>${pet.price} рё</b><button class="btn btn-primary" data-action="buy-pet" data-id="${pet.id}" ${owned.length>=5?'disabled':''}>Завести</button></div></article>`).join('')}</div><p class="chat-hint">В доме может жить не больше пяти питомцев одновременно. Виды с собственными иллюстрациями отмечены отдельными портретами.</p></section>`;
}

function renderScroll(state) {
  const board=ensureDailyBoard(state);
  const entries = state.scroll.filter(item=>!item.hidden || item.visited);
  const history=entries.filter(item=>item.done||item.cancelled);
  const active=entries.filter(item=>!item.done&&!item.cancelled);
  const shown=state.ui.questTab==='history'?history:active;
  const contracts=board.contracts.map(item=>`<article class="daily-contract ${item.done?'done':''}"><div class="daily-contract-icon">${item.done?'✓':'✦'}</div><div class="daily-contract-copy"><b>${escapeHTML(item.title)}</b><small>${escapeHTML(item.desc)}</small><div class="quest-progress"><i style="width:${Math.min(100,(item.progress/item.target)*100)}%"></i></div><small>${item.progress}/${item.target} · награда ${item.reward} рё</small></div>${item.done?'<span class="done-mark">✓</span>':''}</article>`).join('');
  const skills=Object.entries(SKILL_META).map(([id,meta])=>{const skill=state.skills?.[id]||{level:1,xp:0};const level=getSkillLevel(state,id);const goal=level*20;const progress=level>=5?100:Math.min(100,(skill.xp/goal)*100);return `<article class="mastery-chip"><span>${meta.icon}</span><div><b>${escapeHTML(meta.name)} · ур. ${level}</b><div class="quest-progress"><i style="width:${progress}%"></i></div><small>${level>=5?'Максимальный уровень':`${skill.xp}/${goal} опыта`}</small></div></article>`}).join('');
  return `${heading('Задания','Ежедневные поручения, необычные события, обещания и личные цели. Выбор в ситуациях влияет на награды и развитие навыков.')}
    <section class="quest-banner"><div><small>🌸 СВИТОК КОНОХИ</small><h3>Твои дела и обещания</h3><p>Завершай ежедневные поручения и выбирай, как поступить в неожиданных ситуациях.</p></div></section>
    <section class="panel-card daily-board"><div class="card-head"><h3>Поручения на день ${board.day}</h3><small>${board.contracts.filter(item=>item.done).length}/${board.contracts.length} ГОТОВО</small></div><div class="daily-contract-list">${contracts}</div><p class="chat-hint">Новые поручения появляются утром. Незавершённые задачи истекают без штрафа.</p></section>
    <section class="panel-card mastery-panel"><div class="card-head"><h3>Развитие навыков</h3><small>ОПЫТ ЗА ДЕЙСТВИЯ</small></div><div class="mastery-grid">${skills}</div></section>
    <div class="quest-tabs"><button data-action="quest-tab" data-id="active" class="${state.ui.questTab!=='history'?'active':''}">Активные <b>${active.length}</b></button><button data-action="quest-tab" data-id="history" class="${state.ui.questTab==='history'?'active':''}">История <b>${history.length}</b></button></div>
    <section class="panel-card"><div class="scroll-list">${shown.length?shown.map(item=>`<article class="scroll-item ${item.done?'completed':''}"><div class="scroll-icon">${item.kind==='promise'?'🌸':item.kind==='mystery'?'❔':item.kind==='situation'?'✨':'📜'}</div><div><strong>${escapeHTML(item.title)}</strong><p>${escapeHTML(item.desc)}</p>${item.progress!=null?`<div class="quest-progress"><i style="width:${Math.min(100,(item.progress/(item.target||1))*100)}%"></i></div>`:''}${item.outcome?`<p class="situation-outcome">${escapeHTML(item.outcome)}</p>`:''}<small class="scroll-state">${item.done?(item.cancelled?'Отменено':'Выполнено'):(item.deadline?`Срок: ${escapeHTML(item.deadline)}`:'Без указанного срока')}</small></div><div class="quest-actions">${item.kind==='situation'&&!item.done?item.choices.map(choice=>`<button class="mini-btn" data-action="resolve-situation" data-id="${item.id}" data-type="${choice.id}">${escapeHTML(choice.label)}</button>`).join(''):!item.done?`<button class="mini-btn" data-action="quest-complete" data-id="${item.id}">Отметить</button><button class="mini-btn muted-btn" data-action="quest-ignore" data-id="${item.id}">Отложить</button>${item.kind==='promise'?`<button class="mini-btn muted-btn" data-action="quest-cancel" data-id="${item.id}">Отменить</button>`:''}`:'<span class="done-mark">✓</span>'}</div></article>`).join(''):'<div class="empty-state">В этом разделе пока пусто.</div>'}</div></section>
    <section class="panel-card promise-card"><div class="card-head"><h3>Поставить личную цель</h3><small>ЗАПИСЬ ИГРОКА</small></div><form id="promise-form" class="promise-form"><input name="promise" maxlength="140" placeholder="Например: встретиться с Темари до вечера" required><button class="btn btn-primary" type="submit">Добавить</button></form><p class="chat-hint">Личная цель не даёт награду сама по себе — это твоя заметка и ориентир.</p></section>`;
}

function renderBag(state) {
  const gender=state.player.gender||'male';
  const looks = gender==='female' ? [
    ['casual','Повседневный плащ','Спокойный образ для прогулок.','female-travel'],
    ['shinobi','Форма куноичи','Практичный комплект для заданий.','female-shinobi'],
    ['festival','Праздничное кимоно','Наряд для городского праздника.','female-festival'],
    ['travel','Дорожный плащ','Удобный вариант для поездок.','female-travel'],
    ['raincoat','Плащ от дождя','Универсальный верхний слой.','female-travel'],
    ['workwear','Форма помощницы','Собранный рабочий вариант.','female-shinobi']
  ] : [
    ['casual','Повседневная одежда','Удобный вариант для прогулок.','male-casual'],
    ['shinobi','Форма шиноби','Практичный стиль для тренировок.','male-shinobi'],
    ['festival','Праздничное кимоно','Наряд для городского праздника.','male-formal'],
    ['travel','Дорожный плащ','Подходит для прохладной погоды и поездок.','male-travel'],
    ['raincoat','Дождевой плащ','Тёплый плащ для дождя и ветра.','male-raincoat'],
    ['workwear','Рабочая форма','Форма для смены в мастерской или лавке.','male-work']
  ];
  const prices={festival:48,travel:36,raincoat:30,workwear:42};
  const kinds=[['all','Всё'],['food','Еда'],['gift','Подарки'],['clothing','Одежда'],['pet','Питомцам'],['material','Материалы'],['other','Прочее']];
  const filter=state.ui.bagTab||'all';
  const filtered=state.inventory.filter(item=>filter==='all'||item.kind===filter||(filter==='other'&&!['food','gift','clothing','material','pet'].includes(item.kind)));
  const selected=filtered.find(item=>item.id===state.ui.selectedItemId)||filtered[0]||null;
  const iconFor=item=>({tea:'assets/ui/tea.svg',flower:'assets/ui/generated/gift.png',paper:'assets/ui/generated/scroll-case.png',herb:'assets/ui/herb.svg',bento:'assets/ui/generated/ramen-bowl.png','pet-snack':'assets/ui/generated/gift-box.png','field-kit':'assets/ui/pouch.svg','herbal-tea':'assets/ui/tea.svg','pressed-bouquet':'assets/ui/generated/gift.png'}[item.id]||'assets/ui/pouch.svg');
  const owned=state.player.ownedLooks||['casual','shinobi'];
  const ownedClothing=new Set(state.player.ownedClothing||[]);
  const equipment=normalizeEquipment(state.player.equipment,state.player.look);
  const canChange=['home','market'].includes(state.world.location);
  const activeSlot=CLOTHING_SLOTS.some(slot=>slot.id===state.ui.wardrobeSlot)?state.ui.wardrobeSlot:'top';
  const slotInfo=CLOTHING_SLOTS.find(slot=>slot.id===activeSlot)||CLOTHING_SLOTS[1];
  const slotItems=CLOTHING.filter(item=>item.slot===activeSlot);
  const previewId=state.ui.wardrobePreview?.slot===activeSlot&&CLOTHING_BY_ID[state.ui.wardrobePreview.itemId]?.slot===activeSlot?state.ui.wardrobePreview.itemId:equipment[activeSlot];
  const previewItem=CLOTHING_BY_ID[previewId]||slotItems[0];
  const previewIndex=Math.max(0,slotItems.findIndex(item=>item.id===previewItem.id));
  const previewEquipment={...equipment,[activeSlot]:previewItem.id};
  const slotTabs=CLOTHING_SLOTS.map(slot=>`<button class="wardrobe-slot-tab ${activeSlot===slot.id?'active':''}" data-action="wardrobe-slot" data-id="${slot.id}"><span>${slot.icon}</span><b>${slot.label}</b><small>${escapeHTML(CLOTHING_BY_ID[equipment[slot.id]]?.name||'Не выбрано')}</small></button>`).join('');
  const previewOwned=ownedClothing.has(previewItem.id);
  const previewButton=previewOwned?`<button class="btn btn-primary" data-action="wardrobe-equip" data-id="${previewItem.id}" data-slot="${activeSlot}" ${!canChange?'disabled':''}>${equipment[activeSlot]===previewItem.id?'Уже надето':'Надеть'}</button>`:state.world.location==='market'?`<button class="btn btn-primary" data-action="buy-clothing" data-id="${previewItem.id}" data-slot="${activeSlot}">Купить · ${previewItem.price} рё</button>`:`<button class="btn btn-primary" disabled>Купить можно на рынке</button>`;
  const wardrobeDesigner=`<section class="wardrobe-designer panel-card"><div class="card-head"><div><h3>Собери образ по частям</h3><small>КАК В СИМУЛЯТОРАХ ЖИЗНИ · СЛОИ НЕ КОНФЛИКТУЮТ</small></div><span class="wardrobe-place-tag">${canChange?'МОЖНО ПЕРЕОДЕТЬСЯ':'ПРЕДПРОСМОТР'}</span></div>
      <div class="wardrobe-designer-layout"><div class="wardrobe-preview-column">${renderLayeredPlayer(state.player,previewEquipment)}<div class="wardrobe-preview-caption"><b>${escapeHTML(state.player.name)}</b><small>Предпросмотр: ${escapeHTML(previewItem.name)}</small></div></div>
      <div class="wardrobe-controls"><div class="wardrobe-slot-tabs">${slotTabs}</div><article class="wardrobe-item-picker"><div class="wardrobe-item-visual"><img src="assets/player/layers/thumbs/${previewItem.id}.svg" alt="${escapeHTML(previewItem.name)}"></div><div class="wardrobe-item-copy"><small>${escapeHTML(slotInfo.title.toUpperCase())} · ${previewIndex+1}/${slotItems.length}</small><h4>${escapeHTML(previewItem.name)}</h4><p>${escapeHTML(previewItem.desc)}</p><span class="wardrobe-fit-label">${previewOwned?'В гардеробе':`Цена: ${previewItem.price} рё`}</span></div><div class="wardrobe-arrow-row"><button class="wardrobe-arrow" data-action="wardrobe-cycle" data-slot="${activeSlot}" data-dir="-1" aria-label="Предыдущий предмет">‹</button><button class="wardrobe-arrow" data-action="wardrobe-cycle" data-slot="${activeSlot}" data-dir="1" aria-label="Следующий предмет">›</button></div><div class="wardrobe-picker-actions">${previewButton}<button class="btn btn-ghost" data-action="wardrobe-reset-preview">Сбросить просмотр</button></div></article><p class="wardrobe-rule-note"><b>Правила слоёв:</b> один предмет на каждый слот. Футболка не заменяет брюки, обувь выбирается отдельно, а куртка или жилет надевается поверх верха. ${!canChange?'Для сохранения образа вернись домой или зайди в магазин одежды.':''}</p></div></div>
      <div class="wardrobe-equipped-row">${CLOTHING_SLOTS.map(slot=>`<span><small>${slot.label}</small><b>${escapeHTML(CLOTHING_BY_ID[equipment[slot.id]]?.name||'—')}</b></span>`).join('')}</div></section>`;
  const outfitCards=looks.map(([id,name,desc,art])=>{
    const isOwned=owned.includes(id); const price=prices[id]||0;
    return `<article class="outfit-option ${(state.player.activeWardrobePreset||LOOK_TO_PRESET[state.player.look]||'casual')===LOOK_TO_PRESET[id]?'selected':''} ${isOwned?'owned':'locked'}"><div class="outfit-art-wrap">${art?`<img src="assets/player/outfits/${art}.png" alt="${escapeHTML(name)}" loading="lazy">`:'<span class="outfit-placeholder">👘</span>'}</div><b>${escapeHTML(name)}</b><small>${escapeHTML(desc)}</small>${isOwned?`<button class="mini-btn" data-action="outfit" data-id="${id}" ${!canChange?'disabled':''}>${(state.player.activeWardrobePreset||LOOK_TO_PRESET[state.player.look]||'casual')===LOOK_TO_PRESET[id]?'Комплект надет':canChange?'Применить комплект':'Доступно дома'}</button>`:`<button class="mini-btn" data-action="buy-outfit" data-id="${id}" ${state.world.location!=='market'?'disabled':''}>Купить · ${price} рё</button>`}</article>`;
  }).join('');
  return `${heading('Инвентарь','Предметы, одежда и мастерская. Выбирай вещи и собирай подходящий комплект для работы, прогулки, тренировки или встречи.')}
    <section class="bag-heading"><div><small>🌸 ЛИЧНЫЕ ВЕЩИ</small><h3>Инвентарь</h3><p>${state.inventory.reduce((sum,item)=>sum+item.qty,0)} предметов в сумке</p></div></section>
    <div class="bag-tabs">${kinds.map(([id,label])=>`<button data-action="bag-filter" data-id="${id}" class="${filter===id?'active':''}">${label}</button>`).join('')}</div>
    <section class="panel-card"><div class="inventory-grid">${filtered.length?filtered.map(item=>`<article class="item-card ${selected?.id===item.id?'selected':''}"><button class="item-select" data-action="select-item" data-id="${item.id}"><img class="item-art" src="${iconFor(item)}" alt="" loading="lazy"><span><strong>${escapeHTML(item.name)}</strong><small>${item.kind==='gift'?'Подарок':item.kind==='food'?'Еда':item.kind==='clothing'?'Одежда':item.kind==='pet'?'Для питомцев':item.kind==='material'?'Материал':'Прочее'}</small></span><b class="quantity">×${item.qty}</b></button><div class="item-tools">${item.kind==='gift'?`<button class="mini-btn" data-action="choose-gift" data-id="${item.id}">🎁 Подарить</button>`:''}${item.kind==='food'&&item.id!=='herbal-tea'?`<button class="mini-btn" data-action="use-food" data-id="${item.id}">Использовать</button>`:''}${item.kind==='pet'?`<button class="mini-btn" data-action="pet-item" data-id="${item.id}">Использовать</button>`:''}${item.id==='field-kit'||item.id==='herbal-tea'?`<button class="mini-btn" data-action="use-crafted-item" data-id="${item.id}">Применить</button>`:''}</div></article>`).join(''):'<div class="empty-state">В этой категории пока пусто.</div>'}</div>
      ${selected?`<section class="item-detail-panel"><div class="item-detail-art"><img src="${iconFor(selected)}" alt=""></div><div class="item-detail-copy"><small>ВЫБРАННЫЙ ПРЕДМЕТ</small><h3>${escapeHTML(selected.name)}</h3><p>${escapeHTML(selected.desc||'Описание пока неизвестно.')}</p><div class="item-detail-meta"><span>Категория: ${escapeHTML(selected.kind)}</span><b>Количество: ${selected.qty}</b></div><div class="item-detail-actions">${selected.kind==='gift'?`<button class="btn btn-primary" data-action="choose-gift" data-id="${selected.id}">Подарить</button>`:''}${selected.kind==='food'&&selected.id!=='herbal-tea'?`<button class="btn btn-primary" data-action="use-food" data-id="${selected.id}">Использовать</button>`:''}${selected.kind==='pet'?`<button class="btn btn-primary" data-action="pet-item" data-id="${selected.id}">Использовать для питомца</button>`:''}${selected.id==='field-kit'||selected.id==='herbal-tea'?`<button class="btn btn-primary" data-action="use-crafted-item" data-id="${selected.id}">Применить</button>`:''}</div></div></section>`:''}
    </section>
    ${wardrobeDesigner}
    <section class="panel-card wardrobe-panel"><div class="card-head"><div><h3>Быстрые комплекты</h3><small>ГОТОВЫЕ СОЧЕТАНИЯ ИЗ ОТКРЫТЫХ ВЕЩЕЙ</small></div><small>ПРЕСЕТЫ</small></div>
      <div class="wardrobe-presets">${['date','work','training','walk'].map((id)=>{const names={date:['На свидание','🌸'],work:['На работу','🧰'],training:['На тренировку','🥋'],walk:['На прогулку','🌿']};return `<button class="wardrobe-preset ${state.player.activeWardrobePreset===id?'active':''}" data-action="wardrobe-preset" data-id="${id}"><span>${names[id][1]}</span><b>${names[id][0]}</b><small>Применить сочетание</small></button>`}).join('')}</div>
      <details class="ready-outfit-details"><summary>Готовые комплекты целиком <small>Старые образы из гардероба</small></summary><div class="outfit-grid">${outfitCards}</div></details><p class="chat-hint">Каждый слот независим: верх, внешний слой, низ, обувь, головной убор и аксессуар. Предметы для примерки можно выбирать стрелками; покупка доступна на рынке.</p></section>
    <section class="panel-card craft-panel"><div class="card-head"><h3>Мастерская</h3><small>${state.world.location==='home'?'ДОМАШНИЙ РАБОЧИЙ СТОЛ':'ДОСТУПНО ТОЛЬКО ДОМА'}</small></div><p class="chat-hint">Комбинируй найденные материалы. Рецепты открыты сразу, но требуют нужных ресурсов.</p><div class="craft-grid">${RECIPES.map(recipe=>`<article class="craft-recipe"><div class="craft-recipe-icon"><img src="${recipe.id==='field-kit'?'assets/ui/pouch.svg':recipe.id==='herbal-tea'?'assets/ui/tea.svg':'assets/ui/generated/gift.png'}" alt=""></div><b>${escapeHTML(recipe.name)}</b><p>${escapeHTML(recipe.desc)}</p><small>Нужно: ${Object.entries(recipe.ingredients).map(([id,qty])=>`${qty}× ${id==='herb'?'трава':id==='paper'?'бумага':id==='tea'?'чай':'цветы'}`).join(' · ')}</small><button class="mini-btn" data-action="craft-item" data-id="${recipe.id}" ${canCraft(state,recipe.id)?'':'disabled'}>Изготовить</button></article>`).join('')}</div></section>
    ${state.world.location==='home'?`<section class="home-storage-grid"><article><b><img class="storage-heading-icon" src="assets/ui/generated/ramen-bowl.png" alt=""> Холодильник</b><p>Запасы еды дома: ${state.inventory.filter(x=>x.kind==='food').reduce((a,x)=>a+x.qty,0)}</p><button class="mini-btn" data-action="home-storage" data-id="fridge">Открыть</button></article><article><b><img class="storage-heading-icon" src="assets/ui/generated/gift-box.png" alt=""> Шкаф</b><p>Купленные наряды: ${(state.player.ownedLooks||[]).length}</p><button class="mini-btn" data-action="home-storage" data-id="wardrobe">Открыть</button></article></section>`:''}`;
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
    <div class="ref-location-grid">${LOCATIONS.filter(location=>!location.hidden || state.discoveredLocations?.includes(location.id)).map(location=>`<button class="ref-location-tile ${location.id===current.id?'current':''} ${!getLocationAccess(state,location.id).allowed?'locked':''}" data-action="travel" data-id="${location.id}" ${!getLocationAccess(state,location.id).allowed?'disabled':''}><span class="ref-tile-image" style="background-image:url('${location.bg}')"></span><span class="ref-tile-body"><b>${location.icon} ${escapeHTML(location.name)}</b><small>${escapeHTML(location.area)}</small><em>${escapeHTML(location.desc)}</em><i class="travel-stamp">${location.id===current.id?'Ты здесь':getLocationAccess(state,location.id).allowed?'Открыть место ↗':`🔒 ${getLocationAccess(state,location.id).reason}`}</i></span></button>`).join('')}</div>`;
}

function renderGallery(state) {
  const gallery=state.gallerySeen||{};
  const people=gallery.characters||{};
  const met=new Set([...(state.metCharacters||[]),...Object.keys(people)]);
  const roster=CHARACTERS.filter(character=>state.unlocked.includes(character.id));
  const backgrounds=[...(gallery.backgrounds||[])];
  const allArts=roster.flatMap(character=>getUnlockedCharacterArts(state,character).map((art,index)=>{ const seen=people[character.id]||[]; return {character,src:art.src,seen:seen.includes(art.src),label:art.label||`Образ ${index+1}`,index}; }));
  return `${heading('Галерея','Портреты и дополнительные образы открываются по мере знакомства, встреч и укрепления доверия.')}
    <section class="gallery-section"><div class="gallery-section-title"><span>🌸</span><div><small>ПЕРСОНАЖИ И ОБРАЗЫ</small><h3>Галерея героинь · ${roster.length}</h3><small>Открытых образов: ${allArts.length}</small></div></div>
      <div class="gallery-grid">${allArts.map(entry=>`<button class="gallery-tile ${entry.seen?'':'gallery-unseen'}" data-action="view-art" data-src="${escapeHTML(entry.src||'')}"><img src="${escapeHTML(entry.src||'')}" alt="" loading="lazy"><span><b>${escapeHTML(entry.character.name)}</b><small>${escapeHTML(entry.label)} · ${entry.seen?'Открыто в RP':'Просмотр галереи'}</small></span></button>`).join('')}</div><p class="gallery-unlock-note">Следующие варианты внешности появляются после новых встреч и роста доверия. В галерею попадают только доступные образы.</p></section>
    <section class="gallery-section"><div class="gallery-section-title"><span>🏞️</span><div><small>ИСТОРИЯ ПУТЕШЕСТВИЙ</small><h3>Увиденные сцены · ${backgrounds.length}</h3></div></div><div class="gallery-backgrounds">${backgrounds.map(src=>`<button data-action="view-art" data-src="${escapeHTML(src)}"><img src="${escapeHTML(src)}" alt="Увиденная локация" loading="lazy"></button>`).join('')||'<div class="empty-state">Посещай новые места, чтобы сохранить их фоны в галерее.</div>'}</div></section>
    <section class="gallery-section"><div class="gallery-section-title"><span>✦</span><div><small>ОТКРЫТЫЕ ИЗОБРАЖЕНИЯ</small><h3>Встреченные арты · ${Object.values(people).reduce((sum,items)=>sum+(items||[]).length,0)}</h3></div></div><div class="gallery-grid">${Object.entries(people).flatMap(([id,paths])=>(paths||[]).map(src=>({character:getCharacter(id),src}))).filter(entry=>entry.character).map(entry=>`<button class="gallery-tile" data-action="view-art" data-src="${escapeHTML(entry.src)}"><img src="${escapeHTML(entry.src)}" alt="" loading="lazy"><span><b>${escapeHTML(entry.character.name)}</b><small>Открыть арт</small></span></button>`).join('')||'<div class="empty-state">Пока не открыто дополнительных изображений. Исследуй локации и встречай героинь.</div>'}</div></section>`;
}
function renderHelp() {
  return `${heading('Помощь','Кратко о том, как устроена игра и как писать команды.')}
    <section class="help-banner panel-card"><img src="assets/ui/generated/help.png" alt=""><div><b>Подсказка Конохи</b><small>Можно писать действия своими словами — игровой мастер разберёт намерение и проверит условия.</small></div><img class="help-banner-question" src="assets/ui/generated/question.png" alt=""></section>
    <section class="help-grid"><article class="panel-card"><h3>Свободные действия</h3><p>Пиши обычным текстом: «иду в цветочную лавку», «осматриваю комнату», «покупаю чай», «жду Аяме у входа». Игровой мастер проверит место, время и доступность действия.</p></article><article class="panel-card"><h3>Диалоги</h3><p>Для личной беседы персонаж должен находиться рядом. Напиши свою реплику вручную. Первое знакомство сдержанное; имя запоминается после представления.</p></article><article class="panel-card"><h3>Герои и галерея</h3><p>В разделе «Герои» показываются только те, с кем уже было личное взаимодействие. Изображения попадают в галерею после появления в RP.</p></article><article class="panel-card"><h3>Задания и обещания</h3><p>Задания могут появиться после разговора или твоего собственного плана. Награда указывается только если персонаж её назвал. Обещания можно отменять.</p></article><article class="panel-card"><h3>Карта и перемещения</h3><p>Переходы занимают игровое время. Резкий уход с договорённой встречи может быть замечен и повлиять на доверие.</p></article><article class="panel-card"><h3>Сохранение</h3><p>Прогресс сохраняется в этом браузере. На другом устройстве используй экспорт и импорт сохранения в настройках.</p></article></section>`;
}

function renderAchievements(state) {
  const unlocked = state.achievements?.unlocked || [];
  const unlockedIds = new Set(unlocked.map(item=>item.id));
  const points = state.achievements?.points || 0;
  const rows = ACHIEVEMENTS.map(item=>{
    const done=unlockedIds.has(item.id);
    const progress=getAchievementProgress(item,state);
    const hidden=item.hidden && !done;
    const title=hidden?'Секретное достижение':item.title;
    const desc=hidden?'Условия открытия неизвестны.':item.desc;
    const medalColor = ({'История':'gold','Исследование':'blue','Общение':'pink','Команда':'red','Повседневность':'silver','Развитие':'gold','Коллекция':'blue','Секреты':'red'})[item.group] || 'silver';
    return `<article class="achievement-card ${done?'is-unlocked':''} ${hidden?'is-hidden':''}">
      <div class="achievement-icon"><img class="achievement-medal-art" src="assets/ui/achievement/medal-${medalColor}.webp" alt="${escapeHTML(item.group)}"><span>${hidden?'?':item.icon}</span></div>
      <div class="achievement-body"><div class="achievement-topline"><b>${escapeHTML(title)}</b><span>${done?`+${item.points} оч.`:`${item.points} оч.`}</span></div><p>${escapeHTML(desc)}</p>
      ${done?`<small class="achievement-state">Получено · день ${unlocked.find(x=>x.id===item.id)?.day||1}</small>`:hidden?'<small class="achievement-state">Скрыто</small>':`<div class="achievement-progress"><i style="width:${progress.percent}%"></i></div><small class="achievement-state">${progress.value} / ${progress.target}</small>`}</div>
      <span class="achievement-check">${done?'✓':hidden?'✦':'◌'}</span></article>`;
  }).join('');
  return `${heading('Достижения','Трофеи за исследования, знакомства, мастерство и секреты Конохи. Некоторые условия скрыты — открывай их сам.')}
    <section class="achievement-summary panel-card"><div><small>ОТКРЫТО</small><strong>${unlocked.length} / ${ACHIEVEMENTS.length}</strong></div><div><small>ОЧКИ ДОСТИЖЕНИЙ</small><strong>${points}</strong></div><div><small>СЕКРЕТНЫЕ</small><strong>${ACHIEVEMENTS.filter(x=>x.hidden&&unlockedIds.has(x.id)).length} / ${ACHIEVEMENTS.filter(x=>x.hidden).length}</strong></div></section>
    <section class="achievement-grid">${rows}</section>`;
}

function renderMagazine(state) {
  const collection=state.collectibles||{magazineFound:false,unlockedIssues:[],readPages:[]};
  const unlocked=new Set(collection.unlockedIssues||[]);
  const read=new Set(collection.readPages||[]);
  const issues=MAGAZINE_ISSUES.filter(issue=>unlocked.has(issue.id));
  const pages=issues.flatMap(issue=>issue.pages.map(page=>({issue,page})));
  return `${heading('Листья и истории','Тайный коллекционный альманах о людях, местах и маленьких открытиях Конохи.')}
    <section class="magazine-masthead"><div class="magazine-cover-scene" style="background-image:linear-gradient(90deg,rgba(19,14,26,.15),rgba(19,14,26,.84)),url('${issues[issues.length-1]?.cover||'assets/backgrounds/library.webp'}')"><div class="magazine-cover-mark"><small>ЧАСТНОЕ ИЗДАНИЕ · КОНОХА</small><strong>ЛИСТЬЯ</strong><span>ИСТОРИИ ИЗ ЖИЗНИ ДЕРЕВНИ</span></div></div><div class="magazine-info"><div class="eyebrow">КОЛЛЕКЦИЯ · ${issues.length} / ${MAGAZINE_ISSUES.length} ВЫПУСКА</div><h3>Найденное не всегда лежит на виду</h3><p>Старые заметки, интервью, маршруты и ремесленные советы. Новые выпуски появляются в разных уголках деревни.</p><div class="magazine-progress"><i style="width:${Math.round(issues.length/MAGAZINE_ISSUES.length*100)}%"></i></div><small>${read.size} страниц прочитано</small></div></section>
    ${issues.length?issues.map(issue=>`<section class="magazine-issue"><div class="magazine-issue-head"><div><small>ВЫПУСК № ${issue.number}</small><h3>${escapeHTML(issue.title)}</h3><p>${escapeHTML(issue.subtitle)}</p></div><div class="magazine-issue-cover" style="background-image:url('${issue.cover}')"></div></div><div class="magazine-pages">${issue.pages.map(page=>{const isRead=read.has(page.id);return `<article class="magazine-page ${isRead?'page-read':''}"><div class="magazine-page-image" style="background-image:url('${page.image}')"></div><div class="magazine-page-copy"><small>${escapeHTML(page.author)}</small><h4>${escapeHTML(page.title)}</h4><p>${escapeHTML(page.text)}</p><button class="btn ${isRead?'btn-soft':'btn-primary'}" data-action="read-magazine" data-id="${page.id}" ${isRead?'disabled':''}>${isRead?'✓ Прочитано':'Прочитать страницу'}</button></div></article>`}).join('')}</div></section>`).join(''):'<section class="panel-card empty-state">Альманах ещё не найден. В библиотеке Конохи стоит внимательнее осмотреть старые стеллажи.</section>'}
    <section class="panel-card magazine-clue"><b>Подсказка к следующему выпуску</b><p>${issues.length===0?'Ищи старую книжную полку в библиотеке.':issues.length===1?'Второй выпуск связан с архивом свитков.':'Следующая запись могла остаться в чайном домике.'}</p><button class="btn btn-soft" data-view="map">Открыть карту Конохи</button></section>`;
}

function renderView(state) {
  switch (state.ui.view) {
    case 'map': return renderMap(state);
    case 'people': return renderPeople(state);
    case 'profile': {
      const character = getCharacter(state.ui.targetId);
      return character && state.unlocked.includes(character.id) ? renderPersonDetail(state,character) : renderPeople(state);
    }
    case 'conversation': {
      const character = getCharacter(state.ui.targetId);
      return character && state.unlocked.includes(character.id) ? renderConversation(state,character) : renderPeople(state);
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
    case 'achievements': return renderAchievements(state);
    case 'magazine': return state.collectibles?.magazineFound ? renderMagazine(state) : renderLocations(state);
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
  document.getElementById('mobile-status').innerHTML = `<span class="status-pill"><span class="clock-symbol">◷</span>${clockLabel(state.world.minute)}</span><span class="status-pill">${status}</span><span class="status-pill">♥ ${stats.hp??100} HP</span><span class="status-pill"><img class="status-icon" src="assets/ui/generated/coin.png" alt="">${stats.coins} рё</span>`;
  document.getElementById('player-name-label').textContent = state.player.name;
  document.getElementById('player-origin-label').textContent = `${state.player.originName}${state.player.clan && state.player.clan!=='none' ? ` · ${state.player.clan}` : ''}`;
  const playerAvatar=document.getElementById('player-avatar');
  if(playerAvatar){playerAvatar.innerHTML=renderPlayerAvatarStack(state.player);playerAvatar.classList.add('has-player-art');}
  document.getElementById('player-stats').innerHTML = statLine('Выносливость',stats.stamina)+statLine('Чакра',stats.chakra)+statLine('Внимание',stats.focus)+`<div class="stat-row"><span>Репутация</span><b>${stats.renown}</b></div><div class="stat-row"><span>Рё</span><b>¥${stats.coins}</b></div>`;
  const place = getLocation(state.world.location);
  document.getElementById('current-place').innerHTML = `<span class="pin"><img src="assets/ui/cropped/location.png" alt="">${place.icon}</span><b>${place.name}</b><small>${place.area}</small>`;
  const activeView = ['profile','conversation'].includes(state.ui.view) ? 'people' : state.ui.view;
  document.querySelectorAll('[data-view="magazine"]').forEach(button=>{button.hidden=!state.collectibles?.magazineFound;});
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
const { talkToCharacter,npcOpeningLine,performConversationAction } = __require("src/core/gm.js");
const { travelTo,doActivity,skipTime,sleepUntilMorning,assignDailyTask,tickAction,advanceTime,updateNpcPositions,getNpcLocation,resolveWorldSituation } = __require("src/core/life.js");
const { recordDailyProgress,gainSkillXP,craftItem,useCraftedItem } = __require("src/core/progression.js");
const { evaluateAchievements } = __require("src/core/achievements.js");
const { getMagazineIssue,getMagazinePage } = __require("src/data/secret-magazine.js");
const { getPet } = __require("src/data/pets.js");
const { getJob } = __require("src/data/jobs.js");
const { CLOTHING,CLOTHING_BY_ID,CLOTHING_SLOTS,STARTER_CLOTHING,PRESET_EQUIPMENT,LOOK_TO_PRESET } = __require("src/data/clothing.js");
const { cycleWardrobePreview,equipClothing,purchaseClothing,applyWardrobePreset } = __require("src/core/wardrobe.js");
const { normalizeEquipment } = __require("src/data/clothing.js");
const { canRomance,completeRomanticDate,confessFeelings,resolveInitiative } = __require("src/core/relationships.js");
const { renderView,renderStatus,populateOrigins,updateOriginNote,renderSettings,escapeHTML } = __require("src/ui/render.js");
















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
