export const PETS = [
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
export const getPet = id => PETS.find(pet => pet.id === id);
