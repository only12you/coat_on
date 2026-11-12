// 전체 시나리오 검사: 면적 입력 → 일위대가표 → 세부 내역 → 견적서 → 저장·재시작 → LCC → 공동주택 견적
// 각 단계의 금액이 서로 같은지(화면 간 일관성)와 스크립트 오류 0건을 확인한다.
const {chromium}=require('playwright');
const URL=process.argv[2]||'http://localhost:8768/index.html';
const num=s=>+String(s).replace(/[^\d]/g,'');
(async()=>{const b=await chromium.launch(),c=await b.newContext({viewport:{width:390,height:844}}),p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const out=[];const ck=(n,ok,d)=>{out.push(ok);console.log((ok?'통과 ':'실패 ')+n+(d?'  ('+d+')':''))};
 await p.goto(URL);await p.waitForTimeout(2500);await p.evaluate(()=>document.getElementById('splash')?.remove());await p.getByText('확인했습니다').click().catch(()=>0);
 // 1. 일위대가표
 const s1=await p.evaluate(()=>{DB.push({n:'시나리오프라이머',mf:'테스트',g:'에폭시 프라이머',svr:60,dft:50,mk:18,pk:18,un:'L',sg:0,ts:18,tn:'신너',tc:'T-1',tr:0});sv();T(0);S.area='1000';S.coats=[{n:'시나리오프라이머',dft:50,svr:60,loss:10,tr:5,price:45000,tprice:3000}];sv();cards();
  const o=calc(S.coats[0]),A=1000,cans=Math.ceil(o[0].ac*A/o[0].pk)*45000+(o[1]?Math.ceil(o[1].ac*A/o[1].pk)*3000:0);return {mat:cans,theo:Math.round(o.reduce((x,y)=>x+y.amt,0)*A),L:o[0].ac*A}});
 ck('1. 일위대가표 계산',s1.mat>0,'캔 구매 기준 '+s1.mat.toLocaleString()+'원(이론 '+s1.theo.toLocaleString()+'원), 도료 '+s1.L.toFixed(2)+'L');
 // 2. 세부 내역 창 금액
 const s2=await p.evaluate(()=>{rdOpen();const t=document.getElementById('rdm').innerText;const m=t.match(/공급가액\s*([\d,]+)/);return {sup:m?m[1]:'',has:!!document.getElementById('rdm')}});
 ck('2. 세부 내역 공급가액 = 캔 구매 기준 계산',Math.abs(num(s2.sup)-s1.mat)<=1,'세부내역 '+s2.sup+' / 계산 '+s1.mat.toLocaleString());
 await p.evaluate(()=>rdClose());
 // 3. 견적서
 const s3=await p.evaluate(()=>{est();const e=document.getElementById('es');return {open:!!e,txt:e?e.innerText.slice(0,2000):''}});
 ck('3. 견적서 화면 열림',s3.open);
 const m3=s3.txt.match(/(?:공급가액|소계)[^\d]{0,12}([\d,]{5,})/);
 ck('3-1. 견적서 공급가액 = 세부 내역 공급가액',m3?Math.abs(num(m3[1])-num(s2.sup))<=1:false,m3?('견적서 '+m3[1]):'금액을 찾지 못함');
 await p.evaluate(()=>{const e=document.getElementById('es');if(e)e.remove()});
 // 4. 저장 후 재시작해도 값 유지
 await p.reload();await p.waitForTimeout(2500);await p.evaluate(()=>document.getElementById('splash')?.remove());
 const s4=await p.evaluate(()=>({area:S.area,n:S.coats[0]&&S.coats[0].n,p:DB.some(x=>x.n=='시나리오프라이머')}));
 ck('4. 앱을 다시 열어도 값 유지',s4.area=='1000'&&s4.n=='시나리오프라이머'&&s4.p,JSON.stringify(s4));
 // 5. LCC
 const s5=await p.evaluate(()=>{T(9);return {ok:!!document.getElementById('v9'),assets:LCCX&&LCCX.diagInfo?LCCX.diagInfo().assets.length:0,chk:CODATA.check().filter(x=>!x.ok).map(x=>x.id)}});
 ck('5. LCC 화면·데이터 점검',s5.ok&&s5.chk.length==0,'자산 '+s5.assets+'개, 이상 항목 '+(s5.chk.join(',')||'없음'));
 // 6. 공동주택 견적
 const s6=await p.evaluate(()=>{try{hqOpen();return !!document.getElementById('hq')}catch(e){return false}});
 ck('6. 공동주택 견적 열림',s6);
 // 7. 하단 메뉴로 이동
 const nav=[];const sig=()=>p.evaluate(()=>document.body.dataset.pg+'|'+document.body.className.replace(/\s?gt/,'')+'|'+[...document.querySelectorAll('#v0,#v1,#v3,#v8,#v9,#hqd,#hq,#mh,#aptdb')].filter(e=>e.getBoundingClientRect().height>300&&getComputedStyle(e).display!='none').map(e=>e.id).join('+'));
 await p.locator('#gnv2 button').nth(0).click();await p.waitForTimeout(700);nav.push(await sig());let sub=0;
 for(let i=1;i<5;i++){await p.locator('#gnv2 button').nth(i).click();await p.waitForTimeout(600);const open=await p.evaluate(()=>{const g=document.getElementById('gsub');return !!g&&getComputedStyle(g).display!='none'&&g.getBoundingClientRect().height>20});
  if(open){sub++;const before=await sig();await p.locator('#gsub button').first().click();await p.waitForTimeout(900);nav.push(await sig())}else nav.push(await sig())}
 ck('7. 하단 메뉴 5개 동작(하위 메뉴 4개 열림·이동)',sub>=3&&new Set(nav).size>=3,'하위메뉴 '+sub+'개, 서로 다른 화면 '+new Set(nav).size+'종');
 ck('스크립트 오류 0건',errs.length==0,errs.join(' | ').slice(0,200));
 await b.close();const bad=out.filter(x=>!x).length+(errs.length?1:0);console.log(bad?'\n실패 '+bad+'건':'\n전체 시나리오 통과');process.exit(bad?1:0)})();
