/* P2 통합 데이터 계층 (CODATA) — 저장 항목 목록·스키마 버전·무결성 점검·전체 백업/복원
   기존 저장 키와 화면은 바꾸지 않고, 흩어진 저장 항목을 한 곳에서 관리한다. */
(function(){
var VER=2,SK='pqu:schema';
/* 백업에 함께 담는 추가 저장 키(접두어) — 기존 백업(db·st·sy·syl·hq·ar·rp·pm)에 없던 항목 */
var PFX=['apt26:','lcci:','pqu:lcci:','pqu:fm2'];
function ls(){try{return window.localStorage}catch(e){return null}}
function jp(s,d){try{var v=JSON.parse(s);return v==null?d:v}catch(e){return d}}
function extraKeys(){var o=ls(),r=[];if(!o)return r;for(var i=0;i<o.length;i++){var k=o.key(i);if(PFX.some(function(p){return k.indexOf(p)==0}))r.push(k)}return r.sort()}
function extraGet(){var o=ls(),x={};extraKeys().forEach(function(k){var v=o.getItem(k);if(v!=null)x[k]=v});return x}
function extraSet(x,mode){var o=ls(),n=0;if(!o||!x)return 0;Object.keys(x).forEach(function(k){
  if(!PFX.some(function(p){return k.indexOf(p)==0})||typeof x[k]!='string')return;
  if(mode=='replace'||o.getItem(k)==null){try{o.setItem(k,x[k]);n++}catch(e){}}});return n}
/* 도메인 목록: 앱이 저장하는 모든 데이터의 이름·위치·점검 규칙 */
var DOM=[
 {id:'products',label:'제품 DB',get:function(){return typeof DB!='undefined'?DB:null},chk:function(v){return Array.isArray(v)&&v.every(function(p){return p&&typeof p.n=='string'})},cnt:function(v){return v.length}},
 {id:'work',label:'일위대가표 작업',get:function(){return typeof S!='undefined'?S:null},chk:function(v){return v&&typeof v=='object'&&!Array.isArray(v)},cnt:function(v){return Object.keys(v).length}},
 {id:'systems',label:'도장 시스템',get:function(){return typeof SY!='undefined'?SY:null},chk:function(v){return v&&typeof v=='object'},cnt:function(v){return Object.keys(v).length}},
 {id:'sylib',label:'사양 DB',get:function(){return typeof syLibGet=='function'?syLibGet():null},chk:function(v){return Array.isArray(v)&&v.every(function(s){return s&&typeof s.name=='string'&&Array.isArray(s.items)})},cnt:function(v){return v.length}},
 {id:'hq',label:'공동주택 견적(현재 작업)',get:function(){return window.hqGet?hqGet():null},chk:function(v){return v&&typeof v=='object'},cnt:function(v){return Object.keys(v).length}},
 {id:'area',label:'면적 산출',get:function(){return window.apGet?apGet():null},chk:function(v){return v&&Array.isArray(v.parts)},cnt:function(v){return v.parts.length}},
 {id:'lcc',label:'LCC',get:function(){return window.LCCX?LCCX.get():null},chk:function(v){return v&&typeof v=='object'},cnt:function(v){return Object.keys(v).length}},
 {id:'aptlist',label:'공동주택 저장 견적 목록',get:function(){var o=ls();return o?jp(o.getItem('apt26:list'),[]):null},chk:function(v){return Array.isArray(v)&&v.every(function(e){return e&&typeof e=='object'})},cnt:function(v){return v.length}},
 {id:'fill',label:'충진 계산',get:function(){var o=ls();return o?jp(o.getItem('pqu:fm2'),{}):null},chk:function(v){return v&&typeof v=='object'},cnt:function(v){return Object.keys(v).length}},
 {id:'lccHistory',label:'LCC 진단 이력',get:function(){var o=ls();return o?jp(o.getItem('pqu:lcci:h'),[]):null},chk:function(v){return Array.isArray(v)},cnt:function(v){return v.length}}
];
function check(){var rows=DOM.map(function(d){var v,ok=false,n=0,msg='';try{v=d.get();if(v==null){ok=true;msg='아직 없음'}else{ok=!!d.chk(v);n=d.cnt(v);if(!ok)msg='형식 이상'}}catch(e){msg='읽기 오류: '+e.message}
  return {id:d.id,label:d.label,ok:ok,count:n,note:msg}});var mb=lsBytes()/1048576;rows.push({id:'storage',label:'브라우저 저장 용량(localStorage)',ok:mb<4,count:Math.round(mb*100)/100,note:mb<4?'':'5MB 한도에 가까움 — 백업 후 정리 필요'});return rows}
function migrate(){var o=ls();if(!o)return VER;var cur=+o.getItem(SK)||1;if(cur<VER){/* v1→v2: 저장 구조 변경 없음(버전 표식만 기록) */try{o.setItem(SK,String(VER))}catch(e){}}return VER}
migrate();
var _lf=0;
function saveFail(e){var t=Date.now();if(t-_lf<20000)return;_lf=t;try{tt('<b>저장하지 못했습니다</b><br><small>저장 공간이 부족합니다. 설정에서 백업을 먼저 받고, 사용하지 않는 자료를 정리하세요.</small>')}catch(x){}}
function lsBytes(){var o=ls(),n=0;if(!o)return 0;for(var i=0;i<o.length;i++){var k=o.key(i);n+=(k||'').length+(o.getItem(k)||'').length}return n*2}
async function usage(){var r={localMB:Math.round(lsBytes()/1048576*100)/100,usedMB:null,quotaMB:null};try{if(navigator.storage&&navigator.storage.estimate){var q=await navigator.storage.estimate();r.usedMB=Math.round((q.usage||0)/1048576*10)/10;r.quotaMB=Math.round((q.quota||0)/1048576)}}catch(e){}return r}
window.CODATA={VER:VER,saveFail:saveFail,usage:usage,domains:DOM,check:check,extraKeys:extraKeys,extraGet:extraGet,extraSet:extraSet,schema:function(){var o=ls();return o?(+o.getItem(SK)||1):1}};
/* 사용자 단지 DB 수정분(IndexedDB aptdb-user: area·info) — 백업 포함 */
function uOpen(){return new Promise(function(ok,no){try{var r=indexedDB.open('aptdb-user',1);r.onupgradeneeded=function(){r.result.createObjectStore('k')};r.onsuccess=function(){ok(r.result)};r.onerror=function(){no(r.error)}}catch(e){no(e)}})}
function uRd(d,k){return new Promise(function(ok){try{var q=d.transaction('k').objectStore('k').get(k);q.onsuccess=function(){ok(q.result)};q.onerror=function(){ok(undefined)}}catch(e){ok(undefined)}})}
function uWr(d,k,v){return new Promise(function(ok,no){try{var t=d.transaction('k','readwrite');t.objectStore('k').put(v,k);t.oncomplete=ok;t.onerror=function(){no(t.error)}}catch(e){no(e)}})}
async function userAptGet(){try{var d=await uOpen(),a=await uRd(d,'area'),i=await uRd(d,'info');if(a===undefined&&i===undefined)return undefined;return {area:a,info:i}}catch(e){return undefined}}
async function userAptSet(u,mode){if(!u)return 0;var n=0;try{var d=await uOpen();for(var k of['area','info']){if(!Array.isArray(u[k]))continue;var cur=await uRd(d,k);if(mode=='replace'||cur===undefined||(Array.isArray(cur)&&!cur.length)){await uWr(d,k,u[k]);n++}}}catch(e){}return n}
window.CODATA.userAptGet=userAptGet;window.CODATA.userAptSet=userAptSet;
/* AI 학습 자료(IndexedDB lccds: rec 인식 기록·ph 원본 사진) — 백업 포함. 용량 상한을 넘는 사진은 검수 완료 자료를 우선해 담고 나머지는 제외 */
var DSCAP=30e6;
function dOpen(){return new Promise(function(ok,no){try{var r=indexedDB.open('lccds',1);r.onupgradeneeded=function(){var d=r.result;if(!d.objectStoreNames.contains('rec'))d.createObjectStore('rec',{keyPath:'id'});if(!d.objectStoreNames.contains('ph'))d.createObjectStore('ph',{keyPath:'id'})};r.onsuccess=function(){ok(r.result)};r.onerror=function(){no(r.error)}}catch(e){no(e)}})}
function dAll(d,st){return new Promise(function(ok){try{var q=d.transaction(st).objectStore(st).getAll();q.onsuccess=function(){ok(q.result||[])};q.onerror=function(){ok([])}}catch(e){ok([])}})}
function dKeys(d,st){return new Promise(function(ok){try{var q=d.transaction(st).objectStore(st).getAllKeys();q.onsuccess=function(){ok(q.result||[])};q.onerror=function(){ok([])}}catch(e){ok([])}})}
function dPut(d,st,arr,clear){return new Promise(function(ok,no){try{var t=d.transaction(st,'readwrite'),o=t.objectStore(st);if(clear)o.clear();arr.forEach(function(x){o.put(x)});t.oncomplete=ok;t.onerror=function(){no(t.error)}}catch(e){no(e)}})}
function verified(x){var f=x.flags||{};return !!(f.corrected||f.man||f.edited||f.confirmed)}
async function dsGetAll(){try{var d=await dOpen(),rs=await dAll(d,'rec'),ps=await dAll(d,'ph');if(!rs.length&&!ps.length)return undefined;
  var pm={};ps.forEach(function(p){pm[p.id]=p});
  var rec=rs.map(function(x){var y={};for(var k in x)if(k!=='ov')y[k]=x[k];return y}); /* 화면 겹침 이미지(ov)는 다시 만들 수 있어 제외 */
  var order=rec.filter(function(x){return x.pid&&pm[x.pid]}).sort(function(a,b){return(verified(b)?1:0)-(verified(a)?1:0)||(b.ts||0)-(a.ts||0)});
  var ph=[],tot=0,skip=0,seen={};order.forEach(function(x){if(seen[x.pid])return;seen[x.pid]=1;var p=pm[x.pid],n=(p.url||'').length;if(tot+n<=DSCAP){ph.push(p);tot+=n}else skip++});
  return{rec:rec,ph:ph,skip:skip,mb:Math.round(tot/1048576*10)/10}}catch(e){return undefined}}
async function dsSetAll(u,mode){if(!u||!Array.isArray(u.rec))return 0;var n=0;try{var d=await dOpen();
  if(mode=='replace'){await dPut(d,'rec',u.rec,true);await dPut(d,'ph',u.ph||[],true);n=u.rec.length}
  else{var kr=await dKeys(d,'rec'),kp=await dKeys(d,'ph'),sr={},sp={};kr.forEach(function(k){sr[k]=1});kp.forEach(function(k){sp[k]=1});
   var ar=u.rec.filter(function(x){return x&&!sr[x.id]}),ap=(u.ph||[]).filter(function(x){return x&&!sp[x.id]});await dPut(d,'rec',ar);await dPut(d,'ph',ap);n=ar.length}}catch(e){}return n}
window.CODATA.dsGetAll=dsGetAll;window.CODATA.dsSetAll=dsSetAll;
/* 전체 백업 — 기존 항목 + 추가 저장 항목(x) + 스키마 버전 */
window.bkDo=bkDo=async function(){
 var ua=await userAptGet(),ds=await dsGetAll();var o={app:'CoatOn',edition:EDITION,version:APPV.v,schema:VER,date:new Date().toISOString(),db:DB,st:S,sy:SY,syl:syLibGet(),lang:LANG,ar:(window.apGet?apGet():undefined),hq:(window.hqGet?hqGet():undefined),rp:(window.LCCX?LCCX.get():undefined),pm:(window.pmGet?pmGet():undefined),x:extraGet(),apu:ua,ds:ds,note:'TDS PDF 원본은 포함되지 않습니다'};
 dl(new Blob([JSON.stringify(o)],{type:'application/json'}),'코트온_backup_'+pqToday()+'.json');LS.lbk=new Date().toISOString();tt('백업 파일을 저장했습니다<br><small>제품 '+DB.length+'개'+(ds?' · AI 학습 자료 '+ds.rec.length+'건·사진 '+ds.ph.length+'장'+(ds.skip?' (사진 '+ds.skip+'장은 용량 때문에 제외 — 학습 자료 내보내기로 따로 보관)':''):'')+' 포함</small>');if(CS.tab=='set')csvRender()};
window.bkRestore=bkRestore=async function(f){
 if(!f)return;var st=document.getElementById('bk_st'),mode=(document.getElementById('bk_mode')||{}).value||'merge';
 try{
  if(f.size>52428800)throw new Error('파일이 너무 큽니다');
  var o=JSON.parse(await f.text());
  if(!o||(o.app!=='CoatOn'&&o.app!=='코트 온'&&o.app!=='PQC')||!Array.isArray(o.db)||o.db.some(function(p){return !p||typeof p.n!=='string'}))throw new Error('코트 온 백업 파일이 아닙니다');
  if(o.schema&&o.schema>VER)throw new Error('더 새로운 버전에서 만든 백업입니다. 앱을 최신 버전으로 갱신한 뒤 복원하세요');
  var nx=(o.x?Object.keys(o.x).length:0)+(o.apu?1:0)+(o.ds?1:0);
  ask('백업('+esc((o.date||'').slice(0,10))+' · 제품 '+o.db.length+'개)을 '+(mode=='replace'?'<b>전체 대체</b>':'병합')+'로 복원할까요?'+(mode=='replace'?'<br><small>현재 제품 DB와 작업 내용이 삭제됩니다.</small>':''),async function(){
   try{if(o.rp&&window.LCCX)LCCX.set(o.rp)}catch(e){}
   try{if(o.pm&&window.pmSetAll)pmSetAll(o.pm)}catch(e){}
   try{if(o.hq&&window.hqSetAll)hqSetAll(o.hq)}catch(e){}
   try{if(o.ar&&window.apSetAll&&(mode=='replace'||!((apGet()||{}).parts||[]).length))apSetAll(o.ar)}catch(e){}
   if(mode=='replace'){DB.splice(0,DB.length,...o.db);if(o.st){Object.keys(S).forEach(function(k){delete S[k]});Object.assign(S,o.st)}if(o.sy){Object.keys(SY).forEach(function(k){delete SY[k]});Object.assign(SY,o.sy);syNorm()}if(Array.isArray(o.syl))syLibSet(o.syl)}
   else{o.db.forEach(function(p){var j=DB.findIndex(function(q){return q.n==p.n});if(j<0)DB.push(p);else DB[j]=Object.assign({},DB[j],p)})}
   var wrote=nx?extraSet(o.x,mode):0;if(o.apu)wrote+=await userAptSet(o.apu,mode);if(o.ds)wrote+=await dsSetAll(o.ds,mode)?1:0;
   sv();syS();cards();dbl();syRender();pqRcAdd('백업 복원',f.name);csvRender();tt('복원했습니다<br><small>제품 '+DB.length+'개'+(wrote?' · 추가 항목 '+wrote+'개':'')+'</small>');
   if(wrote)setTimeout(function(){try{location.reload()}catch(e){}},1400)})
 }catch(e){if(st)st.innerHTML='<div class="pqst er"><span>'+esc(e.message||String(e))+'</span></div>'}};
})();
