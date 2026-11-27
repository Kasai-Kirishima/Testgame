export const CLOTHING_SLOTS = [
  {id:'head',label:'Голова',title:'Головные уборы',icon:'◉',hint:'Повязка, заколка или капюшон'},
  {id:'top',label:'Верх',title:'Верхняя одежда',icon:'♧',hint:'Только один основной верхний предмет'},
  {id:'outer',label:'Слой',title:'Верхний слой',icon:'◇',hint:'Можно надеть поверх рубашки или формы'},
  {id:'bottom',label:'Низ',title:'Брюки и хакама',icon:'▤',hint:'Один предмет на слот'},
  {id:'shoes',label:'Обувь',title:'Обувь',icon:'⌁',hint:'Сандалии, ботинки или кеды'},
  {id:'accessory',label:'Аксессуар',title:'Аксессуары',icon:'✦',hint:'Шарф, пояс или сумка'}
];

export const CLOTHING = [
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

export const CLOTHING_BY_ID = Object.fromEntries(CLOTHING.map(item=>[item.id,item]));
export const STARTER_CLOTHING = CLOTHING.filter(item=>item.starter).map(item=>item.id);
export const DEFAULT_EQUIPMENT = {head:'head-none',top:'top-basic',outer:'outer-none',bottom:'bottom-trousers',shoes:'shoes-sneakers',accessory:'accessory-none'};
export const PRESET_EQUIPMENT = {
  casual:{...DEFAULT_EQUIPMENT,top:'top-basic',outer:'outer-jacket',bottom:'bottom-cargo',shoes:'shoes-sneakers',accessory:'accessory-none'},
  date:{...DEFAULT_EQUIPMENT,top:'top-formal',outer:'outer-haori',bottom:'bottom-formal',shoes:'shoes-formal',accessory:'accessory-brooch'},
  work:{...DEFAULT_EQUIPMENT,top:'top-work',outer:'outer-vest',bottom:'bottom-cargo',shoes:'shoes-boots',accessory:'accessory-belt'},
  training:{...DEFAULT_EQUIPMENT,top:'top-shinobi',outer:'outer-vest',bottom:'bottom-shinobi',shoes:'shoes-sandals',accessory:'accessory-none'},
  walk:{...DEFAULT_EQUIPMENT,top:'top-knit',outer:'outer-raincoat',bottom:'bottom-trousers',shoes:'shoes-boots',accessory:'accessory-scarf'}
};
export const LOOK_TO_PRESET = {casual:'casual',shinobi:'training',festival:'date',travel:'walk',raincoat:'walk',workwear:'work'};

export function normalizeEquipment(equipment,look='casual') {
  const preset=PRESET_EQUIPMENT[LOOK_TO_PRESET[look]||'casual'];
  const out={...preset};
  for (const slot of CLOTHING_SLOTS) {
    const candidate=equipment?.[slot.id];
    if (candidate && CLOTHING_BY_ID[candidate]?.slot===slot.id) out[slot.id]=candidate;
  }
  return out;
}
