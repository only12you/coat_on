/* AI 학습 자료 백업·골든세트 점검 (v593 A5)  실행: node tools/ds-check.js [주소] */
const {chromium}=require('playwright');const fs=require('fs');const URL=process.argv[2]||'http://localhost:8768/index.html';
(async()=>{const b=await chromium.launch(),c=await b.newContext({viewport:{width:390,height:844},acceptDownloads:true}),p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,120)));
await p.goto(URL);await p.waitForTimeout(2500);await p.evaluate(()=>{document.getElementById('splash')?.remove()});await p.getByText('확인했습니다').click().catch(()=>0);
const res=[];const ok=(n,v,d)=>{res.push([n,!!v,d===undefined?'':String(d)])};
const seed=(n,big)=>p.evaluate(async([n,big])=>{const d=await new Promise((r,e)=>{const q=indexedDB.open('lccds',1);q.onupgradeneeded=()=>{q.result.createObjectStore('rec',{keyPath:'id'});q.result.createObjectStore('ph',{keyPath:'id'})};q.onsuccess=()=>r(q.result);q.onerror=e});
 await new Promise(r=>{const t=d.transaction(['rec','ph'],'readwrite');t.objectStore('rec').clear();t.objectStore('ph').clear();for(let i=0;i<n;i++){const pid='p'+i;t.objectStore('ph').put({id:pid,url:'data:image/jpeg;base64,'+'A'.repeat(big?9e6:2000)});t.objectStore('rec').put({id:'r'+i+':rust',rid:'r'+i,name:'t'+i,date:i,k:i<12?'rust':'peel',pid,mg:{X0:0,Y0:0,rw:4,rh:4,w:4,h:4},mk:'x',ov:'data:image/png;base64,'+'B'.repeat(500),fin:{pct:3,g:2},flags:{man:false,edited:false,corrected:i<12,confirmed:false},ts:i,v:1})}t.oncomplete=r});d.close()},[n,big]);
const dump=()=>p.evaluate(async()=>{const d=await new Promise(r=>{const q=indexedDB.open('lccds',1);q.onsuccess=()=>r(q.result)});const a=st=>new Promise(r=>{const q=d.transaction(st).objectStore(st).getAll();q.onsuccess=()=>r(q.result)});const rs=await a('rec'),ps=await a('ph');d.close();return{rec:rs.length,ph:ps.length,ov:rs.filter(x=>x.ov).length,gold:rs.filter(x=>x.gold).length,flag:rs.filter(x=>x.flags.corrected).length}});
const backup=async()=>{const [dl]=await Promise.all([p.waitForEvent('download'),p.evaluate(()=>bkDo())]);const f='/tmp/ds_backup.json';await dl.saveAs(f);return fs.readFileSync(f,'utf8')};
const restore=async(txt,mode)=>{await p.evaluate(m=>{let s=document.getElementById('bk_mode');if(!s){s=document.createElement('select');s.id='bk_mode';s.innerHTML='<option value=merge>m</option><option value=replace>r</option>';s.style.display='none';document.body.appendChild(s)}s.value=m;if(!document.getElementById('bk_st')){const d=document.createElement('div');d.id='bk_st';document.body.appendChild(d)}},mode);
 await p.evaluate(async t=>{await bkRestore(new File([t],'b.json',{type:'application/json'}))},txt);await p.waitForTimeout(600);await p.locator('#py,#ay').last().click().catch(()=>0);await p.waitForTimeout(2500);await p.waitForLoadState('load').catch(()=>0);await p.evaluate(()=>{document.getElementById('splash')?.remove()}).catch(()=>0)};
