export const JOBS = [
  {id:'ramen',name:'Помощник в Ичираку',place:'ichiraku',wage:28,duration:90,desc:'Помогать на кухне, принимать заказы и поддерживать чистоту.',skill:'Сервис и готовка'},
  {id:'market',name:'Работник рынка',place:'market',wage:24,duration:90,desc:'Раскладывать товары и помогать торговцам с покупателями.',skill:'Торговля'},
  {id:'flowers',name:'Помощник цветочной лавки',place:'flower-shop',wage:22,duration:75,desc:'Собирать букеты и ухаживать за цветами.',skill:'Растения и ремесло'},
  {id:'library',name:'Помощник библиотеки',place:'library',wage:20,duration:90,desc:'Сортировать свитки и помогать посетителям находить книги.',skill:'Знания'},
  {id:'clinic',name:'Помощник медицинского корпуса',place:'hospital',wage:30,duration:100,desc:'Подготавливать материалы и выполнять простые поручения медиков.',skill:'Медицина'},
  {id:'courier',name:'Курьер резиденции',place:'hokage',wage:32,duration:80,desc:'Передавать документы между учреждениями деревни.',skill:'Логистика'},
  {id:'academy',name:'Помощник инструктора',place:'academy',wage:26,duration:100,desc:'Подготавливать площадку и помогать с безопасными упражнениями.',skill:'Обучение'}
];
export const getJob = id => JOBS.find(job=>job.id===id) || null;
