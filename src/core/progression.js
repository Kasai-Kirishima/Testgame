import {addFeed,addItem,removeItem} from './store.js';

export const SKILL_META = {
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

export function createDailyBoard(day=1) {
  const start=(Math.max(1,Number(day)||1)-1)%DAILY_POOL.length;
  const indices=[start,(start+3)%DAILY_POOL.length,(start+6)%DAILY_POOL.length];
  return {day:Number(day)||1,contracts:indices.map(index=>({...DAILY_POOL[index],progress:0,done:false}))};
}

export function ensureDailyBoard(state) {
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

export function recordDailyProgress(state,metric,amount=1) {
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

export function getSkillLevel(state,skill) {
  return Math.max(1,Math.min(5,Number(state.skills?.[skill]?.level)||1));
}

export function gainSkillXP(state,skill,amount=1) {
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

export const RECIPES = [
  {id:'field-kit',name:'Походная аптечка',desc:'Небольшой набор для восстановления здоровья.',ingredients:{herb:2,paper:1},result:{id:'field-kit',name:'Походная аптечка',desc:'Используй, чтобы восстановить 28 HP.',kind:'other',qty:1}},
  {id:'herbal-tea',name:'Травяной чай',desc:'Тёплый напиток, который помогает восстановить силы.',ingredients:{herb:1,tea:1},result:{id:'herbal-tea',name:'Травяной чай',desc:'Восстанавливает 28 выносливости и 5 внимания.',kind:'food',qty:1}},
  {id:'pressed-bouquet',name:'Памятный букет',desc:'Аккуратная композиция из цветов и бумаги.',ingredients:{flower:2,paper:1},result:{id:'pressed-bouquet',name:'Памятный букет',desc:'Небольшой подарок ручной работы.',kind:'gift',qty:1}}
];

export function canCraft(state,recipeId) {
  const recipe=RECIPES.find(item=>item.id===recipeId);
  if (!recipe || state.world.location!=='home') return false;
  return Object.entries(recipe.ingredients).every(([id,qty])=>(state.inventory.find(item=>item.id===id)?.qty||0)>=qty);
}

export function craftItem(state,recipeId) {
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

export function useCraftedItem(state,itemId) {
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
