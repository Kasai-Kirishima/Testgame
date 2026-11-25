export const ENEMIES = [
  {id:'masked-scout',name:'Маскированный разведчик',role:'Разведчик',description:'Пытается проверить границы деревни и уходит от прямого столкновения.',image:'assets/enemies/masked-scout.webp',hp:42,attack:7,reward:18,style:'Быстрый и осторожный'},
  {id:'road-rogue',name:'Дорожный налётчик',role:'Нарушитель порядка',description:'Промышляет мелкими нападениями на караваны. Его можно остановить без лишнего риска.',image:'assets/enemies/road-rogue.webp',hp:50,attack:8,reward:22,style:'Напористый противник'},
  {id:'armored-guard',name:'Наёмный страж',role:'Охранник склада',description:'Закрыл проход к заброшенному складу и не хочет слушать предупреждения.',image:'assets/enemies/armored-guard.webp',hp:62,attack:9,reward:28,style:'Крепкая защита'},
  {id:'forest-ambusher',name:'Лесной засадник',role:'Нарушитель на тропе',description:'Прячется у дороги и пытается напугать путников.',image:'assets/enemies/forest-ambusher.webp',hp:46,attack:8,reward:20,style:'Скрытные выпады'},
  {id:'chakra-adept',name:'Бродячий техник',role:'Пользователь чакры',description:'Использует простые приёмы чакры и держит дистанцию.',image:'assets/enemies/chakra-adept.webp',hp:54,attack:10,reward:26,style:'Дальняя атака'},
  {id:'stone-guardian',name:'Каменный страж',role:'Тренировочный голем',description:'Старинный голем у руин. Его активация похожа на проверку навыков.',image:'assets/enemies/stone-guardian.webp',hp:72,attack:8,reward:34,style:'Медленный и выносливый'}
];
export const getEnemy = id => ENEMIES.find(enemy => enemy.id === id) || ENEMIES[0];
