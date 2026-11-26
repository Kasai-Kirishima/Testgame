import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createInitialState,normalizeState} from '../src/core/store.js';
import {ACHIEVEMENTS,evaluateAchievements,getAchievementProgress} from '../src/core/achievements.js';
import {MAGAZINE_ISSUES,getMagazineIssue,getMagazinePage} from '../src/data/secret-magazine.js';
import {LOCATIONS} from '../src/data/world.js';
import {renderView} from '../src/ui/render.js';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const state=createInitialState({name:'Тестовый читатель'});
assert.equal(state.collectibles.magazineFound,false,'Альманах должен быть скрыт в новом сохранении');
assert.deepEqual(state.collectibles.unlockedIssues,[]);
assert.equal(state.achievements.points,0);
assert.equal(ACHIEVEMENTS.length,21,'Должна быть полноценная коллекция достижений');

const unlocked=evaluateAchievements(state);
assert.deepEqual(unlocked.map(x=>x.id),['first-day'],'Первый запуск должен дать только стартовое достижение');
assert.equal(state.achievements.points,5);
assert.equal(evaluateAchievements(state).length,0,'Достижение нельзя получить дважды');

state.visitedLocations=['main-street','library','market','garden'];
const route=getAchievementProgress(ACHIEVEMENTS.find(x=>x.id==='first-steps'),state);
assert.equal(route.done,true);
assert.ok(evaluateAchievements(state).some(x=>x.id==='first-steps'));

state.ui.view='achievements';
const achievementsHtml=renderView(state);
assert.match(achievementsHtml,/Достижения/);
assert.match(achievementsHtml,/Первый маршрут/);
assert.match(achievementsHtml,/Секретное достижение/,'Скрытые достижения не должны раскрывать условие');

assert.equal(MAGAZINE_ISSUES.length,3,'В коллекции должно быть три выпуска');
for(const issue of MAGAZINE_ISSUES){
  assert.ok(LOCATIONS.some(location=>location.id===issue.foundAt),`${issue.id}: место поиска должно существовать`);
  assert.ok(fs.existsSync(path.join(root,issue.cover)),`${issue.id}: обложка должна существовать`);
  assert.equal(issue.pages.length,3,`${issue.id}: должно быть три страницы`);
  for(const page of issue.pages){
    assert.ok(fs.existsSync(path.join(root,page.image)),`${page.id}: иллюстрация должна существовать`);
    assert.ok(page.text.length>120,`${page.id}: текст страницы должен быть содержательным`);
    assert.equal(getMagazinePage(page.id).id,page.id);
  }
}
assert.equal(getMagazineIssue('missing'),undefined);

state.collectibles={magazineFound:true,unlockedIssues:['issue-01'],readPages:[]};
state.ui.view='magazine';
const magazineHtml=renderView(state);
assert.match(magazineHtml,/Листья и истории/);
assert.match(magazineHtml,/За страницами Конохи/);
assert.match(magazineHtml,/Прочитать страницу/);
assert.doesNotMatch(magazineHtml,/issue-02|Голоса вечернего рынка/,'Ненайденные выпуски не должны показывать содержимое');
state.collectibles.readPages=['01-editorial','01-craft','01-training'];
state.achievements.unlocked.push({id:'secret-reader',day:1,minute:600});
assert.ok(evaluateAchievements(state).some(x=>x.id==='daily-reader'));

const migrated=normalizeState({player:{name:'Старое сохранение'},world:{day:3,minute:500},visitedLocations:['main-street']});
assert.equal(migrated.collectibles.magazineFound,false,'Старое сохранение должно безопасно мигрировать');
assert.deepEqual(migrated.achievements.unlocked,[]);
assert.equal(migrated.player.workShiftsTotal,0);

const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
assert.match(html,/data-view="achievements"/);
assert.match(html,/data-view="magazine" hidden/,'Вход в секретный альманах скрыт до находки');
console.log('Achievements and secret magazine: passed.');
