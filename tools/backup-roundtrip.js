// 백업 → 변경 → 복원 왕복 점검: 복원 후 저장 항목이 백업 시점과 같은지 확인
const {chromium}=require('playwright');const fs=require('fs');
const URL=process.argv[2]||'http://localhost:8768/index.html';
const SNAP=async()=>{const J=o=>JSON.stringify(o,Object.keys(o||{}).sort());const K=o=>{const r={};Object.keys(o).sort().forEach(k=>r[k]=o[k]);return JSON.stringify(r)};const g=(f)=>{try{return window[f]?JSON.stringify(window[f]()):'-'}catch(e){return 'ERR'}};
 const ua=JSON.stringify(await CODATA.userAptGet());return {단지DB수정분:ua,제품DB:DB.length,사양DB:JSON.stringify(syLibGet()),공동주택견적:g('hqGet'),LCC:(window.LCCX?JSON.stringify(LCCX.get()):'-'),면적산출:g('apGet'),추가저장:JSON.stringify(window.CODATA?CODATA.extraGet():{}),스키마:String(window.CODATA?CODATA.schema():'-'),일위대가표상태:K(S),도장시스템:K(SY)}};
(async()=>{const b=await chromium.launch(),c=await b.newContext({viewport:{width:390,height:844},acceptDownloads:true}),p=await c.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,100)));
 await p.goto(URL);await p.waitForTimeout(2500);
 await p.evaluate(()=>{document.getElementById('splash')?.remove()});await p.getByText('확인했습니다').click().catch(()=>0);
 // 샘플 작업 데이터 생성
 await p.evaluate(async()=>{await new Promise(r=>{const q=indexedDB.open('aptdb-user',1);q.onupgradeneeded=()=>q.result.createObjectStore('k');q.onsuccess=()=>{const t=q.result.transaction('k','readwrite');t.objectStore('k').put([{t:[1],c:'rt'}],'area');t.objectStore('k').put([{c:'rt',n:'왕복단지'}],'info');t.oncomplete=r}});syLibSet([{name:'왕복테스트',scope:'x',items:[{lb:'하도',n:'A제품',dft:50},{lb:'상도',n:'B제품',dft:40}],ts:1}]);S.rt=12345;localStorage.setItem('apt26:list',JSON.stringify([{ts:1,name:'왕복단지'}]));localStorage.setItem('pqu:lcci:h',JSON.stringify([{id:'h1'}]));localStorage.setItem('pqu:fm2',JSON.stringify({rt:1}));});
 await p.evaluate(()=>{if(window.hqGet&&window.hqSetAll){const h=hqGet();h.__rt='왕복';hqSetAll(h)}});
 const before=await p.evaluate(SNAP);
 const [dl]=await Promise.all([p.waitForEvent('download'),p.evaluate(()=>bkDo())]);
 const path='/tmp/rt_backup.json';await dl.saveAs(path);
 // 변경(데이터 훼손)
 await p.evaluate(async()=>{syLibSet([]);S.rt=0;if(window.hqSetAll)hqSetAll({});localStorage.removeItem('apt26:list');localStorage.setItem('pqu:lcci:h','[]');localStorage.setItem('pqu:fm2','{}');await new Promise(r=>{const q=indexedDB.open('aptdb-user',1);q.onsuccess=()=>{const t=q.result.transaction('k','readwrite');t.objectStore('k').put([],'area');t.objectStore('k').put([],'info');t.oncomplete=r}})});
 const mid=await p.evaluate(SNAP);
 // 복원(전체 대체)
 await p.evaluate(()=>{let s=document.getElementById('bk_mode');if(!s){s=document.createElement('select');s.id='bk_mode';s.innerHTML='<option value=merge>m</option><option value=replace>r</option>';s.style.display='none';document.body.appendChild(s)}s.value='replace'});
 const txt=fs.readFileSync(path,'utf8');
 await p.evaluate(()=>{if(!document.getElementById('bk_st')){const d=document.createElement('div');d.id='bk_st';document.body.appendChild(d)}});
 await p.evaluate(async t=>{await bkRestore(new File([t],'b.json',{type:'application/json'}))},txt);
 console.log('확인창 수:',await p.evaluate(()=>document.querySelectorAll('#ay').length),'ask종류:',await p.evaluate(()=>String(window.ask).slice(0,60)));console.log('복원 상태 메시지:',await p.evaluate(()=>document.getElementById('bk_st').textContent||'(없음)'));
 await p.waitForTimeout(800);
 await p.locator('#py,#ay').last().click().catch(()=>console.log('확인 창을 찾지 못함'));
 await p.waitForTimeout(1500);
 await p.waitForTimeout(2200);await p.waitForLoadState('load').catch(()=>0);await p.evaluate(()=>{document.getElementById('splash')?.remove()}).catch(()=>0);
 const after=await p.evaluate(SNAP);
 let diff=0;for(const k of Object.keys(before)){const same=before[k]===after[k];if(!same)diff++;console.log((same?'같음  ':'다름  ')+k+(same?'':'  (백업 전 '+String(before[k]).slice(0,60)+' / 복원 후 '+String(after[k]).slice(0,60)+')'))}
 console.log('훼손 확인(복원 전 사양DB가 달랐는지):',mid.사양DB!==before.사양DB?'예':'아니오', '| 스크립트 오류',errs.length);
 console.log(diff?`\n차이 ${diff}건`:'\n백업→복원 일치');await b.close();process.exit(diff?1:0)})();