/* 1) 왕복 */
await seed(20,false);const before=await dump();let txt=await backup();let o=JSON.parse(txt);
ok('백업에 학습 자료 포함(기록 20·사진 20)',o.ds&&o.ds.rec.length==20&&o.ds.ph.length==20,o.ds&&o.ds.rec.length);
ok('겹침 이미지(ov)는 백업에서 제외',o.ds.rec.every(x=>!('ov' in x)));
await seed(0,false);ok('훼손 확인(전부 삭제)',(await dump()).rec==0);
await restore(txt,'replace');let after=await dump();
ok('전체 대체 복원 → 기록·사진·검수 표시 복원',after.rec==20&&after.ph==20&&after.flag==before.flag,JSON.stringify(after));
/* 2) 병합: 있는 것은 건드리지 않고 없는 것만 */
await seed(5,false);await restore(txt,'merge');after=await dump();ok('병합 복원 → 없는 것만 추가(20건)',after.rec==20&&after.ph==20,JSON.stringify(after));
/* 3) 용량 상한: 9MB 사진 5장 → 30MB 안에서 일부만 */
await seed(5,true);txt=await backup();o=JSON.parse(txt);ok('용량 상한: 사진 일부 제외·건수 표시',o.ds.rec.length==5&&o.ds.ph.length<5&&o.ds.skip==5-o.ds.ph.length&&txt.length<45e6,'사진 '+o.ds.ph.length+' 제외 '+o.ds.skip+' 크기 '+Math.round(txt.length/1e6)+'MB');
/* 4) 학습 자료 없으면 ds 생략 + 이전 백업(ds 없음)도 복원 */
await seed(0,false);txt=await backup();o=JSON.parse(txt);ok('학습 자료 없으면 ds 항목 없음',o.ds===undefined);
/* 5) 골든세트 */
await seed(20,false);
const g=await p.evaluate(async()=>{const f=document.createElement('iframe');f.srcdoc=window.DIAGSRC;f.style.cssText='position:fixed;left:-9999px;width:400px;height:600px';document.body.appendChild(f);await new Promise(r=>f.onload=r);await new Promise(r=>setTimeout(r,600));const w=f.contentWindow;
 const cnt=()=>new Promise(r=>w.dsAll('rec',rs=>r(rs.filter(x=>x.gold).length)));
 w.ask=()=>{};w.dsGold(1);await new Promise(r=>setTimeout(r,800));const g1=await cnt();
 const ids=await new Promise(r=>w.dsAll('rec',rs=>r(rs.filter(x=>x.gold).map(x=>x.id))));
 w.dsGold(1);await new Promise(r=>setTimeout(r,600));const g2=await cnt();
 w.dsGold(0);await new Promise(r=>setTimeout(r,600));const g3=await cnt();
 const tr=w.aiTrain.toString().includes('!x.gold'),ex=w.dsExport.toString().includes('x.gold');f.remove();return{g1,g2,g3,tr,ex,ids}});
ok('골든세트 지정: 검수 완료 중 일부(0<n<12)',g.g1>0&&g.g1<12,g.g1);
ok('다시 지정해도 이미 지정된 건 유지(중복 증가 없음)',g.g2>=g.g1,g.g2);
ok('해제하면 0건',g.g3==0,g.g3);
ok('학습에서 골든 제외·골든만 내보내기 코드 반영',g.tr&&g.ex);
ok('검수 10건 미만 결함은 지정 안 함',await p.evaluate(async()=>{const f=document.createElement('iframe');f.srcdoc=window.DIAGSRC;f.style.cssText='position:fixed;left:-9999px;width:400px;height:600px';document.body.appendChild(f);await new Promise(r=>f.onload=r);await new Promise(r=>setTimeout(r,600));const w=f.contentWindow;
 await new Promise(r=>{const q=indexedDB.open('lccds',1);q.onsuccess=()=>{const t=q.result.transaction('rec','readwrite');t.objectStore('rec').clear();for(let i=0;i<6;i++)t.objectStore('rec').put({id:'z'+i,k:'rust',pid:'p'+i,flags:{corrected:true},ts:i});t.oncomplete=r}});w.DSDB=null;w.ask=()=>{};w.dsGold(1);await new Promise(r=>setTimeout(r,800));const n=await new Promise(r=>w.dsAll('rec',rs=>r(rs.filter(x=>x.gold).length)));f.remove();return n==0}));
let bad=0;res.forEach(([n,v,d])=>{console.log((v?'통과 ':'실패 ')+n+(v?'':'  '+d));if(!v)bad++});if(errs.length){console.log('스크립트 오류',errs.slice(0,3));bad++}
console.log(bad?'\n실패 '+bad+'건':'\n전체 통과');await b.close();process.exit(bad?1:0)})();
