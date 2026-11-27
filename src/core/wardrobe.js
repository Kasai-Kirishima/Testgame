import {CLOTHING,CLOTHING_BY_ID,CLOTHING_SLOTS,STARTER_CLOTHING,PRESET_EQUIPMENT,LOOK_TO_PRESET,normalizeEquipment} from '../data/clothing.js';

export function cycleWardrobePreview(state,slot,direction=1) {
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

export function equipClothing(state,itemId,slot) {
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

export function purchaseClothing(state,itemId,slot) {
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

export function applyWardrobePreset(state,presetId) {
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
