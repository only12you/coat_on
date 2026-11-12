/* 도장 수명(정액 감가) 점검 — 문서 예시표(10년) 재현 + 화면 표시 */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch(),p=await(await b.newContext({viewport:{width:390,height:844}})).newPage();const er=[];p.on('pageerror',e=>er.push(e.message));let ok=0,ng=0;const T=(n,c,x)=>{c?ok++:(ng++,console.log('실패:',n,x||''))};
await p.goto('http://localhost:8768/index.html');await p.waitForTimeout(2500);await p.evaluate(()=>document.getElementById('splash')?.remove());
const r=await p.evaluate(()=>{const o=[];for(let e=0;e<=10;e++){const c=LIFE.calc(2000,10,2000+e);o.push([c.res,c.dep,c.st.n])}return o});
T('잔존율 0~10년',r.every((x,i)=>x[0]==100-i*10&&x[1]==i*10),JSON.stringify(r));
T('단계: 0년 양호,5년 주의,9년 임박,10년 도달',r[0][2]=='양호'&&r[5][2]=='주의'&&r[9][2]=='임박'&&r[10][2]=='기준수명 도달',JSON.stringify(r.map(x=>x[2])));
const bd=await p.evaluate(()=>{const r=LIFE.calc(2026,10,2026);return LIFE.budget(300000000,2.66,100000000,r)});
T('차기 공사비 3억→약 3.9억',Math.abs(bd.fut-390e6)<2e6,JSON.stringify(bd));T('연 적립 약 2,900만',Math.abs(bd.per-29e6)<3e5,JSON.stringify(bd));
await p.evaluate(()=>{const H=hqGet();H.types=[{a:'110',c:'100'}];H.blds=[{id:'b1',n:'1동',fl:'15'}];H.life={y:String(new Date().getFullYear()-3),n:'10',g:'2.66',r:'50000000'};hqSetAll(H);hqOpen()});await p.waitForTimeout(500);
const t=await p.evaluate(()=>document.body.textContent);
T('카드 표시',/도장 수명 관리/.test(t)&&/성능 잔존율/.test(t)&&/70%/.test(t));T('예산 표시',/차기 외벽 공사비 예상/.test(t)&&/추가 확보 필요/.test(t));
T('오류 없음',er.length==0,er.join('|'));console.log(ng?'실패 '+ng:'전체 통과 '+ok);await b.close()})();
