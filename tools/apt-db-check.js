/* 단지 DB(내장 기본정보) 점검 (v593)  실행: node tools/apt-db-check.js [주소]  — 앱 폴더에서 */
const {chromium}=require('playwright');const fs=require('fs');const URL=process.argv[2]||'http://localhost:8768/index.html';
const J=JSON.parse(fs.readFileSync(__dirname+'/../apt-db.json','utf8'));const res=[];const ok=(n,v,d)=>res.push([n,!!v,d===undefined?'':String(d)]);
/* 파일 점검 */
const codes=new Set(J.d.map(x=>x[0]));
ok('단지 코드 중복 없음',codes.size==J.d.length,J.d.length);
ok('기본정보 단지는 모두 DB에 있음',Object.keys(J.i).every(c=>codes.has(c)),Object.keys(J.i).length);
ok('면적 없는 단지(기본정보만)는 세대수가 있음',J.d.filter(x=>!x[8].length).every(x=>x[9]>0),J.d.filter(x=>!x[8].length).length);
ok('최고층수 범위(0 또는 1~70)',Object.values(J.i).every(v=>v[3]===0||(v[3]>=1&&v[3]<=70)));
ok('복도 유형은 계단식·복도식·혼합식·빈값',Object.values(J.i).every(v=>['계단식','복도식','혼합식',''].includes(v[5])));
ok('사용승인일 8자리 숫자',Object.values(J.i).every(v=>/^\d{8}$/.test(v[2])));
ok('최고층수 없음 표시(16) ↔ 최고층수 0',Object.values(J.i).every(v=>((v[6]&16)!=0)==(v[3]===0)));
ok('면적 값은 원본 그대로(앱 이전 DB와 동일)',(()=>{const O=JSON.parse(fs.readFileSync(process.argv[3]||'/tmp/claude-0/-home-claude/6c392b90-e7c7-5f49-a15b-e76b64e5dec5/scratchpad/apt-db.orig.json','utf8'));const m=new Map(J.d.map(x=>[x[0],x]));return O.d.every(o=>{const x=m.get(o[0]);return x&&JSON.stringify(x[8])==JSON.stringify(o[8])&&x[6]==o[6]&&x[7]==o[7]})})());
(async()=>{const b=await chromium.launch(),c=await b.newContext({viewport:{width:390,height:844}}),p=await c.newPage();const er=[];p.on('pageerror',e=>er.push(e.message.slice(0,120)));
await p.goto(URL);await p.waitForTimeout(2500);await p.evaluate(()=>document.getElementById('splash')?.remove());await p.getByText('확인했습니다').click().catch(()=>0);
const pick=async nm=>{await p.evaluate(()=>{document.getElementById('aptpp')?.remove();aptDbOpen()});await p.waitForTimeout(800);await p.fill('#aptdbq',nm);await p.waitForTimeout(700);const r=await p.$('#aptdb .zrw, #aptdb [onclick^="aptDbPick"], #aptdb .dr');await r.click();await p.waitForTimeout(600)};
const ack=async()=>{await p.waitForTimeout(400);await p.click('#aptpy',{timeout:3000}).catch(()=>0);await p.waitForTimeout(900)};
/* 1) 정상 단지: 계단식 → 평면 형식 1, 층수 채움 */
await pick('경희궁의아침3단지');let h=await p.evaluate(()=>document.getElementById('aptdb').innerText);
ok('상세: 사용승인일·복도 유형 표시',h.includes('2004-05-17')&&h.includes('계단식'));ok('상세: 정상 단지는 데이터 확인 없음',!h.includes('데이터 확인'));
await p.evaluate(()=>aptDbFill());await ack();
let hq=await p.evaluate(()=>({plan:hqGet().plan,fl:hqGet().blds.map(b=>b.fl),cr:(hqGet().kapt||{}).cr,name:hqGet().name}));
ok('채우기(계단식): 평면 형식 1 · 최고층수로 층수 채움',hq.plan=='1'&&hq.fl[0]=='16'&&hq.cr=='계단식',JSON.stringify(hq));
/* 2) 복도식 단지 */
await pick('광화문스페이스본');await p.evaluate(()=>aptDbFill());await ack();hq=await p.evaluate(()=>({plan:hqGet().plan,fl:hqGet().blds.map(b=>b.fl),cr:(hqGet().kapt||{}).cr}));ok('채우기(복도식): 평면 형식 2 자동 설정',hq.plan=='2'&&hq.cr=='복도식',JSON.stringify(hq));
/* 3) 확인 필요 단지(전용면적 이상) */
await p.evaluate(()=>{document.getElementById('aptpp')?.remove();aptDbOpen()}).catch(()=>0);
await p.fill('#aptdbq','원평대동타운').catch(()=>0);await p.waitForTimeout(700);const r=await p.$('#aptdb .zrw, #aptdb [onclick^="aptDbPick"], #aptdb .dr');if(r){await r.click();await p.waitForTimeout(600)}
h=await p.evaluate(()=>document.getElementById('aptdb').innerText);ok('상세: 확인 필요 단지는 데이터 확인 안내',h.includes('데이터 확인')&&h.includes('전용면적'),h.slice(0,0));
/* 4) 사용자가 올린 기본정보가 내장보다 우선 */
await p.evaluate(async()=>{await new Promise(r=>{const q=indexedDB.open('aptdb-user',1);q.onupgradeneeded=()=>q.result.createObjectStore('k');q.onsuccess=()=>{const t=q.result.transaction('k','readwrite');t.objectStore('k').put([{c:'A11007001',n:'경희궁의아침3단지',sd:'서울특별시',sg:'종로구',ad:'내수동',dn:1,hh:150,fl:99,rd:'사용자 도로명',ap:'2001-01-01',cls:'아파트'}],'info');t.oncomplete=r}})});
await p.reload();await p.waitForTimeout(2500);await p.evaluate(()=>document.getElementById('splash')?.remove());await p.getByText('확인했습니다').click().catch(()=>0);
const u=await p.evaluate(async()=>{const j=await aptDbData();const x=j.d.find(z=>z[0]=='A11007001');return{fl:x.fl,rd:x.rd,ap:x.ap}});
ok('사용자 기본정보 DB가 내장보다 우선',u.fl==99&&u.rd=='사용자 도로명'&&u.ap=='2001-01-01',JSON.stringify(u));
/* 5) 면적 없는 단지(기본정보만) */
const no=await p.evaluate(async()=>{const j=await aptDbData();const x=j.d.find(z=>!z[8].length);return{n:x[1],sa:x.sa,si:x.si,hh:x[9],fl:x.fl}});ok('면적 없는 단지: 면적 없음·기본정보 표시',no.sa==0&&no.si==1&&no.hh>0,JSON.stringify(no));
ok('스크립트 오류 없음',er.length==0,er.join('|'));
let bad=0;res.forEach(([n,v,d])=>{console.log((v?'통과 ':'실패 ')+n+(v?'':'  '+d));if(!v)bad++});console.log(bad?'\n실패 '+bad+'건':'\n전체 통과');await b.close();process.exit(bad?1:0)})();
