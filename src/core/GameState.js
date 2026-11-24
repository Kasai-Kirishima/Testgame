// Shared mutable session state. Keep engine objects in the engine module.
export const state = {
  active:false, paused:false, uiOpen:false, screenReturn:'#main-menu', leftHandOn:false, inventory:[], quick:[null,null,null], selectedSlot:0,
  player:{x:0,z:0,y:0,hp:100,hunger:100,thirst:100,stamina:100,age:27,name:'Алексей',profile:{},stats:{},lastDamage:0},
  objects:[], structures:[], markers:[], explored:new Set(), nearby:null, buildMode:null, buildPreview:null,
  keys:{}, yaw:0,pitch:0,velY:0,onGround:true, jumpStart:0, clock:0, dayTime:0.62, bpm:68,
  lastTick:performance.now(), lastHud:0, lastSave:0, nightmare:0, nextNightmare:120, currentNightmare:null, nightmareEntities:[], nightmareOrigin:{x:0,z:0}, nightmareFxTick:0, fear:0, selectedItem:null,
  settings:{sensitivity:1,fov:78,shadows:'high'}, worldSeed:Math.random()*10000
};
