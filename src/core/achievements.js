export const ACHIEVEMENTS = [
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

export function getAchievementProgress(achievement,state) {
  const raw=achievement.progress?.(state)||{value:0,target:achievement.goal||1};
  const target=Math.max(1,Number(raw.target)||1);
  const value=Math.max(0,Number(raw.value)||0);
  return {value,target,percent:Math.max(0,Math.min(100,Math.round(value/target*100))),done:value>=target};
}

export function evaluateAchievements(state) {
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
