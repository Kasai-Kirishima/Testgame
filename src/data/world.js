export const ORIGINS = [
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

export const LOCATIONS = [
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
  {id:'music-hall',name:'Музыкальный зал «Лунный фонарь»',icon:'🎶',area:'За рынком',desc:'Небольшая площадка для открытых концертов, танцевальных занятий и творческих вечеров.',bg:'assets/backgrounds/festival-street.webp',nightBg:'assets/backgrounds/festival-street.webp',hidden:true,activities:['Послушать концерт','Посетить танцевальное занятие','Помочь с декорациями','Записаться на открытый вечер']},
  {id:'greenhouse',name:'Оранжерея',icon:'🌺',area:'Юг',desc:'Небольшая теплица с сезонными растениями и редкими семенами.',bg:'assets/backgrounds/flower-shop.webp',activities:['Полить растения','Изучить семена','Помочь садовнику']}
];

export const SEASONS = ['Весна','Лето','Осень','Зима'];
export const WEATHER = [
  {id:'sunny',label:'Ясно',icon:'☀️',effect:'Прогулки и встречи проходят особенно приятно.'},
  {id:'cloudy',label:'Облачно',icon:'☁️',effect:'Хороший день для спокойных дел и разговоров.'},
  {id:'rain',label:'Дождь',icon:'🌧️',effect:'Уютные места и горячий чай становятся популярнее.'},
  {id:'wind',label:'Ветер',icon:'🍃',effect:'На открытых площадках удобно тренировать контроль чакры.'},
  {id:'snow',label:'Снег',icon:'❄️',effect:'Зимние прогулки открывают редкие события.'},
  {id:'fog',label:'Туман',icon:'🌫️',effect:'Лесные маршруты становятся загадочнее.'}
];
export const getLocation = id => LOCATIONS.find(location => location.id === id) || LOCATIONS[0];
export const getOrigin = id => ORIGINS.find(origin => origin.id === id) || ORIGINS[0];
