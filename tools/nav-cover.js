// 하단 메뉴 가림 검사: 각 화면·팝업을 연 상태에서 하단 메뉴 5개 버튼 위치가 실제로 눌리는지(다른 요소가 덮지 않는지) 확인
const {chromium}=require('playwright');
const URL=process.argv[2]||'http://localhost:8768/index.html';
const SC=[['홈',()=>hqDash()],['일위대가표',()=>T(0)],['제품DB',()=>T(1)],['도장시스템',()=>{window.SYM='sys';T(3)}],['사양DB',()=>{window.SYM='db';T(3)}],['충진',()=>T(8)],['LCC',()=>T(9)],['공동주택 견적',()=>hqOpen()],['단지DB',()=>aptDbOpen()],['설정',()=>openSettings()],['사용설명서',()=>helpOpen()],['더보기',()=>moreOpen()],['견적서',()=>pqQuote()],['일위대가표 세부내역',()=>{T(0);S.area='100';S.coats=[{n:(DB[0]||{}).n||'x',dft:50,svr:50,price:10000}];res&&res();rdOpen()}]];
(async()=>{const b=await chromium.launch(),c=await b.newContext({viewport:{width:390,height:844}}),p=await c.newPage();
 await p.goto(URL);await p.waitForTimeout(2500);await p.evaluate(()=>document.getElementById('splash')?.remove());await p.getByText('확인했습니다').click().catch(()=>0);
 let bad=0;
 for(const [n,f] of SC){
  await p.evaluate(()=>{document.querySelectorAll('#hq,#hqd,#aptdb,#ugp,#mnp,#syed,.pqs').forEach(e=>e.remove())});
  let ok=true;try{await p.evaluate(new Function('return ('+f.toString()+')()'))}catch(e){ok=false}
  await p.waitForTimeout(1200);
  const r=await p.evaluate(()=>{const nav=document.getElementById('gnv2');if(!nav)return{skip:'하단 메뉴 없음'};const out=[];[...nav.querySelectorAll('button')].forEach((b,i)=>{const r=b.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2,t=document.elementFromPoint(x,y);if(!t||!nav.contains(t))out.push((i+1)+'번: '+(t?(t.id||t.className||t.tagName).toString().slice(0,30):'없음'))});return{covered:out}});
  const cov=r.covered||[];if(!ok||cov.length)bad++;
  console.log((cov.length||!ok?'가림 ':'정상 ')+n+(cov.length?' → '+cov.join(', '):'')+(!ok?' [열기 실패]':'')+(r.skip?' ('+r.skip+')':''))}
 console.log(bad?`\n문제 ${bad}건`:'\n하단 메뉴 가림 없음');await b.close();process.exit(bad?1:0)})();
